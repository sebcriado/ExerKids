import {
  View,
  StyleSheet,
  TextInput,
  Text,
  Alert,
  Button,
  Dimensions,
} from "react-native";
import { useState } from "react";
import { supabase } from "@/libs/supabase";
import { Link, Stack } from "expo-router";

const { width } = Dimensions.get("window");

export default function ForgotPasswordScreen() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleResetPassword = async () => {
    setLoading(true);
    const { error } = await supabase.auth.resetPasswordForEmail(email);
    if (error) Alert.alert("Erreur", error.message);
    else
      Alert.alert(
        "Succès",
        "Un lien pour réinitialiser votre mot de passe a été envoyé à votre adresse email."
      );
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />
      <View style={[styles.inputView, { width: width < 400 ? "80%" : "60%" }]}>
        <Text style={styles.inputLabel}>Email :</Text>
        <TextInput
          style={styles.emailInput}
          placeholder="test@test.fr"
          keyboardType="email-address"
          onChangeText={setEmail}
          value={email}
          autoCapitalize="none"
        />
      </View>
      <Button
        title={loading ? "Envoi en cours ..." : "Réinitialiser"}
        onPress={handleResetPassword}
        color={"#FFE5D9"}
      />
      <Link href={"/sign-in"} asChild>
        <Button title="Retour" color={"#FFE5D9"} />
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    gap: 10,
    padding: 10,
    backgroundColor: "#2D6A4F",
  },
  inputView: {
    gap: 5,
    alignSelf: "center",
  },
  inputLabel: {
    color: "white",
    fontSize: 16,
  },
  emailInput: {
    borderWidth: 1,
    backgroundColor: "white",
    borderRadius: 10,
    height: 40,
    padding: 10,
  },
});
