/*! guitar-chord-diagram v0.0.1 | (c) 2023 Kia Storm | MIT License | http://github.com/kiastorm/chorducate */
"use strict";var w=Object.defineProperty;var H=Object.getOwnPropertyDescriptor;var L=Object.getOwnPropertyNames;var V=Object.prototype.hasOwnProperty;var G=(n,t,e,s)=>{if(t&&typeof t=="object"||typeof t=="function")for(let r of L(t))!V.call(n,r)&&r!==e&&w(n,r,{get:()=>t[r],enumerable:!(s=H(t,r))||s.enumerable});return n};var j=n=>G(w({},"__esModule",{value:!0}),n);var W={};module.exports=j(W);function A(n,t,e=document){let s=new CustomEvent(`chorducate:${n}`,{bubbles:!0,cancelable:!0,detail:t});return e.dispatchEvent(s)}function E(n){return typeof n=="string"?document.querySelector(n):n}var N=class{constructor(t,e,s=""){let r="signal"+(s?`-${s}`:"");Object.defineProperties(this,{value:{get:()=>structuredClone(t),set:()=>!0}});for(let i in e)typeof e[i]=="function"&&(this[i]=function(...o){e[i](t,...o),A(r,t)})}};function x(n={},t={},e=""){return new N(n,t,e)}var R=["input","option","textarea"],F=["value","checked","selected"],k=["checked","selected"];function D(n){return["false","null","undefined","0","-0","NaN","0n","-0n"].includes(n)}function M(n,t,e,s){if(!t.startsWith("on")||!s||n[t])return;let r=s[e.split("(")[0]];r&&(n[t]=r)}function C(n,t){let e=t.replace(/\s+/g,"").toLowerCase();return!(!["src","href","xlink:href"].includes(n)||!e.includes("javascript:")&&!e.includes("data:text/html"))||!!(n.startsWith("on")||n.startsWith("@on")||n.startsWith("#on"))||void 0}function P(n,t,e,s){M(n,t,e,s),C(t,e)||(F.includes(t)&&(n[t]=t==="value"?e:" "),n.setAttribute(t,e))}function y(n,t){F.includes(t)&&(n[t]=""),n.removeAttribute(t)}function v(n,t){if(n.nodeType===1){for(let{name:e,value:s}of n.attributes){if(C(e,s)){y(n,e),M(n,e,s,t);continue}if(!e.startsWith("@")&&!e.startsWith("#"))continue;let r=e.slice(1);y(n,e),k.includes(r)&&D(s)||P(n,r,s,t)}if(n.childNodes)for(let e of n.childNodes)v(e,t)}}function $(n){return n.childNodes&&n.childNodes.length?null:n.textContent}function O(n,t,e){let s=n.childNodes,r=t.childNodes;(function(i){let o=i.querySelectorAll("script");for(let a of o)a.remove()})(n)||(s.forEach(function(i,o){if(!r[o]){let l=i.cloneNode(!0);return v(l,e),void t.append(l)}if(a=i,u=r[o],typeof a.nodeType=="number"&&a.nodeType!==u.nodeType||typeof a.tagName=="string"&&a.tagName!==u.tagName||typeof a.id=="string"&&a.id&&a.id!==u.id||"getAttribute"in a&&"getAttribute"in u&&a.getAttribute("key")!==u.getAttribute("key")||typeof a.src=="string"&&a.src&&a.src!==u.src){let l=function(h,d){if(h.nodeType!==1)return;let m=h.getAttribute("id"),g=h.getAttribute("key");if(!m||!g)return;let f=m?`#${m}`:`[key="${g}"]`;return d.querySelector(`:scope > ${f}`)}(i,t);if(!l){let h=i.cloneNode(!0);return v(h,e),void r[o].before(h)}r[o].before(l)}var a,u;if(s[o]&&"hasAttribute"in s[o]&&s[o].hasAttribute("reef-ignore")||(function(l,h,d){if(l.nodeType!==1)return;let m=l.attributes,g=h.attributes;for(let{name:f,value:p}of m){if(f.startsWith("#")||F.includes(f)&&R.includes(l.tagName.toLowerCase()))continue;let T=f.startsWith("@")?f.slice(1):f;k.includes(T)&&D(p)?y(h,T):P(h,T,p,d)}for(let{name:f,value:p}of g)m[f]||F.includes(f)&&R.includes(h.tagName.toLowerCase())||y(h,f)}(i,r[o],e),i.nodeName.includes("-")))return;let c=$(i);if(c&&c!==$(r[o])&&(r[o].textContent=c),i.childNodes.length||!r[o].childNodes.length){if(!r[o].childNodes.length&&i.childNodes.length){let l=document.createDocumentFragment();return O(i,l,e),void r[o].appendChild(l)}i.childNodes.length&&O(i,r[o],e)}else r[o].innerHTML=""}),function(i,o){let a=i.length-o.length;if(!(a<1))for(;a>0;a--)i[i.length-1].remove()}(r,s))}function U(n,t,e){let s=E(n),r=function(i){let o=new DOMParser().parseFromString(`<body><template>${i}</template></body>`,"text/html");return o.body?o.body.firstElementChild.content:document.createElement("body")}(t);A("before-render",null,s)&&(O(r,s,e),A("render",null,s))}var I=class{constructor(t,e,s){var r;this.elem=t,this.template=e,this.signals=s.signals?s.signals.map(i=>`chorducate:signal-${i}`):["chorducate:signal"],this.events=s.events,this.handler=(r=this,function(i){r.render()}),this.debounce=null,this.start()}start(){for(let t of this.signals)document.addEventListener(t,this.handler);this.render(),A("start",null,E(this.elem))}stop(){for(let t of this.signals)document.removeEventListener(t,this.handler);A("stop",null,E(this.elem))}render(){let t=this;t.debounce&&window.cancelAnimationFrame(t.debounce),t.debounce=window.requestAnimationFrame(function(){U(t.elem,t.template(),t.events)})}};function B(n,t,e={}){return new I(n,t,e)}var b={amountOfFrets:4,frets:[0,0,0,0,0,0],fingers:[1,1,1,1,1,1],barres:[],capo:!1,baseFret:1,midi:[40,45,50,55,59,64],strings:6,tuning:["E2","A2","D3","G3","B3","E4"]},S=(n,t)=>JSON.stringify(n)===JSON.stringify(t),q=n=>n?n.split(","):null;var _=class extends HTMLElement{shadow;isInitialising=!0;dragStart=null;radius={open:2,fret:4};static get formAssociated(){return!0}_internals;FRET_POSITIONS;FINGER_POSITIONS;positions;state;TRANSLATE_OFFSET=13;DOT_DIAMETER=8.25;DOT_RADIUS=this.DOT_DIAMETER/2;STROKE_WIDTH=.25;fretXPosition={4:[10,20,30,40,50],6:[0,10,20,30,40,50]};TUNING_FONT_SIZE=3;FRET_HEIGHT=16;FRET_Y_CENTER=this.DOT_RADIUS-this.STROKE_WIDTH;fretYPosition=[this.FRET_Y_CENTER,this.FRET_HEIGHT+this.FRET_Y_CENTER,2*this.FRET_HEIGHT+this.FRET_Y_CENTER,3*this.FRET_HEIGHT+this.FRET_Y_CENTER];offset={4:0,6:-1};offsets={4:{x:10,y:10,length:40},6:{x:0,y:0,length:50}};getStringPositionDot=(t,e)=>this.positions.string[t+this.offset[e]];getStringPosition=(t,e)=>this.positions.string[t+this.offset[e]];onlyBarres=(t,e)=>t.map((s,r)=>({position:r,value:s})).filter(s=>s.value===e);parseIntArrayString=t=>t?t.split(",").map(e=>parseInt(e)):null;stringifyIntArray=t=>t?t.join(","):null;parseBoolean=t=>t==="true";stringifyBoolean=t=>t.toString();stringifyStringArray=t=>t?t.join(","):null;parseStringArray=t=>t?t.split(","):null;getIntArrayAttribute=t=>this.parseIntArrayString(this.getAttribute(t));getStringArrayAttribute=t=>this.parseStringArray(this.getAttribute(t));getBooleanAttribute=t=>this.hasAttribute(t);getNumberAttribute=t=>parseInt(this.getAttribute(t));setDefaultAttributes=()=>{};constructor(){super(),this._internals=this.attachInternals(),this.shadow=this.attachShadow({mode:"open"}),this.name=this.getAttribute("name"),this.getAttribute("amount-of-frets")||this.setAttribute("amount-of-frets",b.amountOfFrets.toString()),this.getAttribute("frets")||this.setAttribute("frets",this.stringifyIntArray(b.frets)),this.getAttribute("fingers")||this.setAttribute("fingers",this.stringifyIntArray(b.fingers)),this.getAttribute("base-fret")||this.setAttribute("base-fret",b.baseFret.toString()),this.getAttribute("midi")||this.setAttribute("midi",this.stringifyIntArray(b.midi)),this.getAttribute("strings")||this.setAttribute("strings",b.strings.toString()),this.getAttribute("tuning")||this.setAttribute("tuning",this.stringifyStringArray(b.tuning)),this.state=x({amountOfFrets:this.getNumberAttribute("amount-of-frets"),frets:this.getIntArrayAttribute("frets"),fingers:this.getIntArrayAttribute("fingers"),barres:this.getIntArrayAttribute("barres")||[],capo:this.getBooleanAttribute("capo"),baseFret:this.getNumberAttribute("base-fret"),midi:this.getIntArrayAttribute("midi"),strings:this.getNumberAttribute("strings"),tuning:this.getStringArrayAttribute("tuning")},{setAmountOfFrets:(t,e)=>{let s=Number(e),r=t.frets.filter(o=>o>s),i=s;s<1?i=1:s>24?i=24:Number.isNaN(s)?i=b.amountOfFrets:r.length>0&&(i=Math.max(...r)),t.amountOfFrets=i},setFrets:(t,e)=>{let s=e.map(i=>Number(i)),r=s;s.forEach((i,o)=>{i>t.amountOfFrets?r[o]=t.amountOfFrets:(i<-1||Number.isNaN(i))&&(r[o]=-1)}),t.frets=r,t.barres=t.barres.filter(i=>t.frets.includes(i))},setFingers:(t,e)=>{let s=e.map(r=>Number(r));if(!s.some(r=>Number.isNaN(r))&&s.every(r=>r>=0&&r<=4))t.fingers=s;else throw new RangeError("Invalid fingers: "+e)},setBarres:(t,e)=>{if(!e){t.barres=[];return}let s=e.map(r=>Number(r));if(!s.some(r=>Number.isNaN(r))&&s.every(r=>r>=1&&r<=this.amountOfFrets))t.barres=s;else throw new RangeError("Invalid barres: "+e)},setCapo:(t,e)=>{t.capo=e,e||this.removeAttribute("capo")},setBaseFret:(t,e)=>{let s=Number(e);if(!Number.isNaN(s)&&s>=1&&s<=24)t.baseFret=s;else throw new RangeError("Invalid base fret: "+e)},setMidi:(t,e)=>{let s=e.map(r=>Number(r));if(!s.some(r=>Number.isNaN(r))&&s.every(r=>r>=0&&r<=127))t.midi=s;else throw new RangeError("Invalid midi: "+e)},setStrings:(t,e)=>{let s=Number(e);if(s===4||s===6)t.strings=s;else throw new RangeError("Invalid strings: "+e)},setTuning:(t,e)=>{if(e.length!==this.strings)throw new RangeError(`Invalid tuning: ${e}. Should be length ${this.strings}`);t.tuning=e}},"chord"),this._internals.setFormValue(this.value),this.FRET_POSITIONS=new Array(this.state.value.amountOfFrets+1).fill(0).map((t,e)=>e===0?this.FRET_HEIGHT*(.3*-1):this.FRET_HEIGHT*(.5+e-1)),this.FINGER_POSITIONS=this.FRET_POSITIONS.map(t=>t+this.TUNING_FONT_SIZE/2),this.positions={string:[50,40,30,20,10,0],fret:this.FRET_POSITIONS,finger:this.FINGER_POSITIONS}}connectedCallback(){this.isInitialising=!1,B(this.shadowRoot,this.template,{signals:["chord"]}),this.shadowRoot?.addEventListener("mousedown",this.handleMouseDown),this.shadowRoot?.addEventListener("mouseup",this.handleMouseUp)}static get observedAttributes(){return["amount-of-frets","frets","fingers","barres","capo","base-fret","strings","tuning"]}get name(){return this.getAttribute("name")}set name(t){this.setAttribute("name",t||"")}get value(){return JSON.stringify(this.state.value)}set value(t){let e=JSON.parse(t);this.state.setAmountOfFrets(e.amountOfFrets),this.state.setFrets(e.frets),this.state.setFingers(e.fingers),this.state.setBarres(e.barres),this.state.setCapo(e.capo),this.state.setBaseFret(e.baseFret),this.state.setMidi(e.midi),this.state.setStrings(e.strings),this.state.setTuning(e.tuning)}checkValidity(){return!0}reportValidity(){let t=this.checkValidity();return t}get amountOfFrets(){return this.state.value.amountOfFrets}set amountOfFrets(t){this.setAttribute("amount-of-frets",t.toString()),this._internals.setFormValue(this.value)}get frets(){return this.state.value.frets}set frets(t){this.setAttribute("frets",t.join(",")),this._internals.setFormValue(this.value)}get fingers(){return this.state.value.fingers}set fingers(t){this.setAttribute("fingers",t.join(",")),this._internals.setFormValue(this.value)}get barres(){return this.state.value.barres}set barres(t){!t||t.length===0?this.removeAttribute("barres"):this.setAttribute("barres",t.join(",")),this._internals.setFormValue(this.value)}get capo(){return this.state.value.capo}set capo(t){t?this.setAttribute("capo",""):this.removeAttribute("capo"),this._internals.setFormValue(this.value)}get baseFret(){return this.state.value.baseFret}set baseFret(t){this.setAttribute("base-fret",t.toString()),this._internals.setFormValue(this.value)}get midi(){return this.state.value.midi}set midi(t){this.setAttribute("midi",t.join(",")),this._internals.setFormValue(this.value)}get strings(){return this.state.value.strings}set strings(t){this.setAttribute("strings",t.toString()),this._internals.setFormValue(this.value)}get tuning(){return this.state.value.tuning}set tuning(t){this.setAttribute("tuning",t.join(",")),this._internals.setFormValue(this.value)}getNeckHorizonalLine=t=>`M ${this.offsets[this.strings].x} ${this.FRET_HEIGHT*t} H ${this.offsets[this.strings].length}`;getNeckVerticalLine=t=>`M ${this.offsets[this.strings].y+t*10} 0 V ${this.amountOfFrets*this.FRET_HEIGHT}`;getNeckPath=()=>[...Array(this.amountOfFrets+1)].map((t,e)=>this.getNeckHorizonalLine(e)).join(" ").concat([...Array(this.strings)].map((t,e)=>this.getNeckVerticalLine(e)).join(" "));getBarreOffset=(t,e,s,r)=>t===6?e[0]===1||r?s>9?-12:-8:s>9?-10:-7:-10;onlyDots=()=>this.frets.map((t,e)=>({position:e,value:t})).filter(t=>!this.barres||this.barres.indexOf(t.value)===-1);setReflectiveAttribute(t,e){this.getAttribute(t)||this.setAttribute(t,e)}attributeChangedCallback(t,e,s){if(!(e===s||this.isInitialising))switch(t){case"amount-of-frets":this.state.setAmountOfFrets(parseInt(s));break;case"frets":this.state.setFrets(this.parseIntArrayString(s));break;case"fingers":this.state.setFingers(this.parseIntArrayString(s));break;case"barres":this.state.setBarres(this.parseIntArrayString(s));break;case"capo":this.state.setCapo(s!==null);break;case"base-fret":this.state.setBaseFret(parseInt(s));break;case"strings":this.state.setStrings(parseInt(s));break;case"tuning":this.state.setTuning(q(s));break}}template=()=>`
    <svg
      width="100%"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMinYMin meet"
      viewBox="0 0 75 ${34+this.FRET_HEIGHT*this.amountOfFrets}"
      style="border: 1px solid #ccc;user-select: none;"
      
    >
      <g transform="translate(${this.TRANSLATE_OFFSET}, ${this.TRANSLATE_OFFSET})">
        ${this.renderNeck()}
        ${this.renderBarre()}
        ${this.renderDot()}
      </g>
    </svg>
  `;renderNeck=()=>`
    <g>
      <path
        stroke="#444"
        stroke-width=".25"
        stroke-linecap="square"
        stroke-linejoin="miter"
        d="${this.getNeckPath()}"
      ></path>
      ${this.baseFret===1?this.renderCapoBaseFret():this.renderBaseFretText()}
      ${this.renderTuning()}
    </g>
  `;renderCapoBaseFret=()=>`
    <path
      stroke="#444"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      d="M ${this.offsets[this.strings].x} 0 H ${this.offsets[this.strings].length}"
    ></path>
  `;renderBaseFretText=()=>`
    <text
      font-size="${this.TUNING_FONT_SIZE}pt"
      fill="#444"
      font-family="Arial"
      x="${this.getBarreOffset(this.strings,this.frets,this.baseFret,this.capo)}"
      y="${this.FRET_HEIGHT/2+this.TUNING_FONT_SIZE/2}"
    >
      ${`${this.baseFret}fr`}
    </text>
  `;renderTuning=()=>`
    <g>
      ${this.tuning.slice().map((t,e)=>`
      <text
        key="${t+e}"
        font-size="0.22rem"
        fill="#444"
        font-family="Arial"
        text-anchor="middle"
        x="${this.offsets[this.strings].x+e*10}"
        y="${this.FRET_HEIGHT*this.amountOfFrets+this.TUNING_FONT_SIZE+2}"
      >
        ${t}
      </text>
      `)}
    </g>
  `;renderBarre=()=>this.barres?`${this.barres.map((t,e)=>this.renderSingleBarre(t,e))}`:"";renderSingleBarre=(t,e)=>{let s=this.frets.length,r=this.onlyBarres(this.frets,t);if(r.length===0)return"";let i=r[0].position,a=(r[r.length-1].position-i)*10,u=this.fretYPosition[t-1];return`
      <g>
        ${e===0&&this.capo?this.renderCapo(this.strings,r):""}
        <rect
          fill="#444"
          x="${this.fretXPosition[this.strings][i]}"
          y="${u}"
          width="${a}"
          height="${this.DOT_DIAMETER}"
        ></rect>
      </g>
    `};renderCapo=(t,e)=>`
    <g>
      <g
        transform="translate(${this.getStringPosition(this.strings,this.strings)}, ${this.positions.fret[e[0].value]})"
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
        x="${this.fretXPosition[t][0]}"
        y="0"
        width="${(this.strings-1)*10}"
        fill-opacity="0.2"
        height="${this.DOT_DIAMETER}"
        transform="translate(${this.getStringPosition(t,t)}, ${this.positions.fret[e[0].value]-this.DOT_RADIUS})"
      ></rect>
      <g
        transform="translate(${this.getStringPosition(1,t)}, ${this.positions.fret[e[0].value]})"
      >
        <path
          d="M 0, 0 m -4, 0 a 4,4 0 1,1 8,0"
          fill="#555"
          fill-opacity="0.2"
          transform="rotate(90)"
        ></path>
      </g>
    </g>
  `;renderDot=()=>{let t=(()=>this.barres?[...this.onlyDots(),...this.barres.map(s=>this.onlyBarres(this.frets,s)).flat()].sort((s,r)=>s.position-r.position):[])(),e=this.shadowRoot.querySelectorAll(".dot");return e.forEach(s=>{s.addEventListener("keydown",r=>{let i=Array.from(e).indexOf(s);this.handleDotKeydown(r,i)})}),`
    ${t.map(s=>{let r=this.strings-s.position,i=this.fingers&&this.fingers[s.position];return s.value===-1?this.renderMuteDot(r):this.renderFretDot(s,r,i)})}
  `};renderMuteDot=t=>`
    <text
      class="dot"
      tabindex="0"
      font-size='5.3pt'
      fill='#444'
      font-family='Verdana'
      text-anchor='middle'
      x="${this.getStringPositionDot(t,this.strings)}"
      y='-2.75'
      >x</text>
  `;renderFretDot=(t,e,s)=>`
    <g>
      <circle
        class="dot"
        tabindex="0"
        stroke-width="0.25"
        stroke="#444"
        fill="${t.value===0?"transparent":"#444"}"
        cx="${this.getStringPositionDot(e,this.strings)}"
        cy="${this.FRET_POSITIONS[t.value]}"
        r="${t.value===0?this.radius.open:this.radius.fret}"
      />
      ${s&&s>0?this.renderFingerNumber(t,e,s):""}
    </g>
  `;renderFingerNumber=(t,e,s)=>`
    <text
      font-size="${this.TUNING_FONT_SIZE}pt"
      font-family="Verdana"
      text-anchor="middle"
      fill="white"
      x="${this.getStringPositionDot(e,this.strings)}"
      y="${this.FINGER_POSITIONS[t.value]}"
    >
      ${s}
    </text>
  `;changeFret(t,e){let s=this.frets[t]+e;s=Math.max(0,Math.min(s,this.amountOfFrets));let r=[...this.frets];r[t]=s,this.frets=r,console.log(r)}focusDot(t){let e=this.shadowRoot.querySelectorAll(".dot");e[t]&&e[t].focus()}handleDotKeydown(t,e){let s=t.key,r=this.shadowRoot.querySelectorAll(".dot").length,i;switch(s){case"ArrowRight":i=(e+1)%r,this.focusDot(i);break;case"ArrowLeft":i=(e-1+r)%r,this.focusDot(i);break;case"ArrowUp":this.changeFret(e,-1);break;case"ArrowDown":console.log("DOWN"),this.changeFret(e,1);break}}getClosestString=t=>{let e=Object.values(this.positions.string).slice(0,this.strings),s=e.reduce((r,i)=>Math.abs(i+this.TRANSLATE_OFFSET-t)<Math.abs(r+this.TRANSLATE_OFFSET-t)?i:r);return e.indexOf(s)+1};getClosestFret=t=>{let e=Object.values(this.positions.fret).slice(0,this.amountOfFrets+1),s=e.reduce((r,i)=>Math.abs(i+this.TRANSLATE_OFFSET-t)<Math.abs(r+this.TRANSLATE_OFFSET-t)?i:r);return e.indexOf(s)};handleMouseDown=t=>{let e=this.shadowRoot?.querySelector("svg");if(!e)return;let s=e.createSVGPoint();s.x=t.clientX,s.y=t.clientY;let r=s.matrixTransform(e.getScreenCTM()?.inverse()),i=this.getClosestString(r.x),o=this.getClosestFret(r.y),a=this.strings-i,u=[...this.frets],c=new Set(this.barres);o===0?this.frets[a]===0?u[a]=-1:u[a]=0:u[a]=o,this.dragStart={string:a,fret:o,fretValue:u[a]},this.originalBarres=[...this.barres],this.originalFrets=[...this.frets],c.forEach(l=>{u.filter(d=>d===l).length<2&&c.delete(l)}),S(u,this.frets)||(this.frets=u),S(Array.from(c),this.barres)||(this.barres=Array.from(c)),this.shadowRoot?.addEventListener("mousemove",this.handleMouseMove),document.addEventListener("mouseup",this.handleMouseUp)};handleMouseMove=t=>{if(!this.dragStart)return;let e=this.shadowRoot?.querySelector("svg");if(!e)return;let s=e.createSVGPoint();s.x=t.clientX,s.y=t.clientY;let r=s.matrixTransform(e.getScreenCTM()?.inverse()),i=this.getClosestString(r.x),o=this.dragStart.fretValue,a=this.dragStart.string,u=this.strings-i,c=Math.min(a,u),l=Math.max(a,u),h=[...this.originalFrets],d=new Set(this.originalBarres);for(let g=c;g<=l;g++)h[g]=o,a!==u&&o!==-1&&o!==0&&d.add(o);d.forEach(g=>{h.filter(p=>p===g).length<2&&d.delete(g)});let m=Array.from(d);S(h,this.frets)||(this.frets=h),S(m,this.barres)||(this.barres=m)};handleMouseUp=t=>{this.shadowRoot?.removeEventListener("mousemove",this.handleMouseMove),document.removeEventListener("mouseup",this.handleMouseUp),this.dragStart=null,this.originalFrets=[],this.originalBarres=[]}};window.customElements.define("guitar-chord-diagram",_);
/*! reef v13.0.2 | (c) 2023 Chris Ferdinandi | MIT License | http://github.com/cferdinandi/reef */
//# sourceMappingURL=guitar-chord-diagram.cjs.min.js.map
