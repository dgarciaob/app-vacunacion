import { View, Text, Image, StyleSheet, TextInput } from "react-native";
import React from "react";
import Push from "./Push";

export default function ServicesScreen() {
  return (
    <View>
      <View style={styles.container}>
        <Image
          style={styles.logoStyle}
          source={require("../assets/images/logo.png")}
        />
        <TextInput
          placeholder="Escribe el texto aqui"
          style={{
            marginTop: 20,
            fontFamily: "MontserratRegular",
            fontSize: 16,
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 32,
    marginTop: 40,
  },
  logoStyle: {
    width: 220,
    height: 115,
    alignItems: "center",
    justifyContent: "center",
  },
});
