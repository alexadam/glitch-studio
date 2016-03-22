# glitch-studio
data bending &amp; glitch tools

## bash tools

### gifsy.sh

```
./gifsy.sh sourceImage <nrOfFrames, optional, default 25> <delayBetweenFrames, optional, default 10>
```

convert an image to .gif

### glitch.sh
```
./glitch.sh sourceFile <amount, optional, default 10>  
```

the output is a new file named "glitch_sourceFile"
"amount" is an integer, between 1 and n -> how many times (random between 1 and n) to apply the random glitch generator

### after_gifsy_and_glitch.sh

```
./after_gifsy_and_glitch.sh sourceImage
```

repair the glitched .gif

#### bash tools example:

```
./gifsy.sh monalisa.jpg
./glitch.sh monalisa.gif 100
./after_gifsy_and_glitch.sh glitch_monalisa.gif
```

input image:

![alt monalisa.jpg](https://github.com/alexadam/glitch-studio/blob/master/examples/monalisa.jpg?raw=true)

result:

![alt glitch-mona.gif](https://github.com/alexadam/glitch-studio/blob/master/examples/monalisa-glitch.gif?raw=true)
