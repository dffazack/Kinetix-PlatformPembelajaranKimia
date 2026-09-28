'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { Lesson, Question, StudentResult, ContentBlock } from '@/lib/types';
import { StorageService } from '@/lib/storage';

interface DataContextType {
  lessons: Lesson[];
  results: StudentResult[];
  questionsBank: Record<string, Question[]>;
  isLoading: boolean;
  getLesson: (idOrSlug: string) => Lesson | undefined;
  getQuestionsForLesson: (lessonId: string) => Question[];
  getStudentResultForLesson: (studentId: string, lessonId: string) => StudentResult | undefined;
  submitEvaluation: (
    studentId: string,
    studentName: string,
    studentEmail: string,
    lessonId: string,
    mcAnswers: Record<string, string>,
    fillAnswers: Record<string, string>
  ) => { score: number; correctCount: number; total: number; result: StudentResult };
  saveFillBlankAnswer: (studentId: string, blankId: string, text: string) => void;
  getFillBlankAnswer: (studentId: string, blankId: string) => string;
  // Teacher KB management functions:
  updateLesson: (lesson: Lesson) => void;
  addContentBlock: (lessonId: string, block: ContentBlock) => void;
  updateContentBlock: (lessonId: string, block: ContentBlock) => void;
  deleteContentBlock: (lessonId: string, blockId: string) => void;
  resetToDefault: () => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export function DataProvider({ children }: { children: React.ReactNode }) {
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [results, setResults] = useState<StudentResult[]>([]);
  const [questionsBank, setQuestionsBank] = useState<Record<string, Question[]>>({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadedLessons = StorageService.getLessons();
    const loadedResults = StorageService.getStudentResults();
    const loadedQuestions = StorageService.getQuestions();
    setLessons(loadedLessons);
    setResults(loadedResults);
    setQuestionsBank(loadedQuestions);
    setIsLoading(false);
  }, []);

  const getLesson = (idOrSlug: string): Lesson | undefined => {
    return lessons.find(l => l.id === idOrSlug || l.slug === idOrSlug);
  };

  const getQuestionsForLesson = (lessonId: string): Question[] => {
    return questionsBank[lessonId] || [];
  };

  const getStudentResultForLesson = (studentId: string, lessonId: string): StudentResult | undefined => {
    return results.find(r => r.studentId === studentId && r.lessonId === lessonId);
  };

  const submitEvaluation = (
    studentId: string,
    studentName: string,
    studentEmail: string,
    lessonId: string,
    mcAnswers: Record<string, string>,
    fillAnswers: Record<string, string>
  ) => {
    const questions = getQuestionsForLesson(lessonId);
    let correctCount = 0;
    const total = questions.length;

    questions.forEach(q => {
      const studentAns = mcAnswers[q.id];
      if (studentAns && studentAns.trim().toUpperCase() === q.correctAnswer.trim().toUpperCase()) {
        correctCount += 1;
      }
    });

    const calculatedScore = total > 0 ? Math.round((correctCount / total) * 100) : 0;

    let feedback = 'Kerja yang bagus! Pelajari kembali materi yang belum dikuasai.';
    if (calculatedScore >= 90) feedback = 'Luar Biasa! Pemahaman konsep Anda sangat mendalam dan akurat.';
    else if (calculatedScore >= 75) feedback = 'Bagus! Anda telah melampaui kriteria ketuntasan minimal (KKM).';
    else if (calculatedScore >= 60) feedback = 'Cukup. Silakan ulangi simulasi dan pelajari kembali rangkuman materi.';
    else feedback = 'Perlu pendalaman lebih lanjut. Dianjurkan mencoba ulang eksperimen dan bertanya pada guru.';

    const newResult: StudentResult = {
      id: `res-${Date.now()}`,
      studentId,
      studentName,
      studentEmail,
      lessonId,
      score: calculatedScore,
      correctCount,
      totalQuestions: total,
      mcAnswers,
      fillAnswers,
      feedback,
      completedAt: new Date().toISOString()
    };

    StorageService.saveStudentResult(newResult);
    setResults(prev => {
      const idx = prev.findIndex(r => r.studentId === studentId && r.lessonId === lessonId);
      if (idx >= 0) {
        const copy = [...prev];
        copy[idx] = newResult;
        return copy;
      }
      return [...prev, newResult];
    });

    return { score: calculatedScore, correctCount, total, result: newResult };
  };

  const saveFillBlankAnswer = (studentId: string, blankId: string, text: string) => {
    StorageService.saveFillAnswer(studentId, blankId, text);
  };

  const getFillBlankAnswer = (studentId: string, blankId: string) => {
    return StorageService.getFillAnswer(studentId, blankId);
  };

  const updateLesson = (lesson: Lesson) => {
    StorageService.updateLesson(lesson);
    setLessons(prev => prev.map(l => l.id === lesson.id ? lesson : l));
  };

  const addContentBlock = (lessonId: string, block: ContentBlock) => {
    const lesson = lessons.find(l => l.id === lessonId);
    if (!lesson) return;
    const updated: Lesson = {
      ...lesson,
      contentBlocks: [...lesson.contentBlocks, block]
    };
    updateLesson(updated);
  };

  const updateContentBlock = (lessonId: string, block: ContentBlock) => {
    const lesson = lessons.find(l => l.id === lessonId);
    if (!lesson) return;
    const updated: Lesson = {
      ...lesson,
      contentBlocks: lesson.contentBlocks.map(b => b.id === block.id ? block : b)
    };
    updateLesson(updated);
  };

  const deleteContentBlock = (lessonId: string, blockId: string) => {
    const lesson = lessons.find(l => l.id === lessonId);
    if (!lesson) return;
    const updated: Lesson = {
      ...lesson,
      contentBlocks: lesson.contentBlocks.filter(b => b.id !== blockId)
    };
    updateLesson(updated);
  };

  const resetToDefault = () => {
    if (typeof window !== 'undefined') {
      localStorage.clear();
      window.location.reload();
    }
  };

  return (
    <DataContext.Provider
      value={{
        lessons,
        results,
        questionsBank,
        isLoading,
        getLesson,
        getQuestionsForLesson,
        getStudentResultForLesson,
        submitEvaluation,
        saveFillBlankAnswer,
        getFillBlankAnswer,
        updateLesson,
        addContentBlock,
        updateContentBlock,
        deleteContentBlock,
        resetToDefault,
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
