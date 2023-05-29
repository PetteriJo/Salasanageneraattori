var specialCharsList = ["!", "#", "¤", "%", "&", "/", "(", ")", "=", "@"];

let btnGeneratePW = document.getElementById("btnGeneratePW");
btnGeneratePW.onclick = async () => {
  var minLength = document.getElementById("minlength").value;
  var maxLength = document.getElementById("maxlength").value;
  var capLetters = document.getElementById("capitals").checked;
  var numbers = document.getElementById("numbers").checked;
  var specialChars = document.getElementById("special").checked;
  var pwCount = document.getElementById("pwcount").value;

  const list = document.getElementById("pwList");
  list.innerHTML = "";

  for (let index = 0; index < pwCount; index++) {
    var pw = await generatePassword(
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

async function generatePassword(
  minLength = 8,
  maxLength = 16,
  capLetters = true,
  numbers = true,
  specialChars = true
) {
  var pw = "";
  while (true) {
    var wordsResponse = await getWords(1);
    var words = await wordsResponse;
    console.log("words: " + words);

    pw += words[0];

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

async function getWords(count) {
  try {
    console.log("Starting to get words from DB");
    const response = await fetch(
      "https://6ouqx7kaqh.execute-api.eu-north-1.amazonaws.com/dev/getwords"
    );
    const jsonData = await response.json().then();

    var words = jsonData;
    console.log("jsonData in getWords: " + jsonData);
    console.log("words in getWords: " + words);
    return words;
  } catch (error) {
    console.log(error);
  }
}
