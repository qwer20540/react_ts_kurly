import React from 'react';
import SignUpComponent from './member_signup/SignUpComponent';
import ConfirmModalComponent from './member_signup/ConfirmModalComponent';

export default function MemberSignUpComponent(){

    const [state, setState] = React.useState({
        is컨펌모달: false,
        msg: '',
        isTimer: false
    });

    // is컨펌모달 상태 변경 함수 : 컨펌모달창 열기 함수
    const isConfirmModalFn=(msg)=>{
        setState({
            ...state,
            is컨펌모달: true,
            msg: msg
        })
    }

    // is컨펌모달 상태 변경 함수 : 컨펌모달창 닫기 함수
    const isConfirmModalCloseFn=()=>{
        let isTimer = false;
        if( state.msg.indexOf('인증번호') >= 0 ){
            isTimer = true;
        }
        else {
            isTimer = false;
        }
        setState({
            ...state,
            is컨펌모달: false,
            msg: '',
            isTimer: true
        })
    }

     return(
        <>  {/* 플래그먼트(빈태그) */}
          <SignUpComponent isConfirmModalFn={isConfirmModalFn} isTimer={state.isTimer}  />
          { state.is컨펌모달 && <ConfirmModalComponent msg={state.msg}  isConfirmModalCloseFn={isConfirmModalCloseFn} /> }
        </>
    )
}