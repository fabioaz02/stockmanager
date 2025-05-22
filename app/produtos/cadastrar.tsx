import { Entypo, Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import {
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

export default function CadastroProduto() {
  const router = useRouter();

  return (
    <ScrollView style={styles.container}>
      {/* Voltar */}
      <TouchableOpacity style={styles.back} onPress={() => router.back()}>
        <Ionicons name="arrow-back-circle" size={28} color="#7799aa" />
      </TouchableOpacity>

      {/* Nome e descrição */}
      <Text style={styles.label}>Nome</Text>
      <TextInput style={styles.input} placeholder="Nome do produto" />

      <Text style={styles.label}>Descrição</Text>
      <TextInput style={[styles.input, { height: 80 }]} multiline placeholder="Descrição" />

      {/* Detalhamento */}
      <Text style={styles.section}>Detalhamento</Text>
      <View style={styles.row}>
        <TextInput style={styles.smallInput} placeholder="Código" />
        <TextInput style={styles.smallInput} placeholder="Referência" />
      </View>
      <View style={styles.row}>
        <TextInput style={styles.smallInput} placeholder="Categoria" />
        <TextInput style={styles.smallInput} placeholder="Marca" />
      </View>
      <View style={styles.row}>
        <TextInput style={styles.smallInput} placeholder="Peso" />
        <TextInput style={styles.smallInput} placeholder="Dimensões" />
      </View>

      {/* Preços e Custos */}
      <Text style={styles.section}>Preços e Custos</Text>
      <Text style={styles.label}>Quantidade</Text>
      <TextInput style={styles.input} placeholder="Quantidade" />

      <View style={styles.row}>
        <TextInput style={styles.smallInput} placeholder="Preço de custo" />
        <TextInput
          style={[styles.smallInput, { backgroundColor: '#eee' }]}
          placeholder="100%"
          editable={false}
        />
      </View>
      <TextInput style={styles.input} placeholder="Preço de venda" />

      {/* Imagens */}
      <Text style={styles.section}>Imagens</Text>
      <View style={styles.imageRow}>
        {[1, 2, 3, 4].map((i) => (
          <Entypo key={i} name="image" size={48} style={styles.imageIcon} />
        ))}
        <View style={styles.addImage}>
          <Entypo name="image" size={48} />
          <Ionicons name="add-circle" size={18} style={styles.addIcon} />
          <Text style={styles.addLabel}>Adicionar</Text>
        </View>
      </View>

      {/* Botões */}
      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.btnPrimary}>
          <Text style={styles.btnText}>Cadastrar</Text>
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
  back: { marginBottom: 12 },
  label: { marginBottom: 4, fontWeight: '500' },
  input: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
    marginBottom: 12,
  },
  smallInput: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
  },
  section: {
    fontWeight: 'bold',
    fontSize: 16,
    marginVertical: 8,
    color: '#004466',
  },
  imageRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginTop: 8,
  },
  imageIcon: {
    backgroundColor: '#fff',
    padding: 8,
    borderRadius: 6,
  },
  addImage: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  addIcon: {
    position: 'absolute',
    bottom: 4,
    right: -4,
    backgroundColor: '#fff',
    borderRadius: 10,
  },
  addLabel: {
    fontSize: 12,
    textAlign: 'center',
    marginTop: 2,
    fontWeight: 'bold',
    color: '#004466',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
    marginVertical: 20,
  },
  btnPrimary: {
    flex: 1,
    backgroundColor: '#1c4e66',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  btnCancel: {
    flex: 1,
    backgroundColor: '#777',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  btnText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  btnTextCancel: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
