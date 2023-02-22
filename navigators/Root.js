import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../screens/Home';
import Results from '../screens/Results';
import Test from '../screens/Test';

const RootStack = createNativeStackNavigator();
const RootNavigator = () => {
    return (
        <RootStack.Navigator initialRouteName="Home">
           <RootStack.Screen name="Home" component={Home} />
           <RootStack.Screen name="Test" component={Test} />
           <RootStack.Screen name="Results" component={Results} />
        </RootStack.Navigator>
    )
};
export default RootNavigator;
