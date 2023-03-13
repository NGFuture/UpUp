import { NavigationContainer, InitialState } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { MainLayout } from './components/layouts/MainLayout';
import RootNavigator from './navigators/Root';
import { AuthContextProvider, useAuthContext } from './components/AuthContext';

const PrivateScreens = () => {
  return (
    <NavigationContainer>
        <MainLayout>
          <RootNavigator />
          <StatusBar style="auto" />
        </MainLayout>
      </NavigationContainer>
  );
};

const ScreensContainer = () => {
    const {user} = useAuthContext();
    if (!user.loaded) {
      return <View><Text>User not loaded</Text></View>
    };
    return (
      <PrivateScreens />
    );
};

export default function App() {
  return (
    <AuthContextProvider>
      <ScreensContainer />
    </AuthContextProvider>
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
