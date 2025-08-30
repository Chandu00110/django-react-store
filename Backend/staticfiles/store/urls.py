from django.urls import path,include

urlpatterns = [
    path('',include('store.api.api_urls')),
]