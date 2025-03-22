document.addEventListener("DOMContentLoaded", function() {
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
                    <p><strong>Location:</strong> ${room.location}</p>
                    <p><strong>Price:</strong> $${room.price} per month</p>
                    <a href="room.html?id=${room.id}" class="btn">View Details</a>
                `;
                roomList.appendChild(roomCard);
            });
        });
});
