import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function Home() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>Bem-vindo, usuário</Text>

      <View style={styles.actions}>
        <TouchableOpacity
          style={styles.card}
          onPress={() => router.push('/produtos/cadastrar')}
        >
          <Ionicons name="add-circle-outline" size={40} color="#000" />
          <Text style={styles.cardText}>Novo Produto</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.card}
          onPress={() => router.push('/movimentacoes/cadastrar')}
        >
          <Ionicons name="add-outline" size={40} color="#000" />
          <Text style={styles.cardText}>Nova Movimentação</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.section}>Itens em falta (limite de 5)</Text>
      {[1, 2, 3, 4, 5].map((_, i) => (
        <View key={i} style={styles.row}>
          <Text style={styles.cell}>Item</Text>
          <Text style={styles.cell}>Última data</Text>
          <Text style={styles.cell}>Valor</Text>
        </View>
      ))}

      <Text style={styles.section}>Movimentações dos últimos 7 dias</Text>
      {[1, 2, 3, 4].map((_, i) => (
        <View key={i} style={styles.row}>
          <Text style={styles.cell}>Item</Text>
          <Text style={styles.cell}>Qnt</Text>
          <Text style={styles.cell}>Operação</Text>
          <Text style={styles.cell}>Valor</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#cceaff', padding: 16 },
  welcome: { fontSize: 16, marginBottom: 16, fontWeight: 'bold' },
  actions: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 },
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
    width: '48%',
    elevation: 2,
  },
  cardText: { marginTop: 8, fontSize: 12 },
  section: { marginTop: 20, fontWeight: 'bold', fontSize: 14, marginBottom: 8 },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    padding: 8,
    marginBottom: 4,
    borderRadius: 4,
  },
  cell: { width: '25%', textAlign: 'center', fontSize: 12 },
});
