module.exports = {
    'GET /': async (ctx, next) => {
        ctx.render('index.html', {
            title: '首页'
        });
    },
    'GET /login': async (ctx, next) => {
        ctx.render('login.html', {
            title: '登录'
        });
    },
    'GET /register': async (ctx, next) => {
        ctx.render('register.html', {
            title: '注册'
        });
    },
    'GET /edit': async (ctx, next) => {
        ctx.render('edit.html', {
            title: '编辑个人资料'
        });
    }
};