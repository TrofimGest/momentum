
  const time = document.querySelector('.time'),
  greeting = document.querySelector('.greeting'),
  date = document.querySelector('.date'),
  user = document.querySelector('.name'),
  sliderPrevBtn = document.querySelector('.slide-prev'),
  languageInput1 = document.querySelectorAll('.language-input'),
  sliderNextBtn = document.querySelector('.slide-next');

function showTime() {
  let today = new Date(),
    hour = today.getHours(),
    min = today.getMinutes(),
    sec = today.getSeconds();


  time.innerHTML = `${hour}<span>:</span>${addZero(min)}<span>:</span>${addZero(
    sec
  )}`;

  setTimeout(showTime, 1000);
}

function addZero(n) {
  return (parseInt(n, 10) < 10 ? '0' : '') + n;
}

function getRandom() {
  randomInt = (Math.floor(Math.random() * 20)+1);
  return randomInt;
}
let pictureIndex = getRandom();

function loadingPicture(link){
  const img = new Image();
  img.src = link;
  img.addEventListener('load', () => {
    document.body.style.backgroundImage = `url(${link})`;
  })
};

function setBg() {
  let today = new Date(),
    hour = today.getHours();
  let params = {weekday: 'long', month: 'long', day: 'numeric'};
  if (languageInput1[0].checked){
    date.innerText = new Intl.DateTimeFormat('ru-RU', params).format(today);
  }
  else{
  date.innerText = new Intl.DateTimeFormat('en-US', params).format(today);
  }
  if (hour < 6 && hour > 0){
    loadingPicture(`https://raw.githubusercontent.com/TrofimGest/stage1-tasks/assets/images/night/${addZero(pictureIndex)}.jpg`);
    if (languageInput1[0].checked){
      greeting.textContent = 'Доброй Ночи, ';
    } else{
      greeting.textContent = 'Good Night, ';
    }
    document.body.style.color = 'white';
  }
  else if (hour < 12) {
  // Morning
  loadingPicture(`https://raw.githubusercontent.com/TrofimGest/stage1-tasks/assets/images/morning/${addZero(pictureIndex)}.jpg`);
    if (languageInput1[0].checked){
      greeting.textContent = 'Доброе Утро, ';
    } else{
      greeting.textContent = 'Good Morning, ';
    }
  } else if (hour < 18) {
    // Afternoon
      loadingPicture(`https://raw.githubusercontent.com/TrofimGest/stage1-tasks/assets/images/afternoon/${addZero(pictureIndex)}.jpg`);
      if (languageInput1[0].checked){
        greeting.textContent = 'Добрый День, ';
      } else{
        greeting.textContent = 'Good Afternoon, ';
      }
  } else {
    // Evening
      document.body.style.backgroundImage = `url('https://raw.githubusercontent.com/TrofimGest/stage1-tasks/assets/images/evening/${addZero(pictureIndex)}.jpg')`;
      if (languageInput1[0].checked){
        greeting.textContent = 'Добрый Вечер, ';
      } else{
        greeting.textContent = 'Good evening, ';
      }
      document.body.style.color = 'white';
  }
}

function prevPicture() {
  pictureIndex--;
  if (pictureIndex < 1) {
    pictureIndex = 20;
  }
  setBg();
}
function nextPicture() {
  pictureIndex++;
  if (pictureIndex > 20) {
    pictureIndex = 1;
  }
  setBg();
}


function getName() {
  user.value = localStorage.getItem('name');
}

function setName(e) {
  if (e.type === 'keypress') {
    if (e.which == 13 || e.keyCode == 13) {
      localStorage.setItem('name', e.target.value);
      user.blur();
    }
  } else {
    localStorage.setItem('name', e.target.value);
  }
}

sliderNextBtn.addEventListener('click',nextPicture);
sliderPrevBtn.addEventListener('click',prevPicture);
user.addEventListener('keypress', setName);
user.addEventListener('blur', setName);

showTime();
setBg();
getName();