//************* OTP Generator ***********/
const crypto = require('crypto');

// Generate a random OTP
module.exports.generateOTP = (num) => {
    if (num === 6) {
        return crypto.randomInt(100000, 1000000).toString(); // 6-digit OTP
    }
}