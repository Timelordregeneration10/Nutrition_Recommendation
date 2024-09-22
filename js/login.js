
// 滑动
function slip() {
    document.getElementsByClassName("pre-box")[0].style = "transform: translateX(100%)";
}

function slip0() {
    document.getElementsByClassName("pre-box")[0].style = "transform: translateX(0%)";
}

function login() {
    let inputs = document.getElementsByTagName("input");

    //初步验证
    if (inputs[3].value == "" || inputs[4].value == "") {
        alert("请输入完整");
        return -1;
    }
    // if (inputs[3].value == "Nicholas" && inputs[4].value == "rmtyyds") {
    //     window.location.href = "index.html?userName=" + "RMT";
    //     return -1;
    // }
    window.location.href = "index.html?userName=" + "RMT";

    document.getElementById("load-box").style.display = "block";

    //发送json文件
    let user = { id: null, username: inputs[3].value, password: inputs[4].value, signature: null };
    let userjson = JSON.stringify(user);
    // alert(userjson);
    let req = new XMLHttpRequest();
    let ipPortName = "http://localhost:8080/nutrition"                     //之后记得加前面的ip，port，项目名
    let myurl = ipPortName + "/login/signin";
    req.open("POST", myurl, true);
    req.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    req.send(userjson);

    //服务器验证
    req.onreadystatechange = function () {
        //登录成功
        if (req.readyState == 4) {
            let myObject = JSON.parse(req.responseText);
            if (myObject.code % 2 == 1) {
                document.getElementById("load-box").style.display = "none";
                window.location.href = "index.html?userName=" + inputs[3].value;
            }
            //登陆失败
            else {
                if (myObject.code == 200070) {
                    alert("密码错误！");
                }
                else {
                    if (myObject.code == 200060) {
                        alert("该用户不存在！");
                    }
                    else {
                        alert("登录错误，请稍后重试！");
                    }
                }
                document.getElementById("load-box").style.display = "none";
            }
        }
    }
}

function regist() {
    let inputs = document.getElementsByTagName("input");

    //初步验证
    if (inputs[0].value == "" || inputs[1].value == "" || inputs[2].value == "") {
        alert("请输入完整");
        return -1;
    }
    if (inputs[1].value != inputs[2].value) {
        alert("两次密码不匹配!")
        return -1;
    }

    document.getElementById("load-box").style.display = "block";

    //发送json文件
    let user = { id: null, username: inputs[0].value, password: inputs[1].value, signature: null };
    let userjson = JSON.stringify(user);
    // alert(userjson);
    let req = new XMLHttpRequest();
    let ipPortName = "http://localhost:8080/nutrition"                     //之后记得加前面的ip，port，项目名
    let myurl = ipPortName + "/login/signup";
    req.open("POST", myurl, true);
    req.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    req.send(userjson);

    //服务器验证（比如用户名已占用）
    req.onreadystatechange = function () {
        //登录成功
        if (req.readyState == 4) {
            let myObject = JSON.parse(req.responseText);
            if (myObject.code % 2 == 1) {
                alert("注册成功！");
                //滑动
                document.getElementById("load-box").style.display = "none";
                document.getElementsByClassName("pre-box")[0].style = "transform: translateX(0%)";
            }
            else {
                if (myObject.code == 200050) {
                    alert("该用户名已被占用！");
                }
                else {
                    alert("注册错误，请稍后重试！");
                }
                document.getElementById("load-box").style.display = "none";
            }
        }
    }
}

document.getElementsByClassName("back-box")[0].onclick=function(){
    window.location.href="index.html";
}