// Navigation toggle
function toggleMenu() {
    const navLinks = document.getElementById('navLinks');
    navLinks.classList.toggle('active');
    
    const menuToggle = document.querySelector('.menu-toggle');
    if (navLinks.classList.contains('active')) {
        menuToggle.innerHTML = '✕';
        menuToggle.style.transform = 'rotate(180deg)';
    } else {
        menuToggle.innerHTML = '☰';
        menuToggle.style.transform = 'rotate(0)';
    }
}

// Close menu when clicking outside
document.addEventListener('click', function(event) {
    const navLinks = document.getElementById('navLinks');
    const menuToggle = document.querySelector('.menu-toggle');
    
    if (!navLinks.contains(event.target) && !menuToggle.contains(event.target)) {
        navLinks.classList.remove('active');
        menuToggle.innerHTML = '☰';
        menuToggle.style.transform = 'rotate(0)';
    }
});

// Initialize dashboard
document.addEventListener('DOMContentLoaded', function() {
    // Update time of day greeting
    updateGreeting();
    
    // Update current date
    updateCurrentDate();
    
    // Load user data
    loadUserData();
    
    // Load feed posts
    loadFeedPosts();
    
    // Load notifications
    loadNotifications();
    
    // Setup event listeners
    setupEventListeners();
});

// Update greeting based on time of day
function updateGreeting() {
    const hour = new Date().getHours();
    const timeOfDayEl = document.getElementById('timeOfDay');
    
    if (hour < 12) {
        timeOfDayEl.textContent = 'Morning';
    } else if (hour < 17) {
        timeOfDayEl.textContent = 'Afternoon';
    } else {
        timeOfDayEl.textContent = 'Evening';
    }
}

// Update current date
function updateCurrentDate() {
    const dateEl = document.getElementById('currentDate');
    const now = new Date();
    
    const options = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    };
    
    dateEl.textContent = now.toLocaleDateString('en-US', options);
}

// Load user data
function loadUserData() {
    // In a real app, this would come from Firebase or your backend
    const user = {
        name: 'Alex Johnson',
        email: 'alex@example.com',
        year: '3rd Year',
        major: 'Computer Science',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=400&q=80'
    };
    
    // Update welcome message
    const usernameEl = document.querySelector('.username');
    usernameEl.textContent = user.name.split(' ')[0] + '!';
    
    // Update avatar
    const avatarEl = document.querySelector('.user-avatar');
    if (avatarEl) {
        avatarEl.src = user.avatar;
    }
}

// Load feed posts
function loadFeedPosts() {
    const feedContainer = document.getElementById('feedContainer');
    
    // Simulate loading
    setTimeout(() => {
        const posts = [
            {
                id: 1,
                user: {
                    name: 'Sarah Miller',
                    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?auto=format&fit=crop&w=400&q=80',
                    year: 'International Relations'
                },
                content: 'Just organized a virtual cultural exchange event! Anyone interested in sharing about their country\'s traditions? Let me know! 🌍',
                image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=800&q=80',
                likes: 42,
                comments: 8,
                time: '2 hours ago',
                group: 'Global Student Network'
            },
            {
                id: 2,
                user: {
                    name: 'Michael Chen',
                    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
                    year: 'Computer Science'
                },
                content: 'Working on a new AI project for automated study assistance. Looking for collaborators with experience in machine learning! #TechInnovators',
                image: null,
                likes: 56,
                comments: 12,
                time: '4 hours ago',
                group: 'Tech Innovators Hub'
            },
            {
                id: 3,
                user: {
                    name: 'Emma Wilson',
                    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80',
                    year: 'Alumni, Class of 2020'
                },
                content: 'Excited to announce our alumni networking event next Friday! There will be guest speakers from major tech companies. Perfect opportunity for current students to connect! 🎓',
                image: 'https://images.unsplash.com/photo-1558021211-6d1403321394?auto=format&fit=crop&w=800&q=80',
                likes: 89,
                comments: 24,
                time: '1 day ago',
                group: 'Class of 2020'
            }
        ];
        
        feedContainer.innerHTML = '';
        
        posts.forEach(post => {
            const postElement = createPostElement(post);
            feedContainer.appendChild(postElement);
        });
    }, 1500);
}

