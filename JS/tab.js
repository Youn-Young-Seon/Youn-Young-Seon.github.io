for(let i=0; i<$('.tab-button').length; i++){
    $('.tab-button').eq(i).click(function(){    
        $('.tab-button').removeClass('active');    
        $('.tab-button').eq(i).addClass('active');
        
        $('.tab-content').removeClass('show');
        $('.tab-content').eq(i).addClass('show');
    });
}
