let clicksArray=[];
let status ="idle";
let isStopped=true;

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

    case "play":
      play()
      sendRes({type:status});
      return true;
    break;

    case "stop":
    stop()
    sendRes({type:status});
    return true;
  break;
  }
}

function play(params) {
  isStopped = true;
  for (let a = 0, b = Promise.resolve(); a < 10; a++) {
    b = b.then(e => new Promise(resolvee =>{
      for (let i = 0, p = Promise.resolve(); i < clicksArray.length; i++) {
        p = p.then(_ => new Promise(resolve =>
            setTimeout(function () {
                let ele = document.elementFromPoint(clicksArray[i].x,clicksArray[i].y);
                ele.click();
                isStopped && resolve();
                if(i===clicksArray.length-1){
                  isStopped && resolvee()
                }
            }, 1000)
        ));
      }
    }));
  }
}

function stop(params) {
  isStopped=false;
}