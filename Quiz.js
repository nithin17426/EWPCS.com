document.addEventListener("DOMContentLoaded", () => {
    const quizForm = document.getElementById("quiz-form");
    const successMessage = document.getElementById("success-message");

    quizForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const questionNumber = document.getElementById("question-number").value.trim();
        const courseName = document.getElementById("course-name").value.trim();
        const questionText = document.getElementById("question-text").value.trim();
        const marks = document.getElementById("marks").value.trim();

        const options = {
            option1: document.querySelector("input[name='option1']").value.trim(),
            option2: document.querySelector("input[name='option2']").value.trim(),
            option3: document.querySelector("input[name='option3']").value.trim(),
            option4: document.querySelector("input[name='option4']").value.trim(),
        };

        const correctOption = document.querySelector("input[name='correct-option']:checked").value;

        // Save the question in localStorage
        const quizData = JSON.parse(localStorage.getItem("quizData")) || [];
        quizData.push({ questionNumber, courseName, questionText, marks, options, correctOption });
        localStorage.setItem("quizData", JSON.stringify(quizData));

        // Show success message and reset the form
        successMessage.style.display = "block";
        setTimeout(() => {
            successMessage.style.display = "none";
        }, 2000);

        quizForm.reset();
    });
});
// Logout function
function adminLogout() {
    localStorage.removeItem("adminLoggedIn");
    alert("You have been logged out.");
    window.location.href = "index.html"; // Redirect to login page
}