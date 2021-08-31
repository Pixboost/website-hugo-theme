window.onload = function() {
  const mobileMenu = document.querySelector('.mobile-menu-js');
  const nav = document.querySelector('.nav-js');
  mobileMenu.onclick = function () {
    nav.style.visibility = 'visible';
    nav.style.opacity = '1';
  }

  const closeButton = document.querySelector('.close-button-js');
  closeButton.onclick = function () {
    nav.style.opacity = '0';
    nav.style.visibility = 'hidden';
  }
}