import React from "react";
import { StyleSheet, TouchableOpacity,Text } from "react-native";


export default function BotaoDeletar(
    {
        selecionado = false,
        pressionado = ()=>{}
    }
){
    return <TouchableOpacity style={estiloBotao(selecionado)} onPress={pressionado}>
        <Text style={{color:"white",fontSize:30}}> - </Text>
    </TouchableOpacity>
}


function estiloBotao(selecionado){
    return StyleSheet.create({
    width:60,
    height:60,
    display:selecionado ? "flex" : "none",
    borderRadius:50,
    backgroundColor:"red",
    justifyContent:"center",
    alignItems:"center"
})}