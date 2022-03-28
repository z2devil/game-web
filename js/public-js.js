$(document).ready(function()
{
    // 给元素添加渐变动画效果
    document.getElementById("dropdown1").style.transition = "0.3s";
    document.getElementById("dropdown2").style.transition = "0.3s";
    var topMenuLiLv1 = document.getElementsByClassName("top-menu-li-lv1");
    var topMenuLiLv2 = document.getElementsByClassName("top-menu-li-lv2");
    var userDropdownLi = document.querySelectorAll(".user-dropdown-list a");
    for (var i = 0; i < topMenuLiLv1.length; i++) {
        topMenuLiLv1.item(i).style.transition = "0.3s";
    }
    for (var i = 0; i < topMenuLiLv2.length; i++) {
        topMenuLiLv2.item(i).style.transition = "letter-spacing 0.2s";
    }
    for (var i = 0; i < userDropdownLi.length; i++) {
        userDropdownLi.item(i).style.transition = "0.2s";
    }
    // 下拉菜单1（资料）效果
    document.getElementById("dropdown-li1").onmouseover = function () {
        document.getElementById("dropdown1").style.opacity = '1';
        document.getElementById("dropdown1").style.top = '0px';
    };
    document.getElementById("dropdown-li1").onmouseout = function () {
        document.getElementById("dropdown1").style.top = '-166px';
        document.getElementById("dropdown1").style.opacity = '0';
    };
    // 下拉菜单2（下载）效果
    document.getElementById("dropdown-li2").onmouseover = function () {
        document.getElementById("dropdown2").style.opacity = '1';
        document.getElementById("dropdown2").style.top = '0px';
    };
    document.getElementById("dropdown-li2").onmouseout = function () {
        document.getElementById("dropdown2").style.top = '-166px';
        document.getElementById("dropdown2").style.opacity = '0';
    };
    // 用户下拉菜单效果
    if (localStorage.getItem("loggedUser") !== "{}"){
        $("#login").hover(function () {
            $("#user-dropdown").css("display", "block").animate({
                "opacity" : "1",
                "margin" : "38px -10px 0 -10px"
            }, 200);
        },function () {
            $("#user-dropdown").animate({
                "opacity" : "0",
                "margin" : "0 -10px 0 -10px"
            }, 200, "swing", function () {
                $("#user-dropdown").css("display", "none");
            })
        });
    }
    // 顶部lv1菜单选项效果
    var liLv1 = document.querySelectorAll(".top-menu-li-lv1:not(.selected)");
    for (var i = 0; i < liLv1.length; i++) {
        liLv1[i].addEventListener("mouseover",function () {
            this.style.backgroundColor = "rgba(63,41,78,0.9)";
        });
        liLv1[i].addEventListener("mouseout",function () {
            this.style.backgroundColor = "rgba(29,3,47,0)";
        });
    }
    // 顶部lv2菜单选项效果
    var liLv2 = document.querySelectorAll(".top-menu-li-lv2");
    for (var i = 0; i < liLv2.length; i++) {
        liLv2.item(i).style.transition = "0.2s";
    }
    //用户下拉菜单事件
    userDropdownLi.item(2).addEventListener("click",function () {
        popupSelect("选择", "您确定要退出登录吗？", "是","否", escUser);
    });
    //滚动页面动画********************************************
    function animateInPage () {
        var body_top = window.pageYOffset;
        //向右出现
        $(".animate-right").each(function () {
            var offset_top = $(this).offset().top;
            if (body_top > offset_top - 1050) {
                $(this).animate({
                    "left" : "0px",
                    "opacity" : "1"
                },1000)
            }
        });
        //向左出现
        $(".animate-left").each(function () {
            var offset_top = $(this).offset().top;
            if (body_top > offset_top - 1300) {
                $(this).animate({
                    "left" : "0px",
                    "opacity" : "0.5"
                },500,function () {
                    //接着 向上出现
                    $(".animate-up-s").each(function () {
                        var offset_top = $(this).offset().top;
                        if (body_top > offset_top - 1300) {
                            $(this).animate({
                                "top" : "0px",
                                "opacity" : "1"
                            },500)
                        }
                    });
                })
            }
        });
        //向上出现
        $(".animate-up").each(function () {
            var offset_top = $(this).offset().top;
            if (body_top > offset_top - 1150) {
                $(this).animate({
                    "top" : "0px",
                    "opacity" : "1"
                },"slow")
            }
        });
    }
    //回到顶部****************************************************
    $("#pageTop").fadeOut();
    $(window).scroll(function () {//获得滚动条距离顶部的高度
        if (window.pageYOffset>500) {
            $("#pageTop").css("visibility","visible");
            $("#pageTop").fadeIn("fast");
        }else {
            $("#pageTop").fadeOut("fast");
            $("#pageTop").css("visibility","visible");
        }
        animateInPage();
    });

    /////****************账号相关****************/////

    //设置账号信息
    function setUserData(user, name, password, teleNum){
        user.name = name;
        user.password = password;
        user.teleNum = teleNum;
    }

    //设置账号登录状态为空
    function escUser(){
        localStorage.removeItem("loggedUser");
        loggedUser = new Object();
        localStorage.setItem("loggedUser", JSON.stringify(loggedUser));//将登录状态存入LS
    }

    //初始化账号库
    function initUsers(){
        if (!localStorage.getItem("users")) {//当已登录账号为空时
            //声明管理员账号
            var adminUser = new Object();//创建一个基础账号
            //声明账号库
            var users = new Object();//创建一个users对象
            //声明已登录账号
            var loggedUser = new Object();//创建一个已登录账号

            //补全管理员账号信息
            setUserData(adminUser,"link","123456789", "17639222773");

            users["fenglin000"] = adminUser;//给users对象添加属性（对象）
            localStorage.setItem("users", JSON.stringify(users));//将账号库存入LS
            localStorage.setItem("loggedUser" , JSON.stringify(loggedUser));//将已登录账号存入LS
        }
    }
    initUsers();

    //更新登录信息
    function updateUser(){
        users = JSON.parse(localStorage.getItem("users"));
        loggedUser = JSON.parse(localStorage.getItem("loggedUser"));
        if (JSON.stringify(loggedUser) === "{}") {
            document.getElementById("user-name").innerHTML  = "登陆";
        }else {
            document.getElementById("user-name").innerHTML  = users[loggedUser.account].name;
        }
    }
    updateUser();

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
                document.getElementsByTagName("body")[0].style.overflowY = "visible";
                if (type === 1) {
                    location.reload();//刷新当前页面
                }
            });
        });
        messageTitle.innerHTML = title;
        messageInner.innerHTML = text;
        okButtonInner.innerHTML = "ok";
        var body = document.querySelector("body");
        body.appendChild(background);
        body.appendChild(messageBox);
        //动画效果
        $("#message-box").animate({
            "margin" : "-125px 0 0 -250px",
            "opacity" : "1"
        },300);
        $("#background").animate({
            "opacity" : "0.5"
        },300);
    }

    //选择窗口
    function popupSelect(title, text, select1, select2, f) {
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
        var selectBox = document.createElement("div");
        selectBox.id = "select-box";

        //选项1
        var selectButton1 = document.createElement("button");
        selectButton1.className = "select-button";
        var selectButtonInner1 = document.createElement("span");
        selectButtonInner1.className = "select-button-inner";
        selectButtonInner1.innerHTML = select1;
        selectButton1.appendChild(selectButtonInner1);
        selectBox.appendChild(selectButton1);

        selectButton1.addEventListener("click", function () {
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
                document.getElementsByTagName("body")[0].style.overflowY = "visible";
                f();
                location.reload();
            });
        });

        //选项2
        var selectButton2 = document.createElement("button");
        selectButton2.className = "select-button";
        var selectButtonInner2 = document.createElement("span");
        selectButtonInner2.className = "select-button-inner";
        selectButtonInner2.innerHTML = select2;
        selectButton2.appendChild(selectButtonInner2);
        selectBox.appendChild(selectButton2);

        selectButton2.addEventListener("click", function () {
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
                document.getElementsByTagName("body")[0].style.overflowY = "visible";
            });
        });

        messageBox.appendChild(messageTitleBack);
        messageBox.appendChild(messageTitleBack);
        messageBox.appendChild(messageTitle);
        messageBox.appendChild(messageInner);
        messageBox.appendChild(selectBox);
        messageTitle.innerHTML = title;
        messageInner.innerHTML = text;
        var body = document.querySelector("body");
        body.appendChild(background);
        body.appendChild(messageBox);
        //动画效果
        $("#message-box").animate({
            "margin" : "-125px 0 0 -250px",
            "opacity" : "1"
        },300);
        $("#background").animate({
            "opacity" : "0.5"
        },300);
    }
});

