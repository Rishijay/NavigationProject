import React, {useState} from 'react';
import { Button, View, Text, SafeAreaView, AsyncStorage, TouchableOpacity, Image, Alert } from 'react-native';
import { createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList, 
  DrawerItem,} from '@react-navigation/drawer';
import { NavigationContainer, useFocusEffect } from '@react-navigation/native';
//import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Ionicons from 'react-native-vector-icons/Ionicons';

//const Tab = createBottomTabNavigator();
const Tab = createMaterialTopTabNavigator();
const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();
//const isLoggedIn = AsyncStorage.getItem('login').then(data => {return data;});

function HomeScreen({ navigation }) {
  return (
    <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
     let iconName;
     if (route.name === 'Tab A') {
        iconName = focused
        ? 'ios-information-circle'
        : 'ios-information-circle-outline';
      } else if (route.name === 'Tab B') {
        iconName = focused
        ? 'ios-list-box'
        : 'ios-list';
      }
      return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        showIcon: false,
      activeTintColor: 'tomato',
      inactiveTintColor: 'gray',
      }}
    >
        <Tab.Screen name="Tab A" component={TabADetailsScreen}/>
        <Tab.Screen name="Tab B" component={TabBScreen}/>
    </Tab.Navigator>
  );
}
function NotificationsStack({ navigation }) {
  return (
    <Stack.Navigator
    screenOptions={({ route }) => ({
      headerShown: route.name === 'TabA Home' ? false : true,
    })}>
      <Stack.Screen name="TabA Home" component={NotificationsScreen} 
      options={({ route }) => ({
        headerTitle: "Notifications",
        headerLeft: ()=> <NavigationDrawerStructure navigationProps={navigation} />,
        headerStyle: {
          backgroundColor: '#ffffff', //Set Header color
        },
        tabBarVisible: false,
        headerShown:true,
        headerTintColor: '#000', //Set Header text color
        headerTitleStyle: {
          fontWeight: 'bold', //Set Header text style
        },
      })}/>
    </Stack.Navigator>
  );
}
function NotificationsScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>No New Notifications!</Text>
      <Button 
      onPress={() => navigation.goBack()}
      title="Go back home"
      />
    </View>
  );
}

function TabAScreen({ navigation }) {
  return (
    <Stack.Navigator
    screenOptions={({ route }) => ({
      headerShown: route.name === 'TabA Home' ? false : true,
    })}>
      <Stack.Screen name="TabA Home" component={HomeScreen} 
      options={({ route }) => ({
        headerTitle: "Static Title",
        headerLeft: ()=> <NavigationDrawerStructure navigationProps={navigation} />,
        headerStyle: {
          backgroundColor: '#ffffff', //Set Header color
        },
        tabBarVisible: false,
        headerShown:true,
        headerTintColor: '#000', //Set Header text color
        headerTitleStyle: {
          fontWeight: 'bold', //Set Header text style
        },
      })}/>
      <Stack.Screen name="TabA Details" component={Details} 
      options={{}}/>
    </Stack.Navigator>
  );
}
function TabADetailsScreen({navigation}) {
  return (
    <View style={{ flex: 1, justifyContent: 'center',  alignItems: 'center' }}>
      <Text>
        Welcome to TabA page!
      </Text>
      <Button 
      onPress={() => navigation.navigate('TabA Details')}
      title="Go to TabA Details"
      />
    </View>
  );
}
function Details() {
  return (
    <View style={{ flex: 1, justifyContent: 'center',  alignItems: 'center' }}>
      <Text>
        TabA Details here!
      </Text>
    </View>
  );
}
function TabBScreen() {
  return (
    <View>
      <Text style={{textAlign: 'center', marginTop: 300}}>
        Welcome to TabB page!
      </Text>
    </View>
  );
}

function DrawerNavig({navigation}) {
  const [loggedIn,changeStatus] = useState(null)
  AsyncStorage.getItem('login').then(data=> {changeStatus(data)})
  return (
    loggedIn === null ? <></> :
      <Drawer.Navigator 
        initialRouteName= {loggedIn === "no" ? "Logout" : "Home"}
        //drawerContent={props => <CustomDrawerContent {...props}/>}
        >
          <Drawer.Screen name="Home" component={TabAScreen}/>
          <Drawer.Screen name="Notifications" component={NotificationsStack}/>
          <Drawer.Screen name="Logout" component={LoginScreen} options={{gestureEnabled: false}}
          />
      </Drawer.Navigator>
  );
}
function LoginScreen({navigation}) {
  useFocusEffect(
    React.useCallback(() => {
      AsyncStorage.setItem('login', 'no')
    })
  );
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Click To Login And Go Home</Text>
      <Button 
        onPress={() => {
          AsyncStorage.setItem('login', 'yes').then(data => {console.log(data); navigation.jumpTo('Home')})
        }}
      title="Login Here"
      />
    </View>
  );
}
function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props}/>
      <DrawerItem label="Custom Logout" onPress={() => {
        AsyncStorage.setItem('login', 'no')
        props.navigation.jumpTo('Logout')
        }} />
    </DrawerContentScrollView>
  );
}
const NavigationDrawerStructure = (props)=> {
  const toggleDrawer = () => {
   props.navigationProps.toggleDrawer();
  };
  return (
    <View style={{ flexDirection: 'row' }}>
      <TouchableOpacity onPress={()=> toggleDrawer()}>
        {/*Donute Button Image */}
        <Image
          source={require('./drawer.png')}
          style={{ width: 25, height: 25, marginLeft: 10 }}
        />
      </TouchableOpacity>
    </View>
  );
}



export default function App() {
  return (
    <SafeAreaView style={{flex:1}}>
    <NavigationContainer>
      <DrawerNavig/>
    </NavigationContainer>
    </SafeAreaView>
  )
}