$(document).ready(function()
{
    /////****************弹窗相关****************/////

    //通知窗口
    function popup(title,text,type) {
        document.getElementsByTagName("body")[0].style.overflow = "hidden";
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
                if (type === 1) {
                    location.reload();//刷新当前页面
                }
            });
        });
        messageTitle.innerHTML = title;
        messageInner.innerHTML = text;
        okButtonInner.innerHTML = "ok";
        var wrapper = document.querySelector(".wrapper");
        wrapper.appendChild(background);
        wrapper.appendChild(messageBox);
        //动画效果
        $("#message-box").animate({
            "margin" : "-125px 0 0 -250px",
            "opacity" : "1"
        },300);
        $("#background").animate({
            "opacity" : "0.5"
        },300);
    }

    /////****************弹窗相关****************/////
    
    function initMuseum() {
        var collection = {
            1:{name:"苹果", effect:{hp:"+60"}, price:"20", describe:"不能沾着氰化钾吃。"},
            2:{name:"葡萄", effect:{SP:"+60"}, price:"20", describe:"香甜~"},
            3:{name:"黑面包", effect:{hp:"+60"}, price:"20", describe:"不能沾着氰化钾吃。"},
            4:{name:"粉红浓缩", effect:{SP:"+60"}, price:"20", describe:"香甜~"},
            5:{name:"兰淬果冻", effect:{sp:"+200"}, price:"20", describe:"不能沾着氰化钾吃。"},
            6:{name:"兰淬精华", effect:{hp:"+500",sp:"+500"}, price:"20", describe:"香甜~"}
        }
        
    }
    
    //滚动页面时********************************************
    function animateInPage () {
        var body_top = window.pageYOffset;
        //****************************************
        //左边导航列表
        //****************************************
        var listNum = parseInt(((window.pageYOffset-300)/500).toString());
        $(".list-member").removeClass("active");
        $(".list-member:eq("+listNum+")").addClass("active");
        $(".container-part").each(function () {
            if (body_top < 300) {
                $(".list-lv2").css({
                    "display" : "none"
                })
            }

            if (body_top >= 300 && body_top < 300+$(".prop").length*500) {
                $(".list-prop").css({
                    "display" : "block"
                })
            }else {
                $(".list-prop").css({
                    "display" : "none"
                });
            }

            if (body_top >= 300+$(".prop").length*500 && body_top < 300+$(".prop").length*500+$(".arm").length*500) {
                $(".list-arm").css({
                    "display" : "block"
                })
            }else {
                $(".list-arm").css({
                    "display" : "none"
                });
            }

            if (body_top >= 300+$(".prop").length*500+$(".arm").length*500 && body_top < 300+$(".prop").length*500+$(".arm").length*500+$(".equip").length*500) {
                $(".list-equip").css({
                    "display" : "block"
                })
            }else {
                $(".list-equip").css({
                    "display" : "none"
                });
            }
        })
    }
    // 左边导航栏**点击********************************************
    $(".prop-button").click(function () {
        $(".list-lv2").css("display" , "none");
        $(".list-prop").css("display" , "block");
    });
    $(".arm-button").click(function () {
        $(".list-lv2").css("display" , "none");
        $(".list-arm").css("display" , "block");
    });
    $(".equip-button").click(function () {
        $(".list-lv2").css("display" , "none");
        $(".list-equip").css("display" , "block");
    });
    $(".list-member").mouseover(function () {
        $(".list-lv2 li").removeClass("hover");
        $(this).parents(".list-lv2 li").addClass("hover");
    });
    $(".list-prop .list-member").click(function () {
        var listNum = $(".hover").prevAll().length;
        $('html,body').animate({scrollTop:300+listNum*500},0);
    });
    $(".list-arm .list-member").click(function () {
        var listNum = $(".hover").prevAll().length;
        $("html,body").animate({scrollTop:3300+listNum*500},0);
    });
    $(".list-equip .list-member").click(function () {
        var listNum = $(".hover").prevAll().length;
        $("html,body").animate({scrollTop:6300+listNum*500},0);
    });
    //回到顶部****************************************************
    $("#pageTop").fadeOut();
    $(window).scroll(function () {//获得滚动条距离顶部的高度
        if (window.pageYOffset>400) {
            $("#left-inner").css({
                "position" : "fixed",
                "top" : "321px"
            });
            $("#search-box").css({
                "position" : "fixed",
                "top" : "130px"
            });
        }else {
            $("#left-inner").css({
                "position" : "relative",
                "top" : "0px"
            });
            $("#search-box").css({
                "position" : "absolute",
                "top" : "140px"
            });
        }
        animateInPage();
    });
});