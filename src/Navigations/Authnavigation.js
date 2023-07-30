import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Login, Onboarding, Register } from "../Screens/Auth";

const Stack = createNativeStackNavigator();

export const Auth = () => {
  return (
    <Stack.Navigator
      initialRouteName="Onboarding"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Onboarding" component={Onboarding} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
    </Stack.Navigator>
  );
};
