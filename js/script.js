// Smart Tiffin Website

// Mobile Menu
const menu = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav-links");

if (menu) {
  menu.onclick = () => {
    nav.classList.toggle("active");
  };
}

// Active Navbar Link
const links = document.querySelectorAll(".nav-links a");

links.forEach(link => {
  link.addEventListener("click", () => {
    links.forEach(i => i.classList.remove("active"));
    link.classList.add("active");

    if (nav) nav.classList.remove("active");
  });
});

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute("href"))
      .scrollIntoView({ behavior: "smooth" });
  });
});
