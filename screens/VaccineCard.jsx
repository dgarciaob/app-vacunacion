import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { addMonths, format } from "date-fns";
import React, { useState, useContext } from "react";
import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { vaccineData } from "../data/vaccines";

import { useUserVaccines } from "../contextos/VaccinesProvider";

import UserContext from "../contextos/UserProvider";

export default function VaccineCard() {
  const navigation = useNavigation();

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
  // const dateOfBirthText = dateOfBirth
  //   ? dateOfBirth.toLocaleDateString()
  //   : "Fecha no definida"; // Formateo de fecha de objeto Date a string

  const { vaccinesStatus, setVaccinesStatus } = useUserVaccines();

  const handleToggleVaccination = (vaccineId) => {
    setVaccinesStatus((prevStatus) => ({
      ...prevStatus,
      [activeProfileId]: {
        ...prevStatus[activeProfileId],
        [vaccineId]: !prevStatus[activeProfileId]?.[vaccineId],
      },
    }));
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
            ? addMonths(
                new Date(activeProfile.date.replace(/\//g, "-")),
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
                  <TouchableOpacity>
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
                  onPress={() => handleToggleVaccination(vaccine.id)}
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
});
