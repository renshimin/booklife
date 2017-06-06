module.exports = {
    'GET /': async (ctx, next) => {
        ctx.render('index.html', {
            title: '你好'
        });
    }
};