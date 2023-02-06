(function($, window, document){
    const Kurly = {
        init: function(){
            this.section1();
            this.section2();
            this.section3();
            this.section4();
            this.section5();
            this.section6();
            this.section7();
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
            const n                 = $('#section1 .slide').length-2;

            // localhost/kurly_1214__5기/
            // alert(n);

            mainSlide();  //로딩시 곧바로 실행


            //1. 메인슬라이드 함수
            function mainSlide(){  

                $s1SlideWrap.animate({ left: `${-100*cnt}%` }, 600, 'easeInOutExpo', function(){
                    if(cnt >= n){  //first
                        cnt=0; /* forwords */
                        $s1SlideWrap.animate({ left: `${-100*cnt}%` }, 0);
                    }
                    
                    if(cnt <= -1){  //last
                        cnt=n-1; /* backwords */
                        $s1SlideWrap.animate({ left: `${-100*cnt}%` }, 0);
                    }
                });
                // 메인슬라이드 슬라이드랩퍼박스 좌표
                // console.log( `$s1SlideWrap.offset().left ${$s1SlideWrap.offset().left}`  ) 

                // 페이지 번호 출력
                // 전체 갯수를 셀때 자바스크립트 length 
                let tatal = $s1Slide.length-2; //13-2
                $s1CountNumber.text( cnt===n ? 1 : (cnt+1===0 ? n : cnt+1) ); //0출발이어서 1을 더한다. 
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
                clearInterval( setId );
                setId = setInterval(nextCount, 3000); //3초 뒤에서 다음카운트 함수 호출 계속(포에버)
            }
            autoTimer();


            //4. 슬라이드 컨테이너(선택자 .slide-container) 박스 위에 마우스 올리면(mouseenter) 
            //   슬라이드 일시정지(clearInterval(1))
            //   마우스가 떠나면 슬라이드 타이머함수 실행
            $s1SlideContainer.on({
                mouseenter: function(){
                    clearInterval( setId );  //타이머지 일시정지  
                    $s1NextBtn.stop().fadeIn(1000);
                    $s1PrevBtn.stop().fadeIn(1000);
                },
                mouseleave: function(){
                    autoTimer(); //자동타이머 함수 호출 실행
                    $s1NextBtn.stop().fadeOut(1000);
                    $s1PrevBtn.stop().fadeOut(1000);
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


            // 1 단계 : 터치 스와이프 => 방향을 결정
            // 터치 스와이프 : 오른족에서 왼쪽으로 터치하면 다음슬라이드
            // 터치 스와이프 : 왼족에서 오른쪽으로 터치하면 이전슬라이드

            // 2 단계 : 드래그 앤 드롭(Drag an Drop) => 잡고 이동(끌고)하고 놓는다.
            // - 마우스가 클릭하는 싯점을 드래그앤 드롭 싯점으로 판단
            // - 마우스가 클릭이 끝나는 싯점 마우스가 업인 상태는 드래그 앤 드롭의 끝점이다.
            // - 그래서 드래그 앤 드롭의 시작과 끝을 정하는 변수가 필요한다. 
            // - mouseDown = true : 드래그 앤 드롭의 시작
            // - mouseDown = false : 드래그 앤 드롭의 끝
            // - 예외적인 상태 : 마우스 업(mouseup 이벤트가 발생하지 못하는 상태) 즉
            //   마우스가 슬라이드컨테이너 영역을 떠나면 발생하지 않는다.
            //   그래서 그 싯점을 마우스 업 상태로 간주한다.  mouseDown = false; 
            let touchStart = null;
            let touchEnd = null;
            let dragStart = null;
            let dragEnd = null;
            let mouseDown = false;  //드래그 시작=true과 끝=false을 알리는 신호
            let winW = $(window).innerWidth(); // 창너비(내부너비)
            // 슬라이드 랩퍼 박스 : 기차처럼 16칸 + 앞1칸 + 뒤1칸  
            // 좌측 끝 좌표값 확인
            // console.log( `$s1SlideWrap.offset().left ${$s1SlideWrap.offset().left}`  ) /* x 축 : 수평좌표 */
            // console.log( $s1SlideWrap.offset().top  )  /* y 축 : 수직좌표 */

            // 데스트탑(PC) : 마우스 터치 스와이프 / 마우스 드래그 앤 드롭
            $s1SlideContainer.on({
                mousedown(e){
                    clearInterval(setId);
                    winW = $(window).innerWidth(); //반응형 창너비 구하라
                    touchStart = e.clientX;
                    dragStart = e.clientX - $s1SlideWrap.offset().left-winW ; //터치시작위치 + 슬라이드좌측 좌표값
                    // 드래그 시작
                    mouseDown = true;  //  마우스가 다운이면 드래그 이동 mousemove 가능
                },
                mouseup(e){                                       
                    touchEnd = e.clientX;
                    if( touchStart-touchEnd > 0){
                        nextCount();
                    }
                    if( touchStart-touchEnd < 0){
                        prevCount();
                    }

                    // 드래그앤 드롭 이동 mousemove 이멘트를 종료
                    mouseDown = false; 
                },
                mouseleave(e){ //마우스업 이벤트를 수행하지 못하는 싯점(컨테이너박스 떠나는 싯점)                                       
                    return touchEnd = e.clientX;
                    autoTimer();
                    // 드래그앤 드롭 이동 mousemove 이멘트를 종료
                    mouseDown = false; 
                },
                mousemove(e){ // 드래그 
                    // 반드시 마우스가 다운 상태에서만 드래그 앤 드롭의 이동 이벤트 동작
                    if(mouseDown===false) {return;}
                    dragEnd = e.clientX; // 드래그 이동 
                    // console.log('드래그 이동 이벤트 ', e.clientX );
                    // console.log('드래그 이동 거리 ', dragEnd-dragStart  );
                    $s1SlideWrap.css({ left: dragEnd-dragStart })
                    
                }
            });
            
            // 마우스 사용을 못하니까 손가락으로  터치 앤 스와이프 / 드래그 앤 드롭
            // 태블릿 & 모바일 : 핑거 터치 스와이프 / 핑거 드래그 앤 드롭
            // touchstart / touchend / touchmove
            $s1SlideContainer.on({
                touchstart(e){

                    // console.log('터치스타트 touchstart');
                    // console.log('터치스타트 touchstart', e );
                    // console.log('터치스타트 touchstart', e.originalEvent.changedTouches[0].clientX);

                    clearInterval(setId);
                    winW = $(window).innerWidth(); //반응형 창너비 구하라
                    touchStart = e.originalEvent.changedTouches[0].clientX;
                    dragStart = e.originalEvent.changedTouches[0].clientX - $s1SlideWrap.offset().left-winW ; //터치시작위치 + 슬라이드좌측 좌표값
                    // 드래그 시작
                    mouseDown = true;  //  마우스가 다운이면 드래그 이동 mousemove 가능
                },
                touchend(e){   
                    // console.log('터치앤드 touchend');                                    
                    touchEnd = e.originalEvent.changedTouches[0].clientX;
                    if( touchStart-touchEnd > 0){
                        nextCount();
                    }
                    if( touchStart-touchEnd < 0){
                        prevCount();
                    }

                    // 드래그앤 드롭 이동 mousemove 이멘트를 종료
                    mouseDown = false; 
                },
                touchmove(e){ // 드래그 
                    // console.log('터치무브 touchmove');       
                    // 반드시 마우스가 다운 상태에서만 드래그 앤 드롭의 이동 이벤트 동작
                    if(mouseDown===false) {return;}
                    dragEnd = e.originalEvent.changedTouches[0].clientX; // 드래그 이동 
                    // console.log('드래그 이동 이벤트 ', e.clientX );
                    // console.log('드래그 이동 거리 ', dragEnd-dragStart  );
                    $s1SlideWrap.css({ left: dragEnd-dragStart })                    
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

        }

    }

    Kurly.init();




})(jQuery, window, document);