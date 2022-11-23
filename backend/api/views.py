from urllib import request
from api.serializers import UsuarioSerializer,VeiculoSerializer,MyTokenObtainPairSerializer,RastreamentoSerializer
from rest_framework import viewsets,generics
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.permissions import IsAuthenticated

from api.models import Usuario,Veiculo




# Create your views here.
class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


class UsuarioViewSet(viewsets.ModelViewSet):
    queryset = Usuario.objects.all()
    serializer_class = UsuarioSerializer

class VeiculoViewSet(viewsets.ModelViewSet):
    queryset = Veiculo.objects.all()
    serializer_class = VeiculoSerializer
    permission_classes = [IsAuthenticated]

class VeiculosUsuario(generics.ListAPIView):
    def get_queryset(self):
        queryset = Veiculo.objects.filter(id_usuario = self.kwargs["pk"])
        return queryset
    serializer_class = VeiculoSerializer

class Rastreamento(generics.ListAPIView):
    def get_queryset(self):
        queryset = Veiculo.objects.filter(placa = self.kwargs['placa']).filter(id_usuario = self.kwargs["pk"])
        return queryset
    serializer_class = RastreamentoSerializer
        
class AdicionaVeiculo(generics.CreateAPIView):
    def get_queryset(self):
        queryset = Veiculo.objects.filter(id_usuario = self.kwargs["pk"])
        return queryset
    serializer_class = VeiculoSerializer
    permission_classes = [IsAuthenticated]