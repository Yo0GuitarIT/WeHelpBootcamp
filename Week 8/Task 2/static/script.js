let validateFormForSignup = () => {
  return (
    validateForm(
      "name",
      "registerName",
      "errorTextForSignup",
      "Please enter your Name"
    ) &&
    validateForm(
      "username",
      "registerUsername",
      "errorTextForSignup",
      "Please enter your Username"
    ) &&
    validateForm(
      "password",
      "registerPassword",
      "errorTextForSignup",
      "Please enter your Password"
    )
  );
};

let validateFormForSignin = () => {
  return (
    validateForm(
      "signinValidation",
      "signinUsername",
      "errorTextForSignin",
      "Please enter your Username"
    ) &&
    validateForm(
      "signinValidation",
      "signinPassword",
      "errorTextForSignin",
      "Please enter your Password"
    )
  );
};

let validateForm = (
  validationType,
  inputElementId,
  errorElementId,
  errorMessage
) => {
  let inputValue = document.getElementById(inputElementId).value;
  let errorText = document.getElementById(errorElementId);
  let isValid = true;

  if (inputValue.trim() === "") {
    errorText.innerHTML = errorMessage;
    errorText.style.display = "block";
    isValid = false;
  } else {
    errorText.style.display = "none";

    if (!validateInput(validationType, inputValue)) {
      errorText.innerHTML = getValidationErrorMessage(validationType);
      errorText.style.display = "block";
      isValid = false;
    }
  }
  return isValid;
};

let validateInput = (validationType, inputValue) => {
  switch (validationType) {
    case "name":
      return /^[\u4e00-\u9fa5a-zA-Z0-9_]+$/.test(inputValue);
    case "username":
      return /^[a-zA-Z0-9]+$/.test(inputValue);
    case "password":
      return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/.test(inputValue);
    case "signinValidation":
      return /^[a-zA-Z0-9]+$/.test(inputValue);
     default:
      return false;
  }
};

let getValidationErrorMessage = (validationType) => {
  switch (validationType) {
    case "name":
      return "Name should be filled in Chinese, English and Underscore '_'";
    case "username":
      return "Username should only contain letters and numbers.";
    case "password":
      return "Password should be at least 8 characters long and include Uppercase, Lowercase, Numbers, and WITHOUT symbols.";
    case "signinValidation":
      return "Username or Password input Error, Please try again : )";
    default:
      return "Invalid input.";
  }
};

let hideErrorMessage = (errorTextFor) => {
  document.getElementById(errorTextFor).style.display = "none";
};

hideErrorMessage("errorTextForSignup");
hideErrorMessage("errorTextForSignin");

document.getElementById("registerName").addEventListener("input", () => {
  hideErrorMessage("errorTextForSignup");
});

document.getElementById("registerUsername").addEventListener("input", () => {
  hideErrorMessage("errorTextForSignup");
});

document.getElementById("registerPassword").addEventListener("input", () => {
  hideErrorMessage("errorTextForSignup");
});

document.getElementById("signinUsername").addEventListener("input", () => {
  hideErrorMessage("errorTextForSignin");
});

document.getElementById("signinPassword").addEventListener("input", () => {
  hideErrorMessage("errorTextForSignin");
});
