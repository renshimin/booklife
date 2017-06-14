const cache = require('./redis');
cache.get('user',function(err,result){
    if (err){
        console.log(err)
        return;
    }
    console.log(result)
})