const sidebar = document.getElementById("sidebar");
const toggleBtn = document.getElementById("toggleBtn");

toggleBtn.addEventListener("click", () => {
    sidebar.style.left = sidebar.style.left === "0px" ? "-260px" : "0px";
});

const chat = document.querySelector(".chat");
const sendBtn = document.getElementById("sendBtn");
const input = document.getElementById("msgInput");

sendBtn.onclick = () => {
    if (input.value.trim() === "") return;

    let msg = document.createElement("div");
    msg.className = "message me";
    msg.textContent = input.value;

    chat.appendChild(msg);
    input.value = "";
    chat.scrollTop = chat.scrollHeight;
};
