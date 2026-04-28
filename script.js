const loginbtn = document.getElementById("loginbtn");
loginbtn.addEventListener("click", function () {
    console.log("clicked");
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    console.log(username,password);
    if (username == "" || password == "") {
        alert("Username and Password can't be empty!");
        return;
    }
});
let user=JSON.parse(localStorage.getItem("user")) || [];
let existinguser= user.find(function(user){
    return user.username===username;
});
if(existinguser){
    if(existinguser.password===password){
        localStorage.setItem("currentuser",username);
        window.location.href="index.html";
    }else{
        alert("Incorrect Password");
    }
} else{
    user.push({
        username:username,
        password:password
    });
    localStorage.setItem("users",JSON.stringify(users));
    localStorage.setItem("currentuser",username);
    window.location.href="chat.html";
}
