/**
 * Created by seven on 2021/6/16.
 */
$(function(){
    //jjQuery�ֲ�ͼ
    var index = 0; // �±�
    var timer = null;
    var boxWidth = $(".box").width();
    console.log(boxWidth);
    autoPlay();
    // Բ����
    $(".dot li").click(function() {
        console.log(this);
        // active��ʾ�ڵ����СԲ����
        $(this).addClass("active").siblings().removeClass("active");
        // ��ȡСԲ����±�
        index = $(this).index();
        console.log(index);
        // ��ʾ��Ӧ�±��ͼƬ
        $(".swiper").css({
            left: -boxWidth * index
        })
    })
    // ��
    $(".left").click(function() {
        if ($(".swiper").is(":animated")) {
            return false;
        }
        index--;
        move();
    })
    // ��
    $(".right").click(function() {
        console.log($(".swiper").is(":animated"));
        if ($(".swiper").is(":animated")) {
            return false;
        }
        index++;
        move();
    })
    function autoPlay() {
        clearInterval(timer);
        timer = setInterval(function() {
            index++;
            move();
        }, 3000)
    }
    function move() {
        if (index < 0) {
            // �±�С��0ʱ����ʾ���һ��
            index = $(".main3 .dot li").length;
            $(".main3 .swiper").css({
                left: -boxWidth * index
            })
            // ��������
            index--;
        }
        if (index > $(".main3 .dot li").length) {
            // �±����СԲ���±�ʱ����ʾ��һ��
            index = 0;
            $(".main3 .swiper").css({
                left: 0
            });
            index++;
        }
        $(".main3 .dot li").eq(index == $(".main3 .dot li").length ? 0 : index).addClass("active").siblings().removeClass("active");
        // ����ͼ�ֲ��˶�(����Ų)
        $(".main3 .swiper").stop().animate({
            left: -boxWidth * index
        }, function() {
            // �������һ��ʱ���ص���һ��
            if (index >= $(".main3 .dot li").length + 1) {
                index = 0;
                $(".main3 .swiper").stop().animate({
                    left: 0
                })
            }
        })
    }
    //Tab�л�jQuery
    $(".main11>li").eq(0).css("background", "#8B0000").css("color", "white")
    $(".main1 ul li").mouseover(function() {
        var index = $(this).index()
        var len = $(".main22>.list>ul>li").width()
        $(".list").stop().animate({
            "marginLeft": -len * index
        })
        $(this).css("background", "#8B0000").css("color", "white").siblings().css("background", "#ddd").css("color", "#000000")
    })




        //Tab�л�JS
        var tab=document.getElementById('tab');
        var ali=tab.getElementsByTagName('li');
        var TabBox=tab.getElementsByTagName('div')[1];
        var aBox=TabBox.getElementsByTagName('div');
        for(var i=0;i<ali.length;i++){
            ali[i].index=i;
            ali[i].onclick=function(){
                for(var j=0;j<ali.length;j++){
                    ali[j].className='';//ȡ���˵���ʽ
                    aBox[j].className='hide';//�������е�tabDiv
                }
                ali[this.index].className='selected';
                aBox[this.index].className='';
            }
        }


    //�����˵�
    $('.header2>ul>li').hover(function() {
            $(this).find('.one').css({
                'position': 'absolute',
                'display': 'block',
                'background-color': '#e6e6e6',
                'width': '100%',
                'height': '172px',
                'border':'1px solid #909090',
                'z-index':'1',
                'border-radius': '5px',
                'opacity': '0.9',
                'cursor': 'pointer',
            })
        },
        function() {
            $(this).find('.one').css({
                'display': 'none',
            })
        });
    //JSʵ�ֵ���ʱ
    function getRTime() {
        var EndTime = new Date('2022/02/11 00:00:00');
        var NowTime = new Date();
        var t = EndTime.getTime() - NowTime.getTime();
        var d = Math.floor(t / 1000 / 60 / 60 / 24);
        var h = Math.floor(t / 1000 / 60 / 60 % 24);
        var m = Math.floor(t / 1000 / 60 % 60);
        var s = Math.floor(t / 1000 % 60);
        document.getElementById("t_d").innerHTML = d + " days";
        document.getElementById("t_h").innerHTML = h + " hours";
        document.getElementById("t_m").innerHTML = m + " minutes";
        document.getElementById("t_s").innerHTML = s + " seconds";
    }
    setInterval(getRTime, 1000);
    //�ö�
    $('#btn_top').click(function () {
        $('html,body').animate({ scrollTop: 0 }, 500);
    });
})
