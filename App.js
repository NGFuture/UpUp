import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { Image, StyleSheet, View } from 'react-native';
import RootNavigator, { navigationRef } from './navigators/Root';
import { AuthContextProvider, useAuthContext } from './components/AuthContext';
import { DataProvider } from './components/DataContext';
import {
  MD3LightTheme as DefaultTheme,
  Provider as PaperProvider,
} from 'react-native-paper';
import { useColorScheme } from 'react-native';
import logo1 from "./assets/logo2.png";

const PrivateScreens = () => {
  return (
    <NavigationContainer ref={navigationRef}>
      <RootNavigator />
      <StatusBar style="auto" />
    </NavigationContainer>
  );
};

const ScreensContainer = () => {
  const { user } = useAuthContext();
  if (!user.loaded) {
    return (
      <View style={{ height: "100%", backgroundColor: "grey", justifyContent: "center", alignItems: "center" }}>

          <Image source={logo1} style={{width: 140, height: 56}}  />

      </View>
    )
  };
  return (
    <PrivateScreens />
  );
};

export default function App() {
  const colorScheme = useColorScheme();
  return (
    <PaperProvider theme={{
      ...DefaultTheme,
      // blue #70B6E4
      // orange #f16628
      "colors": colorScheme === 'light' ? {
        "primary": "#70B6E4",
        "onPrimary": "rgb(255, 255, 255)",
        "primaryContainer": "rgb(200, 230, 255)",
        "onPrimaryContainer": "rgb(0, 30, 46)",
        "secondary": "#f16628",
        "onSecondary": "rgb(255, 255, 255)",
        "secondaryContainer": "#f16628",
        "onSecondaryContainer": "rgb(255, 255, 255)",
        "tertiary": "rgb(0, 110, 31)",
        "onTertiary": "rgb(255, 255, 255)",
        "tertiaryContainer": "rgb(111, 255, 122)",
        "onTertiaryContainer": "rgb(0, 34, 4)",
        "error": "rgb(186, 26, 26)",
        "onError": "rgb(255, 255, 255)",
        "errorContainer": "rgb(255, 218, 214)",
        "onErrorContainer": "rgb(65, 0, 2)",
        "background": "rgb(252, 252, 255)",
        "onBackground": "rgb(25, 28, 30)",
        "surface": "rgb(252, 252, 255)",
        "onSurface": "rgb(25, 28, 30)",
        "surfaceVariant": "rgb(221, 227, 234)",
        "onSurfaceVariant": "rgb(65, 72, 77)",
        "outline": "rgb(113, 120, 126)",
        "outlineVariant": "rgb(193, 199, 206)",
        "shadow": "rgb(0, 0, 0)",
        "scrim": "rgb(0, 0, 0)",
        "inverseSurface": "rgb(46, 49, 51)",
        "inverseOnSurface": "rgb(240, 240, 243)",
        "inversePrimary": "rgb(134, 206, 255)",
        "elevation": {
          "level0": "transparent",
          "level1": "rgb(239, 244, 249)",
          "level2": "#f2f2f2", // top navigation bar color
          "level3": "rgb(224, 235, 243)",
          "level4": "rgb(222, 234, 242)",
          "level5": "rgb(217, 231, 239)"
        },
        "surfaceDisabled": "rgba(25, 28, 30, 0.12)",
        "onSurfaceDisabled": "rgba(25, 28, 30, 0.38)",
        "backdrop": "rgba(43, 49, 54, 0.4)"
      } : {
        "primary": "rgb(255, 181, 160)",
        "onPrimary": "rgb(96, 21, 0)",
        "primaryContainer": "rgb(135, 33, 0)",
        "onPrimaryContainer": "rgb(255, 219, 209)",
        "secondary": "rgb(79, 216, 235)",
        "onSecondary": "rgb(0, 54, 61)",
        "secondaryContainer": "rgb(0, 79, 88)",
        "onSecondaryContainer": "rgb(151, 240, 255)",
        "tertiary": "rgb(130, 219, 126)",
        "onTertiary": "rgb(0, 57, 10)",
        "tertiaryContainer": "rgb(0, 83, 18)",
        "onTertiaryContainer": "rgb(157, 248, 152)",
        "error": "rgb(255, 180, 171)",
        "onError": "rgb(105, 0, 5)",
        "errorContainer": "rgb(147, 0, 10)",
        "onErrorContainer": "rgb(255, 180, 171)",
        "background": "rgb(32, 26, 24)",
        "onBackground": "rgb(237, 224, 221)",
        "surface": "rgb(32, 26, 24)",
        "onSurface": "rgb(237, 224, 221)",
        "surfaceVariant": "rgb(83, 67, 63)",
        "onSurfaceVariant": "rgb(216, 194, 188)",
        "outline": "rgb(160, 140, 135)",
        "outlineVariant": "rgb(83, 67, 63)",
        "shadow": "rgb(0, 0, 0)",
        "scrim": "rgb(0, 0, 0)",
        "inverseSurface": "rgb(237, 224, 221)",
        "inverseOnSurface": "rgb(54, 47, 45)",
        "inversePrimary": "rgb(176, 46, 0)",
        "elevation": {
          "level0": "transparent",
          "level1": "rgb(43, 34, 31)",
          "level2": "rgb(50, 38, 35)",
          "level3": "rgb(57, 43, 39)",
          "level4": "rgb(59, 45, 40)",
          "level5": "rgb(63, 48, 43)"
        },
        "surfaceDisabled": "rgba(237, 224, 221, 0.12)",
        "onSurfaceDisabled": "rgba(237, 224, 221, 0.38)",
        "backdrop": "rgba(59, 45, 41, 0.4)"
      },
    }}>
      <AuthContextProvider>
        <DataProvider>
          <ScreensContainer />
        </DataProvider>
      </AuthContextProvider>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
