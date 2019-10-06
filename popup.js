let status ="idle";


document.getElementById("startRecord").addEventListener("click",()=>{
  startRecord();
})



function startRecord() {
  console.log("test");
  
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