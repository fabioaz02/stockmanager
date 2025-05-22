import { useRouter } from 'expo-router';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function MenuScreen() {
    const router = useRouter();

    return (
        <View style={styles.container}>

            <ScrollView style={styles.scroll}>
                {/* Seção 1 */}
                <Text style={styles.secao}>Usuário</Text>
                <View style={styles.card}>
                    <TouchableOpacity style={styles.item}><Text>Conta</Text></TouchableOpacity>
                    <TouchableOpacity style={styles.item}><Text>Produtos</Text></TouchableOpacity>
                    <TouchableOpacity style={styles.item}><Text>Movimentações</Text></TouchableOpacity>
                </View>

                {/* Espaço em branco */}
                <View style={styles.espaco} />

                {/* Seção 2 */}
                <View style={styles.card}>
                    <TouchableOpacity style={styles.item}><Text>Notificações</Text></TouchableOpacity>
                    <TouchableOpacity style={styles.item}><Text>Ajuda</Text></TouchableOpacity>
                    <TouchableOpacity style={styles.item}><Text>Contato</Text></TouchableOpacity>
                </View>

                {/* Espaço extra para scroll */}
                <View style={{ height: 60 }} />
            </ScrollView>

            {/* Sair */}
            <View style={styles.sairArea}>
                <TouchableOpacity onPress={() => router.replace('/login')}>
                    <Text style={styles.sairTexto}>Sair</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#cceaff' },
    voltar: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 12,
        borderBottomWidth: 1,
        borderColor: '#ccc',
    },
    voltarTexto: {
        marginLeft: 6,
        fontSize: 14,
    },
    scroll: {
        padding: 12,
    },
    secao: {
        fontWeight: 'bold',
        marginBottom: 6,
        fontSize: 16,
        color: '#002b45',
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 6,
        overflow: 'hidden',
        marginBottom: 16,
        borderWidth: 1,
        borderColor: '#ddd',
    },
    item: {
        padding: 16,
        borderBottomWidth: 1,
        borderColor: '#eee',
    },
    espaco: { height: 40 },
    sairArea: {
        borderTopWidth: 1,
        borderColor: '#ccc',
        padding: 12,
        alignItems: 'flex-end',
    },
    sairTexto: {
        color: '#003366',
        fontWeight: '500',
    },
});
