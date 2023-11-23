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

import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../firebaseConfig";

// Inicializamos Firebase fuera del componente para evitar re-inicializaciones en cada render

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default function SignUpScreen() {
  const navigation = useNavigation();
  const [secureText1, setSecureText1] = useState(true);
  const [secureText2, setSecureText2] = useState(true);
  const [openEye1, setOpenEye1] = useState(true);
  const [openEye2, setOpenEye2] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [form, setForm] = useState({
    correo: "",
    nombre: "",
    contraseña: "",
    contraseñaRepe: "",
  });

  const handleCreateAccount = () => {
    // Verifica que las contraseñas coincidan antes de intentar crear el usuario
    if (form.contraseña !== form.contraseñaRepe) {
      Alert.alert("Error", "Las contraseñas no coinciden.");
      return;
    }

    createUserWithEmailAndPassword(auth, form.correo, form.contraseña)
      .then((userCredential) => {
        // Cuenta creada exitosamente, ahora puedes hacer algo con el usuario
        console.log("Cuenta Creada");
        const user = userCredential.user;
        console.log(user);
        navigation.navigate("Main"); // Navegar a la main page.
      })
      .catch((error) => {
        // Manejo de errores, mostrando una alerta en la pantalla
        console.log(error);
        Alert.alert("Error", error.message);
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

  function handleSecureText2() {
    setSecureText2(!secureText2);
    setOpenEye2(!openEye2);
  }

  // funcion que maneja el registro según los datos ingresados por el usuario.

  const handleRegistration = () => {
    if (
      !form.correo ||
      !form.nombre ||
      !form.contraseña ||
      !form.contraseñaRepe
    ) {
      setErrorMessage("Llena todos los datos");
    } else if (form.contraseña !== form.contraseñaRepe) {
      setErrorMessage("Las contraseñas no coinciden");
    } else {
      setErrorMessage(""); // Limpiar mensaje de error si todo está bien
      handleCreateAccount(); // Crear la cuenta con Firebase Auth
    }
  };

  return (
    <View style={styles.container}>
      <View style={{ alignItems: "center", marginTop: 64 }}>
        <Image
          style={styles.logoStyle}
          source={require("../assets/images/logo.png")}
        />
        <Text style={styles.registerText}>Crea tu cuenta</Text>
        <Text style={styles.registerSecondaryText}>
          ¡Bienvenido! Llena tus datos para continuar
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
          name="nombre"
          placeholder="Nombre Completo"
          style={styles.input}
          onChangeText={handleFormChange("nombre")}
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
        <TextInput
          name="contraseñaRepe"
          placeholder="Confirmar Contraseña"
          secureTextEntry={secureText2}
          style={styles.passwordInput}
          onChangeText={handleFormChange("contraseñaRepe")}
        />
        <TouchableOpacity onPress={handleSecureText2}>
          <Ionicons
            name={openEye2 ? "ios-eye-outline" : "ios-eye-off-outline"}
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
            <Text style={styles.btnText}>Regístrate</Text>
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
