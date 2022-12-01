import React, {useState} from "react"
import {View, Text, TextInput, ScrollView, TouchableOpacity, StatusBar} from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import Icon from 'react-native-vector-icons/Ionicons'
import {useNavigation} from '@react-navigation/native'

const SignUp = () => {
    const [name, setName] = useState(null)
    const [id, setId] = useState(null)
    const [pass, setPass] = useState(null)
    const navigation = useNavigation();

    const submitSignup = () => {
        try{
            fetch('http://restapi.adequateshop.com/api/authaccount/registration', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: name,
                email: id,
                password: pass
            })
            }).then(res=>res.json())
            .then(data=>{
                console.log(data.message)
                alert(data.message)
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
                    <View style={{alignItems:"center", justifyContent:"center"}}>
                        <Icon name="logo-javascript" size={200} color="#FFF" />
                    </View>
                    <View style={{width:"90%", alignSelf:"center"}}>
                        <Text style={{fontSize:18, fontWeight:"bold", color:"white"}}>Sign In</Text>
                        <Text style={{color:"white"}}>with your phone number</Text>
                    </View>
                    <View style={{width:'90%', height:50, backgroundColor:"#D3C2E4", alignSelf:"center", justifyContent:"center", marginTop:15, borderRadius:10}}>
                        <TextInput 
                            style={{height:"100%", width:'95%', alignSelf:"center"}} 
                            placeholder="Enter your name"
                            autoComplete="email"
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
                            placeholder="Password"
                            textContentType="password"
                            secureTextEntry={true}
                            autoComplete="password"
                            onChangeText={newText => setPass(newText)}
                        />
                    </View>
                    <TouchableOpacity onPress={submitSignup} style={{width:'90%', alignItems:"center", height:50, backgroundColor:"white", alignSelf:"center", justifyContent:"center", marginTop:25, borderRadius:10}}>
                        <Text style={{fontSize:18, fontWeight:"bold", color:"#8069D4"}}>Submit</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ alignItems:"center", width:"100%", marginTop:'50%'}}>
                    <View style={{flexDirection:"row"}}>
                        <Text style={{color:"white", top:4}}> Already have an account? </Text>
                        <Text style={{fontSize:18, fontWeight:"bold", color:"white"}} onPress={()=>navigation.navigate('Login')}> Sing In </Text>
                    </View>
                </View>
            </ScrollView>
        </LinearGradient>
    )
}

export default SignUp