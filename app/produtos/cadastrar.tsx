import { Entypo, Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { useLocalSearchParams, useRouter } from "expo-router";
import { get, ref, set, update } from "firebase/database";
import { useEffect, useState } from "react";
import {
  Alert, Image,
  ScrollView, StyleSheet, Text, TextInput,
  TouchableOpacity, View
} from "react-native";
import { auth, database } from "../../firebaseConfig";

export default function CadastroProduto() {
  const router = useRouter();
  const { produtoId } = useLocalSearchParams(); // se presente, é edição

  const [form, setForm] = useState({
    nome: "", descricao: "", codigo: "", referencia: "", categoria: "",
    marca: "", peso: "", dimensoes: "", quantidade: "", precoCusto: "",
    precoVenda: "", imagens: [] as string[],
  });

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleImagePick = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.5,
      base64: true,
    });

    if (!result.canceled && result.assets[0]) {
      const base64 = `data:image/jpeg;base64,${result.assets[0].base64}`;
      setForm((prev) => ({ ...prev, imagens: [...prev.imagens, base64] }));
    }
  };

  const validarCampos = () => {
    const obrigatorios = ["nome", "descricao", "quantidade", "precoCusto", "precoVenda"];
    for (const campo of obrigatorios) {
      if (!form[campo as keyof typeof form]) {
        Alert.alert("Erro", `O campo "${campo}" é obrigatório.`);
        return false;
      }
    }
    return true;
  };

  const salvarProduto = async () => {
    if (!validarCampos()) return;

    const uid = auth.currentUser?.uid;
    if (!uid) return;

    const id = produtoId || Date.now().toString();

    const dados = {
      ...form,
      precoCusto: parseFloat(form.precoCusto),
      precoVenda: parseFloat(form.precoVenda),
      quantidade: parseInt(form.quantidade),
      ultimaData: new Date().toISOString(),
    };

    try {
      const produtoRef = ref(database, `estoque/${uid}/${id}`);
      await (produtoId ? update(produtoRef, dados) : set(produtoRef, dados));
      Alert.alert("Sucesso", produtoId ? "Produto atualizado." : "Produto cadastrado.");
      router.back();
    } catch (error) {
      Alert.alert("Erro", "Falha ao salvar o produto.");
    }
  };

  const carregarProduto = async () => {
    if (!produtoId) return;

    const uid = auth.currentUser?.uid;
    const snap = await get(ref(database, `estoque/${uid}/${produtoId}`));
    if (snap.exists()) {
      const produto = snap.val();
      setForm({
        nome: produto.nome || "",
        descricao: produto.descricao || "",
        codigo: produto.codigo || "",
        referencia: produto.referencia || "",
        categoria: produto.categoria || "",
        marca: produto.marca || "",
        peso: produto.peso || "",
        dimensoes: produto.dimensoes || "",
        quantidade: produto.quantidade?.toString() || "",
        precoCusto: produto.precoCusto?.toString() || "",
        precoVenda: produto.precoVenda?.toString() || "",
        imagens: produto.imagens || [],
      });
    }
  };

  useEffect(() => {
    carregarProduto();
  }, [produtoId]);

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: '#cceaff' }}
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled"
    >
      <Text style={styles.label}>Nome</Text>
      <TextInput style={styles.input} value={form.nome} onChangeText={(v) => handleChange("nome", v)} />

      <Text style={styles.label}>Descrição</Text>
      <TextInput style={[styles.input, { height: 80 }]} multiline value={form.descricao} onChangeText={(v) => handleChange("descricao", v)} />

      <Text style={styles.section}>Detalhamento</Text>
      <View style={styles.row}>
        <TextInput style={styles.smallInput} placeholder="Código" value={form.codigo} onChangeText={(v) => handleChange("codigo", v)} />
        <TextInput style={styles.smallInput} placeholder="Referência" value={form.referencia} onChangeText={(v) => handleChange("referencia", v)} />
      </View>
      <View style={styles.row}>
        <TextInput style={styles.smallInput} placeholder="Categoria" value={form.categoria} onChangeText={(v) => handleChange("categoria", v)} />
        <TextInput style={styles.smallInput} placeholder="Marca" value={form.marca} onChangeText={(v) => handleChange("marca", v)} />
      </View>
      <View style={styles.row}>
        <TextInput style={styles.smallInput} placeholder="Peso" value={form.peso} onChangeText={(v) => handleChange("peso", v)} />
        <TextInput style={styles.smallInput} placeholder="Dimensões" value={form.dimensoes} onChangeText={(v) => handleChange("dimensoes", v)} />
      </View>

      <Text style={styles.section}>Preços e Custos</Text>
      <Text style={styles.label}>Quantidade</Text>
      <TextInput style={styles.input} value={form.quantidade} onChangeText={(v) => handleChange("quantidade", v)} keyboardType="numeric" />

      <View style={styles.row}>
        <TextInput style={styles.smallInput} placeholder="Preço de custo" value={form.precoCusto} onChangeText={(v) => handleChange("precoCusto", v)} keyboardType="decimal-pad" />
        <TextInput style={[styles.smallInput, { backgroundColor: '#eee' }]} value="100%" editable={false} />
      </View>
      <TextInput style={styles.input} placeholder="Preço de venda" value={form.precoVenda} onChangeText={(v) => handleChange("precoVenda", v)} keyboardType="decimal-pad" />

      <Text style={styles.section}>Imagens</Text>
      <View style={styles.imageRow}>
        {form.imagens.map((img, i) => (
          <Image key={i} source={{ uri: img }} style={styles.imgPreview} />
        ))}
        <TouchableOpacity style={styles.addImage} onPress={handleImagePick}>
          <Entypo name="image" size={48} />
          <Ionicons name="add-circle" size={18} style={styles.addIcon} />
          <Text style={styles.addLabel}>Adicionar</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.btnPrimary} onPress={salvarProduto}>
          <Text style={styles.btnText}>{produtoId ? "Atualizar" : "Cadastrar"}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnCancel} onPress={() => router.back()}>
          <Text style={styles.btnTextCancel}>Cancelar</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, padding: 16 },
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
  imgPreview: {
    width: 64,
    height: 64,
    borderRadius: 6,
    backgroundColor: '#fff',
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
  btnText: { color: '#fff', fontWeight: 'bold' },
  btnTextCancel: { color: '#fff', fontWeight: 'bold' },
});
