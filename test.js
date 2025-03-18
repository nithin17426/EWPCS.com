document.addEventListener("DOMContentLoaded", () => {
    const questionsContainer = document.getElementById("questions-container");
    const submitBtn = document.getElementById("submitTest");

    // Load student details
    let studentName = localStorage.getItem("studentName");
    let studentRegNo = localStorage.getItem("studentRegNo");
    let selectedSubject = localStorage.getItem("studentSubject");

    if (!studentName || !studentRegNo || !selectedSubject) {
        alert("Student details missing! Please log in again.");
        window.location.href = "Student.html";
        return;
    }

    document.getElementById("student-info").textContent = `Name: ${studentName} | Reg No: ${studentRegNo} | Subject: ${selectedSubject}`;

    // Load MCQs from localStorage (stored from Teacher page)
    let quizzes = JSON.parse(localStorage.getItem("appliedQuizzes")) || [];
    let subjectQuiz = quizzes.find(quiz => quiz.course === selectedSubject);

    if (!subjectQuiz || subjectQuiz.questions.length === 0) {
        questionsContainer.innerHTML = `<p>No questions found for ${selectedSubject}.</p>`;
        return;
    }

    let correctAnswers = [];
    questionsContainer.innerHTML = subjectQuiz.questions.map((q, i) => {
        correctAnswers.push(q.correctAnswer);
        return `
            <div class="question">
                <p><strong>Q${i + 1}:</strong> ${q.question}</p>
                ${q.options.map(option => `
                    <label>
                        <input type="radio" name="question${i}" value="${option}">
                        ${option}
                    </label>
                `).join("")}
            </div>
            <hr>
        `;
    }).join("");
    
    // Store correct answers for result calculation
    localStorage.setItem("correctAnswers", JSON.stringify(correctAnswers));

    // Handle quiz submission
    submitBtn.addEventListener("click", () => {
        let studentAnswers = document.querySelectorAll("input[type='radio']:checked");
        let score = 0;

        studentAnswers.forEach((answer, index) => {
            if (answer.value === correctAnswers[index]) {
                score++;
            }
        });

        localStorage.setItem("studentScore", score);
        localStorage.setItem("totalQuestions", correctAnswers.length);

        window.location.href = "result.html";
    });
});
