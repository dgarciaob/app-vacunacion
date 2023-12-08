import { View, Text, StyleSheet, TouchableOpacity, Modal } from "react-native";
import React, { useState } from "react";
import { vaccineData2 } from "../data/vaccines";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function Vaccine1015() {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState();
  const [selectedVaccine, setSelectedVaccine] = useState(null);

  // Función para mostrar el modal con la información de la vacuna seleccionada

  const handleVaccinePress = (vaccine) => {
    setSelectedVaccine(vaccine);
    setModalVisible(true);
  };
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <TouchableOpacity onPress={() => navigation.navigate("Main")}>
          <AntDesign name="arrowleft" size={18} color="black" />
        </TouchableOpacity>
        <Text style={styles.text}>Niños de 10 a 15 años</Text>
      </View>
      <View style={{ marginTop: 40 }}>
        {vaccineData2.map((vacuna, id) => {
          return (
            <TouchableOpacity
              key={vacuna.id + id}
              style={styles.vaccines}
              onPress={() => handleVaccinePress(vacuna)}
            >
              <Text style={{ fontFamily: "MontserratRegular" }}>
                {vacuna.title}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
      {selectedVaccine && (
        <Modal
          animationType="slide"
          transparent={false}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.modalView}>
            <Text style={styles.modalText}>{selectedVaccine.title}</Text>
            <Text style={styles.modalText2}>{selectedVaccine.description}</Text>
            <TouchableOpacity
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle}>¡Entendido!</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      )}
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
  titleContainer: {
    flexDirection: "row",
    gap: 24,
    alignItems: "center",
  },
  vaccines: {
    marginTop: 24,
  },
  modalView: {
    margin: 20,
    marginTop: 64,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
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
  modalText2: {
    marginBottom: 15,
    textAlign: "center",
    fontFamily: "MontserratRegular",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontFamily: "MontserratSemiBold",
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonClose: {
    backgroundColor: "#81c3d3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    fontFamily: "MontserratRegular",
  },
});
