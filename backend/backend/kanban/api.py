from kanban.models import Column, Item
from rest_framework import viewsets, status
from rest_framework.views import APIView
from .serializers import ColumnSerializer, ItemSerializer
from django.http import HttpResponse
from django.core import serializers



# Kanban Viewset 

# class MyOwnView(APIView):
#     def get(self, request):
#       array = []
#       columns = Column.objects.all()
#       for column in columns:
#         # items = Item.objects.filter(column=column.pk)
#         # column.content = items   
#         # json_column = serializers.serialize('json', [column])
#         # print(json_column)
#         # print(Column.objects.values_list('item', 'item__item'))
#         # print(json_column)
        
#         print(column.items)

#         # array.append(json_column)
#       print(array)
#       return HttpResponse(array)

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
     