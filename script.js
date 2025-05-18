const searchInput = document.getElementById("searchInput");
const roomList = document.getElementById("roomList");
const homeBtn = document.getElementById("homeBtn");
const aboutBtn = document.getElementById("aboutBtn");
const serviceBtn = document.getElementById("serviceBtn");
const contactBtn = document.getElementById("contactBtn");
const comingsoon = document.getElementById("comingsoon");

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
            <img src="https://randomuser.me/api/portraits/men/2.jpg" alt="Himanshu" class="w-24 h-24 rounded-full mx-auto shadow-md object-cover" />
            <p class="mt-2 font-semibold text-indigo-700">Himanshu</p>
          </div>
          <div class="text-center">
            <img src="https://randomuser.me/api/portraits/men/1.jpg" alt="Mohit" class="w-24 h-24 rounded-full mx-auto shadow-md object-cover" />
            <p class="mt-2 font-semibold text-indigo-700">Mohit</p>
          </div>
        </div>

        <p class="mt-6 text-center text-purple-600 italic font-medium max-w-xl mx-auto">
          Our mission is to provide comfortable, affordable, and hassle-free room rentals with a focus on quality service and customer satisfaction.
        </p>
      </div>

      <div class="text-base md:text-lg text-gray-700 leading-relaxed space-y-5 mt-6">
        <p>
          This platform is proudly managed and maintained by 
          <span class="font-semibold text-indigo-700">Himanshu</span> and 
          <span class="font-semibold text-indigo-700">Mohit</span> — our dedicated admins and co-founders.
        </p>
        <p>
          If you have any queries, face any issues, or simply need assistance, feel free to reach out to us directly. We're always here to help!
        </p>
      </div>

      <div class="mt-8">
        <h3 class="text-xl font-semibold text-purple-600 mb-3">📱 Contact Details</h3>
        <ul class="space-y-3 text-blue-700 text-base font-medium">
          <li>📞 Himanshu: <a href="tel:9876543210" class="hover:underline hover:text-purple-600 transition">9876543210</a></li>
          <li>📞 Mohit: <a href="tel:9123456789" class="hover:underline hover:text-purple-600 transition">9123456789</a></li>
          <li>📧 Email: <a href="mailto:support@roomrental.com" class="hover:underline hover:text-purple-600 transition">support@roomrental.com</a></li>
        </ul>
      </div>

      <div class="mt-6 flex justify-center space-x-6">
        <a href="https://facebook.com/himanshu" target="_blank" class="text-blue-600 hover:text-blue-800 transition" aria-label="Facebook" rel="noopener noreferrer">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.876v-6.987H7.898v-2.89h2.54v-2.207c0-2.507 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.463h-1.26c-1.243 0-1.63.772-1.63 1.562v1.877h2.773l-.443 2.89h-2.33v6.987C18.343 21.128 22 16.991 22 12z"/></svg>
        </a>
        <a href="https://linkedin.com/in/mohit" target="_blank" class="text-blue-700 hover:text-blue-900 transition" aria-label="LinkedIn" rel="noopener noreferrer">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M19 3A2 2 0 0 1 21 5v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14zm-9.87 14.13v-6.12h-2.54v6.12h2.54zm-1.27-6.93a1.49 1.49 0 1 0 0-2.99 1.49 1.49 0 0 0 0 2.99zm7.37 6.93v-3.29c0-1.96-1.18-2.88-2.75-2.88-1.27 0-1.83.7-2.15 1.19v-1.02h-2.54s.03.66 0 6.12h2.54v-3.41c0-.18.01-.36.07-.49.15-.36.48-.73 1.05-.73.74 0 1.04.55 1.04 1.36v3.27h2.54z"/></svg>
        </a>
      </div>

      <div class="mt-8 text-center text-gray-600 text-sm">
        <p>Support Hours: Mon-Fri, 9 AM - 6 PM</p>
        <p>Got questions? Check our <a href="/faq" class="text-purple-600 hover:underline">FAQ page</a>.</p>
      </div>
    </section>

    <style>
      @keyframes fadeInUp {
        from {opacity: 0; transform: translateY(20px);}
        to {opacity: 1; transform: translateY(0);}
      }
      .animate-fadeInUp {
        animation: fadeInUp 0.8s ease forwards;
      }
    </style>
  `;
});

serviceBtn.addEventListener("click", (e) => {
  e.preventDefault();
  searchInput.value = "";
  roomList.innerHTML = `
    <section class="max-w-7xl mx-auto py-16 px-6">
      <div class="text-center mb-14">
        <h2 class="text-5xl font-extrabold text-purple-700 drop-shadow-md">
          🛎️ Our Premium Services
        </h2>
        <p class="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
          We offer professional, customer-first services that elevate your living experience — clean, convenient, and worry-free.
        </p>
      </div>

      <div class="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        <div class="bg-white rounded-2xl shadow-lg border-t-4 border-purple-500 p-8 hover:scale-105 transform transition-all duration-300">
          <div class="text-purple-600 text-5xl mb-4">🛏️</div>
          <h3 class="text-xl font-bold mb-2">Room Booking</h3>
          <p class="text-gray-700 text-sm leading-relaxed">
            Browse and book rooms effortlessly. Instant confirmation, real-time availability, and helpful support — all in one place.
          </p>
        </div>

        <div class="bg-white rounded-2xl shadow-lg border-t-4 border-green-500 p-8 hover:scale-105 transform transition-all duration-300">
          <div class="text-green-600 text-5xl mb-4">🧹</div>
          <h3 class="text-xl font-bold mb-2">Professional Cleaning</h3>
          <p class="text-gray-700 text-sm leading-relaxed">
            Hygienic, deep-cleaned rooms maintained regularly by our expert cleaning crew to ensure a fresh and healthy stay.
          </p>
        </div>

        <div class="bg-white rounded-2xl shadow-lg border-t-4 border-red-500 p-8 hover:scale-105 transform transition-all duration-300">
          <div class="text-red-600 text-5xl mb-4">🔧</div>
          <h3 class="text-xl font-bold mb-2">24/7 Maintenance Support</h3>
          <p class="text-gray-700 text-sm leading-relaxed">
            Facing issues? Our dedicated technicians are just a call away — any time, any day, for plumbing, electrical, and more.
          </p>
        </div>
      </div>

      <div class="mt-16 text-center">
        <a href="#contact" class="inline-block bg-gradient-to-r from-purple-700 to-pink-500 text-white px-10 py-4 rounded-full text-lg font-semibold shadow-md hover:scale-105 transform transition duration-300">
          📞 Contact Us for More Info
        </a>
        <p class="mt-4 text-sm text-gray-500">We’ll get back to you within 24 hours.</p>
      </div>
    </section>

    <section id="contact" class="bg-gray-100 py-20 px-6">
      <div class="max-w-4xl mx-auto text-center">
        <h2 class="text-4xl font-bold text-purple-700 mb-6">📬 Get in Touch</h2>
        <p class="text-gray-700 text-lg mb-10">
          Have a question or need help? Fill out the form below and we’ll respond within 24 hours.
        </p>

        <form class="grid gap-6 md:grid-cols-2 bg-white p-8 rounded-xl shadow-lg">
          <input type="text" placeholder="Your Name" aria-label="Name" class="border border-gray-300 p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-purple-500" />
          <input type="email" placeholder="Your Email" aria-label="Email" class="border border-gray-300 p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-purple-500" />
          <textarea placeholder="Your Message" aria-label="Message" class="md:col-span-2 border border-gray-300 p-3 rounded-lg w-full h-32 focus:outline-none focus:ring-2 focus:ring-purple-500"></textarea>
          <button type="submit" class="md:col-span-2 bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg transition-all font-medium">
            ✉️ Send Message
          </button>
        </form>
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

