from operator import mod
from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone
from rest_framework.authtoken.models import Token
from django.conf import settings
from django.db.models.signals import post_save
from django.dispatch import receiver

# Create your models here.

class Usuario(models.Model):
    usuario = models.ForeignKey(User,on_delete=models.CASCADE,related_name="nome_usuario")
    nome = models.CharField(max_length = 100, blank=False,null=False)
    data_nascimento = models.DateField(blank=False,null=False)
    data_cadastro = models.DateField(auto_now_add=True)
    ultimo_acesso = models.DateTimeField(auto_now=timezone.get_current_timezone())
    def __str__(self):
        return self.nome

class Veiculo(models.Model):
    id_usuario = models.ForeignKey(Usuario,on_delete=models.CASCADE,related_name="veiculo_usuario")
    placa = models.CharField(max_length=50,null=False,blank=False)
    modelo = models.CharField(max_length = 50)
    latitude_atual = models.FloatField()
    longitude_atual = models.FloatField()

    def __str__(self):
        return self.placa

