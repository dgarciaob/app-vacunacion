import React, { useState, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import UserContext from "../contextos/UserProvider";
import { AntDesign, Ionicons } from "@expo/vector-icons";

export default function EditProfileScreen({ route, navigation }) {
  const { profile } = route.params;
  const [editedProfile, setEditedProfile] = useState(profile);
  const { editProfile } = useContext(UserContext);

  const handleSave = () => {
    editProfile(editedProfile);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <TouchableOpacity onPress={() => navigation.navigate("Main")}>
          <AntDesign name="arrowleft" size={18} color="black" />
        </TouchableOpacity>
        <Text style={styles.text}>Edita el perfil</Text>
      </View>

      <TextInput
        value={editedProfile.nombre}
        placeholder="Nombre"
        onChangeText={(text) =>
          setEditedProfile({ ...editedProfile, nombre: text })
        }
        style={styles.input}
      />
      <TextInput
        value={editedProfile.nacionalidad}
        placeholder="Nacionalidad"
        onChangeText={(text) =>
          setEditedProfile({ ...editedProfile, nacionalidad: text })
        }
        style={styles.input}
      />
      <TextInput
        value={editedProfile.birthState}
        placeholder="Estado de Nacimiento"
        onChangeText={(text) =>
          setEditedProfile({ ...editedProfile, birthState: text })
        }
        style={styles.input}
      />
      <TextInput
        value={editedProfile.gender}
        placeholder="Género"
        onChangeText={(text) =>
          setEditedProfile({ ...editedProfile, gender: text })
        }
        style={styles.input}
      />
      <TouchableOpacity onPress={handleSave} style={styles.saveChanges}>
        <Text
          style={{
            fontFamily: "MontserratSemiBold",
            color: "#EB7D53",
            textAlign: "center",
          }}
        >
          Guardar Cambios
        </Text>
      </TouchableOpacity>
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
    alignItems: "center",
    gap: 24,
    marginBottom: 32,
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
  saveChanges: {
    marginTop: 32,
  },
});
