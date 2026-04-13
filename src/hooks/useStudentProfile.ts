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
        questionHistory[questionId] = {
          questionId,
          topicId,
          attempts: (prev?.attempts ?? 0) + 1,
          correctCount: (prev?.correctCount ?? 0) + (correct ? 1 : 0),
          lastAttempt: new Date().toISOString(),
          lastCorrect: correct,
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
            mastery: Math.max(state.mastery, 0.3),
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
