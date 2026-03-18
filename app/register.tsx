import { register } from "@/services/auth";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
    Alert,
    Button,
    StyleSheet,
    Text,
    TextInput,
    View,
} from "react-native";

export default function RegisterScreen() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const router = useRouter();

    async function handleRegister() {
        try {
            await register(email.trim(), password);

            Alert.alert("Sucesso", "Usuário criado!", [
                {
                    text: "OK",
                    onPress: () => router.replace("/(tabs)"),
                },
            ]);
        } catch (error: any) {
            Alert.alert("Erro", error.message);
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Cadastro</Text>

            <TextInput
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                style={styles.input}
            />

            <TextInput
                placeholder="Senha"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                style={styles.input}
            />

            <Button title="Cadastrar" onPress={handleRegister} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        padding: 20,
    },

    title: {
        fontSize: 22,
        fontWeight: "bold",
        marginBottom: 20,
    },

    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        padding: 12,
        marginBottom: 12,
        borderRadius: 8,
    },
});