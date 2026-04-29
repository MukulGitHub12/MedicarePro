/* ===========================
   MediCare Pro - script.js
   Full Interactive Logic
   =========================== */

// ===== LOADER =====
window.addEventListener("load", () => {
  setTimeout(() => {
    document.getElementById("loader").classList.add("hidden");
    initAnimations();
    animateCounters();
  }, 1800);
});

// ===== CUSTOM CURSOR =====
const cursorDot = document.getElementById("cursorDot");
const cursorRing = document.getElementById("cursorRing");

document.addEventListener("mousemove", (e) => {
  cursorDot.style.left = e.clientX + "px";
  cursorDot.style.top = e.clientY + "px";
  setTimeout(() => {
    cursorRing.style.left = e.clientX + "px";
    cursorRing.style.top = e.clientY + "px";
  }, 60);
});

document.addEventListener("mouseover", (e) => {
  if (
    e.target.tagName === "BUTTON" ||
    e.target.tagName === "A" ||
    e.target.tagName === "INPUT" ||
    e.target.tagName === "SELECT" ||
    e.target.tagName === "TEXTAREA" ||
    e.target.closest("button") ||
    e.target.closest("a")
  ) {
    cursorRing.classList.add("hovered");
  } else {
    cursorRing.classList.remove("hovered");
  }
});

// ===== NAVBAR =====
const navbar = document.getElementById("navbar");
window.addEventListener("scroll", () => {
  navbar.classList.toggle("scrolled", window.scrollY > 50);
  updateActiveNavLink();
});

function updateActiveNavLink() {
  const sections = document.querySelectorAll("section[id]");
  const scrollPos = window.scrollY + 120;
  sections.forEach((sec) => {
    const link = document.querySelector(`.nav-link[href="#${sec.id}"]`);
    if (link) {
      if (
        sec.offsetTop <= scrollPos &&
        sec.offsetTop + sec.offsetHeight > scrollPos
      ) {
        document.querySelectorAll(".nav-link").forEach((l) => l.classList.remove("active"));
        link.classList.add("active");
      }
    }
  });
}

function toggleMenu() {
  const navLinks = document.getElementById("navLinks");
  navLinks.classList.toggle("mobile-open");
}

// Close menu when link clicked
document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    document.getElementById("navLinks").classList.remove("mobile-open");
  });
});

function scrollToSection(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

// ===== COUNTER ANIMATION =====
function animateCounters() {
  document.querySelectorAll(".stat-num").forEach((el) => {
    const target = parseInt(el.dataset.target);
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;
    const timer = setInterval(() => {
      current += step;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      el.textContent = Math.floor(current).toLocaleString();
    }, 16);
  });
}

// ===== SCROLL ANIMATIONS =====
function initAnimations() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          setTimeout(() => entry.target.classList.add("visible"), i * 100);
        }
      });
    },
    { threshold: 0.1 }
  );
  document.querySelectorAll("[data-aos]").forEach((el) => observer.observe(el));
}

// ===== MODAL SYSTEM =====
function openModal(id) {
  const modal = document.getElementById(id);
  if (modal) {
    modal.classList.add("active");
    document.body.style.overflow = "hidden";
    if (id === "teleModal") populateOnlineDoctors();
    if (id === "cartModal") renderCartModal();
  }
}

function closeModal(id) {
  const modal = document.getElementById(id);
  if (modal) {
    modal.classList.remove("active");
    document.body.style.overflow = "";
  }
}

function closeModalOnBg(event, id) {
  if (event.target === event.currentTarget) closeModal(id);
}

function switchModal(closeId, openId) {
  closeModal(closeId);
  setTimeout(() => openModal(openId), 200);
}

// ===== TOAST =====
function showToast(message, duration = 3500) {
  const toast = document.getElementById("toast");
  const msg = document.getElementById("toastMsg");
  msg.textContent = message;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), duration);
}

