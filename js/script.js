// =========================================================
// SMART TIFFIN - MAIN JAVASCRIPT
// =========================================================


// =========================================================
// MOBILE MENU
// =========================================================

const menu = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav-links");

if (menu && nav) {

    menu.addEventListener("click", () => {
        nav.classList.toggle("active");
    });

}


// =========================================================
// ACTIVE NAVBAR LINK
// =========================================================

const links = document.querySelectorAll(".nav-links a");

if (links.length > 0) {

    links.forEach(link => {

        link.addEventListener("click", () => {

            links.forEach(item => {
                item.classList.remove("active");
            });

            link.classList.add("active");

            if (nav) {
                nav.classList.remove("active");
            }

        });

    });

}


// =========================================================
// SMOOTH SCROLL
// =========================================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {

    anchor.addEventListener("click", function (e) {

        const target = document.querySelector(
            this.getAttribute("href")
        );

        if (target) {

            e.preventDefault();

            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        }

    });

});


// =========================================================
// CUSTOMER ORDER PAGE
// =========================================================

const orderForm = document.getElementById("orderForm");
const tiffin = document.getElementById("tiffin");
const quantity = document.getElementById("quantity");

const summaryMeal = document.getElementById("summaryMeal");
const summaryQuantity = document.getElementById("summaryQuantity");
const mealPrice = document.getElementById("mealPrice");
const quantityPrice = document.getElementById("quantityPrice");
const totalPrice = document.getElementById("totalPrice");


// Meal prices

const mealPrices = {

    "Classic Veg Tiffin": 99,

    "Paneer Meal": 120,

    "Special Thali": 150

};


// Update order summary

function updateOrderSummary() {

    if (!tiffin || !quantity) {
        return;
    }


    const selectedMeal = tiffin.value;

    const selectedQuantity =
        parseInt(quantity.value) || 1;


    const price =
        mealPrices[selectedMeal] || 0;


    const total =
        price * selectedQuantity;


    // Meal name

    if (summaryMeal) {

        summaryMeal.textContent =
            selectedMeal || "Select a meal";

    }


    // Quantity

    if (summaryQuantity) {

        summaryQuantity.textContent =
            "Quantity: " + selectedQuantity;

    }


    // Meal price

    if (mealPrice) {

        mealPrice.textContent =
            "₹" + price;

    }


    // Quantity

    if (quantityPrice) {

        quantityPrice.textContent =
            selectedQuantity;

    }


    // Total

    if (totalPrice) {

        totalPrice.textContent =
            "₹" + total;

    }

}


// Run when meal changes

if (tiffin) {

    tiffin.addEventListener(
        "change",
        updateOrderSummary
    );

}


// Run when quantity changes

if (quantity) {

    quantity.addEventListener(
        "change",
        updateOrderSummary
    );

}


// Initial summary

updateOrderSummary();


// =========================================================
// PREVENT PAST DELIVERY DATE
// =========================================================

const deliveryDate =
    document.getElementById("deliveryDate");

if (deliveryDate) {

    const today =
        new Date().toISOString().split("T")[0];

    deliveryDate.min = today;

}


// =========================================================
// PLACE ORDER
// =========================================================

if (orderForm) {

    orderForm.addEventListener(
        "submit",
        function (e) {

            e.preventDefault();


            const name =
                document.getElementById("fullName")?.value.trim();

            const selectedMeal =
                tiffin?.value;

            const selectedQuantity =
                quantity?.value || 1;


            if (!name || !selectedMeal) {

                alert(
                    "Please enter your details and select a meal."
                );

                return;

            }


            const price =
                mealPrices[selectedMeal] || 0;

            const total =
                price * parseInt(selectedQuantity);


            alert(
                "Order placed successfully! 🍱\n\n" +
                "Customer: " + name + "\n" +
                "Meal: " + selectedMeal + "\n" +
                "Quantity: " + selectedQuantity + "\n" +
                "Total: ₹" + total
            );


            orderForm.reset();

            updateOrderSummary();

        }
    );

}


// =========================================================
// HOMEPAGE SEARCH
// =========================================================

const searchBtn =
    document.getElementById("searchBtn");

if (searchBtn) {

    searchBtn.addEventListener(
        "click",
        function () {

            const location =
                document.getElementById("locationInput")?.value.trim();

            const foodType =
                document.getElementById("foodType")?.value;


            if (!location) {

                alert(
                    "Please enter your location."
                );

                return;

            }


            alert(
                "Searching for " +
                foodType +
                " tiffin meals near " +
                location +
                " 🍱"
            );


            // Open menu page

            window.location.href = "menu.html";

        }
    );

}


// =========================================================
// CONTACT FORM
// =========================================================

