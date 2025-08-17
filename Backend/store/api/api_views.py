from rest_framework import viewsets,permissions,status,generics
from rest_framework.views import APIView
from rest_framework.decorators import action,api_view,permission_classes
from rest_framework.response import Response
from .serializers import *
from ..models import *
from django.contrib.auth.models import User
import razorpay
from django.conf import settings

from django.utils.http import urlsafe_base64_decode
from django.utils.encoding import force_str
from django.contrib.auth.tokens import default_token_generator
from ..utils import send_order_confirmation_email

class registerView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer
    permission_classes = [permissions.AllowAny]

class categoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = categorySerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]    # only amdin can create/update/delete

class productViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = productSerializer

    # read operations are public, write operations require authentication (global default)
    # you can refine per-action if you want mre control
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

class productImagesViewSet(viewsets.ModelViewSet):
    queryset = ProductImages.objects.all()
    serializer_class = productImagesSerializer

    # read operations are public, write operations require authentication (global default)
    # you can refine per-action if you want mre control
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

class cartItemsViewSet(viewsets.ModelViewSet):
    queryset = CartItems.objects.all()
    serializer_class = cartItemsSerializer

    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return self.queryset.filter(user = self.request.user).order_by('-added_on')
    
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        user = request.user
        product = serializer.validated_data.get('product')
        quantity = serializer.validated_data.get('quantity', 1)

        existing_item = CartItems.objects.filter(user=user, product=product).first()

        if existing_item:
            existing_item.quantity += quantity
            existing_item.save()

            # Re-serialize the updated instance to return correct response
            updated_serializer = self.get_serializer(existing_item)
            return Response(
                updated_serializer.data,
                status=status.HTTP_200_OK
            )
        else:
            serializer.save(user=user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)

class shippingAddressViewSet(viewsets.ModelViewSet):
    queryset = ShippingAddress.objects.all()
    serializer_class = shippingAddressSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return self.queryset.filter(user = self.request.user)
    
    def perform_create(self, serializer):
        serializer.save(user = self.request.user)

class orderViewSet(viewsets.ModelViewSet):
    queryset = Order.objects.all()
    serializer_class = orderSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return self.queryset.filter(user = self.request.user)
    
    def create(self,request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception = True)

        user = request.user
        address = serializer.validated_data.get('shipped_address')
        cart_items = CartItems.objects.filter(user = user)

        if not cart_items.exists():
            return Response({"error":"Cart is empty"},status=400)
        
        total_price = sum(item.product.price * item.quantity for item in cart_items)

        order = Order.objects.create(
            user = user,
            total_amount = total_price,
            shipped_address = address
        )

        for item in cart_items:
            OrderItems.objects.create(
                order = order,
                product = item.product,
                quantity = item.quantity,
                price = item.product.price
            )

        cart_items.delete()
        return Response(orderSerializer(order).data)

@api_view(['POST'])
@permission_classes([permissions.IsAuthenticated])
def create_payment(request):
    try:
        client = razorpay.Client(auth=(settings.RAZORPAY_KEY_ID,settings.RAZORPAY_KEY_SECRET))
        amount = request.data.get("amount")

        payment_order = client.order.create({
            'amount' : (amount * 100),
            'currency' : 'INR',
            'payment_capture' : '1'
        })

        return Response({
            "order_id" : payment_order['id'],
            "amount" : payment_order['amount'],
            "currecy" : "INR",
            "key" : settings.RAZORPAY_KEY_ID
        })
    except Exception as e:
        return Response({"Error":str(e)},status = 400)
    
@api_view(['POST'])
@permission_classes([permissions.IsAuthenticated])
def storePayment(request):
    try:
        payment_id = request.data.get('payment_id','')
        order_id = request.data.get('order_id','')
        signature = request.data.get('signature','')
        amount = request.data.get('amount','')
        address = request.data.get('address',None)

        client = razorpay.Client(auth=(settings.RAZORPAY_KEY_ID, settings.RAZORPAY_KEY_SECRET))
        params_dict = {
            'razorpay_order_id': order_id,
            'razorpay_payment_id': payment_id,
            'razorpay_signature': signature
        }
        c = client.utility.verify_payment_signature(params_dict)
        if c:
            newPayment = Payment.objects.create(
                user = request.user,
                razorpay_order_id = order_id,
                razorpay_payment_id = payment_id,
                razorpay_signature = signature,
                amount = amount,
                is_paid = True
            )

            order = place_order(request,int(address))

            newPayment.order = order
            newPayment.save()

            return Response({"Success" : "success","id":newPayment.id},status = 200)
        return Response({"Error in saving": "database"},status = 500)
    except Exception as e:
        print("eror:",e)
        return Response({"Error" : str(e)},status = 400)
    
def place_order(request,address):
    cart_items = CartItems.objects.filter(user=request.user)
    total_price = sum(item.product.price * item.quantity for item in cart_items)

    shipped_address = ShippingAddress.objects.get(user=request.user, id = address)
    order = Order.objects.create(
        user=request.user,
        total_amount=total_price,
        status = "Processing",
        shipped_address = shipped_address
    )

    for item in cart_items:
        OrderItems.objects.create(
            order=order,
            product=item.product,
            quantity=item.quantity,
            price=item.product.price
        )

    cart_items.delete()
    send_order_confirmation_email(request.user, order)
    return order
  

class  verifyEmailView(APIView):
    def get(self,request,uidb64,token):
        try:
            uid = force_str(urlsafe_base64_decode(uidb64))
            user = User.objects.get(pk=uid)
        except (TypeError, ValueError, OverflowError, User.DoesNotExist):
            return Response({"error": "Invalid link"}, status=status.HTTP_400_BAD_REQUEST)
        if default_token_generator.check_token(user, token):
            user.is_active = True
            user.save()
            return Response({"message": "Email verified successfully! You can now log in."}, status=status.HTTP_200_OK)
        else:
            return Response({"error": "Invalid or expired token"}, status=status.HTTP_400_BAD_REQUEST)