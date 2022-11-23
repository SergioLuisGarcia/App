import { NavigationContainer } from "@react-navigation/native";
import React, { useContext } from "react";
import AuthContext, { AuthProvider } from "../../context/context";
import AppRoute from "./approute";
import AuthRoute from "./authroute";


export default function Routes(){
    const{userToken}=useContext(AuthContext);
    return <NavigationContainer>
        {userToken !== null ? 
        <AppRoute/>
        :
        <AuthRoute/>}
    </NavigationContainer>

}