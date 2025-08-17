from rest_framework import serializers
from rest_framework.validators import UniqueValidator
from django.contrib.auth.password_validation import validate_password
from ..models import *
from django.contrib.auth.models import User
from ..utils import send_verification_email

class RegisterSerializer(serializers.ModelSerializer):

    email = serializers.EmailField(
        required = True,
        validators = [UniqueValidator(queryset= User.objects.all())]
    )

    password = serializers.CharField(
        required = True,
        write_only = True,
        validators = [validate_password]
    )

    password2 = serializers.CharField(write_only = True,required = True)

    def validate(self,attrs):
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError({'password':'passwords do not match'})
        return attrs
    
    def create(self,validated_data):
        validated_data['username'] = validated_data['email']
        validated_data.pop('password2')

        user = User.objects.create_user(is_active=False,**validated_data)

        send_verification_email(request=self.context.get('request'), user=user)
        return user
    
    class Meta:
        model = User
        fields = ['email','password','password2','first_name','last_name']

class categorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'
    
class productImagesSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductImages
        fields = '__all__'

class productSerializer(serializers.ModelSerializer):
    category = categorySerializer(read_only = True)
    category_id = serializers.PrimaryKeyRelatedField(
        queryset = Category.objects.all(),
        source = "category",
        write_only = True
    )

    product_image = productImagesSerializer(many = True,read_only = True)
    
    class Meta:
        model = Product
        fields = ['id','name','slug','description','price','added_on','category','category_id','product_image']

class cartItemsSerializer(serializers.ModelSerializer):
    product_name = serializers.CharField(source = 'product.name',read_only = True)
    product_price = serializers.DecimalField(source = 'product.price',max_digits=10,decimal_places=2,read_only = True)
    subtotal = serializers.SerializerMethodField()
    product_images = serializers.SerializerMethodField()

    def get_subtotal(self,obj):
        return obj.product.price * obj.quantity
    
    def get_product_images(self,obj):
        images = obj.product.product_image.all()
        return productImagesSerializer(images,many = True,context = self.context).data
    
    class Meta:
        model = CartItems
        fields = ['id','product','product_name','product_price','product_images','quantity','subtotal','added_on']
    
class shippingAddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = ShippingAddress
        fields = ['id','adderss_line_1','address_line_2','city','state','postal_code','country','phone_number','is_default']
        read_only_fields = ['user']

class orderItemsSerializer(serializers.ModelSerializer):
    product_name = serializers.CharField(source = 'product.name',read_only = True)
    product_price = serializers.CharField(source = 'product.price',read_only = True)
    product_images = serializers.SerializerMethodField()

    def get_product_images(self,obj):
        images = obj.product.product_image.all()
        return productImagesSerializer(images,many = True,context = self.context).data
    
    class Meta:
        model = OrderItems
        fields = ['id','product','product_name','product_price','product_images','quantity','price']

class orderSerializer(serializers.ModelSerializer):
    order_items = orderItemsSerializer(many = True, read_only = True)
    shipped_address = shippingAddressSerializer(read_only = True)
    shipped_address_id = serializers.PrimaryKeyRelatedField(
        queryset = ShippingAddress.objects.none(),
        source = 'shipped_address',
        write_only = True
    )

    def __init__(self, *args, **kwargs):
        super(orderSerializer,self).__init__(*args,**kwargs)
        request = self.context.get('request',None)
        if request is not None and hasattr(request,'user'):
            self.fields['shipped_address_id'].queryset = ShippingAddress.objects.filter(user = request.user)

    class Meta:
        model = Order
        fields = ['id','ordered_on','shipped_address','shipped_address_id','status','order_items']