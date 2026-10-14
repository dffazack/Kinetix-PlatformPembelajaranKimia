'use client';

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { Lesson, Question, StudentResult, ContentBlock, LearningStage, QuestionTestType } from '@/lib/types';
import { PBL_LESSONS, PBL_QUESTIONS, INITIAL_STUDENT_RESULTS } from '@/lib/data/pblCurriculumData';
import { StorageService } from '@/lib/storage';

interface DataContextType {
  lessons: Lesson[];
  results: StudentResult[];
  questions: Question[];
  isLoading: boolean;
  getLesson: (idOrSlug: string) => Lesson | undefined;
  getQuestionsForLesson: (lessonId: string, testType?: QuestionTestType) => Question[];
  getStudentResultForLesson: (studentId: string, lessonId: string) => StudentResult | undefined;
  isStageUnlocked: (studentId: string | undefined, lessonId: string, stage: LearningStage) => boolean;
  submitPreTest: (
    studentId: string,
    studentName: string,
    studentEmail: string,
    lessonId: string,
    answers: Record<string, string>
  ) => Promise<{ score: number; result: StudentResult }>;
  completePblOrientation: (studentId: string, lessonId: string) => Promise<void>;
  completeSimulation: (studentId: string, lessonId: string) => Promise<void>;
  submitPostTest: (
    studentId: string,
    studentName: string,
    studentEmail: string,
    lessonId: string,
    answers: Record<string, string>
  ) => Promise<{ score: number; nGain: number; result: StudentResult }>;
  submitReflection: (
    studentId: string,
    lessonId: string,
    reflectionAnswers: Record<number, string>
  ) => Promise<void>;
  submitParagraphAnswer: (
    studentId: string,
    studentName: string,
    studentEmail: string,
    lessonId: string,
    blockId: string,
    answerText: string
  ) => Promise<void>;
  getParagraphAnswer: (studentId: string, lessonId: string, blockId: string) => string;
  // Teacher KB management:
  updateLesson: (lesson: Lesson) => Promise<void>;
  addContentBlock: (lessonId: string, block: ContentBlock) => Promise<void>;
  updateContentBlock: (lessonId: string, block: ContentBlock) => Promise<void>;
  deleteContentBlock: (lessonId: string, blockId: string) => Promise<void>;
  saveFillBlankAnswer: (studentId: string, blankId: string, text: string) => void;
  getFillBlankAnswer: (studentId: string, blankId: string) => string;
  resetToDefault: () => void;
  refetchData: () => Promise<void>;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export function DataProvider({ children }: { children: React.ReactNode }) {
  const [lessons, setLessons] = useState<Lesson[]>(PBL_LESSONS);
  const [results, setResults] = useState<StudentResult[]>(INITIAL_STUDENT_RESULTS);
  const [questions, setQuestions] = useState<Question[]>(PBL_QUESTIONS);
  const [isLoading, setIsLoading] = useState(true);

  const fetchDatabaseData = useCallback(async () => {
    try {
      // 1. Fetch Lessons
      const resLessons = await fetch('/api/lessons');
      if (resLessons.ok) {
        const data = await resLessons.json();
        if (data.success && data.lessons?.length > 0) {
          setLessons(data.lessons);
        }
      }

      // 2. Fetch Questions
      const resQuestions = await fetch('/api/questions');
      if (resQuestions.ok) {
        const data = await resQuestions.json();
        if (data.success && data.questions?.length > 0) {
          setQuestions(data.questions);
        }
      }

      // 3. Fetch Results
      const resResults = await fetch('/api/results');
      if (resResults.ok) {
        const data = await resResults.json();
        if (data.success && data.results?.length > 0) {
          setResults(data.results);
        }
      }
    } catch (err) {
      console.warn('Database fetch failed, continuing with cached PBL curriculum:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDatabaseData();
  }, [fetchDatabaseData]);

  const getLesson = (idOrSlug: string): Lesson | undefined => {
    return lessons.find((l) => l.id === idOrSlug || l.slug === idOrSlug);
  };

  const getQuestionsForLesson = (lessonId: string, testType?: QuestionTestType): Question[] => {
    return questions.filter((q) => {
      const matchLesson = q.lessonId === lessonId;
      if (!testType) return matchLesson;
      return matchLesson && q.testType === testType;
    });
  };

  const getStudentResultForLesson = (studentId: string, lessonId: string): StudentResult | undefined => {
    return results.find((r) => r.studentId === studentId && r.lessonId === lessonId);
  };

  const isStageUnlocked = (studentId: string | undefined, lessonId: string, stage: LearningStage): boolean => {
    if (!studentId) {
      // Guest can view pre-test only by default
      return stage === 'PRE_TEST';
    }
    const res = getStudentResultForLesson(studentId, lessonId);
    const stages = res?.stagesCompleted || [];

    switch (stage) {
      case 'PRE_TEST':
        return true; // Always unlocked
      case 'ORIENTATION':
        return stages.includes('PRE_TEST'); // Unlocked once Pre-test is done
      case 'SIMULATION':
        return stages.includes('ORIENTATION') && stages.includes('PRE_TEST'); // Unlocked once Orientation is read/watched
      case 'POST_TEST':
        return stages.includes('SIMULATION') && stages.includes('PRE_TEST'); // Unlocked once Simulation is explored
      case 'REFLECTION':
        return stages.includes('POST_TEST'); // Unlocked once Post-test is submitted
      default:
        return false;
    }
  };

  const submitPreTest = async (
    studentId: string,
    studentName: string,
    studentEmail: string,
    lessonId: string,
    answers: Record<string, string>
  ) => {
    const preQuestions = getQuestionsForLesson(lessonId, 'PRE_TEST');
    let correct = 0;
    preQuestions.forEach((q) => {
      const studentAns = answers[q.id];
      if (studentAns && studentAns.trim().toUpperCase() === q.correctAnswer.trim().toUpperCase()) {
        correct += 1;
      }
    });
    const calculatedScore = preQuestions.length > 0 ? Math.round((correct / preQuestions.length) * 100) : 0;

    let updatedResult: StudentResult = {
      id: `res-${Date.now()}`,
      studentId,
      studentName,
      studentEmail,
      lessonId,
      preTestScore: calculatedScore,
      postTestScore: 0,
      nGain: 0,
      score: 0,
      preAnswers: answers,
      postAnswers: {},
      reflectionAnswers: {},
      stagesCompleted: ['PRE_TEST'],
      completedAt: new Date().toISOString(),
    };

    try {
      const res = await fetch('/api/results', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'SUBMIT_PRE_TEST',
          studentId,
          studentName,
          studentEmail,
          lessonId,
          answers,
        }),
      });
      if (res.ok) {
        const data = await res.json();
        if (data.success && data.result) {
          updatedResult = data.result;
        }
      }
    } catch (e) {
      console.warn('Saving pre-test to server failed:', e);
    }

    setResults((prev) => {
      const idx = prev.findIndex((r) => r.studentId === studentId && r.lessonId === lessonId);
      if (idx >= 0) {
        const copy = [...prev];
        copy[idx] = {
          ...copy[idx],
          preTestScore: calculatedScore,
          preAnswers: answers,
          stagesCompleted: Array.from(new Set([...(copy[idx].stagesCompleted || []), 'PRE_TEST' as LearningStage])),
        };
        return copy;
      }
      return [updatedResult, ...prev];
    });

    return { score: calculatedScore, result: updatedResult };
  };

