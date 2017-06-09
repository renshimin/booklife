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
                }
                // 此处注意，一定要调用默认方法，这样保证提示消息的默认效果
                // this.defaultShowErrors();
            }, submitHandler: function () {
                var data = {
                    email: $("#email").val(),
                    password: $("#password").val(),
                };
                $.post(geteway + "/user/reset/pwd", data, function (successData) {
                    if (successData.code == "1") {
                        alert("修改成功");
                        window.location.href = "/login";
                    } else {
                        alert(successData.errorMessage);
                    }
                });
            }
        });
    }
});