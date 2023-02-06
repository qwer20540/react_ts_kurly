import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';  // 타입 자료형 지정

export default function SignUpComponent({회원, isConfirmModalFn, isTimer}){

    // 포폽스 변수값을 상태관리 변수에 대입
    const [state, setState] = React.useState(회원);

    // 1. 아이디 입력상자 온 체이인지 이벤트
    const onChangeId=(e)=>{

        const regExp1 = /[`~!@#$%^&*()\-_=+\\|\[\]{};:'",<.>/?]/g; // 특수문자
        const regExp2 = /.{6,16}/g;                                // 6자 이상 16자 이하
        const regExp3 = /(?=.*[A-Za-z])+(?=.*[0-9])*/g;            // 영문 혹은 영문과 숫자를 조합
        const regExp4 = /\s/g; 

        let {value} = e.target; // 입력 값 비구조화 
        let 아이디 = ''; //임시 변수
        let is아이디 = false; //임시 변수

        // : 특수문자 입력되면 삭제
        아이디 = value.replace(regExp1,'');

        // 조건문 : or 또는 ~이거나
        if( regExp2.test(아이디)===false || regExp3.test(아이디)===false || regExp4.test(아이디)===true ){
            is아이디 = true;
        }
        else{
            is아이디 = false;
        }

        // 상태 변수 속성 값 변경
        setState({
            ...state, // 전개연산자 모든속성 그리고 아이디만 수정
            아이디: 아이디,
            is아이디: is아이디
        })
    }


    // 2. 아이디 중복확인 버튼 클릭 이벤트  API
    const onClickIdOkBtn=(e)=>{
        e.preventDefault();

        const regExp2 = /.{6,16}/g;                                // 6자 이상 16자 이하
        const regExp3 = /(?=.*[A-Za-z])+(?=.*[0-9])*/g;            // 영문 혹은 영문과 숫자를 조합
        const regExp4 = /\s/g;  
        const thisVal = state.아이디;
        let result = []; 
        let 아이디중복확인 = false;

        if( regExp2.test( thisVal )===false || regExp3.test(thisVal)===false || regExp4.test(thisVal)===true ){                        
            isConfirmModalFn('6자 이상 16자 이하의 영문 혹은 영문과 숫자를 조합');
        }
        else{  

            axios({ // CORS API
                url:'http://moonjong.dothome.co.kr/react_cra_5/member_select.php',
                // url:'http://wognsko94.dothome.co.kr/react_cra5/member_select.php',
                method:'GET'
            })
            .then((res)=>{

                result = res.data.map((item) => item.아이디===state.아이디);
                if( result.includes(true) ){               
                    isConfirmModalFn('사용 불가능한 아이디 입니다');
                    아이디중복확인 = false;
                }
                else{
                    isConfirmModalFn('사용 가능한 아이디 입니다');
                    아이디중복확인 = true;
                }
                
            })
            .catch((err)=>{
                console.log('AXIOS 실패 : ', err );
            });

        }

        setState({
            ...state,
            아이디중복확인: 아이디중복확인
        })


    }


    // 3. 비밀번호 입력상자
    const onChangePw=(e)=>{
        
        const {value} = e.target;
        const regExp1 = /.{10,}/g;                    
        const regExp2 = /((?=.*[A-Za-z]+)(?=.*[0-9]+))|((?=.*[A-Za-z]+)(?=.*[`~!@#$%^&*()\-_=+\\|\[\]{};:'",<.>/?]+))|((?=.*[0-9]+)(?=.*[`~!@#$%^&*()\-_=+\\|\[\]{};:'",<.>/?]+))/g;
        const regExp3 = /\s/g;                    
        const regExp4 = /(\d)\1\1/g; //동일한 숫자 3개 이상 연속 사용 불가
        
        let pwErrMsg = '';
        let isPw = false;

        if( regExp1.test(value)===false ){            
            pwErrMsg = '최소 10자 이상 입력';
            isPw = true;
        }
        else if( regExp2.test(value)===false || regExp3.test(value)===true  ){
            // 영문/숫자/특수문자(공백 제외)만 허용하며, 2개 이상 조합
            pwErrMsg = '영문/숫자/특수문자(공백 제외)만 허용하며, 2개 이상 조합';
            isPw = true;
        }
        else if(regExp4.test(value)===true){
            pwErrMsg = '동일한 글자 3개 이상 연속 사용 불가';
            isPw = true;
        }
        else {
            pwErrMsg = '';
            isPw = false;    
        }

        setState({
            ...state,
            비밀번호: value,
            pwErrMsg: pwErrMsg,
            isPw: isPw
        })

    }


    // 4. 비밀번호 확인 입력상자
    const onChangePwOk=(e)=>{
        const {value} = e.target;
        let pwOkErrMsg = '';
        let isPwOk = false;

        if( state.비밀번호 !== value ){
            pwOkErrMsg = '동일한 비밀번호를 입력';
            isPwOk = true;
        }
        else{
            pwOkErrMsg = '';
            isPwOk = false;
        }

        setState({
            ...state,
            pwOkErrMsg: pwOkErrMsg,
            isPwOk: isPwOk
        })

    }

    // 5. 이름 입력상자
    const onChangeName=(e)=>{
        const {value} = e.target;
        const regExp = /[`~!@#$%^&*()\-_=+\\|\[\]{};:'",<.>/?]/g;
        let 이름 = '';
        let nameErrMsg = '';
        let isName = false;

        이름 =  value.replace(regExp, '');
        if(value===''){
            nameErrMsg = '이름을 입력해 주세요.';
            isName = true;            
        }
        else{
            nameErrMsg = '';
            isName = false;            
        }

        setState({
            ...state,
            이름: 이름,
            nameErrMsg: nameErrMsg,
            isName: isName
        })


    }

    // 6. 이메일 입력상자
    const onChangeEmail=(e)=>{
        const {value} = e.target;
        const regExp1 = /\s/g;
        const regExp2 = /^[A-Za-z0-9`~!#$%^&*\-_=+|{}'/?]+(\.)*[A-Za-z0-9`~!#$%^&*\-_=+|{}'/?]*@[A-Za-z0-9`~!#$%^&*\-_=+|{}'/?]+(\.)*[A-Za-z0-9`~!#$%^&*\-_=+|{}'/?]*\.[A-Za-z]{2,3}$/g;
        const regExp3 = /[@\(\)\\\[\]":;,<>]/g;
        let   emailErrMsg = '';
        let   isEmail = false;  

        if( regExp1.test(value)===true  || regExp2.test(value)===false  ){    
            emailErrMsg = '이메일 형식으로 입력해 주세요.';
            isEmail = true;  
        }
        else{
            emailErrMsg = '';
            isEmail = false;  
        }

        setState({
            ...state,
            이메일: value,
            emailErrMsg: emailErrMsg,
            isEmail: isEmail
        })

    }

    // 7. 이메일 중복확인 버튼클릭 이벤트 API
    const onClickEmailOk=(e)=>{
        e.preventDefault();
        const {이메일} = state;
        const regExp1 = /\s/g;
        const regExp2 = /^[A-Za-z0-9`~!#$%^&*\-_=+|{}'/?]+(\.)*[A-Za-z0-9`~!#$%^&*\-_=+|{}'/?]*@[A-Za-z0-9`~!#$%^&*\-_=+|{}'/?]+(\.)*[A-Za-z0-9`~!#$%^&*\-_=+|{}'/?]*\.[A-Za-z]{2,3}$/g;
        const regExp3 = /[@\(\)\\\[\]":;,<>]/g;
        let result = [];
        let 이메일중복확인 = false;


        if(이메일===''){
            isConfirmModalFn('6자 이상 16자 이하의 영문 혹은 영문과 숫자를 조합');
        }
        else if( regExp1.test(이메일)===true  || regExp2.test(이메일)===false ||  regExp3.test(이메일)===false  ){
            isConfirmModalFn('이메일 형식으로 입력해 주세요.');
        }
        else{
            
            axios({ // CORS API
                url:'http://moonjong.dothome.co.kr/react_cra_5/member_select.php',
                method:'GET'
            })
            .then((res)=>{

                result = res.data.map((item) => item.이메일===state.이메일);
                if( result.includes(true) ){               
                    isConfirmModalFn('사용 불가능한 이메일 입니다');
                    이메일중복확인 = false;
                }
                else{
                    isConfirmModalFn('사용 가능한 이메일 입니다');
                    이메일중복확인 = true;
                }
                
            })
            .catch((err)=>{
                console.log('AXIOS 실패 : ', err );
            });
        }
        setState({
            ...state,
            이메일중복확인: 이메일중복확인
        })
    }


    // 8. 휴대폰 입력상자
    const onChangeHp=(e)=>{
        const {value} = e.target;
        const regExp1 = /[^\d]/g;
        let 휴대폰 = '';
        let isHp = false;
                    
        휴대폰 = value.replace(regExp1,'');

        if( value.length > 1 ){
            isHp = true;
        }
        else{
            isHp = false;
        }

        setState({
            ...state,
            휴대폰: 휴대폰,
            isHp: isHp
        })

    }


    // 9. 휴대폰 인증번호 받기 버튼 클릭 이벤트
    const onClickHpNum=(e)=>{
        e.preventDefault();
        let num = 0 ;
        let isHpOkBox = false;
        let isHp = true;
        let isInputHp = false;

        let 인증번호입력상자 = '';

        const regExp2 = /^01[0|1|2|6|7|8|9]+[0-9]{3,4}[0-9]{4}$/g;
        num = Math.floor(Math.random()*900000+100000);    //floor()자리내림

       if( regExp2.test(state.휴대폰)===false ){                        
            isHpOkBox = false;
            isHp = true;
            isInputHp = false;
            isConfirmModalFn('잘못된 휴대폰 번호 입니다. 확인 후 다시 시도 해 주세요.');
       }
       else{
            isConfirmModalFn(`인증번호가 발송되었습니다. ${num}`);
            isHpOkBox = true;                
            isHp = false;                
            isInputHp = true;                
            인증번호입력상자='';

       }

       setState({
            ...state,
            인증번호: num,  //숫자
            인증번호입력상자: 인증번호입력상자,
            isHpOkBox : isHpOkBox,
            isHp : isHp,
            isInputHp : isInputHp            
       })


    }

    // 10. 인증번호 입력상자
    const onChangeInputHpOk=(e)=>{
        const {value} = e.target;
        if(value.length > 1){
            clearInterval(state.setId);
        }
        setState({
            ...state,
            인증번호입력상자: value
        })
    }


    // 11. 인증번호 확인버튼 클릭 이벤트
    const onClickHpOkBtn=(e)=>{
        e.preventDefault();   
        let 휴대폰인증확인 = false;     
        let isHp = true;  
        let isHpOkBox = true;  
        let isHpNum2Btn = false;  

        if(Number(state.인증번호입력상자)===state.인증번호){  // Number(숫자(문자열)) === 숫자(정수)
            isConfirmModalFn('인증에 성공 하였습니다.');
            isHp = false; 
            isHpOkBox = false;
            휴대폰인증확인 = true;  
            isHpNum2Btn = true;         
        }
        else{
            isConfirmModalFn('잘못된 인증 코드 입니다.');
            isHp = true; 
            isHpOkBox = true;
            휴대폰인증확인 = false;
            isHpNum2Btn = false;
        }

        setState({
            ...state,
            isHp: isHp,
            isHpOkBox: isHpOkBox,
            휴대폰인증확인: 휴대폰인증확인,
            isHpNum2Btn: isHpNum2Btn
        })

    }


    // 12. 다른번호 인증 클릭 이벤트
    const onClickHpNum2Btn=(e)=>{
        e.preventDefault();
        
        setState({
            ...state,
            isInputHp: false,
            isHpNum2Btn: false,
            isHp: true,
            휴대폰:''
        })
    }


    // 13. 휴대폰 타이머 카운트 함수
    function hpTimerCount(){
        let setId = 0
        let minute = 2; 
        let second = 59; //0~59
        setId = setInterval(function(){
            second--;
            if(second<0){                        
                second=59;
                minute--;
                if(minute<0){
                    clearInterval(setId);
                    minute=0;
                    second=0;
                    isConfirmModalFn(`유효 시간이 만료되었습니다.<br> 다시 시도해 주세요.`);
                }
            }
            // $('.time-count').html( `${minute<10?`0${minute}`:minute}:${second<10?`0${second}`:second}` );
            // 상태관리
            setState({
                ...state,
                setId: setId,
                minute: minute,
                second: second
            })

        }, 1000);
    }
    React.useEffect(()=>{        
        //console.log( 회원 ); //프롭스 속성중  회원 객체 가져오기
        isTimer && hpTimerCount(); //isTimer 변수가 true이면 실행 
    }, [ isTimer ]);

    // 14. 주소검색
    const AddressSearchFn=()=>{
        const _fileName = './popup.html';
        const _winName = '_address_api';
        const _width = 530;
        const _height = 569;
        const _top =  (window.innerHeight-_height)/2; 
        const _left = (window.innerWidth-_width)/2;                 
        const childWin = window.open( _fileName , _winName ,`width=${_width},height=${_height},top=${_top},left=${_left}`); 
    }

    const onClickAddressSearchBtn=(e)=>{
        e.preventDefault();
        AddressSearchFn();              
    }

    // 15. 주소1 입력상자 온체인지 이벤트
    const onChangeInputAddr1=(e)=>{
        setState({
            ...state,
            주소1: e.target.value
        })
    }
    // 16. 주소2 입력상자 온체인지 이벤트
    const onChangeInputAddr2=(e)=>{
        setState({
            ...state,
            주소2: e.target.value
        })
    }
    // 17. 로딩시 섹션 스토레이지에 
    // kurly_search_address 키가 있다면 키값을 가져와서 주소1, 주소2에 데이터 저장하고 유지
    const addressState=()=>{
        let 주소1 = '';
        let 주소2 = '';
        let isAddrHide = false;
        let isAddrApiBtn = false;

        if(sessionStorage.getItem('kurly_search_address') !== null ){
            isAddrHide = true;
            isAddrApiBtn = true;
            주소1 = JSON.parse(sessionStorage.getItem('kurly_search_address')).주소1;
            주소2 = JSON.parse(sessionStorage.getItem('kurly_search_address')).주소2;
        }
        else {
            isAddrHide = false;
            isAddrApiBtn = false;
        }

        setState({
            ...state,
            주소1: 주소1, 
            주소2: 주소2,
            isAddrHide: isAddrHide,
            isAddrApiBtn, isAddrApiBtn
        })
    }
    // 18. 주소 재검색
    const onClickAddrReBtn=(e)=>{
        e.preventDefault();
        AddressSearchFn(); 
    }

    
    // 19. 성별 선택 
    const onChangeGender=(e)=>{
        let 성별 = '';

        if(e.target.checked){
            성별 = e.target.value
        }
        else {
            성별 = e.target.value
        }

        setState({
            ...state,
            성별: 성별
        })
    }


    // 20. 생년월일
    const birthCheck=()=>{  
        const newYear = new Date().getFullYear(); // 현재년도  숫자
        const newMonth = new Date().getMonth();
        const newDate = new Date().getDate();
        const regExp1 = /[^\d]/g;
        const regExp2 = /^(?:0?[1-9]|1[0-2])$/g;  // 생월 01 ~ 09 또는 1 ~ 9 | 10 11 12
        const regExp3 = /^(?:0?[1-9]|1[0-9]|2[0-9]|3[0-1])$/g;  // 생월 01 ~ 09 또는 1 ~ 9 | 10 ~ 19 | 20~29| 30-31
        
        let isBirth = false;
        let istext = '';

        if(  Number(state.생년) > newYear){  
            isBirth = true;
            istext = '생년월일이 미래로 입력 되었습니다.';
        }
        // 100세 초과 입력 불가
        else if( Number(state.생년) < newYear-100  ){ 
            isBirth = true;
            istext = '생년월일을 다시 확인해주세요.';                  
        }
        // 14세 미만 입력 불가            
        else if( Number(state.생년) >= newYear-14  ){  
            isBirth = true;
            istext = '만 14세 미만은 가입이 불가합니다.';  
        }
        else{
            if( regExp2.test(state.생월)===false){
                isBirth = true;
                istext = '태어난 월을 정확하게 입력해주세요.'; 
            }
            else {
                if(regExp3.test(state.생일)===false) {
                    isBirth = true;
                    istext = '태어난 일을 정확하게 입력해주세요.'; 
                }
                else{
                    isBirth = false;
                    istext = '';
                }
            }
        }
        setState({
            ...state,
            isBirth: isBirth,
            istext: istext
        })
    }

    // 생년
    const onChangeYear=(e)=>{
        const regExp1 = /[^\d]/g;
        let 생년 = '';

        생년 = e.target.value.replace(regExp1, '');

        setState({
            ...state,
            생년: 생년
        })
        birthCheck(); 
    }

    // 생월
    const onChangeMonth=(e)=>{
        const regExp1 = /[^\d]/g;
        let 생월 = '';

        생월 = e.target.value.replace(regExp1, '');

        setState({
            ...state,
            생월: 생월
        })
        birthCheck();
    }

    // 생일
    const onChangeDate=(e)=>{
        const regExp1 = /[^\d]/g;
        let 생일 = '';

        생일 = e.target.value.replace(regExp1, '');

        setState({
            ...state,
            생일: 생일
        })
        birthCheck();
    }


    React.useEffect(()=>{
        addressState();
    },[]);
    

    return(
        <main id='main'>
            <section id="signUp">
                <div className="container">
                    <div className="title">
                        <div className="main-title">
                            <h2>회원가입</h2>
                        </div>                    
                        <div className="sub-title">
                            <span><i>*</i>필수입력사항</span>
                        </div>
                    </div>
                    <div className="content">
                        <form name='form_sign_up' autocomplement='off' id='formSignUp' method='post' action="./member_sign_up.php">
                            <ul>
                                <li>
                                    <div className="left">
                                        <div className="left-wrap">
                                            <label htmlFor="inputId"><strong>아이디</strong><i>*</i></label>
                                        </div>                                
                                    </div>
                                    <div className="right">
                                        <div className="right-wrap">
                                            <input 
                                            type="text" 
                                            maxLength='16' 
                                            name='input_id' 
                                            id='inputId' 
                                            placeholder='아이디를 입력해주세요' 
                                            onChange={onChangeId}
                                            value={state.아이디} /* 반드시 상태변수 값 가져오기 */
                                            />

                                            <button 
                                            type="button" 
                                            className='id-ok-btn'
                                            onClick={onClickIdOkBtn}
                                            >
                                               중복확인
                                            </button>
                                            <p className={`error-message${state.is아이디 ? ' on':''}`}>6자 이상 16자 이하의 영문 혹은 영문과 숫자를 조합</p>
                                        </div>
                                    </div>
                                </li>                        
                                <li>
                                    <div className="left">
                                        <div className="left-wrap">
                                            <label htmlFor="inputId"><strong>비밀번호</strong><i>*</i></label>
                                        </div>                                
                                    </div>
                                    <div className="right">
                                        <div className="right-wrap">
                                            <input 
                                            type="password" 
                                            name='input_pw1' 
                                            id='inputPw1' 
                                            placeholder='비밀번호를 입력해주세요' 
                                            onChange={onChangePw}
                                            />
                                            <p className={`error-message${state.isPw ? ' on' : ''}`}>{state.pwErrMsg}</p>
                                        </div>
                                    </div>
                                </li>                        
                                <li>
                                    <div className="left">
                                        <div className="left-wrap">
                                            <label htmlFor="inputId"><strong>비밀번호확인</strong><i>*</i></label>
                                        </div>                                
                                    </div>
                                    <div className="right">
                                        <div className="right-wrap">
                                            <input 
                                            type="password" 
                                            name='input_pw2' 
                                            id='inputPw2' 
                                            placeholder='비밀번호를 한번더 입력해주세요'
                                            onChange={onChangePwOk}
                                            />
                                            <p className={`error-message${state.isPwOk ? ' on' : ''}`}>{state.pwOkErrMsg}</p>
                                        </div>
                                    </div>
                                </li>                        
                                <li>
                                    <div className="left">
                                        <div className="left-wrap">
                                            <label htmlFor="inputId"><strong>이름</strong><i>*</i></label>
                                        </div>                                
                                    </div>
                                    <div className="right">
                                        <div className="right-wrap">
                                            <input 
                                            type="text" 
                                            maxLength='20' 
                                            name='input_name' 
                                            id='inputName' 
                                            placeholder='이름을 입력해주세요'
                                            onChange={onChangeName}
                                            value={state.이름}
                                            />
                                            <p className={`error-message${state.isName ? ' on': ''}`}>{state.nameErrMsg}</p>
                                        </div>
                                    </div>
                                </li>                        
                                <li>
                                    <div className="left">
                                        <div className="left-wrap">
                                            <label htmlFor="inputId"><strong>이메일</strong><i>*</i></label>
                                        </div>                                
                                    </div>
                                    <div className="right">
                                        <div className="right-wrap">
                                            <input 
                                            type="text" 
                                            name='input_email' 
                                            id='inputEmail' 
                                            placeholder='예: marketkurly@kurly.com' 
                                            onChange={onChangeEmail}
                                            />
                                            <button 
                                            type="button" 
                                            className='email-ok-btn'
                                            onClick={onClickEmailOk}
                                            >
                                              중복확인
                                            </button>
                                            <p className={`error-message${state.isEmail ? ' on': ''}`}>{state.emailErrMsg}</p>
                                        </div>
                                    </div>
                                </li>                        
                                <li>
                                    <div className="left">
                                        <div className="left-wrap">
                                            <label htmlFor="inputId"><strong>휴대폰</strong><i>*</i></label>
                                        </div>                                
                                    </div>
                                    <div className="right">
                                        <div className="right-wrap">
                                            <input 
                                            disabled={state.isInputHp}
                                            type="text" 
                                            maxLength='11' 
                                            name='input_hp' 
                                            id='inputHp' 
                                            placeholder='숫자만 입력해주세요' 
                                            onChange={onChangeHp}   
                                            value={state.휴대폰}                                         
                                            />
                                            
                                            <button 
                                            disabled={!state.isHp} 
                                            type="button" 
                                            className={`hp-num-btn${state.isHp ? ' on' : ''}`}
                                            onClick={onClickHpNum}
                                            >
                                                인증번호 받기
                                            </button>
                                            <button 
                                            type="button" 
                                            className={`hp-num2-btn ${state.isHpNum2Btn ? ' on' : ''}`}
                                            onClick={onClickHpNum2Btn}
                                            >
                                                다른번호 인증
                                            </button>
                                            <p className='error-message hp-error-message'></p>
                                        </div>
                                    </div>
                                </li>                        
                                <li className={`hp-ok-box${state.isHpOkBox ? ' on':''}`}>                                
                                    <div className="left">
                                        <div className="left-wrap">
                                        
                                        </div>                                
                                    </div>
                                    <div className="right">
                                        <div className="right-wrap">
                                            <input 
                                            type="text" 
                                            maxLength='6' 
                                            name='input_hp_ok' 
                                            id='inputHpOk' 
                                            placeholder='' 
                                            onChange={onChangeInputHpOk}
                                            value={state.인증번호입력상자}
                                            />
                                            <span className='time-count'>
                                                {  
                                                    `${state.minute<10?`0${state.minute}`:state.minute}:${state.second<10?`0${state.second}`:state.second}`
                                                }
                                            </span>
                                            <button 
                                            type="button" 
                                            className='hp-num-ok-btn'
                                            onClick={onClickHpOkBtn}
                                            >
                                                인증번호 확인
                                            </button>
                                            <p className='info-message hp-info-message'>
                                                인증번호가 오지 않는다면, 통신사 스팸 차단 서비스 혹은 휴대폰 번호 차단 여부를 확인해주세요. (마켓컬리 1644-1107)
                                            </p>
                                        </div>
                                    </div>
                                </li>                        
                                <li>
                                    <div className="left">
                                        <div className="left-wrap">
                                            <label htmlFor="inputId"><strong>주소</strong><i>*</i></label>
                                        </div>                                
                                    </div>
                                    <div className="right">
                                        <div className="right-wrap">
                                            <input 
                                            type="text"
                                            className={`addr-hide${state.isAddrHide ? ' on' : ''} `} 
                                            name='input_addr1' 
                                            id='inputAddr1' 
                                            placeholder='카카오 주소 검색 API' 
                                            onChange={onChangeInputAddr1}
                                            value={state.주소1}
                                            />
                                            <button 
                                            type="button" 
                                            className={`addr-re-btn addr-hide${state.isAddrHide ? ' on' : ''} `} 
                                            onClick={onClickAddrReBtn}
                                            >
                                                <img src="./img/sign_up/ico_search.svg" alt="" />재검색
                                            </button>
                                            <button 
                                            type="button" 
                                            className={`addr-api-btn${state.isAddrApiBtn ? ' on' : ''} `} 
                                            onClick={onClickAddressSearchBtn}
                                            >
                                                <img src="./img/sign_up/ico_search.svg" alt="" />주소검색
                                            </button>                                        
                                        </div>                                    
                                    </div>
                                </li>                        
                                <li className={`addr-hide${state.isAddrHide ? ' on' : ''} `}>
                                    <div className="left">
                                        <div className="left-wrap">
                                            
                                        </div>                                
                                    </div>
                                    <div className="right">
                                        <div className="right-wrap">
                                            <input 
                                            type="text" 
                                            name='input_addr2' 
                                            id='inputAddr2' 
                                            placeholder='나머지 주소를 입력해주세요' 
                                            onChange={onChangeInputAddr2}
                                            value={state.주소2}
                                            />                                        
                                        </div>
                                    </div>
                                </li>                        
                                <li className={`addr-hide${state.isAddrHide ? ' on' : ''} `}>
                                    <div className="left">
                                        <div className="left-wrap">
                                            
                                        </div>                                
                                    </div>
                                    <div className="right">
                                        <div className="right-wrap">
                                            <em className='addr-map-area'>샛별배송</em>
                                            <p className='addr-info addr-info2'>배송지에 따라 상품 정보가 달라질 수 있습니다.</p>
                                        </div>
                                    </div>
                                </li>  
                                <li>
                                    <div className="left">
                                        <div className="left-wrap">
                                            <label htmlFor="inputId"><strong>성별</strong></label>
                                        </div>                                
                                    </div>
                                    <div className="right">
                                        <div className="right-wrap gender">
                                            <label htmlFor="male"><input onChange={onChangeGender} type="radio" name='gender' id='male' className='gender-btn' value='남자' checked={state.성별.includes('남자')} />남자</label>                                        
                                            <label htmlFor="female"><input onChange={onChangeGender} type="radio" name='gender' id='female' className='gender-btn' value='여자' checked={state.성별.includes('여자')} />여자</label>                                        
                                            <label htmlFor="unselect"><input onChange={onChangeGender} type="radio" name='gender' id='unselect' className='gender-btn' value='선택안함' checked={state.성별.includes('선택안함')} />선택안함</label>                                        
                                        </div>
                                    </div>
                                </li>     
                                
                                <li>
                                    <div className="left">
                                        <div className="left-wrap">
                                            <label htmlFor="inputId"><strong>생년월일</strong></label>
                                        </div>                                
                                    </div>
                                    <div className="right">
                                        <div className="right-wrap birth">
                                            <div className="birth-box">
                                                <ul>
                                                    <li><input onChange={onChangeYear} value={state.생년} type="text" maxLength='4' name='year' id='year' placeholder='YYYY' /></li>
                                                    <li><i>/</i></li>
                                                    <li><input onChange={onChangeMonth} value={state.생월} type="text" maxLength='2' name='month' id='month' placeholder='MM' /></li>
                                                    <li><i>/</i></li>
                                                    <li><input onChange={onChangeDate} value={state.생일} type="text" maxLength='2' name='date' id='date'  placeholder='DD' /></li>
                                                </ul>
                                            </div>
                                            <p className={`error-message birth-error-message${state.isBirth ? ' on' : ''}`}>{state.istext}</p>
                                        </div>
                                    </div>
                                </li>     
                                
                                <li>
                                    <div className="left">
                                        <div className="left-wrap">
                                            <label htmlFor="inputId"><strong>추가입력 사항  </strong></label>
                                        </div>                                
                                    </div>
                                    <div className="right">
                                        <div className="right-wrap add-input-box1">
                                            <label htmlFor="addInput1"><input type="radio" name='addInput' id='addInput1' className='add-input-btn' value='친구초대 추천인 아이디' />친구초대 추천인 아이디</label>
                                            <label htmlFor="addInput2"><input type="radio" name='addInput' id='addInput2' className='add-input-btn' value='참여 이벤트명' />참여 이벤트명</label>
                                        </div>
                                    </div>
                                </li>     
                                <li className='add-input-box-list'>
                                    <div className="left">
                                        <div className="left-wrap">
                                        
                                        </div>                                
                                    </div>
                                    <div className="right">
                                        <div className="right-wrap add-input-box2">
                                        <input type="text" name='add-input-text' id='add-input-text' placeholder='추천인 아이디를 입력해 주세요.' />                                             
                                        <p className='add-input-guid-text'>가입 후 7일 내 첫 주문 배송완료 시, 친구초대 이벤트 적립금이 지급됩니다.</p>
                                        </div>
                                    </div>
                                </li>     

                                <li className='hor-line'>
                                    <hr />
                                </li>

                                {/* 이용약관동의  */}
                                <li>
                                    <div className="left">
                                        <div className="left-wrap">
                                            <label htmlFor="inputId"><strong>이용약관동의</strong><i>*</i></label>
                                        </div>                                
                                    </div>
                                    <div className="right">
                                        <div className="right-wrap service">
                                            <ul>
                                                <li>
                                                    <label htmlFor="allChk"><input type="checkbox" name='all_chk' id='allChk' value='' />전체 동의합니다.</label>
                                                    <p>선택항목에 동의하지 않은 경우도 회원가입 및 일반적인 서비스를 이용할 수 있습니다.</p>
                                                </li>
                                                <li>
                                                    <label htmlFor="chk1"><input type="checkbox" name='chk1' id='chk1'  className='chk-btn'  value='이용약관 동의(필수)' />이용약관 동의</label>(필수)
                                                    <button><span>약관보기</span><img src="./img/sign_up/arrow_right.svg" alt="" /></button>
                                                </li>
                                                <li>
                                                    <label htmlFor="chk2"><input type="checkbox" name='chk2' id='chk2'  className='chk-btn'  value='개인정보 수집∙이용 동의(필수)' />개인정보 수집∙이용 동의</label>(필수)
                                                    <button><span>약관보기</span><img src="./img/sign_up/arrow_right.svg" alt="" /></button>
                                                </li>
                                                <li>
                                                    <label htmlFor="chk3"><input type="checkbox" name='chk3' id='chk3'  className='chk-btn'  value='개인정보 수집∙이용 동의(선택)' />개인정보 수집∙이용 동의</label>(선택)
                                                    <button><span>약관보기</span><img src="./img/sign_up/arrow_right.svg" alt="" /></button>
                                                </li>
                                                <li>
                                                    <label htmlFor="chk4"><input type="checkbox" name='chk4' id='chk4'  className='chk-btn'  value='무료배송, 할인쿠폰 등 혜택/정보 수신 동의(선택)' />무료배송, 할인쿠폰 등 혜택/정보 수신 동의</label>(선택)
                                                    
                                                </li>
                                                <li className='sns-email-box'>
                                                    <label htmlFor="chk5"><input type="checkbox" name='chk5' id='chk5'  className='chk-btn'  value='SNS' />SNS</label>(선택)
                                                    <label htmlFor="chk6"><input type="checkbox" name='chk6' id='chk6'  className='chk-btn'  value='이메일' />이메일</label>(선택)
                                                    
                                                </li>
                                                <li>
                                                    <p>동의 시 한 달간 [5%적립] + [2만원 이상 무료배송] 첫 주문 후 안내</p>
                                                </li>
                                                <li>
                                                    <label htmlFor="chk7"><input type="checkbox" name='chk7' id='chk7'  className='chk-btn'  value='본인은 만 14세 이상입니다.(필수)' />본인은 만 14세 이상입니다.</label>(필수)
                                                    
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </li>   
                            </ul>
                            <div className="button-box">
                                <button type='submit' className='submit-btn'>가입하기</button>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </main>
    )
}    


// 프롭스에 자료형 선언하기 : 프롭 타입스(PropTypes) 패키지 설치 사용
SignUpComponent.propTypes = {
    회원: PropTypes.shape({
        // 속성이름: 자료형지정 필수입력사항 isRequired, 입력없으면 선택입력사항
        아이디 : PropTypes.string,            // string
        is아이디: PropTypes.bool,             // boolean : TypeScript=> bool
        아이디중복확인 : PropTypes.bool,       // boolean 타입스크립트 블리언 bool 프롭 타입스

        비밀번호 : PropTypes.string,          // string
        pwErrMsg : PropTypes.string,            // string
        isPw : PropTypes.bool,               // boolean
        비밀번호확인 : PropTypes.string,       // string
        pwOkErrMsg : PropTypes.string,
        isPwOk : PropTypes.bool,

        이름 : PropTypes.string,              // string
        nameErrMsg : PropTypes.string,
        isName : PropTypes.bool,

        이메일 : PropTypes.string,            // string        
        이메일중복확인 : PropTypes.bool,       // boolean
        emailErrMsg : PropTypes.string,
        isEmail : PropTypes.bool,        

        휴대폰: PropTypes.string,            // number
        휴대폰인증확인: PropTypes.bool,       // boolean
        isHp: PropTypes.bool,
        인증번호: PropTypes.number,
        인증번호입력상자: PropTypes.string,
        isHpOkBox: PropTypes.bool,
        isHpNumBtn: PropTypes.bool,
        isInputHp: PropTypes.bool,  
        isHpNum2Btn: PropTypes.bool,  
        setId: PropTypes.number,
        minute: PropTypes.number, 
        second: PropTypes.number,

        주소1: PropTypes.string,             // string
        주소2: PropTypes.string,             // string
        isAddrHide: PropTypes.bool,
        isAddrApiBtn: PropTypes.bool,

        성별: PropTypes.string,                         // string

        생년: PropTypes.string,              // number
        생월: PropTypes.string,              // number
        생일: PropTypes.string,              // number
        isBirth: PropTypes.string,  
        istext: PropTypes.string,

        추가입력사항: PropTypes.string,       // string        
        추가입력사항입력상자: PropTypes.string,       // string

        이용약관동의: PropTypes.array        // 배열 array
    })
}


// 회원관리에 모든 변수관리
SignUpComponent.defaultProps = {
    회원: {
        아이디 : '',            // string
        is아이디: false,        // boolean
        아이디중복확인 : false,  // boolean 타입스크립트 블리언 bool 프롭 타입스

        비밀번호 : '',          // string
        pwErrMsg : '',
        isPw : false,

        비밀번호확인 : '',       // string
        pwOkErrMsg : '',
        isPwOk : false,

        이름 : '',              // string
        nameErrMsg : '',
        isName : false,

        이메일 : '',            // string        
        이메일중복확인 : false,  // boolean
        emailErrMsg : '',
        isEmail : false,

        휴대폰 : '',            // number
        휴대폰인증확인 : false,  // boolean
        isHp: false,
        인증번호: 0,
        인증번호입력상자:'',
        isHpOkBox : false,
        isInputHp : false,
        isHpNum2Btn: false,   
        setId: 0,
        minute: 2, 
        second: 59,

        주소1 : '',             // string
        주소2 : '',             // string
        isAddrHide: false,
        isAddrApiBtn: false,

        성별 : '선택안함',              // string

        생년 : '',              // number
        생월 : '',              // number
        생일 : '',              // number
        isBirth : '',
        istext: '',

        추가입력사항 : '',       // string
        추가입력사항입력상자 : '',       // string

        이용약관동의 : []        // 배열 array
    }
}