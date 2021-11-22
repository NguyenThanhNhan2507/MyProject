import React, { useState } from 'react'
import {View, Text, Modal, StyleSheet, TouchableOpacity, TextInput, Alert} from 'react-native'
import  Icon  from 'react-native-vector-icons/Ionicons'
import * as SQLite from 'expo-sqlite'
const db= SQLite.openDatabase('database','1.0')
const EditModal = ({idEdit,visible,setVisible}) => {
    const Closemode = ()=>{
        setVisible(false)
    }
    const EditNoteColumn = async(id)=>{
        await db.transaction((tx)=>{
          tx.executeSql("UPDATE mobieapp SET note=? WHERE idData=?",
          [editValue,id],
          (tx,result)=>{
           console.log("edit ok")
           setVisible(false)
           Alert.alert(
               'Edit Note',
               'You edited note successfully',
               [
                   {
                       text:'OK',
                       onPress:()=>{console.log('')}
                    
                   }
               ]
           )
          },
          (error)=>{
            console.log('Cannot edit')
          }
          )
        })
      }
    const [editValue,setEditValue] = useState('')
    return (
      <Modal transparent visible={visible}>
          <View style={styles.modelForm}>
              <View style={styles.Boxder}>
                <View style={{alignItems:'flex-end'}}>
                    <View style={styles.Header}>
                    <Icon style={styles.icons} name="close-outline" size={50} color="#000000" onPress={Closemode}/>
                    </View>
                </View>
                <View style={{alignItems:'center'}}>
                    <Text style={styles.header}>Edit Note</Text>
                </View>
                <View style={{alignItems:'center'}}>
                    <TextInput
                    value={editValue}
                    onChangeText={(text)=>setEditValue(text)}
                    style={styles.input}
                    textAlignVertical="top"
                    multiline
                    numberOfLines={6}
                    placeholder="Write note in here"
                    />
                </View>
                <View style={{alignItems:'center'}}>
                    <TouchableOpacity style={styles.btn} onPress={()=>EditNoteColumn(idEdit)}>
                        <Text style={styles.textbtn}>EDIT</Text>
                    </TouchableOpacity>
                </View>
               </View>
          </View>
      </Modal>
    )
}
const styles = StyleSheet.create({
    modelForm:{
        flex:1,
        justifyContent: 'center',
        backgroundColor:'rgba(0,0,0,0.5)',
        alignItems:'center',
    },
    icons:{
        marginTop:-18,
        marginRight:-10
    },
    iconerror: {
        paddingVertical: 8,

    },
    header:{
        fontSize:25,
        marginBottom:15
    },
    input:{
       height:130,
       width:"100%",
       borderWidth:1,
       borderRadius:5,
       padding:8,
       borderColor:'#454545'
    },
    Headers:{
        width: '100%',
        alignItems: 'flex-end',
        justifyContent: 'center'
    },
    Boxder: {
        width: '80%',
        paddingHorizontal: 20,
        backgroundColor: '#fff',
        borderRadius: 5,
        elevation:7,
        shadowColor: '#fff',
        shadowOffset: {width:2,height:1},
        shadowOpacity: 0.2,
        shadowRadius: 4,
        paddingVertical: 32,
    },
    btn:{
        width:'100%',
        height: 45,
        backgroundColor: '#34eb34',
        borderRadius: 5,
        elevation:7,
        shadowColor: '#fff',
        shadowOffset: {width:2,height:1},
        shadowOpacity: 0.2,
        shadowRadius: 4,
        marginTop: 25,
        

    },
    textbtn:{
        fontSize: 20,
        letterSpacing: 1.2,
        color: '#fff',
        marginTop: 5,
        marginBottom: 5,
        textAlign:'center'
    },
    content:{
        marginLeft: 7,
        color: '#ACADA8',
        fontSize: 14,
        letterSpacing: 1,
        textAlign:'center',
    }
}) 
export default EditModal
