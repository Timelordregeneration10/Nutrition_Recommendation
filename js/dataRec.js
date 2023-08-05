
document.getElementById("hint1").onmouseover = function () {
    document.getElementById("info1").style = "display: block";
}

document.getElementById("hint1").onmouseleave = function () {
    document.getElementById("info1").style = "display: none";
}

document.getElementById("hint2").onmouseover = function () {
    document.getElementById("info2").style = "display: block";
}

document.getElementById("hint2").onmouseleave = function () {
    document.getElementById("info2").style = "display: none";
}

document.getElementById("hint3").onmouseover = function () {
    document.getElementById("info3").style = "display: block";
}

document.getElementById("hint3").onmouseleave = function () {
    document.getElementById("info3").style = "display: none";
}

document.getElementById("dataSubmit").onclick = function () {
    let con = document.getElementById("condition").value;
    let sym = document.getElementById("symptom").value;
    let tre = document.getElementById("treatment").value;
    let result = "";                                                      //输出的结果
    let myObject;                                                       //保存json转js对象
    if (con == "" || sym == "" || tre == "") {
        alert("请输入完整！");
        return -1;
    }

    //上传包含大致状况，具体症状，治疗方案的json
    let dataJson = { condition: con, symptom: sym, tre: treatment };
    let req = new XMLHttpRequest();
    //改成实际地址
    req.open("POST", "http://localhost:8080/nutrition-1.0/users/login", true);
    req.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    req.send(dataJson);

    //从服务器获取数据
    req.onreadystatechange = function () {
        if (req.readyState == 4 && req.status == 200) {
            myObject = JSON.parse(req.responseText);
            //假设服务器的响应是用 JSON 格式编写的
            result = myObject.recommendation;
            //假设json中键为recommendation的值是我要的值
            document.getElementById("dataResult").innerHTML = result;
        }
    }
}

var userSearch = location.search;
document.getElementsByTagName("a")[0].href += userSearch;
document.getElementsByTagName("a")[1].href += userSearch;
document.getElementsByTagName("a")[2].href += userSearch;
document.getElementsByTagName("a")[3].href += userSearch;
document.getElementsByTagName("a")[4].href += userSearch;

setTimeout(checkLogin,500);

function checkLogin() {
    if (userSearch == "") {
        let status = confirm("请先登录");
        if (status == true) {
            window.location.href = "login.html";
        }
        else {
            window.location.href = "index.html";
        }
    }
}
