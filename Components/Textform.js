import React, {useState} from 'react'
import {  Text,TextInput, View,StyleSheet, ScrollView, TouchableOpacity, Alert, KeyboardAvoidingView, } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import  IconRoom  from 'react-native-vector-icons/Ionicons';
import TimePicker from './TimePicker';
import * as SQLite from 'expo-sqlite'
// biến database
const db= SQLite.openDatabase('database','1.0')
// biến TextForm
const TextForm = ({navigation, setShow, setStatus}) => {

    const [information,setInformation] = useState({
        properTypes: '',
        choiceRoom:null,
        dateAndTime: null,
        priceOfMonthly:null,
        furnitureType:null,
        note:'',
        report:'',
      })
// biến timeChanges
    const [timechanges, settimechanges] = useState()
    const onChange =(input)=>(value)=>{
        setInformation({...information,[input]:value})
    }
// biến placeholder
    const placeholder=(form)=> {
        const Placeholder = {
            label:`Choice any ${form}`,
            value: null
        }
        return Placeholder
    }
// biến insertDB
    const insertDB = async(valueDB)=>{
        const{properTypes,choiceRoom,dateAndTime,priceOfMonthly,furnitureType,note,report} = valueDB
            await db.transaction((tx)=>{
                tx.executeSql(
                    `INSERT OR IGNORE INTO mobieapp(
                        propertypes,
                        bedroom,
                        createAt,
                        monthlyprice,
                        furnituretype,
                        note,
                        report
                      )
                      VALUES (
                        ?,?,?,?,?,?,?
                      )`,
                      [properTypes,choiceRoom,dateAndTime,priceOfMonthly,furnitureType,note,report],
                      (tx,result)=>{
                        console.log('insertDB successfully!');
                        console.log(result);
                        console.log(result.rowsAffected)
                        if(result.rowsAffected <1){
                            setStatus('errorDup')
                            setShow(true)
                        }else{
                            setShow(true)
                            setStatus('')
                        }
                    }
                )
            })
    }
// biến submit
    const Display = (giatri) => {
        if(!giatri) return
        if(giatri.properTypes ==="" || giatri.report ===""){
            setShow(true)
            setStatus('error')
        }else if(giatri.choiceRoom === null ||  giatri.priceOfMonthly ===null || giatri.dateAndTime ===null){
            setShow(true)
            setStatus('error')
        }
        else{
            insertDB(giatri)
            setInformation({
                properTypes: '',
                choiceRoom:null,
                dateAndTime: null,
                priceOfMonthly:null,
                furnitureType:null,
                note:'',
                report:'',
              })
        }
    }
 // thẻ view
    return (
    <View style={styles.Header} >
        <KeyboardAvoidingView>
        <ScrollView>
            <View style={styles.ViewField}>
        <Text style={styles.ViewText}>Property type</Text>
        <TextInput
        style={styles.StyleFields} 
        name="properTypes" 
        value={information.properTypes} 
        onChangeText={onChange('properTypes')}/>
        <Text style={styles.ViewText}>BedRooms</Text>
        <RNPickerSelect
            useNativeAndroidPickerStyle={false}
            placeholder = {placeholder('Bedrooms')}
            style={StyleSelection}
            value={information.choiceRoom}
            onValueChange={(value) => setInformation({...information,choiceRoom:value})}
            items={[
                { label: 'Studio', value: 'Studio' },
                { label: '1', value: '1' },
                { label: '2', value: '2' },
                { label: '3', value: '3' },
                { label: '4+', value: '4+' },
            ]}
            Icon={()=>{
                return(<IconRoom name='chevron-down-circle-outline' color='black' size={23} style={{
                    marginTop: 14,
                    marginRight: 5,
                }}/>)
            }}
        />
        <Text style={styles.ViewText}>DateTime</Text>
        <TimePicker 
        timechanges = {timechanges}
        settimechanges = {settimechanges}
        dateAndTime={information.dateAndTime} setInformation={setInformation} information={information}/>
        <Text style={styles.ViewText}>Monthly Rent Price</Text>
        <TextInput
        keyboardType='numeric'
        placeholder= "Please enter monthly rental price"
        style={styles.StyleFields} 
        name="priceOfMonthly" 
        value={information.priceOfMonthly} 
        onChangeText={onChange('priceOfMonthly')}/>
        <Text style={styles.ViewText}>Furniture Types</Text>
        <RNPickerSelect
            useNativeAndroidPickerStyle={false}
            value={information.furnitureType}
            placeholder = {placeholder('Furniture Types')}
            style={StyleSelection}
            onValueChange={(value) => setInformation({...information,furnitureType:value})}
            items={[
                { label: 'Furnished', value: 'Furnished' },
                { label: 'Unfurnished', value: 'Unfurnished' },
                { label: 'Part Furnished', value: 'Part Furnished' },
                { label: ' Student', value: 'Student'}, 
                { label: ' Senior', value: 'Senior'},
                { label: ' Loveseat', value: 'Loveseat'},
            ]}
            Icon={()=>{
                return(<IconRoom name='chevron-down-circle-outline' color='black' size={23} style={{
                    marginTop: 14,
                    marginRight: 5,
                }}/>)
            }}
        />
        <Text style={styles.ViewText}>Notes</Text>
        <TextInput
        placeholder="If there is anything please make a note"
        style={styles.StyleFields} 
        name="note" 
        value={information.note} 
        onChangeText={onChange('note')}/>
        <Text style={styles.ViewText}>Name Of The Reporter</Text>
        <TextInput
        placeholder="Please enter your name!"
        style={styles.StyleFields} 
        name="report" 
        value={information.report} 
        onChangeText={onChange('report')}/>
        </View>
        </ScrollView>
        <View style={styles.ViewButton}>
            <TouchableOpacity 
            style={styles.StyleButton}
            onPress={()=>Display(information)}
            >
                    <Text style={styles.StyleText}>Submit</Text>
            </TouchableOpacity>
        </View>
        </KeyboardAvoidingView>
    </View>
    
    )
}
// stylesheet
const styles = StyleSheet.create({
    Header:{
        flex: 1,
        justifyContent: 'center',
        height: 470,
    },
    StyleFields:{
        height:40, 
        width:280, 
        borderRadius:2,
        padding:10,
        borderColor:'black', 
        borderStyle:'solid', 
        borderWidth:1, 
        marginTop:8,
    },
    ViewText:{
        marginTop: 7,
        
    },
    ViewField:{
        flex:1,
        padding:16,
        flexDirection:'column',
        justifyContent:'center',
        marginLeft:30,
        marginRight:30
    },
    ViewButton:{
        alignItems: 'center',
        marginTop: 20,
        marginBottom:40

    },
    StyleButton:{
        width: 165,
        borderStyle:'solid',
        borderWidth: 1,
        borderRadius:4,
        borderColor: 'black',
        backgroundColor: "#008000",
        height: 52,
        marginTop: 20
    },
    StyleText:{
        textAlign: 'center',
        paddingTop: 15,
        fontSize: 15,
    }
})
const StyleSelection = StyleSheet.create({
    inputAndroid: {
        fontSize: 14,
        borderColor: 'black',
        paddingHorizontal: 9,
        paddingVertical: 7,
        borderWidth: 1,
        paddingRight: 30,
        marginTop:5,
        borderRadius: 3,
        color: 'black',
        
      },
  });
export default TextForm
