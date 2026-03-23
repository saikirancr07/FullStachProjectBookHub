from django.urls import path
from . import views

urlpatterns = [
    path('register/', views.register),
    path('login/', views.login),
    path('books/', views.books),
    path('books/bulk/', views.bulk_books),
    path('books/<int:id>/', views.book_detail),
    path('books/top-rated/', views.top_rated_books),
]