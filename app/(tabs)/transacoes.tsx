import { StyleSheet, Text, View } from "react-native";

export default function TransacoesScreen() {
    return (
        <View style={styles.container}>
            <Text>Tela de transações</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
});