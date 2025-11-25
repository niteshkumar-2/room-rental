const searchInput = document.getElementById("searchInput");
const roomList = document.getElementById("roomList");
const homeBtn = document.getElementById("homeBtn");
const aboutBtn = document.getElementById("aboutBtn");
const serviceBtn = document.getElementById("serviceBtn");
const contactBtn = document.getElementById("contactBtn");
const comingSoon = document.getElementById("comingSoon");
const loginBtn = document.getElementById("loginBtn");

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

function openChat(ownerName) {
  if (!isLoggedIn()) {
    alert("Please login to start chat.");
    document.getElementById("loginBox").classList.remove("hidden");
    return;
  }

  const chatBox = document.getElementById("chatBox");
  const chatTitle = document.getElementById("chatTitle");
  const messages = document.getElementById("chatMessages");

  chatTitle.innerText = `Chat with ${ownerName}`;
  chatBox.classList.remove("hidden");

  // initial demo conversation
  messages.innerHTML = "";

  const owner1 = createMessage(
    `👋 Hello! I'm ${ownerName}. How can I assist you today?`,
    "owner"
  );
  const user1 = createMessage(
    "Hi, I want to know more about the room.",
    "user"
  );
  const owner2 = createMessage("Sure! What would you like to know?", "owner");
  const user2 = createMessage("Room available hai kya?", "user");
  const owner3 = createMessage(
    "Yes, the room is currently available.",
    "owner"
  );

  messages.appendChild(owner1);
  messages.appendChild(user1);
  messages.appendChild(owner2);
  messages.appendChild(user2);
  messages.appendChild(owner3);

  // owner follow-up reply after a short delay
  setTimeout(() => {
    const reply = createMessage(
      "Thanks for your message! I will reply shortly.",
      "owner-reply"
    );
    messages.appendChild(reply);
    messages.scrollTop = messages.scrollHeight;
  }, 1200);
}

function createMessage(text, who) {
  const div = document.createElement("div");
  if (who === "owner" || who === "owner-reply") {
    div.className = "bg-gray-200 p-2 rounded mb-2 text-left";
  } else {
    div.className = "bg-purple-100 p-2 rounded mb-2 text-right";
  }
  div.innerText = text;
  return div;
}

function closeChat() {
  document.getElementById("chatBox").classList.add("hidden");
}

function sendMessage() {
  const input = document.getElementById("chatInput");
  const messages = document.getElementById("chatMessages");
  if (!input || !messages) return;

  const text = input.value.trim();
  if (!text) return;

  const msg = createMessage(text, "user");
  messages.appendChild(msg);
  input.value = "";
  messages.scrollTop = messages.scrollHeight;

  setTimeout(() => {
    const auto = createMessage(
      "Owner: Thanks for your message — I'll get back to you soon.",
      "owner"
    );
    messages.appendChild(auto);
    messages.scrollTop = messages.scrollHeight;
  }, 900);
}

// Video functions
function openVideo() {
  const videoBox = document.getElementById("videoBox");
  const video = document.getElementById("cameraStream");
  if (!videoBox || !video) return;

  videoBox.classList.remove("hidden");

  navigator.mediaDevices
    .getUserMedia({ video: true })
    .then((stream) => {
      video.srcObject = stream;
      video.dataset.streamActive = "true";
    })
    .catch(() => alert("Camera access denied"));
}

function closeVideo() {
  const videoBox = document.getElementById("videoBox");
  const video = document.getElementById("cameraStream");
  if (!videoBox || !video) return;

  videoBox.classList.add("hidden");

  if (video.dataset.streamActive === "true" && video.srcObject) {
    video.srcObject.getTracks().forEach((t) => t.stop());
    video.srcObject = null;
    video.dataset.streamActive = "false";
  }
}

if (loginBtn) {
  loginBtn.addEventListener("click", () => {
    const box = document.getElementById("loginBox");
    if (box) box.classList.remove("hidden");
  });
}

function doLogin() {
  const email = document.getElementById("usernameInput").value.trim();
  if (!email) {
    alert("Please enter your email");
    return;
  }
  localStorage.setItem("loggedUser", email);
  const box = document.getElementById("loginBox");
  if (box) box.classList.add("hidden");
  alert("Login Successful!");
}

function isLoggedIn() {
  return !!localStorage.getItem("loggedUser");
}

