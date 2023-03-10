import { NavigationContainer, InitialState } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { MainLayout } from './components/layouts/MainLayout';
import RootNavigator from './navigators/Root';
import { AuthContextProvider } from './components/AuthContext';

export default function App() {
  return (
    <AuthContextProvider>
      <NavigationContainer>
        <MainLayout>
          <RootNavigator />
          <StatusBar style="auto" />
        </MainLayout>
      </NavigationContainer>
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
