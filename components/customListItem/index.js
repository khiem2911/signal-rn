import { ListItem,Avatar } from '@rneui/themed';
import { auth } from '../../firebase';
import { Text } from 'react-native';
import { useEffect, useLayoutEffect, useState } from 'react';
import { db } from '../../firebase';


export default CustomListItem = ({id,chatName,enterChat}) =>{

    const [message,setMessage]=useState([])

    useEffect(()=>{
        db.collection('chats').doc(id).collection('messages').orderBy('timestamp','desc').onSnapshot((snapshot)=>
            setMessage(snapshot.docs.map((doc)=>doc.data())
        ))
    })

    return (
        <ListItem onPress={()=>enterChat(id,chatName)} >
            <Avatar rounded source={{uri:message?.[0]?.photoURL || "https://i.pinimg.com/736x/4d/47/59/4d4759f61e13927c5f5b39a4cc66af70.jpg" }}/>
            <ListItem.Content >
                <ListItem.Title  style={{fontSize:20}}>{chatName}</ListItem.Title>
                <ListItem.Subtitle>{message?.[0]?.displayName}:{message?.[0]?.message}</ListItem.Subtitle>
            </ListItem.Content>
          
        </ListItem>
    )
}