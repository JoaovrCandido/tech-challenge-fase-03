import { Ionicons } from "@expo/vector-icons";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

type BankHeaderProps = {
    userName?: string;
    balance?: string;
};

export default function BankHeader({
    userName = "Marciano",
    balance = "R$ 12.450,90",
}: BankHeaderProps) {
    return (
        <View style={styles.wrapper}>
            <View style={styles.topBar}>
                <View style={styles.leftContent}>
                    <View style={styles.logoCircle}>
                        <Image
                            source={require("../../assets/logo.png")}
                            style={styles.logo}
                            resizeMode="contain"
                        />
                    </View>

                    <View>
                        <Text style={styles.greeting}>Olá,</Text>
                        <Text style={styles.userName}>{userName}</Text>
                    </View>
                </View>

                <View style={styles.actions}>
                    <TouchableOpacity style={styles.iconButton}>
                        <Ionicons name="eye-outline" size={20} color="#fff" />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.iconButton}>
                        <Ionicons name="notifications-outline" size={20} color="#fff" />
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.balanceCard}>
                <Text style={styles.balanceLabel}>Saldo em conta</Text>
                <Text style={styles.balanceValue}>{balance}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        backgroundColor: "#0c6779",
        paddingTop: 52,
        paddingHorizontal: 16,
        paddingBottom: 20,
        height: 190,
    },
    topBar: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    leftContent: {
        flexDirection: "row",
        alignItems: "center",
    },
    logoCircle: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: "rgba(255,255,255,0.15)",
        justifyContent: "center",
        alignItems: "center",
        marginRight: 12,
    },
    logo: {
        width: 128,
        height: 128,
    },
    greeting: {
        color: "rgba(255,255,255,0.8)",
        fontSize: 13,
    },
    userName: {
        color: "#fff",
        fontSize: 20,
        fontWeight: "700",
    },
    actions: {
        flexDirection: "row",
        gap: 8,
    },
    iconButton: {
        width: 38,
        height: 38,
        borderRadius: 19,
        backgroundColor: "rgba(255,255,255,0.15)",
        justifyContent: "center",
        alignItems: "center",
    },
    balanceCard: {
        backgroundColor: "#fff",
        marginTop: 18,
        borderRadius: 18,
        padding: 16,
    },
    balanceLabel: {
        fontSize: 14,
        color: "#666",
    },
    balanceValue: {
        fontSize: 28,
        fontWeight: "700",
        color: "#111",
        marginTop: 8,
    },
});