import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import Routes from "./src/rotas/authroutes";
import { AuthProvider } from "./src/context/context";
import Home from "./src/telas/Home";
export default function App(){

  return <AuthProvider>
      <Routes/>
  </AuthProvider>
}