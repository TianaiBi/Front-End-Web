// Exercise 1: Adding character experience
// TODO: create the character object here
const aurora = {
  name: "Aurora",
  health: 150,
  strength: 25,
  xp: 0, // initial experience

  describe() {
    return `${this.name} has ${this.health} health points, ${this.strength} as strength and ${this.xp} XP`;
  }
};

// Aurora is harmed by an arrow
aurora.health -= 20;

// Aurora equips a strength necklace
aurora.strength += 10;

// Aurora learn a new skill
aurora.xp += 15;

console.log(aurora.describe());


// Exercise 2: Modeling a dog
// TODO: create the dog object here
const dog = {
  name: "Fang",
  species: "boarhound",
  size: 75,

  // Define the bark method
  bark() {
    return "Grrr! Grrr!";
  }
};

console.log(`${dog.name} is a ${dog.species} dog measuring ${dog.size}`);
console.log(`Look, a cat! ${dog.name} barks: ${dog.bark()}`);


//Exercise 3: Modeling a circle
const r = Number(prompt("Enter the circle radius:"));

// TODO: create the circle object here
const circle = {
  radius: r,

  // Method for circumference
  circumference() {
    return 2 * Math.PI * this.radius;
  },

  // Method for area
  area() {
    return Math.PI * this.radius ** 2;
  }
};

console.log(`Its circumference is ${circle.circumference()}`);
console.log(`Its area is ${circle.area()}`);


//Exercise 4: Modeling a bank account
const account = {
  name: "Alex",
  balance: 0,

  // Method to add or subtract money
  credit(amount) {
    this.balance += amount;
  },

  // Method to describe the account
  describe() {
    return `Owner: ${this.name}, Balance: ${this.balance}`;
  }
};

console.log(account.describe());

account.credit(250);

account.credit(-80);

console.log(account.describe());