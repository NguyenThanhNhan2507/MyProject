import React,{useState, useEffect} from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import * as SQLite from 'expo-sqlite'
import {useIsFocused,useNavigation} from '@react-navigation/native'

const db= SQLite.openDatabase('database','1.0')
export default function Search() {
  const [find, setFind] = useState('')
  const [data, setData] = useState([])
  const [datafind, setDatafind] = useState([])
  const isFocused = useIsFocused()
  const Directional = useNavigation()
  const onSearch = (value)=>{
    if(value.length===0){
      setDatafind(data)
      setFind(value)
    }else{
      const newDataFind = data.filter((item)=>{
        const itemFind = item.propertypes?item.propertypes.toUpperCase():''.toUpperCase()
        const itemName = item.report?item.report.toUpperCase():''.toUpperCase()
        const itemPrice = item.monthlyprice?item.monthlyprice.toUpperCase():''.toUpperCase()
        const itemBedRoom = item.bedroom?item.bedroom.toUpperCase():''.toUpperCase()
        const valueFind = value.toUpperCase()
        return (
          itemFind.indexOf(valueFind)>-1 
          || itemName.indexOf(valueFind)>-1
          || itemPrice.indexOf(valueFind)>-1
          || itemBedRoom.indexOf(valueFind)>-1
         )
      })
      setDatafind(newDataFind)
      setFind(value)
    }
  }
  const findObjDetail = (idDetail)=>{
    const objDetail = datafind.find(item=>item.idData === idDetail)
    Directional.navigate('Details',{objInfo:objDetail})
  }
  const TakeData = async()=> {
    await db.transaction((tx)=>{
      tx.executeSql("SELECT * FROM mobieapp",
      [],
      (tx,result)=>{
        let Datalist = []
        const len = result.rows.length
        if(len>0){
          for(let i=0;i<len;++i){
            Datalist.push(result.rows.item(i))
            setDatafind(Datalist)
            setData(Datalist)
          }
        }else{
          setDatafind([])
          setData([])
        }
      }
      )
    })
}
useEffect(() => {
  TakeData()

  return ()=>!isFocused
}, [isFocused])
  return (
    
    <View style={styles.Total}>
        <TextInput
        style={styles.TextBoxSearch} 
        placeholder='what are you looking for?'
        onChangeText={(value)=>onSearch(value)}
        value={find}/>
        <View style={{flex:1}}>
          {datafind.length===0?(
            <Text>Do not any data to search</Text>
          ):(
            <FlatList
            data={datafind}
            keyExtractor={(item)=>item.idData.toString()}
            contentContainerStyle={{padding:20}}
            renderItem={({item})=>(
              <TouchableOpacity
              onPress={()=>findObjDetail(item.idData)}
              style={styles.Footer}>
                <View style={{flexDirection:'row'}}>
                <Text style={{color:'#fff'}}>Property Types:</Text>
                <Text style={{color:'#fff'}}>{item.propertypes}</Text>
                </View>

                <View style={{flexDirection:'row'}}>
                <Text style={{color:'#fff'}}>BedRooms:</Text>
                <Text style={{color:'#fff'}}>{item.bedroom}</Text>
                </View>

                <View style={{flexDirection:'row'}}>
                <Text style={{color:'#fff'}}>DateAndTime:</Text>
                <Text style={{color:'#fff'}}>{item.createAt}</Text>
                </View>

                <View style={{flexDirection:'row'}}>
                <Text style={{color:'#fff'}}>Monthly Price:</Text>
                <Text style={{color:'#fff'}}>{item.monthlyprice}</Text>
                </View>

                <View style={{flexDirection:'row'}}>
                <Text style={{color:'#fff'}}>Furniture Types:</Text>
                <Text style={{color:'#fff'}}>{item.furnituretype?item.furnituretype:"none"}</Text>
                </View>

                <View style={{flexDirection:'row'}}>
                <Text style={{color:'#fff'}}>Reporter:</Text>
                <Text style={{color:'#fff'}}>{item.report}</Text>
                </View>

              </TouchableOpacity>
            )}
            />
          )}
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  TextBoxSearch:{
    width: 310,
    height:48,
    borderWidth: 1,
    borderRadius:15,
    marginTop:60,
    textAlign:'center'
  },
  Total: {
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

  },
  Border:{
    height:1,
    width:'80%',
    backgroundColor:'#6B6B6B',
    marginTop: 18,
  },
  Footer:{
    marginBottom:18,
    flexDirection:'column',
    borderRadius:14,
    backgroundColor:'#333333',
    shadowColor:'#000',
    shadowOpacity:0.7,
    shadowOffset:{width:4,height:8},
    marginTop:12,
    elevation:10,
    shadowRadius:16,
    width:300,
    padding: 23,
  }
});
