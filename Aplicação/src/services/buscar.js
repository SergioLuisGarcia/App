import axios from "axios";
import api from "./api"
const baseURL = "http://192.168.98.3:8000"

export async function getUsuario(token,id){
        const res = await axios({
            baseURL:baseURL,
            url:`usuarios/${id}`,
            headers:{"Authorization":`Bearer ${token}`}
        });
        return res.data;
}

export async function getVeiculos(token,userId,logout){
    try{
        const res = await axios({
            baseURL:baseURL,
            url:`veiculos/usuario/${userId}`,
            headers:{"Authorization":`Bearer ${token}`}
        });
        return res.data;
    }catch(err){
        alert("Teste");
        logout();
        return err;
    }
}

export async function cadastro(id,placa,modelo,latitude,longitude,token){
    try{
        await axios({
            baseURL:baseURL,
            method:"POST",
            url:`adicionaveiculo/${id}`,
            headers:{"Authorization":`Bearer ${token}`},
            data:
            {
                id_usuario:id,
                placa:placa,
                modelo:modelo,
                latitude_atual:latitude,
                longitude_atual:longitude
            }})     
    }catch(e){
        console.log(e);
    }
}

export async function autenticar(username,password){
    try{
        const response  = await api.post(
            "auth-token/",
                {"username":`${username}`,
                "password":`${password}`})
            return response.data;
            }catch(err){
                alert("Usuario ou senha incorretos");
                []
            }
        
}

