<?
// CORS API
// 리액트서버와 PHP/MYSQL 서버주소가 서로 다르기때문에 데이터베이스 접속 불가능
// 이걸 해결하기 위해 CORS API 사용

 
// http://moonjong.dothome.co.kr/react_cra_5/member_select.php
// moonjong.dothome.co.kr/myadmin/

// CORS(Crose Origin Resource Sharing) API 접속 허락 헤더문
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: *');

$db_server      = 'localhost';
$db_user_name   = 'moonjong';
$db_password    = 'anstjswhd0105#';
$db_name        = 'moonjong';

$conn = mysqli_connect($db_server, $db_user_name, $db_password, $db_name);
mysqli_set_charset($conn, 'utf8');



//데이터 아이디 조회
$sql = "SELECT id, email FROM front5_member_table";
$result = mysqli_query($conn, $sql);



// 결과 값이 0보다 크면 데이터가 있다 그걸 
// 1행씩 뽑아서 배열처리한다. 
// $row = mysqli_fetch_array($result)  여러번 반복 => 반복문

 // 어떠한 조건이 만족 할 때 까지 계속 반복하는 반복문
 $imsi = array();  //배열선언
 // 배열에 데이터를 푸시(밀어넣기)
 // 1명 이상 >=1 데이터 반복처리   mysqli_num_rows() 줄수를 숫자로 반환
    if( mysqli_num_rows($result) >=1 ){ // > 0
        while( $row = mysqli_fetch_array($result)  ){
            array_push($imsi, array(
                '아이디' => $row['id'],      
                '이메일' => $row['email']  
            ));
        }    
    }


// JSON 인코딩
echo json_encode($imsi, JSON_UNESCAPED_UNICODE);  //유니코드형식으로 보낸다.(그래서 UNICODE 사용안함(언-유니코드))
//  \DKDKS2134123  이스케이프 문자 유니코드

?>