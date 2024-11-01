from django.shortcuts import render,redirect, get_object_or_404
from . models import *
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login, logout
from django.contrib import messages
from django.views import View 
from django.http import JsonResponse
from django.contrib.auth.decorators import login_required
from django.http import HttpResponse 
import json

#from django.views.decorators.http import require_POST


def home(request):
    # Fetch trending and new arrival products
    trending_products = Product.objects.filter(trending=True)
    new_arrival_products = Product.objects.filter(new_arrival=True)
    
    return render(request, "index.html", {
        "trending_products": trending_products,
        "new_arrival_products": new_arrival_products
    })


def about(request):
    return render(request,"about.html")

"""def cart(request):
    return render(request,"cart_view.html") """


def cart(request):
  if request.user.is_authenticated:
    cart=Cart.objects.filter(user=request.user)
    return render(request,"cart_view.html",{"cart":cart})
  else:
    return redirect("/")
 
def remove_cart(request,cid):
  cartitem=Cart.objects.get(id=cid)
  cartitem.delete()
  return redirect("/cart")



def add_to_cart(request):
   if request.headers.get('x-requested-with')=='XMLHttpRequest':
    if request.user.is_authenticated:
      data=json.load(request)
      product_qty=data['product_qty']
      product_id=data['pid']
      
     # print(product_id)
      #print(product_qty)
      #print(request.user.id)
      
      product_status=Product.objects.get(id=product_id)
      if product_status:
        if Cart.objects.filter(user=request.user.id,product_id=product_id):
          return JsonResponse({'status':'Product Already in Cart'}, status=200)
        else:
          if product_status.quantity>=product_qty:
            Cart.objects.create(user=request.user,product_id=product_id,product_qty=product_qty)
            return JsonResponse({'status':'Product Added to Cart'}, status=200)
          else:
            return JsonResponse({'status':'Product Stock Not Available'}, status=200)
    else:
      return JsonResponse({'status':'Login to Add Cart'}, status=200)
   else:
    return JsonResponse({'status':'Invalid Access'}, status=200)
 

def shop(request):
    # Fetch categories with status=0
    women_products = Product.objects.filter(category__name='Women')
    men_products = Product.objects.filter(category__name='Men')
    kids_products = Product.objects.filter(category__name='Kids')

    return render(request, "shop.html", {
        "women_products": women_products,
        "men_products": men_products,
        "kids_products": kids_products
    })


# View for user registration
def register_view(request):
    if request.method == 'POST':
        username = request.POST['username']
        email = request.POST['email']
        phone = request.POST['phone']  # You may want to save phone in a custom model later
        password = request.POST['password']
        confirm_password = request.POST['confirm_password']


        # Check if passwords match
        if password == confirm_password:
            # Check if username or email already exists
            if User.objects.filter(username=username).exists():
                messages.error(request, 'Username already exists')
            elif User.objects.filter(email=email).exists():
                messages.error(request, 'Email already exists')
            else:
                # Create a new user
                user = User.objects.create_user(username=username, email=email, password=password)
                user.save()
                messages.success(request, 'Account created successfully! You can now log in.')
                return redirect('login')  # Redirect to login page after successful registration
        else:
            messages.error(request, 'Passwords do not match')
    return render(request, 'registration.html')

# View for user login
def login_view(request):
    if request.user.is_authenticated:
        return redirect("/")
    else:
        if request.method == 'POST':
            username = request.POST['username']
            password = request.POST['password']
               # Authenticate the user
            user = authenticate(request, username=username, password=password)
            if user is not None:
                login(request, user)
                return redirect('home')  # Redirect to a home or dashboard page after login
            else:
                messages.error(request, 'Invalid username or password')
        return render(request, 'login.html')


def logout_page(request):
  if request.user.is_authenticated:
    logout(request)
    messages.success(request,"Logged out Successfully")
  return redirect("/")


class ProductDetailView(View):
    def get(self, request, id):
        product = get_object_or_404(Product, id=id)
        return render(request, 'products/product_details.html', {'product': product})
    






