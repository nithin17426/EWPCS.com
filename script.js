// Predefined username and password
const validUsername = "admin";
const validPassword = "12345";

// Handle form submission
document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById("login-form");

    if (loginForm) {
        loginForm.addEventListener("submit", function (e) {
            e.preventDefault(); // Prevent default form submission

            const username = document.getElementById("username").value.trim();
            const password = document.getElementById("password").value.trim();
            const errorMessage = document.getElementById("error-message");

            // Check credentials
            if (username === validUsername && password === validPassword) {
                localStorage.setItem("adminLoggedIn", "true"); // Store login flag
                alert("Login successful! Access granted.");
                window.location.href = "Quiz.html"; // Redirect to home page
            } else {
                errorMessage.style.display = "block"; // Show error message
            }
        });
    }

    // Restrict navigation button clicks if not logged in
    const restrictedLinks = {
        quiz: "Quiz.html",
        teacher: "Teacher.html",
        report: "Report.html"
    };

    Object.keys(restrictedLinks).forEach(id => {
        const link = document.getElementById(id);
        if (link) {
            link.addEventListener("click", function (event) {
                if (!localStorage.getItem("adminLoggedIn")) {
                    event.preventDefault();
                    alert("Please login first.");
                } else {
                    window.location.href = restrictedLinks[id]; // Navigate if logged in
                }
            });
        }
    });

    // Restrict direct access to protected pages
    const restrictedPages = ["Quiz.html", "Teacher.html", "Report.html"];
    const currentPage = window.location.pathname.split("/").pop();

    if (restrictedPages.includes(currentPage) && !localStorage.getItem("adminLoggedIn")) {
        alert("Access denied! Please login first.");
        window.location.href = "login.html"; // Redirect to login page
    }
});

// Logout function
function adminLogout() {
    localStorage.removeItem("adminLoggedIn");
    alert("You have been logged out.");
    window.location.href = "index.html"; // Redirect to login page
}
