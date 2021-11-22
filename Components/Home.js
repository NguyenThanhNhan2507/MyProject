import React, { useState } from 'react';
import { StyleSheet, Text,TextInput, View } from 'react-native';
import Textform from '../Components/Textform'
import ModelError from './Pop up/ModelError'
import ModelSuccess from './Pop up/ModelSuccess';


export default function Home({navigation}) {
// biến display model
  const [show, setShow] = useState(false)
  const[status, setStatus] = useState('')
//container
  return (
    <View style={styles.Header}>
      <Text style={styles.Border}>HOME</Text>
      <Textform navigation={navigation} setShow={setShow} setStatus={setStatus} />
      {status=== 'error' || status === "errorDup"?(<ModelError status={status} name="alert-circle" show={show} setShow={setShow}/>):(<ModelSuccess show={show} setShow={setShow}/>)}
    </View>
  );
}
//Styheet
const styles = StyleSheet.create({
  Header: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  Border: {
    marginTop: 45,
    marginBottom:10,
    fontSize: 30,
    fontWeight: '400',
    fontFamily: 'Amita-Regular'
  }
});
