import React, { useState } from "react";
import { View, TextInput,Text, Button, ImageBackground } from "react-native";
import { cadastro } from "../../services/buscar";
import estilo from "./css";
export default function Cadastrar({navigation,route}){
    const[placa,setPlaca] = useState(null);
    const[modelo,setModelo] = useState(null);
    const[lat,setLat] = useState(0);
    const[long,setLong] = useState(0);
    const{id,token} = route.params
    return <ImageBackground source={require("../../assets/images/Fundo.jpeg")} style={{flex:1}}>
        <TextInput
            style={estilo.input}
            placeholder="Placa"
            onChangeText={(placa)=>{setPlaca(placa)}}
        />
                <TextInput
            style={estilo.input}
            placeholder="Modelo"
            onChangeText={(modelo)=>{setModelo(modelo)}}
        />
                <TextInput
            style={estilo.input}
            placeholder="Lat:"
            onChangeText={(lat)=>{setLat(lat)}}
        />
                <TextInput
            style={estilo.input}
            placeholder="Long:"
            onChangeText={(long)=>{setLong(long)}}
        />
        <Button title="Cadastrar"
            onPress={async()=>{
                await cadastro(id,placa,modelo,parseFloat(lat),parseFloat(long),token)
                navigation.navigate("Home")
            }}
        />
    </ImageBackground>
}