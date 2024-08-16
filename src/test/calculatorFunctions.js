const calculateTotalPercent = (assignments) => {
  let totalPercent = 0;
  assignments.forEach((assignment) => {
    totalPercent +=
      parseFloat(assignment.weight || 0) *
      (parseFloat(assignment.grade || 0) / 100);
  });
  return parseFloat(totalPercent.toFixed(1));
};

const calculateAveragePercent = (assignments, totalPercent) => {
  let totalWeight = 0;
  console.log("totalPercet: " + totalPercent);
  assignments.forEach((assignment) => {
    totalWeight += parseFloat(assignment.weight || 0);
    console.log("totalWeight " + totalWeight);
  });
  let averagePercent = (totalPercent / totalWeight) * 100;
  return parseFloat(averagePercent.toFixed(1));
};

const calculateGPA = (courses) => {
  let totalGpa = 0;
  let count = 0;

  for (let course of courses) {
    if (!isNaN(course.averageAchieved)) {
      totalGpa += course.averageAchieved;
      count++;
    }
  }

  if (count > 0) {
    return (totalGpa / count).toFixed(2);
  } else {
    return "X";
  }
};

module.exports = {
  calculateTotalPercent,
  calculateAveragePercent,
  calculateGPA,
};
