import { FlatList, StyleSheet } from "react-native";

import { Text, View } from "@/components/Themed";
import { supabase } from "@/libs/supabase";
import { useEffect, useState } from "react";

const fetchExercises = async () => {
  const { data, error } = await supabase
    .from("exercice")
    .select("id, name, description, difficulty, age");

  if (error) {
    console.error(error);
    return [];
  }
  console.log(data);

  return data;
};

export default function HomeScreen() {
  const [exercises, setExercises] = useState<any[]>([]);

  useEffect(() => {
    const getExercises = async () => {
      const data = await fetchExercises();
      setExercises(data);
    };
    getExercises();
  }, []);

  const renderItems = ({
    item,
  }: {
    item: {
      id: number;
      name: string;
      description: string;
      difficulty: number;
      age: number;
    };
  }) => {
    return (
      <View style={styles.item}>
        <Text style={styles.title}>{item.name}</Text>
        <Text style={styles.text}>{item.description}</Text>
        <Text style={styles.difficulty}>Difficulté: {item.difficulty}/5</Text>
        <Text style={styles.age}>À partir de {item.age} ans</Text>
      </View>
    );
  };

  return (
    <FlatList
      data={exercises}
      renderItem={renderItems}
      keyExtractor={(item) => item.id.toString()}
      style={styles.list}
      ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
    />
  );
}

const styles = StyleSheet.create({
  item: {
    padding: 20,
    display: "flex",
    flexDirection: "column",
    gap: 10,
    backgroundColor: "#2D6A4F",
    borderRadius: 20,
  },
  title: {
    color: "white",
    fontSize: 40,
    fontFamily: "Dongle",
  },
  text: {
    color: "white",
    fontSize: 16,
  },
  difficulty: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  age: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  list: {
    padding: 20,
  },
});
