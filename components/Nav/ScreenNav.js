import Chat from "../../screens/Chat"
import Discovery from "../../screens/Discovery"
import Feed from "../../screens/Feed"
import Settings from "../../screens/Settings"
import SignUp from "../../screens/SignUp"
import Login from "../../screens/Login"
import AddUser from "../../screens/AddUser"
import Profile from "../../screens/Profile"

import AsyncStorage from '@react-native-async-storage/async-storage'
import {createNativeStackNavigator, } from '@react-navigation/native-stack';
import { useState } from "react"
const Stack = createNativeStackNavigator();


export default function ScreensNav() {
    const [check, setCheck] = useState(null)
    const getData = async () => {
        try {
            const value = await AsyncStorage.getItem('token')
            if(value !== null) {
                setCheck(value)
            }
        } catch(e) {
            console.log(e)
        }
    }
    getData()
    const checkLogin = () => {
        if(check != null) {
            return 'Discovery'
        } else {
            return 'Login'
        }
    }

	return (
		<Stack.Navigator initialRouteName={checkLogin}>
            <>
                <Stack.Screen name="Discovery" component={Discovery} options={{headerShown: false}}/>
                <Stack.Screen name="Chat" component={Chat} options={{headerShown: false}}/>
                <Stack.Screen name="Feed" component={Feed} options={{headerShown: false}}/>
                <Stack.Screen name="Settings" component={Settings} options={{headerShown: false}}/>
                <Stack.Screen name="SignUp" component={SignUp} options={{headerShown: false}}/>
                <Stack.Screen name="Login" component={Login} options={{headerShown: false}}/>
                <Stack.Screen name="AddUser" component={AddUser} options={{headerShown: false}}/>
                <Stack.Screen name="Profile" component={Profile} options={{headerShown: false}}/>
            </>
		</Stack.Navigator>
    );
}