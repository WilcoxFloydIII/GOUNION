const API_URL = "http://127.0.0.1:8001";
const token = localStorage.getItem("access_token");

if (!token) {
    window.location.href = "login.html";
}

const welcomeMsg = document.getElementById("welcomeMsg");
const logoutBtn = document.getElementById("logoutBtn");
const feedContainer = document.getElementById("feedContainer");
const postBtn = document.getElementById("postBtn");
const postContent = document.getElementById("postContent");
const postImage = document.getElementById("postImage");

// Sidebar Toggle
const toggleBtn = document.getElementById("toggleBtn");
const sidebar = document.getElementById("sidebar");
toggleBtn.addEventListener("click", () => {
    sidebar.style.left = sidebar.style.left === "0px" ? "-260px" : "0px";
});

// Logout
logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("access_token");
    window.location.href = "login.html";
});

// Load Data
async function init() {
    try {
        await loadUser();
        await loadFeed();
    } catch (err) {
        console.error(err);
        if (err.message.includes("401")) {
            localStorage.removeItem("access_token");
            window.location.href = "login.html";
        }
    }
}

async function loadUser() {
    const res = await fetch(`${API_URL}/users/me/`, {
        headers: { "Authorization": `Bearer ${token}` }
    });
    if (!res.ok) throw new Error(res.status);
    const user = await res.json();
    welcomeMsg.textContent = `Welcome Back, ${user.username}`;
    
    // Log Device Info (Background)
    logDevice();
}

async function loadFeed() {
    // For now, fetch all posts if feed is empty (since we have no friends yet)
    // In production, use /feed/
    let res = await fetch(`${API_URL}/posts/`, {
        headers: { "Authorization": `Bearer ${token}` }
    });
    
    const posts = await res.json();
    renderPosts(posts);
}

function renderPosts(posts) {
    feedContainer.innerHTML = "";
    if (posts.length === 0) {
        feedContainer.innerHTML = "<p style='text-align:center'>No posts yet. Be the first!</p>";
        return;
    }

    posts.forEach(post => {
        const card = document.createElement("div");
        card.className = "card post-card";
        
        let imageHtml = "";
        if (post.image) {
            // Check if it's a full URL or relative path
            const imageUrl = post.image.startsWith("http") ? post.image : `${API_URL}/${post.image}`;
            imageHtml = `<img src="${imageUrl}" alt="Post Image" style="width:100%; border-radius: 8px; margin-top: 10px;">`;
        }

        card.innerHTML = `
            <div class="post-header" style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
                <strong>@${post.user ? post.user.username : 'Unknown'}</strong>
                <small style="color: #888;">${new Date(post.created_at).toLocaleDateString()}</small>
            </div>
            <p>${post.caption || ""}</p>
            ${imageHtml}
            <div class="post-actions" style="margin-top: 15px; border-top: 1px solid #eee; padding-top: 10px;">
                <button onclick="likePost(${post.id})">❤️ Like (${post.likes_count || 0})</button>
                <button>💬 Comment</button>
            </div>
        `;
        feedContainer.appendChild(card);
    });
}

// Create Post
postBtn.addEventListener("click", async () => {
    const caption = postContent.value;
    const file = postImage.files[0];

    if (!caption && !file) return;

    postBtn.disabled = true;
    postBtn.textContent = "Posting...";

    try {
        // 1. Create Post Object
        const postData = { caption: caption };
        
        // If there's an image, we might need a separate upload endpoint or multipart form
        // Our current backend expects JSON for creation, but let's check main.py
        // Actually, we usually need multipart/form-data for files.
        // Let's check if we have a unified endpoint or separate.
        // We have /upload/ for files and /posts/ for data.
        
        let imagePath = null;
        if (file) {
            const formData = new FormData();
            formData.append("file", file);
            const uploadRes = await fetch(`${API_URL}/upload/`, {
                method: "POST",
                headers: { "Authorization": `Bearer ${token}` },
                body: formData
            });
            const uploadData = await uploadRes.json();
            imagePath = uploadData.url;
        }

        const res = await fetch(`${API_URL}/posts/`, {
            method: "POST",
            headers: { 
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                caption: caption,
                image: imagePath
            })
        });

        if (res.ok) {
            postContent.value = "";
            postImage.value = "";
            loadFeed(); // Reload feed
        }
    } catch (err) {
        alert("Failed to post: " + err.message);
    } finally {
        postBtn.disabled = false;
        postBtn.textContent = "Post";
    }
});

// Helper: Log Device
async function logDevice() {
    const ua = navigator.userAgent;
    await fetch(`${API_URL}/users/me/device`, {
        method: "POST",
        headers: { 
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            device_name: "Web Browser",
            device_type: "Desktop", // Simplification
            browser: ua,
            os_version: navigator.platform
        })
    });
}

init();
