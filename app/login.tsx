import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { signInWithEmailAndPassword } from "firebase/auth";
import { get, ref } from "firebase/database";
import { useState } from "react";
import {
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { auth, database } from "../firebaseConfig";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const router = useRouter();

  const handleLogin = async () => {
    if (!email || !senha) {
      Alert.alert("Erro", "Preencha todos os campos.");
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, senha);
      const user = userCredential.user;

      const userRef = ref(database, `usuarios/${user.uid}`);
      const snapshot = await get(userRef);

      // if (snapshot.exists()) {
      //   console.log("Usuário autenticado:", snapshot.val());
      // } else {
      //   console.warn("Usuário autenticado mas sem dados no banco.");
      // }

      router.replace("/(tabs)"); // redireciona para as tabs
    } catch (error: any) {
      let mensagem = "Erro ao fazer login";

      switch (error.code) {
        case "auth/invalid-email":
          mensagem = "E-mail inválido.";
          break;
        case "auth/user-not-found":
          mensagem = "Usuário não encontrado.";
          break;
        case "auth/wrong-password":
          mensagem = "Senha incorreta.";
          break;
        case "auth/too-many-requests":
          mensagem = "Muitas tentativas. Tente novamente mais tarde.";
          break;
         case "auth/invalid-credential":
          mensagem = "Dados inválidos";
          break;
        case "auth/internal-error":
          mensagem = "Erro interno. Verifique os campos preenchidos.";
          break;
        default:
          mensagem = error.message;
          break;
      }

      Alert.alert("Erro ao fazer login", mensagem);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 80 : 0}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
          <View style={styles.scroll}>
            <View style={styles.iconContainer}>
              <Ionicons name="cube-outline" size={120} color="#00AEEF" />
            </View>

            <View style={styles.form}>
              <Text style={styles.label}>E-mail:</Text>
              <TextInput
                style={styles.input}
                placeholder="E-mail"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
              />

              <Text style={styles.label}>Senha:</Text>
              <TextInput
                style={styles.input}
                placeholder="Senha"
                value={senha}
                onChangeText={setSenha}
                secureTextEntry
              />

              <TouchableOpacity style={styles.button} onPress={handleLogin}>
                <Text style={styles.buttonText}>Entrar</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => router.push("/cadastro")}>
                <Text style={styles.register}>Cadastre-se</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, backgroundColor: "#CFEAFF", justifyContent: "center", paddingHorizontal: 24 },
  scroll: { flex: 1, justifyContent: "center" },
  iconContainer: { alignItems: "center", marginBottom: 32 },
  form: { width: "100%" },
  label: { marginBottom: 4, color: "#003366" },
  input: {
    backgroundColor: "#fff", padding: 12, borderRadius: 8,
    marginBottom: 16, fontSize: 16, borderColor: "#c0e0ff", borderWidth: 1,
  },
  button: {
    backgroundColor: "#004c6d", paddingVertical: 14, borderRadius: 8,
    alignItems: "center", marginTop: 8, marginBottom: 24,
  },
  buttonText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
  register: { color: "#004c6d", textAlign: "center", textDecorationLine: "underline", fontSize: 15 },
});
