(function($, window, document){

    const Kurly = {
        init: function(){
            this.quickMenu();            
        },
        quickMenu: function(){

            let quickTop = 0;

            function quickMenuFn(){

                // 섹션2의 슬라이드 컨테이너가 없으면 오류발생
                // 예외처리
                try{ //트라이 실행하고 오류가 발생하면 아래 캣치에서 잡는다.

                    if( $(window).scrollTop() >= $('#section2  .slide-container').offset().top ){
                        quickTop = ($(window).height()-554)/2 + $(window).scrollTop();
                        $('#quickMenu').stop().animate({top: quickTop }, 300, 'easeOutExpo'); 
                    }
                    else{
                        $('#quickMenu').stop().animate({top: $('#section2  .slide-container').offset().top }, 300, 'easeOutExpo');
                    }
                }
                catch(e){//캣치
                    
                    if( $(window).scrollTop() >= 248 ){
                        quickTop = ($(window).height()-554)/2 + $(window).scrollTop();
                        $('#quickMenu').stop().animate({top: quickTop }, 300, 'easeOutExpo'); 
                    }
                    else{
                        $('#quickMenu').stop().animate({top: 248 }, 300, 'easeOutExpo');
                    }
                }




            }
            quickMenuFn();
            
            $(window).scroll(function(){
                quickMenuFn();
            });

        }
    }

    Kurly.init();
 

})(jQuery, window, document);