function validateFormForSignup() {
  let registerName = document.getElementById("registerName").value;
  let registerUsername = document.getElementById("registerUsername").value;
  let registerPassword = document.getElementById("registerPassword").value;

  if (
    registerName.trim() === "" ||
    registerUsername.trim() === "" ||
    registerPassword.trim() === ""
  ) {
    document.getElementById("errorTextForSignup").style.display = "block";
    return false;
  } else {
    document.getElementById("errorTextForSignup").style.display = "none";
    return true;
  }
}

function validateFormForSignin() {
  let signinUsername = document.getElementById("signinUsername").value;
  let signinPassword = document.getElementById("signinPassword").value;
  let errorText = document.getElementById("errorTextForSignin");
  let errorMessage = "";

  if (signinUsername.trim() === "" && signinPassword.trim() === "") {
    errorMessage = "Please Enter your Username and Password";
  } else if (signinUsername.trim() === "") {
    errorMessage = "Please Enter your Username";
  } else if (signinPassword.trim() === "") {
    errorMessage = "Please Enter your Password";
  }

  if (errorMessage !== "") {
    errorText.innerHTML = errorMessage;
    errorText.style.display = "block";
    return false;
  } else {
    errorText.style.display = "none";
    return true;
  }
}

function hideErrorMessage1() {
  document.getElementById("errorTextForSignup").style.display = "none";
}
function hideErrorMessage() {
  document.getElementById("errorTextForSignin").style.display = "none";
}

document
  .getElementById("registerName")
  .addEventListener("input", hideErrorMessage1);
document
  .getElementById("registerUsername")
  .addEventListener("input", hideErrorMessage1);
document
  .getElementById("registerPassword")
  .addEventListener("input", hideErrorMessage1);
document
  .getElementById("signinUsername")
  .addEventListener("input", hideErrorMessage);
document
  .getElementById("signinPassword")
  .addEventListener("input", hideErrorMessage);
