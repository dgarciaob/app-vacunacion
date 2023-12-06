import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React, { useEffect, useContext } from "react";
import UserContext from "../contextos/UserProvider";
import { useNavigation } from "@react-navigation/native";
import { getAuth, signOut } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function HomeScreen() {
  const navigation = useNavigation();
  const auth = getAuth();

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        // Navega a la pantalla SignInScreen después de cerrar sesión
        navigation.navigate("SignIn");
      })
      .catch((error) => {
        // Opcional: maneja cualquier error que ocurra durante el cierre de sesión
        console.error(error);
      });
  };

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.text}>Pediatras en Culiacan</Text>
      </View>
      <View>
        <View style={styles.subTitleContainer}>
          <Text style={styles.secondaryText}>Vacunación</Text>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate("Vaccine0009")}>
          <View style={styles.registerBtn}>
            <Text style={styles.btnText}>Niños de 0 a 9 años</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Vaccine1015")}>
          <View style={styles.registerBtn2}>
            <Text style={styles.btnText}>Niños de 10 a 15 años</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View>
        <View style={styles.subTitleContainer2}>
          <Text style={styles.secondaryText}>Servicios de Pediatría</Text>
        </View>
        <View>
          <TouchableOpacity>
            <View style={styles.registerBtn2}>
              <Text style={styles.btnText}>Conoce los servicios</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <View>
        <View style={styles.subTitleContainer2}>
          <Text style={styles.secondaryText}>Crear el perfil de tu hijo</Text>
        </View>
        <View>
          <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
            <View style={styles.registerBtn2}>
              <Text style={styles.btnText}>Crear Perfil</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <View style={{ marginTop: 40 }}>
        <TouchableOpacity onPress={handleSignOut}>
          <View style={styles.registerBtn3}>
            <Text style={styles.btnText}>Cerrar sesión</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 32,
    marginTop: 40,
  },
  subTitleContainer: {
    marginTop: 48,
  },
  subTitleContainer2: {
    marginTop: 48,
  },
  text: {
    fontFamily: "MontserratSemiBold",
    fontSize: 24,
  },
  secondaryText: {
    fontFamily: "MontserratRegular",
    fontSize: 16,
  },
  registerBtn: {
    paddingVertical: 10,
    paddingHorizontal: 40,
    backgroundColor: "#81c3d3",
    borderRadius: 10,
    marginTop: 16,
    marginLeft: 14,
    alignItems: "center",
    justifyContent: "center",
    width: 300,
  },
  btnText: {
    fontFamily: "MontserratSemiBold",
    fontSize: 20,
    color: "white",
    textAlign: "center",
  },
  registerBtn2: {
    paddingVertical: 10,
    paddingHorizontal: 40,
    backgroundColor: "#81c3d3",
    borderRadius: 10,
    marginTop: 32,
    marginLeft: 14,
    alignItems: "center",
    justifyContent: "center",
    width: 300,
  },
  registerBtn3: {
    paddingVertical: 10,
    paddingHorizontal: 40,
    backgroundColor: "#EB7D53",
    borderRadius: 10,
    marginTop: 32,
    marginLeft: 14,
    alignItems: "center",
    justifyContent: "center",
    width: 300,
  },
});