// Create post element
function createPostElement(post) {
    const postEl = document.createElement('div');
    postEl.className = 'post-card';
    postEl.innerHTML = `
        <div class="post-header">
            <div class="post-user">
                <img src="${post.user.avatar}" alt="${post.user.name}" class="post-avatar">
                <div>
                    <h4>${post.user.name}</h4>
                    <p>${post.user.year}</p>
                </div>
            </div>
            <div class="post-meta">
                <span class="post-time">${post.time}</span>
                <span class="post-group">${post.group}</span>
            </div>
        </div>
        <div class="post-content">
            <p>${post.content}</p>
            ${post.image ? `<img src="${post.image}" alt="Post image" class="post-image">` : ''}
        </div>
        <div class="post-stats">
            <span><i class="fas fa-heart"></i> ${post.likes}</span>
            <span><i class="fas fa-comment"></i> ${post.comments}</span>
            <span><i class="fas fa-share"></i> Share</span>
        </div>
        <div class="post-actions">
            <button class="post-action-btn like-btn" onclick="likePost(${post.id})">
                <i class="far fa-heart"></i> Like
            </button>
            <button class="post-action-btn comment-btn" onclick="commentOnPost(${post.id})">
                <i class="far fa-comment"></i> Comment
            </button>
            <button class="post-action-btn share-btn" onclick="sharePost(${post.id})">
                <i class="fas fa-share"></i> Share
            </button>
        </div>
    `;
    
    return postEl;
}

// Create new post
function createNewPost() {
    const postContent = document.getElementById('postContent').value;
    const imageInput = document.getElementById('postImage');
    
    if (!postContent.trim()) {
        showNotification('Please write something to post!', 'error');
        return;
    }
    
    // Create post object
    const newPost = {
        content: postContent,
        image: imageInput.files[0] ? URL.createObjectURL(imageInput.files[0]) : null
    };
    
    // Add post to feed
    const postElement = createPostElement({
        id: Date.now(),
        user: {
            name: 'Alex Johnson',
            avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=400&q=80',
            year: 'Computer Science'
        },
        content: newPost.content,
        image: newPost.image,
        likes: 0,
        comments: 0,
        time: 'Just now',
        group: 'Your Post'
    });
    
    const feedContainer = document.getElementById('feedContainer');
    feedContainer.insertBefore(postElement, feedContainer.firstChild);
    
    // Clear form
    document.getElementById('postContent').value = '';
    imageInput.value = '';
    
    showNotification('Post published successfully!', 'success');
}

// Load notifications
function loadNotifications() {
    const notificationsList = document.querySelector('.notifications-list');
    const notifications = [
        {
            id: 1,
            type: 'group_join',
            message: 'You have been added to "Tech Innovators Hub"',
            time: '5 minutes ago',
            read: false
        },
        {
            id: 2,
            type: 'message',
            message: 'Sarah Miller sent you a message',
            time: '1 hour ago',
            read: false
        },
        {
            id: 3,
            type: 'event',
            message: 'Upcoming event: Tech Innovators Meetup tomorrow',
            time: '3 hours ago',
            read: true
        },
        {
            id: 4,
            type: 'like',
            message: 'Michael Chen liked your post',
            time: '1 day ago',
            read: true
        }
    ];
    
    notificationsList.innerHTML = '';
    
    notifications.forEach(notif => {
        const notifEl = document.createElement('div');
        notifEl.className = `notification-item ${notif.read ? 'read' : 'unread'}`;
        notifEl.innerHTML = `
            <div class="notification-content">
                <p>${notif.message}</p>
                <span class="notification-time">${notif.time}</span>
            </div>
            ${!notif.read ? '<span class="notification-dot"></span>' : ''}
        `;
        notificationsList.appendChild(notifEl);
    });
}

// Setup event listeners
function setupEventListeners() {
    // Post button
    const postBtn = document.getElementById('postBtn');
    if (postBtn) {
        postBtn.addEventListener('click', createNewPost);
    }
    
    // Logout button
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', logout);
    }
    
    // Filter buttons
    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            filterFeed(this.textContent);
        });
    });
}

