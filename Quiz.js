document.addEventListener("DOMContentLoaded", () => {
    const quizForm = document.getElementById("quiz-form");
    const successMessage = document.getElementById("success-message");

    quizForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const questionData = {
            questionNumber: document.getElementById("question-number").value.trim(),
            courseName: document.getElementById("course-name").value.trim(),
            questionText: document.getElementById("question-text").value.trim(),
            options: [
                document.getElementById("option-a").value.trim(),
                document.getElementById("option-b").value.trim(),
                document.getElementById("option-c").value.trim(),
                document.getElementById("option-d").value.trim()
            ],
            correctAnswer: document.getElementById("correct-answer").value.trim()
        };

        // Save to localStorage (for temporary storage)
        let quizzes = JSON.parse(localStorage.getItem("quizzes")) || [];
        quizzes.push(questionData);
        localStorage.setItem("quizzes", JSON.stringify(quizzes));

         Alternatively, send to backend API for permanent storage
        
        await fetch("http://localhost:5000/save-quiz", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(questionData)
        });
        

        successMessage.textContent = "Quiz question saved successfully!";
        successMessage.style.display = "block";
    });
});
