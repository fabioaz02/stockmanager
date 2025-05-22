import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { signInWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { auth } from '../lib/firebase';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const router = useRouter();

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, senha);
      router.replace('/(tabs)/');
    } catch (error) {
      Alert.alert('Erro ao fazer login', 'Verifique suas credenciais e tente novamente.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Bem-vindo de volta!</Text>

      <View style={styles.inputContainer}>
        <Ionicons name="mail" size={20} color="#666" style={styles.icone} />
        <TextInput
          placeholder="E-mail"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          style={styles.input}
        />
      </View>

      <View style={styles.inputContainer}>
        <Ionicons name="lock-closed" size={20} color="#666" style={styles.icone} />
        <TextInput
          placeholder="Senha"
          value={senha}
          onChangeText={setSenha}
          secureTextEntry={!mostrarSenha}
          autoCapitalize="none"
          style={styles.input}
        />
        <TouchableOpacity onPress={() => setMostrarSenha(!mostrarSenha)}>
          <MaterialIcons
            name={mostrarSenha ? 'visibility' : 'visibility-off'}
            size={20}
            color="#666"
          />
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.botao} onPress={handleLogin}>
        <Text style={styles.textoBotao}>Entrar</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push('/register')}>
        <Text style={styles.link}>Não tem uma conta? Cadastre-se</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 40,
    textAlign: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#ccc',
    marginBottom: 25,
  },
  icone: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 40,
  },
  botao: {
    backgroundColor: '#1E90FF',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  textoBotao: {
    color: '#fff',
    fontSize: 16,
  },
  link: {
    color: '#1E90FF',
    marginTop: 15,
    textAlign: 'center',
  },
});
