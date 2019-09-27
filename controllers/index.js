const cache = require('../redis');

module.exports = {
    'GET /': async (ctx, next) => {
        return cache.get('user')
            .then(function (result) {
                var user = JSON.parse(result);
                if (user == null) {
                    ctx.render('index.html', {
                        title: '首页',
                        islogin: false
                    });
                } else {
                    ctx.render('index.html', {
                        title: '首页',
                        islogin: true
                    });
                }
            }).catch(function (err) {
                console.log(err);
            })
    },
    'GET /login': async (ctx, next) => {
        return cache.get('user')
            .then(function (result) {
                var user = JSON.parse(result);
                if (user == null) {
                    ctx.render('login.html', {
                        title: '登录',
                        islogin: false
                    });
                } else {
                    ctx.render('index.html', {
                        title: '书戈',
                        islogin: true
                    });
                }
            }).catch(function (err) {
                console.log(err);
            })
    },
    'GET /register': async (ctx, next) => {
        return cache.get('user')
            .then(function (result) {
                var user = JSON.parse(result);
                if (user == null) {
                    ctx.render('register.html', {
                        title: '注册',
                        islogin: false
                    });
                } else {
                    ctx.render('index.html', {
                        title: '书戈',
                        islogin: true
                    });
                }
            }).catch(function (err) {
                console.log(err);
            })
    },
    'GET /edit': async (ctx, next) => {
        return cache.get('user')
            .then(function (result) {
                var user = JSON.parse(result);
                if (user == null) {
                    ctx.render('login.html', {
                        title: '登录',
                        islogin: false
                    });
                } else {
                    ctx.render('edit.html', {
                        title: '编辑个人资料',
                        islogin: true
                    });
                }
            }).catch(function (err) {
                console.log(err);
            })
    },
    'GET /write': async (ctx, next) => {
        return cache.get('user')
            .then(function (result) {
                var user = JSON.parse(result);
                if (user == null) {
                    ctx.render('home.html', {
                        title: '首页',
                        islogin: false
                    });
                } else {
                    ctx.render('write.html', {
                        title: '写作',
                        islogin: true
                    });
                }
            }).catch(function (err) {
                console.log(err);
            })

    },
    'GET /home': async (ctx, next) => {
        return cache.get('user')
            .then(function (result) {
                var user = JSON.parse(result);
                if (user == null) {
                    ctx.render('home.html', {
                        title: '首页',
                        islogin: false
                    });
                } else {
                    ctx.render('home.html', {
                        title: '首页',
                        islogin: true
                    });
                }
            }).catch(function (err) {
                console.log(err);
            })
    },
    'GET /read': async (ctx, next) => {
        ctx.render('read.html', {
            title: '书戈'
        });
    },
    'GET /register/validate/:str': async (ctx, next) => {
        ctx.render('validate.html', {
            title: '激活账号'
        });
    },
    'GET /layout': async (ctx, next) => {
        ctx.render('layout.html')
    }
};