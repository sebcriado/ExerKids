import { useState, useEffect } from "react";
import { supabase } from "@/libs/supabase";
import { Exercise, ExerciseRaw } from "@/types/Exercice";

export const useExercises = () => {
  const [exercises, setExercises] = useState<Exercise[]>([]);

  useEffect(() => {
    const fetchExercises = async () => {
      const { data, error } = await supabase
        .from("exercice")
        .select(
          "id, name, description, difficulty, age, category:category_id(name)"
        );

      if (error) {
        console.error(error);
        return;
      }

      // Transformation et validation des données
      const validExercises: Exercise[] = (data as ExerciseRaw[])
        .filter(
          (item): item is ExerciseRaw =>
            typeof item.id === "number" &&
            typeof item.name === "string" &&
            typeof item.description === "string" &&
            typeof item.difficulty === "number" &&
            typeof item.age === "number" &&
            Array.isArray(item.category) &&
            item.category.length > 0 &&
            typeof item.category[0].name === "string"
        )
        .map((item) => ({
          ...item,
          category: item.category[0], // Prend le premier élément du tableau
        }));

      setExercises(validExercises);
    };

    fetchExercises();
  }, []);

  return exercises;
};
