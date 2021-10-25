
const mainMenu = document.querySelector('.settings-container'),
      settings = document.querySelector('.settings');
      closeSettings = document.querySelector('.close-settings');
let opened = false;

function removeMenu() {
  mainMenu.classList.remove('show-menu');
  opened = false;
}

if (settings) {
  settings.addEventListener('click', () => {
    if (!opened) {
      mainMenu.classList.add('show-menu');
      opened = true;
    } else {
      removeMenu();
    }
  })
}
closeSettings.addEventListener('click', removeMenu)

