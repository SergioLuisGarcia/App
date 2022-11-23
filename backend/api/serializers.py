from dataclasses import fields
from pyexpat import model
from rest_framework import serializers
from api.models import Usuario, Veiculo
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

class UsuarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuario
        fields = [
            'usuario',
            'nome',
            'data_nascimento',
            "data_cadastro",
            "ultimo_acesso"
        ]
class VeiculoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Veiculo
        fields = [
            "id",
            "id_usuario",
            "placa",
            "modelo",
            "latitude_atual",
            "longitude_atual"
        ]



class RastreamentoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Veiculo
        fields = [
            "id_usuario",
            "placa",
            "modelo",
            "latitude_atual",
            "longitude_atual"
        ]

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):

    def validate(self, user):
        token = super().validate(user)
        refresh = self.get_token(self.user)
        token['id'] = self.user.id
        return token