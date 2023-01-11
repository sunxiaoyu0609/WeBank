/**
 * Created by HP on 2021/12/3.
 */
var goodsList = [{
    id: 1,
    imgUrl: 'images/fundKind/gupiao.jpeg',
    goodsInfo: '股票型基金又称股票基金，是指投资于股票市场的基金。证券基金的种类很多。' +
    '我国除股票基金外，还有债券基金、股票债券混合基金、货币市场基金等。',
    goodsParams: '4.0365',
    price: 100,
    goodsCount: 1,
    singleGoodsMoney: 100
},
    {
        id: 2,
        imgUrl: 'images/fundKind/zhishu.jpeg',
        goodsInfo: '指数基金，就是以特定指数（如沪深300指数等）为标的指数，' +
        '并以该指数的成份股为投资对象，通过购买该指数的全部或部分成份股构建投资组合，以追踪标的指数表现的基金产品。',
        goodsParams: '2.4532',
        price: 50,
        goodsCount: 1,
        singleGoodsMoney: 50
    }
];
var deleteGoods = null;
loadGoods();

function loadGoods() {
    $.each(goodsList, function(i, item) {
        var goodsHtml = '<div class="goods-item">' +
            '<div class="panel panel-default">' +
            '<div class="panel-body">' +
            '<div class="col-md-1 car-goods-info">' +
            '<label><input type="checkbox" class="goods-list-item"/></label>' +
            '</div>' +
            '<div class="col-md-3 car-goods-info goods-image-column">' +
            '<img class="goods-image" src="' + item.imgUrl + '" style="width: 100px; height: 100px;" />' +
            '<span id="goods-info">' +
            item.goodsInfo +
            '</span>' +
            '</div>' +
            '<div class="col-md-3 car-goods-info goods-params">' + item.goodsParams + '</div>' +
            '<div class="col-md-1 car-goods-info goods-price"><span>￥</span><span class="single-price">' + item.price + '</span></div>' +
            '<div class="col-md-1 car-goods-info goods-counts">' +
            '<div class="input-group">' +
            '<div class="input-group-btn">' +
            '<button type="button" class="btn btn-default car-decrease">-</button>' +
            '</div>' +
            '<input style="width=55px;" type="text" class="form-control goods-count" value="' + item.goodsCount + '">' +
            '<div class="input-group-btn">' +
            '<button type="button" class="btn btn-default car-add">+</button>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '<div class="col-md-1 car-goods-info goods-money-count"><span>￥</span><span class="single-total">' + item.singleGoodsMoney + '</span></div>' +
            '<div class="col-md-2 car-goods-info goods-operate">' +
            '<button type="button" class="btn btn-danger item-delete">删除</button>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '</div>';
        $('.goods-content').append(goodsHtml)
    })
}

function ShoppingCarObserver(elInput, isAdd) {
    if(elInput) {
        this.elInput = elInput;
        this.parents = this.elInput.parents('.goods-item');
        this.count = parseInt(this.elInput.val());
        this.singlePrice = parseFloat(this.parents.find('.single-price').text())
    }
    if (isAdd) {
        this.isAdd = isAdd
    }
    this.computeGoodsMoney = function() { //计算商品价格
        var moneyCount = this.count * this.singlePrice;
        var singleTotalEl = this.parents.find('.single-total');
        console.log(moneyCount);
        singleTotalEl.empty().append(moneyCount)
    };
    this.showCount = function() { // 计算商品选中数量
        var isChecked = this.parents.find('.goods-list-item')[0].checked;
        var GoodsTotalMoney = parseFloat($('#selectGoodsMoney').text());
        var goodsTotalCount = parseInt($('#selectGoodsCount').text());
        if(this.elInput) {
            if(this.isAdd) {
                ++this.count;
                if(isChecked) {
                    $('#selectGoodsMoney').empty().append(GoodsTotalMoney + this.singlePrice)
                    $('#selectGoodsCount').empty().append(goodsTotalCount + 1)
                }
            } else {
                if(parseInt(this.count) <= 1) {
                    return
                } else {
                    --this.count;
                    if(isChecked) {
                        $('#selectGoodsMoney').empty().append(GoodsTotalMoney - this.singlePrice)
                        $('#selectGoodsCount').empty().append(goodsTotalCount - 1)
                    }
                }
            }
            this.elInput.val(this.count)
        }
    };
    this.checkIsAll = function() { //全选
        var checkLen = $('.goods-list-item:checked').length;
        if(checkLen > 0) {
            $('.submitData').removeClass('submitDis')
        } else {
            $('.submitData').addClass('submitDis')
        }
        if($('.goods-item').length === checkLen && checkLen > 0) {
            $('#checked-all-bottom, #check-goods-all').prop('checked', true)
        } else {
            $('#checked-all-bottom, #check-goods-all').prop('checked', false)
        }
    };
    this.checkedChange = function(isChecked) { //选中状态改变， isChecked为选中状态
        if(isChecked === undefined) {
            var isChecked = this.parents.find('.goods-list-item')[0].checked
        }
        var itemTotalMoney = parseFloat(this.parents.find('.single-total').text())
        var GoodsTotalMoney = parseFloat($('#selectGoodsMoney').text());
        var itemCount = parseInt(this.parents.find('.goods-count').val());
        var goodsTotalCount = parseInt($('#selectGoodsCount').text());
        if(isChecked) {
            $('#selectGoodsMoney').empty().append(itemTotalMoney + GoodsTotalMoney)
            $('#selectGoodsCount').empty().append(itemCount + goodsTotalCount)
        } else {
            if(GoodsTotalMoney - itemTotalMoney === 0) {
                $('#selectGoodsMoney').empty().append('0.00');
                if(!$('.submitData').hasClass('submitDis')) {
                    $('.submitData').addClass('submitDis')
                }
            } else {
                $('#selectGoodsMoney').empty().append(GoodsTotalMoney - itemTotalMoney)
            }
            $('#selectGoodsCount').empty().append(goodsTotalCount - itemCount)
        }
    };
    this.deleteGoods = function() { //删除商品
        var isChecked = this.parents.find('.goods-list-item')[0].checked;
        if(isChecked) {
            this.checkedChange(false)
        }
        this.parents.remove();
        this.checkOptions()
    };
    this.checkOptions = function() {
        if($('#check-goods-all')[0].checked) {
            if($('.goods-list-item').length <= 0) {
                $('#checked-all-bottom, #check-goods-all').prop('checked', false)
            }
        } else {
            this.checkIsAll()
        }
    }
}

