import React from 'react';

export default function ConfirmModalComponent({msg, isConfirmModalCloseFn}: any){
    
    const onClickClose=(e: any)=>{
        e.preventDefault();       
        isConfirmModalCloseFn(); // 컨펌모달 닫기 함수호출 실행
    }
    
    return(
        <div id="confirmModal">
            <div className="wrap">
                <div className="container">
                    <div className="content">
                        <h2>{msg}</h2>
                    </div>
                    <div className="button-box">
                        <button 
                        className='modal-ok-btn'
                        onClick={onClickClose}
                        >
                        확인
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}   
