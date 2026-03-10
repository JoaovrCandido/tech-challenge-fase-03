import { Drawer } from "expo-router/drawer";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer>
        <Drawer.Screen
          name="index"
          options={{
            drawerLabel: "Dashboard",
            title: "Dashboard",
          }}
        />
        <Drawer.Screen
          name="TransactionsPage/index"
          options={{
            drawerLabel: "Lista de Transações",
            title: "Lista de Transações",
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
}
