const redis = require('redis');
let client = redis.createClient();
let cache = {};

client.on('ready',function(err){
    console.log('ready');
})

/**
 * 添加
 * @param key 键
 * @param value 值
 * @param expire 过期时间 单位秒，可为空 为空表示不过期
 * @param callback(err, result)
 */
cache.set = function(key, value, expire){
    client.set(key, value, function(err,result){
        if (err){
            console.log(err);
            return;
        }
        if (!isNaN(expire) && expire > 0){
            client.EXPIRE(key, parseInt(expire));
        }
    });
}

/**
 * 查询
 * @param key 键
 * @param callback(err,result)
 */
// callback会造成重复设置headers的问题（Can't set headers after they are sent）改成promise方式
// cache.get = function(key, callback){
//     client.get(key, function(err, result){
//         if (err){
//             console.log(err);
//             callback(err,null);
//             return ;
//         }
//         callback(null, result);
//     });
// }
cache.get = function (key){
    return new Promise(function(resolve, reject){
        var req = client.get(key,function(err,result){
            if (err){
                reject(err);
            }
            resolve(result);
        });
    })
}


module.exports = cache;