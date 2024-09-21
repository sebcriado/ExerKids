export interface ExerciseRaw {
  id: number;
  name: string;
  description: string;
  difficulty: number;
  age: number;
  category: { name: string }[];
}

export interface Exercise {
  id: number;
  name: string;
  description: string;
  difficulty: number;
  age: number;
  category: { name: string };
}
