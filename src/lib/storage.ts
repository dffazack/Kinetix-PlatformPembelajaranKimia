import { Lesson, Question, StudentResult, User } from './types';
import { INITIAL_LESSONS, QUESTIONS_BANK } from './data/lessonsData';

// Initial pre-seeded users
export const SEED_USERS: User[] = [
  {
    id: 'teacher-1',
    email: 'guru@kinetix.id',
    name: 'Dra. Siti Rahmawati, M.Pd.',
    role: 'TEACHER',
    school: 'SMA Negeri 1 Sains Kimia',
    avatar: '👩‍🏫',
  },
  {
    id: 'student-1',
    email: 'budi@siswa.kinetix.id',
    name: 'Budi Pratama',
    role: 'STUDENT',
    school: 'SMA Negeri 1 Sains Kimia - XI MIPA 1',
    avatar: '👨‍🎓',
  },
  {
    id: 'student-2',
    email: 'aulia@siswa.kinetix.id',
    name: 'Aulia Zahra',
    role: 'STUDENT',
    school: 'SMA Negeri 1 Sains Kimia - XI MIPA 1',
    avatar: '👩‍🎓',
  },
  {
    id: 'student-3',
    email: 'dimas@siswa.kinetix.id',
    name: 'Dimas Wahyu',
    role: 'STUDENT',
    school: 'SMA Negeri 1 Sains Kimia - XI MIPA 2',
    avatar: '🧑‍🎓',
  }
];

