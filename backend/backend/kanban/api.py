from kanban.models import Column, Item
from rest_framework import viewsets, status
from rest_framework.views import APIView
from .serializers import ColumnSerializer, ItemSerializer
from django.http import HttpResponse, JsonResponse
from django.core import serializers
import json



class KanbanViewSet(viewsets.ModelViewSet):
  # queryset = Column.objects.all()

  serializer_class = ColumnSerializer 

  def get_queryset(self):
    obj = Column.objects.all()
    data = list(obj)
    return data

  def perform_create(self, serializer):
    serializer.save() 

class ItemViewSet(viewsets.ModelViewSet):
  serializer_class = ItemSerializer 

  def get_queryset(self):
    return list(Item.objects.all())

  def perform_create(self, serializer):
    serializer.save() 

  def delete(self, request, *args, **kwargs):
    instance = Item.objects.get(pk = kwargs['item'])
    instance.delete()
    return HttpResponse(kwargs['item'], status=status.HTTP_200_OK)

  def put(self, request, *args, **kwargs):
    body = json.loads(request.body)
    item = Item.objects.get(pk=kwargs['item'])
    oldColumn = item.column.id
    item.column = Column.objects.get(id=body['column'])
    item.save(update_fields=["column"]) 
    item_return = {
      'id': item.id,
      'text': item.text,
      'column': item.column.id,
      'oldColumn': oldColumn
    }
    return JsonResponse(item_return, status=status.HTTP_200_OK)

     