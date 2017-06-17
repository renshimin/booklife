var geteway = "http://" + window.location.host;
$(function ($) {
    //大于不等于
    $.validator.addMethod("maxnoteqmaxAmount", function (value, element, params) {
        if (Number(params) < (value)) {
            return true;
        }
        return false;
    });

    // 注册
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
                        $(".errinfo").css('display', 'none');
                        $(".okinfo").html(data.msg);
                        $(".okinfo").css('display', 'inline-block');
                    } else {
                        $(".okinfo").css('display', 'none');
                        $(".errinfo").html(data.msg);
                        $(".errinfo").css('display', 'inline-block');
                    }
                });
            }
        });
    }

    // 登录
    $("#login").click(function () {
        $("#loginform").submit();
    })

    if ($("#loginform").length > 0) {
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
            }, showErrors: function (errorMap, errorList) {
                for (var obj in errorMap) {
                    $('#' + obj).addClass('errorinfo');
                    return;
                }
            }, submitHandler: function () {
                var params = {
                    email: $("#email").val(),
                    password: $("#password").val(),
                };
                $.post(geteway + "/api/login", params, function (data) {
                    if (data.code == "1") {
                        window.location.href = data.msg;
                    } else {
                        $(".errinfo").html(data.msg);
                        $(".errinfo").css('display', 'inline-block');
                    }
                });
            }
        })
    }

    // 退出
    $("#logout").click(function () {
        $.post('/api/logout', function (data) {
            if (data.code == 1) {
                window.location.href = "/login";
            } else {
                alert(data.msg);
            }
        })
    });

    // 昵称验证
    $("#nickname").keyup(function () {
        var pfLength = $("#nickname").val().length;
        var num = parseInt(pfLength) - 10;
        if (pfLength > 10) {
            $("#nnerr").html("字数已超过" + num + "个字");
            $("#nickname").addClass('errorinfo');
        } else {
            $("#nnerr").html("");
            $("#nickname").removeClass('errorinfo');
        }
    })
    // 一句话介绍验证
    $("#profile").keyup(function () {
        var pfLength = $("#profile").val().length;
        var num = parseInt(pfLength) - 30;
        if (pfLength > 30) {
            $("#pferr").html("字数已超过" + num + "个字");
            $("#profile").addClass('errorinfo');
        } else {
            $("#pferr").html("");
            $("#profile").removeClass('errorinfo');
        }
    })

    //修改用户信息
    $("#savauser").click(function () {
        $("#editform").submit();
    })

    if ($("#editform").length > 0) {
        $("#editform").validate({
            rules: {
                nickname: {
                    maxlength: 10
                },
                profile: {
                    maxlength: 30
                }
            },
            messages: {
                nickname: {
                    maxlength: "昵称最多10个字符"
                },
                profile: {
                    maxlength: "介绍最多30个字符"
                }
            }, showErrors: function (errorMap, errorList) {
                return;
            }, submitHandler: function () {
                var params = {
                    nickname: $("#nickname").val(),
                    profile: $("#profile").val(),
                    sex: $("input[name='sex']:checked").val()
                };
                $.post(geteway + "/api/updateuser", params, function (data) {
                    if (data.code == "0") {
                        alert(data.msg);
                    }
                });
            }
        })
    }

    // 写作标签处理
    $("#tag").keydown(function (e) {
        if (!e) var e = window.event;
        if (e.keyCode == 13) {
            var tag = $("#tag").val();
            if (tag.length > 0) {
                var txt = "<span>#" + tag + "</span>";
                $("#tagspan").append(txt);
                $("#tag").val("");
            }
        }
    });
    $("#tagspan span").live('click', function () {
        $(this).remove();
    })

    // 文章提交
    $("#savewrite").click(function(){
        $("#writeform").submit();
    })
    if ($("#writeform").length > 0){
        $("#writeform").validate({
            rules: {
                title: {
                    required: true,
                    maxlength: 40
                }
            },
            messages: {
                title: {
                    required: '请输入标题',
                    maxlength: '标题最多输入40个字符'
                }
            }, showErrors: function (errorMap, errorList) {
                for (var obj in errorMap) {
                    $('#' + obj).addClass('errorinfo');
                    return;
                }
            }, submitHandler: function () {
                var span_txt="";
                $("#tagspan span").each(function(){
                    span_txt += $(this).text();
                })
                var params = {
                    title: $("#title").val(),
                    content: editor.txt.html(),
                    tags: span_txt
                };
                // $.post(geteway + "/api/login", params, function (data) {
                //     if (data.code == "1") {
                //         window.location.href = data.msg;
                //     } else {
                //         $(".errinfo").html(data.msg);
                //         $(".errinfo").css('display', 'inline-block');
                //     }
                // });
            }
        })
    }
});