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
let check = 0;
var sellerid = sessionStorage.getItem('id');
$(document).ready(function () {
    var database = firebase.database();
    var database2 = firebase.database();
    var dbTestRef = database.ref('item/' + sellerid);
    dbTestRef.on('child_added', function (data) {
        if (data.val().type === 'auction') {
            var target = document.getElementById('item-list-row');
            var clone = document.importNode(target.content, true);
            var tb = document.querySelector("tbody");
            td = clone.querySelectorAll("td");
            td[0].textContent = data.val().item_id;
            td[1].textContent = data.val().name;
            td[2].textContent = data.val().trading_place;
            td[3].textContent = data.val().price;
            td[4].textContent = data.val().bid_price;
            td[5].textContent = data.val().hig_bidder;
            td[6].textContent = data.val().bid_count;
            td[7].textContent = data.val().status;
            var id = data.val().item_id;
            var itemName = data.val().name;
            var dbTestRef2 = database2.ref('history/' + sellerid + "/" + id);
            dbTestRef2.on('child_added', function (data2) {
                var target2 = document.getElementById('item-list-row2');
                var clone2 = document.importNode(target2.content, true);
                var tb2 = document.getElementById("tbody2");
                td2 = clone2.querySelectorAll("td");
                td2[0].textContent = data2.val().item_id;
                td2[1].textContent = itemName;
                td2[2].textContent = data2.val().bid_price;
                td2[3].textContent = data2.val().bidder;
                tb2.appendChild(clone2);
            });

        } else {
            var target = document.getElementById('item-list-row3');
            var clone = document.importNode(target.content, true);
            var tb = document.getElementById("tbody3");
            td = clone.querySelectorAll("td");
            td[0].textContent = data.val().item_id;
            td[1].textContent = data.val().name;
            td[2].textContent = data.val().price;
            td[3].textContent = data.val().trading_place;
            td[4].textContent = data.val().status;
            td[5].textContent = data.val().type;
        }
        tb.appendChild(clone);
    });
});
