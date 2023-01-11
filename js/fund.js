/**
 * Created by HP on 2021/12/3.
 */
function showLi(obj) {
    $(obj).addClass('on').siblings().removeClass('on');
    var index = $(obj).index();
    //console.log($(obj).parent().parent())
    $(obj).parent().parent().find('.content li').hide();
    $(obj).parent().parent().find('.content li:eq(' + index + ')').show();
}

function showPanal1(obj) {
    $(obj).addClass('bag').siblings().removeClass('bag');
    var _index = $(obj).index();
    $('.panal').eq(_index).show('fast').siblings().hide('fast');
}