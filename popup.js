let status ="idle";
let clicksArray=[];
let tableBody = document.getElementById("table-body");
let playButton = document.getElementById("playRecord");
let timePlayInput = document.getElementById("timePlay");
// check status
chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
  chrome.tabs.sendMessage(tabs[0].id, {type:"status"}, function(response){
      status = response.type;
      clicksArray = response.value;
      updateTable()
      if(response.type==="recording"){
        firstButton.textContent="Stop recroding";
      }else{
        if(clicksArray.length>1 && status==="idle"){
          document.querySelectorAll(".hidden-ready").forEach(ele=>ele.hidden=false)
        }else{
          document.querySelectorAll(".hidden-ready").forEach(ele=>ele.hidden=true)
        }
      }
      // status = response.status;
  });
});



firstButton = document.getElementById("startRecord");

firstButton.addEventListener("click",()=>{
  switchButton();
})


function switchButton(){
  switch (status) {
    case "idle":
      status = "recording";      
      firstButton.textContent="Stop recroding";
      startRecord();
    break;
  
    case "recording":
      status = "idle";      
      firstButton.textContent="Start recroding";
      stopRecord();
    break;
  }
}

function playStopButtons(){
  switch (status) {
    case "idle":
      playButton.textContent = "Stop";
      timePlayInput.disabled =true;
      playRecord()
    break;
  
    case "playing":
      playButton.textContent = "Play";
      timePlayInput.disabled = false;
      stopPlaying()
    break;
  }
}



function startRecord() {  
  document.querySelectorAll(".hidden-ready").forEach(ele=>ele.hidden=true)

  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {type:"startRecord"}, function(response){
    });
  });
}

function stopRecord() {
  status="idle";
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {type:"stopRecord"}, function(response){
        if(clicksArray.length>1 && status==="idle"){
          document.querySelectorAll(".hidden-ready").forEach(ele=>ele.hidden=false)
        }else{
          document.querySelectorAll(".hidden-ready").forEach(ele=>ele.hidden=true)
        }
    });
  });
}

function updateTable(){

  for(let i=0;i<clicksArray.length;i++){
    let tr = document.createElement("tr");

    let td1 = document.createElement("td");
    td1.textContent=clicksArray[i].id;

    let td2 = document.createElement("td");
    td2.textContent=`x:${clicksArray[i].x} , y:${clicksArray[i].y}`;

    let td3 = document.createElement("td");
    td3.textContent=clicksArray[i].time + `ms`;

    let showButton = document.createElement("button");
    showButton.className="show-button";
    showButton.textContent="Show";

    let deleteButton = document.createElement("button");
    deleteButton.className="delete-button";
    deleteButton.textContent="Delete";

    let td4 = document.createElement("td");
    td4.appendChild(showButton);
    td4.appendChild(deleteButton);



    tr.appendChild(td1)
    tr.appendChild(td2)
    tr.appendChild(td3)
    tr.appendChild(td4)

    tableBody.append(tr)
  }
}

playButton.addEventListener("click",()=>playStopButtons())

playRecord = function(){
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    if(clicksArray.length>1 && status==="idle"){
        status = "playing"
        chrome.tabs.sendMessage(tabs[0].id, {type:"play",value:timePlayInput.value || 1}, function(response){
        });
      }
  });
}

stopPlaying= function(){
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    if(clicksArray.length>1 && status==="playing"){
        status = "idle";
        chrome.tabs.sendMessage(tabs[0].id, {type:"stop",value:timePlayInput.value || 1}, function(response){  
        });
      }
  });
}