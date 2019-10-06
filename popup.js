let status ="idle";
let clicksArray=[];
let tableBody = document.getElementById("table-body");

// check status
chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
  chrome.tabs.sendMessage(tabs[0].id, {type:"status"}, function(response){
      console.log("popup js :res :status",response.type);
      status = response.type;
      if(response.type==="recording"){
        firstButton.textContent="recording";
        clicksArray = response.value;
        updateTable()
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




function startRecord() {  
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {type:"startRecord"}, function(response){
        console.log("popup js :res :startRecord",response);
    });
  });
}

function stopRecord() {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {type:"stopRecord"}, function(response){
        console.log("popup js :res :stopRecord",response);
        if(clicksArray.length>1 && status==="idle"){

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

    tr.appendChild(td1)
    tr.appendChild(td2)
    tr.appendChild(td3)

    tableBody.append(tr)
  }
}