import { NavigationContainer, InitialState } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { MainLayout } from './components/layouts/MainLayout';
import RootNavigator, { navigationRef } from './navigators/Root';
import { AuthContextProvider, useAuthContext } from './components/AuthContext';
import { DataProvider } from './components/DataContext';
import {
  MD3LightTheme as DefaultTheme,
  Provider as PaperProvider,
} from 'react-native-paper';
import { useColorScheme } from 'react-native';

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
    return <View><Text>User not loaded</Text></View>
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
      // colors: {
      //   ...DefaultTheme.colors,
      //   primary: "#e64a19", //orange
      //   secondary: "#0097a7", // blue
      //   tertiary: "#388e3c", //green
      // },
      "colors": colorScheme === 'light' ? {
        "primary": "#e64a19",
        "onPrimary": "rgb(255, 255, 255)",
        "primaryContainer": "rgb(255, 219, 209)",
        "onPrimaryContainer": "rgb(59, 9, 0)",
        "secondary": "#0097a7",
        "onSecondary": "rgb(255, 255, 255)",
        "secondaryContainer": "rgb(151, 240, 255)",
        "onSecondaryContainer": "rgb(0, 31, 36)",
        "tertiary": "rgb(16, 109, 32)",
        "onTertiary": "rgb(255, 255, 255)",
        "tertiaryContainer": "rgb(157, 248, 152)",
        "onTertiaryContainer": "rgb(0, 34, 4)",
        "error": "rgb(186, 26, 26)",
        "onError": "rgb(255, 255, 255)",
        "errorContainer": "rgb(255, 218, 214)",
        "onErrorContainer": "rgb(65, 0, 2)",
        "background": "rgb(255, 251, 255)",
        "onBackground": "rgb(32, 26, 24)",
        "surface": "rgb(255, 251, 255)",
        "onSurface": "rgb(32, 26, 24)",
        "surfaceVariant": "rgb(245, 222, 216)",
        "onSurfaceVariant": "rgb(83, 67, 63)",
        "outline": "rgb(133, 115, 110)",
        "outlineVariant": "rgb(216, 194, 188)",
        "shadow": "rgb(0, 0, 0)",
        "scrim": "rgb(0, 0, 0)",
        "inverseSurface": "rgb(54, 47, 45)",
        "inverseOnSurface": "rgb(251, 238, 235)",
        "inversePrimary": "rgb(255, 181, 160)",
        "elevation": {
          "level0": "transparent",
          "level1": "rgb(251, 241, 242)",
          "level2": "rgb(249, 235, 235)",
          "level3": "rgb(246, 229, 227)",
          "level4": "rgb(246, 226, 224)",
          "level5": "rgb(244, 222, 219)"
        },
        "surfaceDisabled": "rgba(32, 26, 24, 0.12)",
        "onSurfaceDisabled": "rgba(32, 26, 24, 0.38)",
        "backdrop": "rgba(59, 45, 41, 0.4)"
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
