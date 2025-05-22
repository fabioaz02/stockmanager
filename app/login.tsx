import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>📦</Text>

      <Text style={styles.label}>Nome de usuário ou e-mail:</Text>
      <TextInput
        style={styles.input}
        placeholder="Nome de usuário ou e-mail"
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        style={styles.input}
        placeholder="Senha"
        secureTextEntry
        value={senha}
        onChangeText={setSenha}
      />

      <TouchableOpacity style={styles.forgotButton}>
        <Text style={styles.forgotText}>Esqueceu a senha?</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.loginButton} onPress={() => router.replace('/(tabs)')}>
        <Text style={styles.loginText}>Entrar</Text>
      </TouchableOpacity>

      <TouchableOpacity>
        <Text style={styles.registerText}>Cadastre-se</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#cceaff', justifyContent: 'center', padding: 24 },
  logo: { fontSize: 64, alignSelf: 'center', marginBottom: 32 },
  label: { marginBottom: 8 },
  input: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
    borderColor: '#999',
    borderWidth: 1,
  },
  forgotButton: { alignItems: 'flex-end' },
  forgotText: { color: '#0055aa', marginBottom: 20 },
  loginButton: {
    backgroundColor: '#004466',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  loginText: { color: '#fff', fontWeight: 'bold' },
  registerText: { textAlign: 'center', marginTop: 20, color: '#003355' },
});
