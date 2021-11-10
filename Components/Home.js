import React, { useState } from 'react';
import { StyleSheet, Text,TextInput, View } from 'react-native';
import Textform from '../Components/Textform'
import ModelError from './Pop up/ModelError'
import ModelSuccess from './Pop up/ModelSuccess';


export default function Home({navigation}) {
// biến show model
  const [show, setShow] = useState(false)
  const[status, setStatus] = useState('')
//container
  return (
    <View style={styles.container}>
      <Text style={styles.Header}>RentalZ!</Text>
      <Textform navigation={navigation} setShow={setShow} setStatus={setStatus} />
      {status=== 'error'?(<ModelError name="alert-circle" show={show} setShow={setShow}/>):(<ModelSuccess show={show} setShow={setShow}/>)}
    </View>

  );
}
//Styheet
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
