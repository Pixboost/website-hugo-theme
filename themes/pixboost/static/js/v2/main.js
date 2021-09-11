window.trackSignup = function (method) {
  gtag('event', 'sign_up', {
    method: method
  })
}

/**
 * Setup Hubspot chat
 */
window.hsConversationsSettings = {
  loadImmediately: false, // Delay the load of the chat widget
  inlineEmbedSelector: '#chat-window',
};

var _hsq = window._hsq = window._hsq || [];
_hsq.push(['doNotTrack']);

window.onload = function() {
  setupMobileMenu();
  setupChat();
}

function setupMobileMenu() {
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

function setupChat() {
  const chatWindow = document.querySelector('#chat-window');
  const chatButton = document.querySelector('.js-chat');

  chatWindow.style.visibility = 'hidden';

  chatButton.onclick = function () {
    if (!window.HubSpotConversations.widget.status().loaded) {
      window.HubSpotConversations.widget.load();
    }

    if (chatWindow.style.visibility === 'hidden') {
      chatWindow.style.visibility = 'visible';
    } else {
      chatWindow.style.visibility = 'hidden';
    }
  }

}