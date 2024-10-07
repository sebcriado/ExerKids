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
        console.error("Error fetching exercises:", error);
        return;
      }

      // Transformation et validation des données
      const validExercises: Exercise[] = (data as unknown as ExerciseRaw[])
        .filter((item) => {
          const isValid =
            typeof item.id === "number" &&
            typeof item.name === "string" &&
            typeof item.description === "string" &&
            typeof item.difficulty === "number" &&
            typeof item.age === "number" &&
            typeof item.category === "object" &&
            item.category !== null &&
            typeof item.category.name === "string";

          if (!isValid) {
            console.warn("Invalid exercise:", item);
            console.warn("Validation details:", {
              id: typeof item.id === "number",
              name: typeof item.name === "string",
              description: typeof item.description === "string",
              difficulty: typeof item.difficulty === "number",
              age: typeof item.age === "number",
              categoryObject: typeof item.category === "object",
              categoryNotNull: item.category !== null,
              categoryName: typeof item.category?.name === "string",
            });
          }

          return isValid;
        })
        .map((item) => ({
          ...item,
          category: item.category,
        }));

      setExercises(validExercises);
    };

    fetchExercises();
  }, []);

  return exercises;
};
