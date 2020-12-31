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

var sellerid = sessionStorage.getItem('id');

function register(){
    var imageName=sessionStorage.getItem('imageName');
    console.log(imageName);
    var database = firebase.database();
    var pname = document.getElementById("pname").value;
    var pnumber = document.getElementById("pnumber").value;
    var price = document.getElementById("price").value;
    var tplace = document.getElementById("tplace").value;
    var flea = document.getElementById("flea").checked;
    var auction = document.getElementById("auction").checked;
    var item_id = 0;
    if (pname.length != 0 && pnumber.length !== 0) {
        if (auction === true) {
            database.ref('/item/' + sellerid).once('value').then((snapshot) => {
                if (snapshot.val() != null) {
                    console.log(snapshot.val().length);
                    item_id = snapshot.val().length;
                    database.ref('item/' + sellerid + "/" + item_id).set({
                        "item_id": item_id,
                        "name": pname,
                        "phone_num": pnumber,
                        "price": price,
                        "trading_place": tplace,
                        "status": "no bid",
                        "hig_bidder": "no one",
                        "bid_price": 0,
                        "bid_count": 0,
                        "image_name":imageName,
                        "seller_id":sellerid,
                        "type": "acution"
                    });
                } else {
                    database.ref('item/' + sellerid + "/" + "1").set({
                        "item_id": item_id + 1,
                        "name": pname,
                        "phone_num": pnumber,
                        "price": price,
                        "trading_place": tplace,
                        "status": "no bid",
                        "bid_count": 0,
                        "hig_bidder": "no one",
                        "bid_price": 0,
                        "image_name":imageName,
                        "seller_id":sellerid,
                        "type": "acution"
                    });
                }
                alert("Register Success");
                window.location.href = "/index.html";
            }).catch((err) => {
                console.log(err);
            });
        } else {
            if (price != 0) {
                database.ref('/item/' + sellerid).once('value').then((snapshot) => {
                    if (snapshot.val() != null) {
                        console.log(snapshot.val().length);
                        item_id = snapshot.val().length;
                        database.ref('item/' + sellerid + "/" + item_id).set({
                            "item_id": item_id,
                            "name": pname,
                            "phone_num": pnumber,
                            "price": price,
                            "trading_place": tplace,
                            "status": "not purchased",
                            "image_name":imageName,
                            "seller_id":sellerid,
                            "type": "flea market"
                        });
                    } else {
                        database.ref('item/' + sellerid + "/" + "1").set({
                            "item_id": item_id + 1,
                            "name": pname,
                            "phone_num": pnumber,
                            "price": price,
                            "trading_place": tplace,
                            "status": "not purchased",
                            "image_name":imageName,
                            "seller_id":sellerid,
                            "type": "flea market"
                        });
                    }
                    sessionStorage.removeItem('imageName');
                    alert("Register Success");
                    window.location.href = "/index.html";
                }).catch((err) => {
                    console.log(err);
                });
            } else {
                alert("you need to fill all blanks except trading price");
            }
        }

    } else {
        alert("you need to fill all blanks except trading price");
    }
}

