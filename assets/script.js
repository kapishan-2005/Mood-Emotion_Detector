const form = document.querySelector("form");
const email = document.getElementById("email");
const password = document.getElementById("password");
const emailError = document.getElementById("mleror");

const successMsg = document.createElement("p");
successMsg.style.color = "green";
successMsg.style.fontWeight = "bold";
successMsg.style.marginTop = "10px";
form.insertAdjacentElement("afterend", successMsg);

form.addEventListener("submit", function (event) {
  event.preventDefault();

  let valid = true;

  let oldPassError = document.getElementById("passErrorList");
  if (oldPassError) oldPassError.remove();

  let emailValue = email.value.trim();
  let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (emailValue === "") {
    emailError.textContent = "Email cannot be empty";
    emailError.style.color = "red";
    valid = false;
  } else if (!emailPattern.test(emailValue)) {
    emailError.textContent = "Please enter a valid email";
    emailError.style.color = "red";
    valid = false;
  } else {
    emailError.textContent = "";
  }

  let passwordValue = password.value.trim();
  let passwordErrors = [];

  if (passwordValue === "") {
    passwordErrors.push("Password cannot be empty");
  }
  if (passwordValue.length < 8) {
    passwordErrors.push("Password must be at least 8 characters");
  }
  if (!/[A-Z]/.test(passwordValue)) {
    passwordErrors.push("Password must have at least 1 uppercase letter");
  }
  if (!/\d/.test(passwordValue)) {
    passwordErrors.push("Password must have at least 1 number");
  }
  if (!/[@$!%*?&-]/.test(passwordValue)) {
    passwordErrors.push("Password must have at least 1 symbol (@$!%*?&-)");
  }

  if (passwordErrors.length > 0) {
    valid = false;

    let ul = document.createElement("ul");
    ul.id = "passErrorList";
    ul.style.color = "red";
    ul.style.marginTop = "5px";

    passwordErrors.forEach(err => {
      let li = document.createElement("li");
      li.textContent = err;
      ul.appendChild(li);
    });

    password.insertAdjacentElement("afterend", ul);
  }

  if (valid) {
    successMsg.textContent = "Successfully logged in!";
    successMsg.style.color = "limegreen";
  } else {
    successMsg.textContent = "";
  }
});