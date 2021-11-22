import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import {useIsFocused} from '@react-navigation/native'
import * as SQLite from 'expo-sqlite'
import  Icon  from 'react-native-vector-icons/Ionicons';
import EditModal from './Pop up/EditModal';
const db= SQLite.openDatabase('database','1.0')
export default function ListInformation() {
// biến TableSQL để delete
  const[TableSQL, setTableSQL] = useState(false)
  const[idEdit, setIdEdit] = useState()
  const[visible, setVisible] = useState(false)
  console.log(idEdit)
  const DeleteTable = async(id)=>{
    await db.transaction((tx)=>{
      tx.executeSql("DELETE FROM mobieapp WHERE idData = ?",
      [id],
      (tx,result)=>{
        setTableSQL(true)
      },
      (error)=>{
        console.log('Cannot delete')
      }
      )
    })
  }
  const edit = (id)=>{
    setIdEdit(id)
    setVisible(true)
  }
  // biến gọi database
  const isFocused = useIsFocused()
  // biến show database
  const [ShowData, setShowData] = useState([
  ])
  console.log(ShowData)
  // biến TakeData để select
  const TakeData = async()=> {
        await db.transaction((tx)=>{
          tx.executeSql("SELECT * FROM mobieapp",
          [],
          (tx,result)=>{
            console.log(result.rows)
            let Datalist = []
            const len = result.rows.length
            if(len>0){
              for(let i=0;i<len;++i){
                Datalist.push(result.rows.item(i))
                setShowData(Datalist)
              }
            }else{
              setShowData([])
            }
          }
          )
        })
  }
  useEffect(()=>{
    TakeData()
    if(TableSQL){
      setTimeout(()=>{
        setTableSQL(false)
      },1000)
    }
  },[isFocused, TableSQL])

  return (
    // thẻ View
    <View style={styles.Header}>
      <EditModal idEdit={idEdit} visible={visible} setVisible={setVisible}/>
        <Text style={styles.Boder}>List</Text>
        {ShowData.length===0?(
        <View style={{flex:1 ,alignItems: 'center'}}>
          <Text>No any data</Text>
        </View>):(
          <FlatList data={ShowData} keyExtractor={i=>i.idData.toString()} contentContainerStyle={{padding:15,}} renderItem={({item})=>(
            <View style={{marginBottom:18,flexDirection:'row', backgroundColor:'#333333', borderRadius:16, width:280}}>
              <View style={{padding:10, flex:1, }}>
  
                  <View style={{flexDirection:'row', alignItems:'flex-start'}}>
                  <Text style={{color:'#fff'}}>Name:</Text>
                  <Text style={{marginLeft:5,color:'#fff'}}>{item.report}</Text>
                  </View>
  
                  <View style={{flexDirection:'row', alignItems:'flex-start'}}>
                  <Text style={{color:'#fff'}}>Property Types:</Text>
                  <Text style={{marginLeft:5,color:'#fff'}}>{item.propertypes}</Text>
                  </View>
  
                  <View style={{flexDirection:'row', alignItems:'flex-start'}}>
                  <Text style={{color:'#fff'}}>BedRooms:</Text>
                  <Text style={{marginLeft:5,color:'#fff'}}>{item.bedroom}</Text>
                  </View>
  
                  <View style={{flexDirection:'row', alignItems:'flex-start'}}>
                  <Text style={{color:'#fff'}}>DateTime:</Text>
                  <Text style={{marginLeft:5,color:'#fff'}}>{item.createAt}</Text>
                  </View>
  
                  <View style={{flexDirection:'row', alignItems:'flex-start'}}>
                  <Text style={{color:'#fff'}}>Monthly Rent Price:</Text>
                  <Text style={{marginLeft:5,color:'#fff'}}>{item.monthlyprice}</Text>
                  </View>
  
                  <View style={{flexDirection:'row', alignItems:'flex-start'}}>
                  <Text style={{color:'#fff'}}>Furniture Types:</Text>
                  <Text style={{marginLeft:5,color:'#fff'}}>{item.furnituretype}</Text>
                  </View>
                </View>
                <View style={{marginTop:8,display:'flex',flexDirection:'row',padding:5}}>
                <Icon name='pencil' color='green' style={{marginTop:2}} size={18} onPress={()=>edit(item.idData)} />
                  <Icon name='close-outline' color='red' size={25} onPress={()=>DeleteTable(item.idData)} />
                </View>
              </View>
          )}/>
        )}
        
    </View> 
  );
}
//Stylesheet
const styles = StyleSheet.create({
  Header: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  Boder: {
    flex: 1,
    marginTop: 15,
    fontSize: 30,
    fontWeight: '400',
  }
});
