from django.urls import path, include
from UserManagement import views

urlpatterns = [
    path('/login', views.userLogin),
    path('dashboard', views.userDashboard),
    path('add-customer', views.addCustomer)
]