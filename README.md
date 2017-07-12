# cool-typewriter

### Install

```sh
$ npm install --save-dev cool-typewriter
```

### Description
A lightweight `es6` class that simulates typewriter-effects.

### Features
* Can handle any nested DOM structure
* Doesn't mess around with CSS or classes - leaves styling up to you

### Usage

```js
import Typewriter from 'cool-typewriter';

let typewriter = new Typewriter();
typerwriter
  .type(document.getElementByID('demo'))
  .start();
```


## API

Instantiate a new typewriter:

```js
let typewriter = new Typewriter();
```
Each typewriter can type independently from other typewriters. If you need to animate multiple elements simultaneously, use multiple typewriters.

#### `.type(element)`

Define an element to be typed out. The element - including all its descendants - will be typed out.

Can be called multiple times; each element will be queued up and typed out in order when `.start()` is called.

```js
typewriter
  .type(elementA)
  .type(elementB);
```

#### `.start()`

Starts typing all the elements added via `type()`.

#### `.stop()`

Immediately stops typing and clears the queue. Any elements not typed out are lost forever!

#### `.complete()`

Instantly complete any typing animations.

#### `.pause()`

Pause the typewriter

#### `.resume()`

Resume typing after being paused