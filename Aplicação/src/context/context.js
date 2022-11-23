/*Importação nescessaria para a utilização do contexto nas rotas*/
import React, { useEffect, useState } from "react";
import { createContext } from "react";
import api from "../services/api";
import AsyncStorage  from "@react-native-async-storage/async-storage"

/*Criação da variavel de Contexto */
const AuthContext = createContext();
    
/* Função que irá prover os dados fornecidos no contexto*/
export function AuthProvider({children}){
    const[userToken,setUserToken] = useState(null);
    const[load,setLoad] = useState(false);
    const[userId,setUserId] = useState(null)

    const login = (username,password) =>{
        setLoad(true);
        api.post("auth-token/",
        {"username":`${username}`,
        "password":`${password}`})
        .then(res=>{
            setUserId(res.data.id);
            setUserToken(res.data.access);
            AsyncStorage.setItem("userToken",res.data.access)
            AsyncStorage.setItem("userId",JSON.stringify(res.data.id))
        })
        .catch(e=>{
            console.log(e);
            alert("Usuario e/ou senha invalidos");
        })

    }
    const logout = () =>{
        setUserToken(null);
        AsyncStorage.removeItem("userToken")
        AsyncStorage.removeItem("userId");
        setUserId(null);
        setLoad(false);
    }
    const signed = async () =>{
        try{
            setLoad(true);
            let token = await AsyncStorage.getItem("userToken");
            let id = await AsyncStorage.getItem("userId")
            id = JSON.parse(id)
            if(userId){
                setUserToken(token);
                setUserId(id);
                console.log(userId)
            }
            setLoad(false);
        }catch(e){
            console.log(e);
        }

    }
    useEffect(()=>{
        signed;
    },[])
    return <AuthContext.Provider value={{login,logout,load,userToken,userId}}>
        {children}
    </AuthContext.Provider>
}

export default AuthContext;

