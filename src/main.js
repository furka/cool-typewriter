export default class Typewriter {
  constructor () {
    this.queue = [];
    this.paused = false;
    this.started = false;

    this._paused = this.paused;
    this._started = this.started;
  }

  //define an element that will have the typing effect applied to it
  //the element and all its children will be typed out
  //this can be called multiple times - each element will be added to the queue
  type (el) {
    if (!el) {
      return;
    }

    this._queue(el);

    el.childNodes.forEach(node => this.type(node));

    return this;
  }

  //start typing
  //empties all elements
  start () {
    this.started = true;
    return this;
  }

  //stop typing
  //losing anything that wasn't typed
  stop () {
    this.started = false;
    return this;
  }

  //pause typing
  pause () {
    this.paused = true;
    return this;
  }

  //resume typing
  resume () {
    this.paused = false;
    return this;
  }

  //instantly complete typing
  complete () {
    this.queue.forEach(focus => {
      focus.el.nodeValue += focus.text;
    });

    this.stop();

    return this;
  }


  set started (val) {
    val = Boolean(val);

    if (val === false) {
      this.queue.length = 0;
    }

    if (val === true && !this.started) {
      this.queue.forEach(focus => focus.el.nodeValue = "");
      this._type();
    }

    this._started = val;
  }

  get started () {
    return this._started;
  }

  set paused (val) {
    val = Boolean(val);

    this._paused = val;

    if (val === false) {
      this._type();
    }
  }

  get paused () {
    return this._paused;
  }

  _queue (el) {
    if (el.nodeType != el.TEXT_NODE) {
      return;
    }

    if (this.queue.find(entry => entry.el === el)) {
      return;
    }

    this.queue.push({
      el: el,
      text: el.nodeValue
    });
  }

  _type () {
    if (this.paused) {
      return;
    }

    let focus = this.queue[0];

    if (!focus) {
      return this.stop();
    }

    let char = focus.text.charAt(0);

    focus.el.nodeValue += char;
    focus.text = focus.text.substring(1);

    if (focus.text.length === 0) {
      this.queue.shift();
    }

    if (!char.trim()) {
      this._type();
    } else {
      requestAnimationFrame(() => this._type());
    }
  }
}