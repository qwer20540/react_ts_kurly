import React from 'react';

export default function GoTopComponent({$path}){
    return(
        <div id="goTop">
            <a href="!#" className="go-top-btn">
                <img src={`${$path}img/go_top.png`} alt="" />
            </a>
        </div>
    )
}