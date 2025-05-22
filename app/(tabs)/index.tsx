import { Redirect } from 'expo-router';
import { Text, View } from 'react-native';
import { useAuth } from '../../contexts/AuthContext';

export default function HomeScreen() {
  const { user, loading } = useAuth();

  if (loading) {
    return <Text>Carregando...</Text>;
  }

  if (!user) {
    return <Redirect href="/login" />;
  }

  return (
    <View>
      <Text>Bem-vindo à aba Home!</Text>
    </View>
  );
}
