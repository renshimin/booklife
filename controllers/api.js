const db = require('../db');
const APIError = require('../rest').APIError;
const sendmail = require('../mail');
const helper = require('../helper');

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
                        sendmail("<strong>Hi,欢迎注册书戈！</strong><br/>请点击下面的链接来激活你的账号！<br/>http://127.0.0.1:3000/register/" + random + bs64, email);
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
        var str = ctx.params.str || '';
        if (str.length <= 10) {
            ctx.rest({
                code: 0,
                msg: 'url不合法'
            });
        }
        var email = helper.base64Decode(str.substring(10, str.length));
        return User.findAll({
            where: {
                email: email
            }
        }).then(function(result){
            if (result.length > 0 && result[0].status == 0){

            }else{
                ctx.rest({
                    code: 0,
                    msg: 'url不合法'
                })
            }
        })



    },
    'DELETE /api/products/:id': async (ctx, next) => {
        console.log(`delete product ${ctx.params.id}...`);
        var p = products.deleteProduct(ctx.params.id);
        if (p) {
            ctx.rest(p);
        } else {
            throw new APIError('product:not_found', 'product not found by id.');
        }
    }
};