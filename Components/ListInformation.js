import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';

export default function App() {
  
  return (
    <View style={styles.container}>
        <Text style={styles.Header}>List</Text>
    </View> 
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  Header: {
    flex: 1,
    marginTop: 15,
    fontSize: 30,
    fontWeight: '400',

  }
});
