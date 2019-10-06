let clicksArray=[];


window.addEventListener('click',(item)=>{
  clicksArray.push({id:clicksArray.length,x:item.pageX,y:item.pageY,time:"0"})
  console.log('test',clicksArray);
})

chrome.runtime.onMessage.addListener(gotMessage)

function gotMessage(req,sender,res) {
  console.log("new message",req,sender,res);
  
}