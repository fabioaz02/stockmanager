import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const dados = [
    { id: '1', data: '01/02/2024', produto: 'Produto', tipo: 'Entrada', quantidade: 10 },
    { id: '2', data: '01/02/2024', produto: 'Produto', tipo: 'Saída', quantidade: 5 },
    { id: '3', data: '01/02/2024', produto: 'Produto', tipo: 'Entrada', quantidade: 7 },
    { id: '4', data: '31/01/2024', produto: 'Produto', tipo: 'Entrada', quantidade: 12 },
    { id: '5', data: '31/01/2024', produto: 'Produto', tipo: 'Saída', quantidade: 3 },
];

// Agrupa por data
const agrupado = dados.reduce((acc, item) => {
    acc[item.data] = acc[item.data] ? [...acc[item.data], item] : [item];
    return acc;
}, {} as Record<string, typeof dados>);

export default function Movimentacoes() {
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
