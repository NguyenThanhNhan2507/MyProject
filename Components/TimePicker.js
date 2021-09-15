import React from 'react'
import {  Text, View,StyleSheet, Platform } from 'react-native';
import  IconTime  from 'react-native-vector-icons/Ionicons';
import { useState } from 'react/cjs/react.development';
import DateTimePicker  from '@react-native-community/datetimepicker';
import {formatISO9075} from 'date-fns'


const TimePicker = ({dateAndTime, setInformation, information}) => {
    const [status, setStatus] = useState('date')
    const [show, setShow] = useState(false)
    const onChangeValue = (event,choosedDateandTime) => {
        const presentDateTime = choosedDateandTime || dateAndTime
        if(Platform.OS === "android"){
            setShow(false)
        }
        setInformation({...information,dateAndTime:presentDateTime})
    }
    const setTimeAndDateStatus = (status) => {
        setShow(true)
        setStatus(status)
    }
    const showDate = () => {
        setTimeAndDateStatus('date')
    }
    const showTime = () => {
        setTimeAndDateStatus('time')
    }
    return (
        <View style={style.DateTimeForm}>
            <Text style={style.TextTime}>{dateAndTime && formatISO9075(dateAndTime)}</Text>
            <View style={style.ViewTime}>
                <IconTime name={'calendar-outline'} size={20} color={'black'} onPress={showDate}/>
                <IconTime name={'timer-outline'} size={20} color={'black'} onPress={showTime}/>
            </View>
            {
                show && (
                    <DateTimePicker
                        testID="dateTimePicker"
                        value={information.dateAndTime}
                        mode={status}
                        is24Hour={true}
                        display="default"
                        onChange={onChangeValue}

                    />
                )
            }
        </View>
        
    )
}

const style=StyleSheet.create({
    DateTimeForm:{
        height: 45,
        display:'flex',
        flexDirection:'row',
        width: 280,
        borderRadius: 2,
        borderColor: 'black',
        borderWidth: 1,
        borderStyle: 'solid',
        marginTop: 5,
        
    },
    TextTime:{
        width: '67%',
        paddingTop: 8,
        paddingLeft: 9,
    },
    ViewTime:{
        display:'flex',
        flexDirection:'row',
        justifyContent: 'space-around',
        marginTop: 12,
        width: '33%'
    }

})
export default TimePicker
