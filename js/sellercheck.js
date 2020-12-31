var role = sessionStorage.getItem('role');
var id=sessionStorage.getItem('id');
if (role ==='seller') {
    // document.getElementById("login").textContent = "Sign Out";
    // document.getElementById("login").href = "/index.html";
    // if(role==='admin'){
    //     var list=document.getElementById("nav_list");
    //     var li=document.createElement('li');
    //     li.innerHTML="<a href='admin.html'>admin</a>";
    //     list.appendChild(li);
    // }

}else if(id===null){
    alert("sign in first");
    window.location.href = "/index.html";
}else{
    alert("You are not seller");
    window.location.href = "/index.html";
}