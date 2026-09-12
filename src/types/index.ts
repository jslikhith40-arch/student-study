export type UserRole = 'student' | 'faculty' | 'admin';

export interface UserProfile {
  uid: string;
  fullName: string;
  email: string;
  phone?: string;
  profileImage?: string;
  collegeId: string;
  collegeName: string;
  courseId: string;
  courseName: string;
  branchId: string;
  branchName: string;
  year: string; // e.g. "3rd Year"
  semester: string; // e.g. "Semester 1"
  rollNumber: string;
  role: UserRole;
  emailVerified: boolean;
  authProvider: string;
  accountStatus: 'active' | 'suspended' | 'pending';
  createdAt: string;
  updatedAt: string;
  lastLoginAt: string;
}

export interface Course {
  id: string;
  name: string;
  code: string;
  description: string;
  iconName: string;
  level: string; // Undergraduate, Postgraduate, Diploma
}

export interface Branch {
  id: string;
  courseId: string;
  name: string;
  code: string;
  yearsCount: number;
}

export interface AcademicSemester {
  id: string;
  branchId: string;
  year: number; // 1, 2, 3, 4
  semesterNumber: number; // 1 to 8
  title: string;
}

export interface Subject {
  id: string;
  courseId: string;
  branchId: string;
  year: string;
  semester: string;
  name: string;
  code: string;
  facultyName: string;
  facultyEmail?: string;
  totalTopics: number;
  completedTopics?: number;
  progressPercent: number;
  credits: number;
}

export interface Topic {
  id: string;
  subjectId: string;
  title: string;
  description: string;
  order: number;
  pdfUrl?: string;
  pdfTitle?: string;
  pdfPageCount?: number;
  keyPoints?: string[];
  durationMinutes?: number;
  completed?: boolean;
}

export interface AttendanceRecord {
  id: string;
  studentId: string;
  subjectId: string;
  subjectName: string;
  subjectCode: string;
  totalClasses: number;
  attendedClasses: number;
  percentage: number;
  lastUpdated: string;
  history?: {
    date: string;
    status: 'present' | 'absent' | 'cancelled';
  }[];
}

export interface TimetableEntry {
  id: string;
  day: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday';
  subjectName: string;
  subjectCode: string;
  facultyName: string;
  room: string;
  startTime: string;
  endTime: string;
  isLab?: boolean;
}

export interface Assignment {
  id: string;
  subjectId: string;
  subjectName: string;
  title: string;
  description: string;
  dueDate: string;
  maxMarks: number;
  status: 'pending' | 'submitted' | 'late' | 'completed';
  submissionUrl?: string;
  submittedAt?: string;
  grade?: string;
  feedback?: string;
}

export interface ExamEntry {
  id: string;
  subjectName: string;
  subjectCode: string;
  examType: 'Internal' | 'Mid-Term' | 'Semester' | 'Practical';
  date: string;
  time: string;
  room: string;
  duration: string;
  syllabusCovered: string;
}

export interface ResultEntry {
  id: string;
  subjectName: string;
  subjectCode: string;
  internalMarks: number;
  maxInternal: number;
  externalMarks: number;
  maxExternal: number;
  totalMarks: number;
  grade: string;
  gradePoint: number;
  credits: number;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
}

export interface Quiz {
  id: string;
  subjectId: string;
  subjectName: string;
  topicTitle: string;
  title: string;
  durationMinutes: number;
  questions: QuizQuestion[];
}

export interface QuizAttempt {
  id: string;
  studentId: string;
  quizId: string;
  quizTitle: string;
  subjectName: string;
  score: number;
  totalQuestions: number;
  percentage: number;
  completedAt: string;
  userAnswers: number[];
}

export interface AIChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  content: string;
  language?: string;
  createdAt: string;
  helpful?: boolean;
}

export interface AIChatSession {
  id: string;
  studentId: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  messages: AIChatMessage[];
}

export interface Bookmark {
  id: string;
  studentId: string;
  type: 'topic' | 'pdf' | 'ai_response' | 'question' | 'note';
  title: string;
  subtitle?: string;
  contentSnippet?: string;
  referenceId?: string;
  createdAt: string;
}

export interface AppNotification {
  id: string;
  studentId: string;
  title: string;
  message: string;
  type: 'attendance' | 'assignment' | 'exam' | 'result' | 'notes' | 'quiz' | 'general';
  read: boolean;
  createdAt: string;
  actionUrl?: string;
}

export interface CodingProblem {
  id: string;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  category: 'Arrays' | 'Strings' | 'Linked Lists' | 'Trees' | 'Dynamic Programming' | 'Graphs';
  description: string;
  examples: {
    input: string;
    output: string;
    explanation?: string;
  }[];
  starterCode: {
    c: string;
    cpp: string;
    java: string;
    python: string;
    javascript: string;
  };
  solution: {
    language: string;
    code: string;
    explanation: string;
  };
}
