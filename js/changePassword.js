
// 滑动
function back() {
    window.history.go(-1);
}

function modifyPassword() {
    let inputs = document.getElementsByTagName("input");

    //初步验证
    if (inputs[0].value == "" || inputs[1].value == "" || inputs[2].value == "") {
        alert("请输入完整");
        return -1;
    }
    if (inputs[2].value != inputs[1].value) {
        alert("两次输入密码不同！");
        return -1;
    }

    document.getElementById("load-box").style.display = "block";

    let userSearch = location.search;
    let userName = userSearch.slice(userSearch.indexOf("=") + 1);

    //发送包含新密码和用户名的json文件
    let user = [userName, inputs[0].value, inputs[1].value];
    let userjson = JSON.stringify(user);
    // alert(userjson);
    let req = new XMLHttpRequest();

    let ipPortName = "http://localhost:8080/nutrition"                     //之后记得加前面的ip，port，项目名
    let myurl = ipPortName + "/settings/update-password";
    req.open("POST", myurl, true);
    req.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    req.send(userjson);

    //服务器验证
    req.onreadystatechange = function () {
        if (req.readyState == 4) {
            let myObject = JSON.parse(req.responseText);
            if (myObject.code % 2 == 1) {
                document.getElementById("load-box").style.display = "none";
                window.location.href = "login.html";
            }
            else {
                if (myObject.code == 200070) {
                    alert("旧密码错误！");
                    document.getElementById("load-box").style.display = "none";
                    return -1;
                }
                if (myObject.code == 200060) {
                    alert("该用户不存在！");
                    document.getElementById("load-box").style.display = "none";
                    return -1;
                }
                alert("修改密码失败，请稍后重试！");
                document.getElementById("load-box").style.display = "none";
            }
        }
    }
}