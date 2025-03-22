document.addEventListener("DOMContentLoaded", function() {
    // Fetch room data
    fetch("rooms.json")
        .then(response => response.json())
        .then(rooms => {
            const roomList = document.getElementById("roomList");
            rooms.forEach(room => {
                const roomCard = document.createElement("div");
                roomCard.classList.add("room-card");
                roomCard.innerHTML = `
                    <img src="${room.image}" alt="${room.title}">
                    <h2>${room.title}</h2>
                    <p><strong>📍 Location:</strong> ${room.location}</p>
                    <p><strong>💰 Price:</strong> $${room.price} per month</p>
                    <a href="room.html?id=${room.id}" class="btn">View Details</a>
                `;
                roomList.appendChild(roomCard);
            });
        });

    // Dark Mode Toggle
    const darkModeToggle = document.getElementById("darkModeToggle");
    darkModeToggle.addEventListener("click", function() {
        document.body.classList.toggle("dark-mode");
        darkModeToggle.textContent = document.body.classList.contains("dark-mode") ? "☀" : "🌙";
    });
});
