let cart = [];
let wishlist = [];

/* ================= CART ================= */

function addToCart(name, price) {

    const existingProduct = cart.find(
        product => product.name === name
    );

    if (existingProduct) {
        existingProduct.quantity++;
    } else {
        cart.push({
            name: name,
            price: price,
            quantity: 1
        });
    }

    updateCart();

    alert(name + " added to cart!");
}


function updateCart() {

    const cartItems = document.getElementById("cart-items");
    const cartTotal = document.getElementById("cart-total");
    const navCartCount = document.getElementById("nav-cart-count");

    if (!cartItems) return;

    cartItems.innerHTML = "";

    let total = 0;
    let itemCount = 0;

    if (cart.length === 0) {

        cartItems.innerHTML =
            '<p class="empty-cart">Your cart is empty.</p>';

    } else {

        cart.forEach(function(product, index) {

            total += product.price * product.quantity;
            itemCount += product.quantity;

            const item = document.createElement("div");

            item.className = "cart-item";

            item.innerHTML = `
                <div>
                    <strong>${product.name}</strong>
                    <p>₹${product.price} each</p>
                </div>

                <div class="quantity-controls">

                    <button onclick="changeQuantity(${index}, -1)">
                        −
                    </button>

                    <span>${product.quantity}</span>

                    <button onclick="changeQuantity(${index}, 1)">
                        +
                    </button>

                </div>

                <strong>
                    ₹${product.price * product.quantity}
                </strong>

                <button
                    class="remove-btn"
                    onclick="removeFromCart(${index})"
                >
                    Remove
                </button>
            `;

            cartItems.appendChild(item);
        });
    }

    cartTotal.textContent = total;

    if (navCartCount) {
        navCartCount.textContent = itemCount;
    }
}


/* ================= QUANTITY ================= */

function changeQuantity(index, change) {

    cart[index].quantity += change;

    if (cart[index].quantity <= 0) {
        cart.splice(index, 1);
    }

    updateCart();
}


/* ================= REMOVE ================= */

function removeFromCart(index) {

    cart.splice(index, 1);

    updateCart();
}


/* ================= SEARCH ================= */

function searchProducts() {

    const searchInput =
        document.getElementById("search");

    const searchValue =
        searchInput.value.toLowerCase();

    const products =
        document.querySelectorAll(".product");

    products.forEach(function(product) {

        const productName =
            product.innerText.toLowerCase();

        if (productName.includes(searchValue)) {
            product.style.display = "";
        } else {
            product.style.display = "none";
        }
    });
}


/* ================= CATEGORY FILTER ================= */

function filterProducts(category) {

    const products =
        document.querySelectorAll(".product");

    products.forEach(function(product) {

        const productCategory =
            product.getAttribute("data-category");

        if (
            category === "all" ||
            productCategory === category
        ) {
            product.style.display = "";
        } else {
            product.style.display = "none";
        }
    });

    scrollToShop();
}


/* ================= WISHLIST ================= */

function toggleWishlist(name) {

    const index = wishlist.indexOf(name);

    if (index === -1) {

        wishlist.push(name);

        alert(name + " added to wishlist ❤️");

    } else {

        wishlist.splice(index, 1);

        alert(name + " removed from wishlist.");
    }

    updateWishlist();
}


function updateWishlist() {

    const wishlistItems =
        document.getElementById("wishlist-items");

    if (!wishlistItems) return;

    wishlistItems.innerHTML = "";

    if (wishlist.length === 0) {

        wishlistItems.innerHTML =
            "<p>No items in wishlist.</p>";

        return;
    }

    wishlist.forEach(function(name) {

        const item =
            document.createElement("div");

        item.className = "wishlist-item";

        item.innerHTML = `
            ❤️ ${name}
        `;

        wishlistItems.appendChild(item);
    });
}


function showWishlist() {

    document
        .getElementById("wishlist")
        .scrollIntoView({
            behavior: "smooth"
        });
}


/* ================= NAVIGATION ================= */

function scrollToCart() {

    document
        .getElementById("cart")
        .scrollIntoView({
            behavior: "smooth"
        });
}


function scrollToShop() {

    document
        .getElementById("shop")
        .scrollIntoView({
            behavior: "smooth"
        });
}


/* ================= CHECKOUT ================= */

function openCheckout() {

    if (cart.length === 0) {

        alert(
            "Your cart is empty. Add a product first!"
        );

        return;
    }

    document.getElementById(
        "checkout-modal"
    ).style.display = "flex";
}


function closeCheckout() {

    document.getElementById(
        "checkout-modal"
    ).style.display = "none";
}


/* ================= PLACE ORDER ================= */

function placeOrder(event) {

    event.preventDefault();

    const name =
        document.getElementById(
            "customer-name"
        ).value;

    if (!name) {
        alert("Please enter your name.");
        return;
    }

    cart = [];

    updateCart();

    closeCheckout();

    document.getElementById(
        "success-modal"
    ).style.display = "flex";
}


/* ================= SUCCESS ================= */

function closeSuccess() {

    document.getElementById(
        "success-modal"
    ).style.display = "none";

    scrollToShop();
}


/* ================= MODAL CLOSE ================= */

window.onclick = function(event) {

    const checkout =
        document.getElementById(
            "checkout-modal"
        );

    const success =
        document.getElementById(
            "success-modal"
        );

    if (event.target === checkout) {
        checkout.style.display = "none";
    }

    if (event.target === success) {
        success.style.display = "none";
    }
};


/* ================= INITIALIZE ================= */

updateCart();