// ===== DOCTORS DATA =====
const doctors = [
  {
    id: 1,
    name: "Dr. Sarah Mitchell",
    specialty: "Cardiology",
    filter: "cardiology",
    exp: "15 yrs",
    rating: "4.9",
    reviews: 312,
    fee: "₹800",
    available: true,
    img: "https://randomuser.me/api/portraits/women/44.jpg",
    about: "Dr. Mitchell is a board-certified cardiologist with 15 years of experience in interventional cardiology and heart failure management.",
    edu: "MD – Harvard Medical School",
    lang: "English, Spanish",
  },
  {
    id: 2,
    name: "Dr. James Chen",
    specialty: "Neurology",
    filter: "neurology",
    exp: "12 yrs",
    rating: "4.8",
    reviews: 278,
    fee: "₹900",
    available: true,
    img: "https://randomuser.me/api/portraits/men/32.jpg",
    about: "Dr. Chen specializes in neurological disorders, epilepsy, and migraine management with a patient-first approach.",
    edu: "MD – Johns Hopkins University",
    lang: "English, Mandarin",
  },
  {
    id: 3,
    name: "Dr. Priya Sharma",
    specialty: "Dermatology",
    filter: "dermatology",
    exp: "9 yrs",
    rating: "4.9",
    reviews: 421,
    fee: "₹700",
    available: true,
    img: "https://randomuser.me/api/portraits/women/65.jpg",
    about: "Expert in cosmetic and medical dermatology, treating skin disorders, acne, and providing advanced skincare solutions.",
    edu: "MBBS, MD – AIIMS New Delhi",
    lang: "English, Hindi",
  },
  {
    id: 4,
    name: "Dr. Mark Davis",
    specialty: "Orthopedics",
    filter: "orthopedic",
    exp: "18 yrs",
    rating: "4.7",
    reviews: 195,
    fee: "₹950",
    available: false,
    img: "https://randomuser.me/api/portraits/men/75.jpg",
    about: "Specialist in joint replacement, sports injuries, and minimally invasive orthopedic surgery with 18 years of surgical excellence.",
    edu: "MD – Stanford University",
    lang: "English",
  },
  {
    id: 5,
    name: "Dr. Ananya Rao",
    specialty: "Pediatrics",
    filter: "pediatrics",
    exp: "10 yrs",
    rating: "5.0",
    reviews: 567,
    fee: "₹600",
    available: true,
    img: "https://randomuser.me/api/portraits/women/28.jpg",
    about: "Dedicated pediatrician focused on child health, growth development, vaccinations, and preventive care for newborns to teenagers.",
    edu: "MBBS, DCH – CMC Vellore",
    lang: "English, Hindi, Telugu",
  },
  {
    id: 6,
    name: "Dr. Robert Kim",
    specialty: "Cardiology",
    filter: "cardiology",
    exp: "20 yrs",
    rating: "4.8",
    reviews: 389,
    fee: "₹1100",
    available: true,
    img: "https://randomuser.me/api/portraits/men/52.jpg",
    about: "Senior cardiologist with 20 years of expertise in echocardiography, cardiac catheterization, and preventive cardiology.",
    edu: "MD – UCSF School of Medicine",
    lang: "English, Korean",
  },
  {
    id: 7,
    name: "Dr. Elena Vasquez",
    specialty: "Dermatology",
    filter: "dermatology",
    exp: "7 yrs",
    rating: "4.6",
    reviews: 145,
    fee: "₹650",
    available: true,
    img: "https://randomuser.me/api/portraits/women/36.jpg",
    about: "Specializes in allergic skin conditions, psoriasis, and aesthetic dermatology with a holistic treatment approach.",
    edu: "MD – University of Barcelona",
    lang: "English, Spanish, French",
  },
  {
    id: 8,
    name: "Dr. Arun Mehta",
    specialty: "Neurology",
    filter: "neurology",
    exp: "14 yrs",
    rating: "4.7",
    reviews: 210,
    fee: "₹850",
    available: false,
    img: "https://randomuser.me/api/portraits/men/41.jpg",
    about: "Expert neurologist specializing in stroke management, Parkinson's disease, and neurorehabilitation programs.",
    edu: "MBBS, DM – PGI Chandigarh",
    lang: "English, Hindi, Gujarati",
  },
];

