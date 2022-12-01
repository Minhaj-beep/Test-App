import React, { useEffect, useState } from "react"
import {View, Text, Image, Dimensions, FlatList} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'

const {width, height} = Dimensions.get('window')

const Page = (data) => {
    const [images, setImages] = useState(null)
    
    const getData = async () => {
        try {
            const value = await AsyncStorage.getItem('token')
            if(value !== null) {
                console.log(value)
            }
        } catch(e) {
            console.log(e)
        }
    }
    getData()

    useEffect(()=> {
        fetch('https://jsonplaceholder.typicode.com/photos')
        .then(res=>res.json())
        .then(data=>setImages(data))
    },[])

    const renderItem = ({ item }) => {
        return (
            <View style={{width:width*0.27, borderRadius:10, marginHorizontal:10, marginVertical:10, height:width*0.27}}>
                <Image source={{uri: item.thumbnailUrl}} resizeMode={'contain'} style={{width:"100%", borderRadius:10, height:'100%'}} />
            </View>
        )
    }

    return (
        <View style={{width:"95%", marginTop:10, alignSelf:"center"}}>
            <View style={{width:"100%", backgroundColor:"#c4c4c4", height:width*0.55, borderTopLeftRadius:10, borderTopRightRadius:10}}>
                <Image source={{uri:data.data.profilepicture}} resizeMode={'contain'} style={{width:'100%', height:'100%'}} />
            </View>
            <View style={{width:"100%", alignItems:"center", backgroundColor:"#c4c4c4", borderBottomLeftRadius:10, borderBottomRightRadius:10}}>
                <Text style={{marginBottom:10, marginTop:20, fontWeight:"bold", fontSize:20}}>{data.data.name}</Text>
                <Text style={{marginBottom:10}}>{data.data.email}</Text>
                <Text style={{marginBottom:10}}>{data.data.location}</Text>
            </View>
            <View style={{marginVertical:10}}>
                <Text style={{fontSize:20, marginBottom:0}}>Gallery</Text>
                <View>
                    <FlatList 
                        data={images}
                        renderItem={renderItem}
                        keyExtractor={item => item.id}
                        numColumns={3}
                    />
                </View>
            </View>
        </View>
    )
}

export default Page