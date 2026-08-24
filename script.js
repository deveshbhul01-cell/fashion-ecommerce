let cart =
    JSON.parse(localStorage.getItem("stylehub-cart")) || [];


function saveCart() {

    localStorage.setItem(
        "stylehub-cart",
        JSON.stringify(cart)
    );
}


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

    alert(name + " added to cart 🛒");
}


function updateCart() {

    const count =
        cart.reduce(
            (total, item) =>
                total + item.quantity,
            0
        );


    document.getElementById(
        "cart-count"
    ).textContent = count;


    const cartItems =
        document.getElementById(
            "cart-items"
        );


    const totalElement =
        document.getElementById(
            "cart-total"
        );


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

                    <h4>${item.name}</h4>

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


    totalElement.textContent =
        total.toLocaleString("en-IN");
}


function changeQuantity(index, change) {

    cart[index].quantity += change;


    if (cart[index].quantity <= 0) {

        cart.splice(index, 1);

    }


    saveCart();

    updateCart();
}


function removeItem(index) {

    cart.splice(index, 1);

    saveCart();

    updateCart();
}


function openCart() {

    document.getElementById(
        "cart-modal"
    ).classList.add("active");

    updateCart();
}


function closeCart() {

    document.getElementById(
        "cart-modal"
    ).classList.remove("active");
}


async function checkout() {

    const {
        data: {
            user
        }
    } = await supabaseClient.auth.getUser();


    if (!user) {

        alert(
            "Please login before checkout."
        );

        window.location.href =
            "login.html";

        return;
    }


    if (cart.length === 0) {

        alert("Your cart is empty.");

        return;
    }


    alert(
        "Checkout system coming next! 🛍️"
    );
}


async function loadUser() {

    const {
        data: {
            user
        }
    } = await supabaseClient.auth.getUser();


    const accountLink =
        document.getElementById(
            "account-link"
        );


    if (!accountLink) return;


    if (user) {

        const name =
            user.user_metadata?.full_name
            || user.email.split("@")[0];


        accountLink.textContent =
            "👤 " + name;


        accountLink.href =
            "#";


        accountLink.onclick =
            async function(event) {

                event.preventDefault();

                const logout =
                    confirm(
                        "Do you want to logout?"
                    );

                if (logout) {

                    await logoutUser();

                }

            };

    }

}


document.addEventListener(
    "DOMContentLoaded",
    function() {

        updateCart();

        loadUser();

    }
);
