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
    const [selected, setSelected] = useState<any | null>(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [loading, setLoading] = useState(false);
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

        const produtosRef = ref(database, `estoque/${uid}`);

        const unsubscribe = onValue(produtosRef, (snapshot) => {
            if (snapshot.exists()) {
                const data = snapshot.val();
                const lista = Object.keys(data).map((id) => ({
                    id,
                    ...data[id],
                }));
                setProdutos(lista);
            } else {
                setProdutos([]);
            }
        });

        return () => unsubscribe();
    }, []);

    return (
        <View style={styles.container}>
            {/* Filtros e Busca */}
            <View style={styles.filtros}>
                <Ionicons name="reorder-three" size={24} />
                <Ionicons name="grid" size={24} style={styles.filtroIcon} />
                <Ionicons name="list" size={24} style={styles.filtroIcon} />
                <View style={styles.searchContainer}>
                    <TextInput placeholder="Buscar..." style={styles.searchInput} />
                    <Ionicons name="search" size={20} />
                </View>
            </View>

            {loading ? (
                <ActivityIndicator size="large" style={{ marginTop: 40 }} />
            ) : (
                <FlatList
                    data={produtos}
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
                            <Text style={styles.texto}>
                                Qt: {item.quantidade} R$ {Number(item.precoVenda).toFixed(2)}
                            </Text>
                            <TouchableOpacity
                                style={styles.botaoEditar}
                                onPress={() => router.push(`/produtos/cadastrar?produtoId=${item.id}`)}
                            >
                                <Text style={styles.textoBotao}>Editar</Text>
                            </TouchableOpacity>
                        </TouchableOpacity>
                    )}
                />
            )}

            {/* Modal de Detalhes */}
            <Modal transparent visible={modalVisible} animationType="fade">
                <View style={styles.overlay}>
                    <View style={styles.modal}>
                        {selected?.imagens?.[0] ? (
                            <Image source={{ uri: selected.imagens[0] }} style={{ width: 64, height: 64 }} />
                        ) : (
                            <Entypo name="image" size={64} />
                        )}
                        <View style={styles.modalRow}>
                            <Text style={styles.modalLabel}>Código: {selected?.codigo || "--"}</Text>
                            <Text style={styles.modalLabel}>Referência: {selected?.referencia || "--"}</Text>
                        </View>
                        <Text style={styles.modalText}>Nome: {selected?.nome}</Text>
                        <View style={styles.modalRow}>
                            <Text style={styles.modalText}>Quantidade: {selected?.quantidade}</Text>
                            <Text style={styles.modalText}>Valor: R$ {Number(selected?.precoVenda || 0).toFixed(2)}</Text>
                        </View>
                        <Text style={styles.modalText}>Peso: {selected?.peso || "0kg"}</Text>
                        <Text style={styles.modalText}>Dimensões: {selected?.dimensoes || "--"}</Text>
                        <Text style={[styles.modalText, { marginTop: 8 }]}>Fotos</Text>
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
                                <Text style={styles.textoBotao}>Editar</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.botaoFecharModal} onPress={fecharModal}>
                                <Text style={styles.textoBotaoFechar}>Fechar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>

            {/* Botão flutuante */}
            <TouchableOpacity
                style={styles.fab}
                onPress={() => router.push("/produtos/cadastrar")}
            >
                <Ionicons name="add-circle-outline" size={28} color="#fff" />
            </TouchableOpacity>
        </View>
    );
}


const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#cceaff', padding: 12 },
    title: { fontSize: 18, fontWeight: 'bold', textAlign: 'center', marginBottom: 12 },
    filtros: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        marginBottom: 12,
    },
    filtroIcon: { marginLeft: 8 },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
        backgroundColor: '#fff',
        borderRadius: 8,
        paddingHorizontal: 8,
        marginLeft: 8,
        height: 36,
    },
    searchInput: { flex: 1, paddingRight: 8 },
    cardContainer: { paddingBottom: 80 },
    cardRow: { justifyContent: 'space-between', marginBottom: 12 },
    card: {
        backgroundColor: '#fff',
        borderRadius: 8,
        width: '48%',
        alignItems: 'center',
        paddingVertical: 12,
        paddingHorizontal: 6,
    },
    nome: { marginTop: 6, fontSize: 14, fontWeight: 'bold' },
    texto: { fontSize: 12, color: '#333', marginVertical: 4 },
    botaoEditar: {
        marginTop: 4,
        backgroundColor: '#1c4e66',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 6,
    },
    textoBotao: { color: '#fff', fontWeight: 'bold', fontSize: 12 },

    fab: {
        position: 'absolute',
        bottom: 16,
        right: 16,
        backgroundColor: '#1c4e66',
        width: 52,
        height: 52,
        borderRadius: 26,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 4,
    },

    overlay: {
        flex: 1,
        backgroundColor: '#0008',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modal: {
        width: '85%',
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 16,
        alignItems: 'center',
    },
    modalRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginTop: 8,
    },
    modalLabel: {
        fontWeight: 'bold',
        fontSize: 12,
    },
    modalText: {
        fontSize: 13,
        marginTop: 6,
    },
    fotos: {
        flexDirection: 'row',
        marginTop: 4,
        marginBottom: 8,
    },
    modalButtons: {
        flexDirection: 'row',
        gap: 12,
        marginTop: 16,
    },
    botaoEditarModal: {
        backgroundColor: '#1c4e66',
        paddingHorizontal: 24,
        paddingVertical: 8,
        borderRadius: 6,
        flex: 1,
        alignItems: 'center',
    },
    botaoFecharModal: {
        backgroundColor: '#ccc',
        paddingHorizontal: 24,
        paddingVertical: 8,
        borderRadius: 6,
        flex: 1,
        alignItems: 'center',
    },
    textoBotaoFechar: {
        color: '#333',
        fontWeight: 'bold',
        fontSize: 14,
    },
});
