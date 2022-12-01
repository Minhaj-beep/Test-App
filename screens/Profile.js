import React, { useEffect, useState } from "react"
import {View, Text, StatusBar} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import Page from '../components/Profile/Page'
import {useNavigation} from '@react-navigation/native'

const Profile = ({route}) => {
    const [data, setData] = useState(null)
    const id = route.params.id
    const token = route.params.token
    // console.log('This is the token ' + token.token)
    const navigation = useNavigation();
    useEffect(()=>{
        try{
            fetch(`http://restapi.adequateshop.com/api/users/${id}`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `bearer ${token}`
            },
            
            }).then(res=>res.json())
            .then(data=>{
                setData(data)
                // console.log(data)
            });
        } catch(e) {
            console.log('This is the '+ e)
        }
    },[])
    return (
        <View style={{flex:1}}>
            <View style={{backgroundColor:"#baa8dc", height:StatusBar.currentHeight, justifyContent:"center"}}></View>
            <View style={{height:'10%', backgroundColor:"#baa8dc", width:'100%'}}>
                <Text style={{alignSelf:"center", fontSize:20, fontWeight:"bold", top:'35%'}}>Profile Details</Text>
                <Icon name="chevron-back" onPress={()=>{navigation.goBack()}} size={30} color="#FFF" style={{alignSelf:"flex-start", left:10}} />
            </View>
            {data == null ? <></> : <Page data = {data} /> }
        </View>
    )
}

export default Profile