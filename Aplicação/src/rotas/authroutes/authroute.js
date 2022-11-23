import React, { useContext } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../../telas/Login";
import Home from "../../telas/Home";
import AuthContext from "../../context/context";

const AuthStack = createNativeStackNavigator();

export default function AuthRoute(){
    const{userToken} = useContext(AuthContext)
    return <AuthStack.Navigator>
        <AuthStack.Screen name="Login" 
        component={Login}
        options={{headerShown:false}}
        />
    </AuthStack.Navigator>
 
}