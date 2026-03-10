import FinancialDashboard from "@/components/FinancialDashboard";
import { mockTransactions } from "@/mocks/transactions";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <FinancialDashboard transaction={mockTransactions} />
    </SafeAreaView>
  );
}
