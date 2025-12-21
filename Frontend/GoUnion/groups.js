function toggleMenu() {
    const navLinks = document.getElementById('navLinks');
    navLinks.classList.toggle('active');
}

// Close mobile menu when clicking outside
document.addEventListener('click', function(event) {
    const navLinks = document.getElementById('navLinks');
    const menuToggle = document.querySelector('.menu-toggle');
    
    if (!navLinks.contains(event.target) && !menuToggle.contains(event.target)) {
        navLinks.classList.remove('active');
    }
});

// Add click listeners to join buttons
document.addEventListener('DOMContentLoaded', function() {
    const joinButtons = document.querySelectorAll('.group-card button');
    
    joinButtons.forEach(button => {
        button.addEventListener('click', function() {
            const groupName = this.closest('.group-card').querySelector('h3').textContent;
            
            if (this.textContent === 'Join') {
                this.textContent = 'Joined ✓';
                this.style.backgroundColor = '#10b981';
                this.style.color = 'white';
                alert(`You've joined "${groupName}"`);
            } else {
                this.textContent = 'Join';
                this.style.backgroundColor = '#2563eb';
                alert(`You've left "${groupName}"`);
            }
        });
    });
    
    // Add click listeners to level cards
    const levelCards = document.querySelectorAll('.level');
    levelCards.forEach(level => {
        level.addEventListener('click', function() {
            const levelText = this.textContent;
            alert(`Loading groups for ${levelText}`);
            // Here you would typically filter groups by level
        });
    });
});
function toggleMenu() {
    const navLinks = document.getElementById('navLinks');
    navLinks.classList.toggle('active');
    
    // Add menu toggle animation
    const menuToggle = document.querySelector('.menu-toggle');
    if (navLinks.classList.contains('active')) {
        menuToggle.innerHTML = '✕';
        menuToggle.style.transform = 'rotate(180deg)';
    } else {
        menuToggle.innerHTML = '☰';
        menuToggle.style.transform = 'rotate(0)';
    }
}

// Close mobile menu when clicking outside
document.addEventListener('click', function(event) {
    const navLinks = document.getElementById('navLinks');
    const menuToggle = document.querySelector('.menu-toggle');
    
    if (!navLinks.contains(event.target) && !menuToggle.contains(event.target)) {
        navLinks.classList.remove('active');
        menuToggle.innerHTML = '☰';
        menuToggle.style.transform = 'rotate(0)';
    }
});

// Enhanced button interactions
document.addEventListener('DOMContentLoaded', function() {
    const joinButtons = document.querySelectorAll('.group-card button');
    
    joinButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            const groupName = this.closest('.group-card').querySelector('h3').textContent;
            const card = this.closest('.group-card');
            
            // Add click effect
            card.style.transform = 'scale(0.98)';
            setTimeout(() => {
                card.style.transform = '';
            }, 150);
            
            if (this.textContent === 'Join') {
                this.textContent = 'Joined ✓';
                this.style.background = 'linear-gradient(135deg, #10b981 0%, #34d399 100%)';
                this.style.boxShadow = '0 8px 20px rgba(16, 185, 129, 0.4)';
                
                // Add success animation
                const originalTitle = this.innerHTML;
                this.innerHTML = '<span class="loading-text">Joining...</span>';
                setTimeout(() => {
                    this.innerHTML = originalTitle;
                    this.textContent = 'Joined ✓';
                    showNotification(`Successfully joined "${groupName}"!`);
                }, 500);
            } else {
                this.textContent = 'Join';
                this.style.background = 'linear-gradient(135deg, #6d28d9 0%, #8b5cf6 100%)';
                this.style.boxShadow = '0 8px 20px rgba(109, 40, 217, 0.4)';
                showNotification(`Left "${groupName}"`);
            }
        });
    });
    
    // Level cards interaction
    const levelCards = document.querySelectorAll('.level');
    let activeLevel = null;
    
    levelCards.forEach(level => {
        level.addEventListener('click', function() {
            const levelText = this.textContent;
            
            // Remove active class from all levels
            levelCards.forEach(l => {
                l.style.background = 'rgba(25, 25, 35, 0.7)';
                l.style.borderColor = 'rgba(255, 255, 255, 0.05)';
                l.style.color = '#b0b0c0';
            });
            
            // Add active state to clicked level
            this.style.background = 'linear-gradient(135deg, #6d28d9 0%, #8b5cf6 100%)';
            this.style.borderColor = '#8b5cf6';
            this.style.color = '#ffffff';
            this.style.boxShadow = '0 10px 25px rgba(109, 40, 217, 0.3)';
            
            activeLevel = this;
            
            // Filter groups animation
            const groups = document.querySelectorAll('.group-card');
            groups.forEach(group => {
                group.style.opacity = '0.5';
                group.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    group.style.opacity = '1';
                    group.style.transform = '';
                }, 300);
            });
            
            showNotification(`Filtering groups for ${levelText}`);
        });
    });
    
    // Search functionality
    const searchInput = document.querySelector('.search-box input');
    searchInput.addEventListener('input', function(e) {
        const searchTerm = e.target.value.toLowerCase();
        const groups = document.querySelectorAll('.group-card');
        
        groups.forEach(group => {
            const title = group.querySelector('h3').textContent.toLowerCase();
            const description = group.querySelector('p').textContent.toLowerCase();
            
            if (title.includes(searchTerm) || description.includes(searchTerm)) {
                group.style.display = 'flex';
                group.style.animation = 'none';
                setTimeout(() => {
                    group.style.animation = 'fadeIn 0.5s ease';
                }, 10);
            } else {
                group.style.display = 'none';
            }
        });
    });
    
    // Add CSS for fadeIn animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
        }
        
        .loading-text {
            display: inline-block;
            animation: pulse 0.5s ease infinite;
        }
    `;
    document.head.appendChild(style);
});

// Notification function
function showNotification(message) {
    // Remove existing notification
    const existing = document.querySelector('.notification');
    if (existing) existing.remove();
    
    // Create notification
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.innerHTML = message;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: linear-gradient(135deg, #6d28d9 0%, #8b5cf6 100%);
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        z-index: 10000;
        animation: slideIn 0.3s ease, fadeOut 0.3s ease 2.7s;
        animation-fill-mode: forwards;
        max-width: 300px;
        font-weight: 500;
    `;
    
    document.body.appendChild(notification);
    
    // Add notification styles
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        @keyframes fadeOut {
            from { opacity: 1; }
            to { opacity: 0; }
        }
    `;
    document.head.appendChild(style);
    
    // Auto-remove notification
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 3000);
}