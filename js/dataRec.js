var userSearch = location.search;
document.getElementsByTagName("a")[0].href += userSearch;
document.getElementsByTagName("a")[1].href += userSearch;
document.getElementsByTagName("a")[2].href += userSearch;
document.getElementsByTagName("a")[3].href += userSearch;
document.getElementsByTagName("a")[4].href += userSearch;

document.getElementById("hint1").onmouseover = function () {
  document.getElementById("info1").style = "display: block";
};

document.getElementById("hint1").onmouseleave = function () {
  document.getElementById("info1").style = "display: none";
};

document.getElementById("hint2").onmouseover = function () {
  document.getElementById("info2").style = "display: block";
};

document.getElementById("hint2").onmouseleave = function () {
  document.getElementById("info2").style = "display: none";
};

document.getElementById("hint3").onmouseover = function () {
  document.getElementById("info3").style = "display: block";
};

document.getElementById("hint3").onmouseleave = function () {
  document.getElementById("info3").style = "display: none";
};

document.getElementById("dataSubmit").onclick = function () {
  let con = document.getElementById("condition").value;
  let sym = document.getElementById("symptom").value;
  let tre = document.getElementById("treatment").value;
  let result = ""; //输出的结果
  let myObject; //保存json转js对象
  if (con == "" || sym == "" || tre == "") {
    alert("请输入完整！");
    return -1;
  }

  document.getElementById("dataResult").innerHTML = "测试数据";
  if (document.getElementById("dataResult").innerHTML === "测试数据") {
    return;
  }

  document.getElementById("load-box").style.display = "block";

  let d = new Date();
  let sdm = String(d.getMonth() + 1);
  if (sdm.length == 1) {
    sdm = "0" + sdm;
  }
  let sdd = String(d.getDate());
  if (sdd.length == 1) {
    sdd = "0" + sdd;
  }
  let currentDate = d.getFullYear() + "-" + sdm + "-" + sdd;
  // alert(currentDate);

  let userName;
  userName = userSearch.slice(userSearch.indexOf("=") + 1);

  //上传包含大致状况，具体症状，治疗方案的json
  let dataJson = JSON.stringify({
    username: userName,
    conditions: con,
    symptoms: sym,
    treatments: tre,
    date: currentDate,
  });
  // alert(dataJson);
  let req = new XMLHttpRequest();
  let ipPortName = "http://localhost:8080/nutrition"; //之后记得加前面的ip，port，项目名
  let myurl = ipPortName + "/data-recommendation/foods";
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
        document.getElementById("dataResult").innerHTML = result;
      } else {
        alert("推荐失败，请稍后重试！");
        document.getElementById("load-box").style.display = "none";
      }
    }
  };
};

// setTimeout(checkLogin, 500);

function checkLogin() {
  if (userSearch == "") {
    let status = confirm("请先登录");
    if (status == true) {
      window.location.href = "login.html";
    } else {
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
    let ipPortName = "http://localhost:8080/nutrition"; //之后记得加前面的ip，port，项目名
    let myurl = ipPortName + "/data-recommendation/history";
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
            result += `, condition: ` + temp[j].conditions;
            result += `, symptom: ` + temp[j].symptoms;
            result += `, treatment: ` + temp[j].treatments;
            result += `, recommendation: ` + temp[j].recommendation;
            result += `<br><br>`;
          }
          document.getElementById("load-box").style.display = "none";
          document.getElementById("history").innerHTML = result;
        } else {
          alert("获取历史失败，请稍后重试！");
          document.getElementById("load-box").style.display = "none";
        }
      }
    };
  }
};

document.getElementById("hide").onclick = function () {
  if (historyButton_Clicked) {
    document.getElementsByClassName("history-box")[0].style.display = "none";
    historyButton_Clicked = false;
  }
};
