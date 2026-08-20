let cart = [];

function addToCart(productName, price) {

    cart.push({
        name: productName,
        price: price
    });

    updateCart();

    alert(productName + " added to cart!");
}


function updateCart() {

    const cartItems = document.getElementById("cart-items");
    const cartTotal = document.getElementById("cart-total");

    cartItems.innerHTML = "";

    let total = 0;

    if (cart.length === 0) {

        cartItems.innerHTML = "<p>Your cart is empty.</p>";

    } else {

        cart.forEach((product, index) => {

            const item = document.createElement("div");

            item.innerHTML = `
                <p>
                    ${product.name} - ₹${product.price}
                    <button onclick="removeFromCart(${index})">
                        Remove
                    </button>
                </p>
            `;

            cartItems.appendChild(item);

            total += product.price;
        });
    }

    cartTotal.textContent = total;
}


function removeFromCart(index) {

    cart.splice(index, 1);

    updateCart();
}
