/**
 * Created by Gyy on 15/7/22.
 */
;(function($){

    var defaultOption = $.fn.defaultOption = {
        "loop":"true"
    }

    function getWidthAndHeight(img, imgContainer){

        imgHeight = img.height();//图片的高
        imgWidth  = img.width();//图片的宽
        containerHeight = imgContainer.height(); //容器的高
        containerWidth = imgContainer.width(); //容器的宽
        radio = parseFloat(imgHeight/containerHeight);

        console.log("height: "+imgHeight+"  width: "+imgWidth);
        if(radio > 1){
            imgHeight = containerHeight;
            imgWidth = imgWidth/radio;
        }
        if(radio < 1){
            console.log(radio);
            imgHeight = containerHeight;
            imgWidth = imgWidth/radio;
        }
        if(imgWidth > containerWidth) imgWidth=containerWidth;

        var option={};
        option.imgWidth = imgWidth;
        option.imgHeight = imgHeight;
        option.marginLeft = option.imgWidth < containerWidth ? (containerWidth-imgWidth)/2 : 0

        return option;

    }
    function addBtn(){
        var left_btn = "<div class='img-container-left-btn'>";
        var right_btn="<div class='img-container-right-btn'>";
        this.append(left_btn);
        this.append(right_btn);
        $(".img-container-left-btn, .img-container-right-btn").css("top",this.height()/2+"px")
            .bind("click", loadImg)

        function loadImg(){
                var imgContainer= $(this).parents("div.img-container");
                var imgList = imgContainer.find("img");
                var currentActiveImg = imgContainer.find("img.active");
                var titleNumber = parseInt(imgContainer.attr("data-img-number"))
                var currentNumber = parseInt(currentActiveImg.attr("data-img-current-factor-number"));
                if($(this).hasClass("img-container-right-btn"))
                    doMove(currentNumber+1);
                else if($(this).hasClass("img-container-left-btn"))
                    doMove(currentNumber-1);

                function doMove(currentNumber){
                    var currentNumber=currentNumber < 0 ? currentNumber+titleNumber : currentNumber;
                    var currentNumber=currentNumber == titleNumber? 0 : currentNumber;

                    var nextShowImg= imgContainer.find("img:eq("+currentNumber+")");//即将显示的图片

                    var option = getWidthAndHeight(nextShowImg, imgContainer);
                    imgContainer.find("img").removeClass("active").end();
                    nextShowImg.css({"width":option.imgWidth+"px", "height":option.imgHeight+"px", "margin-left":option.marginLeft+"px"})
                        .addClass("active");
                }


        }

    }

    var startMove = function(elem, option){
        return function(){
            $.each(elem, function(){
                if(option == "show")
                this.addClass("show");
                else
                this.removeClass("show");
            })
        }

    }

    $.fn.extend({
        "listingimg" :function(option){
            if(typeof option != "object") option = {};
            option = $.extend({},option, defaultOption);

            this[0].style.position="relative";

            var imgContainer = this;

            imgsList = this.find("img");
            imgsList.each(function(index){
                    currentImg = $(this);
                    currentImg.css({"position":"absolute","top":"0px"});
            })

            //给图片添加序列号
            function addSerialNumber(){


                imgsList.each(function(index,elem){
                    $(this).attr("data-img-current-factor-number", index);
                    if(index==0){
                        var option =getWidthAndHeight($(elem),imgContainer);
                        $(this).css({"width":option.imgWidth+"px", "height":option.imgHeight+"px", "margin-left":option.marginLeft+"px"})
                            .addClass("active");
                    }
                })

            }

            addSerialNumber();

            addBtn.call(this);
            this.mouseover(startMove([$(".img-container-left-btn"), $(".img-container-right-btn")], "show"));
            this.mouseout(startMove([$(".img-container-left-btn"), $(".img-container-right-btn")], "hide"));


            return this;
        }
    });
})(jQuery)
