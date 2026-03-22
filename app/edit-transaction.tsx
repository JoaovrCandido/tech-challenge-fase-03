import { updateTransaction } from "@/services/transactions";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import {
    Alert,
    Button,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

export default function EditTransactionScreen() {
    const router = useRouter();
    const params = useLocalSearchParams<{
        id: string;
        type: "deposito" | "transferencia";
        value: string;
        description: string;
    }>();

    const [type, setType] = useState<"deposito" | "transferencia">(
        params.type ?? "deposito"
    );
    const [value, setValue] = useState(params.value ?? "");
    const [description, setDescription] = useState(params.description ?? "");

    async function handleSave() {
        if (!params.id || !value || !description) {
            Alert.alert("Erro", "Preencha todos os campos");
            return;
        }

        try {
            await updateTransaction(params.id, {
                type,
                value: Number(value),
                description,
            });

            Alert.alert("Sucesso", "Transação atualizada!");
            router.back();
        } catch (error: any) {
            Alert.alert("Erro", error.message ?? "Não foi possível atualizar.");
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Editar Transação</Text>

            <View style={styles.row}>
                <TouchableOpacity
                    style={[styles.typeButton, type === "deposito" && styles.active]}
                    onPress={() => setType("deposito")}
                >
                    <Text>Depósito</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.typeButton, type === "transferencia" && styles.active]}
                    onPress={() => setType("transferencia")}
                >
                    <Text>Transferência</Text>
                </TouchableOpacity>
            </View>

            <TextInput
                placeholder="Valor"
                value={value}
                onChangeText={setValue}
                keyboardType="numeric"
                style={styles.input}
            />

            <TextInput
                placeholder="Descrição"
                value={description}
                onChangeText={setDescription}
                style={styles.input}
            />

            <Button title="Salvar alterações" onPress={handleSave} />

            <TouchableOpacity style={styles.cancelButton} onPress={() => router.back()}>
                <Text style={styles.cancelButtonText}>Cancelar</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, backgroundColor: "#fff" },
    title: { fontSize: 22, fontWeight: "700", marginBottom: 20 },
    row: { flexDirection: "row", marginBottom: 16, gap: 10 },
    typeButton: {
        flex: 1,
        padding: 12,
        borderWidth: 1,
        borderRadius: 8,
        alignItems: "center",
    },
    active: { backgroundColor: "#DCE6FF" },
    input: {
        borderWidth: 1,
        padding: 12,
        marginBottom: 12,
        borderRadius: 8,
    },
    cancelButton: { marginTop: 12, alignItems: "center" },
    cancelButtonText: { color: "#666", fontSize: 14 },
});