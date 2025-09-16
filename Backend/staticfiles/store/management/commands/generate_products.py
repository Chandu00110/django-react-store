from django.core.management.base import BaseCommand
from store.models import Category, Product, ProductImages, ProductAttribute
from django.utils.text import slugify
import requests
import uuid

class Command(BaseCommand):
    help = "Import products with real images from DummyJSON API"

    def handle(self, *args, **kwargs):
        url = "https://dummyjson.com/products?limit=100"
        res = requests.get(url).json()

        products = []
        for item in res["products"]:
            # Category
            category, _ = Category.objects.get_or_create(
                name=item["category"].title(),
                slug=item["category"].lower().replace(" ", "-"),
                parent=None
            )

            # Unique slug
            raw_slug = slugify(item["title"])
            unique_slug = f"{raw_slug}-{uuid.uuid4().hex[:6]}"

            # Product
            product = Product.objects.create(
                category=category,
                name=item["title"],
                slug=unique_slug,
                description=item["description"],
                price=item["price"],
                is_available=True
            )

            # Images
            for i, img_url in enumerate(item["images"]):
                ProductImages.objects.create(
                    product=product,
                    image_url=img_url,
                    is_main=(i == 0)
                )

            # Attributes (example: brand, rating)
            ProductAttribute.objects.create(
                product=product,
                attribute_name="Brand",
                attribute_value=item.get("brand", "Unknown")
            )
            ProductAttribute.objects.create(
                product=product,
                attribute_name="Rating",
                attribute_value=str(item.get("rating", 0))
            )

            products.append(product)

        self.stdout.write(self.style.SUCCESS(f"✅ Imported {len(products)} products with images!"))
