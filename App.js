import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { setNavigator } from './src/navigationRef';

//Provider
import { Provider as AuthProvider } from './src/contexts/AuthContext';
import { Provider as TierProvider } from './src/contexts/TierContext';
import { Provider as ParkingProvider } from './src/contexts/ParkingContext';
import { Provider as AccountProvider } from './src/contexts/AccountContext';
import { Provider as TransactionProvider } from './src/contexts/TransactionContext';

//login flow
import LoginHomeScreen from './src/screens/login/LoginHomeScreen';
import SignInScreen from './src/screens/login/SignInScreen';
import SignUpScreen from './src/screens/login/SignUpScreen';

//client flow: transaction
import LicenseScreen from './src/screens/client/transaction/LicenseScreen';
import ZoneScreen from './src/screens/client/transaction/ZoneScreen';
import SlotScreen from './src/screens/client/transaction/SlotScreen';
import TransactionScreen from './src/screens/client/transaction/TransactionScreen';

//client flow: history
import HistoryScreen from './src/screens/client/history/HistoryScreen';
import HistoryDetailScreen from './src/screens/client/history/HistoryDetailScreen';

//setting flow
import SettingScreen from './src/screens/setting/SettingScreen';
import EditPasswordScreen from './src/screens/setting/EditPasswordScreen';
import EditProfileScreen from './src/screens/setting/EditProfileScreen';

//user flow
import UserHomeScreen from './src/screens/user/UserHomeScreen';

//user flow: account
import AccountHomeScreen from './src/screens/user/account/AccountHomeScreen';
import AccountListScreen from './src/screens/user/account/AccountListScreen';
import AccountDetailScreen from './src/screens/user/account/AccountDetailScreen';
import EditAccountRfidScreen from './src/screens/user/account/EditAccountRfidScreen';
import EditAccountTierScreen from './src/screens/user/account/EditAccountTierScreen';

//user flow: create user
import CreateUserScreen from './src/screens/user/createUser/CreateUserScreen';
import UserCreatedScreen from './src/screens/user/createUser/UserCreatedScreen';

//user flow: parking
import EditSlotScreen from './src/screens/user/parking/EditSlotScreen';
import SlotUpdatedScreen from './src/screens/user/parking/SlotUpdatedScreen';

//user flow: tier
import TierHomeScreen from './src/screens/user/tier/TierHomeScreen';
import TierListScreen from './src/screens/user/tier/TierListScreen';
import CreateTierScreen from './src/screens/user/tier/CreateTierScreen';
import EditTierScreen from './src/screens/user/tier/EditTierScreen';
import { StatusBar } from 'react-native';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const stackScreenOptions = {
  headerShown: false
};

const LoginFlow = () => {
  return (
    <Stack.Navigator screenOptions={stackScreenOptions}>
      <Stack.Screen
        name="LoginHome"
        component={LoginHomeScreen}
      />
      <Stack.Screen
        name="SignIn"
        component={SignInScreen}
      />
      <Stack.Screen
        name="SignUp"
        component={SignUpScreen}
      />
    </Stack.Navigator>
  );
};

const TransactionFlow = () => {
  return (
    <Stack.Navigator screenOptions={stackScreenOptions}>
      <Stack.Screen
        name="License"
        component={LicenseScreen}
      />
      <Stack.Screen
        name="Zone"
        component={ZoneScreen}
      />
      <Stack.Screen
        name="Slot"
        component={SlotScreen}
      />
      <Stack.Screen
        name="Transaction"
        component={TransactionScreen}
      />
    </Stack.Navigator>
  );
};

const HistoryFlow = () => {
  return (
    <Stack.Navigator screenOptions={stackScreenOptions}>
      <Stack.Screen
        name="History"
        component={HistoryScreen}
      />
      <Stack.Screen
        name="HistoryDetail"
        component={HistoryDetailScreen}
      />
    </Stack.Navigator>
  );
};

