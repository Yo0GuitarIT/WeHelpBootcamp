const menu = document.getElementById('menu');
const menuOverlay = document.getElementById('menu-overlay');
const navbar = document.getElementById('navbar');

function toggleNav() {
    //toggle navbar open active
    menuOverlay.classList.add('overlay-slide-left');

}


//Event Listeners
menu.addEventListener('click', toggleNav);