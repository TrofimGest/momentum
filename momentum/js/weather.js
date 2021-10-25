const city = document.querySelector('.city'),
  icon = document.querySelector('.weather-icon'),
  error = document.querySelector('.weather-error'),
  description = document.querySelector('.description-container'),
  temperature = document.querySelector('.temperature'),
  wDescription = document.querySelector('.weather-description'),
  wind = document.querySelector('.wind'),
  languageInput = document.querySelectorAll('.language-input'),
  humidity = document.querySelector('.humidity');

async function weatherData(){
  if (localStorage.getItem("city") != ''){
    city.value = localStorage.getItem("city");
  }
  else{
    city.value = 'Minsk'
  }
  try {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&lang=${(languageInput[0].checked ? "ru" : "en")}&appid=8ca165a6d1e9e7c4935c52380337880c&units=metric`;
    const res = await fetch(url);
    const data = await res.json();
    const picUrl = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    icon.style.backgroundImage = 'url('+ picUrl +')';
    temperature.textContent = `${Math.round(data.main.temp)}°C`;
    wDescription.textContent = data.weather[0].description;
    if (languageInput[0].checked){
      wind.textContent = `Скорость ветра: ${Math.round(data.wind.speed)} mps`;
      humidity.textContent = `Влажность: ${data.main.humidity}%`
    } else{
    wind.textContent = `Wind speed: ${Math.round(data.wind.speed)} mps`;
    humidity.textContent = `Humidity: ${data.main.humidity}%`;
    }
  } catch {
    temperature.textContent = ""
    if (languageInput[0].checked){
      wDescription.textContent = "Город не найден"
    } else{
    wDescription.textContent = "City not found"
    }
    wind.textContent = ""
    humidity.textContent = ""
  }
}

function setCity(){
  localStorage.setItem("city", city.value);
  weatherData();
}

city.addEventListener('blur', setCity);

weatherData();