(()=>{var h=new Map,T={set(e,t,n){h.has(e)||h.set(e,new Map);let r=h.get(e);if(!r.has(t)&&r.size!==0){console.error(`Bootstrap doesn't allow more than one instance per element. Bound instance: ${Array.from(r.keys())[0]}.`);return}r.set(t,n)},get(e,t){return h.has(e)&&h.get(e).get(t)||null},remove(e,t){if(!h.has(e))return;let n=h.get(e);n.delete(t),n.size===0&&h.delete(e)}};var $="transitionend",R=e=>(e&&window.CSS&&window.CSS.escape&&(e=e.replace(/#([^\s"#']+)/g,(t,n)=>`#${CSS.escape(n)}`)),e),X=e=>e==null?`${e}`:Object.prototype.toString.call(e).match(/\s([a-z]+)/i)[1].toLowerCase();var Ct=e=>{if(!e)return 0;let{transitionDuration:t,transitionDelay:n}=window.getComputedStyle(e),r=Number.parseFloat(t),s=Number.parseFloat(n);return!r&&!s?0:(t=t.split(",")[0],n=n.split(",")[0],(Number.parseFloat(t)+Number.parseFloat(n))*1e3)},Nt=e=>{e.dispatchEvent(new Event($))},A=e=>!e||typeof e!="object"?!1:(typeof e.jquery!="undefined"&&(e=e[0]),typeof e.nodeType!="undefined"),C=e=>A(e)?e.jquery?e[0]:e:typeof e=="string"&&e.length>0?document.querySelector(R(e)):null,Z=e=>{if(!A(e)||e.getClientRects().length===0)return!1;let t=getComputedStyle(e).getPropertyValue("visibility")==="visible",n=e.closest("details:not([open])");if(!n)return t;if(n!==e){let r=e.closest("summary");if(r&&r.parentNode!==n||r===null)return!1}return t},N=e=>!e||e.nodeType!==Node.ELEMENT_NODE||e.classList.contains("disabled")?!0:typeof e.disabled!="undefined"?e.disabled:e.hasAttribute("disabled")&&e.getAttribute("disabled")!=="false";var tt=e=>{e.offsetHeight},M=()=>window.jQuery&&!document.body.hasAttribute("data-bs-no-jquery")?window.jQuery:null,v=[],St=e=>{document.readyState==="loading"?(v.length||document.addEventListener("DOMContentLoaded",()=>{for(let t of v)t()}),v.push(e)):e()};var D=e=>{St(()=>{let t=M();if(t){let n=e.NAME,r=t.fn[n];t.fn[n]=e.jQueryInterface,t.fn[n].Constructor=e,t.fn[n].noConflict=()=>(t.fn[n]=r,e.jQueryInterface)}})},J=(e,t=[],n=e)=>typeof e=="function"?e(...t):n,et=(e,t,n=!0)=>{if(!n){J(e);return}let s=Ct(t)+5,o=!1,i=({target:a})=>{a===t&&(o=!0,t.removeEventListener($,i),J(e))};t.addEventListener($,i),setTimeout(()=>{o||Nt(t)},s)},nt=(e,t,n,r)=>{let s=e.length,o=e.indexOf(t);return o===-1?!n&&r?e[s-1]:e[0]:(o+=n?1:-1,r&&(o=(o+s)%s),e[Math.max(0,Math.min(o,s-1))])};var Ot=/[^.]*(?=\..*)\.|.*/,Tt=/\..*/,Dt=/::\d+$/,x={},rt=1,it={mouseenter:"mouseover",mouseleave:"mouseout"},Lt=new Set(["click","dblclick","mouseup","mousedown","contextmenu","mousewheel","DOMMouseScroll","mouseover","mouseout","mousemove","selectstart","selectend","keydown","keypress","keyup","orientationchange","touchstart","touchmove","touchend","touchcancel","pointerdown","pointermove","pointerup","pointerleave","pointercancel","gesturestart","gesturechange","gestureend","focus","blur","change","reset","select","submit","focusin","focusout","load","unload","beforeunload","resize","move","DOMContentLoaded","readystatechange","error","abort","scroll"]);function ot(e,t){return t&&`${t}::${rt++}`||e.uidEvent||rt++}function at(e){let t=ot(e);return e.uidEvent=t,x[t]=x[t]||{},x[t]}function wt(e,t){return function n(r){return k(r,{delegateTarget:e}),n.oneOff&&H.off(e,r.type,t),t.apply(e,[r])}}function It(e,t,n){return function r(s){let o=e.querySelectorAll(t);for(let{target:i}=s;i&&i!==this;i=i.parentNode)for(let a of o)if(a===i)return k(s,{delegateTarget:i}),r.oneOff&&H.off(e,s.type,t,n),n.apply(i,[s])}}function lt(e,t,n=null){return Object.values(e).find(r=>r.callable===t&&r.delegationSelector===n)}function ct(e,t,n){let r=typeof t=="string",s=r?n:t||n,o=ut(e);return Lt.has(o)||(o=e),[r,s,o]}function st(e,t,n,r,s){if(typeof t!="string"||!e)return;let[o,i,a]=ct(t,n,r);t in it&&(i=(yt=>function(m){if(!m.relatedTarget||m.relatedTarget!==m.delegateTarget&&!m.delegateTarget.contains(m.relatedTarget))return yt.call(this,m)})(i));let u=at(e),g=u[a]||(u[a]={}),f=lt(g,i,o?n:null);if(f){f.oneOff=f.oneOff&&s;return}let E=ot(i,t.replace(Ot,"")),d=o?It(e,n,i):wt(e,i);d.delegationSelector=o?n:null,d.callable=i,d.oneOff=s,d.uidEvent=E,g[E]=d,e.addEventListener(a,d,o)}function P(e,t,n,r,s){let o=lt(t[n],r,s);o&&(e.removeEventListener(n,o,!!s),delete t[n][o.uidEvent])}function vt(e,t,n,r){let s=t[n]||{};for(let[o,i]of Object.entries(s))o.includes(r)&&P(e,t,n,i.callable,i.delegationSelector)}function ut(e){return e=e.replace(Tt,""),it[e]||e}var H={on(e,t,n,r){st(e,t,n,r,!1)},one(e,t,n,r){st(e,t,n,r,!0)},off(e,t,n,r){if(typeof t!="string"||!e)return;let[s,o,i]=ct(t,n,r),a=i!==t,u=at(e),g=u[i]||{},f=t.startsWith(".");if(typeof o!="undefined"){if(!Object.keys(g).length)return;P(e,u,i,o,s?n:null);return}if(f)for(let E of Object.keys(u))vt(e,u,E,t.slice(1));for(let[E,d]of Object.entries(g)){let B=E.replace(Dt,"");(!a||t.includes(B))&&P(e,u,i,d.callable,d.delegationSelector)}},trigger(e,t,n){if(typeof t!="string"||!e)return null;let r=M(),s=ut(t),o=t!==s,i=null,a=!0,u=!0,g=!1;o&&r&&(i=r.Event(t,n),r(e).trigger(i),a=!i.isPropagationStopped(),u=!i.isImmediatePropagationStopped(),g=i.isDefaultPrevented());let f=k(new Event(t,{bubbles:a,cancelable:!0}),n);return g&&f.preventDefault(),u&&e.dispatchEvent(f),f.defaultPrevented&&i&&i.preventDefault(),f}};function k(e,t={}){for(let[n,r]of Object.entries(t))try{e[n]=r}catch(s){Object.defineProperty(e,n,{configurable:!0,get(){return r}})}return e}var c=H;function ft(e){if(e==="true")return!0;if(e==="false")return!1;if(e===Number(e).toString())return Number(e);if(e===""||e==="null")return null;if(typeof e!="string")return e;try{return JSON.parse(decodeURIComponent(e))}catch(t){return e}}function K(e){return e.replace(/[A-Z]/g,t=>`-${t.toLowerCase()}`)}var $t={setDataAttribute(e,t,n){e.setAttribute(`data-bs-${K(t)}`,n)},removeDataAttribute(e,t){e.removeAttribute(`data-bs-${K(t)}`)},getDataAttributes(e){if(!e)return{};let t={},n=Object.keys(e.dataset).filter(r=>r.startsWith("bs")&&!r.startsWith("bsConfig"));for(let r of n){let s=r.replace(/^bs/,"");s=s.charAt(0).toLowerCase()+s.slice(1,s.length),t[s]=ft(e.dataset[r])}return t},getDataAttribute(e,t){return ft(e.getAttribute(`data-bs-${K(t)}`))}},V=$t;var F=class{static get Default(){return{}}static get DefaultType(){return{}}static get NAME(){throw new Error('You have to implement the static method "NAME", for each component!')}_getConfig(t){return t=this._mergeConfigObj(t),t=this._configAfterMerge(t),this._typeCheckConfig(t),t}_configAfterMerge(t){return t}_mergeConfigObj(t,n){let r=A(n)?V.getDataAttribute(n,"config"):{};return{...this.constructor.Default,...typeof r=="object"?r:{},...A(n)?V.getDataAttributes(n):{},...typeof t=="object"?t:{}}}_typeCheckConfig(t,n=this.constructor.DefaultType){for(let[r,s]of Object.entries(n)){let o=t[r],i=A(o)?"element":X(o);if(!new RegExp(s).test(i))throw new TypeError(`${this.constructor.NAME.toUpperCase()}: Option "${r}" provided type "${i}" but expected type "${s}".`)}}},dt=F;var Rt="5.3.2",W=class extends dt{constructor(t,n){super(),t=C(t),t&&(this._element=t,this._config=this._getConfig(n),T.set(this._element,this.constructor.DATA_KEY,this))}dispose(){T.remove(this._element,this.constructor.DATA_KEY),c.off(this._element,this.constructor.EVENT_KEY);for(let t of Object.getOwnPropertyNames(this))this[t]=null}_queueCallback(t,n,r=!0){et(t,n,r)}_getConfig(t){return t=this._mergeConfigObj(t,this._element),t=this._configAfterMerge(t),this._typeCheckConfig(t),t}static getInstance(t){return T.get(C(t),this.DATA_KEY)}static getOrCreateInstance(t,n={}){return this.getInstance(t)||new this(t,typeof n=="object"?n:null)}static get VERSION(){return Rt}static get DATA_KEY(){return`bs.${this.NAME}`}static get EVENT_KEY(){return`.${this.DATA_KEY}`}static eventName(t){return`${t}${this.EVENT_KEY}`}},L=W;var Y=e=>{let t=e.getAttribute("data-bs-target");if(!t||t==="#"){let n=e.getAttribute("href");if(!n||!n.includes("#")&&!n.startsWith("."))return null;n.includes("#")&&!n.startsWith("#")&&(n=`#${n.split("#")[1]}`),t=n&&n!=="#"?R(n.trim()):null}return t},w={find(e,t=document.documentElement){return[].concat(...Element.prototype.querySelectorAll.call(t,e))},findOne(e,t=document.documentElement){return Element.prototype.querySelector.call(t,e)},children(e,t){return[].concat(...e.children).filter(n=>n.matches(t))},parents(e,t){let n=[],r=e.parentNode.closest(t);for(;r;)n.push(r),r=r.parentNode.closest(t);return n},prev(e,t){let n=e.previousElementSibling;for(;n;){if(n.matches(t))return[n];n=n.previousElementSibling}return[]},next(e,t){let n=e.nextElementSibling;for(;n;){if(n.matches(t))return[n];n=n.nextElementSibling}return[]},focusableChildren(e){let t=["a","button","input","textarea","select","details","[tabindex]",'[contenteditable="true"]'].map(n=>`${n}:not([tabindex^="-"])`).join(",");return this.find(t,e).filter(n=>!N(n)&&Z(n))},getSelectorFromElement(e){let t=Y(e);return t&&w.findOne(t)?t:null},getElementFromSelector(e){let t=Y(e);return t?w.findOne(t):null},getMultipleElementsFromSelector(e){let t=Y(e);return t?w.find(t):[]}},l=w;var Mt="tab",xt="bs.tab",_=`.${xt}`,Pt=`hide${_}`,Ht=`hidden${_}`,kt=`show${_}`,Kt=`shown${_}`,Vt=`click${_}`,Ft=`keydown${_}`,Wt=`load${_}`,Yt="ArrowLeft",gt="ArrowRight",jt="ArrowUp",ht="ArrowDown",j="Home",pt="End",p="active",_t="fade",U="show",Ut="dropdown",Et=".dropdown-toggle",zt=".dropdown-menu",z=`:not(${Et})`,Qt='.list-group, .nav, [role="tablist"]',qt=".nav-item, .list-group-item",Gt=`.nav-link${z}, .list-group-item${z}, [role="tab"]${z}`,mt='[data-bs-toggle="tab"], [data-bs-toggle="pill"], [data-bs-toggle="list"]',Q=`${Gt}, ${mt}`,Bt=`.${p}[data-bs-toggle="tab"], .${p}[data-bs-toggle="pill"], .${p}[data-bs-toggle="list"]`,b=class e extends L{constructor(t){super(t),this._parent=this._element.closest(Qt),this._parent&&(this._setInitialAttributes(this._parent,this._getChildren()),c.on(this._element,Ft,n=>this._keydown(n)))}static get NAME(){return Mt}show(){let t=this._element;if(this._elemIsActive(t))return;let n=this._getActiveElem(),r=n?c.trigger(n,Pt,{relatedTarget:t}):null;c.trigger(t,kt,{relatedTarget:n}).defaultPrevented||r&&r.defaultPrevented||(this._deactivate(n,t),this._activate(t,n))}_activate(t,n){if(!t)return;t.classList.add(p),this._activate(l.getElementFromSelector(t));let r=()=>{if(t.getAttribute("role")!=="tab"){t.classList.add(U);return}t.removeAttribute("tabindex"),t.setAttribute("aria-selected",!0),this._toggleDropDown(t,!0),c.trigger(t,Kt,{relatedTarget:n})};this._queueCallback(r,t,t.classList.contains(_t))}_deactivate(t,n){if(!t)return;t.classList.remove(p),t.blur(),this._deactivate(l.getElementFromSelector(t));let r=()=>{if(t.getAttribute("role")!=="tab"){t.classList.remove(U);return}t.setAttribute("aria-selected",!1),t.setAttribute("tabindex","-1"),this._toggleDropDown(t,!1),c.trigger(t,Ht,{relatedTarget:n})};this._queueCallback(r,t,t.classList.contains(_t))}_keydown(t){if(![Yt,gt,jt,ht,j,pt].includes(t.key))return;t.stopPropagation(),t.preventDefault();let n=this._getChildren().filter(s=>!N(s)),r;if([j,pt].includes(t.key))r=n[t.key===j?0:n.length-1];else{let s=[gt,ht].includes(t.key);r=nt(n,t.target,s,!0)}r&&(r.focus({preventScroll:!0}),e.getOrCreateInstance(r).show())}_getChildren(){return l.find(Q,this._parent)}_getActiveElem(){return this._getChildren().find(t=>this._elemIsActive(t))||null}_setInitialAttributes(t,n){this._setAttributeIfNotExists(t,"role","tablist");for(let r of n)this._setInitialAttributesOnChild(r)}_setInitialAttributesOnChild(t){t=this._getInnerElement(t);let n=this._elemIsActive(t),r=this._getOuterElement(t);t.setAttribute("aria-selected",n),r!==t&&this._setAttributeIfNotExists(r,"role","presentation"),n||t.setAttribute("tabindex","-1"),this._setAttributeIfNotExists(t,"role","tab"),this._setInitialAttributesOnTargetPanel(t)}_setInitialAttributesOnTargetPanel(t){let n=l.getElementFromSelector(t);n&&(this._setAttributeIfNotExists(n,"role","tabpanel"),t.id&&this._setAttributeIfNotExists(n,"aria-labelledby",`${t.id}`))}_toggleDropDown(t,n){let r=this._getOuterElement(t);if(!r.classList.contains(Ut))return;let s=(o,i)=>{let a=l.findOne(o,r);a&&a.classList.toggle(i,n)};s(Et,p),s(zt,U),r.setAttribute("aria-expanded",n)}_setAttributeIfNotExists(t,n,r){t.hasAttribute(n)||t.setAttribute(n,r)}_elemIsActive(t){return t.classList.contains(p)}_getInnerElement(t){return t.matches(Q)?t:l.findOne(Q,t)}_getOuterElement(t){return t.closest(qt)||t}static jQueryInterface(t){return this.each(function(){let n=e.getOrCreateInstance(this);if(typeof t=="string"){if(n[t]===void 0||t.startsWith("_")||t==="constructor")throw new TypeError(`No method named "${t}"`);n[t]()}})}};c.on(document,Vt,mt,function(e){["A","AREA"].includes(this.tagName)&&e.preventDefault(),!N(this)&&b.getOrCreateInstance(this).show()});c.on(window,Wt,()=>{for(let e of l.find(Bt))b.getOrCreateInstance(e)});D(b);var At=b;var Jt="collapse",Xt="bs.collapse",O=`.${Xt}`,Zt=".data-api",te=`show${O}`,ee=`shown${O}`,ne=`hide${O}`,re=`hidden${O}`,se=`click${O}${Zt}`,q="show",y="collapse",I="collapsing",ie="collapsed",oe=`:scope .${y} .${y}`,ae="collapse-horizontal",le="width",ce="height",ue=".collapse.show, .collapse.collapsing",G='[data-bs-toggle="collapse"]',fe={parent:null,toggle:!0},de={parent:"(null|element)",toggle:"boolean"},S=class e extends L{constructor(t,n){super(t,n),this._isTransitioning=!1,this._triggerArray=[];let r=l.find(G);for(let s of r){let o=l.getSelectorFromElement(s),i=l.find(o).filter(a=>a===this._element);o!==null&&i.length&&this._triggerArray.push(s)}this._initializeChildren(),this._config.parent||this._addAriaAndCollapsedClass(this._triggerArray,this._isShown()),this._config.toggle&&this.toggle()}static get Default(){return fe}static get DefaultType(){return de}static get NAME(){return Jt}toggle(){this._isShown()?this.hide():this.show()}show(){if(this._isTransitioning||this._isShown())return;let t=[];if(this._config.parent&&(t=this._getFirstLevelChildren(ue).filter(a=>a!==this._element).map(a=>e.getOrCreateInstance(a,{toggle:!1}))),t.length&&t[0]._isTransitioning||c.trigger(this._element,te).defaultPrevented)return;for(let a of t)a.hide();let r=this._getDimension();this._element.classList.remove(y),this._element.classList.add(I),this._element.style[r]=0,this._addAriaAndCollapsedClass(this._triggerArray,!0),this._isTransitioning=!0;let s=()=>{this._isTransitioning=!1,this._element.classList.remove(I),this._element.classList.add(y,q),this._element.style[r]="",c.trigger(this._element,ee)},i=`scroll${r[0].toUpperCase()+r.slice(1)}`;this._queueCallback(s,this._element,!0),this._element.style[r]=`${this._element[i]}px`}hide(){if(this._isTransitioning||!this._isShown()||c.trigger(this._element,ne).defaultPrevented)return;let n=this._getDimension();this._element.style[n]=`${this._element.getBoundingClientRect()[n]}px`,tt(this._element),this._element.classList.add(I),this._element.classList.remove(y,q);for(let s of this._triggerArray){let o=l.getElementFromSelector(s);o&&!this._isShown(o)&&this._addAriaAndCollapsedClass([s],!1)}this._isTransitioning=!0;let r=()=>{this._isTransitioning=!1,this._element.classList.remove(I),this._element.classList.add(y),c.trigger(this._element,re)};this._element.style[n]="",this._queueCallback(r,this._element,!0)}_isShown(t=this._element){return t.classList.contains(q)}_configAfterMerge(t){return t.toggle=!!t.toggle,t.parent=C(t.parent),t}_getDimension(){return this._element.classList.contains(ae)?le:ce}_initializeChildren(){if(!this._config.parent)return;let t=this._getFirstLevelChildren(G);for(let n of t){let r=l.getElementFromSelector(n);r&&this._addAriaAndCollapsedClass([n],this._isShown(r))}}_getFirstLevelChildren(t){let n=l.find(oe,this._config.parent);return l.find(t,this._config.parent).filter(r=>!n.includes(r))}_addAriaAndCollapsedClass(t,n){if(t.length)for(let r of t)r.classList.toggle(ie,!n),r.setAttribute("aria-expanded",n)}static jQueryInterface(t){let n={};return typeof t=="string"&&/show|hide/.test(t)&&(n.toggle=!1),this.each(function(){let r=e.getOrCreateInstance(this,n);if(typeof t=="string"){if(typeof r[t]=="undefined")throw new TypeError(`No method named "${t}"`);r[t]()}})}};c.on(document,se,G,function(e){(e.target.tagName==="A"||e.delegateTarget&&e.delegateTarget.tagName==="A")&&e.preventDefault();for(let t of l.getMultipleElementsFromSelector(this))S.getOrCreateInstance(t,{toggle:!1}).toggle()});D(S);var bt=S;var Ve={Tab:At,Collapse:bt};})();
