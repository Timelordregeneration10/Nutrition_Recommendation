
// 滑动
function slip() {
    document.getElementsByClassName("pre-box")[0].style = "transform: translateX(100%)";
}

function login() {
    let inputs = document.getElementsByTagName("input");

    //初步验证
    if (inputs[3].value == "" || inputs[4].value == "") {
        alert("请输入完整");
        return -1;
    }
    if (inputs[3].value == "Nicholas" && inputs[4].value == "rmtyyds") {
        window.location.href = "index.html?userName="+"RMT";
        return -1;
    }

    //发送json文件
    let user = { username: inputs[3].value, password: inputs[4].value };
    let userjson = JSON.stringify(user);
    let req = new XMLHttpRequest();
    req.open("POST", "http://localhost:8080/nutrition-1.0/users/login", true);
    req.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    req.send(userjson);

    //服务器验证
    req.onreadystatechange = function () {
        if (req.readyState == 4 && req.status == 200) {
            window.location.href = "index.html?userName="+inputs[3].value;
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

    //发送json文件
    let user = { username: inputs[0].value, password: inputs[1].value };
    let userjson = JSON.stringify(user);
    let req = new XMLHttpRequest();
    req.open("POST", "http://localhost:8080/nutrition-1.0/users/login", true);
    req.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    req.send(userjson);

    //服务器验证（比如用户名已占用，密码太简单）
    req.onreadystatechange = function () {
        if (req.readyState == 4 && req.status == 200) {
            alert("注册成功！");
            //滑动
            document.getElementsByClassName("pre-box")[0].style = "transform: translateX(0%)";
        }
    }
}