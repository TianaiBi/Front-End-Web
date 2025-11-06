const emojiSets = [
  ["🩵", "🍀", "🌷", "⭐️", "☁️"],
  ["🌵", "🌼", "🌈", "❄️", "🍒"],
  ["🫐", "🥐", "🍭", "🐚", "🌾"]
];

let currentSet = 0;
let symbols = emojiSets[currentSet];

const slots = [
  document.getElementById("slot1"),
  document.getElementById("slot2"),
  document.getElementById("slot3")
];
const message = document.getElementById("message");

document.getElementById("spinBtn").onclick = spinMachine;
document.getElementById("resetBtn").onclick = resetMachine;
document.getElementById("changeSetBtn").onclick = changeEmojiSet;

function spinMachine() {
  message.innerText = "Spinning...";
  for (let slot of slots) {
    slot.classList.add("spin");
  }

  setTimeout(() => {
    for (let slot of slots) {
      slot.classList.remove("spin");
      const randomSymbol = symbols[Math.floor(Math.random() * symbols.length)];
      slot.innerText = randomSymbol;
    }

    checkResult();
  }, 1000);
}

function checkResult() {
  const [a, b, c] = slots.map(s => s.innerText);
  if (a === b && b === c) {
    message.innerText = "Congrats! You got " + a + a + a + "!";
  } else if (a === b || b === c) {
    message.innerText = "You are close! Keep trying."
  } else {
    message.innerText = "Try again!";
  }
}

function resetMachine() {
  for (let slot of slots) slot.innerText = "❓";
  message.innerText = "Good luck!";
}

function changeEmojiSet() {
  currentSet = (currentSet + 1) % emojiSets.length;
  symbols = emojiSets[currentSet];
  message.innerText = "Emoji set changed!";
}