function renderDoctors(filter = "all") {
  const grid = document.getElementById("doctorsGrid");
  grid.innerHTML = "";
  const filtered = filter === "all" ? doctors : doctors.filter((d) => d.filter === filter);
  filtered.forEach((doc, i) => {
    const stars = "★".repeat(Math.floor(parseFloat(doc.rating))) + (parseFloat(doc.rating) % 1 >= 0.5 ? "½" : "");
    const card = document.createElement("div");
    card.className = "doctor-card";
    card.style.animationDelay = `${i * 60}ms`;
    card.innerHTML = `
      <div class="doc-img-wrap">
        <img src="${doc.img}" alt="${doc.name}" loading="lazy" />
        <span class="doc-badge">${doc.exp} exp</span>
        <span class="doc-avail ${doc.available ? "" : "busy"}">${doc.available ? "● Available" : "● Busy"}</span>
      </div>
      <div class="doc-info">
        <div class="doc-name">${doc.name}</div>
        <div class="doc-specialty">${doc.specialty}</div>
        <div class="doc-meta">
          <span><span class="doc-rating">★</span> ${doc.rating} (${doc.reviews})</span>
          <span><i class="fas fa-indian-rupee-sign"></i> ${doc.fee}</span>
        </div>
        <div class="doc-actions">
          <button class="doc-btn-book" onclick="bookDoctor(${doc.id})"><i class="fas fa-calendar-check"></i> Book</button>
          <button class="doc-btn-profile" onclick="viewDoctorProfile(${doc.id})"><i class="fas fa-user"></i> Profile</button>
        </div>
      </div>`;
    grid.appendChild(card);
  });
}

renderDoctors();

// Doctor Filter Buttons
document.querySelectorAll(".filter-btn[data-filter]").forEach((btn) => {
  btn.addEventListener("click", function () {
    document.querySelectorAll(".filter-btn[data-filter]").forEach((b) => b.classList.remove("active"));
    this.classList.add("active");
    renderDoctors(this.dataset.filter);
  });
});

function bookDoctor(id) {
  const doc = doctors.find((d) => d.id === id);
  scrollToSection("appointment");
  setTimeout(() => showToast(`✅ Booking form ready for ${doc.name}`), 600);
}

