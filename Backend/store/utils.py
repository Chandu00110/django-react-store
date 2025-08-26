from django.core.mail import send_mail
from django.conf import settings
from django.contrib.auth.tokens import default_token_generator
from django.utils.http import urlsafe_base64_encode
from django.utils.encoding import force_bytes
from django.urls import reverse

def send_verification_email(request,user):
    token = default_token_generator.make_token(user)
    uid = urlsafe_base64_encode(force_bytes(user.pk))

    verification_link = f'http://localhost:5173/verify/{uid}/{token}/'
    subject = 'Verify your email'
    message = f'Hi {user.username}, \nClick the linke below to verify your email:\n{verification_link}'
    email_from = settings.EMAIL_HOST_USER

    send_mail(subject,message,email_from,[user.email])

def send_order_confirmation_email(user, order):
    subject = 'Your Order Has Been Placed Successfully!'
    message = f"""
            Hi {user.username},

            Thank you for your order #{order.id}.
            We will notify you once it's shipped.

            Order Summary:
            Total: ₹{order.total_amount}
            Status: {order.status}

            Regards,
            Your Shop Team
            """
    send_mail(
        subject,
        message,
        settings.DEFAULT_FROM_EMAIL,
        [user.email],
        fail_silently=False,
    )