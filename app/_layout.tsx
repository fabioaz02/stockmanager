import { Ionicons } from '@expo/vector-icons';
import { Stack, useRouter } from 'expo-router';
import { signOut } from 'firebase/auth';
import { Text, TouchableOpacity, View } from 'react-native';
import { auth } from '../firebaseConfig'; // ajuste o caminho se necessário

export default function RootLayout() {
  const router = useRouter();
  const user = auth.currentUser;

  return (
    <Stack>
      <Stack.Screen
        name="(tabs)"
        options={{
          headerTitle: () => (
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={{ fontSize: 16, fontWeight: 'bold' }}>
                Bem-vindo{user?.displayName ? `, ${user.displayName}` : ''}!
              </Text>
            </View>
          ),
          headerRight: () => (
            <TouchableOpacity
              onPress={() => {
                signOut(auth).then(() => {
                  router.replace('/login');
                });
              }}
              style={{ marginRight: 12 }}
            >
              <Ionicons name="log-out-outline" size={24} color="#000" />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="login"
        options={{ title: 'Stock Manager' }}
      />
      <Stack.Screen
        name="produtos/cadastrar"
        options={{ title: 'Cadastro de Produto' }}
      />
      <Stack.Screen
        name="movimentacoes/cadastrar"
        options={{ title: 'Cadastro de Movimentacao' }}
      />
      <Stack.Screen
        name="cadastro"
        options={{ title: 'Cadastrar Nova Conta' }}
      />
    </Stack>
  );
}
