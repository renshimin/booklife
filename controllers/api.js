const db = require('../model');
const APIError = require('../rest').APIError;
const mailTransport = require('../mail')

let user = db.User;
module.exports = {
    'GET /api/products': async (ctx, next) => {
        return user.getUser()
            .then(function (result){
                console.log(result);
                ctx.rest({
                    products: result
                });
            }).catch(function (err){
                console.log(err);
            })
    },

    'POST /api/sendemail': async (ctx, next) => {
        var email = ctx.request.body.email;
        var options = {
            from: '"你的名字" <struggle_yo@163.com>',
            to: '<'+email+'>',
            subject: '欢迎您注册书戈',
            text: '请点击链接来激活你的账号：',
            html: '<strong>Hi!欢迎注册书戈。</strong><br/>请点击下面的链接来激活您的账号<br/>',
        };

        mailTransport.sendMail(options, function(err,msg){
            if (err){
                console.log(err);
                return ctx.rest({
                    msg: err,
                    code:0
                });
            }else{
                console.log(msg);
                return ctx.rest({
                    msg:msg,
                    code:1
                });
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