function renderRooms(rooms) {
  roomList.innerHTML = "";
  if (!rooms || rooms.length === 0) {
    roomList.innerHTML = `<p class="text-gray-700 text-lg text-center">🚫 No rooms found</p>`;
    return;
  }

  rooms.forEach((room) => {
    const div = document.createElement("div");
    div.className =
      "flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6 bg-white bg-opacity-90 p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 mb-4";

    const roomImageSrc = room.roomImage ? room.roomImage : "";

    div.innerHTML = `
      <img src="${escapeHtml(room.image)}" alt="${escapeHtml(
      room.name
    )}" class="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover border-4 border-purple-300 shadow-md" />
      <div class="flex-grow text-center sm:text-left">
        <h2 class="font-bold text-xl text-purple-800 mb-1">${escapeHtml(
          room.name
        )}</h2>
        <p class="text-gray-600 text-sm mb-1">📍 ${escapeHtml(
          room.location
        )}</p>
        <p class="text-green-600 font-semibold mb-1">💰 Rent: ₹${Number(
          room.rent
        ).toLocaleString()}</p>
        <p class="text-gray-500 italic mb-1">🛏️ Looking for: ${escapeHtml(
          room.lookingFor
        )}</p>
        <p class="text-blue-700 font-medium">📞 
          <a href="tel:${encodeURI(
            room.mobile
          )}" class="hover:underline">${escapeHtml(room.mobile)}</a>
        </p>
        <div class="flex gap-3 mt-3 justify-center sm:justify-start">
          <button class="px-4 py-2 bg-purple-600 text-white rounded-lg" data-action="chat" data-owner="${escapeAttr(
            room.name
          )}">💬 Chat Now</button>
          <button class="px-4 py-2 bg-blue-600 text-white rounded-lg" data-action="video">📹 Video Call</button>
        </div>
      </div>
      <div class="hidden sm:block">
        <img src="${escapeHtml(
          roomImageSrc
        )}" class="w-64 h-40 object-cover rounded-lg shadow-md" alt="room photo" onerror="this.style.opacity=0.6" />
      </div>
    `;

    const chatBtn = div.querySelector('[data-action="chat"]');
    const videoBtn = div.querySelector('[data-action="video"]');

    if (chatBtn) {
      chatBtn.addEventListener("click", (e) => {
        const owner = chatBtn.getAttribute("data-owner") || room.name;
        openChat(owner);
      });
    }
    if (videoBtn) {
      videoBtn.addEventListener("click", openVideo);
    }

    roomList.appendChild(div);
  });
}

function escapeHtml(str) {
  if (str === undefined || str === null) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}
