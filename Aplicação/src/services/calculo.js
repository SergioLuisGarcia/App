export function calc(latitudeUsuario,longitudeUsuario,latitudeVeiculo,longitudeVeiculo){

        let latitudeVeicRad = latitudeVeiculo * (3.14159/180);
        let longitudeVeicRad = longitudeVeiculo * (3.14159/180);
        let latitudeUsuarioRad = latitudeUsuario * (3.14159/180);
        let longitudeUsuarioRad = longitudeUsuario * (3.14159/180);


        let distancia = (Math.acos(Math.cos(latitudeUsuarioRad) * Math.cos(longitudeUsuarioRad) * Math.cos(latitudeVeicRad) * Math.cos(longitudeVeicRad) + Math.cos(latitudeUsuarioRad) 
        * Math.sin(longitudeUsuarioRad) * Math.cos(latitudeVeicRad) * Math.sin(longitudeVeicRad) 
        + Math.sin(latitudeUsuarioRad) * Math.sin(latitudeVeicRad)) * 6371) * 1.15
        if(distancia < 1000){
            return `${distancia.toFixed(2) * 1000} MT`
        }else{
        return `${distancia.toFixed(2)} KM`;

        }

}