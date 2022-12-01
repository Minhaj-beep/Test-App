import React, {useState} from "react"
import {View, Text, TextInput, ScrollView, TouchableOpacity, StatusBar} from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import Icon from 'react-native-vector-icons/Ionicons'
import {useNavigation} from '@react-navigation/native'


const Login = () => {
    const navigation = useNavigation();
    const [id, setId] = useState(null)
    const [pass, setPass] = useState(null)

    const submitLogin = () => {
        try{
            fetch('http://restapi.adequateshop.com/api/authaccount/login', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: id,
                password: pass
            })
            }).then(res=>res.json())
            .then(data=>{
                // console.log(data.data.Token)
                if(data.message == 'success'){
                    const storeData = async () => {
                        try {
                            await AsyncStorage.setItem('token', token)
                        } catch (e) {
                            console.log(e)
                        }
                      }
                      storeData()
                    navigation.navigate('Discovery')
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
                    <TouchableOpacity onPress={submitLogin} style={{width:'90%', alignItems:"center", height:50, backgroundColor:"white", alignSelf:"center", justifyContent:"center", marginTop:25, borderRadius:10}}>
                        <Text style={{fontSize:18, fontWeight:"bold", color:"#8069D4"}}>Login</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ alignItems:"center", width:"100%", marginTop:'65%'}}>
                    <View style={{flexDirection:"row"}}>
                        <Text style={{color:"white", top:4}}> Have not any account? </Text>
                        <Text style={{fontSize:18, fontWeight:"bold", color:"white"}} onPress={()=>navigation.navigate('SignUp')}> Sing Up </Text>
                    </View>
                </View>
            </ScrollView>
        </LinearGradient>
    )
}

export default Login