function viewDoctorProfile(id) {
  const doc = doctors.find((d) => d.id === id);
  const modal = document.getElementById("doctorModalContent");
  modal.innerHTML = `
    <button class="modal-close" onclick="closeModal('doctorModal')"><i class="fas fa-times"></i></button>
    <div style="background: linear-gradient(135deg, #0D1B2E, #1a2d4a); padding: 28px; display:flex; gap:18px; align-items:center;">
      <img src="${doc.img}" style="width:80px;height:80px;border-radius:50%;object-fit:cover;border:3px solid rgba(10,124,255,0.5);" />
      <div style="color:white;">
        <div style="font-family:var(--font-display);font-size:1.3rem;font-weight:700;">${doc.name}</div>
        <div style="color:var(--primary);font-weight:600;font-size:0.85rem;margin:3px 0;">${doc.specialty}</div>
        <div style="font-size:0.78rem;color:rgba(255,255,255,0.6);">★ ${doc.rating} · ${doc.reviews} reviews · ${doc.exp} experience</div>
      </div>
      <span style="margin-left:auto;background:${doc.available ? "rgba(0,196,140,0.2)" : "rgba(255,107,107,0.2)"};color:${doc.available ? "#00C48C" : "#FF6B6B"};border-radius:20px;padding:4px 12px;font-size:0.75rem;font-weight:700;">${doc.available ? "Available" : "Busy"}</span>
    </div>
    <div style="padding:24px;">
      <div style="margin-bottom:16px;">
        <div style="font-size:0.75rem;font-weight:700;text-transform:uppercase;letter-spacing:1px;color:var(--text-muted);margin-bottom:6px;">About</div>
        <p style="font-size:0.88rem;color:var(--text-secondary);line-height:1.7;">${doc.about}</p>
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:14px;margin-bottom:20px;">
        <div style="background:var(--bg);padding:14px;border-radius:10px;">
          <div style="font-size:0.72rem;color:var(--text-muted);margin-bottom:4px;">Education</div>
          <div style="font-size:0.83rem;font-weight:600;">${doc.edu}</div>
        </div>
        <div style="background:var(--bg);padding:14px;border-radius:10px;">
          <div style="font-size:0.72px;color:var(--text-muted);margin-bottom:4px;font-size:0.72rem;">Languages</div>
          <div style="font-size:0.83rem;font-weight:600;">${doc.lang}</div>
        </div>
        <div style="background:var(--bg);padding:14px;border-radius:10px;">
          <div style="font-size:0.72rem;color:var(--text-muted);margin-bottom:4px;">Consultation Fee</div>
          <div style="font-size:0.95rem;font-weight:700;color:var(--primary);">${doc.fee}</div>
        </div>
        <div style="background:var(--bg);padding:14px;border-radius:10px;">
          <div style="font-size:0.72rem;color:var(--text-muted);margin-bottom:4px;">Experience</div>
          <div style="font-size:0.83rem;font-weight:600;">${doc.exp}</div>
        </div>
      </div>
      <div style="display:flex;gap:10px;">
        <button class="btn-form-submit" style="flex:1;" onclick="closeModal('doctorModal');scrollToSection('appointment');showToast('Booking for ${doc.name}');">
          <i class="fas fa-calendar-check"></i> Book Appointment
        </button>
        <button class="btn-form-submit" style="flex:1;background:linear-gradient(135deg,var(--secondary),var(--secondary-dark));" onclick="openModal('chatModal');closeModal('doctorModal');">
          <i class="fas fa-comment-dots"></i> Message
        </button>
      </div>
    </div>`;
  openModal("doctorModal");
}

// ===== APPOINTMENT FORM =====
function submitAppointment(e) {
  e.preventDefault();
  showToast("🎉 Appointment booked! Confirmation sent to your email.");
  e.target.reset();
}

// ===== TELEMEDICINE =====
let callActive = false;
let micActive = true;
let speakerActive = true;
let callTimer = null;
let callSeconds = 0;

function toggleCall() {
  callActive = !callActive;
  const btn = document.getElementById("callBtn");
  const status = document.getElementById("callStatus");
  const timer = document.getElementById("videoTimer");

  if (callActive) {
    btn.classList.add("end-call");
    btn.innerHTML = '<i class="fas fa-phone-slash"></i>';
    status.textContent = "Connected · HD Video";
    status.style.color = "#00C48C";
    timer.style.display = "block";
    callSeconds = 0;
    callTimer = setInterval(() => {
      callSeconds++;
      const m = String(Math.floor(callSeconds / 60)).padStart(2, "0");
      const s = String(callSeconds % 60).padStart(2, "0");
      timer.textContent = `${m}:${s}`;
    }, 1000);
    showToast("📹 Video call connected to Dr. James Chen");
  } else {
    btn.classList.remove("end-call");
    btn.innerHTML = '<i class="fas fa-video"></i>';
    status.textContent = "Ready to connect";
    status.style.color = "var(--secondary)";
    timer.style.display = "none";
    clearInterval(callTimer);
    showToast("📵 Call ended. Duration: " + timer.textContent);
  }
}

