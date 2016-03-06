/**
 * Created by Gyy on 15/7/22.
 */
;(function($){

    var defaultConfig= {
        "loop": true
    };
    $.fn.defaultConfig = defaultConfig;

    var elements={}


    function getWidthAndHeight($img){

        var imageContainer = elements.imageContainer;

        var imageHeight = $img.height();// image height
        var imageWidth  = $img.width();//图片的宽
        var containerHeight = imageContainer.height(); //container height
        var containerWidth = imageContainer.width(); //container width
        radio = parseFloat(imageHeight/containerHeight);

        if(radio > 1){
            imageHeight = containerHeight;
            imageWidth = imageWidth/radio;
        }
        if(radio < 1){
            imageHeight = containerHeight;
            imageWidth = imageWidth/radio;
        }

        imageWidth = imageWidth > containerWidth ? containerWidth: imageWidth;

        var option={};
        option.imageWidth = imageWidth;
        option.imageHeight = imageHeight;
        option.marginLeft = option.imageWidth < containerWidth ? (containerWidth-imageWidth)/2 : 0

        return option;
    }
    function addBtn(that){
        var $leftBtn = $("<div class='img-container-left-btn btn'>");
        var $rightBtn= $("<div class='img-container-right-btn btn'>");
        that.append($leftBtn);
        that.append($rightBtn);
        that.find('.btn').css({'top': that.height()/2+'px'});

    }
    function showPicture(index){
            var $imageList= elements.imageList;
            var $imageContainer = elements.imageContainer;

            var that = $($imageList[index]);
            var option =getWidthAndHeight(that);
            var style={
                'width': option.imgWidth + 'px',
                'height': option.imgHeight + 'px',
                'margin-left': option.marginLeft + 'px'
            }
            that.css(style).addClass("active");
    }
    function loadImg(){
        var that = $(this);

        var $imageContainer = elements.imageContainer;
        var $imgList = elements.imageList;
        var $currentActiveImg = $imageContainer.find("img.active");
        var totalNumber = elements.totalImgNumber;
        var currentNumber = parseInt($currentActiveImg.attr("data-img-current-factor-number"));

        function doMove(currentNumber){
            var currentNumber=currentNumber < 0 ? currentNumber+totalNumber : currentNumber;
            var currentNumber=currentNumber == totalNumber? 0 : currentNumber;
            $imageContainer.find("img").removeClass("active").end();
            showPicture(currentNumber);
        }
        //  click right btn
        if(that.hasClass("img-container-right-btn")){
            doMove(currentNumber+1);
        }
        else if(that.hasClass("img-container-left-btn")){ // click left btn
            doMove(currentNumber-1);
        }
    }
    $.fn.easyPicture= function(config){
        config = typeof config == 'object'? config : {};
        config = $.fn.extend({}, defaultConfig, config);
        var that = this;

        that.css({position:"relative"});

        var $imageContainer  = that;
        var $imageList = that.find('img');

        elements.that = that;
        elements.imageContainer = $imageContainer;
        elements.imageList = $imageList;
        elements.totalImgNumber  = parseInt($imageContainer.attr("data-img-number"));


        $imageList.each(function(index){
            var that = $(this);
            var currentImage = that;
            var currentImageDefaultCSS={
                'position':'absolute',
                'top':'0px'
            }
            currentImage.css(currentImageDefaultCSS);
        })

        // add serialNumer
        function addSerialNumber(){
            $imageList.each(function(index, elem){
                var that = $(this);
                that.attr("data-img-current-factor-number", index);
                if(index == 0){
                    showPicture(0);
                }
            })
        }

        addSerialNumber();
        addBtn(that);
        $btn = that.find('.btn');

        $btn.each(function(index, elem){
            var that = $(elem);
            that.on('click', loadImg);
        })
        var startMove = function(elems, option){
            return function(){
                $.each(elems, function(){
                    var that = $(this);
                    option == 'show' ? that.addClass('show'): that.removeClass('show');
                })
            }
        }
        var that = elements.that;
        that.mouseover(startMove($btn, 'show'));
        that.mouseout(startMove($btn, 'hide'));
    }
})(jQuery)
