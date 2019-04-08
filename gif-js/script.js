


function draw(ev) {
    let ctx = document.getElementById('canvas').getContext('2d')
    let rotateCtx = document.getElementById('secretCanvasRotate').getContext('2d')
    let img = new Image()
    let f = document.getElementById("uploadimage").files[0]
    let url = window.URL || window.webkitURL
    let src = url.createObjectURL(f)

    img.src = src;
    img.onload = () => {
        let imgWidth = img.width
        let imgHeight = img.height
        canvas.width = imgWidth
        canvas.height = imgHeight
        let renderElem = document.getElementById('render')
        renderElem.width = imgWidth
        renderElem.height = imgHeight
        let secretCanvas = document.getElementById('secretCanvas')
        secretCanvas.width = imgWidth
        secretCanvas.height = imgHeight
        let secretCanvasRotate = document.getElementById('secretCanvasRotate')
        secretCanvasRotate.width = imgHeight
        secretCanvasRotate.height = imgWidth


        ctx.drawImage(img, 0, 0);
        rotateCtx.drawImage(img, secretCanvasRotate.width/2 - imgWidth/2, secretCanvasRotate.height/2 - imgHeight/2);


        var gif = new GIF({
          workers: 2,
          quality: 10,
           width: imgWidth,
           height: imgHeight,
           workerScript: 'gif-lib/gif.worker.js'
        });

        gif.on('finished', (blob) => {
          let renderElem = document.getElementById('render')
          renderElem.src = URL.createObjectURL(blob)
        });

        let nrOfFrames = document.getElementById('nrOfFrames').value
        let delayBetweenFrames = document.getElementById('delayBetweenFrames').value
        let glitchAmount = 1

        // first frame
        gif.addFrame(ctx, {copy: true, delay: 1500});

        for (let i = 0; i < nrOfFrames; i++) {

            if (Math.random() * 1000 < 500) {
                rotateCanvas(rotateCtx, secretCanvasRotate, img, 90)

                glitchImage('secretCanvasRotate', glitchAmount, 'secretCanvasRotate', () => {

                    copyRotatedCanvas(() => {
                        let hiddenContext = document.getElementById('secretCanvas').getContext('2d')
                        gif.addFrame(hiddenContext, {copy: true, delay: delayBetweenFrames});
                    })

                })
            } else {
                glitchImage('canvas', glitchAmount, 'secretCanvas', () => {
                    let hiddenContext = document.getElementById('secretCanvas').getContext('2d')
                    gif.addFrame(hiddenContext, {copy: true, delay: delayBetweenFrames});
                })
            }

        }

        setTimeout(() => {
            gif.render();
        }, 1000)

        // gif.render();

    }
}

function rotateCanvas(ctx, canvas, image, degrees = 90) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();
    ctx.translate(canvas.width/2, canvas.height/2);
    ctx.rotate(degrees * Math.PI/180);
    ctx.drawImage(image, -image.width/2, -image.height/2);
    ctx.restore();
}

function copyRotatedCanvas(onDone) {
    let roatedImgBase64 = canvasToBase64JPG('secretCanvasRotate')

    let canvas = document.getElementById('secretCanvas');
    let ctx = secretCanvas.getContext('2d');
    let rotImage = new Image();
    rotImage.onload = function () {
        ctx.drawImage(rotImage, canvas.width/2 - rotImage.width/2, canvas.height/2 - rotImage.height/2);

        rotateCanvas(ctx, canvas, rotImage, -90)

        onDone()
    };
    rotImage.src = roatedImgBase64;
}

document.getElementById("uploadimage").addEventListener("change", draw, false)