function toggleMic() {
  micActive = !micActive;
  const btn = document.getElementById("micBtn");
  btn.innerHTML = micActive ? '<i class="fas fa-microphone"></i>' : '<i class="fas fa-microphone-slash"></i>';
  btn.classList.toggle("active", !micActive);
}

function toggleSpeaker() {
  speakerActive = !speakerActive;
  const btn = document.getElementById("speakerBtn");
  btn.innerHTML = speakerActive ? '<i class="fas fa-volume-up"></i>' : '<i class="fas fa-volume-mute"></i>';
  btn.classList.toggle("active", !speakerActive);
}

// ===== HEALTH RECORDS TABS =====
document.querySelectorAll(".rec-nav-btn").forEach((btn) => {
  btn.addEventListener("click", function () {
    document.querySelectorAll(".rec-nav-btn").forEach((b) => b.classList.remove("active"));
    document.querySelectorAll(".rec-tab").forEach((t) => t.classList.remove("active"));
    this.classList.add("active");
    const tab = document.getElementById("tab-" + this.dataset.tab);
    if (tab) tab.classList.add("active");
  });
});

// ===== VITALS TABLE =====
const vitalsData = [
  { date: "Apr 29, 2026", hr: 72, bp: "120/80", temp: 98.6, spo2: 98, weight: 75 },
  { date: "Apr 27, 2026", hr: 74, bp: "122/82", temp: 98.4, spo2: 97, weight: 75.5 },
  { date: "Apr 25, 2026", hr: 70, bp: "118/78", temp: 98.7, spo2: 99, weight: 75.2 },
  { date: "Apr 22, 2026", hr: 76, bp: "124/84", temp: 98.5, spo2: 98, weight: 76 },
  { date: "Apr 20, 2026", hr: 73, bp: "121/81", temp: 98.6, spo2: 98, weight: 76.3 },
  { date: "Apr 18, 2026", hr: 71, bp: "119/79", temp: 98.3, spo2: 99, weight: 76.8 },
  { date: "Apr 15, 2026", hr: 78, bp: "126/86", temp: 98.8, spo2: 97, weight: 77 },
];

function renderVitalsTable() {
  const tbody = document.getElementById("vitalsTableBody");
  if (!tbody) return;
  tbody.innerHTML = vitalsData
    .map(
      (v) => `
      <tr>
        <td>${v.date}</td>
        <td>${v.hr}</td>
        <td>${v.bp}</td>
        <td>${v.temp}</td>
        <td>${v.spo2}%</td>
        <td>${v.weight} kg</td>
      </tr>`
    )
    .join("");
}
renderVitalsTable();

function addVital(e) {
  e.preventDefault();
  const today = new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  const newVital = {
    date: today,
    hr: document.getElementById("vHR").value || 72,
    bp: document.getElementById("vBP").value || "120/80",
    temp: document.getElementById("vTemp").value || 98.6,
    spo2: document.getElementById("vSpo2").value || 98,
    weight: document.getElementById("vWeight").value || 75,
  };
  vitalsData.unshift(newVital);
  renderVitalsTable();
  closeModal("addVitalModal");
  showToast("💗 Vitals logged successfully!");
  e.target.reset();
}

