const menu = document.getElementById("menu");
const menuOverlay = document.getElementById("menuOverlay");
const navbar = document.getElementById("navbar");
const crossButton = document.getElementById("cross");

function toggleNav() {
  //toggle navbar open active
  menuOverlay.classList.add("overlaySlideLeft");
  menuOverlay.classList.remove("overlaySlideRight");
}

function toggleCross() {
  //toggle crossButton  active
  menuOverlay.classList.add("overlaySlideRight");
  menuOverlay.classList.remove("overlaySlideLeft");
}

//Event Listeners
menu.addEventListener("click", toggleNav);
crossButton.addEventListener("click", toggleCross);
