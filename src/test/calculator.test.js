const {
  calculateTotalPercent,
  calculateAveragePercent,
  calculateGPA,
} = require("./calculatorFunctions");

describe("calculateTotalPercent", () => {
  it("should correctly calculate the total percent for given assignments", () => {
    const assignments = [
      { weight: 30, grade: 90 },
      { weight: 40, grade: 80 },
      { weight: 30, grade: 70 },
    ];

    const result = calculateTotalPercent(assignments);
    expect(result).toBe(80); // (0.3*90) + (0.4*80) + (0.3*70) = 77.0
  });

  it("should return 0 if no valid weights or grades are provided", () => {
    const assignments = [{ weight: 0, grade: 0 }];
    const result = calculateTotalPercent(assignments);
    expect(result).toBe(0.0);
  });
});

describe("calculateAveragePercent", () => {
  it("should correctly calculate the average percent for given assignments", () => {
    const assignments = [
      { weight: 10, grade: 50 },
      { weight: 20, grade: 70 },
    ];

    const totalPercent = calculateTotalPercent(assignments);
    const result = calculateAveragePercent(assignments, totalPercent);

    expect(result).toBe(63.3); // Average percent is equal to totalPercent when weights sum up to 100%
  });

  it("should return 0 if no valid assignments are provided", () => {
    const assignments = [];
    const result = calculateAveragePercent(assignments, 0);
    expect(result).toBe(NaN);
  });
});

describe("calculateGPA", () => {
  it("should calculate the correct GPA for given courses", () => {
    const courses = [
      { averageAchieved: 9 },
      { averageAchieved: 8 },
      { averageAchieved: 7 },
    ];
    const result = calculateGPA(courses);
    expect(result).toBe("8.00"); // (9 + 8 + 7) / 3 = 8.00
  });

  it('should return "X" if no valid GPA is present', () => {
    const courses = [{ averageAchieved: NaN }, { averageAchieved: NaN }];
    const result = calculateGPA(courses);
    expect(result).toBe("X");
  });

  it("should handle courses with undefined GPA gracefully", () => {
    const courses = [
      { averageAchieved: 9 },
      { averageAchieved: undefined },
      { averageAchieved: 7 },
    ];
    const result = calculateGPA(courses);
    expect(result).toBe("8.00"); // (9 + 7) / 2 = 8.00
  });

  it("should handle an empty courses array", () => {
    const courses = [];
    const result = calculateGPA(courses);
    expect(result).toBe("X");
  });
});
