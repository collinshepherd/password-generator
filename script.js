//

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

// This function checks the value of the entire form all at once to make sure that the form sends the values to the options object and updates all of the variables to match
function parseForm() {
  let myForm = document.getElementById("passwordForm");
  options.length = myForm.querySelector("#passwordLengthRange").value;
  options.upper = myForm.querySelector("#upper").checked;
  options.lower = myForm.querySelector("#lower").checked;
  options.number = myForm.querySelector("#number").checked;
  options.symbols = myForm.querySelector("#symbols").checked;
}

// I was able to find this question already for my problem about linking my range value to my number value
// I was able to take it and modify the variables to fit my project and link the values so the slider and number value match on the website
// https://stackoverflow.com/questions/34360448/is-it-possible-to-link-a-range-and-a-numerical-html-input

var range = document.getElementById("passwordLengthRange");
var field = document.getElementById("passwordLengthNumber");

range.addEventListener("input", function (e) {
  field.value = e.target.value;
});
field.addEventListener("input", function (e) {
  range.value = e.target.value;
});
