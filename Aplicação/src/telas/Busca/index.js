import React, { useEffect, useState } from "react";
import Contacts  from "react-native-contacts";
import { PermissionsAndroid, View, Text } from "react-native";


export default function Contatos(){
    const [contato,setContato] = useState("");
    const [numero,setNumero] = useState("");
    function contatos(){
        const listacontatos = Contacts.getContactById("325")
        .then((cont)=>{
            setContato(cont.displayName);
            setNumero(cont.phoneNumbers);
        })
        console.log("Teste");
        return listacontatos;
    }

    (async function(){
        const permisssao = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.READ_CONTACTS,{
                title:"Teste",
                buttonPositive:"Permitir",
                buttonNegative:"Negar",
                buttonNeutral:"Agora nao"
            });
        if(permisssao == PermissionsAndroid.RESULTS.GRANTED){
            console.log(contatos());
        };
    }());
    useEffect(()=>{

    },[])
    return <View>
        <Text>Contato</Text>
        <Text>{contato}</Text>
    </View>
}