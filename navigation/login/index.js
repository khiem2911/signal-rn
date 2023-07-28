import { View,Text,Image, TouchableOpacity, KeyboardAvoidingView } from "react-native";
import styles from './style'
import { Input,Button } from '@rneui/themed';
import { useEffect, useState } from "react";
import Icon from 'react-native-vector-icons/Ionicons'
import { StatusBar } from "expo-status-bar";
import { auth } from "../../firebase";
import { showNoitce,Indicator } from "../../index";


export default Login = ({navigation}) =>{
    const [email,setEmail]=useState("")
    const [password,setPassWord]=useState("")
    const [visible,setVisible]=useState(true)
    const nameIcon = visible ? "eye-off-outline" : "eye-outline"
    const [loading,setLoading] = useState(false)
   
    const onChangeVisible = () =>{
        setVisible(!visible)
    }

    const onRegister = () =>{
        navigation.navigate("Register")
    }

    const onLogin = async () =>{
        setLoading(true)
        await auth.signInWithEmailAndPassword(email,password)
        .then(()=>{
            navigation.replace("Home")
        })
        .catch((error)=>{
            showNoitce(error.message,"danger")
        })
        setLoading(false)
    }

   
    useEffect(()=>{
        const unsubrice = auth.onAuthStateChanged((user)=>{
            if(user){
                navigation.replace("Home")
            }
        })
        return unsubrice
    },[])
    
    if(loading)
    {
        return (
        <Indicator/>
        )
    }
    return (
        
        <KeyboardAvoidingView   behavior={'height'} style={styles.wrapper} >
            <StatusBar style="light"/>
               <Image  style={styles.image} source={require("../../assets/images/Signal-Logo.png")}/>
                <View style={styles.inputContainer}>
                    <Input 
                    textContentType={'emailAddress'}
                    inputContainerStyle={{width:300}}
                    placeholder="Email"
                    value={email} 
                    onChangeText={(value)=>setEmail(value)} />
                    <Input
                     textContentType={'password'}
                    inputContainerStyle={{width:300}}
                    placeholder="Password"
                     value={password} 
                     onChangeText={(value)=>setPassWord(value)}  
                     secureTextEntry={visible} 
                     rightIcon={()=>
                     <TouchableOpacity onPress={onChangeVisible} activeOpacity={0.5}><Icon name={nameIcon} size={24} /></TouchableOpacity>}
                     />
                </View>
                    <Button onPress={onLogin} containerStyle={{width:300}}  title="Login" type="outline"/>
                    <Button onPress={onRegister} containerStyle={{width:300}} title="Register"/>
                <View style={{height:300}}/>
        </KeyboardAvoidingView>
    )
}