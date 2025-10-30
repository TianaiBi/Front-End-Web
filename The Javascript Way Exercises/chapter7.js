// Exercise 1: Musketeers
const musketeers = ["Athos", "Porthos", "Aramis"];

for (let i = 0; i < musketeers.length; i++) {
  console.log(musketeers[i]);
}

musketeers.push("D'Artagnan");

// Show each element using forEach()
musketeers.forEach(musketeer => {
  console.log(musketeer);
});

musketeers.splice(musketeers.indexOf("Aramis"), 1);

// Show each element using for-of loop
for (const musketeer of musketeers) {
  console.log(musketeer);
}


// Exercise 2: Sum of Values
const values = [3, 11, 7, 2, 9, 10];

let sum = 0;
for (const value of values) {
  sum += value;
}

console.log(`The sum of values is ${sum}`);


// Exercise 3: Array Maximum
const values1 = [3, 11, 7, 2, 9, 10];

let max = values1[0];
for (const value of values1) {
  if (value > max) {
    max = value;
  }
}

console.log(`The maximum value is ${max}`);


// Exercise 4: List of Words
while (true) {
  const input = prompt("Enter a word (type 'stop' to finish):");
  if (input.toLowerCase() === "stop") {
    break;
  }
  words.push(input);
}

console.log("You entered:");
for (const word of words) {
  console.log(word);
}