from django.urls import path,include
from .api_views import *
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import (TokenObtainPairView,TokenRefreshView)

routers = DefaultRouter()
# routers.register(r'register',registerView,basename='register')
routers.register(r'category',categoryViewSet,basename='category')
routers.register(r'product',productViewSet,basename='product')
routers.register(r'productImages',productImagesViewSet,basename='productImages')
routers.register(r'cartItems',cartItemsViewSet,basename='cartItems')
routers.register(r'shippingAddress',shippingAddressViewSet,basename='shippingAddress')
routers.register(r'order',orderViewSet,basename='order')


urlpatterns = [
    path('',include(routers.urls)),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('register/',registerView.as_view(),name='register'),
    path('create-payment/',create_payment,name="create_payment"),
    path('store-payment/',storePayment,name="store_payment"),
]
