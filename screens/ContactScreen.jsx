import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Linking,
  TouchableOpacity,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import React from "react";

export default function ContactScreen() {
  const handlePressLink = async (url) => {
    // Verifica si el enlace es manejable en el dispositivo
    const supported = await Linking.canOpenURL(url);

    if (supported) {
      // Abre el enlace con el navegador predeterminado
      await Linking.openURL(url);
    } else {
      console.error("No se puede abrir la URL: " + url);
    }
  };

  const initialRegion = {
    latitude: 19.427813715260214,
    longitude: -99.12635849035716,
    latitudeDelta: 0.00422,
    longitudeDelta: 0.00321,
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View>
          <Text style={styles.text}>Información de Contacto</Text>
        </View>
        <View style={styles.fieldView}>
          <Text style={styles.subtitle}>Dirección</Text>
          <Text style={{ fontFamily: "MontserratRegular", fontSize: 14 }}>
            Torre Corona. Calle Ramón Corona, Calzada de las Américas, Nte. 342.
            Col. Centro. Culiacán, Sinaloa.
          </Text>
        </View>
        <View style={styles.mapContainer}>
          <MapView style={styles.map} initialRegion={initialRegion}>
            <Marker coordinate={initialRegion} />
          </MapView>
        </View>
        <View style={styles.fieldView}>
          <Text style={styles.subtitle}>Citas</Text>
          <Text style={{ fontFamily: "MontserratRegular", fontSize: 14 }}>
            6674 456 174
          </Text>
        </View>
        <View style={styles.fieldView}>
          <Text style={styles.subtitle}>Emergencias</Text>
          <Text style={{ fontFamily: "MontserratRegular", fontSize: 14 }}>
            667 449 7881
          </Text>
        </View>
        <View style={styles.fieldView}>
          <Text style={styles.subtitle}>Horarios</Text>
          <Text style={{ fontFamily: "MontserratRegular", fontSize: 14 }}>
            Lunes a Viernes.9 am a 8 pm, Sábado.9 am a 1 pm, Atención Dominical
            directa con el médico.
          </Text>
        </View>
        <View style={styles.fieldView}>
          <Text style={styles.subtitle}>Página Web</Text>
          <TouchableOpacity
            onPress={() => handlePressLink("http://pediatriaenculiacan.com/")}
          >
            <Text
              style={{
                fontFamily: "MontserratRegular",
                fontSize: 14,
                color: "blue",
              }}
            >
              http://pediatriaenculiacan.com/
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 32,
    marginTop: 40,
  },
  mapContainer: {
    width: 250,
    height: 350,
    marginTop: 16,
  },
  map: {
    width: "100%",
    height: "100%",
    borderRadius: 12,
  },
  text: {
    fontFamily: "MontserratSemiBold",
    fontSize: 24,
  },
  fieldView: {
    marginTop: 24,
  },
  subtitle: {
    fontFamily: "MontserratSemiBold",
    fontSize: 18,
    marginBottom: 8,
  },
});
