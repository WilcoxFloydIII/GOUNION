const sidebar = document.getElementById("sidebar");
const toggleBtn = document.getElementById("toggleBtn");

// Mobile toggle
toggleBtn.addEventListener("click", () => {
    sidebar.style.left = sidebar.style.left === "0px" ? "-260px" : "0px";
});

// Generate Class Years (2010 → 2035)
const startYear = 2000;
const endYear = 2025;

const yearGrid = document.getElementById("yearGrid");

for (let year = endYear; year >= startYear; year--) {
    const card = document.createElement("div");
    card.className = "year-card";
    card.textContent = `Class of ${year}`;

    card.addEventListener("click", () => {
        alert(`You selected Class of ${year}`);
        // Later: redirect to alumni group page
    });

    yearGrid.appendChild(card);
}
