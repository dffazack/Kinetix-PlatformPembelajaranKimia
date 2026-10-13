export type UserRole = 'STUDENT' | 'TEACHER';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  school?: string;
  avatar?: string;
}

export type ContentBlockType = 
  | 'text' 
  | 'heading' 
  | 'callout' 
  | 'equation' 
  | 'image' 
  | 'video' 
  | 'fill_blank' 
  | 'experiment_cta';

export interface ContentBlock {
  id: string;
  type: ContentBlockType;
  content: string; // Markdown / text / URL / JSON string
  metadata?: {
    caption?: string;
    variant?: 'info' | 'warning' | 'tip' | 'formula';
    blankId?: string;
    correctAnswer?: string;
    acceptableAnswers?: string[];
    hint?: string;
    experimentType?: string;
    buttonLabel?: string;
  };
}

export type QuestionTestType = 'PRE_TEST' | 'POST_TEST';
export type QuestionCategory = 'DIAGNOSTIC' | 'MISCONCEPTION' | 'SYMBOLIC' | 'VISUAL' | 'HOTS' | 'SUBMICROSCOPIC' | 'APPLICATION';

export interface Question {
  id: string;
  lessonId: string;
  testType?: QuestionTestType;
  category?: QuestionCategory;
  orderIndex: number;
  type: 'MULTIPLE_CHOICE' | 'FILL_BLANK' | 'ESSAY';
  questionText: string;
  options?: string[]; // e.g. ["A. ...", "B. ...", "C. ...", "D. ..."]
  correctAnswer: string;
  explanation?: string; // Kunci jawaban & pembahasan komprehensif
}

export type SimulationType = 
  | 'COLLISION_THEORY' 
  | 'FACTORS_REACTION' 
  | 'ACTIVATION_ENERGY' 
  | 'RATE_LAW' 
  | 'INDUSTRIAL_KINETICS'
  | 'CONCENTRATION_TIME';

export interface Lesson {
  id: string;
  orderNumber: number; // 1 to 5 (Pertemuan 1 - 5)
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  duration: string;
  videoUrl?: string;
  objectives: string[];
  pblProblem?: string; // Deskripsi Orientasi Masalah PBL
  simulationType: SimulationType;
  hasSimulation?: boolean;
  reflectionPrompts?: string[];
  contentBlocks: ContentBlock[];
}

export type LearningStage = 'PRE_TEST' | 'ORIENTATION' | 'SIMULATION' | 'POST_TEST' | 'REFLECTION';

export interface StudentResult {
  id: string;
  studentId: string;
  studentName: string;
  studentEmail: string;
  lessonId: string;
  preTestScore?: number; // 0 - 100
  postTestScore?: number; // 0 - 100
  nGain?: number; // (Post - Pre) / (100 - Pre)
  score: number; // for general/backward compatibility
  correctCount?: number;
  totalQuestions?: number;
  preAnswers?: Record<string, string>; // questionId -> studentAnswer
  postAnswers?: Record<string, string>; // questionId -> studentAnswer
  mcAnswers?: Record<string, string>;
  fillAnswers?: Record<string, string>;
  reflectionAnswers?: Record<number, string>; // promptIndex -> studentText
  stagesCompleted?: LearningStage[];
  feedback?: string;
  completedAt: string;
  updatedAt?: string;
}