function escapeAttr(str) {
  return escapeHtml(str).replace(/"/g, "&quot;");
}

function filterRooms(query) {
  query = query.toLowerCase();
  const filtered = allRooms.filter(
    (r) =>
      (r.name && r.name.toLowerCase().includes(query)) ||
      (r.location && r.location.toLowerCase().includes(query)) ||
      (r.rent && r.rent.toString().includes(query))
  );
  renderRooms(filtered);
}

if (searchInput) {
  searchInput.addEventListener("input", (e) => {
    const q = e.target.value;
    q === "" ? renderRooms(allRooms) : filterRooms(q);
  });
}

if (homeBtn) {
  homeBtn.addEventListener("click", (e) => {
    e.preventDefault();
    roomList.innerHTML = `
      <div class="bg-white bg-opacity-90 max-w-xl mx-auto p-8 rounded-2xl shadow-lg border border-purple-300">
        <h2 class="text-4xl text-purple-700 font-extrabold mb-4 text-center">🏠 Welcome to Room Rental</h2>
        <p class="text-center text-lg text-gray-700 font-medium leading-relaxed">
          Use the search below to find your perfect room by <span class="text-purple-600 font-semibold">name</span>, 
          <span class="text-purple-600 font-semibold">location</span>, or <span class="text-purple-600 font-semibold">rent</span>.
        </p>
      </div>
    `;
  });
}

if (aboutBtn) {
  aboutBtn.addEventListener("click", (e) => {
    e.preventDefault();
    roomList.innerHTML = `
      <section class="animate-fadeInUp max-w-3xl mx-auto bg-white bg-opacity-95 p-8 md:p-10 rounded-2xl shadow-xl text-gray-900 mt-12">
        <div class="text-center">
          <h2 class="text-3xl md:text-4xl font-extrabold text-purple-700 mb-4 flex justify-center items-center gap-3">
            <span class="text-4xl">👥</span>
            <span>About Us</span>
          </h2>
          <p class="text-lg md:text-xl font-medium text-gray-800 mb-6">
            Welcome to <span class="text-purple-700 font-bold">Room Rental</span> — your trusted platform for easy and reliable room booking.
          </p>
          <div class="flex justify-center gap-8 my-6">
            <div class="text-center">
              <img src="images/himanshu.jpeg" alt="Himanshu" class="w-24 h-24 rounded-full mx-auto shadow-md object-cover" />
              <p class="mt-2 font-semibold text-indigo-700">Himanshu</p>
            </div>
            <div class="text-center">
              <img src="images/mohit.jpeg" alt="Mohit" class="w-24 h-24 rounded-full mx-auto shadow-md object-cover" />
              <p class="mt-2 font-semibold text-indigo-700">Mohit</p>
            </div>
          </div>
          <p class="mt-6 text-center text-purple-600 italic font-medium max-w-xl mx-auto">
            Our mission is to provide comfortable, affordable, and hassle-free room rentals with a focus on quality service and customer satisfaction.
          </p>
        </div>
      </section>
    `;
  });
}

if (serviceBtn) {
  serviceBtn.addEventListener("click", (e) => {
    e.preventDefault();
    searchInput.value = "";
    roomList.innerHTML = `
      <section class="max-w-7xl mx-auto py-16 px-6">
        <div class="text-center mb-14">
          <h2 class="text-5xl font-extrabold text-purple-700 drop-shadow-md">🛎️ Our Premium Services</h2>
          <p class="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">We offer professional, customer-first services that elevate your living experience — clean, convenient, and worry-free.</p>
        </div>
        <div class="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          <div class="bg-white rounded-2xl shadow-lg border-t-4 border-purple-500 p-8 hover:scale-105 transform transition-all duration-300">
            <div class="text-purple-600 text-5xl mb-4">🛏️</div>
            <h3 class="text-xl font-bold mb-2">Room Booking</h3>
            <p class="text-gray-700 text-sm leading-relaxed">Browse and book rooms effortlessly. Instant confirmation, real-time availability, and helpful support — all in one place.</p>
          </div>
          <div class="bg-white rounded-2xl shadow-lg border-t-4 border-green-500 p-8 hover:scale-105 transform transition-all duration-300">
            <div class="text-green-600 text-5xl mb-4">🧹</div>
            <h3 class="text-xl font-bold mb-2">Professional Cleaning</h3>
            <p class="text-gray-700 text-sm leading-relaxed">Hygienic, deep-cleaned rooms maintained regularly by our expert cleaning crew to ensure a fresh and healthy stay.</p>
          </div>
          <div class="bg-white rounded-2xl shadow-lg border-t-4 border-red-500 p-8 hover:scale-105 transform transition-all duration-300">
            <div class="text-red-600 text-5xl mb-4">🔧</div>
            <h3 class="text-xl font-bold mb-2">24/7 Maintenance Support</h3>
            <p class="text-gray-700 text-sm leading-relaxed">Facing issues? Our dedicated technicians are just a call away — any time, any day, for plumbing, electrical, and more.</p>
          </div>
        </div>
        <div class="mt-16 text-center">
          <a href="#contact" class="inline-block bg-gradient-to-r from-purple-700 to-pink-500 text-white px-10 py-4 rounded-full text-lg font-semibold shadow-md hover:scale-105 transform transition duration-300">📞 Contact Us for More Info</a>
          <p class="mt-4 text-sm text-gray-500">We’ll get back to you within 24 hours.</p>
        </div>
      </section>
    `;
  });
}

if (contactBtn) {
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
            <div class="flex items-start space-x-3"><span class="text-purple-600 text-xl">🏠</span><p>Deharua, Uttarakhand, India</p></div>
            <div class="flex items-start space-x-3"><span class="text-purple-600 text-xl">📧</span><p><a href="mailto:contact@roomrental.com" class="underline hover:text-purple-700">contact@roomrental.com</a></p></div>
            <div class="flex items-start space-x-3"><span class="text-purple-600 text-xl">📞</span><p><a href="tel:+919876543210" class="underline hover:text-purple-700">+91 98765 43210</a></p></div>
            <div class="flex items-start space-x-3"><span class="text-purple-600 text-xl">👤</span><p>Himanshu & Mohit – Site Admins</p></div>
          </div>
        </div>
      </div>
    `;
  });
}

if (comingSoon) {
  comingSoon.addEventListener("click", (e) => {
    e.preventDefault();
    roomList.innerHTML = `
      <section class="p-8 bg-white rounded-xl shadow-xl text-gray-800 space-y-6 animate-fade-in max-w-4xl mx-auto">
        <div class="text-center">
          <h2 class="text-3xl font-bold mb-2">🚧 Upcoming Features</h2>
          <p class="text-lg text-gray-600 max-w-xl mx-auto">We're building something great. Here's what's on the roadmap:</p>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <article class="flex items-start gap-4"><span class="text-blue-600 text-3xl">🔐</span><div><h3 class="font-semibold">Admin Login Panel</h3><p class="text-sm text-gray-600">Role-based secure login system for administrators.</p></div></article>
          <article class="flex items-start gap-4"><span class="text-green-600 text-3xl">🏠</span><div><h3 class="font-semibold">Room Management</h3><p class="text-sm text-gray-600">Add, edit, or remove room details with real-time availability.</p></div></article>
          <article class="flex items-start gap-4"><span class="text-teal-600 text-3xl">🛏️</span><div><h3 class="font-semibold">Room Sharing Options</h3><p class="text-sm text-gray-600">Support shared accommodations.</p></div></article>
          <article class="flex items-start gap-4"><span class="text-yellow-600 text-3xl">📜</span><div><h3 class="font-semibold">Booking History</h3><p class="text-sm text-gray-600">View and manage bookings.</p></div></article>
        </div>
      </section>
    `;
  });
}

fetchRooms();
