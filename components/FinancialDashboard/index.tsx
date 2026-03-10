import React, { useMemo } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import Svg, { Circle, G } from "react-native-svg";

import { Transaction } from "@/types";

import {
  calculateBalance,
  calculateTotalDeposits,
  calculateTotalTransfers,
} from "@/utils/financeUtils";
import { formatCurrency } from "@/utils/formatCurrency";
import { formatDateMini } from "@/utils/formatters";

interface FinancialDashboardProps {
  transaction: Transaction[];
}

export const FinancialDashboard: React.FC<FinancialDashboardProps> = ({
  transaction,
}) => {
  const currentBalance = calculateBalance(transaction);
  const totalDeposits = calculateTotalDeposits(transaction);
  const totalTransfers = calculateTotalTransfers(transaction);

  const chartAnalysis = useMemo(() => {
    const dailyData: Record<
      string,
      { date: string; deposito: number; transferencia: number }
    > = {};

    transaction.forEach((t) => {
      if (t.type === "") return;

      if (!dailyData[t.date]) {
        dailyData[t.date] = { date: t.date, deposito: 0, transferencia: 0 };
      }

      if (t.type === "deposito") dailyData[t.date].deposito += t.value;
      else if (t.type === "transferencia")
        dailyData[t.date].transferencia += t.value;
    });

    const chartData = Object.values(dailyData).sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
    );

    const maxDailyValue = Math.max(
      ...chartData.map((d) => Math.max(d.deposito, d.transferencia)),
      1,
    );

    const totalVolume = totalDeposits + totalTransfers;
    const depositPct =
      totalVolume > 0 ? (totalDeposits / totalVolume) * 100 : 0;

    return {
      chartData,
      maxDailyValue,
      depositPct,
    };
  }, [transaction, totalDeposits, totalTransfers]);

  const radius = 40;
  const strokeWidth = 20;
  const circumference = 2 * Math.PI * radius;
  const depositDash = (chartAnalysis.depositPct / 100) * circumference;

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.summaryTitle}>Análise Financeira</Text>

      {/* Cards de Resumo */}
      <View style={styles.summaryGrid}>
        <View style={styles.card}>
          <Text style={styles.cardLabel}>Saldo Atual</Text>
          <Text
            style={[
              styles.cardValue,
              currentBalance >= 0 ? styles.neutral : styles.negativeText,
            ]}
          >
            {formatCurrency(currentBalance)}
          </Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.cardLabel}>Entradas</Text>
          <Text style={[styles.cardValue, styles.positiveText]}>
            {formatCurrency(totalDeposits)}
          </Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.cardLabel}>Saídas</Text>
          <Text style={[styles.cardValue, styles.negativeText]}>
            {formatCurrency(totalTransfers)}
          </Text>
        </View>
      </View>

      <View style={styles.chartsGrid}>
        {/* Gráfico de Barras */}
        <View style={styles.chartCard}>
          <Text style={styles.chartTitle}>Fluxo Diário</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.barChartContainer}
          >
            {chartAnalysis.chartData.length === 0 ? (
              <Text style={styles.noData}>Sem dados</Text>
            ) : (
              chartAnalysis.chartData.map((data) => (
                <View key={data.date} style={styles.barGroup}>
                  <View style={styles.barsWrapper}>
                    <View
                      style={[
                        styles.bar,
                        styles.barDeposit,
                        {
                          height: `${(data.deposito / chartAnalysis.maxDailyValue) * 100}%`,
                        },
                      ]}
                    />
                    <View
                      style={[
                        styles.bar,
                        styles.barTransfer,
                        {
                          height: `${(data.transferencia / chartAnalysis.maxDailyValue) * 100}%`,
                        },
                      ]}
                    />
                  </View>
                  <Text style={styles.barDate}>
                    {formatDateMini(data.date)}
                  </Text>
                </View>
              ))
            )}
          </ScrollView>
        </View>

        {/* Gráfico de Distribuição (Donut) */}
        <View style={styles.chartCard}>
          <Text style={styles.chartTitle}>Distribuição</Text>
          <View style={styles.donutContainer}>
            <View style={styles.svgWrapper}>
              <Svg width="120" height="120" viewBox="0 0 120 120">
                <G rotation="-90" origin="60, 60">
                  <Circle
                    cx="60"
                    cy="60"
                    r={radius}
                    stroke="#ef4444"
                    strokeWidth={strokeWidth}
                    fill="transparent"
                  />
                  <Circle
                    cx="60"
                    cy="60"
                    r={radius}
                    stroke="#10b981"
                    strokeWidth={strokeWidth}
                    fill="transparent"
                    strokeDasharray={circumference}
                    strokeDashoffset={circumference - depositDash}
                    strokeLinecap="butt"
                  />
                </G>
              </Svg>
              <View style={styles.donutHoleText}>
                <Text style={styles.donutLabel}>Entradas</Text>
                <Text style={styles.donutValue}>
                  {Math.round(chartAnalysis.depositPct)}%
                </Text>
              </View>
            </View>

            {/* Legenda */}
            <View style={styles.legend}>
              <View style={styles.legendItem}>
                <View style={[styles.dot, { backgroundColor: "#10b981" }]} />
                <Text style={styles.legendText}>Entradas</Text>
              </View>
              <View style={styles.legendItem}>
                <View style={[styles.dot, { backgroundColor: "#ef4444" }]} />
                <Text style={styles.legendText}>Saídas</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f9fafb" },
  content: { padding: 16 },
  summaryTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
    color: "#111827",
  },
  summaryGrid: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 24,
    gap: 8,
  },
  card: {
    flex: 1,
    backgroundColor: "#ffffff",
    padding: 12,
    borderRadius: 8,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  cardLabel: { fontSize: 12, color: "#6b7280", marginBottom: 4 },
  cardValue: { fontSize: 16, fontWeight: "bold" },
  neutral: { color: "#111827" },
  positiveText: { color: "#10b981" },
  negativeText: { color: "#ef4444" },
  chartsGrid: { gap: 16 },
  chartCard: {
    backgroundColor: "#ffffff",
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  chartTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 16,
    color: "#374151",
  },
  barChartContainer: {
    flexDirection: "row",
    height: 150,
    alignItems: "flex-end",
    paddingBottom: 20,
  },
  noData: { color: "#999", alignSelf: "center" },
  barGroup: { alignItems: "center", marginRight: 12, width: 40 },
  barsWrapper: {
    flexDirection: "row",
    height: 120,
    width: 24,
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  bar: { width: 10, borderTopLeftRadius: 2, borderTopRightRadius: 2 },
  barDeposit: { backgroundColor: "#10b981" },
  barTransfer: { backgroundColor: "#ef4444" },
  barDate: {
    fontSize: 10,
    color: "#6b7280",
    marginTop: 8,
    position: "absolute",
    bottom: -20,
  },
  donutContainer: { alignItems: "center" },
  svgWrapper: {
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
    width: 120,
    height: 120,
  },
  donutHoleText: { position: "absolute", alignItems: "center" },
  donutLabel: { fontSize: 10, color: "#6b7280" },
  donutValue: { fontSize: 16, fontWeight: "bold", color: "#111827" },
  legend: { flexDirection: "row", marginTop: 16, gap: 16 },
  legendItem: { flexDirection: "row", alignItems: "center", gap: 4 },
  dot: { width: 10, height: 10, borderRadius: 5, marginRight: 6 },
  legendText: { fontSize: 12, color: "#374151" },
});

export default FinancialDashboard;
