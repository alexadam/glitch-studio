let base64Chars = ['A', 'Q', 'g', 'w', 'B', 'R', 'h', 'x', 'C', 'S', 'i', 'y', 'D', 'T', 'j', 'z', 'E', 'U', 'k', '0', 'F', 'V', 'l', '1', 'G', 'W', 'm', '2', 'H', 'X', 'n', '3', 'I', 'Y', 'o', '4', 'J', 'Z', 'p', '5', 'K', 'a', 'q', '6', 'L', 'b', 'r', '7', 'M', 'c', 's', '8', 'N', 'd', 't', '9', 'O', 'e', 'u', '+', 'P', 'f', 'v', '/'];

function canvasToBase64JPG(canvasId) {
    let can = document.getElementById(canvasId);
    return can.toDataURL("image/jpeg");
}

function base64ToCanvas(canvasId, base64Str, onDone) {
    let can = document.getElementById(canvasId);
    let ctx = can.getContext('2d');
    let image = new Image();
    image.onload = function () {
        ctx.drawImage(image, 0, 0, image.width, image.height);
        onDone()
    };
    image.src = base64Str;
    return image;
}

String.prototype.replaceAt = function (index, character) {
    return this.substr(0, index) + character + this.substr(index + character.length);
}

function glitchImage(fromCanvasId, amount, toCanvasId, onDone) {
    let base64Str = canvasToBase64JPG(fromCanvasId);

    for (let i = 0; i < amount; i++) {
        let ccc = base64Chars[Math.round(Math.random() * (base64Chars.length-1))];
        base64Str = base64Str.replaceAt(Math.round(Math.random() * base64Str.length), ccc);
    }

    return base64ToCanvas(toCanvasId, base64Str, onDone);

}

function glitchRotateImage(fromCanvasId, rotateCanvasId, amount, toCanvasId, onDone) {
    let srcCanvas = document.getElementById('fromCanvasId')
    let srcCtx = srcCanvas.getContext('2d')
    let rotateCanvas = document.getElementById('rotateCanvasId')
    let rotateCtx = rotateCanvas.getContext('2d')

    rotateCtx.drawImage(srcCanvas, 0, 0);

    var image = document.createElement("img");
    image.onload = function(){
        ctx.drawImage(image,canvas.width/2-image.width/2,canvas.height/2-image.width/2);
    }
    image.src = "houseicon.png";

    return base64ToCanvas(toCanvasId, base64Str, onDone);

}
