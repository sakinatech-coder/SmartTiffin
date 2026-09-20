// =========================================================
// SMART TIFFIN - COMPLETE JAVASCRIPT
// Supabase + Website Functions
// =========================================================


// =========================================================
// SUPABASE CONNECTION
// =========================================================

const SUPABASE_URL =
    "https://fwtsiwskybswydtjoxtq.supabase.co";

const SUPABASE_KEY =
    "sb_publishable_ivmhhFGq_a4by4s8ZyiV2g_tg4epxUJ";

const supabaseClient =
    window.supabase.createClient(
        SUPABASE_URL,
        SUPABASE_KEY
    );

console.log("Supabase connected successfully!");


// =========================================================
// PAGE LOAD
// =========================================================

document.addEventListener("DOMContentLoaded", function () {

    console.log("Smart Tiffin website loaded successfully 🍱");


    // =====================================================
    // SMOOTH SCROLL
    // =====================================================

    document.querySelectorAll('a[href^="#"]').forEach(function (link) {

        link.addEventListener("click", function (e) {

            const targetId =
                this.getAttribute("href");

            if (
                targetId &&
                targetId !== "#" &&
                document.querySelector(targetId)
            ) {

                e.preventDefault();

                document.querySelector(targetId)
                    .scrollIntoView({
                        behavior: "smooth"
                    });
            }

        });

    });


    // =====================================================
    // CUSTOMER ORDER FORM
    // =====================================================

    const orderForm =
        document.getElementById("orderForm");


    if (orderForm) {

        const mealSelect =
            document.getElementById("meal");

        const quantityInput =
            document.getElementById("quantity");

        const orderSummary =
            document.getElementById("orderSummary");

        const summaryMeal =
            document.getElementById("summaryMeal");

        const summaryPrice =
            document.getElementById("summaryPrice");

        const summaryQuantity =
            document.getElementById("summaryQuantity");

        const summaryTotal =
            document.getElementById("summaryTotal");


        // -----------------------------------------------
        // MEAL PRICES
        // -----------------------------------------------

        const mealPrices = {

            "Classic Veg Tiffin": 99,

            "Veg Tiffin": 99,

            "Paneer Meal": 120,

            "Special Thali": 150

        };


        // -----------------------------------------------
        // UPDATE ORDER SUMMARY
        // -----------------------------------------------

        function updateOrderSummary() {

            if (!mealSelect) {
                return;
            }


            const selectedMeal =
                mealSelect.value;

            const quantity =
                quantityInput
                    ? parseInt(quantityInput.value) || 1
                    : 1;


            const price =
                mealPrices[selectedMeal] || 0;


            const total =
                price * quantity;


            if (summaryMeal) {

                summaryMeal.textContent =
                    selectedMeal || "Not selected";

            }


            if (summaryPrice) {

                summaryPrice.textContent =
                    "₹" + price;

            }


            if (summaryQuantity) {

                summaryQuantity.textContent =
                    quantity;

            }


            if (summaryTotal) {

                summaryTotal.textContent =
                    "₹" + total;

            }


            if (orderSummary) {

                orderSummary.style.display =
                    selectedMeal
                        ? "block"
                        : "none";

            }

        }


        if (mealSelect) {

            mealSelect.addEventListener(
                "change",
                updateOrderSummary
            );

        }


        if (quantityInput) {

            quantityInput.addEventListener(
                "input",
                updateOrderSummary
            );

        }


        updateOrderSummary();


        // -----------------------------------------------
        // ORDER SUBMIT
        // -----------------------------------------------

        orderForm.addEventListener(
            "submit",
            async function (e) {

                e.preventDefault();


                const nameInput =
                    document.getElementById("name") ||
                    document.getElementById("customerName");

                const phoneInput =
                    document.getElementById("phone") ||
                    document.getElementById("customerPhone");

                const addressInput =
                    document.getElementById("address") ||
                    document.getElementById("customerAddress");

                const dateInput =
                    document.getElementById("deliveryDate") ||
                    document.getElementById("orderDate");

                const instructionsInput =
                    document.getElementById("instructions");


                const name =
                    nameInput
                        ? nameInput.value.trim()
                        : "";

                const phone =
                    phoneInput
                        ? phoneInput.value.trim()
                        : "";

                const address =
                    addressInput
                        ? addressInput.value.trim()
                        : "";

                const selectedMeal =
                    mealSelect
                        ? mealSelect.value
                        : "";

                const quantity =
                    quantityInput
                        ? parseInt(quantityInput.value) || 1
                        : 1;

                const orderDate =
                    dateInput
                        ? dateInput.value
                        : "";


                // -------------------------------------------
                // VALIDATION
                // -------------------------------------------

                if (!name) {

                    alert("Please enter your name.");

                    return;

                }


                if (!phone) {

                    alert("Please enter your phone number.");

                    return;

                }


                if (!address) {

                    alert("Please enter your address.");

                    return;

                }


                if (!selectedMeal) {

                    alert("Please select a meal.");

                    return;

                }


                // -------------------------------------------
                // FIND FOOD ID FROM DATABASE
                // -------------------------------------------

                let foodName =
                    selectedMeal;


                if (selectedMeal === "Classic Veg Tiffin") {

                    foodName = "Veg Tiffin";

                }


                try {

                    // ---------------------------------------
                    // GET FOOD FROM MENU TABLE
                    // ---------------------------------------

                    const {
                        data: menuData,
                        error: menuError
                    } = await supabaseClient
                        .from("menu")
                        .select("id, food_name, price")
                        .eq("food_name", foodName)
                        .single();


                    if (menuError) {

                        console.error(
                            "Menu error:",
                            menuError
                        );

                        alert(
                            "Meal could not be found in database."
                        );

                        return;

                    }


                    // ---------------------------------------
                    // INSERT CUSTOMER
                    // ---------------------------------------

                    const {
                        data: customerData,
                        error: customerError
                    } = await supabaseClient
                        .from("customers")
                        .insert([
                            {
                                name: name,
                                phone: phone,
                                address: address
                            }
                        ])
                        .select()
                        .single();


                    if (customerError) {

                        console.error(
                            "Customer error:",
                            customerError
                        );

                        alert(
                            "Customer information could not be saved."
                        );

                        return;

                    }


                    // ---------------------------------------
                    // INSERT ORDER
                    // ---------------------------------------

                    const {
                        data: orderData,
                        error: orderError
                    } = await supabaseClient
                        .from("orders")
                        .insert([
                            {
                                customer_id:
                                    customerData.id,

                                food_id:
                                    menuData.id,

                                order_date:
                                    orderDate ||
                                    new Date()
                                        .toISOString()
                                        .split("T")[0]
                            }
                        ])
                        .select()
                        .single();


                    if (orderError) {

                        console.error(
                            "Order error:",
                            orderError
                        );

                        alert(
                            "Order could not be saved."
                        );

                        return;

                    }


                    // ---------------------------------------
                    // SUCCESS
                    // ---------------------------------------

                    const total =
                        (menuData.price || 0) *
                        quantity;


                    alert(
                        "Order placed successfully! 🍱\n\n" +
                        "Customer: " + name +
                        "\nMeal: " + menuData.food_name +
                        "\nQuantity: " + quantity +
                        "\nTotal: ₹" + total +
                        "\n\nOrder ID: " + orderData.id
                    );


                    // Clear form

                    orderForm.reset();

                    updateOrderSummary();


                } catch (error) {

                    console.error(
                        "Order submission error:",
                        error
                    );

                    alert(
                        "Something went wrong. Please try again."
                    );

                }

            }
        );

    }


    // =====================================================
    // SET MINIMUM DELIVERY DATE
    // =====================================================

    const deliveryDate =
        document.getElementById("deliveryDate");


    if (deliveryDate) {

        const today =
            new Date()
                .toISOString()
                .split("T")[0];

        deliveryDate.min = today;

    }


    // =====================================================
    // HOMEPAGE SEARCH
    // =====================================================

    const searchInput =
        document.getElementById("searchInput");

    const searchButton =
        document.getElementById("searchButton");


    function performSearch() {

        if (!searchInput) {
            return;
        }


        const searchText =
            searchInput.value
                .trim()
                .toLowerCase();


        if (!searchText) {

            alert(
                "Please search for a meal or tiffin."
            );

            return;

        }


        const menuItems =
            document.querySelectorAll(
                ".provider-card, .food-card, .meal-card"
            );


        let found = false;


        menuItems.forEach(function (item) {

            if (
                item.textContent
                    .toLowerCase()
                    .includes(searchText)
            ) {

                item.scrollIntoView({
                    behavior: "smooth",
                    block: "center"
                });

                found = true;

            }

        });


        if (!found) {

            alert(
                "No matching meal found."
            );

        }

    }


    if (searchButton) {

        searchButton.addEventListener(
            "click",
            performSearch
        );

    }


    if (searchInput) {

        searchInput.addEventListener(
            "keydown",
            function (e) {

                if (e.key === "Enter") {

                    performSearch();

                }

            }
        );

    }


    // =====================================================
    // CONTACT FORM
    // =====================================================

    const contactForm =
        document.getElementById("contactForm");


    if (contactForm) {

        contactForm.addEventListener(
            "submit",
            function (e) {

                e.preventDefault();

                alert(
                    "Thank you! Your message has been received. 💚"
                );

                contactForm.reset();

            }
        );

    }


    // =====================================================
    // LOGIN FORM
    // =====================================================

    const loginForm =
        document.getElementById("loginForm");


    if (loginForm) {

        loginForm.addEventListener(
            "submit",
            function (e) {

                e.preventDefault();


                const emailInput =
                    document.getElementById("email");

                const passwordInput =
                    document.getElementById("password");


                const email =
                    emailInput
                        ? emailInput.value.trim()
                        : "";

                const password =
                    passwordInput
                        ? passwordInput.value
                        : "";


                if (!email || !password) {

                    alert(
                        "Please enter email and password."
                    );

                    return;

                }


                alert(
                    "Login successful! Welcome to Smart Tiffin. 🍱"
                );


                window.location.href =
                    "customer.html";

            }
        );

    }


    // =====================================================
    // PASSWORD TOGGLE
    // =====================================================

    document.querySelectorAll(
        ".password-toggle, #togglePassword"
    ).forEach(function (button) {

        button.addEventListener(
            "click",
            function () {

                const passwordInput =
                    document.getElementById("password");


                if (!passwordInput) {
                    return;
                }


                if (
                    passwordInput.type ===
                    "password"
                ) {

                    passwordInput.type =
                        "text";

                    this.textContent =
                        "Hide";

                } else {

                    passwordInput.type =
                        "password";

                    this.textContent =
                        "Show";

                }

            }
        );

    });


    // =====================================================
    // REGISTER FORM
    // =====================================================

    const registerForm =
        document.getElementById("registerForm");


    if (registerForm) {

        registerForm.addEventListener(
            "submit",
            function (e) {

                e.preventDefault();


                const password =
                    document.getElementById("password");

                const confirmPassword =
                    document.getElementById(
                        "confirmPassword"
                    );


                if (
                    password &&
                    confirmPassword &&
                    password.value !==
                    confirmPassword.value
                ) {

                    alert(
                        "Passwords do not match."
                    );

                    return;

                }


                alert(
                    "Account created successfully! 🎉"
                );


                window.location.href =
                    "login.html";

            }
        );

    }


    // =====================================================
    // SIGNUP FORM
    // =====================================================

    const signupForm =
        document.getElementById("signupForm");


    if (signupForm) {

        signupForm.addEventListener(
            "submit",
            function (e) {

                e.preventDefault();


                const password =
                    document.getElementById("password");

                const confirmPassword =
                    document.getElementById(
                        "confirmPassword"
                    );


                if (
                    password &&
                    confirmPassword &&
                    password.value !==
                    confirmPassword.value
                ) {

                    alert(
                        "Passwords do not match."
                    );

                    return;

                }


                const role =
                    document.getElementById("role");


                if (
                    role &&
                    !role.value
                ) {

                    alert(
                        "Please select your role."
                    );

                    return;

                }


                alert(
                    "Signup completed successfully! 🎉"
                );


                window.location.href =
                    "login.html";

            }
        );

    }


    // =====================================================
    // ADMIN FOOD FORM
    // =====================================================

    const foodForm =
        document.getElementById("foodForm");


    if (foodForm) {

        foodForm.addEventListener(
            "submit",
            async function (e) {

                e.preventDefault();


                const foodNameInput =
                    document.getElementById(
                        "foodName"
                    );

                const priceInput =
                    document.getElementById(
                        "price"
                    );


                const foodName =
                    foodNameInput
                        ? foodNameInput.value.trim()
                        : "";

                const price =
                    priceInput
                        ? parseInt(priceInput.value)
                        : 0;


                if (!foodName || !price) {

                    alert(
                        "Please enter food name and price."
                    );

                    return;

                }


                try {

                    const {
                        error
                    } = await supabaseClient
                        .from("menu")
                        .insert([
                            {
                                food_name:
                                    foodName,

                                price:
                                    price
                            }
                        ]);


                    if (error) {

                        console.error(error);

                        alert(
                            "Food could not be added."
                        );

                        return;

                    }


                    alert(
                        "Food added successfully! 🍱"
                    );


                    foodForm.reset();


                } catch (error) {

                    console.error(error);

                    alert(
                        "Something went wrong."
                    );

                }

            }
        );

    }


    // =====================================================
    // FOOD IMAGE GALLERY
    // =====================================================

    const galleries =
        document.querySelectorAll(
            ".food-gallery"
        );


    galleries.forEach(function (gallery) {

        const mainImage =
            gallery.querySelector(
                ".main-food-image"
            );


        const galleryImages =
            gallery.querySelector(
                ".gallery-images"
            );


        if (
            !mainImage ||
            !galleryImages
        ) {

            return;

        }


        let hideTimer;


        // -----------------------------------------------
        // MAIN IMAGE CLICK
        // -----------------------------------------------

        mainImage.addEventListener(
            "click",
            function () {

                gallery.classList.add(
                    "show-gallery"
                );


                clearTimeout(hideTimer);


                hideTimer =
                    setTimeout(
                        function () {

                            gallery.classList.remove(
                                "show-gallery"
                            );

                        },
                        4000
                    );

            }
        );


        // -----------------------------------------------
        // THUMBNAIL CLICK
        // -----------------------------------------------

        const thumbnails =
            galleryImages.querySelectorAll(
                "img"
            );


        thumbnails.forEach(
            function (thumbnail) {

                thumbnail.addEventListener(
                    "click",
                    function (e) {

                        e.stopPropagation();


                        mainImage.src =
                            thumbnail.src;


                        mainImage.alt =
                            thumbnail.alt;


                        gallery.classList.add(
                            "show-gallery"
                        );


                        clearTimeout(
                            hideTimer
                        );


                        hideTimer =
                            setTimeout(
                                function () {

                                    gallery.classList.remove(
                                        "show-gallery"
                                    );

                                },
                                4000
                            );

                    }
                );

            }
        );

    });


    // =====================================================
    // FINISH
    // =====================================================

    console.log(
        "Smart Tiffin website loaded successfully 🍱"
    );

});
