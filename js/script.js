// Search Button
document.getElementById("searchBtn")?.addEventListener("click", function () {
  const location = document.getElementById("locationInput").value.trim();
  const food = document.getElementById("foodType").value;

  if (location === "") {
    alert("Please enter your location!");
    return;
  }

  alert(`Searching ${food} meals in ${location}`);
  window.location.href = "menu.html";
});

// Contact Form
document.getElementById("contactForm")?.addEventListener("submit", function (e) {
  e.preventDefault();
  alert("Thank you! Your message has been sent.");
  this.reset();
});
