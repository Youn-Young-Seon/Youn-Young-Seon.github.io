// let userName = '이름';
// let age = 28;
// let country = '서울';
var 함수 = function (a) {
    return 1;
};
var 회원정보 = {
    name: 'kim',
    plusOne: function (a) {
        return a + 1;
    },
    changeName: function () {
        console.log('안녕');
    }
};
회원정보.plusOne(1);
회원정보.changeName();
function cutZero(str) {
    if (str[0] === '0') {
        return str.slice(1, str.length);
    }
    else {
        return str;
    }
}
function removeDash(str) {
    var newStr = str.replace(/-/g, '');
    var strToNum = parseInt(newStr);
    return strToNum;
}
function pureNumber(str, func1, func2) {
    // let resultStr = func1(str) as string;    
    return func2(func1(str));
}
