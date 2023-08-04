import { View,Text,ScrollView, TouchableOpacity } from "react-native";
import { auth } from "../../firebase";
import { useLayoutEffect,useEffect, useState } from "react";
import { Input,Button,Avatar } from '@rneui/themed';
import {CustomListItem} from '../../index'
import Icon from "react-native-vector-icons/SimpleLineIcons"
import styles from './style'
import { db } from "../../firebase";

export default Home = ({navigation}) =>{

    const [chats,setChats] = useState([])

    useEffect(()=>{
        const unsubrice = db.collection("chats").onSnapshot(snapshot=>(
         setChats(snapshot.docs.map(item=>({
                id:item.id,
                data:item.data()
           })))
        ))
        return unsubrice
    },[])


    const onAdd = () =>{
        navigation.navigate("AddChat")
    }

    useLayoutEffect(()=>{
        navigation.setOptions({
            headerLeft:()=> <Avatar containerStyle={{marginLeft:20  }}  rounded source={{uri:auth.currentUser.photoURL}}/>,
            headerStyle:{backgroundColor:"white"},
            title:"Signal",
            headerTitleStyle:{color:"black"},
            headerRight:()=>
                <View style={styles.boxHeaderRight}>
                    <TouchableOpacity activeOpacity={0.5}>
                    <Icon name="camera" size={24}/>
                    </TouchableOpacity>
                   <TouchableOpacity onPress={onAdd} activeOpacity={0.5}>
                   <Icon name="pencil" size={24}/>
                   </TouchableOpacity>
                </View>
            
        })
    },[navigation])

    const enterChat = (id,chatName) =>{
        navigation.navigate("Chat",{
            id,
            chatName
        })
    }

    return (
        <View style={styles.wrapper}>
             <ScrollView style={styles.scroll}>
                {chats.map(({id,data:{chatName}})=>(
                      <CustomListItem key={id} id={id} chatName={chatName} enterChat={enterChat}/>
                ))}
        </ScrollView>
        </View>
    )
}