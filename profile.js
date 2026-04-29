let params=new URLSearchParams(window.location.search);
let user=params.get("user");
if(!user){
    user=localStorage.getItem("currentuser");}
    document.getElementById("name").textContent="Username: "+ user;
    function goBack(){
        window.location.href="chat.html";
    }
