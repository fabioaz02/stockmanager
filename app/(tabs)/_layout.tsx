import { Redirect, Stack } from 'expo-router';
import { Text } from 'react-native';
import { useAuth } from '../../contexts/AuthContext';

export default function TabsLayout() {
  const { user, loading } = useAuth();

  if (loading) {
    return <Text>Carregando...</Text>;
  }

  if (!user) {
    return <Redirect href="/login" />;
  }

  return <Stack />;
}
