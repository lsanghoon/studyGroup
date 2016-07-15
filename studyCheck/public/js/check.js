$('#').click(function() {
  var data = {};
  data.selVal = selVal;

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