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
    var database = firebase.database();
    var dbTestRef = database.ref('wishlist/' + buyerid);
    dbTestRef.on('child_added', function (data) {
        var target = document.getElementById('item-list-row');
        var clone = document.importNode(target.content, true);
        var tb = document.querySelector("tbody");
        td = clone.querySelectorAll("td");
        td[0].textContent = data.val()[1].name;
        td[1].textContent = data.val()[1].item_id;
        td[2].textContent = data.val()[1].seller_id;
        td[3].textContent = data.val()[1].price;
        tb.appendChild(clone);
        var check=data.val().length-1;
        while(check >1){
            var dbTestRef2 = database.ref('wishlist/' + buyerid+"/"+check);
            dbTestRef2.on('child_added', function (data2) {
                td[0].textContent = data2.val()[check].name;
                td[1].textContent = data2.val()[check].item_id;
                td[2].textContent = data2.val()[check].seller_id;
                td[3].textContent = data2.val()[check].price;
                tb.appendChild(clone);
            });
            check--;
        }
    });
});