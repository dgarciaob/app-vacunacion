import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Modal,
} from "react-native";
import React, { useState, useContext } from "react";
import UserContext from "../contextos/UserProvider";
import { useNavigation } from "@react-navigation/native";

import { AntDesign } from "@expo/vector-icons";

import DatePicker from "react-native-modern-datepicker";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function ProfileScreen() {
  const navigation = useNavigation();
  const [openDatePicker, setOpenDatePicker] = useState(false);
  const [date, setDate] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Funciones para el DatePicker
  function handleOnPressDate() {
    setOpenDatePicker(!openDatePicker);
  }

  function handleChangeDate(propDate) {
    setDate(propDate);
    setForm((prevForm) => ({
      ...prevForm,
      date: propDate, // Asegura que la fecha se actualiza en el objeto form
    }));
  }

  // funcion para llevar el estado del formulario. Se manejan todos los inputs en un solo estado.

  const [form, setForm] = useState({
    nombre: "",
    nacionalidad: "",
    birthState: "",
    gender: "",
    date: date,
  });

  const handleFormChange = (name) => (value) => {
    setForm({
      ...form,
      [name]: value,
    });
  };

  // funcion para guardar los datos del formulario en el AsyncStorage

  const { addProfile } = useContext(UserContext);

  const saveProfileData = async (profileData) => {
    try {
      const jsonValue = JSON.stringify(profileData);
      await AsyncStorage.setItem("@profile_data", jsonValue);
    } catch (e) {
      console.error("Error saving data", e);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <TouchableOpacity onPress={() => navigation.navigate("Main")}>
          <AntDesign name="arrowleft" size={18} color="black" />
        </TouchableOpacity>
        <Text style={styles.text}>Crea el perfil de tu hijo</Text>
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          name="nombre"
          placeholder="Nombre Completo"
          style={styles.input}
          onChangeText={handleFormChange("nombre")}
        />
        <TextInput
          name="nacionalidad"
          placeholder="Nacionalidad"
          style={styles.input}
          onChangeText={handleFormChange("nacionalidad")}
        />
        <TextInput
          name="birthState"
          placeholder="Estado de nacimiento"
          style={styles.input}
          onChangeText={handleFormChange("birthState")}
        />
        <TextInput
          name="gender"
          placeholder="Género"
          style={styles.input}
          onChangeText={handleFormChange("gender")}
        />
        <TouchableOpacity
          style={styles.input}
          onPress={handleOnPressDate}
          onChangeText={handleFormChange}
        >
          <Text
            style={{
              fontFamily: "MontserratRegular",
              color: date ? "#1F1F1F" : "#B6B6B6",
            }}
          >
            {date ? date : "Fecha de nacimiento"}
          </Text>
        </TouchableOpacity>

        <Modal
          animationType="slide"
          transparent={true}
          visible={openDatePicker}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <DatePicker
                mode="calendar"
                selected={date}
                onDateChange={handleChangeDate}
                options={{
                  textHeaderColor: "#81c3d3",
                  defaultFont: "MontserratRegular",
                }}
              />
              <TouchableOpacity onPress={handleOnPressDate}>
                <Text
                  style={{ fontFamily: "MontserratRegular", color: "#81c3d3" }}
                >
                  Seleccionar Fecha
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        {/* Manejo de errores */}

        {errorMessage ? (
          <Text style={styles.errorText}>{errorMessage}</Text>
        ) : null}
        <TouchableOpacity
          onPress={() => {
            if (
              !form.nombre ||
              !form.nacionalidad ||
              !form.birthState ||
              !form.gender ||
              !form.date
            ) {
              setErrorMessage("Llena todos los datos");
            } else {
              console.log(form);
              setErrorMessage("");
              addProfile(form);
              saveProfileData(form);
              navigation.navigate("VaccineTracker");
            }
          }}
        >
          <View style={styles.registerBtn2}>
            <Text style={styles.btnText}>Crear Perfil</Text>
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
  text: {
    fontFamily: "MontserratSemiBold",
    fontSize: 24,
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
  btnText: {
    fontFamily: "MontserratSemiBold",
    fontSize: 20,
    color: "white",
    textAlign: "center",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    width: "90%",
    padding: 24,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  titleContainer: {
    flexDirection: "row",
    gap: 24,
    alignItems: "center",
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
    alignItems: "center",
    justifyContent: "center",
    width: 300,
  },
  errorText: {
    fontFamily: "MontserratRegular",
    fontSize: 14,
    color: "red",
    marginTop: 16,
  },
});
