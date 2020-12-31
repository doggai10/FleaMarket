var id = sessionStorage.getItem('id');
var role = sessionStorage.getItem('role');
if (role) {
    document.getElementById("login").textContent = "Sign Out";
    document.getElementById("login").href = "/index.html";
    if(role==='admin'){
        var list=document.getElementById("nav_list");
        var li=document.createElement('li');
        li.innerHTML="<a href='admin.html'>admin</a>";
        list.appendChild(li);
    }
}
function signout(){
    if (role) {
        sessionStorage.removeItem('id');
        sessionStorage.removeItem('role');
        console.log(id);
        console.log(role);
        alert("Sign out");
    }
}
