$(document).ready(function()
{
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

    //编辑物品窗口
    function popupEX(item) {
        // 返回功能--------------------------//
        function esc() {
            waringBool = true;
            //动画效果
            $("#detail-info-box").animate({
                "margin" : "-250px 0 0 -250px",
                "opacity" : "0"
            },300);
            $("#background").animate({
                "opacity" : "0"
            },300,"swing", function () {
                $("#detail-info-box").remove();
                $("#background").remove();
                document.getElementsByTagName("body")[0].style.overflowY = "visible";
            });
            if (document.getElementsByClassName("container-part active")[0] !== undefined){
                document.getElementsByClassName("container-part active")[0].classList.remove("active");
            }
        }

        // 保存功能--------------------------//
        var waringBool = true;
        function save() {
            //取出博物馆对象
            var collection = JSON.parse(localStorage.getItem("collection"));
            //获取id
            var numData = document.getElementsByClassName("detail-info-effect-num-input")[0].value;
            if (collection[numData] !== undefined && waringBool){
                $(".detail-info-select-span").remove();
                var selectBox = document.getElementById("detail-info-select-box");
                var waringSpan = document.createElement("span");
                waringSpan.innerHTML = "该位置（ID）已经存放藏品，确定要替换吗？";
                waringSpan.className = "detail-info-select-span";
                selectBox.appendChild(waringSpan);
                waringBool = false;
                return;
            }
            if (numData < 0){
                $(".detail-info-select-span").remove();
                var selectBox = document.getElementById("detail-info-select-box");
                var waringSpan = document.createElement("span");
                waringSpan.innerHTML = "请勿输入小于等于0的ID！";
                waringSpan.className = "detail-info-select-span";
                selectBox.appendChild(waringSpan);
                return;
            }
            $(".detail-info-select-span").remove();
            var selectBox = document.getElementById("detail-info-select-box");
            var waringSpan = document.createElement("span");
            waringSpan.innerHTML = "保存成功！";
            waringSpan.className = "detail-info-select-span";
            selectBox.appendChild(waringSpan);
            waringBool = true;

            //获取名称
            var nameData = document.getElementsByClassName("detail-info-effect-name-input")[0].value;
            //获取效果
            var effectHPData = document.getElementsByClassName("detail-info-effect-HP-input")[0].value;
            var effectSPData = document.getElementsByClassName("detail-info-effect-SP-input")[0].value;
            //获取描述
            var describeData = document.getElementsByClassName("detail-info-effect-des-textarea")[0].value;
            //创建效果对象
            var effect = new Object();
            if (effectHPData !== "0" && effectHPData !== ""){
                if (effectHPData > 0){
                    effect.hp = "+" + effectHPData;
                } else {
                    effect.hp =  effectHPData;
                }
            }
            if (effectSPData !== "0" && effectSPData !== ""){
                if (effectSPData > 0){
                    effect.sp = "+" + effectSPData;
                } else {
                    effect.sp =  effectSPData;
                }
            }

            //删除老数据
            //获取id
            var oldNumData = parseInt(document.getElementsByClassName("container-part active")[0].childNodes[1].childNodes[0].innerHTML.replace("NO.", ""));
            delete collection[oldNumData];
            //删除元素
            $(".container-part.active")[0].remove();

            //创建藏品对象
            var item = new Object();
            item.name = nameData;
            item.effect = effect;
            item.describe = describeData;
            collection[numData] = item;
            localStorage.setItem("collection", JSON.stringify(collection));

            //更新博物馆
            updateMuseum();
            updateStanceItem();
            //返回
            esc();

            addItemBool = false;
        }

        // 删除功能--------------------------//
        function deleteItem() {
            //取出博物馆对象
            var collection = JSON.parse(localStorage.getItem("collection"));
            //获取id
            var numData = parseInt(document.getElementsByClassName("container-part active")[0].childNodes[1].childNodes[0].innerHTML.replace("NO.", ""));
            //删除元素
            $(".container-part.active")[0].remove();
            //从LS删除
            delete collection[numData];
            localStorage.setItem("collection", JSON.stringify(collection));
            //更新博物馆
            updateMuseum();
            updateStanceItem();
        }

        var museumItem = JSON.parse(localStorage.getItem("collection"));
        // id
        var num = parseInt(item.parentNode.children[1].children[0].innerHTML.replace("NO.", ""));

        // 禁止滑动
        document.getElementsByTagName("body")[0].style.overflowY = "hidden";

        // 背景
        var background = document.createElement("div");
        background.id = "background";

        // 提示框
        var messageBox = document.createElement("div");
        messageBox.id = "detail-info-box";

        // 标题背景
        var messageTitleBack = document.createElement("div");
        messageTitleBack.id = "message-title-back";
        messageBox.appendChild(messageTitleBack);

        // 标题
        var messageTitle = document.createElement("span");
        messageTitle.innerHTML = "藏品信息";
        messageTitle.id = "message-title";
        messageBox.appendChild(messageTitle);

        // 内容
        var messageInner = document.createElement("span");
        messageInner.id = "message-inner";
        messageBox.appendChild(messageInner);

        // 图标
        var itemImgBox = document.createElement("div");
        itemImgBox.className = "detail-info-img-box";
        var itemBack = document.createElement("div");
        itemBack.className = "items-back";
        var itemImg = document.createElement("img");
        itemImg.className = "items-img";
        itemImg.src = "image/items/item"+num+".png";
        itemImgBox.appendChild(itemBack);
        itemImgBox.appendChild(itemImg);
        messageInner.appendChild(itemImgBox);

        // 物品效果
        var infoBox = document.createElement("div");
        infoBox.className = "detail-info-effect-box";

        //物品id
        if (!editModel){
            var numSpan = document.createElement("span");
            numSpan.innerHTML = item.parentNode.children[1].children[0].innerHTML;
            numSpan.className = "detail-info-effect-num-span";
            infoBox.appendChild(numSpan);
        } else {
            var numSpan = document.createElement("span");
            numSpan.innerHTML = "ID";
            numSpan.className = "detail-info-effect-num-input-span";
            infoBox.appendChild(numSpan);

            var numInput = document.createElement("input");
            numInput.type = "number";
            numInput.value = ""+num;
            numInput.className = "detail-info-effect-num-input";
            infoBox.appendChild(numInput);
        }

        //物品名称
        if (!editModel){
            var nameSpan = document.createElement("span");
            if (num !== 0){
                nameSpan.innerHTML = museumItem[num].name;
            } else {
                nameSpan.innerHTML = "未命名";
            }
            nameSpan.className = "detail-info-effect-name-span";
            infoBox.appendChild(nameSpan);
        } else {
            var nameSpan = document.createElement("span");
            nameSpan.innerHTML = "名称";
            nameSpan.className = "detail-info-effect-name-input-span";
            infoBox.appendChild(nameSpan);

            var nameInput = document.createElement("input");
            if (num !== 0){
                nameInput.value = museumItem[num].name;
            } else {
                nameInput.value = "未命名";
            }
            nameInput.type = "text";
            nameInput.className = "detail-info-effect-name-input";
            infoBox.appendChild(nameInput);
        }

        // 效果和描述
        var basicInfoDl = document.createElement("dl");

        //效果
        var basicInfoDt1 = document.createElement("dt");
        basicInfoDt1.innerHTML = "效果：";
        basicInfoDl.appendChild(basicInfoDt1);

        var basicInfoDd1 = document.createElement("dd");
        if (!editModel){
            var basicInfoDdSpan1 = document.createElement("span");
            if (num !== 0){
                if (museumItem[num].effect.hp !== undefined) {
                    basicInfoDdSpan1.innerHTML += ("[HP"+museumItem[num].effect.hp+"] ");
                }
                if (museumItem[num].effect.sp !== undefined) {
                    basicInfoDdSpan1.innerHTML += ("[SP"+museumItem[num].effect.sp+"] ");
                }
            } else {
                basicInfoDdSpan1.innerHTML = "无";
            }
            basicInfoDd1.appendChild(basicInfoDdSpan1);
        }else {
            //HP标题
            var basicInfoDdSpanHP = document.createElement("span");
            basicInfoDdSpanHP.innerHTML = "HP";
            basicInfoDd1.appendChild(basicInfoDdSpanHP);

            var basicInfoDdInputHP = document.createElement("input");
            basicInfoDdInputHP.type = "number";
            if (num !== 0){
                if (museumItem[num].effect.hp !== undefined) {
                    basicInfoDdInputHP.value = parseInt(museumItem[num].effect.hp);
                }else {
                    basicInfoDdInputHP.value = 0;
                }
            } else {
                basicInfoDdInputHP.value = 0;
            }

            basicInfoDdInputHP.className = "detail-info-effect-HP-input";
            basicInfoDd1.appendChild(basicInfoDdInputHP);

            //SP
            var basicInfoDdSpanSP = document.createElement("span");
            basicInfoDdSpanSP.innerHTML = "SP";
            basicInfoDd1.appendChild(basicInfoDdSpanSP);

            var basicInfoDdInputSP = document.createElement("input");
            basicInfoDdInputSP.type = "number";
            if (num !== 0){
                if (museumItem[num].effect.sp !== undefined) {
                    basicInfoDdInputSP.value = parseInt(museumItem[num].effect.sp);
                }else {
                    basicInfoDdInputSP.value = 0;
                }
            } else {
                basicInfoDdInputSP.value = 0;
            }

            basicInfoDdInputSP.className = "detail-info-effect-SP-input";
            basicInfoDd1.appendChild(basicInfoDdInputSP);
        }
        basicInfoDl.appendChild(basicInfoDd1);

        //描述
        var basicInfoDt2 = document.createElement("dt");
        basicInfoDt2.innerHTML = "描述：";
        basicInfoDl.appendChild(basicInfoDt2);

        var basicInfoDd2 = document.createElement("dd");
        if (!editModel){
            var basicInfoDdSpan2 = document.createElement("span");
            if (num !== 0){
                basicInfoDdSpan2.innerHTML = museumItem[num].describe;
            } else {
                basicInfoDdSpan2.innerHTML = "无";
            }
            basicInfoDd2.appendChild(basicInfoDdSpan2);
        }else {
            var basicInfoDdInputDes = document.createElement("textarea");
            if (num !== 0){
                basicInfoDdInputDes.value = museumItem[num].describe;
            } else {
                basicInfoDdInputDes.value = "无";
            }
            basicInfoDdInputDes.className = "detail-info-effect-des-textarea";
            basicInfoDd2.appendChild(basicInfoDdInputDes);
        }
        basicInfoDl.appendChild(basicInfoDd2);

        infoBox.appendChild(basicInfoDl);
        messageInner.appendChild(infoBox);

        // 选项容器
        var selectBox = document.createElement("div");
        selectBox.id = "detail-info-select-box";
        messageBox.appendChild(selectBox);

        //选项1
        var selectButton1 = document.createElement("button");
        selectButton1.className = "detail-info-select-button";
        var selectButtonInner1 = document.createElement("span");
        selectButtonInner1.className = "select-button-inner";
        selectButtonInner1.innerHTML = "返回";
        selectButton1.appendChild(selectButtonInner1);
        selectBox.appendChild(selectButton1);

        //选项2
        if (editModel){
            var selectButton2 = document.createElement("button");
            selectButton2.className = "detail-info-select-button";
            var selectButtonInner2 = document.createElement("span");
            selectButtonInner2.className = "select-button-inner";
            selectButtonInner2.innerHTML = "保存";
            selectButton2.appendChild(selectButtonInner2);
            selectBox.appendChild(selectButton2);
        }

        // 删除按钮
        if (editModel){
            var deleteButton = document.createElement("button");
            deleteButton.className = "detail-info-delete-button";

            var deleteButtonSpan = document.createElement("span");
            deleteButtonSpan.className = "detail-info-delete-button-span";
            deleteButtonSpan.innerHTML = "删除";

            deleteButton.appendChild(deleteButtonSpan);
            deleteButton.addEventListener("click", function (){
                deleteItem();
                esc();
            });
            messageBox.appendChild(deleteButton);
        }

        // 将提示框加入body
        var body = document.querySelector("body");
        body.appendChild(background);
        body.appendChild(messageBox);

        if ($(".detail-info-select-button").length > 1){
            $(".detail-info-select-button")[0].addEventListener("click",esc);
            $(".detail-info-select-button")[1].addEventListener("click",save);
        } else {
            $(".detail-info-select-button")[0].addEventListener("click",esc);
        }

        //动画效果
        $("#detail-info-box").animate({
            "margin" : "-200px 0 0 -250px",
            "opacity" : "1"
        },300);
        $("#background").animate({
            "opacity" : "0.5"
        },300);
    }

    // 创建物品详细信息窗口
    function createItemInfo(item) {
        $(".info-box").remove();
        var num = parseInt(item.parentNode.children[1].children[0].innerHTML.replace("NO.", ""));
        var museumItem = JSON.parse(localStorage.getItem("collection"));
        var infoBox = document.createElement("div");
        infoBox.className = "info-box";
        var basicInfoDl = document.createElement("dl");
        var basicInfoDt1 = document.createElement("dt");
        basicInfoDt1.innerHTML = "效果：";
        var basicInfoDt2 = document.createElement("dt");
        basicInfoDt2.innerHTML = "描述：";
        var basicInfoDd1 = document.createElement("dd");
        var basicInfoDd2 = document.createElement("dd");
        var basicInfoDdSpan1 = document.createElement("span");
        if (num !== 0){
            if (museumItem[num].effect.hp !== undefined) {
                basicInfoDdSpan1.innerHTML += ("[HP"+museumItem[num].effect.hp+"] ");
            }
            if (museumItem[num].effect.sp !== undefined) {
                basicInfoDdSpan1.innerHTML += ("[SP"+museumItem[num].effect.sp+"] ");
            }
            if (museumItem[num].effect.hp === undefined && museumItem[num].effect.sp === undefined) {
                basicInfoDdSpan1.innerHTML = "无";
            }
        }else {
            basicInfoDdSpan1.innerHTML = "无";
        }

        var basicInfoDdSpan2 = document.createElement("span");
        if (num !== 0){
            basicInfoDdSpan2.innerHTML = museumItem[num].describe;
        }else {
            basicInfoDdSpan2.innerHTML = "无";
        }

        basicInfoDd1.appendChild(basicInfoDdSpan1);
        basicInfoDd2.appendChild(basicInfoDdSpan2);
        basicInfoDl.appendChild(basicInfoDt1);
        basicInfoDl.appendChild(basicInfoDd1);
        basicInfoDl.appendChild(basicInfoDt2);
        basicInfoDl.appendChild(basicInfoDd2);
        infoBox.appendChild(basicInfoDl);
        var containerInner = document.querySelector(".container-inner");
        containerInner.appendChild(infoBox);
        $(".info-box")[0].style.top = item.parentNode.offsetTop+"px";
        $(".info-box")[0].style.left = item.parentNode.offsetLeft+"px";
        $(".info-box")[0].style.margin = "0 110px";
        $(".info-box")[0].style.opacity = "1";
    }

    /////****************博物馆相关****************/////

    // 初始化博物馆数据
    var editModel = false;
    function initMuseum() {
        var collection = {
            1:{name:"苹果", effect:{hp:"+60"}, describe:"不能沾着氰化钾吃。"},
            2:{name:"葡萄", effect:{sp:"+60"}, describe:"香甜~"},
            3:{name:"黑面包", effect:{hp:"+100",sp:"+100"}, describe:"小麦粉中掺杂了大量的麦糠，廉价常见，味道不是很好。"},
            4:{name:"粉红浓缩", effect:{hp:"+200"}, describe:"略有些粘稠的粉红色液体。"},
            5:{name:"兰淬果冻", effect:{sp:"+200"}, describe:"晶莹的淡蓝色果冻体，怎么倒出来？"},
            6:{name:"兰淬精华", effect:{hp:"+500",sp:"+500"}, describe:"浓稠的湛蓝色液体，仔细观察其中好像有点点星光流转。"}
        };
        localStorage.setItem("collection",JSON.stringify(collection));
    }
    if (localStorage.getItem("collection") === null){
        initMuseum();
    }

    // 更新博物馆
    function updateMuseum() {
        var collection = JSON.parse(localStorage.getItem("collection"));
        $(".container-part").remove();
        for (var i = 1; i < Object.getOwnPropertyNames(collection).length+1; i++) {
            createMuseumItem(parseInt(Object.keys(collection)[i-1]));
        }
    }
    updateMuseum();

    // 生成一个站位空物品
    function createMuseumItemNull() {
        //物品容器
        var containerPart = document.createElement("div");
        containerPart.className = "container-part";
        document.getElementsByClassName("container-inner")[0].appendChild(containerPart);
    }

    // 生成一个物品
    function createMuseumItem(num) {
        var museumItem = JSON.parse(localStorage.getItem("collection"));
        var itemType;

        if (num == 0){
            itemType = "empty";
        }
        if (num > 0 && num < 7){
            itemType = "prop";

        }
        if (num > 7){
            itemType = "prop";
        }

        //物品容器
        var containerPart = document.createElement("div");
        containerPart.className = "container-part " + itemType;
        document.getElementsByClassName("container-inner")[0].appendChild(containerPart);
        //图标
        var itemImgBox = document.createElement("div");
        itemImgBox.className = "items-img-box";
        var itemBack = document.createElement("div");
        itemBack.className = "items-back";
        var itemImg = document.createElement("img");
        itemImg.className = "items-img";
        itemImg.src = "image/items/item"+num+".png";
        itemImgBox.appendChild(itemBack);
        itemImgBox.appendChild(itemImg);
        itemImgBox.addEventListener("mouseover",function () {
            createItemInfo(this);
        });
        itemImgBox.addEventListener("mouseout",function () {
            $(".info-box").remove();
        });
        itemImgBox.addEventListener("click",function () {
            popupEX(this);
            this.parentNode.classList.add("active");
        });
        containerPart.appendChild(itemImgBox);
        //物品名称
        var itemTitle = document.createElement("div");
        itemTitle.className = "item-title";
        var itemTitleText = document.createElement("span");
        itemTitleText.className = "item-title-text";
        if (num === 0){
            itemTitleText.innerHTML = "未命名";
        } else {
            itemTitleText.innerHTML = museumItem[num].name;
        }
        var itemNO = document.createElement("span");
        itemNO.className = "item-title-number";
        if (num > 99 && num < 1000){
            itemNO.innerHTML = "NO."+num;
        } else{
            if (num > 9 && num < 100){
                itemNO.innerHTML = "NO.0"+num;
            }else {
                if (num < 10){
                    itemNO.innerHTML = "NO.00"+num;
                }
            }
        }
        itemTitle.appendChild(itemNO);
        itemTitle.appendChild(itemTitleText);
        containerPart.appendChild(itemTitle);
    }

    /////****************增删改查系统相关****************/////

    // 搜索按钮
    var searchBtn = document.getElementById("search-box-button");
    searchBtn.addEventListener("click", function () {
        $(".container-part").remove();
        //获取输入内容
        var searchInput = document.getElementById("search-input").value;
        //搜索方法
        var searchMethod;
        //搜索结果
        var searchResult = [];
        if ($(".search-radio")[0].checked){
            searchMethod = 0;
        }
        if ($(".search-radio")[1].checked){
            searchMethod = 1;
        }
        if ($(".search-radio")[2].checked){
            searchMethod = 2;
        }
        //取出博物馆
        var collection = JSON.parse(localStorage.getItem("collection"));

        //按名称匹配
        if (searchMethod === 0 || searchMethod === 1){
            for (var i = 0; i < Object.keys(collection).length; i++) {
                var collectionKey = collection[Object.keys(collection)[i]].name.toString();
                if (collectionKey.match(searchInput)) {
                    searchResult.push(Object.keys(collection)[i]);
                }
            }
        }

        //按ID匹配
        if (searchMethod === 0 || searchMethod === 2){
            for (var i = 0; i < Object.keys(collection).length; i++) {
                var collectionKey;
                var collectionKeyNum = parseInt(Object.keys(collection)[i]);
                if (collectionKeyNum < 10){
                    collectionKey = "00"+collectionKeyNum;
                }
                if (collectionKeyNum > 9 && collectionKeyNum < 100){
                    collectionKey = "0"+collectionKeyNum;
                }
                if (collectionKeyNum > 99 && collectionKeyNum < 1000){
                    collectionKey = ""+collectionKeyNum;
                }
                if (collectionKey.match(searchInput)) {
                    searchResult.push(Object.keys(collection)[i]);
                }
            }
        }
        
        //判断是否有搜索结果
        if (searchResult.length !== 0) {
            for (var i = 0; i < searchResult.length; i++) {
                createMuseumItem(searchResult[i]);
            }
        }else {
            popup("提示", "没有相关的搜索结果！", 0);
        }
        updateStanceItem();
    });

    // 编辑按钮
    var editBtn = document.getElementsByClassName("edit-button")[0];
    editBtn.addEventListener("click", function () {
        if (localStorage.getItem("loggedUser") !== "{}"){
            if (!editModel){
                $(".edit-add-button").css({
                    "margin" : "5px",
                    "visibility" : "visible"
                });
                $(".edit-button").css({
                    "opacity" : "1"
                });
                editModel = true;
            }else {
                if (editModel){
                    $(".edit-add-button").css({
                        "margin" : "-41px 5px 5px 5px",
                        "visibility" : "hidden"
                    });
                    $(".edit-button").css({
                        "opacity" : "0.5"
                    });
                    editModel = false;
                }
            }
        }else {
            popup("警告", "您未登录，无法编辑博物馆！", 0);
        }
    });

    var addItemBool;

    // 增加物品按钮
    var editAddBtn = document.getElementsByClassName("edit-add-button")[0];
    editAddBtn.addEventListener("click", function () {
        if (!addItemBool) {
            createMuseumItem(0);
            updateStanceItem();
            addItemBool = true;
        }
    });

    // 更新站位空物品
    function updateStanceItem() {
        // 检查站位元素
        var itemNull = $(".container-part:empty");
        if (itemNull.length > 0){
            itemNull.remove();
        }
        //媒体查询
        var mediaS = window.matchMedia('(max-width:991px)');
        var mediaL = window.matchMedia('(min-width:992px)');
        // 生成站位元素
        var itemNum = document.getElementsByClassName("container-part").length;
        if(mediaS.matches){
            if (itemNum%4 > 1){
                var addNum = 4-itemNum%4;
                for (var i = 0; i < addNum; i++) {
                    createMuseumItemNull();
                }
            }
        }
        if(mediaL.matches){
            if (itemNum%6 > 1){
                var addNum = 6-itemNum%6;
                for (var i = 0; i < addNum; i++) {
                    createMuseumItemNull();
                }
            }
        }
        changeCIHW();
    }
    updateStanceItem();

    /////****************调整窗口相关****************/////

    //调整内容背景宽高
    function changeCIHW() {
        // 调整内容背景高度
        $(".container-background")[0].style.height = "100%";
        var h = $(".container-background")[0].offsetHeight;
        $(".container-background")[0].style.height = h+64+"px";
        $(".container-background")[1].style.height = "100%";
        var h = $(".container-background")[1].offsetHeight;
        $(".container-background")[1].style.height = h+64+"px";
        $(".tab-background")[0].style.width = "100%";
        var w = $(".tab-background")[0].offsetWidth;
        $(".tab-background")[0].style.width = w+97+"px";
    }
    changeCIHW();

    // 调整右侧编辑栏位置
    function changeRAHW(){
        var containerInnerRect = document.getElementsByClassName("container-inner")[0].getBoundingClientRect();
        if (window.pageYOffset>399){
            $(".right-affix").css({
                "position" : "fixed",
                "top" : "114px"
            });
            $(".right-affix")[0].style.left = containerInnerRect.x+containerInnerRect.width+20+"px";
        }else {
            $(".right-affix").css({
                "position" : "absolute",
                "top" : "24px"
            });
            $(".right-affix")[0].style.left = containerInnerRect.width+54+"px";
        }
    }
    changeRAHW();

    // 改变页面大小时
    $(window).resize(function() {
        updateStanceItem();
        changeRAHW();
    });

    // 滚动页面时
    $(window).scroll(function () {
        changeRAHW();
    });
});