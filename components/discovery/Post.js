import React from "react"
import {View, Text, Image, FlatList, Dimensions, TouchableOpacity} from 'react-native'
const {width, height} = Dimensions.get('window')
import Icon from 'react-native-vector-icons/Ionicons'
import {useNavigation} from '@react-navigation/native'
import { LinearGradient } from 'expo-linear-gradient'

const Post = (props) => {
    // props.data.data.map((i)=>console.log(i))
    // console.log('this is it : '+props.data)
    const navigation = useNavigation();
    const renderItem = ({ item }) => (
        <View style={{marginBottom:20,}}>
            <View style={{width:"100%", backgroundColor:"#c4c4c4", height:width*0.55, borderTopLeftRadius:10, borderTopRightRadius:10}}>
                <Image source={{uri:item.profilepicture}} resizeMode={'contain'} style={{width:'100%', height:'100%'}} />
            </View>
            <View style={{backgroundColor:"#c4c4c4", borderBottomLeftRadius:10, borderBottomRightRadius:10}}>
                <View>
                    <Icon name="ios-play-circle" size={50} color="#8069D4" style={{alignSelf:"flex-start", left:width*0.1, bottom:25}} />
                </View>
                <View style={{alignItems:"center", bottom:10}} >
                    <Text style={{marginBottom:10, fontSize:18, fontWeight:"bold"}}>{item.name}</Text>
                    <Text style={{marginBottom:10}}>{item.email}</Text>
                    <Text style={{marginBottom:10}}>{item.location}</Text>
                </View>
                <TouchableOpacity onPress={()=>navigation.navigate('Profile', {id: item.id, token:props.token})} style={{alignItems:"center", borderRadius:10, alignSelf:"center", marginBottom:20, justifyContent:"center"}}>
                    <LinearGradient colors={[ '#8069D4', '#C685B0' ]} style={{borderRadius:10}}>
                        <Text style={{fontWeight:"bold", padding:10}}>View Profile</Text>
                    </LinearGradient>
                </TouchableOpacity>
            </View>
        </View>
    );
    return (
        <>
            {
                props.loading ?
                <></> :
                <View style={{width:'90%', alignSelf:"center", marginTop:10 }}>
                <FlatList
                    data={props.data}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                />
                </View>
            }
        </>
    )
}

export default Post