import React from 'react';

function GoTopComponent({$path}: any){
    return(
        <div id="goTop">
            <a href="!#" className="go-top-btn">
                <img src={`${$path}img/go_top.png`} alt="" />
            </a>
        </div>
    )
}
export default GoTopComponent;