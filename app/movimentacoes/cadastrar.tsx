import { Entypo, Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

export default function NovaMovimentacao() {
  const router = useRouter();

  const [operacao, setOperacao] = useState<'ENTRADA' | 'SAÍDA'>('ENTRADA');
  const [showOperacao, setShowOperacao] = useState(false);

  const dataAtual = new Date().toLocaleDateString('pt-BR');

  return (
    <ScrollView style={styles.container}>
      {/* Voltar e título */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back-circle" size={28} color="#7799aa" />
        </TouchableOpacity>
        <Text style={styles.title}>Nova Movimentação</Text>
      </View>

      {/* Código/Referência */}
      <Text style={styles.label}>Código/Referência</Text>
      <View style={styles.row}>
        <TextInput style={styles.input} placeholder="Digite o código ou referência" />
        <TouchableOpacity style={styles.iconButton}>
          <Entypo name="magnifying-glass" size={20} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Nome do produto */}
      <Text style={styles.label}>Nome do produto</Text>
      <TextInput
        style={styles.input}
        value="nome nome nome nome nome"
        editable={false}
      />

      {/* Operação e Quantidade */}
      <View style={styles.row}>
        <View style={{ flex: 1 }}>
          <Text style={styles.label}>Operação</Text>
          <TouchableOpacity
            style={styles.input}
            onPress={() => setShowOperacao(true)}
          >
            <Text>{operacao}</Text>
          </TouchableOpacity>

          {showOperacao && (
            <View style={styles.selectBox}>
              {['ENTRADA', 'SAÍDA'].map((opcao) => (
                <TouchableOpacity
                  key={opcao}
                  style={styles.optionItem}
                  onPress={() => {
                    setOperacao(opcao as 'ENTRADA' | 'SAÍDA');
                    setShowOperacao(false);
                  }}
                >
                  <Text>{opcao}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.label}>Quantidade</Text>
          <TextInput style={styles.input} placeholder="Qtd" keyboardType="numeric" />
        </View>
      </View>

      {/* Data */}
      <Text style={styles.label}>Data</Text>
      <TextInput
        style={[styles.input, { backgroundColor: '#eee' }]}
        value={dataAtual}
        editable={false}
      />

      {/* Botões */}
      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.btnPrimary}>
          <Text style={styles.btnText}>Adicionar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnCancel} onPress={() => router.back()}>
          <Text style={styles.btnTextCancel}>Cancelar</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#cceaff', padding: 16 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 16,
  },
  title: { fontSize: 18, fontWeight: 'bold', color: '#003366' },
  label: { fontWeight: '500', marginBottom: 4, marginTop: 8 },
  input: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  iconButton: {
    backgroundColor: '#1c4e66',
    padding: 12,
    borderRadius: 8,
    justifyContent: 'center',
  },
  selectBox: {
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#aaa',
    marginTop: 4,
  },
  optionItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
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
});
