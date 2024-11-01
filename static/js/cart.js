document.addEventListener("DOMContentLoaded", function () {
    // Retrieve cart from localStorage or initialize it
    let cart = JSON.parse(localStorage.getItem("cart"));

    if (cart === null || typeof cart !== 'object') {
        cart = {};
    }

    // Function to display cart items
    function displayCart() {
        const cartItemsContainer = document.getElementById("cart-items");
        cartItemsContainer.innerHTML = ""; // Clear existing items

        let totalItems = 0;
        let totalPrice = 0;

        const cartKeys = Object.keys(cart); // Get the product names (keys)

        if (cartKeys.length === 0) {
            cartItemsContainer.innerHTML = "<p>Your cart is empty.</p>";
        } else {
            cartKeys.forEach((key) => {
                const item = cart[key]; // Access the item object
                const itemDiv = document.createElement("div");
                itemDiv.className = "cart-item";
                itemDiv.innerHTML = `
                    <p>${key} - Rs. ${item.price.toFixed(2)}</p>
                    <div class="quantity-control">
                        <button class="decrease" data-index="${key}">-</button>
                        <input type="number" value="${item.quantity}" min="1" readonly />
                        <button class="increase" data-index="${key}">+</button>
                    </div>
                    <button class="remove-item" data-index="${key}">Remove</button>
                `;
                cartItemsContainer.appendChild(itemDiv);

                totalItems += item.quantity;
                totalPrice += item.price * item.quantity;
            });
        }

        // Update the cart summary
        document.getElementById("total-items").textContent = totalItems;
        document.getElementById("total-price").textContent = totalPrice.toFixed(2);
    }

    // Function to update the cart and localStorage
    function updateCart() {
        localStorage.setItem("cart", JSON.stringify(cart));
        displayCart();
    }

    // Function to change quantity
    function changeQuantity(key, delta) {
        if (cart[key]) {
            cart[key].quantity += delta;
            if (cart[key].quantity <= 0) {
                delete cart[key]; // Remove item if quantity is zero or less
            }
            updateCart();
        }
    }

    // Listen for button clicks on quantity controls
    document.getElementById("cart-items").addEventListener("click", function (event) {
        const key = event.target.getAttribute("data-index");
        if (event.target.classList.contains("increase")) {
            changeQuantity(key, 1);
        } else if (event.target.classList.contains("decrease")) {
            changeQuantity(key, -1);
        } else if (event.target.classList.contains("remove-item")) {
            removeFromCart(key);
        }
    });

    // Function to remove an item from the cart
    function removeFromCart(key) {
        delete cart[key]; // Remove item by key
        localStorage.setItem("cart", JSON.stringify(cart));
        displayCart();
    }

    // Initial cart display when the page loads
    displayCart();
});
