
/*
간단히 요약하면
node server.js 실행 -> http://localhost:3000 접속 -> index.html 호출 -> 

메뉴선택 -> ui-sref -> route.js -> patientData.js -> server.js -> data.js -> MySQL 컨넥션 연결 -> 쿼리 실행 
-> patientData.js의 success안에 data로 리턴 -> $scope.patients = data;
-> ui-view로 patients배열 값들을 이용한 patientData.html 출력 

-> 리스트목록에서 환자 선택 -> ui-sref, ng-click -> route.js -> patientData.js
-> $scope.setCurrentPatients = function(patient) { -> $scope.patient = patient;
-> ui-view로 patient배열 값을 이용한 patientData.list.html 출력 
*/





/*
조금더 자세히 설명하자면
                        // 시작~ index.html, Angular.js, Node.js
                        
node server.js 를 실행하고 http://localhost:3000 로 접속하면 index.html 페이지가 나타난다
index.html 페이지는 first라는 클래스를 가진 div태그로 메인 매뉴를 생성한다.
.first 에는 유저 정보와 메뉴들이 존재하며 각 매뉴들은 ui-sref 를 통해 output을 결정한다.


                        // 앵귤러 route 부분
                        
메뉴를 선택하면 ui-sref에 연결되어있는 값을 따라 route.js에서 명시된 대로 
해당 state를 찾아 그안에 있는 url, templateUrl, controller 의 값을 통해 
url을 설정, 탬플릿 url에 있는 html을 ui-view로 출력, controller가 존재한다면 해당 컨트롤러에 대한 작업을 수행한다.

좀더 자세히 보면 patient Data 메뉴를 선택 후 'ui-sref=patientData'이 실행되므로 
route.js에서 patientData라는 state를 찾아간 후 http://localhost:3000/patientData 로 url이 변경되면서 
views/patientData.html 이 위치에 있는 탬플릿을 가져와 index.html에 존재하는 ui-view 에 출력해준다.


                        // 앵큘러 컨트롤러 부분
                        
이때 'PatientDataListCtrl'라고 명시된 컨트롤러를 찾아 patientData.js 로 가게된다.
patientData.js 에는 처음 load_names();을 호출하고 그아래 load_names에 대한 펑션을 작성한다.
load_names에서는 $http를 통해 GET 방식으로 "http://localhost:3000/patientListLoad"를 호출한다.


                        // 노드 server.js 부분
                        
/patientListLoad를 호출하게되면 node.js에서 해당 컨트롤러를 찾아가게 된다.
server.js에 보면 app.get('/patientListLoad', dataController.patientListLoad);이렇게 
/patientListLoad 해당 url에 대한 접근이 오면 dataController 안에 있는 patientListLoad를 찾아가게끔 되어있다.
dataController의 위치는 server.js 상단부분에 var dataController = require('./controllers/data'); 이렇게 명시되어 있다.

따라서 data.js에 patientListLoad가 exports 되어있는 것을 볼수있다.


                        // 노드의 컨트롤러 부분
                        
patientListLoad를 보기전에 data.js 상단부분을 잠깐 설명하자면
connection이라는 변수를 두고 MySQL에대한 컨넥션을 생성한다. 하지만 이때 컨넥션은 준비만 될뿐 생성되지 않는다.
그아래 connection.connect를 수행하므로서 컨넥션이 연결이 된다.

그럼 다시 patientListLoad로 돌아와서 
이곳에서는 아까 생성한 컨넥션을 이용해 DB에 select * from users 라는 쿼리를 수행한다.
이때 function에 err에는 쿼리문이 실패할경우 에러가 들어올변수이고 
rows는 쿼리가 성공했을때 결과값이 들어 있는 변수이다.
쿼리가 실패했다면 console.log를 통해에러가 출력될것이고

성공했다면 res.end(JSON.stringify(rows))를 통해 결과값을 JSON형태로 
처음 /patientListLoad을 호출한 patientData.js 로 결과값을 response 해준다.


                        // 앵귤러의 컨트롤러 부분
                        
그러면 .success(function(data) { ... 의 data에 결과값이 들어가게되어
$scope.patients 에 data 결과값을 넣어주고 patientData.html에 ng-repeat(for문과 비슷한 기능을한다.)를 통해
patients에 담긴 배열들을 item이라는 변수에 배열을 하나씩 넣어
item.NAME, item.AGE 등 과 같은 방식으로 값을 불러와 넣어주고 모든 배열이 끝날때까지 반복하여 만들어준다.

patientData.html에 보면 a태그 안에 ng-click="setCurrentPatients(item)"이 있는데
이것은 a 태그를 클릭할때마다 setCurrentPatients(item)이 실행될것이다.
item은 반복문이 돌때 사용하는 변수와 같은 하나의 배열에대한 값들 이다.
ex) {'ID':1,'NAME':'aa','AGE':20,'BLOODTYPE':'A'} 이것이 item에 들어있다.

클릭하게되면 ui-sref="patientData.list"를 통해 아까와 같이 route.js에가서 state를 찾고
그안에있는 탬플릿(patientData.list.html)을 ui-view로 출력한다. 그리고 ng-click을 통해
item에 있는 값이 patientData.js에있는  // (ui-sref="patientData.list" 이것에 연결된 컨트롤러도 patientData이다.)
$scope.setCurrentPatients = function(patient) { 의
patient에 들어가게 되고 $scope.patient 에 값을 넣어준후 
patientData.list.html 에서 {{ patient.ID }} 와같은 형식으로 출력할수 있다.

*/




/*
MySQL

CREATE TABLE USERS (
  ID INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  NAME VARCHAR(20) NOT NULL,
  AGE INT NOT NULL,
  BLOODTYPE VARCHAR(20),
  ROOM VARCHAR(20)
)

INSERT INTO USERS(NAME,AGE,BLOODTYPE,ROOM)
VALUES('HRT',20,'AB','ROOM300');

INSERT INTO USERS(NAME,AGE,BLOODTYPE,ROOM)
VALUES('HRC',23,'A','ROOM300');

INSERT INTO USERS(NAME,AGE,BLOODTYPE,ROOM)
VALUES('GG',22,'O','ROOM300');

INSERT INTO USERS(NAME,AGE,BLOODTYPE,ROOM)
VALUES('CDE',28,'AB','ROOM300');

INSERT INTO USERS(NAME,AGE,BLOODTYPE,ROOM)
VALUES('DDT',20,'B','ROOM300');

INSERT INTO USERS(NAME,AGE,BLOODTYPE,ROOM)
VALUES('CCC',29,'B','ROOM301');

INSERT INTO USERS(NAME,AGE,BLOODTYPE,ROOM)
VALUES('CCD',25,'A','ROOM301');

INSERT INTO USERS(NAME,AGE,BLOODTYPE,ROOM)
VALUES('DDD',27,'O','ROOM301');

INSERT INTO USERS(NAME,AGE,BLOODTYPE,ROOM)
VALUES('FFF',30,'O','ROOM301');
*/