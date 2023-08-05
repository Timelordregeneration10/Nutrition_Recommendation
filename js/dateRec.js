var copydiv = document.getElementById("div1");
var currentNodeNumber = 1;
document.getElementById("additems").onclick = function () {
    let clonedNode = copydiv.cloneNode(true); // 克隆节点  
    currentNodeNumber++;
    clonedNode.setAttribute("id", "div" + currentNodeNumber); // 修改一下id 值，避免id 重复   
    copydiv.parentNode.appendChild(clonedNode); // 在父节点插入克隆的节点   
}

document.getElementById("dateSubmit").onclick = function () {
    let foo = [];                                                       //存储食物的数组
    let dat = [];                                                       //存储日期的数组
    for (let i = 0; i < currentNodeNumber; i++) {
        foo[i] = document.getElementsByClassName("food")[i].value;
        dat[i] = document.getElementsByClassName("date")[i].value;
    }
    
    let result = "";                                                     //输出的结果
    let myObject;                                                        //保存json转js对象

    //上传包含日志个数，食物数组，日期数组的json
    let dataJson = { numberOfDate: currentNodeNumber, food: foo, date:dat};
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
            document.getElementById("dateResult").innerHTML = result;
        }
    }
}

var userSearch=location.search;
document.getElementsByTagName("a")[0].href+=userSearch;
document.getElementsByTagName("a")[1].href+=userSearch;
document.getElementsByTagName("a")[2].href+=userSearch;
document.getElementsByTagName("a")[3].href+=userSearch;
document.getElementsByTagName("a")[4].href+=userSearch;

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
