import React from 'react';
import ModalComponent from './ModalComponent';
import HeaderComponent from './HeaderComponent';
import IntoMainComponent from './IntoMainComponent';
import SubMain1Component from './SubMain1Component';
import MemberSignUpComponent from './MemberSignUpComponent';
import FooterComponent from './FooterComponent';
import MainModalComponent from './MainModalComponent';
import QuickMenuComponent from './QuickMenuComponent';
import GoTopComponent from './GoTopComponent';


export default function WrapComponent(props) {

    const [isTopModal, setIsTopModal]   = React.useState(true);     // 탑모달
    const [isMainModal, setIsMainModal] = React.useState(true);     // 메인 모달
    const [isIntroMain, setIsIntroMain] = React.useState(true);     // 인트로 메인
    const [isSubMain1, setIsSubMain1]   = React.useState(false);    // 서브 메인1
    const [isMemberSignUp, setIsMemberSignUp]   = React.useState(false);    // 회원가입폼


    // 탑모달을 변경하는 함수 => 닫기버튼 클릭해서 호출 실행
    const topModalState=()=>{
        setIsTopModal(false);
    }

    // 메인모달 상태관리 변경하는 함수 
    const mainModalState=()=>{
        setIsMainModal(false);
    }

    // 로딩시 쿠키 탑모달 쿠키 이름과 쿠키값이 존재하면 탑 모달 숨기기
    const topModalFn=()=>{       
        // console.log( document.cookie ); //쿠키가져오기
        // 1. 쿠키가 없으면 리턴문 수행
        if(document.cookie==='') return;

        // 2. 모든 쿠키 split(';') 쎄미콜론 구분 단위로 가져와서 변수에 배열로 저장
        let result = document.cookie.split(';');        
        // console.log(result);

        // 3. 배열로 저장된 모든 쿠키를 이름, 값 두개로 나누어 split('=') 등호 문자 단위로 분리         
        //    쿠키이름, 쿠키값 저장할 객체 생성                
        let obj = [];
        result.map((item, idx)=>{
            // console.log( idx, item);
            obj[idx] = {
                쿠키이름: item.split('=')[0].trim(),  //.trim() 앞뒤 공백제거
                쿠키값:  item.split('=')[1].trim()
            }
        });
        // console.log( obj );

        // 4. 쿠키이름, 쿠키값 체크(비교 검사)
        // 만약 쿠키이름과 쿠키값이 모두 존재하면 탑모달 숨기기
        // 아니면 탑모달 보이기
        obj.map((item)=>{            
            // console.log( item.쿠키이름, item.쿠키값 );

            if(item.쿠키이름==='MJTOPMODAL'  &&  item.쿠키값==='topmodalclose1day'){
                // console.log( '찾았다 found' );
                setIsTopModal(false); //탑모달 숨기기
            }
            else{
                // console.log( '못았다 not found' );
                setIsTopModal(true);  //탑모달 보이기
            }
        })
    }

    // 로딩시 로컬스토레이지에 메인모달 키가 존재하면 메인 모달 숨기기
    const mainModalFn=()=>{
        // 메인모달
        // 키 MJKURLYMAINMODAL
        // 키값 모달이름 mainModal
        let result = null;
        for(let i=0; i<localStorage.length; i++){
            // console.log(i, localStorage.getItem(localStorage.key(i))  );
            result = JSON.parse(localStorage.getItem('MJKURLYMAINMODAL')); // 메인모달 키
        }

        if(result===null || result==='') return;

        // console.log( result );
        if( result.모달이름==='mainModal'){
            setIsMainModal(false);  //메인모달 숨기기
        }
        else{
            setIsMainModal(true);   //메인모달 보이기
        }

    }
    
    // 리액트 유즈 이팩트 훅 실행
    // 로딩시 실행
    React.useEffect(()=>{
        topModalFn();  // 탑모달 로딩시 체크함수(쿠키 이름 검사)
        mainModalFn(); // 메인모달 로딩시 체크함수(로컬스토레이지 키 검사)
    },[]); //로딩시 1회만 실행 버블링 막아준다


    // 인트로 메인 상태관리 변경 함수
    const introMainFn=()=>{
        setIsIntroMain(true);  // 인트로 메인 보인다.
        setIsSubMain1(false);  // 서브 메인1 숨긴다
        setIsMemberSignUp(false); // 회원가입폼 숨긴다.
    }

    // 서브   메인1 상태관리 변경 함수
    const subMain1Fn=()=>{
        setIsSubMain1(true);    // 서브 메인1 보인다.
        setIsIntroMain(false);  // 인트로 메인 숨긴다.
        setIsMemberSignUp(false);  // 회원가입폼 숨긴다.
    }

    // 회원가입폼
    const memberSignUpFn=()=>{
        setIsMemberSignUp(true); // 회원가입폼 보인다.
        setIsIntroMain(false);  // 인트로 메인 숨긴다.
        setIsSubMain1(false);  // 서브 메인1 숨긴다
    }


    return (
        <div id='wrap'>
            {
                isTopModal && <ModalComponent   topModalState={topModalState}  $path={props.$path} />
            }
            <HeaderComponent  $path={props.$path}  introMainFn={introMainFn}  subMain1Fn={subMain1Fn} memberSignUpFn={memberSignUpFn} />

            {   //인트로 메인 컴포넌트
                isIntroMain && <IntoMainComponent  $path={props.$path} />
            }
            
            {   //서브 메인1(신상품) 컴포넌트 : 제이쿼리 => AJAX /  리액트 => AXIOS
                isSubMain1 && <SubMain1Component /> 
            }

            { 
                isMemberSignUp && <MemberSignUpComponent />
            }

            <FooterComponent  $path={props.$path}  />
            
            {
                isMainModal && <MainModalComponent  mainModalState={mainModalState} />
            }

            <QuickMenuComponent  $path={props.$path}  />
            <GoTopComponent  $path={props.$path}  />
        </div>
    );
};

WrapComponent.defaultProps = {
    $path: './'
}