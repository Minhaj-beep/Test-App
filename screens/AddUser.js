import React, {useState} from "react"
import {View, Text, TextInput, ScrollView, TouchableOpacity, StatusBar} from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import Icon from 'react-native-vector-icons/Ionicons'
import {useNavigation} from '@react-navigation/native'

const AddUser = ({route}) => {
    const [name, setName] = useState(null)
    const [id, setId] = useState(null)
    const [loc, setLoc] = useState(null)
    const token = route.params.token
    const navigation = useNavigation();

    const submitSignup = () => {
        try{
            fetch('http://restapi.adequateshop.com/api/users', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `bearer ${token}`
            },
            body: JSON.stringify({
                name: name,
                email: id,
                location: loc
            })
            }).then(res=>res.json())
            .then(data=>{
                if(data.Message != null){
                    alert(data.Message)
                } else {
                    alert('User created succesfully!')
                    navigation.goBack()
                }
            });
        } catch(e) {
            console.log(e)
        }
    }

    return (
        <LinearGradient style={{width:"100%", height:"100%", position:"absolute"}} 
            colors={[
                '#8069D4',
                '#C685B0'
            ]}
        >
            <StatusBar translucent backgroundColor="transparent" />
            <ScrollView contentContainerStyle={{flex:1}}>
                <View style={{marginTop:StatusBar.currentHeight+20}}>
                    <Icon name="chevron-back" style={{marginLeft:'5%'}} onPress={()=>navigation.goBack()} size={30} color="#FFF" />
                    <View style={{alignItems:"center", justifyContent:"center"}}>
                        <Icon name="logo-javascript" size={200} color="#FFF" />
                    </View>
                    <View style={{width:"90%", alignSelf:"center"}}>
                        <Text style={{fontSize:18, marginVertical:20, alignSelf:"center", fontWeight:"bold", color:"white"}}>Add User</Text>
                    </View>
                    <View style={{width:'90%', height:50, backgroundColor:"#D3C2E4", alignSelf:"center", justifyContent:"center", marginTop:15, borderRadius:10}}>
                        <TextInput 
                            style={{height:"100%", width:'95%', alignSelf:"center"}} 
                            placeholder="Enter your name"
                            onChangeText={newText => setName(newText)}
                        />
                    </View>
                    <View style={{width:'90%', height:50, backgroundColor:"#D3C2E4", alignSelf:"center", justifyContent:"center", marginTop:15, borderRadius:10}}>
                        <TextInput 
                            style={{height:"100%", width:'95%', alignSelf:"center"}} 
                            placeholder="Email-id"
                            keyboardType="email-address"
                            autoComplete="email"
                            onChangeText={newText => setId(newText)}
                        />
                    </View>
                    <View style={{width:'90%', height:50, backgroundColor:"#D3C2E4", alignSelf:"center", justifyContent:"center", marginTop:15, borderRadius:10}}>
                        <TextInput 
                            style={{height:"100%", width:'95%', alignSelf:"center"}} 
                            placeholder="Location"
                            onChangeText={newText => setLoc(newText)}
                        />
                    </View>
                    <TouchableOpacity onPress={submitSignup} style={{width:'90%', alignItems:"center", height:50, backgroundColor:"white", alignSelf:"center", justifyContent:"center", marginTop:25, borderRadius:10}}>
                        <Text style={{fontSize:18, fontWeight:"bold", color:"#8069D4"}}>Submit</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </LinearGradient>
    )
}

export default AddUser