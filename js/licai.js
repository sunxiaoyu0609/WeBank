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
//�Զ�����
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

//ͼƬ����л�
$("#lunbobox ul li").click(function() {
    $(this).css({
        "background": "#999",
        "border": "1px solid white"
    }).siblings().css({
        "background": "#B4CEED"
    });
    var index = $(this).index(); //��ȡ����
    $(".lunbo a ").eq(index).fadeIn(1000).siblings().fadeOut(1000); //���ֵܽڵ�
});

//�ֲ�ͼ�л�
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
}); // $("#imgbox a ")��ȡ���鼯�� ����index�������л�

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
//����ƶ�
$("#lunbobox ul li,.lunbo a img,#toright,#toleft ").hover(
    //�ƽ�
    function() {
        $('#toright,#toleft').show();
        clearInterval(t);
    },
    //�ƿ�
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