from rest_framework import serializers
from kanban.models import Column, Item

# Column Serializer
class ColumnSerializer(serializers.ModelSerializer):
  class Meta:
    model = Column
    depth = 1
    fields = ['title', 'items']

class ItemSerializer(serializers.ModelSerializer):
  class Meta:
    model = Item
    fields = ['text', 'column']