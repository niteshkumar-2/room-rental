const searchInput = document.getElementById("searchInput");
const roomList = document.getElementById("roomList");
const homeBtn = document.getElementById("homeBtn");
const aboutBtn = document.getElementById("aboutBtn");
const serviceBtn = document.getElementById("serviceBtn");
const contactBtn = document.getElementById("contactBtn");

let allRooms = [];

async function fetchRooms() {
  try {
    const res = await fetch("room.json");
    if (!res.ok) throw new Error("Failed to load room.json");
    allRooms = await res.json();
    renderRooms(allRooms);
  } catch (error) {
    roomList.innerHTML = `<p class="text-red-500">Error loading data: ${error.message}</p>`;
  }
}

function renderRooms(rooms) {
  roomList.innerHTML = "";
  if (rooms.length === 0) {
    roomList.innerHTML = `<p class="text-gray-700 text-lg text-center">🚫 No rooms found</p>`;
    return;
  }

  rooms.forEach((room) => {
    const div = document.createElement("div");
    div.className =
      "flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6 bg-white bg-opacity-90 p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 mb-4";

    div.innerHTML = `
      <img src="${room.image}" alt="${
      room.name
    }" class="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover border-4 border-purple-300 shadow-md" />
      <div class="flex-grow text-center sm:text-left">
        <h2 class="font-bold text-xl text-purple-800 mb-1">${room.name}</h2>
        <p class="text-gray-600 text-sm mb-1">📍 ${room.location}</p>
        <p class="text-green-600 font-semibold mb-1">💰 Rent: ₹${room.rent.toLocaleString()}</p>
        <p class="text-gray-500 italic mb-1">🛏️ Looking for: ${
          room.lookingFor
        }</p>
        <p class="text-blue-700 font-medium">📞 
          <a href="tel:${room.mobile}" class="hover:underline">${
      room.mobile
    }</a>
        </p>
      </div>
    `;

    roomList.appendChild(div);
  });
}

function filterRooms(query) {
  query = query.toLowerCase().trim();
  const filtered = allRooms.filter(
    (room) =>
      room.name.toLowerCase().includes(query) ||
      room.location.toLowerCase().includes(query) ||
      room.rent.toString().includes(query)
  );
  renderRooms(filtered);
}

searchInput.addEventListener("input", (e) => {
  const query = e.target.value;
  query === "" ? renderRooms(allRooms) : filterRooms(query);
});

homeBtn.addEventListener("click", (e) => {
  e.preventDefault();
  roomList.innerHTML = `
    <div class="bg-white bg-opacity-90 max-w-xl mx-auto p-8 rounded-2xl shadow-lg border border-purple-300">
      <h2 class="text-4xl text-purple-700 font-extrabold mb-4 flex items-center justify-center space-x-3">
        <span>🏠</span>
        <span>Welcome to Room Rental</span>
      </h2>
      <p class="text-center text-lg text-gray-700 font-medium leading-relaxed">
        Use the search below to find your perfect room by <span class="text-purple-600 font-semibold">name</span>, 
        <span class="text-purple-600 font-semibold">location</span>, or <span class="text-purple-600 font-semibold">rent</span>.
      </p>
      <div class="mt-6 flex justify-center">
        <svg class="animate-bounce h-8 w-8 text-purple-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </div>
  `;
});

aboutBtn.addEventListener("click", (e) => {
  e.preventDefault();
  roomList.innerHTML = `
    <div class="bg-white bg-opacity-95 p-8 rounded-xl shadow-2xl max-w-xl mx-auto text-gray-900">
      <h2 class="text-3xl font-extrabold text-purple-700 mb-6 flex items-center space-x-3">
        <span class="text-4xl">👥</span>
        <span>About Us</span>
      </h2>
      <p class="mb-4 text-lg leading-relaxed">
        Welcome to <strong class="text-purple-700">Room Rental</strong> — your trusted platform managed by 
        <span class="font-semibold text-indigo-700">Himanshu</span> and 
        <span class="font-semibold text-indigo-700">Mohit</span>, our dedicated admins and owners.
      </p>
      <p class="mb-6 text-base text-gray-700">
        If you face any issues or need assistance, don’t hesitate to get in touch with us. We’re here to help!
      </p>
      <ul class="space-y-3 text-blue-700 text-sm font-medium">
        <li>📞 Himanshu: <a href="tel:9876543210" class="hover:underline hover:text-purple-600 transition">9876543210</a></li>
        <li>📞 Mohit: <a href="tel:9123456789" class="hover:underline hover:text-purple-600 transition">9123456789</a></li>
        <li>📧 Email: <a href="mailto:support@roomrental.com" class="hover:underline hover:text-purple-600 transition">support@roomrental.com</a></li>
      </ul>
    </div>
  `;
});

