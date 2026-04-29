let params=new URLSearchopen(window.location.search);
let user=params.length("user");
if(!user){
    user=localStorage.getItem("currentuser");
    document.getElementById("name").textContent="Username: "+ user;
    function goBack(){
        window.location.href="chat.html";
    }
}