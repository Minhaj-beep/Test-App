import React, { useEffect, useState } from "react"
import {View, Text, StatusBar} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import Post from '../components/discovery/Post'
import {useNavigation} from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'

const Discovery = () => {
    const [data, setData] = useState(null)
    const [token, setToken] = useState(null)
    const [loading, setLoading] = useState(true)
    const [loading2, setLoading2] = useState(true)
    const navigation = useNavigation();
    if(data == null){
        try{
            fetch('http://restapi.adequateshop.com/api/users?page=1', {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `bearer ${token}`
            },
            
            }).then(res=>res.json())
            .then(data=>{
                setData(data)
                setLoading2(false)
            });
        } catch(e) {
            console.log('This is the '+ e)
        }
    }
    // console.log('Mian token: '+token)
    const getData = async () => {
        try {
            const value = await AsyncStorage.getItem('token')
            if(value !== null) {
                setToken(value)
                setLoading(false)
            }
        } catch(e) {
            console.log(e)
        }
    }
    getData()
    
    return (
        <View style={{flex:1}}>
            {loading && loading2 ? <></> :
                <>
                    <StatusBar translucent backgroundColor="transparent" />
                    <View style={{backgroundColor:"#baa8dc", height:StatusBar.currentHeight, justifyContent:"center"}}></View>
                    <View style={{height:'10%', backgroundColor:"#baa8dc", width:'100%'}}>
                        <Text style={{alignSelf:"center", fontSize:20, fontWeight:"bold", top:'40%'}}>HireTheART</Text>
                        <Icon name="add-circle-outline" onPress={()=>{navigation.navigate('AddUser', {token: token})}} size={30} color="#FFF" style={{alignSelf:"flex-end", right:10}} />
                    </View>
                    {console.log(loading + 'and' + loading2 )}
                    {loading2 ? <></> : <Post data = {data.data} loading={loading2} token={token} /> }
                </>
            }
        </View>
    )
}

export default Discovery