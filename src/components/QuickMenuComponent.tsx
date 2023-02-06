import React from 'react';

function QuickMenuComponent({$path}: any){
    return(
        <div id="quickMenu">
            <div className="row1">
                <a href="!#" className="info-btn">
                    <img src={`${$path}img/deliveryInfo_20220701-a7b19dac069402e4b2aea7edbed0f6e0.png`} alt="" />
                </a>
            </div>
            <div className="row2">
                <ul>
                    <li><a href="!#" className="row2-btn1">등급별 혜택</a></li>
                    <li><a href="!#" className="row2-btn2">페시피</a></li>
                    <li><a href="!#" className="row2-btn3">베스트 찾기</a></li>
                </ul>
            </div>
            <div className="row3">
                <div className="up-box">
                    <a href="!#" className="up-btn"><img src={`${$path}img/arrow_up.png`} alt="" /></a>
                    <h2>최근본상품</h2>
                </div>
                <div className="view-box">
                    <ul>
                        <li>
                            <div className="gap"><a href="!#"><img src={`${$path}img/1648205698964l0.jpeg`} alt="" /></a></div>
                        </li>
                        <li>
                            <div className="gap"><a href="!#"><img src={`${$path}img/1647395046860l0.jpg`} alt="" /></a></div>
                        </li>
                        <li>
                            <div className="gap"><a href="!#"><img src={`${$path}img/1637927746254l0.jpg`} alt="" /></a></div>
                        </li>
                    </ul>
                </div>
                <div className="down-box">
                    <a href="!#" className="down-btn"><img src={`${$path}img/arrow_down.png`} alt="" /></a>
                </div>
            </div>
        </div>
    )
}

export default QuickMenuComponent;