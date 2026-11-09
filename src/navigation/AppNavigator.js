import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import HomeScreen from '../screens/HomeScreen';
import DetailScreen from '../screens/DetailScreen';
import FavoritScreen from '../screens/FavoritScreen';
import CartScreen from '../screens/CartScreen';
import ProfilScreen from '../screens/ProfilScreen';
import TentangScreen from '../screens/TentangScreen';
import ButtonNavigation from '../components/ButtonNavigation';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// Tab bar memakai komponen ButtonNavigation sesuai desain Figma
function CustomTabBar({ state, navigation }) {
  const insets = useSafeAreaInsets();
  return (
    <ButtonNavigation
      activeTab={state.routeNames[state.index]}
      onChange={(name) => navigation.navigate(name)}
      bottomInset={insets.bottom}
    />
  );
}

// Tab bawah: Home | Fave | Cart | Me
function TabNavigator() {
  return (
    <Tab.Navigator
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{ headerShown: false }}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Fave" component={FavoritScreen} />
      <Tab.Screen name="Cart" component={CartScreen} />
      <Tab.Screen name="Me" component={ProfilScreen} />
    </Tab.Navigator>
  );
}

// Stack utama: Main (tab) -> Detail / Tentang (menutupi tab bar)
export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Main" component={TabNavigator} />
        <Stack.Screen name="Detail" component={DetailScreen} />
        <Stack.Screen name="Tentang" component={TentangScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
