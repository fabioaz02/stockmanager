import { Ionicons } from '@expo/vector-icons';
import { Stack, useRouter } from 'expo-router';
import { signOut } from 'firebase/auth';
import { Alert, Linking, Text, TouchableOpacity, View } from 'react-native';
import { auth } from '../firebaseConfig';

export default function RootLayout() {
  const router = useRouter();
  const user = auth.currentUser;

  const handleAjuda = () => {
    Alert.alert(
      "Precisa de ajuda?",
      "Se você tiver dúvidas ou precisar de suporte, entre em contato conosco pelo WhatsApp ou E-mail abaixo.",
      [
        {
          text: "WhatsApp",
          onPress: () => Linking.openURL("https://wa.me/5546991117290?text=Olá! Preciso de ajuda com o app Stock Manager."),
        },
        {
          text: "E-mail",
          onPress: () => Linking.openURL("mailto:fabiofidencio@alunos.utfpr.edu.br?subject=Ajuda - Stock Manager"),
        },
        { text: "Cancelar", style: "cancel" },
      ]
    );
  };

  const headerRightWithLogout = () => (
    <View style={{ flexDirection: 'row', marginRight: 12 }}>
      <TouchableOpacity onPress={handleAjuda} style={{ marginHorizontal: 8 }}>
        <Ionicons name="help-circle-outline" size={24}/>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          signOut(auth).then(() => {
            router.replace('/login');
          });
        }}
      >
        <Ionicons name="log-out-outline" size={24} color="#000" />
      </TouchableOpacity>
    </View>
  );

  const headerRightHelpOnly = () => (
    <TouchableOpacity onPress={handleAjuda} style={{ marginRight: 12 }}>
      <Ionicons name="help-circle-outline" size={24}/>
    </TouchableOpacity>
  );

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
          headerRight: headerRightWithLogout,
        }}
      />
      <Stack.Screen
        name="login"
        options={{
          title: 'Stock Manager',
          headerRight: headerRightHelpOnly,
        }}
      />
      <Stack.Screen
        name="produtos/cadastrar"
        options={{
          title: 'Cadastro de Produto',
          headerRight: headerRightHelpOnly,
        }}
      />
      <Stack.Screen
        name="movimentacoes/cadastrar"
        options={{
          title: 'Cadastro de Movimentação',
          headerRight: headerRightHelpOnly,
        }}
      />
      <Stack.Screen
        name="cadastro"
        options={{
          title: 'Cadastrar Nova Conta',
          headerRight: headerRightHelpOnly,
        }}
      />
      <Stack.Screen
        name="recuperarSenha"
        options={{
          title: 'Recuperar Senha',
          headerRight: headerRightHelpOnly,
        }}
      />
    </Stack>
  );
}