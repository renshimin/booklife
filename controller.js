const fs = require('fs');	//文件处理

function addControllers(router){
    //获取controllers下所有文件
    var files = fs.readdirSync(__dirname + '/controllers');

    //过滤出所有.js文件
    var js_files = files.filter((f)=>{
        return f.endsWith('.js');
    });

    //处理每个js文件
    for(var f of js_files){
        console.log(`process controller: ${f}`);
        //导入js文件
        let mapping = require(__dirname + '/controllers/' + f);
        for(var url in mapping){
            if (url.startsWith('GET ')){
                var path = url.substring(4);

                router.get(path, mapping[url]);
                console.log(`register URL mapping: GET ${path}`);
            }else if (url.startsWith('POST ')){
                var path = url.substring(5);
                router.post(path,mapping[url]);
                console.log(`register URL mapping: POST ${path}`);
            }else{
                console.log(`invalid URL: ${url}`);
            }
        }
    }
}

module.exports = function(dir){
    let
        controllers_dir = dir || 'controllers',
        router = require('koa-router')();   //处理URL映射  返回的是函数
    addControllers(router,controllers_dir);
    return router.routes();
}