from django.urls import path
from . import views
#from .views import add_to_cart, cart_view, update_cart, remove_from_cart

from .views import ProductDetailView 

urlpatterns= [
     path('register/', views.register_view, name='register'),
    path('login/', views.login_view, name='login'),
    path('logout',views.logout_page,name="logout"),
    path('',views.home,name="home"),
    path('home',views.home,name="home"),
    path('shop',views.shop,name="shop"),
    path('about',views.about,name="about"),
    path('cart',views.cart,name="cart"),
      path('add_to_cart',views.add_to_cart,name="add_to_cart"),
    path('remove_cart/<str:cid>',views.remove_cart,name="remove_cart"),

    path('product/<int:id>/',ProductDetailView.as_view(), name='product_detail'),




    
    
    ]



   


