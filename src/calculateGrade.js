function calculateGrade(marks) {
  let grade;

  switch (true) {
    case marks >= 90 && marks <= 100:
      grade = "A";
      break;
    case marks >= 80:
      grade = "B";
      break;
    case marks >= 70:
      grade = "C";
      break;
    case marks >= 60:
      grade = "D";
      break;
    case marks >= 0:
      grade = "F";
      break;
    default:
      grade = "Invalid marks";
  }

  return grade;
}

console.log(calculateGrade(85)); 