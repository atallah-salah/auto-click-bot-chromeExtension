let status ="idle";

// check status
chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
  chrome.tabs.sendMessage(tabs[0].id, {type:"status"}, function(response){
      console.log("popup js :res :status",response);
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
      firstButton.textContent="recording";
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
    });
  });
}