// Initial pre-seeded student results for teacher dashboard demo
export const SEED_RESULTS: StudentResult[] = [
  {
    id: 'res-1',
    studentId: 'student-1',
    studentName: 'Budi Pratama',
    studentEmail: 'budi@siswa.kinetix.id',
    lessonId: 'kb-1',
    score: 90,
    correctCount: 9,
    totalQuestions: 10,
    mcAnswers: {
      'kb1-mc-1': 'A', 'kb1-mc-2': 'B', 'kb1-mc-3': 'C', 'kb1-mc-4': 'B', 'kb1-mc-5': 'C',
      'kb1-mc-6': 'B', 'kb1-mc-7': 'A', 'kb1-mc-8': 'A', 'kb1-mc-9': 'B', 'kb1-mc-10': 'C'
    },
    fillAnswers: {
      'kb1-q1': '0,02'
    },
    feedback: 'Pemahaman konsep dasar laju sangat baik!',
    completedAt: '2026-09-26T14:32:00.000Z'
  },
  {
    id: 'res-2',
    studentId: 'student-1',
    studentName: 'Budi Pratama',
    studentEmail: 'budi@siswa.kinetix.id',
    lessonId: 'kb-2',
    score: 100,
    correctCount: 10,
    totalQuestions: 10,
    mcAnswers: {
      'kb2-mc-1': 'B', 'kb2-mc-2': 'C', 'kb2-mc-3': 'A', 'kb2-mc-4': 'B', 'kb2-mc-5': 'C',
      'kb2-mc-6': 'A', 'kb2-mc-7': 'C', 'kb2-mc-8': 'A', 'kb2-mc-9': 'B', 'kb2-mc-10': 'C'
    },
    fillAnswers: {
      'kb2-q1': 'pemantulan kembali'
    },
    feedback: 'Sempurna dalam teori tumbukan.',
    completedAt: '2026-09-26T15:10:00.000Z'
  },
  {
    id: 'res-3',
    studentId: 'student-2',
    studentName: 'Aulia Zahra',
    studentEmail: 'aulia@siswa.kinetix.id',
    lessonId: 'kb-1',
    score: 100,
    correctCount: 10,
    totalQuestions: 10,
    mcAnswers: {
      'kb1-mc-1': 'A', 'kb1-mc-2': 'B', 'kb1-mc-3': 'C', 'kb1-mc-4': 'B', 'kb1-mc-5': 'C',
      'kb1-mc-6': 'B', 'kb1-mc-7': 'A', 'kb1-mc-8': 'A', 'kb1-mc-9': 'B', 'kb1-mc-10': 'D'
    },
    fillAnswers: {
      'kb1-q1': '0.02'
    },
    feedback: 'Kerja luar biasa!',
    completedAt: '2026-09-26T16:05:00.000Z'
  },
  {
    id: 'res-4',
    studentId: 'student-2',
    studentName: 'Aulia Zahra',
    studentEmail: 'aulia@siswa.kinetix.id',
    lessonId: 'kb-4',
    score: 80,
    correctCount: 8,
    totalQuestions: 10,
    mcAnswers: {
      'kb4-mc-1': 'D', 'kb4-mc-2': 'B', 'kb4-mc-3': 'C', 'kb4-mc-4': 'C', 'kb4-mc-5': 'B',
      'kb4-mc-6': 'A', 'kb4-mc-7': 'C', 'kb4-mc-8': 'A', 'kb4-mc-9': 'A', 'kb4-mc-10': 'C'
    },
    fillAnswers: {
      'kb4-q1': '6'
    },
    feedback: 'Bagus, perlu perhatikan ulang metode tanda silang Na2S2O3.',
    completedAt: '2026-09-27T09:40:00.000Z'
  },
  {
    id: 'res-5',
    studentId: 'student-3',
    studentName: 'Dimas Wahyu',
    studentEmail: 'dimas@siswa.kinetix.id',
    lessonId: 'kb-1',
    score: 70,
    correctCount: 7,
    totalQuestions: 10,
    mcAnswers: {
      'kb1-mc-1': 'A', 'kb1-mc-2': 'B', 'kb1-mc-3': 'C', 'kb1-mc-4': 'A', 'kb1-mc-5': 'C',
      'kb1-mc-6': 'A', 'kb1-mc-7': 'A', 'kb1-mc-8': 'B', 'kb1-mc-9': 'B', 'kb1-mc-10': 'D'
    },
    fillAnswers: {
      'kb1-q1': '0,04'
    },
    feedback: 'Pelajari kembali perbandingan koefisien stoikiometri.',
    completedAt: '2026-09-27T10:15:00.000Z'
  }
];

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
    if (typeof window === 'undefined') return INITIAL_LESSONS;
    const raw = localStorage.getItem(STORAGE_KEYS.LESSONS);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.LESSONS, JSON.stringify(INITIAL_LESSONS));
      return INITIAL_LESSONS;
    }
    try {
      return JSON.parse(raw);
    } catch {
      return INITIAL_LESSONS;
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

  deleteLesson(lessonId: string): void {
    const lessons = this.getLessons().filter(l => l.id !== lessonId);
    this.saveLessons(lessons);
  },

  getQuestions(lessonId?: string): Record<string, Question[]> {
    if (typeof window === 'undefined') return QUESTIONS_BANK;
    const raw = localStorage.getItem(STORAGE_KEYS.QUESTIONS);
    let bank = QUESTIONS_BANK;
    if (raw) {
      try {
        bank = JSON.parse(raw);
      } catch {
        bank = QUESTIONS_BANK;
      }
    } else {
      localStorage.setItem(STORAGE_KEYS.QUESTIONS, JSON.stringify(QUESTIONS_BANK));
    }
    return bank;
  },

  saveQuestions(bank: Record<string, Question[]>): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem(STORAGE_KEYS.QUESTIONS, JSON.stringify(bank));
  },

  getStudentResults(): StudentResult[] {
    if (typeof window === 'undefined') return SEED_RESULTS;
    const raw = localStorage.getItem(STORAGE_KEYS.RESULTS);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.RESULTS, JSON.stringify(SEED_RESULTS));
      return SEED_RESULTS;
    }
    try {
      return JSON.parse(raw);
    } catch {
      return SEED_RESULTS;
    }
  },

  saveStudentResult(result: StudentResult): void {
    if (typeof window === 'undefined') return;
    const list = this.getStudentResults();
    const existingIndex = list.findIndex(
      r => r.studentId === result.studentId && r.lessonId === result.lessonId
    );
    if (existingIndex >= 0) {
      list[existingIndex] = result;
    } else {
      list.push(result);
    }
    localStorage.setItem(STORAGE_KEYS.RESULTS, JSON.stringify(list));
  },

  getFillAnswer(studentId: string, blankId: string): string {
    if (typeof window === 'undefined') return '';
    try {
      const raw = localStorage.getItem(`${STORAGE_KEYS.FILL_ANSWERS}_${studentId}`);
      if (!raw) return '';
      const map = JSON.parse(raw);
      return map[blankId] || '';
    } catch {
      return '';
    }
  },

  saveFillAnswer(studentId: string, blankId: string, answer: string): void {
    if (typeof window === 'undefined') return;
    try {
      const key = `${STORAGE_KEYS.FILL_ANSWERS}_${studentId}`;
      const raw = localStorage.getItem(key);
      const map = raw ? JSON.parse(raw) : {};
      map[blankId] = answer;
      localStorage.setItem(key, JSON.stringify(map));
    } catch (e) {
      console.error('Failed to save fill answer', e);
    }
  }
};
