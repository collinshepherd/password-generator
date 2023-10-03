// This variable takes in the value for the password text inside of the box, initially it has a placeholder saying "Your Secure Password"
// I take this variable so I am able to change the value of the text content to be the new generated password
var passwordText = document.querySelector("#password");

// I created an object here to store all of the possible values needed for generating a password.
// The first 4 values are a boolean to check if the user wants to have each type of character in their password
// The length value is to give a password generator function a length for the password
let options = {
  upper: true,
  lower: true,
  number: true,
  symbols: true,
  length: 16,
};

// This is an event listener that checks my whole form element and whenever there is anything changed on the form it runs the function parseForm
document.getElementById("passwordForm").addEventListener("change", parseForm);

document.getElementById("passwordForm").addEventListener("submit", function (e) {
    e.preventDefault();
  });

// This function checks the value of the entire form all at once to make sure that the form sends the values to the options object and updates all of the variables to match
function parseForm() {
  let myForm = document.getElementById("passwordForm");
  options.length = myForm.querySelector("#passwordLengthRange").value;

  // These two if statements check if the length is greater or less than the allowed amount and tells the user to follow those rules as well as setting them back to the allowed amount
  if (myForm.querySelector("#passwordLengthNumber").value > 128) {
    window.alert("Please do not make the length more than 128");
    options.length = myForm.querySelector("#passwordLengthNumber").value;
  }
  if (myForm.querySelector("#passwordLengthNumber").value < 8) {
    window.alert("Please do not make the length less than 8");
    options.length = myForm.querySelector("#passwordLengthNumber").value;
  }

  options.upper = myForm.querySelector("#upper").checked;
  options.lower = myForm.querySelector("#lower").checked;
  options.number = myForm.querySelector("#number").checked;
  options.symbols = myForm.querySelector("#symbols").checked;
  passwordGenerator(options);
}

// I was able to find this question already for my problem about linking my range value to my number value
// I was able to take it and modify the variables to fit my project and link the values so the slider and number value match on the website
// https://stackoverflow.com/questions/34360448/is-it-possible-to-link-a-range-and-a-numerical-html-input

var range = document.getElementById("passwordLengthRange");
var field = document.getElementById("passwordLengthNumber");

range.addEventListener("input", function (e) {
  e.preventDefault();
  field.value = e.target.value;
});
field.addEventListener("input", function (e) {
  e.preventDefault();
  range.value = e.target.value;
});

// I had to search to find how to create a function that would return a random number and I found an answer online
// This function works perfectly to generate a random number based on a min and max passed through each time you call it
// https://stackoverflow.com/questions/4959975/generate-random-number-between-two-numbers-in-javascript
function randomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// This function requires the passwords options to be passed through whenever it is called and puts that into its own local object within the function
function passwordGenerator(passwordOptions) {
  // These variables are declared here to created the possible characters that can be chosen from
  var allowedCharacters = "";
  var generatedPassword = "";
  var upperCaseLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  var lowerCaseLetters = upperCaseLetters.toLowerCase();
  var passwordNumbers = "0123456789";
  var passwordSymbols = " !#$%&'()*+,-./:;<=>?@[]^_`{|}~";

  // This if statement checks if the user chose an invalid length and if it is the function ends and shows the user an error alert.
  if (passwordOptions.length > 128 || passwordOptions.length < 8) {
    passwordText.textContent =
      "The password can not be greater than 128 or less than 8";
      window.alert("The password can not be greater than 128 or less than 8");
    return 0;
  }

  // This if statement checks if the user has all options off and if they are ends the function and tells the user to select at least one option for their password
  if (
    !passwordOptions.upper &&
    !passwordOptions.lower &&
    !passwordOptions.number &&
    !passwordOptions.symbols
  ) {
    passwordText.textContent =
      "You must choose at least one option for your password";
    return 0;
  }

  // These if statements check to see what characters the user wants in their password and adds them to the allowedCharacters variable
  if (passwordOptions.upper) {
    allowedCharacters += upperCaseLetters;
  }

  if (passwordOptions.lower) {
    allowedCharacters += lowerCaseLetters;
  }

  if (passwordOptions.number) {
    allowedCharacters += passwordNumbers;
  }

  if (passwordOptions.symbols) {
    allowedCharacters += passwordSymbols;
  }

  // This for loop creates the password and loops through adding a character for the length that those user chose for their password
  for (var i = 0; i < passwordOptions.length; i++) {
    generatedPassword +=
      allowedCharacters[randomInteger(0, allowedCharacters.length - 1)];
  }
  passwordText.textContent = generatedPassword;
}

// This calls the function when the website is loaded the first time so it is not a blank password immediately
passwordGenerator(options);

// This function is called when the body loads and then displays and alert for the user to understand what to do on the website
function firstMessage() {
  alert(
    "This is a Password Generator, select through the options below and make sure to choose at least one possible type of character and keep the length between 8 and 128 please. Thank you!"
  );
}
