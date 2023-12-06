import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Modal,
} from "react-native";
import { addMonths, format } from "date-fns";
import React, { useState, useContext, useEffect } from "react";
import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { vaccineData } from "../data/vaccines";

import { useUserVaccines } from "../contextos/VaccinesProvider";

import UserContext from "../contextos/UserProvider";

import * as Notifications from "expo-notifications";

export default function VaccineCard() {
  // habilitar navegación entre screens
  const navigation = useNavigation();

  // Estado para almacenar las notificaciones programadas
  const [scheduledNotifications, setScheduledNotifications] = useState({});

  // Estado para almacenar la visibilidad del modal
  const [modalVisible, setModalVisible] = useState();
  const [selectedVaccine, setSelectedVaccine] = useState(null);

  // Función para manejar el click en el titulo de la vacuna
  const handleVaccinePress = (vaccine) => {
    const doseDates = vaccine.idealDoseDates.map((months) =>
      activeProfile
        ? format(
            addMonths(
              new Date(`${activeProfile.date.replace(/\//g, "-")}T00:00:00`),
              months
            ),
            "yyyy-MM-dd"
          )
        : ""
    );

    const detailedDoses = vaccine.dosesDetail[0]
      ? Object.entries(vaccine.dosesDetail[0]).map(([key, value], index) => ({
          name: value,
          date: doseDates[index],
        }))
      : [];

    setSelectedVaccine({
      ...vaccine,
      detailedDoses: detailedDoses,
    });
    setModalVisible(true);
  };

  // Función para programar las notificaciones
  async function schedulePushNotification(
    vaccineTitle,
    vaccinationDate,
    vaccineId
  ) {
    // Solicitar permisos para las notificaciones
    const { status } = await Notifications.requestPermissionsAsync();
    if (status !== "granted") {
      alert("No tenemos permisos para enviar notificaciones");
      return;
    }

    // Convertir vaccinationDate a un objeto Date y ajustar para enviar la notificación el día anterior a las 4:00 PM
    const notificationDateTime = new Date(vaccinationDate);
    notificationDateTime.setDate(notificationDateTime.getDate() - 1); // Un día antes. Si deseas modificar el número de días, puedes modificarlo cambiando el "1"
    notificationDateTime.setHours(16, 0, 0, 0); // Ajustar a las 4:00 PM. Si deseas modificar la hora, puedes modificarla aqui. Formato (HH, MM, SS, MS)

    const secondsUntilTrigger =
      (notificationDateTime.getTime() - Date.now()) / 1000;

    // Si la fecha de la notificación es en el futuro, programar la notificación
    if (secondsUntilTrigger > 0) {
      // Programar la notificación
      await Notifications.scheduleNotificationAsync({
        content: {
          title: "¡Vacuna a la vista!",
          body: `Se acerca la fecha para la vacuna ${vaccineTitle}. Ingresa para más información.`,
          data: {
            vaccineTitle,
            vaccinationDate: notificationDateTime.toISOString(),
          },
        },
        trigger: {
          seconds: secondsUntilTrigger,
        },
      });

      setScheduledNotifications((prev) => ({
        ...prev,
        [vaccineId]: true,
      }));
    }
  }

  // Obtener las notificaciones programadas
  useEffect(() => {
    vaccineData.forEach((vaccine) => {
      const isVaccinated = vaccinesStatus[activeProfileId]?.[vaccine.id];
      if (!isVaccinated && !scheduledNotifications[vaccine.id]) {
        const vaccinationDate = activeProfile
          ? vaccine.idealDoseDates[0] === 0
            ? new Date(`${activeProfile.date.replace(/\//g, "-")}T00:00:00`)
            : addMonths(
                new Date(`${activeProfile.date.replace(/\//g, "-")}T00:00:00`),
                vaccine.idealDoseDates[0]
              )
          : new Date();
        const formattedVaccinationDate = format(vaccinationDate, "yyyy-MM-dd");

        schedulePushNotification(
          vaccine.title,
          formattedVaccinationDate,
          vaccine.id
        );
      }
    });
  }, [activeProfile, vaccinesStatus, scheduledNotifications]);

  const { profiles, activeProfileId } = useContext(UserContext); // Obtener el ID del Perfil Activo y la Lista de Perfiles
  const activeProfile = profiles.find(
    (profile) => profile.id === activeProfileId
  ); // Encontrar Perfil Activo Usando el ID
  const dateOfBirth = activeProfile
    ? new Date(activeProfile.date.replace(/\//g, "-"))
    : null;
  const formattedDate = dateOfBirth
    ? dateOfBirth.toISOString().substring(0, 10)
    : "Fecha no definida";

  const { vaccinesStatus, setVaccinesStatus } = useUserVaccines();

  const handleToggleVaccination = (
    vaccineId,
    vaccineTitle,
    vaccinationDate
  ) => {
    const currentVaccinationStatus =
      vaccinesStatus[activeProfileId]?.[vaccineId];

    // Cambiar el estado de vacunación
    setVaccinesStatus((prevStatus) => ({
      ...prevStatus,
      [activeProfileId]: {
        ...prevStatus[activeProfileId],
        [vaccineId]: !currentVaccinationStatus,
      },
    }));

    // Si actualmente no está vacunado, programa la notificación
    if (!currentVaccinationStatus) {
      schedulePushNotification(vaccineTitle, vaccinationDate);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <TouchableOpacity onPress={() => navigation.navigate("Main")}>
          <AntDesign name="arrowleft" size={18} color="black" />
        </TouchableOpacity>
        <Text style={styles.titleText}>Cartilla de Vacunación</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {vaccineData.map((vaccine, index) => {
          const isVaccinated = vaccinesStatus[activeProfileId]?.[vaccine.id];
          const vaccinationDate = activeProfile
            ? vaccine.idealDoseDates[0] === 0
              ? new Date(`${activeProfile.date.replace(/\//g, "-")}T00:00:00`)
              : addMonths(
                  new Date(
                    `${activeProfile.date.replace(/\//g, "-")}T00:00:00`
                  ),
                  vaccine.idealDoseDates[0]
                )
            : new Date();
          const formattedVaccinationDate = format(
            vaccinationDate,
            "yyyy-MM-dd"
          );

          // Determinar el detalle de la dosis
          const doseDetail = Object.values(vaccine.dosesDetail[0])[0];

          // Determinar el mes de aplicación
          const monthOfApplication =
            vaccine.idealDoseDates[0] === 0
              ? "Al nacer"
              : `${vaccine.idealDoseDates[0]} meses`;

          return (
            <View
              key={vaccine.id + index}
              style={styles.vaccinesTitleContainer}
            >
              <View style={styles.titleAndInfoContainer}>
                <View>
                  <MaterialCommunityIcons
                    name="needle"
                    size={24}
                    color="black"
                  />
                </View>
                <View style={styles.infoContainer}>
                  <TouchableOpacity onPress={() => handleVaccinePress(vaccine)}>
                    <Text style={styles.vaccineName} numberOfLines={1}>
                      {vaccine.title}
                    </Text>
                  </TouchableOpacity>
                  <Text style={styles.vaccineDisease} numberOfLines={1}>
                    {vaccine.defense}
                  </Text>
                  <Text style={styles.vaccineDose} numberOfLines={1}>
                    {`${doseDetail} - ${monthOfApplication}`}
                  </Text>
                </View>
              </View>

              <View style={styles.dateAndButtonContainer}>
                <View>
                  <Text style={styles.dateText}>
                    {formattedVaccinationDate}
                  </Text>
                </View>
                <TouchableOpacity
                  style={{
                    backgroundColor: isVaccinated ? "#88c976" : "#EB7D53",
                    paddingHorizontal: 8,
                    paddingVertical: 8,
                    borderRadius: 8,
                  }}
                  onPress={() =>
                    handleToggleVaccination(
                      vaccine.id,
                      vaccine.title,
                      formattedVaccinationDate
                    )
                  }
                >
                  <View>
                    <Text
                      style={{
                        fontFamily: "MontserratRegular",
                        color: "white",
                      }}
                    >
                      {isVaccinated ? "Vacunado" : "Pendiente"}
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          );
        })}
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
              <Text style={styles.modalText2}>
                {selectedVaccine.description}
              </Text>
              {selectedVaccine.detailedDoses &&
                selectedVaccine.detailedDoses.map((dose, index) => (
                  <View key={index} style={styles.doseContainer}>
                    <Text style={styles.doseText}>
                      {`${dose.name} - Fecha: ${dose.date}`}
                    </Text>
                  </View>
                ))}
              <TouchableOpacity
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text style={styles.textStyle}>¡Entendido!</Text>
              </TouchableOpacity>
            </View>
          </Modal>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 32,
    marginTop: 40,
  },
  titleContainer: {
    flexDirection: "row",
    gap: 24,
    alignItems: "center",
    marginBottom: 12,
  },
  titleText: {
    fontFamily: "MontserratSemiBold",
    fontSize: 24,
  },
  vaccinesTitleContainer: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    marginBottom: 40,
    backgroundColor: "#EBEBEB",
    borderRadius: 12,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  titleAndInfoContainer: {
    flexDirection: "row",
    gap: 8,
  },
  infoContainer: {
    maxWidth: 150,
  },
  vaccineName: {
    fontFamily: "MontserratSemiBold",
    fontSize: 20,
    marginBottom: 6,
  },
  vaccineDisease: {
    fontFamily: "MontserratRegular",
    fontSize: 14,
    opacity: 0.8,
  },
  vaccineDose: {
    fontFamily: "MontserratRegular",
    fontSize: 14,
    opacity: 0.6,
  },
  dateAndButtonContainer: {
    marginTop: 4,
    gap: 16,
    alignItems: "center",
  },
  dateText: {
    fontFamily: "MontserratSemiBold",
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
    marginTop: 16,
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
  doseContainer: {
    marginTop: 10,
    alignItems: "center",
  },
  doseText: {
    fontFamily: "MontserratRegular",
    fontSize: 14,
    color: "#333",
  },
});
