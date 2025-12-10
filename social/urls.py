from django.urls import path
from django.contrib.auth import views as auth_views
from . import views

urlpatterns = [
    path('signup/', views.signup_view, name='signup'),
    path('login/', auth_views.LoginView.as_view(template_name='social/login.html'), name='login'),
    path('logout/', auth_views.LogoutView.as_view(), name='logout'),
    path('', views.feed_view, name='feed'),
    path('explore/', views.explore_view, name='explore'),
    path('post/new/', views.post_create_view, name='post-create'),
    path('post/<int:post_id>/like/', views.like_post, name='like-post'),
    path('post/<int:post_id>/dislike/', views.dislike_post, name='dislike-post'),
    path('profile/edit/', views.profile_edit_view, name='profile-edit'),
    path('profile/<str:username>/', views.profile_view, name='profile'),
    path('profile/<str:username>/friend-request/', views.send_friend_request, name='send-friend-request'),
    path('profile/<str:username>/follow/', views.follow_user, name='follow-user'),
    path('profile/<str:username>/unfollow/', views.unfollow_user, name='unfollow-user'),
    path('friend-request/<int:request_id>/accept/', views.accept_friend_request, name='accept-friend-request'),
    path('friend-request/<int:request_id>/reject/', views.reject_friend_request, name='reject-friend-request'),
]
