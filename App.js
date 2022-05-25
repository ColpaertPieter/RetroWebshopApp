import { NavigationContainer } from "@react-navigation/native";
import { useState } from "react";
import { StyleSheet, Text, View, StatusBar } from "react-native";
import * as Font from "expo-font";
import AppLoading from "expo-app-loading";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import RootNavigation from "./src/navigation/RootNavigation";
import { store, persistor } from "./store";

StatusBar.setBarStyle("light-content", true);

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);

  const fetchFonts = () => {
    console.log("Fonts loading");
    return Font.loadAsync({
      "roboto-regular": require("./assets/fonts/Roboto-Regular.ttf"),
      "roboto-bold": require("./assets/fonts/Roboto-Bold.ttf"),
      "roboto-italic": require("./assets/fonts/Roboto-Italic.ttf"),
    });
  };

  if (!fontLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setFontLoaded(true)}
        onError={console.log}
      />
    );
  }

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <RootNavigation />
      </PersistGate>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
