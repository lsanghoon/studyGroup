// 선택 or 선택해제 => 배경색 변경
function cbClick(id) {
  if ($("input:checkbox[id=" + id + "]").is(":checked")) {
    $("#" + id + "Box").css('background-color', '#035772');

  } else {
    $("#" + id + "Box").css('background-color', '#023140');
    if ($("input:checkbox[id=check_all]").is(":checked")) {
      $("#check_all").prop('checked', false);
    }
  }
};

// 전체 선택
$('#check_all').click(function() {
  var chk = $(this).is(":checked");

  if(chk) {
    $(".select_subject input").prop('checked', true);
    $('.item').css('background-color', '#035772');

  } else {
    $(".select_subject input").prop('checked', false);
    $('.item').css('background-color', '#023140');
  }
});

// 현재날짜
var now = new Date();
var year= now.getFullYear();
var mon = (now.getMonth()+1)>9 ? ''+(now.getMonth()+1) : '0'+(now.getMonth()+1);
var day = now.getDate()>9 ? ''+now.getDate() : '0'+now.getDate();
var today = year + '-' + mon + '-' + day;

$('#addBtn').click(function() {      
  // 선택된 체크박스의 값 가져오기
  var selVal = [];
  $("input[name='chklist']:checked").each(function(i) {
    selVal.push($(this).val());
  });
  console.log(selVal);

  var data = {};
  data.selVal = selVal;
  data.today = today;

  $.ajax({
    type: 'post',
    data: JSON.stringify(data),
    contentType: 'application/json',
    url: '/add',
    processData: false,
    success: function(re) {
      console.log(re);
      location.href = "/";
    }
  });
});
