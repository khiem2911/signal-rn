import { View,Text,ScrollView, TouchableOpacity } from "react-native";
import { auth } from "../../firebase";
import { useLayoutEffect } from "react";
import { Input,Button,Avatar } from '@rneui/themed';
import {CustomListItem} from '../../index'
import Icon from "react-native-vector-icons/SimpleLineIcons"
import styles from './style'

export default Home = ({navigation}) =>{
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
                   <TouchableOpacity activeOpacity={0.5}>
                   <Icon name="pencil" size={24}/>
                   </TouchableOpacity>
                </View>
            
        })
    },[navigation])


    return (
        <View style={styles.wrapper}>
             <ScrollView>
            <CustomListItem/>
        </ScrollView>
        </View>
    )
}