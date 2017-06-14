function base64(val) {
    var btxt = new Buffer(val);
    return btxt.toString('base64');
}
function base64Decode(val) {
    var btxt = new Buffer(val, 'base64')
    var a=  btxt.toString();
    return a;
}
function randomString() {
    var str = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    var n = 10, s = "";
    for (var i = 0; i < n; i++) {
        var rand = Math.floor(Math.random() * str.length);
        s += str.charAt(rand);
    }
    return s;
}

module.exports = {
    base64,
    randomString,
    base64Decode
};