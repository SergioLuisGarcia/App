from django.contrib import admin
from api.models import Usuario,Veiculo
# Register your models here.

class Usuarios(admin.ModelAdmin):
    fields = ("usuario","nome","data_nascimento")
    search_fields = ("usuario","nome")
    list_display = ("id","usuario","nome", "data_nascimento", "ultimo_acesso")

admin.site.register(Usuario,Usuarios)

class Veiculos(admin.ModelAdmin):
    fields = ("id_usuario","placa","modelo","latitude_atual","longitude_atual")
    search_fields = ("placa",)
    list_display = ("id_usuario","placa","modelo")

admin.site.register(Veiculo,Veiculos)
