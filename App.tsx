import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import AppLoading from "expo-app-loading";
import { useFonts } from "expo-font";
import * as SecureStore from "expo-secure-store";
import React from "react";
import "react-native-gesture-handler";
import { RootSiblingParent } from "react-native-root-siblings";
import { Navigator } from "./navigation/BottomTabNav";
import { Colors } from "./styles";
import { LoginScreen, LoginScreenNavName } from "./views";

// https://reactnavigation.org/docs/auth-flow/#how-it-will-work
const Stack = createStackNavigator();
export const AuthContext = React.createContext();

export default function App() {
  const [fontsLoaded] = useFonts({
    "Roboto-Light": require("./assets/fonts/Roboto-Light.ttf"),
    "Roboto-Regular": require("./assets/fonts/Roboto-Regular.ttf"),
    "Roboto-Medium": require("./assets/fonts/Roboto-Medium.ttf"),
    "Roboto-Bold": require("./assets/fonts/Roboto-Bold.ttf"),
    "Roboto-Black": require("./assets/fonts/Roboto-Black.ttf"),
  });

  const [state, dispatch] = React.useReducer(
    (prevState: any, action: any) => {
      switch (action.type) {
        case "RESTORE_TOKEN":
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
          };
        case "SIGN_IN":
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token,
          };
        case "SIGN_OUT":
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
    }
  );

  React.useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      let userToken;

      try {
        userToken = await SecureStore.getItemAsync("userToken");
      } catch (e) {
        // Restoring token failed
      }

      // After restoring token, we may need to validate it in production apps

      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
      dispatch({ type: "RESTORE_TOKEN", token: userToken });
    };

    bootstrapAsync();
  }, []);

  const authContext = React.useMemo(
    () => ({
      signIn: async (data: any) => {
        // In a production app, we need to send some data (usually username, password) to server and get a token
        // We will also need to handle errors if sign in failed
        // After getting token, we need to persist the token using `SecureStore`
        // In the example, we'll use a dummy token

        dispatch({ type: "SIGN_IN", token: "dummy-auth-token" });
      },
      signOut: () => dispatch({ type: "SIGN_OUT" }),
      signUp: async (data: any) => {
        // In a production app, we need to send user data to server and get a token
        // We will also need to handle errors if sign up failed
        // After getting token, we need to persist the token using `SecureStore`
        // In the example, we'll use a dummy token

        dispatch({ type: "SIGN_IN", token: "dummy-auth-token" });
      },
    }),
    []
  );

  const DarkTheme = {
    ...DefaultTheme,
    dark: true,
    colors: {
      ...DefaultTheme.colors,
      primary: Colors.white,
      background: Colors.primaryPurple,
    },
  };

  if (!fontsLoaded) {
    return (
      <RootSiblingParent>
        <AppLoading />
      </RootSiblingParent>
    );
  } else {
    return (
      <RootSiblingParent>
        <AuthContext.Provider value={authContext}>
          <NavigationContainer theme={DarkTheme}>
            {!(state.userToken == null) ? (
              <Navigator />
            ) : (
              <Stack.Navigator  screenOptions={{
                headerShown: false,
              }}>
                <Stack.Screen
                  name={LoginScreenNavName}
                  component={LoginScreen}
                />
              </Stack.Navigator>
            )}
          </NavigationContainer>
        </AuthContext.Provider>
      </RootSiblingParent>
    );
  }
}
