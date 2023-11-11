// @ts-nocheck

import { component, store } from "./utils/reef";

const DEFAULT_STATE = {
  amountOfFrets: 4,
  frets: [0, 0, 0, 0, 0, 3],
  fingers: [1, 1, 1, 1, 1, 1],
  barres: [],
  capo: false,
  baseFret: 1,
  midi: [40, 45, 50, 55, 59, 64],
  strings: 6,
  tuning: ["E2", "A2", "D3", "G3", "B3", "E4"],
};

const compareArrays = (a, b) => {
  return JSON.stringify(a) === JSON.stringify(b);
};

type State = {
  amountOfFrets: number;
  frets: number[];
  fingers: number[];
  barres: number[];
  capo: boolean;
  baseFret: number;
  midi: number[];
  strings: number;
  tuning: string[];
};

// Define the type NumberOfStrings for better type checking
type NumberOfStrings = 4 | 6;

export type Chord = {
  frets: number[];
  fingers: number[];
  baseFret: number;
  barres: number[];
  midi: number[];
  strings: NumberOfStrings;
  amountOfFrets: number;
  capo: boolean;
};

const splitArray = (value: string | null) => {
  if (!value) return null;
  return value.split(",");
};

const parseIntArray = (value: string[]) => {
  return value.map((v) => parseInt(v));
};

class GuitarChordDiagram extends HTMLElement {
  // Shadow DOM
  private shadow: ShadowRoot;
  private isInitialising = true;
  private dragStart: { string: number; fret: number } | null = null;

  // Reflective properties

  private radius = {
    open: 2,
    fret: 4,
  };

  static get formAssociated() {
    return true;
  }

  private _internals: ElementInternals;

  FRET_POSITIONS: Array<number>;
  FINGER_POSITIONS: Array<number>;

  positions: {
    string: Array<number>;
    fret: Array<number>;
    finger: Array<number>;
  };

  state: State;

  TRANSLATE_OFFSET = 13;
  DOT_DIAMETER = 8.25;
  DOT_RADIUS = this.DOT_DIAMETER / 2;
  STROKE_WIDTH = 0.25;

  fretXPosition = {
    4: [10, 20, 30, 40, 50],
    6: [0, 10, 20, 30, 40, 50],
  };

  TUNING_FONT_SIZE = 3;
  FRET_HEIGHT = 16;
  FRET_Y_CENTER = this.DOT_RADIUS - this.STROKE_WIDTH;

  fretYPosition = [
    this.FRET_Y_CENTER,
    this.FRET_HEIGHT + this.FRET_Y_CENTER,
    2 * this.FRET_HEIGHT + this.FRET_Y_CENTER,
    3 * this.FRET_HEIGHT + this.FRET_Y_CENTER,
  ];

  offset = {
    4: 0,
    6: -1,
  };

  offsets = {
    4: {
      x: 10,
      y: 10,
      length: 40,
    },
    6: {
      x: 0,
      y: 0,
      length: 50,
    },
  };

  getStringPositionDot = (string: number, strings: NumberOfStrings) =>
    this.positions.string[string + this.offset[strings]];

  getStringPosition = (string: number, strings: NumberOfStrings) =>
    this.positions.string[string + this.offset[strings]];

  onlyBarres = (frets: Array<number>, barre: number) =>
    frets
      .map((f, index) => ({ position: index, value: f }))
      .filter((f) => f.value === barre);

  parseIntArrayString = (value: string | null) => {
    if (!value) return null;
    return value.split(",").map((v) => parseInt(v));
  };

  stringifyIntArray = (value: number[] | null) => {
    if (!value) return null;
    return value.join(",");
  };

  parseBoolean = (value: string | null) => {
    return value === "true";
  };

  stringifyBoolean = (value: boolean | null) => {
    return value.toString();
  };

  stringifyStringArray = (value: string[] | null) => {
    if (!value) return null;
    return value.join(",");
  };

  parseStringArray = (value: string | null) => {
    if (!value) return null;
    return value.split(",");
  };

  getIntArrayAttribute = (attrName: string) => {
    return this.parseIntArrayString(this.getAttribute(attrName));
  };

  getStringArrayAttribute = (attrName: string) => {
    return this.parseStringArray(this.getAttribute(attrName));
  };

  getBooleanAttribute = (attrName: string) => {
    return this.hasAttribute(attrName);
  };

  getNumberAttribute = (attrName: string) => {
    return parseInt(this.getAttribute(attrName) as string);
  };

  setDefaultAttributes = () => {};

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

