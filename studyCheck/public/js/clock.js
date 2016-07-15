(function(){

  var currentLang = 'ko',
  snippets = [];

  function updateSnippets () {
    var i;
    moment.locale(currentLang);
    for (i = 0; i < snippets.length; i++) {
      snippets[i].render();
    }
  }

  function updateClock(){
    var now = moment(),
        s = now.second(),
        m = now.minutes(),
        h = now.hours(),
        yr = now.year(),
        mon = now.month() + 1,
        day = now.date(),
        second = now.seconds() * 6,
        minute = now.minutes() * 6 + second / 60,
        hour = ((now.hours() % 12) / 12) * 360 + 90 + minute / 12;

    //원형시계바늘
    $('#hour').css("transform", "rotate(" + hour + "deg)");
    $('#minute').css("transform", "rotate(" + minute + "deg)");
    $('#second').css("transform", "rotate(" + second + "deg)");

    // 시간 12시간단위로 보기
    if (h > 12) {
      h -= 12;
    }
    if (h == 0) {
      h = 12;
    }
    // 텍스트 시간
    $('#tHour').html(h);
    $('#tMinute').html(m);
    $('#tSecond').html(s);
    
    //날짜
    $('#years').html(yr);
    $('#months').html(mon);
    $('#days').html(day);
  }

  function timedUpdate () {
    updateClock();
    updateSnippets();
    setTimeout(timedUpdate, 1000);
  }

  timedUpdate();

})();