import React from 'react';
import SignUpComponent from './member_signup/SignUpComponent';
import ConfirmModalComponent from './member_signup/ConfirmModalComponent';

function MemberSignUpComponent({introMainFn}: any){

    const [state, setState] = React.useState({
        is컨펌모달: false,
        msg: '',
        isTimer: false
    });


    // is컨펌모달 상태 변경 함수 : 컨펌모달창 열기 함수
    const isConfirmModalFn=(msg: string)=>{
        setState({
            ...state,
            is컨펌모달: true,
            msg: msg
        })
    }

    // is컨펌모달 상태 변경 함수 : 컨펌모달창 닫기 함수
    const isConfirmModalCloseFn=()=>{
        let isTimer = false;

        if( state.msg.indexOf('인증번호') !==-1 ){  // 0 이상이면  즉  !== -1  -1 이 아니면 
            isTimer = true; // 타이머작동            
        }
        else {
            isTimer = false; // 타이머정지
        }

        setState({
            ...state,
            is컨펌모달: false,
            msg: '',
            isTimer: isTimer
        })
    }

     return(
        <>  {/* 플래그먼트(빈태그) */}
          <SignUpComponent isConfirmModalFn={isConfirmModalFn} isTimer={state.isTimer} introMainFn={introMainFn}  />
          { state.is컨펌모달 && <ConfirmModalComponent msg={state.msg}  isConfirmModalCloseFn={isConfirmModalCloseFn}  /> }
        </>
    )
}

export default MemberSignUpComponent;