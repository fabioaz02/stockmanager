import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="(tabs)"
        options={{ title: 'Meu Estoque' }} // ✅ Substitua aqui
      />
      <Stack.Screen
        name="login"
        options={{ title: 'Stock Manager' }}
      /> {/* 👈 aqui muda o texto */}
      <Stack.Screen
        name="produtos/cadastrar"
        options={{ title: 'Cadastro de Produto' }}
      /> {/* 👈 aqui muda o texto */}
      <Stack.Screen
        name="movimentacoes/cadastrar"
        options={{ title: 'Cadastro de Movimentacao' }}
      /> {/* 👈 aqui muda o texto */}
    </Stack>

  );
}
