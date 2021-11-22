import React, {useState} from "react"; 
import {View, Text, StyleSheet} from 'react-native'
import {useRoute} from '@react-navigation/native'

    const Details = () => {
        const DataTransmission = useRoute()
        const {idData, propertypes, bedroom, createAt, monthlyprice, furnituretype, note, report} = DataTransmission.params.objInfo
        return(
            <View style={styles.Header}>
                <Text style={styles.Border}>{`The post ${idData}`}</Text>
                <View style={{flex:1,flexDirection:'column',justifyContent:'center'}}>
                    <View style={styles.Footer}>
                    <Text style={{fontSize:17,fontWeight:'bold'}}>Property Types:</Text>
                    <Text style={{marginLeft:9}}>{propertypes}</Text>
                    </View>

                   <View style={styles.Footer}>
                   <Text style={{fontSize:17,fontWeight:'bold'}}>BedRooms:</Text>
                    <Text style={{marginLeft:9}}>{bedroom}</Text>
                   </View>

                    <View style={styles.Footer}>
                    <Text style={{fontSize:17,fontWeight:'bold'}}>DateAndTime:</Text>
                    <Text style={{marginLeft:9}}>{createAt}</Text>
                    </View>

                    <View style={styles.Footer}>
                    <Text style={{fontSize:17,fontWeight:'bold'}}>MonthlyPrice:</Text>
                    <Text style={{marginLeft:9}}>{monthlyprice}</Text>
                    </View>

                    <View style={styles.Footer}>
                    <Text style={{fontSize:17,fontWeight:'bold'}}>Furniture Types:</Text>
                    <Text style={{marginLeft:9}}>{furnituretype}</Text>
                    </View>

                    <View style={styles.Footer}>
                    <Text style={{fontSize:17,fontWeight:'bold'}}>Note:</Text>
                    <Text style={{marginLeft:9}}>{note?note:'You do not write down note'}</Text>
                    </View>

                    <View style={styles.Footer}>
                    <Text style={{fontSize:17,fontWeight:'bold'}}>Reporter:</Text>
                    <Text style={{marginLeft:9}}>{report}</Text>
                    </View>




                </View>
            </View>
        )
    }

const styles = StyleSheet.create({
    Header:{
        flex: 1,
        alignItems: 'center',
    },
    Border:{
        fontSize: 40,
        marginTop:50,
        fontWeight:'bold'
    },
    Footer:{
        display:'flex',
        marginTop:10,
        marginBottom:10,
        flexDirection:'row'
    }
})
 export default Details
    