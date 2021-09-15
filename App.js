import React, {useEffect, useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import {  Dimensions, StyleSheet, TabBarIOSItem, Text, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import Icontab from 'react-native-vector-icons/Ionicons';
import Home from './Components/Home'
import Search from './Components/Search'
import ListInformation from './Components/ListInformation'
import * as Font from 'expo-font';
import AppLoading  from 'expo-app-loading';

export default function App() {
      const[familyLoading,setfamilyLoading] = useState(false)
      const fullwidth = Dimensions.get('window').width
      const bottomTab = createBottomTabNavigator();
      const FamilyFonts = async () =>{
        await Font.loadAsync({
          'Amita-Regular': require("./assets/fonts/Amita-Regular.ttf"),
        });
        setfamilyLoading(true);
}
useEffect(() => {
  FamilyFonts()
  return () => {
  }
}, [])
if (!familyLoading){
  return <AppLoading/>
}else{
  return (
    <NavigationContainer>
      <bottomTab.Navigator
       innitialRouteName = "Home"
       screenOptions = {(route) =>({
        // headerTitleAlign: 'center',
        // headerStyle:{backgroundColor:'#1435'},
        // headerTintColor: '#fff'
        headerShown: false
        
       })}
      >
        <bottomTab.Screen
        options= {{
          tabBarLabel: "Home",
          tabBarIcon: ({color, size,focused})=>{
            let icons;
            icons = focused?'home':'home-outline'
            return (<Icontab name={icons} color={color} size={size}/>)
          }
        }}
         name="Home" component = {Home}/>
        <bottomTab.Screen
        options= {{
          tabBarLabel: "List",
          tabBarIcon: ({color, size,focused})=>{
            let icons;
            icons = focused?'list':'list-outline'
            return (<Icontab name={icons} color={color} size={size}/>)
          }
        }}
         name="List" component = {ListInformation}/>
        <bottomTab.Screen
        options= {{
          tabBarLabel: "Search",
          tabBarIcon: ({color, size,focused})=>{
            let icons;
            icons = focused?'search':'search-outline'
            return (<Icontab name={icons} color={color} size={size}/>)
          }
        }} 
        name="Search" component= {Search}/>
      </bottomTab.Navigator>
    </NavigationContainer>
  );
}
}





