import React from 'react';

function MemberSignInComponent() {
    return (
        <main id="main">
        
            <section id="signIn">
                <div className="container">
                    <div className="title">
                        <h2>로그인</h2>
                    </div>
                    <div className="content">
                        <form id="signIn" name="sign_in" method="post" action="./response.php">
                            <ul>
                                <li><input type="text" id="id" name="id" placeholder="아이디를 입력해주세요" /></li>
                                <li><input type="password" id="pw" name="pw" placeholder="비밀번호를 입력해주세요" /></li>
                                <li><a href="!#">아이디찾기</a><i>|</i><a href="!#">비밀번호찾기</a></li>
                                <li><button type="submit" className="submit-btn">로그인</button></li>
                                <li><button type="button" className="member-signin-btn">회원가입</button></li>
                            </ul>    
                        </form>
                    </div>
                </div>
            </section>

        </main>
    );
};

export default MemberSignInComponent;