var firebaseConfig = {
    apiKey: "AIzaSyBCa9xpOSoG4be8IcjemaeOPMMGn6px-I0",
    authDomain: "web-fp-faa88.firebaseapp.com",
    databaseURL: "https://web-fp-faa88-default-rtdb.firebaseio.com",
    projectId: "web-fp-faa88",
    storageBucket: "web-fp-faa88.appspot.com",
    messagingSenderId: "313920936233",
    appId: "1:313920936233:web:5b41eb214ec809af797f38",
    measurementId: "G-QZWWHGLVM1"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

var userlist=[];
var  buy, sell, adm;
var i=0;
var check=0;
$(document).ready(function () {
    var database = firebase.database();
    var dbTestRef = database.ref('buyer/');
    dbTestRef.on('child_added', function (data) {
        var target = document.getElementById('login-list-row');
        var clone = document.importNode(target.content, true);
        var tb = document.querySelector("tbody");
        td = clone.querySelectorAll("td");
        td[0].textContent = data.val().id;
        td[1].textContent = data.val().pw;
        td[2].textContent = data.val().email;
        td[3].textContent=data.val().fname;
        td[4].textContent=data.val().lname;
        td[5].textContent = "buyer";
        tb.appendChild(clone);
        userlist[i]=td[0];
        i++; 
        check++;
    });
    buy=check;
    check=0;
    var dbTestRef = database.ref('seller/');
    dbTestRef.on('child_added', function (data) {
        var target = document.getElementById('login-list-row');
        var clone = document.importNode(target.content, true);
        var tb = document.querySelector("tbody");
        td = clone.querySelectorAll("td");
        td[0].textContent = data.val().id;
        td[1].textContent = data.val().pw;
        td[2].textContent = data.val().email;
        td[3].textContent=data.val().fname;
        td[4].textContent=data.val().lname;
        td[5].textContent = "seller";
        tb.appendChild(clone);
        userlist[i]=td[0];
        i++;
        check++;
    });
    sell=check;
    check=0;
    var dbTestRef = database.ref('admin/');
    dbTestRef.on('child_added', function (data) {
        var target = document.getElementById('login-list-row');
        var clone = document.importNode(target.content, true);
        var tb = document.querySelector("tbody");
        td = clone.querySelectorAll("td");
        td[0].textContent = data.val().id;
        td[1].textContent = data.val().pw;
        td[2].textContent = data.val().email;
        td[3].textContent=data.val().fname;
        td[4].textContent=data.val().lname;
        td[5].textContent = "admin";
        tb.appendChild(clone);
        userlist[i]=td[0];
        i++;
        check++;
    });
    adm=check;
    check=0;
});

function remove(object) {
    if (confirm('Do you want to remove this user information?')) {
        var database = firebase.database();
        var tr = $(object).parent().parent();
        var index = object.parentElement.parentElement.rowIndex;
        console.log(userlist[index-1].textContent);
        var del=userlist[index-1].textContent;
        if(index-1 <=buy){
            database.ref('buyer/'+del).remove()
        }else if(index-1>buy && index-1<=sell){
            database.ref('seller/'+del).remove()
        }else{
            database.ref('admin/'+del).remove()
        }
        alert("User Info delete succeed");
        window.location.reload();
    }
}

function save(object) {
    if (confirm('Do you want to change this user information?')) {
        var database = firebase.database();
        var index = object.parentElement.parentElement.rowIndex;
        var table = document.getElementById("login-list");
        var userid=table.rows[index].cells[0].textContent;
        var password=table.rows[index].cells[1].textContent;
        var email=table.rows[index].cells[2].textContent;
        var fname=table.rows[index].cells[3].textContent;
        var lname=table.rows[index].cells[4].textContent;
        var role=table.rows[index].cells[5].textContent
        if(role==="buyer"){
            database.ref('buyer/' + userid + "/").update({
                "id": userid,
                "pw": password,
                "email": email,
                "fname": fname,
                "lname":lname
            });
            alert("Change success");
            window.location.reload();
        }else if(role==="seller"){
            database.ref('seller/' + userid + "/").update({
                "id": userid,
                "pw": password,
                "email": email,
                "fname": fname,
                "lname":lname
            });
            alert("Change success");
            window.location.reload();
        }else{
            database.ref('admin/' + userid + "/").update({
                "id": userid,
                "pw": password,
                "email": email,
                "fname": fname,
                "lname":lname
            });
            alert("Change success");
            window.location.reload();
        }

        // td = document.querySelectorAll("td");
        // console.log(td[0]);
        // console.log(td[1]);
        // console.log(td[2]);
        // console.log(td[3]);
        // var id=userlist[index-1].textContent;
        // alert("User Info change succeed");
        // window.location.reload();
    }
}