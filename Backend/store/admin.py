from django.contrib import admin
from .models import *

# Register your models here.

admin.site.register(Category)
admin.site.register(Product)
admin.site.register(ProductImages)
admin.site.register(ProductAttribute)
admin.site.register(CartItems)
admin.site.register(ShippingAddress)
admin.site.register(Order)
admin.site.register(OrderItems)
admin.site.register(Payment)
