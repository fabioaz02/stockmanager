import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="(tabs)"
        options={{ title: 'Stock Manager' }} // ✅ Substitua aqui
      />
      <Stack.Screen
        name="login"
        options={{ title: 'Bem-vindo' }}
      /> {/* 👈 aqui muda o texto */}
    </Stack>

  );
}
