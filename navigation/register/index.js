import { useLayoutEffect, useState } from "react";
import { View,TouchableOpacity, KeyboardAvoidingView } from "react-native";
import { Text,Input,Button } from '@rneui/themed';
import styles from "./style"
import Icon from "react-native-vector-icons/Ionicons"
import { auth } from "../../firebase/index";
import { showNoitce,Indicator } from "../../index";



export default Register = ({navigation}) =>{
    const [fullName,setFullName] = useState("")
    const [Email,setEmail] = useState("")
    const [passWord,setPassWord] = useState("")
    const [photoURL,setPhotoUrl] = useState("")
    const [visible,setVisible]=useState(true)
    const nameIcon = visible ? "eye-off-outline" : "eye-outline"
    const [loading,setLoading] = useState(false)



    const onChangeVisible = () =>{
        setVisible(!visible)
    }

    const onRegister = async () =>{
        setLoading(true)
          await auth.createUserWithEmailAndPassword(Email,passWord)
            .then((userCredential)=>{
                    userCredential?.user.updateProfile({
                        displayName:fullName,
                        photoURL:photoURL || "https://i.pinimg.com/736x/59/18/d8/5918d8e9040516b65f93c75a9c5b8175.jpg"
                    }).then(()=>{   
                        navigation.replace("Login")
                        showNoitce("Registed Successed","success")
                    }).catch((error)=>{
                        console.log(error.message)
                    })
            }).catch((error)=>{
                showNoitce("Registerd Failed",'danger')
            })
        setLoading(false)
    }


    if(loading){    
        return (
            <Indicator/>
        )
    }
 return (
        <KeyboardAvoidingView  style={styles.wrapper}>
            <Text h3>Create a Signal Account</Text>
            <View style={styles.inputContainer}>
            <Input 
                    inputContainerStyle={{width:300}}
                    placeholder="Full Name"
                    value={fullName} 
                    onChangeText={(value)=>setFullName(value)} />
            <Input 
                    textContentType={'emailAddress'}
                    inputContainerStyle={{width:300}}
                    placeholder="Email"
                    value={Email} 
                    onChangeText={(value)=>setEmail(value)} />
           <Input 
                    textContentType={'password'}
                    inputContainerStyle={{width:300}}
                    placeholder="Password"
                    secureTextEntry={visible}
                    value={passWord} 
                    onChangeText={(value)=>setPassWord(value)}
                    rightIcon={()=>
                        <TouchableOpacity onPress={onChangeVisible} activeOpacity={0.5}><Icon name={nameIcon} size={24} /></TouchableOpacity>}
                    />
           <Input 
                    textContentType={'URL'}
                    inputContainerStyle={{width:300}}
                    placeholder="Profile Picture URL(Optional)"
                    value={photoURL} 
                    onChangeText={(value)=>setPhotoUrl(value)} />
            </View>
            <Button onPress={onRegister} containerStyle={{width:300}} title="Register"/>
            <View style={{height:100}}/>
        </KeyboardAvoidingView>
    )
}