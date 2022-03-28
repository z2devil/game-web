$(document).ready(function()
{
    //改变页面大小时改变宣传视频大小******************************************
    $(window).resize(function() {
        changeiframeH();
    });
    function changeiframeH(){
        var e = $("#video-inner").width();
        $("#video-inner").attr("height",e*0.75);
    }
    //弹出框**************************************************
    //视频查看
    $(".video-play").click(function(){
        document.documentElement.style.overflow='hidden';
        $("#box-main").animate({
            "opacity" : "1"
        },500);
        $("#box-main,#video-box").css("visibility","visible");
        changeiframeH();
    });
    //文档查看
    $(".word-play").click(function(){
        document.documentElement.style.overflow='hidden';
        $("#box-main").animate({
            "opacity" : "1"
        },500);
        $("#box-main,#word-box").css("visibility","visible");
        changeiframeH();
    });
    //退出
    $("#esc").click(function(){
        document.documentElement.style.overflow='visible';
        $("#box-main").animate({
            "opacity" : "0"
        },500,function () {
            $("#box-main,#video-box,#word-box").css("visibility","hidden");
        });
        setTimeout(function(){
            //这里写时间到后执行的代码
            $('#video-inner').attr('src', $('#video-inner').attr('src'));
        }, 500);
    });
    //news操控************************************************
    var newsDots = 0;
    $(".news-dots li:eq(0)").css({
        "color":"white",
        "font-size":"18px"
    });
    //左箭头
    $("#left-arrow").click(function(){
        if (newsDots>0){
            newsDots--;
        } else {
            newsDots=3;
        }
        $(".news-dots").children().css({"color":"#BC7BE8","font-size":"16px"});
        switch (newsDots) {
            case 0:{
                $(".news-dots li:eq(0)").css({
                    "color":"white",
                    "font-size":"18px"
                });
            }break;
            case 1:{
                $(".news-dots li:eq(1)").css({
                    "color":"white",
                    "font-size":"18px"
                });
            }break;
            case 2:{
                $(".news-dots li:eq(2)").css({
                    "color":"white",
                    "font-size":"18px"
                });
            }break;
            case 3:{
                $(".news-dots li:eq(3)").css({
                    "color":"white",
                    "font-size":"18px"
                });
            }break;
        }

        $("#news-track").animate({left:"+=454px"},500,"swing",function () {
            $("#news-track").css("left","-444px");
            $("#news-track").prepend($("#news3"));// 在前者之前插入后者
            $("#news3").attr("id","news4");
            $("#news2").attr("id","news3");
            $("#news1").attr("id","news2");
            $("#news0").attr("id","news1");
            $("#news4").attr("id","news0");
        });
    });
    //右箭头
    $("#right-arrow").click(function(){
        if (newsDots<3){
            newsDots++;
        } else {
            newsDots=0;
        }
        $(".news-dots").children().css({"color":"#BC7BE8","font-size":"16px"});
        switch (newsDots) {
            case 0:{
                $(".news-dots li:eq(0)").css({
                    "color":"white",
                    "font-size":"18px"
                });
            }break;
            case 1:{
                $(".news-dots li:eq(1)").css({
                    "color":"white",
                    "font-size":"18px"
                });
            }break;
            case 2:{
                $(".news-dots li:eq(2)").css({
                    "color":"white",
                    "font-size":"18px"
                });
            }break;
            case 3:{
                $(".news-dots li:eq(3)").css({
                    "color":"white",
                    "font-size":"18px"
                });
            }break;
        }
        $(".news-dots li:eq(newsDots)").css("color","white");
        $("#news-track").animate({left:"-=454px"},500,"swing",function () {
            $("#news-track").css("left","-444px");
            $("#news-track").append($("#news0"));// 在前者之后插入后者
            $("#news0").attr("id","news4");
            $("#news1").attr("id","news0");
            $("#news2").attr("id","news1");
            $("#news3").attr("id","news2");
            $("#news4").attr("id","news3");
        })
    });
});