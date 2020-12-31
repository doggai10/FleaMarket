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
var itemlist = [];
let bid_status;
let bid_count;
$(document).ready(function () {
    var i = 0;
    var database = firebase.database();
    var dbTestRef = database.ref('item/' + sellerid);
    dbTestRef.on('child_added', function (data) {
        var target = document.getElementById('item-list-row');
        var clone = document.importNode(target.content, true);
        var tb = document.querySelector("tbody");
        td = clone.querySelectorAll("td");
        td[0].textContent = data.val().item_id;
        td[1].textContent = data.val().name;
        td[2].textContent = data.val().phone_num;
        td[3].textContent = data.val().price;
        td[4].textContent = data.val().trading_place;
        td[5].textContent = data.val().type;
        bid_status = data.val().status;
        bid_count = data.val().bid_count;
        tb.appendChild(clone);
        itemlist[i] = td[0];
        i++;
    });
});

function remove(object) {
    if (confirm('Do you want to remove this item information?')) {
        var database = firebase.database();
        var tr = $(object).parent().parent();
        var index = object.parentElement.parentElement.rowIndex;
        console.log(itemlist[index - 1].textContent);
        var del = itemlist[index - 1].textContent;
        database.ref('item/' + sellerid + "/" + del).remove();
        alert("item delete succeed");
        window.location.reload();
    }
}

function save(object) {
    if (confirm('Do you want to change this item information?')) {
        var database = firebase.database();
        var index = object.parentElement.parentElement.rowIndex;
        var table = document.getElementById("item-list");
        var item_id = table.rows[index].cells[0].textContent;
        var pname = table.rows[index].cells[1].textContent;
        var pnum = table.rows[index].cells[2].textContent;
        var price = table.rows[index].cells[3].textContent;
        var tplace = table.rows[index].cells[4].textContent;
        var type = table.rows[index].cells[5].textContent;
        database.ref('item/' + sellerid + "/" + item_id).update({
            "item_id": item_id,
            "name": pname,
            'phone_num': pnum,
            "price": price,
            "status": bid_status,
            "trading_place": tplace,
            "type": type
        });
        // if(type==="flea market"){
        //     database.ref('item/' + sellerid + "/"+item_id).update({
        //         "item_id":item_id,
        //         "name":pname,
        //         'phone_num':pnum,
        //         "price":price,
        //         "status":bid_status,
        //         "trading_place":tplace,
        //         "type":type
        //     });
        // }else {
        //     database.ref('item/' + sellerid + "/"+item_id).update({
        //         "item_id":item_id,
        //         "name":pname,
        //         'phone_num':pnum,
        //         "price":price,
        //         "status":bid_status,
        //         "bid_count":bid_count,
        //         "trading_place":tplace,
        //         "type":type
        //     });
        // }

        alert("Change success");
        window.location.reload();

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