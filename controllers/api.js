const db = require('../db');
const APIError = require('../rest').APIError;
const sendmail = require('../mail');
const helper = require('../helper');
const cache = require('../redis');

let User = db.User;
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
                    password: password,
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
        }).then(function(user){
            //未激活状态，去激活
            if (user.length > 0 && user[0].status == 0){
                return User.update({
                    status: 1
                },{
                    where:{
                        id: user[0].id
                    }
                }).then(function (result){
                    //激活成功
                    ctx.rest({
                        code: result.length > 0 ? 1 : 0,
                        msg: '激活成功，请登录开启您的书戈吧！'
                    })
                }).catch(function (err){
                    //sql执行出错，激活失败
                    ctx.rest({
                        code: 0,
                        msg: err.message
                    })
                })
            }else{
                //数据库未查到该email或者已经激活
                ctx.rest({
                    code: 0,
                    msg: 'url不合法或已经激活！'
                })
            }
        }).catch(function (err){
            //sql查询出错
            ctx.rest({
                code: 0,
                msg: err.message
            })
        })
    },
    'POST /api/login': async (ctx, next) => {
        var email = ctx.request.body.email;
        var password = ctx.request.body.password;
        return User.findOne({
            where: {
                email: email,
                password: password,
                status: 1
            }
        }).then(function(result){
            console.log(result);
            if (result == null){
                ctx.rest({
                    code: 0,
                    msg: '账号不存在或未激活'
                });
            }else{
                cache.set('user', JSON.stringify(result.dataValues), 604800);
                ctx.rest({
                    code: 1,
                    msg: result.dataValues.nickname != null ? '/home' : '/edit' 
                })
            }
        }).catch(function(err){
            ctx.rest({
                code: 0,
                msg: err.message
            });
        })
    },
    'GET /api/edit': async (ctx, next) => {
        this.redirect('/login');
    },
    'POST /api/logout': async (ctx, next) => {
        cache.set('user',null);
        ctx.rest({
            code: 1
        })
    }
};