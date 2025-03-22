document.addEventListener("DOMContentLoaded", () => {
    const roomList = document.getElementById("roomList");
    const darkModeToggle = document.getElementById("darkModeToggle");
    const body = document.getElementById("body");

    // Load Dark Mode Preference
    if (localStorage.getItem("darkMode") === "enabled") {
        body.classList.add("bg-gray-900", "text-white");
        darkModeToggle.textContent = "☀️";
    }

    // Dark Mode Toggle
    darkModeToggle.addEventListener("click", () => {
        if (body.classList.contains("bg-gray-900")) {
            body.classList.remove("bg-gray-900", "text-white");
            localStorage.setItem("darkMode", "disabled");
            darkModeToggle.textContent = "🌙";
        } else {
            body.classList.add("bg-gray-900", "text-white");
            localStorage.setItem("darkMode", "enabled");
            darkModeToggle.textContent = "☀️";
        }
    });

    // Fetch Room Data
    fetch("room.json")
        .then(response => response.json())
        .then(data => {
            data.forEach(room => {
                const roomCard = document.createElement("div");
                roomCard.classList = "bg-white rounded-xl shadow-lg p-4 flex items-center dark:bg-gray-800 dark:text-white";
                roomCard.innerHTML = `
                    <img src="${room.image}" class="w-20 h-20 rounded-full object-cover mr-4">
                    <div>
                        <h2 class="text-lg font-semibold">${room.name}</h2>
                        <p class="text-gray-600 text-sm">${room.location}</p>
                        <p class="text-gray-800 mt-2"><strong>Rent:</strong> ₹${room.rent}</p>
                        <p class="text-gray-800"><strong>Looking for:</strong> ${room.lookingFor}</p>
                    </div>
                    <div class="ml-auto flex gap-3">
                        <button class="bg-blue-500 text-white p-2 rounded-full">📞</button>
                        <button class="bg-gray-200 p-2 rounded-full">💬</button>
                    </div>
                `;
                roomList.appendChild(roomCard);
            });
        })
        .catch(error => console.error("Error fetching room data:", error));
});