    this.state = store(
      {
        amountOfFrets: this.getNumberAttribute("amount-of-frets"),
        frets: this.getIntArrayAttribute("frets"),
        fingers: this.getIntArrayAttribute("fingers"),
        barres: this.getIntArrayAttribute("barres") || [],
        capo: this.getBooleanAttribute("capo"),
        baseFret: this.getNumberAttribute("base-fret"),
        midi: this.getIntArrayAttribute("midi"),
        strings: this.getNumberAttribute("strings"),
        tuning: this.getStringArrayAttribute("tuning"),
      },
      {
        setAmountOfFrets: (state, value: number) => {
          const validatedValue = Number(value); // Ensure it's a number
          const fretsLargerThanAmountOfFrets = state.frets.filter(
            (f) => f > validatedValue
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

        setFrets: (state, value: number[]) => {
          const validatedValue = value.map((v) => Number(v)); // Ensure it's a number
          let finalValue = validatedValue;

          validatedValue.forEach((v, index) => {
            if (v > state.amountOfFrets) {
              finalValue[index] = state.amountOfFrets;
            } else if (v < -1 || Number.isNaN(v)) {
              finalValue[index] = -1;
            }
          });

          state.frets = finalValue;

          // Update barres - Remove any barres that are no longer valid
          state.barres = state.barres.filter((barre) =>
            state.frets.includes(barre)
          );
        },

        setFingers: (state, value: number[]) => {
          const validatedValue = value.map((v) => Number(v)); // Ensure it's a number

          if (
            !validatedValue.some((v) => Number.isNaN(v)) &&
            validatedValue.every((v) => v >= 0 && v <= 4)
          ) {
            state.fingers = validatedValue;
          } else {
            throw new RangeError("Invalid fingers: " + value);
          }
        },

        setBarres: (state, value: number[]) => {
          if (!value) {
            state.barres = [];
            return;
          }
          const validatedValue = value.map((v) => Number(v)); // Ensure it's a number

          if (
            !validatedValue.some((v) => Number.isNaN(v)) &&
            validatedValue.every((v) => v >= 1 && v <= this.amountOfFrets)
          ) {
            state.barres = validatedValue;
          } else {
            throw new RangeError("Invalid barres: " + value);
          }
        },

        setCapo: (state, value: boolean) => {
          state.capo = value;

          if (value) {
          } else {
            this.removeAttribute("capo");
          }
        },

        setBaseFret: (state, value: number) => {
          const validatedValue = Number(value); // Ensure it's a number

          if (
            !Number.isNaN(validatedValue) &&
            validatedValue >= 1 &&
            validatedValue <= 24
          ) {
            state.baseFret = validatedValue;
          } else {
            throw new RangeError("Invalid base fret: " + value);
          }
        },

        setMidi: (state, value: number[]) => {
          const validatedValue = value.map((v) => Number(v)); // Ensure it's a number

          if (
            !validatedValue.some((v) => Number.isNaN(v)) &&
            validatedValue.every((v) => v >= 0 && v <= 127)
          ) {
            state.midi = validatedValue;
          } else {
            throw new RangeError("Invalid midi: " + value);
          }
        },

        setStrings: (state, value: number) => {
          const validatedValue = Number(value); // Ensure it's a number

          if (validatedValue === 4 || validatedValue === 6) {
            state.strings = validatedValue;
          } else {
            throw new RangeError("Invalid strings: " + value);
          }
        },

        setTuning: (state, value: string[]) => {
          if (value.length !== this.strings) {
            throw new RangeError(
              `Invalid tuning: ${value}. Should be length ${this.strings}`
            );
          }

          state.tuning = value;
        },
      },
      "chord"
    );

    this._internals.setFormValue(this.value);
    // @ts-ignore
    this.FRET_POSITIONS = new Array(this.state.value.amountOfFrets + 1)
      .fill(0)
      .map((_, index) => {
        const offset = 0.5;
        if (index === 0) return this.FRET_HEIGHT * (0.3 * -1);
        return this.FRET_HEIGHT * (offset + index - 1);
      });

    this.FINGER_POSITIONS = this.FRET_POSITIONS.map(
      (fret) => fret + this.TUNING_FONT_SIZE / 2
    );

    this.positions = {
      string: [50, 40, 30, 20, 10, 0],
      fret: this.FRET_POSITIONS,
      finger: this.FINGER_POSITIONS,
    };
  }

  connectedCallback() {
    this.isInitialising = false;

    component(this.shadowRoot, this.template, {
      signals: ["chord"],
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
      "tuning",
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
    // Should return a string that represents all the values
    // For example, JSON representation
    return JSON.stringify(this.state.value);
  }

  set value(val) {
    // Should set all the values based on the string representation
    // For example, JSON representation
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
    // Your validation logic here
    return true; // return false if invalid
  }

  reportValidity() {
    // Your reporting logic here
    const valid = this.checkValidity();
    if (!valid) {
      // Show an error message
    }
    return valid;
  }

  // Define getters and setters for properties
  get amountOfFrets(): typeof this.state.amountOfFrets {
    return this.state.value.amountOfFrets;
  }

  set amountOfFrets(val: typeof this.state.amountOfFrets) {
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

  getNeckHorizonalLine = (pos: number) => {
    return `M ${this.offsets[this.strings].x} ${this.FRET_HEIGHT * pos} H ${
      this.offsets[this.strings].length
    }`;
  };

  getNeckVerticalLine = (pos: number) =>
    `M ${this.offsets[this.strings].y + pos * 10} 0 V ${
      this.amountOfFrets * this.FRET_HEIGHT
    }`;

  getNeckPath = () => {
    return [...Array(this.amountOfFrets + 1)]
      .map((_, pos) => this.getNeckHorizonalLine(pos))
      .join(" ")
      .concat(
        [...Array(this.strings)]
          .map((_, pos) => this.getNeckVerticalLine(pos))
          .join(" ")
      );
  };

  getBarreOffset = (
    amountOfStrings: NumberOfStrings,
    frets: Array<number>,
    baseFret: number,
    showCapo?: boolean
  ) => {
    if (amountOfStrings === 6) {
      if (frets[0] === 1 || showCapo) {
        // Move over to make space for dot or capo
        return baseFret > 9 ? -12 : -8;
      } else {
        return baseFret > 9 ? -10 : -7;
      }
    }

    return -10;
  };

  onlyDots = () =>
    this.frets
      // @ts-expect-error
      .map((f, index) => ({ position: index, value: f }))
      // @ts-expect-error
      .filter((f) => !this.barres || this.barres.indexOf(f.value) === -1);

  setReflectiveAttribute(attrName: string, defaultValue: string | null) {
    const existingAttribute = this.getAttribute(attrName);

    if (existingAttribute) return;

    this.setAttribute(attrName, defaultValue);
  }

  attributeChangedCallback(attrName: string, oldVal: string, newVal: string) {
    if (oldVal === newVal || this.isInitialising) return;

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
      <g transform="translate(${this.TRANSLATE_OFFSET}, ${
      this.TRANSLATE_OFFSET
    })">
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
      ${
        this.baseFret === 1
          ? this.renderCapoBaseFret()
          : this.renderBaseFretText()
      }
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
      d="M ${this.offsets[this.strings].x} 0 H ${
      this.offsets[this.strings].length
    }"
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
    if (!this.barres) return "";
    // @ts-expect-error
    return `${this.barres.map((barre, index) =>
      this.renderSingleBarre(barre, index)
    )}`;
  };

  renderSingleBarre = (barre: number, index: number) => {
    // const finger =
    //     this.fingers &&
    //     this.fingers[this.frets.indexOf(barre)];
    const strings = this.frets.length as NumberOfStrings;
    const barreFrets = this.onlyBarres(this.frets, barre);

    if (barreFrets.length === 0) return "";

    const string1 = barreFrets[0].position;
    const string2 = barreFrets[barreFrets.length - 1].position;
    const width = (string2 - string1) * 10;
    const y = this.fretYPosition[barre - 1];

    return `
      <g>
        ${
          index === 0 && this.capo
            ? this.renderCapo(this.strings, barreFrets)
            : ""
        }
        <rect
          fill="#444"
          x="${this.fretXPosition[this.strings][string1]}"
          y="${y}"
          width="${width}"
          height="${this.DOT_DIAMETER}"
        ></rect>
      </g>
    `;
  };

  renderCapo = (
    strings: NumberOfStrings,
    barreFrets: { position: number; value: number }[]
  ) => `
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
        transform="translate(${this.getStringPosition(strings, strings)}, ${
    this.positions.fret[barreFrets[0].value] - this.DOT_RADIUS
  })"
      ></rect>
      <g
        transform="translate(${this.getStringPosition(1, strings)}, ${
    this.positions.fret[barreFrets[0].value]
  })"
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
      if (!this.barres) return [];

      return [
        ...this.onlyDots(),
        ...this.barres
          // @ts-expect-error
          .map((barre) => this.onlyBarres(this.frets, barre))
          .flat(),
      ].sort((a, b) => a.position - b.position);
    })();

    const dots = this.shadowRoot.querySelectorAll(".dot");
    dots.forEach((dot) => {
      dot.addEventListener("keydown", (e) => {
        const dotIndex = Array.from(dots).indexOf(dot);
        this.handleDotKeydown(e, dotIndex);
      });
    });

    return `
    ${allDots.map((fret) => {
      const string = this.strings - fret.position;
      const finger = this.fingers && this.fingers[fret.position];

      return fret.value === -1
        ? this.renderMuteDot(string)
        : this.renderFretDot(fret, string, finger);
    })}
  `;
  };

  renderMuteDot = (string: number) => `
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

  renderFretDot = (
    fret: { position: number; value: number },
    string: number,
    finger: number | undefined
  ) => `
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
      ${
        finger && finger > 0
          ? this.renderFingerNumber(fret, string, finger)
          : ""
      }
    </g>
  `;

  renderFingerNumber = (
    fret: { position: number; value: number },
    string: number,
    finger: number
  ) => `
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
    // dotIndex corresponds to a string in your guitar chord diagram
    // 'change' is either 1 (increase fret) or -1 (decrease fret)

    // Calculate the new fret value
    let newFretValue = this.frets[dotIndex] + change;

    // Implement your fret range limits (e.g., 0 to amountOfFrets)
    newFretValue = Math.max(0, Math.min(newFretValue, this.amountOfFrets));

    // Update the frets array
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

  handleDotKeydown(e, dotIndex) {
    const key = e.key;
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

  getClosestString = (x: number) => {
    const stringPositions = Object.values(this.positions.string).slice(
      0,
      this.strings
    );
    const closestString = stringPositions.reduce((prev, curr) =>
      Math.abs(curr + this.TRANSLATE_OFFSET - x) <
      Math.abs(prev + this.TRANSLATE_OFFSET - x)
        ? curr
        : prev
    );
    return stringPositions.indexOf(closestString) + 1;
  };

  getClosestFret = (y: number) => {
    const fretPositions = Object.values(this.positions.fret).slice(
      0,
      this.amountOfFrets + 1
    );
    const closestFret = fretPositions.reduce((prev, curr) =>
      Math.abs(curr + this.TRANSLATE_OFFSET - y) <
      Math.abs(prev + this.TRANSLATE_OFFSET - y)
        ? curr
        : prev
    );
    return fretPositions.indexOf(closestFret);
  };

  handleMouseDown = (e: MouseEvent) => {
    const svgElement = this.shadowRoot?.querySelector("svg");
    if (!svgElement) return;

    const pt = svgElement.createSVGPoint();
    pt.x = e.clientX;
    pt.y = e.clientY;

    const cursorpt = pt.matrixTransform(svgElement.getScreenCTM()?.inverse());
    const closestString = this.getClosestString(cursorpt.x);
    const closestFret = this.getClosestFret(cursorpt.y);

    const stringIndex = this.strings - closestString;

    const newFrets = [...this.frets];
    const newBarres = new Set(this.barres);

    // Directly update the frets on mousedown
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
      fretValue: newFrets[stringIndex],
    };

    this.originalBarres = [...this.barres]; // Store the original barres State
    this.originalFrets = [...this.frets]; // Store the original frets State

    // Check and remove barres with less than 2 frets on them
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

  handleMouseMove = (e: MouseEvent) => {
    if (!this.dragStart) return;

    const svgElement = this.shadowRoot?.querySelector("svg");
    if (!svgElement) return;

    const pt = svgElement.createSVGPoint();
    pt.x = e.clientX;
    pt.y = e.clientY;

    const cursorpt = pt.matrixTransform(svgElement.getScreenCTM()?.inverse());
    const currentString = this.getClosestString(cursorpt.x);
    const currentFret = this.dragStart.fretValue;

    const startStringIndex = this.dragStart.string;
    const currentStringIndex = this.strings - currentString;
    const minStringIndex = Math.min(startStringIndex, currentStringIndex);
    const maxStringIndex = Math.max(startStringIndex, currentStringIndex);

    const newFrets = [...this.originalFrets]; // Start with the original frets
    const newBarres = new Set(this.originalBarres); // Use a set to manage unique barre values

    // Update frets and potentially add to barres based on drag range
    for (let i = minStringIndex; i <= maxStringIndex; i++) {
      newFrets[i] = currentFret;
      if (
        startStringIndex !== currentStringIndex &&
        currentFret !== -1 &&
        currentFret !== 0
      ) {
        newBarres.add(currentFret);
      }
    }

    // Check and remove barres with less than 2 frets on them
    newBarres.forEach((barre) => {
      const fretCount = newFrets.filter((fret) => fret === barre).length;
      if (fretCount < 2) {
        newBarres.delete(barre);
      }
    });

    const updatedBarres = Array.from(newBarres);

    // Update state only if there's a change
    if (!compareArrays(newFrets, this.frets)) {
      this.frets = newFrets;
    }

    if (!compareArrays(updatedBarres, this.barres)) {
      this.barres = updatedBarres;
    }
  };

  handleMouseUp = (e: MouseEvent) => {
    this.shadowRoot?.removeEventListener("mousemove", this.handleMouseMove);
    document.removeEventListener("mouseup", this.handleMouseUp);
    this.dragStart = null;
    this.originalFrets = []; // Clear the original frets state
    this.originalBarres = []; // Clear the original barres state
  };
}

window.customElements.define("guitar-chord-diagram", GuitarChordDiagram);
