import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text,TextInput, View } from 'react-native';
import Textform from '../Components/Textform'


export default function Home() {

  return (
    <View style={styles.container}>
      <Text style={styles.Header}>RentalZ!</Text>
      <Textform/>
    </View>
 
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    
    
  },
  Header: {
    marginTop: 15,
    fontSize: 30,
    fontWeight: '400',
    fontFamily: 'Amita-Regular'

  }
});
