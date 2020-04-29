from rest_framework import routers
from django.conf.urls import url
from .api import KanbanViewSet, ItemViewSet

router = routers.DefaultRouter()
router.register('api/kanban', KanbanViewSet, 'kanban')
router.register('api/item/(?P<item>\d+)', ItemViewSet, 'item')
router.register('api/item', ItemViewSet, 'item')
urlpatterns = router.urls