import React from 'react'
import {  Text, View,StyleSheet, Platform } from 'react-native';
import  IconTime  from 'react-native-vector-icons/Ionicons';
import { useState } from 'react/cjs/react.development';
import DateTimePicker  from '@react-native-community/datetimepicker';
import {formatISO9075} from 'date-fns'


const TimePicker = ({dateAndTime, setInformation, information}) => {
    const [datetime, setDatetime] = useState(new Date(Date.now()))
    const [status, setStatus] = useState('date')
    const [show, setShow] = useState(false)
    const onChangeValue = (event,choosedDateandTime) => {
        const presentDateTime = choosedDateandTime || datetime
        if(Platform.OS === "android"){
            setShow(false)
        }
        setDatetime(presentDateTime)
        const timeDate = new Date(presentDateTime)
        setInformation({...information,dateAndTime:timeDate.toLocaleString()})
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
            <Text style={style.TextTime}>{dateAndTime ? dateAndTime:'YYYY-MM-DD HH-MM-SS'}</Text>
            <View style={style.ViewTime}>
                <IconTime name={'calendar-outline'} size={20} color={'black'} onPress={showDate}/>
                <IconTime name={'timer-outline'} size={20} color={'black'} onPress={showTime}/>
            </View>
            {
                show && (
                    <DateTimePicker
                        testID="dateTimePicker"
                        value={datetime}
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
