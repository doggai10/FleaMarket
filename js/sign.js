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

function signin() {
    var userid = document.getElementById("user_id").value;
    var password = document.getElementById("password").value;
    var admin = document.getElementById("admin").checked;
    var seller = document.getElementById("seller").checked;
    var buyer = document.getElementById("buyer").checked;
    var database = firebase.database();
    if(buyer===true){
        database.ref('/buyer' + "/" + userid).once('value').then((snapshot) => {
            if (snapshot.val() != null) {
                if (snapshot.val().pw === password) {
                    alert("Sign In success");
                    sessionStorage.setItem('id',userid);
                    sessionStorage.setItem('role',"buyer");
                    window.location.href = "/index.html";
                } else {
                    alert("Sign In Fail");
                }
            } else {
                alert("Sign In Fail");
            }
        }).catch((err) => {
            alert("Sign In Fail");
        });
    
    }else if(seller===true){
       database.ref('/seller' + "/" + userid).once('value').then((snapshot) => {
            if (snapshot.val() != null) {
                if (snapshot.val().pw === password) {
                    alert("Sign In success");
                    sessionStorage.setItem('id',userid);
                    sessionStorage.setItem('role',"seller");
                    window.location.href = "/index.html";
                } else {
                    alert("Sign In Fail");
                }
            } else {
                alert("Sign In Fail");
            }
        }).catch((err) => {
            alert("Sign In Fail");
        });
    }else if(admin===true){
       database.ref('/admin' + "/" + userid).once('value').then((snapshot) => {
            if (snapshot.val() != null) {
                if (snapshot.val().pw === password) {
                    alert("Sign In success");
                    sessionStorage.setItem('id',userid);
                    sessionStorage.setItem('role',"admin");
                    window.location.href = "/index.html";
                } else {
                    alert("Sign In Fail");
                }
            } else {
                alert("Sign In Fail");
            }
        }).catch((err) => {
            alert("Sign In Fail");
        });
    }else{
        alert("Sign In Fail");
    }
   
}

function signup() {
    var database = firebase.database();
    var fname = document.getElementById("fname").value;
    var lname = document.getElementById("lname").value;
    var email = document.getElementById("email").value;
    var userid = document.getElementById("user_id").value;
    var password = document.getElementById("password").value;
    var re_password = document.getElementById("re-password").value;
    var seller = document.getElementById("seller").checked;
    var buyer = document.getElementById("buyer").checked;

    if (fname.length != 0 && lname.length != 0 && email.length != 0 && userid.length != 0 && password.length != 0 && re_password.length != 0) {
        if (password === re_password) {
            if (buyer === true) {
                var dbTestRef = database.ref('/buyer' + "/" + userid).once('value').then((snapshot) => {
                    if (snapshot.val() != null) {
                        alert("your id is already used");
                    } else {

                        database.ref('buyer/' + userid + "/").set({
                            "id": userid,
                            "pw": password,
                            "firstname": fname,
                            "lastname": lname,
                            "email": email
                        });
                        alert("Sign Up success");
                        window.location.href = "/index.html";
                    }
                }).catch((err) => {
                    console.log(err);
                });
            }else if(seller==true){
                var dbTestRef = database.ref('/seller' + "/" + userid).once('value').then((snapshot) => {
                    if (snapshot.val() != null) {
                        alert("your id is already used");
                    } else {
                        database.ref('seller/' + userid + "/").set({
                            "id": userid,
                            "pw": password,
                            "firstname": fname,
                            "lastname": lname,
                            "email": email
                        });
                        alert("Sign Up success");
                        window.location.href = "/index.html";
                    }
                }).catch((err) => {
                    console.log(err);
                });
            } else {
                alert("you need to type same password twice");
            }
        } else {
            alert("you need to fill all blanks");
        }
    }
}