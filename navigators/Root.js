import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../screens/Home';
import Results from '../screens/Results';
import Test from '../screens/Test';
import { Appbar } from 'react-native-paper';
import { MainLayout } from '../components/layouts/MainLayout';
import { createNavigationContainerRef } from '@react-navigation/native';
import { Image, Text, View } from 'react-native';
import logo1 from "../assets/logo1.jpg";
import { styles } from '../styles';


const RootStack = createNativeStackNavigator();
export const navigationRef = createNavigationContainerRef();
const RootNavigator = () => {
    return (
        <MainLayout navigation={navigationRef}>
            <RootStack.Navigator initialRouteName="Home"
                screenOptions={({ navigation }) => {
                    return {
                        header: ({ navigation, route, options, back }) => {

                            return (
                                <Appbar.Header elevated>
                                    <View style={styles.headerIcon}>{back && (
                                        <Appbar.BackAction onPress={() => navigation.goBack()} />
                                    )}
                                    </View>
                                    <View style={styles.header}><Image source={logo1} style={styles.logo} /></View>
                                    <View style={styles.headerIcon} />


                                </Appbar.Header>
                            );
                        },

                    };
                }}
            >


                <RootStack.Screen name="Home" component={Home} />
                <RootStack.Screen name="Test" component={Test} />
                <RootStack.Screen name="Results" component={Results} />

            </RootStack.Navigator>
        </MainLayout>
    )
};
export default RootNavigator;
