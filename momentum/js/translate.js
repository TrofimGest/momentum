const languageInput3 = document.querySelectorAll('.language-input');
const languageBtn = document.getElementById('language1');

function translateMenu(){
    if (languageInput1[0].checked){
        document.querySelector(".language-span").textContent = ' Выберите язык:';
        document.querySelector(".russian-language").textContent = 'Русский';
        document.querySelector(".english-language").textContent = 'Английский';
        document.querySelector(".hide-span").textContent = 'Скрыть элемент:';
        document.querySelector(".hide1").textContent = 'Аудио';
        document.querySelector(".hide2").textContent = 'Время';
        document.querySelector(".hide3").textContent = 'Ссылки';
        document.querySelector(".hide4").textContent = 'Погода';
        document.querySelector(".hide5").textContent = 'Цитаты';
        document.getElementById('enter-name').placeholder='[Введите имя]';

      } else{
        document.querySelector(".language-span").textContent = ' Choose language:';
        document.querySelector(".russian-language").textContent = 'Russian';
        document.querySelector(".english-language").textContent = 'English';
        document.querySelector(".hide-span").textContent = 'Hide element:';
        document.querySelector(".hide1").textContent = 'Audio';
        document.querySelector(".hide2").textContent = 'Time';
        document.querySelector(".hide3").textContent = 'Links';
        document.querySelector(".hide4").textContent = 'Weather';
        document.querySelector(".hide5").textContent = 'Quotes';
        document.getElementById('enter-name').placeholder='[Enter name]';
    }
}
translateMenu();

function translateAllElems(){
    translateMenu();
    weatherData();
    setBg();
    getQuote();
}

languageBtn.addEventListener('change', translateAllElems)