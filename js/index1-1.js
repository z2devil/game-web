$(document).ready(function()
{
    //标签相关
    $(".container-part:eq("+0+")").animate({
        "opacity" : "1",
        "z-index" : "3"
    },0);
    $(".info-tag span").click(function () {
        $(".info-tag").removeClass("active");
        $(this).parents(1).addClass("active");

        var tagNum = ($(this).parents(1).prevAll()).length-6;
        $(".tag-back").animate({
            "left" : tagNum*115+"px"
        },200, "swing");

        $(".container-part").animate({
            "opacity" : "0",
            "z-index" : "2"
        },200, "swing");
        $(".container-part:eq("+tagNum+")").animate({
            "opacity" : "1",
            "z-index" : "3"
        },200, "swing");
    });
});