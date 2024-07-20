function getPartOfRandomPassword (length) {
    const chars = ['!', '#', '$', '%', '&', '*', '1', '2', '3', '4', '5', '6', '7', '0', '8', '9', 'A', 'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', 'L', 'K', 'J', 'H', 'G', 'F', 'D', 'S', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', 'l', 'k', 'j', 'h', 'g', 'f', 'd', 's', 'a', 'z', 'x', 'c', 'v', 'b', 'n', 'm'];
    const randomPasswordAr = [];
    for (let i = 0; i < length; i++) {
        let j = Math.floor(Math.random()*(chars.length - 0 +1) + 0);
        randomPasswordAr.push(chars[j]);
    }
    const randomPassword = randomPasswordAr.join('');
    return randomPassword ;
}

function getRandomPassword () {
    return `${getPartOfRandomPassword(5)}-${getPartOfRandomPassword(5)}-${getPartOfRandomPassword(5)}-${getPartOfRandomPassword(5)}`;
}


module.exports = {getRandomPassword};