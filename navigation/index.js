import { createStackNavigator } from "@react-navigation/stack";
import {Login,Register,Home,AddChat,ChatScreen} from "../index"




const Stack = createStackNavigator()
const globalStyle = {
        headerShown:true,
        headerStyle:{backgroundColor:"#2C6BED"},
        headerTitleAlign:'center',
        headerTintColor:"white"
}


export default AuthStack = () =>{
    return (
        <Stack.Navigator screenOptions={globalStyle} initialRouteName="Login">
            <Stack.Screen name="Login" component={Login}></Stack.Screen>
            <Stack.Screen name="Register" component={Register}></Stack.Screen>
            <Stack.Screen name="Home" component={Home}></Stack.Screen>
            <Stack.Screen name="AddChat" component={AddChat}></Stack.Screen>
            <Stack.Screen name="Chat" component={ChatScreen}></Stack.Screen>
        </Stack.Navigator>
    )
}