/////****************弹窗相关****************/////

//通知窗口
function popup(title,text,type) {
    document.getElementsByTagName("body")[0].style.overflowY = "hidden";
    var background = document.createElement("div");
    background.id = "background";
    var messageBox = document.createElement("div");
    messageBox.id = "message-box";
    var messageTitleBack = document.createElement("div");
    messageTitleBack.id = "message-title-back";
    var messageTitle = document.createElement("span");
    messageTitle.id = "message-title";
    var messageInner = document.createElement("span");
    messageInner.id = "message-inner";
    var okButton = document.createElement("button");
    okButton.className = "ok-button";
    var okButtonInner = document.createElement("span");
    okButtonInner.className = "ok-button-inner";
    messageBox.appendChild(messageTitleBack);
    messageBox.appendChild(messageTitle);
    messageBox.appendChild(messageInner);
    messageBox.appendChild(okButton);
    okButton.appendChild(okButtonInner);
    okButton.addEventListener("click", function () {
        //动画效果
        $("#message-box").animate({
            "margin" : "-200px 0 0 -250px",
            "opacity" : "0"
        },300);
        $("#background").animate({
            "opacity" : "0"
        },300,"swing", function () {
            $("#message-box").remove();
            $("#background").remove();
            document.getElementsByTagName("body")[0].style.overflow = "visible";
        });
    });
    messageTitle.innerHTML = title;
    messageInner.innerHTML = text;
    okButtonInner.innerHTML = "ok";
    var body = document.querySelector("body");
    body.appendChild(background);
    body.appendChild(messageBox);
    //动画效果
    //动画效果
    $("#message-box").animate({
        "margin" : "-125px 0 0 -250px",
        "opacity" : "1"
    },300);
    $("#background").animate({
        "opacity" : "0.5"
    },300);
    if (type === 1) {
        setTimeout("window.history.back();",3000)
    }
}

