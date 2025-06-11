const firebaseConfig = {
    apiKey: "AIzaSyARJJ-wEpWeJqfbM5v_ReqzYEn3u1QeDMA",
    authDomain: "qvrewards.firebaseapp.com",
    projectId: "qvrewards",
    storageBucket: "qvrewards.appspot.com",
    messagingSenderId: "594998843955",
    appId: "1:594998843955:web:4b5efa3844053ec290a146",
    measurementId: "G-152PLQK2L3",
    databaseURL: "https://qvrewards-default-rtdb.firebaseio.com/"
};

firebase.initializeApp(firebaseConfig);
const database = firebase.database();

document.getElementById("receipt-form").addEventListener("submit", async function(e) {
    e.preventDefault();

    const data = {
    restaurantNum: document.getElementById("restaurant-num").value,
    date: document.getElementById("date").value,
    orderNum: document.getElementById("order-num").value,
    orderTotal: parseFloat(document.getElementById("order-total").value),
    status: "pending",
    timestamp: new Date().toISOString()
    };

    const randomId = Math.floor(Math.random() * 1000000000).toString();

    try {
    await database.ref("receipts/items/" + randomId).set(data);
    alert("Receipt submitted successfully!");
    document.getElementById("receipt-form").reset();
    } catch (err) {
    console.error(err);
    alert("Error submitting receipt");
    }
});