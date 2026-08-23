let cart =
    JSON.parse(localStorage.getItem("stylehub-cart")) || [];

let wishlist =
    JSON.parse(localStorage.getItem("stylehub-wishlist")) || [];


/* SAVE */

function saveData() {

    localStorage.setItem(
        "stylehub-cart",
        JSON.stringify(cart)
    );

    localStorage.setItem(
        "stylehub-wishlist",
        JSON.stringify(wishlist)
    );
}


/* CART */

function addToCart(name, price) {

    let product = cart.find(
        item => item.name === name
    );

    if (product) {

        product.quantity++;

    } else {

        cart.push({
            name: name,
            price: price,
            quantity: 1
        });
    }

    saveData();
    updateCart();

    alert(name + " added to cart!");
}


function updateCart() {

    const container =
        document.getElementById("cart-items");

    const totalElement =
        document.getElementById("cart-total");

    const countElement =
        document.getElementById("cart-count");

    if (!container) return;

    container.innerHTML = "";

    let total = 0;
    let count = 0;


    if (cart.length === 0) {

        container.innerHTML =
            '<p class="empty-cart">Your cart is empty.</p>';

    } else {

        cart.forEach((item, index) => {

            const itemTotal =
                item.price * item.quantity;

            total += itemTotal;
            count += item.quantity;


            const div =
                document.createElement("div");

            div.className = "cart-item";

            div.innerHTML = `

                <div>
                    <div class="cart-item-name">
                        ${item.name}
                    </div>

                    <div class="cart-item-price">
                        ₹${item.price} each
                    </div>
                </div>

                <div class="quantity-controls">

                    <button
                        onclick="changeQuantity(${index}, -1)"
                    >
                        −
                    </button>

                    <strong>
                        ${item.quantity}
                    </strong>

                    <button
                        onclick="changeQuantity(${index}, 1)"
                    >
                        +
                    </button>

                </div>

                <strong>
                    ₹${itemTotal}
                </strong>

                <button
                    class="remove-btn"
                    onclick="removeFromCart(${index})"
                >
                    Remove
                </button>

            `;

            container.appendChild(div);
        });
    }


    totalElement.textContent = total;

    countElement.textContent = count;
}


/* QUANTITY */

function changeQuantity(index, amount) {

    if (!cart[index]) return;

    cart[index].quantity += amount;

    if (cart[index].quantity <= 0) {

        cart.splice(index, 1);
    }

    saveData();
    updateCart();
}


/* REMOVE */

function removeFromCart(index) {

    cart.splice(index, 1);

    saveData();
    updateCart();
}


function openCart() {

    document
        .getElementById("cart")
        .scrollIntoView({
            behavior: "smooth"
        });
}


/* SEARCH */

function searchProducts() {

    const search =
        document
            .getElementById("search")
            .value
            .toLowerCase()
            .trim();

    const products =
        document.querySelectorAll(".product-card");

    let found = 0;


    products.forEach(product => {

        const text =
            product.innerText.toLowerCase();

        if (text.includes(search)) {

            product.style.display = "";
            found++;

        } else {

            product.style.display = "none";
        }
    });


    document.getElementById(
        "no-products"
    ).style.display =
        found === 0 ? "block" : "none";
}


/* FILTER */

function filterProducts(category) {

    const products =
        document.querySelectorAll(".product-card");

    let found = 0;


    products.forEach(product => {

        const productCategory =
            product.dataset.category;


        if (
            category === "all" ||
            productCategory === category
        ) {

            product.style.display = "";
            found++;

        } else {

            product.style.display = "none";
        }
    });


    document.getElementById(
        "no-products"
    ).style.display =
        found === 0 ? "block" : "none";


    goToShop();
}


/* WISHLIST */

function toggleWishlist(name, price) {

    const existing =
        wishlist.find(
            item => item.name === name
        );


    if (existing) {

        wishlist =
            wishlist.filter(
                item => item.name !== name
            );

    } else {

        wishlist.push({
            name: name,
            price: price
        });
    }


    saveData();
    updateWishlist();
}


function updateWishlist() {

    const container =
        document.getElementById(
            "wishlist-items"
        );

    const count =
        document.getElementById(
            "wishlist-count"
        );

    if (!container) return;


    count.textContent = wishlist.length;

    container.innerHTML = "";


    if (wishlist.length === 0) {

        container.innerHTML =
            "<p>No items in wishlist.</p>";

        return;
    }


    wishlist.forEach((item, index) => {

        const div =
            document.createElement("div");

        div.className =
            "wishlist-item";


        div.innerHTML = `

            <strong>
                ❤️ ${item.name}
            </strong>

            <span>
                ₹${item.price}
            </span>

            <button
                class="wishlist-remove"
                onclick="removeWishlist(${index})"
            >
                Remove
            </button>

        `;

        container.appendChild(div);
    });
}


function removeWishlist(index) {

    wishlist.splice(index, 1);

    saveData();
    updateWishlist();
}


function openWishlist() {

    document
        .getElementById("wishlist")
        .scrollIntoView({
            behavior: "smooth"
        });
}


/* NAVIGATION */

function goToShop() {

    document
        .getElementById("shop")
        .scrollIntoView({
            behavior: "smooth"
        });
}


/* CHECKOUT */

function checkout() {

    if (cart.length === 0) {

        alert(
            "Your cart is empty. Please add a product first."
        );

        return;
    }


    document
        .getElementById("checkout-modal")
        .style.display = "flex";
}


function closeCheckout() {

    document
        .getElementById("checkout-modal")
        .style.display = "none";
}


/* ORDER */

document
    .getElementById("checkout-form")
    .addEventListener(
        "submit",
        function(event) {

            event.preventDefault();


            const name =
                document
                    .getElementById("customer-name")
                    .value
                    .trim();


            const phone =
                document
                    .getElementById("customer-phone")
                    .value
                    .trim();


            const address =
                document
                    .getElementById("customer-address")
                    .value
                    .trim();


            if (!name || !phone || !address) {

                alert(
                    "Please fill all required details."
                );

                return;
            }


            cart = [];

            saveData();
            updateCart();

            closeCheckout();


            document
                .getElementById("success-modal")
                .style.display = "flex";


            document
                .getElementById("checkout-form")
                .reset();
        }
    );


function closeSuccess() {

    document
        .getElementById("success-modal")
        .style.display = "none";

    goToShop();
}


/* MODAL */

window.addEventListener(
    "click",
    function(event) {

        const checkoutModal =
            document.getElementById(
                "checkout-modal"
            );

        const successModal =
            document.getElementById(
                "success-modal"
            );


        if (event.target === checkoutModal) {

            closeCheckout();
        }


        if (event.target === successModal) {

            closeSuccess();
        }
    }
);


/* START */

updateCart();
updateWishlist();
