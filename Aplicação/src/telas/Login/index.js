import React, { useContext, useState } from "react";
import {View,Text,
     TouchableOpacity, 
     TextInput, 
     ImageBackground, 
     SafeAreaView} from "react-native";
import AuthContext from "../../context/context";
import estilo from "./css";
import Lottie from "lottie-react-native"
import Icon from "react-native-vector-icons/FontAwesome";

export default function Login(){
    const[username,setUsername] = useState("");
    const[password,setPassword] = useState("");
    const{login} = useContext(AuthContext);
    return <SafeAreaView style={{flex:1}}>
    <ImageBackground
        source={require("../../assets/images/Fundo.jpeg")}
        style={{backgroundColor:"rgba(34,45,13,0.1)",flex:1, justifyContent:"center",alignItems:"center"}}
        >
        <Lottie source={require("../../assets/anime/AnimeLogin.json")} autoPlay loop style={{width:250, height:250}}/>
        <View style={{width:"60%",height:40,justifyContent:"center",flexDirection:"row",alignItems:"center",marginVertical:30}}>
        <Icon name="user" size={30} style={estilo.icone}/>
        <TextInput
            cursorColor={"#FFFF"}
            style={estilo.entradaDeTexto}
            placeholderTextColor={"#FFFF"}
            placeholder="usuario"
            onChangeText={(username)=>{setUsername(username)}}

        />
        </View>
        <View style={{width:"60%",height:40,justifyContent:"center",flexDirection:"row",alignItems:"center",marginVertical:30}}>
        <Icon name="key" size={30} style={estilo.icone}/>

        <TextInput
            style={estilo.entradaDeTexto}
            placeholder="senha"
            placeholderTextColor={"#FFFF"}
            secureTextEntry={true}
            onChangeText = {(password)=>{setPassword(password)}}
        />
        </View>
        <TouchableOpacity style={estilo.botaoEntrar}>
            <Text style={estilo.textoBotao} onPress={()=>login(username,password)}>login</Text>
        </TouchableOpacity>
        <TouchableOpacity>
            <Text style={{color:"#FFF",fontFamily:"arial"}}>Esqueceu a senha?</Text>
        </TouchableOpacity>
    </ImageBackground>
    </SafeAreaView>

}