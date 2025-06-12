import { Entypo, Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { onValue, ref } from 'firebase/database';
import React, { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    FlatList,
    Image,
    Modal,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { auth, database } from '../../firebaseConfig';

export default function ProdutosScreen() {
    const [produtos, setProdutos] = useState<any[]>([]);
    const [produtosFiltrados, setProdutosFiltrados] = useState<any[]>([]);
    const [selected, setSelected] = useState<any | null>(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const [busca, setBusca] = useState('');
    const router = useRouter();

    const abrirModal = (produto: any) => {
        setSelected(produto);
        setModalVisible(true);
    };

    const fecharModal = () => {
        setModalVisible(false);
        setSelected(null);
    };

    useEffect(() => {
        const uid = auth.currentUser?.uid;
        if (!uid) return;

        const produtosRef = ref(database, `usuarios/${uid}/produtos`);

        const unsubscribe = onValue(produtosRef, (snapshot) => {
            if (snapshot.exists()) {
                const data = snapshot.val();
                const lista = Object.keys(data).map((id) => ({
                    id,
                    ...data[id],
                }));
                setProdutos(lista);
                setProdutosFiltrados(lista);
            } else {
                setProdutos([]);
                setProdutosFiltrados([]);
            }
        });

        return () => unsubscribe();
    }, []);

    useEffect(() => {
        const texto = busca.toLowerCase();
        const filtrado = produtos.filter((p) =>
            p.nome?.toLowerCase().includes(texto) ||
            p.codigo?.toString().includes(texto) ||
            p.referencia?.toLowerCase().includes(texto)
        );
        setProdutosFiltrados(filtrado);
    }, [busca, produtos]);

    return (
        <View style={styles.container}>
            <View style={styles.filtros}>                
                <TextInput
                    placeholder="Buscar por nome, código ou referência"
                    style={styles.searchInput}
                    value={busca}
                    onChangeText={setBusca}
                    placeholderTextColor="#999"
                />
            </View>

            {loading ? (
                <ActivityIndicator size="large" style={{ marginTop: 40 }} />
            ) : (
                <FlatList
                    data={produtosFiltrados}
                    keyExtractor={(item) => item.id}
                    numColumns={2}
                    columnWrapperStyle={styles.cardRow}
                    contentContainerStyle={styles.cardContainer}
                    renderItem={({ item }) => (
                        <TouchableOpacity style={styles.card} onPress={() => abrirModal(item)}>
                            {item.imagens?.[0] ? (
                                <Image source={{ uri: item.imagens[0] }} style={{ width: 48, height: 48 }} />
                            ) : (
                                <Entypo name="image" size={48} color="#333" />
                            )}
                            <Text style={styles.nome}>{item.nome}</Text>
                            <View style={styles.rowInfo}>
                                <Text style={styles.quantidade}>Qt: {item.quantidade}</Text>
                                <View style={{ flex: 1 }} />
                                <Text style={styles.valor}>R$ {Number(item.precoVenda).toFixed(2)}</Text>
                            </View>
                            <TouchableOpacity
                                style={styles.botaoEditarNatural}
                                onPress={() => router.push(`/produtos/cadastrar?produtoId=${item.id}`)}
                            >
                                <Ionicons name="create-outline" size={16} color="#1c4e66" />
                                <Text style={styles.textoBotaoNatural}>Editar</Text>
                            </TouchableOpacity>
                        </TouchableOpacity>
                    )}
                />
            )}

            <Modal transparent visible={modalVisible} animationType="fade">
                <View style={styles.overlay}>
                    <View style={styles.modal}>
                        <View style={{ alignItems: 'center', alignSelf: 'center', marginBottom: 8 }}>
                            {selected?.imagens?.[0] ? (
                                <Image source={{ uri: selected.imagens[0] }} style={{ width: 64, height: 64 }} />
                            ) : (
                                <Entypo name="image" size={64} />
                            )}
                        </View>

                        <Text style={styles.modalTitle}>{selected?.nome}</Text>

                        <View style={styles.modalSectionRow}>
                            <View style={styles.modalItem}>
                                <Text style={styles.modalLabel}>Código:</Text>
                                <Text style={styles.modalValue}>{selected?.codigo || '--'}</Text>
                            </View>
                            <View style={styles.modalItem}>
                                <Text style={styles.modalLabel}>Referência:</Text>
                                <Text style={styles.modalValue}>{selected?.referencia || '--'}</Text>
                            </View>
                        </View>

                        <View style={styles.modalSectionRow}>
                            <View style={styles.modalItem}>
                                <Text style={styles.modalLabel}>Quantidade:</Text>
                                <Text style={styles.modalValue}>Qnt. {selected?.quantidade}</Text>
                            </View>
                            <View style={styles.modalItem}>
                                <Text style={styles.modalLabel}>Valor:</Text>
                                <Text style={styles.modalValue}>R$ {Number(selected?.precoVenda || 0).toFixed(2)}</Text>
                            </View>
                        </View>

                        <View style={styles.modalSectionRow}>
                            <View style={styles.modalItem}>
                                <Text style={styles.modalLabel}>Peso:</Text>
                                <Text style={styles.modalValue}>{selected?.peso || '0kg'}</Text>
                            </View>
                            <View style={styles.modalItem}>
                                <Text style={styles.modalLabel}>Dimensões:</Text>
                                <Text style={styles.modalValue}>{selected?.dimensoes || '--'}</Text>
                            </View>
                        </View>

                        <Text style={[styles.modalLabel, { marginTop: 12 }]}>Fotos:</Text>
                        <View style={styles.fotos}>
                            {selected?.imagens?.length ? (
                                selected.imagens.map((img: string, i: number) => (
                                    <Image
                                        key={i}
                                        source={{ uri: img }}
                                        style={{ width: 40, height: 40, marginHorizontal: 4, borderRadius: 4 }}
                                    />
                                ))
                            ) : (
                                <Text style={{ fontSize: 12, fontStyle: 'italic' }}>Nenhuma imagem</Text>
                            )}
                        </View>

                        <View style={styles.modalButtons}>
                            <TouchableOpacity
                                style={styles.botaoEditarModal}
                                onPress={() => {
                                    router.push(`/produtos/cadastrar?produtoId=${selected.id}`);
                                    fecharModal();
                                }}
                            >
                                <Ionicons name="create-outline" size={16} color="#fff" />
                                <Text style={styles.textoBotao}>Editar</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.botaoFecharModal} onPress={fecharModal}>
                                <Ionicons name="close" size={16} color="#fff" />
                                <Text style={styles.textoBotaoFechar}>Fechar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>

            <TouchableOpacity
                style={styles.fab}
                onPress={() => router.push("/produtos/cadastrar")}
            >
                <Ionicons name="add" size={28} color="#fff" />
            </TouchableOpacity>
        </View>
    );
}
const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#CFEAFF' },
    filtros: { padding: 16 },
    searchInput: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 10,
        backgroundColor: '#fff',
        fontSize: 14
    },
    cardContainer: { paddingBottom: 120 },
    cardRow: { justifyContent: 'space-between', paddingHorizontal: 16 },
    card: {
        backgroundColor: '#fff',
        padding: 12,
        borderRadius: 12,
        marginBottom: 16,
        width: '48%',
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        elevation: 2,
    },
    nome: { fontWeight: '600', fontSize: 14, marginTop: 8, marginBottom: 4 },
    rowInfo: { flexDirection: 'row', alignItems: 'center', marginBottom: 6 },
    quantidade: { fontSize: 12, color: '#333' },
    valor: { fontSize: 12, color: '#1c4e66', fontWeight: 'bold' },
    botaoEditarNatural: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 6,
    },
    textoBotaoNatural: {
        fontSize: 12,
        color: '#1c4e66',
        marginLeft: 4,
    },
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.4)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modal: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 16,
        width: '90%',
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 12,
        textAlign: 'center',
    },
    modalSectionRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 4,
    },
    modalItem: {
        flex: 1,
        paddingHorizontal: 6,
    },
    modalLabel: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#666',
    },
    modalValue: {
        fontSize: 14,
        color: '#333',
    },
    fotos: {
        flexDirection: 'row',
        marginTop: 4,
    },
    modalButtons: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 16,
    },
    botaoEditarModal: {
        backgroundColor: '#1c4e66',
        padding: 10,
        borderRadius: 8,
        flex: 1,
        alignItems: 'center',
        marginRight: 8,
    },
    botaoFecharModal: {
        backgroundColor: '#777',
        padding: 10,
        borderRadius: 8,
        flex: 1,
        alignItems: 'center',
        marginLeft: 8,
    },
    textoBotao: { color: '#fff', fontWeight: 'bold' },
    textoBotaoFechar: { color: '#fff', fontWeight: 'bold' },
    fab: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        backgroundColor: '#1c4e66',
        width: 56,
        height: 56,
        borderRadius: 28,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 4,
    },
});
