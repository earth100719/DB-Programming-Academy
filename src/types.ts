export interface CodeExample {
  id: string;
  title: string;
  level: "basic" | "intermediate" | "applied";
  code: string;
  lineByLine: string[];
  output: string;
}

export interface CommonError {
  errorType: string;
  cause: string;
  solution: string;
  badCode: string;
  goodCode: string;
}

export interface Exercise {
  id: string;
  title: string;
  difficulty: "easy" | "medium" | "hard";
  description: string;
  hint: string;
  detailedSolution: string;
  solutionCode: string;
}

export interface Topic {
  id: string;
  slug: string;
  title: string;
  description: string;
  syntax: string;
  examples: CodeExample[];
  commonErrors: CommonError[];
  exercises: Exercise[];
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  answerIndex: number;
  explanation: string;
}

export interface Chapter {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  topics: Topic[];
  quizzes: QuizQuestion[];
}

export interface UserStats {
  favorites: string[]; // example IDs
  quizScores: Record<number, number>; // chapter ID -> best score (max 10)
  completedTopics: string[]; // topic IDs
}