  const completePblOrientation = async (studentId: string, lessonId: string) => {
    try {
      await fetch('/api/results', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'COMPLETE_ORIENTATION',
          studentId,
          lessonId,
        }),
      });
    } catch (e) {
      console.warn('Complete orientation sync failed:', e);
    }

    setResults((prev) => {
      const idx = prev.findIndex((r) => r.studentId === studentId && r.lessonId === lessonId);
      if (idx >= 0) {
        const copy = [...prev];
        const stages = Array.from(new Set([...(copy[idx].stagesCompleted || []), 'ORIENTATION' as LearningStage]));
        copy[idx] = { ...copy[idx], stagesCompleted: stages };
        return copy;
      }
      return prev;
    });
  };

  const completeSimulation = async (studentId: string, lessonId: string) => {
    try {
      await fetch('/api/results', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'COMPLETE_SIMULATION',
          studentId,
          lessonId,
        }),
      });
    } catch (e) {
      console.warn('Complete simulation sync failed:', e);
    }

    setResults((prev) => {
      const idx = prev.findIndex((r) => r.studentId === studentId && r.lessonId === lessonId);
      if (idx >= 0) {
        const copy = [...prev];
        const stages = Array.from(new Set([...(copy[idx].stagesCompleted || []), 'SIMULATION' as LearningStage]));
        copy[idx] = { ...copy[idx], stagesCompleted: stages };
        return copy;
      }
      return prev;
    });
  };

  const submitPostTest = async (
    studentId: string,
    studentName: string,
    studentEmail: string,
    lessonId: string,
    answers: Record<string, string>
  ) => {
    const postQuestions = getQuestionsForLesson(lessonId, 'POST_TEST');
    let correct = 0;
    postQuestions.forEach((q) => {
      const studentAns = answers[q.id];
      if (studentAns && studentAns.trim().toUpperCase() === q.correctAnswer.trim().toUpperCase()) {
        correct += 1;
      }
    });
    const calculatedPostScore = postQuestions.length > 0 ? Math.round((correct / postQuestions.length) * 100) : 0;

    const existing = getStudentResultForLesson(studentId, lessonId);
    const preScore = existing?.preTestScore ?? 0;

    // N-Gain Calculation: (Post - Pre) / (100 - Pre)
    let calculatedGain = 0;
    if (preScore >= 100) {
      calculatedGain = calculatedPostScore >= 100 ? 1 : 0;
    } else {
      calculatedGain = Math.round(((calculatedPostScore - preScore) / (100 - preScore)) * 100) / 100;
    }

    let updatedResult: StudentResult = {
      ...(existing || {
        id: `res-${Date.now()}`,
        studentId,
        studentName,
        studentEmail,
        lessonId,
        preTestScore: preScore,
        completedAt: new Date().toISOString(),
      }),
      postTestScore: calculatedPostScore,
      nGain: calculatedGain,
      score: calculatedPostScore,
      postAnswers: answers,
      stagesCompleted: Array.from(new Set([...(existing?.stagesCompleted || []), 'POST_TEST' as LearningStage])),
    };

    try {
      const res = await fetch('/api/results', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'SUBMIT_POST_TEST',
          studentId,
          studentName,
          studentEmail,
          lessonId,
          answers,
        }),
      });
      if (res.ok) {
        const data = await res.json();
        if (data.success && data.result) {
          updatedResult = data.result;
        }
      }
    } catch (e) {
      console.warn('Saving post-test to server failed:', e);
    }

    setResults((prev) => {
      const idx = prev.findIndex((r) => r.studentId === studentId && r.lessonId === lessonId);
      if (idx >= 0) {
        const copy = [...prev];
        copy[idx] = updatedResult;
        return copy;
      }
      return [updatedResult, ...prev];
    });

    return { score: calculatedPostScore, nGain: calculatedGain, result: updatedResult };
  };

  const submitReflection = async (
    studentId: string,
    lessonId: string,
    reflectionAnswers: Record<number, string>
  ) => {
    try {
      await fetch('/api/results', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'SUBMIT_REFLECTION',
          studentId,
          lessonId,
          reflectionAnswers,
        }),
      });
    } catch (e) {
      console.warn('Saving reflection to server failed:', e);
    }

    setResults((prev) => {
      const idx = prev.findIndex((r) => r.studentId === studentId && r.lessonId === lessonId);
      if (idx >= 0) {
        const copy = [...prev];
        copy[idx] = {
          ...copy[idx],
          reflectionAnswers,
          stagesCompleted: Array.from(new Set([...(copy[idx].stagesCompleted || []), 'REFLECTION' as LearningStage])),
        };
        return copy;
      }
      return prev;
    });
  };

  const submitParagraphAnswer = async (
    studentId: string,
    studentName: string,
    studentEmail: string,
    lessonId: string,
    blockId: string,
    answerText: string
  ) => {
    try {
      await fetch('/api/results', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'SUBMIT_PARAGRAPH_ANSWER',
          studentId,
          studentName,
          studentEmail,
          lessonId,
          blockId,
          answerText,
        }),
      });
    } catch (e) {
      console.warn('Saving paragraph answer to server failed:', e);
    }

    setResults((prev) => {
      const idx = prev.findIndex((r) => r.studentId === studentId && r.lessonId === lessonId);
      if (idx >= 0) {
        const copy = [...prev];
        copy[idx] = {
          ...copy[idx],
          paragraphAnswers: {
            ...(copy[idx].paragraphAnswers || {}),
            [blockId]: answerText,
          },
        };
        return copy;
      }
      // Create a stub result entry if none exists
      const stub = {
        id: `res-para-${Date.now()}`,
        studentId,
        studentName,
        studentEmail,
        lessonId,
        preTestScore: 0,
        postTestScore: 0,
        nGain: 0,
        score: 0,
        stagesCompleted: [] as LearningStage[],
        paragraphAnswers: { [blockId]: answerText },
        completedAt: new Date().toISOString(),
      };
      return [stub, ...prev];
    });
  };

  const getParagraphAnswer = (studentId: string, lessonId: string, blockId: string): string => {
    const result = results.find((r) => r.studentId === studentId && r.lessonId === lessonId);
    return result?.paragraphAnswers?.[blockId] || '';
  };

  // Teacher CRUD methods
  const updateLesson = async (updatedLesson: Lesson) => {
    try {
      await fetch('/api/lessons', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedLesson),
      });
    } catch (e) {
      console.warn('Saving updated lesson to server failed:', e);
    }

    setLessons((prev) => prev.map((l) => (l.id === updatedLesson.id ? updatedLesson : l)));
  };

  const addContentBlock = async (lessonId: string, block: ContentBlock) => {
    const target = lessons.find((l) => l.id === lessonId);
    if (!target) return;
    const updated = {
      ...target,
      contentBlocks: [...target.contentBlocks, block],
    };
    await updateLesson(updated);
  };

  const updateContentBlock = async (lessonId: string, block: ContentBlock) => {
    const target = lessons.find((l) => l.id === lessonId);
    if (!target) return;
    const updated = {
      ...target,
      contentBlocks: target.contentBlocks.map((b) => (b.id === block.id ? block : b)),
    };
    await updateLesson(updated);
  };

  const deleteContentBlock = async (lessonId: string, blockId: string) => {
    const target = lessons.find((l) => l.id === lessonId);
    if (!target) return;
    const updated = {
      ...target,
      contentBlocks: target.contentBlocks.filter((b) => b.id !== blockId),
    };
    await updateLesson(updated);
  };

  const saveFillBlankAnswer = (studentId: string, blankId: string, text: string) => {
    StorageService.saveFillBlankAnswer(studentId, blankId, text);
  };

  const getFillBlankAnswer = (studentId: string, blankId: string): string => {
    const map = StorageService.getFillBlankAnswers(studentId);
    return map[blankId] || '';
  };

  const resetToDefault = () => {
    StorageService.resetAll();
    setLessons(PBL_LESSONS);
    setQuestions(PBL_QUESTIONS);
    setResults(INITIAL_STUDENT_RESULTS);
  };

  return (
    <DataContext.Provider
      value={{
        lessons,
        results,
        questions,
        isLoading,
        getLesson,
        getQuestionsForLesson,
        getStudentResultForLesson,
        isStageUnlocked,
        submitPreTest,
        completePblOrientation,
        completeSimulation,
        submitPostTest,
        submitReflection,
        submitParagraphAnswer,
        getParagraphAnswer,
        updateLesson,
        addContentBlock,
        updateContentBlock,
        deleteContentBlock,
        saveFillBlankAnswer,
        getFillBlankAnswer,
        resetToDefault,
        refetchData: fetchDatabaseData,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
}
