


function draw(ev) {
    console.log(ev);
    var ctx = document.getElementById('canvas').getContext('2d'),
        img = new Image(),
        f = document.getElementById("uploadimage").files[0],
        url = window.URL || window.webkitURL,
        src = url.createObjectURL(f);

    img.src = src;
    img.onload = () => {
        canvas.width = img.width
        canvas.height = img.height
        let renderElem = document.getElementById('render')
        renderElem.width = img.width
        renderElem.height = img.height
        ctx.drawImage(img, 0, 0);
        // url.revokeObjectURL(src);


        // var canvas = document.getElementById('canvas');
        //     canvas.width = 150;
        //     canvas.height = 150;
        //
        //     var ctx = canvas.getContext('2d');
        //     ctx.font = "bold 70px Helvetica"
        //     ctx.textAlign = 'center'
        //     ctx.textBaseline = 'middle'
        //     ctx.lineWidth = 3;
        //     ctx.fillStyle = "rgb(0, 0, 0)";

        var gif = new GIF({
          workers: 2,
          quality: 10,
           width: img.width,
           height: img.height,
           workerScript: 'gif-lib/gif.worker.js'
        });

        // gif.addFrame(document.getElementById('imgg'), {delay: 500});
        // gif.addFrame(ctx, {copy: true, delay: 500});

        let nrOfFrames = document.getElementById('nrOfFrames').value
        let delayBetweenFrames = document.getElementById('delayBetweenFrames').value

        for (let i = 0; i < nrOfFrames; i++) {
            gif.addFrame(ctx, {copy: true, delay: delayBetweenFrames});
        }


        setTimeout(() => {
            ctx.font = "bold 70px Helvetica"
            ctx.textAlign = 'center'
            ctx.textBaseline = 'middle'
            ctx.lineWidth = 3;
            ctx.fillStyle = "rgb(0, 0, 0)";
            ctx.fillText("Hello World", 10, 50);

            gif.addFrame(ctx, {copy: true, delay: 500});

            gif.render();

        }, 1000)


        gif.on('finished', (blob) => {
          // window.open(URL.createObjectURL(blob));
          let renderElem = document.getElementById('render')
          renderElem.src = URL.createObjectURL(blob)
        });

        // gif.render();

    }
}

document.getElementById("uploadimage").addEventListener("change", draw, false)
