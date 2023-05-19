const testWords = [
  "Hello",
  "Test",
  "Kissa",
  "Koira",
  "Omena",
  "Banaani",
  "Ananas",
];

const specialCharsList = ["!", "#", "¤", "%", "&", "/", "(", ")", "=", "@"];

console.log(testWords);

let btnGeneratePW = document.getElementById("btnGeneratePW");
btnGeneratePW.onclick = function () {
  const pw = generatePassword();
  console.log(pw);
  const list = document.getElementById("pwList");
  list.innerHTML = "<li>" + pw + "</li>";
};

function generatePassword(
  minLength = 8,
  maxLength = 16,
  capLetters = true,
  numbers = true,
  specialChars = true
) {
  let pw = "";
  while (true) {
    const word = getWords(1);
    pw += word;

    if (numbers) {
      const number = Math.floor(Math.random() * 9);
      pw += number;
    }
    if (specialChars) {
      const random = Math.floor(Math.random() * specialCharsList.length);
      pw += specialCharsList[random];
    }
    if (pw.length > maxLength) {
      console.log("over max length");
      pw = pw.slice(0, maxLength);
    }
    if (pw.length >= minLength) {
      console.log("min length");
      break;
    }
  }
  return pw;
}

function getWords(count) {
  var words = [];
  for (let index = 0; index < count; index++) {
    const random = Math.floor(Math.random() * testWords.length);
    words.push(testWords[random]);
  }
  return words;
}
