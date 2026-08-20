let cart = [];

function addToCart(name, price) {
    cart.push({ name: name, price: price });
    updateCart();
    alert(name + " added to cart!");
}

function updateCart() {
    const cartItems = document.getElementById("cart-items");
    const cartTotal = document.getElementById("cart-total");

    if (!cartItems || !cartTotal) {
        alert("Cart section not found!");
        return;
    }

    cartItems.innerHTML = "";

    let total = 0;

    cart.forEach(function(product, index) {
        const item = document.createElement("div");

        item.innerHTML =
            "<p>" +
            product.name +
            " - ₹" +
            product.price +
            ' <button onclick="removeFromCart(' +
            index +
            ')">Remove</button></p>';

        cartItems.appendChild(item);

        total += product.price;
    });

    if (cart.length === 0) {
        cartItems.innerHTML = "<p>Your cart is empty.</p>";
    }

    cartTotal.innerText = total;
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCart();
}
