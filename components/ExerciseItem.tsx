import React from "react";
import { View, Text, Dimensions } from "react-native";
import { Exercise } from "@/types/Exercice";
import { styles } from "@/styles/exerciceStyles";
import { COLORS } from "@/styles/colors";

interface ExerciseItemProps {
  item: Exercise;
}

const { width } = Dimensions.get("window");

export const ExerciseItem: React.FC<ExerciseItemProps> = ({ item }) => (
  <View style={styles.item}>
    <Text style={styles.title}>{item.name}</Text>
    <Text style={styles.text}>{item.description}</Text>
    <Text style={styles.difficulty}>Difficulté: {item.difficulty}/5</Text>
    <View style={styles.infoWrapper}>
      <Text style={styles.age}>À partir de {item.age} ans</Text>
      <Text style={[styles.category, { width: width < 400 ? "40%" : "20%" }]}>
        {item.category.name}
      </Text>
    </View>
  </View>
);
