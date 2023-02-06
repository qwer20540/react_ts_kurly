(($)=>{

    const Category = {
        init(){
            this.mainFn();
        },
        mainFn(){
            
            // 카테고리 버튼 클릭 이벤트
            const $categoryBtn = $('.category-btn');
            const $catagorySub = $('.catagory-sub');

            $categoryBtn.on({
                click(e){
                    e.preventDefault();
                   $(this).toggleClass('on');  //addClass('on') | removeClass('on')
                   $(this).next().stop().slideToggle(300);
                }
            });

        }
    }
    Category.init();
 

})(jQuery);