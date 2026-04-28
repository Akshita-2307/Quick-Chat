let user = JSON.parse(localStorage.getItem("user")) || [];
let currentuser = localStorage.getItem("currentuser");
const userlist = document.getElementById("userlist");
let selecteduser = null;
user.forEach(function (user) {
    if (user.username !== currentuser) {
        let li = document.createElement("li");
        li.textContent = user.username;
        li.addEventListener("click", function () {
            selecteduser = user.username;
            document.querySelector(".top").textContent = selecteduser;
            loadmessages();
        });


        userlist.appendChild(li);
    }

});
function getChatId(user1,user2){
    return[user1,user2].sort().join("_");
}
const send=document.getElementById("send");
send.addEventListener("click",function(){
    if(!selecteduser){
        alert("Select a user first!");
        return;
    }
    const input=document.getElementById("messageInput");
    const messageText=input.ariaValueMax.trim();
    if(messageText==="") 
        return;
    let chatId=getChatId(currentuser,selecteduser);
    let allMessages=JSON.parse(localStorage.getItem("messages"))||{};
     if(!allMessages[chatId]){
        allMessages[chatId]=[];
     }
     allMessages[chatId].push({
        sender:currentuser,
        text:messageText
     });
     localStorage.setItem("messages",
        JSON.stringify(allMessages));
        input.value="";
        loadmessages();
});