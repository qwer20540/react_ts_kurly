<?
// 1. 데이터베이스 인증 정보(열기=접속 Connection)
// http://moonjong.dothome.co.kr/react_cra_5/member_insert.php
// moonjong.dothome.co.kr/myadmin/
// moonjong.dothome.co.kr/

// CORS(Crose Origin Resource Sharing) API 접속 허락 헤더문
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: *');

$db_server      = 'localhost';
$db_user_name   = 'moonjong';
$db_password    = 'anstjswhd0105#';
$db_name        = 'moonjong';

$conn = mysqli_connect($db_server, $db_user_name, $db_password, $db_name);
mysqli_set_charset($conn, 'utf8');


// 2. 데이터베이스에 저장 INSERT SQL
// 2-1 입력데이터 : 입력상자 입력데이터 받는다. => AJAX 
$id         = $_POST['id'];
$pw         = $_POST['pw'];
$irum       = $_POST['irum'];
$email      = $_POST['email'];
$hp         = $_POST['hp'];
$addr       = $_POST['addr'];  // 주소1 + 주소2
$gender     = $_POST['gender'];
$birth      = $_POST['birth'];   // 년 + 월 + 일
$addInput   = $_POST['addInput'];
$service    = $_POST['service'];
$gaibDate   = $_POST['gaibDate'];



// 2-2 SQL 인설트 문 INSERT INTO  저장할테이블이름
$sql = "INSERT INTO front5_member_table(id, pw, irum, email, hp, addr, gender, birth, add_input, service, gaib_date) 
        VALUES('$id', '$pw', '$irum', '$email', '$hp', '$addr', '$gender', '$birth', '$addInput', '$service', '$gaibDate' )";
$result = mysqli_query($conn, $sql);




// 2-3 인설트문 실행 결과 확인
if( !$result ){
    echo('데이터베이스 데이터 저장 실패!');
}
else{
    echo( $irum . '데이터베이스 데이터 저장 성공!');
}

// 3. 데이터베이스 닫기

?>