import React from "react";
import { FlatList, View } from "react-native";
import { useExercises } from "@/hooks/useExercises";
import { ExerciseItem } from "@/components/ExerciseItem";
import { styles } from "@/styles/exerciceStyles";

export default function HomeScreen() {
  const exercises = useExercises();

  return (
    <FlatList
      data={exercises}
      renderItem={({ item }) => <ExerciseItem item={item} />}
      keyExtractor={(item) => item.id.toString()}
      style={styles.list}
      ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
    />
  );
}
