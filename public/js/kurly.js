(function($, window, document){

    const Kurly = {
        init: function(){
            this.header();
            this.section1();
            this.section2();
            this.section3();
            this.section4();
            this.section5();
            this.section6();
            this.section7();
            this.quickMenu();
            this.goTop();
        },
        header: function(){

            const $document         = $(document);
            const $window           = $(window);
            const $header           = $('#header');
            const $headerMapBtn     = $('#header .map-btn');
            const $headerHeartBtn   = $('#header .heart-btn');
            const $headerCartBtn    = $('#header .cart-btn');
            const $headerHamBarBtn  = $('#header .ham-bar-btn');

            // console.log( $window.innerHeight() );
            // console.log( $window.innerWidth() );

            // console.log( $document.innerHeight() );
            // console.log( $document.outerWidth() );
            // console.log( $document.innerWidth() );


            // 윈도우 객체 스크롤 이벤트 
            // 스크롤이 발생하면 이벤트 발생            
            $window.scroll(function(){
                //스클롤 발생하면 
                //현재 윈도우 스크롤 탑값을 콘솔에 찍는다
                // console.log( $(this).scrollTop() );

                if( $(this).scrollTop() >= 142 ){
                    $header.addClass('on');
                }
                else{
                    $header.removeClass('on');
                }

            });



            // 2행 아이콘 버튼 이벤트
            // on() off()
            $headerMapBtn.on({
                mouseover: function(){
                    $(this).children().attr('src', './img/map_hover.svg');
                },
                mouseout: function(){
                    $(this).children().attr('src', './img/map.svg');
                }
            }); 

            $headerHeartBtn.on({
                mouseenter: function(){
                    $(this).find('img').attr('src', './img/heart_hover.svg');
                },
                mouseleave: function(){
                    $(this).find('img').attr('src', './img/heart.svg');
                }
            });

            $headerCartBtn.on({
                mouseenter: function(){
                    $(this).find('img').prop('src','./img/cart_hover.svg');
                },
                mouseleave: function(){
                    $(this).find('img').prop('src','./img/cart.svg');
                }
            });

            $headerHamBarBtn.on({
                mouseenter: function(){
                    $(this).find('img').attr('src','./img/menu_ba_hoverr.svg')
                },                
                mouseleave: function(){
                    $(this).find('img').attr('src','./img/menu_bar.svg')
                },

            });


        },
        section1: function(){
            let cnt = 0;    
            let setId = 0;
            // 선택자 변수 $접두어 사용
            const $s1SlideWrap      = $('#section1 .slide-wrap');
            const $s1Slide          = $('#section1 .slide');
            const $s1CountNumber    = $('#section1 .count-number');
            const $s1TotalNumber    = $('#section1 .total-number');
            const $s1SlideContainer = $('#section1 .slide-container');
            const $s1NextBtn        = $('#section1 .next-btn');
            const $s1PrevBtn        = $('#section1 .prev-btn');


            
            mainSlide();  //로딩시 곧바로 실행

            //1. 메인슬라이드 함수
            function mainSlide(){
                $s1SlideWrap.animate({ left: -1903*cnt }, 300,   function(){
                    if(cnt===11){  //first
                        cnt=0; /* forwords */
                        $s1SlideWrap.animate({ left: -1903*cnt }, 0);
                    }
                    
                    if(cnt===-1){  //last
                        cnt=10; /* backwords */
                        $s1SlideWrap.animate({ left: -1903*cnt }, 0);
                    }
                });

                // 페이지 번호 출력
                // 전체 갯수를 셀때 자바스크립트 length 
                let tatal = $s1Slide.length-2; //13-2
                $s1CountNumber.text( cnt===11 ? 1 : (cnt+1===0 ? 11 : cnt+1) ); //0출발이어서 1을 더한다. 
                $s1TotalNumber.text( tatal ); //11

            }

            //2. 다음(next)카운트 함수
            function nextCount(){
                cnt++; //1 2 3 ....
                mainSlide();
            }
            //2. 이전(preiew)카운트 함수
            function prevCount(){
                cnt--; //1 2 3 ....
                mainSlide();
            }


            //3. 자동타이머 함수
            function autoTimer(){
                setId = setInterval(nextCount, 3000); //3초 뒤에서 다음카운트 함수 호출 계속(포에버)
            }
            autoTimer();


            //4. 슬라이드 컨테이너(선택자 .slide-container) 박스 위에 마우스 올리면(mouseenter) 
            //   슬라이드 일시정지(clearInterval(1))
            //   마우스가 떠나면 슬라이드 타이머함수 실행
            $s1SlideContainer.on({
                mouseenter: function(){
                    clearInterval( setId );  //타이머지 일시정지                   
                },
                mouseleave: function(){
                    autoTimer(); //자동타이머 함수 호출 실행
                }
            })


            //5-1. 다음화살버튼(next-btn) 클릭(click) 이벤트 : 다음슬라이드 구현
            //5-2. 빠른속도로 클릭하면 클릭한 횟수대로 애니메이션이 진행이 된다.
            //   이미지 애니메이션이 진행중인경우에도 클릭되어 버그가 발생한다.
            //   그래서 애니메이션이 진행안될때만 클릭을 가능하게 해준다.
            //   오류 없다.(디버깅 ==> 오류수정)
            $s1NextBtn.on({
                click: function(e){
                    e.preventDefault();
                    // 애니메이션 진행 중이면 true
                    // 애니메이션 진행 중이 아니면 false                   
                    if( $s1SlideWrap.is(':animated')===false ){
                        nextCount();
                    }

                }
            });

            //5. 이전화살버튼(next-btn) 클릭(click) 이벤트 : 이전슬라이드 구현
            $s1PrevBtn.on({
                click: function(e){
                    e.preventDefault();
                    if ( $s1SlideWrap.is(':animated')===false  ){
                        prevCount();
                    }
                }
            });

            



        },
        section2: function(){
            let cnt = 0;
            const $s2NextBtn = $('#section2 .next-btn');
            const $s2PrevBtn = $('#section2 .prev-btn');
            const $s2SlideWrap = $('#section2 .slide-wrap');



           //1. 메인슬라이드 함수 
           function mainSlide(){  
                if(cnt>=4){
                    cnt=4
                    $s2NextBtn.stop().fadeOut(300);
                }
                else{
                    $s2NextBtn.stop().fadeIn(300);
                }
                if(cnt<=0){
                    cnt=0
                    $s2PrevBtn.stop().fadeOut(300);
                }
                else {
                    $s2PrevBtn.stop().fadeIn(300);
                }             
                $s2SlideWrap.stop().animate({left:-1064*cnt},600);
           }
           mainSlide(); //로딩시 실행 1회

           //2. 다음카운트 함수 
           function nextCount(){
                cnt++;                
                mainSlide();
           }
           //2. 이전카운트 함수 
           function prevCount(){
                cnt--;                
                mainSlide();
           }

           //3. 다음화살버튼클릭 이벤트
           $s2NextBtn.on({
                click: function(e){                    
                    e.preventDefault(); //프리벤트디폴트
                    nextCount();
                },
                mouseenter: function(){
                    //다음 버튼에 마우스 올리면 다음 버튼을 보라색 이미지로 변경
                    // 어트리뷰트 Attribute attr('href','#section1')
                    // 프로퍼티   Property  prop('href','#section1')
                    $(this).attr('src','./img/sec2/arrow_perple.svg');                    
                },
                mouseleave: function(){
                    //다음 버튼에 마우스 올리면 다음 버튼을 보라색 이미지로 변경
                    $(this).attr('src','./img/sec2/arrow_white.svg');
                },

           });
           //3. 이전화살버튼클릭 이벤트
           $s2PrevBtn.on({
                click: function(e){                    
                    e.preventDefault(); //프리벤트디폴트
                    prevCount();
                },
                mouseenter: function(){
                    //다음 버튼에 마우스 올리면 다음 버튼을 보라색 이미지로 변경
                    // 어트리뷰트 Attribute attr('href','#section1')
                    // 프로퍼티   Property  prop('href','#section1')
                    $(this).attr('src','./img/sec2/arrow_perple.svg');
                },
                mouseleave: function(){
                    //다음 버튼에 마우스 올리면 다음 버튼을 보라색 이미지로 변경
                    $(this).attr('src','./img/sec2/arrow_white.svg');
                },
           });

        },
        section3: function(){

        },
        section4: function(){
            let cnt = 0;
            const $sNextBtn =   $('#section4 .next-btn');
            const $sPrevBtn =   $('#section4 .prev-btn');
            const $sSlideWrap = $('#section4 .slide-wrap');



           //1. 메인슬라이드 함수 
           function mainSlide(){  
                if(cnt>=4){
                    cnt=4
                    $sNextBtn.stop().fadeOut(300);
                }
                else{
                    $sNextBtn.stop().fadeIn(300);
                }
                if(cnt<=0){
                    cnt=0
                    $sPrevBtn.stop().fadeOut(300);
                }
                else {
                    $sPrevBtn.stop().fadeIn(300);
                }             
                $sSlideWrap.stop().animate({left:-1064*cnt},600);
           }
           mainSlide(); //로딩시 실행 1회

           //2. 다음카운트 함수 
           function nextCount(){
                cnt++;                
                mainSlide();
           }
           //2. 이전카운트 함수 
           function prevCount(){
                cnt--;                
                mainSlide();
           }

           //3. 다음화살버튼클릭 이벤트
           $sNextBtn.on({
                click: function(e){                    
                    e.preventDefault(); //프리벤트디폴트
                    nextCount();
                },
                mouseenter: function(){
                    //다음 버튼에 마우스 올리면 다음 버튼을 보라색 이미지로 변경
                    // 어트리뷰트 Attribute attr('href','#section1')
                    // 프로퍼티   Property  prop('href','#section1')
                    $(this).attr('src','./img/sec2/arrow_perple.svg');                    
                },
                mouseleave: function(){
                    //다음 버튼에 마우스 올리면 다음 버튼을 보라색 이미지로 변경
                    $(this).attr('src','./img/sec2/arrow_white.svg');
                },

           });
           //3. 이전화살버튼클릭 이벤트
           $sPrevBtn.on({
                click: function(e){                    
                    e.preventDefault(); //프리벤트디폴트
                    prevCount();
                },
                mouseenter: function(){
                    //다음 버튼에 마우스 올리면 다음 버튼을 보라색 이미지로 변경
                    // 어트리뷰트 Attribute attr('href','#section1')
                    // 프로퍼티   Property  prop('href','#section1')
                    $(this).attr('src','./img/sec4/arrow_perple.svg');
                },
                mouseleave: function(){
                    //다음 버튼에 마우스 올리면 다음 버튼을 보라색 이미지로 변경
                    $(this).attr('src','./img/sec4/arrow_white.svg');
                },
           });

        },
        section5: function(){
            let cnt = 0;
            const $sNextBtn =   $('#section5 .next-btn');
            const $sPrevBtn =   $('#section5 .prev-btn');
            const $sSlideWrap = $('#section5 .slide-wrap');



           //1. 메인슬라이드 함수 
           function mainSlide(){  
                if(cnt>=4){
                    cnt=4
                    $sNextBtn.stop().fadeOut(300);
                }
                else{
                    $sNextBtn.stop().fadeIn(300);
                }
                if(cnt<=0){
                    cnt=0
                    $sPrevBtn.stop().fadeOut(300);
                }
                else {
                    $sPrevBtn.stop().fadeIn(300);
                }             
                $sSlideWrap.stop().animate({left:-1064*cnt},600);
           }
           mainSlide(); //로딩시 실행 1회

           //2. 다음카운트 함수 
           function nextCount(){
                cnt++;                
                mainSlide();
           }
           //2. 이전카운트 함수 
           function prevCount(){
                cnt--;                
                mainSlide();
           }

           //3. 다음화살버튼클릭 이벤트
           $sNextBtn.on({
                click: function(e){                    
                    e.preventDefault(); //프리벤트디폴트
                    nextCount();
                },
                mouseenter: function(){
                    //다음 버튼에 마우스 올리면 다음 버튼을 보라색 이미지로 변경
                    // 어트리뷰트 Attribute attr('href','#section1')
                    // 프로퍼티   Property  prop('href','#section1')
                    $(this).attr('src','./img/sec5/arrow_perple.svg');                    
                },
                mouseleave: function(){
                    //다음 버튼에 마우스 올리면 다음 버튼을 보라색 이미지로 변경
                    $(this).attr('src','./img/sec5/arrow_white.svg');
                },

           });
           //3. 이전화살버튼클릭 이벤트
           $sPrevBtn.on({
                click: function(e){                    
                    e.preventDefault(); //프리벤트디폴트
                    prevCount();
                },
                mouseenter: function(){
                    //다음 버튼에 마우스 올리면 다음 버튼을 보라색 이미지로 변경
                    // 어트리뷰트 Attribute attr('href','#section1')
                    // 프로퍼티   Property  prop('href','#section1')
                    $(this).attr('src','./img/sec5/arrow_perple.svg');
                },
                mouseleave: function(){
                    //다음 버튼에 마우스 올리면 다음 버튼을 보라색 이미지로 변경
                    $(this).attr('src','./img/sec5/arrow_white.svg');
                },
           });

        },
        section6: function(){
            let cnt = 0;
            const $sNextBtn =   $('#section6 .next-btn');
            const $sPrevBtn =   $('#section6 .prev-btn');
            const $sSlideWrap = $('#section6 .slide-wrap');



           //1. 메인슬라이드 함수 
           function mainSlide(){  
                if(cnt>=4){
                    cnt=4
                    $sNextBtn.stop().fadeOut(300);
                }
                else{
                    $sNextBtn.stop().fadeIn(300);
                }
                if(cnt<=0){
                    cnt=0
                    $sPrevBtn.stop().fadeOut(300);
                }
                else {
                    $sPrevBtn.stop().fadeIn(300);
                }             
                $sSlideWrap.stop().animate({left:-1064*cnt},600);
           }
           mainSlide(); //로딩시 실행 1회

           //2. 다음카운트 함수 
           function nextCount(){
                cnt++;                
                mainSlide();
           }
           //2. 이전카운트 함수 
           function prevCount(){
                cnt--;                
                mainSlide();
           }

           //3. 다음화살버튼클릭 이벤트
           $sNextBtn.on({
                click: function(e){                    
                    e.preventDefault(); //프리벤트디폴트
                    nextCount();
                },
                mouseenter: function(){
                    //다음 버튼에 마우스 올리면 다음 버튼을 보라색 이미지로 변경
                    // 어트리뷰트 Attribute attr('href','#section1')
                    // 프로퍼티   Property  prop('href','#section1')
                    $(this).attr('src','./img/sec6/arrow_perple.svg');                    
                },
                mouseleave: function(){
                    //다음 버튼에 마우스 올리면 다음 버튼을 보라색 이미지로 변경
                    $(this).attr('src','./img/sec6/arrow_white.svg');
                },

           });
           //3. 이전화살버튼클릭 이벤트
           $sPrevBtn.on({
                click: function(e){                    
                    e.preventDefault(); //프리벤트디폴트
                    prevCount();
                },
                mouseenter: function(){
                    //다음 버튼에 마우스 올리면 다음 버튼을 보라색 이미지로 변경
                    // 어트리뷰트 Attribute attr('href','#section1')
                    // 프로퍼티   Property  prop('href','#section1')
                    $(this).attr('src','./img/sec6/arrow_perple.svg');
                },
                mouseleave: function(){
                    //다음 버튼에 마우스 올리면 다음 버튼을 보라색 이미지로 변경
                    $(this).attr('src','./img/sec6/arrow_white.svg');
                },
           });

        },   
        section7: function(){
            let cnt = 0;
            const $sNextBtn =   $('#section7 .next-btn');
            const $sPrevBtn =   $('#section7 .prev-btn');
            const $sSlideWrap = $('#section7 .slide-wrap');



           //1. 메인슬라이드 함수 
           function mainSlide(){  
                if(cnt>=4){
                    cnt=4
                    $sNextBtn.stop().fadeOut(300);
                }
                else{
                    $sNextBtn.stop().fadeIn(300);
                }
                if(cnt<=0){
                    cnt=0
                    $sPrevBtn.stop().fadeOut(300);
                }
                else {
                    $sPrevBtn.stop().fadeIn(300);
                }             
                $sSlideWrap.stop().animate({left:-1064*cnt},600);
           }
           mainSlide(); //로딩시 실행 1회

           //2. 다음카운트 함수 
           function nextCount(){
                cnt++;                
                mainSlide();
           }
           //2. 이전카운트 함수 
           function prevCount(){
                cnt--;                
                mainSlide();
           }

           //3. 다음화살버튼클릭 이벤트
           $sNextBtn.on({
                click: function(e){                    
                    e.preventDefault(); //프리벤트디폴트
                    nextCount();
                },
                mouseenter: function(){
                    //다음 버튼에 마우스 올리면 다음 버튼을 보라색 이미지로 변경
                    // 어트리뷰트 Attribute attr('href','#section1')
                    // 프로퍼티   Property  prop('href','#section1')
                    $(this).attr('src','./img/sec7/arrow_perple.svg');                    
                },
                mouseleave: function(){
                    //다음 버튼에 마우스 올리면 다음 버튼을 보라색 이미지로 변경
                    $(this).attr('src','./img/sec7/arrow_white.svg');
                },

           });
           //3. 이전화살버튼클릭 이벤트
           $sPrevBtn.on({
                click: function(e){                    
                    e.preventDefault(); //프리벤트디폴트
                    prevCount();
                },
                mouseenter: function(){
                    //다음 버튼에 마우스 올리면 다음 버튼을 보라색 이미지로 변경
                    // 어트리뷰트 Attribute attr('href','#section1')
                    // 프로퍼티   Property  prop('href','#section1')
                    $(this).attr('src','./img/sec7/arrow_perple.svg');
                },
                mouseleave: function(){
                    //다음 버튼에 마우스 올리면 다음 버튼을 보라색 이미지로 변경
                    $(this).attr('src','./img/sec7/arrow_white.svg');
                },
           });

        },             
        quickMenu: function(){
            // 퀵메뉴 탑위치 정하기
            // 섹션2 슬라이드 컨테이너박스 탑값 위치
            // const headerTop = $('#header').offset().top; 
            // const sec1Top = $('#section1').offset().top; //197
            // const sec2Top = $('#section2').offset().top; //197+370.578 
            // const sec3Top = $('#section3').offset().top; //197+370.578 
            // $('#quickMenu').stop().animate({top: 600 }, 600);
            // 퀵메뉴 탑값이 스크롤시 항상 현재 스크롤 탑값 + ((윈도우화면높이-퀵메뉴높이)/2)
            //   console.log( $(window).height() ); //937
            //   console.log( $('#quickMenu').height() ); //554
            //   (383)=937-554
            //   (383/2)+현재스크롤탑값
            let quickTop = 0;

            function quickMenuFn(){
                if( $(window).scrollTop() >= 690 ){
                    quickTop = ($(window).height()-554)/2 + $(window).scrollTop();
                    $('#quickMenu').stop().animate({top: quickTop }, 300, 'easeOutExpo'); 
                }
                else{
                    $('#quickMenu').stop().animate({top: 690 }, 300, 'easeOutExpo');
                }
            }
            quickMenuFn();
            
            $(window).scroll(function(){
                quickMenuFn();
            });

        },
        goTop: function(){
           // 마우스 올리면 이미지 변경
           $('.go-top-btn').on({
              mouseenter: function(){
                $(this).find('img').attr('src','./img/go_top_on.png');
              },
              mouseleave: function(){
                $(this).find('img').attr('src','./img/go_top.png');
              },
              click: function(){
                $('html, body').stop().animate({scrollTop: 0}, 600, 'easeInOutExpo');
              }
           });

           //스크롤탑값이 690 이상이면 고탑버튼 보이기 미만이면 안보이기
           $(window).scroll(function(){
              scrollEvent();
           });
           
           function scrollEvent(){
              if( $(window).scrollTop() >= 690 ){
                $('#goTop').stop().fadeIn(600);
              }
              else{
                $('#goTop').stop().fadeOut(600);
              }
           }
           scrollEvent(); //로딩시
        }


    }

    Kurly.init();




})(jQuery, window, document);