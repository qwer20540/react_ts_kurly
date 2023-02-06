(($)=>{

    const NewProduct = {
        init(){
            this.mainFn();
        },
        mainFn(){
           let txt = '';

            $.ajax({
                url:'./data/product.json',
                dataType:'JSON',
                success( res ){
                   
                    // 정규표현식 콤머형식 만들기
                    // 반드시 숫자를 스트링(문자열)로 변환해서 사용 : 형변환 
                    function commaRegExp(z){
                        let str = z.toString();
                        const regExp = /(^\d+)(\d{3})/;
                        while( regExp.test(str) ){
                            str = str.replace(regExp, '$1,$2');
                        }
                       // 결과를 되돌려 주라 호출한 위치에 리턴 해준다.
                       return str;  //콤머형식 변환된 스트링 되돌려 준다.
                    }

                    res.신상품.map(function(item,idx){

                        const {상품코드,상품이미지,카트이미지,배송구분,제조사,상품명,할인율,정가,상품정보,판매처} = item;  //비구조화 === 구조 분할 할당

                        txt += `<li data-key=${상품코드}>`;
                        txt += `    <div class="col-gap">`;
                        txt += `        <div class="wrap">`;
                        txt += `            <div class="img-box">`;
                        txt += `                <img src="./img/sub_main1/${상품이미지}" alt="" />`;
                        txt += `                <a href="#" class='cart-btn'><img src="./img/sub_main1/${카트이미지}" alt="" /></a>`;
                        txt += `            </div>`;
                        txt += `            <div class="caption">`;
                        txt += `                <h6>${배송구분}</h6>`;
                        txt += `                <h2><strong>[${제조사}]</strong> <em>${상품명}</em></h2>`;
                        txt += `                <h3>
                                                    ${    
                                                        할인율 > 0 ? `<strong>${Math.round(할인율*100)}%</strong>` : ``   
                                                    }
                                                    <em>${ commaRegExp(Math.round(정가*(1-할인율))) }</em>
                                                </h3>`;
                        // 할인율 > 0 ? (txt += `<h3><s>${정가}</s></h3>`) : '';
                        할인율 > 0 && (txt += `<h3><s>${commaRegExp(정가)}</s></h3>`);
                        
                        // if(할인율 > 0) {
                        // txt += `                <h3><s>${정가}</s></h3>`;
                        // }

                        txt += `                <h5>${상품정보}</h5>`;
                        txt += `                <h4>${판매처}</h4>`;
                        txt += `            </div>`;
                        txt += `        </div>`;
                        txt += `    </div>`;
                        txt += `</li>`;
                    });
                
                    

                    $('#newProduct').append( txt );
                
                
                },
                error( err ){
                    console.log('AJAX 실패! ' + err);
                }
            });

        }
    }
    NewProduct.init();

})(jQuery);