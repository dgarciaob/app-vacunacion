import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React, { useContext } from "react";
import UserContext from "../contextos/UserProvider";
import { useNavigation } from "@react-navigation/native";
import { Alert } from "react-native";

import { Feather, AntDesign, FontAwesome } from "@expo/vector-icons";

export default function VaccineTrackerScreen() {
  const navigation = useNavigation();
  const { profiles, removeProfile, setActiveProfile } = useContext(UserContext);

  const handleEditProfile = (profile) => {
    navigation.navigate("EditProfileScreen", { profile });
  };

  const handleDeleteProfile = (profileId) => {
    Alert.alert(
      "Eliminar Perfil",
      "¿Estás seguro de que deseas eliminar este perfil?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Eliminar",
          onPress: () => removeProfile(profileId),
          style: "destructive",
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <View>
          <Text style={styles.text}>Perfiles</Text>
        </View>
        <View>
          <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
            <AntDesign name="pluscircle" size={24} color="#81c3d3" />
          </TouchableOpacity>
        </View>
      </View>
      {profiles.map((profile, index) => {
        // Solo renderizar si el perfil tiene un nombre
        if (profile.nombre) {
          return (
            <View key={index} style={styles.userContainer}>
              <TouchableOpacity>
                <Text style={styles.userText}>{profile.nombre}</Text>
              </TouchableOpacity>
              <View style={styles.iconContainer}>
                <TouchableOpacity
                  onPress={() => {
                    setActiveProfile(profile.id);
                    navigation.navigate("VaccineCard", { profile });
                  }}
                >
                  <FontAwesome name="id-card-o" size={20} color="black" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleEditProfile(profile)}>
                  <Feather name="edit" size={20} color="black" />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => handleDeleteProfile(profile.id)}
                >
                  <Feather name="trash-2" size={20} color="black" />
                </TouchableOpacity>
              </View>
            </View>
          );
        }
        return null; // No renderizar si el perfil no tiene nombre
      })}
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
  userContainer: {
    marginTop: 24,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  userText: {
    fontFamily: "MontserratRegular",
  },
  iconContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 20,
  },
  titleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
