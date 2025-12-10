from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth import login
from django.contrib.auth.decorators import login_required
from .forms import UserRegisterForm, PostForm, ProfileUpdateForm, CommentForm
from .models import Post, Profile, FriendRequest, Follow, Comment
from django.contrib.auth.models import User
from django.db.models import Q

def signup_view(request):
    if request.method == 'POST':
        form = UserRegisterForm(request.POST)
        if form.is_valid():
            user = form.save()
            login(request, user)
            return redirect('feed')
    else:
        form = UserRegisterForm()
    return render(request, 'social/signup.html', {'form': form})

@login_required
def feed_view(request):
    # Get posts from friends, following, and self
    user = request.user
    
    # Get friends
    friends = User.objects.filter(
        Q(sent_requests__receiver=user, sent_requests__status='accepted') |
        Q(received_requests__sender=user, received_requests__status='accepted')
    )
    
    # Get following
    following = User.objects.filter(followers__follower=user)
    
    # Combine all users to show posts from
    feed_users = list(friends) + list(following) + [user]
    
    posts = Post.objects.filter(user__in=feed_users).distinct()
    
    # Handle comment submission
    if request.method == 'POST':
        comment_form = CommentForm(request.POST)
        if comment_form.is_valid():
            comment = comment_form.save(commit=False)
            comment.user = request.user
            comment.post_id = request.POST.get('post_id')
            comment.save()
            return redirect('feed')
    else:
        comment_form = CommentForm()

    # Get suggestions (users not friends or followed)
    feed_user_ids = [u.id for u in feed_users]
    suggestions = User.objects.exclude(id=user.id).exclude(id__in=feed_user_ids)[:5]

    return render(request, 'social/feed.html', {
        'posts': posts, 
        'comment_form': comment_form,
        'suggestions': suggestions
    })

@login_required
def post_create_view(request):
    if request.method == 'POST':
        form = PostForm(request.POST, request.FILES)
        if form.is_valid():
            post = form.save(commit=False)
            post.user = request.user
            post.save()
            return redirect('feed')
    else:
        form = PostForm()
    return render(request, 'social/post_create.html', {'form': form})

@login_required
def profile_view(request, username):
    profile_user = get_object_or_404(User, username=username)
    is_friend = False
    is_following = False
    friend_request_sent = False
    
    if request.user.is_authenticated:
        # Check friendship
        is_friend = FriendRequest.objects.filter(
            (Q(sender=request.user, receiver=profile_user) | Q(sender=profile_user, receiver=request.user)),
            status='accepted'
        ).exists()
        
        # Check if request sent
        friend_request_sent = FriendRequest.objects.filter(
            sender=request.user, receiver=profile_user, status='pending'
        ).exists()
        
        # Check following
        is_following = Follow.objects.filter(follower=request.user, following=profile_user).exists()

    # Get friend requests (only for own profile)
    friend_requests = []
    if request.user == profile_user:
        friend_requests = FriendRequest.objects.filter(receiver=request.user, status='pending')

    # Get friends list
    friends = User.objects.filter(
        Q(sent_requests__receiver=profile_user, sent_requests__status='accepted') |
        Q(received_requests__sender=profile_user, received_requests__status='accepted')
    )

    return render(request, 'social/profile.html', {
        'profile_user': profile_user,
        'is_friend': is_friend,
        'is_following': is_following,
        'friend_request_sent': friend_request_sent,
        'friend_requests': friend_requests,
        'friends': friends
    })

@login_required
def profile_edit_view(request):
    if request.method == 'POST':
        form = ProfileUpdateForm(request.POST, request.FILES, instance=request.user.profile)
        if form.is_valid():
            form.save()
            return redirect('profile', username=request.user.username)
    else:
        form = ProfileUpdateForm(instance=request.user.profile)
    return render(request, 'social/profile_edit.html', {'form': form})

@login_required
def send_friend_request(request, username):
    to_user = get_object_or_404(User, username=username)
    if request.user != to_user:
        FriendRequest.objects.get_or_create(sender=request.user, receiver=to_user, status='pending')
    return redirect('profile', username=username)

@login_required
def accept_friend_request(request, request_id):
    friend_request = get_object_or_404(FriendRequest, id=request_id)
    if friend_request.receiver == request.user:
        friend_request.status = 'accepted'
        friend_request.save()
    return redirect('profile', username=friend_request.sender.username)

@login_required
def reject_friend_request(request, request_id):
    friend_request = get_object_or_404(FriendRequest, id=request_id)
    if friend_request.receiver == request.user:
        friend_request.status = 'rejected'
        friend_request.save()
    return redirect('profile', username=request.user.username)

@login_required
def follow_user(request, username):
    to_user = get_object_or_404(User, username=username)
    if request.user != to_user:
        Follow.objects.get_or_create(follower=request.user, following=to_user)
    return redirect('profile', username=username)

@login_required
def unfollow_user(request, username):
    to_user = get_object_or_404(User, username=username)
    Follow.objects.filter(follower=request.user, following=to_user).delete()
    return redirect('profile', username=username)

@login_required
def like_post(request, post_id):
    post = get_object_or_404(Post, id=post_id)
    if request.user in post.dislikes.all():
        post.dislikes.remove(request.user)
    
    if request.user in post.likes.all():
        post.likes.remove(request.user)
    else:
        post.likes.add(request.user)
    return redirect(request.META.get('HTTP_REFERER', 'feed'))

@login_required
def dislike_post(request, post_id):
    post = get_object_or_404(Post, id=post_id)
    if request.user in post.likes.all():
        post.likes.remove(request.user)
        
    if request.user in post.dislikes.all():
        post.dislikes.remove(request.user)
    else:
        post.dislikes.add(request.user)
    return redirect(request.META.get('HTTP_REFERER', 'feed'))

@login_required
def explore_view(request):
    # Show all users except self
    users = User.objects.exclude(id=request.user.id)
    return render(request, 'social/explore.html', {'users': users})
