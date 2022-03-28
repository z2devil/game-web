$(document).ready(function()
{
    //调整章节盒子高度
    function changeTextboxH(element) {
        var textListH = (parseInt(($(element + " .sec-list").length/3).toString())+1)*41;
        $(".container-part").animate({
            "height" : ""+(350+textListH)+"px"
        },200);
    }
    changeTextboxH(".text");
    //去除最后一行章节下边框
    function deleUnderline(element) {
        var deleUnderlineNum = $(element + " .sec-list").length-$(element + " .sec-list").length%3-1;
        $(element + " .sec-list:gt("+deleUnderlineNum+")").css("border-bottom","0");
    }
    deleUnderline(".text");
    // 两个按钮
    $(".button-box .btn1").click(function () {
        $(".btn-back").animate({
            "left" : "0px"
        },200, "swing");

        $(".text").css("visibility","visible");
        $(".text").animate({
            "opacity" : "1"
        },200, "swing");

        $(".extra").animate({
            "opacity" : "0"
        },200, "swing");
        $(".extra").css("visibility","hidden");

        changeTextboxH(".text");
        deleUnderline(".text");
    });
    $(".button-box .btn2").click(function () {
        $(".btn-back").animate({
            "left": "94px"
        }, 200, "swing");

        $(".extra").css("visibility","visible");
        $(".extra").animate({
            "opacity" : "1"
        },200, "swing");


        $(".text").animate({
            "opacity" : "0"
        },200, "swing");
        $(".text").css("visibility","hidden");

        changeTextboxH(".extra");
        deleUnderline(".extra");
    });
});