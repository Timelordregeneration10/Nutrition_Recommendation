var userSearch = location.search;
document.getElementsByTagName("a")[0].href += userSearch;
document.getElementsByTagName("a")[1].href += userSearch;
document.getElementsByTagName("a")[2].href += userSearch;
document.getElementsByTagName("a")[3].href += userSearch;
document.getElementsByTagName("a")[4].href += userSearch;


var copydiv = document.getElementById("div1");
var currentNodeNumber = 1;
document.getElementById("additems").onclick = function () {
    if (currentNodeNumber >= 8) {
        alert("最多添加8条日志！");
        return -1;
    }
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
        dat[i] = String(document.getElementsByClassName("date")[i].value);
        if (foo[i] == "" || dat[i] == "") {
            alert("输入不能为空！");
            return -1;
        }
        for (let j = 0; j < foo[i].length; j++) {
            if (foo[i][j] == ",") {
                alert("输入不能含有英文逗号，请用中文逗号代替。");
                return -1;
            }
        }
    }

    document.getElementById("load-box").style.display = "block";

    let result = "";                                                     //输出的结果
    let myObject;                                                        //保存json转js对象

    let userName;
    userName = userSearch.slice(userSearch.indexOf("=") + 1);

    let d = new Date();
    let sdm = String(d.getMonth() + 1);
    if (sdm.length == 1) { sdm = "0" + sdm; }
    let sdd = String(d.getDate());
    if (sdd.length == 1) { sdd = "0" + sdd; }
    let currentDate = d.getFullYear() + "-" + sdm + "-" + sdd;

    let strfoo = String(foo);
    let strdat = String(dat);
    // alert(strfoo);
    // alert(strdat);

    //上传包含日志个数，食物数组，日期数组的json
    let dataJson = JSON.stringify({ username: userName, number: currentNodeNumber, foods: strfoo, dates: strdat, date: currentDate });
    // alert(dataJson);
    let req = new XMLHttpRequest();
    let ipPortName = "http://localhost:8080/nutrition"                     //之后记得加前面的ip，port，项目名
    let myurl = ipPortName + "/date-recommendation/foods";
    req.open("POST", myurl, true);
    req.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    req.send(dataJson);

    //从服务器获取数据
    req.onreadystatechange = function () {
        if (req.readyState == 4) {
            myObject = JSON.parse(req.responseText);
            //假设服务器的响应是用 JSON 格式编写的
            if (myObject.code % 2 == 1) {
                result = myObject.data;
                document.getElementById("load-box").style.display = "none";
                document.getElementById("dateResult").innerHTML = result;
            }
            else {
                alert("推荐失败，请稍后重试！");
                document.getElementById("load-box").style.display = "none";
            }
        }
    }
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

var historyButton_Clicked = false;

document.getElementById("historyButton").onclick = function () {
    if (!historyButton_Clicked) {
        document.getElementsByClassName("history-box")[0].style.display = "block";
        historyButton_Clicked = true;

        let userName;
        userName = userSearch.slice(userSearch.indexOf("=") + 1);

        document.getElementById("load-box").style.display = "block";

        //上传包含大致状况，具体症状，治疗方案的json
        let dataJson = JSON.stringify([userName]);
        let req = new XMLHttpRequest();
        let ipPortName = "http://localhost:8080/nutrition"                     //之后记得加前面的ip，port，项目名
        let myurl = ipPortName + "/date-recommendation/history";
        req.open("POST", myurl, true);
        req.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        req.send(dataJson);

        //从服务器获取数据
        req.onreadystatechange = function () {
            if (req.readyState == 4) {
                let myObject;
                myObject = JSON.parse(req.responseText);
                //假设服务器的响应是用 JSON 格式编写的
                if (myObject.code % 2 == 1) {
                    let num = myObject.data.length;
                    let temp = myObject.data;
                    let result = ``;
                    for (let j = 0; j < num; j++) {
                        result += `date: ` + temp[j].date;
                        result += `, foods: ` + temp[j].foods;
                        result += `, dates: ` + temp[j].dates;
                        result += `, recommendation: ` + temp[j].recommendation;
                        result += `<br><br>`;
                    }
                    document.getElementById("load-box").style.display = "none";
                    document.getElementById("history").innerHTML = result;
                }
                else {
                    alert("获取历史失败，请稍后重试！");
                    document.getElementById("load-box").style.display = "none";
                }
            }
        }
    }
}

document.getElementById("hide").onclick = function () {
    if (historyButton_Clicked) {
        document.getElementsByClassName("history-box")[0].style.display = "none";
        historyButton_Clicked = false;
    }
}
