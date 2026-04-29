let user = JSON.parse(localStorage.getItem("user")) || [];
let currentuser = localStorage.getItem("currentuser");
const userlist = document.getElementById("userlist");
document.getElementById("profilevisit").addEventListener("click",function(){
    window.location.href="profile.html";
});
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
        li.addEventListener("dblclick",function(){
            window.location.href="profile.html?user=" + user.username;
        });
        userlist.appendChild(li);
    }
});
function getChatId(user1, user2) {
    return [user1, user2].sort().join("_");
}
const send = document.getElementById("send");
send.addEventListener("click", function () {
    if (!selecteduser) {
        alert("Select a user first!");
        return;
    }
    const input = document.getElementById("msginput");
    const messageText = input.value.trim();
    if (messageText === "")
        return;
    let chatId = getChatId(currentuser, selecteduser);
    let allMessages = JSON.parse(localStorage.getItem("messages")) || {};
    if (!allMessages[chatId]) {
        allMessages[chatId] = [];
    }
    allMessages[chatId].push({
        id:String(Date.now()),
        sender: currentuser,
        text: messageText
    });
    localStorage.setItem("messages",JSON.stringify(allMessages));
    input.value = "";
    loadmessages();
});
function loadmessages() {
    let chatId = getChatId(currentuser, selecteduser);
    let allMessages = JSON.parse(localStorage.getItem("messages")) || {};
    let chatMessages = allMessages[chatId] || [];
    let hidden=JSON.parse(localStorage.getItem("hiddenMessages"))||{};
    let hiddenForUser=hidden[currentuser]||[];
    chatMessages=chatMessages.filter(function(msg){
        return !hiddenForUser.includes(String(msg.id));
    })
    let messagesDiv = document.getElementById("msg");
    messagesDiv.innerHTML = "";
    chatMessages.forEach(function(msg){
        let container=document.createElement("div");
        container.classList.add(
            msg.sender===currentuser? "sent" : "received"
        );
        let text=document.createElement("span");
        text.textContent=msg.sender + ": " + msg.text;
        let deletemebtn=document.createElement("button");
        deletemebtn.textContent="Delete for me";
        deletemebtn.addEventListener("click",function(){
            deleteforme(msg.id);
        });
        let deleteallbtn=document.createElement("button");
        deleteallbtn.textContent="Delete for everyone";
        deleteallbtn.addEventListener("click",function(){
            deleteforeveryone(msg.id);
        });

        container.appendChild(text);
        container.appendChild(deletemebtn);
        container.appendChild(deleteallbtn);
        messagesDiv.appendChild(container);
    });
}
function deleteforeveryone(messageId){
    let chatId=getChatId(currentuser,selecteduser);
    let allMessages=JSON.parse(localStorage.getItem("messages"))||{};
    let chatMessages=allMessages[chatId]||[];
    chatMessages=chatMessages.filter(function(msg){
        return msg.id!==messageId;
    });
    allMessages[chatId]=chatMessages;
    localStorage.setItem(
        "messages",
        JSON.stringify(allMessages)
    );
    loadmessages();
}
function deleteforme(messageId){
    let hidden=JSON.parse(localStorage.getItem("hiddenMessages"))||{};
    if(!hidden[currentuser]){
        hidden[currentuser]=[];
    }
    hidden[currentuser].push(String(messageId));
    localStorage.setItem("hiddenmessages",JSON.stringify(hidden));
    loadmessages();
}