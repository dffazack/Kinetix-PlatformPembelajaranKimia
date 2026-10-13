import { Lesson, Question, StudentResult, User } from './types';
import { PBL_LESSONS, PBL_QUESTIONS, SEED_USERS, INITIAL_STUDENT_RESULTS } from './data/pblCurriculumData';

export { SEED_USERS };
export const SEED_RESULTS: StudentResult[] = INITIAL_STUDENT_RESULTS;

const STORAGE_KEYS = {
  USER: 'kinetix_current_user',
  USERS_LIST: 'kinetix_users_list',
  LESSONS: 'kinetix_lessons',
  QUESTIONS: 'kinetix_questions',
  RESULTS: 'kinetix_student_results',
  FILL_ANSWERS: 'kinetix_fill_answers',
};

export const StorageService = {
  // Get currently logged-in user
  getCurrentUser(): User | null {
    if (typeof window === 'undefined') return null;
    const raw = localStorage.getItem(STORAGE_KEYS.USER);
    if (!raw) return null;
    try {
      return JSON.parse(raw);
    } catch {
      return null;
    }
  },

  setCurrentUser(user: User | null): void {
    if (typeof window === 'undefined') return;
    if (user) {
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
    } else {
      localStorage.removeItem(STORAGE_KEYS.USER);
    }
  },

  getUsers(): User[] {
    if (typeof window === 'undefined') return SEED_USERS;
    const raw = localStorage.getItem(STORAGE_KEYS.USERS_LIST);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.USERS_LIST, JSON.stringify(SEED_USERS));
      return SEED_USERS;
    }
    try {
      return JSON.parse(raw);
    } catch {
      return SEED_USERS;
    }
  },

  saveUser(newUser: User): void {
    if (typeof window === 'undefined') return;
    const users = this.getUsers();
    const existingIndex = users.findIndex(u => u.email.toLowerCase() === newUser.email.toLowerCase());
    if (existingIndex >= 0) {
      users[existingIndex] = newUser;
    } else {
      users.push(newUser);
    }
    localStorage.setItem(STORAGE_KEYS.USERS_LIST, JSON.stringify(users));
  },

  getLessons(): Lesson[] {
    if (typeof window === 'undefined') return PBL_LESSONS;
    const raw = localStorage.getItem(STORAGE_KEYS.LESSONS);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.LESSONS, JSON.stringify(PBL_LESSONS));
      return PBL_LESSONS;
    }
    try {
      return JSON.parse(raw);
    } catch {
      return PBL_LESSONS;
    }
  },

  saveLessons(lessons: Lesson[]): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem(STORAGE_KEYS.LESSONS, JSON.stringify(lessons));
  },

  updateLesson(updatedLesson: Lesson): void {
    const lessons = this.getLessons();
    const idx = lessons.findIndex(l => l.id === updatedLesson.id);
    if (idx >= 0) {
      lessons[idx] = updatedLesson;
    } else {
      lessons.push(updatedLesson);
    }
    this.saveLessons(lessons);
  },

  getQuestions(): Record<string, Question[]> {
    const grouped: Record<string, Question[]> = {};
    PBL_QUESTIONS.forEach(q => {
      if (!grouped[q.lessonId]) grouped[q.lessonId] = [];
      grouped[q.lessonId].push(q);
    });
    return grouped;
  },

  getStudentResults(): StudentResult[] {
    if (typeof window === 'undefined') return INITIAL_STUDENT_RESULTS;
    const raw = localStorage.getItem(STORAGE_KEYS.RESULTS);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.RESULTS, JSON.stringify(INITIAL_STUDENT_RESULTS));
      return INITIAL_STUDENT_RESULTS;
    }
    try {
      return JSON.parse(raw);
    } catch {
      return INITIAL_STUDENT_RESULTS;
    }
  },

  saveStudentResult(result: StudentResult): void {
    if (typeof window === 'undefined') return;
    const results = this.getStudentResults();
    const existingIndex = results.findIndex(
      r => r.studentId === result.studentId && r.lessonId === result.lessonId
    );
    if (existingIndex >= 0) {
      results[existingIndex] = result;
    } else {
      results.unshift(result);
    }
    localStorage.setItem(STORAGE_KEYS.RESULTS, JSON.stringify(results));
  },

  getFillBlankAnswers(studentId: string): Record<string, string> {
    if (typeof window === 'undefined') return {};
    const raw = localStorage.getItem(`${STORAGE_KEYS.FILL_ANSWERS}_${studentId}`);
    if (!raw) return {};
    try {
      return JSON.parse(raw);
    } catch {
      return {};
    }
  },

  saveFillBlankAnswer(studentId: string, blankId: string, text: string): void {
    if (typeof window === 'undefined') return;
    const current = this.getFillBlankAnswers(studentId);
    current[blankId] = text;
    localStorage.setItem(`${STORAGE_KEYS.FILL_ANSWERS}_${studentId}`, JSON.stringify(current));
  },

  resetAll(): void {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(STORAGE_KEYS.LESSONS);
    localStorage.removeItem(STORAGE_KEYS.QUESTIONS);
    localStorage.removeItem(STORAGE_KEYS.RESULTS);
  }
};
