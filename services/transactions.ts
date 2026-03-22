import { auth, db } from "@/services/firebase";
import {
    addDoc,
    collection,
    deleteDoc,
    doc,
    onSnapshot,
    query,
    Timestamp,
    updateDoc,
    where
} from "firebase/firestore";

export type FirestoreTransaction = {
    id: string;
    userId: string;
    type: "deposito" | "transferencia";
    value: number;
    description: string;
    createdAt: Date;
};

type CreateTransactionInput = {
    type: "deposito" | "transferencia";
    value: number;
    description: string;
};

type UpdateTransactionInput = {
    type: "deposito" | "transferencia";
    value: number;
    description: string;
};

export async function addTransaction(input: CreateTransactionInput) {
    const user = auth.currentUser;

    if (!user) {
        throw new Error("Usuário não autenticado.");
    }

    await addDoc(collection(db, "transactions"), {
        userId: user.uid,
        type: input.type,
        value: input.value,
        description: input.description,
        createdAt: Timestamp.now(),
    });
}

export function subscribeToUserTransactions(
    callback: (transactions: FirestoreTransaction[]) => void
) {
    const user = auth.currentUser;

    console.log("uid logado:", user?.uid);

    if (!user) {
        callback([]);
        return () => { };
    }

    const q = query(
        collection(db, "transactions"),
        where("userId", "==", user.uid),
        //orderBy("createdAt", "desc")
    );

    return onSnapshot(
        q,
        (snapshot) => {
            console.log("docs encontrados:", snapshot.size);

            const transactions: FirestoreTransaction[] = snapshot.docs.map((item) => {
                const data = item.data();

                console.log("doc:", item.id, data);

                return {
                    id: item.id,
                    userId: data.userId,
                    type: data.type,
                    value: Number(data.value),
                    description: data.description ?? "",
                    createdAt: data.createdAt?.toDate?.() ?? new Date(),
                };
            });

            callback(transactions);
        },
        (error) => {
            console.log("erro no onSnapshot:", error);
            callback([]);
        }
    );
}

export async function removeTransaction(transactionId: string) {
    await deleteDoc(doc(db, "transactions", transactionId));
}

export async function updateTransaction(
    transactionId: string,
    input: UpdateTransactionInput
) {
    const user = auth.currentUser;

    if (!user) {
        throw new Error("Usuário não autenticado.");
    }

    const ref = doc(db, "transactions", transactionId);

    await updateDoc(ref, {
        type: input.type,
        value: input.value,
        description: input.description,
    });
}

export function calculateBalance(transactions: FirestoreTransaction[]) {
    return transactions.reduce((total, transaction) => {
        if (transaction.type === "deposito") {
            return total + transaction.value;
        }

        return total - transaction.value;
    }, 0);
}