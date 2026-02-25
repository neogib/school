const form = document.getElementById("password-form");
const input = document.getElementById("password-input");
const resultBox = document.getElementById("result");
const scoreLabel = document.getElementById("score-label");
const scoreValue = document.getElementById("score-value");
const meterFill = document.getElementById("meter-fill");
const goodList = document.getElementById("good-list");
const improveList = document.getElementById("improve-list");

const commonPasswords = [
  "123456",
  "1234",
  "123456789",
  "qwerty",
  "password",
  "12345",
  "111111",
  "123123",
  "qwerty123",
  "admin",
  "welcome",
  "monkey",
  "abc123",
  "tst",
  "test",
  "abcd",
];

const weakPatterns = ["1234", "abcd", "qwerty", "password"];

function hasSequence(value) {
  const lower = value.toLowerCase();
  for (let i = 0; i < lower.length - 3; i += 1) {
    const chunk = lower.slice(i, i + 4);
    if (weakPatterns.some((pattern) => chunk.includes(pattern))) {
      return true;
    }
  }
  return false;
}

function hasTooManyRepeats(value) {
  return /(.)\1\1/.test(value);
}

function getLevel(score) {
  if (score < 25) return "Bardzo słabe";
  if (score < 50) return "Słabe";
  if (score < 70) return "Średnie";
  if (score < 85) return "Silne";
  return "Bardzo silne";
}

function getColor(score) {
  if (score < 25) return "#d14343";
  if (score < 50) return "#e07a1f";
  if (score < 70) return "#d5a021";
  if (score < 85) return "#3f8f3f";
  return "#1f7a1f";
}

function addItem(list, text) {
  const li = document.createElement("li");
  li.textContent = text;
  list.appendChild(li);
}

function evaluatePassword(password) {
  let score = 0;
  const good = [];
  const improve = [];

  if (password.length >= 12) {
    score += 30;
    good.push("Długość hasła to co najmniej 12 znaków.");
  } else if (password.length >= 8) {
    score += 20;
    good.push("Hasło ma minimum 8 znaków.");
    improve.push("Wydłuż hasło do 12+ znaków.");
  } else {
    improve.push("Hasło jest za krótkie — użyj minimum 8 znaków (lepiej 12+).");
  }

  if (/[a-z]/.test(password)) {
    score += 10;
    good.push("Zawiera małe litery.");
  } else {
    improve.push("Dodaj małe litery.");
  }

  if (/[A-Z]/.test(password)) {
    score += 10;
    good.push("Zawiera duże litery.");
  } else {
    improve.push("Dodaj duże litery.");
  }

  if (/\d/.test(password)) {
    score += 10;
    good.push("Zawiera cyfry.");
  } else {
    improve.push("Dodaj cyfry.");
  }

  if (/[^A-Za-z0-9]/.test(password)) {
    score += 10;
    good.push("Zawiera znaki specjalne.");
  } else {
    improve.push("Dodaj znaki specjalne, np. !, @, #, $.");
  }

  const lowered = password.toLowerCase();
  if (commonPasswords.includes(lowered)) {
    score -= 35;
    improve.push("To bardzo popularne hasło — zmień je całkowicie.");
  } else {
    score += 10;
    good.push("Nie jest to hasło z listy najpopularniejszych.");
  }

  if (hasSequence(password)) {
    score -= 15;
    improve.push("Unikaj sekwencji typu 1234, abcd, qwerty.");
  } else {
    score += 10;
    good.push("Brak oczywistych sekwencji znaków.");
  }

  if (hasTooManyRepeats(password)) {
    score -= 10;
    improve.push("Unikaj wielu powtórzeń tego samego znaku.");
  } else {
    score += 10;
    good.push("Brak długich powtórzeń znaków.");
  }

  score = Math.max(0, Math.min(100, score));

  if (improve.length === 0) {
    improve.push(
      "Brak krytycznych uwag. Dla pełnego bezpieczeństwa używaj też 2FA.",
    );
  }

  return {
    score,
    level: getLevel(score),
    color: getColor(score),
    good,
    improve,
  };
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const password = input.value;

  const data = evaluatePassword(password);
  resultBox.classList.remove("hidden");

  scoreLabel.textContent = data.level;
  scoreValue.textContent = `(${data.score}/100)`;
  meterFill.style.width = `${data.score}%`;
  meterFill.style.backgroundColor = data.color;

  goodList.innerHTML = "";
  improveList.innerHTML = "";

  data.good.forEach((item) => addItem(goodList, item));
  data.improve.forEach((item) => addItem(improveList, item));
});