comingsoon.addEventListener("click", (e) => {
  e.preventDefault();
  roomList.innerHTML = `
    <section 
      class="p-8 bg-white rounded-xl shadow-xl text-gray-800 space-y-6 animate-fade-in max-w-4xl mx-auto"
      role="region" 
      aria-labelledby="upcoming-features-title"
    >
      <div class="text-center">
        <h2 id="upcoming-features-title" class="text-3xl font-bold mb-2">🚧 Upcoming Features</h2>
        <p class="text-lg text-gray-600 max-w-xl mx-auto">
          We're building something great. Here's what's on the roadmap:
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        ${[
          {
            icon: "🔐",
            color: "text-blue-600",
            title: "Admin Login Panel",
            desc: "Role-based secure login system for administrators to manage platform settings."
          },
          {
            icon: "🏠",
            color: "text-green-600",
            title: "Room Management",
            desc: "Add, edit, or remove room details with real-time availability tracking."
          },
          {
            icon: "🛏️",
            color: "text-teal-600",
            title: "Room Sharing Options",
            desc: "Support for shared accommodations, with the ability to assign multiple users to a single room."
          },
          {
            icon: "📜",
            color: "text-yellow-600",
            title: "Booking History",
            desc: "Easily view and manage all current and previous bookings."
          },
          {
            icon: "💳",
            color: "text-purple-600",
            title: "Payment Integration",
            desc: "Enable users to pay rent via secure online payment gateways."
          },
          {
            icon: "👤",
            color: "text-pink-600",
            title: "User Profiles",
            desc: "Allow tenants to update contact info, view bookings, and more."
          },
          {
            icon: "📊",
            color: "text-indigo-600",
            title: "Admin Dashboard",
            desc: "Interactive graphs and stats for data-driven decisions."
          },
          {
            icon: "📩",
            color: "text-red-600",
            title: "Notifications",
            desc: "Receive alerts for bookings, payments, reminders, and feedback."
          }
        ].map(feature => `
          <article class="flex items-start gap-4" tabindex="0" role="group" aria-labelledby="title-${feature.title.replace(/\s/g,'')}">
            <span class="${feature.color} text-3xl flex-shrink-0" aria-hidden="true">${feature.icon}</span>
            <div>
              <h3 id="title-${feature.title.replace(/\s/g,'')}" class="font-semibold text-lg">${feature.title}</h3>
              <p class="text-sm text-gray-600">${feature.desc}</p>
            </div>
          </article>
        `).join('')}
      </div>

      <footer class="text-center text-sm text-gray-500 pt-6 border-t mt-6">
        🚀 These features are under development. We appreciate your patience and support!
      </footer>
    </section>
  `;
});
// Initial fetch of rooms
fetchRooms();
