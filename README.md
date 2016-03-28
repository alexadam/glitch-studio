# glitch-studio
data bending &amp; glitch tools

## JavaScript tools

### Dynamic Glitch

demo: https://alexadam.github.io/demos/dynamic-glitch/index.html

examples:

https://vimeo.com/160601444

https://vimeo.com/160601817

![alt dyn-glitch-ex.png](https://github.com/alexadam/glitch-studio/blob/master/examples/dyn-glitch-ex.png?raw=true)

### glitchLib.js

demo: https://alexadam.github.io/demos/jslib-glitch/index.html

example:

![alt glitch-mona-jslib.jpg](https://github.com/alexadam/glitch-studio/blob/master/examples/mona-glitch-jslib.png?raw=true)

## bash tools

### glitch.sh

```
./glitch.sh sourceFile <amount, optional, default 10>  
```

it works with any file type  
the output is a new file named "glitch_sourceFile"  
"amount" is an integer between 1 and n -> how many times (random between 1 and n) to randomly change bytes in the original file

### gifsy.sh

```
./gifsy.sh sourceImage <nrOfFrames, optional, default 25> <delayBetweenFrames, optional, default 10>
```

convert an image to .gif

### after_gifsy_and_glitch.sh

```
./after_gifsy_and_glitch.sh sourceImage
```
repair the glitched .gif

#### bash tools example 1:

```
./gifsy.sh monalisa.jpg
./glitch.sh monalisa.gif 100
./after_gifsy_and_glitch.sh glitch_monalisa.gif
```

input image:

![alt monalisa.jpg](https://github.com/alexadam/glitch-studio/blob/master/examples/monalisa.jpg?raw=true)

result:

![alt glitch-mona.gif](https://github.com/alexadam/glitch-studio/blob/master/examples/monalisa-glitch.gif?raw=true)

#### bash tools example 2:

```
./glitch.sh monalisa.jpg 25
```

result:

![alt glitch-mona.jpg](https://github.com/alexadam/glitch-studio/blob/master/examples/monalisa-glitch.jpg?raw=true)
