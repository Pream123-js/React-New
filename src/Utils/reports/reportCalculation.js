export const getClassSummary = (students, classNumber) => {
  const classStudents = students.filter(
    (student) => student.class === classNumber
  );

  const totalStudents = classStudents.length;

  const passed = classStudents.filter(
    (student) => student.status === "PASS"
  ).length;

  const failed = totalStudents - passed;

  const averageMarks =
    totalStudents === 0
      ? 0
      : Math.round(
          classStudents.reduce((sum, student) => sum + student.marks, 0) /
            totalStudents
        );

  return {
    class: classNumber,
    totalStudents,
    passed,
    failed,
    averageMarks,
  };
};
export const getPerformanceTrend = (students, classNumber) => {
  const classStudents = students.filter(
    (student) => student.class === classNumber
  );

  const monthsOrder = [
    "Jan", "Feb", "Mar",
    "Apr", "May", "Jun",
    "Jul", "Aug", "Sep",
    "Oct", "Nov", "Dec"
  ];

  const trendData = monthsOrder.map((month) => {
    const monthStudents = classStudents.filter(
      (student) => student.month === month
    );

    const total = monthStudents.length;

    const passed = monthStudents.filter(
      (student) => student.status === "PASS"
    ).length;

    const failed = total - passed;

    const averageMarks =
      total === 0
        ? 0
        : Math.round(
            monthStudents.reduce((sum, s) => sum + s.marks, 0) / total
          );

    return {
      month,
      totalStudents: total,
      passed,
      failed,
      averageMarks,
    };
  });

  return trendData;
};
export const getMonthlyComparison = (students, selectedMonths) => {
  return selectedMonths.map((month) => {
    const class11Students = students.filter(
      (s) => s.class === 11 && s.month === month
    );

    const class12Students = students.filter(
      (s) => s.class === 12 && s.month === month
    );

    const class11Passed = class11Students.filter(
      (s) => s.status === "PASS"
    ).length;

    const class12Passed = class12Students.filter(
      (s) => s.status === "PASS"
    ).length;

    return {
      month,
      class11: {
        passed: class11Passed,
        failed: class11Students.length - class11Passed,
      },
      class12: {
        passed: class12Passed,
        failed: class12Students.length - class12Passed,
      },
    };
  });
};
