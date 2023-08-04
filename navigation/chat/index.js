import { Avatar } from "@rneui/themed";
import { StatusBar } from "expo-status-bar";
import { useLayoutEffect, useState } from "react";
import { View,StyleSheet,Text,TouchableOpacity, KeyboardAvoidingView, ScrollView, TextInput, Keyboard } from "react-native";
import Icon from "react-native-vector-icons/AntDesign"
import FontAnsome from "react-native-vector-icons/FontAwesome"
import Ionicons from "react-native-vector-icons/Ionicons"
import { db,auth } from "../../firebase";
import firebase from 'firebase/compat/app'



export default ChatScreen=({navigation,route})=>{
    const [text,setText] = useState("")
    const {id,chatName} = route.params
    const [messages,setMessages] = useState([])

    useLayoutEffect(()=>{
        const unsubrice = db.collection('chats').doc(id).collection('messages').orderBy('timestamp','asc').onSnapshot((snapshot)=>
        setMessages(snapshot.docs.map(doc=>({
            id:doc.id,
            data:doc.data()
        }))
        ))
        return unsubrice
    },[route])

    const sendMessage=()=>{
        setText("")
        db.collection("chats").doc(id).collection("messages").add({
            timestamp:firebase.firestore.FieldValue.serverTimestamp(),
            message:text,
            displayName:auth.currentUser.displayName,
            email:auth.currentUser.email,
            photoURL:auth.currentUser.photoURL
        })
    }

    useLayoutEffect(()=>{
        navigation.setOptions({
            headerTitleAlign:"left",
            headerTitle:()=><View style={styles.wrapHeader}>
                <Avatar  rounded source={{uri:"https://i.pinimg.com/736x/59/18/d8/5918d8e9040516b65f93c75a9c5b8175.jpg"}}/>
                <Text style={styles.textHeader}>{chatName}</Text>
            </View>,
            headerLeft:()=><TouchableOpacity onPress={()=>navigation.goBack()}>
                <Icon name="arrowleft" size={24} color="white"/>
            </TouchableOpacity>,
            headerRight:()=><View style={{
                flexDirection:'row',
                justifyContent:'space-between',
                width:80,
                marginRight:20
            }}>
                <FontAnsome name="video-camera" size={24} color={'white'}/>
                <Ionicons  name="call" size={24} color={'white'}/>
            </View>
        })
    },[navigation])

    return (
        <View style={styles.container}>
            <StatusBar style="light"></StatusBar>
            <KeyboardAvoidingView style={{flex:1}} behavior="height" keyboardVerticalOffset={90}>
                <ScrollView contentContainerStyle={{paddingTop:15}} >
                    {messages.map(({id,data})=>(
                        data.email == auth.currentUser.email ?
                        <View key={id} style={styles.reciver}>
                            <Avatar position="absolute" bottom={-15} left={-5} containerStyle={{position:'absolute',bottom:-15,left:-5}} rounded source={{uri:data.photoURL}}/>
                            <Text style={styles.reciverMessage}>{data.message}</Text>
                        </View>
                        :
                        <View key={id} style={styles.sender}> 
                         <Avatar position="absolute" bottom={-15} left={-5} containerStyle={{position:'absolute',bottom:-15,left:-5}} rounded source={{uri:data.photoURL}}/>
                            <Text style={styles.senderMessage}>{data.message}</Text>
                        </View>
                    ))}
                    </ScrollView>
                    <View style={styles.footer}>
                    <TextInput 
                    placeholder="Signal message"
                    style={styles.textInput}
                    value={text}
                    onSubmitEditing={sendMessage}
                    onChangeText={(value)=>setText(value)}
                    />
                    <TouchableOpacity onPress={sendMessage} activeOpacity={0.5}>
                    <Ionicons  name="send" size={24} color={'#2B68E6'}/>
                    </TouchableOpacity>
                    </View>
            </KeyboardAvoidingView>
        </View>
    )
}
const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'white'
    }
    ,
    wrapHeader:{
        flexDirection:'row',
        alignItems:'center'
    },
    textHeader:{
        marginLeft:10,
        fontWeight:"700",
        color:"white"
    },
    footer:{
        flexDirection:'row',
        alignItems:'center',
        width:"100%",
        padding:15
    },
    textInput:{
        bottom:0,
        height:40,
        flex:1,
        marginRight:15,
        backgroundColor:"#ECECEC",
        padding:10,
        color:'grey',
        borderRadius:30
    },
    reciver:{
        padding:15,
        backgroundColor:'#ECECEC',
        alignSelf:'flex-end',
        borderRadius:20,
        marginRight:15,
        marginBottom:20,
        maxWidth:"80%",
        position:'relative'
    },
    sender:{
        padding:15,
        backgroundColor:'#2B68E6',
        alignSelf:'flex-start',
        borderRadius:20,
        margin:15,
        maxWidth:"80%",
        position:'relative'
    },
    senderMessage:{
        color:'white',
        fontWeight:'500',
        marginLeft:10,
        marginBottom:15
    },
    reciverMessage:{
        color:'black',
        fontWeight:'500',
        marginLeft:10,
    }
})