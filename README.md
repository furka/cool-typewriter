## Install

```sh
npm install --save-dev cool-typewriter
```

## Description
`cool-typewriter` is a lightweight `es6` library to simulate typewriter-effects. It can handle nested DOM structures and does not manipulate CSS

## Usage

```js
import Typewriter from 'cool-typewriter';

let typewriter = new Typewriter();
typerwriter
  .type(document.getElementByID('demo'))
  .start();
```


## API

Create a new typewriter.

```js
let typewriter = new Typewriter();
```

Multiple typewriters can be instantiated if you need to apply the effect to multiple DOM elements at the same time.

#### `.type(element)`

Define an element to be typed out. The element, including all its descendants will be typed out.

Multiple elements can be added to the same typewriter, these will be queued up.

```js
typewriter
  .type(elementA)
  .type(elementB);
```

#### `.start()`

Empties the elements added via `type()` and starts the typing animation.

#### `.stop()`

Immediately stops typing and clears the queue. Any elements not typed out are lost forever!

#### `.pause()`

Pause the typewriter

#### `.resume()`

Resume typing after being paused

#### `.complete()`

Instantly complete any typing animations.