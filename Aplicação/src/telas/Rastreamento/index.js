import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import MapView , {Marker}from "react-native-maps";


export default function Localizacao({route}){
    const{lat,long} = route.params;
    const[latitude,setLatitude] = useState(-10.9667142);
    const[longitude,setLongitude]=useState(-37.0825943);
    useEffect(()=>{
        setLatitude(lat);
        setLongitude(long);
    },[])
    return <MapView
        style={estilo.mapa}
        loadingEnabled = {true}
        region = {{
            latitude:latitude,
            longitude: longitude,
            latitudeDelta:0.0090,
            longitudeDelta:0.00043
        }}
        >
        <Marker coordinate = {{latitude: latitude,longitude: longitude}}
         pinColor = {"red"}
         title={"XXX-000"}
         description={"Corsa Classic 2013"}/>
        </MapView>
        

    
}

const estilo = StyleSheet.create({
    mapa:{
        flex:1
    }
})