from django.apps import AppConfig


class ShopConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'shop'



class ShopConfig(AppConfig):  # Replace 'YourApp' with your app's name
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'shop'  # Replace with your app's name

    def ready(self):
        import shop.signals  # Import the signals when the app is ready