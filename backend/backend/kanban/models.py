from django.db import models

# Create your models here.
class Column(models.Model):
  title = models.CharField(max_length=100)
  created_at = models.DateTimeField(auto_now_add=True)
  objects = models.Manager()   

class Item(models.Model):
  text = models.CharField(max_length=100)
  column = models.ForeignKey(Column, on_delete=models.CASCADE, related_name='items')
  created_at = models.DateTimeField(auto_now_add=True)
  objects = models.Manager()   