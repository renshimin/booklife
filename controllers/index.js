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
    },
    'GET /write': async (ctx, next) => {
        ctx.render('write.html', {
            title: '写作'
        });
    },
    'GET /home': async (ctx, next) => {
        ctx.render('home.html', {
            title: '书戈'
        });
    },
    'GET /test': async (ctx, next) => {
        ctx.render('test.html', {
            title: '书戈' 
        });
    }
};