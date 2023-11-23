import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";

import React, { useState, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../firebaseConfig";

// Inicializamos Firebase fuera del componente para evitar re-inicializaciones en cada render

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default function SignInScreen() {
  const navigation = useNavigation();
  const [secureText1, setSecureText1] = useState(true);
  const [openEye1, setOpenEye1] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [form, setForm] = useState({
    correo: "",
    contraseña: "",
  });

  const handleSignIn = () => {
    signInWithEmailAndPassword(auth, form.correo, form.contraseña)
      .then((userCredential) => {
        console.log("Usuario ingresado con éxito!");
        const user = userCredential.user;
        console.log(user);
        navigation.navigate("Main"); // Navegar a la pantalla principal
      })
      .catch((error) => {
        console.log(error);
        setErrorMessage(error.message);
      });
  };

  const handleFormChange = (name) => (value) => {
    setForm({
      ...form,
      [name]: value,
    });
  };

  // funciones para los iconos que permiten visualizar la contraseña u ocultar los caracteres.

  function handleSecureText1() {
    setSecureText1(!secureText1);
    setOpenEye1(!openEye1);
  }

  // funcion que maneja el registro según los datos ingresados por el usuario.

  const handleRegistration = () => {
    if (!form.correo || !form.contraseña) {
      setErrorMessage("Llena todos los datos");
    } else {
      setErrorMessage(""); // Limpiar mensaje de error si todo está bien
      handleSignIn(); // ingresar con la cuenta creada con Firebase Auth
    }
  };

  return (
    <View style={styles.container}>
      <View style={{ alignItems: "center", marginTop: 64 }}>
        <Image
          style={styles.logoStyle}
          source={require("../assets/images/logo.png")}
        />
        <Text style={styles.registerText}>Ingresa tu cuenta</Text>
        <Text style={styles.registerSecondaryText}>
          ¡Hola de nuevo! Llena tus datos
        </Text>
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          name="correo"
          placeholder="Correo"
          keyboardType="email-address"
          style={styles.input}
          onChangeText={handleFormChange("correo")}
        />
        <TextInput
          name="contraseña"
          placeholder="Contraseña"
          secureTextEntry={secureText1}
          style={styles.passwordInput}
          onChangeText={handleFormChange("contraseña")}
        />
        <TouchableOpacity onPress={handleSecureText1}>
          <Ionicons
            name={openEye1 ? "ios-eye-outline" : "ios-eye-off-outline"}
            size={22}
            color="#929995"
            style={styles.passwordIcon}
          />
        </TouchableOpacity>
      </View>
      <View>
        {errorMessage ? (
          <Text style={styles.errorText}>{errorMessage}</Text>
        ) : null}
        <TouchableOpacity
          onPress={() => {
            handleRegistration();
          }}
        >
          <View style={styles.registerBtn}>
            <Text style={styles.btnText}>Ingresa</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 32,
  },
  brandTitle: {
    fontFamily: "MontserratSemiBold",
    fontSize: 48,
    color: "#0D0760",
    textAlign: "center",
    marginTop: 40,
  },
  registerText: {
    fontFamily: "MontserratRegular",
    fontSize: 24,
    color: "#0D0760",
    textAlign: "center",
    marginTop: 48,
  },
  registerSecondaryText: {
    fontFamily: "MontserratRegular",
    fontSize: 14,
    color: "#929995",
    textAlign: "center",
    marginTop: 8,
  },
  inputContainer: {
    paddingLeft: 14,
    marginTop: 24,
  },
  input: {
    paddingVertical: 12,
    paddingHorizontal: 12,
    marginTop: 16,
    borderRadius: 12,
    width: 300,
    backgroundColor: "#EBEBEB",
    fontFamily: "MontserratRegular",
  },
  passwordInput: {
    position: "relative",
    paddingVertical: 12,
    paddingHorizontal: 12,
    marginTop: 16,
    borderRadius: 12,
    width: 300,
    backgroundColor: "#EBEBEB",
    fontFamily: "MontserratRegular",
  },
  passwordIcon: {
    position: "absolute",
    right: 22,
    bottom: 9,
  },
  registerBtn: {
    paddingVertical: 10,
    paddingHorizontal: 40,
    backgroundColor: "#1F1F1F",
    borderRadius: 10,
    marginTop: 56,
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
  errorText: {
    fontFamily: "MontserratRegular",
    fontSize: 14,
    color: "red",
    marginLeft: 14,
    marginTop: 16,
  },
  logoStyle: {
    width: 220,
    height: 115,
    alignItems: "center",
    justifyContent: "center",
  },
});
