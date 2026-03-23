/**
 * dsaData.js — Master data file for all DSA topics.
 *
 * Structure:
 *   Topic  → has many Patterns
 *   Pattern → has theory, a code example, and 12 questions (4 easy/4 medium/4 hard)
 *
 * To add a new topic: push an object with the same shape to this array.
 * To add a pattern:   push into the topic's `patterns` array.
 */

export const DSA_DATA = [
  /* ────────────────────────────────────────────────────────────
     1. ARRAYS
     ──────────────────────────────────────────────────────────── */
  {
    id: "arrays",
    name: "Arrays",
    emoji: "▦",
    color: "#0A84FF",
    patterns: [
      /* ── Sliding Window ── */
      {
        id: "sliding-window",
        name: "Sliding Window",
        theory: `Imagine you're looking out of a train window at the scenery. Your window shows exactly 3 meters of view at a time — and as the train moves, your view "slides" forward. That's the Sliding Window technique!\n\nInstead of rechecking every combination from scratch (slow 🐌), you maintain a "window" (a range of elements) and slide it one step at a time. When the window moves right, you add the new element on the right and remove the old element on the left.\n\nThis turns an O(n²) brute force into a blazing O(n) solution — one pass through the array!`,
        example: `// 🎯 Goal: Find max sum of any 3 consecutive numbers
// Array: [2, 1, 5, 1, 3, 2],  window size k = 3

function maxSumWindow(arr, k) {
  // Step 1: Sum the FIRST window [2, 1, 5]
  let windowSum = 0;
  for (let i = 0; i < k; i++) windowSum += arr[i];
  // windowSum = 8

  let maxSum = windowSum;

  // Step 2: Slide the window forward one step at a time
  for (let i = k; i < arr.length; i++) {
    //           ➕ Add new right element   ➖ Remove old left element
    windowSum = windowSum + arr[i] - arr[i - k];
    // [2,1,5] → [1,5,1] : 8 + 1 - 2 = 7
    // [1,5,1] → [5,1,3] : 7 + 3 - 1 = 9  ← MAX! ✅
    // [5,1,3] → [1,3,2] : 9 + 2 - 5 = 6

    maxSum = Math.max(maxSum, windowSum);
  }
  return maxSum; // 9
}

console.log(maxSumWindow([2, 1, 5, 1, 3, 2], 3)); // 9`,
        questions: {
          easy: [
            { id: "sw-e1", title: "Maximum Average Subarray I", lc: "643", desc: "Find the subarray of length k with maximum average." },
            { id: "sw-e2", title: "Find All Anagrams in a String", lc: "438", desc: "Find all start indices of anagram substrings." },
            { id: "sw-e3", title: "Contains Duplicate II", lc: "219", desc: "Check if two distinct indices have same value within distance k." },
            { id: "sw-e4", title: "Diet Plan Performance", lc: "1176", desc: "Count days where window sum is over/under limits." },
          ],
          medium: [
            { id: "sw-m1", title: "Longest Substring Without Repeating Characters", lc: "3", desc: "Find length of longest substring without repeated chars." },
            { id: "sw-m2", title: "Fruit Into Baskets", lc: "904", desc: "Max fruits with only 2 types allowed." },
            { id: "sw-m3", title: "Permutation in String", lc: "567", desc: "Check if s2 contains any permutation of s1." },
            { id: "sw-m4", title: "Longest Repeating Character Replacement", lc: "424", desc: "Replace k chars to get longest repeating substring." },
          ],
          hard: [
            { id: "sw-h1", title: "Minimum Window Substring", lc: "76", desc: "Find minimum window in s containing all chars of t." },
            { id: "sw-h2", title: "Sliding Window Maximum", lc: "239", desc: "Maximum value in each sliding window of size k." },
            { id: "sw-h3", title: "Substring with Concatenation of All Words", lc: "30", desc: "Find substrings that concatenate all words exactly." },
            { id: "sw-h4", title: "Count Subarrays with Max ≥ K Times", lc: "2962", desc: "Count subarrays where max element appears ≥ k times." },
          ],
        },
      },

      /* ── Two Pointers ── */
      {
        id: "two-pointer",
        name: "Two Pointers",
        theory: `Picture two people entering a corridor from opposite ends, walking toward each other. By working together, they cover the whole corridor in half the time!\n\nTwo Pointers uses two indices to scan from different positions simultaneously. It avoids the O(n²) nested loops by making smart moves:\n\n• Opposite Ends: One pointer at start, one at end → move inward based on condition\n• Same Direction (Fast & Slow): Both move forward, but at different speeds\n• Partition: Dutch National Flag — sort 3-way in one pass\n\nKey insight: at each step, you can ALWAYS eliminate half the remaining work!`,
        example: `// 🎯 Classic: Check if a string is a palindrome
// "racecar" → true  |  "hello" → false

function isPalindrome(str) {
  let left  = 0;               // 👈 starts at beginning
  let right = str.length - 1;  // 👉 starts at end

  while (left < right) {
    if (str[left] !== str[right]) return false; // Mismatch!
    left++;   // Move inward ➡️
    right--;  // Move inward ⬅️
  }
  return true; // All matched! 🎉
}

// 🎯 Bonus: Find pair that sums to target in sorted array
function twoSum(nums, target) {
  let left = 0, right = nums.length - 1;
  while (left < right) {
    const sum = nums[left] + nums[right];
    if (sum === target) return [left, right]; // Found! 🎉
    else if (sum < target) left++;   // Need bigger sum → move left right
    else right--;                    // Need smaller sum → move right left
  }
  return [-1, -1];
}`,
        questions: {
          easy: [
            { id: "tp-e1", title: "Valid Palindrome", lc: "125", desc: "Check palindrome ignoring non-alphanumeric chars." },
            { id: "tp-e2", title: "Reverse String", lc: "344", desc: "Reverse array of characters in-place." },
            { id: "tp-e3", title: "Squares of a Sorted Array", lc: "977", desc: "Return sorted array of squares." },
            { id: "tp-e4", title: "Two Sum II - Sorted Array", lc: "167", desc: "Find two numbers adding to target in sorted array." },
          ],
          medium: [
            { id: "tp-m1", title: "3Sum", lc: "15", desc: "Find all unique triplets that sum to zero." },
            { id: "tp-m2", title: "Container With Most Water", lc: "11", desc: "Find two lines that hold the most water." },
            { id: "tp-m3", title: "Sort Colors", lc: "75", desc: "Sort 0s, 1s, 2s in-place (Dutch National Flag)." },
            { id: "tp-m4", title: "Remove Duplicates from Sorted Array", lc: "26", desc: "Remove duplicates in-place, return new length." },
          ],
          hard: [
            { id: "tp-h1", title: "Trapping Rain Water", lc: "42", desc: "How much rainwater can be trapped between bars." },
            { id: "tp-h2", title: "4Sum", lc: "18", desc: "Find all unique quadruplets summing to target." },
            { id: "tp-h3", title: "Shortest Subarray to be Removed", lc: "1574", desc: "Remove shortest subarray to make array non-decreasing." },
            { id: "tp-h4", title: "Minimum Operations to Reduce X to Zero", lc: "1658", desc: "Min ops to reduce x removing from ends." },
          ],
        },
      },

      /* ── Prefix Sum ── */
      {
        id: "prefix-sum",
        name: "Prefix Sum",
        theory: `Imagine tracking your monthly spending. Someone asks "how much did you spend in weeks 2-4?" Instead of adding them up each time, you pre-calculated running totals!\n\nPrefix Sum stores the cumulative sum at every index. Then ANY range query [L, R] is answered instantly:\n\nrangeSum(L, R) = prefix[R+1] - prefix[L]\n\nThis turns O(n) per query → O(1) per query after just O(n) preprocessing!`,
        example: `// 🎯 Answer range sum queries instantly
// Expenses: [100, 200, 300, 400, 500]
// Q: Total from index 1 to 3? (200+300+400 = 900)

function buildPrefix(arr) {
  const prefix = [0]; // prefix[0] = 0 (empty sum)
  for (let i = 0; i < arr.length; i++) {
    prefix[i + 1] = prefix[i] + arr[i];
  }
  return prefix;
  // prefix = [0, 100, 300, 600, 1000, 1500]
}

function rangeSum(prefix, L, R) {
  return prefix[R + 1] - prefix[L];
  // Query [1, 3]: prefix[4] - prefix[1] = 1000 - 100 = 900 ✅
}

const expenses = [100, 200, 300, 400, 500];
const prefix   = buildPrefix(expenses);

console.log(rangeSum(prefix, 1, 3)); // 900
console.log(rangeSum(prefix, 0, 4)); // 1500 (all expenses)`,
        questions: {
          easy: [
            { id: "ps-e1", title: "Running Sum of 1D Array", lc: "1480", desc: "Compute running sum of array." },
            { id: "ps-e2", title: "Find Pivot Index", lc: "724", desc: "Find index where left sum equals right sum." },
            { id: "ps-e3", title: "Range Sum Query - Immutable", lc: "303", desc: "Answer multiple range sum queries." },
            { id: "ps-e4", title: "Left and Right Sum Differences", lc: "2574", desc: "Compute absolute left/right prefix differences." },
          ],
          medium: [
            { id: "ps-m1", title: "Subarray Sum Equals K", lc: "560", desc: "Count subarrays with sum = k using prefix + hashmap." },
            { id: "ps-m2", title: "Product of Array Except Self", lc: "238", desc: "Product of all elements except self, no division." },
            { id: "ps-m3", title: "Continuous Subarray Sum", lc: "523", desc: "Check if subarray length ≥ 2 sums to multiple of k." },
            { id: "ps-m4", title: "Number of Ways to Split Array", lc: "2270", desc: "Count valid splits where left sum ≥ right sum." },
          ],
          hard: [
            { id: "ps-h1", title: "Count of Range Sum", lc: "327", desc: "Count range sums that fall within [lower, upper]." },
            { id: "ps-h2", title: "Maximum Sum of 3 Non-Overlapping Subarrays", lc: "689", desc: "Find 3 non-overlapping subarrays with max sum." },
            { id: "ps-h3", title: "Minimum Cost to Make Array Equal", lc: "2448", desc: "Minimize cost to make all elements equal." },
            { id: "ps-h4", title: "Number of Subarrays with Bounded Maximum", lc: "795", desc: "Count subarrays with max in [left, right]." },
          ],
        },
      },

      /* ── Kadane's Algorithm ── */
      {
        id: "kadanes",
        name: "Kadane's Algorithm",
        theory: `You're walking a path, collecting coins (+) and paying tolls (–). You want to find the MOST PROFITABLE stretch of the path.\n\nKadane's insight: At each step, either extend the current profitable stretch, OR start fresh here.\n\nIf your running sum becomes negative, throw it away — a negative sum only hurts future gains!\n\nOne single pass → O(n) time ⚡`,
        example: `// 🎯 Maximum sum of any contiguous subarray
// [-2, 1, -3, 4, -1, 2, 1, -5, 4]
// Best stretch: [4, -1, 2, 1] = 6

function maxSubarraySum(arr) {
  let current = arr[0]; // Running sum of current stretch
  let best    = arr[0]; // Best sum found so far

  for (let i = 1; i < arr.length; i++) {
    // 🤔 Better to START FRESH or CONTINUE current stretch?
    current = Math.max(arr[i], current + arr[i]);
    //        "just me alone"  "me + everything before"
    best = Math.max(best, current);
  }
  return best;
}

// Walking through [-2, 1, -3, 4, -1, 2, 1, -5, 4]:
// i=3: max(4, -2+4) = 4  → best=4
// i=5: max(2, 3+2)  = 5  → best=5
// i=6: max(1, 5+1)  = 6  → best=6 ✅

console.log(maxSubarraySum([-2,1,-3,4,-1,2,1,-5,4])); // 6`,
        questions: {
          easy: [
            { id: "ka-e1", title: "Maximum Subarray", lc: "53", desc: "Find the contiguous subarray with the largest sum." },
            { id: "ka-e2", title: "Best Time to Buy and Sell Stock", lc: "121", desc: "Max profit from one buy and one sell." },
            { id: "ka-e3", title: "Maximum Average Subarray I", lc: "643", desc: "Max average of subarray length k." },
            { id: "ka-e4", title: "Largest Sum of Averages", lc: "813", desc: "Partition array into at most k parts, max sum of averages." },
          ],
          medium: [
            { id: "ka-m1", title: "Maximum Product Subarray", lc: "152", desc: "Find subarray with the largest product." },
            { id: "ka-m2", title: "Maximum Sum Circular Subarray", lc: "918", desc: "Max subarray sum in a circular array." },
            { id: "ka-m3", title: "Longest Turbulent Subarray", lc: "978", desc: "Length of longest turbulent subarray." },
            { id: "ka-m4", title: "Subarray Product Less Than K", lc: "713", desc: "Count subarrays with product < k." },
          ],
          hard: [
            { id: "ka-h1", title: "Maximum Sum of Rectangles No Larger Than K", lc: "363", desc: "Max rectangle sum ≤ k in a matrix." },
            { id: "ka-h2", title: "Maximum Subarray Sum with One Deletion", lc: "1186", desc: "Max subarray sum after deleting one element." },
            { id: "ka-h3", title: "K-Concatenation Maximum Sum", lc: "1191", desc: "Max subarray of k copies concatenated." },
            { id: "ka-h4", title: "Maximum Absolute Sum of Any Subarray", lc: "1749", desc: "Max absolute sum of any subarray." },
          ],
        },
      },

      /* ── Binary Search ── */
      {
        id: "binary-search",
        name: "Binary Search",
        theory: `Guessing a number from 1–100? Start at 50. Too high? Guess 25. Too low? Guess 75. You cut the possibilities in HALF each time!\n\nBinary search works on sorted arrays. By comparing the middle element, you eliminate half the remaining candidates in one check.\n\nFor 1 million elements: only ~20 steps needed! O(log n) 🚀\n\nTwo flavors:\n• On Index: Find element in sorted array\n• On Answer: Binary search the answer space (min/max satisfying condition)`,
        example: `// 🎯 Find target in sorted array
// [1, 3, 5, 7, 9, 11, 13], target = 11

function binarySearch(arr, target) {
  let left  = 0;
  let right = arr.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);

    if (arr[mid] === target) return mid;        // Found! 🎉
    else if (arr[mid] < target) left = mid + 1; // Go RIGHT ➡️
    else right = mid - 1;                       // Go LEFT  ⬅️
  }
  return -1; // Not found
}

// Finding 11 in [1,3,5,7,9,11,13]:
// left=0, right=6, mid=3 → arr[3]=7  < 11 → go RIGHT
// left=4, right=6, mid=5 → arr[5]=11 = 11 → Found ✅

// 🎯 Binary Search on ANSWER (min eating speed)
function minEatingSpeed(piles, h) {
  let left = 1, right = Math.max(...piles);
  while (left < right) {
    const mid = Math.floor((left + right) / 2);
    const hours = piles.reduce((s, p) => s + Math.ceil(p / mid), 0);
    if (hours <= h) right = mid;
    else left = mid + 1;
  }
  return left;
}`,
        questions: {
          easy: [
            { id: "bs-e1", title: "Binary Search", lc: "704", desc: "Classic binary search on a sorted array." },
            { id: "bs-e2", title: "Search Insert Position", lc: "35", desc: "Find index where target would be inserted." },
            { id: "bs-e3", title: "First Bad Version", lc: "278", desc: "Find first bad version using binary search." },
            { id: "bs-e4", title: "Sqrt(x)", lc: "69", desc: "Integer square root using binary search." },
          ],
          medium: [
            { id: "bs-m1", title: "Find Minimum in Rotated Sorted Array", lc: "153", desc: "Find minimum element in rotated sorted array." },
            { id: "bs-m2", title: "Search in Rotated Sorted Array", lc: "33", desc: "Search for target in rotated sorted array." },
            { id: "bs-m3", title: "Koko Eating Bananas", lc: "875", desc: "Binary search on answer — minimum eating speed." },
            { id: "bs-m4", title: "Capacity to Ship Packages Within D Days", lc: "1011", desc: "Minimum ship capacity to deliver in D days." },
          ],
          hard: [
            { id: "bs-h1", title: "Median of Two Sorted Arrays", lc: "4", desc: "Find median of two sorted arrays in O(log n)." },
            { id: "bs-h2", title: "Split Array Largest Sum", lc: "410", desc: "Minimize the largest sum in k subarrays." },
            { id: "bs-h3", title: "Find in Mountain Array", lc: "1095", desc: "Find target in a mountain array." },
            { id: "bs-h4", title: "Minimize Max Distance to Gas Station", lc: "774", desc: "Binary search on answer for gas stations." },
          ],
        },
      },
    ],
  },

  /* ────────────────────────────────────────────────────────────
     2. STRINGS
     ──────────────────────────────────────────────────────────── */
  {
    id: "strings",
    name: "Strings",
    emoji: "≣",
    color: "#FF9F0A",
    patterns: [
      {
        id: "str-window",
        name: "Sliding Window",
        theory: `Same sliding window idea as arrays, but now we slide across characters! We use a HashMap to track character frequencies inside our current window.\n\nPerfect for:\n• Anagram detection: Does "abc" appear anywhere in "cbaebabacd"?\n• Minimum covering substring: Smallest window containing all chars of pattern\n• Longest substring with at most k distinct characters\n\nKey: Expand right pointer to grow window, shrink from left when condition breaks.`,
        example: `// 🎯 Find all starting positions of "abc" anagrams in "cbaebabacd"
// Anagram = same letters, any order (abc, bca, cab, bac...)

function findAnagrams(s, p) {
  const pCount = {}, wCount = {};
  const result = [];

  for (const c of p) pCount[c] = (pCount[c] || 0) + 1;
  // pCount = { a:1, b:1, c:1 }

  let left = 0;

  for (let right = 0; right < s.length; right++) {
    // 🔵 Expand: add right character to window
    const c = s[right];
    wCount[c] = (wCount[c] || 0) + 1;

    // 🔴 Shrink: window too large — remove left character
    if (right - left + 1 > p.length) {
      const lc = s[left++];
      wCount[lc]--;
      if (wCount[lc] === 0) delete wCount[lc];
    }

    // ✅ Check: does window match pattern?
    if (JSON.stringify(wCount) === JSON.stringify(pCount)) {
      result.push(left);
    }
  }
  return result;
}

console.log(findAnagrams("cbaebabacd", "abc"));
// [0, 6]  →  "cba" at index 0, "bac" at index 6`,
        questions: {
          easy: [
            { id: "ssw-e1", title: "Find All Anagrams in a String", lc: "438", desc: "All start indices where p's anagram appears in s." },
            { id: "ssw-e2", title: "Max Vowels in Substring of Length K", lc: "1456", desc: "Maximum vowels in any substring of length k." },
            { id: "ssw-e3", title: "Substrings of Size 3 with Distinct Chars", lc: "1876", desc: "Count substrings of length 3 with all distinct chars." },
            { id: "ssw-e4", title: "Number of Substrings with All Three Chars", lc: "1358", desc: "Count substrings containing at least one a, b, c." },
          ],
          medium: [
            { id: "ssw-m1", title: "Longest Substring Without Repeating Chars", lc: "3", desc: "Variable-size sliding window on strings." },
            { id: "ssw-m2", title: "Permutation in String", lc: "567", desc: "Check if s2 contains any permutation of s1." },
            { id: "ssw-m3", title: "Longest Repeating Character Replacement", lc: "424", desc: "Replace k chars to get longest same-char substring." },
            { id: "ssw-m4", title: "Longest Subarray of 1s After Deleting One", lc: "1493", desc: "Max length of subarray of 1s after one deletion." },
          ],
          hard: [
            { id: "ssw-h1", title: "Minimum Window Substring", lc: "76", desc: "Min window in s containing all chars of t." },
            { id: "ssw-h2", title: "Substring with Concatenation of All Words", lc: "30", desc: "Substrings that are concatenation of all words." },
            { id: "ssw-h3", title: "Subarrays with K Different Integers", lc: "992", desc: "Count subarrays with exactly k distinct integers." },
            { id: "ssw-h4", title: "Minimum Window Subsequence", lc: "727", desc: "Minimum window in s where t appears as subsequence." },
          ],
        },
      },
      {
        id: "str-twoptr",
        name: "Two Pointers",
        theory: `Two pointers on strings is incredibly elegant for palindromes, reversals, and compression.\n\nFor palindrome checks: left pointer at start, right at end, walk inward comparing characters. If they always match → palindrome!\n\nFor string compression: fast pointer reads ahead while slow pointer writes. Counts consecutive chars without extra space.\n\nFor reverse words: split into words, reverse the array, join back.`,
        example: `// 🎯 Reverse words in a string
// "Hello World" → "World Hello"

function reverseWords(s) {
  const words = s.trim().split(/\\s+/);
  let left = 0, right = words.length - 1;

  while (left < right) {
    [words[left], words[right]] = [words[right], words[left]];
    left++;
    right--;
  }
  return words.join(' ');
}

// 🎯 Palindrome ignoring non-alphanumeric chars
function isPalindrome(s) {
  const clean = s.toLowerCase().replace(/[^a-z0-9]/g, '');
  let left = 0, right = clean.length - 1;

  while (left < right) {
    if (clean[left] !== clean[right]) return false;
    left++;
    right--;
  }
  return true;
}

console.log(reverseWords("Hello World"));                     // "World Hello"
console.log(isPalindrome("A man, a plan, a canal: Panama")); // true`,
        questions: {
          easy: [
            { id: "stp-e1", title: "Valid Palindrome", lc: "125", desc: "Check if string is palindrome ignoring non-alphanumeric." },
            { id: "stp-e2", title: "Reverse String", lc: "344", desc: "Reverse array of characters in-place." },
            { id: "stp-e3", title: "Reverse Vowels of a String", lc: "345", desc: "Reverse only the vowels of a string." },
            { id: "stp-e4", title: "Merge Strings Alternately", lc: "1768", desc: "Interleave two strings alternately." },
          ],
          medium: [
            { id: "stp-m1", title: "Reverse Words in a String", lc: "151", desc: "Reverse the order of words in a string." },
            { id: "stp-m2", title: "String Compression", lc: "443", desc: "Compress string using counts of repeated chars." },
            { id: "stp-m3", title: "Palindromic Substrings", lc: "647", desc: "Count all palindromic substrings." },
            { id: "stp-m4", title: "Longest Palindromic Substring", lc: "5", desc: "Find the longest palindromic substring." },
          ],
          hard: [
            { id: "stp-h1", title: "Valid Palindrome III", lc: "1216", desc: "Check if palindrome possible with k deletions." },
            { id: "stp-h2", title: "Palindrome Pairs", lc: "336", desc: "Find all pairs of words that form palindromes." },
            { id: "stp-h3", title: "Shortest Palindrome", lc: "214", desc: "Add characters to front to make shortest palindrome." },
            { id: "stp-h4", title: "Min Insertions to Make String Palindrome", lc: "1312", desc: "Minimum insertions to make string a palindrome." },
          ],
        },
      },
    ],
  },

  /* ────────────────────────────────────────────────────────────
     3. GRAPHS
     ──────────────────────────────────────────────────────────── */
  {
    id: "graphs",
    name: "Graphs",
    emoji: "⬡",
    color: "#30D158",
    patterns: [
      {
        id: "bfs",
        name: "BFS — Breadth First Search",
        theory: `Drop a stone in a pond. Ripples spread outward in rings — first the nearest ring, then the next, then the next. BFS works EXACTLY like this!\n\nStarting from a source node, BFS visits all nodes at distance 1, then distance 2, then 3... using a QUEUE (first-in-first-out).\n\nBFS is the go-to for:\n• Shortest path in unweighted graphs\n• Level-order traversal\n• Finding nearest neighbor\n• "Degrees of separation" problems`,
        example: `// 🎯 Shortest path from A to D

function bfs(graph, start, end) {
  const queue   = [[start, [start]]]; // [node, path so far]
  const visited = new Set([start]);

  while (queue.length > 0) {
    const [node, path] = queue.shift(); // Take from FRONT 📤

    if (node === end) return path; // Reached destination! 🎉

    for (const neighbor of (graph[node] || [])) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        queue.push([neighbor, [...path, neighbor]]);
      }
    }
  }
  return null;
}

const graph = { A:['B','C'], B:['A','D'], C:['A','D'], D:['B','C'] };

// BFS explores level by level:
// Level 0: [A]
// Level 1: [B, C]   (A's neighbors)
// Level 2: [D]      (B's & C's new neighbors)

console.log(bfs(graph, 'A', 'D')); // ['A', 'B', 'D']`,
        questions: {
          easy: [
            { id: "bfs-e1", title: "Flood Fill", lc: "733", desc: "Fill connected region with new color." },
            { id: "bfs-e2", title: "Number of Islands", lc: "200", desc: "Count islands in a binary grid." },
            { id: "bfs-e3", title: "Find if Path Exists in Graph", lc: "1971", desc: "Check path between source and destination." },
            { id: "bfs-e4", title: "Find the Town Judge", lc: "997", desc: "Find node trusted by all others." },
          ],
          medium: [
            { id: "bfs-m1", title: "Rotting Oranges", lc: "994", desc: "Multi-source BFS — time for all oranges to rot." },
            { id: "bfs-m2", title: "01 Matrix", lc: "542", desc: "Distance to nearest 0 for each cell." },
            { id: "bfs-m3", title: "Word Ladder", lc: "127", desc: "Shortest transformation from beginWord to endWord." },
            { id: "bfs-m4", title: "Course Schedule", lc: "207", desc: "Detect cycle using BFS — Kahn's topological sort." },
          ],
          hard: [
            { id: "bfs-h1", title: "Word Ladder II", lc: "126", desc: "All shortest transformation sequences." },
            { id: "bfs-h2", title: "Shortest Path in Grid with Obstacle Elimination", lc: "1293", desc: "BFS with state = (pos, remaining eliminations)." },
            { id: "bfs-h3", title: "Minimum Cost to Make at Least One Valid Path", lc: "1368", desc: "0-1 BFS for min cost path in grid." },
            { id: "bfs-h4", title: "Cut Off Trees for Golf Event", lc: "675", desc: "BFS for minimum steps to cut all trees in order." },
          ],
        },
      },
      {
        id: "dfs",
        name: "DFS — Depth First Search",
        theory: `Exploring a maze: you pick one path and go as deep as possible until you hit a dead end. Then you backtrack and try the next path. That's DFS!\n\nDFS uses a STACK (or recursion) and dives DEEP before going wide. It's like reading a book — finish one chapter completely before starting the next.\n\nDFS excels at:\n• Cycle detection\n• Connected components\n• Topological sorting\n• Backtracking puzzles (Sudoku, N-Queens)\n• Tree path problems`,
        example: `// 🎯 Count islands — explore entire island with DFS
// Grid: '1' = land, '0' = water

function numIslands(grid) {
  let count = 0;

  function dfs(row, col) {
    if (row < 0 || row >= grid.length) return;
    if (col < 0 || col >= grid[0].length) return;
    if (grid[row][col] !== '1') return;

    grid[row][col] = '0'; // Mark visited (sink the land)

    dfs(row + 1, col); // ⬇️ Down
    dfs(row - 1, col); // ⬆️ Up
    dfs(row, col + 1); // ➡️ Right
    dfs(row, col - 1); // ⬅️ Left
  }

  for (let r = 0; r < grid.length; r++) {
    for (let c = 0; c < grid[0].length; c++) {
      if (grid[r][c] === '1') {
        dfs(r, c);
        count++;
      }
    }
  }
  return count;
}

const grid = [['1','1','0'],['1','1','0'],['0','0','1']];
console.log(numIslands(grid)); // 2`,
        questions: {
          easy: [
            { id: "dfs-e1", title: "Number of Islands", lc: "200", desc: "Count islands using DFS." },
            { id: "dfs-e2", title: "Max Area of Island", lc: "695", desc: "Find the island with maximum area." },
            { id: "dfs-e3", title: "Path Sum", lc: "112", desc: "Root-to-leaf path with target sum." },
            { id: "dfs-e4", title: "Same Tree", lc: "100", desc: "Check if two binary trees are identical." },
          ],
          medium: [
            { id: "dfs-m1", title: "Pacific Atlantic Water Flow", lc: "417", desc: "Cells where water reaches both oceans." },
            { id: "dfs-m2", title: "Clone Graph", lc: "133", desc: "Deep clone a graph using DFS + hashmap." },
            { id: "dfs-m3", title: "Number of Provinces", lc: "547", desc: "Count connected components using DFS." },
            { id: "dfs-m4", title: "All Paths From Source to Target", lc: "797", desc: "All paths from 0 to n-1 in a DAG." },
          ],
          hard: [
            { id: "dfs-h1", title: "Critical Connections in a Network", lc: "1192", desc: "Find bridges using Tarjan's DFS." },
            { id: "dfs-h2", title: "Reconstruct Itinerary", lc: "332", desc: "Find Eulerian path using DFS." },
            { id: "dfs-h3", title: "Alien Dictionary", lc: "269", desc: "Char ordering from sorted alien words using DFS." },
            { id: "dfs-h4", title: "Largest Color Value in Directed Graph", lc: "1857", desc: "Max frequency of any color in topological order." },
          ],
        },
      },
    ],
  },

  /* ────────────────────────────────────────────────────────────
     4. DYNAMIC PROGRAMMING
     ──────────────────────────────────────────────────────────── */
  {
    id: "dp",
    name: "Dynamic Programming",
    emoji: "◈",
    color: "#FF453A",
    patterns: [
      {
        id: "1d-dp",
        name: "1D Dynamic Programming",
        theory: `You're climbing stairs — 1 or 2 steps at a time. How many ways to reach step 10?\n\nInstead of recalculating from scratch (like a confused tourist revisiting the same street), DP solves each subproblem ONCE and stores the answer for reuse.\n\nDP in 3 steps:\n1. Define dp[i] = answer for subproblem i\n2. Find the recurrence (how big problems depend on small ones)\n3. Fill the table bottom-up OR use memoization top-down`,
        example: `// 🎯 Fibonacci — the classic DP intro

// ❌ Naive — exponential time (recalculates everything)
function fibSlow(n) {
  if (n <= 1) return n;
  return fibSlow(n - 1) + fibSlow(n - 2);
}

// ✅ DP Tabulation (bottom-up)
function fibDP(n) {
  if (n <= 1) return n;
  const dp = new Array(n + 1);
  dp[0] = 0;
  dp[1] = 1;

  for (let i = 2; i <= n; i++) {
    dp[i] = dp[i - 1] + dp[i - 2]; // Use stored answers!
  }
  return dp[n];
}

// 🔥 Space Optimised — only track last 2 values
function fibOptimal(n) {
  if (n <= 1) return n;
  let prev2 = 0, prev1 = 1;
  for (let i = 2; i <= n; i++) {
    [prev2, prev1] = [prev1, prev1 + prev2];
  }
  return prev1;
}

console.log(fibDP(10));      // 55
console.log(fibOptimal(10)); // 55 — same answer, O(1) space!`,
        questions: {
          easy: [
            { id: "1d-e1", title: "Climbing Stairs", lc: "70", desc: "How many ways to climb n stairs (1 or 2 steps)." },
            { id: "1d-e2", title: "Fibonacci Number", lc: "509", desc: "Compute the nth Fibonacci number." },
            { id: "1d-e3", title: "House Robber", lc: "198", desc: "Max money without robbing adjacent houses." },
            { id: "1d-e4", title: "Min Cost Climbing Stairs", lc: "746", desc: "Min cost to reach top of staircase." },
          ],
          medium: [
            { id: "1d-m1", title: "Coin Change", lc: "322", desc: "Minimum coins to make amount." },
            { id: "1d-m2", title: "Decode Ways", lc: "91", desc: "Count ways to decode encoded message string." },
            { id: "1d-m3", title: "Longest Increasing Subsequence", lc: "300", desc: "Length of longest strictly increasing subsequence." },
            { id: "1d-m4", title: "Jump Game", lc: "55", desc: "Check if you can reach the last index." },
          ],
          hard: [
            { id: "1d-h1", title: "Jump Game II", lc: "45", desc: "Minimum jumps to reach the last index." },
            { id: "1d-h2", title: "Longest Valid Parentheses", lc: "32", desc: "Longest valid parentheses substring." },
            { id: "1d-h3", title: "Palindrome Partitioning II", lc: "132", desc: "Minimum cuts to partition into palindromes." },
            { id: "1d-h4", title: "Minimum Cost to Cut a Stick", lc: "1547", desc: "Min cost to cut stick at given positions." },
          ],
        },
      },
    ],
  },

  /* ────────────────────────────────────────────────────────────
     5. TREES
     ──────────────────────────────────────────────────────────── */
  {
    id: "trees",
    name: "Trees",
    emoji: "⬢",
    color: "#34C759",
    patterns: [
      {
        id: "tree-traversal",
        name: "DFS Tree Traversal",
        theory: `A tree is like a family tree — root at top, branches going down.\n\nDFS tree traversal visits all nodes by going deep before backtracking. Three classic orders:\n\n• Preorder (Root → Left → Right): Like a table of contents — label before content\n• Inorder (Left → Root → Right): Gives SORTED order for BST!\n• Postorder (Left → Right → Root): Process children before parent\n\nMost tree problems are solved with elegant recursion!`,
        example: `//        1
//       / \\
//      2   3
//     / \\
//    4   5
// Preorder:  [1, 2, 4, 5, 3]
// Inorder:   [4, 2, 5, 1, 3]
// Postorder: [4, 5, 2, 3, 1]

function preorder(node, result = []) {
  if (!node) return result;
  result.push(node.val);        // 1️⃣ ROOT first
  preorder(node.left,  result);
  preorder(node.right, result);
  return result;
}

function inorder(node, result = []) {
  if (!node) return result;
  inorder(node.left,  result);
  result.push(node.val);        // 2️⃣ ROOT in middle
  inorder(node.right, result);
  return result;
}

function postorder(node, result = []) {
  if (!node) return result;
  postorder(node.left,  result);
  postorder(node.right, result);
  result.push(node.val);        // 3️⃣ ROOT last
  return result;
}

// Pro tip: max depth in one line!
const maxDepth = (node) =>
  !node ? 0 : 1 + Math.max(maxDepth(node.left), maxDepth(node.right));`,
        questions: {
          easy: [
            { id: "tt-e1", title: "Binary Tree Inorder Traversal", lc: "94", desc: "Return inorder traversal of a binary tree." },
            { id: "tt-e2", title: "Maximum Depth of Binary Tree", lc: "104", desc: "Find maximum depth / height of binary tree." },
            { id: "tt-e3", title: "Symmetric Tree", lc: "101", desc: "Check if tree is a mirror of itself." },
            { id: "tt-e4", title: "Path Sum", lc: "112", desc: "Check if root-to-leaf path sums to target." },
          ],
          medium: [
            { id: "tt-m1", title: "Binary Tree Level Order Traversal", lc: "102", desc: "Level-by-level traversal using BFS." },
            { id: "tt-m2", title: "Validate Binary Search Tree", lc: "98", desc: "Check if BST property holds for all nodes." },
            { id: "tt-m3", title: "Construct Tree from Preorder and Inorder", lc: "105", desc: "Rebuild binary tree from two traversals." },
            { id: "tt-m4", title: "Binary Tree Right Side View", lc: "199", desc: "Nodes visible from the right side." },
          ],
          hard: [
            { id: "tt-h1", title: "Binary Tree Maximum Path Sum", lc: "124", desc: "Max sum path between any two nodes." },
            { id: "tt-h2", title: "Serialize and Deserialize Binary Tree", lc: "297", desc: "Encode/decode binary tree to/from string." },
            { id: "tt-h3", title: "Recover Binary Search Tree", lc: "99", desc: "Fix BST where exactly two nodes were swapped." },
            { id: "tt-h4", title: "Binary Tree Cameras", lc: "968", desc: "Minimum cameras to monitor all tree nodes." },
          ],
        },
      },
    ],
  },

  /* ────────────────────────────────────────────────────────────
     6. STACK
     ──────────────────────────────────────────────────────────── */
  {
    id: "stack",
    name: "Stack",
    emoji: "≡",
    color: "#FF6B6B",
    patterns: [
      {
        id: "mono-stack",
        name: "Monotonic Stack",
        theory: `A regular stack becomes "monotonic" when you enforce that it's ALWAYS sorted — either always increasing or always decreasing from bottom to top.\n\nClassic use: "Next Greater Element" for each array element.\n\nWhen you push a new element, pop everything it's greater than (for increasing stack). Those popped elements found their "next greater" — it's the current element!\n\nResult: O(n) time for what looks like an O(n²) problem!`,
        example: `// 🎯 Next Greater Element for each number
// [2, 1, 2, 4, 3] → [4, 2, 4, -1, -1]

function nextGreater(arr) {
  const result = new Array(arr.length).fill(-1);
  const stack  = []; // Stores INDICES (monotonic decreasing values)

  for (let i = 0; i < arr.length; i++) {
    // Pop everything smaller than current element
    while (stack.length && arr[i] > arr[stack.at(-1)]) {
      const idx = stack.pop();
      result[idx] = arr[i]; // Current is the "next greater"! 🎯
    }
    stack.push(i);
  }
  return result;
}

// Walkthrough for [2, 1, 2, 4, 3]:
// i=0: stack=[0]
// i=1: 1<2 → stack=[0,1]
// i=2: 2>1 → pop 1, result[1]=2; stack=[0,2]
// i=3: 4>2 → pop 2, result[2]=4; pop 0, result[0]=4; stack=[3]
// i=4: 3<4 → stack=[3,4]
// Remaining in stack → stay -1

console.log(nextGreater([2, 1, 2, 4, 3])); // [4, 2, 4, -1, -1]`,
        questions: {
          easy: [
            { id: "ms-e1", title: "Next Greater Element I", lc: "496", desc: "Find next greater element for each in nums1." },
            { id: "ms-e2", title: "Daily Temperatures", lc: "739", desc: "Days to wait until a warmer temperature." },
            { id: "ms-e3", title: "Remove All Adjacent Duplicates in String", lc: "1047", desc: "Repeatedly remove adjacent duplicates." },
            { id: "ms-e4", title: "Baseball Game", lc: "682", desc: "Stack-based score calculation simulation." },
          ],
          medium: [
            { id: "ms-m1", title: "Next Greater Element II", lc: "503", desc: "Next greater in circular array." },
            { id: "ms-m2", title: "132 Pattern", lc: "456", desc: "Find 132 pattern using monotonic stack." },
            { id: "ms-m3", title: "Remove K Digits", lc: "402", desc: "Remove k digits to get smallest number." },
            { id: "ms-m4", title: "Sum of Subarray Minimums", lc: "907", desc: "Sum of minimum of every subarray." },
          ],
          hard: [
            { id: "ms-h1", title: "Largest Rectangle in Histogram", lc: "84", desc: "Largest rectangle that fits in histogram." },
            { id: "ms-h2", title: "Maximal Rectangle", lc: "85", desc: "Largest rectangle containing only 1s in matrix." },
            { id: "ms-h3", title: "Trapping Rain Water", lc: "42", desc: "Total water trapped between bars." },
            { id: "ms-h4", title: "Maximum Width Ramp", lc: "962", desc: "Max width ramp using decreasing monotonic stack." },
          ],
        },
      },
    ],
  },

  /* ────────────────────────────────────────────────────────────
     7. HEAP
     ──────────────────────────────────────────────────────────── */
  {
    id: "heap",
    name: "Heap",
    emoji: "△",
    color: "#BF5AF2",
    patterns: [
      {
        id: "top-k",
        name: "Top K Elements",
        theory: `1 million reviews, you want the top 10. You don't need to sort ALL of them!\n\nA Min-Heap of size K is your best friend here. As you scan elements:\n• Add element to heap\n• If heap size exceeds K → remove the SMALLEST (root of min-heap)\n• What remains: the K LARGEST elements!\n\nTime: O(n log k) — much better than O(n log n) sort when k is small.`,
        example: `// 🎯 Find K largest elements
// [3, 1, 5, 12, 2, 11],  k = 3  →  [5, 11, 12]

class MinHeap {
  constructor() { this.data = []; }
  push(val) {
    this.data.push(val);
    this.data.sort((a, b) => a - b); // Smallest at front
  }
  pop()  { return this.data.shift(); }
  size() { return this.data.length; }
}

function kLargest(arr, k) {
  const heap = new MinHeap();

  for (const num of arr) {
    heap.push(num);

    if (heap.size() > k) {
      heap.pop(); // Remove SMALLEST — keep only K largest
    }
    // Heap after processing [3,1,5,12,2,11]:
    // After 12 → pop 1 → [3, 5, 12]
    // After 2  → pop 2 → [3, 5, 12]
    // After 11 → pop 3 → [5, 11, 12] ✅
  }
  return heap.data; // [5, 11, 12]
}

console.log(kLargest([3, 1, 5, 12, 2, 11], 3)); // [5, 11, 12]`,
        questions: {
          easy: [
            { id: "tk-e1", title: "Kth Largest Element in a Stream", lc: "703", desc: "Find kth largest in a running stream." },
            { id: "tk-e2", title: "Last Stone Weight", lc: "1046", desc: "Simulate stone smashing with max heap." },
            { id: "tk-e3", title: "Relative Ranks", lc: "506", desc: "Assign medal ranks using heap sorting." },
            { id: "tk-e4", title: "Minimum Cost to Connect Sticks", lc: "1167", desc: "Min cost to connect sticks using min heap." },
          ],
          medium: [
            { id: "tk-m1", title: "Kth Largest Element in an Array", lc: "215", desc: "Find kth largest using min heap of size k." },
            { id: "tk-m2", title: "Top K Frequent Elements", lc: "347", desc: "Find k most frequent elements." },
            { id: "tk-m3", title: "K Closest Points to Origin", lc: "973", desc: "Find k closest points using max heap." },
            { id: "tk-m4", title: "Sort Characters By Frequency", lc: "451", desc: "Sort characters by decreasing frequency." },
          ],
          hard: [
            { id: "tk-h1", title: "Find Median from Data Stream", lc: "295", desc: "Two heaps to maintain running median." },
            { id: "tk-h2", title: "Sliding Window Median", lc: "480", desc: "Median of each sliding window of size k." },
            { id: "tk-h3", title: "IPO", lc: "502", desc: "Maximize capital with at most k projects." },
            { id: "tk-h4", title: "Merge K Sorted Lists", lc: "23", desc: "Merge k sorted linked lists using min heap." },
          ],
        },
      },
    ],
  },
];
