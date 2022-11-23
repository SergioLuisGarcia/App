from unicodedata import name
from django.urls import path,include
from rest_framework import routers
from api.views import UsuarioViewSet,VeiculoViewSet,VeiculosUsuario, MyTokenObtainPairView,Rastreamento,AdicionaVeiculo
routes = routers.DefaultRouter()
routes.register(r'usuarios',UsuarioViewSet)
routes.register(r'veiculos',VeiculoViewSet)



urlpatterns = [
    path("",include(routes.urls)),
    path('api-auth/', include('rest_framework.urls')),
    path('auth/', include('djoser.urls.jwt')),
    path('veiculos/usuario/<int:pk>',VeiculosUsuario.as_view()),
    path('veiculo/<str:placa>/<int:pk>',Rastreamento.as_view()),
    path('auth-token/',MyTokenObtainPairView.as_view()),
    path('adicionaveiculo/<int:pk>',AdicionaVeiculo.as_view())
]