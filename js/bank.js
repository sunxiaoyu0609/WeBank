$(function() {
    var $all = $('.headerbox'),
        $picture = $('.boximages'),
        $points = $('.boxcontains li'),
        $prev= $('.headerbox .prev'),
        $next= $('.headerbox .next'),
        $onepicture = $picture.children().eq(0).width(),
        length= $points.length,
        index = 0,
        timer = null;
    //点击匹配
    $points.click(function() {
        $(this).addClass("active").siblings().removeClass("active");
        index = $(this).index();
        $picture.animate({
            left: -index * $onepicture
        }, 500)
    });
    //下一张
    $next.click(function() {
        index++;
        index %= length;
        $points.eq(index).addClass("active").siblings().removeClass("active");
        $picture.animate({
            left: -index * $onepicture
        }, 500)
    });
    //上一张
    $prev.click(function() {
        index--;
        if (index < 0) {
            index = length - 1
        }
        $points.eq(index).addClass("active").siblings().removeClass("active");
        $picture.animate({
            left: -index * $onepicture
        }, 500)
    });
    //自动轮播
    auto();
    function auto() {
        timer = setInterval(function() {
            $next.trigger("click") ;
        }, 3000)
    }
    $all.hover(function() {
        clearInterval(timer);
    }, function() {
        auto();
    })
    //置顶
    $('#btn_top').click(function () {
        $('html,body').animate({ scrollTop: 0 }, 500);
    });
    //点击登录
    $('#login').bind('click',function(){
        $('.loginall').show();
        $('.blackbgc').show();
    })
    //扫码切换(Tab选项卡1)
    $('.login2>.a1').bind('click',function(){
        $('.loginall').hide();
        $('.findall').show();
        $('.blackbgc').show();
    })
    $('.findall>form>input').eq(1).bind('click',function(){
        $('.findall').hide();
        $('.registerall').show();
        $('.blackbgc').show();
    })
    $('.findall>form>input').eq(0).bind('click',function(){
        $('.findall').hide();
        $('.loginall').show();
        $('.blackbgc').show();
    })
    //注册切换
    $('.login2>.a2').bind('click',function(){
        $('.loginall').hide();
        $('.registerall').show();
        $('.blackbgc').show();
    })
    $('.register1>form>input').eq(5).bind('click',function(){
        $('.registerall').hide();
        $('.loginall').show();
        $('.blackbgc').show();
    })
    //取消弹窗
    $('.login1>.close').bind('click',function(){
        $('.loginall').hide();
        $('.blackbgc').hide();
    })
    $('.register1>.close').bind('click',function(){
        $('.registerall').hide();
        $('.blackbgc').hide();
    })
    $('.findall>.close').bind('click',function(){
        $('.findall').hide();
        $('.blackbgc').hide();
    })
    //二级菜单
    $('.header2>ul>li').hover(function() {
            $(this).find('.one').css({
            'position': 'absolute',
            'display': 'block',
            'background-color': '#f2f2f2',
            'width': '100%',
            'height': '100px',
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
    //无缝链接
    $('.swap').html($('.news_li').html());
    x = $('.news_li');
    y = $('.swap');
    h = $('.news_li li').length * 20; //20为每个li的高度
    var hh = $('.news_li li').length;
    if (hh > 1)
    //setTimeout(b,3000);//滚动间隔时间 现在是3秒
        b();
    b();
    function b() {
        t = parseInt(x.css('top'));
        //alert(t)
        y.css('top', '20px');
        x.animate({
            top: t - 20 + 'px'
        }, 'slow'); //20为每个li的高度
        if (Math.abs(t) == h - 20) { //20为每个li的高度
            y.animate({
                top: '0px'
            }, 'slow');
            z = x;
            x = y;
            y = z;
        }
        setTimeout(b, 3000); //滚动间隔时间 现在是3秒
    }
    ////注册弹窗
    var flags=[0,0,0,0];
    var flagNum=0;

    function isName(close01) {
        var pattern = /^([A-Za-z]|[_])[a-zA-Z0-9_]{4,14}$/;
        return pattern.test(close01);
    }
    function isPass(close02) {
        var pattern = /^(?!^[\d]+$)(?!^[-]+$)(?!^[_]+$)(?!^[a-zA-Z]+$)[\w-]{6,20}$/
        return pattern.test(close02);
    }
    function isEmail(close04) {
        var pattern = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
        return pattern.test(close04);
    }
    function userName(inputid, spanid) {
        flags[0]=0;
        $(inputid).blur(function () {
            if ($.trim($(inputid).val()).length == 0) {
                $(spanid).html("× 名称没有输入");
            }
            else if(isName($.trim($(inputid).val())) == false){
                 {$(spanid).html("× 名称不合法");}
            }
            else{
                flags[0]=1;
        }
        });
        $(inputid).focus(function () {
            $(spanid).html("");
        });
    };
    userName('#close01', "#checkExistname");
    /*邮箱号判断*/
    function userEmail(inputid, spanid) {
        flags[1]=0;
        $(inputid).blur(function () {
            if ($.trim($(inputid).val()).length == 0) {
                $(spanid).html("× 邮箱号没有输入");
            } else if(isEmail($.trim($(inputid).val())) == false){
                  {$(spanid).html("× 邮箱号不正确");}
            }
            else{
                flags[1]=1;
            }
        });
        $(inputid).focus(function () {
            $(spanid).html("");
        });
    };
    userEmail('#close04', "#checkExistEmail");
    /*密码判断*/
    function userPass(inputid, spanid) {
        flags[2]=0;
        $(inputid).blur(function () {
            if ($.trim($(inputid).val()).length == 0) {
                $(spanid).html("× 密码没有输入");
            } else if (isPass($.trim($(inputid).val())) == false) {
               {
                    $(spanid).html("×密码格式不正确");
                }
            }
            else{
                flags[2]=1;
            }
            $(inputid).focus(function () {
                $(spanid).html("");
            });
        });
    };
    userPass('#close02', "#checkExistPassword");
    //再次密码判断
    function userPassAgain(inputid, spanid) {
        flags[3]=0;
        $(inputid).blur(function () {
            if ($.trim($(inputid).val()).length == 0) {
                $(spanid).html("× 密码没有再次输入");
            } else if($("#close02").val() != $("#close03").val()) {
                 {
                    $(spanid).html("×两次输入不一致");
                }
            }
            else{
                flags[3]=1;
            }
            $(inputid).focus(function () {
                $(spanid).html("");
            });
        });
    };
        userPassAgain('#close03', "#checkExistPasswordAgain");
    //省市级联
    var cityList = new Array();
    cityList['北京市'] = [ '朝阳区','东城区','西城区','通州区','大兴区' ];
    cityList['重庆市'] = [ '永川区','万州区','渝北区','九龙坡区','梁平市' ];
    cityList['四川省'] = [ '成都市','绵阳市','汶川市','德阳市','广元市' ];
    cityList['湖北省'] = [ '十堰市','武汉市','孝感市','黄冈市','宜昌市' ];
    $("#province")[0].onchange = function(){
        var $city = $("#city")[0];
        $city.length = 1;
        if( this.selectedIndex !=0 ){
            var index = this.options[this.selectedIndex].value;
            for ( var i in cityList[index] ){
                $city.add( new Option(cityList[index][i],cityList[index][i]),null);
            }
        }
    };
    //注册成功判定
    $('.rbtn').click(function(){
        for(var i=0;i<4;i++){
            if(flags[i]==1)
                flagNum++;
        }
        if(flagNum==4){
            var inputInfos = ['','','',''];
            for(var i = 0;i<4;i++){
                inputInfos[i] = $('.registerform input').eq(i).val();
            }
            var jsonData = {
                'name':inputInfos[0],
                'password':inputInfos[1],
                'e_mail':inputInfos[3],
            };
            infos.push(jsonData);
            users++;
            console.log(infos);            alert('注册成功，将跳转到登录页面！');
            $('.registerall').hide();
            $('.loginall').show();
            $('.findall').hide();
        }
        else{
            console.log(flagNum);
            alert('fail');
            $('.registerall').show();
            $('.loginall').hide();
            $('.blackbgc').show();
            $('.findall').hide();
        }
        flagNum=0
    });
    //定义数据存放
    var infos = [

    ];
    var users = 1;
//登录验证
    function getLoginInfo(){
        var name = $('#close1').val();
        var pswd = $('#close2').val();
        var flag = false;
        var len = infos.length;
        for(var i=0;i<len;i++){
            if(infos[i].name == name && infos[i].password == pswd){
                flag = true;
            }
        }
        return flag;
    }
    $('#close3').click(function(){
        var name = $('#close1').val();
        var pswd = $('#close2').val();
        console.log('click');
        if(getLoginInfo()){
            alert('登录成功!');
            $('.registerall').hide();
            $('.loginall').hide();
            $('.blackbgc').hide();
            $('.fouricon').after('<span class="new">' + $('#close1').val() + '</span>');
            $('.new').css('margin-left','-345px');
        }else{
            if (name==""){
                alert("输入的账号为空");
            }else if(pswd==""){
                alert("输入的密码为空");
            }else{
                alert('登录失败，请输入正确的账号密码!');
                $('.registerall').hide();
                $('.loginall').show();
                $('.blackbgc').show();
            }
        }
    })
    //$('.login_here a').click(function(){
    //    $('.bg').fadeIn(300);
    //    $('.login_box').fadeIn(300);
    //});
    //$('.register_click a').click(function(){
    //    $('.bg').fadeIn(300);
    //    $('.container3').fadeIn(300);
    //});

//退出登录
    $('.top-link1 a').eq(4).click(function(){
        $('.loginall').hide();
        $('.blackbgc').hide();
        $('.new').remove();
    });
    //轮播图插件
    class Swiper {
        constructor() {
            this.w = $('.f1 .swiper-item').width();
            this.num = 0;
            this.len = $('.f1 .swiper .swiper-item').length - 1;
            this.timer = null;
        }
        init() {
            //设置定时器
            this.setTime();
            //滑上停止定时器
            this.hover();
            //点击指示
            this.pointClick();
            //点击左右箭头
            this.lrClick();
        }
        setTime() {
            this.timer = setInterval(() => {
                    this.num++;
            if (this.num > this.len) {
                this.num = 0;
            }
            let cssTrx = -this.num * this.w;
            $('.f1 .swiper-point-item .point').eq(this.num).addClass('active').siblings().removeClass('active');
            $('.f1 .swiper').css({transform: `translateX(${cssTrx}px)`})
    }, 3000)
}
hover() {
    $('.f1 .swiper-contione').hover(() => {
        clearInterval(this.timer)
    }, () => {
        this.setTime();
    });
}
pointClick() {
    let that = this;
    $('.f1 .swiper-point-item .point').click(function() {
        that.num = $(this).index();
        let cssTrx = -that.num * that.w;
        $(this).addClass('active').siblings().removeClass('active');
        $('.f1 .swiper').css({
            transform: `translateX(${cssTrx}px)`
    })
})
}
lrClick() {
    $('.f1 .swiper-left img').click(() => {
        this.num--;
    if (this.num < 0) {
        this.num = this.len;
    };
    console.log(this.num)
    let cssTrx = -this.num * this.w;
    $('.f1 .swiper-point-item .point').eq(this.num).addClass('active').siblings().removeClass('active');
    $('.f1 .swiper').css({
        transform: `translateX(${cssTrx}px)`
})
});

$('.f1 .swiper-right img').click(() => {
    this.num++;
if (this.num > this.len) {
    this.num = 0;
}
let cssTrx = -this.num * this.w;
$('.f1 .swiper-point-item .point').eq(this.num).addClass('active').siblings().removeClass('active');
$('.f1 .swiper').css({
    transform: `translateX(${cssTrx}px)`
})
})
}
}
let sw = new Swiper();
sw.init();
});