serviceBtn.addEventListener("click", (e) => {
  e.preventDefault();
  searchInput.value = "";
  roomList.innerHTML = `
    <section class="max-w-6xl mx-auto py-12 px-6">
      <h2 class="text-4xl font-extrabold text-center text-purple-700 mb-12 drop-shadow-lg">
        🛎️ Our Premium Services
      </h2>

      <div class="grid sm:grid-cols-1 md:grid-cols-3 gap-10">
        <div class="bg-white rounded-2xl shadow-xl p-8 hover:scale-105 transform transition duration-300 ease-in-out cursor-pointer">
          <div class="text-purple-600 text-6xl mb-5 animate-bounce">🛏️</div>
          <h3 class="text-2xl font-semibold mb-3">Room Booking</h3>
          <p class="text-gray-700 text-base leading-relaxed">
            Quickly book your ideal room with our seamless platform and enjoy instant confirmation and support.
          </p>
        </div>

        <div class="bg-white rounded-2xl shadow-xl p-8 hover:scale-105 transform transition duration-300 ease-in-out cursor-pointer">
          <div class="text-purple-600 text-6xl mb-5 animate-pulse">🧹</div>
          <h3 class="text-2xl font-semibold mb-3">Professional Cleaning</h3>
          <p class="text-gray-700 text-base leading-relaxed">
            Our expert team ensures every room is spotless and sanitized for your health and comfort.
          </p>
        </div>

        <div class="bg-white rounded-2xl shadow-xl p-8 hover:scale-105 transform transition duration-300 ease-in-out cursor-pointer">
          <div class="text-purple-600 text-6xl mb-5 animate-bounce">🔧</div>
          <h3 class="text-2xl font-semibold mb-3">24/7 Maintenance Support</h3>
          <p class="text-gray-700 text-base leading-relaxed">
            From plumbing to electrical fixes, our dedicated team is available round the clock to assist you.
          </p>
        </div>
      </div>

      <div class="mt-14 text-center">
        <a href="#contact" class="inline-block bg-gradient-to-r from-purple-700 to-pink-500 text-white px-8 py-3 rounded-full font-semibold shadow-lg hover:from-purple-800 hover:to-pink-600 transition duration-300">
          Contact Us for More Info
        </a>
      </div>
    </section>
  `;
});

contactBtn.addEventListener("click", (e) => {
  e.preventDefault();
  roomList.innerHTML = `
    <div class="bg-white p-6 rounded-xl shadow-lg max-w-3xl mx-auto mt-6">
      <h2 class="text-3xl font-bold text-center text-purple-700 mb-6">📞 Contact Us</h2>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <form class="space-y-4">
          <div>
            <label class="block text-gray-700 font-medium mb-1">Full Name</label>
            <input type="text" placeholder="Your name" class="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400">
          </div>
          <div>
            <label class="block text-gray-700 font-medium mb-1">Email</label>
            <input type="email" placeholder="you@example.com" class="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400">
          </div>
          <div>
            <label class="block text-gray-700 font-medium mb-1">Message</label>
            <textarea rows="4" placeholder="Type your message..." class="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"></textarea>
          </div>
          <button type="submit" class="bg-purple-600 text-white px-6 py-2 rounded hover:bg-purple-700 transition-all">Send Message</button>
        </form>

        <div class="space-y-4 text-gray-700">
          <div class="flex items-start space-x-3">
            <span class="text-purple-600 text-xl">🏠</span>
            <p>Deharua, Uttarakhand, India</p>
          </div>
          <div class="flex items-start space-x-3">
            <span class="text-purple-600 text-xl">📧</span>
            <p><a href="mailto:contact@roomrental.com" class="underline hover:text-purple-700">contact@roomrental.com</a></p>
          </div>
          <div class="flex items-start space-x-3">
            <span class="text-purple-600 text-xl">📞</span>
            <p><a href="tel:+919876543210" class="underline hover:text-purple-700">+91 98765 43210</a></p>
          </div>
          <div class="flex items-start space-x-3">
            <span class="text-purple-600 text-xl">👤</span>
            <p>Himanshu & Mohit – Site Admins</p>
          </div>
        </div>
      </div>
    </div>`;
});
fetchRooms();
