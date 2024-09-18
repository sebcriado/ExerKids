import { View, StyleSheet, TextInput, Text, Alert, Button } from "react-native";
import { FontAwesome6 } from "@expo/vector-icons";
import { useState } from "react";
import Colors from "@/constants/Colors";
import { Link, Stack } from "expo-router";
import { supabase } from "@/libs/supabase";

export default function SignInScreen() {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignIn = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) Alert.alert("Error", error.message);
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />
      <View>
        <Text style={styles.logoTitle}>ExerKids</Text>
        <Text style={styles.text}>
          Le compagnon qui fais progresser votre enfant{" "}
        </Text>
      </View>
      <View style={styles.inputView}>
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
      <View style={styles.inputView}>
        <Text style={styles.inputLabel}>Mot de passe :</Text>
        <View style={styles.secureView}>
          <TextInput
            style={styles.secureInput}
            secureTextEntry={!showPassword}
            onChangeText={setPassword}
            value={password}
          />
          <FontAwesome6
            onPress={() => setShowPassword(!showPassword)}
            name={showPassword ? "eye" : "eye-slash"}
            size={20}
            color="black"
            style={{ marginRight: 5 }}
          />
        </View>
      </View>

      <Button
        title={loading ? "Connexion ..." : "Connexion"}
        onPress={handleSignIn}
        color={"#FFE5D9"}
      />
      <Link href={"/sign-up"} asChild>
        <Button title="Pas de compte ?" color={"#FFE5D9"} />
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
    width: "60%",
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
  secureView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: "white",
    height: 40,
  },
  secureInput: {
    width: "80%",
    padding: 10,
  },
  textButton: {
    alignSelf: "center",
    fontWeight: "bold",
    color: Colors.light.tint,
    marginVertical: 10,
  },
  logoTitle: {
    fontSize: 190,
    fontFamily: "Dongle",
    color: "#FFE5D9",
    textAlign: "center",
  },
  text: {
    fontSize: 32,
    fontFamily: "Dongle",
    color: "#FFE5D9",
    textAlign: "center",
  },
  button: {
    backgroundColor: "#FFE5D9",
    borderRadius: 10,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
  },
});
