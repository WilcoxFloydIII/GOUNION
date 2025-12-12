const API_URL = "http://127.0.0.1:8001";
const token = localStorage.getItem("access_token");

if (!token) {
    window.location.href = "login.html";
}

const groupsContainer = document.querySelector(".groups-grid");

// Toggle menu
function toggleMenu() {
    const navLinks = document.getElementById("navLinks");
    navLinks.classList.toggle("active");
}

async function loadGroups() {
    try {
        const res = await fetch(`${API_URL}/groups/`, {
            headers: { "Authorization": `Bearer ${token}` }
        });
        const groups = await res.json();
        renderGroups(groups);
    } catch (err) {
        console.error("Failed to load groups:", err);
    }
}

function renderGroups(groups) {
    // Clear existing static content
    const container = document.querySelector(".groups-grid");
    container.innerHTML = "";

    if (groups.length === 0) {
        container.innerHTML = "<p>No groups yet. Be the first to create one!</p>";
        return;
    }

    groups.forEach(group => {
        const card = document.createElement("div");
        card.className = "group-card";
        
        const imageUrl = group.cover_image || "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=800&q=80";
        
        card.innerHTML = `
            <img src="${imageUrl}" alt="${group.name}">
            <h3>${group.name}</h3>
            <p>${group.description || "No description"}</p>
            <button onclick="joinGroup(${group.id})">Join</button>
        `;
        container.appendChild(card);
    });
}

async function joinGroup(groupId) {
    try {
        const res = await fetch(`${API_URL}/groups/${groupId}/join`, {
            method: "POST",
            headers: { "Authorization": `Bearer ${token}` }
        });
        
        if (res.ok) {
            alert("Joined group successfully!");
        }
    } catch (err) {
        alert("Failed to join group: " + err.message);
    }
}

// Add "Create Group" button
function addCreateGroupButton() {
    const container = document.querySelector(".container");
    const createBtn = document.createElement("button");
    createBtn.textContent = "+ Create Group";
    createBtn.style.cssText = "position: fixed; bottom: 20px; right: 20px; padding: 15px 25px; background: #007bff; color: white; border: none; border-radius: 50px; cursor: pointer; font-size: 16px; box-shadow: 0 4px 8px rgba(0,0,0,0.2);";
    createBtn.onclick = showCreateGroupModal;
    document.body.appendChild(createBtn);
}

function showCreateGroupModal() {
    const name = prompt("Group Name:");
    const description = prompt("Description:");
    
    if (name) {
        createGroup(name, description);
    }
}

async function createGroup(name, description) {
    try {
        const res = await fetch(`${API_URL}/groups/`, {
            method: "POST",
            headers: { 
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: name,
                description: description,
                privacy: "public"
            })
        });
        
        if (res.ok) {
            alert("Group created!");
            loadGroups(); // Reload
        }
    } catch (err) {
        alert("Failed to create group: " + err.message);
    }
}

loadGroups();
addCreateGroupButton();
