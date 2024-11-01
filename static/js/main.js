
 // Select all "Add to Cart" buttons
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener("click", function(event) {
            event.preventDefault(); // Prevent default link behavior
    
            // Retrieve product details from data attributes
            const productId = this.getAttribute("data-id");
            const productName = this.getAttribute("data-name");
            const productPrice = this.getAttribute("data-price");
    
            // Create object to send in the request body
            const postObj = {
                'product_qty': 1, // Default quantity is set to 1
                'pid': productId,
                'name': productName,
                'price': productPrice
            };
    
            // Make a fetch request to add the item to the cart
            fetch("/add_to_cart", {
                method: 'POST',
                credentials: 'same-origin',
                headers: {
                    'Accept': 'application/json',
                    'X-Requested-With': 'XMLHttpRequest',
                    'X-CSRFToken': '{{ csrf_token }}', // Include CSRF token
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(postObj)
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                alert(data['status']); // Show success message
            })
            .catch(error => {
                console.error('Error:', error); // Log any error
                alert("An error occurred while adding to the cart."); // Inform the user
            });
        });
    });
    