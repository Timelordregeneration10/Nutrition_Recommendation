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
