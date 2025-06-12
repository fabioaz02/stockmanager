import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { get, ref } from "firebase/database";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { auth, database } from "../../firebaseConfig";

export default function Home() {
  const router = useRouter();
  const [nome, setNome] = useState("");
  const [itensFalta, setItensFalta] = useState<any[]>([]);
  const [movimentacoes, setMovimentacoes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const uid = auth.currentUser?.uid;
    if (!uid) return;

    const fetchData = async () => {
      try {
        const userSnap = await get(ref(database, `usuarios/${uid}`));
        if (userSnap.exists()) {
          setNome(userSnap.val().nome);
        }

        const estoqueSnap = await get(ref(database, `estoque/${uid}`));
        if (estoqueSnap.exists()) {
          const data = Object.values(estoqueSnap.val()).filter((item: any) => item.quantidade <= 0);
          const ultimos5 = data.slice(-5).reverse();
          setItensFalta(ultimos5);
        }

        const movSnap = await get(ref(database, `movimentacoes/${uid}`));
        if (movSnap.exists()) {
          const data = Object.values(movSnap.val());
          const ordenados = data.sort((a: any, b: any) =>
            new Date(b.data).getTime() - new Date(a.data).getTime()
          );
          setMovimentacoes(ordenados.slice(0, 5));
        }
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled">
      <Text style={styles.welcome}>
        Bem vindo, <Text style={styles.username}>{nome || "usuário"}</Text>
      </Text>

      <View style={styles.actions}>
        <TouchableOpacity
          style={styles.card}
          onPress={() => router.push("/produtos/cadastrar")}
        >
          <Ionicons name="apps-outline" size={48} />
          <Text style={styles.cardText}>Novo{"\n"}Produto</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.card}
          onPress={() => router.push("/movimentacoes/cadastrar")}
        >
          <Ionicons name="albums-outline" size={48} />
          <Text style={styles.cardText}>Nova{"\n"}Movimentação</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.section}>Itens em falta (limite de 5)</Text>
      {loading ? (
        <ActivityIndicator />
      ) : itensFalta.length === 0 ? (
        <Text style={styles.empty}>Nenhum item em falta no momento.</Text>
      ) : (
        itensFalta.map((item, i) => (
          <View key={i} style={styles.row}>
            <Text style={styles.cell}>{item.nome}</Text>
            <Text style={styles.cell}>{item.ultimaData || "-"}</Text>
            <Text style={styles.cell}>R${item.valor?.toFixed(2) || "-"}</Text>
          </View>
        ))
      )}

      <Text style={styles.section}>Movimentações dos últimos 7 dias</Text>
      {loading ? (
        <ActivityIndicator />
      ) : movimentacoes.length === 0 ? (
        <Text style={styles.empty}>Nenhuma movimentação registrada.</Text>
      ) : (
        movimentacoes.map((mov, i) => (
          <View key={i} style={styles.row}>
            <Text style={styles.cell}>{mov.item}</Text>
            <Text style={styles.cell}>{mov.quantidade}</Text>
            <Text style={styles.cell}>{mov.tipo}</Text>
            <Text style={styles.cell}>R${mov.valor?.toFixed(2)}</Text>
          </View>
        ))
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#cceaff",
    padding: 16,
    justifyContent: "flex-start",
  },
  welcome: {
    fontSize: 16,
    marginBottom: 16,
    fontWeight: "600",
  },
  username: {
    fontWeight: "bold",
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 24,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
    alignItems: "center",
    justifyContent: "center",
    width: "48%",
    elevation: 2,
  },
  cardText: {
    marginTop: 8,
    textAlign: "center",
    fontSize: 12,
    fontWeight: "500",
  },
  section: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 8,
    marginTop: 16,
  },
  row: {
    flexDirection: "row",
    backgroundColor: "#fff",
    paddingVertical: 8,
    paddingHorizontal: 4,
    borderRadius: 4,
    marginBottom: 4,
    justifyContent: "space-between",
  },
  cell: {
    fontSize: 12,
    textAlign: "center",
    width: "25%",
  },
  empty: {
    fontSize: 12,
    fontStyle: "italic",
    marginBottom: 4,
    color: "#555",
  },
});
