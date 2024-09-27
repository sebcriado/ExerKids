import { StyleSheet } from "react-native";
import { COLORS } from "./colors";

export const styles = StyleSheet.create({
  item: {
    padding: 20,
    display: "flex",
    flexDirection: "column",
    gap: 10,
    backgroundColor: COLORS.PRIMARY,
    borderRadius: 20,
  },
  title: {
    color: COLORS.WHITE,
    fontSize: 40,
    fontFamily: "Dongle",
  },
  text: {
    color: COLORS.WHITE,
    fontSize: 16,
  },
  difficulty: {
    color: COLORS.WHITE,
    fontSize: 16,
    fontWeight: "bold",
  },
  age: {
    color: COLORS.WHITE,
    fontSize: 18,
    fontWeight: "bold",
  },
  list: {
    padding: 20,
  },
  category: {
    fontSize: 14,
    padding: 10,
    fontWeight: "bold",
    backgroundColor: COLORS.SECONDARY,
    color: COLORS.PRIMARY,
    textAlign: "center",
  },
  infoWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: COLORS.PRIMARY,
  },
});
