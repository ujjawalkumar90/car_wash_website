// ---------- Element references ----------
const bookBtn = document.querySelector(".btn-book");
const ctaBtn = document.querySelector(".btn-cta");
const modal = document.getElementById("booking-modal");
const closeBtn = document.querySelector(".close-btn");
const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector("nav ul");
const form = document.getElementById("booking-form");
const errorEl = document.getElementById("form-error");
const successEl = document.getElementById("form-success");
const dateInput = document.getElementById("date");

// ---------- Modal open / close ----------
function openModal() {
  modal.style.display = "block";
  modal.setAttribute("aria-hidden", "false");
  successEl.textContent = "";
  errorEl.textContent = "";
}

function closeModal() {
  modal.style.display = "none";
  modal.setAttribute("aria-hidden", "true");
}

bookBtn.addEventListener("click", () => {
  openModal();
  nav.classList.remove("active");
});
ctaBtn.addEventListener("click", openModal);
closeBtn.addEventListener("click", closeModal);

// Close when clicking outside the box
modal.addEventListener("click", (e) => {
  if (e.target === modal) closeModal();
});

// Close with Escape key
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeModal();
});

// ---------- Hamburger menu ----------
menuToggle.addEventListener("click", () => nav.classList.toggle("active"));

// Close the menu after clicking a link (mobile)
nav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => nav.classList.remove("active"));
});

// ---------- Form validation ----------
// Do not allow past dates
const today = new Date().toISOString().split("T")[0];
dateInput.min = today;

form.addEventListener("submit", (e) => {
  e.preventDefault();
  errorEl.textContent = "";
  successEl.textContent = "";

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const service = document.getElementById("service").value;
  const date = dateInput.value;

  if (name.length < 2) {
    errorEl.textContent = "Please enter your name (at least 2 characters).";
    return;
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    errorEl.textContent = "Please enter a valid email address.";
    return;
  }

  if (!date) {
    errorEl.textContent = "Please choose a date for your wash.";
    return;
  }

  if (date < today) {
    errorEl.textContent = "Please choose today or a future date.";
    return;
  }

  successEl.textContent = `Thank you, ${name}! Your ${service} is booked for ${date}.`;
  form.reset();

  // Close the modal after a short delay
  setTimeout(closeModal, 2500);
});
