from django.core.management.base import BaseCommand
import csv
from store.models import Category, Product, ProductImages, ProductAttribute
from django.utils.text import slugify
import random

class Command(BaseCommand):   # 👈 VERY IMPORTANT: Class name must be Command
    help = "Import 100 clothing products from Kaggle CSV"

    def handle(self, *args, **kwargs):
        with open(r"D:\styles.csv", newline="", encoding="utf-8") as csvfile:
            reader = csv.DictReader(csvfile)
            count = 0

            for row in reader:
                if count >= 100:
                    break

                name = row["productDisplayName"]
                category_name = row["masterCategory"]
                sub_category_name = row["subCategory"]
                price = random.randint(500, 3000)
                image_url = f"https://raw.githubusercontent.com/paramaggarwal/fashion-product-images-dataset/master/images/{row['id']}.jpg"

                # Example Category creation
                category, _ = Category.objects.get_or_create(
                    name=sub_category_name,
                    slug=slugify(sub_category_name),
                    parent=Category.objects.get_or_create(
                        name=category_name, slug=slugify(category_name), parent=None
                    )[0],
                )

                # Example Product creation
                product, created = Product.objects.get_or_create(
                    name=name,
                    slug=slugify(name)[:200],
                    category=category,
                    defaults={
                        "description": f"{name} - {row['baseColour']} {row['gender']} {row['season']} collection",
                        "price": price,
                        "is_available": True,
                    },
                )

                # Add product image
                ProductImages.objects.get_or_create(
                    product=product,
                    image_url=image_url,
                    is_main=True
                )

                count += 1
                self.stdout.write(self.style.SUCCESS(f"Imported: {name}"))

        self.stdout.write(self.style.SUCCESS("✅ 100 products imported successfully!"))
