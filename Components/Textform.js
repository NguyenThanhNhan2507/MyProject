import React, {useState} from 'react'
import {  Text,TextInput, View,StyleSheet, ScrollView, TouchableOpacity, ImageBackground } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import  IconRoom  from 'react-native-vector-icons/Ionicons';
import TimePicker from './TimePicker';

const TextForm = () => {
    const [information,setInformation] = useState({
        properTypes: '',
        choiceRoom: '',
        dateAndTime: new Date(Date.now()),
        priceOfMonthly: '',
        furnitureType:'',
        note:'',
        report:'',
        updatedIF: new Date(Date.now()).toISOString(),
      })
    console.log(information)
    const onChange =(input)=>(value)=>{
        setInformation({...information,[input]:value})
    }
    const placeholder={
        label:'Please choice any room...',
        value:null
    }
    
    return (
    <View style={styles.wrapperForm} >
        <ScrollView contentContainerStyle={styles.Rolling}>
            <View style={styles.ViewRoll}>
        <Text style={styles.SeenView}>Property type</Text>
        <TextInput
        style={styles.textIputs} 
        name="properTypes" 
        value={information.properTypes} 
        onChangeText={onChange('properTypes')}/>
        <Text style={styles.SeenView}>BedRooms</Text>
        <RNPickerSelect
            useNativeAndroidPickerStyle={false}
            placeholder = {placeholder}
            style={stylesForms}
            onValueChange={(values) => setInformation({...information,choiceRoom:values})}
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
        <Text style={styles.SeenView}>DateTime</Text>
        <TimePicker dateAndTime={information.dateAndTime} setInformation={setInformation} information={information}/>
        <Text style={styles.SeenView}>Monthly Rent Price</Text>
        <TextInput
        placeholder= "Please enter monthly rental price"
        style={styles.textIputs} 
        name="priceOfMonthly" 
        value={information.priceOfMonthly} 
        onChangeText={onChange('priceOfMonthly')}/>
        <Text style={styles.SeenView}>Furniture Types</Text>
        <RNPickerSelect
            useNativeAndroidPickerStyle={false}
            placeholder = {placeholder}
            style={stylesForms}
            onValueChange={(values) => setInformation({...information,furnitureType:values})}
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
        <Text style={styles.SeenView}>Notes</Text>
        <TextInput
        placeholder="If there is anything please make a note"
        style={styles.textIputs} 
        name="note" 
        value={information.note} 
        onChangeText={onChange('note')}/>
        <Text style={styles.SeenView}>Name Of The Reporter</Text>
        <TextInput
        placeholder="Please enter your name!"
        style={styles.textIputs} 
        name="report" 
        value={information.report} 
        onChangeText={onChange('report')}/>
        </View>
        </ScrollView>
        <View style={styles.SeenView2}>
            <TouchableOpacity style={styles.PressButtion}>
                    <Text style={styles.Text2}>Submit</Text>
            </TouchableOpacity>
        </View>
    </View>
    
    )
}
const styles = StyleSheet.create({
    wrapperForm:{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        height: 470,
    },
    textIputs:{
        height:40, 
        width:280, 
        borderRadius:2,
        padding:10,
        borderColor:'#000000', 
        borderStyle:'solid', 
        borderWidth:1, 
        marginTop:8,
    },
    SeenView:{
        marginTop: 7,
        
    },
    Rolling:{
        flexGrow:1,
    },
    ViewRoll:{
        display:'flex',
        padding:16,
        flexDirection:'column',
    },
    SeenView2:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,

    },
    PressButtion:{
        width: 165,
        borderStyle:'solid',
        borderWidth: 1,
        borderRadius:4,
        borderColor: 'black',
        backgroundColor: '#00bfff',
        height: 52,
        marginTop: 65
    },
    Text2:{
        textAlign: 'center',
        paddingTop: 15,
        fontSize: 15,
    }
})
const stylesForms = StyleSheet.create({
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
