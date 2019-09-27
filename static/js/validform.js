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
            },errorPlacement:function(error,element){
                $('#' + element.context.id).addClass('errorinfo');
                return;
            },success: function (label){
                var id=label[0].htmlFor
                $('#' + id).removeClass('errorinfo');
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
                    minlength: 6,
                    maxlength: 16
                }
            },
            messages: {
                email: {
                    required: "请输入邮箱",
                    email: "请输入正确的邮箱"
                },
                password: {
                    required: "请输入密码",
                    minlength: "密码最少6个字符",
                    maxlength: "密码最多16个字符"
                }
            }, errorPlacement: function (error, element) {
                $('#' + element.context.id).addClass('errorinfo');
                return;
            },success: function(label,b){
                var id=label[0].htmlFor
                $('#' + id).removeClass('errorinfo');
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
        var num = parseInt(pfLength) - 12;
        if (pfLength > 12) {
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
                    maxlength: 12
                },
                profile: {
                    maxlength: 30
                }
            },
            messages: {
                nickname: {
                    maxlength: "昵称最多12个字符"
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
                    }else{
                        layer.msg("更新成功！");
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
                var tagsVal = $("#tagspan").text();
                var tv = tagsVal.split("#");
                if ($.inArray(tag,tv) == -1){
                    var txt = "<span>#" + tag + "</span>";
                    $("#tagspan").append(txt);
                }else{
                    layer.msg("标签已存在！");
                }
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
            }, errorPlacement: function (error, element) {
                $("#"+ element.context.id).addClass('errorinfo');
            }, success: function (label) {
                var id = label[0].htmlFor;
                $("#" + id).removeClass('errorinfo');
            }, submitHandler: function () {
                // 文章标签注释
                // var span_txt="";
                // $("#tagspan span").each(function(){
                //     span_txt += $(this).text();
                // })
                var contentVal = editor.txt.html();
                if (contentVal.length < 12){
                    layer.msg("请输入内容");
                    return;
                }
                var params = {
                    title: $("#title").val(),
                    content: editor.txt.html()
                };
                $.post(geteway + "/api/release", params, function (data) {
                    if (data.code == "1") {
                        // window.location.href = data.msg;
                        layer.msg("发布成功");
                    } else {
                        layer.msg(data.msg);
                    }
                });
            }
        })
    }
});