const SettingFlow = () => {
  return (
    <Stack.Navigator screenOptions={stackScreenOptions}>
      <Stack.Screen
        name="Setting"
        component={SettingScreen}
      />
      <Stack.Screen
        name="EditPassword"
        component={EditPasswordScreen}
      />
      <Stack.Screen
        name="EditProfile"
        component={EditProfileScreen}
      />
    </Stack.Navigator>
  );
};

const AdminFlow = () => {
  return (
    <Stack.Navigator screenOptions={stackScreenOptions}>
      <Stack.Screen
        name="UserHome"
        component={UserHomeScreen}
      />
      {/* parking flow */}
      <Stack.Screen
        name="EditSlot"
        component={EditSlotScreen}
      />
      <Stack.Screen
        name="SlotUpdated"
        component={SlotUpdatedScreen}
      />
      {/* account flow */}
      <Stack.Screen
        name="AccountHome"
        component={AccountHomeScreen}
      />
      <Stack.Screen
        name="AccountList"
        component={AccountListScreen}
      />
      <Stack.Screen
        name="AccountDetail"
        component={AccountDetailScreen}
      />
      <Stack.Screen
        name="EditAccountRfid"
        component={EditAccountRfidScreen}
      />
      <Stack.Screen
        name="EditAccountTier"
        component={EditAccountTierScreen}
      />
      {/* tier flow */}
      <Stack.Screen
        name="TierHome"
        component={TierHomeScreen}
      />
      <Stack.Screen
        name="TierList"
        component={TierListScreen}
      />
      <Stack.Screen
        name="CreateTier"
        component={CreateTierScreen}
      />
      <Stack.Screen
        name="EditTier"
        component={EditTierScreen}
      />
      {/* create user flow */}
      <Stack.Screen
        name="CreateUser"
        component={CreateUserScreen}
      />
      <Stack.Screen
        name="UserCreated"
        component={UserCreatedScreen}
      />
    </Stack.Navigator>
  );
};

const tabBarOptions = {
  activeTintColor: '#00AB66',
  inactiveTintColor: 'gray'
}

const ClientFlow = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color }) => {
          let iconName;
          if (route.name === 'Booking') {
            iconName = 'pencil-square-o';
          } else if (route.name === 'History') {
            iconName = 'history';
          } else if (route.name === 'Settings') {
            iconName = 'gear';
          }

          return <Icon name={iconName} size={20} color={color} />
        }
      })}
      tabBarOptions={tabBarOptions}
    >
      <Tab.Screen
        name="Booking"
        component={TransactionFlow}
      />
      <Tab.Screen
        name="History"
        component={HistoryFlow}
      />
      <Tab.Screen
        name="Settings"
        component={SettingFlow}
      />
    </Tab.Navigator>
  );
};

const UserFlow = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color }) => {
          let iconName;
          if (route.name === 'User Home') {
            iconName = 'home';
          } else if (route.name === 'Settings') {
            iconName = 'gear';
          }

          return <Icon name={iconName} size={20} color={color} />
        }
      })}
      tabBarOptions={tabBarOptions}>
      <Tab.Screen
        name="User Home"
        component={AdminFlow}
      />
      <Tab.Screen
        name="Settings"
        component={SettingFlow}
      />
    </Tab.Navigator>
  );
};

const App = () => {
  return (
    <NavigationContainer ref={(navigator) => setNavigator(navigator)}>
      <Stack.Navigator screenOptions={stackScreenOptions}>
        <Stack.Screen
          name="LoginFlow"
          component={LoginFlow}
        />
        <Stack.Screen
          name="Client"
          component={ClientFlow}
        />
        <Stack.Screen
          name="User"
          component={UserFlow}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default () => {
  return (
    <AuthProvider>
      <TierProvider>
        <ParkingProvider>
          <AccountProvider>
            <TransactionProvider>
              <SafeAreaProvider>
                <StatusBar barStyle="dark-content" />
                <App />
              </SafeAreaProvider>
            </TransactionProvider>
          </AccountProvider>
        </ParkingProvider>
      </TierProvider>
    </AuthProvider>
  );
};