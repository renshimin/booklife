var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');
//配置邮件
var transporter = nodemailer.createTransport(smtpTransport({
    host: "smtp.163.com",
    secureConnection: true,
    port: 465,
    auth: {
        user: 'struggle_zw@163.com',
        pass: 'a147852369',
    }
}));
//发送邮件
function sendmail(html, email) {
    var option = {
        from: "struggle_zw@163.com",
        to: email
    }
    option.subject = '欢迎您注册书戈！'
    option.html = html;
    transporter.sendMail(option, function (error, response) {
        if (error) {
            console.log("fail: " + error);
        } else {
            return response.accepted.length;
            // console.log("success: " + response.accepted.length);
        }
    });
}

module.exports = sendmail;
//调用发送邮件
// sendmail("邮件内容：<br/>这是来自nodemailer发送的邮件！iVan");