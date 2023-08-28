document.addEventListener("DOMContentLoaded", function () {
  const addSubjectButton = document.getElementById("add-subject-btn");
  const subjectsContainer = document.getElementById("subjects");
  const cgpaDisplay = document.getElementById("cgpa");

  let subjectCount = 1;

  addSubjectButton.addEventListener("click", function () {
    const subjectDiv = document.createElement("div");
    subjectDiv.className = "subject";
    subjectDiv.innerHTML = `
      <input type="text" class="subject-name" placeholder="Subject ${subjectCount}">
      <input type="number" class="credit-hour" placeholder="Credit Hour">
      <input type="number" class="grade-point" placeholder="Grade Point">
      <button class="remove-btn">Remove</button>
    `;
    subjectsContainer.appendChild(subjectDiv);

    const removeButton = subjectDiv.querySelector(".remove-btn");
    removeButton.addEventListener("click", function () {
      if (subjectsContainer.childElementCount > 1 && subjectCount > 1) {
        subjectsContainer.removeChild(subjectDiv);
        calculateCGPA();
      }
    });

    calculateCGPA();

    subjectCount++;
  });

  subjectsContainer.addEventListener("input", calculateCGPA);

  function calculateCGPA() {
    const subjects = document.querySelectorAll(".subject");
    let totalCreditHours = 0;
    let totalWeightedPoints = 0;

    subjects.forEach((subject, index) => {
      const creditHour = parseFloat(subject.querySelector(".credit-hour").value);
      const gradePoint = parseFloat(subject.querySelector(".grade-point").value);
      if (!isNaN(creditHour) && !isNaN(gradePoint)) {
        totalCreditHours += creditHour;
        totalWeightedPoints += creditHour * gradePoint;
      }
      subject.querySelector(".subject-name").placeholder = `Subject ${index + 1}`;
    });

    const cgpa = totalWeightedPoints / totalCreditHours || 0;
    cgpaDisplay.textContent = cgpa.toFixed(2);
  }
});
