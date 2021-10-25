const linkName = document.getElementById("site-name"),
  siteUrl = document.getElementById("site-url"),
  addUrl = document.getElementById("add-url"),
  inputs = document.getElementsByClassName("form-control");

let linkContainer = [];

if(JSON.parse(localStorage.getItem("linkList"))!=null){
  linkContainer=JSON.parse(localStorage.getItem("linkList"));
  showData()
}


addUrl.onclick = function () {
  addLink();
  showData();
  clearData();
}

function addLink() {
  let linkMarker = {
    name: linkName.value,
    url: siteUrl.value
  }
  linkContainer.push(linkMarker);
  localStorage.setItem("linkList",JSON.stringify(linkContainer))
}

function showData() {
  let linkOutput = ``
  for (let i = 0; i < linkContainer.length; i++) {
    linkOutput +=`
    <div>
    <span>${linkContainer[i].name}</span>
    <a href="${linkContainer[i].url}" target="_blank"><button class="visit-button">Visit</button></a>
    <button class="delete-button" onclick="deleteLink(${i})">Delete</button>
    </div>
    `
  }
  document.getElementById("output").innerHTML = linkOutput;
}

function clearData() {
  for(let i=0; i<inputs.length; i++){
    inputs[i].value="";
  }
}

function deleteLink(index) {
  linkContainer.splice(index,1);
  showData()
  localStorage.setItem("linkList",JSON.stringify(linkContainer))
}