const contactForm =
    document.getElementById("contactForm");

if (contactForm) {

    contactForm.addEventListener(
        "submit",
        function (e) {

            e.preventDefault();


            const name =
                contactForm.querySelector(
                    'input[name="name"]'
                )?.value.trim();


            if (!name) {

                alert(
                    "Please enter your name."
                );

                return;

            }


            alert(
                "Thank you, " +
                name +
                "! ❤️\n\n" +
                "Your message has been received."
            );


            contactForm.reset();

        }
    );

}


// =========================================================
// CONSOLE MESSAGE
// =========================================================

console.log(
    "Smart Tiffin website loaded successfully 🍱"
);
// =========================================================
// LOGIN PAGE
// =========================================================

const loginForm = document.getElementById("loginForm");

const togglePassword =
    document.getElementById("togglePassword");

const loginPassword =
    document.getElementById("loginPassword");

if (togglePassword && loginPassword) {

    togglePassword.addEventListener("click", function () {

        if (loginPassword.type === "password") {

            loginPassword.type = "text";
            togglePassword.textContent = "Hide";

        } else {

            loginPassword.type = "password";
            togglePassword.textContent = "Show";

        }

    });

}

if (loginForm) {

    loginForm.addEventListener("submit", function (e) {

        e.preventDefault();

        const email =
            document.getElementById("loginEmail").value.trim();

        if (!email) {
            alert("Please enter your email.");
            return;
        }

        alert(
            "Login successful! 🍱\n\n" +
            "Welcome to Smart Tiffin."
        );

        window.location.href = "customer.html";

    });

}
// =========================================================
// REGISTER PAGE
// =========================================================

const registerForm =
    document.getElementById("registerForm");

const toggleRegisterPassword =
    document.getElementById("toggleRegisterPassword");

const registerPassword =
    document.getElementById("registerPassword");

const confirmPassword =
    document.getElementById("confirmPassword");

if (toggleRegisterPassword && registerPassword) {

    toggleRegisterPassword.addEventListener(
        "click",
        function () {

            if (registerPassword.type === "password") {

                registerPassword.type = "text";
                toggleRegisterPassword.textContent = "Hide";

            } else {

                registerPassword.type = "password";
                toggleRegisterPassword.textContent = "Show";

            }

        }
    );

}

if (registerForm) {

    registerForm.addEventListener(
        "submit",
        function (e) {

            e.preventDefault();

            const name =
                document.getElementById("registerName").value.trim();

            const password =
                registerPassword.value;

            const confirm =
                confirmPassword.value;

            if (password !== confirm) {

                alert(
                    "Passwords do not match."
                );

                return;

            }

            alert(
                "Account created successfully! 🎉\n\n" +
                "Welcome to Smart Tiffin, " +
                name +
                "!"
            );

            window.location.href = "login.html";

        }
    );

}
// =========================================================
// SIGN UP PAGE
// =========================================================

const signupForm =
    document.getElementById("signupForm");

const toggleSignupPassword =
    document.getElementById("toggleSignupPassword");

const signupPassword =
    document.getElementById("signupPassword");

if (toggleSignupPassword && signupPassword) {

    toggleSignupPassword.addEventListener(
        "click",
        function () {

            if (signupPassword.type === "password") {

                signupPassword.type = "text";

                toggleSignupPassword.textContent = "Hide";

            } else {

                signupPassword.type = "password";

                toggleSignupPassword.textContent = "Show";

            }

        }
    );

}

if (signupForm) {

    signupForm.addEventListener(
        "submit",
        function (e) {

            e.preventDefault();

            const name =
                document
                .getElementById("signupName")
                .value
                .trim();

            const role =
                document
                .getElementById("signupRole")
                .value;

            if (!role) {

                alert(
                    "Please select your account type."
                );

                return;

            }

            alert(
                "Account created successfully! 🎉\n\n" +
                "Welcome, " +
                name +
                "!"
            );

            window.location.href = "login.html";

        }
    );

}
// =========================================================
// ADMIN PAGE
// =========================================================

const adminFoodForm =
    document.getElementById("adminFoodForm");

if (adminFoodForm) {

    adminFoodForm.addEventListener(
        "submit",
        function (e) {

            e.preventDefault();

            const foodName =
                document.getElementById("foodName")
                .value
                .trim();

            const price =
                document.getElementById("foodPrice")
                .value;

            if (!foodName || !price) {

                alert(
                    "Please enter food name and price."
                );

                return;

            }

            alert(
                "Meal added successfully! 🍱\n\n" +
                foodName +
                " — ₹" +
                price
            );

            adminFoodForm.reset();

        }
    );

}
