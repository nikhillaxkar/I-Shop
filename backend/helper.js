const Cryptr = require('cryptr');
const cryptr = new Cryptr('ishop_token_$#@!');
const Razorpay=require('razorpay');
const crypto = require('crypto');


function verifySingnature(order_id,razorpay_payment_id,razorpay_signature){
    const secret="pN1FMq5d4P1hugD22JAL9BJr";
    const generated_signature=crypto.createHmac('sha256',secret)
    .update(`${order_id}|${razorpay_payment_id}`)
    .digest('hex');
    return generated_signature === razorpay_signature;
}

var razorpayinstance = new Razorpay({
    key_id: 'rzp_test_uL2zwO9D0uEUoK',
    key_secret: 'pN1FMq5d4P1hugD22JAL9BJr',
  });

function getRandomName(file_name){
    return new Date().getTime()+Math.floor(Math.random()*1000)+file_name;
}

function encryptPassowrd(password){
    return cryptr.encrypt(password);
}


function decryptPassowrd(password){
    return cryptr.decrypt(password);
}

module.exports={getRandomName,decryptPassowrd,encryptPassowrd,razorpayinstance,verifySingnature};

