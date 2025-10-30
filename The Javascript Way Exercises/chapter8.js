// Word Info
const word = prompt("Enter a word:");
console.log("Length:", word.length);
console.log("Lowercase:", word.toLowerCase());
console.log("Uppercase:", word.toUpperCase());


// Vowel Count
const word = prompt("Enter a word:");
const lower = word.toLowerCase();
let vowelCount = 0;

for (let i = 0; i < lower.length; i++) {
  const letter = lower[i];
  if (letter === "a" || letter === "e" || letter === "i" || letter === "o" || letter === "u") {
    vowelCount++;
  }
}

console.log("Length:", word.length);
console.log("Lowercase:", lower);
console.log("Uppercase:", word.toUpperCase());
console.log("Vowel count:", vowelCount);


// Backwards Word
const word = prompt("Enter a word:");
const lower = word.toLowerCase();
let vowelCount = 0;
let reversed = "";

for (let i = 0; i < lower.length; i++) {
  const letter = lower[i];
  if (letter === "a" || letter === "e" || letter === "i" || letter === "o" || letter === "u") {
    vowelCount++;
  }
}

for (let i = word.length - 1; i >= 0; i--) {
  reversed += word[i];
}

console.log("Length:", word.length);
console.log("Lowercase:", lower);
console.log("Uppercase:", word.toUpperCase());
console.log("Vowel count:", vowelCount);
console.log("Backwards:", reversed);


// Palindrome
const word = prompt("Enter a word:");
const lower = word.toLowerCase();
let vowelCount = 0;
let reversed = "";

for (let i = 0; i < lower.length; i++) {
  const letter = lower[i];
  if (letter === "a" || letter === "e" || letter === "i" || letter === "o" || letter === "u") {
    vowelCount++;
  }
}

for (let i = lower.length - 1; i >= 0; i--) {
  reversed += lower[i];
}

const isPalindrome = lower === reversed;

console.log("Length:", word.length);
console.log("Lowercase:", lower);
console.log("Uppercase:", word.toUpperCase());
console.log("Vowel count:", vowelCount);
console.log("Backwards:", reversed);
console.log("Palindrome:", isPalindrome ? "Yes" : "No");