// ===== PHARMACY =====
const medicines = [
  { id: 1, name: "Metformin", dose: "500mg Tablet", type: "prescription", emoji: "💊", price: 85, category: "prescription" },
  { id: 2, name: "Paracetamol", dose: "650mg Strip", type: "otc", emoji: "🔵", price: 28, category: "otc" },
  { id: 3, name: "Vitamin D3", dose: "2000 IU Capsule", type: "vitamins", emoji: "🟡", price: 145, category: "vitamins" },
  { id: 4, name: "Azithromycin", dose: "500mg Pack", type: "prescription", emoji: "💊", price: 120, category: "prescription" },
  { id: 5, name: "Omega-3", dose: "1000mg Softgel", type: "vitamins", emoji: "🐟", price: 390, category: "vitamins" },
  { id: 6, name: "Blood Pressure Monitor", dose: "Digital Auto BP", type: "devices", emoji: "🩺", price: 1499, category: "devices" },
  { id: 7, name: "Cetirizine", dose: "10mg Tablet", type: "otc", emoji: "🟣", price: 45, category: "otc" },
  { id: 8, name: "Atorvastatin", dose: "10mg Tablet", type: "prescription", emoji: "💊", price: 95, category: "prescription" },
  { id: 9, name: "Multivitamin", dose: "Daily Capsule", type: "vitamins", emoji: "🌈", price: 260, category: "vitamins" },
  { id: 10, name: "Pulse Oximeter", dose: "Fingertip Device", type: "devices", emoji: "📟", price: 899, category: "devices" },
  { id: 11, name: "Ibuprofen", dose: "400mg Tablet", type: "otc", emoji: "🟠", price: 38, category: "otc" },
  { id: 12, name: "Amoxicillin", dose: "500mg Capsule", type: "prescription", emoji: "💊", price: 110, category: "prescription" },
];

let cart = [];

function renderMeds(filter = "all", search = "") {
  const grid = document.getElementById("medsGrid");
  grid.innerHTML = "";
  const filtered = medicines.filter((m) => {
    const matchFilter = filter === "all" || m.category === filter;
    const matchSearch = m.name.toLowerCase().includes(search.toLowerCase()) || m.dose.toLowerCase().includes(search.toLowerCase());
    return matchFilter && matchSearch;
  });

  if (filtered.length === 0) {
    grid.innerHTML = `<div style="grid-column:1/-1;text-align:center;padding:40px;color:var(--text-muted);">
      <i class="fas fa-search" style="font-size:2rem;margin-bottom:10px;display:block;"></i>
      No medicines found for "${search}"
    </div>`;
    return;
  }

  filtered.forEach((med) => {
    const inCart = cart.some((c) => c.id === med.id);
    const card = document.createElement("div");
    card.className = "med-card";
    card.dataset.medId = med.id;
    card.innerHTML = `
      <div class="med-img">${med.emoji}</div>
      <div class="med-name">${med.name}</div>
      <div class="med-dose">${med.dose}</div>
      <span class="med-type ${med.category}">${med.type.charAt(0).toUpperCase() + med.type.slice(1)}</span>
      <div class="med-price">₹${med.price}</div>
      <button class="med-add-btn ${inCart ? "in-cart" : ""}" onclick="toggleCart(${med.id})">
        <i class="fas fa-${inCart ? "check" : "plus"}"></i>
        ${inCart ? "Added to Cart" : "Add to Cart"}
      </button>`;
    grid.appendChild(card);
  });
}

renderMeds();

function toggleCart(medId) {
  const med = medicines.find((m) => m.id === medId);
  const idx = cart.findIndex((c) => c.id === medId);
  if (idx > -1) {
    cart.splice(idx, 1);
    showToast(`🗑️ ${med.name} removed from cart`);
  } else {
    cart.push(med);
    showToast(`🛒 ${med.name} added to cart!`);
  }
  updateCart();
  renderMeds(
    document.querySelector(".filter-btn[data-pfilter].active")?.dataset.pfilter || "all",
    document.getElementById("pharmSearch")?.value || ""
  );
}

function updateCart() {
  const widget = document.getElementById("cartWidget");
  const countEl = document.getElementById("cartCount");
  const totalEl = document.getElementById("cartTotal");
  const total = cart.reduce((s, m) => s + m.price, 0);
  countEl.textContent = cart.length;
  totalEl.textContent = total;
  widget.classList.toggle("visible", cart.length > 0);
}

function filterMeds() {
  const search = document.getElementById("pharmSearch").value;
  const activeFilter = document.querySelector(".filter-btn[data-pfilter].active")?.dataset.pfilter || "all";
  renderMeds(activeFilter, search);
}

