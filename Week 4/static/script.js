const checkbox = document.getElementById("checkbox");
const calculate = document.getElementById("calculate");

function validateForm() {
  if (!checkbox.checked) {
    alert("Please check the Acception First");
    return false; // 阻止表單提交
  }
  return true; // 允許表單提交
}


calculate.addEventListener("click", () => {
  const number = document.getElementById("number").value.trim();
  if (/^[1-9]\d*$/.test(number)) {
    window.location.href = "/square/" + number;
  } else {
    alert("Please enter a positive integer");
  }
});

