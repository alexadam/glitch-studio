var base64Chars = ['A', 'Q', 'g', 'w', 'B', 'R', 'h', 'x', 'C', 'S', 'i', 'y', 'D', 'T', 'j', 'z', 'E', 'U', 'k', '0', 'F', 'V', 'l', '1', 'G', 'W', 'm', '2', 'H', 'X', 'n', '3', 'I', 'Y', 'o', '4', 'J', 'Z', 'p', '5', 'K', 'a', 'q', '6', 'L', 'b', 'r', '7', 'M', 'c', 's', '8', 'N', 'd', 't', '9', 'O', 'e', 'u', '+', 'P', 'f', 'v', '/'];

function canvasToBase64(canvasId) {
    var can = document.getElementById(canvasId);
    return can.toDataURL("image/jpeg");
}

function base64ToCanvas(canvasId, base64Str) {
    var can = document.getElementById(canvasId);
    var ctx = can.getContext('2d');
    var image = new Image();
    image.onload = function () {
        ctx.drawImage(image, 0, 0, image.width, image.height);
    };
    image.src = base64Str;
    return image;
}

String.prototype.replaceAt = function (index, character) {
    if (character === undefined) {
        console.log('aaaa');
    }
    return this.substr(0, index) + character + this.substr(index + character.length);
}

function glitchImage(canvasId, amount) {
    var base64Str = canvasToBase64(canvasId);

    for (var i = 0; i < amount; i++) {
        var ccc = base64Chars[Math.round(Math.random() * (base64Chars.length-1))];
        base64Str = base64Str.replaceAt(Math.round(Math.random() * base64Str.length), ccc);
    }

    return base64ToCanvas(canvasId, base64Str);

}