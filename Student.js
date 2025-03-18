document.addEventListener("DOMContentLoaded", () => {
    const quizContainer = document.getElementById("student-quiz");

    // Retrieve applied quizzes from localStorage
    let appliedQuizzes = JSON.parse(localStorage.getItem("appliedQuizzes")) || [];

    if (appliedQuizzes.length === 0) {
        quizContainer.innerHTML = "<p>No quiz available. Please wait for the teacher to apply a quiz.</p>";
        return;
    }

    // Display the quiz questions dynamically
    quizContainer.innerHTML = appliedQuizzes
        .map((quiz, index) => `
            <h2>${quiz.course}</h2>
            ${quiz.questions
                .map((q, i) => `
                    <div class="question">
                        <p><strong>Q${i + 1}:</strong> ${q.question}</p>
                        ${q.options
                            .map(
                                (option, j) => `
                                <label>
                                    <input type="radio" name="question${i}" value="${option}">
                                    ${option}
                                </label>
                            `
                            )
                            .join("")}
                    </div>
                `)
                .join("")}
        `)
        .join("");
});
