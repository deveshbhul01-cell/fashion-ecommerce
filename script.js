let cart =
    JSON.parse(localStorage.getItem("stylehub-cart")) || [];


/* =========================
   SAVE CART
========================= */

function saveCart() {

    localStorage.setItem(
        "stylehub-cart",
        JSON.stringify(cart)
    );

}


/* =========================
   ADD TO CART
========================= */

function addToCart(name, price, image) {

    const existing =
        cart.find(item => item.name === name);


    if (existing) {

        existing.quantity++;

    } else {

        cart.push({

            name: name,

            price: price,

            image: image,

            quantity: 1

        });

    }


    saveCart();

    updateCart();


    alert(
        name + " added to cart 🛒"
    );

}


/* =========================
   UPDATE CART
========================= */

function updateCart() {

    const count =
        cart.reduce(
            (total, item) =>
                total + item.quantity,
            0
        );


    const countElement =
        document.getElementById("cart-count");


    if (countElement) {

        countElement.textContent = count;

    }


    const cartItems =
        document.getElementById("cart-items");


    const totalElement =
        document.getElementById("cart-total");


    if (!cartItems) return;


    cartItems.innerHTML = "";


    let total = 0;


    cart.forEach((item, index) => {

        total +=
            item.price * item.quantity;


        cartItems.innerHTML += `

            <div class="cart-item">

                <img
                    src="${item.image}"
                    alt="${item.name}"
                >

                <div>

                    <h4>
                        ${item.name}
                    </h4>

                    <p>
                        ₹${item.price}
                    </p>

                    <div class="quantity">

                        <button
                            onclick="changeQuantity(${index}, -1)"
                        >
                            −
                        </button>

                        <span>
                            ${item.quantity}
                        </span>

                        <button
                            onclick="changeQuantity(${index}, 1)"
                        >
                            +
                        </button>

                    </div>

                </div>


                <button
                    class="remove"
                    onclick="removeItem(${index})"
                >
                    ✕
                </button>

            </div>

        `;

    });


    if (totalElement) {

        totalElement.textContent =
            total.toLocaleString("en-IN");

    }

}


/* =========================
   CHANGE QUANTITY
========================= */

function changeQuantity(index, change) {

    if (!cart[index]) return;


    cart[index].quantity += change;


    if (cart[index].quantity <= 0) {

        cart.splice(index, 1);

    }


    saveCart();

    updateCart();

}


/* =========================
   REMOVE ITEM
========================= */

function removeItem(index) {

    if (!cart[index]) return;


    cart.splice(index, 1);


    saveCart();

    updateCart();

}


/* =========================
   OPEN CART
========================= */

function openCart() {

    const modal =
        document.getElementById("cart-modal");


    if (modal) {

        modal.classList.add("active");

    }


    updateCart();

}


/* =========================
   CLOSE CART
========================= */

function closeCart() {

    const modal =
        document.getElementById("cart-modal");


    if (modal) {

        modal.classList.remove("active");

    }

}


/* =========================
   CHECKOUT
========================= */

function checkout() {

    if (cart.length === 0) {

        alert(
            "Your cart is empty."
        );

        return;

    }


    window.location.href =
        "checkout.html";

}


/* =========================
   LOAD USER
========================= */

async function loadUser() {

    if (
        typeof supabaseClient ===
        "undefined"
    ) {

        return;

    }


    const {
        data: { user }
    } =
        await supabaseClient.auth.getUser();


    const accountLink =
        document.getElementById(
            "account-link"
        );


    if (!accountLink) return;


    if (user) {

        const name =
            user.user_metadata?.full_name ||
            user.email.split("@")[0];


        accountLink.textContent =
            "👤 " + name;


        accountLink.href = "#";


        accountLink.onclick =
            async function(event) {

                event.preventDefault();


                const shouldLogout =
                    confirm(
                        "Do you want to logout?"
                    );


                if (shouldLogout) {

                    await logoutUser();

                }

            };

    }

}


/* =========================
   LOGOUT
========================= */

async function logoutUser() {

    if (
        typeof supabaseClient ===
        "undefined"
    ) {

        window.location.href =
            "login.html";

        return;

    }


    const { error } =
        await supabaseClient.auth.signOut();


    if (error) {

        alert(error.message);

        return;

    }


    window.location.href =
        "index.html";

}


/* =========================
   PAGE LOAD
========================= */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        updateCart();

        loadUser();

    }
);
