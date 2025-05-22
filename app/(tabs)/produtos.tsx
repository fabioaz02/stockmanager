import { Entypo, Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
    FlatList,
    Modal,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

const produtosMock = Array.from({ length: 8 }, (_, i) => ({
    id: i.toString(),
    nome: `Produto ${i + 1}`,
    quantidade: 9,
    valor: 'R$ 00,00',
    codigo: '0000',
    referencia: 'ABC1',
    peso: '0kg',
    dimensoes: '1x1x1m',
}));


export default function ProdutosScreen() {
    const [selected, setSelected] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const router = useRouter();

    const abrirModal = (produto: any) => {
        setSelected(produto);
        setModalVisible(true);
    };

    const fecharModal = () => {
        setModalVisible(false);
        setSelected(null);
    };

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

            {/* Lista de Produtos */}
            <FlatList
                data={produtosMock}
                keyExtractor={(item) => item.id}
                numColumns={2}
                columnWrapperStyle={styles.cardRow}
                contentContainerStyle={styles.cardContainer}
                renderItem={({ item }) => (
                    <TouchableOpacity style={styles.card} onPress={() => abrirModal(item)}>
                        <Entypo name="image" size={48} color="#333" />
                        <Text style={styles.nome}>{item.nome}</Text>
                        <Text style={styles.texto}>
                            Qt: {item.quantidade}   {item.valor}
                        </Text>
                        <TouchableOpacity style={styles.botaoEditar}>
                            <Text style={styles.textoBotao}>Editar</Text>
                        </TouchableOpacity>
                    </TouchableOpacity>
                )}
            />

            {/* Modal */}
            <Modal transparent visible={modalVisible} animationType="fade">
                <View style={styles.overlay}>
                    <View style={styles.modal}>
                        <Entypo name="image" size={64} />
                        <View style={styles.modalRow}>
                            <Text style={styles.modalLabel}>Código: {selected?.codigo}</Text>
                            <Text style={styles.modalLabel}>Referência: {selected?.referencia}</Text>
                        </View>
                        <Text style={styles.modalText}>Nome: {selected?.nome}</Text>
                        <View style={styles.modalRow}>
                            <Text style={styles.modalText}>Quantidade: {selected?.quantidade}</Text>
                            <Text style={styles.modalText}>Valor: {selected?.valor}</Text>
                        </View>
                        <Text style={styles.modalText}>Peso: {selected?.peso}</Text>
                        <Text style={styles.modalText}>Dimensões: {selected?.dimensoes}</Text>
                        <Text style={[styles.modalText, { marginTop: 8 }]}>Fotos</Text>
                        <View style={styles.fotos}>
                            {[1, 2, 3].map((_, i) => (
                                <Entypo key={i} name="image" size={40} style={{ marginHorizontal: 4 }} />
                            ))}
                        </View>

                        {/* Botões lado a lado */}
                        <View style={styles.modalButtons}>
                            <TouchableOpacity style={styles.botaoEditarModal}>
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
                onPress={() => router.push('/produtos/cadastrar')}
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