// Filter feed
function filterFeed(filter) {
    const feedContainer = document.getElementById('feedContainer');
    const posts = feedContainer.querySelectorAll('.post-card');
    
    posts.forEach(post => {
        const group = post.querySelector('.post-group').textContent;
        
        switch(filter) {
            case 'All':
                post.style.display = 'block';
                break;
            case 'Following':
                // Logic for following filter
                post.style.display = 'block';
                break;
            case 'Groups':
                // Logic for groups filter
                post.style.display = 'block';
                break;
        }
    });
}

// Quick actions
function quickPost() {
    document.getElementById('postContent').focus();
    showNotification('Start typing your post!', 'info');
}

function joinGroup() {
    window.location.href = 'groups.html';
}

function findFriends() {
    showNotification('Search for friends feature coming soon!', 'info');
}

function viewEvents() {
    showNotification('Events page coming soon!', 'info');
}

// Post interactions
function likePost(postId) {
    showNotification('Post liked!', 'success');
    // In real app, update like count in database
}

function commentOnPost(postId) {
    showNotification('Comment feature coming soon!', 'info');
    // In real app, open comment modal
}

function sharePost(postId) {
    showNotification('Share feature coming soon!', 'info');
    // In real app, open share modal
}

// Notifications
function showNotifications() {
    const panel = document.getElementById('notificationsPanel');
    panel.classList.add('active');
}

function hideNotifications() {
    const panel = document.getElementById('notificationsPanel');
    panel.classList.remove('active');
}

// Logout function
function logout() {
    if (confirm('Are you sure you want to logout?')) {
        showNotification('Logging out...', 'info');
        setTimeout(() => {
            window.location.href = 'login.html'; // Redirect to login page
        }, 1000);
    }
}

