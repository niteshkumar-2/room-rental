document.addEventListener("DOMContentLoaded", () => {
  const roomList = document.getElementById("roomList");
  const darkModeToggle = document.getElementById("darkModeToggle");
  const body = document.body;

  setTimeout(() => {
    document.getElementById("splashScreen").style.display = "none";
  }, 3000);

  document.getElementById("menuToggle").addEventListener("click", () => {
    document.getElementById("mobileMenu").classList.toggle("hidden");
  });

  document.getElementById("showRooms").addEventListener("click", fetchRooms);
  document.getElementById("showRoomsMobile").addEventListener("click", () => {
    alert("Please wait for some days. Contact will be available soon! 🏠");
  });

  async function fetchRooms() {
    try {
      const response = await fetch("room.json");
      if (!response.ok) throw new Error("Failed to fetch room data");
      const data = await response.json();
      renderRooms(data);
    } catch (error) {}
  }
  function renderRooms(rooms) {
    roomList.innerHTML = "";
    rooms.forEach((room) => {
      const roomDiv = document.createElement("div");
      roomDiv.className =
        "bg-white rounded-xl shadow-lg p-4 flex items-center hover:shadow-2xl transition dark:bg-gray-800 dark:text-white";
      roomDiv.innerHTML = `
                <img src="${
                  room.img || room.image
                }" class="w-20 h-20 rounded-full object-cover mr-4">
                <div>
                    <h2 class="text-lg font-semibold">${room.name}</h2>
                    <p class="text-gray-600 text-sm">${room.location}</p>
                    <p class="text-gray-800 mt-2"><strong>Rent:</strong> ${
                      room.price || `₹${room.rent}`
                    }</p>
                    <p class="text-gray-800"><strong>Looking for:</strong> ${
                      room.lookingFor || "Anyone"
                    }</p>
                </div>
                <div class="ml-auto flex gap-3">
                    <button class="bg-blue-500 text-white p-2 rounded-full hover:bg-blue-700">📞</button>
                    <button class="bg-gray-200 p-2 rounded-full hover:bg-gray-400">💬</button>
                </div>
            `;
      roomList.appendChild(roomDiv);
    });
  }
});
