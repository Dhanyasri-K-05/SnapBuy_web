// Function to validate email format
function isValidEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

// Function to validate password
function isValidPassword(password) {
    return password.length >= 6; // Example: Password must be at least 6 characters
}

// Validate login form
function validateLoginForm(event) {
    event.preventDefault(); // Prevent form submission for validation

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (username.trim() === '') {
        alert('Username is required.');
        return false;
    }

    if (!isValidPassword(password)) {
        alert('Password must be at least 6 characters long.');
        return false;
    }

    // If validation passes, redirect to home.html
    window.location.href = 'home.html';
}

// Validate sign-up form
function validateSignUpForm(event) {
    event.preventDefault(); // Prevent form submission for validation

    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;

    if (username.trim() === '') {
        alert('Username is required.');
        return false;
    }

    if (!isValidEmail(email)) {
        alert('Please enter a valid email address.');
        return false;
    }

    // Basic phone number validation (example)
    if (phone.trim() === '' || !/^\d{10}$/.test(phone)) {
        alert('Please enter a valid 10-digit phone number.');
        return false;
    }

    if (!isValidPassword(password)) {
        alert('Password must be at least 6 characters long.');
        return false;
    }

    if (password !== confirmPassword) {
        alert('Passwords do not match.');
        return false;
    }

    // If validation passes, redirect to home.html
    window.location.href = 'home.html';
}
