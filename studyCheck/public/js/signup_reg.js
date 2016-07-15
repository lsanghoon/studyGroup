function check(id) {
    var oid = $("#" + id).val();
    var oMsg = $("#" + id + "Msg");
    var oDiv = $("#" + id + "Form");
//    var btn = $("#joinBtn");

    if (oid == "") {
        oDiv.removeClass("has-success");
        oDiv.addClass("has-error");
        oMsg.css("display", "block");
        oMsg.html("필수 정보입니다.");
        return false;
    }
    
    if (id == "uName") {
        var isName = /^[가-힝a-zA-Z]{2,}$/;
        if (!isName.test(oid)) {
            oDiv.removeClass("has-success");
            oDiv.addClass("has-error");
            oMsg.css("display", "block");
            oMsg.html("이름을 입력해주세요");
            return false;
        }
        oDiv.removeClass("has-error");
        oDiv.addClass("has-success");
        oMsg.css("display", "block");
        oMsg.html("");
        return true;
    }
    
    if (id == "uTel") {
        var isTel = /^[0-9]{10,11}$/;
        if (!isTel.test(oid)) {
            oDiv.removeClass("has-success");
            oDiv.addClass("has-error");
            oMsg.css("display", "block");
            oMsg.html("'-'없이 입력해주세요");
            return false;
        }
        oDiv.removeClass("has-error");
        oDiv.addClass("has-success");
        oMsg.css("display", "block");
        oMsg.html("");
        return true;
    }
};