// 1 . Given an array of integers and a target value, you must determine which two integers' sum
// equals the target and return a 2D array. Then merge the array into a single array with sorting (
// ascending ) order, in the next step double the target value and find again the combination of
// digits (can be multiple digits ) that are equal to the double targeted value and returned into a 2D
// array.

// Sample Input : [1, 3, 2, 2, -4, -6, -2, 8];
// Target Value = 4,

// Output: First Combination For “4” : [ [1,3],[2,2],[-4,8],[-6,2] ];
// Merge Into a single Array : [-6,-4,1,2,2,2,3,8];
// Second Combination For “8” : [ [ 1,3,2,2], [8,-4,2,2],....,[n,n,n,n] ]

let arr = [1, 3, 2, 2, -4, -6, -2, 8];

// Sorted the array into ascending order
arr = arr.sort((a, b) => a - b);
let n = arr.length;
let k = 4; //target

let mat = []; //an empty array to hold the arrays of two values
let merged = []; //an empty array to merge the integers into ascending order
let l = 0;
let r = n - 1;

while (l < r) {
  let ar = [];
  let sum = arr[l] + arr[r];

  if (sum == k) {
    ar.push(arr[l], arr[r]); // Add the pair of numbers to 'ar' array
    merged.push(arr[l], arr[r]); // Add the pair of numbers to 'merged' array
    r--; // Since we have collected the integers of this position, move the right pointer to the left
    l++; // and left pointer to the right
  } else if (sum > k) {
    r--; // Decrease the right pointer to reduce the sum
  } else {
    l++; // Increase the left pointer to increase the sum
  }
  if (ar.length != 0) {
    mat.push(ar); // Add the 'ar' array to 'mat' array if it contains any elements
  }
}

// Sort the merged array in ascending order
merged = merged.sort((a, b) => a - b);

console.log(mat); // Output the arrays of two values whose sum is equal to 'k'
console.log(merged); // Output the merged sorted array

// A function which takes two arguments first is an merged and sorted array, second is the given target
function CombinationOfDoubledTarget(array, target) {
  const result = [];

  function backtrack(combination, start, currentSum) {
    // If the current sum is equal to 2 times the target, we have found a valid combination
    if (currentSum === 2 * target) {
      result.push(combination.slice()); // Make a copy of the combination and add it to the result
      return;
    }

    // Iterate over the remaining elements in the array
    for (let i = start; i < array.length; i++) {
      const num = array[i];
      // If adding the current number does not exceed 2 times the target, proceed
      if (currentSum + num <= 2 * target) {
        combination.push(num); // Add the current number to the combination
        backtrack(combination, i + 1, currentSum + num); // Recursively backtrack with updated values
        combination.pop(); // Remove the last added number to try other possibilities
      }
    }
  }

  // Initial call to the backtrack function with an empty combination, start index 0, and current sum 0
  backtrack([], 0, 0);

  return result; // Return the resulting combinations
}

const combinations = CombinationOfDoubledTarget(merged, k);
console.log(combinations); // Output for the second Combination of doubled target

// The above code defines the CombinationOfDoubledTarget function, which takes the merged sorted array and target as parameters.
// It initializes an empty result array to store the combinations. The backtrack function performs the actual backtracking algorithm. 
// It takes a combination array to track the current combination, a start index to avoid duplicates, and currentSum to keep track of the sum.
