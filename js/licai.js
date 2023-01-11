/**
 * Created by HP on 2021/12/4.
 */
$(function() {
    $('#toright').hover(function() {
        $("#toleft").hide()
    }, function() {
        $("#toleft").show()
    })
    $('#toleft').hover(function() {
        $("#toright").hide()
    }, function() {
        $("#toright").show()
    })
});

var t;
var index = 0;
//自动播放
t = setInterval(play, 3000);

function play() {
    index++;
    if (index > 4) {
        index = 0
    }
    $("#lunbobox ul li").eq(index).css({
        "background": "#999",
        "border": "1px solid white"
    }).siblings().css({
        "background": "#B4CEED",
        "border": ""
    });

    $(".lunbo a ").eq(index).fadeIn(1000).siblings().fadeOut(1000);
};

//图片点击切换
$("#lunbobox ul li").click(function() {
    $(this).css({
        "background": "#999",
        "border": "1px solid white"
    }).siblings().css({
        "background": "#B4CEED"
    });
    var index = $(this).index(); //获取索引
    $(".lunbo a ").eq(index).fadeIn(1000).siblings().fadeOut(1000); //找兄弟节点
});

//轮播图切换
$("#toleft").click(function() {
    index--;
    if (index <= 0) {
        index = 4
    }
    console.log(index);
    $("#lunbobox ul li").eq(index).css({
        "background": "#999",
        "border": "1px solid white"
    }).siblings().css({
        "background": "#B4CEED"
    });

    $(".lunbo a ").eq(index).fadeIn(1000).siblings().fadeOut(1000);
}); // $("#imgbox a ")获取数组集合 ，用index来控制切换

$("#toright").click(function() {
    index++;
    if (index > 4) {
        index = 0
    }
    console.log(index);
    $(this).css({
        "opacity": "0.5"
    });
    $("#lunbobox ul li").eq(index).css({
        "background": "#999",
        "border": "1px solid white"
    }).siblings().css({
        "background": "#B4CEED"
    })
    $(".lunbo a ").eq(index).fadeIn(1000).siblings().fadeOut(1000);
});
$("#toleft,#toright").hover(function() {
        $(this).css({
            "color": "blue"
        })
    },
    function() {
        $(this).css({
            "opacity": "0.7",
            "color": ""
        })
    });
//鼠标移动
$("#lunbobox ul li,.lunbo a img,#toright,#toleft ").hover(
    //移进
    function() {
        $('#toright,#toleft').show();
        clearInterval(t);
    },
    //移开
    function() {
        t = setInterval(play, 3000);

        function play() {
            index++;
            if (index > 4) {
                index = 0
            }
            $("#lunbobox ul li").eq(index).css({
                "background": "#999",
                "border": "1px solid white"
            }).siblings().css({
                "background": "#B4CEED"
            })
            $(".lunbo a ").eq(index).fadeIn(1000).siblings().fadeOut(1000);
        }
    })