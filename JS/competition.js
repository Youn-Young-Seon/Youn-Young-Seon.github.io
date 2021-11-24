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
                                <div class="product-detail">
                                <div class="product-detail-img">
                                    <img src="img/pr1.JPG">
                                </div>
                                <div class="product-detail-content">
                                    <div>전면어저구</div>
                                    <div>ㅇㄹㄴㅇㄹㄴㄹ</div>
                                    <div>
                                        수량<input type="number" class="form-control" style="width: 80%; display: inline-block;" value="1">
                                    </div>
                                    <div>합계 : 5000000</div>
                                </div>
                            </div>
                                <p class="card-text" style="text-align: right;">총 합계 0원</p>                          
                            </div>
                            <button class="btn btn-primary" style="font-size: 24px;">구매하기</button>
                        </div>
                    </div>`;
    $('#card-container').append(finalCard);
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
            
            console.log(rawDataArr[id]);
        }
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


