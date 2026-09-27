function searchTiffin() {
  const location = document.getElementById("location").value;
  const meal = document.getElementById("meal").value;

  if (location === "") {
    alert("Please select your location");
    return;
  }

  window.location.href =
    "customer/menu.html?location=" +
    encodeURIComponent(location) +
    "&meal=" +
    encodeURIComponent(meal);
}
