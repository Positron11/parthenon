// elements
const captchaField = document.getElementById("RegistrationFormCaptchaField");
const captchaQuestion = document.getElementById("RegistrationFormCaptchaQuestion");

// generate captcha string
const operators = ["+", "-", "*"];
const x = Math.floor(Math.random() * 10);
const y = Math.floor(Math.random() * 10);
const operator = operators[Math.floor(Math.random() * operators.length)];
const captchaString = `${x} ${operator} ${y}`;

// set captcha field attribute
captchaQuestion.setAttribute("value", captchaString);
captchaField.setAttribute("placeholder", `Solve: ${captchaString.replace("*", "×")}`);