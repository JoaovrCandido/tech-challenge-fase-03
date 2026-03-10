import { SafeAreaView } from "react-native-safe-area-context";

import TransactionsList from "@/components/TransactionList";
import { mockTransactions } from "@/mocks/transactions";

export default function TransactionsPage() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TransactionsList
        transactions={mockTransactions}
        title="Lista de Transações"
      />
    </SafeAreaView>
  );
}
