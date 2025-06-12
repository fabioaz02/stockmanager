import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

import { auth, database } from '@/firebaseConfig';
import { onValue, ref } from 'firebase/database';

export default function Home() {
  type MovimentacaoResumo = {
    id: string;
    nome: string;
    quantidade: number;
    operacao: string;
    valor: string;
  };
  type ProdutoResumo = {
    id: string;
    nome: string;
    ultima_movimentacao: string;
    valor_venda: string;
  };

  const [user, setUser] = useState<any>(null);
  const [produtos, setProdutos] = useState<ProdutoResumo[]>([]);
  const [movimentacoes, setMovimentacoes] = useState<MovimentacaoResumo[]>([]);
  const router = useRouter();

  useEffect(() => {
    const usuarioAtual = auth.currentUser;
    if (usuarioAtual) {
      setUser(usuarioAtual);
      carregaProdutos(usuarioAtual.uid);
      carregaMovimentacoes(usuarioAtual.uid);
    }
  }, []);

  const carregaProdutos = (uid: string) => {
    const produtosRef = ref(database, `usuarios/${uid}/produtos`);
    onValue(produtosRef, (snapshot) => {
      const data = snapshot.val() || {};
      const lista = Object.entries(data)
        .map(([id, p]: any) => ({
          id,
          nome: p.nome,
          ultima_movimentacao: formatDate(p.ultima_movimentacao),
          valor_venda: p.precoVenda || 'R$ 0,00',
        }))
        .slice(-5)
        .reverse();
      setProdutos(lista);
    });
  };

  const carregaMovimentacoes = (uid: string) => {
    const movRef = ref(database, `usuarios/${uid}/movimentacoes`);
    onValue(movRef, (snapshot) => {
      const data = snapshot.val() || {};
      const lista = Object.entries(data)
        .map(([id, m]: any) => ({
          id,
          nome: m.nome,
          quantidade: m.quantidade,
          operacao: m.operacao,
          valor: m.valor,
        }))
        .slice(-5)
        .reverse();
      setMovimentacoes(lista);
    });
  };

  const formatDate = (data: string) => {
    if (!data) return '';
    const d = new Date(data);
    return d.toLocaleDateString('pt-BR');
  };

  return (
    <ScrollView style={styles.container}>
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

      <Text style={styles.section}>Itens em falta (máx. 5)</Text>
      {produtos.length > 0 ? (
        produtos.map((p) => (
          <View key={p.id} style={styles.row}>
            <Text style={styles.cell}>{p.nome}</Text>
            <Text style={styles.cell}>{p.ultima_movimentacao}</Text>
            <Text style={styles.cell}>{p.valor_venda}</Text>
          </View>
        ))
      ) : (
        <Text style={styles.placeholder}>Nenhum item encontrado</Text>
      )}

      <Text style={styles.section}>Movimentações recentes</Text>
      {movimentacoes.length > 0 ? (
        movimentacoes.map((m) => (
          <View key={m.id} style={styles.row}>
            <Text style={styles.cell}>{m.nome}</Text>
            <Text style={styles.cell}>{m.quantidade}</Text>
            <Text style={styles.cell}>{m.operacao}</Text>
            <Text style={styles.cell}>{m.valor}</Text>
          </View>
        ))
      ) : (
        <Text style={styles.placeholder}>Nenhuma movimentação recente</Text>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#cceaff', padding: 16 },
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
  cell: { width: '30%', textAlign: 'center', fontSize: 12 },
  placeholder: {
    fontSize: 12,
    fontStyle: 'italic',
    color: '#555',
    textAlign: 'center',
    marginBottom: 12,
  },
});