$(document).ready(function ()
{
    /////****************标签相关****************/////

    //登陆标签
    document.getElementById("login-tab").addEventListener("click", function () {
        document.getElementById("login-box-tab-back").style.left = "0px";
        document.getElementsByClassName("form-box-inner").item(0).style.visibility = "visible";
        document.getElementsByClassName("form-box-inner").item(0).style.opacity = "1";
        document.getElementsByClassName("form-box-inner").item(1).style.visibility = "hidden";
        document.getElementsByClassName("form-box-inner").item(1).style.opacity = "0";
        document.getElementsByClassName("login-box-back").item(0).style.height = "400px";
        document.getElementsByClassName("login-box-back").item(1).style.height = "350px";
    });

    //注册标签
    document.getElementById("register-tab").addEventListener("click", function () {
        document.getElementById("login-box-tab-back").style.left = "250px";
        document.getElementsByClassName("form-box-inner").item(1).style.visibility = "visible";
        document.getElementsByClassName("form-box-inner").item(1).style.opacity = "1";
        document.getElementsByClassName("form-box-inner").item(0).style.visibility = "hidden";
        document.getElementsByClassName("form-box-inner").item(0).style.opacity = "0";
        document.getElementsByClassName("login-box-back").item(0).style.height = "640px";
        document.getElementsByClassName("login-box-back").item(1).style.height = "590px";
    });


    /////****************账号相关****************/////

    //登陆相关
    var checkLoginData0, checkLoginData1 = false;

    var loginData = document.querySelectorAll(".login-from .from-item-input");//获取全部注册input元素
    var loginDataSpan = document.querySelectorAll(".login-from span");//获取全部注册input元素后面的span

    loginData[0].addEventListener("blur", function () {
        checkAccountLogin(this.value);
    });
    loginData[1].addEventListener("blur", function () {
        checkPwdLogin(this.value);
    });

    //注册相关
    var checkRegData0, checkRegData1, checkRegData2, checkRegData3, checkRegData4, checkRegData5 = false;

    var registerData = document.querySelectorAll(".register-from .from-item-input");//获取全部注册input元素
    var registerDataSpan = document.querySelectorAll(".register-from span");//获取全部注册input元素后面的span

    registerData[0].addEventListener("blur", function () {
        checkAccount(this.value);
    });
    registerData[1].addEventListener("blur", function () {
        checkPwd(this.value);
    });
    registerData[2].addEventListener("blur", function () {
        checkPwdRepeat(this.value);
    });
    registerData[3].addEventListener("blur", function () {
        checkName(this.value);
    });
    registerData[4].addEventListener("blur", function () {
        checkTele(this.value);
    });
    registerData[5].addEventListener("blur", function () {
        checkCaptcha(this.value);
    });

    //校验账号
    function checkAccountLogin(account) {
        console.log();
        /*定义正则表达式*/
        var reg = /^[a-zA-Z0-9]\w{5,19}$/;
        var flag = reg.test(account);
        if (!flag) {
            loginDataSpan[0].innerHTML = "×";
            checkLoginData0 = false;
        } else {
            loginDataSpan[0].innerHTML = "✓";
            checkLoginData0 = true;
        }
    }

    //校验密码
    function checkPwdLogin(pwd) {
        /*定义正则表达式*/
        var reg = /^[a-zA-Z0-9]\w{5,19}$/;
        var flag = reg.test(pwd);
        if (!flag) {
            loginDataSpan[1].innerHTML = "×";
            checkLoginData1 = false;
        } else {
            loginDataSpan[1].innerHTML = "✓";
            checkLoginData1 = true;
        }
    }

    //校验账号
    function checkAccount(account) {
        console.log();
        /*定义正则表达式*/
        var reg = /^[a-zA-Z0-9]\w{5,19}$/;
        var flag = reg.test(account);
        if (!flag) {
            registerDataSpan[0].innerHTML = "×";
            checkRegData0 = false;
        } else {
            registerDataSpan[0].innerHTML = "✓";
            checkRegData0 = true;
        }
    }

    //校验密码
    function checkPwd(pwd) {
        /*定义正则表达式*/
        var reg = /^[a-zA-Z0-9]\w{5,19}$/;
        var flag = reg.test(pwd);
        if (!flag) {
            registerDataSpan[1].innerHTML = "×";
            checkRegData1 = false;
        } else {
            registerDataSpan[1].innerHTML = "✓";
            checkRegData1 = true;
        }
    }

    //检验重复密码
    function checkPwdRepeat(pwdRepeat) {
        /*获取第一个密码*/
        var pwd1 = document.getElementById("password").value;
        /*进行比对*/
        if (pwd1 !== pwdRepeat || !pwdRepeat) {
            registerDataSpan[2].innerHTML = "×";
            checkRegData2 = false;
        } else {
            registerDataSpan[2].innerHTML = "✓";
            checkRegData2 = true;
        }
    }

    //校验昵称
    function checkName(name){
        /*定义正则表达式*/
        var reg = /^[\u0391-\uFFE5A-z0-9]{2,10}$/;
        var flag = reg.test(name);
        if (!flag) {
            registerDataSpan[3].innerHTML = "×";
            checkRegData3 = false;
        } else {
            registerDataSpan[3].innerHTML = "✓";
            checkRegData3 = true;
        }
    }

    //校验手机号
    function checkTele(tele){
        /*定义正则表达式*/
        var reg = /^[a-zA-Z0-9]\w{10,15}$/;
        var flag = reg.test(tele);
        if (!flag) {
            registerDataSpan[4].innerHTML = "×";
            checkRegData4 = false;
        } else {
            registerDataSpan[4].innerHTML = "✓";
            checkRegData4 = true;
        }
    }

    //校验验证码
    function checkCaptcha(captcha) {
        var pwd1 = {0:"12345", 1:"23456"};
        /*进行比对*/
        for (var i = 0; i < 2; i++) {
            if (pwd1[i] !== captcha || !captcha) {
                registerDataSpan[5].innerHTML = "×";
                checkRegData5 = false;
            } else {
                registerDataSpan[5].innerHTML = "✓";
                checkRegData5 = true;
                return;
            }
        }
    }

    //设置账号信息
    function setUserData(user, name, password, teleNum){
        user.name = name;
        user.password = password;
        user.teleNum = teleNum;
    }

    //设置账号登录状态
    function setUserStatus(user,account){
        user.account = account;
    }

    //注册按钮
    $(".register-from").submit(function (event) {
        event.preventDefault();//阻止事件默认动作
        users = JSON.parse(localStorage.getItem("users"));//取出users对象
        if (checkRegData0 && checkRegData1 && checkRegData2 && checkRegData3 && checkRegData4 && checkRegData5) {
            if (!users[registerData[0].value]) {//账号不存在时
                var newUser = new Object();
                setUserData(newUser,registerData[3].value, registerData[1].value, registerData[4].value);
                users[registerData[0].value] = newUser;
                localStorage.setItem("users", JSON.stringify(users));
                popup("提示","注册成功！",1);
            }else {
                popup("提示","账号已存在！",0);
            }
        }else {
            popup("提示","请正确填写信息",0);
        }
    });



    //登陆按钮
    $(".login-from").submit(function (event) {
        event.preventDefault();//阻止事件默认动作
        users = JSON.parse(localStorage.getItem("users"));//取出users对象
        loggedUser = JSON.parse(localStorage.getItem("loggedUser"));//取出loggedUser对象
        var loginData = document.querySelectorAll(".login-from .from-item-input");//获取填入数据
        if (checkLoginData0 && checkLoginData1) {
            if (JSON.stringify(loggedUser) === "{}"){//未登录时
                if (users[loginData[0].value].password === loginData[1].value) {//密码正确时
                    setUserStatus(loggedUser, loginData[0].value);//更改登录状态
                    localStorage.setItem("loggedUser", JSON.stringify(loggedUser));//将登录状态存入LS
                    popup("提示","登陆成功!(页面于三秒后跳转...)",1);
                }else {//密码不正确时
                    popup("提示","密码错误!",0);
                }
            } else {//已登录时
                if (loggedUser.account !== loginData[0].value){//已登录账号不是欲登陆账号时
                    popup("提示","已经有账号登陆",0);
                }else {//已登录账号是欲登陆账号时
                    popup("提示","该账号已经登陆",0);
                }
            }
        }else {
            popup("提示","请正确填写信息",0);
        }
    });

    //更新登录信息
    function updateUser(){
        users = JSON.parse(localStorage.getItem("users"));
        loggedUser = JSON.parse(localStorage.getItem("loggedUser"));
        if (JSON.stringify(loggedUser) === "{}") {
            document.getElementById("userName").innerHTML  = "登陆";
        }else {
            document.getElementById("userName").innerHTML  = users[loggedUser.account].name;
        }
    }
});