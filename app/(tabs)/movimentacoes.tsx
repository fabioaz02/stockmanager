import { auth, database } from '@/firebaseConfig';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { onValue, ref } from 'firebase/database';
import { useEffect, useState } from 'react';
import {
    FlatList,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

// Agrupamento por data no formato DD/MM/AAAA
type Movimentacao = {
  id: string;
  data: string;
  produto: string;
  tipo: string;
  quantidade: number;
};

export default function Movimentacoes() {
  const [agrupado, setAgrupado] = useState<Record<string, Movimentacao[]>>({});

  useEffect(() => {
    const user = auth.currentUser;
    if (!user) return;

    const movRef = ref(database, `usuarios/${user.uid}/movimentacoes`);
    onValue(movRef, (snapshot) => {
      const data = snapshot.val() || {};
      const lista: Movimentacao[] = Object.entries(data).map(([id, m]: any) => ({
        id,
        data: formatDate(m.data),
        produto: m.nome,
        tipo: m.operacao,
        quantidade: m.quantidade,
      }));

      // Agrupar por data
      const agrupadoPorData = lista.reduce((acc, item) => {
        acc[item.data] = acc[item.data] ? [...acc[item.data], item] : [item];
        return acc;
      }, {} as Record<string, Movimentacao[]>);

      // Ordenar as datas decrescentemente
      const ordenado = Object.keys(agrupadoPorData)
        .sort((a, b) => {
          const da = new Date(a.split('/').reverse().join('-'));
          const db = new Date(b.split('/').reverse().join('-'));
          return db.getTime() - da.getTime();
        })
        .reduce((acc, key) => {
          acc[key] = agrupadoPorData[key];
          return acc;
        }, {} as Record<string, Movimentacao[]>);

      setAgrupado(ordenado);
    });
  }, []);

  const formatDate = (data: string) => {
    const d = new Date(data);
    return `${String(d.getDate()).padStart(2, '0')}/${String(
      d.getMonth() + 1,
    ).padStart(2, '0')}/${d.getFullYear()}`;
  };

  const datas = Object.keys(agrupado);

  return (
    <View style={styles.container}>
      <FlatList
        data={datas}
        keyExtractor={(data) => data}
        renderItem={({ item: data }) => (
          <View style={styles.blocoData}>
            <View style={styles.headerData}>
              <Ionicons name="calendar" size={16} />
              <Text style={styles.dataTexto}>  {data}</Text>
            </View>

            {agrupado[data].map((mov) => (
              <View key={mov.id} style={styles.row}>
                <Text style={styles.cell}>{mov.produto}</Text>
                <Text style={styles.cell}>{mov.tipo}</Text>
                <Text style={styles.cell}>{mov.quantidade}</Text>
              </View>
            ))}
          </View>
        )}
      />

      {/* Botão flutuante */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => router.push('/movimentacoes/cadastrar')}
      >
        <Ionicons name="add" size={28} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#cceaff', padding: 12 },
  titulo: { fontSize: 18, fontWeight: 'bold', textAlign: 'center', marginBottom: 8 },
  blocoData: {
    backgroundColor: '#fff',
    marginBottom: 12,
    borderRadius: 6,
    overflow: 'hidden',
  },
  headerData: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e0e0e0',
    padding: 8,
  },
  dataTexto: { fontWeight: 'bold' },
  row: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    justifyContent: 'space-between',
  },
  cell: { width: '33%', textAlign: 'center', fontSize: 12 },
  fab: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#1c4e66',
    width: 52,
    height: 52,
    borderRadius: 26,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
  },
});
