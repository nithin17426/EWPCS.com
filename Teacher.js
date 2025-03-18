document.addEventListener("DOMContentLoaded", () => {
    const coursesDiv = document.getElementById("courses");
    const questionsDiv = document.getElementById("questions");

    let quizzes = JSON.parse(localStorage.getItem("quizzes")) || [];

    function renderCourses() {
        coursesDiv.innerHTML = "";
        quizzes.forEach((quiz, index) => {
            const courseItem = document.createElement("div");
            courseItem.className = "course-item";
            courseItem.innerHTML = `
                <span>${quiz.course}</span>
                <button onclick="viewQuiz(${index})">View</button>
                <button class="delete-btn" onclick="deleteCourse(${index})">&#128465;</button>
            `;
            coursesDiv.appendChild(courseItem);
        });
    }

    window.viewQuiz = (index) => {
        const selectedQuiz = quizzes[index];
        if (selectedQuiz && selectedQuiz.questions.length > 0) {
            questionsDiv.innerHTML = selectedQuiz.questions
                .map(
                    (q, i) => `
                    <div class="question">
                        <p><strong>Q${i + 1}:</strong> <span id="q-text-${index}-${i}">${q.question}</span></p>
                        ${q.options
                            .map(
                                (option, j) => `
                                <label>
                                    <input type="radio" name="question${i}">
                                    <span id="opt-${index}-${i}-${j}">${option}</span>
                                </label>
                            `
                            )
                            .join("")}
                        <br>
                        <button onclick="updateQuestion(${index}, ${i})">✏️ Update</button>
                        <button onclick="deleteQuestion(${index}, ${i})">🗑️ Delete</button>
                    </div>
                    <hr>
                `
                )
                .join("");
        } else {
            questionsDiv.innerHTML = "<p>No questions available for this course.</p>";
        }
    };

    window.deleteCourse = (index) => {
        if (confirm("Are you sure you want to delete this course?")) {
            quizzes.splice(index, 1); // Remove course from the array
            localStorage.setItem("quizzes", JSON.stringify(quizzes)); // Update local storage
            renderCourses(); // Re-render courses after deletion
            questionsDiv.innerHTML = "<p>Select a course to view the quiz.</p>"; // Clear the questions section
        }
    };
    

    window.deleteQuestion = (courseIndex, questionIndex) => {
        if (confirm("Are you sure you want to delete this question?")) {
            quizzes[courseIndex].questions.splice(questionIndex, 1);
            localStorage.setItem("quizzes", JSON.stringify(quizzes));
            viewQuiz(courseIndex);
        }
    };

    window.updateQuestion = (courseIndex, questionIndex) => {
        let newQuestion = prompt("Enter the updated question:", quizzes[courseIndex].questions[questionIndex].question);
        if (newQuestion) {
            quizzes[courseIndex].questions[questionIndex].question = newQuestion;
            for (let i = 0; i < quizzes[courseIndex].questions[questionIndex].options.length; i++) {
                let newOption = prompt(`Update option ${i + 1}:`, quizzes[courseIndex].questions[questionIndex].options[i]);
                if (newOption) {
                    quizzes[courseIndex].questions[questionIndex].options[i] = newOption;
                }
            }
            localStorage.setItem("quizzes", JSON.stringify(quizzes));
            viewQuiz(courseIndex);
        }
    };

    document.querySelector(".applyButton").addEventListener("click", () => {
        if (quizzes.length === 0) {
            alert("No MCQs available to apply.");
            return;
        }
        localStorage.setItem("appliedQuizzes", JSON.stringify(quizzes));
        alert("Quiz applied successfully! Students can now access it.");
    });

    renderCourses();
});
// Logout function
function adminLogout() {
    localStorage.removeItem("adminLoggedIn");
    alert("You have been logged out.");
    window.location.href = "index.html"; // Redirect to login page
}

