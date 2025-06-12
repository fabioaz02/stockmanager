import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { ref, set } from "firebase/database";
import { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { auth, database } from "../firebaseConfig";

export default function CadastroScreen() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [confirmaEmail, setConfirmaEmail] = useState("");
  const [senha, setSenha] = useState("");
  const router = useRouter();

  const handleCadastro = async () => {
    if (!nome || !email || !confirmaEmail || !senha) {
      Alert.alert("Erro", "Preencha todos os campos.");
      return;
    }

    if (email !== confirmaEmail) {
      Alert.alert("Erro", "Os e-mails não coincidem.");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, senha);
      const user = userCredential.user;

      await updateProfile(user, { displayName: nome });

      await set(ref(database, `usuarios/${user.uid}`), {
        uid: user.uid,
        nome,
        email,
        tipo: "estoquista",
        criadoEm: new Date().toISOString(),
      });

      router.replace("/"); // redireciona para as tabs
    } catch (error: any) {
      Alert.alert("Erro ao cadastrar", error.message);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={100}
    >
      <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
        <View style={styles.iconContainer}>
          <Ionicons name="person-add-outline" size={120} color="#00AEEF" />
        </View>

        <View style={styles.form}>
          <Text style={styles.label}>Nome completo:</Text>
          <TextInput
            style={styles.input}
            placeholder="Nome"
            value={nome}
            onChangeText={setNome}
          />

          <Text style={styles.label}>E-mail:</Text>
          <TextInput
            style={styles.input}
            placeholder="E-mail"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <Text style={styles.label}>Confirmar e-mail:</Text>
          <TextInput
            style={styles.input}
            placeholder="Confirme o e-mail"
            value={confirmaEmail}
            onChangeText={setConfirmaEmail}
            keyboardType="email-address"
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

          <TouchableOpacity style={styles.button} onPress={handleCadastro}>
            <Text style={styles.buttonText}>Cadastrar</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => router.replace("/login")}>
            <Text style={styles.register}>Já tem conta? Entrar</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#CFEAFF" },
  scroll: { flexGrow: 1, justifyContent: "center", paddingHorizontal: 24 },
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
