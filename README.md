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


### glitchLib.js

demo: https://alexadam.github.io/demos/jslib-glitch/index.html

example:

![alt glitch-mona-jslib.jpg](https://github.com/alexadam/glitch-studio/blob/master/examples/mona-glitch-jslib.png?raw=true)




![alt glitch-mona.gif](https://github.com/alexadam/glitch-studio/blob/master/examples/monalisa-glitch.gif?raw=true)

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

## Credits

PNG codec: https://github.com/devongovett/png.js/

Editor: https://codemirror.net/

GIF lib: https://github.com/jnordberg/gif.js

Background image: https://www.pexels.com/photo/grayscale-photo-of-road-1038935/
