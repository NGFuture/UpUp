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
  return (
    <PaperProvider theme={{
      ...DefaultTheme,
      colors: {
        ...DefaultTheme.colors,
        primary: "#e64a19", //orange
        secondary: "#0097a7", // blue
        tertiary: "#388e3c", //green
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
