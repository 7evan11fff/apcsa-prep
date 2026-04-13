"use client";

import { useState, useEffect, useCallback } from "react";
import type { StudentProfile, TopicState } from "@/types";
import { getProfile, saveProfile, addXP as addXPStorage } from "@/lib/storage";
import { updateBKT, getParamsForDifficulty } from "@/lib/bayesian-kt";
import { reviewCard, ratingFromScore, createInitialState, getRetrievability, getNextReviewDate } from "@/lib/fsrs";

export function useStudentProfile() {
  const [profile, setProfile] = useState<StudentProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProfile().then((p) => {
      setProfile(p);
      setLoading(false);
    });
  }, []);

  const refresh = useCallback(async () => {
    const p = await getProfile();
    setProfile(p);
    return p;
  }, []);

  const save = useCallback(async (updated: StudentProfile) => {
    await saveProfile(updated);
    setProfile(updated);
  }, []);

  const addXP = useCallback(async (amount: number) => {
    const updated = await addXPStorage(amount);
    setProfile(updated);
    return updated;
  }, []);

  const recordQuizAnswer = useCallback(
    async (topicId: string, correct: boolean, difficulty: number, questionId?: string) => {
      if (!profile) return;
      const state = profile.topicStates[topicId];
      if (!state) return;

      const bktParams = getParamsForDifficulty(difficulty);
      const bktState = { pKnown: state.mastery || 0.1, observations: state.totalAttempts };
      const newBkt = updateBKT(bktState, correct, bktParams);

      const fsrsState = {
        ...createInitialState(state.difficulty),
        stability: state.stability,
        lastReview: state.lastReview ? new Date(state.lastReview).getTime() : Date.now(),
        reps: state.reviewCount,
        lapses: 0,
      };
      const rating = ratingFromScore(correct ? 0.85 : 0.15);
      const newFsrs = reviewCard(fsrsState, rating);
      const nextReview = getNextReviewDate(newFsrs);

      const questionHistory = { ...profile.questionHistory };
      if (questionId) {
        const prev = questionHistory[questionId];
        const now = new Date().toISOString();
        const prevConsecutive = prev?.consecutiveCorrect ?? 0;
        const newConsecutive = correct ? prevConsecutive + 1 : 0;
        
        const prevStability = prev?.stability ?? 1;
        let newStability: number;
        let newNextReview: string | null;
        
        if (correct) {
          newStability = Math.min(prevStability * 2.5, 90);
          const reviewDays = Math.max(1, Math.round(newStability));
          const reviewDate = new Date();
          reviewDate.setDate(reviewDate.getDate() + reviewDays);
          newNextReview = reviewDate.toISOString();
        } else {
          newStability = Math.max(0.5, prevStability * 0.3);
          const reviewDate = new Date();
          reviewDate.setMinutes(reviewDate.getMinutes() + 10);
          newNextReview = reviewDate.toISOString();
        }
        
        const wasMissed = prev?.lastIncorrectAt && (!prev?.clearedAt || prev.lastIncorrectAt > prev.clearedAt);
        const nowCleared = wasMissed && correct && newConsecutive >= 2;
        
        questionHistory[questionId] = {
          questionId,
          topicId,
          attempts: (prev?.attempts ?? 0) + 1,
          correctCount: (prev?.correctCount ?? 0) + (correct ? 1 : 0),
          lastAttempt: now,
          lastCorrect: correct,
          consecutiveCorrect: newConsecutive,
          lastIncorrectAt: correct ? (prev?.lastIncorrectAt ?? null) : now,
          clearedAt: nowCleared ? now : (prev?.clearedAt ?? null),
          nextReviewAt: newNextReview,
          stability: newStability,
        };
      }

      const updated: StudentProfile = {
        ...profile,
        questionHistory,
        topicStates: {
          ...profile.topicStates,
          [topicId]: {
            ...state,
            mastery: newBkt.pKnown,
            stability: newFsrs.stability,
            difficulty: newFsrs.difficulty,
            retrievability: getRetrievability(newFsrs),
            lastReview: new Date().toISOString(),
            nextReview: nextReview.toISOString(),
            reviewCount: state.reviewCount + 1,
            correctCount: state.correctCount + (correct ? 1 : 0),
            totalAttempts: state.totalAttempts + 1,
          },
        },
      };
      await save(updated);
    },
    [profile, save]
  );

  const completeLesson = useCallback(
    async (topicId: string) => {
      if (!profile) return;
      const state = profile.topicStates[topicId];
      if (!state) return;

      const updated: StudentProfile = {
        ...profile,
        topicStates: {
          ...profile.topicStates,
          [topicId]: {
            ...state,
            lessonCompleted: true,
            lastReview: new Date().toISOString(),
          },
        },
      };
      await save(updated);
      await addXP(10);
    },
    [profile, save, addXP]
  );

  return {
    profile,
    loading,
    refresh,
    save,
    addXP,
    recordQuizAnswer,
    completeLesson,
  };
}
