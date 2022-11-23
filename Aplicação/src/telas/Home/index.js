import React, { useCallback, useContext, useEffect, useState } from "react";
import { 
    FlatList,
    Text,
    TouchableOpacity,
    View,
    Image,  
    ImageBackground,
    RefreshControl,
    Button
    } from "react-native";
import  Icon  from "react-native-vector-icons/Entypo";
import estilo from "./css";
import { getUsuario, getVeiculos } from "../../services/buscar";
import AuthContext from "../../context/context";
import Lottie from "lottie-react-native"
import { SafeAreaView } from "react-native-safe-area-context";
import { PermissionsAndroid } from "react-native";
import Local from "@react-native-community/geolocation";
import { calc } from "../../services/calculo";
import BotaoDeletar from "../../componentes/BotaoDeletar";

function Loading({funcao = ()=>{}}){
    return <View style={{width:'100%',height:"100%", justifyContent:"center",alignItems:"center"}}>
        <Lottie source={require("../../assets/anime/Load.json")} autoPlay loop autoSize/>
    </View>
}

export default function Home({navigation}){
    const[usuario,setUsuario] = useState([]);
    const[veiculos,setVeiculos] = useState([]);
    const{userToken, userId,logout} = useContext(AuthContext);
    const[load,setLoad] = useState(true);
    const[resposta,setResposta] = useState("");
    const[refresh,setRefresh] = useState(false);
    const[selecionado,setSelecionado] =useState(false);
    const[idVeiculo,setIdVeiculo] = useState();
        /* Cria as variaveis usando os hooks*/
        const[latitudeAtual,setLatitudeAtual] = useState(0);
        const[longitudeAtual,setLongitudeAtual] = useState(0);
        const[watchID,setWatchID] = useState(0);
        /*FUnção para pegar a posição atual no mapa*/
        const pegaPosicao = () => {Local.getCurrentPosition(
                (pos) => {
                    setLatitudeAtual(pos.coords.latitude);
                    setLongitudeAtual(pos.coords.longitude);
                },
                (err) => {
                    alert(err);
                },
                {enableHighAccuracy:true,timeout:20,maximumAge:1}
            )}
            /*Função para armazenar a posição capturada no mapa*/
            const atualizaPosicao = () => {
                const watchID = Local.watchPosition((position) => {
                const latitude = (position.coords.latitude);
                const longitude = (position.coords.longitude);
                setLatitudeAtual(latitude);
                setLongitudeAtual(longitude);
              });
              setWatchID(watchID);
            }
            /* Função para validar com o usuario a permissão de localização e executar a captura e exibicao*/
             const capturar = async function(){
                const validaPermissao = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,{
                        title:"Localização",
                        message:"Permitir acesso a localização",
                        buttonPositive:"Sim",
                        buttonNegative:"Não",
                        buttonNeutral:"Agora não"
                    }
                )
                if(validaPermissao === PermissionsAndroid.RESULTS.GRANTED){
                     pegaPosicao();
                     atualizaPosicao();
                     console.log(latitudeAtual);
                }else{
                    alert("Erro");
                }
    
            };
    async function buscaUsuario(){
        const resultadoUsuario = await getUsuario(userToken,userId);
        try{
            setUsuario(resultadoUsuario);
        }catch{
            console.log("erro");
        }
        
    }
    async function buscaVeiculos(){
        const resultadoVeiculos = await getVeiculos(userToken,userId,logout);
        if(resultadoVeiculos){
            setVeiculos(resultadoVeiculos);
        }else{
            logout();
        }
    }
    const atualizar = useCallback(async()=>{
        setRefresh(true)
        await buscaVeiculos().then(
        await capturar()).then(setRefresh(false))

        
    },[])
    useEffect(()=>{
        (()=>{
            setLoad(true)
            buscaUsuario();
            buscaVeiculos();
            capturar();
        })();
        },[])
    return <SafeAreaView>
                <ImageBackground source={require("../../assets/images/Fundo.jpeg")}
                    resizeMode={"stretch"}
                    blurRadius={50}
                    style={estilo.container}
                >
                <View style={estilo.userInfo}>
                    <Image style={estilo.imageInfo} source={require("../../assets/images/logo.png")} />
                    <Text style={estilo.nomeInfo}>{usuario.nome}</Text>
                </View>
                <View style={estilo.listContainer}>
                        <FlatList
                            refreshControl={
                                <RefreshControl 
                                    refreshing={refresh}
                                    onRefresh={atualizar}   
                                />
                            }
                            data={veiculos}
                            keyExtractor={veiculos.id}
                            renderItem={({ item }) => <View style={estilo.itemContainer}>
                                <TouchableOpacity style={estilo.itemInfo}
                                    onPress={()=>{
                                            setSelecionado(!selecionado)
                                            setIdVeiculo(item.id)
                                        
                                    }}

                                >
                                    <Image style={estilo.listImage} source={require("../../assets/images/logo.png")} />
                                    <View style={estilo.textContainer}>
                                        <Text style={estilo.textList}>{item.modelo}</Text>
                                        <Text style={estilo.textList}>{item.placa}</Text>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity style={estilo.listButton}
                                    onPress={()=>
                                        navigation.navigate('Localizacao',
                                        {
                                            lat: item.latitude_atual,
                                            long: item.longitude_atual
                                        })
                                    }
                                >
                                   <Text style={estilo.listButtonText}>{calc(latitudeAtual,longitudeAtual,item.latitude_atual,item.longitude_atual)}</Text>
                                    <Icon name="location" size={20} color={"white"} />
                                </TouchableOpacity>
                            </View>}/>
                    </View>
                    <View style={{justifyContent:"center",width:'100%',alignItems:"center"}}>
                        {selecionado ? 
                            <BotaoDeletar selecionado={selecionado} pressionado={()=>(
                                console.log(idVeiculo)
                            )}/>:
                            <TouchableOpacity style={estilo.addButton}
                                onPress={()=>(
                                    navigation.navigate("Cadastrar",
                                    {
                                        id:userId,
                                        token:userToken
                                    })
                                )}
                            >
                                <Text style={{fontSize:30,color:"white"}}>+</Text>
                            </TouchableOpacity>
                        }
                            
                            
                            
                            </View>
         </ImageBackground>
        </SafeAreaView>

}
