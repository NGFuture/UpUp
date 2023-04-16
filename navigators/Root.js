import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../screens/Home';
import Results from '../screens/Results';
import Test from '../screens/Test';
import { Appbar } from 'react-native-paper';
import { MainLayout } from '../components/layouts/MainLayout';

const RootStack = createNativeStackNavigator();
const RootNavigator = () => {
    return (
            <RootStack.Navigator initialRouteName="Home" screenOptions={({ navigation }) => {
                return {
                    header: ({ navigation, route, options, back }) => {
                        // const title = getHeaderTitle(options, route.name);
                        const title = "I am title";
                        return (
                            <Appbar.Header elevated>
                                {back ? (
                                    <Appbar.BackAction onPress={() => navigation.goBack()} />
                                ) : (navigation).openDrawer ? (
                                    <Appbar.Action
                                        icon="menu"
                                        isLeading
                                        onPress={() =>
                                            (
                                                navigation
                                            ).openDrawer()
                                        }
                                    />
                                ) : null}
                                <Appbar.Content title={title} />
                            </Appbar.Header>
                        );
                    },

                };
            }}>


                <RootStack.Screen name="Home" component={Home} />
                <RootStack.Screen name="Test" component={Test} />
                <RootStack.Screen name="Results" component={Results} />

            </RootStack.Navigator>
    )
};
export default RootNavigator;
