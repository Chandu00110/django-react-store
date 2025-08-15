from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Category(models.Model):
    name = models.CharField(max_length=100,unique=True)
    slug = models.CharField(max_length=100,unique=True)

    class Meta:
        verbose_name_plural = 'Categories'
    
    def __str__(self):
        return self.name
    
class Product(models.Model):
    category = models.ForeignKey(Category,on_delete=models.CASCADE,related_name="p_category")
    name = models.CharField(max_length=200)
    slug = models.SlugField(max_length=200,unique=True)
    description = models.TextField(blank=True,null=True)
    price = models.DecimalField(max_digits=10,decimal_places=2)
    is_available = models.BooleanField(default=True)
    added_on = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name

class ProductImages(models.Model):
    product = models.ForeignKey(Product,related_name='product_image',on_delete=models.CASCADE)
    image = models.ImageField(upload_to="products/")

    def __str__(self):
        return f"{self.product.name}"
    
class CartItems(models.Model):
    user = models.ForeignKey(User,on_delete=models.CASCADE)
    product = models.ForeignKey(Product,on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField(default=1)
    added_on = models.DateTimeField(auto_now_add=True)

    def subTotal(self):
        return self.product.price * self.quantity
    
    def __str__(self):
        return f'{self.user.username} * {self.product.name} * {self.quantity}'
    
class ShippingAddress(models.Model):
    user = models.ForeignKey(User,on_delete=models.CASCADE)
    adderss_line_1 = models.CharField(max_length=255)
    address_line_2 = models.CharField(max_length=255)
    city = models.CharField(max_length=100)
    state = models.CharField(max_length=100)
    postal_code = models.CharField(max_length=20)
    country = models.CharField(max_length=100)
    phone_number = models.CharField(max_length=20)
    is_default = models.BooleanField(default=False)

    def save(self,*args,**kwargs):
        user_address = ShippingAddress.objects.filter(user = self.user)

        # If this is the user's first address, set it as default automatically
        if not self.pk and user_address.count() == 0:
            self.is_default = True

         # If marked as default, unset other defaults
        if self.is_default:
            ShippingAddress.objects.filter(user = self.user,is_default = True).exclude(pk = self.pk).update(is_default = False)
        
        super().save(*args,**kwargs)

    def __str__(self):
        return f"{self.user.username} * {self.adderss_line_1}"
    
ORDER_STATUS_CHOICE = [
    ('Pending','Pending'),
    ('Processing','Processing'),
    ('Shipped','Shipped'),
    ('Delivered','Delivered'),
    ('Cancelled','Cancelled'),
]

class Order(models.Model):
    user = models.ForeignKey(User,on_delete=models.CASCADE)
    ordered_on = models.DateTimeField(auto_now_add=True)
    total_amount = models.DecimalField(max_digits=10,decimal_places=2)
    status = models.CharField(max_length=20,choices=ORDER_STATUS_CHOICE,default='Pending')
    shipped_address = models.ForeignKey(ShippingAddress,on_delete=models.CASCADE,blank=True,null=True)

    def save(self, *args, **kwargs):
        if not self.shipped_address:
            self.shipped_address = ShippingAddress.objects.get(user = self.user,is_default = True)
        super().save(*args,**kwargs)

    def __str__(self):
        return f"order #{self.id} by {self.user.username}"
    
class OrderItems(models.Model):
    order = models.ForeignKey(Order,on_delete=models.CASCADE,related_name='order_items')
    product = models.ForeignKey(Product,on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField(default=1)
    price = models.DecimalField(max_digits=10,decimal_places=2)

    def __str__(self):
        return f"#{self.order.id} * {self.product.name} * {self.quantity}"
    
class Payment(models.Model):
    user = models.ForeignKey(User,on_delete=models.CASCADE)
    order = models.ForeignKey(Order,on_delete=models.CASCADE,null=True,blank=True,related_name='order_payment')
    razorpay_order_id = models.CharField(max_length=100)
    razorpay_payment_id = models.CharField(max_length=100,blank=True,null=True)
    razorpay_signature = models.CharField(max_length=255,blank=True,null=True)
    amount = models.FloatField()
    is_paid = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.username} - {self.is_paid}"