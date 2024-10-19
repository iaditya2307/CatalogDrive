const fs = require("fs");

// Function to decode a value from a given base to decimal (base 10)
function decodeValue(base, value) {
  return parseInt(value, base);
}

// Lagrange Interpolation to find the constant term (f(0))
function lagrangeInterpolation(points, k) {
  let Konstant_term = 0;

  for (let j = 0; j < k; j++) {
    let [x_j, y_j] = points[j];
    let term = y_j;

    // Calculate the product for the Lagrange coefficient
    for (let m = 0; m < k; m++) {
      if (m !== j) {
        let [x_m] = points[m];
        term *= -x_m / (x_j - x_m);
      }
    }
    Konstant_term += term;
  }

  return Math.round(Konstant_term); // Round to handle precision issues
}

// Function to solve a single test case
function solveTestCase(testcase) {
  const n = testcase.keys.n;
  const k = testcase.keys.k;

  // Extract and decode the points
  const points = [];

  // Iterate through the keys in the testcase object
  for (const key in testcase) {
    if (key !== "keys") {
      // Skip the 'keys' property 

      const entry = testcase[key];

      const base = parseInt(entry.base);

      const value = entry.value;

      const x = parseInt(key); // Use the current key as x
      
      const y = decodeValue(base, value);

      points.push([x, y]);
    }
  }

  // Use Lagrange interpolation to find the constant term (secret)
  return lagrangeInterpolation(points, k);
}

// Read and parse the JSON file
try {
  const data = JSON.parse(fs.readFileSync("Poly_roots.json", "utf-8"));

  // Solve both test cases
  const secret1 = solveTestCase(data.testcase1);
  const secret2 = solveTestCase(data.testcase2);

  // Print the results
  console.log(`Secret for Test Case 1: ${secret1}`);
  console.log(`Secret for Test Case 2: ${secret2}`);
} catch (err) {
  console.error("Error reading or parsing JSON file:", err);
}
