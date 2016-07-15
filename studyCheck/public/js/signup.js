var imgName;

// 기본 radio 체크설정 
$("#profile_1").prop('checked',true);

// 선택된 이미지 이름 가져오기 확장자 제외
$(".imgToggle").change(function() {
  imgName = $(this).val();
}).change();