import TransactionsList from "@/components/TransactionList";
import { mockTransactions } from "@/mocks/transactions";
import { useMemo, useState } from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type CategoryFilter = "todas" | "deposito" | "transferencia";

export default function TransacoesScreen() {
  const [category, setCategory] = useState<CategoryFilter>("todas");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const filteredTransactions = useMemo(() => {
    return mockTransactions.filter((transaction) => {
      const matchesCategory =
        category === "todas" || transaction.type === category;

      const transactionDate = new Date(`${transaction.date}T00:00:00`);
      const start = startDate ? new Date(`${startDate}T00:00:00`) : null;
      const end = endDate ? new Date(`${endDate}T23:59:59`) : null;

      const matchesStart = !start || transactionDate >= start;
      const matchesEnd = !end || transactionDate <= end;

      return matchesCategory && matchesStart && matchesEnd;
    });
  }, [category, startDate, endDate]);

  return (
    <SafeAreaView style={styles.container} edges={["left", "right", "bottom"]}>
      <View style={styles.content}>
        <Text style={styles.title}>Transações</Text>

        <View style={styles.filtersCard}>
          <Text style={styles.filterTitle}>Categoria</Text>

          <View style={styles.chipsRow}>
            <FilterChip
              label="Todas"
              active={category === "todas"}
              onPress={() => setCategory("todas")}
            />
            <FilterChip
              label="Depósito"
              active={category === "deposito"}
              onPress={() => setCategory("deposito")}
            />
            <FilterChip
              label="Transferência"
              active={category === "transferencia"}
              onPress={() => setCategory("transferencia")}
            />
          </View>

          <Text style={[styles.filterTitle, { marginTop: 16 }]}>
            Período
          </Text>

          <View style={styles.dateRow}>
            <View style={styles.dateField}>
              <Text style={styles.inputLabel}>Data inicial</Text>
              <TextInput
                value={startDate}
                onChangeText={setStartDate}
                placeholder="2023-10-01"
                style={styles.input}
                keyboardType="numbers-and-punctuation"
              />
            </View>

            <View style={styles.dateField}>
              <Text style={styles.inputLabel}>Data final</Text>
              <TextInput
                value={endDate}
                onChangeText={setEndDate}
                placeholder="2023-10-31"
                style={styles.input}
                keyboardType="numbers-and-punctuation"
              />
            </View>
          </View>

          <Pressable
            style={styles.clearButton}
            onPress={() => {
              setCategory("todas");
              setStartDate("");
              setEndDate("");
            }}
          >
            <Text style={styles.clearButtonText}>Limpar filtros</Text>
          </Pressable>
        </View>

        <TransactionsList
          transactions={filteredTransactions}
          title="Lista de Transações"
        />
      </View>
    </SafeAreaView>
  );
}

type FilterChipProps = {
  label: string;
  active: boolean;
  onPress: () => void;
};

function FilterChip({ label, active, onPress }: FilterChipProps) {
  return (
    <Pressable
      onPress={onPress}
      style={[styles.chip, active && styles.chipActive]}
    >
      <Text style={[styles.chipText, active && styles.chipTextActive]}>
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F6FA",
  },
  content: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    color: "#111",
    marginBottom: 16,
  },
  filtersCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },
  filterTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "#111",
    marginBottom: 10,
  },
  chipsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  chip: {
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 999,
    backgroundColor: "#EEF3FF",
  },
  chipActive: {
    backgroundColor: "#1F3C88",
  },
  chipText: {
    color: "#1F3C88",
    fontWeight: "600",
  },
  chipTextActive: {
    color: "#fff",
  },
  dateRow: {
    flexDirection: "row",
    gap: 12,
  },
  dateField: {
    flex: 1,
  },
  inputLabel: {
    fontSize: 13,
    color: "#555",
    marginBottom: 6,
  },
  input: {
    height: 44,
    borderWidth: 1,
    borderColor: "#D9DFEA",
    borderRadius: 12,
    paddingHorizontal: 12,
    backgroundColor: "#fff",
  },
  clearButton: {
    marginTop: 16,
    alignSelf: "flex-start",
  },
  clearButtonText: {
    color: "#1F3C88",
    fontWeight: "700",
  },
});