document.querySelectorAll(".filter-btn[data-pfilter]").forEach((btn) => {
  btn.addEventListener("click", function () {
    document.querySelectorAll(".filter-btn[data-pfilter]").forEach((b) => b.classList.remove("active"));
    this.classList.add("active");
    renderMeds(this.dataset.pfilter, document.getElementById("pharmSearch")?.value || "");
  });
});

function renderCartModal() {
  const display = document.getElementById("cartItemsDisplay");
  const totalModal = document.getElementById("cartTotalModal");
  if (cart.length === 0) {
    display.innerHTML = `<div style="text-align:center;padding:30px;color:var(--text-muted);">
      <i class="fas fa-shopping-cart" style="font-size:2rem;margin-bottom:10px;display:block;opacity:0.3;"></i>
      Your cart is empty
    </div>`;
    totalModal.textContent = 0;
    return;
  }
  display.innerHTML = cart
    .map(
      (m) => `
      <div style="display:flex;align-items:center;gap:12px;padding:12px 0;border-bottom:1px solid var(--border);">
        <span style="font-size:1.4rem;">${m.emoji}</span>
        <div style="flex:1;">
          <div style="font-weight:600;font-size:0.88rem;">${m.name}</div>
          <div style="font-size:0.75rem;color:var(--text-muted);">${m.dose}</div>
        </div>
        <span style="font-weight:700;color:var(--primary);">₹${m.price}</span>
        <button onclick="toggleCart(${m.id});renderCartModal();" style="border:none;background:none;color:var(--accent);cursor:pointer;font-size:1rem;"><i class="fas fa-times"></i></button>
      </div>`
    )
    .join("");
  totalModal.textContent = cart.reduce((s, m) => s + m.price, 0);
}

function placeOrder() {
  if (cart.length === 0) { showToast("🛒 Cart is empty!"); return; }
  const total = cart.reduce((s, m) => s + m.price, 0);
  cart = [];
  updateCart();
  closeModal("cartModal");
  renderMeds();
  showToast(`✅ Order placed! Delivery in 2-4 hours. Total: ₹${total}`);
}

// ===== CONTACT FORM =====
function submitContact(e) {
  e.preventDefault();
  showToast("📩 Message sent! We'll respond within 24 hours.");
  e.target.reset();
}

// ===== AUTH FORMS =====
function handleLogin(e) {
  e.preventDefault();
  closeModal("loginModal");
  showToast("👋 Welcome back! You're now signed in.");
}

function handleRegister(e) {
  e.preventDefault();
  closeModal("registerModal");
  showToast("🎉 Account created! Welcome to MediCare Pro.");
}

// ===== LAB BOOKING =====
function submitLab(e) {
  e.preventDefault();
  closeModal("labModal");
  showToast("🔬 Lab test booked! Home collection scheduled.");
}

// ===== PHARMACY REFILL =====
function submitRefill(e) {
  e.preventDefault();
  closeModal("pharmacyModal");
  showToast("💊 Prescription refill submitted! Delivered in 2-4 hours.");
}

// ===== TELEMEDICINE MODAL DOCTORS =====
const onlineDocList = [
  { name: "Dr. Sarah Mitchell", spec: "Cardiology", wait: "Available now", img: "https://randomuser.me/api/portraits/women/44.jpg" },
  { name: "Dr. Ananya Rao", spec: "Pediatrics", wait: "~5 min wait", img: "https://randomuser.me/api/portraits/women/28.jpg" },
  { name: "Dr. Priya Sharma", spec: "Dermatology", wait: "Available now", img: "https://randomuser.me/api/portraits/women/65.jpg" },
  { name: "Dr. Robert Kim", spec: "Cardiology", wait: "~10 min wait", img: "https://randomuser.me/api/portraits/men/52.jpg" },
];

