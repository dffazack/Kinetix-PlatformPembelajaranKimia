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

export interface Question {
  id: string;
  lessonId: string;
  orderIndex: number;
  type: 'MULTIPLE_CHOICE' | 'FILL_BLANK';
  questionText: string;
  options?: string[]; // e.g. ["A. ...", "B. ...", "C. ...", "D. ..."]
  correctAnswer: string;
  explanation: string;
}

export interface Lesson {
  id: string;
  orderNumber: number; // 1 to 6
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  duration: string;
  objectives: string[];
  simulationType: 'CONCENTRATION_TIME' | 'COLLISION_THEORY' | 'ACTIVATION_ENERGY' | 'FACTORS_REACTION' | 'RATE_LAW' | 'INDUSTRIAL_KINETICS';
  contentBlocks: ContentBlock[];
}

export interface StudentResult {
  id: string;
  studentId: string;
  studentName: string;
  studentEmail: string;
  lessonId: string;
  score: number; // 0 - 100
  correctCount: number;
  totalQuestions: number;
  mcAnswers: Record<string, string>; // questionId -> option letter
  fillAnswers: Record<string, string>; // blankId -> student text
  feedback?: string;
  completedAt: string;
}
