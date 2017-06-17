// const multer = require('koa-multer');
// //文件上传  
// //配置  
// var storage = multer.diskStorage({  
//   //文件保存路径  
//   destination: function (req, file, cb) {  
//     cb(null, 'uploads/head/')  
//   },  
//   //修改文件名称  
//   filename: function (req, file, cb) {  
//     var fileFormat = (file.originalname).split(".");  
//     cb(null,Date.now() + "." + fileFormat[fileFormat.length - 1]);  
//   }  
// })  
// //加载配置  
// var upload = multer({ storage: storage });  


// module.exports = upload;

// //路由  
// // router.post('/upload', upload.single('file'), async (ctx, next) => {  
// //   ctx.body = {  
// //     filename: ctx.req.file.filename
// //   }  
// // })  

const qiniu = require('qiniu');

//需要填写你的 Access Key 和 Secret Key
qiniu.conf.ACCESS_KEY = 'kvTeylLEAxeq5HkjXWS96RaysYipG6W48WZmxQu1';
qiniu.conf.SECRET_KEY = 'bW4ZQNB1hHDnU7vI6tTRSzPiDmzOgJ6se0v4lWlY';

//要上传的空间
bucket = 'avatar';
//上传到七牛后保存的文件名
// key = 'my-nodejs-logo.png';

//构建上传策略函数
function uptoken() {
  var putPolicy = new qiniu.rs.PutPolicy(bucket);
  return putPolicy.token();
}
//生成上传 Token
// token = uptoken(bucket, key);

//构造上传函数
function uploadFile(uptoken, key, localFile) {
  var extra = new qiniu.io.PutExtra();
    qiniu.io.putFile(uptoken, key, localFile, extra, function(err, ret) {
      if(!err) {
        // 上传成功， 处理返回值
        console.log(ret.hash, ret.key, ret.persistentId);       
      } else {
        // 上传失败， 处理返回代码
        console.log(err);
      }
  });
}
//调用uploadFile上传
// uploadFile(token, key, filePath);
module.exports = {
  uptoken
}