function populateOnlineDoctors() {
  const list = document.getElementById("onlineDoctorsList");
  list.innerHTML = onlineDocList
    .map(
      (d) => `
      <div class="online-doc-item">
        <img src="${d.img}" alt="${d.name}" />
        <div>
          <strong>${d.name}</strong>
          <span>${d.spec} · ${d.wait}</span>
        </div>
        <button class="tele-connect-btn" onclick="startTeleCall('${d.name}')">
          <i class="fas fa-video"></i> Connect
        </button>
      </div>`
    )
    .join("");
}

function startTeleCall(name) {
  closeModal("teleModal");
  scrollToSection("telemedicine");
  setTimeout(() => {
    document.getElementById("callStatus").textContent = `Connecting to ${name}...`;
    setTimeout(() => toggleCall(), 1500);
  }, 400);
  showToast(`📹 Connecting to ${name}...`);
}

// ===== CHAT =====
const chatReplies = [
  "I understand. Can you describe your symptoms in more detail?",
  "Thank you for sharing that. How long have you been experiencing this?",
  "I recommend scheduling an in-person visit for a thorough examination.",
  "Please take the prescribed medication regularly and monitor your symptoms.",
  "That's a common concern. Let me reassure you — it's manageable with the right care.",
  "Can you share your latest lab reports so I can review them?",
  "I'll update your prescription based on your current condition.",
  "Feel free to message me anytime if your symptoms worsen.",
];
let chatReplyIndex = 0;

function sendChatMessage() {
  const input = document.getElementById("chatInput");
  const msg = input.value.trim();
  if (!msg) return;

  const messages = document.getElementById("chatMessages");
  const userMsg = document.createElement("div");
  userMsg.className = "chat-msg sent";
  userMsg.textContent = msg;
  messages.appendChild(userMsg);
  input.value = "";
  messages.scrollTop = messages.scrollHeight;

  setTimeout(() => {
    const replyMsg = document.createElement("div");
    replyMsg.className = "chat-msg received";
    replyMsg.textContent = chatReplies[chatReplyIndex % chatReplies.length];
    chatReplyIndex++;
    messages.appendChild(replyMsg);
    messages.scrollTop = messages.scrollHeight;
  }, 1000);
}

function handleChat(e) {
  if (e.key === "Enter") sendChatMessage();
}

// ===== KEYBOARD SHORTCUTS =====
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    document.querySelectorAll(".modal-overlay.active").forEach((m) => {
      m.classList.remove("active");
      document.body.style.overflow = "";
    });
  }
});

// ===== SMOOTH SCROLL FOR ALL INTERNAL LINKS =====
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    const href = this.getAttribute("href");
    if (href === "#") return;
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
});

// ===== SET MIN DATE FOR DATE INPUTS =====
document.querySelectorAll('input[type="date"]').forEach((input) => {
  const today = new Date().toISOString().split("T")[0];
  input.min = today;
  input.value = today;
});

// ===== INTERSECTION OBSERVER for nav highlight on scroll =====
const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute("id");
        document.querySelectorAll(".nav-link").forEach((link) => {
          link.classList.toggle("active", link.getAttribute("href") === `#${id}`);
        });
      }
    });
  },
  { threshold: 0.3 }
);

document.querySelectorAll("section[id]").forEach((sec) => sectionObserver.observe(sec));

// ===== LAZY LOAD IMAGES (polyfill-style) =====
if ("IntersectionObserver" in window) {
  const imgObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        if (img.dataset.src) {
          img.src = img.dataset.src;
          imgObserver.unobserve(img);
        }
      }
    });
  });
  document.querySelectorAll("img[data-src]").forEach((img) => imgObserver.observe(img));
}

// ===== BACK TO TOP ON LOGO CLICK =====
document.querySelector(".logo").addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// ===== CONSOLE BRANDING =====
console.log(
  "%cMediCare Pro 🏥",
  "color:#0A7CFF;font-size:2rem;font-weight:bold;font-family:'Playfair Display',serif;"
);
console.log(
  "%cSmart Healthcare Platform — Built with ❤️",
  "color:#00C48C;font-size:0.9rem;"
);
