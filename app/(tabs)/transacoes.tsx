import TransactionsList from "@/components/TransactionList";
import { mockTransactions } from "@/mocks/transactions";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function TransacoesScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <TransactionsList
        transactions={mockTransactions}
        title="Lista de Transações"
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
