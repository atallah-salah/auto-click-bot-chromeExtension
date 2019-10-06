let clicksArray=[];
let status ="idle";


window.addEventListener('click',(item)=>{
  if(status==="recording"){
    clicksArray.push({id:clicksArray.length,x:item.pageX,y:item.pageY,time:"1000"});

    let ele = document.elementFromPoint(item.pageX, item.pageY);
    ele && ele.style && (ele.style.textShadow = "2px 2px 3px rgba(255,255,0,0.3)");
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


