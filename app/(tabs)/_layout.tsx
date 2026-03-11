import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { useState } from "react";
import BankHeader from "../../components/BankHeader";

export default function TabsLayout() {
    const [showBalance, setShowBalance] = useState(true);

    const toggleBalance = () => {
        setShowBalance((prev) => !prev);
    };
    return (
        <Tabs
            screenOptions={{
                headerShown: true,
                header: () => (
                    <BankHeader
                        userName="Marciano"
                        balance="R$ 12.450,90"
                        showBalance={showBalance}
                        onToggleBalance={toggleBalance}
                    />
                ),
                tabBarStyle: {
                    height: 64,
                    paddingTop: 8,
                    paddingBottom: 8,
                },
                sceneStyle: {
                    backgroundColor: "#F4F6FA",
                },
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: "Início",
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="home-outline" size={size} color={color} />
                    ),
                }}
            />

            <Tabs.Screen
                name="transacoes"
                options={{
                    title: "Transações",
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="list-outline" size={size} color={color} />
                    ),
                }}
            />
        </Tabs>
    );
}