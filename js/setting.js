
var userSearch = location.search;
document.getElementsByTagName("a")[0].href += userSearch;
document.getElementsByTagName("a")[1].href += userSearch;
document.getElementsByTagName("a")[2].href += userSearch;
document.getElementsByTagName("a")[3].href += userSearch;
document.getElementsByTagName("a")[4].href += userSearch;

if (userSearch == "") {
    document.getElementById("nickName").innerHTML = "游客211201";
    document.getElementById("sign").innerHTML = "这个人很勤奋，但是忘了编辑个签……";
    document.getElementById("uid").innerHTML = "uid: xxxxxxx";
}
else {
    var userName;
    userName = userSearch.slice(userSearch.indexOf("=") + 1);
    document.getElementById("nickName").innerHTML = userName;

    document.getElementById("load-box").style.display = "block";
    // alert(1);
    let result;                                                           //data的json
    let myObject;                                                         //保存json转js对象

    let user = [userName];
    let userjson = JSON.stringify(user);
    // alert(userjson);
    let req = new XMLHttpRequest();
    let ipPortName = "http://localhost:8080/nutrition"                     //之后记得加前面的ip，port，项目名
    let myurl = ipPortName + "/settings/details";
    req.open("POST", myurl, true);
    req.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    req.send(userjson);

    //从服务器获取数据
    req.onreadystatechange = function () {
        if (req.readyState == 4) {
            myObject = JSON.parse(req.responseText);
            //假设服务器的响应是用 JSON 格式编写的
            if (myObject.code % 2 == 1) {
                result = myObject.data;
                //假设json中键为sign的值是我要的值
                document.getElementById("sign").innerHTML = result.signature;
                let uid = String(result.id);
                if (uid.length < 7) {
                    let repeat = 7 - uid.length;
                    for (let i = 0; i < repeat; i++) {
                        uid = "0" + uid;
                    }
                }
                document.getElementById("load-box").style.display = "none";
                document.getElementById("uid").innerHTML = "uid: " + uid;
            }
            else {
                alert("获取个性签名失败，请稍后重试！");
                document.getElementById("load-box").style.display = "none";
            }
        }
    }
}

// document.getElementById("nickName").innerHTML="尼古拉斯";

document.getElementById("logOut").onclick = function () {
    window.location.href = "index.html";
}

setTimeout(checkLogin, 500);

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

document.getElementById("changeName").onclick = function () {
    window.location.href = "changeName.html" + userSearch;
}

document.getElementById("changeSign").onclick = function () {
    window.location.href = "changeSign.html" + userSearch;
}

document.getElementById("changePassword").onclick = function () {
    window.location.href = "changePassword.html" + userSearch;
}