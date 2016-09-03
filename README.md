# glitch-studio
data bending &amp; glitch tools

## JavaScript tools

### Dynamic Glitch

Glitch an image by randomly changing a codec's internal parameters. In these examples you can dynamically change a JavaScript implementation of the PNG decoder (on the left pane) and see the live result (on the right pane). To edit faster, click & hold (or Ctrl + ~) on the underlined items -> it works on Math functions, operators and numbers.

demo: https://alexadam.github.io/demos/dynamic-glitch/index.html

examples:

https://vimeo.com/160601444

https://vimeo.com/160601817

![alt dyn-glitch-ex.png](https://github.com/alexadam/glitch-studio/blob/master/examples/dyn-glitch-ex.png?raw=true)

PNG decoder: https://github.com/devongovett/png.js/

Editor: https://codemirror.net/

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

## Installation

### Requirements

This software requires the following libraries:

*   [imagemagick](https://www.imagemagick.org/script/index.php)
*   [shuf (via coreutils)](https://www.gnu.org/software/coreutils/coreutils.html)
*   [gifsicle](https://www.lcdf.org/gifsicle/)

If you're on Mac OSX, you can install it via brew:

```sh
brew install imagemagick coreutils gifsicle
```
