import { openDB, type IDBPDatabase } from "idb";
import type { StudentProfile, TopicState } from "@/types";
import knowledgeGraph from "@/data/knowledge-graph.json";

const DB_NAME = "apcsa-prep";
const DB_VERSION = 1;
const STORE_NAME = "profile";
const LOCALSTORAGE_KEY = "apcsa-profile-backup";

let dbInstance: IDBPDatabase | null = null;

async function getDB(): Promise<IDBPDatabase> {
  // Check if existing connection is still valid
  if (dbInstance) {
    try {
      // Test if the connection is still alive
      await dbInstance.get(STORE_NAME, "test-connection");
      return dbInstance;
    } catch {
      // Connection is stale, reset it
      dbInstance = null;
    }
  }
  
  dbInstance = await openDB(DB_NAME, DB_VERSION, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: "id" });
      }
    },
    blocked() {
      console.warn("IndexedDB blocked - close other tabs using this app");
    },
    blocking() {
      // Close the connection to allow the other tab to upgrade
      dbInstance?.close();
      dbInstance = null;
    },
    terminated() {
      // Connection was terminated unexpectedly
      dbInstance = null;
    },
  });
  return dbInstance;
}

function backupToLocalStorage(profile: StudentProfile): void {
  try {
    if (typeof window !== "undefined" && window.localStorage) {
      localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(profile));
    }
  } catch {
    // localStorage might be full or unavailable
  }
}

function restoreFromLocalStorage(): StudentProfile | null {
  try {
    if (typeof window !== "undefined" && window.localStorage) {
      const data = localStorage.getItem(LOCALSTORAGE_KEY);
      if (data) {
        return JSON.parse(data) as StudentProfile;
      }
    }
  } catch {
    // localStorage might be unavailable
  }
  return null;
}

function createDefaultTopicStates(): Record<string, TopicState> {
  const states: Record<string, TopicState> = {};
  for (const topic of knowledgeGraph.topics) {
    states[topic.id] = {
      topicId: topic.id,
      mastery: 0,
      stability: 1,
      difficulty: topic.difficulty * 2,
      retrievability: 0,
      lastReview: null,
      nextReview: null,
      reviewCount: 0,
      correctCount: 0,
      totalAttempts: 0,
      lessonCompleted: false,
      xpEarned: 0,
    };
  }
  return states;
}

export function createDefaultProfile(): StudentProfile {
  return {
    id: "default",
    name: "Student",
    createdAt: new Date().toISOString(),
    examDate: "2026-05-15",
    totalXp: 0,
    dailyXpGoal: 30,
    currentStreak: 0,
    longestStreak: 0,
    lastStudyDate: "",
    topicStates: createDefaultTopicStates(),
    exerciseResults: {},
    frqResults: {},
    examResults: [],
    studyPlan: [],
    questionHistory: {},
  };
}

export async function getProfile(): Promise<StudentProfile> {
  try {
    const db = await getDB();
    const profile = await db.get(STORE_NAME, "default");
    
    if (!profile) {
      // Try to restore from localStorage backup first
      const backup = restoreFromLocalStorage();
      if (backup && backup.totalXp > 0) {
        // Restore the backup to IndexedDB
        await db.put(STORE_NAME, backup);
        return backup;
      }
      
      const defaultProfile = createDefaultProfile();
      await db.put(STORE_NAME, defaultProfile);
      backupToLocalStorage(defaultProfile);
      return defaultProfile;
    }
    
    const p = profile as StudentProfile;
    if (!p.questionHistory) p.questionHistory = {};
    
    // Migrate old question records to new format with spaced repetition fields
    for (const qId of Object.keys(p.questionHistory)) {
      const record = p.questionHistory[qId];
      if (record.consecutiveCorrect === undefined) {
        record.consecutiveCorrect = record.lastCorrect ? 1 : 0;
      }
      if (record.lastIncorrectAt === undefined) {
        record.lastIncorrectAt = record.lastCorrect ? null : record.lastAttempt;
      }
      if (record.clearedAt === undefined) {
        record.clearedAt = null;
      }
      if (record.nextReviewAt === undefined) {
        const reviewDate = new Date(record.lastAttempt);
        reviewDate.setDate(reviewDate.getDate() + 1);
        record.nextReviewAt = reviewDate.toISOString();
      }
      if (record.stability === undefined) {
        record.stability = 1;
      }
    }
    
    // Ensure all topics exist (in case new topics were added)
    const defaultStates = createDefaultTopicStates();
    for (const topicId of Object.keys(defaultStates)) {
      if (!p.topicStates[topicId]) {
        p.topicStates[topicId] = defaultStates[topicId];
      }
    }
    
    return p;
  } catch (error) {
    console.error("IndexedDB error, trying localStorage backup:", error);
    // If IndexedDB fails completely, try localStorage
    const backup = restoreFromLocalStorage();
    if (backup) return backup;
    return createDefaultProfile();
  }
}

export async function saveProfile(profile: StudentProfile): Promise<void> {
  try {
    const db = await getDB();
    await db.put(STORE_NAME, profile);
    // Always backup to localStorage as a fallback
    backupToLocalStorage(profile);
  } catch (error) {
    console.error("Failed to save to IndexedDB, saving to localStorage:", error);
    backupToLocalStorage(profile);
  }
}

export async function updateTopicState(
  topicId: string,
  updates: Partial<TopicState>
): Promise<StudentProfile> {
  const profile = await getProfile();
  profile.topicStates[topicId] = {
    ...profile.topicStates[topicId],
    ...updates,
  };
  await saveProfile(profile);
  return profile;
}

export async function addXP(amount: number): Promise<StudentProfile> {
  const profile = await getProfile();
  profile.totalXp += amount;

  const today = new Date().toISOString().split("T")[0];
  if (profile.lastStudyDate !== today) {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toISOString().split("T")[0];

    if (profile.lastStudyDate === yesterdayStr) {
      profile.currentStreak += 1;
    } else {
      profile.currentStreak = 1;
    }
    profile.lastStudyDate = today;
    profile.longestStreak = Math.max(profile.longestStreak, profile.currentStreak);
  }

  await saveProfile(profile);
  return profile;
}

export async function resetProfile(): Promise<StudentProfile> {
  const defaultProfile = createDefaultProfile();
  await saveProfile(defaultProfile);
  return defaultProfile;
}
