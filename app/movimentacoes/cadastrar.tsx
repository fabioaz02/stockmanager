import { auth, database } from '@/firebaseConfig';
import { Picker } from '@react-native-picker/picker';
import { useRouter } from 'expo-router';
import { onValue, push, ref, update } from 'firebase/database';
import { useEffect, useRef, useState } from 'react';
import {
  Keyboard,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View
} from 'react-native';

export default function NovaMovimentacao() {
  const router = useRouter();
  const [operacao, setOperacao] = useState<'ENTRADA' | 'SAÍDA'>('ENTRADA');
  const [quantidade, setQuantidade] = useState('');
  const [busca, setBusca] = useState('');
  const [produtos, setProdutos] = useState<any[]>([]);
  const [sugestoes, setSugestoes] = useState<any[]>([]);
  const [produtoSelecionado, setProdutoSelecionado] = useState<any>(null);
  const [showSugestoes, setShowSugestoes] = useState(false);
  const inputRef = useRef<TextInput>(null);

  useEffect(() => {
    const uid = auth.currentUser?.uid;
    if (!uid) return;

    const produtosRef = ref(database, `usuarios/${uid}/produtos`);
    onValue(produtosRef, (snapshot) => {
      const data = snapshot.val() || {};
      const lista = Object.entries(data).map(([id, p]: any) => ({
        id,
        nome: p.nome,
        codigo: p.codigo,
        referencia: p.referencia,
        precoVenda: p.precoVenda || 0,
        quantidade: p.quantidade || 0,
      }));
      setProdutos(lista);
    });
  }, []);

  useEffect(() => {
    if (!busca) {
      setSugestoes([]);
      return;
    }

    const filtro = busca.toLowerCase();
    const resultados = produtos
      .filter((p) =>
        p.nome?.toLowerCase().includes(filtro) ||
        p.codigo?.toLowerCase().includes(filtro) ||
        p.referencia?.toLowerCase().includes(filtro)
      )
      .slice(0, 5);

    setSugestoes(resultados.length > 0 ? resultados : [{ id: '0', nome: 'Nenhum resultado encontrado' }]);
  }, [busca]);

  const selecionarProduto = (produto: any) => {
    if (produto.id === '0') return;
    setProdutoSelecionado(produto);
    setBusca('');
    setShowSugestoes(false);
    Keyboard.dismiss();
  };

  const salvar = () => {
    const uid = auth.currentUser?.uid;
    if (!uid || !produtoSelecionado) return;

    const data = new Date();
    const dataFormatada = `${data.getFullYear()}-${data.getMonth() + 1}-${data.getDate()}`;

    const qtd = parseInt(quantidade);
    const novaQtd =
      operacao === 'ENTRADA'
        ? produtoSelecionado.quantidade + qtd
        : produtoSelecionado.quantidade - qtd;

    const movRef = push(ref(database, `usuarios/${uid}/movimentacoes`));
    const novaMov = {
      codigo: produtoSelecionado.codigo,
      referencia: produtoSelecionado.referencia,
      nome: produtoSelecionado.nome,
      operacao,
      quantidade: qtd,
      data: new Date().toISOString(),
      valor: produtoSelecionado.precoVenda,
    };

    const updates: any = {};
    updates[`usuarios/${uid}/movimentacoes/${movRef.key}`] = novaMov;
    updates[`usuarios/${uid}/produtos/${produtoSelecionado.id}/quantidade`] = novaQtd;
    updates[`usuarios/${uid}/produtos/${produtoSelecionado.id}/ultima_movimentacao`] = new Date().toISOString();

    update(ref(database), updates).then(() => router.back());
  };

  return (
    <TouchableWithoutFeedback onPress={() => {
      Keyboard.dismiss();
      setShowSugestoes(false);
    }}>
      <ScrollView style={styles.container} keyboardShouldPersistTaps="handled">
        {/* Campo de busca */}
        <Text style={styles.label}>Código, Referência ou Nome</Text>
        <View style={{ position: 'relative' }}>
          <TextInput
            ref={inputRef}
            style={styles.input}
            placeholder="Buscar produto..."
            placeholderTextColor="#999"
            value={busca}
            onChangeText={(text) => {
              setBusca(text);
              if (!produtoSelecionado || text !== `${produtoSelecionado.codigo} - ${produtoSelecionado.nome}`) {
                setShowSugestoes(true);
                setProdutoSelecionado(null);
              }
            }}
            onFocus={() => setShowSugestoes(true)}
          />

          {showSugestoes && (
            <View style={[styles.listaSugestoes, { position: 'absolute', top: 52, zIndex: 10, width: '100%' }]}> 
              {sugestoes.map((item) => (
                <TouchableOpacity
                  key={item.id}
                  style={styles.sugestaoItem}
                  onPress={() => selecionarProduto(item)}
                >
                  <Text style={styles.sugestaoTexto}>
                    {item.id === '0' ? 'Nenhum resultado encontrado' : `${item.codigo} - ${item.nome}`}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>

        {/* Nome do produto */}
        <Text style={styles.label}>Nome do Produto</Text>
        <TextInput
          style={[styles.input, { backgroundColor: '#eee' }]}
          value={produtoSelecionado?.nome || 'Nenhum produto selecionado'}
          editable={false}
        />

        {/* Operação e quantidade */}
        <View style={styles.row}>
          <View style={{ flex: 1 }}>
            <Text style={styles.label}>Operação</Text>
            <View style={styles.pickerWrapper}>
              <Picker selectedValue={operacao} onValueChange={setOperacao} style={{ fontSize: 12 , color: '#000' }}>
                <Picker.Item label="ENTRADA" value="ENTRADA" />
                <Picker.Item label="SAÍDA" value="SAÍDA" />
              </Picker>
            </View>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.label}>Quantidade</Text>
            <TextInput
              style={styles.input}
              placeholder="0"
              placeholderTextColor="#999"
              keyboardType="numeric"
              value={quantidade}
              onChangeText={setQuantidade}
            />
          </View>
        </View>

        {/* Data */}
        <Text style={styles.label}>Data</Text>
        <TextInput
          style={[styles.input, { backgroundColor: '#eee' }]}
          value={new Date().toLocaleDateString('pt-BR')}
          editable={false}
        />

        {/* Botões */}
        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.btnPrimary} onPress={salvar}>
            <Text style={styles.btnText}>Adicionar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btnCancel} onPress={() => router.back()}>
            <Text style={styles.btnTextCancel}>Cancelar</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#cceaff', padding: 16 },
  label: { fontWeight: '500', marginBottom: 4, marginTop: 8 },
  input: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
    color: "#000"
  },
  pickerWrapper: {
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    paddingLeft: 12,
    marginBottom: 8,
    height: 48,
    justifyContent: 'center',
  },
  row: { flexDirection: 'row', gap: 12, marginTop: 8 },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
    marginTop: 32,
  },
  btnPrimary: {
    flex: 1,
    backgroundColor: '#1c4e66',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  btnCancel: {
    flex: 1,
    backgroundColor: '#777',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  btnText: { color: '#fff', fontWeight: 'bold' },
  btnTextCancel: { color: '#fff', fontWeight: 'bold' },
  listaSugestoes: {
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 8,
    maxHeight: 200,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  sugestaoItem: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  sugestaoTexto: {
    fontSize: 12,
    textAlign: 'left',
    paddingLeft: 2,
  },
});
