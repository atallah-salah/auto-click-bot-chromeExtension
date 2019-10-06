let clicksArray=[];
let status ="idle";


window.addEventListener('click',(item)=>{
  if(status==="recording"){
    
    clicksArray.push({id:clicksArray.length,x:item.pageX,y:item.pageY,time:"1000"});
  }
})

chrome.runtime.onMessage.addListener(gotMessage)

function gotMessage(req,sender,sendRes) {
  switch (req.type) {
    case "startRecord":
      status = "recording";      
      sendRes({type:status});
      return true;
    break;
  
    case "stopRecord":
      status = "idle";
      sendRes({type:status});
      return true;
    break;

    case "status":
      sendRes({type:status,value:clicksArray});
      return true;
    break;
  }
}


