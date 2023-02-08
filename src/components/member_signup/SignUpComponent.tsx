import React, { ChangeEvent, FormEvent, FormEventHandler, MouseEvent } from 'react';
import axios from 'axios';

// 인터페이스 첫글자 대문자
/*
    interface School {
        학생 : Student;
        교수 : Address;
    }

    interface Student {
        name: string;
        kor: number;
        eng: number;
        mat: number;
        computer: number;
    }

    interface Address {
        이름: string;
        주소: string;
    }

*/

// 인터페이스(Inteface)  Object
interface MemberTypes {
        아이디 : string,            // string
        is아이디: boolean,             // boolean : TypeScript  => 프롭타입스 bool 
        아이디중복확인 : any,       // boolean 타입스크립트 블리언 bool 프롭 타입스
        비밀번호 : string,          // string
        pwErrMsg : string,            // string
        isPw : boolean,               // boolean
        비밀번호확인 : string,       // string
        pwOkErrMsg : string,
        isPwOk : boolean,

        이름 : string,              // string
        nameErrMsg : string,
        isName : boolean,

        이메일 : string,            // string        
        이메일중복확인 : boolean,       // boolean
        emailErrMsg : string,
        isEmail : boolean,        

        휴대폰: string,            // number
        휴대폰인증확인: boolean,       // boolean
        isHp: boolean,
        인증번호: number,
        인증번호입력상자: string,
        isHpOkBox: boolean,
        isHpNumBtn: boolean,
        isInputHp: boolean,  
        isHpNum2Btn: boolean,  
        setId: number,
        minute: number, 
        second: number,


        주소1: string,             // string
        주소2: string,             // string
        isAddrApiBtn: boolean,
        isAddrHide: boolean,


        성별: string,                         // string

        생년: string,              // number
        생월: string,              // number
        생일: string,              // number
        isBirth: boolean,
        text: string,

        추가입력사항: string,       // string        
        추가입력사항입력상자: string,       // string
        isAddInput: boolean,
        addInputtxt1: string,
        addInputtxt2: string,

        이용약관내용: Array<string>,
        이용약관동의: Array<string>        // 배열 array
}



