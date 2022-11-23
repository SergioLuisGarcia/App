import React, { useContext } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../../telas/Home";
import Cadastrar from "../../telas/Cadastro";
import Localizacao from "../../telas/Rastreamento";
import  Icon  from "react-native-vector-icons/MaterialCommunityIcons";
import AuthContext from "../../context/context";

const AppStack = createNativeStackNavigator();

export default function AppRoute(){
    const{logout} = useContext(AuthContext)
    return <AppStack.Navigator>
        <AppStack.Screen name="Home" 
            component={Home}
            options={{
                headerTransparent:true,
                headerRight:()=>(
                    <Icon name="exit-run" size={30} style={{color:"#FFF"}}
                    onPress={()=>
                        logout()
                    }
                    />
                ),
                headerTitleAlign:"center",
                headerStyle:{
                    backgroundColor:"rgba(239,244,232,0.30)",
                },
                headerTitleStyle:{
                    color:"black",
                    fontWeight:"bold",
                    fontSize:30,
                }
            }}
        />
        <AppStack.Screen name="Localizacao" 
            component={Localizacao}
            options={{
            }}
            />
        <AppStack.Screen name="Cadastrar" component={Cadastrar}/>
    </AppStack.Navigator>
}