export interface Slide {
  id: string;
  title: string;
  content: string;
  imageUrl?: string;
  videoUrl?: string;
}

export interface Question {
  id: string;
  text: string;
  options: string[];
  correctAnswerIndex: number;
}

export interface Quiz {
  questions: Question[];
}

export interface Module {
  id: string;
  title: string;
  description: string;
  videoUrl?: string;
  content: string;
  order: number;
  category: string;
  slides: Slide[];
  quiz: Quiz;
  logo?: string;
}

export interface UserProfile {
  uid: string;
  username: string;
  completedModules: string[];
  createdAt: string;
}
