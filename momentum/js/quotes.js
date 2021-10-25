const quoteT = document.querySelector('.quote'),
  authorT = document.querySelector('.author'),
  languageInput2 = document.querySelectorAll('.language-input'),
  quoteButton = document.querySelector('.change-quote');

function getRandomInt() {
    return Math.floor(Math.random() * 13);
  }
async function getQuote(){
    const url ='./js/quotes.json';
    try {
        const response = await fetch(url);
        const jsonQuote = await response.json();
        const data = jsonQuote.quotes[getRandomInt()];
        if (languageInput2[0].checked){
          authorT.innerText = data.ruauthor;
          quoteT.innerText = data.ruquote;
        } else{
        authorT.innerText = data.author;
        quoteT.innerText = data.quote;
        }
    } catch (error) {
        quoteT.innerText = 'Something went wrong';
        authorT.innerText = 'Developer';
    }
}

quoteButton.addEventListener('click', getQuote);
getQuote()