function checkedAll(_this) {
    if($('.goods-item').length <= 0) {
        $('.submitData').addClass('submitDis')
    } else {
        $('.submitData').removeClass('submitDis')
    }
    for(var i = 0; i < $('.goods-item').length; i++) {
        var elInput = $('.goods-item').eq(i).find('.goods-list-item');
        var isChecked = $('.goods-item').eq(i).find('.goods-list-item')[0].checked
        var checkAllEvent = new ShoppingCarObserver(elInput, null);
        if(_this.checked) {
            if(!isChecked) {
                elInput.prop('checked', true);
                checkAllEvent.checkedChange(true)
            }
        } else {
            if(!$('.submitData').hasClass('submitDis')) {
                $('.submitData').addClass('submitDis')
            }
            if(isChecked) {
                elInput.prop('checked', false);
                checkAllEvent.checkedChange(false);
            }
        }
    }
}
$('#check-goods-all').on('change', function() {
    if(this.checked) {
        $('#checked-all-bottom').prop('checked', true)
    } else {
        $('#checked-all-bottom').prop('checked', false)
    }
    checkedAll(this)
});
$('#checked-all-bottom').on('change', function() {
    if(this.checked) {
        $('#check-goods-all').prop('checked', true)
    } else {
        $('#check-goods-all').prop('checked', false)
    }
    checkedAll(this)
});
$('.goods-list-item').on('change', function() {
    var tmpCheckEl = $(this);
    var checkEvent = new ShoppingCarObserver(tmpCheckEl, null);
    checkEvent.checkedChange();
    checkEvent.checkIsAll()
});
$('.goods-content').on('click', '.car-decrease', function() {
    var goodsInput = $(this).parents('.input-group').find('.goods-count');
    var decreaseCount = new ShoppingCarObserver(goodsInput, false);
    decreaseCount.showCount();
    decreaseCount.computeGoodsMoney()
});
$('.goods-content').on('click', '.car-add', function() {
    var goodsInput = $(this).parents('.input-group').find('.goods-count');
    var addCount = new ShoppingCarObserver(goodsInput, true);
    addCount.showCount();
    addCount.computeGoodsMoney()
});
$('.goods-content').on('click', '.item-delete', function() {
    var goodsInput = $(this).parents('.goods-item').find('.goods-list-item');
    deleteGoods = new ShoppingCarObserver(goodsInput, null);
    $('#deleteItemTip').modal('show')
});
$('.deleteSure').on('click', function() {
    if(deleteGoods !== null) {
        deleteGoods.deleteGoods()
    }
    $('#deleteItemTip').modal('hide')
});
$('#deleteMulty').on('click', function() {
    if($('.goods-list-item:checked').length <= 0) {
        $('#selectItemTip').modal('show')
    } else {
        $('#deleteMultyTip').modal('show')
    }
});
$('.deleteMultySure').on('click', function() {
    for(var i = 0; i < $('.goods-list-item:checked').length; i++) {
        var multyDelete = new ShoppingCarObserver($('.goods-list-item:checked').eq(i), null);
        multyDelete.deleteGoods();
        i--
    }
    var checkCount = new ShoppingCarObserver();
    checkCount.checkOptions();
    $('#deleteMultyTip').modal('hide');
})