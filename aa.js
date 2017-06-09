var geteway =  "http://" + window.location.host;
$(function ($) {
    $.validator.addMethod("regexusername", function (value, element, params) {
        var exp = new RegExp(params);
        return exp.test(value);
    });
    $.validator.addMethod("regexpwd", function (value, element, params) {
        var exp = new RegExp(params);
        return exp.test(value);
    });
    $.validator.addMethod("regexphone", function (value, element, params) {
        var exp = new RegExp(params);
        return exp.test(value);
    });
    $.validator.addMethod("iscard", function (value, element, params) {
        if (params) {
            return isIdCardNo(value);
        }
        return true;
    });
    $.validator.addMethod("borrowrole", function (value, element, params) {
        if (params) {
            if (value == 0) {
                return false;
            }
        }
        return true;
    });
    $.validator.addMethod("regexusername", function (value, element, params) {
        var exp = new RegExp(params);
        return exp.test(value);
    });
    $.validator.addMethod("regexpwd", function (value, element, params) {
        var exp = new RegExp(params);
        return exp.test(value);
    });
    $.validator.addMethod("isuser", function (value, element, params) {
        for (var i = 0; i < params.length; i++) {
            if (value == params[i]) {
                return false;
            }
        }
        return true;
    });
    $.validator.addMethod("address", function (value, element, params) {
        var exp = new RegExp(params);
        return exp.test(value.substring(0, 1));
    });
    $.validator.addMethod("addressmobile", function (value, element, params) {
        var exp = new RegExp(params);
        return exp.test(value);
    });
    $.validator.addMethod("zh", function (value, element, params) {
        var exp = new RegExp(params);
        return exp.test(value);
    });
    $.validator.addMethod("regexnum", function (value, element, params) {
        var exp = new RegExp(params);
        return exp.test(value);
    });
    $.validator.addMethod("minrate", function(value, element, params) {
        if (params <= value) {
            return true;
        }
        return false;
    });
    $.validator.addMethod("maxrate", function (value, element, params) {
        if (Number(params) >= (value)) {
            return true;
        }
        return false;
    });
    $.validator.addMethod("minAmount", function (value, element, params) {
        if (params <= value) {
            return true;
        }
        return false;
    });
    $.validator.addMethod("maxAmount", function (value, element, params) {
        if (Number(params) >= (value)) {
            return true;
        }
        return false;
    });
    //大于不等于
    $.validator.addMethod("maxnoteqmaxAmount", function (value, element, params) {
        if (Number(params) < (value)) {
            return true;
        }
        return false;
    });

    if ($("#resetpwdform").length > 0) {
        $("#resetpwdform").validate({

            , errorPlacement: function (error, element) {
                error.appendTo(element.parent().next(".msgnav"));
            }, submitHandler: function () {
                var data = {
                    userName: $("#username").val(),
                    newPwd: $("#password").val(),
                    newPwd2: $("#password1").val(),
                    mobile: $("#mobile").val(),
                    auth: $("#auth").val()
                };
                $.post(geteway+"/user/reset/pwd",data,function (successData) {
                    if (successData =="1") {
                        alert("修改成功");
                        window.location.href = "/login";
                    }else{
                        alert(successData.errorMessage);
                    }
                });
            }
        });
    }
    if ($("#modifypwdform").length > 0) {
        $("#modifypwdform").validate({
            rules: {
                pwd: {
                    required: true,
                    maxlength: 16,
                    minlength: 8,
                    regexpwd: /[A-Za-z].*[0-9]|[0-9].*[A-Za-z]/

                },
                newpwd: {
                    required: true,
                    maxlength: 16,
                    minlength: 8,
                    regexpwd: /[A-Za-z].*[0-9]|[0-9].*[A-Za-z]/
                },
                newpwd2: {
                    required: true,
                    maxlength: 16,
                    minlength: 8,
                    regexpwd: /[A-Za-z].*[0-9]|[0-9].*[A-Za-z]/,
                    equalTo: "#newpwd"
                }
            },
            messages: {
                pwd: {
                    required: "请输入原密码",
                    maxlength: "请输入最大为16个字符的密码",
                    minlength: "请输入最小为8个字符的密码",
                    regexpwd: "密码由字母，数字和特殊字符组成"
                },
                newpwd: {
                    required: "请输入新密码",
                    maxlength: "请输入最大为16个字符的密码",
                    minlength: "请输入最小为8个字符的密码",
                    regexpwd: "密码由字母，数字和特殊字符组成",
                    equalTo: "密码输入不一致"
                },
                newpwd2: {
                    required: "请且确认新密码",
                    maxlength: "请输入最大为16个字符的密码",
                    minlength: "请输入最小为8个字符的密码",
                    regexpwd: "密码由字母，数字和特殊字符组成",
                    equalTo: "密码输入不一致"
                }

            }, errorPlacement: function (error, element) {
                error.appendTo(element.parent());
            }, submitHandler: function () {
                var data = {
                    pwd: $("#pwd").val(),
                    newPwd: $("#newpwd").val(),
                    newPwd2: $("#newpwd2").val()
                };
                $.post(geteway+"/user/modifypwd",data,function (successData) {
                    if (successData == 1) {
                        alert("修改成功");
                        window.location.reload();
                    }else {
                        alert(successData.errorMessage);
                    }
                });
            }
        });
    }
    if ($("#modifyemailform").length > 0) {
        $("#modifyemailform").validate({
            rules: {
                oldemail: {
                    required: true,
                    email: true
                },
                newemail: {
                    required: true,
                    email: true
                },
                oldemailcode: {
                    required: true,
                    maxlength: 6,
                    minlength: 6,
                    regexnum: /^[0-9]*$/
                },
                newemailcode: {
                    required: true,
                    maxlength: 6,
                    minlength: 6,
                    regexnum: /^[0-9]*$/
                }
            },
            messages: {
                oldemail: {
                    required: "请输入原邮箱",
                    email: "请输入正确的原邮箱"
                },
                newemail: {
                    required: "请输入新邮箱",
                    email: "请输入正确的原邮箱"
                },
                oldemailcode: {
                    required: "请输入验证码",
                    maxlength: "请输入正确的验证码",
                    minlength: "请输入正确的验证码",
                    regexnum: "请输入正确的验证码"
                },
                newemailcode: {
                    required: "请输入验证码",
                    maxlength: "请输入正确的验证码",
                    minlength: "请输入正确的验证码",
                    regexnum: "请输入正确的验证码"
                }
            }, errorPlacement: function (error, element) {
                error.appendTo(element.parent());
            }, submitHandler: function () {
                var data = {
                    oldEmail: $("#oldemail").val(),
                    oldEmailCode: $("#oldemailcode").val(),
                    newEmail: $("#newemail").val(),
                    newEmailCode: $("#newemailcode").val(),
                };
                $.post(geteway + "/user/modifyemail", data, function (data) {
                    if (data == 1) {
                        alert('修改成功');
                        window.location.href = "/user/security";
                    }else {
                        alert(data.errorMessage);
                    }
                });
            }
        });
    }
    if ($("#modifyuseraddressform").length > 0) {
        $("#modifyuseraddressform").validate({
            rules: {
                contactname: {required: true,},
                contactphone: {
                    required: true,
                    regexphone: /^(13[0-9]|14[57]|15[0-35-9]|18[0-9]|17[0-9])[0-9]{8}$/
                },
                zipcode: {
                    required: true,
                    maxlength: 6,
                    minlength: 6,
                    regexnum: /^[0-9]*$/
                },
                provinceid: {required: true},
                cityid: {required: true},
                districtid: { required: true},
                address: {required: true,}
            },
            messages: {
                contactname: {required: "请输入姓名",},
                contactphone: {
                    required: "请输入手机号码",
                    regexphone: "请输入正确的手机号码"
                },
                zipcode: {
                    required: "请输入邮编",
                    maxlength: "请输入正确的邮编",
                    minlength: "请输入正确的邮编",
                    regexnum: "请输入正确的邮编"
                },
                provinceid: {required: "请选择省份"},
                cityid: {required: "请选择城市"},
                districtid: {required: "请选择区县"},
                address: {required: "请填写详细地址"}
            }, errorPlacement: function (error, element) {
                error.appendTo(element.parent());
            }, submitHandler: function () {
                var data = {
                    contactname: $("#contactname").val(),
                    contactphone: $("#contactphone").val(),
                    zipcode: $("#zipcode").val(),
                    provinceid: $("#provinceid").val(),
                    cityid: $("#cityid").val(),
                    districtid: $("#districtid").val(),
                    address: $("#address").val()
                };
                $.post(geteway + "/user/modifyuseraddress", data, function (data) {
                    if (data == 1) {
                        alert('修改成功');
                        window.location.href = "/user/security";
                    }else {
                        alert(data.errorMessage);
                    }
                });
            }
        });
    }

    if ($("#bindemailform").length > 0) {
        $("#bindemailform").validate({
            rules: {
                email: {
                    required: true,
                    email: true
                },
                emailcode: {
                    required: true,
                    maxlength: 6,
                    minlength: 6,
                    regexnum: /^[0-9]*$/
                }
            },
            messages: {
                email: {
                    required: "请输入邮箱地址",
                    email: "请输入正确的邮箱地址"
                },
                emailcode: {
                    required: "请输入验证码",
                    maxlength: "请输入正确的验证码",
                    minlength: "请输入正确的验证码",
                    regexnum: "请输入正确的验证码"
                }

            }, errorPlacement: function (error, element) {
                error.appendTo(element.parent());
            }, submitHandler: function () {
                var data = {
                    Email: $("#email").val(),
                    EmailCode: $("#emailcode").val()
                };
                geteway.postToService(
                    {
                        BindEmail: data
                    }, function (successData) {
                        if (successData == 1) {
                            alert('绑定成功');
                            window.location.href = "/user/security";
                        }

                    }, function (errorData) {
                        console.log(errorData);
                        alert(errorData.errorMessage);
                    }
                );
            }
        });
    }
    if ($("#authbindemail").length > 0) {
        $("#authbindemail").validate({
            rules: {
                email: {
                    required: true,
                    email: true
                },
                emailcode: {
                    required: true,
                    maxlength: 6,
                    minlength: 6,
                    regexnum: /^[0-9]*$/
                }
            },
            messages: {
                email: {
                    required: "请输入原邮箱地址",
                    email: "请输入正确的邮箱地址"
                },
                emailcode: {
                    required: "请输入验证码",
                    maxlength: "请输入正确的验证码",
                    minlength: "请输入正确的验证码",
                    regexnum: "请输入正确的验证码"
                }

            }, errorPlacement: function (error, element) {
                error.appendTo(element.parent().parent().next());
            }, submitHandler: function () {
                var data = {
                    Email: $("#email").val(),
                    EmailCode: $("#emailcode").val()
                };
                geteway.postToService(
                    {
                        VerifyEmail: data
                    }, function (successData) {
                        if (successData == 1) {
                            alert('验证成功');
                            $("#yzemaildiv").hide();
                            $("#newemaildiv").show();
                        }

                    }, function (errorData) {

                        alert(errorData.message);
                    }
                );
            }
        });
    }
    if ($("#editnewemail").length > 0) {
        $("#editnewemail").validate({
            rules: {
                newemail: {
                    required: true,
                    email: true
                },
                newcode: {
                    required: true,
                    maxlength: 6,
                    minlength: 6,
                    regexnum: /^[0-9]*$/
                }
            },
            messages: {
                newemail: {
                    required: "请输入新邮箱地址",
                    email: "请输入正确的邮箱地址"
                },
                newcode: {
                    required: "请输入验证码",
                    maxlength: "请输入正确的验证码",
                    minlength: "请输入正确的验证码",
                    regexnum: "请输入正确的验证码"
                }

            }, errorPlacement: function (error, element) {
                error.appendTo(element.parent().parent().next());
            }, submitHandler: function () {
                var data = {
                    NewEmail: $("#newemail").val(),
                    NewCode: $("#newcode").val()
                };
                geteway.postToService(
                    {
                        BindNewEmail: data
                    }, function (successData) {
                        if (successData == 1) {
                            alert('绑定成功');
                        }
                        window.location.href = "/user/security";

                    }, function (errorData) {

                        alert(errorData.message);
                    }
                );
            }
        });
    }
    if ($("#editnewemail").length > 0) {
        $("#editnewemail").validate({
            rules: {
                newemail: {
                    required: true,
                    email: true
                },
                newcode: {
                    required: true,
                    maxlength: 6,
                    minlength: 6,
                    regexnum: /^[0-9]*$/
                }
            },
            messages: {
                newemail: {
                    required: "请输入新邮箱地址",
                    email: "请输入正确的邮箱地址"
                },
                newcode: {
                    required: "请输入验证码",
                    maxlength: "请输入正确的验证码",
                    minlength: "请输入正确的验证码",
                    regexnum: "请输入正确的验证码"
                }

            }, errorPlacement: function (error, element) {
                if (element.is(":radio")) {
                    error.appendTo(element.parent().parent());
                }
                else if (element.is(":checkbox")) {
                    error.appendTo(element.parent());
                } else {
                    error.appendTo(element.parent());
                }
            }, submitHandler: function () {
                var data = {
                    NewEmail: $("#newemail").val(),
                    NewCode: $("#newcode").val()
                };
                geteway.postToService(
                    {
                        BindNewEmail: data
                    }, function (successData) {
                        if (successData == 1) {
                            alert('绑定成功');
                        }
                        window.location.href = "/user/security";

                    }, function (errorData) {

                        alert(errorData.message);
                    }
                );
            }
        });
    }
    if ($("#regform").length > 0) {
        $("#regform").validate({
            rules: {
                UserName: {
                    required: true,
                    maxlength: 15,
                    minlength: 6,
                    regexusername: /^\w*[a-zA-Z]+\w*$/,
                    isuser:["admin", "bank", "all", "money", "JuLend", "system", "vmd","administrator","admin","administartor","sysadmin"]
                },
                Password: {
                    required: true,
                    maxlength: 16,
                    minlength: 8,
                    regexpwd: /[A-Za-z].*[0-9]|[0-9].*[A-Za-z]/
                },
                PasswordConfirm: {
                    required: true,
                    maxlength: 16,
                    minlength: 8,
                    regexpwd: /[A-Za-z].*[0-9]|[0-9].*[A-Za-z]/,
                    equalTo: "#Password"
                },
                Mobile: {
                    required: true,
                    regexphone: /^(13[0-9]|14[57]|15[0-35-9]|18[0-9]|17[0-9])[0-9]{8}$/
                },
                Captcha: { required: true },
                aeccpet: { required: true },
                PhoneCode: { required: true },
                remote: {
                    data: {
                        UserName: function () {
                            return $('#UserName').val();
                        }
                    },
                    url: "",
                    type: "post"
                }
            },
            messages: {
                UserName: {
                    required: "请输入6-15个字符的用户名",
                    maxlength: "请输入最大为15个字符的用户名",
                    minlength: "请输入最小为6个字符的用户名",
                    regexusername: "用户名由字母，数字和下划线组成，且必须包含字母",
                    isuser:"该用户名不合法"
                },
                Password: {
                    required: "请输入密码",
                    maxlength: "请输入最大为16个字符的密码",
                    minlength: "请输入最小为8个字符的密码",
                    regexpwd: "密码由字母，数字和特殊字符组成，且必须包含字母和数字"
                },
                PasswordConfirm: {
                    required: "请输入确认密码",
                    maxlength: "请输入最大为16个字符的密码",
                    minlength: "请输入最小为8个字符的密码",
                    regexpwd: "密码由字母，数字和特殊字符组成，且必须包含字母和数字",
                    equalTo: "两次密码不一致"
                },
                Mobile: {
                    required: "请输入手机号码",
                    regexphone: "请输入正确的手机号码"
                },
                PhoneCode: { required: "请输入手机验证码" },
                Captcha: { required: "请输入验证码" },
                aeccpet: { required: "请同意" }
            }, errorPlacement: function (error, element) {
                error.appendTo(element.parent().next(".msgnav"));
            }, submitHandler: function () {
                var data = {
                    UserName: $("#UserName").val(),
                    Password: $("#Password").val(),
                    Mobile: $("#RegMobile").val(),
                    Role: $("input[name='Role']:checked").val(),
                    Captcha: $("#Captcha").val(),
                    Key: $("#Key").val(),
                    PhoneCode:$("#PhoneCode").val(),
                    InvitationCode:$("#InvitationCode").val(),
                    regtype:$("#regtype").val()
                };
                $.post(geteway+"/register",data,function (date) {
                    var successData = JSON.parse(date);
                    if(successData.register!=null && successData.register!=undefined ){
                        $("#mobile").val(successData.register.mobile);
                        $("#lblUserName").text(successData.register.userName);
                        $("#regform").parent().hide();
                        $("#Checkform").parent().show();
                        $(".reg-process").find('div[class="p2"]').addClass('on');
                        $(".reg-process-txt").find("div").eq(1).addClass('f-cr2');
                        $(".register-title span").text("开通汇付天下账号")
                    }else {
                        alert(successData.message);
                        $("#authimg").attr("src", '/getcaptcha.sl?encryptText=' + Math.random());
                    }
                });
                // geteway.postToService(
                //     {
                //         Register: data
                //     }, function (successData) {
                //         //console.log(successData);
                //         $("#mobile").val(successData.Register.Mobile);
                //         $("#lblUserName").text(successData.Register.UserName);
                //
                //         $("#regform").parent().hide();
                //         $("#Verifyform").parent().show();
                //         $(".reg-process").find('div[class="p2"]').addClass('on');
                //         $(".reg-process-txt").find("div").eq(1).addClass('f-cr2');
                //     }, function (errorData) {
                //         //console.log(errorData);
                //         alert(errorData.message);
                //         $("#authimg").attr("src", '/captchaimage?encryptText=' + Math.random());
                //     }
                // );
            }
        });
    }
    if ($("#Networkform").length > 0) {
        $("#Networkform").validate({
            rules: {
                ShopAccount: { required: true},
                Url: { required: true}
            },
            messages: {
                ShopAccount: { required: "请输入旺旺名" },
                Url: { required: "请输入网店地址" }
            }, errorPlacement: function (error, element) {
                error.appendTo(element.parent().parent().next(".msgnav"));
            }, submitHandler: function () {
                $("#btnNetwork").attr("disabled", 'disabled');
                var data = {
                    shopAccount: $("input[name='ShopAccount']").val(),
                    url: $("input[name='Url']").val(),
                    shopTypeId: 1
                };
                $.post(geteway+"/user/network",data,function (successData) {
                    if (successData == 1) {
                        alert('申请成功');
                        window.location.reload();
                    }else {
                        $("#btnNetwork").removeAttr("disabled");
                        alert(successData.message);
                    }
                });
            }
        });
    }
    if ($("#Verifyform").length > 0) {
        $("#Verifyform").validate({
            rules: {
                Mobile: { required: true, regexphone: /^(13[0-9]|14[57]|15[0-35-9]|18[0-9]|17[0-9])[0-9]{8}$/ },
                MobileCode: { required: true, maxlength: 6, minlength: 6, regexnum: /^[0-9]*$/ }
            },
            messages: {
                Mobile: { required: "请输入手机号码", regexphone: "请输入正确的手机号码" },
                MobileCode: { required: "请输入验证码" ,minlength:"请输入正确的验证码",maxlength:"请输入正确的验证码",regexnum:"请输入正确的验证码"}
            }, errorPlacement: function (error, element) {
                error.appendTo(element.parent().next(".msgnav"));
            }, submitHandler: function () {
                var data = {
                    Mobile: $("#mobile").val(),
                    MobileCode: $("#MobileCode").val(),
                    IsGiveVoucher: true,
                    Key: $("#Key").val()
                };

                $.post(geteway+"/user/bindmobile",data,function (successData) {
                    if (successData == 1) {
                        $(".userform").hide().last().show();
                        $(".reg-process").find('div').last().addClass('on');
                        $(".reg-process-txt").find("div").eq(2).addClass('f-cr2');
                        fiveMlater("/account");
                    }
                });

                // geteway.postToService(
                //     {
                //         BindMobile: data
                //     }, function (successData) {
                //         if (successData == 1) {
                //             $(".userform").hide().last().show();
                //             $(".reg-process").find('div').last().addClass('on');
                //             $(".reg-process-txt").find("div").eq(2).addClass('f-cr2');
                //             fiveMlater("/account");
                //         }
                //     }, function (errorData) {
                //         //console.log(errorData);
                //         alert(errorData.message);
                //     }
                // );
            }
        });
    }
    if ($("#bindidentity").length > 0) {
        $("#bindidentity").validate({
            focusInvalid: true,
            rules: {
                realname: {
                    required: true,
                    zh: /[\u4E00-\u9FA5]{2,5}(?:·[\u4E00-\u9FA5]{2,5})*/,
                    minlength: 2,
                    maxlength: 13
                },
                idnum: {
                    required: true,
                    iscard: true
                }
            },
            messages: {
                realname: {
                    required: "请输入真实姓名",
                    zh: "请输入至少2位中文",
                    minlength: "真实姓名必须大于2个汉字",
                    maxlength: "真实姓名必须小于13个汉字"
                },
                idnum: {
                    required: "请输入真实的身份证号码",
                    iscard: "请输入正确的身份证号码"
                }
            }, errorPlacement: function (error, element) {
                error.appendTo(element.parent().parent().next(".msgnav"));
            }, submitHandler: function () {

                $("input[type='text']").each(function () {
                    $(this).val(toTxt($(this).val()));
                });
                var data = {
                    realName: $("input[name='realname']").val(),
                    idNum: $("input[name='idnum']").val()
                };
                $.post(geteway+"/user/identity",data,function (successData) {
                    if (successData == 1) {
                        alert("认证成功");
                        window.location.reload();
                    }else {
                        alert("认证失败");
                    }
                });
            }
        });
    }
    if ($("#bindmoileform").length > 0) {
        $("#bindmoileform").validate({
            focusInvalid: true,
            rules: {
                mobile: {
                    required: true,
                    regexphone: /^(13[0-9]|14[57]|15[0-35-9]|18[0-9]|17[0-9])[0-9]{8}$/
                },
                mobilecode: {
                    required: true               }
            },
            messages: {
                mobile: {
                    required: "请输入手机号码",
                    regexphone:"请输入正确的手机号码"
                },
                mobilecode: {
                    required: "请输入验证码"
                }
            }, errorPlacement: function (error, element) {
                error.appendTo(element.parent().parent().next());
            }, submitHandler: function () {

                $("input[type='text']").each(function () {
                    $(this).val(toTxt($(this).val()));
                });
                var data = {
                    mobile: $("#mobile").val(),
                    mobileCode: $("#mobilecode").val()
                };
                $.post(geteway+"/user/bindmobile",data,function (successData) {
                    if (successData == 1) {
                        location.href = "/user/security";
                    }else {
                        alert(successData.errorMessage);
                    }
                });
            }

        });
    }
    if ($("#editmoileform1").length > 0) {
        $("#editmoileform1").validate({
            focusInvalid: true,
            rules: {
                mobile: {
                    required: true,
                    regexphone: /^(13[0-9]|14[57]|15[0-35-9]|18[0-9]|17[0-9])[0-9]{8}$/
                },
                originalmobilecode: {
                    required: true
                }
            },
            messages: {
                mobile: {
                    required: "请输入手机号码",
                    regexphone: "请输入正确的手机号码"
                },
                originalmobilecode: {
                    required: "请输入验证码"
                }
            }, errorPlacement: function (error, element) {
                error.appendTo(element.parent().parent().next());

            }, submitHandler: function () {

                $("input[type='text']").each(function () {
                    $(this).val(toTxt($(this).val()));
                });
                var data = {
                    mobile: $("#mobile").val(),
                    originalMobileCode: $("#originalmobilecode").val()
                };
                $.post(geteway + "/user/originalmobile", data, function (successData) {
                    if (successData == 1) {
                        $("#mobilediv").hide();
                        $("#newmobilediv").show();
                    } else {
                        alert(successData.errorMessage);
                    }
                })
            }
        });
    }
    if ($("#editmoileform2").length > 0) {
        $("#editmoileform2").validate({
            focusInvalid: true,
            rules: {
                newmobile: {
                    required: true,
                    regexphone: /^(13[0-9]|14[57]|15[0-35-9]|18[0-9]|17[0-9])[0-9]{8}$/
                },
                mobilecode: {
                    required: true
                }
            },
            messages: {
                newmobile: {
                    required: "请输入手机号码",
                    regexphone: "请输入正确的手机号码"
                },
                mobilecode: {
                    required: "请输入验证码"
                }
            }, errorPlacement: function (error, element) {
                error.appendTo(element.parent().parent().next());
            }, submitHandler: function () {
                $("input[type='text']").each(function () {
                    $(this).val(toTxt($(this).val()));
                });
                var data = {
                    newmobile: $("#newmobile").val(),
                    newmobilecode: $("#mobilecode").val()
                };
                $.post(geteway+"/user/bindnewmobile",data,function (successData) {
                    if (successData == 1) {
                        location.href = "/user/security";
                    }else {
                        alert(successData.errorMessage);
                    }
                });
            }
        });
    }
    if ($("#publishform").length > 0) {
        $("#publishform").validate({
            focusInvalid: true,
            rules: {
                Title: {
                    required: true
                },
                Amount: {
                    required: true,
                    maxAmount: Number($("#Limit").val().split(",")[1]),
                    minAmount: Number($("#Limit").val().split(",")[0])
                },
                Rate: {
                    required: true,
                    maxrate: Number($("#Rates").val().split(",")[1]),
                    minrate: Number($("#Rates").val().split(",")[0])
                },
                Description: {
                    required: true
                }
            },
            messages: {
                Title: {
                    required: "请输入借款标题"
                },
                Amount: {
                    required: "请输入借款金额",
                    maxAmount: $.validator.format("最大借款金额为{0}元"),
                    minAmount: $.validator.format("借款金额最少为{0}元")
                },
                Rate: {
                    required: "请输入年利率",
                    minrate: $.validator.format("年利率最小为{0}%"),
                    maxrate: $.validator.format("年利率最大为{0}%")
                },
                Description: {
                    required: "请输入借款描述"
                }
            }, errorPlacement: function (error, element) {
                error.appendTo(element.parent());
            }, submitHandler: function () {
                $("#btnOk").attr("disabled", "disabled");

                // $.post("/loan/publish",$('#publishform').serialize(),function (data) {
                //     debugger;
                // });

                $.ajax({
                    cache: true,
                    type: "POST",
                    url: "/loan/publish",
                    data: $('#publishform').serialize(),// 你的formid
                    async: false,
                    error: function (request) {
                        alert(request.responseText);
                        //alert(request);
                        $("#btnOk").removeAttr("disabled");
                    },
                    success: function (data) {
                        if (data > 1) {
                            alert("发布成功！");
                            //window.location.href = "/project/index/" + data; //此处需求修改
                            window.location.href = "/loan/list";
                        } else {
                            $("#btnOk").removeAttr("disabled");
                            alert(data);
                        }
                    }
                });
            }

        });
    }
    //提现
    if ($("#withdrawcashform").length > 0) {
        $("#withdrawcashform").validate({
            focusInvalid: true,
            rules: {
                WithDrawAmount: {
                    required: true,
                    maxAmount: Number($("#yeAmount").attr("amount")),
                    maxnoteqmaxAmount: Number($("#yeAmount").attr("minAmount"))
                }
            },
            messages: {
                WithDrawAmount: {
                    required: "请输入提现金额",
                    maxAmount: "提现金额不能大于可用余额",
                    maxnoteqmaxAmount: "请输入大于" + Number($("#yeAmount").attr("minAmount")) + "的金额"
                }
            }, errorPlacement: function (error, element) {

                error.appendTo(element.parent().parent().next());

            }, submitHandler: function () {
                widthfun();
            }

        });
    }
    if ($("#userinfoform").length > 0) {
        $("#userinfoform").validate({
            focusInvalid: true,
            rules: {
                RealName: {
                    required: true,
                    zh: /[\u4E00-\u9FA5]{2,5}(?:·[\u4E00-\u9FA5]{2,5})*/,
                    minlength: 2,
                    maxlength: 13
                },
                IdNumber: {
                    required: true,
                    iscard: true
                },
                Mobile: {
                    required: true,
                    regexphone: /^(13[0-9]|14[57]|15[0-35-9]|18[0-9]|17[0-9])[0-9]{8}$/
                },
                email: {
                    required: true,
                    email: true
                },
                EducationId: { required: true },
                qq: {
                    required: true,
                    regexnum: /^[0-9]*$/
                },
                MarriageStatusId: { required: true },
                ResidenceTypeId: { required: true },
                city: { required: true },
                city2: { required: true },
                UserDistrictId: { required: true },
                ResidencePhone: {
                    required: true,
                    addressmobile: /((\d{11})|^((\d{7,8})|(\d{4}|\d{3})-(\d{7,8})|(\d{4}|\d{3})-(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1})|(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1}))$)/
                },
                HasBuyCar: { required: true },
                SecondRealName: {
                    required: true,
                    zh: /[\u4E00-\u9FA5]{2,5}(?:·[\u4E00-\u9FA5]{2,5})*/,
                    minlength: 2,
                    maxlength: 13
                },
                SecondRelationShipId: { required: true },
                SecondMobile: {
                    required: true,
                    regexphone: /^(13[0-9]|14[57]|15[0-35-9]|18[0-9]|17[0-9])[0-9]{8}$/
                },
                ThirdRealName: {
                    required: true,
                    zh: /[\u4E00-\u9FA5]{2,5}(?:·[\u4E00-\u9FA5]{2,5})*/,
                    minlength: 2,
                    maxlength: 13
                },
                ThirdRelationShipId: { required: true },
                ThirdMobile: {
                    required: true,
                    regexphone: /^(13[0-9]|14[57]|15[0-35-9]|18[0-9]|17[0-9])[0-9]{8}$/
                },
                BorrowerRoleId: {
                    borrowrole: true
                },
                IncomeTypeId: { required: true },
                IsWelfare: { required: true },
                CompanyTypeId: { required: true },
                WorkYears: { required: true },
                WECompanyName: {
                    required: true,
                    minlength: 2
                },
                Department: {
                    required: true,
                    minlength: 2
                },
                workcity: { required: true },
                workcity2: { required: true },
                WEDistrictId: { required: true },

                WECompanyPhone: {
                    required: true,
                    addressmobile: /((\d{11})|^((\d{7,8})|(\d{4}|\d{3})-(\d{7,8})|(\d{4}|\d{3})-(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1})|(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1}))$)/
                },
                COCompanyName: {
                    required: true,
                    minlength: 2
                },
                COCompanySize: { required: true },
                Companycity: { required: true },
                Companycity2: { required: true },
                CODistrictId: { required: true },

                COCompanyPhone: {
                    required: true,
                    addressmobile: /((\d{11})|^((\d{7,8})|(\d{4}|\d{3})-(\d{7,8})|(\d{4}|\d{3})-(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1})|(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1}))$)/
                },
                BusinessLicenseId: { required: true },
                ShopTypeId: { required: true },
                SellerAccount: { required: true },
                ShopUrl: { required: true },
                Turnover: { required: true, regexnum: /^[0-9]*$/ },
                netcity: { required: true },
                netcity2: { required: true },
                OSDistrictId: { required: true },
                SchoolName: {
                    required: true,
                    minlength: 2
                },
                DormitoryPhone: {
                    required: true,
                    addressmobile: /((\d{11})|^((\d{7,8})|(\d{4}|\d{3})-(\d{7,8})|(\d{4}|\d{3})-(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1})|(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1}))$)/
                },
                SourceRepayment: { required: true },
                OTSourceRepayment: { required: true }
            },
            messages: {
                RealName: {
                    required: "请输入真实姓名",
                    zh: "请输入至少2位中文",
                    minlength: "真实姓名必须大于2个汉字",
                    maxlength: "真实姓名必须小于13个汉字"
                },
                IdNumber: {
                    required: "请输入真实的身份证号码",
                    iscard: "请输入正确的身份证号码"
                },
                Mobile: {
                    required: "请输入手机号码",
                    regexphone: "请输入正确的手机号码"
                },
                email: {
                    required: "请输入邮箱地址",
                    email: "请输入正确的邮箱地址"
                },
                EducationId: { required: "请选择教育程度" },
                qq: { required: "请输入QQ号码", regexnum: "请输入正确的QQ号码" },
                MarriageStatusId: { required: "请选择婚姻状况" },
                ResidenceTypeId: { required: "请选择住房条件" },
                city: { required: "请选择地址所在省份" },
                city2: { required: "请选择地址所在市" },
                UserDistrictId: { required: "请选择地址所在区县" },

                ResidencePhone: {
                    required: "请输入居住电话",
                    addressmobile: "请输入正确的居住电话"
                },

                HasBuyCar: { required: "请选择是否购车" },
                SecondRealName: {
                    required: "请输入第二联系人姓名",
                    zh: "请输入至少2位中文",
                    minlength: "第二联系人姓名最少为2个汉字",
                    maxlength: "第二联系人姓名最少为13个汉字"
                },
                SecondRelationShipId: { required: "请选择第二联系人关系" },
                SecondMobile: {
                    required: "请输入第二联系人手机",
                    regexphone: "请输入正确的第二联系人手机"
                },
                ThirdRealName: {
                    required: "请输入第三联系人姓名",
                    zh: "请输入至少2位中文",
                    minlength: "第三联系人姓名最少为2个汉字",
                    maxlength: "第三联系人姓名最少为13个汉字"
                },
                ThirdRelationShipId: { required: "请选择第三联系人关系" },
                ThirdMobile: {
                    required: "请输入第三联系人手机",
                    regexphone: "请输入正确的第三联系人手机"
                },
                BorrowerRoleId: {
                    borrowrole: "请选择就业状态"
                },
                IncomeTypeId: { required: "请选择收入发放方式" },
                IsWelfare: { required: "请输入是否缴纳社保/公积金" },
                CompanyTypeId: { required: "请输入单位性质" },
                WorkYears: { required: "请输入工作年限" },
                WECompanyName: {
                    required: "请输入单位名称",
                    minlength: "请输入正确的单位名称"
                },
                Department: {
                    required: "请输入任职部门",
                    minlength: "请输入正确的任职部门"
                },
                workcity: { required: "请选择单位地址所在省" },
                workcity2: { required: "请选择单位地址所在市" },
                WEDistrictId: { required: "请选择单位地址所在区县" },

                WECompanyPhone: {
                    required: "请输入单位电话",
                    addressmobile: "请输入正确的单位电话"
                },
                COCompanyName: {
                    required: "请输入公司名称",
                    minlength: "请输入正确的公司名称"
                },
                COCompanySize: { required: "请选择公司人数" },
                Companycity: { required: "请选择经营地址所在省" },
                Companycity2: { required: "请选择经营地址所在市" },
                CODistrictId: { required: "请选择经营地址所在区县" },

                COCompanyPhone: {
                    required: "请输入公司电话",
                    addressmobile: "请输入正确的公司电话"
                },
                BusinessLicenseId: { required: "请选择是否拥有营业执照" },
                ShopTypeId: { required: "请选择所经营的网店" },
                SellerAccount: { required: "请输入卖家帐号" },
                ShopUrl: { required: "请输入店铺地址" },
                Turnover: { required: "请输入月营业额",regexnum:"请输入正确的营业额" },
                netcity: { required: "请选择经营地址所在省" },
                netcity2: { required: "请选择经营地址所在市" },
                OSDistrictId: { required: "请选择经营地址所在区县" },
                SchoolName: {
                    required: "请输入学校名称",
                    minlength: "请输入正确的学校名称"
                },
                DormitoryPhone: {
                    required: "请输入宿舍电话",
                    addressmobile: "请输入正确的宿舍电话"
                },
                SourceRepayment: { required: "请输入还款来源" },
                OTSourceRepayment: { required: "请输入还款来源" }
            }, errorPlacement: function (error, element) {
              if(element.is(":radio")){ error.appendTo(element.parent().parent())}else{
                  error.appendTo(element.parent())
              }

            }, submitHandler: function () {
                $("input[type='text']").each(function () {
                    $(this).val(toTxt($(this).val()));
                });
                $.ajax({
                    cache: true,
                    type: "POST",
                    url: "/user/update",
                    data: $('#userinfoform').serialize(),// 你的formid
                    async: false,
                    datatype:"Json",
                    error: function (request) {
                        alert(request);
                    },
                    success: function (data) {
                        if (data == 1) {
                            alert("保存成功！");
                            window.location.reload();
                        } else {
                            alert(data);
                            if (data == "修改成功") {
                                window.location.reload();
                            }
                        }
                    }
                });
            }

        });
    }
});

