var testWords = [
  "Hello",
  "Test",
  "Kissa",
  "Koira",
  "Omena",
  "Banaani",
  "Ananas",
];

var specialCharsList = ["!", "#", "¤", "%", "&", "/", "(", ")", "=", "@"];

console.log(testWords);

let btnGeneratePW = document.getElementById("btnGeneratePW");
btnGeneratePW.onclick = function () {
  var minLength = document.getElementById("minlength").value;
  var maxLength = document.getElementById("maxlength").value;
  var capLetters = document.getElementById("capitals").checked;
  var numbers = document.getElementById("numbers").checked;
  var specialChars = document.getElementById("special").checked;
  var pwCount = document.getElementById("pwcount").value;

  const list = document.getElementById("pwList");
  list.innerHTML = "";

  for (let index = 0; index < pwCount; index++) {
    var pw = generatePassword(
      minLength,
      maxLength,
      capLetters,
      numbers,
      specialChars
    );
    console.log(pw);
    list.innerHTML += "<li>" + pw + "</li>";
  }
};

function generatePassword(
  minLength = 8,
  maxLength = 16,
  capLetters = true,
  numbers = true,
  specialChars = true
) {
  var pw = "";
  while (true) {
    var word = getWords(1);
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
  if (capLetters) {
    pw = capRandomLetters(pw);
  }
  return pw;
}

function capRandomLetters(string) {
  var pw = "";
  for (let index = 0; index < string.length; index++) {
    if (Math.random() < 0.5) {
      pw += string.charAt(index).toUpperCase();
    } else {
      pw += string.charAt(index).toLowerCase();
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
