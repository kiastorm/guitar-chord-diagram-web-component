/*! guitar-chord-diagram v0.0.1 | (c) 2023 Kia Storm | MIT License | http://github.com/kiastorm/chorducate */

// src/utils/reef.js
function e(e2, t2, n = document) {
  let i = new CustomEvent(`chorducate:${e2}`, { bubbles: true, cancelable: true, detail: t2 });
  return n.dispatchEvent(i);
}
function t(e2) {
  return "string" == typeof e2 ? document.querySelector(e2) : e2;
}
var o = class {
  constructor(t2, n, i = "") {
    let r = "signal" + (i ? `-${i}` : "");
    Object.defineProperties(this, { value: { get: () => structuredClone(t2), set: () => true } });
    for (let i2 in n)
      "function" == typeof n[i2] && (this[i2] = function(...o2) {
        n[i2](t2, ...o2), e(r, t2);
      });
  }
};
function l(e2 = {}, t2 = {}, n = "") {
  return new o(e2, t2, n);
}
var u = ["input", "option", "textarea"];
var c = ["value", "checked", "selected"];
var d = ["checked", "selected"];
function a(e2) {
  return ["false", "null", "undefined", "0", "-0", "NaN", "0n", "-0n"].includes(e2);
}
function f(e2, t2, n, i) {
  if (!t2.startsWith("on") || !i)
    return;
  if (e2[t2])
    return;
  let r = i[n.split("(")[0]];
  r && (e2[t2] = r);
}
function h(e2, t2) {
  let n = t2.replace(/\s+/g, "").toLowerCase();
  return !(!["src", "href", "xlink:href"].includes(e2) || !n.includes("javascript:") && !n.includes("data:text/html")) || (!!(e2.startsWith("on") || e2.startsWith("@on") || e2.startsWith("#on")) || void 0);
}
function m(e2, t2, n, i) {
  f(e2, t2, n, i), h(t2, n) || (c.includes(t2) && (e2[t2] = "value" === t2 ? n : " "), e2.setAttribute(t2, n));
}
function g(e2, t2) {
  c.includes(t2) && (e2[t2] = ""), e2.removeAttribute(t2);
}
function p(e2, t2) {
  if (1 === e2.nodeType) {
    for (let { name: n, value: i } of e2.attributes) {
      if (h(n, i)) {
        g(e2, n), f(e2, n, i, t2);
        continue;
      }
      if (!n.startsWith("@") && !n.startsWith("#"))
        continue;
      let r = n.slice(1);
      g(e2, n), d.includes(r) && a(i) || m(e2, r, i, t2);
    }
    if (e2.childNodes)
      for (let n of e2.childNodes)
        p(n, t2);
  }
}
function b(e2) {
  return e2.childNodes && e2.childNodes.length ? null : e2.textContent;
}
function y(e2, t2, n) {
  let i = e2.childNodes, r = t2.childNodes;
  (function(e3) {
    let t3 = e3.querySelectorAll("script");
    for (let e4 of t3)
      e4.remove();
  })(e2) || (i.forEach(function(e3, o2) {
    if (!r[o2]) {
      let i2 = e3.cloneNode(true);
      return p(i2, n), void t2.append(i2);
    }
    if (l2 = e3, s = r[o2], "number" == typeof l2.nodeType && l2.nodeType !== s.nodeType || "string" == typeof l2.tagName && l2.tagName !== s.tagName || "string" == typeof l2.id && l2.id && l2.id !== s.id || "getAttribute" in l2 && "getAttribute" in s && l2.getAttribute("key") !== s.getAttribute("key") || "string" == typeof l2.src && l2.src && l2.src !== s.src) {
      let i2 = function(e4, t3) {
        if (1 !== e4.nodeType)
          return;
        let n2 = e4.getAttribute("id"), i3 = e4.getAttribute("key");
        if (!n2 || !i3)
          return;
        let r2 = n2 ? `#${n2}` : `[key="${i3}"]`;
        return t3.querySelector(`:scope > ${r2}`);
      }(e3, t2);
      if (!i2) {
        let t3 = e3.cloneNode(true);
        return p(t3, n), void r[o2].before(t3);
      }
      r[o2].before(i2);
    }
    var l2, s;
    if (i[o2] && "hasAttribute" in i[o2] && i[o2].hasAttribute("reef-ignore"))
      return;
    if (function(e4, t3, n2) {
      if (1 !== e4.nodeType)
        return;
      let i2 = e4.attributes, r2 = t3.attributes;
      for (let { name: r3, value: o3 } of i2) {
        if (r3.startsWith("#"))
          continue;
        if (c.includes(r3) && u.includes(e4.tagName.toLowerCase()))
          continue;
        let i3 = r3.startsWith("@") ? r3.slice(1) : r3;
        d.includes(i3) && a(o3) ? g(t3, i3) : m(t3, i3, o3, n2);
      }
      for (let { name: e5, value: n3 } of r2)
        i2[e5] || c.includes(e5) && u.includes(t3.tagName.toLowerCase()) || g(t3, e5);
    }(e3, r[o2], n), e3.nodeName.includes("-"))
      return;
    let f2 = b(e3);
    if (f2 && f2 !== b(r[o2]) && (r[o2].textContent = f2), e3.childNodes.length || !r[o2].childNodes.length) {
      if (!r[o2].childNodes.length && e3.childNodes.length) {
        let t3 = document.createDocumentFragment();
        return y(e3, t3, n), void r[o2].appendChild(t3);
      }
      e3.childNodes.length && y(e3, r[o2], n);
    } else
      r[o2].innerHTML = "";
  }), function(e3, t3) {
    let n2 = e3.length - t3.length;
    if (!(n2 < 1))
      for (; n2 > 0; n2--)
        e3[e3.length - 1].remove();
  }(r, i));
}
function v(n, i, r) {
  let o2 = t(n), l2 = function(e2) {
    let t2 = new DOMParser().parseFromString(`<body><template>${e2}</template></body>`, "text/html");
    return t2.body ? t2.body.firstElementChild.content : document.createElement("body");
  }(i);
  e("before-render", null, o2) && (y(l2, o2, r), e("render", null, o2));
}
var N = class {
  constructor(e2, t2, n) {
    var i;
    this.elem = e2, this.template = t2, this.signals = n.signals ? n.signals.map((e3) => `chorducate:signal-${e3}`) : ["chorducate:signal"], this.events = n.events, this.handler = (i = this, function(e3) {
      i.render();
    }), this.debounce = null, this.start();
  }
  start() {
    for (let e2 of this.signals)
      document.addEventListener(e2, this.handler);
    this.render(), e("start", null, t(this.elem));
  }
  stop() {
    for (let e2 of this.signals)
      document.removeEventListener(e2, this.handler);
    e("stop", null, t(this.elem));
  }
  render() {
    let e2 = this;
    e2.debounce && window.cancelAnimationFrame(e2.debounce), e2.debounce = window.requestAnimationFrame(function() {
      v(e2.elem, e2.template(), e2.events);
    });
  }
};
function w(e2, t2, n = {}) {
  return new N(e2, t2, n);
}

