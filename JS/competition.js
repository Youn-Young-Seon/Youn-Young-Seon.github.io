let rawData = '';
let rawDataArr = [];

$.ajax({
    url: "resource/store.json",
    data: 'GET',
    success: function(data){
        rawData = data;
        rawDataArr = data.products;
        productList(rawDataArr);
       },error: function(e){
           
    }
});

function productList(setArr){    
    cardSet(setArr);
    finalCardSet();
    drag();    
}

function cardSet(setArr){
    $('#card-container').html('');
    setArr.forEach(function(i){
        let card = `<div class="col-2">
                        <div class="card drag-opt" id="card${i.id}">
                            <img src="img/${i.photo}" class="card-img-top" alt="...">
                            <div class="card-body">
                                <h5 class="card-title">${i.product_name}</h5>
                                <p class="card-text">${i.brand_name}</p>
                            </div>
                            <div class="card-header">${i.price}</div>
                        </div>
                    </div>`;
        $('#card-container').append(card);
    });
}

function finalCardSet(){
    let finalCard = `<div class="col-4">
                        <div class="card">                                                
                            <div class="card-body">
                                <div class="card-body-productbox" id="card-body-productbox">
                                    <div>이곳에 상품을 놓아주세요.</div>
                                </div>
                                <div id="product-cartegory"></div>
                                <p id="cartegoryTotalP" class="card-text" style="text-align: right;">총 합계 0원</p>                          
                            </div>
                            <button id="buy" class="btn btn-primary" style="font-size: 24px;">구매하기</button>
                        </div>
                    </div>`;
    $('#card-container').append(finalCard);
    canvasView();
}

function cartegorySet(obj){
    let cartegoryNum = $('#product-cartegory').children().length;
    for(let i=0; i<cartegoryNum; i++){
        let cartegoryCheck = $('#product-cartegory').children().eq(i).attr('id');
        if(obj.id == cartegoryCheck){
            alert('해당 상품은 장바구니에 존재합니다.');
            return;
        }
    }

    let dataUnitPrice = parseInt(obj.price);
    let dataTotalPrice = 0;

    let cartegory = `<div class="product-detail" id="${obj.id}">
                        <div class="product-detail-img">
                            <img src="img/${obj.photo}">
                        </div>
                        <div class="product-detail-content">
                            <div>${obj.product_name}</div>
                            <div>${obj.brand_name}</div>
                            <div>
                                수량<input id="cartegoryNum${obj.id}" data-id="cartegoryNum" type="number" class="form-control" style="width: 80%; display: inline-block;" value="1">
                            </div>
                            <div id="cartegoryTotalSum${obj.id}" class="cartegoryTotalSum" data-total="" data-id="${obj.price}">합계 : ${obj.price}</div>
                        </div>
                    </div>`;
    $('#product-cartegory').append(cartegory);

    $(`#cartegoryTotalSum${obj.id}`).data('total', dataUnitPrice);
    for(let i=0; i<cartegoryNum+1; i++){
        let temp = parseInt($('.cartegoryTotalSum').eq(i).data('total'));
        if(isNaN(temp) === false){
            dataTotalPrice += temp;
        }
        if(temp === ''){
            dataTotalPrice += 0;
        }
    }
    $('#cartegoryTotalP').text(`총 합계 ${dataTotalPrice}원`);
}

function drag(){
    $('.drag-opt').draggable({
        // drag: function(event, ui){
        //     let item = $(ui.draggable);
        //     console.log(item);
        // },
        revert: true
    });

    $('#card-body-productbox').droppable({
        drop: function(event, ui){
            var item = $(ui.draggable);
            let cardId = $('#' + item[0].id).attr('id');
            let id = cardId.substring(4);

            let selectObject = rawDataArr[id];

            cartegorySet(selectObject);
            modifyCartegryNum();
        }
    });    
}

function modifyCartegryNum(){
    let input = $('.product-detail-content input');
    input.on('input', function(){
        let inputParent = $(this).parent().parent();
        let inputSum = $(this).val();
        let totalSum = inputParent.parent().parent().parent().children('p');
        
        let unitSum = inputParent.children().eq(3);
        let thisPrice = unitSum.data('id');    
        
        let totalUnitSum = cartegoryUnitSum(inputSum, thisPrice, unitSum)
        
        unitSum.text(`합계 : ${totalUnitSum}`);

        
        totalSum.text(`총 합계 ${cartegorySum()}원`);
    });
};

function cartegoryUnitSum(sum, price, unitSum){
    let setPrice = parseInt(sum) * parseInt(price);
    
    if(sum > 0 && price > 0){
        unitSum.data('total', setPrice);
        return setPrice;
    }else{
        unitSum.data('total', '');
        return `수량이 잘못 되었습니다.`;
    }
}

function cartegorySum(){        
    let eachSum = $('.cartegoryTotalSum');
    let totalSum = 0;

    for(let i=0; i<eachSum.length; i++){
        let intSum = parseInt(eachSum.eq(i).data('total'));
        if(isNaN(intSum) === false){
            totalSum += intSum;
        }
        if(intSum === ''){
            totalSum += 0;
        }
    }
    return totalSum;
}

function canvasView(){
    document.querySelector('#buy').addEventListener('click', function(){
        $('#canvas').css('display', 'inline');
    });
}

document.querySelector('.header-menulist-li').addEventListener('click', function(e){    
    for(let i=0; i<this.children.length; i++){
        this.children[i].classList.remove('active');
    }
    e.target.classList.add('active');
});

document.querySelector('#search').addEventListener('input', function(){
    let setData = rawData.products.filter(function(a){        
        if(a.product_name.indexOf($('#search').val()) > -1){            
            return a;
        };
    });

    productList(setData);
    
    // let searchIndex = $('.card-title').text().indexOf($('#search').val());
    // if(searchIndex > -1){        
    //     console.log($('.card-title').text()[searchIndex]);
    //     // $('.card-title').css('background-color', 'yellow');
    // }
});

const canvas = document.querySelector('#canvas');
canvas.width = 500;
canvas.height = 400;

let c = canvas.getContext('2d');

c.font = '16px dotum';
c.fillRect(0, 0, 1000, 50);
c.fillText('영수증', 30, 80);
c.fillText('반갑습니다', 30, 120);
c.fillRect(0, 400, 1000, 100);