function SignUpComponent({회원, isConfirmModalFn, isTimer, introMainFn}: any ){

    // 포폽스 변수값을 상태관리 변수에 대입  <제네릭>  프롭스 값을 타일 재설정
    const [state, setState] = React.useState<MemberTypes>(회원);

    

    // 1. 아이디 입력상자 온 체이인지 이벤트(onChange)
    //    입력상자의 돔 요소 타입설정 & 돔요소타입지정 : 체인지이벤트<HTMLinputElement>
    const onChangeId=(e: ChangeEvent<HTMLInputElement>)=>{

        const regExp1: RegExp = /[`~!@#$%^&*()\-_=+\\|[\]{};:'",<.>/?]/g; // 특수문자
        const regExp2: RegExp = /.{6,16}/g;                                // 6자 이상 16자 이하
        const regExp3: RegExp = /(?=.*[A-Za-z])+(?=.*[0-9])*/g;            // 영문 혹은 영문과 숫자를 조합
        const regExp4: RegExp = /\s/g; 

        let {value} = e.target; // 입력 값 비구조화 
        let 아이디: string = ''; //임시 변수
        let is아이디: boolean = false; //임시 변수


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
    //    버튼 타입설정 : 버튼 클릭 이벤트는  마우스(MouseEvent)로 <HTMLbuttonElement>
    const onClickIdOkBtn=(e: MouseEvent<HTMLButtonElement>)=>{
        e.preventDefault();

        const regExp2: RegExp = /.{6,16}/g;                                // 6자 이상 16자 이하
        const regExp3: RegExp = /(?=.*[A-Za-z])+(?=.*[0-9])*/g;            // 영문 혹은 영문과 숫자를 조합
        const regExp4: RegExp = /\s/g;  
        const thisVal: string = state.아이디;
        let result: Array<boolean> = []; 
        // let result: Array<any> = []; 
        let 아이디중복확인: boolean = false;

        if( regExp2.test( thisVal )===false || regExp3.test(thisVal)===false || regExp4.test(thisVal)===true ){                        
            isConfirmModalFn('6자 이상 16자 이하의 영문 혹은 영문과 숫자를 조합');
        }
        else{  

            axios({ // CORS API
                url:'http://moonjong.dothome.co.kr/react_cra_5/member_select.php',
                method:'GET'
            })
            .then((res)=>{

                result = res.data.map((item:any) => item.아이디===state.아이디);
                if( result.includes(true) ){               
                    isConfirmModalFn('사용 불가능한 아이디 입니다');
                    아이디중복확인 = false;
                }
                else{
                    isConfirmModalFn('사용 가능한 아이디 입니다');
                    아이디중복확인 = true;                    
                }

                setState({
                    ...state,
                    아이디중복확인: 아이디중복확인
                })
                
            })
            .catch((err)=>{
                console.log('AXIOS 실패 : ', err );
            });

        }

    }


    // 3. 비밀번호 입력상자
    const onChangePw=(e: ChangeEvent<HTMLInputElement>)=>{
        
        const {value} = e.target;
        const regExp1: RegExp = /.{10,}/g;                    
        const regExp2: RegExp = /((?=.*[A-Za-z]+)(?=.*[0-9]+))|((?=.*[A-Za-z]+)(?=.*[`~!@#$%^&*()\-_=+\\|[\]{};:'",<.>/?]+))|((?=.*[0-9]+)(?=.*[`~!@#$%^&*()\-_=+\\|[\]{};:'",<.>/?]+))/g;
        const regExp3: RegExp = /\s/g;                    
        const regExp4: RegExp = /(\d)\1\1/g; //동일한 숫자 3개 이상 연속 사용 불가
        
        let pwErrMsg: string = '';
        let isPw: boolean = false;

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
    const onChangePwOk=(e: ChangeEvent<HTMLInputElement>)=>{
        const {value} = e.target;
        let pwOkErrMsg: string = '';
        let isPwOk: boolean = false;
        
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
            isPwOk: isPwOk,
            비밀번호확인: value
        })

    }

    // 5. 이름 입력상자
    const onChangeName=(e: ChangeEvent<HTMLInputElement>)=>{
        const {value} = e.target;
        const regExp: RegExp = /[`~!@#$%^&*()\-_=+\\|[\]{};:'",<.>/?]/g;
        let 이름: string = '';
        let nameErrMsg: string = '';
        let isName: boolean = false;

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
    const onChangeEmail=(e: ChangeEvent<HTMLInputElement>)=>{
        const {value} = e.target;
        const regExp1: RegExp = /\s/g;
        const regExp2: RegExp = /^[A-Za-z0-9`~!#$%^&*\-_=+|{}'/?]+(\.)*[A-Za-z0-9`~!#$%^&*\-_=+|{}'/?]*@[A-Za-z0-9`~!#$%^&*\-_=+|{}'/?]+(\.)*[A-Za-z0-9`~!#$%^&*\-_=+|{}'/?]*\.[A-Za-z]{2,3}$/g;
        let   emailErrMsg: string = '';
        let   isEmail: boolean = false;  

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
    const onClickEmailOk=(e: MouseEvent<HTMLButtonElement>)=>{
        e.preventDefault();
        const {이메일} = state;
        const regExp1: RegExp = /\s/g; // false 가 정상
        const regExp2: RegExp = /^[A-Za-z0-9`~!#$%^&*\-_=+|{}'/?]+(\.)*[A-Za-z0-9`~!#$%^&*\-_=+|{}'/?]*@[A-Za-z0-9`~!#$%^&*\-_=+|{}'/?]+(\.)*[A-Za-z0-9`~!#$%^&*\-_=+|{}'/?]*\.[A-Za-z]{2,3}$/g;
        const regExp3: RegExp = /[@()\\[\]":;,<>]/g; // false 가 정상
        let result: Array<boolean> = [];
        let 이메일중복확인: boolean = false;


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

                result = res.data.map((item: any) => item.이메일===state.이메일);
                if( result.includes(true) ){               
                    isConfirmModalFn('사용 불가능한 이메일 입니다');
                    이메일중복확인 = false;
                }
                else{
                    isConfirmModalFn('사용 가능한 이메일 입니다');
                    이메일중복확인 = true;
                }

                setState({
                    ...state,
                    이메일중복확인: 이메일중복확인
                })
                
            })
            .catch((err)=>{
                console.log('AXIOS 실패 : ', err );
            });
        }

    }


    // 8. 휴대폰 입력상자
    const onChangeHp=(e: ChangeEvent<HTMLInputElement>)=>{
        const {value} = e.target;
        const regExp1: RegExp = /[^\d]/g;
        let 휴대폰: string = '';
        let isHp: boolean = false;
                    
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
    const onClickHpNum=(e: MouseEvent<HTMLButtonElement>)=>{
        e.preventDefault();
        let num: number = 0 ;
        let isHpOkBox: boolean = false;
        let isHp: boolean = true;
        let isInputHp: boolean = false;

        let 인증번호입력상자: string = '';

        const regExp2: RegExp = /^01[0|1|2|6|7|8|9]+[0-9]{3,4}[0-9]{4}$/g;
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
    const onChangeInputHpOk=(e: ChangeEvent<HTMLInputElement>)=>{
        const {value} = e.target;

        if( value.length >= 1 ){
            clearInterval( state.setId );
        }

        setState({
            ...state,
            인증번호입력상자: value
        })
    }


    // 11. 인증번호 확인버튼 클릭 이벤트
    const onClickHpOkBtn=(e: MouseEvent<HTMLButtonElement>)=>{
        e.preventDefault();   
        let 휴대폰인증확인: boolean = false;     
        let isHp: boolean = true;  
        let isHpOkBox: boolean = true;  
        let isHpNum2Btn: boolean = false;  

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
    const onClickHpNum2Btn=(e: MouseEvent<HTMLButtonElement>)=>{
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
        let setId: any = 0
        let minute: number = 2; 
        let second: number = 59; //0~59

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
    }, [isTimer]);  //isTimer 가 변경되면 실행 




    // 14. 카카오 주소검색 API 
    const addressSearchFn=()=>{
        const _fileName: string = './popup.html';
        const _winName: string = '_address_api';
        const _width: number = 530;
        const _height: number = 569;
        const _top: number =  (window.innerHeight-_height)/2;
        const _left: number = (window.innerWidth-_width)/2;
        window.open( _fileName , _winName ,`width=${_width},height=${_height},top=${_top},left=${_left}`);
    }


    //     주소검색 버튼 클릭 이벤트    
    const onClickAddressSearchBtn=(e: MouseEvent<HTMLButtonElement>)=>{
        e.preventDefault();
         // 팝업창 띄우기(열기)
         addressSearchFn();
    }

    // 15. 주소1 입력상자 온체인지 이벤트
    const  onChangeInputAddr1=(e: ChangeEvent<HTMLInputElement>)=>{
        setState({
            ...state,
            주소1: e.target.value
        })
    }

    // 16. 주소2 입력상자 온체인지 이벤트
    const  onChangeInputAddr2=(e: ChangeEvent<HTMLInputElement>)=>{
        setState({
            ...state,
            주소2: e.target.value
        })
    }


    // 17. 로딩시 세션 스토레이지에 
    //     kurly_search_address 키가 있다면
    //     키값을 가져와서 주소1, 주소2에 데이터 저장하고 유지한다.
    //     addressState
    const onClickAddrReBtn=(e: MouseEvent<HTMLButtonElement>)=>{
        e.preventDefault();
        addressSearchFn();
    }


    // 주소가져오기 세션스토레이지 데이터
    // 프로미스(Promise 비동기 방식으로) 처리 .then().catch();
    const getSessionAddress=()=>{

        // new Promise((success, error)=>{});
        function getPromise(){
            // return new Promise((resolved, rejected)=>{
            // return new Promise((res, err)=>{
            return new Promise((success, error)=>{
                
                let 주소1: string ='';
                let 주소2: string ='';
                let isAddrApiBtn: boolean = false;
                let isAddrHide: boolean = false;
        
                if( `${sessionStorage.getItem('kurly_search_address')}` !== null ){    
                    try{
                        주소1 = JSON.parse( `${sessionStorage.getItem('kurly_search_address')}` ).주소1;
                        주소2 = JSON.parse( `${sessionStorage.getItem('kurly_search_address')}` ).주소2;
                        isAddrApiBtn = true;
                        isAddrHide  = true;

                        // 주소 가져오기 성공 프로토타입 객체 생성 
                        const Obj = {
                            주소1: 주소1,
                            주소2: 주소2,
                            isAddrApiBtn: isAddrApiBtn,
                            isAddrHide: isAddrHide,
                        } 
                        // resolved(Obj);  // 주소가져오기 성공 리턴
                        // res(Obj);  // 주소가져오기 성공 리턴
                        success(Obj);  // 주소가져오기 성공 리턴
                    }
                    catch {
                        error('검색 주소가 없습니다.'); // 주소가져오기 성공 리턴 
                    }            
                       
                }
                else {
                    // rejected('주소가져오기 실패!'); // 주소가져오기 성공 리턴
                    // err('주소가져오기 실패!'); // 주소가져오기 성공 리턴
                    error('주소가져오기 없습니다!'); // 주소가져오기 성공 리턴
                }

            });
        }

        // 세션에서 주소를 가져오고 성공하면
        // 성공 객체 데이터를 가져와서 스테이트에 저장한다.
        getPromise()
        .then((res: any)=>{  // 성공 결과 resolved
            setState({
                ...state,
                주소1: res.주소1,
                주소2: res.주소2,
                isAddrApiBtn: res.isAddrApiBtn,
                isAddrHide: res.isAddrHide
            });
        })
        .catch((err: any)=>{ // 실패 결과 rejected
            return console.log( err );
        });
            
    }
     

    React.useEffect(()=>{
        // 비동기식 방식(프로미스)으로 처리한다.
        getSessionAddress();
        // setTimeout(getSessionAddress,  100); // 유즈이펙트 실행하고 0.1초 후에 주소가겨오기 실행
      
    },[state.주소1, state.주소2 ]);
   




    // 19. 성별
    const onChangeGender=(e: ChangeEvent<HTMLInputElement>)=>{
       let 성별: string = '';

        if(e.target.checked){
            성별 = e.target.value
        }
        else{
            성별 = e.target.value
        }

        setState({
            ...state,
            성별: 성별
        })
    }






    // 20. 생년월일
    React.useEffect(()=>{
        const newYear: number = new Date().getFullYear(); // 현재년도  숫자 Object
        const regExp2: RegExp = /^(?:0?[1-9]|1[0-2])$/g;  // 생월 01 ~ 09 또는 1 ~ 9 | 10 11 12
        const regExp3: RegExp = /^(?:0?[1-9]|1[0-9]|2[0-9]|3[0-1])$/g;  // 생월 01 ~ 09 또는 1 ~ 9 | 10 ~ 19 | 20~29| 30-31
        let isBirth: boolean = false;
        let text: string = '';

        // 1. 생년, 생월, 생일 모두 빈칸이면 => 빈칸으로 오류 메시지 없음.
        // 2. 미래년도 입력 불가 : * 입력상자의 입력값은 숫자(Number)를 입력해도 문자열(String)로 변환된다.
        // 3. 미래년도 입력 불가 숫자 >  Number(문자) 숫자로 변환하고 비교 가능

        if( state.생년==='' &&  state.생월==='' && state.생일==='' ){
            isBirth = false;
            text = '';
        }
        else {

            if( Number(state.생년) > newYear){  // 입력값 > 현재년도
                isBirth = true;
                text = '생년월일이 미래로 입력 되었습니다.';
            }
            // 100세 초과 입력 불가
            else if( Number(state.생년) < newYear-100  ){  // 1919 < 2020-100 = 1920                    
                isBirth = true;
                text = '생년월일을 다시 확인해주세요.';
            }
            // 14세 미만 입력 불가            
            else if( Number(state.생년) >= newYear-14  ){  // ? < 2020-14 = 2008
                isBirth = true;
                text = '만 14세 미만은 가입이 불가합니다.';
            }
            else{
                // 생년이 이상 없는 경우
                // 생월 체크
                if( regExp2.test(state.생월)===false){
                    isBirth = true;
                    text = '태어난 월을 정확하게 입력해주세요.';
                }
                else {
                    // 생월이 이상 없으면
                    // 생일 체크
                    if(regExp3.test(state.생일)===false) {
                        isBirth = true;
                        text = '태어난 일을 정확하게 입력해주세요.';
                    }
                    else{
                        isBirth = false;
                        text = '';
                    }
                }
            }

        }

        setState({
            ...state,
            isBirth: isBirth,
            text: text
        })

    },[state.생년, state.생월, state.생일]);





    // 20-1. 생년 숫자가 아니면 삭제
    const onChangeYear=(e: ChangeEvent<HTMLInputElement>)=>{
        const regExp1: RegExp = /[^\d]/g;
        let 생년: string = '';
        생년 = e.target.value.replace(regExp1,'');

        setState({
            ...state,
            생년: 생년
        })
    }


    // 20-2 생월
    const onChangeMonth=(e: ChangeEvent<HTMLInputElement>)=>{
        const regExp1: RegExp = /[^\d]/g;
        let 생월: string = '';
        생월 = e.target.value.replace(regExp1,'');

        setState({
            ...state,
            생월: 생월
        })

    }

    // 20-3 생일
    const onChangeDate=(e: ChangeEvent<HTMLInputElement>)=>{
        const regExp1: RegExp = /[^\d]/g;
        let 생일: string = '';
        생일 = e.target.value.replace(regExp1,'');

        setState({
            ...state,
            생일: 생일
        })

    }


    // 21. 추가 입력사항
    // 21-1 라디오버튼 이벤트
    const onChangeAddInput=(e: ChangeEvent<HTMLInputElement>)=>{
        const {value} = e.target;
        let isAddInput: boolean = false;
        let addInputtxt1: string = '';
        let addInputtxt2: string = '';


        isAddInput = true;
        addInputtxt1 = value; // 입력상자 입력값 문자열
        
        if( value==='친구초대 추천인 아이디' ){
            addInputtxt2='가입 후 7일 내 첫 주문 배송완료 시, 친구초대 이벤트 적립금이 지급됩니다.';
        }
        else{
            addInputtxt2='추천인 아이디와 참여 이벤트명 중 하나만 선택 가능합니다.<br>가입 이후는 수정이 불가능 합니다.<br>대소문자 및 띄어쓰기에 유의해주세요.';
        }  
        
        setState({
            ...state,
            isAddInput: isAddInput,
            addInputtxt1: addInputtxt1,  // 라디오버튼 value
            addInputtxt2: addInputtxt2, // msg 2개
            추가입력사항: value,
        })

    }

    // 21-2 입력상자 이벤트
    const onChangeAddInputBox=(e: ChangeEvent<HTMLInputElement>)=>{
        const {value} = e.target
        setState({
            ...state,
            추가입력사항입력상자: value
        })
    }



    // 22. 이용약관
    // 22-1. 이용약관동의 전체체크
    const onChangeServiceAllCheck=(e: ChangeEvent<HTMLInputElement>)=>{
        const {checked} = e.target;
        let 이용약관동의: Array<string> = [];

        if( checked === true){ // 체크되면
            이용약관동의 = state.이용약관내용;
        }
        else{
            이용약관동의 = [];
        }

        setState({
            ...state,
            이용약관동의: 이용약관동의
        })
    }

    // 22-2 이용약관동의 체크박스 개별체크 && SNS & 이메일 체크 알고리즘
    const onChangeServiceCheck=(e: ChangeEvent<HTMLInputElement>)=>{
        const {value, checked} = e.target;
        let imsi: Array<string> = [];

        if( checked === true){ // 체크되면 저장

            // 무표배송 체크하면 (SNS, 이메일) 상태변수 저장
            if( value==='무료배송, 할인쿠폰 등 혜택/정보 수신 동의(선택)'){
                // SNS, 이메일 모두 이용약관동의에 없다면 저장한다.
                if( state.이용약관동의.includes('SNS')===false &&  state.이용약관동의.includes('이메일')===false ){
                    setState({...state, 이용약관동의: [...state.이용약관동의, value, 'SNS', '이메일']});
                }                
                else if( state.이용약관동의.includes('SNS')===true &&  state.이용약관동의.includes('이메일')===false ){
                    setState({...state, 이용약관동의: [...state.이용약관동의, value, '이메일']});
                }
                else if( state.이용약관동의.includes('SNS')===false &&  state.이용약관동의.includes('이메일')===true ){
                    setState({...state, 이용약관동의: [...state.이용약관동의, value, 'SNS']});
                }
                else if(state.이용약관동의.includes('SNS')===true &&  state.이용약관동의.includes('이메일')===true){
                    setState({...state, 이용약관동의: [...state.이용약관동의, value ]});
                }
            }
            // SNS === FALSE, 이메일 === TRUE
            else if( value==='SNS' && state.이용약관동의.includes('이메일')===true){
                setState({...state, 이용약관동의: [...state.이용약관동의, '무료배송, 할인쿠폰 등 혜택/정보 수신 동의(선택)', value ]});
            }
            // SNS === TRUE, 이메일 === FALSE
            else if( value==='이메일' &&  state.이용약관동의.includes('SNS')===true){
                setState({...state, 이용약관동의: [...state.이용약관동의, '무료배송, 할인쿠폰 등 혜택/정보 수신 동의(선택)', value ]});
            }
            else {
                // 그외
                setState({...state,이용약관동의: [...state.이용약관동의, value]});
            }

           
        }
        else{   // 체크해제는 삭제 filter()  재배열 저장

            if( value==='무료배송, 할인쿠폰 등 혜택/정보 수신 동의(선택)'){
                // 무료배송, 할인쿠폰 등 혜택/정보 수신 동의(선택) 제거
                // SNS 제거
                // 이메일 제거
                imsi = state.이용약관동의.filter((item)=>item!=='무료배송, 할인쿠폰 등 혜택/정보 수신 동의(선택)');
                imsi = imsi.filter((item)=>item!=='SNS');
                imsi = imsi.filter((item)=>item!=='이메일');
                setState({...state, 이용약관동의: imsi});
            }
            else if( value==='SNS' && state.이용약관동의.includes('이메일')===true ){  // SNS나 이메일 둘중 하나만 해제되면 무료배송 무조건 삭제
                imsi = state.이용약관동의.filter((item)=>item!=='무료배송, 할인쿠폰 등 혜택/정보 수신 동의(선택)');                   
                imsi = imsi.filter((item)=>item!=='SNS');                   
                setState({...state, 이용약관동의: imsi});
            }
            else if( value==='이메일'  && state.이용약관동의.includes('SNS')===true ){  // SNS나 이메일 둘중 하나만 해제되면 무료배송 무조건 삭제
                imsi = state.이용약관동의.filter((item)=>item!=='무료배송, 할인쿠폰 등 혜택/정보 수신 동의(선택)');                   
                imsi = imsi.filter((item)=>item!=='이메일');                   
                setState({...state, 이용약관동의: imsi});
            }
            else {
                imsi = state.이용약관동의.filter((item)=>item!==value);
                setState({...state, 이용약관동의: imsi});
            }          
        }
    }


    // 23 전송 버튼 클릭 이벤트 ==> 폼에서 onSubmit 이벤트 사용
    //    폼데이터 비동기 전송 AXIOS  
    //    폼데이터 요소들 값 중에서 
    //    필수입력사항 / 선택입력사항 구분 하여 조건 만족시(유효성 검사) 후 전송한다.
    const onSubmitEvent=(e: MouseEvent<HTMLButtonElement>)=>{
        e.preventDefault();

        // 이용약관동의 필수 항목 체크 갯수 카운트
        let cnt: number = 0;

        state.이용약관동의.map((item)=>{           
            if(item.indexOf('필수')!==-1){ // 찾지 못하면 -1 반환
                cnt++;               
            }
        });

        if(state.아이디===''){
            isConfirmModalFn('아이디를 입력 해주세요');
        }
        else if(state.아이디중복확인===false){
            isConfirmModalFn('아이디를 중복확인 해주세요');
        }         
        else if(state.비밀번호===''){
            isConfirmModalFn('비밀번호를 입력 해주세요');
        } 
        else if(state.비밀번호확인===''){
            isConfirmModalFn('한번더 비밀번호를 입력 해주세요.');
        } 
        else if(state.이름===''){
            isConfirmModalFn('이름을 입력 해주세요.');
        } 
        else if(state.이메일===''){
            isConfirmModalFn('이메일를 입력 해주세요.');
        } 
        else if(state.아이디중복확인===false){
            isConfirmModalFn('이메일 중복확인 해주세요.');
        } 
        else if(state.휴대폰===''){
            isConfirmModalFn('휴대폰을 입력 해주세요.');
        } 
        else if(state.휴대폰인증확인===false){
            isConfirmModalFn('휴대폰 인증을 진행 해주세요.');
        }         
        else if(state.주소1===''){
            isConfirmModalFn('주소를 검색 해주세요.');
        } 
        else if(state.주소2===''){
            isConfirmModalFn('나머지 주소를 입력 해주세요.');
        }         
        else if(cnt!==3){
            isConfirmModalFn('이용약관동의 필수 항목을 체크해 주세요.');
        }
        else {
            // 폼데이터 객체 생성하고 그리고 전송
            const regExp: RegExp = /^(\d{3})(\d{3,4})(\d{4})$/g;

            const newFormData: any = new FormData();  

            newFormData.append('id',      state.아이디);
            newFormData.append('pw',      state.비밀번호);
            newFormData.append('irum',    state.이름);
            newFormData.append('email',   state.이메일);
            newFormData.append('hp',      state.휴대폰.replace(regExp, '$1-$2-$3'));
            newFormData.append('addr',    `${state.주소1} ${state.주소2}`);
            newFormData.append('gender',  state.성별);
            newFormData.append('birth',   `${state.생년}-${state.생월}-${state.생일}`);
            newFormData.append('addInput',`${state.추가입력사항}  ${state.추가입력사항입력상자}`);
            newFormData.append('service',  state.이용약관동의);
            newFormData.append('gaibDate', `${new Date().getFullYear()}-${new Date().getMonth()+1}-${new Date().getDate()}`);

            // CORS REST API
            axios({
                url:'http://moonjong.dothome.co.kr/react_cra_5/member_insert.php',
                method:'POST',
                data: newFormData
            })
            .then((res)=>{
                // console.log('AXIOS 성공 : ', res.data );
                // console.log('AXIOS 성공 => DB서버저장 성공 : ', res.data.indexOf('성공') ); // => 인트로 페이지로 이동
                // console.log('AXIOS 성공 => DB서버저장 실패 : ', res.data.indexOf('실패') ); // => 저장실패 가입 다시 시도
                if( res.data.indexOf('성공') !==-1 ){
                    introMainFn(); // 인트로 메인페이지로 이동
                    // location.href = './루트경로';
                    // location.href = $root_path; 
                }
               
            })
            .catch((err)=>{
                console.log('AXIOS 실패 : ', err );
            });



        } 
    }

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
                        <form  name='form_sign_up' autoComplete='off' id='formSignUp' method='post' action="./member_sign_up.php">
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
                                            maxLength={16} 
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
                                            value={state.비밀번호}
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
                                            maxLength={20}
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
                                            maxLength={11} 
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
                                            maxLength={6} 
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
                                            className={`addr-hide${state.isAddrHide ? ' on':''}`} 
                                            name='input_addr1' 
                                            id='inputAddr1' 
                                            placeholder='카카오 주소 검색 API' 
                                            onChange={onChangeInputAddr1}
                                            value={state.주소1}
                                            />

                                            <button 
                                            type="button" 
                                            className={`addr-hide addr-re-btn${state.isAddrHide ? ' on':''}`}
                                            onClick={onClickAddrReBtn}
                                            >
                                                <img src="./img/sign_up/ico_search.svg" alt="" />
                                                재검색
                                            </button>

                                            <button 
                                            type="button" 
                                            className={`addr-api-btn${state.isAddrApiBtn?' on':''}`}
                                            onClick={onClickAddressSearchBtn}
                                            >
                                                <img src="./img/sign_up/ico_search.svg" alt="" />
                                                주소검색
                                            </button>                                        
                                        </div>                                    
                                    </div>
                                </li>                        
                                <li className={`addr-hide${state.isAddrHide ? ' on':''}`}>
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
                                <li className={`addr-hide${state.isAddrHide ? ' on':''}`}>
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
                                            <label htmlFor="male"><input  onChange={onChangeGender} type="radio" name='gender' id='male' className='gender-btn' value='남자'            checked={state.성별.includes('남자')}     />남자</label>
                                            <label htmlFor="female"><input  onChange={onChangeGender} type="radio" name='gender' id='female' className='gender-btn' value='여자'        checked={state.성별.includes('여자')}     />여자</label>
                                            <label htmlFor="unselect"><input  onChange={onChangeGender} type="radio" name='gender' id='unselect' className='gender-btn' value='선택안함' checked={state.성별.includes('선택안함')}  />선택안함</label>
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
                                                    <li><input type="text" onChange={onChangeYear} value={state.생년}  maxLength={4} name='year' id='year' placeholder='YYYY' /></li>
                                                    <li><i>/</i></li>
                                                    <li><input type="text" onChange={onChangeMonth} value={state.생월} maxLength={2} name='month' id='month' placeholder='MM' /></li>
                                                    <li><i>/</i></li>
                                                    <li><input type="text" onChange={onChangeDate} value={state.생일}  maxLength={2} name='date' id='date'  placeholder='DD' /></li>
                                                </ul>
                                            </div>
                                            <p className={`error-message birth-error-message${ state.isBirth ? ' on':''}`}>{state.text}</p>
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
                                            <label htmlFor="addInput1"><input type="radio" onChange={onChangeAddInput} name='addInput' id='addInput1' className='add-input-btn' value='친구초대 추천인 아이디' />친구초대 추천인 아이디</label>
                                            <label htmlFor="addInput2"><input type="radio" onChange={onChangeAddInput} name='addInput' id='addInput2' className='add-input-btn' value='참여 이벤트명' />참여 이벤트명</label>
                                        </div>
                                    </div>
                                </li>     
                                <li className={`add-input-box-list${state.isAddInput?' on':''}`}>
                                    <div className="left">
                                        <div className="left-wrap">
                                        
                                        </div>                                
                                    </div>
                                    <div className="right">
                                        <div className={`right-wrap add-input-box2${state.isAddInput?' on':''}`}>
                                        <input 
                                        type="text" 
                                        name='add-input-text' 
                                        id='add-input-text' 
                                        placeholder={state.addInputtxt1} 
                                        onChange={onChangeAddInputBox}
                                        />
                                        <p className='add-input-guid-text'>{state.addInputtxt2}</p>
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
                                                    <label htmlFor="allChk"><input onChange={onChangeServiceAllCheck}  checked={state.이용약관동의.length===7}  type="checkbox" name='all_chk' id='allChk' value='' />전체 동의합니다.</label>
                                                    {/* <label htmlFor="allChk"><input onChange={onChangeServiceAllCheck}  checked={state.이용약관동의.length===7 ? true : false}  type="checkbox" name='all_chk' id='allChk' value='' />전체 동의합니다.</label> */}
                                                    <p>선택항목에 동의하지 않은 경우도 회원가입 및 일반적인 서비스를 이용할 수 있습니다.</p>
                                                </li>
                                                <li>
                                                    <label htmlFor="chk1"><input onChange={onChangeServiceCheck} checked={state.이용약관동의.includes('이용약관 동의(필수)')} type="checkbox" name='chk1' id='chk1'  className='chk-btn'  value='이용약관 동의(필수)' />이용약관 동의</label>(필수)
                                                    <button><span>약관보기</span><img src="./img/sign_up/arrow_right.svg" alt="" /></button>
                                                </li>
                                                <li>
                                                    <label htmlFor="chk2"><input  onChange={onChangeServiceCheck} checked={state.이용약관동의.includes('개인정보 수집∙이용 동의(필수)')} type="checkbox" name='chk2' id='chk2'  className='chk-btn'  value='개인정보 수집∙이용 동의(필수)' />개인정보 수집∙이용 동의</label>(필수)
                                                    <button><span>약관보기</span><img src="./img/sign_up/arrow_right.svg" alt="" /></button>
                                                </li>
                                                <li>
                                                    <label htmlFor="chk3"><input  onChange={onChangeServiceCheck} checked={state.이용약관동의.includes('개인정보 수집∙이용 동의(선택)')} type="checkbox" name='chk3' id='chk3'  className='chk-btn'  value='개인정보 수집∙이용 동의(선택)' />개인정보 수집∙이용 동의</label>(선택)
                                                    <button><span>약관보기</span><img src="./img/sign_up/arrow_right.svg" alt="" /></button>
                                                </li>
                                                <li>
                                                    <label htmlFor="chk4"><input  onChange={onChangeServiceCheck} checked={state.이용약관동의.includes('무료배송, 할인쿠폰 등 혜택/정보 수신 동의(선택)')}  type="checkbox" name='chk4' id='chk4'  className='chk-btn'  value='무료배송, 할인쿠폰 등 혜택/정보 수신 동의(선택)' />무료배송, 할인쿠폰 등 혜택/정보 수신 동의</label>(선택)
                                                    
                                                </li>
                                                <li className='sns-email-box'>
                                                    <label htmlFor="chk5"><input  onChange={onChangeServiceCheck} checked={state.이용약관동의.includes('SNS')} type="checkbox" name='chk5' id='chk5'  className='chk-btn'  value='SNS' />SNS</label>(선택)
                                                    <label htmlFor="chk6"><input  onChange={onChangeServiceCheck} checked={state.이용약관동의.includes('이메일')} type="checkbox" name='chk6' id='chk6'  className='chk-btn'  value='이메일' />이메일</label>(선택)
                                                    
                                                </li>
                                                <li>
                                                    <p>동의 시 한 달간 [5%적립] + [2만원 이상 무료배송] 첫 주문 후 안내</p>
                                                </li>
                                                <li>
                                                    <label htmlFor="chk7"><input  onChange={onChangeServiceCheck} checked={state.이용약관동의.includes('본인은 만 14세 이상입니다.(필수)')}  type="checkbox" name='chk7' id='chk7'  className='chk-btn'  value='본인은 만 14세 이상입니다.(필수)' />본인은 만 14세 이상입니다.</label>(필수)
                                                    
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </li>   
                            </ul>
                            <div className="button-box">
                                <button type='submit' onClick={onSubmitEvent}  className='submit-btn'>가입하기</button>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </main>
    )
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
        isAddrApiBtn: false,
        isAddrHide: false,

        성별 : '여자',              // string

        생년 : '',              // number
        생월 : '',              // number
        생일 : '',              // number
        isBirth: false,
        text: '',


        추가입력사항 : '',       // string
        추가입력사항입력상자 : '',       // string
        isAddInput: false,
        addInputtxt1: '',
        addInputtxt2: '',

        이용약관내용 : [
            '이용약관 동의(필수)',
            '개인정보 수집∙이용 동의(필수)',
            '개인정보 수집∙이용 동의(선택)',
            '무료배송, 할인쿠폰 등 혜택/정보 수신 동의(선택)',
            'SNS',
            '이메일',
            '본인은 만 14세 이상입니다.(필수)'
        ],
        이용약관동의 : []        // 배열 array
    }
}

export default SignUpComponent;