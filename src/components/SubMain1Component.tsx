import React from 'react';


// 부모컴포넌트에서  WrapComponent에서
// 1. 타입스크립트 설정하고
// 2. 상태관리에 등록하고
// 3. 프롭스로 내려받는다,
// 4. json데이터를 axios로 가져오기
function SubMain1Component({신상품}: any){

    // 서브 메인1이 로딩시 실행 =>  React.useEffect(); 훅(Hook) 사용
    // 제이쿼리 구현 되어야 body 요소에 스크립트를 바인딩하여 ajax가  실행되도록한다.
    // <script type="text/babel" src="./js/new_product.js"></script>
    // <script type="text/babel" src="./js/category.js"></script>
    // 매개변수 활용하여 두개의 제이쿼리 스크립트를 생성 실행한다.
    const createScriptFn=(imgSrc: any)=>{ // 파라미터(매개변수)
        const scriptTag = document.createElement('script'); // 웹 문서 안에 스크립트 태그요소 만들기
        scriptTag.src = imgSrc;      // 만들어진 태그요소에 타입 속성과 소스 속성 넣기                
        document.body.appendChild( scriptTag );  // 만들어진 태그요소를 본문 body 자식요소로 붙이기
    }

    
    // 정규표현식 콤머형식 만들기
    // 반드시 숫자를 스트링(문자열)로 변환해서 사용 : 형변환 
    const commaRegExp=(z: any)=>{
        let str: string = z.toString();
        const regExp = /(^\d+)(\d{3})/;
        while( regExp.test(str) ){
            str = str.replace(regExp, '$1,$2');
        }
        // 결과를 되돌려 주라 호출한 위치에 리턴 해준다.
        return str;  //콤머형식 변환된 스트링 되돌려 준다.
    }

    React.useEffect(()=>{ // 함수에 아규먼트 전달해서 두개의 스크립트 생성 실행
        createScriptFn("./js/category.js"); // 아규먼트(전달인자)
        // createScriptFn("./js/new_product.js");
        // axios({}).then(성공메시지콜백함수).catch(실패메시지함수);
    },[]);


    return(
        <main id='main' className='main1'>
            <section id="section1">
                <div className="container">
                    <div className="gap">
                        <div className="title hide">
                            <h2>이주의 신상 랭킹</h2>
                        </div>
                        <div className="content">
                            <a href="!#"><img src="./img/sub_main1/QwAyaGZHzmHErgidNg01maHWb2l07ie67fE0Pa9d.jpg" alt="" /></a>
                        </div>
                    </div>
                </div>
            </section>
            <section id="section2">
                <div className="container">
                    <div className="gap">
                        <div className="title">
                            <h2>신상품</h2>
                        </div>
                        <div className="content">
                            <div className="left">
                                <div className="title-filter">
                                    <span>필터</span>
                                    <span>최기화</span>
                                </div>
                                <div className="col-gap">
                                    <div className="wrap">
    
                                        {/* <!-- 카테고리 메뉴 --> */}
                                        <ul className='category'>
                                            <li>
                                                <a href="!#" className='category-btn'>카테고리 <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="#999"><path d="M5 11L9 7L13 11" stroke="#999" strokeWidth="1.2"></path></svg></a>
                                                <div className='catagory-sub catagory-sub1'>
                                                    <ul>
                                                        <li><label><input type="checkbox" id='category1-01' name='category1-01' className='category1-sub-bnt' value='국·반찬·메인요리'/><svg width="18" height="18" viewBox="0 0 24 24"  xmlns="http://www.w3.org/2000/svg"><path d="M23.5 12C23.5 18.3513 18.3513 23.5 12 23.5C5.64873 23.5 0.5 18.3513 0.5 12C0.5 5.64873 5.64873 0.5 12 0.5C18.3513 0.5 23.5 5.64873 23.5 12Z" ></path><path d="M7 12.6667L10.3846 16L18 8.5"  strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path></svg>국·반찬·메인요리</label></li>
                                                        <li><label><input type="checkbox" id='category1-02' name='category1-02' className='category1-sub-bnt' value='샐러드·간편식'/><svg width="18" height="18" viewBox="0 0 24 24"  xmlns="http://www.w3.org/2000/svg"><path d="M23.5 12C23.5 18.3513 18.3513 23.5 12 23.5C5.64873 23.5 0.5 18.3513 0.5 12C0.5 5.64873 5.64873 0.5 12 0.5C18.3513 0.5 23.5 5.64873 23.5 12Z" ></path><path d="M7 12.6667L10.3846 16L18 8.5"  strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path></svg>샐러드·간편식</label></li>
                                                        <li><label><input type="checkbox" id='category1-03' name='category1-03' className='category1-sub-bnt' value='생활용품·리빙·캠핑'/><svg width="18" height="18" viewBox="0 0 24 24"  xmlns="http://www.w3.org/2000/svg"><path d="M23.5 12C23.5 18.3513 18.3513 23.5 12 23.5C5.64873 23.5 0.5 18.3513 0.5 12C0.5 5.64873 5.64873 0.5 12 0.5C18.3513 0.5 23.5 5.64873 23.5 12Z" ></path><path d="M7 12.6667L10.3846 16L18 8.5"  strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path></svg>생활용품·리빙·캠핑</label></li>
                                                        <li><label><input type="checkbox" id='category1-04' name='category1-04' className='category1-sub-bnt' value='간식·과자·떡'/><svg width="18" height="18" viewBox="0 0 24 24"  xmlns="http://www.w3.org/2000/svg"><path d="M23.5 12C23.5 18.3513 18.3513 23.5 12 23.5C5.64873 23.5 0.5 18.3513 0.5 12C0.5 5.64873 5.64873 0.5 12 0.5C18.3513 0.5 23.5 5.64873 23.5 12Z" ></path><path d="M7 12.6667L10.3846 16L18 8.5"  strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path></svg>간식·과자·떡</label></li>
                                                        <li><label><input type="checkbox" id='category1-05' name='category1-05' className='category1-sub-bnt' value='베이비·키즈·완구'/><svg width="18" height="18" viewBox="0 0 24 24"  xmlns="http://www.w3.org/2000/svg"><path d="M23.5 12C23.5 18.3513 18.3513 23.5 12 23.5C5.64873 23.5 0.5 18.3513 0.5 12C0.5 5.64873 5.64873 0.5 12 0.5C18.3513 0.5 23.5 5.64873 23.5 12Z" ></path><path d="M7 12.6667L10.3846 16L18 8.5"  strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path></svg>베이비·키즈·완구</label></li>
                                                        <li><label><input type="checkbox" id='category1-06' name='category1-06' className='category1-sub-bnt' value='베이커리·치즈·델리'/><svg width="18" height="18" viewBox="0 0 24 24"  xmlns="http://www.w3.org/2000/svg"><path d="M23.5 12C23.5 18.3513 18.3513 23.5 12 23.5C5.64873 23.5 0.5 18.3513 0.5 12C0.5 5.64873 5.64873 0.5 12 0.5C18.3513 0.5 23.5 5.64873 23.5 12Z" ></path><path d="M7 12.6667L10.3846 16L18 8.5"  strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path></svg>베이커리·치즈·델리</label></li>
                                                        <li><label><input type="checkbox" id='category1-07' name='category1-07' className='category1-sub-bnt' value='면·양념·오일'/><svg width="18" height="18" viewBox="0 0 24 24"  xmlns="http://www.w3.org/2000/svg"><path d="M23.5 12C23.5 18.3513 18.3513 23.5 12 23.5C5.64873 23.5 0.5 18.3513 0.5 12C0.5 5.64873 5.64873 0.5 12 0.5C18.3513 0.5 23.5 5.64873 23.5 12Z" ></path><path d="M7 12.6667L10.3846 16L18 8.5"  strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path></svg>면·양념·오일</label></li>
                                                        <li><label><input type="checkbox" id='category1-08' name='category1-08' className='category1-sub-bnt' value='생수·음료·우유·커피'/><svg width="18" height="18" viewBox="0 0 24 24"  xmlns="http://www.w3.org/2000/svg"><path d="M23.5 12C23.5 18.3513 18.3513 23.5 12 23.5C5.64873 23.5 0.5 18.3513 0.5 12C0.5 5.64873 5.64873 0.5 12 0.5C18.3513 0.5 23.5 5.64873 23.5 12Z" ></path><path d="M7 12.6667L10.3846 16L18 8.5"  strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path></svg>생수·음료·우유·커피</label></li>
                                                        <li><label><input type="checkbox" id='category1-09' name='category1-09' className='category1-sub-bnt' value='헤어·바디·구강'/><svg width="18" height="18" viewBox="0 0 24 24"  xmlns="http://www.w3.org/2000/svg"><path d="M23.5 12C23.5 18.3513 18.3513 23.5 12 23.5C5.64873 23.5 0.5 18.3513 0.5 12C0.5 5.64873 5.64873 0.5 12 0.5C18.3513 0.5 23.5 5.64873 23.5 12Z" ></path><path d="M7 12.6667L10.3846 16L18 8.5"  strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path></svg>헤어·바디·구강</label></li>
                                                        <li><label><input type="checkbox" id='category1-10' name='category1-10' className='category1-sub-bnt' value='국·반찬·메인요리'/><svg width="18" height="18" viewBox="0 0 24 24"  xmlns="http://www.w3.org/2000/svg"><path d="M23.5 12C23.5 18.3513 18.3513 23.5 12 23.5C5.64873 23.5 0.5 18.3513 0.5 12C0.5 5.64873 5.64873 0.5 12 0.5C18.3513 0.5 23.5 5.64873 23.5 12Z" ></path><path d="M7 12.6667L10.3846 16L18 8.5"  strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path></svg>국·반찬·메인요리</label></li>
                                                        <li><button className='category1-more-view-btn'>카테고리 더보기<svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="#999" xmlns="http://www.w3.org/2000/svg" className="css-jbgpyq e1frj59j0"><path d="M5 11L9 7L13 11" stroke="#999" strokeWidth="1.2"></path></svg></button></li>
                                                    </ul>
                                                </div>
                                            </li>
                                            <li>
                                                <a href="!#" className='category-btn'>브랜드 <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="#999"><path d="M5 11L9 7L13 11" stroke="#999" strokeWidth="1.2"></path></svg></a>
                                                <div className='catagory-sub catagory-sub2'>
                                                    <ul>
                                                        <li><label><input type="checkbox" id='category2-01' name='category2-01' className='category2-sub-bnt' value='국·반찬·메인요리'/><svg width="18" height="18" viewBox="0 0 24 24"  xmlns="http://www.w3.org/2000/svg"><path d="M23.5 12C23.5 18.3513 18.3513 23.5 12 23.5C5.64873 23.5 0.5 18.3513 0.5 12C0.5 5.64873 5.64873 0.5 12 0.5C18.3513 0.5 23.5 5.64873 23.5 12Z" ></path><path d="M7 12.6667L10.3846 16L18 8.5"  strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path></svg>국·반찬·메인요리</label></li>
                                                        <li><label><input type="checkbox" id='category2-02' name='category2-02' className='category2-sub-bnt' value='샐러드·간편식'/><svg width="18" height="18" viewBox="0 0 24 24"  xmlns="http://www.w3.org/2000/svg"><path d="M23.5 12C23.5 18.3513 18.3513 23.5 12 23.5C5.64873 23.5 0.5 18.3513 0.5 12C0.5 5.64873 5.64873 0.5 12 0.5C18.3513 0.5 23.5 5.64873 23.5 12Z" ></path><path d="M7 12.6667L10.3846 16L18 8.5"  strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path></svg>샐러드·간편식</label></li>
                                                        <li><label><input type="checkbox" id='category2-03' name='category2-03' className='category2-sub-bnt' value='생활용품·리빙·캠핑'/><svg width="18" height="18" viewBox="0 0 24 24"  xmlns="http://www.w3.org/2000/svg"><path d="M23.5 12C23.5 18.3513 18.3513 23.5 12 23.5C5.64873 23.5 0.5 18.3513 0.5 12C0.5 5.64873 5.64873 0.5 12 0.5C18.3513 0.5 23.5 5.64873 23.5 12Z" ></path><path d="M7 12.6667L10.3846 16L18 8.5"  strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path></svg>생활용품·리빙·캠핑</label></li>
                                                        <li><label><input type="checkbox" id='category2-04' name='category2-04' className='category2-sub-bnt' value='간식·과자·떡'/><svg width="18" height="18" viewBox="0 0 24 24"  xmlns="http://www.w3.org/2000/svg"><path d="M23.5 12C23.5 18.3513 18.3513 23.5 12 23.5C5.64873 23.5 0.5 18.3513 0.5 12C0.5 5.64873 5.64873 0.5 12 0.5C18.3513 0.5 23.5 5.64873 23.5 12Z" ></path><path d="M7 12.6667L10.3846 16L18 8.5"  strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path></svg>간식·과자·떡</label></li>
                                                        <li><label><input type="checkbox" id='category2-05' name='category2-05' className='category2-sub-bnt' value='베이비·키즈·완구'/><svg width="18" height="18" viewBox="0 0 24 24"  xmlns="http://www.w3.org/2000/svg"><path d="M23.5 12C23.5 18.3513 18.3513 23.5 12 23.5C5.64873 23.5 0.5 18.3513 0.5 12C0.5 5.64873 5.64873 0.5 12 0.5C18.3513 0.5 23.5 5.64873 23.5 12Z" ></path><path d="M7 12.6667L10.3846 16L18 8.5"  strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path></svg>베이비·키즈·완구</label></li>
                                                        <li><label><input type="checkbox" id='category2-06' name='category2-06' className='category2-sub-bnt' value='베이커리·치즈·델리'/><svg width="18" height="18" viewBox="0 0 24 24"  xmlns="http://www.w3.org/2000/svg"><path d="M23.5 12C23.5 18.3513 18.3513 23.5 12 23.5C5.64873 23.5 0.5 18.3513 0.5 12C0.5 5.64873 5.64873 0.5 12 0.5C18.3513 0.5 23.5 5.64873 23.5 12Z" ></path><path d="M7 12.6667L10.3846 16L18 8.5"  strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path></svg>베이커리·치즈·델리</label></li>
                                                        <li><label><input type="checkbox" id='category2-07' name='category2-07' className='category2-sub-bnt' value='면·양념·오일'/><svg width="18" height="18" viewBox="0 0 24 24"  xmlns="http://www.w3.org/2000/svg"><path d="M23.5 12C23.5 18.3513 18.3513 23.5 12 23.5C5.64873 23.5 0.5 18.3513 0.5 12C0.5 5.64873 5.64873 0.5 12 0.5C18.3513 0.5 23.5 5.64873 23.5 12Z" ></path><path d="M7 12.6667L10.3846 16L18 8.5"  strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path></svg>면·양념·오일</label></li>
                                                        <li><label><input type="checkbox" id='category2-08' name='category2-08' className='category2-sub-bnt' value='생수·음료·우유·커피'/><svg width="18" height="18" viewBox="0 0 24 24"  xmlns="http://www.w3.org/2000/svg"><path d="M23.5 12C23.5 18.3513 18.3513 23.5 12 23.5C5.64873 23.5 0.5 18.3513 0.5 12C0.5 5.64873 5.64873 0.5 12 0.5C18.3513 0.5 23.5 5.64873 23.5 12Z" ></path><path d="M7 12.6667L10.3846 16L18 8.5"  strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path></svg>생수·음료·우유·커피</label></li>
                                                        <li><label><input type="checkbox" id='category2-09' name='category2-09' className='category2-sub-bnt' value='헤어·바디·구강'/><svg width="18" height="18" viewBox="0 0 24 24"  xmlns="http://www.w3.org/2000/svg"><path d="M23.5 12C23.5 18.3513 18.3513 23.5 12 23.5C5.64873 23.5 0.5 18.3513 0.5 12C0.5 5.64873 5.64873 0.5 12 0.5C18.3513 0.5 23.5 5.64873 23.5 12Z" ></path><path d="M7 12.6667L10.3846 16L18 8.5"  strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path></svg>헤어·바디·구강</label></li>
                                                        <li><label><input type="checkbox" id='category2-10' name='category2-10' className='category2-sub-bnt' value='국·반찬·메인요리'/><svg width="18" height="18" viewBox="0 0 24 24"  xmlns="http://www.w3.org/2000/svg"><path d="M23.5 12C23.5 18.3513 18.3513 23.5 12 23.5C5.64873 23.5 0.5 18.3513 0.5 12C0.5 5.64873 5.64873 0.5 12 0.5C18.3513 0.5 23.5 5.64873 23.5 12Z" ></path><path d="M7 12.6667L10.3846 16L18 8.5"  strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path></svg>국·반찬·메인요리</label></li>
                                                        <li><button className='category2-more-view-btn'>카테고리 더보기<svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="#999" xmlns="http://www.w3.org/2000/svg" className="css-jbgpyq e1frj59j0"><path d="M5 11L9 7L13 11" stroke="#999" strokeWidth="1.2"></path></svg></button></li>
                                                    </ul>
                                                </div>                                            
                                            </li>
                                            <li>
                                                <a href="!#" className='category-btn'>가격 <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="#999"><path d="M5 11L9 7L13 11" stroke="#999" strokeWidth="1.2"></path></svg></a>
                                                <div className='catagory-sub catagory-sub3'>
                                                    <ul>
                                                        <li><label><input type="checkbox" id='category3-01' name='category3-01' className='category3-sub-bnt' value='국·반찬·메인요리'/><svg width="18" height="18" viewBox="0 0 24 24"  xmlns="http://www.w3.org/2000/svg"><path d="M23.5 12C23.5 18.3513 18.3513 23.5 12 23.5C5.64873 23.5 0.5 18.3513 0.5 12C0.5 5.64873 5.64873 0.5 12 0.5C18.3513 0.5 23.5 5.64873 23.5 12Z" ></path><path d="M7 12.6667L10.3846 16L18 8.5"  strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path></svg>국·반찬·메인요리</label></li>
                                                        <li><label><input type="checkbox" id='category3-02' name='category3-02' className='category3-sub-bnt' value='샐러드·간편식'/><svg width="18" height="18" viewBox="0 0 24 24"  xmlns="http://www.w3.org/2000/svg"><path d="M23.5 12C23.5 18.3513 18.3513 23.5 12 23.5C5.64873 23.5 0.5 18.3513 0.5 12C0.5 5.64873 5.64873 0.5 12 0.5C18.3513 0.5 23.5 5.64873 23.5 12Z" ></path><path d="M7 12.6667L10.3846 16L18 8.5"  strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path></svg>샐러드·간편식</label></li>
                                                        <li><label><input type="checkbox" id='category3-03' name='category3-03' className='category3-sub-bnt' value='생활용품·리빙·캠핑'/><svg width="18" height="18" viewBox="0 0 24 24"  xmlns="http://www.w3.org/2000/svg"><path d="M23.5 12C23.5 18.3513 18.3513 23.5 12 23.5C5.64873 23.5 0.5 18.3513 0.5 12C0.5 5.64873 5.64873 0.5 12 0.5C18.3513 0.5 23.5 5.64873 23.5 12Z" ></path><path d="M7 12.6667L10.3846 16L18 8.5"  strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path></svg>생활용품·리빙·캠핑</label></li>
                                                        <li><label><input type="checkbox" id='category3-04' name='category3-04' className='category3-sub-bnt' value='간식·과자·떡'/><svg width="18" height="18" viewBox="0 0 24 24"  xmlns="http://www.w3.org/2000/svg"><path d="M23.5 12C23.5 18.3513 18.3513 23.5 12 23.5C5.64873 23.5 0.5 18.3513 0.5 12C0.5 5.64873 5.64873 0.5 12 0.5C18.3513 0.5 23.5 5.64873 23.5 12Z" ></path><path d="M7 12.6667L10.3846 16L18 8.5"  strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path></svg>간식·과자·떡</label></li>
                                                        <li><label><input type="checkbox" id='category3-05' name='category3-05' className='category3-sub-bnt' value='베이비·키즈·완구'/><svg width="18" height="18" viewBox="0 0 24 24"  xmlns="http://www.w3.org/2000/svg"><path d="M23.5 12C23.5 18.3513 18.3513 23.5 12 23.5C5.64873 23.5 0.5 18.3513 0.5 12C0.5 5.64873 5.64873 0.5 12 0.5C18.3513 0.5 23.5 5.64873 23.5 12Z" ></path><path d="M7 12.6667L10.3846 16L18 8.5"  strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path></svg>베이비·키즈·완구</label></li>
                                                        <li><label><input type="checkbox" id='category3-06' name='category3-06' className='category3-sub-bnt' value='베이커리·치즈·델리'/><svg width="18" height="18" viewBox="0 0 24 24"  xmlns="http://www.w3.org/2000/svg"><path d="M23.5 12C23.5 18.3513 18.3513 23.5 12 23.5C5.64873 23.5 0.5 18.3513 0.5 12C0.5 5.64873 5.64873 0.5 12 0.5C18.3513 0.5 23.5 5.64873 23.5 12Z" ></path><path d="M7 12.6667L10.3846 16L18 8.5"  strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path></svg>베이커리·치즈·델리</label></li>
                                                        <li><label><input type="checkbox" id='category3-07' name='category3-07' className='category3-sub-bnt' value='면·양념·오일'/><svg width="18" height="18" viewBox="0 0 24 24"  xmlns="http://www.w3.org/2000/svg"><path d="M23.5 12C23.5 18.3513 18.3513 23.5 12 23.5C5.64873 23.5 0.5 18.3513 0.5 12C0.5 5.64873 5.64873 0.5 12 0.5C18.3513 0.5 23.5 5.64873 23.5 12Z" ></path><path d="M7 12.6667L10.3846 16L18 8.5"  strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path></svg>면·양념·오일</label></li>
                                                        <li><label><input type="checkbox" id='category3-08' name='category3-08' className='category3-sub-bnt' value='생수·음료·우유·커피'/><svg width="18" height="18" viewBox="0 0 24 24"  xmlns="http://www.w3.org/2000/svg"><path d="M23.5 12C23.5 18.3513 18.3513 23.5 12 23.5C5.64873 23.5 0.5 18.3513 0.5 12C0.5 5.64873 5.64873 0.5 12 0.5C18.3513 0.5 23.5 5.64873 23.5 12Z" ></path><path d="M7 12.6667L10.3846 16L18 8.5"  strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path></svg>생수·음료·우유·커피</label></li>
                                                        <li><label><input type="checkbox" id='category3-09' name='category3-09' className='category3-sub-bnt' value='헤어·바디·구강'/><svg width="18" height="18" viewBox="0 0 24 24"  xmlns="http://www.w3.org/2000/svg"><path d="M23.5 12C23.5 18.3513 18.3513 23.5 12 23.5C5.64873 23.5 0.5 18.3513 0.5 12C0.5 5.64873 5.64873 0.5 12 0.5C18.3513 0.5 23.5 5.64873 23.5 12Z" ></path><path d="M7 12.6667L10.3846 16L18 8.5"  strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path></svg>헤어·바디·구강</label></li>
                                                        <li><label><input type="checkbox" id='category3-10' name='category3-10' className='category3-sub-bnt' value='국·반찬·메인요리'/><svg width="18" height="18" viewBox="0 0 24 24"  xmlns="http://www.w3.org/2000/svg"><path d="M23.5 12C23.5 18.3513 18.3513 23.5 12 23.5C5.64873 23.5 0.5 18.3513 0.5 12C0.5 5.64873 5.64873 0.5 12 0.5C18.3513 0.5 23.5 5.64873 23.5 12Z" ></path><path d="M7 12.6667L10.3846 16L18 8.5"  strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path></svg>국·반찬·메인요리</label></li>
                                                        <li><button className='category3-more-view-btn'>카테고리 더보기<svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="#999" xmlns="http://www.w3.org/2000/svg" className="css-jbgpyq e1frj59j0"><path d="M5 11L9 7L13 11" stroke="#999" strokeWidth="1.2"></path></svg></button></li>
                                                    </ul>
                                                </div>                                            
                                            </li>
                                            <li>
                                                <a href="!#" className='category-btn'>헤택 <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="#999"><path d="M5 11L9 7L13 11" stroke="#999" strokeWidth="1.2"></path></svg></a>
                                                <div className='catagory-sub catagory-sub4'>
                                                    <ul>
                                                        <li><label><input type="checkbox" id='category4-01' name='category4-01' className='category4-sub-bnt' value='국·반찬·메인요리'/><svg width="18" height="18" viewBox="0 0 24 24"  xmlns="http://www.w3.org/2000/svg"><path d="M23.5 12C23.5 18.3513 18.3513 23.5 12 23.5C5.64873 23.5 0.5 18.3513 0.5 12C0.5 5.64873 5.64873 0.5 12 0.5C18.3513 0.5 23.5 5.64873 23.5 12Z" ></path><path d="M7 12.6667L10.3846 16L18 8.5"  strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path></svg>국·반찬·메인요리</label></li>
                                                        <li><label><input type="checkbox" id='category4-02' name='category4-02' className='category4-sub-bnt' value='샐러드·간편식'/><svg width="18" height="18" viewBox="0 0 24 24"  xmlns="http://www.w3.org/2000/svg"><path d="M23.5 12C23.5 18.3513 18.3513 23.5 12 23.5C5.64873 23.5 0.5 18.3513 0.5 12C0.5 5.64873 5.64873 0.5 12 0.5C18.3513 0.5 23.5 5.64873 23.5 12Z" ></path><path d="M7 12.6667L10.3846 16L18 8.5"  strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path></svg>샐러드·간편식</label></li>
                                                        <li><label><input type="checkbox" id='category4-03' name='category4-03' className='category4-sub-bnt' value='생활용품·리빙·캠핑'/><svg width="18" height="18" viewBox="0 0 24 24"  xmlns="http://www.w3.org/2000/svg"><path d="M23.5 12C23.5 18.3513 18.3513 23.5 12 23.5C5.64873 23.5 0.5 18.3513 0.5 12C0.5 5.64873 5.64873 0.5 12 0.5C18.3513 0.5 23.5 5.64873 23.5 12Z" ></path><path d="M7 12.6667L10.3846 16L18 8.5"  strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path></svg>생활용품·리빙·캠핑</label></li>
                                                        <li><label><input type="checkbox" id='category4-04' name='category4-04' className='category4-sub-bnt' value='간식·과자·떡'/><svg width="18" height="18" viewBox="0 0 24 24"  xmlns="http://www.w3.org/2000/svg"><path d="M23.5 12C23.5 18.3513 18.3513 23.5 12 23.5C5.64873 23.5 0.5 18.3513 0.5 12C0.5 5.64873 5.64873 0.5 12 0.5C18.3513 0.5 23.5 5.64873 23.5 12Z" ></path><path d="M7 12.6667L10.3846 16L18 8.5"  strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path></svg>간식·과자·떡</label></li>
                                                        <li><label><input type="checkbox" id='category4-05' name='category4-05' className='category4-sub-bnt' value='베이비·키즈·완구'/><svg width="18" height="18" viewBox="0 0 24 24"  xmlns="http://www.w3.org/2000/svg"><path d="M23.5 12C23.5 18.3513 18.3513 23.5 12 23.5C5.64873 23.5 0.5 18.3513 0.5 12C0.5 5.64873 5.64873 0.5 12 0.5C18.3513 0.5 23.5 5.64873 23.5 12Z" ></path><path d="M7 12.6667L10.3846 16L18 8.5"  strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path></svg>베이비·키즈·완구</label></li>
                                                        <li><label><input type="checkbox" id='category4-06' name='category4-06' className='category4-sub-bnt' value='베이커리·치즈·델리'/><svg width="18" height="18" viewBox="0 0 24 24"  xmlns="http://www.w3.org/2000/svg"><path d="M23.5 12C23.5 18.3513 18.3513 23.5 12 23.5C5.64873 23.5 0.5 18.3513 0.5 12C0.5 5.64873 5.64873 0.5 12 0.5C18.3513 0.5 23.5 5.64873 23.5 12Z" ></path><path d="M7 12.6667L10.3846 16L18 8.5"  strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path></svg>베이커리·치즈·델리</label></li>
                                                        <li><label><input type="checkbox" id='category4-07' name='category4-07' className='category4-sub-bnt' value='면·양념·오일'/><svg width="18" height="18" viewBox="0 0 24 24"  xmlns="http://www.w3.org/2000/svg"><path d="M23.5 12C23.5 18.3513 18.3513 23.5 12 23.5C5.64873 23.5 0.5 18.3513 0.5 12C0.5 5.64873 5.64873 0.5 12 0.5C18.3513 0.5 23.5 5.64873 23.5 12Z" ></path><path d="M7 12.6667L10.3846 16L18 8.5"  strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path></svg>면·양념·오일</label></li>
                                                        <li><label><input type="checkbox" id='category4-08' name='category4-08' className='category4-sub-bnt' value='생수·음료·우유·커피'/><svg width="18" height="18" viewBox="0 0 24 24"  xmlns="http://www.w3.org/2000/svg"><path d="M23.5 12C23.5 18.3513 18.3513 23.5 12 23.5C5.64873 23.5 0.5 18.3513 0.5 12C0.5 5.64873 5.64873 0.5 12 0.5C18.3513 0.5 23.5 5.64873 23.5 12Z" ></path><path d="M7 12.6667L10.3846 16L18 8.5"  strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path></svg>생수·음료·우유·커피</label></li>
                                                        <li><label><input type="checkbox" id='category4-09' name='category4-09' className='category4-sub-bnt' value='헤어·바디·구강'/><svg width="18" height="18" viewBox="0 0 24 24"  xmlns="http://www.w3.org/2000/svg"><path d="M23.5 12C23.5 18.3513 18.3513 23.5 12 23.5C5.64873 23.5 0.5 18.3513 0.5 12C0.5 5.64873 5.64873 0.5 12 0.5C18.3513 0.5 23.5 5.64873 23.5 12Z" ></path><path d="M7 12.6667L10.3846 16L18 8.5"  strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path></svg>헤어·바디·구강</label></li>
                                                        <li><label><input type="checkbox" id='category4-10' name='category4-10' className='category4-sub-bnt' value='국·반찬·메인요리'/><svg width="18" height="18" viewBox="0 0 24 24"  xmlns="http://www.w3.org/2000/svg"><path d="M23.5 12C23.5 18.3513 18.3513 23.5 12 23.5C5.64873 23.5 0.5 18.3513 0.5 12C0.5 5.64873 5.64873 0.5 12 0.5C18.3513 0.5 23.5 5.64873 23.5 12Z" ></path><path d="M7 12.6667L10.3846 16L18 8.5"  strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path></svg>국·반찬·메인요리</label></li>
                                                        <li><button className='category4-more-view-btn'>카테고리 더보기<svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="#999" xmlns="http://www.w3.org/2000/svg" className="css-jbgpyq e1frj59j0"><path d="M5 11L9 7L13 11" stroke="#999" strokeWidth="1.2"></path></svg></button></li>
                                                    </ul>
                                                </div>                                            
                                            </li>
                                            <li>
                                                <a href="!#" className='category-btn'>유형 <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="#999"><path d="M5 11L9 7L13 11" stroke="#999" strokeWidth="1.2"></path></svg></a>
                                                <div className='catagory-sub catagory-sub5'>
                                                    <ul>
                                                        <li><label><input type="checkbox" id='category5-01' name='category5-01' className='category5-sub-bnt' value='국·반찬·메인요리'/><svg width="18" height="18" viewBox="0 0 24 24"  xmlns="http://www.w3.org/2000/svg"><path d="M23.5 12C23.5 18.3513 18.3513 23.5 12 23.5C5.64873 23.5 0.5 18.3513 0.5 12C0.5 5.64873 5.64873 0.5 12 0.5C18.3513 0.5 23.5 5.64873 23.5 12Z" ></path><path d="M7 12.6667L10.3846 16L18 8.5"  strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path></svg>국·반찬·메인요리</label></li>
                                                        <li><label><input type="checkbox" id='category5-02' name='category5-02' className='category5-sub-bnt' value='샐러드·간편식'/><svg width="18" height="18" viewBox="0 0 24 24"  xmlns="http://www.w3.org/2000/svg"><path d="M23.5 12C23.5 18.3513 18.3513 23.5 12 23.5C5.64873 23.5 0.5 18.3513 0.5 12C0.5 5.64873 5.64873 0.5 12 0.5C18.3513 0.5 23.5 5.64873 23.5 12Z" ></path><path d="M7 12.6667L10.3846 16L18 8.5"  strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path></svg>샐러드·간편식</label></li>
                                                        <li><label><input type="checkbox" id='category5-03' name='category5-03' className='category5-sub-bnt' value='생활용품·리빙·캠핑'/><svg width="18" height="18" viewBox="0 0 24 24"  xmlns="http://www.w3.org/2000/svg"><path d="M23.5 12C23.5 18.3513 18.3513 23.5 12 23.5C5.64873 23.5 0.5 18.3513 0.5 12C0.5 5.64873 5.64873 0.5 12 0.5C18.3513 0.5 23.5 5.64873 23.5 12Z" ></path><path d="M7 12.6667L10.3846 16L18 8.5"  strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path></svg>생활용품·리빙·캠핑</label></li>
                                                        <li><label><input type="checkbox" id='category5-04' name='category5-04' className='category5-sub-bnt' value='간식·과자·떡'/><svg width="18" height="18" viewBox="0 0 24 24"  xmlns="http://www.w3.org/2000/svg"><path d="M23.5 12C23.5 18.3513 18.3513 23.5 12 23.5C5.64873 23.5 0.5 18.3513 0.5 12C0.5 5.64873 5.64873 0.5 12 0.5C18.3513 0.5 23.5 5.64873 23.5 12Z" ></path><path d="M7 12.6667L10.3846 16L18 8.5"  strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path></svg>간식·과자·떡</label></li>
                                                        <li><label><input type="checkbox" id='category5-05' name='category5-05' className='category5-sub-bnt' value='베이비·키즈·완구'/><svg width="18" height="18" viewBox="0 0 24 24"  xmlns="http://www.w3.org/2000/svg"><path d="M23.5 12C23.5 18.3513 18.3513 23.5 12 23.5C5.64873 23.5 0.5 18.3513 0.5 12C0.5 5.64873 5.64873 0.5 12 0.5C18.3513 0.5 23.5 5.64873 23.5 12Z" ></path><path d="M7 12.6667L10.3846 16L18 8.5"  strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path></svg>베이비·키즈·완구</label></li>
                                                        <li><label><input type="checkbox" id='category5-06' name='category5-06' className='category5-sub-bnt' value='베이커리·치즈·델리'/><svg width="18" height="18" viewBox="0 0 24 24"  xmlns="http://www.w3.org/2000/svg"><path d="M23.5 12C23.5 18.3513 18.3513 23.5 12 23.5C5.64873 23.5 0.5 18.3513 0.5 12C0.5 5.64873 5.64873 0.5 12 0.5C18.3513 0.5 23.5 5.64873 23.5 12Z" ></path><path d="M7 12.6667L10.3846 16L18 8.5"  strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path></svg>베이커리·치즈·델리</label></li>
                                                        <li><label><input type="checkbox" id='category5-07' name='category5-07' className='category5-sub-bnt' value='면·양념·오일'/><svg width="18" height="18" viewBox="0 0 24 24"  xmlns="http://www.w3.org/2000/svg"><path d="M23.5 12C23.5 18.3513 18.3513 23.5 12 23.5C5.64873 23.5 0.5 18.3513 0.5 12C0.5 5.64873 5.64873 0.5 12 0.5C18.3513 0.5 23.5 5.64873 23.5 12Z" ></path><path d="M7 12.6667L10.3846 16L18 8.5"  strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path></svg>면·양념·오일</label></li>
                                                        <li><label><input type="checkbox" id='category5-08' name='category5-08' className='category5-sub-bnt' value='생수·음료·우유·커피'/><svg width="18" height="18" viewBox="0 0 24 24"  xmlns="http://www.w3.org/2000/svg"><path d="M23.5 12C23.5 18.3513 18.3513 23.5 12 23.5C5.64873 23.5 0.5 18.3513 0.5 12C0.5 5.64873 5.64873 0.5 12 0.5C18.3513 0.5 23.5 5.64873 23.5 12Z" ></path><path d="M7 12.6667L10.3846 16L18 8.5"  strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path></svg>생수·음료·우유·커피</label></li>
                                                        <li><label><input type="checkbox" id='category5-09' name='category5-09' className='category5-sub-bnt' value='헤어·바디·구강'/><svg width="18" height="18" viewBox="0 0 24 24"  xmlns="http://www.w3.org/2000/svg"><path d="M23.5 12C23.5 18.3513 18.3513 23.5 12 23.5C5.64873 23.5 0.5 18.3513 0.5 12C0.5 5.64873 5.64873 0.5 12 0.5C18.3513 0.5 23.5 5.64873 23.5 12Z" ></path><path d="M7 12.6667L10.3846 16L18 8.5"  strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path></svg>헤어·바디·구강</label></li>
                                                        <li><label><input type="checkbox" id='category5-10' name='category5-10' className='category5-sub-bnt' value='국·반찬·메인요리'/><svg width="18" height="18" viewBox="0 0 24 24"  xmlns="http://www.w3.org/2000/svg"><path d="M23.5 12C23.5 18.3513 18.3513 23.5 12 23.5C5.64873 23.5 0.5 18.3513 0.5 12C0.5 5.64873 5.64873 0.5 12 0.5C18.3513 0.5 23.5 5.64873 23.5 12Z" ></path><path d="M7 12.6667L10.3846 16L18 8.5"  strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path></svg>국·반찬·메인요리</label></li>
                                                        <li><button className='category5-more-view-btn'>카테고리 더보기<svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="#999" xmlns="http://www.w3.org/2000/svg" className="css-jbgpyq e1frj59j0"><path d="M5 11L9 7L13 11" stroke="#999" strokeWidth="1.2"></path></svg></button></li>
                                                    </ul>
                                                </div>                                            
                                            </li>
                                            <li>
                                                <a href="!#" className='category-btn'>특정상품제외 <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="#999"><path d="M5 11L9 7L13 11" stroke="#999" strokeWidth="1.2"></path></svg></a>
                                                <div className='catagory-sub catagory-sub6'>
                                                    <ul>
                                                        <li><label><input type="checkbox" id='category6-01' name='category6-01' className='category6-sub-bnt' value='국·반찬·메인요리'/><svg width="18" height="18" viewBox="0 0 24 24"  xmlns="http://www.w3.org/2000/svg"><path d="M23.5 12C23.5 18.3513 18.3513 23.5 12 23.5C5.64873 23.5 0.5 18.3513 0.5 12C0.5 5.64873 5.64873 0.5 12 0.5C18.3513 0.5 23.5 5.64873 23.5 12Z" ></path><path d="M7 12.6667L10.3846 16L18 8.5"  strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path></svg>국·반찬·메인요리</label></li>
                                                        <li><label><input type="checkbox" id='category6-02' name='category6-02' className='category6-sub-bnt' value='샐러드·간편식'/><svg width="18" height="18" viewBox="0 0 24 24"  xmlns="http://www.w3.org/2000/svg"><path d="M23.5 12C23.5 18.3513 18.3513 23.5 12 23.5C5.64873 23.5 0.5 18.3513 0.5 12C0.5 5.64873 5.64873 0.5 12 0.5C18.3513 0.5 23.5 5.64873 23.5 12Z" ></path><path d="M7 12.6667L10.3846 16L18 8.5"  strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path></svg>샐러드·간편식</label></li>
                                                        <li><label><input type="checkbox" id='category6-03' name='category6-03' className='category6-sub-bnt' value='생활용품·리빙·캠핑'/><svg width="18" height="18" viewBox="0 0 24 24"  xmlns="http://www.w3.org/2000/svg"><path d="M23.5 12C23.5 18.3513 18.3513 23.5 12 23.5C5.64873 23.5 0.5 18.3513 0.5 12C0.5 5.64873 5.64873 0.5 12 0.5C18.3513 0.5 23.5 5.64873 23.5 12Z" ></path><path d="M7 12.6667L10.3846 16L18 8.5"  strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path></svg>생활용품·리빙·캠핑</label></li>
                                                        <li><label><input type="checkbox" id='category6-04' name='category6-04' className='category6-sub-bnt' value='간식·과자·떡'/><svg width="18" height="18" viewBox="0 0 24 24"  xmlns="http://www.w3.org/2000/svg"><path d="M23.5 12C23.5 18.3513 18.3513 23.5 12 23.5C5.64873 23.5 0.5 18.3513 0.5 12C0.5 5.64873 5.64873 0.5 12 0.5C18.3513 0.5 23.5 5.64873 23.5 12Z" ></path><path d="M7 12.6667L10.3846 16L18 8.5"  strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path></svg>간식·과자·떡</label></li>
                                                        <li><label><input type="checkbox" id='category6-05' name='category6-05' className='category6-sub-bnt' value='베이비·키즈·완구'/><svg width="18" height="18" viewBox="0 0 24 24"  xmlns="http://www.w3.org/2000/svg"><path d="M23.5 12C23.5 18.3513 18.3513 23.5 12 23.5C5.64873 23.5 0.5 18.3513 0.5 12C0.5 5.64873 5.64873 0.5 12 0.5C18.3513 0.5 23.5 5.64873 23.5 12Z" ></path><path d="M7 12.6667L10.3846 16L18 8.5"  strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path></svg>베이비·키즈·완구</label></li>
                                                        <li><label><input type="checkbox" id='category6-06' name='category6-06' className='category6-sub-bnt' value='베이커리·치즈·델리'/><svg width="18" height="18" viewBox="0 0 24 24"  xmlns="http://www.w3.org/2000/svg"><path d="M23.5 12C23.5 18.3513 18.3513 23.5 12 23.5C5.64873 23.5 0.5 18.3513 0.5 12C0.5 5.64873 5.64873 0.5 12 0.5C18.3513 0.5 23.5 5.64873 23.5 12Z" ></path><path d="M7 12.6667L10.3846 16L18 8.5"  strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path></svg>베이커리·치즈·델리</label></li>
                                                        <li><label><input type="checkbox" id='category6-07' name='category6-07' className='category6-sub-bnt' value='면·양념·오일'/><svg width="18" height="18" viewBox="0 0 24 24"  xmlns="http://www.w3.org/2000/svg"><path d="M23.5 12C23.5 18.3513 18.3513 23.5 12 23.5C5.64873 23.5 0.5 18.3513 0.5 12C0.5 5.64873 5.64873 0.5 12 0.5C18.3513 0.5 23.5 5.64873 23.5 12Z" ></path><path d="M7 12.6667L10.3846 16L18 8.5"  strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path></svg>면·양념·오일</label></li>
                                                        <li><label><input type="checkbox" id='category6-08' name='category6-08' className='category6-sub-bnt' value='생수·음료·우유·커피'/><svg width="18" height="18" viewBox="0 0 24 24"  xmlns="http://www.w3.org/2000/svg"><path d="M23.5 12C23.5 18.3513 18.3513 23.5 12 23.5C5.64873 23.5 0.5 18.3513 0.5 12C0.5 5.64873 5.64873 0.5 12 0.5C18.3513 0.5 23.5 5.64873 23.5 12Z" ></path><path d="M7 12.6667L10.3846 16L18 8.5"  strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path></svg>생수·음료·우유·커피</label></li>
                                                        <li><label><input type="checkbox" id='category6-09' name='category6-09' className='category6-sub-bnt' value='헤어·바디·구강'/><svg width="18" height="18" viewBox="0 0 24 24"  xmlns="http://www.w3.org/2000/svg"><path d="M23.5 12C23.5 18.3513 18.3513 23.5 12 23.5C5.64873 23.5 0.5 18.3513 0.5 12C0.5 5.64873 5.64873 0.5 12 0.5C18.3513 0.5 23.5 5.64873 23.5 12Z" ></path><path d="M7 12.6667L10.3846 16L18 8.5"  strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path></svg>헤어·바디·구강</label></li>
                                                        <li><label><input type="checkbox" id='category6-10' name='category6-10' className='category6-sub-bnt' value='국·반찬·메인요리'/><svg width="18" height="18" viewBox="0 0 24 24"  xmlns="http://www.w3.org/2000/svg"><path d="M23.5 12C23.5 18.3513 18.3513 23.5 12 23.5C5.64873 23.5 0.5 18.3513 0.5 12C0.5 5.64873 5.64873 0.5 12 0.5C18.3513 0.5 23.5 5.64873 23.5 12Z" ></path><path d="M7 12.6667L10.3846 16L18 8.5"  strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path></svg>국·반찬·메인요리</label></li>
                                                        <li><button className='category6-more-view-btn'>카테고리 더보기<svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="#999" xmlns="http://www.w3.org/2000/svg" className="css-jbgpyq e1frj59j0"><path d="M5 11L9 7L13 11" stroke="#999" strokeWidth="1.2"></path></svg></button></li>
                                                    </ul>
                                                </div>                                            
                                            </li>
                                        </ul>
    
                                    </div>
                                </div>
                            </div>
                            <div className="right">                            
                                <div className="order-filter">
                                    <span>
                                        총 866건
                                    </span>
                                    <span>
                                        <a href="!#">추천순</a>
                                        <a href="!#">신상품순</a>
                                        <a href="!#">판매량순</a>
                                        <a href="!#">혜택순</a>
                                        <a href="!#">낮은가격순</a>
                                        <a href="!#">높은가격순</a>
                                    </span>
                                </div>
                                <ul id='newProduct'>
                                  
                                    {/* 하위컴포넌트 생성 구현 */}
                                    {

                                        신상품.map((item: any,idx: any)=>{
                                            return(
                                                <li key={idx}>
                                                    <div className="col-gap">
                                                        <div className="wrap">
                                                            <div className="img-box">
                                                                <img src={`./img/sub_main1/${item.상품이미지}`} alt="" />
                                                                <a href="!#" className='cart-btn'><img src={`./img/sub_main1/${item.카트이미지}`} alt="" /></a>
                                                            </div>
                                                            <div className="caption">
                                                                <h6>{item.배송구분}</h6>
                                                                <h2><strong>[{item.제조사}]</strong> <em>{item.상품명}</em></h2>
                                                                <h3>
                                                                    {
                                                                        item.할인율 > 0 ?  <strong>{Math.round(item.할인율*100)}%</strong> : ''
                                                                    }   
                                                                    <em>{ commaRegExp(Math.round(item.정가*(1-item.할인율))) }</em>                                                                 
                                                                </h3>
                                                                    {
                                                                        item.할인율 > 0 && <h3><s>{commaRegExp(item.정가)}</s></h3>
                                                                    }

                                                                <h5>{item.상품정보}</h5>
                                                                <h4>{item.판매처}</h4>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </li>
                                            )    
                                        })

                                    }
                                        
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    )
}
export default SubMain1Component;



