const hideInputs = document.querySelectorAll('.hide-input');


let elemsArray = ['.player', '.time-block',  '.linklist','.weather', '.quote-block']
function hideElem(item){
        if (item.checked){
            document.querySelector(elemsArray[item.value - 1]).style.opacity = '0'
        }   else{
            document.querySelector(elemsArray[item.value - 1]).style.opacity = '1'
        }

}
hideInputs.forEach(inputN => 
    inputN.addEventListener('click', () => (hideElem(inputN))));