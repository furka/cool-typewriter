const EMPTY_TYPING_CLASS = 'cool-typewriter-empty';
const TYPING_CLASS = 'cool-typewriter-typing';

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
      Typewriter.reveal(focus.el);
      Typewriter.unsetTyping(focus.el);
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
      this.queue.forEach(focus => {
        focus.el.nodeValue = "";
        Typewriter.hide(focus.el);
      });

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
    Typewriter.reveal(focus.el);
    Typewriter.setTyping(focus.el);
    focus.text = focus.text.substring(1);

    if (focus.text.length === 0) {
      Typewriter.unsetTyping(focus.el);
      this.queue.shift();
    }

    if (!char.trim()) {
      this._type();
    } else {
      requestAnimationFrame(() => this._type());
    }
  }

  //removes the typing class from an element and all its parents
  static reveal (el) {
    if (el.classList) {
      el.classList.remove(EMPTY_TYPING_CLASS);
    }

    if (el.parentNode) {
      Typewriter.reveal(el.parentNode);
    }
  }

  //adds the typing class to an element or its parent if the element is a text node
  static hide (el) {
    if (el.classList) {
      el.classList.add(EMPTY_TYPING_CLASS);
    } else {
      el.parentNode.classList.add(EMPTY_TYPING_CLASS);
    }
  }

  static setTyping (el) {
    el.parentNode.classList.add(TYPING_CLASS);
  }

  static unsetTyping (el) {
    el.parentNode.classList.remove(TYPING_CLASS);
  }
}