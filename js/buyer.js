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
var buyerid = sessionStorage.getItem('id');
$(document).ready(function () {
    var seller;
    var database = firebase.database();
    // var dbTestRef = database.ref('item/');
    var dbTestRef = database.ref('seller/');
    dbTestRef.on('child_added', function (data) {
        // console.log(data.val()[i]);
        seller = data.val().id;
        var dbTestRef2 = database.ref('item/' + seller);
        dbTestRef2.on('child_added', function (data) {
            console.log(data.val());
            var target = document.getElementById('item-list-row');
            var clone = document.importNode(target.content, true);
            var tb = document.querySelector("tbody");
            td = clone.querySelectorAll("td");
            var storageRef = firebase.storage().ref();
            storageRef = storageRef.child(`images/` + data.val().image_name);
            td[1].textContent = data.val().item_id;
            td[2].textContent = data.val().name
            td[3].textContent = data.val().price;
            td[6].textContent = data.val().type;
            td[7].textContent = data.val().seller_id;
            td[8].textContent = data.val().status;
            tb.appendChild(clone);
        });
    });
});


function purchase(object) {
    if (confirm('Do you want to purchase this item?')) {
        var database = firebase.database();
        var index = object.parentElement.parentElement.rowIndex;
        var table = document.getElementById("item-list");
        var itemid = table.rows[index].cells[1].textContent;
        var pname = table.rows[index].cells[2].textContent;
        var price= table.rows[index].cells[3].textContent;
        var bid_price = table.rows[index].cells[4].textContent;
        var type= table.rows[index].cells[6].textContent;
        var sellerid= table.rows[index].cells[7].textContent;
        database.ref('history/' + sellerid + "/" + itemid + "/" + buyerid).update({
            "product": pname,
            'bid_price': price,
            "bidder": buyerid
        });
        if (type === 'auction') {
            database.ref('/item' + "/" + sellerid + "/" + itemid).once('value').then((snapshot) => {
                console.log(snapshot.val());
                var check = snapshot.val().bid_price;
                console.log(check);
                console.log(bid_price);
                if (bid_price > check) {
                    database.ref('item/' + sellerid + "/" + itemid + "/").update({
                        "status": "In Progress",
                        'bid_price': bid_price,
                        "hig_bidder": buyerid
                    });
                    alert("purchase success");
                    window.location.reload();
                }else{
                    alert("you need to bid more higer price");
                    window.location.reload();
                }
            }).catch((err) => {
                alert("purchase error");
            });
        } else {
            database.ref('item/' + sellerid + "/" + itemid + "/").update({
                "status": "purchased",
                'bid_price': price,
                "bidder": buyerid
            });
            alert("purchase success");
            window.location.reload();
        }
       
    }
}

function wishlist(object) {
    if (confirm('Do you want to add this item in your wishlist?')) {
        var database = firebase.database();
        var index = object.parentElement.parentElement.rowIndex;
        var table = document.getElementById("item-list");
        var itemid = table.rows[index].cells[1].textContent;
        var pname = table.rows[index].cells[2].textContent;
        var price= table.rows[index].cells[3].textContent;
        var sellerid= table.rows[index].cells[7].textContent;
        database.ref('wishlist/' + buyerid + "/" + sellerid + "/"+itemid).set({
            "item_id": itemid,
            'name': pname,
            "price": price,
            "seller_id":sellerid

        });
        alert("purchase success");
        window.location.reload();
    }
}