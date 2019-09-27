const db = require('../db');
const APIError = require('../rest').APIError;
const sendmail = require('../mail');
const helper = require('../helper');
const cache = require('../redis');
const qiniu = require('../qiniu');


let User = db.User,
    User_Log = db.User_Log,
    Article = db.Article;
module.exports = {
    'GET /api/products': async (ctx, next) => {
        var id = 1;
        return db.sequelize.transaction(function (t) {
            return User.findOne({
                id: id
            }, {
                    transaction: t
                }).then(function (result) {
                    console.log(result);
                    ctx.rest({
                        products: result
                    });
                }).catch(function (err) {
                    console.log(err); s
                });
        });
    },
    //发送邮件
    'POST /api/sendemail': async (ctx, next) => {
        var email = ctx.request.body.email;
        var password = ctx.request.body.password;
        var bs64 = helper.base64(email);
        var random = helper.randomString();

        //首先查询数据库是否已存在该email，如果存在就抛出提示不存在就插入
        return User.findAll({
            where: {
                email: email
            }
        }).then(function (result) {
            //判断是否存在
            if (result.length > 0) {
                return ctx.rest({
                    code: 0,
                    msg: '该邮箱已注册，请不要重复注册'
                })
            } else {
                //不存在发送邮件并写入数据库
                var saveUser = {
                    email: email,
                    password: helper.MD5(password),
                    status: 0
                };
                return User.create(saveUser)
                    .then(function (result) {
                        sendmail("<strong>Hi,欢迎注册书戈！</strong><br/>请点击下面的链接来激活你的账号！<br/>http://127.0.0.1:3000/register/validate/" + random + bs64, email);
                        ctx.rest({
                            code: result.email.length > 0 ? 1 : 0,
                            msg: '请登录您的注册邮箱来激活账号！如果收件箱没有收到，请检查下垃圾邮件，thx'
                        });
                    }).catch(function (err) {
                        ctx.rest({
                            code: 0,
                            msg: err
                        })
                    });
            }
        }).catch(function (err) {
            ctx.rest({
                code: 0,
                msg: err
            })
        });
    },
    //激活账户
    'GET /api/register/:str': async (ctx, next) => {
        //前面程序加了10位，如果小于等于10就是人为修改过的
        var str = ctx.params.str || '';
        if (str.length <= 10) {
            return ctx.rest({
                code: 0,
                msg: 'url不合法'
            });
        }
        //获取email
        var email = helper.base64Decode(str.substring(10, str.length));
        //根据email查询用户注册信息，如果status=0继续激活流程，如果=1重复激活
        return User.findAll({
            where: {
                email: email
            }
        }).then(function (user) {
            //未激活状态，去激活
            if (user.length > 0 && user[0].status == 0) {
                return User.update({
                    status: 1,
                    add_time: Date.now()
                }, {
                        where: {
                            id: user[0].id
                        }
                    }).then(function (result) {
                        //激活成功
                        ctx.rest({
                            code: result.length > 0 ? 1 : 0,
                            msg: '激活成功，请登录开启您的书戈吧！'
                        })
                    }).catch(function (err) {
                        //sql执行出错，激活失败
                        ctx.rest({
                            code: 0,
                            msg: err.message
                        })
                    })
            } else {
                //数据库未查到该email或者已经激活
                ctx.rest({
                    code: 0,
                    msg: 'url不合法或已经激活！'
                })
            }
        }).catch(function (err) {
            //sql查询出错
            ctx.rest({
                code: 0,
                msg: err.message
            })
        })
    },
    //登录
    'POST /api/login': async (ctx, next) => {
        var email = ctx.request.body.email;
        var password = helper.MD5(ctx.request.body.password);
        var ip = helper.ip(ctx);
        return User.findOne({
            where: {
                email: email,
                password: password,
                status: 1
            }
        }).then(function (result) {
            console.log(result);
            if (result == null) {
                ctx.rest({
                    code: 0,
                    msg: '账号未激活或密码错误'
                });
            } else {
                // 登录成功，保存缓存
                cache.set('user', JSON.stringify(result.dataValues), 604800);
                // 保存登录记录
                var log = {
                    user_id: result.dataValues.id,
                    ip: ip,
                    add_time: Date.now()
                };
                User_Log.create(log);
                ctx.rest({
                    code: 1,
                    msg: result.dataValues.nickname != null ? '/home' : '/edit'
                })
            }
        }).catch(function (err) {
            ctx.rest({
                code: 0,
                msg: err.message
            });
        })
    },
    // 退出账户
    'POST /api/logout': async (ctx, next) => {
        cache.set('user', null);
        ctx.rest({
            code: 1
        })
    },
    // 获取七牛token
    'GET /api/upToken': async (ctx, next) => {
        var token = qiniu.uptoken();
        if (token) {
            ctx.rest({
                uptoken: token
            });
        }
    },
    // 获取用户信息
    'GET /api/userinfo': async (ctx, next) => {
        return cache.get('user')
            .then(function (result) {
                var user = JSON.parse(result);
                var userinfo = {
                    avatar: user.avatar,
                    nickname: user.nickname,
                    profile: user.profile,
                    sex: user.sex
                }
                ctx.rest({
                    code: 1,
                    user: userinfo
                })
            }).catch(function (err) {
                ctx.rest({
                    code: 0,
                    msg: err.message
                });
            })
    },
    // 修改头像
    'POST /api/updateavatar': async (ctx, next) => {
        var avatar = ctx.request.body.avatar;
        if (avatar.length == 0) {
            ctx.rest({
                code: 0,
                msg: '修改头像失败'
            });
        }
        return cache.get('user')
            .then(function (result) {
                // 验证登录
                var user = JSON.parse(result);
                if (user == null) {
                    ctx.rest({
                        code: 0,
                        msg: '请先登录'
                    });
                } else {
                    // 修改头像
                    return User.update({
                        avatar: avatar
                    }, {
                            where: {
                                id: user.id
                            }
                        }).then(function (result) {
                            // 更新缓存信息
                            user.avatar = avatar;
                            cache.set('user', JSON.stringify(user), 604800);

                            ctx.rest({
                                code: result.length > 0 ? 1 : 0,
                            })
                        }).catch(function (err) {
                            ctx.rest({
                                code: 0,
                                msg: err.message
                            })
                        })
                }
            }).catch(function (err) {
                ctx.rest({
                    code: 0,
                    msg: err.message
                });
            })
    },
    // 修改用户信息
    'POST /api/updateuser': async (ctx, next) => {
        var nickname = ctx.request.body.nickname,
            profile = ctx.request.body.profile,
            sex = ctx.request.body.sex;
        // 修改用户信息 同时更新用户信息缓存
        return cache.get('user')
            .then(function (result) {
                var user = JSON.parse(result);
                if (user != null) {
                    // 修改用户信息
                    return User.update({
                        nickname: nickname,
                        profile: profile,
                        sex: sex,
                        update_time: Date.now()
                    }, {
                            where: {
                                id: user.id
                            }
                        }).then(function (result) {
                            //更新缓存
                            if (result.length > 0) {
                                user.nickname = nickname;
                                user.profile = profile;
                                user.sex = sex;
                                cache.set('user', JSON.stringify(user), 604800);
                                ctx.rest({
                                    code: result.length > 0 ? 1 : 0
                                });
                            }
                        }).catch(function (err) {
                            ctx.rest({
                                code: 0,
                                msg: err.message
                            });
                        })
                }
            }).catch(function (err) {
                ctx.rest({
                    code: 0,
                    msg: err.message
                });
            })
    },
    //发布文章
    'POST /api/release': async (ctx, next) => {
        var title = ctx.request.body.title,
            content = ctx.request.body.content;
        
        return cache.get('user')
            .then(function (result){
                var user = JSON.parse(result);
                if (user != null){
                    // 保存文章
                    var aritcle = {
                        user_id: user.id,
                        title: title,
                        content: content,
                        type_id: 0,
                        is_release: 1,
                        is_del: 0,
                        read_num: 0,
                        like_num: 0,
                        comment_num: 0,
                        add_time: Date.now()
                    }
                    return Article.create(aritcle)
                        .then(function (result){
                            ctx.rest({
                                code: 1
                            });
                        }).catch(function (err) {
                            ctx.rest({
                                code: 0,
                                msg: err.message
                            });
                        })
                }
            }).catch(function (err) {
                ctx.rest({
                    code: 0,
                    msg: err.message
                });
            })
    },
    //获取文章列表
    'GET /api/list': async (ctx, next) => {
        return Article.findAll({
            include:[{
                model: User
            }],where: {
                is_release: 1,
                is_del: 0
            }
        }).then(function (result){
            ctx.rest({
                code: 1,
                articles: result
            })
        }).catch(function (err) {
            ctx.rest({
                code: 0,
                msg: err.message
            });
        })
    }
};