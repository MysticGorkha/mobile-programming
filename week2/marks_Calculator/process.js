function sum() {
    let english = Number(document.getElementById("english").value);
    let maths = Number(document.getElementById("maths").value);
    let accounts = Number(document.getElementById("accounts").value);
    let nepali = Number(document.getElementById("nepali").value);
    let health = Number(document.getElementById("health").value);
    let computer = Number(document.getElementById("computer").value);
    let science = Number(document.getElementById("science").value);
    let social = Number(document.getElementById("social").value);
    let sum = english + maths + accounts + nepali + health + computer + science + social ;
    document.getElementById("result1").innerHTML = "Total Marks = " + sum;
    if (sum >= 720 && sum <= 800) {
        document.getElementById("result2").innerHTML = "Passed!";
        document.getElementById("result2").style.color = "green";
        document.getElementById("result3").innerHTML = "You Scored Distinction with " + (sum / 8) + "%";
    }else if (sum >= 640 && sum < 720) {
        document.getElementById("result2").innerHTML = "Passed!";
        document.getElementById("result2").style.color = "green";
        document.getElementById("result3").innerHTML = "You Scored First Division with " + (sum / 8) + "%";
    }else if (sum >= 560 && sum < 640) {
        document.getElementById("result2").innerHTML = "Passed!";
        document.getElementById("result2").style.color = "green";
        document.getElementById("result3").innerHTML = "You Scored Second Division with " + (sum / 8) + "%";
    }else if ( sum >= 480 && sum < 560) {
        document.getElementById("result2").innerHTML = "Passed!";
        document.getElementById("result2").style.color = "green";
        document.getElementById("result3").innerHTML = "You Scored Third Division with " + (sum / 8) + "%";
    }else if (sum >= 400 && sum < 480) {
        document.getElementById("result2").innerHTML = "Passed!";
        document.getElementById("result2").style.color = "green";
        document.getElementById("result3").innerHTML = "You Scored Fourth Division with " + (sum / 8) + "%";
    }else if (sum >= 320 && sum < 400) {
        document.getElementById("result2").innerHTML = "Passed!";
        document.getElementById("result2").style.color = "green";
        document.getElementById("result3").innerHTML = "You Scored Fifth Division with " + (sum / 8) + "%";
    }
    else {
        document.getElementById("result2").innerHTML = "Failed!";
        document.getElementById("result2").style.color = "red";
        document.getElementById("result3").innerHTML = "You did not score enough marks to pass.";
    }
}