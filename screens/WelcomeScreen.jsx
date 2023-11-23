import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import React, { useEffect } from "react";

import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { LinearGradient } from "expo-linear-gradient";

import { colors } from "../constants/colors";

import { useNavigation } from "@react-navigation/native";

export default function WelcomeScreen() {
  const navigation = useNavigation();

  const [fontsLoaded] = useFonts({
    MontserratLight: require("../assets/fonts/Montserrat-Light.ttf"),
    MontserratRegular: require("../assets/fonts/Montserrat-Regular.ttf"),
    MontserratSemiBold: require("../assets/fonts/Montserrat-SemiBold.ttf"),
  });

  useEffect(() => {
    async function prepare() {
      await SplashScreen.preventAutoHideAsync();
    }
    prepare();
  }, []);

  if (!fontsLoaded) {
    return null;
  } else {
    SplashScreen.hideAsync();
  }

  return (
    <LinearGradient
      style={{ flex: 1 }}
      colors={[colors.gradientFrom, colors.gradientTo]}
    >
      <SafeAreaView>
        <View style={styles.container}>
          <Image
            style={styles.logoStyle}
            source={require("../assets/images/logo.png")}
          />
        </View>
        <View style={styles.container}>
          <Text style={styles.textSecondary}>
            ¡Lleva un registro simple de las vacunas de tus hijos!
          </Text>
        </View>
        <View style={styles.container}>
          <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
            <View style={styles.registerBtn}>
              <Text style={styles.btnText}>Regístrate</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate("SignIn")}
            style={{ marginTop: 24 }}
          >
            <View>
              <Text style={styles.accountText}>
                Ya tienes cuenta? Ingresa aquí
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 32,
    marginTop: 24,
    alignItems: "center",
  },
  text: {
    fontFamily: "MontserratSemiBold",
    fontSize: 40,
    textAlign: "center",
    color: "#505457",
  },
  textSecondary: {
    fontFamily: "MontserratRegular",
    fontSize: 25,
    textAlign: "center",
    color: "#505457",
  },
  registerBtn: {
    paddingVertical: 10,
    paddingHorizontal: 40,
    backgroundColor: "#1F1F1F",
    borderRadius: 10,
    marginTop: 56,
    alignItems: "center",
    justifyContent: "center",
  },
  btnText: {
    fontFamily: "MontserratSemiBold",
    fontSize: 20,
    color: "white",
    textAlign: "center",
  },
  logoStyle: {
    width: 220,
    height: 115,
  },
  accountText: {
    fontFamily: "MontserratRegular",
  },
});
