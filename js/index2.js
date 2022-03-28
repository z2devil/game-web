$(document).ready(function()
{
    //标签相关
    $(".require-box-container:eq("+0+")").animate({
        "opacity" : "1",
        "z-index" : "3"
    },0);
    $(".tag-list").click(function () {
        $(".tag-list").removeClass("active");
        $(this).addClass("active");

        var tagNum = ($(this).prevAll()).length-1;
        $(".tag-list-back").animate({
            "left" : tagNum*234+"px"
        },200, "swing");

        $(".require-box-container").animate({
            "opacity" : "0",
            "z-index" : "2"
        },200, "swing");
        $(".require-box-container:eq("+tagNum+")").animate({
            "opacity" : "1",
            "z-index" : "3"
        },200, "swing");
    });
    //按钮动画
    $(".patch-list a").hover(function () {
        $(this).children(".download-link").css("opacity",0);
        $(this).children(".file-size").css("opacity",1)
    },function () {
        $(this).children(".download-link").css("opacity",1);
        $(this).children(".file-size").css("opacity",0)
    });
});