// src/guitar-chord-diagram.ts
var DEFAULT_STATE = {
  amountOfFrets: 4,
  frets: [0, 0, 0, 0, 0, 3],
  fingers: [1, 1, 1, 1, 1, 1],
  barres: [],
  capo: false,
  baseFret: 1,
  midi: [40, 45, 50, 55, 59, 64],
  strings: 6,
  tuning: ["E2", "A2", "D3", "G3", "B3", "E4"]
};
var compareArrays = (a2, b2) => {
  return JSON.stringify(a2) === JSON.stringify(b2);
};
var splitArray = (value) => {
  if (!value)
    return null;
  return value.split(",");
};
var GuitarChordDiagram = class extends HTMLElement {
  // Shadow DOM
  shadow;
  isInitialising = true;
  dragStart = null;
  // Reflective properties
  radius = {
    open: 2,
    fret: 4
  };
  static get formAssociated() {
    return true;
  }
  _internals;
  FRET_POSITIONS;
  FINGER_POSITIONS;
  positions;
  state;
  TRANSLATE_OFFSET = 13;
  DOT_DIAMETER = 8.25;
  DOT_RADIUS = this.DOT_DIAMETER / 2;
  STROKE_WIDTH = 0.25;
  fretXPosition = {
    4: [10, 20, 30, 40, 50],
    6: [0, 10, 20, 30, 40, 50]
  };
  TUNING_FONT_SIZE = 3;
  FRET_HEIGHT = 16;
  FRET_Y_CENTER = this.DOT_RADIUS - this.STROKE_WIDTH;
  fretYPosition = [
    this.FRET_Y_CENTER,
    this.FRET_HEIGHT + this.FRET_Y_CENTER,
    2 * this.FRET_HEIGHT + this.FRET_Y_CENTER,
    3 * this.FRET_HEIGHT + this.FRET_Y_CENTER
  ];
  offset = {
    4: 0,
    6: -1
  };
  offsets = {
    4: {
      x: 10,
      y: 10,
      length: 40
    },
    6: {
      x: 0,
      y: 0,
      length: 50
    }
  };
  getStringPositionDot = (string, strings) => this.positions.string[string + this.offset[strings]];
  getStringPosition = (string, strings) => this.positions.string[string + this.offset[strings]];
  onlyBarres = (frets, barre) => frets.map((f2, index) => ({ position: index, value: f2 })).filter((f2) => f2.value === barre);
  parseIntArrayString = (value) => {
    if (!value)
      return null;
    return value.split(",").map((v2) => parseInt(v2));
  };
  stringifyIntArray = (value) => {
    if (!value)
      return null;
    return value.join(",");
  };
  parseBoolean = (value) => {
    return value === "true";
  };
  stringifyBoolean = (value) => {
    return value.toString();
  };
  stringifyStringArray = (value) => {
    if (!value)
      return null;
    return value.join(",");
  };
  parseStringArray = (value) => {
    if (!value)
      return null;
    return value.split(",");
  };
  getIntArrayAttribute = (attrName) => {
    return this.parseIntArrayString(this.getAttribute(attrName));
  };
  getStringArrayAttribute = (attrName) => {
    return this.parseStringArray(this.getAttribute(attrName));
  };
  getBooleanAttribute = (attrName) => {
    return this.hasAttribute(attrName);
  };
  getNumberAttribute = (attrName) => {
    return parseInt(this.getAttribute(attrName));
  };
  setDefaultAttributes = () => {
  };
  constructor() {
    super();
    this._internals = this.attachInternals();
    this.shadow = this.attachShadow({ mode: "open" });
    this.name = this.getAttribute("name");
    if (!this.getAttribute("amount-of-frets")) {
      this.setAttribute(
        "amount-of-frets",
        DEFAULT_STATE["amountOfFrets"].toString()
      );
    }
    if (!this.getAttribute("frets")) {
      this.setAttribute(
        "frets",
        this.stringifyIntArray(DEFAULT_STATE["frets"])
      );
    }
    if (!this.getAttribute("fingers")) {
      this.setAttribute(
        "fingers",
        this.stringifyIntArray(DEFAULT_STATE["fingers"])
      );
    }
    if (!this.getAttribute("base-fret")) {
      this.setAttribute("base-fret", DEFAULT_STATE["baseFret"].toString());
    }
    if (!this.getAttribute("midi")) {
      this.setAttribute("midi", this.stringifyIntArray(DEFAULT_STATE["midi"]));
    }
    if (!this.getAttribute("strings")) {
      this.setAttribute("strings", DEFAULT_STATE["strings"].toString());
    }
    if (!this.getAttribute("tuning")) {
      this.setAttribute(
        "tuning",
        this.stringifyStringArray(DEFAULT_STATE["tuning"])
      );
    }
    this.state = l(
      {
        amountOfFrets: this.getNumberAttribute("amount-of-frets"),
        frets: this.getIntArrayAttribute("frets"),
        fingers: this.getIntArrayAttribute("fingers"),
        barres: this.getIntArrayAttribute("barres") || [],
        capo: this.getBooleanAttribute("capo"),
        baseFret: this.getNumberAttribute("base-fret"),
        midi: this.getIntArrayAttribute("midi"),
        strings: this.getNumberAttribute("strings"),
        tuning: this.getStringArrayAttribute("tuning")
      },
      {
        setAmountOfFrets: (state, value) => {
          const validatedValue = Number(value);
          const fretsLargerThanAmountOfFrets = state.frets.filter(
            (f2) => f2 > validatedValue
          );
          let finalValue = validatedValue;
          if (validatedValue < 1) {
            finalValue = 1;
          } else if (validatedValue > 24) {
            finalValue = 24;
          } else if (Number.isNaN(validatedValue)) {
            finalValue = DEFAULT_STATE["amountOfFrets"];
          } else if (fretsLargerThanAmountOfFrets.length > 0) {
            finalValue = Math.max(...fretsLargerThanAmountOfFrets);
          }
          state.amountOfFrets = finalValue;
        },
        setFrets: (state, value) => {
          const validatedValue = value.map((v2) => Number(v2));
          let finalValue = validatedValue;
          validatedValue.forEach((v2, index) => {
            if (v2 > state.amountOfFrets) {
              finalValue[index] = state.amountOfFrets;
            } else if (v2 < -1 || Number.isNaN(v2)) {
              finalValue[index] = -1;
            }
          });
          state.frets = finalValue;
          state.barres = state.barres.filter(
            (barre) => state.frets.includes(barre)
          );
        },
        setFingers: (state, value) => {
          const validatedValue = value.map((v2) => Number(v2));
          if (!validatedValue.some((v2) => Number.isNaN(v2)) && validatedValue.every((v2) => v2 >= 0 && v2 <= 4)) {
            state.fingers = validatedValue;
          } else {
            throw new RangeError("Invalid fingers: " + value);
          }
        },
        setBarres: (state, value) => {
          if (!value) {
            state.barres = [];
            return;
          }
          const validatedValue = value.map((v2) => Number(v2));
          if (!validatedValue.some((v2) => Number.isNaN(v2)) && validatedValue.every((v2) => v2 >= 1 && v2 <= this.amountOfFrets)) {
            state.barres = validatedValue;
          } else {
            throw new RangeError("Invalid barres: " + value);
          }
        },
        setCapo: (state, value) => {
          state.capo = value;
          if (value) {
          } else {
            this.removeAttribute("capo");
          }
        },
        setBaseFret: (state, value) => {
          const validatedValue = Number(value);
          if (!Number.isNaN(validatedValue) && validatedValue >= 1 && validatedValue <= 24) {
            state.baseFret = validatedValue;
          } else {
            throw new RangeError("Invalid base fret: " + value);
          }
        },
        setMidi: (state, value) => {
          const validatedValue = value.map((v2) => Number(v2));
          if (!validatedValue.some((v2) => Number.isNaN(v2)) && validatedValue.every((v2) => v2 >= 0 && v2 <= 127)) {
            state.midi = validatedValue;
          } else {
            throw new RangeError("Invalid midi: " + value);
          }
        },
        setStrings: (state, value) => {
          const validatedValue = Number(value);
          if (validatedValue === 4 || validatedValue === 6) {
            state.strings = validatedValue;
          } else {
            throw new RangeError("Invalid strings: " + value);
          }
        },
        setTuning: (state, value) => {
          if (value.length !== this.strings) {
            throw new RangeError(
              `Invalid tuning: ${value}. Should be length ${this.strings}`
            );
          }
          state.tuning = value;
        }
      },
      "chord"
    );
    this._internals.setFormValue(this.value);
    this.FRET_POSITIONS = new Array(this.state.value.amountOfFrets + 1).fill(0).map((_, index) => {
      const offset = 0.5;
      if (index === 0)
        return this.FRET_HEIGHT * (0.3 * -1);
      return this.FRET_HEIGHT * (offset + index - 1);
    });
    this.FINGER_POSITIONS = this.FRET_POSITIONS.map(
      (fret) => fret + this.TUNING_FONT_SIZE / 2
    );
    this.positions = {
      string: [50, 40, 30, 20, 10, 0],
      fret: this.FRET_POSITIONS,
      finger: this.FINGER_POSITIONS
    };
  }
  connectedCallback() {
    this.isInitialising = false;
    w(this.shadowRoot, this.template, {
      signals: ["chord"]
    });
    this.shadowRoot?.addEventListener("mousedown", this.handleMouseDown);
    this.shadowRoot?.addEventListener("mouseup", this.handleMouseUp);
  }
  static get observedAttributes() {
    return [
      "amount-of-frets",
      "frets",
      "fingers",
      "barres",
      "capo",
      "base-fret",
      "strings",
      "tuning"
    ];
  }
  get name() {
    return this.getAttribute("name");
  }
  set name(val) {
    this.setAttribute("name", val || "");
  }
  // Value property to integrate with form data
  get value() {
    return JSON.stringify(this.state.value);
  }
  set value(val) {
    const parsedValue = JSON.parse(val);
    this.state.setAmountOfFrets(parsedValue.amountOfFrets);
    this.state.setFrets(parsedValue.frets);
    this.state.setFingers(parsedValue.fingers);
    this.state.setBarres(parsedValue.barres);
    this.state.setCapo(parsedValue.capo);
    this.state.setBaseFret(parsedValue.baseFret);
    this.state.setMidi(parsedValue.midi);
    this.state.setStrings(parsedValue.strings);
    this.state.setTuning(parsedValue.tuning);
  }
  // Custom form validation
  checkValidity() {
    return true;
  }
  reportValidity() {
    const valid = this.checkValidity();
    if (!valid) {
    }
    return valid;
  }
  // Define getters and setters for properties
  get amountOfFrets() {
    return this.state.value.amountOfFrets;
  }
  set amountOfFrets(val) {
    this.setAttribute("amount-of-frets", val.toString());
    this._internals.setFormValue(this.value);
  }
  get frets() {
    return this.state.value.frets;
  }
  set frets(val) {
    this.setAttribute("frets", val.join(","));
    this._internals.setFormValue(this.value);
  }
  get fingers() {
    return this.state.value.fingers;
  }
  set fingers(val) {
    this.setAttribute("fingers", val.join(","));
    this._internals.setFormValue(this.value);
  }
  get barres() {
    return this.state.value.barres;
  }
  set barres(val) {
    if (!val || val.length === 0) {
      this.removeAttribute("barres");
    } else {
      this.setAttribute("barres", val.join(","));
    }
    this._internals.setFormValue(this.value);
  }
  get capo() {
    return this.state.value.capo;
  }
  set capo(val) {
    if (val) {
      this.setAttribute("capo", "");
    } else {
      this.removeAttribute("capo");
    }
    this._internals.setFormValue(this.value);
  }
  get baseFret() {
    return this.state.value.baseFret;
  }
  set baseFret(val) {
    this.setAttribute("base-fret", val.toString());
    this._internals.setFormValue(this.value);
  }
  get midi() {
    return this.state.value.midi;
  }
  set midi(val) {
    this.setAttribute("midi", val.join(","));
    this._internals.setFormValue(this.value);
  }
  get strings() {
    return this.state.value.strings;
  }
  set strings(val) {
    this.setAttribute("strings", val.toString());
    this._internals.setFormValue(this.value);
  }
  get tuning() {
    return this.state.value.tuning;
  }
  set tuning(val) {
    this.setAttribute("tuning", val.join(","));
    this._internals.setFormValue(this.value);
  }
  getNeckHorizonalLine = (pos) => {
    return `M ${this.offsets[this.strings].x} ${this.FRET_HEIGHT * pos} H ${this.offsets[this.strings].length}`;
  };
  getNeckVerticalLine = (pos) => `M ${this.offsets[this.strings].y + pos * 10} 0 V ${this.amountOfFrets * this.FRET_HEIGHT}`;
  getNeckPath = () => {
    return [...Array(this.amountOfFrets + 1)].map((_, pos) => this.getNeckHorizonalLine(pos)).join(" ").concat(
      [...Array(this.strings)].map((_, pos) => this.getNeckVerticalLine(pos)).join(" ")
    );
  };
  getBarreOffset = (amountOfStrings, frets, baseFret, showCapo) => {
    if (amountOfStrings === 6) {
      if (frets[0] === 1 || showCapo) {
        return baseFret > 9 ? -12 : -8;
      } else {
        return baseFret > 9 ? -10 : -7;
      }
    }
    return -10;
  };
  onlyDots = () => this.frets.map((f2, index) => ({ position: index, value: f2 })).filter((f2) => !this.barres || this.barres.indexOf(f2.value) === -1);
  setReflectiveAttribute(attrName, defaultValue) {
    const existingAttribute = this.getAttribute(attrName);
    if (existingAttribute)
      return;
    this.setAttribute(attrName, defaultValue);
  }
  attributeChangedCallback(attrName, oldVal, newVal) {
    if (oldVal === newVal || this.isInitialising)
      return;
    switch (attrName) {
      case "amount-of-frets":
        this.state.setAmountOfFrets(parseInt(newVal));
        break;
      case "frets":
        this.state.setFrets(this.parseIntArrayString(newVal));
        break;
      case "fingers":
        this.state.setFingers(this.parseIntArrayString(newVal));
        break;
      case "barres":
        this.state.setBarres(this.parseIntArrayString(newVal));
        break;
      case "capo":
        this.state.setCapo(newVal !== null);
        break;
      case "base-fret":
        this.state.setBaseFret(parseInt(newVal));
        break;
      case "strings":
        this.state.setStrings(parseInt(newVal));
        break;
      case "tuning":
        this.state.setTuning(splitArray(newVal));
        break;
    }
  }
  template = () => {
    return `
    <svg
      width="100%"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMinYMin meet"
      viewBox="0 0 75 ${34 + this.FRET_HEIGHT * this.amountOfFrets}"
      style="border: 1px solid #ccc;user-select: none;"
      
    >
      <g transform="translate(${this.TRANSLATE_OFFSET}, ${this.TRANSLATE_OFFSET})">
        ${this.renderNeck()}
        ${this.renderBarre()}
        ${this.renderDot()}
      </g>
    </svg>
  `;
  };
  renderNeck = () => `
    <g>
      <path
        stroke="#444"
        stroke-width=".25"
        stroke-linecap="square"
        stroke-linejoin="miter"
        d="${this.getNeckPath()}"
      ></path>
      ${this.baseFret === 1 ? this.renderCapoBaseFret() : this.renderBaseFretText()}
      ${this.renderTuning()}
    </g>
  `;
  renderCapoBaseFret = () => {
    return `
    <path
      stroke="#444"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      d="M ${this.offsets[this.strings].x} 0 H ${this.offsets[this.strings].length}"
    ></path>
  `;
  };
  renderBaseFretText = () => `
    <text
      font-size="${this.TUNING_FONT_SIZE}pt"
      fill="#444"
      font-family="Arial"
      x="${this.getBarreOffset(
    this.strings,
    this.frets,
    this.baseFret,
    this.capo
  )}"
      y="${this.FRET_HEIGHT / 2 + this.TUNING_FONT_SIZE / 2}"
    >
      ${`${this.baseFret}fr`}
    </text>
  `;
  renderTuning = () => `
    <g>
      ${this.tuning.slice().map(
    // @ts-expect-error
    (note, index) => `
      <text
        key="${note + index}"
        font-size="0.22rem"
        fill="#444"
        font-family="Arial"
        text-anchor="middle"
        x="${this.offsets[this.strings].x + index * 10}"
        y="${this.FRET_HEIGHT * this.amountOfFrets + this.TUNING_FONT_SIZE + 2}"
      >
        ${note}
      </text>
      `
  )}
    </g>
  `;
  renderBarre = () => {
    if (!this.barres)
      return "";
    return `${this.barres.map(
      (barre, index) => this.renderSingleBarre(barre, index)
    )}`;
  };
  renderSingleBarre = (barre, index) => {
    const strings = this.frets.length;
    const barreFrets = this.onlyBarres(this.frets, barre);
    if (barreFrets.length === 0)
      return "";
    const string1 = barreFrets[0].position;
    const string2 = barreFrets[barreFrets.length - 1].position;
    const width = (string2 - string1) * 10;
    const y2 = this.fretYPosition[barre - 1];
    return `
      <g>
        ${index === 0 && this.capo ? this.renderCapo(this.strings, barreFrets) : ""}
        <rect
          fill="#444"
          x="${this.fretXPosition[this.strings][string1]}"
          y="${y2}"
          width="${width}"
          height="${this.DOT_DIAMETER}"
        ></rect>
      </g>
    `;
  };
  renderCapo = (strings, barreFrets) => `
    <g>
      <g
        transform="translate(${this.getStringPosition(
    this.strings,
    this.strings
  )}, ${this.positions.fret[barreFrets[0].value]})"
      >
        <path
          d="M 0, 0 m -4, 0 a 4,4 0 1,1 8,0"
          fill="#555"
          fill-opacity="0.2"
          transform="rotate(-90)"
        ></path>
      </g>
      <rect
        fill="#555"
        x="${this.fretXPosition[strings][0]}"
        y="0"
        width="${(this.strings - 1) * 10}"
        fill-opacity="0.2"
        height="${this.DOT_DIAMETER}"
        transform="translate(${this.getStringPosition(strings, strings)}, ${this.positions.fret[barreFrets[0].value] - this.DOT_RADIUS})"
      ></rect>
      <g
        transform="translate(${this.getStringPosition(1, strings)}, ${this.positions.fret[barreFrets[0].value]})"
      >
        <path
          d="M 0, 0 m -4, 0 a 4,4 0 1,1 8,0"
          fill="#555"
          fill-opacity="0.2"
          transform="rotate(90)"
        ></path>
      </g>
    </g>
  `;
  renderDot = () => {
    const allDots = (() => {
      if (!this.barres)
        return [];
      return [
        ...this.onlyDots(),
        ...this.barres.map((barre) => this.onlyBarres(this.frets, barre)).flat()
      ].sort((a2, b2) => a2.position - b2.position);
    })();
    const dots = this.shadowRoot.querySelectorAll(".dot");
    dots.forEach((dot) => {
      dot.addEventListener("keydown", (e2) => {
        const dotIndex = Array.from(dots).indexOf(dot);
        this.handleDotKeydown(e2, dotIndex);
      });
    });
    return `
    ${allDots.map((fret) => {
      const string = this.strings - fret.position;
      const finger = this.fingers && this.fingers[fret.position];
      return fret.value === -1 ? this.renderMuteDot(string) : this.renderFretDot(fret, string, finger);
    })}
  `;
  };
  renderMuteDot = (string) => `
    <text
      class="dot"
      tabindex="0"
      font-size='5.3pt'
      fill='#444'
      font-family='Verdana'
      text-anchor='middle'
      x="${this.getStringPositionDot(string, this.strings)}"
      y='-2.75'
      >x</text>
  `;
  renderFretDot = (fret, string, finger) => `
    <g>
      <circle
        class="dot"
        tabindex="0"
        stroke-width="0.25"
        stroke="#444"
        fill="${fret.value === 0 ? "transparent" : "#444"}"
        cx="${this.getStringPositionDot(string, this.strings)}"
        cy="${this.FRET_POSITIONS[fret.value]}"
        r="${fret.value === 0 ? this.radius.open : this.radius.fret}"
      />
      ${finger && finger > 0 ? this.renderFingerNumber(fret, string, finger) : ""}
    </g>
  `;
  renderFingerNumber = (fret, string, finger) => `
    <text
      font-size="${this.TUNING_FONT_SIZE}pt"
      font-family="Verdana"
      text-anchor="middle"
      fill="white"
      x="${this.getStringPositionDot(string, this.strings)}"
      y="${this.FINGER_POSITIONS[fret.value]}"
    >
      ${finger}
    </text>
  `;
  changeFret(dotIndex, change) {
    let newFretValue = this.frets[dotIndex] + change;
    newFretValue = Math.max(0, Math.min(newFretValue, this.amountOfFrets));
    const newFrets = [...this.frets];
    newFrets[dotIndex] = newFretValue;
    this.frets = newFrets;
    console.log(newFrets);
  }
  focusDot(index) {
    const dots = this.shadowRoot.querySelectorAll(".dot");
    if (dots[index]) {
      dots[index].focus();
    }
  }
  handleDotKeydown(e2, dotIndex) {
    const key = e2.key;
    const totalDots = this.shadowRoot.querySelectorAll(".dot").length;
    let newDotIndex;
    switch (key) {
      case "ArrowRight":
        newDotIndex = (dotIndex + 1) % totalDots;
        this.focusDot(newDotIndex);
        break;
      case "ArrowLeft":
        newDotIndex = (dotIndex - 1 + totalDots) % totalDots;
        this.focusDot(newDotIndex);
        break;
      case "ArrowUp":
        this.changeFret(dotIndex, -1);
        break;
      case "ArrowDown":
        console.log("DOWN");
        this.changeFret(dotIndex, 1);
        break;
    }
  }
  getClosestString = (x) => {
    const stringPositions = Object.values(this.positions.string).slice(
      0,
      this.strings
    );
    const closestString = stringPositions.reduce(
      (prev, curr) => Math.abs(curr + this.TRANSLATE_OFFSET - x) < Math.abs(prev + this.TRANSLATE_OFFSET - x) ? curr : prev
    );
    return stringPositions.indexOf(closestString) + 1;
  };
  getClosestFret = (y2) => {
    const fretPositions = Object.values(this.positions.fret).slice(
      0,
      this.amountOfFrets + 1
    );
    const closestFret = fretPositions.reduce(
      (prev, curr) => Math.abs(curr + this.TRANSLATE_OFFSET - y2) < Math.abs(prev + this.TRANSLATE_OFFSET - y2) ? curr : prev
    );
    return fretPositions.indexOf(closestFret);
  };
  handleMouseDown = (e2) => {
    const svgElement = this.shadowRoot?.querySelector("svg");
    if (!svgElement)
      return;
    const pt = svgElement.createSVGPoint();
    pt.x = e2.clientX;
    pt.y = e2.clientY;
    const cursorpt = pt.matrixTransform(svgElement.getScreenCTM()?.inverse());
    const closestString = this.getClosestString(cursorpt.x);
    const closestFret = this.getClosestFret(cursorpt.y);
    const stringIndex = this.strings - closestString;
    const newFrets = [...this.frets];
    const newBarres = new Set(this.barres);
    if (closestFret === 0) {
      if (this.frets[stringIndex] === 0) {
        newFrets[stringIndex] = -1;
      } else {
        newFrets[stringIndex] = 0;
      }
    } else {
      newFrets[stringIndex] = closestFret;
    }
    this.dragStart = {
      string: stringIndex,
      fret: closestFret,
      fretValue: newFrets[stringIndex]
    };
    this.originalBarres = [...this.barres];
    this.originalFrets = [...this.frets];
    newBarres.forEach((barre) => {
      const fretCount = newFrets.filter((fret) => fret === barre).length;
      if (fretCount < 2) {
        newBarres.delete(barre);
      }
    });
    if (!compareArrays(newFrets, this.frets)) {
      this.frets = newFrets;
    }
    if (!compareArrays(Array.from(newBarres), this.barres)) {
      this.barres = Array.from(newBarres);
    }
    this.shadowRoot?.addEventListener("mousemove", this.handleMouseMove);
    document.addEventListener("mouseup", this.handleMouseUp);
  };
  handleMouseMove = (e2) => {
    if (!this.dragStart)
      return;
    const svgElement = this.shadowRoot?.querySelector("svg");
    if (!svgElement)
      return;
    const pt = svgElement.createSVGPoint();
    pt.x = e2.clientX;
    pt.y = e2.clientY;
    const cursorpt = pt.matrixTransform(svgElement.getScreenCTM()?.inverse());
    const currentString = this.getClosestString(cursorpt.x);
    const currentFret = this.dragStart.fretValue;
    const startStringIndex = this.dragStart.string;
    const currentStringIndex = this.strings - currentString;
    const minStringIndex = Math.min(startStringIndex, currentStringIndex);
    const maxStringIndex = Math.max(startStringIndex, currentStringIndex);
    const newFrets = [...this.originalFrets];
    const newBarres = new Set(this.originalBarres);
    for (let i = minStringIndex; i <= maxStringIndex; i++) {
      newFrets[i] = currentFret;
      if (startStringIndex !== currentStringIndex && currentFret !== -1 && currentFret !== 0) {
        newBarres.add(currentFret);
      }
    }
    newBarres.forEach((barre) => {
      const fretCount = newFrets.filter((fret) => fret === barre).length;
      if (fretCount < 2) {
        newBarres.delete(barre);
      }
    });
    const updatedBarres = Array.from(newBarres);
    if (!compareArrays(newFrets, this.frets)) {
      this.frets = newFrets;
    }
    if (!compareArrays(updatedBarres, this.barres)) {
      this.barres = updatedBarres;
    }
  };
  handleMouseUp = (e2) => {
    this.shadowRoot?.removeEventListener("mousemove", this.handleMouseMove);
    document.removeEventListener("mouseup", this.handleMouseUp);
    this.dragStart = null;
    this.originalFrets = [];
    this.originalBarres = [];
  };
};
window.customElements.define("guitar-chord-diagram", GuitarChordDiagram);
/*! reef v13.0.2 | (c) 2023 Chris Ferdinandi | MIT License | http://github.com/cferdinandi/reef */
//# sourceMappingURL=guitar-chord-diagram.es.js.map
