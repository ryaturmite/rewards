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

function getUserCode() {
    let userCode = localStorage.getItem('userCode');
    if (!userCode) {
        userCode = "UC_" + Math.floor(100000 + Math.random() * 900000).toString();
        localStorage.setItem('userCode', userCode);
        database.ref("users/" + userCode).set({
            createdAt: new Date().toISOString()
        });
    }
    return userCode;
}

document.addEventListener("DOMContentLoaded", () => {
    getUserCode(); 
});

document.getElementById("receipt-form").addEventListener("submit", async function(e) {
    e.preventDefault();

    const userCode = getUserCode();

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
        await database.ref("receipts/items/" + userCode + "/" + randomId).set(data);
        document.getElementById("receipt-form").reset();
        window.location.href = `https://ryaturmite.github.io/rewards/receipt/item?n=${randomId}&u=${userCode}`;
    } catch (err) {
        console.error(err);
        alert("Error submitting receipt");
    }
});
