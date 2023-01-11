/**
 * Created by seven on 2021/12/4.
 */
;(function($, window, document, undefined){
    var Translucent = function (elem,options) {
        this.elem = elem;
        this.$elem = $(elem);
        this.options = options;
        this.$win = $(window);
        this.$doc = $(document);
        this.docHeight = this.$doc.height();
    };
    Translucent.prototype = {
        defaults: {
            target:"translucentDefultId",
            width:980,
            height:100,
            marginLeft:460,
            drag:true,
            opacity:0.8,
            border:"1px solid #ddd",
            borderRadius:8,
            wallGlass:false,
            backgroundColor:"rgb(225, 225, 225)",
            titleHeight:"40px",
            titleGroundColor:"#3197e9c4",
            shadow:true,
            positionTop:100,
            positionLeft:100,
            titleText:"窗口",
            titleFontSize:12,
            titleFontColor:"#000",
            titleFontFamily:"2144",
            textHtml:"<p>2131232</p>",
            titleTextCenter:false,
            close:null,
            zIndex:10,
            _isScale:true,
            _isMax:true,
            _width:500,
        },
        init:function () {
            this.config = $.extend({}, this.defaults, this.options);
            //this._width = this.config.width;
            this.drawInfoWindow();
            if(this.config.drag){
                this.dragWindow();
                $(".translucent-title").addClass("translucent-move");
            }
            this.smallWindow();
            this.closeWindow();
            this.maxWindow();
        },
        drawInfoWindow:function () {
            var context = this;
            context.$elem.addClass("translucent-relative");
            var html = '';
            html += '<div id="'+context.config.target+'" class="translucent-container">';
            html += '<div class="translucent-title"><span>'+context.config.titleText+'</span><div class="translucent-control"><img id="translucent_close" title="鍏抽棴" src="'+'images/close.png" style="width:30px;height:30px;margin-left: 935px;margin-top: -80px;"/></div></div>';
            html += '<div class="translucent-content">'+context.config.textHtml+'</div>';
            html += '</div>';
            if($(".translucent-container").length > 0){
                $(".translucent-container").remove();
                // context.config._isMax = false;
            }
            context.$elem.append(html);
            var translucentContainer = $(".translucent-container");
            var translucentTitle = $(".translucent-title");
            translucentContainer.css({
                width:context.config.width,
                height:context.config.height,
                marginLeft:context.config.marginLeft,
                backgroundColor:context.config.backgroundColor,
                top:context.config.positionTop,
                left:context.config.positionLeft,
                opacity:context.config.opacity,
                border:context.config.border,
                borderRadius:context.config.borderRadius,
                zIndex:context.config.zIndex,
            }).addClass("translucent-absolute");
            if(context.config.shadow){
                translucentContainer.addClass("translucent-shadow");
            }
            translucentTitle.css({
                height:context.config.titleHeight,
                backgroundColor:context.config.titleGroundColor,
                fontSize:context.config.titleFontSize,
                color:context.config.titleFontColor,
                fontFamily:context.config.titleFontFamily,
                borderTopLeftRadius:context.config.borderRadius,
                borderTopRightRadius:context.config.borderRadius
            });
            if(context.config.titleTextCenter){
                translucentTitle.addClass("translucent-center");
            }
            translucentTitle.find("span").css({
                lineHeight:context.config.titleHeight,
                marginLeft:10
            });
            var _titleHeight = translucentTitle.height();
            var _top = (_titleHeight-20)/2;
            $(".translucent-control").css({
                top:0,
                height:context.config.titleHeight,
                lineHeight:context.config.titleHeight
            });
        },
        smallWindow:function () {
            var context = this;
            var translucentContainer = $(".translucent-container");
            var translucentContent = $(".translucent-content");
            var translucentControl = $(".translucent-control");
            var translucentTitle = $(".translucent-title");
            translucentControl.bind("click",function (e) {
                e.preventDefault();  //闃绘榛樿浜嬩欢
                e.stopPropagation();    //闃绘鍐掓场浜嬩欢
            });
            context.defaults._isScale = true;
            $("#translucent_small").bind("click",function (e) {
                var top = $("body").height() - parseInt(context.config.titleHeight)-6;
                if(context.defaults._isScale){
                    translucentContainer.animate({
                        height:context.config.titleHeight,
                        top:top,
                        left:0,
                        width:"230px",
                        opacity:1,
                        borderTopRightRadius:0,
                        borderTopLeftRadius:0
                    });
                    translucentTitle.css({
                        borderTopRightRadius:0,
                        borderTopLeftRadius:0
                    });
                    translucentContent.hide();
                    $(this).attr("src","icon/fangda.png");
                    $(this).attr("title","杩樺師");
                    $("#translucent_big").attr("src","icon/big.png");
                    $("#translucent_big").attr("title","鏈澶у寲");
                    context.defaults._isScale = false;
                    context.defaults._isMax = true;
                }else{
                    translucentContainer.animate({
                        height:context.config.height,
                        left:context.config.positionLeft,
                        marginLeft:context.config.marginLeft,
                        top:context.config.positionTop,
                        width:context.config.width,
                        opacity:context.config.opacity,
                        borderTopRightRadius:context.config.borderRadius,
                        borderTopLeftRadius:context.config.borderRadius
                    });
                    translucentTitle.css({
                        borderTopRightRadius:context.config.borderRadius,
                        borderTopLeftRadius:context.config.borderRadius
                    });
                    translucentContent.show();
                    $(this).attr("src","icon/small.png");
                    $(this).attr("title","鏈灏忓寲");
                    context.defaults._isScale = true;
                }
                e.preventDefault();  //闃绘榛樿浜嬩欢
                e.stopPropagation();    //闃绘鍐掓场浜嬩欢
            })
        },
        closeWindow:function () {
            var context = this;
            $("#translucent_close").bind("click",function () {
                if(context.config.close!== null && typeof context.config.close === "function"){
                    context.config.close($(".translucent-container"));
                }
                $(".translucent-container").remove();
            });
        },
        maxWindow:function () {
            var context = this;
            var translucentBig = $("#translucent_big");
            var translucentContainer = $(".translucent-container");
            var translucentContent = $(".translucent-content");
            var translucentControl = $(".translucent-control");
            var translucentSmall = $("#translucent_small");
            var $body = $("body");
            context.defaults._isMax = true;
            translucentBig.bind("click",function (e) {
                if(!context.defaults._isScale){return;}
                if(context.defaults._isMax){
                    translucentContainer.animate({
                        width:"80%",
                        left:"10%"
                    });
                    $(this).attr("src","icon/huanyuan.png");
                    $(this).attr("title","杩樺師");
                    //context.config.width = ($body.width())*(0.8);
                    context.defaults._isMax = false;
                }else{
                    translucentContainer.animate({
                        width:context.config.width,
                        left:context.config.positionLeft
                    });
                    $(this).attr("src","icon/big.png");
                    $(this).attr("title","鏈澶у寲");
                    //context.config.width = context._width;
                    context.defaults._isMax = true;
                }
            });
        },
        dragWindow:function(){
            var context = this;
            context.defaults._isScale = true;
            context.config._isMax = true;
            function drag(obj1,obj3) {
                //鎯宠瀹炵幇榧犳爣鎷栨嫿锛屽繀椤绘槸鍦ㄩ紶鏍囨寜涓嬩箣鍚庯紝鏉惧紑涔嬪墠锛屾墍浠ラ渶瑕佺粦瀹氶紶鏍囨寜涓嬩簨浠?
                obj1.mousedown(function(ev){
                    if(context.defaults._isScale && context.config._isMax){
                        //鑾峰彇鐐瑰嚮鏃跺埢鐨刋杞村潗鏍囧拰Y鍧愭爣(鍓嶄竴涓幏鍙栦笉鍒板氨鑾峰彇鍚庝竴涓?)
                        var dx = ev.clientX||ev.pageX;
                        var dy = ev.clientY||ev.pageY;
                        //鑾峰彇div璺濆乏鍜岃窛椤剁殑璺濈锛宱ffset鏄竟璺?
                        var dialogleft = obj3.offset().left;
                        var dialogtop = obj3.offset().top;
                        context.config.positionLeft = dialogleft;
                        context.config.positionTop = dialogtop;
                        //瀹氫箟涓涓紑鍏筹紝榛樿榧犳爣鐐瑰嚮涔嬪悗寮鍚?
                        var flag = true;
                        //缁戝畾榧犳爣绉诲姩浜嬩欢锛岃鍦ㄥ叏灞忕Щ鍔紝鎵浠ョ敤缁戝畾document
                        $(document).mousemove(function(e){
                            if(flag){
                                var bodyWidth = $("body").width() - context.config.width;
                                var bodyHeight = $("body").height() - context.config.height;
                                //榧犳爣绉诲姩鍚庣殑X杞村潗鏍囧拰Y杞村潗鏍?
                                var mx = e.clientX||e.pageX;
                                var my = e.clientY||e.pageY;
                                //鐢ㄧЩ鍔ㄥ悗鐨刋杞村拰Y杞村潗鏍囧噺鍘荤偣鍑绘椂鍒荤殑鍧愭爣鍐嶅姞涓婂師鍏坉iv璺濆乏鍜岃窛椤剁殑璺濈
                                var _left = mx-dx+dialogleft;
                                var _top = my-dy+dialogtop;
                                if(_left < 0){return;}
                                if(_top < 0){return;}
                                if(_left > bodyWidth){return;}
                                if(_top > bodyHeight){return;}
                                //閲嶆柊涓篸iv鐨刲eft鍜宼op璧嬪?
                                obj3.css({"left":_left+"px","top":_top+"px"});
                            }

                        }).mouseup(function(){
                            flag = false;
                        })
                    }
                })
            }
            drag($(".translucent-title"),$(".translucent-container"));
        },
        getPath:function () {
            var scripts = document.scripts;
            for(var i = 0;i < scripts.length;i ++){
                var item = scripts[i];
                var name = $(item).attr("src").split("/").reverse()[0];
                if(name === "jquery-translucent.js"){
                    var pathArr = $(item).attr("src").split("/");
                    pathArr.reverse();
                    var pathString = '';
                    for(var k = 0;k < pathArr.length;k ++){
                        var len = pathArr.length;
                        if(k !== len-1){
                            pathString += (pathArr[i] + "/");
                        }
                    }
                    return pathString;
                }
            }
        }
    };
    $.fn.translucent = function(options) {
        new Translucent(this, options).init();
        return this;
    };

})( jQuery, window , document );