// Show notification
function showNotification(message, type = 'info') {
    // Remove existing notification
    const existing = document.querySelector('.notification-toast');
    if (existing) existing.remove();
    
    // Create notification
    const notification = document.createElement('div');
    notification.className = `notification-toast ${type}`;
    notification.innerHTML = `
        <div class="notification-icon">
            ${type === 'success' ? '✓' : type === 'error' ? '✕' : 'ℹ'}
        </div>
        <div class="notification-message">${message}</div>
        <button class="notification-close" onclick="this.parentElement.remove()">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    document.body.appendChild(notification);
    
    // Auto-remove after 3 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 3000);
}

// Add CSS for posts and notifications
const style = document.createElement('style');
style.textContent = `
    .post-card {
        background: rgba(255, 255, 255, 0.03);
        border-radius: 15px;
        padding: 1.5rem;
        margin-bottom: 1.5rem;
        border: 1px solid rgba(255, 255, 255, 0.05);
        animation: fadeIn 0.5s ease;
    }
    
    .post-header {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        margin-bottom: 1rem;
    }
    
    .post-user {
        display: flex;
        align-items: center;
        gap: 1rem;
    }
    
    .post-avatar {
        width: 45px;
        height: 45px;
        border-radius: 50%;
        object-fit: cover;
        border: 2px solid #8b5cf6;
    }
    
    .post-user h4 {
        color: #ffffff;
        font-size: 1rem;
        margin-bottom: 0.2rem;
    }
    
    .post-user p {
        color: #b0b0c0;
        font-size: 0.85rem;
    }
    
    .post-meta {
        text-align: right;
    }
    
    .post-time {
        display: block;
        color: #8b5cf6;
        font-size: 0.85rem;
        margin-bottom: 0.2rem;
    }
    
    .post-group {
        display: block;
        color: #b0b0c0;
        font-size: 0.85rem;
        background: rgba(139, 92, 246, 0.1);
        padding: 0.2rem 0.6rem;
        border-radius: 12px;
    }
    
    .post-content {
        margin-bottom: 1rem;
    }
    
    .post-content p {
        color: #e0e0e0;
        line-height: 1.6;
        margin-bottom: 1rem;
    }
    
    .post-image {
        width: 100%;
        border-radius: 12px;
        max-height: 400px;
        object-fit: cover;
    }
    
    .post-stats {
        display: flex;
        gap: 1.5rem;
        color: #b0b0c0;
        font-size: 0.9rem;
        margin-bottom: 1rem;
        padding-bottom: 1rem;
        border-bottom: 1px solid rgba(255, 255, 255, 0.05);
    }
    
    .post-stats span {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        cursor: pointer;
        transition: color 0.3s ease;
    }
    
    .post-stats span:hover {
        color: #8b5cf6;
    }
    
    .post-actions {
        display: flex;
        gap: 0.5rem;
    }
    
    .post-action-btn {
        flex: 1;
        background: rgba(255, 255, 255, 0.03);
        border: 1px solid rgba(255, 255, 255, 0.05);
        color: #b0b0c0;
        padding: 0.8rem;
        border-radius: 8px;
        cursor: pointer;
        transition: all 0.3s ease;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.5rem;
    }
    
    .post-action-btn:hover {
        background: rgba(109, 40, 217, 0.15);
        color: #ffffff;
        border-color: #8b5cf6;
        transform: translateY(-2px);
    }
    
    .notification-item {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 1rem;
        background: rgba(255, 255, 255, 0.03);
        border-radius: 12px;
        margin-bottom: 0.8rem;
        cursor: pointer;
        transition: all 0.3s ease;
    }
    
    .notification-item:hover {
        background: rgba(255, 255, 255, 0.05);
    }
    
    .notification-item.unread {
        background: rgba(109, 40, 217, 0.1);
    }
    
    .notification-content p {
        color: #ffffff;
        margin-bottom: 0.3rem;
        font-size: 0.95rem;
    }
    
    .notification-time {
        color: #b0b0c0;
        font-size: 0.8rem;
    }
    
    .notification-dot {
        width: 8px;
        height: 8px;
        background: #8b5cf6;
        border-radius: 50%;
    }
    
    .notification-toast {
        position: fixed;
        bottom: 100px;
        right: 20px;
        background: rgba(25, 25, 35, 0.95);
        backdrop-filter: blur(10px);
        border: 1px solid rgba(255, 255, 255, 0.05);
        border-radius: 12px;
        padding: 1rem 1.5rem;
        display: flex;
        align-items: center;
        gap: 1rem;
        z-index: 10000;
        animation: slideInRight 0.3s ease;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
    }
    
    .notification-toast.success {
        border-left: 4px solid #10b981;
    }
    
    .notification-toast.error {
        border-left: 4px solid #ef4444;
    }
    
    .notification-toast.info {
        border-left: 4px solid #8b5cf6;
    }
    
    .notification-icon {
        width: 30px;
        height: 30px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: bold;
    }
    
    .notification-toast.success .notification-icon {
        background: rgba(16, 185, 129, 0.2);
        color: #10b981;
    }
    
    .notification-toast.error .notification-icon {
        background: rgba(239, 68, 68, 0.2);
        color: #ef4444;
    }
    
    .notification-toast.info .notification-icon {
        background: rgba(139, 92, 246, 0.2);
        color: #8b5cf6;
    }
    
    .notification-message {
        color: #ffffff;
        flex: 1;
    }
    
    .notification-close {
        background: transparent;
        border: none;
        color: #b0b0c0;
        cursor: pointer;
        font-size: 1rem;
        transition: color 0.3s ease;
    }
    
    .notification-close:hover {
        color: #ffffff;
    }
`;
document.head.appendChild(style);

// Close notifications when clicking outside
document.addEventListener('click', function(event) {
    const panel = document.getElementById('notificationsPanel');
    const bell = document.querySelector('.notification-bell');
    
    if (panel && panel.classList.contains('active') && 
        !panel.contains(event.target) && 
        !bell.contains(event.target)) {
        hideNotifications();
    }
});

// Simulate real-time updates
setInterval(() => {
    // Update online status randomly
    const onlineCount = Math.floor(Math.random() * 5) + 10;
    const onlineCountEl = document.querySelector('.online-count');
    if (onlineCountEl) {
        onlineCountEl.textContent = onlineCount;
    }
    
    // Update notification count
    const notifCount = Math.floor(Math.random() * 5);
    const notifCountEl = document.querySelector('.notification-count');
    if (notifCountEl) {
        notifCountEl.textContent = notifCount;
    }
}, 30000); // Every 30 seconds

// Initialize with animations
setTimeout(() => {
    document.body.style.opacity = '1';
}, 100);