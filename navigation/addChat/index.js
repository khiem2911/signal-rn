import { View,StyleSheet,Text } from "react-native";
import { Input,Button,Avatar } from '@rneui/themed';
import Icon from "react-native-vector-icons/AntDesign"
import { useEffect, useLayoutEffect, useState } from "react";
import {db} from "../../firebase/index"
export default AddChat=({navigation})=>{
    const[input,setChatName]=useState("")

    const createChat = async () =>{
       await db.collection("chats").add({
            chatName:input
       }).then(()=>{
            navigation.goBack()
       }).catch((error)=>{
        alert(error)
       })
    }

   
    useLayoutEffect(()=>{
        navigation.setOptions({
            title:"Add a new chat",
            headerBackTitle:"Chats"
        })
    },[navigation])



    return (
        <View style={styles.container}>
            <View style={styles.inputContainer}>
            <Input 
            onChangeText={(value)=>setChatName(value)}
             placeholder="Enter a chat name" 
             onSubmitEditing={createChat}
             leftIcon={()=><Icon name="wechat" 
             size={24}/>}
             value={input}
             />
               <Button onPress={createChat} title="Create new Chat"/>
            </View>
        </View>
    )
}

const styles=StyleSheet.create({
    container:{
        flex:1,
    },
    inputContainer:{
        paddingTop:15,
        paddingHorizontal:10
    }
})