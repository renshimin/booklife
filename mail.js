const nodemailer  = require('nodemailer');

var mailTransport = nodemailer.createTransport({
    host : 'smtp.163.com',
    secureConnection: true, // 使用SSL方式（安全方式，防止被窃取信息）
    auth : {
        user : 'struggle_yo@163.com',
        pass : '147852369.'
    },
});

module.exports = mailTransport;