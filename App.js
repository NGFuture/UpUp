import { NavigationContainer, InitialState } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { MainLayout } from './components/layouts/MainLayout';
import RootNavigator from './navigators/Root';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {
  return (
    <NavigationContainer>
      <MainLayout>
        <RootNavigator />
        <StatusBar style="auto" />
      </MainLayout>
    </NavigationContainer>
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
