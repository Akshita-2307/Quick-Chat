let user=JSON.parse(localStorage.getItem("user")) || [];
let currentuser=localStorage.getItem("currentuser");
const userlist=document.getElementById("userlist");
user.forEach(function(user){
    if(user.username!==currentuser){
        let li=document.createElement("li");
        li.textContent=user.username;
        userlist.appendChild(li);
    }
});