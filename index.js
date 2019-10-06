
window.addEventListener('click',(item)=>{
  console.log('test',item.pageY);
})

chrome.runtime.onMessage.addListener(gotMessage)

function gotMessage(req,sender,res) {
  console.log("new message",req,sender,res);
  
}