var geteway = "http://" + window.location.host;
$(function ($) {
    //大于不等于
    $.validator.addMethod("maxnoteqmaxAmount", function (value, element, params) {
        if (Number(params) < (value)) {
            return true;
        }
        return false;
    });

    $("#register").click(function () {
        $("#registerform").submit();
    })

    if ($("#registerform").length > 0) {
        $("#registerform").validate({
            rules: {
                email: {
                    required: true,
                    email: true
                },
                password: {
                    required: true,
                    minlength: 6
                }
            },
            messages: {
                email: {
                    required: "请输入邮箱",
                    email: "请输入正确的邮箱"
                },
                password: {
                    required: "请输入密码",
                    minlength: "密码最少6个字符"
                }
            }, showErrors: function (errorMap, errorList) {
                // 遍历错误列表
                for (var obj in errorMap) {
                    // 自定义错误提示效果
                    $('#' + obj).addClass('errorinfo');
                    return;
                }
                // 此处注意，一定要调用默认方法，这样保证提示消息的默认效果
                // this.defaultShowErrors();
            }, submitHandler: function () {
                var params = {
                    email: $("#email").val(),
                    password: $("#password").val(),
                };
                $.post(geteway + "/api/sendemail", params, function (data) {
                    if (data.code == "1") {
                        $(".errinfo").css('display','none');
                        $(".okinfo").html(data.msg);
                        $(".okinfo").css('display','inline-block');
                    } else {
                        $(".okinfo").css('display','none');
                        $(".errinfo").html(data.msg);
                        $(".errinfo").css('display','inline-block');
                    }
                });
            }
        });
    }

    $("#login").click(function(){
        $("#loginform").submit();
    })

    if ($("#loginform").length > 0){
        $("#loginform").validate({
            rules: {
                email: {
                    required: true,
                    email: true
                },
                password: {
                    required: true,
                    minlength: 6
                }
            },
            messages: {
                email: {
                    required: "请输入邮箱",
                    email: "请输入正确的邮箱"
                },
                password: {
                    required: "请输入密码",
                    minlength: "密码最少6个字符"
                }
            },showErrors: function(errorMap, errorList){
                for (var obj in errorMap) {
                    $('#' + obj).addClass('errorinfo');
                    return;
                }
            },submitHandler: function(){
                var params = {
                    email: $("#email").val(),
                    password: $("#password").val(),
                };
                $.post(geteway + "/api/login", params, function (data) {
                    if (data.code == "1") {
                        window.location.href = data.msg;
                    } else {
                        $(".errinfo").html(data.msg);
                        $(".errinfo").css('display','inline-block');
                    }
                });
            }
        }) 
    }


    $("#logout").click(function(){
        $.post('/api/logout', function(data){
            if(data.code == 1){
                window.location.href = "/login";
            }else{
                alert(data.msg);
            }
        })
    })
    
});