function isIdCardNo(num) {
    num = num.toUpperCase();
    if (!(/(^\d{15}$)|(^\d{17}([0-9]|X)$)/.test(num))) {

        return false;
    }
    var len, re;
    len = num.length;
    if (len == 15) {
        re = new RegExp(/^(\d{6})(\d{2})(\d{2})(\d{2})(\d{3})$/);
        var arrSplit = num.match(re);
        var dtmBirth = new Date('19' + arrSplit[2] + '/' + arrSplit[3] + '/' + arrSplit[4]);
        var bGoodDay;
        bGoodDay = (dtmBirth.getYear() == Number(arrSplit[2])) && ((dtmBirth.getMonth() + 1) == Number(arrSplit[3])) && (dtmBirth.getDate() == Number(arrSplit[4]));
        if (!bGoodDay) {

            return false;
        } else {
            var arrInt = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2);
            var arrCh = new Array('1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2');
            var nTemp = 0,
                i;
            num = num.substr(0, 6) + '19' + num.substr(6, num.length - 6);
            for (i = 0; i < 17; i++) {
                nTemp += num.substr(i, 1) * arrInt[i];
            }
            num += arrCh[nTemp % 11];
            return true;
        }
    }
    if (len == 18) {
        re = new RegExp(/^(\d{6})(\d{4})(\d{2})(\d{2})(\d{3})([0-9]|X)$/);
        var arrSplit = num.match(re);
        var dtmBirth = new Date(arrSplit[2] + "/" + arrSplit[3] + "/" + arrSplit[4]);
        var bGoodDay;
        bGoodDay = (dtmBirth.getFullYear() == Number(arrSplit[2])) && ((dtmBirth.getMonth() + 1) == Number(arrSplit[3])) && (dtmBirth.getDate() == Number(arrSplit[4]));
        if (!bGoodDay) {
            return false;
        }
        else {
            var valnum;
            var arrInt = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2);
            var arrCh = new Array('1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2');
            var nTemp = 0,
                i;
            for (i = 0; i < 17; i++) {
                nTemp += num.substr(i, 1) * arrInt[i];
            }
            valnum = arrCh[nTemp % 11];
            if (valnum != num.substr(17, 1)) {

                return false;
            }
            return true;
        }
    }
    return false;
}