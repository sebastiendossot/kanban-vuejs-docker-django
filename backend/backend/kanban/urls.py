from rest_framework import routers
# from django.urls import path
from django.conf.urls import url
# from .api import MyOwnView
from .api import KanbanViewSet

router = routers.DefaultRouter()
router.register('api/kanban', KanbanViewSet, 'kanban')

urlpatterns = router.urls

# urlpatterns = [
#     url('api/kanban',  MyOwnView.as_view()),
# ]

# urlpatterns = [
#     url('api/kanban',  MyOwnView.as_view()),
# ]