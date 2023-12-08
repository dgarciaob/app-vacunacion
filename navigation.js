import React, { useEffect } from "react";
import { View, Text } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";

import HomeScreen from "./screens/HomeScreen";
import ProfileScreen from "./screens/ProfileScreen";
import SignInScreen from "./screens/SignInScreen";
import VaccineTrackerScreen from "./screens/VaccineTrackerScreen";
import WelcomeScreen from "./screens/WelcomeScreen";
import ContactScreen from "./screens/ContactScreen";
import ServicesScreen from "./screens/ServicesScreen";
import SignUpScreen from "./screens/SignUpScreen";
import Vaccine1015 from "./screens/Vaccine1015";
import Vaccine0009 from "./screens/Vaccine0009";
import EditProfileScreen from "./screens/EditProfileScreen";
import VaccineCard from "./screens/VaccineCard";
import { UserProvider } from "./contextos/UserProvider";
import { UserVaccinesProvider } from "./contextos/VaccinesProvider";

const Tab = createBottomTabNavigator();
const RootStack = createNativeStackNavigator();

function TabNavigator() {
  const [fontsLoaded] = useFonts({
    MontserratLight: require("../vacunacion/assets/fonts/Montserrat-Light.ttf"),
    MontserratRegular: require("../vacunacion/assets/fonts/Montserrat-Regular.ttf"),
    MontserratSemiBold: require("../vacunacion/assets/fonts/Montserrat-SemiBold.ttf"),
  });

  useEffect(() => {
    async function prepare() {
      await SplashScreen.preventAutoHideAsync();
    }
    prepare();
  }, []);

  if (!fontsLoaded) {
    return null;
  } else {
    SplashScreen.hideAsync();
  }

  return (
    <Tab.Navigator
      screenOptions={{ headerShown: false, tabBarShowLabel: false }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <View style={{ alignItems: "center", justifyContent: "center" }}>
                <MaterialIcons
                  name="home"
                  size={20}
                  color={focused ? "#81c3d3" : "#B5B5B5"}
                />
                <Text
                  style={{
                    fontSize: 12,
                    fontFamily: focused
                      ? "MontserratSemiBold"
                      : "MontserratRegular",
                    color: focused ? "#81c3d3" : "#B5B5B5",
                  }}
                >
                  Home
                </Text>
              </View>
            );
          },
        }}
      />
      <Tab.Screen
        name="VaccineTracker"
        component={VaccineTrackerScreen}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <View style={{ alignItems: "center", justifyContent: "center" }}>
                <MaterialIcons
                  name="library-books"
                  size={20}
                  color={focused ? "#81c3d3" : "#B5B5B5"}
                />
                <Text
                  style={{
                    fontSize: 12,
                    fontFamily: focused
                      ? "MontserratSemiBold"
                      : "MontserratRegular",
                    color: focused ? "#81c3d3" : "#B5B5B5",
                  }}
                >
                  Vacunas
                </Text>
              </View>
            );
          },
        }}
      />
      <Tab.Screen
        name="ServicesScreen"
        component={ServicesScreen}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <View style={{ alignItems: "center", justifyContent: "center" }}>
                <MaterialIcons
                  name="medical-services"
                  size={18}
                  color={focused ? "#81c3d3" : "#B5B5B5"}
                />
                <Text
                  style={{
                    fontSize: 12,
                    fontFamily: focused
                      ? "MontserratSemiBold"
                      : "MontserratRegular",
                    color: focused ? "#81c3d3" : "#B5B5B5",
                    marginTop: 3,
                  }}
                >
                  Servicios
                </Text>
              </View>
            );
          },
        }}
      />
      <Tab.Screen
        name="ContactScreen"
        component={ContactScreen}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <View style={{ alignItems: "center", justifyContent: "center" }}>
                <MaterialCommunityIcons
                  name="account"
                  size={21}
                  color={focused ? "#81c3d3" : "#B5B5B5"}
                />
                <Text
                  style={{
                    fontSize: 12,
                    fontFamily: focused
                      ? "MontserratSemiBold"
                      : "MontserratRegular",
                    color: focused ? "#81c3d3" : "#B5B5B5",
                  }}
                >
                  Contacto
                </Text>
              </View>
            );
          },
        }}
      />
    </Tab.Navigator>
  );
}

// toda la navegación esta envuelta en "UserProvider" para que todos los hijos puedan consumir el contexto creado en UserProvider.jsx

export default function Navigation() {
  return (
    <UserProvider>
      <UserVaccinesProvider>
        <NavigationContainer>
          <RootStack.Navigator
            mode="modal"
            screenOptions={{ headerShown: false }}
            initialRouteName="Welcome"
          >
            <RootStack.Screen name="Welcome" component={WelcomeScreen} />
            <RootStack.Screen name="SignUp" component={SignUpScreen} />
            <RootStack.Screen name="SignIn" component={SignInScreen} />
            <RootStack.Screen name="Main" component={TabNavigator} />
            <RootStack.Screen name="Profile" component={ProfileScreen} />
            <RootStack.Screen name="Vaccine1015" component={Vaccine1015} />
            <RootStack.Screen name="Vaccine0009" component={Vaccine0009} />
            <RootStack.Screen
              name="EditProfileScreen"
              component={EditProfileScreen}
            />
            <RootStack.Screen name="VaccineCard" component={VaccineCard} />
          </RootStack.Navigator>
        </NavigationContainer>
      </UserVaccinesProvider>
    </UserProvider>
  );
}
