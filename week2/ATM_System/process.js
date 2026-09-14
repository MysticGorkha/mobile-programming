let storedPin = 1234;
let balance = 10000;

function login() {
    let pin = Number(document.getElementById("amount").value);

    if (pin === storedPin) {
        alert("Login successful!");
        document.getElementById("message").innerHTML = "Login successful!";
        document.getElementById("message").style.color = "green";
    }
    else {
        alert("Incorrect PIN. Please try again.");
        document.getElementById("message").innerHTML = "Incorrect PIN. Please try again.";
        document.getElementById("message").style.color = "red";
    }
}

function checkBalance() {
    document.getElementById("message").innerHTML = "Your current balance is: Rs." + balance;
    document.getElementById("message").style.color = "blue";
}

function withdraw() {
    let withdrawAmount = Number(document.getElementById("withdrawAmount").value);

    if (withdrawAmount <= balance) {
        balance -= withdrawAmount;
        document.getElementById("message").innerHTML = "Withdrawal successful! Your new balance is: Rs." + balance;
        document.getElementById("message").style.color = "green";
    }
    else {
        document.getElementById("message").innerHTML = "Insufficient balance. Your current balance is: Rs." + balance;
        document.getElementById("message").style.color = "red";
    }
}

function deposit() {
    let depositAmount = Number(document.getElementById("depositAmount").value);

    balance += depositAmount;

    document.getElementById("message").innerHTML = "Deposit successful! Your new balance is: Rs." + balance;
    document.getElementById("message").style.color = "green";
}