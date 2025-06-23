import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { sendPasswordResetEmail } from "firebase/auth";
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
import { auth } from "../firebaseConfig";

export default function RecuperarSenhaScreen() {
    const [email, setEmail] = useState("");
    const router = useRouter();

    const handleRecuperar = async () => {
        if (!email) {
            Alert.alert("Erro", "Informe o e-mail para recuperação.");
            return;
        }

        try {
            await sendPasswordResetEmail(auth, email);
            Alert.alert(
                "E-mail enviado",
                "Se o e-mail estiver registrado, um link de redefinição de senha será enviado."
            );
            router.back();
        } catch (error: any) {
            let mensagem = "Erro ao enviar e-mail de recuperação.";
            if (error.code === "auth/invalid-email") {
                mensagem = "O e-mail informado é inválido.";
            } else if (error.code === "auth/user-not-found") {
                mensagem = "Nenhuma conta encontrada com este e-mail.";
            }
            Alert.alert("Erro", mensagem);
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
                    <View style={styles.iconContainer}>
                        <Ionicons name="lock-open-outline" size={120} color="#00AEEF" />
                    </View>

                    <View style={styles.form}>
                        <Text style={styles.label}>E-mail de recuperação:</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Digite seu e-mail"
                            placeholderTextColor="#666"
                            value={email}
                            onChangeText={setEmail}
                            autoCapitalize="none"
                            keyboardType="email-address"
                        />

                        <TouchableOpacity style={styles.button} onPress={handleRecuperar}>
                            <Text style={styles.buttonText}>Recuperar Senha</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => router.back()}>
                            <Text style={styles.register}>Voltar para o Login</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: { flexGrow: 1, backgroundColor: "#CFEAFF", justifyContent: "center", paddingHorizontal: 24 },
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
