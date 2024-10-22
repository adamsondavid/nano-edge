(function () {
  const t = document.createElement("link").relList;
  if (t && t.supports && t.supports("modulepreload")) return;
  for (const s of document.querySelectorAll('link[rel="modulepreload"]')) r(s);
  new MutationObserver((s) => {
    for (const o of s) {
      if (o.type === "childList") {
        for (const i of o.addedNodes) {
          i.tagName === "LINK" && i.rel === "modulepreload" && r(i);
        }
      }
    }
  }).observe(document, { childList: !0, subtree: !0 });
  function n(s) {
    const o = {};
    return s.integrity && (o.integrity = s.integrity),
      s.referrerPolicy && (o.referrerPolicy = s.referrerPolicy),
      s.crossOrigin === "use-credentials"
        ? o.credentials = "include"
        : s.crossOrigin === "anonymous"
        ? o.credentials = "omit"
        : o.credentials = "same-origin",
      o;
  }
  function r(s) {
    if (s.ep) return;
    s.ep = !0;
    const o = n(s);
    fetch(s.href, o);
  }
})(); /**
 * @vue/shared v3.5.10
 * (c) 2018-present Yuxi (Evan) You and Vue contributors
 * @license MIT
 */

/*! #__NO_SIDE_EFFECTS__ */ function so(e) {
  const t = Object.create(null);
  for (const n of e.split(",")) t[n] = 1;
  return (n) => n in t;
}
const fe = {},
  hn = [],
  ut = () => {},
  lc = () => !1,
  Kr = (e) =>
    e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 &&
    (e.charCodeAt(2) > 122 || e.charCodeAt(2) < 97),
  oo = (e) => e.startsWith("onUpdate:"),
  Se = Object.assign,
  io = (e, t) => {
    const n = e.indexOf(t);
    n > -1 && e.splice(n, 1);
  },
  cc = Object.prototype.hasOwnProperty,
  se = (e, t) => cc.call(e, t),
  W = Array.isArray,
  pn = (e) => qr(e) === "[object Map]",
  ra = (e) => qr(e) === "[object Set]",
  G = (e) => typeof e == "function",
  _e = (e) => typeof e == "string",
  zt = (e) => typeof e == "symbol",
  ge = (e) => e !== null && typeof e == "object",
  sa = (e) => (ge(e) || G(e)) && G(e.then) && G(e.catch),
  oa = Object.prototype.toString,
  qr = (e) => oa.call(e),
  uc = (e) => qr(e).slice(8, -1),
  ia = (e) => qr(e) === "[object Object]",
  ao = (e) =>
    _e(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e,
  $n = so(
    ",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted",
  ),
  Qr = (e) => {
    const t = Object.create(null);
    return (n) => t[n] || (t[n] = e(n));
  },
  fc = /-(\w)/g,
  qe = Qr((e) => e.replace(fc, (t, n) => n ? n.toUpperCase() : "")),
  dc = /\B([A-Z])/g,
  nn = Qr((e) => e.replace(dc, "-$1").toLowerCase()),
  Jr = Qr((e) => e.charAt(0).toUpperCase() + e.slice(1)),
  us = Qr((e) => e ? `on${Jr(e)}` : ""),
  $t = (e, t) => !Object.is(e, t),
  fs = (e, ...t) => {
    for (let n = 0; n < e.length; n++) e[n](...t);
  },
  aa = (e, t, n, r = !1) => {
    Object.defineProperty(e, t, {
      configurable: !0,
      enumerable: !1,
      writable: r,
      value: n,
    });
  },
  hc = (e) => {
    const t = parseFloat(e);
    return isNaN(t) ? e : t;
  };
let Do;
const la = () =>
  Do ||
  (Do = typeof globalThis < "u"
    ? globalThis
    : typeof self < "u"
    ? self
    : typeof window < "u"
    ? window
    : typeof global < "u"
    ? global
    : {});
function lo(e) {
  if (W(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++) {
      const r = e[n], s = _e(r) ? yc(r) : lo(r);
      if (s) { for (const o in s) t[o] = s[o]; }
    }
    return t;
  } else if (_e(e) || ge(e)) return e;
}
const pc = /;(?![^(]*\))/g, mc = /:([^]+)/, gc = /\/\*[^]*?\*\//g;
function yc(e) {
  const t = {};
  return e.replace(gc, "").split(pc).forEach((n) => {
    if (n) {
      const r = n.split(mc);
      r.length > 1 && (t[r[0].trim()] = r[1].trim());
    }
  }),
    t;
}
function Yr(e) {
  let t = "";
  if (_e(e)) t = e;
  else if (W(e)) {
    for (let n = 0; n < e.length; n++) {
      const r = Yr(e[n]);
      r && (t += r + " ");
    }
  } else if (ge(e)) { for (const n in e) e[n] && (t += n + " "); }
  return t.trim();
}
const vc =
    "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly",
  bc = so(vc);
function ca(e) {
  return !!e || e === "";
}
const ua = (e) => !!(e && e.__v_isRef === !0),
  fa = (e) =>
    _e(e)
      ? e
      : e == null
      ? ""
      : W(e) || ge(e) && (e.toString === oa || !G(e.toString))
      ? ua(e) ? fa(e.value) : JSON.stringify(e, da, 2)
      : String(e),
  da = (e, t) =>
    ua(t) ? da(e, t.value) : pn(t)
      ? {
        [`Map(${t.size})`]: [...t.entries()].reduce(
          (n, [r, s], o) => (n[ds(r, o) + " =>"] = s, n),
          {},
        ),
      }
      : ra(t)
      ? { [`Set(${t.size})`]: [...t.values()].map((n) => ds(n)) }
      : zt(t)
      ? ds(t)
      : ge(t) && !W(t) && !ia(t)
      ? String(t)
      : t,
  ds = (e, t = "") => {
    var n;
    return zt(e) ? `Symbol(${(n = e.description) != null ? n : t})` : e;
  }; /**
 * @vue/reactivity v3.5.10
 * (c) 2018-present Yuxi (Evan) You and Vue contributors
 * @license MIT
 */

let Ue;
class ha {
  constructor(t = !1) {
    this.detached = t,
      this._active = !0,
      this.effects = [],
      this.cleanups = [],
      this._isPaused = !1,
      this.parent = Ue,
      !t && Ue && (this.index = (Ue.scopes || (Ue.scopes = [])).push(this) - 1);
  }
  get active() {
    return this._active;
  }
  pause() {
    if (this._active) {
      this._isPaused = !0;
      let t, n;
      if (this.scopes) {
        for (t = 0, n = this.scopes.length; t < n; t++) {
          this.scopes[t].pause();
        }
      }
      for (t = 0, n = this.effects.length; t < n; t++) this.effects[t].pause();
    }
  }
  resume() {
    if (this._active && this._isPaused) {
      this._isPaused = !1;
      let t, n;
      if (this.scopes) {
        for (t = 0, n = this.scopes.length; t < n; t++) {
          this.scopes[t].resume();
        }
      }
      for (t = 0, n = this.effects.length; t < n; t++) this.effects[t].resume();
    }
  }
  run(t) {
    if (this._active) {
      const n = Ue;
      try {
        return Ue = this, t();
      } finally {
        Ue = n;
      }
    }
  }
  on() {
    Ue = this;
  }
  off() {
    Ue = this.parent;
  }
  stop(t) {
    if (this._active) {
      let n, r;
      for (n = 0, r = this.effects.length; n < r; n++) this.effects[n].stop();
      for (n = 0, r = this.cleanups.length; n < r; n++) this.cleanups[n]();
      if (this.scopes) {
        for (n = 0, r = this.scopes.length; n < r; n++) {
          this.scopes[n].stop(!0);
        }
      }
      if (!this.detached && this.parent && !t) {
        const s = this.parent.scopes.pop();
        s && s !== this &&
          (this.parent.scopes[this.index] = s, s.index = this.index);
      }
      this.parent = void 0, this._active = !1;
    }
  }
}
function _c(e) {
  return new ha(e);
}
function xc() {
  return Ue;
}
let ue;
const hs = new WeakSet();
class pa {
  constructor(t) {
    this.fn = t,
      this.deps = void 0,
      this.depsTail = void 0,
      this.flags = 5,
      this.next = void 0,
      this.cleanup = void 0,
      this.scheduler = void 0,
      Ue && Ue.active && Ue.effects.push(this);
  }
  pause() {
    this.flags |= 64;
  }
  resume() {
    this.flags & 64 &&
      (this.flags &= -65, hs.has(this) && (hs.delete(this), this.trigger()));
  }
  notify() {
    this.flags & 2 && !(this.flags & 32) || this.flags & 8 || ga(this);
  }
  run() {
    if (!(this.flags & 1)) return this.fn();
    this.flags |= 2, Vo(this), ya(this);
    const t = ue, n = et;
    ue = this, et = !0;
    try {
      return this.fn();
    } finally {
      va(this), ue = t, et = n, this.flags &= -3;
    }
  }
  stop() {
    if (this.flags & 1) {
      for (let t = this.deps; t; t = t.nextDep) fo(t);
      this.deps = this.depsTail = void 0,
        Vo(this),
        this.onStop && this.onStop(),
        this.flags &= -2;
    }
  }
  trigger() {
    this.flags & 64
      ? hs.add(this)
      : this.scheduler
      ? this.scheduler()
      : this.runIfDirty();
  }
  runIfDirty() {
    As(this) && this.run();
  }
  get dirty() {
    return As(this);
  }
}
let ma = 0, fn;
function ga(e) {
  e.flags |= 8, e.next = fn, fn = e;
}
function co() {
  ma++;
}
function uo() {
  if (--ma > 0) return;
  let e;
  for (; fn;) {
    let t = fn, n;
    for (; t;) t.flags & 1 || (t.flags &= -9), t = t.next;
    for (t = fn, fn = void 0; t;) {
      if (n = t.next, t.next = void 0, t.flags &= -9, t.flags & 1) {
        try {
          t.trigger();
        } catch (r) {
          e || (e = r);
        }
      }
      t = n;
    }
  }
  if (e) throw e;
}
function ya(e) {
  for (let t = e.deps; t; t = t.nextDep) {
    t.version = -1, t.prevActiveLink = t.dep.activeLink, t.dep.activeLink = t;
  }
}
function va(e) {
  let t, n = e.depsTail, r = n;
  for (; r;) {
    const s = r.prevDep;
    r.version === -1 ? (r === n && (n = s), fo(r), wc(r)) : t = r,
      r.dep.activeLink = r.prevActiveLink,
      r.prevActiveLink = void 0,
      r = s;
  }
  e.deps = t, e.depsTail = n;
}
function As(e) {
  for (let t = e.deps; t; t = t.nextDep) {
    if (
      t.dep.version !== t.version ||
      t.dep.computed && (ba(t.dep.computed) || t.dep.version !== t.version)
    ) return !0;
  }
  return !!e._dirty;
}
function ba(e) {
  if (
    e.flags & 4 && !(e.flags & 16) || (e.flags &= -17, e.globalVersion === Hn)
  ) return;
  e.globalVersion = Hn;
  const t = e.dep;
  if (e.flags |= 2, t.version > 0 && !e.isSSR && e.deps && !As(e)) {
    e.flags &= -3;
    return;
  }
  const n = ue, r = et;
  ue = e, et = !0;
  try {
    ya(e);
    const s = e.fn(e._value);
    (t.version === 0 || $t(s, e._value)) && (e._value = s, t.version++);
  } catch (s) {
    throw t.version++, s;
  } finally {
    ue = n, et = r, va(e), e.flags &= -3;
  }
}
function fo(e, t = !1) {
  const { dep: n, prevSub: r, nextSub: s } = e;
  if (
    r && (r.nextSub = s, e.prevSub = void 0),
      s && (s.prevSub = r, e.nextSub = void 0),
      n.subs === e && (n.subs = r),
      !n.subs && n.computed
  ) {
    n.computed.flags &= -5;
    for (let o = n.computed.deps; o; o = o.nextDep) fo(o, !0);
  }
  !t && !--n.sc && n.map && n.map.delete(n.key);
}
function wc(e) {
  const { prevDep: t, nextDep: n } = e;
  t && (t.nextDep = n, e.prevDep = void 0),
    n && (n.prevDep = t, e.nextDep = void 0);
}
let et = !0;
const _a = [];
function Ft() {
  _a.push(et), et = !1;
}
function Ut() {
  const e = _a.pop();
  et = e === void 0 ? !0 : e;
}
function Vo(e) {
  const { cleanup: t } = e;
  if (e.cleanup = void 0, t) {
    const n = ue;
    ue = void 0;
    try {
      t();
    } finally {
      ue = n;
    }
  }
}
let Hn = 0;
class Sc {
  constructor(t, n) {
    this.sub = t,
      this.dep = n,
      this.version = n.version,
      this.nextDep =
        this.prevDep =
        this.nextSub =
        this.prevSub =
        this.prevActiveLink =
          void 0;
  }
}
class ho {
  constructor(t) {
    this.computed = t,
      this.version = 0,
      this.activeLink = void 0,
      this.subs = void 0,
      this.target = void 0,
      this.map = void 0,
      this.key = void 0,
      this.sc = 0;
  }
  track(t) {
    if (!ue || !et || ue === this.computed) return;
    let n = this.activeLink;
    if (n === void 0 || n.sub !== ue) {
      n = this.activeLink = new Sc(ue, this),
        ue.deps
          ? (n.prevDep = ue.depsTail, ue.depsTail.nextDep = n, ue.depsTail = n)
          : ue.deps = ue.depsTail = n,
        xa(n);
    } else if (n.version === -1 && (n.version = this.version, n.nextDep)) {
      const r = n.nextDep;
      r.prevDep = n.prevDep,
        n.prevDep && (n.prevDep.nextDep = r),
        n.prevDep = ue.depsTail,
        n.nextDep = void 0,
        ue.depsTail.nextDep = n,
        ue.depsTail = n,
        ue.deps === n && (ue.deps = r);
    }
    return n;
  }
  trigger(t) {
    this.version++, Hn++, this.notify(t);
  }
  notify(t) {
    co();
    try {
      for (let n = this.subs; n; n = n.prevSub) {
        n.sub.notify() && n.sub.dep.notify();
      }
    } finally {
      uo();
    }
  }
}
function xa(e) {
  if (e.dep.sc++, e.sub.flags & 4) {
    const t = e.dep.computed;
    if (t && !e.dep.subs) {
      t.flags |= 20;
      for (let r = t.deps; r; r = r.nextDep) xa(r);
    }
    const n = e.dep.subs;
    n !== e && (e.prevSub = n, n && (n.nextSub = e)), e.dep.subs = e;
  }
}
const Ps = new WeakMap(), Gt = Symbol(""), Ms = Symbol(""), Wn = Symbol("");
function Te(e, t, n) {
  if (et && ue) {
    let r = Ps.get(e);
    r || Ps.set(e, r = new Map());
    let s = r.get(n);
    s || (r.set(n, s = new ho()), s.target = e, s.map = r, s.key = n),
      s.track();
  }
}
function xt(e, t, n, r, s, o) {
  const i = Ps.get(e);
  if (!i) {
    Hn++;
    return;
  }
  const a = (l) => {
    l && l.trigger();
  };
  if (co(), t === "clear") i.forEach(a);
  else {
    const l = W(e), c = l && ao(n);
    if (l && n === "length") {
      const u = Number(r);
      i.forEach((f, p) => {
        (p === "length" || p === Wn || !zt(p) && p >= u) && a(f);
      });
    } else {switch (n !== void 0 && a(i.get(n)), c && a(i.get(Wn)), t) {
        case "add":
          l ? c && a(i.get("length")) : (a(i.get(Gt)), pn(e) && a(i.get(Ms)));
          break;
        case "delete":
          l || (a(i.get(Gt)), pn(e) && a(i.get(Ms)));
          break;
        case "set":
          pn(e) && a(i.get(Gt));
          break;
      }}
  }
  uo();
}
function an(e) {
  const t = oe(e);
  return t === e ? t : (Te(t, "iterate", Wn), tt(e) ? t : t.map(Pe));
}
function po(e) {
  return Te(e = oe(e), "iterate", Wn), e;
}
const Cc = {
  __proto__: null,
  [Symbol.iterator]() {
    return ps(this, Symbol.iterator, Pe);
  },
  concat(...e) {
    return an(this).concat(...e.map((t) => W(t) ? an(t) : t));
  },
  entries() {
    return ps(this, "entries", (e) => (e[1] = Pe(e[1]), e));
  },
  every(e, t) {
    return gt(this, "every", e, t, void 0, arguments);
  },
  filter(e, t) {
    return gt(this, "filter", e, t, (n) => n.map(Pe), arguments);
  },
  find(e, t) {
    return gt(this, "find", e, t, Pe, arguments);
  },
  findIndex(e, t) {
    return gt(this, "findIndex", e, t, void 0, arguments);
  },
  findLast(e, t) {
    return gt(this, "findLast", e, t, Pe, arguments);
  },
  findLastIndex(e, t) {
    return gt(this, "findLastIndex", e, t, void 0, arguments);
  },
  forEach(e, t) {
    return gt(this, "forEach", e, t, void 0, arguments);
  },
  includes(...e) {
    return ms(this, "includes", e);
  },
  indexOf(...e) {
    return ms(this, "indexOf", e);
  },
  join(e) {
    return an(this).join(e);
  },
  lastIndexOf(...e) {
    return ms(this, "lastIndexOf", e);
  },
  map(e, t) {
    return gt(this, "map", e, t, void 0, arguments);
  },
  pop() {
    return Tn(this, "pop");
  },
  push(...e) {
    return Tn(this, "push", e);
  },
  reduce(e, ...t) {
    return zo(this, "reduce", e, t);
  },
  reduceRight(e, ...t) {
    return zo(this, "reduceRight", e, t);
  },
  shift() {
    return Tn(this, "shift");
  },
  some(e, t) {
    return gt(this, "some", e, t, void 0, arguments);
  },
  splice(...e) {
    return Tn(this, "splice", e);
  },
  toReversed() {
    return an(this).toReversed();
  },
  toSorted(e) {
    return an(this).toSorted(e);
  },
  toSpliced(...e) {
    return an(this).toSpliced(...e);
  },
  unshift(...e) {
    return Tn(this, "unshift", e);
  },
  values() {
    return ps(this, "values", Pe);
  },
};
function ps(e, t, n) {
  const r = po(e), s = r[t]();
  return r !== e && !tt(e) && (s._next = s.next,
    s.next = () => {
      const o = s._next();
      return o.value && (o.value = n(o.value)), o;
    }),
    s;
}
const kc = Array.prototype;
function gt(e, t, n, r, s, o) {
  const i = po(e), a = i !== e && !tt(e), l = i[t];
  if (l !== kc[t]) {
    const f = l.apply(e, o);
    return a ? Pe(f) : f;
  }
  let c = n;
  i !== e && (a
    ? c = function (f, p) {
      return n.call(this, Pe(f), p, e);
    }
    : n.length > 2 && (c = function (f, p) {
      return n.call(this, f, p, e);
    }));
  const u = l.call(i, c, r);
  return a && s ? s(u) : u;
}
function zo(e, t, n, r) {
  const s = po(e);
  let o = n;
  return s !== e && (tt(e)
    ? n.length > 3 && (o = function (i, a, l) {
      return n.call(this, i, a, l, e);
    })
    : o = function (i, a, l) {
      return n.call(this, i, Pe(a), l, e);
    }),
    s[t](o, ...r);
}
function ms(e, t, n) {
  const r = oe(e);
  Te(r, "iterate", Wn);
  const s = r[t](...n);
  return (s === -1 || s === !1) && vo(n[0]) ? (n[0] = oe(n[0]), r[t](...n)) : s;
}
function Tn(e, t, n = []) {
  Ft(), co();
  const r = oe(e)[t].apply(e, n);
  return uo(), Ut(), r;
}
const Ec = so("__proto__,__v_isRef,__isVue"),
  wa = new Set(
    Object.getOwnPropertyNames(Symbol).filter((e) =>
      e !== "arguments" && e !== "caller"
    ).map((e) => Symbol[e]).filter(zt),
  );
function Tc(e) {
  zt(e) || (e = String(e));
  const t = oe(this);
  return Te(t, "has", e), t.hasOwnProperty(e);
}
class Sa {
  constructor(t = !1, n = !1) {
    this._isReadonly = t, this._isShallow = n;
  }
  get(t, n, r) {
    const s = this._isReadonly, o = this._isShallow;
    if (n === "__v_isReactive") return !s;
    if (n === "__v_isReadonly") return s;
    if (n === "__v_isShallow") return o;
    if (n === "__v_raw") {
      return r === (s ? o ? Vc : Ta : o ? Ea : ka).get(t) ||
          Object.getPrototypeOf(t) === Object.getPrototypeOf(r)
        ? t
        : void 0;
    }
    const i = W(t);
    if (!s) {
      let l;
      if (i && (l = Cc[n])) return l;
      if (n === "hasOwnProperty") return Tc;
    }
    const a = Reflect.get(t, n, Ee(t) ? t : r);
    return (zt(n) ? wa.has(n) : Ec(n)) || (s || Te(t, "get", n), o)
      ? a
      : Ee(a)
      ? i && ao(n) ? a : a.value
      : ge(a)
      ? s ? Oa(a) : mr(a)
      : a;
  }
}
class Ca extends Sa {
  constructor(t = !1) {
    super(!1, t);
  }
  set(t, n, r, s) {
    let o = t[n];
    if (!this._isShallow) {
      const l = Qt(o);
      if (
        !tt(r) && !Qt(r) && (o = oe(o), r = oe(r)), !W(t) && Ee(o) && !Ee(r)
      ) return l ? !1 : (o.value = r, !0);
    }
    const i = W(t) && ao(n) ? Number(n) < t.length : se(t, n),
      a = Reflect.set(t, n, r, Ee(t) ? t : s);
    return t === oe(s) &&
      (i ? $t(r, o) && xt(t, "set", n, r) : xt(t, "add", n, r)),
      a;
  }
  deleteProperty(t, n) {
    const r = se(t, n);
    t[n];
    const s = Reflect.deleteProperty(t, n);
    return s && r && xt(t, "delete", n, void 0), s;
  }
  has(t, n) {
    const r = Reflect.has(t, n);
    return (!zt(n) || !wa.has(n)) && Te(t, "has", n), r;
  }
  ownKeys(t) {
    return Te(t, "iterate", W(t) ? "length" : Gt), Reflect.ownKeys(t);
  }
}
class Rc extends Sa {
  constructor(t = !1) {
    super(!0, t);
  }
  set(t, n) {
    return !0;
  }
  deleteProperty(t, n) {
    return !0;
  }
}
const Oc = new Ca(), Ic = new Rc(), Ac = new Ca(!0);
const mo = (e) => e, Xr = (e) => Reflect.getPrototypeOf(e);
function _r(e, t, n = !1, r = !1) {
  e = e.__v_raw;
  const s = oe(e), o = oe(t);
  n || ($t(t, o) && Te(s, "get", t), Te(s, "get", o));
  const { has: i } = Xr(s), a = r ? mo : n ? bo : Pe;
  if (i.call(s, t)) return a(e.get(t));
  if (i.call(s, o)) return a(e.get(o));
  e !== s && e.get(t);
}
function xr(e, t = !1) {
  const n = this.__v_raw, r = oe(n), s = oe(e);
  return t || ($t(e, s) && Te(r, "has", e), Te(r, "has", s)),
    e === s ? n.has(e) : n.has(e) || n.has(s);
}
function wr(e, t = !1) {
  return e = e.__v_raw,
    !t && Te(oe(e), "iterate", Gt),
    Reflect.get(e, "size", e);
}
function Fo(e, t = !1) {
  !t && !tt(e) && !Qt(e) && (e = oe(e));
  const n = oe(this);
  return Xr(n).has.call(n, e) || (n.add(e), xt(n, "add", e, e)), this;
}
function Uo(e, t, n = !1) {
  !n && !tt(t) && !Qt(t) && (t = oe(t));
  const r = oe(this), { has: s, get: o } = Xr(r);
  let i = s.call(r, e);
  i || (e = oe(e), i = s.call(r, e));
  const a = o.call(r, e);
  return r.set(e, t),
    i ? $t(t, a) && xt(r, "set", e, t) : xt(r, "add", e, t),
    this;
}
function Bo(e) {
  const t = oe(this), { has: n, get: r } = Xr(t);
  let s = n.call(t, e);
  s || (e = oe(e), s = n.call(t, e)), r && r.call(t, e);
  const o = t.delete(e);
  return s && xt(t, "delete", e, void 0), o;
}
function Ho() {
  const e = oe(this), t = e.size !== 0, n = e.clear();
  return t && xt(e, "clear", void 0, void 0), n;
}
function Sr(e, t) {
  return function (r, s) {
    const o = this, i = o.__v_raw, a = oe(i), l = t ? mo : e ? bo : Pe;
    return !e && Te(a, "iterate", Gt),
      i.forEach((c, u) => r.call(s, l(c), l(u), o));
  };
}
function Cr(e, t, n) {
  return function (...r) {
    const s = this.__v_raw,
      o = oe(s),
      i = pn(o),
      a = e === "entries" || e === Symbol.iterator && i,
      l = e === "keys" && i,
      c = s[e](...r),
      u = n ? mo : t ? bo : Pe;
    return !t && Te(o, "iterate", l ? Ms : Gt), {
      next() {
        const { value: f, done: p } = c.next();
        return p
          ? { value: f, done: p }
          : { value: a ? [u(f[0]), u(f[1])] : u(f), done: p };
      },
      [Symbol.iterator]() {
        return this;
      },
    };
  };
}
function kt(e) {
  return function (...t) {
    return e === "delete" ? !1 : e === "clear" ? void 0 : this;
  };
}
function Pc() {
  const e = {
      get(o) {
        return _r(this, o);
      },
      get size() {
        return wr(this);
      },
      has: xr,
      add: Fo,
      set: Uo,
      delete: Bo,
      clear: Ho,
      forEach: Sr(!1, !1),
    },
    t = {
      get(o) {
        return _r(this, o, !1, !0);
      },
      get size() {
        return wr(this);
      },
      has: xr,
      add(o) {
        return Fo.call(this, o, !0);
      },
      set(o, i) {
        return Uo.call(this, o, i, !0);
      },
      delete: Bo,
      clear: Ho,
      forEach: Sr(!1, !0),
    },
    n = {
      get(o) {
        return _r(this, o, !0);
      },
      get size() {
        return wr(this, !0);
      },
      has(o) {
        return xr.call(this, o, !0);
      },
      add: kt("add"),
      set: kt("set"),
      delete: kt("delete"),
      clear: kt("clear"),
      forEach: Sr(!0, !1),
    },
    r = {
      get(o) {
        return _r(this, o, !0, !0);
      },
      get size() {
        return wr(this, !0);
      },
      has(o) {
        return xr.call(this, o, !0);
      },
      add: kt("add"),
      set: kt("set"),
      delete: kt("delete"),
      clear: kt("clear"),
      forEach: Sr(!0, !0),
    };
  return ["keys", "values", "entries", Symbol.iterator].forEach((o) => {
    e[o] = Cr(o, !1, !1),
      n[o] = Cr(o, !0, !1),
      t[o] = Cr(o, !1, !0),
      r[o] = Cr(o, !0, !0);
  }),
    [e, n, t, r];
}
const [Mc, Nc, jc, $c] = Pc();
function go(e, t) {
  const n = t ? e ? $c : jc : e ? Nc : Mc;
  return (r, s, o) =>
    s === "__v_isReactive"
      ? !e
      : s === "__v_isReadonly"
      ? e
      : s === "__v_raw"
      ? r
      : Reflect.get(se(n, s) && s in r ? n : r, s, o);
}
const Lc = { get: go(!1, !1) },
  Zc = { get: go(!1, !0) },
  Dc = { get: go(!0, !1) };
const ka = new WeakMap(),
  Ea = new WeakMap(),
  Ta = new WeakMap(),
  Vc = new WeakMap();
function zc(e) {
  switch (e) {
    case "Object":
    case "Array":
      return 1;
    case "Map":
    case "Set":
    case "WeakMap":
    case "WeakSet":
      return 2;
    default:
      return 0;
  }
}
function Fc(e) {
  return e.__v_skip || !Object.isExtensible(e) ? 0 : zc(uc(e));
}
function mr(e) {
  return Qt(e) ? e : yo(e, !1, Oc, Lc, ka);
}
function Ra(e) {
  return yo(e, !1, Ac, Zc, Ea);
}
function Oa(e) {
  return yo(e, !0, Ic, Dc, Ta);
}
function yo(e, t, n, r, s) {
  if (!ge(e) || e.__v_raw && !(t && e.__v_isReactive)) return e;
  const o = s.get(e);
  if (o) return o;
  const i = Fc(e);
  if (i === 0) return e;
  const a = new Proxy(e, i === 2 ? r : n);
  return s.set(e, a), a;
}
function Ln(e) {
  return Qt(e) ? Ln(e.__v_raw) : !!(e && e.__v_isReactive);
}
function Qt(e) {
  return !!(e && e.__v_isReadonly);
}
function tt(e) {
  return !!(e && e.__v_isShallow);
}
function vo(e) {
  return e ? !!e.__v_raw : !1;
}
function oe(e) {
  const t = e && e.__v_raw;
  return t ? oe(t) : e;
}
function Uc(e) {
  return !se(e, "__v_skip") && Object.isExtensible(e) && aa(e, "__v_skip", !0),
    e;
}
const Pe = (e) => ge(e) ? mr(e) : e, bo = (e) => ge(e) ? Oa(e) : e;
function Ee(e) {
  return e ? e.__v_isRef === !0 : !1;
}
function Zn(e) {
  return Ia(e, !1);
}
function Bc(e) {
  return Ia(e, !0);
}
function Ia(e, t) {
  return Ee(e) ? e : new Hc(e, t);
}
class Hc {
  constructor(t, n) {
    this.dep = new ho(),
      this.__v_isRef = !0,
      this.__v_isShallow = !1,
      this._rawValue = n ? t : oe(t),
      this._value = n ? t : Pe(t),
      this.__v_isShallow = n;
  }
  get value() {
    return this.dep.track(), this._value;
  }
  set value(t) {
    const n = this._rawValue, r = this.__v_isShallow || tt(t) || Qt(t);
    t = r ? t : oe(t),
      $t(t, n) &&
      (this._rawValue = t, this._value = r ? t : Pe(t), this.dep.trigger());
  }
}
function Me(e) {
  return Ee(e) ? e.value : e;
}
const Wc = {
  get: (e, t, n) => t === "__v_raw" ? e : Me(Reflect.get(e, t, n)),
  set: (e, t, n, r) => {
    const s = e[t];
    return Ee(s) && !Ee(n) ? (s.value = n, !0) : Reflect.set(e, t, n, r);
  },
};
function Aa(e) {
  return Ln(e) ? e : new Proxy(e, Wc);
}
class Gc {
  constructor(t, n, r) {
    this.fn = t,
      this.setter = n,
      this._value = void 0,
      this.dep = new ho(this),
      this.__v_isRef = !0,
      this.deps = void 0,
      this.depsTail = void 0,
      this.flags = 16,
      this.globalVersion = Hn - 1,
      this.next = void 0,
      this.effect = this,
      this.__v_isReadonly = !n,
      this.isSSR = r;
  }
  notify() {
    if (this.flags |= 16, !(this.flags & 8) && ue !== this) return ga(this), !0;
  }
  get value() {
    const t = this.dep.track();
    return ba(this), t && (t.version = this.dep.version), this._value;
  }
  set value(t) {
    this.setter && this.setter(t);
  }
}
function Kc(e, t, n = !1) {
  let r, s;
  return G(e) ? r = e : (r = e.get, s = e.set), new Gc(r, s, n);
}
const kr = {}, Nr = new WeakMap();
let Wt;
function qc(e, t = !1, n = Wt) {
  if (n) {
    let r = Nr.get(n);
    r || Nr.set(n, r = []), r.push(e);
  }
}
function Qc(e, t, n = fe) {
  const {
      immediate: r,
      deep: s,
      once: o,
      scheduler: i,
      augmentJob: a,
      call: l,
    } = n,
    c = (T) => s ? T : tt(T) || s === !1 || s === 0 ? Mt(T, 1) : Mt(T);
  let u, f, p, m, k = !1, _ = !1;
  if (
    Ee(e)
      ? (f = () => e.value, k = tt(e))
      : Ln(e)
      ? (f = () => c(e), k = !0)
      : W(e)
      ? (_ = !0,
        k = e.some((T) => Ln(T) || tt(T)),
        f = () =>
          e.map((T) => {
            if (Ee(T)) return T.value;
            if (Ln(T)) return c(T);
            if (G(T)) return l ? l(T, 2) : T();
          }))
      : G(e)
      ? t ? f = l ? () => l(e, 2) : e : f = () => {
        if (p) {
          Ft();
          try {
            p();
          } finally {
            Ut();
          }
        }
        const T = Wt;
        Wt = u;
        try {
          return l ? l(e, 3, [m]) : e(m);
        } finally {
          Wt = T;
        }
      }
      : f = ut, t && s
  ) {
    const T = f, Y = s === !0 ? 1 / 0 : s;
    f = () => Mt(T(), Y);
  }
  const b = xc(),
    I = () => {
      u.stop(), b && io(b.effects, u);
    };
  if (o && t) {
    const T = t;
    t = (...Y) => {
      T(...Y), I();
    };
  }
  let O = _ ? new Array(e.length).fill(kr) : kr;
  const $ = (T) => {
    if (!(!(u.flags & 1) || !u.dirty && !T)) {
      if (t) {
        const Y = u.run();
        if (s || k || (_ ? Y.some((B, J) => $t(B, O[J])) : $t(Y, O))) {
          p && p();
          const B = Wt;
          Wt = u;
          try {
            const J = [Y, O === kr ? void 0 : _ && O[0] === kr ? [] : O, m];
            l ? l(t, 3, J) : t(...J), O = Y;
          } finally {
            Wt = B;
          }
        }
      } else u.run();
    }
  };
  return a && a($),
    u = new pa(f),
    u.scheduler = i ? () => i($, !1) : $,
    m = (T) => qc(T, !1, u),
    p = u.onStop = () => {
      const T = Nr.get(u);
      if (T) {
        if (l) l(T, 4);
        else for (const Y of T) Y();
        Nr.delete(u);
      }
    },
    t ? r ? $(!0) : O = u.run() : i ? i($.bind(null, !0), !0) : u.run(),
    I.pause = u.pause.bind(u),
    I.resume = u.resume.bind(u),
    I.stop = I,
    I;
}
function Mt(e, t = 1 / 0, n) {
  if (t <= 0 || !ge(e) || e.__v_skip || (n = n || new Set(), n.has(e))) {
    return e;
  }
  if (n.add(e), t--, Ee(e)) Mt(e.value, t, n);
  else if (W(e)) { for (let r = 0; r < e.length; r++) Mt(e[r], t, n); }
  else if (ra(e) || pn(e)) {
    e.forEach((r) => {
      Mt(r, t, n);
    });
  } else if (ia(e)) {
    for (const r in e) Mt(e[r], t, n);
    for (const r of Object.getOwnPropertySymbols(e)) {
      Object.prototype.propertyIsEnumerable.call(e, r) && Mt(e[r], t, n);
    }
  }
  return e;
} /**
 * @vue/runtime-core v3.5.10
 * (c) 2018-present Yuxi (Evan) You and Vue contributors
 * @license MIT
 */

function gr(e, t, n, r) {
  try {
    return r ? e(...r) : e();
  } catch (s) {
    es(s, t, n);
  }
}
function dt(e, t, n, r) {
  if (G(e)) {
    const s = gr(e, t, n, r);
    return s && sa(s) && s.catch((o) => {
      es(o, t, n);
    }),
      s;
  }
  if (W(e)) {
    const s = [];
    for (let o = 0; o < e.length; o++) s.push(dt(e[o], t, n, r));
    return s;
  }
}
function es(e, t, n, r = !0) {
  const s = t ? t.vnode : null,
    { errorHandler: o, throwUnhandledErrorInProduction: i } =
      t && t.appContext.config || fe;
  if (t) {
    let a = t.parent;
    const l = t.proxy, c = `https://vuejs.org/error-reference/#runtime-${n}`;
    for (; a;) {
      const u = a.ec;
      if (u) {
        for (let f = 0; f < u.length; f++) if (u[f](e, l, c) === !1) return;
      }
      a = a.parent;
    }
    if (o) {
      Ft(), gr(o, null, 10, [e, l, c]), Ut();
      return;
    }
  }
  Jc(e, n, s, r, i);
}
function Jc(e, t, n, r = !0, s = !1) {
  if (s) throw e;
  console.error(e);
}
let Gn = !1, Ns = !1;
const Ne = [];
let lt = 0;
const mn = [];
let Ot = null, ln = 0;
const Pa = Promise.resolve();
let _o = null;
function Ma(e) {
  const t = _o || Pa;
  return e ? t.then(this ? e.bind(this) : e) : t;
}
function Yc(e) {
  let t = Gn ? lt + 1 : 0, n = Ne.length;
  for (; t < n;) {
    const r = t + n >>> 1, s = Ne[r], o = Kn(s);
    o < e || o === e && s.flags & 2 ? t = r + 1 : n = r;
  }
  return t;
}
function xo(e) {
  if (!(e.flags & 1)) {
    const t = Kn(e), n = Ne[Ne.length - 1];
    !n || !(e.flags & 2) && t >= Kn(n) ? Ne.push(e) : Ne.splice(Yc(t), 0, e),
      e.flags |= 1,
      Na();
  }
}
function Na() {
  !Gn && !Ns && (Ns = !0, _o = Pa.then($a));
}
function Xc(e) {
  W(e)
    ? mn.push(...e)
    : Ot && e.id === -1
    ? Ot.splice(ln + 1, 0, e)
    : e.flags & 1 || (mn.push(e), e.flags |= 1), Na();
}
function Wo(e, t, n = Gn ? lt + 1 : 0) {
  for (; n < Ne.length; n++) {
    const r = Ne[n];
    if (r && r.flags & 2) {
      if (e && r.id !== e.uid) continue;
      Ne.splice(n, 1),
        n--,
        r.flags & 4 && (r.flags &= -2),
        r(),
        r.flags & 4 || (r.flags &= -2);
    }
  }
}
function ja(e) {
  if (mn.length) {
    const t = [...new Set(mn)].sort((n, r) => Kn(n) - Kn(r));
    if (mn.length = 0, Ot) {
      Ot.push(...t);
      return;
    }
    for (Ot = t, ln = 0; ln < Ot.length; ln++) {
      const n = Ot[ln];
      n.flags & 4 && (n.flags &= -2), n.flags & 8 || n(), n.flags &= -2;
    }
    Ot = null, ln = 0;
  }
}
const Kn = (e) => e.id == null ? e.flags & 2 ? -1 : 1 / 0 : e.id;
function $a(e) {
  Ns = !1, Gn = !0;
  try {
    for (lt = 0; lt < Ne.length; lt++) {
      const t = Ne[lt];
      t && !(t.flags & 8) &&
        (t.flags & 4 && (t.flags &= -2),
          gr(t, t.i, t.i ? 15 : 14),
          t.flags & 4 || (t.flags &= -2));
    }
  } finally {
    for (; lt < Ne.length; lt++) {
      const t = Ne[lt];
      t && (t.flags &= -2);
    }
    lt = 0,
      Ne.length = 0,
      ja(),
      Gn = !1,
      _o = null,
      (Ne.length || mn.length) && $a();
  }
}
let je = null, La = null;
function jr(e) {
  const t = je;
  return je = e, La = e && e.type.__scopeId || null, t;
}
function $r(e, t = je, n) {
  if (!t || e._n) return e;
  const r = (...s) => {
    r._d && ti(-1);
    const o = jr(t);
    let i;
    try {
      i = e(...s);
    } finally {
      jr(o), r._d && ti(1);
    }
    return i;
  };
  return r._n = !0, r._c = !0, r._d = !0, r;
}
function Bt(e, t, n, r) {
  const s = e.dirs, o = t && t.dirs;
  for (let i = 0; i < s.length; i++) {
    const a = s[i];
    o && (a.oldValue = o[i].value);
    let l = a.dir[r];
    l && (Ft(), dt(l, n, 8, [e.el, a, e, t]), Ut());
  }
}
const eu = Symbol("_vte"), tu = (e) => e.__isTeleport;
function wo(e, t) {
  e.shapeFlag & 6 && e.component
    ? (e.transition = t, wo(e.component.subTree, t))
    : e.shapeFlag & 128
    ? (e.ssContent.transition = t.clone(e.ssContent),
      e.ssFallback.transition = t.clone(e.ssFallback))
    : e.transition = t;
} /*! #__NO_SIDE_EFFECTS__ */
function rn(e, t) {
  return G(e) ? Se({ name: e.name }, t, { setup: e }) : e;
}
function Za(e) {
  e.ids = [e.ids[0] + e.ids[2]++ + "-", 0, 0];
}
function js(e, t, n, r, s = !1) {
  if (W(e)) {
    e.forEach((k, _) => js(k, t && (W(t) ? t[_] : t), n, r, s));
    return;
  }
  if (gn(r) && !s) return;
  const o = r.shapeFlag & 4 ? Eo(r.component) : r.el,
    i = s ? null : o,
    { i: a, r: l } = e,
    c = t && t.r,
    u = a.refs === fe ? a.refs = {} : a.refs,
    f = a.setupState,
    p = oe(f),
    m = f === fe ? () => !1 : (k) => se(p, k);
  if (
    c != null && c !== l &&
    (_e(c) ? (u[c] = null, m(c) && (f[c] = null)) : Ee(c) && (c.value = null)),
      G(l)
  ) gr(l, a, 12, [i, u]);
  else {
    const k = _e(l), _ = Ee(l);
    if (k || _) {
      const b = () => {
        if (e.f) {
          const I = k ? m(l) ? f[l] : u[l] : l.value;
          s
            ? W(I) && io(I, o)
            : W(I)
            ? I.includes(o) || I.push(o)
            : k
            ? (u[l] = [o], m(l) && (f[l] = u[l]))
            : (l.value = [o], e.k && (u[e.k] = l.value));
        } else {k
            ? (u[l] = i, m(l) && (f[l] = i))
            : _ && (l.value = i, e.k && (u[e.k] = i));}
      };
      i ? (b.id = -1, Fe(b, n)) : b();
    }
  }
}
const gn = (e) => !!e.type.__asyncLoader, Da = (e) => e.type.__isKeepAlive;
function nu(e, t) {
  Va(e, "a", t);
}
function ru(e, t) {
  Va(e, "da", t);
}
function Va(e, t, n = ke) {
  const r = e.__wdc || (e.__wdc = () => {
    let s = n;
    for (; s;) {
      if (s.isDeactivated) return;
      s = s.parent;
    }
    return e();
  });
  if (ts(t, r, n), n) {
    let s = n.parent;
    for (; s && s.parent;) Da(s.parent.vnode) && su(r, t, n, s), s = s.parent;
  }
}
function su(e, t, n, r) {
  const s = ts(t, e, r, !0);
  za(() => {
    io(r[t], s);
  }, n);
}
function ts(e, t, n = ke, r = !1) {
  if (n) {
    const s = n[e] || (n[e] = []),
      o = t.__weh || (t.__weh = (...i) => {
        Ft();
        const a = yr(n), l = dt(t, n, e, i);
        return a(), Ut(), l;
      });
    return r ? s.unshift(o) : s.push(o), o;
  }
}
const Ct = (e) => (t, n = ke) => {
    (!ss || e === "sp") && ts(e, (...r) => t(...r), n);
  },
  ou = Ct("bm"),
  iu = Ct("m"),
  au = Ct("bu"),
  lu = Ct("u"),
  cu = Ct("bum"),
  za = Ct("um"),
  uu = Ct("sp"),
  fu = Ct("rtg"),
  du = Ct("rtc");
function hu(e, t = ke) {
  ts("ec", e, t);
}
const pu = "components";
function mu(e, t) {
  return yu(pu, e, !0, t) || e;
}
const gu = Symbol.for("v-ndc");
function yu(e, t, n = !0, r = !1) {
  const s = je || ke;
  if (s) {
    const o = s.type;
    {
      const a = rf(o, !1);
      if (a && (a === t || a === qe(t) || a === Jr(qe(t)))) return o;
    }
    const i = Go(s[e] || o[e], t) || Go(s.appContext[e], t);
    return !i && r ? o : i;
  }
}
function Go(e, t) {
  return e && (e[t] || e[qe(t)] || e[Jr(qe(t))]);
}
function vu(e, t, n = {}, r, s) {
  if (je.ce || je.parent && gn(je.parent) && je.parent.ce) {
    return jt(), Zr(Be, null, [we("slot", n, r)], 64);
  }
  let o = e[t];
  o && o._c && (o._d = !1), jt();
  const i = o && Fa(o(n)),
    a = Zr(
      Be,
      { key: (n.key || i && i.key || `_${t}`) + (!i && r ? "_fb" : "") },
      i || [],
      i && e._ === 1 ? 64 : -2,
    );
  return a.scopeId && (a.slotScopeIds = [a.scopeId + "-s"]),
    o && o._c && (o._d = !0),
    a;
}
function Fa(e) {
  return e.some((t) =>
      Qn(t) ? !(t.type === Jt || t.type === Be && !Fa(t.children)) : !0
    )
    ? e
    : null;
}
const $s = (e) => e ? ul(e) ? Eo(e) : $s(e.parent) : null,
  Dn = Se(Object.create(null), {
    $: (e) => e,
    $el: (e) => e.vnode.el,
    $data: (e) => e.data,
    $props: (e) => e.props,
    $attrs: (e) => e.attrs,
    $slots: (e) => e.slots,
    $refs: (e) => e.refs,
    $parent: (e) => $s(e.parent),
    $root: (e) => $s(e.root),
    $host: (e) => e.ce,
    $emit: (e) => e.emit,
    $options: (e) => So(e),
    $forceUpdate: (e) =>
      e.f || (e.f = () => {
        xo(e.update);
      }),
    $nextTick: (e) => e.n || (e.n = Ma.bind(e.proxy)),
    $watch: (e) => Du.bind(e),
  }),
  gs = (e, t) => e !== fe && !e.__isScriptSetup && se(e, t),
  bu = {
    get({ _: e }, t) {
      if (t === "__v_skip") return !0;
      const {
        ctx: n,
        setupState: r,
        data: s,
        props: o,
        accessCache: i,
        type: a,
        appContext: l,
      } = e;
      let c;
      if (t[0] !== "$") {
        const m = i[t];
        if (m !== void 0) {
          switch (m) {
            case 1:
              return r[t];
            case 2:
              return s[t];
            case 4:
              return n[t];
            case 3:
              return o[t];
          }
        } else {
          if (gs(r, t)) return i[t] = 1, r[t];
          if (s !== fe && se(s, t)) return i[t] = 2, s[t];
          if ((c = e.propsOptions[0]) && se(c, t)) return i[t] = 3, o[t];
          if (n !== fe && se(n, t)) return i[t] = 4, n[t];
          Ls && (i[t] = 0);
        }
      }
      const u = Dn[t];
      let f, p;
      if (u) return t === "$attrs" && Te(e.attrs, "get", ""), u(e);
      if ((f = a.__cssModules) && (f = f[t])) return f;
      if (n !== fe && se(n, t)) return i[t] = 4, n[t];
      if (p = l.config.globalProperties, se(p, t)) return p[t];
    },
    set({ _: e }, t, n) {
      const { data: r, setupState: s, ctx: o } = e;
      return gs(s, t)
        ? (s[t] = n, !0)
        : r !== fe && se(r, t)
        ? (r[t] = n, !0)
        : se(e.props, t) || t[0] === "$" && t.slice(1) in e
        ? !1
        : (o[t] = n, !0);
    },
    has(
      {
        _: {
          data: e,
          setupState: t,
          accessCache: n,
          ctx: r,
          appContext: s,
          propsOptions: o,
        },
      },
      i,
    ) {
      let a;
      return !!n[i] || e !== fe && se(e, i) || gs(t, i) ||
        (a = o[0]) && se(a, i) || se(r, i) || se(Dn, i) ||
        se(s.config.globalProperties, i);
    },
    defineProperty(e, t, n) {
      return n.get != null
        ? e._.accessCache[t] = 0
        : se(n, "value") && this.set(e, t, n.value, null),
        Reflect.defineProperty(e, t, n);
    },
  };
function Ko(e) {
  return W(e) ? e.reduce((t, n) => (t[n] = null, t), {}) : e;
}
let Ls = !0;
function _u(e) {
  const t = So(e), n = e.proxy, r = e.ctx;
  Ls = !1, t.beforeCreate && qo(t.beforeCreate, e, "bc");
  const {
    data: s,
    computed: o,
    methods: i,
    watch: a,
    provide: l,
    inject: c,
    created: u,
    beforeMount: f,
    mounted: p,
    beforeUpdate: m,
    updated: k,
    activated: _,
    deactivated: b,
    beforeDestroy: I,
    beforeUnmount: O,
    destroyed: $,
    unmounted: T,
    render: Y,
    renderTracked: B,
    renderTriggered: J,
    errorCaptured: be,
    serverPrefetch: xe,
    expose: ye,
    inheritAttrs: Ge,
    components: ne,
    directives: Ze,
    filters: ot,
  } = t;
  if (c && xu(c, r, null), i) {
    for (const re in i) {
      const X = i[re];
      G(X) && (r[re] = X.bind(n));
    }
  }
  if (s) {
    const re = s.call(n, n);
    ge(re) && (e.data = mr(re));
  }
  if (Ls = !0, o) {
    for (const re in o) {
      const X = o[re],
        Oe = G(X) ? X.bind(n, n) : G(X.get) ? X.get.bind(n, n) : ut,
        Qe = !G(X) && G(X.set) ? X.set.bind(n) : ut,
        ve = Ye({ get: Oe, set: Qe });
      Object.defineProperty(r, re, {
        enumerable: !0,
        configurable: !0,
        get: () => ve.value,
        set: (Le) => ve.value = Le,
      });
    }
  }
  if (a) { for (const re in a) Ua(a[re], r, n, re); }
  if (l) {
    const re = G(l) ? l.call(n) : l;
    Reflect.ownKeys(re).forEach((X) => {
      Rr(X, re[X]);
    });
  }
  u && qo(u, e, "c");
  function he(re, X) {
    W(X) ? X.forEach((Oe) => re(Oe.bind(n))) : X && re(X.bind(n));
  }
  if (
    he(ou, f),
      he(iu, p),
      he(au, m),
      he(lu, k),
      he(nu, _),
      he(ru, b),
      he(hu, be),
      he(du, B),
      he(fu, J),
      he(cu, O),
      he(za, T),
      he(uu, xe),
      W(ye)
  ) {
    if (ye.length) {
      const re = e.exposed || (e.exposed = {});
      ye.forEach((X) => {
        Object.defineProperty(re, X, {
          get: () => n[X],
          set: (Oe) => n[X] = Oe,
        });
      });
    } else e.exposed || (e.exposed = {});
  }
  Y && e.render === ut && (e.render = Y),
    Ge != null && (e.inheritAttrs = Ge),
    ne && (e.components = ne),
    Ze && (e.directives = Ze),
    xe && Za(e);
}
function xu(e, t, n = ut) {
  W(e) && (e = Zs(e));
  for (const r in e) {
    const s = e[r];
    let o;
    ge(s)
      ? "default" in s
        ? o = wt(s.from || r, s.default, !0)
        : o = wt(s.from || r)
      : o = wt(s),
      Ee(o)
        ? Object.defineProperty(t, r, {
          enumerable: !0,
          configurable: !0,
          get: () => o.value,
          set: (i) => o.value = i,
        })
        : t[r] = o;
  }
}
function qo(e, t, n) {
  dt(W(e) ? e.map((r) => r.bind(t.proxy)) : e.bind(t.proxy), t, n);
}
function Ua(e, t, n, r) {
  let s = r.includes(".") ? rl(n, r) : () => n[r];
  if (_e(e)) {
    const o = t[e];
    G(o) && Vn(s, o);
  } else if (G(e)) Vn(s, e.bind(n));
  else if (ge(e)) {
    if (W(e)) e.forEach((o) => Ua(o, t, n, r));
    else {
      const o = G(e.handler) ? e.handler.bind(n) : t[e.handler];
      G(o) && Vn(s, o, e);
    }
  }
}
function So(e) {
  const t = e.type,
    { mixins: n, extends: r } = t,
    { mixins: s, optionsCache: o, config: { optionMergeStrategies: i } } =
      e.appContext,
    a = o.get(t);
  let l;
  return a
    ? l = a
    : !s.length && !n && !r
    ? l = t
    : (l = {}, s.length && s.forEach((c) => Lr(l, c, i, !0)), Lr(l, t, i)),
    ge(t) && o.set(t, l),
    l;
}
function Lr(e, t, n, r = !1) {
  const { mixins: s, extends: o } = t;
  o && Lr(e, o, n, !0), s && s.forEach((i) => Lr(e, i, n, !0));
  for (const i in t) {
    if (!(r && i === "expose")) {
      const a = wu[i] || n && n[i];
      e[i] = a ? a(e[i], t[i]) : t[i];
    }
  }
  return e;
}
const wu = {
  data: Qo,
  props: Jo,
  emits: Jo,
  methods: Mn,
  computed: Mn,
  beforeCreate: Ie,
  created: Ie,
  beforeMount: Ie,
  mounted: Ie,
  beforeUpdate: Ie,
  updated: Ie,
  beforeDestroy: Ie,
  beforeUnmount: Ie,
  destroyed: Ie,
  unmounted: Ie,
  activated: Ie,
  deactivated: Ie,
  errorCaptured: Ie,
  serverPrefetch: Ie,
  components: Mn,
  directives: Mn,
  watch: Cu,
  provide: Qo,
  inject: Su,
};
function Qo(e, t) {
  return t
    ? e
      ? function () {
        return Se(G(e) ? e.call(this, this) : e, G(t) ? t.call(this, this) : t);
      }
      : t
    : e;
}
function Su(e, t) {
  return Mn(Zs(e), Zs(t));
}
function Zs(e) {
  if (W(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++) t[e[n]] = e[n];
    return t;
  }
  return e;
}
function Ie(e, t) {
  return e ? [...new Set([].concat(e, t))] : t;
}
function Mn(e, t) {
  return e ? Se(Object.create(null), e, t) : t;
}
function Jo(e, t) {
  return e
    ? W(e) && W(t)
      ? [...new Set([...e, ...t])]
      : Se(Object.create(null), Ko(e), Ko(t ?? {}))
    : t;
}
function Cu(e, t) {
  if (!e) return t;
  if (!t) return e;
  const n = Se(Object.create(null), e);
  for (const r in t) n[r] = Ie(e[r], t[r]);
  return n;
}
function Ba() {
  return {
    app: null,
    config: {
      isNativeTag: lc,
      performance: !1,
      globalProperties: {},
      optionMergeStrategies: {},
      errorHandler: void 0,
      warnHandler: void 0,
      compilerOptions: {},
    },
    mixins: [],
    components: {},
    directives: {},
    provides: Object.create(null),
    optionsCache: new WeakMap(),
    propsCache: new WeakMap(),
    emitsCache: new WeakMap(),
  };
}
let ku = 0;
function Eu(e, t) {
  return function (r, s = null) {
    G(r) || (r = Se({}, r)), s != null && !ge(s) && (s = null);
    const o = Ba(), i = new WeakSet(), a = [];
    let l = !1;
    const c = o.app = {
      _uid: ku++,
      _component: r,
      _props: s,
      _container: null,
      _context: o,
      _instance: null,
      version: of,
      get config() {
        return o.config;
      },
      set config(u) {},
      use(u, ...f) {
        return i.has(u) ||
          (u && G(u.install)
            ? (i.add(u), u.install(c, ...f))
            : G(u) && (i.add(u), u(c, ...f))),
          c;
      },
      mixin(u) {
        return o.mixins.includes(u) || o.mixins.push(u), c;
      },
      component(u, f) {
        return f ? (o.components[u] = f, c) : o.components[u];
      },
      directive(u, f) {
        return f ? (o.directives[u] = f, c) : o.directives[u];
      },
      mount(u, f, p) {
        if (!l) {
          const m = c._ceVNode || we(r, s);
          return m.appContext = o,
            p === !0 ? p = "svg" : p === !1 && (p = void 0),
            f && t ? t(m, u) : e(m, u, p),
            l = !0,
            c._container = u,
            u.__vue_app__ = c,
            Eo(m.component);
        }
      },
      onUnmount(u) {
        a.push(u);
      },
      unmount() {
        l &&
          (dt(a, c._instance, 16),
            e(null, c._container),
            delete c._container.__vue_app__);
      },
      provide(u, f) {
        return o.provides[u] = f, c;
      },
      runWithContext(u) {
        const f = yn;
        yn = c;
        try {
          return u();
        } finally {
          yn = f;
        }
      },
    };
    return c;
  };
}
let yn = null;
function Rr(e, t) {
  if (ke) {
    let n = ke.provides;
    const r = ke.parent && ke.parent.provides;
    r === n && (n = ke.provides = Object.create(r)), n[e] = t;
  }
}
function wt(e, t, n = !1) {
  const r = ke || je;
  if (r || yn) {
    const s = yn
      ? yn._context.provides
      : r
      ? r.parent == null
        ? r.vnode.appContext && r.vnode.appContext.provides
        : r.parent.provides
      : void 0;
    if (s && e in s) return s[e];
    if (arguments.length > 1) return n && G(t) ? t.call(r && r.proxy) : t;
  }
}
const Ha = {},
  Wa = () => Object.create(Ha),
  Ga = (e) => Object.getPrototypeOf(e) === Ha;
function Tu(e, t, n, r = !1) {
  const s = {}, o = Wa();
  e.propsDefaults = Object.create(null), Ka(e, t, s, o);
  for (const i in e.propsOptions[0]) i in s || (s[i] = void 0);
  n ? e.props = r ? s : Ra(s) : e.type.props ? e.props = s : e.props = o,
    e.attrs = o;
}
function Ru(e, t, n, r) {
  const { props: s, attrs: o, vnode: { patchFlag: i } } = e,
    a = oe(s),
    [l] = e.propsOptions;
  let c = !1;
  if ((r || i > 0) && !(i & 16)) {
    if (i & 8) {
      const u = e.vnode.dynamicProps;
      for (let f = 0; f < u.length; f++) {
        let p = u[f];
        if (ns(e.emitsOptions, p)) continue;
        const m = t[p];
        if (l) {
          if (se(o, p)) m !== o[p] && (o[p] = m, c = !0);
          else {
            const k = qe(p);
            s[k] = Ds(l, a, k, m, e, !1);
          }
        } else m !== o[p] && (o[p] = m, c = !0);
      }
    }
  } else {
    Ka(e, t, s, o) && (c = !0);
    let u;
    for (const f in a) {
      (!t || !se(t, f) && ((u = nn(f)) === f || !se(t, u))) &&
        (l
          ? n && (n[f] !== void 0 || n[u] !== void 0) &&
            (s[f] = Ds(l, a, f, void 0, e, !0))
          : delete s[f]);
    }
    if (o !== a) {
      for (const f in o) (!t || !se(t, f)) && (delete o[f], c = !0);
    }
  }
  c && xt(e.attrs, "set", "");
}
function Ka(e, t, n, r) {
  const [s, o] = e.propsOptions;
  let i = !1, a;
  if (t) {
    for (let l in t) {
      if ($n(l)) continue;
      const c = t[l];
      let u;
      s && se(s, u = qe(l))
        ? !o || !o.includes(u) ? n[u] = c : (a || (a = {}))[u] = c
        : ns(e.emitsOptions, l) ||
          (!(l in r) || c !== r[l]) && (r[l] = c, i = !0);
    }
  }
  if (o) {
    const l = oe(n), c = a || fe;
    for (let u = 0; u < o.length; u++) {
      const f = o[u];
      n[f] = Ds(s, l, f, c[f], e, !se(c, f));
    }
  }
  return i;
}
function Ds(e, t, n, r, s, o) {
  const i = e[n];
  if (i != null) {
    const a = se(i, "default");
    if (a && r === void 0) {
      const l = i.default;
      if (i.type !== Function && !i.skipFactory && G(l)) {
        const { propsDefaults: c } = s;
        if (n in c) r = c[n];
        else {
          const u = yr(s);
          r = c[n] = l.call(null, t), u();
        }
      } else r = l;
      s.ce && s.ce._setProp(n, r);
    }
    i[0] && (o && !a ? r = !1 : i[1] && (r === "" || r === nn(n)) && (r = !0));
  }
  return r;
}
const Ou = new WeakMap();
function qa(e, t, n = !1) {
  const r = n ? Ou : t.propsCache, s = r.get(e);
  if (s) return s;
  const o = e.props, i = {}, a = [];
  let l = !1;
  if (!G(e)) {
    const u = (f) => {
      l = !0;
      const [p, m] = qa(f, t, !0);
      Se(i, p), m && a.push(...m);
    };
    !n && t.mixins.length && t.mixins.forEach(u),
      e.extends && u(e.extends),
      e.mixins && e.mixins.forEach(u);
  }
  if (!o && !l) return ge(e) && r.set(e, hn), hn;
  if (W(o)) {
    for (let u = 0; u < o.length; u++) {
      const f = qe(o[u]);
      Yo(f) && (i[f] = fe);
    }
  } else if (o) {
    for (const u in o) {
      const f = qe(u);
      if (Yo(f)) {
        const p = o[u],
          m = i[f] = W(p) || G(p) ? { type: p } : Se({}, p),
          k = m.type;
        let _ = !1, b = !0;
        if (W(k)) {
          for (let I = 0; I < k.length; ++I) {
            const O = k[I], $ = G(O) && O.name;
            if ($ === "Boolean") {
              _ = !0;
              break;
            } else $ === "String" && (b = !1);
          }
        } else _ = G(k) && k.name === "Boolean";
        m[0] = _, m[1] = b, (_ || se(m, "default")) && a.push(f);
      }
    }
  }
  const c = [i, a];
  return ge(e) && r.set(e, c), c;
}
function Yo(e) {
  return e[0] !== "$" && !$n(e);
}
const Qa = (e) => e[0] === "_" || e === "$stable",
  Co = (e) => W(e) ? e.map(ct) : [ct(e)],
  Iu = (e, t, n) => {
    if (t._n) return t;
    const r = $r((...s) => Co(t(...s)), n);
    return r._c = !1, r;
  },
  Ja = (e, t, n) => {
    const r = e._ctx;
    for (const s in e) {
      if (Qa(s)) continue;
      const o = e[s];
      if (G(o)) t[s] = Iu(s, o, r);
      else if (o != null) {
        const i = Co(o);
        t[s] = () => i;
      }
    }
  },
  Ya = (e, t) => {
    const n = Co(t);
    e.slots.default = () => n;
  },
  Xa = (e, t, n) => {
    for (const r in t) (n || r !== "_") && (e[r] = t[r]);
  },
  Au = (e, t, n) => {
    const r = e.slots = Wa();
    if (e.vnode.shapeFlag & 32) {
      const s = t._;
      s ? (Xa(r, t, n), n && aa(r, "_", s, !0)) : Ja(t, r);
    } else t && Ya(e, t);
  },
  Pu = (e, t, n) => {
    const { vnode: r, slots: s } = e;
    let o = !0, i = fe;
    if (r.shapeFlag & 32) {
      const a = t._;
      a ? n && a === 1 ? o = !1 : Xa(s, t, n) : (o = !t.$stable, Ja(t, s)),
        i = t;
    } else t && (Ya(e, t), i = { default: 1 });
    if (o) { for (const a in s) !Qa(a) && i[a] == null && delete s[a]; }
  },
  Fe = Wu;
function Mu(e) {
  return Nu(e);
}
function Nu(e, t) {
  const n = la();
  n.__VUE__ = !0;
  const {
      insert: r,
      remove: s,
      patchProp: o,
      createElement: i,
      createText: a,
      createComment: l,
      setText: c,
      setElementText: u,
      parentNode: f,
      nextSibling: p,
      setScopeId: m = ut,
      insertStaticContent: k,
    } = e,
    _ = (
      d,
      h,
      g,
      x = null,
      y = null,
      w = null,
      A = void 0,
      R = null,
      E = !!h.dynamicChildren,
    ) => {
      if (d === h) return;
      d && !Rn(d, h) && (x = v(d), Le(d, y, w, !0), d = null),
        h.patchFlag === -2 && (E = !1, h.dynamicChildren = null);
      const { type: S, ref: z, shapeFlag: N } = h;
      switch (S) {
        case rs:
          b(d, h, g, x);
          break;
        case Jt:
          I(d, h, g, x);
          break;
        case bs:
          d == null && O(h, g, x, A);
          break;
        case Be:
          ne(d, h, g, x, y, w, A, R, E);
          break;
        default:
          N & 1
            ? Y(d, h, g, x, y, w, A, R, E)
            : N & 6
            ? Ze(d, h, g, x, y, w, A, R, E)
            : (N & 64 || N & 128) && S.process(d, h, g, x, y, w, A, R, E, Z);
      }
      z != null && y && js(z, d && d.ref, w, h || d, !h);
    },
    b = (d, h, g, x) => {
      if (d == null) r(h.el = a(h.children), g, x);
      else {
        const y = h.el = d.el;
        h.children !== d.children && c(y, h.children);
      }
    },
    I = (d, h, g, x) => {
      d == null ? r(h.el = l(h.children || ""), g, x) : h.el = d.el;
    },
    O = (d, h, g, x) => {
      [d.el, d.anchor] = k(d.children, h, g, x, d.el, d.anchor);
    },
    $ = ({ el: d, anchor: h }, g, x) => {
      let y;
      for (; d && d !== h;) y = p(d), r(d, g, x), d = y;
      r(h, g, x);
    },
    T = ({ el: d, anchor: h }) => {
      let g;
      for (; d && d !== h;) g = p(d), s(d), d = g;
      s(h);
    },
    Y = (d, h, g, x, y, w, A, R, E) => {
      h.type === "svg" ? A = "svg" : h.type === "math" && (A = "mathml"),
        d == null ? B(h, g, x, y, w, A, R, E) : xe(d, h, y, w, A, R, E);
    },
    B = (d, h, g, x, y, w, A, R) => {
      let E, S;
      const { props: z, shapeFlag: N, transition: V, dirs: H } = d;
      if (
        E = d.el = i(d.type, w, z && z.is, z),
          N & 8
            ? u(E, d.children)
            : N & 16 && be(d.children, E, null, x, y, ys(d, w), A, R),
          H && Bt(d, null, x, "created"),
          J(E, d, d.scopeId, A, x),
          z
      ) {
        for (const ce in z) {
          ce !== "value" && !$n(ce) && o(E, ce, null, z[ce], w, x);
        }
        "value" in z && o(E, "value", null, z.value, w),
          (S = z.onVnodeBeforeMount) && at(S, x, d);
      }
      H && Bt(d, null, x, "beforeMount");
      const ee = ju(y, V);
      ee && V.beforeEnter(E),
        r(E, h, g),
        ((S = z && z.onVnodeMounted) || ee || H) && Fe(() => {
          S && at(S, x, d), ee && V.enter(E), H && Bt(d, null, x, "mounted");
        }, y);
    },
    J = (d, h, g, x, y) => {
      if (g && m(d, g), x) { for (let w = 0; w < x.length; w++) m(d, x[w]); }
      if (y) {
        let w = y.subTree;
        if (
          h === w || ol(w.type) && (w.ssContent === h || w.ssFallback === h)
        ) {
          const A = y.vnode;
          J(d, A, A.scopeId, A.slotScopeIds, y.parent);
        }
      }
    },
    be = (d, h, g, x, y, w, A, R, E = 0) => {
      for (let S = E; S < d.length; S++) {
        const z = d[S] = R ? At(d[S]) : ct(d[S]);
        _(null, z, h, g, x, y, w, A, R);
      }
    },
    xe = (d, h, g, x, y, w, A) => {
      const R = h.el = d.el;
      let { patchFlag: E, dynamicChildren: S, dirs: z } = h;
      E |= d.patchFlag & 16;
      const N = d.props || fe, V = h.props || fe;
      let H;
      if (
        g && Ht(g, !1),
          (H = V.onVnodeBeforeUpdate) && at(H, g, h, d),
          z && Bt(h, d, g, "beforeUpdate"),
          g && Ht(g, !0),
          (N.innerHTML && V.innerHTML == null ||
            N.textContent && V.textContent == null) && u(R, ""),
          S
            ? ye(d.dynamicChildren, S, R, g, x, ys(h, y), w)
            : A || X(d, h, R, null, g, x, ys(h, y), w, !1),
          E > 0
      ) {
        if (E & 16) Ge(R, N, V, g, y);
        else if (
          E & 2 && N.class !== V.class && o(R, "class", null, V.class, y),
            E & 4 && o(R, "style", N.style, V.style, y),
            E & 8
        ) {
          const ee = h.dynamicProps;
          for (let ce = 0; ce < ee.length; ce++) {
            const ae = ee[ce], De = N[ae], Ce = V[ae];
            (Ce !== De || ae === "value") && o(R, ae, De, Ce, y, g);
          }
        }
        E & 1 && d.children !== h.children && u(R, h.children);
      } else !A && S == null && Ge(R, N, V, g, y);
      ((H = V.onVnodeUpdated) || z) && Fe(() => {
        H && at(H, g, h, d), z && Bt(h, d, g, "updated");
      }, x);
    },
    ye = (d, h, g, x, y, w, A) => {
      for (let R = 0; R < h.length; R++) {
        const E = d[R],
          S = h[R],
          z = E.el && (E.type === Be || !Rn(E, S) || E.shapeFlag & 70)
            ? f(E.el)
            : g;
        _(E, S, z, null, x, y, w, A, !0);
      }
    },
    Ge = (d, h, g, x, y) => {
      if (h !== g) {
        if (h !== fe) {
          for (const w in h) !$n(w) && !(w in g) && o(d, w, h[w], null, y, x);
        }
        for (const w in g) {
          if ($n(w)) continue;
          const A = g[w], R = h[w];
          A !== R && w !== "value" && o(d, w, R, A, y, x);
        }
        "value" in g && o(d, "value", h.value, g.value, y);
      }
    },
    ne = (d, h, g, x, y, w, A, R, E) => {
      const S = h.el = d ? d.el : a(""), z = h.anchor = d ? d.anchor : a("");
      let { patchFlag: N, dynamicChildren: V, slotScopeIds: H } = h;
      H && (R = R ? R.concat(H) : H),
        d == null
          ? (r(S, g, x), r(z, g, x), be(h.children || [], g, z, y, w, A, R, E))
          : N > 0 && N & 64 && V && d.dynamicChildren
          ? (ye(d.dynamicChildren, V, g, y, w, A, R),
            (h.key != null || y && h === y.subTree) && el(d, h, !0))
          : X(d, h, g, z, y, w, A, R, E);
    },
    Ze = (d, h, g, x, y, w, A, R, E) => {
      h.slotScopeIds = R,
        d == null
          ? h.shapeFlag & 512
            ? y.ctx.activate(h, g, x, A, E)
            : ot(h, g, x, y, w, A, E)
          : mt(d, h, E);
    },
    ot = (d, h, g, x, y, w, A) => {
      const R = d.component = Yu(d, x, y);
      if (Da(d) && (R.ctx.renderer = Z), Xu(R, !1, A), R.asyncDep) {
        if (y && y.registerDep(R, he, A), !d.el) {
          const E = R.subTree = we(Jt);
          I(null, E, h, g);
        }
      } else he(R, d, h, g, y, w, A);
    },
    mt = (d, h, g) => {
      const x = h.component = d.component;
      if (Bu(d, h, g)) {
        if (x.asyncDep && !x.asyncResolved) {
          re(x, h, g);
          return;
        } else x.next = h, x.update();
      } else h.el = d.el, x.vnode = h;
    },
    he = (d, h, g, x, y, w, A) => {
      const R = () => {
        if (d.isMounted) {
          let { next: N, bu: V, u: H, parent: ee, vnode: ce } = d;
          {
            const Ve = tl(d);
            if (Ve) {
              N && (N.el = ce.el, re(d, N, A)),
                Ve.asyncDep.then(() => {
                  d.isUnmounted || R();
                });
              return;
            }
          }
          let ae = N, De;
          Ht(d, !1),
            N ? (N.el = ce.el, re(d, N, A)) : N = ce,
            V && fs(V),
            (De = N.props && N.props.onVnodeBeforeUpdate) && at(De, ee, N, ce),
            Ht(d, !0);
          const Ce = vs(d), Je = d.subTree;
          d.subTree = Ce,
            _(Je, Ce, f(Je.el), v(Je), d, y, w),
            N.el = Ce.el,
            ae === null && Hu(d, Ce.el),
            H && Fe(H, y),
            (De = N.props && N.props.onVnodeUpdated) &&
            Fe(() => at(De, ee, N, ce), y);
        } else {
          let N;
          const { el: V, props: H } = h,
            { bm: ee, m: ce, parent: ae, root: De, type: Ce } = d,
            Je = gn(h);
          if (
            Ht(d, !1),
              ee && fs(ee),
              !Je && (N = H && H.onVnodeBeforeMount) && at(N, ae, h),
              Ht(d, !0),
              V && pe
          ) {
            const Ve = () => {
              d.subTree = vs(d), pe(V, d.subTree, d, y, null);
            };
            Je && Ce.__asyncHydrate ? Ce.__asyncHydrate(V, d, Ve) : Ve();
          } else {
            De.ce && De.ce._injectChildStyle(Ce);
            const Ve = d.subTree = vs(d);
            _(null, Ve, g, x, d, y, w), h.el = Ve.el;
          }
          if (ce && Fe(ce, y), !Je && (N = H && H.onVnodeMounted)) {
            const Ve = h;
            Fe(() => at(N, ae, Ve), y);
          }
          (h.shapeFlag & 256 ||
            ae && gn(ae.vnode) && ae.vnode.shapeFlag & 256) &&
          d.a && Fe(d.a, y),
            d.isMounted = !0,
            h = g = x = null;
        }
      };
      d.scope.on();
      const E = d.effect = new pa(R);
      d.scope.off();
      const S = d.update = E.run.bind(E), z = d.job = E.runIfDirty.bind(E);
      z.i = d, z.id = d.uid, E.scheduler = () => xo(z), Ht(d, !0), S();
    },
    re = (d, h, g) => {
      h.component = d;
      const x = d.vnode.props;
      d.vnode = h,
        d.next = null,
        Ru(d, h.props, x, g),
        Pu(d, h.children, g),
        Ft(),
        Wo(d),
        Ut();
    },
    X = (d, h, g, x, y, w, A, R, E = !1) => {
      const S = d && d.children,
        z = d ? d.shapeFlag : 0,
        N = h.children,
        { patchFlag: V, shapeFlag: H } = h;
      if (V > 0) {
        if (V & 128) {
          Qe(S, N, g, x, y, w, A, R, E);
          return;
        } else if (V & 256) {
          Oe(S, N, g, x, y, w, A, R, E);
          return;
        }
      }
      H & 8
        ? (z & 16 && Ke(S, y, w), N !== S && u(g, N))
        : z & 16
        ? H & 16 ? Qe(S, N, g, x, y, w, A, R, E) : Ke(S, y, w, !0)
        : (z & 8 && u(g, ""), H & 16 && be(N, g, x, y, w, A, R, E));
    },
    Oe = (d, h, g, x, y, w, A, R, E) => {
      d = d || hn, h = h || hn;
      const S = d.length, z = h.length, N = Math.min(S, z);
      let V;
      for (V = 0; V < N; V++) {
        const H = h[V] = E ? At(h[V]) : ct(h[V]);
        _(d[V], H, g, null, y, w, A, R, E);
      }
      S > z ? Ke(d, y, w, !0, !1, N) : be(h, g, x, y, w, A, R, E, N);
    },
    Qe = (d, h, g, x, y, w, A, R, E) => {
      let S = 0;
      const z = h.length;
      let N = d.length - 1, V = z - 1;
      for (; S <= N && S <= V;) {
        const H = d[S], ee = h[S] = E ? At(h[S]) : ct(h[S]);
        if (Rn(H, ee)) _(H, ee, g, null, y, w, A, R, E);
        else break;
        S++;
      }
      for (; S <= N && S <= V;) {
        const H = d[N], ee = h[V] = E ? At(h[V]) : ct(h[V]);
        if (Rn(H, ee)) _(H, ee, g, null, y, w, A, R, E);
        else break;
        N--, V--;
      }
      if (S > N) {
        if (S <= V) {
          const H = V + 1, ee = H < z ? h[H].el : x;
          for (
            ;
            S <= V;
          ) {
            _(null, h[S] = E ? At(h[S]) : ct(h[S]), g, ee, y, w, A, R, E), S++;
          }
        }
      } else if (S > V) { for (; S <= N;) Le(d[S], y, w, !0), S++; }
      else {
        const H = S, ee = S, ce = new Map();
        for (S = ee; S <= V; S++) {
          const ze = h[S] = E ? At(h[S]) : ct(h[S]);
          ze.key != null && ce.set(ze.key, S);
        }
        let ae, De = 0;
        const Ce = V - ee + 1;
        let Je = !1, Ve = 0;
        const En = new Array(Ce);
        for (S = 0; S < Ce; S++) En[S] = 0;
        for (S = H; S <= N; S++) {
          const ze = d[S];
          if (De >= Ce) {
            Le(ze, y, w, !0);
            continue;
          }
          let it;
          if (ze.key != null) it = ce.get(ze.key);
          else {for (ae = ee; ae <= V; ae++) {
              if (En[ae - ee] === 0 && Rn(ze, h[ae])) {
                it = ae;
                break;
              }
            }}
          it === void 0
            ? Le(ze, y, w, !0)
            : (En[it - ee] = S + 1,
              it >= Ve ? Ve = it : Je = !0,
              _(ze, h[it], g, null, y, w, A, R, E),
              De++);
        }
        const Lo = Je ? $u(En) : hn;
        for (ae = Lo.length - 1, S = Ce - 1; S >= 0; S--) {
          const ze = ee + S, it = h[ze], Zo = ze + 1 < z ? h[ze + 1].el : x;
          En[S] === 0
            ? _(null, it, g, Zo, y, w, A, R, E)
            : Je && (ae < 0 || S !== Lo[ae] ? ve(it, g, Zo, 2) : ae--);
        }
      }
    },
    ve = (d, h, g, x, y = null) => {
      const { el: w, type: A, transition: R, children: E, shapeFlag: S } = d;
      if (S & 6) {
        ve(d.component.subTree, h, g, x);
        return;
      }
      if (S & 128) {
        d.suspense.move(h, g, x);
        return;
      }
      if (S & 64) {
        A.move(d, h, g, Z);
        return;
      }
      if (A === Be) {
        r(w, h, g);
        for (let N = 0; N < E.length; N++) ve(E[N], h, g, x);
        r(d.anchor, h, g);
        return;
      }
      if (A === bs) {
        $(d, h, g);
        return;
      }
      if (x !== 2 && S & 1 && R) {
        if (x === 0) {
          R.beforeEnter(w), r(w, h, g), Fe(() => R.enter(w), y);
        } else {
          const { leave: N, delayLeave: V, afterLeave: H } = R,
            ee = () => r(w, h, g),
            ce = () => {
              N(w, () => {
                ee(), H && H();
              });
            };
          V ? V(w, ee, ce) : ce();
        }
      } else r(w, h, g);
    },
    Le = (d, h, g, x = !1, y = !1) => {
      const {
        type: w,
        props: A,
        ref: R,
        children: E,
        dynamicChildren: S,
        shapeFlag: z,
        patchFlag: N,
        dirs: V,
        cacheIndex: H,
      } = d;
      if (
        N === -2 && (y = !1),
          R != null && js(R, null, g, d, !0),
          H != null && (h.renderCache[H] = void 0),
          z & 256
      ) {
        h.ctx.deactivate(d);
        return;
      }
      const ee = z & 1 && V, ce = !gn(d);
      let ae;
      if (ce && (ae = A && A.onVnodeBeforeUnmount) && at(ae, h, d), z & 6) {
        br(d.component, g, x);
      } else {
        if (z & 128) {
          d.suspense.unmount(g, x);
          return;
        }
        ee && Bt(d, null, h, "beforeUnmount"),
          z & 64
            ? d.type.remove(d, h, g, Z, x)
            : S && !S.hasOnce && (w !== Be || N > 0 && N & 64)
            ? Ke(S, h, g, !1, !0)
            : (w === Be && N & 384 || !y && z & 16) && Ke(E, h, g),
          x && sn(d);
      }
      (ce && (ae = A && A.onVnodeUnmounted) || ee) && Fe(() => {
        ae && at(ae, h, d), ee && Bt(d, null, h, "unmounted");
      }, g);
    },
    sn = (d) => {
      const { type: h, el: g, anchor: x, transition: y } = d;
      if (h === Be) {
        on(g, x);
        return;
      }
      if (h === bs) {
        T(d);
        return;
      }
      const w = () => {
        s(g), y && !y.persisted && y.afterLeave && y.afterLeave();
      };
      if (d.shapeFlag & 1 && y && !y.persisted) {
        const { leave: A, delayLeave: R } = y, E = () => A(g, w);
        R ? R(d.el, w, E) : E();
      } else w();
    },
    on = (d, h) => {
      let g;
      for (; d !== h;) g = p(d), s(d), d = g;
      s(h);
    },
    br = (d, h, g) => {
      const { bum: x, scope: y, job: w, subTree: A, um: R, m: E, a: S } = d;
      Xo(E),
        Xo(S),
        x && fs(x),
        y.stop(),
        w && (w.flags |= 8, Le(A, d, h, g)),
        R && Fe(R, h),
        Fe(() => {
          d.isUnmounted = !0;
        }, h),
        h && h.pendingBranch && !h.isUnmounted && d.asyncDep &&
        !d.asyncResolved && d.suspenseId === h.pendingId &&
        (h.deps--, h.deps === 0 && h.resolve());
    },
    Ke = (d, h, g, x = !1, y = !1, w = 0) => {
      for (let A = w; A < d.length; A++) Le(d[A], h, g, x, y);
    },
    v = (d) => {
      if (d.shapeFlag & 6) return v(d.component.subTree);
      if (d.shapeFlag & 128) return d.suspense.next();
      const h = p(d.anchor || d.el), g = h && h[eu];
      return g ? p(g) : h;
    };
  let L = !1;
  const P = (d, h, g) => {
      d == null
        ? h._vnode && Le(h._vnode, null, null, !0)
        : _(h._vnode || null, d, h, null, null, null, g),
        h._vnode = d,
        L || (L = !0, Wo(), ja(), L = !1);
    },
    Z = {
      p: _,
      um: Le,
      m: ve,
      r: sn,
      mt: ot,
      mc: be,
      pc: X,
      pbc: ye,
      n: v,
      o: e,
    };
  let ie, pe;
  return { render: P, hydrate: ie, createApp: Eu(P, ie) };
}
function ys({ type: e, props: t }, n) {
  return n === "svg" && e === "foreignObject" ||
      n === "mathml" && e === "annotation-xml" && t && t.encoding &&
        t.encoding.includes("html")
    ? void 0
    : n;
}
function Ht({ effect: e, job: t }, n) {
  n ? (e.flags |= 32, t.flags |= 4) : (e.flags &= -33, t.flags &= -5);
}
function ju(e, t) {
  return (!e || e && !e.pendingBranch) && t && !t.persisted;
}
function el(e, t, n = !1) {
  const r = e.children, s = t.children;
  if (W(r) && W(s)) {
    for (let o = 0; o < r.length; o++) {
      const i = r[o];
      let a = s[o];
      a.shapeFlag & 1 && !a.dynamicChildren &&
      ((a.patchFlag <= 0 || a.patchFlag === 32) &&
        (a = s[o] = At(s[o]), a.el = i.el),
        !n && a.patchFlag !== -2 && el(i, a)), a.type === rs && (a.el = i.el);
    }
  }
}
function $u(e) {
  const t = e.slice(), n = [0];
  let r, s, o, i, a;
  const l = e.length;
  for (r = 0; r < l; r++) {
    const c = e[r];
    if (c !== 0) {
      if (s = n[n.length - 1], e[s] < c) {
        t[r] = s, n.push(r);
        continue;
      }
      for (o = 0, i = n.length - 1; o < i;) {
        a = o + i >> 1, e[n[a]] < c ? o = a + 1 : i = a;
      }
      c < e[n[o]] && (o > 0 && (t[r] = n[o - 1]), n[o] = r);
    }
  }
  for (o = n.length, i = n[o - 1]; o-- > 0;) n[o] = i, i = t[i];
  return n;
}
function tl(e) {
  const t = e.subTree.component;
  if (t) return t.asyncDep && !t.asyncResolved ? t : tl(t);
}
function Xo(e) {
  if (e) { for (let t = 0; t < e.length; t++) e[t].flags |= 8; }
}
const Lu = Symbol.for("v-scx"), Zu = () => wt(Lu);
function Vn(e, t, n) {
  return nl(e, t, n);
}
function nl(e, t, n = fe) {
  const { immediate: r, deep: s, flush: o, once: i } = n, a = Se({}, n);
  let l;
  if (ss) {
    if (o === "sync") {
      const p = Zu();
      l = p.__watcherHandles || (p.__watcherHandles = []);
    } else if (!t || r) a.once = !0;
    else {
      const p = () => {};
      return p.stop = ut, p.resume = ut, p.pause = ut, p;
    }
  }
  const c = ke;
  a.call = (p, m, k) => dt(p, c, m, k);
  let u = !1;
  o === "post"
    ? a.scheduler = (p) => {
      Fe(p, c && c.suspense);
    }
    : o !== "sync" && (u = !0,
      a.scheduler = (p, m) => {
        m ? p() : xo(p);
      }),
    a.augmentJob = (p) => {
      t && (p.flags |= 4), u && (p.flags |= 2, c && (p.id = c.uid, p.i = c));
    };
  const f = Qc(e, t, a);
  return l && l.push(f), f;
}
function Du(e, t, n) {
  const r = this.proxy,
    s = _e(e) ? e.includes(".") ? rl(r, e) : () => r[e] : e.bind(r, r);
  let o;
  G(t) ? o = t : (o = t.handler, n = t);
  const i = yr(this), a = nl(s, o.bind(r), n);
  return i(), a;
}
function rl(e, t) {
  const n = t.split(".");
  return () => {
    let r = e;
    for (let s = 0; s < n.length && r; s++) r = r[n[s]];
    return r;
  };
}
const Vu = (e, t) =>
  t === "modelValue" || t === "model-value"
    ? e.modelModifiers
    : e[`${t}Modifiers`] || e[`${qe(t)}Modifiers`] || e[`${nn(t)}Modifiers`];
function zu(e, t, ...n) {
  if (e.isUnmounted) return;
  const r = e.vnode.props || fe;
  let s = n;
  const o = t.startsWith("update:"), i = o && Vu(r, t.slice(7));
  i &&
    (i.trim && (s = n.map((u) => _e(u) ? u.trim() : u)),
      i.number && (s = n.map(hc)));
  let a, l = r[a = us(t)] || r[a = us(qe(t))];
  !l && o && (l = r[a = us(nn(t))]), l && dt(l, e, 6, s);
  const c = r[a + "Once"];
  if (c) {
    if (!e.emitted) e.emitted = {};
    else if (e.emitted[a]) return;
    e.emitted[a] = !0, dt(c, e, 6, s);
  }
}
function sl(e, t, n = !1) {
  const r = t.emitsCache, s = r.get(e);
  if (s !== void 0) return s;
  const o = e.emits;
  let i = {}, a = !1;
  if (!G(e)) {
    const l = (c) => {
      const u = sl(c, t, !0);
      u && (a = !0, Se(i, u));
    };
    !n && t.mixins.length && t.mixins.forEach(l),
      e.extends && l(e.extends),
      e.mixins && e.mixins.forEach(l);
  }
  return !o && !a
    ? (ge(e) && r.set(e, null), null)
    : (W(o) ? o.forEach((l) => i[l] = null) : Se(i, o),
      ge(e) && r.set(e, i),
      i);
}
function ns(e, t) {
  return !e || !Kr(t)
    ? !1
    : (t = t.slice(2).replace(/Once$/, ""),
      se(e, t[0].toLowerCase() + t.slice(1)) || se(e, nn(t)) || se(e, t));
}
function vs(e) {
  const {
      type: t,
      vnode: n,
      proxy: r,
      withProxy: s,
      propsOptions: [o],
      slots: i,
      attrs: a,
      emit: l,
      render: c,
      renderCache: u,
      props: f,
      data: p,
      setupState: m,
      ctx: k,
      inheritAttrs: _,
    } = e,
    b = jr(e);
  let I, O;
  try {
    if (n.shapeFlag & 4) {
      const T = s || r, Y = T;
      I = ct(c.call(Y, T, u, f, m, p, k)), O = a;
    } else {
      const T = t;
      I = ct(T.length > 1 ? T(f, { attrs: a, slots: i, emit: l }) : T(f, null)),
        O = t.props ? a : Fu(a);
    }
  } catch (T) {
    zn.length = 0, es(T, e, 1), I = we(Jt);
  }
  let $ = I;
  if (O && _ !== !1) {
    const T = Object.keys(O), { shapeFlag: Y } = $;
    T.length && Y & 7 &&
      (o && T.some(oo) && (O = Uu(O, o)), $ = Yt($, O, !1, !0));
  }
  return n.dirs &&
    ($ = Yt($, null, !1, !0), $.dirs = $.dirs ? $.dirs.concat(n.dirs) : n.dirs),
    n.transition && wo($, n.transition),
    I = $,
    jr(b),
    I;
}
const Fu = (e) => {
    let t;
    for (const n in e) {
      (n === "class" || n === "style" || Kr(n)) && ((t || (t = {}))[n] = e[n]);
    }
    return t;
  },
  Uu = (e, t) => {
    const n = {};
    for (const r in e) (!oo(r) || !(r.slice(9) in t)) && (n[r] = e[r]);
    return n;
  };
function Bu(e, t, n) {
  const { props: r, children: s, component: o } = e,
    { props: i, children: a, patchFlag: l } = t,
    c = o.emitsOptions;
  if (t.dirs || t.transition) return !0;
  if (n && l >= 0) {
    if (l & 1024) return !0;
    if (l & 16) return r ? ei(r, i, c) : !!i;
    if (l & 8) {
      const u = t.dynamicProps;
      for (let f = 0; f < u.length; f++) {
        const p = u[f];
        if (i[p] !== r[p] && !ns(c, p)) return !0;
      }
    }
  } else {return (s || a) && (!a || !a.$stable)
      ? !0
      : r === i
      ? !1
      : r
      ? i ? ei(r, i, c) : !0
      : !!i;}
  return !1;
}
function ei(e, t, n) {
  const r = Object.keys(t);
  if (r.length !== Object.keys(e).length) return !0;
  for (let s = 0; s < r.length; s++) {
    const o = r[s];
    if (t[o] !== e[o] && !ns(n, o)) return !0;
  }
  return !1;
}
function Hu({ vnode: e, parent: t }, n) {
  for (; t;) {
    const r = t.subTree;
    if (r.suspense && r.suspense.activeBranch === e && (r.el = e.el), r === e) {
      (e = t.vnode).el = n, t = t.parent;
    } else break;
  }
}
const ol = (e) => e.__isSuspense;
function Wu(e, t) {
  t && t.pendingBranch
    ? W(e) ? t.effects.push(...e) : t.effects.push(e)
    : Xc(e);
}
const Be = Symbol.for("v-fgt"),
  rs = Symbol.for("v-txt"),
  Jt = Symbol.for("v-cmt"),
  bs = Symbol.for("v-stc"),
  zn = [];
let He = null;
function jt(e = !1) {
  zn.push(He = e ? null : []);
}
function Gu() {
  zn.pop(), He = zn[zn.length - 1] || null;
}
let qn = 1;
function ti(e) {
  qn += e, e < 0 && He && (He.hasOnce = !0);
}
function il(e) {
  return e.dynamicChildren = qn > 0 ? He || hn : null,
    Gu(),
    qn > 0 && He && He.push(e),
    e;
}
function Er(e, t, n, r, s, o) {
  return il(It(e, t, n, r, s, o, !0));
}
function Zr(e, t, n, r, s) {
  return il(we(e, t, n, r, s, !0));
}
function Qn(e) {
  return e ? e.__v_isVNode === !0 : !1;
}
function Rn(e, t) {
  return e.type === t.type && e.key === t.key;
}
const al = ({ key: e }) => e ?? null,
  Or = (
    { ref: e, ref_key: t, ref_for: n },
  ) => (typeof e == "number" && (e = "" + e),
    e != null
      ? _e(e) || Ee(e) || G(e) ? { i: je, r: e, k: t, f: !!n } : e
      : null);
function It(
  e,
  t = null,
  n = null,
  r = 0,
  s = null,
  o = e === Be ? 0 : 1,
  i = !1,
  a = !1,
) {
  const l = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e,
    props: t,
    key: t && al(t),
    ref: t && Or(t),
    scopeId: La,
    slotScopeIds: null,
    children: n,
    component: null,
    suspense: null,
    ssContent: null,
    ssFallback: null,
    dirs: null,
    transition: null,
    el: null,
    anchor: null,
    target: null,
    targetStart: null,
    targetAnchor: null,
    staticCount: 0,
    shapeFlag: o,
    patchFlag: r,
    dynamicProps: s,
    dynamicChildren: null,
    appContext: null,
    ctx: je,
  };
  return a
    ? (ko(l, n), o & 128 && e.normalize(l))
    : n && (l.shapeFlag |= _e(n) ? 8 : 16),
    qn > 0 && !i && He && (l.patchFlag > 0 || o & 6) && l.patchFlag !== 32 &&
    He.push(l),
    l;
}
const we = Ku;
function Ku(e, t = null, n = null, r = 0, s = null, o = !1) {
  if ((!e || e === gu) && (e = Jt), Qn(e)) {
    const a = Yt(e, t, !0);
    return n && ko(a, n),
      qn > 0 && !o && He &&
      (a.shapeFlag & 6 ? He[He.indexOf(e)] = a : He.push(a)),
      a.patchFlag = -2,
      a;
  }
  if (sf(e) && (e = e.__vccOpts), t) {
    t = qu(t);
    let { class: a, style: l } = t;
    a && !_e(a) && (t.class = Yr(a)),
      ge(l) && (vo(l) && !W(l) && (l = Se({}, l)), t.style = lo(l));
  }
  const i = _e(e) ? 1 : ol(e) ? 128 : tu(e) ? 64 : ge(e) ? 4 : G(e) ? 2 : 0;
  return It(e, t, n, r, s, i, o, !0);
}
function qu(e) {
  return e ? vo(e) || Ga(e) ? Se({}, e) : e : null;
}
function Yt(e, t, n = !1, r = !1) {
  const { props: s, ref: o, patchFlag: i, children: a, transition: l } = e,
    c = t ? cl(s || {}, t) : s,
    u = {
      __v_isVNode: !0,
      __v_skip: !0,
      type: e.type,
      props: c,
      key: c && al(c),
      ref: t && t.ref
        ? n && o ? W(o) ? o.concat(Or(t)) : [o, Or(t)] : Or(t)
        : o,
      scopeId: e.scopeId,
      slotScopeIds: e.slotScopeIds,
      children: a,
      target: e.target,
      targetStart: e.targetStart,
      targetAnchor: e.targetAnchor,
      staticCount: e.staticCount,
      shapeFlag: e.shapeFlag,
      patchFlag: t && e.type !== Be ? i === -1 ? 16 : i | 16 : i,
      dynamicProps: e.dynamicProps,
      dynamicChildren: e.dynamicChildren,
      appContext: e.appContext,
      dirs: e.dirs,
      transition: l,
      component: e.component,
      suspense: e.suspense,
      ssContent: e.ssContent && Yt(e.ssContent),
      ssFallback: e.ssFallback && Yt(e.ssFallback),
      el: e.el,
      anchor: e.anchor,
      ctx: e.ctx,
      ce: e.ce,
    };
  return l && r && wo(u, l.clone(u)), u;
}
function ll(e = " ", t = 0) {
  return we(rs, null, e, t);
}
function ct(e) {
  return e == null || typeof e == "boolean"
    ? we(Jt)
    : W(e)
    ? we(Be, null, e.slice())
    : Qn(e)
    ? At(e)
    : we(rs, null, String(e));
}
function At(e) {
  return e.el === null && e.patchFlag !== -1 || e.memo ? e : Yt(e);
}
function ko(e, t) {
  let n = 0;
  const { shapeFlag: r } = e;
  if (t == null) t = null;
  else if (W(t)) n = 16;
  else if (typeof t == "object") {
    if (r & 65) {
      const s = t.default;
      s && (s._c && (s._d = !1), ko(e, s()), s._c && (s._d = !0));
      return;
    } else {
      n = 32;
      const s = t._;
      !s && !Ga(t) ? t._ctx = je : s === 3 && je &&
        (je.slots._ === 1 ? t._ = 1 : (t._ = 2, e.patchFlag |= 1024));
    }
  } else {G(t)
      ? (t = { default: t, _ctx: je }, n = 32)
      : (t = String(t), r & 64 ? (n = 16, t = [ll(t)]) : n = 8);}
  e.children = t, e.shapeFlag |= n;
}
function cl(...e) {
  const t = {};
  for (let n = 0; n < e.length; n++) {
    const r = e[n];
    for (const s in r) {
      if (s === "class") {
        t.class !== r.class && (t.class = Yr([t.class, r.class]));
      } else if (s === "style") t.style = lo([t.style, r.style]);
      else if (Kr(s)) {
        const o = t[s], i = r[s];
        i && o !== i && !(W(o) && o.includes(i)) &&
          (t[s] = o ? [].concat(o, i) : i);
      } else s !== "" && (t[s] = r[s]);
    }
  }
  return t;
}
function at(e, t, n, r = null) {
  dt(e, t, 7, [n, r]);
}
const Qu = Ba();
let Ju = 0;
function Yu(e, t, n) {
  const r = e.type,
    s = (t ? t.appContext : e.appContext) || Qu,
    o = {
      uid: Ju++,
      vnode: e,
      type: r,
      parent: t,
      appContext: s,
      root: null,
      next: null,
      subTree: null,
      effect: null,
      update: null,
      job: null,
      scope: new ha(!0),
      render: null,
      proxy: null,
      exposed: null,
      exposeProxy: null,
      withProxy: null,
      provides: t ? t.provides : Object.create(s.provides),
      ids: t ? t.ids : ["", 0, 0],
      accessCache: null,
      renderCache: [],
      components: null,
      directives: null,
      propsOptions: qa(r, s),
      emitsOptions: sl(r, s),
      emit: null,
      emitted: null,
      propsDefaults: fe,
      inheritAttrs: r.inheritAttrs,
      ctx: fe,
      data: fe,
      props: fe,
      attrs: fe,
      slots: fe,
      refs: fe,
      setupState: fe,
      setupContext: null,
      suspense: n,
      suspenseId: n ? n.pendingId : 0,
      asyncDep: null,
      asyncResolved: !1,
      isMounted: !1,
      isUnmounted: !1,
      isDeactivated: !1,
      bc: null,
      c: null,
      bm: null,
      m: null,
      bu: null,
      u: null,
      um: null,
      bum: null,
      da: null,
      a: null,
      rtg: null,
      rtc: null,
      ec: null,
      sp: null,
    };
  return o.ctx = { _: o },
    o.root = t ? t.root : o,
    o.emit = zu.bind(null, o),
    e.ce && e.ce(o),
    o;
}
let ke = null, Dr, Vs;
{
  const e = la(),
    t = (n, r) => {
      let s;
      return (s = e[n]) || (s = e[n] = []), s.push(r), (o) => {
        s.length > 1 ? s.forEach((i) => i(o)) : s[0](o);
      };
    };
  Dr = t("__VUE_INSTANCE_SETTERS__", (n) => ke = n),
    Vs = t("__VUE_SSR_SETTERS__", (n) => ss = n);
}
const yr = (e) => {
    const t = ke;
    return Dr(e), e.scope.on(), () => {
      e.scope.off(), Dr(t);
    };
  },
  ni = () => {
    ke && ke.scope.off(), Dr(null);
  };
function ul(e) {
  return e.vnode.shapeFlag & 4;
}
let ss = !1;
function Xu(e, t = !1, n = !1) {
  t && Vs(t);
  const { props: r, children: s } = e.vnode, o = ul(e);
  Tu(e, r, o, t), Au(e, s, n);
  const i = o ? ef(e, t) : void 0;
  return t && Vs(!1), i;
}
function ef(e, t) {
  const n = e.type;
  e.accessCache = Object.create(null), e.proxy = new Proxy(e.ctx, bu);
  const { setup: r } = n;
  if (r) {
    const s = e.setupContext = r.length > 1 ? nf(e) : null, o = yr(e);
    Ft();
    const i = gr(r, e, 0, [e.props, s]);
    if (Ut(), o(), sa(i)) {
      if (gn(e) || Za(e), i.then(ni, ni), t) {
        return i.then((a) => {
          ri(e, a, t);
        }).catch((a) => {
          es(a, e, 0);
        });
      }
      e.asyncDep = i;
    } else ri(e, i, t);
  } else fl(e, t);
}
function ri(e, t, n) {
  G(t)
    ? e.type.__ssrInlineRender ? e.ssrRender = t : e.render = t
    : ge(t) && (e.setupState = Aa(t)), fl(e, n);
}
let si;
function fl(e, t, n) {
  const r = e.type;
  if (!e.render) {
    if (!t && si && !r.render) {
      const s = r.template || So(e).template;
      if (s) {
        const { isCustomElement: o, compilerOptions: i } = e.appContext.config,
          { delimiters: a, compilerOptions: l } = r,
          c = Se(Se({ isCustomElement: o, delimiters: a }, i), l);
        r.render = si(s, c);
      }
    }
    e.render = r.render || ut;
  }
  {
    const s = yr(e);
    Ft();
    try {
      _u(e);
    } finally {
      Ut(), s();
    }
  }
}
const tf = {
  get(e, t) {
    return Te(e, "get", ""), e[t];
  },
};
function nf(e) {
  const t = (n) => {
    e.exposed = n || {};
  };
  return {
    attrs: new Proxy(e.attrs, tf),
    slots: e.slots,
    emit: e.emit,
    expose: t,
  };
}
function Eo(e) {
  return e.exposed
    ? e.exposeProxy ||
      (e.exposeProxy = new Proxy(Aa(Uc(e.exposed)), {
        get(t, n) {
          if (n in t) return t[n];
          if (n in Dn) return Dn[n](e);
        },
        has(t, n) {
          return n in t || n in Dn;
        },
      }))
    : e.proxy;
}
function rf(e, t = !0) {
  return G(e) ? e.displayName || e.name : e.name || t && e.__name;
}
function sf(e) {
  return G(e) && "__vccOpts" in e;
}
const Ye = (e, t) => Kc(e, t, ss);
function Kt(e, t, n) {
  const r = arguments.length;
  return r === 2
    ? ge(t) && !W(t) ? Qn(t) ? we(e, null, [t]) : we(e, t) : we(e, null, t)
    : (r > 3
      ? n = Array.prototype.slice.call(arguments, 2)
      : r === 3 && Qn(n) && (n = [n]),
      we(e, t, n));
}
const of = "3.5.10"; /**
 * @vue/runtime-dom v3.5.10
 * (c) 2018-present Yuxi (Evan) You and Vue contributors
 * @license MIT
 */

let zs;
const oi = typeof window < "u" && window.trustedTypes;
if (oi) {
  try {
    zs = oi.createPolicy("vue", { createHTML: (e) => e });
  } catch {}
}
const dl = zs ? (e) => zs.createHTML(e) : (e) => e,
  af = "http://www.w3.org/2000/svg",
  lf = "http://www.w3.org/1998/Math/MathML",
  _t = typeof document < "u" ? document : null,
  ii = _t && _t.createElement("template"),
  cf = {
    insert: (e, t, n) => {
      t.insertBefore(e, n || null);
    },
    remove: (e) => {
      const t = e.parentNode;
      t && t.removeChild(e);
    },
    createElement: (e, t, n, r) => {
      const s = t === "svg"
        ? _t.createElementNS(af, e)
        : t === "mathml"
        ? _t.createElementNS(lf, e)
        : n
        ? _t.createElement(e, { is: n })
        : _t.createElement(e);
      return e === "select" && r && r.multiple != null &&
        s.setAttribute("multiple", r.multiple),
        s;
    },
    createText: (e) => _t.createTextNode(e),
    createComment: (e) => _t.createComment(e),
    setText: (e, t) => {
      e.nodeValue = t;
    },
    setElementText: (e, t) => {
      e.textContent = t;
    },
    parentNode: (e) => e.parentNode,
    nextSibling: (e) => e.nextSibling,
    querySelector: (e) => _t.querySelector(e),
    setScopeId(e, t) {
      e.setAttribute(t, "");
    },
    insertStaticContent(e, t, n, r, s, o) {
      const i = n ? n.previousSibling : t.lastChild;
      if (s && (s === o || s.nextSibling)) {
        for (
          ;
          t.insertBefore(s.cloneNode(!0), n),
            !(s === o || !(s = s.nextSibling));
        );
      } else {
        ii.innerHTML = dl(
          r === "svg"
            ? `<svg>${e}</svg>`
            : r === "mathml"
            ? `<math>${e}</math>`
            : e,
        );
        const a = ii.content;
        if (r === "svg" || r === "mathml") {
          const l = a.firstChild;
          for (; l.firstChild;) a.appendChild(l.firstChild);
          a.removeChild(l);
        }
        t.insertBefore(a, n);
      }
      return [
        i ? i.nextSibling : t.firstChild,
        n ? n.previousSibling : t.lastChild,
      ];
    },
  },
  uf = Symbol("_vtc");
function ff(e, t, n) {
  const r = e[uf];
  r && (t = (t ? [t, ...r] : [...r]).join(" ")),
    t == null
      ? e.removeAttribute("class")
      : n
      ? e.setAttribute("class", t)
      : e.className = t;
}
const ai = Symbol("_vod"),
  df = Symbol("_vsh"),
  hf = Symbol(""),
  pf = /(^|;)\s*display\s*:/;
function mf(e, t, n) {
  const r = e.style, s = _e(n);
  let o = !1;
  if (n && !s) {
    if (t) {
      if (_e(t)) {
        for (const i of t.split(";")) {
          const a = i.slice(0, i.indexOf(":")).trim();
          n[a] == null && Ir(r, a, "");
        }
      } else for (const i in t) n[i] == null && Ir(r, i, "");
    }
    for (const i in n) i === "display" && (o = !0), Ir(r, i, n[i]);
  } else if (s) {
    if (t !== n) {
      const i = r[hf];
      i && (n += ";" + i), r.cssText = n, o = pf.test(n);
    }
  } else t && e.removeAttribute("style");
  ai in e && (e[ai] = o ? r.display : "", e[df] && (r.display = "none"));
}
const li = /\s*!important$/;
function Ir(e, t, n) {
  if (W(n)) n.forEach((r) => Ir(e, t, r));
  else if (n == null && (n = ""), t.startsWith("--")) e.setProperty(t, n);
  else {
    const r = gf(e, t);
    li.test(n)
      ? e.setProperty(nn(r), n.replace(li, ""), "important")
      : e[r] = n;
  }
}
const ci = ["Webkit", "Moz", "ms"], _s = {};
function gf(e, t) {
  const n = _s[t];
  if (n) return n;
  let r = qe(t);
  if (r !== "filter" && r in e) return _s[t] = r;
  r = Jr(r);
  for (let s = 0; s < ci.length; s++) {
    const o = ci[s] + r;
    if (o in e) return _s[t] = o;
  }
  return t;
}
const ui = "http://www.w3.org/1999/xlink";
function fi(e, t, n, r, s, o = bc(t)) {
  r && t.startsWith("xlink:")
    ? n == null
      ? e.removeAttributeNS(ui, t.slice(6, t.length))
      : e.setAttributeNS(ui, t, n)
    : n == null || o && !ca(n)
    ? e.removeAttribute(t)
    : e.setAttribute(t, o ? "" : zt(n) ? String(n) : n);
}
function di(e, t, n, r) {
  if (t === "innerHTML" || t === "textContent") {
    n != null && (e[t] = t === "innerHTML" ? dl(n) : n);
    return;
  }
  const s = e.tagName;
  if (t === "value" && s !== "PROGRESS" && !s.includes("-")) {
    const i = s === "OPTION" ? e.getAttribute("value") || "" : e.value,
      a = n == null ? e.type === "checkbox" ? "on" : "" : String(n);
    (i !== a || !("_value" in e)) && (e.value = a),
      n == null && e.removeAttribute(t),
      e._value = n;
    return;
  }
  let o = !1;
  if (n === "" || n == null) {
    const i = typeof e[t];
    i === "boolean"
      ? n = ca(n)
      : n == null && i === "string"
      ? (n = "", o = !0)
      : i === "number" && (n = 0, o = !0);
  }
  try {
    e[t] = n;
  } catch {}
  o && e.removeAttribute(t);
}
function yf(e, t, n, r) {
  e.addEventListener(t, n, r);
}
function vf(e, t, n, r) {
  e.removeEventListener(t, n, r);
}
const hi = Symbol("_vei");
function bf(e, t, n, r, s = null) {
  const o = e[hi] || (e[hi] = {}), i = o[t];
  if (r && i) i.value = r;
  else {
    const [a, l] = _f(t);
    if (r) {
      const c = o[t] = Sf(r, s);
      yf(e, a, c, l);
    } else i && (vf(e, a, i, l), o[t] = void 0);
  }
}
const pi = /(?:Once|Passive|Capture)$/;
function _f(e) {
  let t;
  if (pi.test(e)) {
    t = {};
    let r;
    for (; r = e.match(pi);) {
      e = e.slice(0, e.length - r[0].length), t[r[0].toLowerCase()] = !0;
    }
  }
  return [e[2] === ":" ? e.slice(3) : nn(e.slice(2)), t];
}
let xs = 0;
const xf = Promise.resolve(),
  wf = () => xs || (xf.then(() => xs = 0), xs = Date.now());
function Sf(e, t) {
  const n = (r) => {
    if (!r._vts) r._vts = Date.now();
    else if (r._vts <= n.attached) return;
    dt(Cf(r, n.value), t, 5, [r]);
  };
  return n.value = e, n.attached = wf(), n;
}
function Cf(e, t) {
  if (W(t)) {
    const n = e.stopImmediatePropagation;
    return e.stopImmediatePropagation = () => {
      n.call(e), e._stopped = !0;
    },
      t.map((r) => (s) => !s._stopped && r && r(s));
  } else return t;
}
const mi = (e) =>
    e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 &&
    e.charCodeAt(2) > 96 && e.charCodeAt(2) < 123,
  kf = (e, t, n, r, s, o) => {
    const i = s === "svg";
    t === "class"
      ? ff(e, r, i)
      : t === "style"
      ? mf(e, n, r)
      : Kr(t)
      ? oo(t) || bf(e, t, n, r, o)
      : (t[0] === "."
          ? (t = t.slice(1), !0)
          : t[0] === "^"
          ? (t = t.slice(1), !1)
          : Ef(e, t, r, i))
      ? (di(e, t, r),
        !e.tagName.includes("-") &&
        (t === "value" || t === "checked" || t === "selected") &&
        fi(e, t, r, i, o, t !== "value"))
      : e._isVueCE && (/[A-Z]/.test(t) || !_e(r))
      ? di(e, qe(t), r)
      : (t === "true-value"
        ? e._trueValue = r
        : t === "false-value" && (e._falseValue = r),
        fi(e, t, r, i));
  };
function Ef(e, t, n, r) {
  if (r) {
    return !!(t === "innerHTML" || t === "textContent" ||
      t in e && mi(t) && G(n));
  }
  if (
    t === "spellcheck" || t === "draggable" || t === "translate" ||
    t === "form" || t === "list" && e.tagName === "INPUT" ||
    t === "type" && e.tagName === "TEXTAREA"
  ) return !1;
  if (t === "width" || t === "height") {
    const s = e.tagName;
    if (s === "IMG" || s === "VIDEO" || s === "CANVAS" || s === "SOURCE") {
      return !1;
    }
  }
  return mi(t) && _e(n) ? !1 : t in e;
}
const Tf = Se({ patchProp: kf }, cf);
let gi;
function Rf() {
  return gi || (gi = Mu(Tf));
}
const Of = (...e) => {
  const t = Rf().createApp(...e), { mount: n } = t;
  return t.mount = (r) => {
    const s = Af(r);
    if (!s) return;
    const o = t._component;
    !G(o) && !o.render && !o.template && (o.template = s.innerHTML),
      s.nodeType === 1 && (s.textContent = "");
    const i = n(s, !1, If(s));
    return s instanceof Element &&
      (s.removeAttribute("v-cloak"), s.setAttribute("data-v-app", "")),
      i;
  },
    t;
};
function If(e) {
  if (e instanceof SVGElement) return "svg";
  if (typeof MathMLElement == "function" && e instanceof MathMLElement) {
    return "mathml";
  }
}
function Af(e) {
  return _e(e) ? document.querySelector(e) : e;
}
const Pf = (e, t) => {
    const n = e.__vccOpts || e;
    for (const [r, s] of t) n[r] = s;
    return n;
  },
  Mf = {};
function Nf(e, t) {
  const n = mu("router-view");
  return jt(), Zr(n);
}
const jf = Pf(Mf, [["render", Nf]]); /*!
  * vue-router v4.4.5
  * (c) 2024 Eduardo San Martin Morote
  * @license MIT
  */

const cn = typeof document < "u";
function hl(e) {
  return typeof e == "object" || "displayName" in e || "props" in e ||
    "__vccOpts" in e;
}
function $f(e) {
  return e.__esModule || e[Symbol.toStringTag] === "Module" ||
    e.default && hl(e.default);
}
const le = Object.assign;
function ws(e, t) {
  const n = {};
  for (const r in t) {
    const s = t[r];
    n[r] = rt(s) ? s.map(e) : e(s);
  }
  return n;
}
const Fn = () => {},
  rt = Array.isArray,
  pl = /#/g,
  Lf = /&/g,
  Zf = /\//g,
  Df = /=/g,
  Vf = /\?/g,
  ml = /\+/g,
  zf = /%5B/g,
  Ff = /%5D/g,
  gl = /%5E/g,
  Uf = /%60/g,
  yl = /%7B/g,
  Bf = /%7C/g,
  vl = /%7D/g,
  Hf = /%20/g;
function To(e) {
  return encodeURI("" + e).replace(Bf, "|").replace(zf, "[").replace(Ff, "]");
}
function Wf(e) {
  return To(e).replace(yl, "{").replace(vl, "}").replace(gl, "^");
}
function Fs(e) {
  return To(e).replace(ml, "%2B").replace(Hf, "+").replace(pl, "%23").replace(
    Lf,
    "%26",
  ).replace(Uf, "`").replace(yl, "{").replace(vl, "}").replace(gl, "^");
}
function Gf(e) {
  return Fs(e).replace(Df, "%3D");
}
function Kf(e) {
  return To(e).replace(pl, "%23").replace(Vf, "%3F");
}
function qf(e) {
  return e == null ? "" : Kf(e).replace(Zf, "%2F");
}
function Jn(e) {
  try {
    return decodeURIComponent("" + e);
  } catch {}
  return "" + e;
}
const Qf = /\/$/, Jf = (e) => e.replace(Qf, "");
function Ss(e, t, n = "/") {
  let r, s = {}, o = "", i = "";
  const a = t.indexOf("#");
  let l = t.indexOf("?");
  return a < l && a >= 0 && (l = -1),
    l > -1 &&
    (r = t.slice(0, l), o = t.slice(l + 1, a > -1 ? a : t.length), s = e(o)),
    a > -1 && (r = r || t.slice(0, a), i = t.slice(a, t.length)),
    r = td(r ?? t, n),
    { fullPath: r + (o && "?") + o + i, path: r, query: s, hash: Jn(i) };
}
function Yf(e, t) {
  const n = t.query ? e(t.query) : "";
  return t.path + (n && "?") + n + (t.hash || "");
}
function yi(e, t) {
  return !t || !e.toLowerCase().startsWith(t.toLowerCase())
    ? e
    : e.slice(t.length) || "/";
}
function Xf(e, t, n) {
  const r = t.matched.length - 1, s = n.matched.length - 1;
  return r > -1 && r === s && _n(t.matched[r], n.matched[s]) &&
    bl(t.params, n.params) && e(t.query) === e(n.query) && t.hash === n.hash;
}
function _n(e, t) {
  return (e.aliasOf || e) === (t.aliasOf || t);
}
function bl(e, t) {
  if (Object.keys(e).length !== Object.keys(t).length) return !1;
  for (const n in e) if (!ed(e[n], t[n])) return !1;
  return !0;
}
function ed(e, t) {
  return rt(e) ? vi(e, t) : rt(t) ? vi(t, e) : e === t;
}
function vi(e, t) {
  return rt(t)
    ? e.length === t.length && e.every((n, r) => n === t[r])
    : e.length === 1 && e[0] === t;
}
function td(e, t) {
  if (e.startsWith("/")) return e;
  if (!e) return t;
  const n = t.split("/"), r = e.split("/"), s = r[r.length - 1];
  (s === ".." || s === ".") && r.push("");
  let o = n.length - 1, i, a;
  for (i = 0; i < r.length; i++) {
    if (a = r[i], a !== ".") {
      if (a === "..") o > 1 && o--;
      else break;
    }
  }
  return n.slice(0, o).join("/") + "/" + r.slice(i).join("/");
}
const Et = {
  path: "/",
  name: void 0,
  params: {},
  query: {},
  hash: "",
  fullPath: "/",
  matched: [],
  meta: {},
  redirectedFrom: void 0,
};
var Yn;
(function (e) {
  e.pop = "pop", e.push = "push";
})(Yn || (Yn = {}));
var Un;
(function (e) {
  e.back = "back", e.forward = "forward", e.unknown = "";
})(Un || (Un = {}));
function nd(e) {
  if (!e) {
    if (cn) {
      const t = document.querySelector("base");
      e = t && t.getAttribute("href") || "/",
        e = e.replace(/^\w+:\/\/[^\/]+/, "");
    } else e = "/";
  }
  return e[0] !== "/" && e[0] !== "#" && (e = "/" + e), Jf(e);
}
const rd = /^[^#]+#/;
function sd(e, t) {
  return e.replace(rd, "#") + t;
}
function od(e, t) {
  const n = document.documentElement.getBoundingClientRect(),
    r = e.getBoundingClientRect();
  return {
    behavior: t.behavior,
    left: r.left - n.left - (t.left || 0),
    top: r.top - n.top - (t.top || 0),
  };
}
const os = () => ({ left: window.scrollX, top: window.scrollY });
function id(e) {
  let t;
  if ("el" in e) {
    const n = e.el,
      r = typeof n == "string" && n.startsWith("#"),
      s = typeof n == "string"
        ? r ? document.getElementById(n.slice(1)) : document.querySelector(n)
        : n;
    if (!s) return;
    t = od(s, e);
  } else t = e;
  "scrollBehavior" in document.documentElement.style
    ? window.scrollTo(t)
    : window.scrollTo(
      t.left != null ? t.left : window.scrollX,
      t.top != null ? t.top : window.scrollY,
    );
}
function bi(e, t) {
  return (history.state ? history.state.position - t : -1) + e;
}
const Us = new Map();
function ad(e, t) {
  Us.set(e, t);
}
function ld(e) {
  const t = Us.get(e);
  return Us.delete(e), t;
}
let cd = () => location.protocol + "//" + location.host;
function _l(e, t) {
  const { pathname: n, search: r, hash: s } = t, o = e.indexOf("#");
  if (o > -1) {
    let a = s.includes(e.slice(o)) ? e.slice(o).length : 1, l = s.slice(a);
    return l[0] !== "/" && (l = "/" + l), yi(l, "");
  }
  return yi(n, e) + r + s;
}
function ud(e, t, n, r) {
  let s = [], o = [], i = null;
  const a = ({ state: p }) => {
    const m = _l(e, location), k = n.value, _ = t.value;
    let b = 0;
    if (p) {
      if (n.value = m, t.value = p, i && i === k) {
        i = null;
        return;
      }
      b = _ ? p.position - _.position : 0;
    } else r(m);
    s.forEach((I) => {
      I(n.value, k, {
        delta: b,
        type: Yn.pop,
        direction: b ? b > 0 ? Un.forward : Un.back : Un.unknown,
      });
    });
  };
  function l() {
    i = n.value;
  }
  function c(p) {
    s.push(p);
    const m = () => {
      const k = s.indexOf(p);
      k > -1 && s.splice(k, 1);
    };
    return o.push(m), m;
  }
  function u() {
    const { history: p } = window;
    p.state && p.replaceState(le({}, p.state, { scroll: os() }), "");
  }
  function f() {
    for (const p of o) p();
    o = [],
      window.removeEventListener("popstate", a),
      window.removeEventListener("beforeunload", u);
  }
  return window.addEventListener("popstate", a),
    window.addEventListener("beforeunload", u, { passive: !0 }),
    { pauseListeners: l, listen: c, destroy: f };
}
function _i(e, t, n, r = !1, s = !1) {
  return {
    back: e,
    current: t,
    forward: n,
    replaced: r,
    position: window.history.length,
    scroll: s ? os() : null,
  };
}
function fd(e) {
  const { history: t, location: n } = window,
    r = { value: _l(e, n) },
    s = { value: t.state };
  s.value ||
    o(r.value, {
      back: null,
      current: r.value,
      forward: null,
      position: t.length - 1,
      replaced: !0,
      scroll: null,
    }, !0);
  function o(l, c, u) {
    const f = e.indexOf("#"),
      p = f > -1
        ? (n.host && document.querySelector("base") ? e : e.slice(f)) + l
        : cd() + e + l;
    try {
      t[u ? "replaceState" : "pushState"](c, "", p), s.value = c;
    } catch (m) {
      console.error(m), n[u ? "replace" : "assign"](p);
    }
  }
  function i(l, c) {
    const u = le({}, t.state, _i(s.value.back, l, s.value.forward, !0), c, {
      position: s.value.position,
    });
    o(l, u, !0), r.value = l;
  }
  function a(l, c) {
    const u = le({}, s.value, t.state, { forward: l, scroll: os() });
    o(u.current, u, !0);
    const f = le({}, _i(r.value, l, null), { position: u.position + 1 }, c);
    o(l, f, !1), r.value = l;
  }
  return { location: r, state: s, push: a, replace: i };
}
function dd(e) {
  e = nd(e);
  const t = fd(e), n = ud(e, t.state, t.location, t.replace);
  function r(o, i = !0) {
    i || n.pauseListeners(), history.go(o);
  }
  const s = le(
    { location: "", base: e, go: r, createHref: sd.bind(null, e) },
    t,
    n,
  );
  return Object.defineProperty(s, "location", {
    enumerable: !0,
    get: () => t.location.value,
  }),
    Object.defineProperty(s, "state", {
      enumerable: !0,
      get: () => t.state.value,
    }),
    s;
}
function hd(e) {
  return typeof e == "string" || e && typeof e == "object";
}
function xl(e) {
  return typeof e == "string" || typeof e == "symbol";
}
const wl = Symbol("");
var xi;
(function (e) {
  e[e.aborted = 4] = "aborted",
    e[e.cancelled = 8] = "cancelled",
    e[e.duplicated = 16] = "duplicated";
})(xi || (xi = {}));
function xn(e, t) {
  return le(new Error(), { type: e, [wl]: !0 }, t);
}
function yt(e, t) {
  return e instanceof Error && wl in e && (t == null || !!(e.type & t));
}
const wi = "[^/]+?",
  pd = { sensitive: !1, strict: !1, start: !0, end: !0 },
  md = /[.+*?^${}()[\]/\\]/g;
function gd(e, t) {
  const n = le({}, pd, t), r = [];
  let s = n.start ? "^" : "";
  const o = [];
  for (const c of e) {
    const u = c.length ? [] : [90];
    n.strict && !c.length && (s += "/");
    for (let f = 0; f < c.length; f++) {
      const p = c[f];
      let m = 40 + (n.sensitive ? .25 : 0);
      if (p.type === 0) {
        f || (s += "/"), s += p.value.replace(md, "\\$&"), m += 40;
      } else if (p.type === 1) {
        const { value: k, repeatable: _, optional: b, regexp: I } = p;
        o.push({ name: k, repeatable: _, optional: b });
        const O = I || wi;
        if (O !== wi) {
          m += 10;
          try {
            new RegExp(`(${O})`);
          } catch (T) {
            throw new Error(
              `Invalid custom RegExp for param "${k}" (${O}): ` + T.message,
            );
          }
        }
        let $ = _ ? `((?:${O})(?:/(?:${O}))*)` : `(${O})`;
        f || ($ = b && c.length < 2 ? `(?:/${$})` : "/" + $),
          b && ($ += "?"),
          s += $,
          m += 20,
          b && (m += -8),
          _ && (m += -20),
          O === ".*" && (m += -50);
      }
      u.push(m);
    }
    r.push(u);
  }
  if (n.strict && n.end) {
    const c = r.length - 1;
    r[c][r[c].length - 1] += .7000000000000001;
  }
  n.strict || (s += "/?"), n.end ? s += "$" : n.strict && (s += "(?:/|$)");
  const i = new RegExp(s, n.sensitive ? "" : "i");
  function a(c) {
    const u = c.match(i), f = {};
    if (!u) return null;
    for (let p = 1; p < u.length; p++) {
      const m = u[p] || "", k = o[p - 1];
      f[k.name] = m && k.repeatable ? m.split("/") : m;
    }
    return f;
  }
  function l(c) {
    let u = "", f = !1;
    for (const p of e) {
      (!f || !u.endsWith("/")) && (u += "/"), f = !1;
      for (const m of p) {
        if (m.type === 0) u += m.value;
        else if (m.type === 1) {
          const { value: k, repeatable: _, optional: b } = m,
            I = k in c ? c[k] : "";
          if (rt(I) && !_) {
            throw new Error(
              `Provided param "${k}" is an array but it is not repeatable (* or + modifiers)`,
            );
          }
          const O = rt(I) ? I.join("/") : I;
          if (!O) {
            if (b) {
              p.length < 2 && (u.endsWith("/") ? u = u.slice(0, -1) : f = !0);
            } else throw new Error(`Missing required param "${k}"`);
          }
          u += O;
        }
      }
    }
    return u || "/";
  }
  return { re: i, score: r, keys: o, parse: a, stringify: l };
}
function yd(e, t) {
  let n = 0;
  for (; n < e.length && n < t.length;) {
    const r = t[n] - e[n];
    if (r) return r;
    n++;
  }
  return e.length < t.length
    ? e.length === 1 && e[0] === 80 ? -1 : 1
    : e.length > t.length
    ? t.length === 1 && t[0] === 80 ? 1 : -1
    : 0;
}
function Sl(e, t) {
  let n = 0;
  const r = e.score, s = t.score;
  for (; n < r.length && n < s.length;) {
    const o = yd(r[n], s[n]);
    if (o) return o;
    n++;
  }
  if (Math.abs(s.length - r.length) === 1) {
    if (Si(r)) return 1;
    if (Si(s)) return -1;
  }
  return s.length - r.length;
}
function Si(e) {
  const t = e[e.length - 1];
  return e.length > 0 && t[t.length - 1] < 0;
}
const vd = { type: 0, value: "" }, bd = /[a-zA-Z0-9_]/;
function _d(e) {
  if (!e) return [[]];
  if (e === "/") return [[vd]];
  if (!e.startsWith("/")) throw new Error(`Invalid path "${e}"`);
  function t(m) {
    throw new Error(`ERR (${n})/"${c}": ${m}`);
  }
  let n = 0, r = n;
  const s = [];
  let o;
  function i() {
    o && s.push(o), o = [];
  }
  let a = 0, l, c = "", u = "";
  function f() {
    c &&
      (n === 0
        ? o.push({ type: 0, value: c })
        : n === 1 || n === 2 || n === 3
        ? (o.length > 1 && (l === "*" || l === "+") &&
          t(`A repeatable param (${c}) must be alone in its segment. eg: '/:ids+.`),
          o.push({
            type: 1,
            value: c,
            regexp: u,
            repeatable: l === "*" || l === "+",
            optional: l === "*" || l === "?",
          }))
        : t("Invalid state to consume buffer"),
        c = "");
  }
  function p() {
    c += l;
  }
  for (; a < e.length;) {
    if (l = e[a++], l === "\\" && n !== 2) {
      r = n, n = 4;
      continue;
    }
    switch (n) {
      case 0:
        l === "/" ? (c && f(), i()) : l === ":" ? (f(), n = 1) : p();
        break;
      case 4:
        p(), n = r;
        break;
      case 1:
        l === "("
          ? n = 2
          : bd.test(l)
          ? p()
          : (f(), n = 0, l !== "*" && l !== "?" && l !== "+" && a--);
        break;
      case 2:
        l === ")"
          ? u[u.length - 1] == "\\" ? u = u.slice(0, -1) + l : n = 3
          : u += l;
        break;
      case 3:
        f(), n = 0, l !== "*" && l !== "?" && l !== "+" && a--, u = "";
        break;
      default:
        t("Unknown state");
        break;
    }
  }
  return n === 2 && t(`Unfinished custom RegExp for param "${c}"`), f(), i(), s;
}
function xd(e, t, n) {
  const r = gd(_d(e.path), n),
    s = le(r, { record: e, parent: t, children: [], alias: [] });
  return t && !s.record.aliasOf == !t.record.aliasOf && t.children.push(s), s;
}
function wd(e, t) {
  const n = [], r = new Map();
  t = Ti({ strict: !1, end: !0, sensitive: !1 }, t);
  function s(f) {
    return r.get(f);
  }
  function o(f, p, m) {
    const k = !m, _ = ki(f);
    _.aliasOf = m && m.record;
    const b = Ti(t, f), I = [_];
    if ("alias" in f) {
      const T = typeof f.alias == "string" ? [f.alias] : f.alias;
      for (const Y of T) {
        I.push(
          ki(
            le({}, _, {
              components: m ? m.record.components : _.components,
              path: Y,
              aliasOf: m ? m.record : _,
            }),
          ),
        );
      }
    }
    let O, $;
    for (const T of I) {
      const { path: Y } = T;
      if (p && Y[0] !== "/") {
        const B = p.record.path, J = B[B.length - 1] === "/" ? "" : "/";
        T.path = p.record.path + (Y && J + Y);
      }
      if (
        O = xd(T, p, b),
          m
            ? m.alias.push(O)
            : ($ = $ || O,
              $ !== O && $.alias.push(O),
              k && f.name && !Ei(O) && i(f.name)),
          Cl(O) && l(O),
          _.children
      ) {
        const B = _.children;
        for (let J = 0; J < B.length; J++) o(B[J], O, m && m.children[J]);
      }
      m = m || O;
    }
    return $
      ? () => {
        i($);
      }
      : Fn;
  }
  function i(f) {
    if (xl(f)) {
      const p = r.get(f);
      p &&
        (r.delete(f),
          n.splice(n.indexOf(p), 1),
          p.children.forEach(i),
          p.alias.forEach(i));
    } else {
      const p = n.indexOf(f);
      p > -1 &&
        (n.splice(p, 1),
          f.record.name && r.delete(f.record.name),
          f.children.forEach(i),
          f.alias.forEach(i));
    }
  }
  function a() {
    return n;
  }
  function l(f) {
    const p = kd(f, n);
    n.splice(p, 0, f), f.record.name && !Ei(f) && r.set(f.record.name, f);
  }
  function c(f, p) {
    let m, k = {}, _, b;
    if ("name" in f && f.name) {
      if (m = r.get(f.name), !m) throw xn(1, { location: f });
      b = m.record.name,
        k = le(
          Ci(
            p.params,
            m.keys.filter(($) => !$.optional).concat(
              m.parent ? m.parent.keys.filter(($) => $.optional) : [],
            ).map(($) => $.name),
          ),
          f.params && Ci(f.params, m.keys.map(($) => $.name)),
        ),
        _ = m.stringify(k);
    } else if (f.path != null) {
      _ = f.path,
        m = n.find(($) => $.re.test(_)),
        m && (k = m.parse(_), b = m.record.name);
    } else {
      if (m = p.name ? r.get(p.name) : n.find(($) => $.re.test(p.path)), !m) {
        throw xn(1, { location: f, currentLocation: p });
      }
      b = m.record.name, k = le({}, p.params, f.params), _ = m.stringify(k);
    }
    const I = [];
    let O = m;
    for (; O;) I.unshift(O.record), O = O.parent;
    return { name: b, path: _, params: k, matched: I, meta: Cd(I) };
  }
  e.forEach((f) => o(f));
  function u() {
    n.length = 0, r.clear();
  }
  return {
    addRoute: o,
    resolve: c,
    removeRoute: i,
    clearRoutes: u,
    getRoutes: a,
    getRecordMatcher: s,
  };
}
function Ci(e, t) {
  const n = {};
  for (const r of t) r in e && (n[r] = e[r]);
  return n;
}
function ki(e) {
  const t = {
    path: e.path,
    redirect: e.redirect,
    name: e.name,
    meta: e.meta || {},
    aliasOf: e.aliasOf,
    beforeEnter: e.beforeEnter,
    props: Sd(e),
    children: e.children || [],
    instances: {},
    leaveGuards: new Set(),
    updateGuards: new Set(),
    enterCallbacks: {},
    components: "components" in e
      ? e.components || null
      : e.component && { default: e.component },
  };
  return Object.defineProperty(t, "mods", { value: {} }), t;
}
function Sd(e) {
  const t = {}, n = e.props || !1;
  if ("component" in e) t.default = n;
  else for (const r in e.components) t[r] = typeof n == "object" ? n[r] : n;
  return t;
}
function Ei(e) {
  for (; e;) {
    if (e.record.aliasOf) return !0;
    e = e.parent;
  }
  return !1;
}
function Cd(e) {
  return e.reduce((t, n) => le(t, n.meta), {});
}
function Ti(e, t) {
  const n = {};
  for (const r in e) n[r] = r in t ? t[r] : e[r];
  return n;
}
function kd(e, t) {
  let n = 0, r = t.length;
  for (; n !== r;) {
    const o = n + r >> 1;
    Sl(e, t[o]) < 0 ? r = o : n = o + 1;
  }
  const s = Ed(e);
  return s && (r = t.lastIndexOf(s, r - 1)), r;
}
function Ed(e) {
  let t = e;
  for (; t = t.parent;) if (Cl(t) && Sl(e, t) === 0) return t;
}
function Cl({ record: e }) {
  return !!(e.name || e.components && Object.keys(e.components).length ||
    e.redirect);
}
function Td(e) {
  const t = {};
  if (e === "" || e === "?") return t;
  const r = (e[0] === "?" ? e.slice(1) : e).split("&");
  for (let s = 0; s < r.length; ++s) {
    const o = r[s].replace(ml, " "),
      i = o.indexOf("="),
      a = Jn(i < 0 ? o : o.slice(0, i)),
      l = i < 0 ? null : Jn(o.slice(i + 1));
    if (a in t) {
      let c = t[a];
      rt(c) || (c = t[a] = [c]), c.push(l);
    } else t[a] = l;
  }
  return t;
}
function Ri(e) {
  let t = "";
  for (let n in e) {
    const r = e[n];
    if (n = Gf(n), r == null) {
      r !== void 0 && (t += (t.length ? "&" : "") + n);
      continue;
    }
    (rt(r) ? r.map((o) => o && Fs(o)) : [r && Fs(r)]).forEach((o) => {
      o !== void 0 &&
        (t += (t.length ? "&" : "") + n, o != null && (t += "=" + o));
    });
  }
  return t;
}
function Rd(e) {
  const t = {};
  for (const n in e) {
    const r = e[n];
    r !== void 0 &&
      (t[n] = rt(r)
        ? r.map((s) => s == null ? null : "" + s)
        : r == null
        ? r
        : "" + r);
  }
  return t;
}
const Od = Symbol(""),
  Oi = Symbol(""),
  Ro = Symbol(""),
  kl = Symbol(""),
  Bs = Symbol("");
function On() {
  let e = [];
  function t(r) {
    return e.push(r), () => {
      const s = e.indexOf(r);
      s > -1 && e.splice(s, 1);
    };
  }
  function n() {
    e = [];
  }
  return { add: t, list: () => e.slice(), reset: n };
}
function Pt(e, t, n, r, s, o = (i) => i()) {
  const i = r && (r.enterCallbacks[s] = r.enterCallbacks[s] || []);
  return () =>
    new Promise((a, l) => {
      const c = (p) => {
          p === !1
            ? l(xn(4, { from: n, to: t }))
            : p instanceof Error
            ? l(p)
            : hd(p)
            ? l(xn(2, { from: t, to: p }))
            : (i && r.enterCallbacks[s] === i && typeof p == "function" &&
              i.push(p),
              a());
        },
        u = o(() => e.call(r && r.instances[s], t, n, c));
      let f = Promise.resolve(u);
      e.length < 3 && (f = f.then(c)), f.catch((p) => l(p));
    });
}
function Cs(e, t, n, r, s = (o) => o()) {
  const o = [];
  for (const i of e) {
    for (const a in i.components) {
      let l = i.components[a];
      if (!(t !== "beforeRouteEnter" && !i.instances[a])) {
        if (hl(l)) {
          const u = (l.__vccOpts || l)[t];
          u && o.push(Pt(u, n, r, i, a, s));
        } else {
          let c = l();
          o.push(() =>
            c.then((u) => {
              if (!u) {
                throw new Error(
                  `Couldn't resolve component "${a}" at "${i.path}"`,
                );
              }
              const f = $f(u) ? u.default : u;
              i.mods[a] = u, i.components[a] = f;
              const m = (f.__vccOpts || f)[t];
              return m && Pt(m, n, r, i, a, s)();
            })
          );
        }
      }
    }
  }
  return o;
}
function Ii(e) {
  const t = wt(Ro),
    n = wt(kl),
    r = Ye(() => {
      const l = Me(e.to);
      return t.resolve(l);
    }),
    s = Ye(() => {
      const { matched: l } = r.value,
        { length: c } = l,
        u = l[c - 1],
        f = n.matched;
      if (!u || !f.length) return -1;
      const p = f.findIndex(_n.bind(null, u));
      if (p > -1) return p;
      const m = Ai(l[c - 2]);
      return c > 1 && Ai(u) === m && f[f.length - 1].path !== m
        ? f.findIndex(_n.bind(null, l[c - 2]))
        : p;
    }),
    o = Ye(() => s.value > -1 && Md(n.params, r.value.params)),
    i = Ye(() =>
      s.value > -1 && s.value === n.matched.length - 1 &&
      bl(n.params, r.value.params)
    );
  function a(l = {}) {
    return Pd(l)
      ? t[Me(e.replace) ? "replace" : "push"](Me(e.to)).catch(Fn)
      : Promise.resolve();
  }
  return {
    route: r,
    href: Ye(() => r.value.href),
    isActive: o,
    isExactActive: i,
    navigate: a,
  };
}
const Id = rn({
    name: "RouterLink",
    compatConfig: { MODE: 3 },
    props: {
      to: { type: [String, Object], required: !0 },
      replace: Boolean,
      activeClass: String,
      exactActiveClass: String,
      custom: Boolean,
      ariaCurrentValue: { type: String, default: "page" },
    },
    useLink: Ii,
    setup(e, { slots: t }) {
      const n = mr(Ii(e)),
        { options: r } = wt(Ro),
        s = Ye(() => ({
          [Pi(e.activeClass, r.linkActiveClass, "router-link-active")]:
            n.isActive,
          [
            Pi(
              e.exactActiveClass,
              r.linkExactActiveClass,
              "router-link-exact-active",
            )
          ]: n.isExactActive,
        }));
      return () => {
        const o = t.default && t.default(n);
        return e.custom ? o : Kt("a", {
          "aria-current": n.isExactActive ? e.ariaCurrentValue : null,
          href: n.href,
          onClick: n.navigate,
          class: s.value,
        }, o);
      };
    },
  }),
  Ad = Id;
function Pd(e) {
  if (
    !(e.metaKey || e.altKey || e.ctrlKey || e.shiftKey) &&
    !e.defaultPrevented && !(e.button !== void 0 && e.button !== 0)
  ) {
    if (e.currentTarget && e.currentTarget.getAttribute) {
      const t = e.currentTarget.getAttribute("target");
      if (/\b_blank\b/i.test(t)) return;
    }
    return e.preventDefault && e.preventDefault(), !0;
  }
}
function Md(e, t) {
  for (const n in t) {
    const r = t[n], s = e[n];
    if (typeof r == "string") { if (r !== s) return !1; }
    else if (!rt(s) || s.length !== r.length || r.some((o, i) => o !== s[i])) {
      return !1;
    }
  }
  return !0;
}
function Ai(e) {
  return e ? e.aliasOf ? e.aliasOf.path : e.path : "";
}
const Pi = (e, t, n) => e ?? t ?? n,
  Nd = rn({
    name: "RouterView",
    inheritAttrs: !1,
    props: { name: { type: String, default: "default" }, route: Object },
    compatConfig: { MODE: 3 },
    setup(e, { attrs: t, slots: n }) {
      const r = wt(Bs),
        s = Ye(() => e.route || r.value),
        o = wt(Oi, 0),
        i = Ye(() => {
          let c = Me(o);
          const { matched: u } = s.value;
          let f;
          for (; (f = u[c]) && !f.components;) c++;
          return c;
        }),
        a = Ye(() => s.value.matched[i.value]);
      Rr(Oi, Ye(() => i.value + 1)), Rr(Od, a), Rr(Bs, s);
      const l = Zn();
      return Vn(() => [l.value, a.value, e.name], ([c, u, f], [p, m, k]) => {
        u &&
        (u.instances[f] = c,
          m && m !== u && c && c === p &&
          (u.leaveGuards.size || (u.leaveGuards = m.leaveGuards),
            u.updateGuards.size || (u.updateGuards = m.updateGuards))),
          c && u && (!m || !_n(u, m) || !p) &&
          (u.enterCallbacks[f] || []).forEach((_) => _(c));
      }, { flush: "post" }),
        () => {
          const c = s.value, u = e.name, f = a.value, p = f && f.components[u];
          if (!p) return Mi(n.default, { Component: p, route: c });
          const m = f.props[u],
            k = m
              ? m === !0 ? c.params : typeof m == "function" ? m(c) : m
              : null,
            b = Kt(
              p,
              le({}, k, t, {
                onVnodeUnmounted: (I) => {
                  I.component.isUnmounted && (f.instances[u] = null);
                },
                ref: l,
              }),
            );
          return Mi(n.default, { Component: b, route: c }) || b;
        };
    },
  });
function Mi(e, t) {
  if (!e) return null;
  const n = e(t);
  return n.length === 1 ? n[0] : n;
}
const jd = Nd;
function $d(e) {
  const t = wd(e.routes, e),
    n = e.parseQuery || Td,
    r = e.stringifyQuery || Ri,
    s = e.history,
    o = On(),
    i = On(),
    a = On(),
    l = Bc(Et);
  let c = Et;
  cn && e.scrollBehavior && "scrollRestoration" in history &&
    (history.scrollRestoration = "manual");
  const u = ws.bind(null, (v) => "" + v),
    f = ws.bind(null, qf),
    p = ws.bind(null, Jn);
  function m(v, L) {
    let P, Z;
    return xl(v) ? (P = t.getRecordMatcher(v), Z = L) : Z = v, t.addRoute(Z, P);
  }
  function k(v) {
    const L = t.getRecordMatcher(v);
    L && t.removeRoute(L);
  }
  function _() {
    return t.getRoutes().map((v) => v.record);
  }
  function b(v) {
    return !!t.getRecordMatcher(v);
  }
  function I(v, L) {
    if (L = le({}, L || l.value), typeof v == "string") {
      const h = Ss(n, v, L.path),
        g = t.resolve({ path: h.path }, L),
        x = s.createHref(h.fullPath);
      return le(h, g, {
        params: p(g.params),
        hash: Jn(h.hash),
        redirectedFrom: void 0,
        href: x,
      });
    }
    let P;
    if (v.path != null) P = le({}, v, { path: Ss(n, v.path, L.path).path });
    else {
      const h = le({}, v.params);
      for (const g in h) h[g] == null && delete h[g];
      P = le({}, v, { params: f(h) }), L.params = f(L.params);
    }
    const Z = t.resolve(P, L), ie = v.hash || "";
    Z.params = u(p(Z.params));
    const pe = Yf(r, le({}, v, { hash: Wf(ie), path: Z.path })),
      d = s.createHref(pe);
    return le(
      { fullPath: pe, hash: ie, query: r === Ri ? Rd(v.query) : v.query || {} },
      Z,
      { redirectedFrom: void 0, href: d },
    );
  }
  function O(v) {
    return typeof v == "string" ? Ss(n, v, l.value.path) : le({}, v);
  }
  function $(v, L) {
    if (c !== v) return xn(8, { from: L, to: v });
  }
  function T(v) {
    return J(v);
  }
  function Y(v) {
    return T(le(O(v), { replace: !0 }));
  }
  function B(v) {
    const L = v.matched[v.matched.length - 1];
    if (L && L.redirect) {
      const { redirect: P } = L;
      let Z = typeof P == "function" ? P(v) : P;
      return typeof Z == "string" &&
        (Z = Z.includes("?") || Z.includes("#") ? Z = O(Z) : { path: Z },
          Z.params = {}),
        le({
          query: v.query,
          hash: v.hash,
          params: Z.path != null ? {} : v.params,
        }, Z);
    }
  }
  function J(v, L) {
    const P = c = I(v),
      Z = l.value,
      ie = v.state,
      pe = v.force,
      d = v.replace === !0,
      h = B(P);
    if (h) {
      return J(
        le(O(h), {
          state: typeof h == "object" ? le({}, ie, h.state) : ie,
          force: pe,
          replace: d,
        }),
        L || P,
      );
    }
    const g = P;
    g.redirectedFrom = L;
    let x;
    return !pe && Xf(r, Z, P) &&
      (x = xn(16, { to: g, from: Z }), ve(Z, Z, !0, !1)),
      (x ? Promise.resolve(x) : ye(g, Z)).catch((y) =>
        yt(y) ? yt(y, 2) ? y : Qe(y) : X(y, g, Z)
      ).then((y) => {
        if (y) {
          if (yt(y, 2)) {
            return J(
              le({ replace: d }, O(y.to), {
                state: typeof y.to == "object" ? le({}, ie, y.to.state) : ie,
                force: pe,
              }),
              L || g,
            );
          }
        } else y = ne(g, Z, !0, d, ie);
        return Ge(g, Z, y), y;
      });
  }
  function be(v, L) {
    const P = $(v, L);
    return P ? Promise.reject(P) : Promise.resolve();
  }
  function xe(v) {
    const L = on.values().next().value;
    return L && typeof L.runWithContext == "function"
      ? L.runWithContext(v)
      : v();
  }
  function ye(v, L) {
    let P;
    const [Z, ie, pe] = Ld(v, L);
    P = Cs(Z.reverse(), "beforeRouteLeave", v, L);
    for (const h of Z) {
      h.leaveGuards.forEach((g) => {
        P.push(Pt(g, v, L));
      });
    }
    const d = be.bind(null, v, L);
    return P.push(d),
      Ke(P).then(() => {
        P = [];
        for (const h of o.list()) P.push(Pt(h, v, L));
        return P.push(d), Ke(P);
      }).then(() => {
        P = Cs(ie, "beforeRouteUpdate", v, L);
        for (const h of ie) {
          h.updateGuards.forEach((g) => {
            P.push(Pt(g, v, L));
          });
        }
        return P.push(d), Ke(P);
      }).then(() => {
        P = [];
        for (const h of pe) {
          if (h.beforeEnter) {
            if (rt(h.beforeEnter)) {
              for (const g of h.beforeEnter) P.push(Pt(g, v, L));
            } else P.push(Pt(h.beforeEnter, v, L));
          }
        }
        return P.push(d), Ke(P);
      }).then(
        () => (v.matched.forEach((h) => h.enterCallbacks = {}),
          P = Cs(pe, "beforeRouteEnter", v, L, xe),
          P.push(d),
          Ke(P)),
      ).then(() => {
        P = [];
        for (const h of i.list()) P.push(Pt(h, v, L));
        return P.push(d), Ke(P);
      }).catch((h) => yt(h, 8) ? h : Promise.reject(h));
  }
  function Ge(v, L, P) {
    a.list().forEach((Z) => xe(() => Z(v, L, P)));
  }
  function ne(v, L, P, Z, ie) {
    const pe = $(v, L);
    if (pe) return pe;
    const d = L === Et, h = cn ? history.state : {};
    P &&
    (Z || d
      ? s.replace(v.fullPath, le({ scroll: d && h && h.scroll }, ie))
      : s.push(v.fullPath, ie)),
      l.value = v,
      ve(v, L, P, d),
      Qe();
  }
  let Ze;
  function ot() {
    Ze || (Ze = s.listen((v, L, P) => {
      if (!br.listening) return;
      const Z = I(v), ie = B(Z);
      if (ie) {
        J(le(ie, { replace: !0 }), Z).catch(Fn);
        return;
      }
      c = Z;
      const pe = l.value;
      cn && ad(bi(pe.fullPath, P.delta), os()),
        ye(Z, pe).catch((d) =>
          yt(d, 12) ? d : yt(d, 2)
            ? (J(d.to, Z).then((h) => {
              yt(h, 20) && !P.delta && P.type === Yn.pop && s.go(-1, !1);
            }).catch(Fn),
              Promise.reject())
            : (P.delta && s.go(-P.delta, !1), X(d, Z, pe))
        ).then((d) => {
          d = d || ne(Z, pe, !1),
            d &&
            (P.delta && !yt(d, 8)
              ? s.go(-P.delta, !1)
              : P.type === Yn.pop && yt(d, 20) && s.go(-1, !1)),
            Ge(Z, pe, d);
        }).catch(Fn);
    }));
  }
  let mt = On(), he = On(), re;
  function X(v, L, P) {
    Qe(v);
    const Z = he.list();
    return Z.length ? Z.forEach((ie) => ie(v, L, P)) : console.error(v),
      Promise.reject(v);
  }
  function Oe() {
    return re && l.value !== Et ? Promise.resolve() : new Promise((v, L) => {
      mt.add([v, L]);
    });
  }
  function Qe(v) {
    return re ||
      (re = !v,
        ot(),
        mt.list().forEach(([L, P]) => v ? P(v) : L()),
        mt.reset()),
      v;
  }
  function ve(v, L, P, Z) {
    const { scrollBehavior: ie } = e;
    if (!cn || !ie) return Promise.resolve();
    const pe = !P && ld(bi(v.fullPath, 0)) ||
      (Z || !P) && history.state && history.state.scroll || null;
    return Ma().then(() => ie(v, L, pe)).then((d) => d && id(d)).catch((d) =>
      X(d, v, L)
    );
  }
  const Le = (v) => s.go(v);
  let sn;
  const on = new Set(),
    br = {
      currentRoute: l,
      listening: !0,
      addRoute: m,
      removeRoute: k,
      clearRoutes: t.clearRoutes,
      hasRoute: b,
      getRoutes: _,
      resolve: I,
      options: e,
      push: T,
      replace: Y,
      go: Le,
      back: () => Le(-1),
      forward: () => Le(1),
      beforeEach: o.add,
      beforeResolve: i.add,
      afterEach: a.add,
      onError: he.add,
      isReady: Oe,
      install(v) {
        const L = this;
        v.component("RouterLink", Ad),
          v.component("RouterView", jd),
          v.config.globalProperties.$router = L,
          Object.defineProperty(v.config.globalProperties, "$route", {
            enumerable: !0,
            get: () => Me(l),
          }),
          cn && !sn && l.value === Et &&
          (sn = !0, T(s.location).catch((ie) => {}));
        const P = {};
        for (const ie in Et) {
          Object.defineProperty(P, ie, {
            get: () => l.value[ie],
            enumerable: !0,
          });
        }
        v.provide(Ro, L), v.provide(kl, Ra(P)), v.provide(Bs, l);
        const Z = v.unmount;
        on.add(v),
          v.unmount = function () {
            on.delete(v),
              on.size < 1 &&
              (c = Et, Ze && Ze(), Ze = null, l.value = Et, sn = !1, re = !1),
              Z();
          };
      },
    };
  function Ke(v) {
    return v.reduce((L, P) => L.then(() => xe(P)), Promise.resolve());
  }
  return br;
}
function Ld(e, t) {
  const n = [],
    r = [],
    s = [],
    o = Math.max(t.matched.length, e.matched.length);
  for (let i = 0; i < o; i++) {
    const a = t.matched[i];
    a && (e.matched.find((c) => _n(c, a)) ? r.push(a) : n.push(a));
    const l = e.matched[i];
    l && (t.matched.find((c) => _n(c, l)) || s.push(l));
  }
  return [n, r, s];
}
var te;
(function (e) {
  e.assertEqual = (s) => s;
  function t(s) {}
  e.assertIs = t;
  function n(s) {
    throw new Error();
  }
  e.assertNever = n,
    e.arrayToEnum = (s) => {
      const o = {};
      for (const i of s) o[i] = i;
      return o;
    },
    e.getValidEnumValues = (s) => {
      const o = e.objectKeys(s).filter((a) => typeof s[s[a]] != "number"),
        i = {};
      for (const a of o) i[a] = s[a];
      return e.objectValues(i);
    },
    e.objectValues = (s) => e.objectKeys(s).map(function (o) {
      return s[o];
    }),
    e.objectKeys = typeof Object.keys == "function"
      ? (s) => Object.keys(s)
      : (s) => {
        const o = [];
        for (const i in s) {Object.prototype.hasOwnProperty.call(s, i) &&
            o.push(i);}
        return o;
      },
    e.find = (s, o) => {
      for (const i of s) if (o(i)) return i;
    },
    e.isInteger = typeof Number.isInteger == "function"
      ? (s) => Number.isInteger(s)
      : (s) => typeof s == "number" && isFinite(s) && Math.floor(s) === s;
  function r(s, o = " | ") {
    return s.map((i) => typeof i == "string" ? `'${i}'` : i).join(o);
  }
  e.joinValues = r,
    e.jsonStringifyReplacer = (s, o) => typeof o == "bigint" ? o.toString() : o;
})(te || (te = {}));
var Hs;
(function (e) {
  e.mergeShapes = (t, n) => ({ ...t, ...n });
})(Hs || (Hs = {}));
const j = te.arrayToEnum([
    "string",
    "nan",
    "number",
    "integer",
    "float",
    "boolean",
    "date",
    "bigint",
    "symbol",
    "function",
    "undefined",
    "null",
    "array",
    "object",
    "unknown",
    "promise",
    "void",
    "never",
    "map",
    "set",
  ]),
  Nt = (e) => {
    switch (typeof e) {
      case "undefined":
        return j.undefined;
      case "string":
        return j.string;
      case "number":
        return isNaN(e) ? j.nan : j.number;
      case "boolean":
        return j.boolean;
      case "function":
        return j.function;
      case "bigint":
        return j.bigint;
      case "symbol":
        return j.symbol;
      case "object":
        return Array.isArray(e)
          ? j.array
          : e === null
          ? j.null
          : e.then && typeof e.then == "function" && e.catch &&
              typeof e.catch == "function"
          ? j.promise
          : typeof Map < "u" && e instanceof Map
          ? j.map
          : typeof Set < "u" && e instanceof Set
          ? j.set
          : typeof Date < "u" && e instanceof Date
          ? j.date
          : j.object;
      default:
        return j.unknown;
    }
  },
  C = te.arrayToEnum([
    "invalid_type",
    "invalid_literal",
    "custom",
    "invalid_union",
    "invalid_union_discriminator",
    "invalid_enum_value",
    "unrecognized_keys",
    "invalid_arguments",
    "invalid_return_type",
    "invalid_date",
    "invalid_string",
    "too_small",
    "too_big",
    "invalid_intersection_types",
    "not_multiple_of",
    "not_finite",
  ]),
  Zd = (e) => JSON.stringify(e, null, 2).replace(/"([^"]+)":/g, "$1:");
class We extends Error {
  constructor(t) {
    super(),
      this.issues = [],
      this.addIssue = (r) => {
        this.issues = [...this.issues, r];
      },
      this.addIssues = (r = []) => {
        this.issues = [...this.issues, ...r];
      };
    const n = new.target.prototype;
    Object.setPrototypeOf ? Object.setPrototypeOf(this, n) : this.__proto__ = n,
      this.name = "ZodError",
      this.issues = t;
  }
  get errors() {
    return this.issues;
  }
  format(t) {
    const n = t || function (o) {
        return o.message;
      },
      r = { _errors: [] },
      s = (o) => {
        for (const i of o.issues) {
          if (i.code === "invalid_union") i.unionErrors.map(s);
          else if (i.code === "invalid_return_type") s(i.returnTypeError);
          else if (i.code === "invalid_arguments") s(i.argumentsError);
          else if (i.path.length === 0) r._errors.push(n(i));
          else {
            let a = r, l = 0;
            for (; l < i.path.length;) {
              const c = i.path[l];
              l === i.path.length - 1
                ? (a[c] = a[c] || { _errors: [] }, a[c]._errors.push(n(i)))
                : a[c] = a[c] || { _errors: [] },
                a = a[c],
                l++;
            }
          }
        }
      };
    return s(this), r;
  }
  static assert(t) {
    if (!(t instanceof We)) throw new Error(`Not a ZodError: ${t}`);
  }
  toString() {
    return this.message;
  }
  get message() {
    return JSON.stringify(this.issues, te.jsonStringifyReplacer, 2);
  }
  get isEmpty() {
    return this.issues.length === 0;
  }
  flatten(t = (n) => n.message) {
    const n = {}, r = [];
    for (const s of this.issues) {
      s.path.length > 0
        ? (n[s.path[0]] = n[s.path[0]] || [], n[s.path[0]].push(t(s)))
        : r.push(t(s));
    }
    return { formErrors: r, fieldErrors: n };
  }
  get formErrors() {
    return this.flatten();
  }
}
We.create = (e) => new We(e);
const wn = (e, t) => {
  let n;
  switch (e.code) {
    case C.invalid_type:
      e.received === j.undefined
        ? n = "Required"
        : n = `Expected ${e.expected}, received ${e.received}`;
      break;
    case C.invalid_literal:
      n = `Invalid literal value, expected ${
        JSON.stringify(e.expected, te.jsonStringifyReplacer)
      }`;
      break;
    case C.unrecognized_keys:
      n = `Unrecognized key(s) in object: ${te.joinValues(e.keys, ", ")}`;
      break;
    case C.invalid_union:
      n = "Invalid input";
      break;
    case C.invalid_union_discriminator:
      n = `Invalid discriminator value. Expected ${te.joinValues(e.options)}`;
      break;
    case C.invalid_enum_value:
      n = `Invalid enum value. Expected ${
        te.joinValues(e.options)
      }, received '${e.received}'`;
      break;
    case C.invalid_arguments:
      n = "Invalid function arguments";
      break;
    case C.invalid_return_type:
      n = "Invalid function return type";
      break;
    case C.invalid_date:
      n = "Invalid date";
      break;
    case C.invalid_string:
      typeof e.validation == "object"
        ? "includes" in e.validation
          ? (n = `Invalid input: must include "${e.validation.includes}"`,
            typeof e.validation.position == "number" &&
            (n =
              `${n} at one or more positions greater than or equal to ${e.validation.position}`))
          : "startsWith" in e.validation
          ? n = `Invalid input: must start with "${e.validation.startsWith}"`
          : "endsWith" in e.validation
          ? n = `Invalid input: must end with "${e.validation.endsWith}"`
          : te.assertNever(e.validation)
        : e.validation !== "regex"
        ? n = `Invalid ${e.validation}`
        : n = "Invalid";
      break;
    case C.too_small:
      e.type === "array"
        ? n = `Array must contain ${
          e.exact ? "exactly" : e.inclusive ? "at least" : "more than"
        } ${e.minimum} element(s)`
        : e.type === "string"
        ? n = `String must contain ${
          e.exact ? "exactly" : e.inclusive ? "at least" : "over"
        } ${e.minimum} character(s)`
        : e.type === "number"
        ? n = `Number must be ${
          e.exact
            ? "exactly equal to "
            : e.inclusive
            ? "greater than or equal to "
            : "greater than "
        }${e.minimum}`
        : e.type === "date"
        ? n = `Date must be ${
          e.exact
            ? "exactly equal to "
            : e.inclusive
            ? "greater than or equal to "
            : "greater than "
        }${new Date(Number(e.minimum))}`
        : n = "Invalid input";
      break;
    case C.too_big:
      e.type === "array"
        ? n = `Array must contain ${
          e.exact ? "exactly" : e.inclusive ? "at most" : "less than"
        } ${e.maximum} element(s)`
        : e.type === "string"
        ? n = `String must contain ${
          e.exact ? "exactly" : e.inclusive ? "at most" : "under"
        } ${e.maximum} character(s)`
        : e.type === "number"
        ? n = `Number must be ${
          e.exact
            ? "exactly"
            : e.inclusive
            ? "less than or equal to"
            : "less than"
        } ${e.maximum}`
        : e.type === "bigint"
        ? n = `BigInt must be ${
          e.exact
            ? "exactly"
            : e.inclusive
            ? "less than or equal to"
            : "less than"
        } ${e.maximum}`
        : e.type === "date"
        ? n = `Date must be ${
          e.exact
            ? "exactly"
            : e.inclusive
            ? "smaller than or equal to"
            : "smaller than"
        } ${new Date(Number(e.maximum))}`
        : n = "Invalid input";
      break;
    case C.custom:
      n = "Invalid input";
      break;
    case C.invalid_intersection_types:
      n = "Intersection results could not be merged";
      break;
    case C.not_multiple_of:
      n = `Number must be a multiple of ${e.multipleOf}`;
      break;
    case C.not_finite:
      n = "Number must be finite";
      break;
    default:
      n = t.defaultError, te.assertNever(e);
  }
  return { message: n };
};
let El = wn;
function Dd(e) {
  El = e;
}
function Vr() {
  return El;
}
const zr = (e) => {
    const { data: t, path: n, errorMaps: r, issueData: s } = e,
      o = [...n, ...s.path || []],
      i = { ...s, path: o };
    if (s.message !== void 0) return { ...s, path: o, message: s.message };
    let a = "";
    const l = r.filter((c) => !!c).slice().reverse();
    for (const c of l) a = c(i, { data: t, defaultError: a }).message;
    return { ...s, path: o, message: a };
  },
  Vd = [];
function M(e, t) {
  const n = Vr(),
    r = zr({
      issueData: t,
      data: e.data,
      path: e.path,
      errorMaps: [
        e.common.contextualErrorMap,
        e.schemaErrorMap,
        n,
        n === wn ? void 0 : wn,
      ].filter((s) => !!s),
    });
  e.common.issues.push(r);
}
class Re {
  constructor() {
    this.value = "valid";
  }
  dirty() {
    this.value === "valid" && (this.value = "dirty");
  }
  abort() {
    this.value !== "aborted" && (this.value = "aborted");
  }
  static mergeArray(t, n) {
    const r = [];
    for (const s of n) {
      if (s.status === "aborted") return U;
      s.status === "dirty" && t.dirty(), r.push(s.value);
    }
    return { status: t.value, value: r };
  }
  static async mergeObjectAsync(t, n) {
    const r = [];
    for (const s of n) {
      const o = await s.key, i = await s.value;
      r.push({ key: o, value: i });
    }
    return Re.mergeObjectSync(t, r);
  }
  static mergeObjectSync(t, n) {
    const r = {};
    for (const s of n) {
      const { key: o, value: i } = s;
      if (o.status === "aborted" || i.status === "aborted") return U;
      o.status === "dirty" && t.dirty(),
        i.status === "dirty" && t.dirty(),
        o.value !== "__proto__" && (typeof i.value < "u" || s.alwaysSet) &&
        (r[o.value] = i.value);
    }
    return { status: t.value, value: r };
  }
}
const U = Object.freeze({ status: "aborted" }),
  dn = (e) => ({ status: "dirty", value: e }),
  $e = (e) => ({ status: "valid", value: e }),
  Ws = (e) => e.status === "aborted",
  Gs = (e) => e.status === "dirty",
  Xn = (e) => e.status === "valid",
  er = (e) => typeof Promise < "u" && e instanceof Promise;
function Fr(e, t, n, r) {
  if (typeof t == "function" ? e !== t || !r : !t.has(e)) {
    throw new TypeError(
      "Cannot read private member from an object whose class did not declare it",
    );
  }
  return t.get(e);
}
function Tl(e, t, n, r, s) {
  if (typeof t == "function" ? e !== t || !s : !t.has(e)) {
    throw new TypeError(
      "Cannot write private member to an object whose class did not declare it",
    );
  }
  return t.set(e, n), n;
}
var D;
(function (e) {
  e.errToObj = (t) => typeof t == "string" ? { message: t } : t || {},
    e.toString = (t) =>
      typeof t == "string" ? t : t == null ? void 0 : t.message;
})(D || (D = {}));
var Nn, jn;
class ht {
  constructor(t, n, r, s) {
    this._cachedPath = [],
      this.parent = t,
      this.data = n,
      this._path = r,
      this._key = s;
  }
  get path() {
    return this._cachedPath.length ||
      (this._key instanceof Array
        ? this._cachedPath.push(...this._path, ...this._key)
        : this._cachedPath.push(...this._path, this._key)),
      this._cachedPath;
  }
}
const Ni = (e, t) => {
  if (Xn(t)) return { success: !0, data: t.value };
  if (!e.common.issues.length) {
    throw new Error("Validation failed but no issues detected.");
  }
  return {
    success: !1,
    get error() {
      if (this._error) return this._error;
      const n = new We(e.common.issues);
      return this._error = n, this._error;
    },
  };
};
function K(e) {
  if (!e) return {};
  const {
    errorMap: t,
    invalid_type_error: n,
    required_error: r,
    description: s,
  } = e;
  if (t && (n || r)) {
    throw new Error(
      `Can't use "invalid_type_error" or "required_error" in conjunction with custom error map.`,
    );
  }
  return t ? { errorMap: t, description: s } : {
    errorMap: (i, a) => {
      var l, c;
      const { message: u } = e;
      return i.code === "invalid_enum_value"
        ? { message: u ?? a.defaultError }
        : typeof a.data > "u"
        ? {
          message: (l = u ?? r) !== null && l !== void 0 ? l : a.defaultError,
        }
        : i.code !== "invalid_type"
        ? { message: a.defaultError }
        : {
          message: (c = u ?? n) !== null && c !== void 0 ? c : a.defaultError,
        };
    },
    description: s,
  };
}
class Q {
  constructor(t) {
    this.spa = this.safeParseAsync,
      this._def = t,
      this.parse = this.parse.bind(this),
      this.safeParse = this.safeParse.bind(this),
      this.parseAsync = this.parseAsync.bind(this),
      this.safeParseAsync = this.safeParseAsync.bind(this),
      this.spa = this.spa.bind(this),
      this.refine = this.refine.bind(this),
      this.refinement = this.refinement.bind(this),
      this.superRefine = this.superRefine.bind(this),
      this.optional = this.optional.bind(this),
      this.nullable = this.nullable.bind(this),
      this.nullish = this.nullish.bind(this),
      this.array = this.array.bind(this),
      this.promise = this.promise.bind(this),
      this.or = this.or.bind(this),
      this.and = this.and.bind(this),
      this.transform = this.transform.bind(this),
      this.brand = this.brand.bind(this),
      this.default = this.default.bind(this),
      this.catch = this.catch.bind(this),
      this.describe = this.describe.bind(this),
      this.pipe = this.pipe.bind(this),
      this.readonly = this.readonly.bind(this),
      this.isNullable = this.isNullable.bind(this),
      this.isOptional = this.isOptional.bind(this);
  }
  get description() {
    return this._def.description;
  }
  _getType(t) {
    return Nt(t.data);
  }
  _getOrReturnCtx(t, n) {
    return n ||
      {
        common: t.parent.common,
        data: t.data,
        parsedType: Nt(t.data),
        schemaErrorMap: this._def.errorMap,
        path: t.path,
        parent: t.parent,
      };
  }
  _processInputParams(t) {
    return {
      status: new Re(),
      ctx: {
        common: t.parent.common,
        data: t.data,
        parsedType: Nt(t.data),
        schemaErrorMap: this._def.errorMap,
        path: t.path,
        parent: t.parent,
      },
    };
  }
  _parseSync(t) {
    const n = this._parse(t);
    if (er(n)) throw new Error("Synchronous parse encountered promise.");
    return n;
  }
  _parseAsync(t) {
    const n = this._parse(t);
    return Promise.resolve(n);
  }
  parse(t, n) {
    const r = this.safeParse(t, n);
    if (r.success) return r.data;
    throw r.error;
  }
  safeParse(t, n) {
    var r;
    const s = {
        common: {
          issues: [],
          async: (r = n == null ? void 0 : n.async) !== null && r !== void 0
            ? r
            : !1,
          contextualErrorMap: n == null ? void 0 : n.errorMap,
        },
        path: (n == null ? void 0 : n.path) || [],
        schemaErrorMap: this._def.errorMap,
        parent: null,
        data: t,
        parsedType: Nt(t),
      },
      o = this._parseSync({ data: t, path: s.path, parent: s });
    return Ni(s, o);
  }
  async parseAsync(t, n) {
    const r = await this.safeParseAsync(t, n);
    if (r.success) return r.data;
    throw r.error;
  }
  async safeParseAsync(t, n) {
    const r = {
        common: {
          issues: [],
          contextualErrorMap: n == null ? void 0 : n.errorMap,
          async: !0,
        },
        path: (n == null ? void 0 : n.path) || [],
        schemaErrorMap: this._def.errorMap,
        parent: null,
        data: t,
        parsedType: Nt(t),
      },
      s = this._parse({ data: t, path: r.path, parent: r }),
      o = await (er(s) ? s : Promise.resolve(s));
    return Ni(r, o);
  }
  refine(t, n) {
    const r = (s) =>
      typeof n == "string" || typeof n > "u"
        ? { message: n }
        : typeof n == "function"
        ? n(s)
        : n;
    return this._refinement((s, o) => {
      const i = t(s), a = () => o.addIssue({ code: C.custom, ...r(s) });
      return typeof Promise < "u" && i instanceof Promise
        ? i.then((l) => l ? !0 : (a(), !1))
        : i
        ? !0
        : (a(), !1);
    });
  }
  refinement(t, n) {
    return this._refinement((r, s) =>
      t(r) ? !0 : (s.addIssue(typeof n == "function" ? n(r, s) : n), !1)
    );
  }
  _refinement(t) {
    return new st({
      schema: this,
      typeName: F.ZodEffects,
      effect: { type: "refinement", refinement: t },
    });
  }
  superRefine(t) {
    return this._refinement(t);
  }
  optional() {
    return ft.create(this, this._def);
  }
  nullable() {
    return Vt.create(this, this._def);
  }
  nullish() {
    return this.nullable().optional();
  }
  array() {
    return nt.create(this, this._def);
  }
  promise() {
    return Cn.create(this, this._def);
  }
  or(t) {
    return sr.create([this, t], this._def);
  }
  and(t) {
    return or.create(this, t, this._def);
  }
  transform(t) {
    return new st({
      ...K(this._def),
      schema: this,
      typeName: F.ZodEffects,
      effect: { type: "transform", transform: t },
    });
  }
  default(t) {
    const n = typeof t == "function" ? t : () => t;
    return new ur({
      ...K(this._def),
      innerType: this,
      defaultValue: n,
      typeName: F.ZodDefault,
    });
  }
  brand() {
    return new Oo({ typeName: F.ZodBranded, type: this, ...K(this._def) });
  }
  catch(t) {
    const n = typeof t == "function" ? t : () => t;
    return new fr({
      ...K(this._def),
      innerType: this,
      catchValue: n,
      typeName: F.ZodCatch,
    });
  }
  describe(t) {
    const n = this.constructor;
    return new n({ ...this._def, description: t });
  }
  pipe(t) {
    return vr.create(this, t);
  }
  readonly() {
    return dr.create(this);
  }
  isOptional() {
    return this.safeParse(void 0).success;
  }
  isNullable() {
    return this.safeParse(null).success;
  }
}
const zd = /^c[^\s-]{8,}$/i,
  Fd = /^[0-9a-z]+$/,
  Ud = /^[0-9A-HJKMNP-TV-Z]{26}$/,
  Bd =
    /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/i,
  Hd = /^[a-z0-9_-]{21}$/i,
  Wd =
    /^[-+]?P(?!$)(?:(?:[-+]?\d+Y)|(?:[-+]?\d+[.,]\d+Y$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:(?:[-+]?\d+W)|(?:[-+]?\d+[.,]\d+W$))?(?:(?:[-+]?\d+D)|(?:[-+]?\d+[.,]\d+D$))?(?:T(?=[\d+-])(?:(?:[-+]?\d+H)|(?:[-+]?\d+[.,]\d+H$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:[-+]?\d+(?:[.,]\d+)?S)?)??$/,
  Gd =
    /^(?!\.)(?!.*\.\.)([A-Z0-9_'+\-\.]*)[A-Z0-9_+-]@([A-Z0-9][A-Z0-9\-]*\.)+[A-Z]{2,}$/i,
  Kd = "^(\\p{Extended_Pictographic}|\\p{Emoji_Component})+$";
let ks;
const qd =
    /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/,
  Qd =
    /^(([a-f0-9]{1,4}:){7}|::([a-f0-9]{1,4}:){0,6}|([a-f0-9]{1,4}:){1}:([a-f0-9]{1,4}:){0,5}|([a-f0-9]{1,4}:){2}:([a-f0-9]{1,4}:){0,4}|([a-f0-9]{1,4}:){3}:([a-f0-9]{1,4}:){0,3}|([a-f0-9]{1,4}:){4}:([a-f0-9]{1,4}:){0,2}|([a-f0-9]{1,4}:){5}:([a-f0-9]{1,4}:){0,1})([a-f0-9]{1,4}|(((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2}))\.){3}((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2})))$/,
  Jd = /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/,
  Rl =
    "((\\d\\d[2468][048]|\\d\\d[13579][26]|\\d\\d0[48]|[02468][048]00|[13579][26]00)-02-29|\\d{4}-((0[13578]|1[02])-(0[1-9]|[12]\\d|3[01])|(0[469]|11)-(0[1-9]|[12]\\d|30)|(02)-(0[1-9]|1\\d|2[0-8])))",
  Yd = new RegExp(`^${Rl}$`);
function Ol(e) {
  let t = "([01]\\d|2[0-3]):[0-5]\\d:[0-5]\\d";
  return e.precision
    ? t = `${t}\\.\\d{${e.precision}}`
    : e.precision == null && (t = `${t}(\\.\\d+)?`),
    t;
}
function Xd(e) {
  return new RegExp(`^${Ol(e)}$`);
}
function Il(e) {
  let t = `${Rl}T${Ol(e)}`;
  const n = [];
  return n.push(e.local ? "Z?" : "Z"),
    e.offset && n.push("([+-]\\d{2}:?\\d{2})"),
    t = `${t}(${n.join("|")})`,
    new RegExp(`^${t}$`);
}
function eh(e, t) {
  return !!((t === "v4" || !t) && qd.test(e) ||
    (t === "v6" || !t) && Qd.test(e));
}
class Xe extends Q {
  _parse(t) {
    if (
      this._def.coerce && (t.data = String(t.data)),
        this._getType(t) !== j.string
    ) {
      const o = this._getOrReturnCtx(t);
      return M(o, {
        code: C.invalid_type,
        expected: j.string,
        received: o.parsedType,
      }),
        U;
    }
    const r = new Re();
    let s;
    for (const o of this._def.checks) {
      if (o.kind === "min") {
        t.data.length < o.value &&
          (s = this._getOrReturnCtx(t, s),
            M(s, {
              code: C.too_small,
              minimum: o.value,
              type: "string",
              inclusive: !0,
              exact: !1,
              message: o.message,
            }),
            r.dirty());
      } else if (o.kind === "max") {
        t.data.length > o.value &&
          (s = this._getOrReturnCtx(t, s),
            M(s, {
              code: C.too_big,
              maximum: o.value,
              type: "string",
              inclusive: !0,
              exact: !1,
              message: o.message,
            }),
            r.dirty());
      } else if (o.kind === "length") {
        const i = t.data.length > o.value, a = t.data.length < o.value;
        (i || a) && (s = this._getOrReturnCtx(t, s),
          i
            ? M(s, {
              code: C.too_big,
              maximum: o.value,
              type: "string",
              inclusive: !0,
              exact: !0,
              message: o.message,
            })
            : a &&
              M(s, {
                code: C.too_small,
                minimum: o.value,
                type: "string",
                inclusive: !0,
                exact: !0,
                message: o.message,
              }),
          r.dirty());
      } else if (o.kind === "email") {
        Gd.test(t.data) ||
          (s = this._getOrReturnCtx(t, s),
            M(s, {
              validation: "email",
              code: C.invalid_string,
              message: o.message,
            }),
            r.dirty());
      } else if (o.kind === "emoji") {
        ks || (ks = new RegExp(Kd, "u")),
          ks.test(t.data) ||
          (s = this._getOrReturnCtx(t, s),
            M(s, {
              validation: "emoji",
              code: C.invalid_string,
              message: o.message,
            }),
            r.dirty());
      } else if (o.kind === "uuid") {
        Bd.test(t.data) ||
          (s = this._getOrReturnCtx(t, s),
            M(s, {
              validation: "uuid",
              code: C.invalid_string,
              message: o.message,
            }),
            r.dirty());
      } else if (o.kind === "nanoid") {
        Hd.test(t.data) ||
          (s = this._getOrReturnCtx(t, s),
            M(s, {
              validation: "nanoid",
              code: C.invalid_string,
              message: o.message,
            }),
            r.dirty());
      } else if (o.kind === "cuid") {
        zd.test(t.data) ||
          (s = this._getOrReturnCtx(t, s),
            M(s, {
              validation: "cuid",
              code: C.invalid_string,
              message: o.message,
            }),
            r.dirty());
      } else if (o.kind === "cuid2") {
        Fd.test(t.data) ||
          (s = this._getOrReturnCtx(t, s),
            M(s, {
              validation: "cuid2",
              code: C.invalid_string,
              message: o.message,
            }),
            r.dirty());
      } else if (o.kind === "ulid") {
        Ud.test(t.data) ||
          (s = this._getOrReturnCtx(t, s),
            M(s, {
              validation: "ulid",
              code: C.invalid_string,
              message: o.message,
            }),
            r.dirty());
      } else if (o.kind === "url") {
        try {
          new URL(t.data);
        } catch {
          s = this._getOrReturnCtx(t, s),
            M(s, {
              validation: "url",
              code: C.invalid_string,
              message: o.message,
            }),
            r.dirty();
        }
      } else {o.kind === "regex"
          ? (o.regex.lastIndex = 0,
            o.regex.test(t.data) ||
            (s = this._getOrReturnCtx(t, s),
              M(s, {
                validation: "regex",
                code: C.invalid_string,
                message: o.message,
              }),
              r.dirty()))
          : o.kind === "trim"
          ? t.data = t.data.trim()
          : o.kind === "includes"
          ? t.data.includes(o.value, o.position) ||
            (s = this._getOrReturnCtx(t, s),
              M(s, {
                code: C.invalid_string,
                validation: { includes: o.value, position: o.position },
                message: o.message,
              }),
              r.dirty())
          : o.kind === "toLowerCase"
          ? t.data = t.data.toLowerCase()
          : o.kind === "toUpperCase"
          ? t.data = t.data.toUpperCase()
          : o.kind === "startsWith"
          ? t.data.startsWith(o.value) ||
            (s = this._getOrReturnCtx(t, s),
              M(s, {
                code: C.invalid_string,
                validation: { startsWith: o.value },
                message: o.message,
              }),
              r.dirty())
          : o.kind === "endsWith"
          ? t.data.endsWith(o.value) ||
            (s = this._getOrReturnCtx(t, s),
              M(s, {
                code: C.invalid_string,
                validation: { endsWith: o.value },
                message: o.message,
              }),
              r.dirty())
          : o.kind === "datetime"
          ? Il(o).test(t.data) ||
            (s = this._getOrReturnCtx(t, s),
              M(s, {
                code: C.invalid_string,
                validation: "datetime",
                message: o.message,
              }),
              r.dirty())
          : o.kind === "date"
          ? Yd.test(t.data) ||
            (s = this._getOrReturnCtx(t, s),
              M(s, {
                code: C.invalid_string,
                validation: "date",
                message: o.message,
              }),
              r.dirty())
          : o.kind === "time"
          ? Xd(o).test(t.data) ||
            (s = this._getOrReturnCtx(t, s),
              M(s, {
                code: C.invalid_string,
                validation: "time",
                message: o.message,
              }),
              r.dirty())
          : o.kind === "duration"
          ? Wd.test(t.data) ||
            (s = this._getOrReturnCtx(t, s),
              M(s, {
                validation: "duration",
                code: C.invalid_string,
                message: o.message,
              }),
              r.dirty())
          : o.kind === "ip"
          ? eh(t.data, o.version) ||
            (s = this._getOrReturnCtx(t, s),
              M(s, {
                validation: "ip",
                code: C.invalid_string,
                message: o.message,
              }),
              r.dirty())
          : o.kind === "base64"
          ? Jd.test(t.data) ||
            (s = this._getOrReturnCtx(t, s),
              M(s, {
                validation: "base64",
                code: C.invalid_string,
                message: o.message,
              }),
              r.dirty())
          : te.assertNever(o);}
    }
    return { status: r.value, value: t.data };
  }
  _regex(t, n, r) {
    return this.refinement((s) => t.test(s), {
      validation: n,
      code: C.invalid_string,
      ...D.errToObj(r),
    });
  }
  _addCheck(t) {
    return new Xe({ ...this._def, checks: [...this._def.checks, t] });
  }
  email(t) {
    return this._addCheck({ kind: "email", ...D.errToObj(t) });
  }
  url(t) {
    return this._addCheck({ kind: "url", ...D.errToObj(t) });
  }
  emoji(t) {
    return this._addCheck({ kind: "emoji", ...D.errToObj(t) });
  }
  uuid(t) {
    return this._addCheck({ kind: "uuid", ...D.errToObj(t) });
  }
  nanoid(t) {
    return this._addCheck({ kind: "nanoid", ...D.errToObj(t) });
  }
  cuid(t) {
    return this._addCheck({ kind: "cuid", ...D.errToObj(t) });
  }
  cuid2(t) {
    return this._addCheck({ kind: "cuid2", ...D.errToObj(t) });
  }
  ulid(t) {
    return this._addCheck({ kind: "ulid", ...D.errToObj(t) });
  }
  base64(t) {
    return this._addCheck({ kind: "base64", ...D.errToObj(t) });
  }
  ip(t) {
    return this._addCheck({ kind: "ip", ...D.errToObj(t) });
  }
  datetime(t) {
    var n, r;
    return typeof t == "string"
      ? this._addCheck({
        kind: "datetime",
        precision: null,
        offset: !1,
        local: !1,
        message: t,
      })
      : this._addCheck({
        kind: "datetime",
        precision: typeof (t == null ? void 0 : t.precision) > "u"
          ? null
          : t == null
          ? void 0
          : t.precision,
        offset: (n = t == null ? void 0 : t.offset) !== null && n !== void 0
          ? n
          : !1,
        local: (r = t == null ? void 0 : t.local) !== null && r !== void 0
          ? r
          : !1,
        ...D.errToObj(t == null ? void 0 : t.message),
      });
  }
  date(t) {
    return this._addCheck({ kind: "date", message: t });
  }
  time(t) {
    return typeof t == "string"
      ? this._addCheck({ kind: "time", precision: null, message: t })
      : this._addCheck({
        kind: "time",
        precision: typeof (t == null ? void 0 : t.precision) > "u"
          ? null
          : t == null
          ? void 0
          : t.precision,
        ...D.errToObj(t == null ? void 0 : t.message),
      });
  }
  duration(t) {
    return this._addCheck({ kind: "duration", ...D.errToObj(t) });
  }
  regex(t, n) {
    return this._addCheck({ kind: "regex", regex: t, ...D.errToObj(n) });
  }
  includes(t, n) {
    return this._addCheck({
      kind: "includes",
      value: t,
      position: n == null ? void 0 : n.position,
      ...D.errToObj(n == null ? void 0 : n.message),
    });
  }
  startsWith(t, n) {
    return this._addCheck({ kind: "startsWith", value: t, ...D.errToObj(n) });
  }
  endsWith(t, n) {
    return this._addCheck({ kind: "endsWith", value: t, ...D.errToObj(n) });
  }
  min(t, n) {
    return this._addCheck({ kind: "min", value: t, ...D.errToObj(n) });
  }
  max(t, n) {
    return this._addCheck({ kind: "max", value: t, ...D.errToObj(n) });
  }
  length(t, n) {
    return this._addCheck({ kind: "length", value: t, ...D.errToObj(n) });
  }
  nonempty(t) {
    return this.min(1, D.errToObj(t));
  }
  trim() {
    return new Xe({
      ...this._def,
      checks: [...this._def.checks, { kind: "trim" }],
    });
  }
  toLowerCase() {
    return new Xe({
      ...this._def,
      checks: [...this._def.checks, { kind: "toLowerCase" }],
    });
  }
  toUpperCase() {
    return new Xe({
      ...this._def,
      checks: [...this._def.checks, { kind: "toUpperCase" }],
    });
  }
  get isDatetime() {
    return !!this._def.checks.find((t) => t.kind === "datetime");
  }
  get isDate() {
    return !!this._def.checks.find((t) => t.kind === "date");
  }
  get isTime() {
    return !!this._def.checks.find((t) => t.kind === "time");
  }
  get isDuration() {
    return !!this._def.checks.find((t) => t.kind === "duration");
  }
  get isEmail() {
    return !!this._def.checks.find((t) => t.kind === "email");
  }
  get isURL() {
    return !!this._def.checks.find((t) => t.kind === "url");
  }
  get isEmoji() {
    return !!this._def.checks.find((t) => t.kind === "emoji");
  }
  get isUUID() {
    return !!this._def.checks.find((t) => t.kind === "uuid");
  }
  get isNANOID() {
    return !!this._def.checks.find((t) => t.kind === "nanoid");
  }
  get isCUID() {
    return !!this._def.checks.find((t) => t.kind === "cuid");
  }
  get isCUID2() {
    return !!this._def.checks.find((t) => t.kind === "cuid2");
  }
  get isULID() {
    return !!this._def.checks.find((t) => t.kind === "ulid");
  }
  get isIP() {
    return !!this._def.checks.find((t) => t.kind === "ip");
  }
  get isBase64() {
    return !!this._def.checks.find((t) => t.kind === "base64");
  }
  get minLength() {
    let t = null;
    for (const n of this._def.checks) {
      n.kind === "min" && (t === null || n.value > t) && (t = n.value);
    }
    return t;
  }
  get maxLength() {
    let t = null;
    for (const n of this._def.checks) {
      n.kind === "max" && (t === null || n.value < t) && (t = n.value);
    }
    return t;
  }
}
Xe.create = (e) => {
  var t;
  return new Xe({
    checks: [],
    typeName: F.ZodString,
    coerce: (t = e == null ? void 0 : e.coerce) !== null && t !== void 0
      ? t
      : !1,
    ...K(e),
  });
};
function th(e, t) {
  const n = (e.toString().split(".")[1] || "").length,
    r = (t.toString().split(".")[1] || "").length,
    s = n > r ? n : r,
    o = parseInt(e.toFixed(s).replace(".", "")),
    i = parseInt(t.toFixed(s).replace(".", ""));
  return o % i / Math.pow(10, s);
}
class Lt extends Q {
  constructor() {
    super(...arguments),
      this.min = this.gte,
      this.max = this.lte,
      this.step = this.multipleOf;
  }
  _parse(t) {
    if (
      this._def.coerce && (t.data = Number(t.data)),
        this._getType(t) !== j.number
    ) {
      const o = this._getOrReturnCtx(t);
      return M(o, {
        code: C.invalid_type,
        expected: j.number,
        received: o.parsedType,
      }),
        U;
    }
    let r;
    const s = new Re();
    for (const o of this._def.checks) {
      o.kind === "int"
        ? te.isInteger(t.data) ||
          (r = this._getOrReturnCtx(t, r),
            M(r, {
              code: C.invalid_type,
              expected: "integer",
              received: "float",
              message: o.message,
            }),
            s.dirty())
        : o.kind === "min"
        ? (o.inclusive ? t.data < o.value : t.data <= o.value) &&
          (r = this._getOrReturnCtx(t, r),
            M(r, {
              code: C.too_small,
              minimum: o.value,
              type: "number",
              inclusive: o.inclusive,
              exact: !1,
              message: o.message,
            }),
            s.dirty())
        : o.kind === "max"
        ? (o.inclusive ? t.data > o.value : t.data >= o.value) &&
          (r = this._getOrReturnCtx(t, r),
            M(r, {
              code: C.too_big,
              maximum: o.value,
              type: "number",
              inclusive: o.inclusive,
              exact: !1,
              message: o.message,
            }),
            s.dirty())
        : o.kind === "multipleOf"
        ? th(t.data, o.value) !== 0 &&
          (r = this._getOrReturnCtx(t, r),
            M(r, {
              code: C.not_multiple_of,
              multipleOf: o.value,
              message: o.message,
            }),
            s.dirty())
        : o.kind === "finite"
        ? Number.isFinite(t.data) ||
          (r = this._getOrReturnCtx(t, r),
            M(r, { code: C.not_finite, message: o.message }),
            s.dirty())
        : te.assertNever(o);
    }
    return { status: s.value, value: t.data };
  }
  gte(t, n) {
    return this.setLimit("min", t, !0, D.toString(n));
  }
  gt(t, n) {
    return this.setLimit("min", t, !1, D.toString(n));
  }
  lte(t, n) {
    return this.setLimit("max", t, !0, D.toString(n));
  }
  lt(t, n) {
    return this.setLimit("max", t, !1, D.toString(n));
  }
  setLimit(t, n, r, s) {
    return new Lt({
      ...this._def,
      checks: [...this._def.checks, {
        kind: t,
        value: n,
        inclusive: r,
        message: D.toString(s),
      }],
    });
  }
  _addCheck(t) {
    return new Lt({ ...this._def, checks: [...this._def.checks, t] });
  }
  int(t) {
    return this._addCheck({ kind: "int", message: D.toString(t) });
  }
  positive(t) {
    return this._addCheck({
      kind: "min",
      value: 0,
      inclusive: !1,
      message: D.toString(t),
    });
  }
  negative(t) {
    return this._addCheck({
      kind: "max",
      value: 0,
      inclusive: !1,
      message: D.toString(t),
    });
  }
  nonpositive(t) {
    return this._addCheck({
      kind: "max",
      value: 0,
      inclusive: !0,
      message: D.toString(t),
    });
  }
  nonnegative(t) {
    return this._addCheck({
      kind: "min",
      value: 0,
      inclusive: !0,
      message: D.toString(t),
    });
  }
  multipleOf(t, n) {
    return this._addCheck({
      kind: "multipleOf",
      value: t,
      message: D.toString(n),
    });
  }
  finite(t) {
    return this._addCheck({ kind: "finite", message: D.toString(t) });
  }
  safe(t) {
    return this._addCheck({
      kind: "min",
      inclusive: !0,
      value: Number.MIN_SAFE_INTEGER,
      message: D.toString(t),
    })._addCheck({
      kind: "max",
      inclusive: !0,
      value: Number.MAX_SAFE_INTEGER,
      message: D.toString(t),
    });
  }
  get minValue() {
    let t = null;
    for (const n of this._def.checks) {
      n.kind === "min" && (t === null || n.value > t) && (t = n.value);
    }
    return t;
  }
  get maxValue() {
    let t = null;
    for (const n of this._def.checks) {
      n.kind === "max" && (t === null || n.value < t) && (t = n.value);
    }
    return t;
  }
  get isInt() {
    return !!this._def.checks.find((t) =>
      t.kind === "int" || t.kind === "multipleOf" && te.isInteger(t.value)
    );
  }
  get isFinite() {
    let t = null, n = null;
    for (const r of this._def.checks) {
      if (r.kind === "finite" || r.kind === "int" || r.kind === "multipleOf") {
        return !0;
      }
      r.kind === "min"
        ? (n === null || r.value > n) && (n = r.value)
        : r.kind === "max" && (t === null || r.value < t) && (t = r.value);
    }
    return Number.isFinite(n) && Number.isFinite(t);
  }
}
Lt.create = (e) =>
  new Lt({
    checks: [],
    typeName: F.ZodNumber,
    coerce: (e == null ? void 0 : e.coerce) || !1,
    ...K(e),
  });
class Zt extends Q {
  constructor() {
    super(...arguments), this.min = this.gte, this.max = this.lte;
  }
  _parse(t) {
    if (
      this._def.coerce && (t.data = BigInt(t.data)),
        this._getType(t) !== j.bigint
    ) {
      const o = this._getOrReturnCtx(t);
      return M(o, {
        code: C.invalid_type,
        expected: j.bigint,
        received: o.parsedType,
      }),
        U;
    }
    let r;
    const s = new Re();
    for (const o of this._def.checks) {
      o.kind === "min"
        ? (o.inclusive ? t.data < o.value : t.data <= o.value) &&
          (r = this._getOrReturnCtx(t, r),
            M(r, {
              code: C.too_small,
              type: "bigint",
              minimum: o.value,
              inclusive: o.inclusive,
              message: o.message,
            }),
            s.dirty())
        : o.kind === "max"
        ? (o.inclusive ? t.data > o.value : t.data >= o.value) &&
          (r = this._getOrReturnCtx(t, r),
            M(r, {
              code: C.too_big,
              type: "bigint",
              maximum: o.value,
              inclusive: o.inclusive,
              message: o.message,
            }),
            s.dirty())
        : o.kind === "multipleOf"
        ? t.data % o.value !== BigInt(0) &&
          (r = this._getOrReturnCtx(t, r),
            M(r, {
              code: C.not_multiple_of,
              multipleOf: o.value,
              message: o.message,
            }),
            s.dirty())
        : te.assertNever(o);
    }
    return { status: s.value, value: t.data };
  }
  gte(t, n) {
    return this.setLimit("min", t, !0, D.toString(n));
  }
  gt(t, n) {
    return this.setLimit("min", t, !1, D.toString(n));
  }
  lte(t, n) {
    return this.setLimit("max", t, !0, D.toString(n));
  }
  lt(t, n) {
    return this.setLimit("max", t, !1, D.toString(n));
  }
  setLimit(t, n, r, s) {
    return new Zt({
      ...this._def,
      checks: [...this._def.checks, {
        kind: t,
        value: n,
        inclusive: r,
        message: D.toString(s),
      }],
    });
  }
  _addCheck(t) {
    return new Zt({ ...this._def, checks: [...this._def.checks, t] });
  }
  positive(t) {
    return this._addCheck({
      kind: "min",
      value: BigInt(0),
      inclusive: !1,
      message: D.toString(t),
    });
  }
  negative(t) {
    return this._addCheck({
      kind: "max",
      value: BigInt(0),
      inclusive: !1,
      message: D.toString(t),
    });
  }
  nonpositive(t) {
    return this._addCheck({
      kind: "max",
      value: BigInt(0),
      inclusive: !0,
      message: D.toString(t),
    });
  }
  nonnegative(t) {
    return this._addCheck({
      kind: "min",
      value: BigInt(0),
      inclusive: !0,
      message: D.toString(t),
    });
  }
  multipleOf(t, n) {
    return this._addCheck({
      kind: "multipleOf",
      value: t,
      message: D.toString(n),
    });
  }
  get minValue() {
    let t = null;
    for (const n of this._def.checks) {
      n.kind === "min" && (t === null || n.value > t) && (t = n.value);
    }
    return t;
  }
  get maxValue() {
    let t = null;
    for (const n of this._def.checks) {
      n.kind === "max" && (t === null || n.value < t) && (t = n.value);
    }
    return t;
  }
}
Zt.create = (e) => {
  var t;
  return new Zt({
    checks: [],
    typeName: F.ZodBigInt,
    coerce: (t = e == null ? void 0 : e.coerce) !== null && t !== void 0
      ? t
      : !1,
    ...K(e),
  });
};
class tr extends Q {
  _parse(t) {
    if (
      this._def.coerce && (t.data = !!t.data), this._getType(t) !== j.boolean
    ) {
      const r = this._getOrReturnCtx(t);
      return M(r, {
        code: C.invalid_type,
        expected: j.boolean,
        received: r.parsedType,
      }),
        U;
    }
    return $e(t.data);
  }
}
tr.create = (e) =>
  new tr({
    typeName: F.ZodBoolean,
    coerce: (e == null ? void 0 : e.coerce) || !1,
    ...K(e),
  });
class Xt extends Q {
  _parse(t) {
    if (
      this._def.coerce && (t.data = new Date(t.data)),
        this._getType(t) !== j.date
    ) {
      const o = this._getOrReturnCtx(t);
      return M(o, {
        code: C.invalid_type,
        expected: j.date,
        received: o.parsedType,
      }),
        U;
    }
    if (isNaN(t.data.getTime())) {
      const o = this._getOrReturnCtx(t);
      return M(o, { code: C.invalid_date }), U;
    }
    const r = new Re();
    let s;
    for (const o of this._def.checks) {
      o.kind === "min"
        ? t.data.getTime() < o.value &&
          (s = this._getOrReturnCtx(t, s),
            M(s, {
              code: C.too_small,
              message: o.message,
              inclusive: !0,
              exact: !1,
              minimum: o.value,
              type: "date",
            }),
            r.dirty())
        : o.kind === "max"
        ? t.data.getTime() > o.value &&
          (s = this._getOrReturnCtx(t, s),
            M(s, {
              code: C.too_big,
              message: o.message,
              inclusive: !0,
              exact: !1,
              maximum: o.value,
              type: "date",
            }),
            r.dirty())
        : te.assertNever(o);
    }
    return { status: r.value, value: new Date(t.data.getTime()) };
  }
  _addCheck(t) {
    return new Xt({ ...this._def, checks: [...this._def.checks, t] });
  }
  min(t, n) {
    return this._addCheck({
      kind: "min",
      value: t.getTime(),
      message: D.toString(n),
    });
  }
  max(t, n) {
    return this._addCheck({
      kind: "max",
      value: t.getTime(),
      message: D.toString(n),
    });
  }
  get minDate() {
    let t = null;
    for (const n of this._def.checks) {
      n.kind === "min" && (t === null || n.value > t) && (t = n.value);
    }
    return t != null ? new Date(t) : null;
  }
  get maxDate() {
    let t = null;
    for (const n of this._def.checks) {
      n.kind === "max" && (t === null || n.value < t) && (t = n.value);
    }
    return t != null ? new Date(t) : null;
  }
}
Xt.create = (e) =>
  new Xt({
    checks: [],
    coerce: (e == null ? void 0 : e.coerce) || !1,
    typeName: F.ZodDate,
    ...K(e),
  });
class Ur extends Q {
  _parse(t) {
    if (this._getType(t) !== j.symbol) {
      const r = this._getOrReturnCtx(t);
      return M(r, {
        code: C.invalid_type,
        expected: j.symbol,
        received: r.parsedType,
      }),
        U;
    }
    return $e(t.data);
  }
}
Ur.create = (e) => new Ur({ typeName: F.ZodSymbol, ...K(e) });
class nr extends Q {
  _parse(t) {
    if (this._getType(t) !== j.undefined) {
      const r = this._getOrReturnCtx(t);
      return M(r, {
        code: C.invalid_type,
        expected: j.undefined,
        received: r.parsedType,
      }),
        U;
    }
    return $e(t.data);
  }
}
nr.create = (e) => new nr({ typeName: F.ZodUndefined, ...K(e) });
class rr extends Q {
  _parse(t) {
    if (this._getType(t) !== j.null) {
      const r = this._getOrReturnCtx(t);
      return M(r, {
        code: C.invalid_type,
        expected: j.null,
        received: r.parsedType,
      }),
        U;
    }
    return $e(t.data);
  }
}
rr.create = (e) => new rr({ typeName: F.ZodNull, ...K(e) });
class Sn extends Q {
  constructor() {
    super(...arguments), this._any = !0;
  }
  _parse(t) {
    return $e(t.data);
  }
}
Sn.create = (e) => new Sn({ typeName: F.ZodAny, ...K(e) });
class qt extends Q {
  constructor() {
    super(...arguments), this._unknown = !0;
  }
  _parse(t) {
    return $e(t.data);
  }
}
qt.create = (e) => new qt({ typeName: F.ZodUnknown, ...K(e) });
class St extends Q {
  _parse(t) {
    const n = this._getOrReturnCtx(t);
    return M(n, {
      code: C.invalid_type,
      expected: j.never,
      received: n.parsedType,
    }),
      U;
  }
}
St.create = (e) => new St({ typeName: F.ZodNever, ...K(e) });
class Br extends Q {
  _parse(t) {
    if (this._getType(t) !== j.undefined) {
      const r = this._getOrReturnCtx(t);
      return M(r, {
        code: C.invalid_type,
        expected: j.void,
        received: r.parsedType,
      }),
        U;
    }
    return $e(t.data);
  }
}
Br.create = (e) => new Br({ typeName: F.ZodVoid, ...K(e) });
class nt extends Q {
  _parse(t) {
    const { ctx: n, status: r } = this._processInputParams(t), s = this._def;
    if (n.parsedType !== j.array) {
      return M(n, {
        code: C.invalid_type,
        expected: j.array,
        received: n.parsedType,
      }),
        U;
    }
    if (s.exactLength !== null) {
      const i = n.data.length > s.exactLength.value,
        a = n.data.length < s.exactLength.value;
      (i || a) && (M(n, {
        code: i ? C.too_big : C.too_small,
        minimum: a ? s.exactLength.value : void 0,
        maximum: i ? s.exactLength.value : void 0,
        type: "array",
        inclusive: !0,
        exact: !0,
        message: s.exactLength.message,
      }),
        r.dirty());
    }
    if (
      s.minLength !== null && n.data.length < s.minLength.value &&
      (M(n, {
        code: C.too_small,
        minimum: s.minLength.value,
        type: "array",
        inclusive: !0,
        exact: !1,
        message: s.minLength.message,
      }),
        r.dirty()),
        s.maxLength !== null && n.data.length > s.maxLength.value &&
        (M(n, {
          code: C.too_big,
          maximum: s.maxLength.value,
          type: "array",
          inclusive: !0,
          exact: !1,
          message: s.maxLength.message,
        }),
          r.dirty()),
        n.common.async
    ) {
      return Promise.all(
        [...n.data].map((i, a) => s.type._parseAsync(new ht(n, i, n.path, a))),
      ).then((i) => Re.mergeArray(r, i));
    }
    const o = [...n.data].map((i, a) =>
      s.type._parseSync(new ht(n, i, n.path, a))
    );
    return Re.mergeArray(r, o);
  }
  get element() {
    return this._def.type;
  }
  min(t, n) {
    return new nt({
      ...this._def,
      minLength: { value: t, message: D.toString(n) },
    });
  }
  max(t, n) {
    return new nt({
      ...this._def,
      maxLength: { value: t, message: D.toString(n) },
    });
  }
  length(t, n) {
    return new nt({
      ...this._def,
      exactLength: { value: t, message: D.toString(n) },
    });
  }
  nonempty(t) {
    return this.min(1, t);
  }
}
nt.create = (e, t) =>
  new nt({
    type: e,
    minLength: null,
    maxLength: null,
    exactLength: null,
    typeName: F.ZodArray,
    ...K(t),
  });
function un(e) {
  if (e instanceof me) {
    const t = {};
    for (const n in e.shape) {
      const r = e.shape[n];
      t[n] = ft.create(un(r));
    }
    return new me({ ...e._def, shape: () => t });
  } else {return e instanceof nt
      ? new nt({ ...e._def, type: un(e.element) })
      : e instanceof ft
      ? ft.create(un(e.unwrap()))
      : e instanceof Vt
      ? Vt.create(un(e.unwrap()))
      : e instanceof pt
      ? pt.create(e.items.map((t) => un(t)))
      : e;}
}
class me extends Q {
  constructor() {
    super(...arguments),
      this._cached = null,
      this.nonstrict = this.passthrough,
      this.augment = this.extend;
  }
  _getCached() {
    if (this._cached !== null) return this._cached;
    const t = this._def.shape(), n = te.objectKeys(t);
    return this._cached = { shape: t, keys: n };
  }
  _parse(t) {
    if (this._getType(t) !== j.object) {
      const c = this._getOrReturnCtx(t);
      return M(c, {
        code: C.invalid_type,
        expected: j.object,
        received: c.parsedType,
      }),
        U;
    }
    const { status: r, ctx: s } = this._processInputParams(t),
      { shape: o, keys: i } = this._getCached(),
      a = [];
    if (
      !(this._def.catchall instanceof St && this._def.unknownKeys === "strip")
    ) { for (const c in s.data) i.includes(c) || a.push(c); }
    const l = [];
    for (const c of i) {
      const u = o[c], f = s.data[c];
      l.push({
        key: { status: "valid", value: c },
        value: u._parse(new ht(s, f, s.path, c)),
        alwaysSet: c in s.data,
      });
    }
    if (this._def.catchall instanceof St) {
      const c = this._def.unknownKeys;
      if (c === "passthrough") {
        for (const u of a) {
          l.push({
            key: { status: "valid", value: u },
            value: { status: "valid", value: s.data[u] },
          });
        }
      } else if (c === "strict") {
        a.length > 0 &&
          (M(s, { code: C.unrecognized_keys, keys: a }), r.dirty());
      } else if (c !== "strip") {
        throw new Error("Internal ZodObject error: invalid unknownKeys value.");
      }
    } else {
      const c = this._def.catchall;
      for (const u of a) {
        const f = s.data[u];
        l.push({
          key: { status: "valid", value: u },
          value: c._parse(new ht(s, f, s.path, u)),
          alwaysSet: u in s.data,
        });
      }
    }
    return s.common.async
      ? Promise.resolve().then(async () => {
        const c = [];
        for (const u of l) {
          const f = await u.key, p = await u.value;
          c.push({ key: f, value: p, alwaysSet: u.alwaysSet });
        }
        return c;
      }).then((c) => Re.mergeObjectSync(r, c))
      : Re.mergeObjectSync(r, l);
  }
  get shape() {
    return this._def.shape();
  }
  strict(t) {
    return D.errToObj,
      new me({
        ...this._def,
        unknownKeys: "strict",
        ...t !== void 0
          ? {
            errorMap: (n, r) => {
              var s, o, i, a;
              const l =
                (i = (o = (s = this._def).errorMap) === null || o === void 0
                      ? void 0
                      : o.call(s, n, r).message) !== null && i !== void 0
                  ? i
                  : r.defaultError;
              return n.code === "unrecognized_keys"
                ? {
                  message: (a = D.errToObj(t).message) !== null && a !== void 0
                    ? a
                    : l,
                }
                : { message: l };
            },
          }
          : {},
      });
  }
  strip() {
    return new me({ ...this._def, unknownKeys: "strip" });
  }
  passthrough() {
    return new me({ ...this._def, unknownKeys: "passthrough" });
  }
  extend(t) {
    return new me({
      ...this._def,
      shape: () => ({ ...this._def.shape(), ...t }),
    });
  }
  merge(t) {
    return new me({
      unknownKeys: t._def.unknownKeys,
      catchall: t._def.catchall,
      shape: () => ({ ...this._def.shape(), ...t._def.shape() }),
      typeName: F.ZodObject,
    });
  }
  setKey(t, n) {
    return this.augment({ [t]: n });
  }
  catchall(t) {
    return new me({ ...this._def, catchall: t });
  }
  pick(t) {
    const n = {};
    return te.objectKeys(t).forEach((r) => {
      t[r] && this.shape[r] && (n[r] = this.shape[r]);
    }),
      new me({ ...this._def, shape: () => n });
  }
  omit(t) {
    const n = {};
    return te.objectKeys(this.shape).forEach((r) => {
      t[r] || (n[r] = this.shape[r]);
    }),
      new me({ ...this._def, shape: () => n });
  }
  deepPartial() {
    return un(this);
  }
  partial(t) {
    const n = {};
    return te.objectKeys(this.shape).forEach((r) => {
      const s = this.shape[r];
      t && !t[r] ? n[r] = s : n[r] = s.optional();
    }),
      new me({ ...this._def, shape: () => n });
  }
  required(t) {
    const n = {};
    return te.objectKeys(this.shape).forEach((r) => {
      if (t && !t[r]) n[r] = this.shape[r];
      else {
        let o = this.shape[r];
        for (; o instanceof ft;) o = o._def.innerType;
        n[r] = o;
      }
    }),
      new me({ ...this._def, shape: () => n });
  }
  keyof() {
    return Al(te.objectKeys(this.shape));
  }
}
me.create = (e, t) =>
  new me({
    shape: () => e,
    unknownKeys: "strip",
    catchall: St.create(),
    typeName: F.ZodObject,
    ...K(t),
  });
me.strictCreate = (e, t) =>
  new me({
    shape: () => e,
    unknownKeys: "strict",
    catchall: St.create(),
    typeName: F.ZodObject,
    ...K(t),
  });
me.lazycreate = (e, t) =>
  new me({
    shape: e,
    unknownKeys: "strip",
    catchall: St.create(),
    typeName: F.ZodObject,
    ...K(t),
  });
class sr extends Q {
  _parse(t) {
    const { ctx: n } = this._processInputParams(t), r = this._def.options;
    function s(o) {
      for (const a of o) if (a.result.status === "valid") return a.result;
      for (const a of o) {
        if (a.result.status === "dirty") {
          return n.common.issues.push(...a.ctx.common.issues), a.result;
        }
      }
      const i = o.map((a) => new We(a.ctx.common.issues));
      return M(n, { code: C.invalid_union, unionErrors: i }), U;
    }
    if (n.common.async) {
      return Promise.all(r.map(async (o) => {
        const i = { ...n, common: { ...n.common, issues: [] }, parent: null };
        return {
          result: await o._parseAsync({
            data: n.data,
            path: n.path,
            parent: i,
          }),
          ctx: i,
        };
      })).then(s);
    }
    {
      let o;
      const i = [];
      for (const l of r) {
        const c = { ...n, common: { ...n.common, issues: [] }, parent: null },
          u = l._parseSync({ data: n.data, path: n.path, parent: c });
        if (u.status === "valid") return u;
        u.status === "dirty" && !o && (o = { result: u, ctx: c }),
          c.common.issues.length && i.push(c.common.issues);
      }
      if (o) return n.common.issues.push(...o.ctx.common.issues), o.result;
      const a = i.map((l) => new We(l));
      return M(n, { code: C.invalid_union, unionErrors: a }), U;
    }
  }
  get options() {
    return this._def.options;
  }
}
sr.create = (e, t) => new sr({ options: e, typeName: F.ZodUnion, ...K(t) });
const bt = (e) =>
  e instanceof ar
    ? bt(e.schema)
    : e instanceof st
    ? bt(e.innerType())
    : e instanceof lr
    ? [e.value]
    : e instanceof Dt
    ? e.options
    : e instanceof cr
    ? te.objectValues(e.enum)
    : e instanceof ur
    ? bt(e._def.innerType)
    : e instanceof nr
    ? [void 0]
    : e instanceof rr
    ? [null]
    : e instanceof ft
    ? [void 0, ...bt(e.unwrap())]
    : e instanceof Vt
    ? [null, ...bt(e.unwrap())]
    : e instanceof Oo || e instanceof dr
    ? bt(e.unwrap())
    : e instanceof fr
    ? bt(e._def.innerType)
    : [];
class is extends Q {
  _parse(t) {
    const { ctx: n } = this._processInputParams(t);
    if (n.parsedType !== j.object) {
      return M(n, {
        code: C.invalid_type,
        expected: j.object,
        received: n.parsedType,
      }),
        U;
    }
    const r = this.discriminator, s = n.data[r], o = this.optionsMap.get(s);
    return o
      ? n.common.async
        ? o._parseAsync({ data: n.data, path: n.path, parent: n })
        : o._parseSync({ data: n.data, path: n.path, parent: n })
      : (M(n, {
        code: C.invalid_union_discriminator,
        options: Array.from(this.optionsMap.keys()),
        path: [r],
      }),
        U);
  }
  get discriminator() {
    return this._def.discriminator;
  }
  get options() {
    return this._def.options;
  }
  get optionsMap() {
    return this._def.optionsMap;
  }
  static create(t, n, r) {
    const s = new Map();
    for (const o of n) {
      const i = bt(o.shape[t]);
      if (!i.length) {
        throw new Error(
          `A discriminator value for key \`${t}\` could not be extracted from all schema options`,
        );
      }
      for (const a of i) {
        if (s.has(a)) {
          throw new Error(
            `Discriminator property ${String(t)} has duplicate value ${
              String(a)
            }`,
          );
        }
        s.set(a, o);
      }
    }
    return new is({
      typeName: F.ZodDiscriminatedUnion,
      discriminator: t,
      options: n,
      optionsMap: s,
      ...K(r),
    });
  }
}
function Ks(e, t) {
  const n = Nt(e), r = Nt(t);
  if (e === t) return { valid: !0, data: e };
  if (n === j.object && r === j.object) {
    const s = te.objectKeys(t),
      o = te.objectKeys(e).filter((a) => s.indexOf(a) !== -1),
      i = { ...e, ...t };
    for (const a of o) {
      const l = Ks(e[a], t[a]);
      if (!l.valid) return { valid: !1 };
      i[a] = l.data;
    }
    return { valid: !0, data: i };
  } else if (n === j.array && r === j.array) {
    if (e.length !== t.length) return { valid: !1 };
    const s = [];
    for (let o = 0; o < e.length; o++) {
      const i = e[o], a = t[o], l = Ks(i, a);
      if (!l.valid) return { valid: !1 };
      s.push(l.data);
    }
    return { valid: !0, data: s };
  } else {return n === j.date && r === j.date && +e == +t
      ? { valid: !0, data: e }
      : { valid: !1 };}
}
class or extends Q {
  _parse(t) {
    const { status: n, ctx: r } = this._processInputParams(t),
      s = (o, i) => {
        if (Ws(o) || Ws(i)) return U;
        const a = Ks(o.value, i.value);
        return a.valid
          ? ((Gs(o) || Gs(i)) && n.dirty(), { status: n.value, value: a.data })
          : (M(r, { code: C.invalid_intersection_types }), U);
      };
    return r.common.async
      ? Promise.all([
        this._def.left._parseAsync({ data: r.data, path: r.path, parent: r }),
        this._def.right._parseAsync({ data: r.data, path: r.path, parent: r }),
      ]).then(([o, i]) => s(o, i))
      : s(
        this._def.left._parseSync({ data: r.data, path: r.path, parent: r }),
        this._def.right._parseSync({ data: r.data, path: r.path, parent: r }),
      );
  }
}
or.create = (e, t, n) =>
  new or({ left: e, right: t, typeName: F.ZodIntersection, ...K(n) });
class pt extends Q {
  _parse(t) {
    const { status: n, ctx: r } = this._processInputParams(t);
    if (r.parsedType !== j.array) {
      return M(r, {
        code: C.invalid_type,
        expected: j.array,
        received: r.parsedType,
      }),
        U;
    }
    if (r.data.length < this._def.items.length) {
      return M(r, {
        code: C.too_small,
        minimum: this._def.items.length,
        inclusive: !0,
        exact: !1,
        type: "array",
      }),
        U;
    }
    !this._def.rest && r.data.length > this._def.items.length &&
      (M(r, {
        code: C.too_big,
        maximum: this._def.items.length,
        inclusive: !0,
        exact: !1,
        type: "array",
      }),
        n.dirty());
    const o = [...r.data].map((i, a) => {
      const l = this._def.items[a] || this._def.rest;
      return l ? l._parse(new ht(r, i, r.path, a)) : null;
    }).filter((i) => !!i);
    return r.common.async
      ? Promise.all(o).then((i) => Re.mergeArray(n, i))
      : Re.mergeArray(n, o);
  }
  get items() {
    return this._def.items;
  }
  rest(t) {
    return new pt({ ...this._def, rest: t });
  }
}
pt.create = (e, t) => {
  if (!Array.isArray(e)) {
    throw new Error("You must pass an array of schemas to z.tuple([ ... ])");
  }
  return new pt({ items: e, typeName: F.ZodTuple, rest: null, ...K(t) });
};
class ir extends Q {
  get keySchema() {
    return this._def.keyType;
  }
  get valueSchema() {
    return this._def.valueType;
  }
  _parse(t) {
    const { status: n, ctx: r } = this._processInputParams(t);
    if (r.parsedType !== j.object) {
      return M(r, {
        code: C.invalid_type,
        expected: j.object,
        received: r.parsedType,
      }),
        U;
    }
    const s = [], o = this._def.keyType, i = this._def.valueType;
    for (const a in r.data) {
      s.push({
        key: o._parse(new ht(r, a, r.path, a)),
        value: i._parse(new ht(r, r.data[a], r.path, a)),
        alwaysSet: a in r.data,
      });
    }
    return r.common.async
      ? Re.mergeObjectAsync(n, s)
      : Re.mergeObjectSync(n, s);
  }
  get element() {
    return this._def.valueType;
  }
  static create(t, n, r) {
    return n instanceof Q
      ? new ir({ keyType: t, valueType: n, typeName: F.ZodRecord, ...K(r) })
      : new ir({
        keyType: Xe.create(),
        valueType: t,
        typeName: F.ZodRecord,
        ...K(n),
      });
  }
}
class Hr extends Q {
  get keySchema() {
    return this._def.keyType;
  }
  get valueSchema() {
    return this._def.valueType;
  }
  _parse(t) {
    const { status: n, ctx: r } = this._processInputParams(t);
    if (r.parsedType !== j.map) {
      return M(r, {
        code: C.invalid_type,
        expected: j.map,
        received: r.parsedType,
      }),
        U;
    }
    const s = this._def.keyType,
      o = this._def.valueType,
      i = [...r.data.entries()].map(([a, l], c) => ({
        key: s._parse(new ht(r, a, r.path, [c, "key"])),
        value: o._parse(new ht(r, l, r.path, [c, "value"])),
      }));
    if (r.common.async) {
      const a = new Map();
      return Promise.resolve().then(async () => {
        for (const l of i) {
          const c = await l.key, u = await l.value;
          if (c.status === "aborted" || u.status === "aborted") return U;
          (c.status === "dirty" || u.status === "dirty") && n.dirty(),
            a.set(c.value, u.value);
        }
        return { status: n.value, value: a };
      });
    } else {
      const a = new Map();
      for (const l of i) {
        const c = l.key, u = l.value;
        if (c.status === "aborted" || u.status === "aborted") return U;
        (c.status === "dirty" || u.status === "dirty") && n.dirty(),
          a.set(c.value, u.value);
      }
      return { status: n.value, value: a };
    }
  }
}
Hr.create = (e, t, n) =>
  new Hr({ valueType: t, keyType: e, typeName: F.ZodMap, ...K(n) });
class en extends Q {
  _parse(t) {
    const { status: n, ctx: r } = this._processInputParams(t);
    if (r.parsedType !== j.set) {
      return M(r, {
        code: C.invalid_type,
        expected: j.set,
        received: r.parsedType,
      }),
        U;
    }
    const s = this._def;
    s.minSize !== null && r.data.size < s.minSize.value &&
    (M(r, {
      code: C.too_small,
      minimum: s.minSize.value,
      type: "set",
      inclusive: !0,
      exact: !1,
      message: s.minSize.message,
    }),
      n.dirty()),
      s.maxSize !== null && r.data.size > s.maxSize.value &&
      (M(r, {
        code: C.too_big,
        maximum: s.maxSize.value,
        type: "set",
        inclusive: !0,
        exact: !1,
        message: s.maxSize.message,
      }),
        n.dirty());
    const o = this._def.valueType;
    function i(l) {
      const c = new Set();
      for (const u of l) {
        if (u.status === "aborted") return U;
        u.status === "dirty" && n.dirty(), c.add(u.value);
      }
      return { status: n.value, value: c };
    }
    const a = [...r.data.values()].map((l, c) =>
      o._parse(new ht(r, l, r.path, c))
    );
    return r.common.async ? Promise.all(a).then((l) => i(l)) : i(a);
  }
  min(t, n) {
    return new en({
      ...this._def,
      minSize: { value: t, message: D.toString(n) },
    });
  }
  max(t, n) {
    return new en({
      ...this._def,
      maxSize: { value: t, message: D.toString(n) },
    });
  }
  size(t, n) {
    return this.min(t, n).max(t, n);
  }
  nonempty(t) {
    return this.min(1, t);
  }
}
en.create = (e, t) =>
  new en({
    valueType: e,
    minSize: null,
    maxSize: null,
    typeName: F.ZodSet,
    ...K(t),
  });
class vn extends Q {
  constructor() {
    super(...arguments), this.validate = this.implement;
  }
  _parse(t) {
    const { ctx: n } = this._processInputParams(t);
    if (n.parsedType !== j.function) {
      return M(n, {
        code: C.invalid_type,
        expected: j.function,
        received: n.parsedType,
      }),
        U;
    }
    function r(a, l) {
      return zr({
        data: a,
        path: n.path,
        errorMaps: [n.common.contextualErrorMap, n.schemaErrorMap, Vr(), wn]
          .filter((c) => !!c),
        issueData: { code: C.invalid_arguments, argumentsError: l },
      });
    }
    function s(a, l) {
      return zr({
        data: a,
        path: n.path,
        errorMaps: [n.common.contextualErrorMap, n.schemaErrorMap, Vr(), wn]
          .filter((c) => !!c),
        issueData: { code: C.invalid_return_type, returnTypeError: l },
      });
    }
    const o = { errorMap: n.common.contextualErrorMap }, i = n.data;
    if (this._def.returns instanceof Cn) {
      const a = this;
      return $e(async function (...l) {
        const c = new We([]),
          u = await a._def.args.parseAsync(l, o).catch((m) => {
            throw c.addIssue(r(l, m)), c;
          }),
          f = await Reflect.apply(i, this, u);
        return await a._def.returns._def.type.parseAsync(f, o).catch((m) => {
          throw c.addIssue(s(f, m)), c;
        });
      });
    } else {
      const a = this;
      return $e(function (...l) {
        const c = a._def.args.safeParse(l, o);
        if (!c.success) throw new We([r(l, c.error)]);
        const u = Reflect.apply(i, this, c.data),
          f = a._def.returns.safeParse(u, o);
        if (!f.success) throw new We([s(u, f.error)]);
        return f.data;
      });
    }
  }
  parameters() {
    return this._def.args;
  }
  returnType() {
    return this._def.returns;
  }
  args(...t) {
    return new vn({ ...this._def, args: pt.create(t).rest(qt.create()) });
  }
  returns(t) {
    return new vn({ ...this._def, returns: t });
  }
  implement(t) {
    return this.parse(t);
  }
  strictImplement(t) {
    return this.parse(t);
  }
  static create(t, n, r) {
    return new vn({
      args: t || pt.create([]).rest(qt.create()),
      returns: n || qt.create(),
      typeName: F.ZodFunction,
      ...K(r),
    });
  }
}
class ar extends Q {
  get schema() {
    return this._def.getter();
  }
  _parse(t) {
    const { ctx: n } = this._processInputParams(t);
    return this._def.getter()._parse({ data: n.data, path: n.path, parent: n });
  }
}
ar.create = (e, t) => new ar({ getter: e, typeName: F.ZodLazy, ...K(t) });
class lr extends Q {
  _parse(t) {
    if (t.data !== this._def.value) {
      const n = this._getOrReturnCtx(t);
      return M(n, {
        received: n.data,
        code: C.invalid_literal,
        expected: this._def.value,
      }),
        U;
    }
    return { status: "valid", value: t.data };
  }
  get value() {
    return this._def.value;
  }
}
lr.create = (e, t) => new lr({ value: e, typeName: F.ZodLiteral, ...K(t) });
function Al(e, t) {
  return new Dt({ values: e, typeName: F.ZodEnum, ...K(t) });
}
class Dt extends Q {
  constructor() {
    super(...arguments), Nn.set(this, void 0);
  }
  _parse(t) {
    if (typeof t.data != "string") {
      const n = this._getOrReturnCtx(t), r = this._def.values;
      return M(n, {
        expected: te.joinValues(r),
        received: n.parsedType,
        code: C.invalid_type,
      }),
        U;
    }
    if (
      Fr(this, Nn) || Tl(this, Nn, new Set(this._def.values)),
        !Fr(this, Nn).has(t.data)
    ) {
      const n = this._getOrReturnCtx(t), r = this._def.values;
      return M(n, { received: n.data, code: C.invalid_enum_value, options: r }),
        U;
    }
    return $e(t.data);
  }
  get options() {
    return this._def.values;
  }
  get enum() {
    const t = {};
    for (const n of this._def.values) t[n] = n;
    return t;
  }
  get Values() {
    const t = {};
    for (const n of this._def.values) t[n] = n;
    return t;
  }
  get Enum() {
    const t = {};
    for (const n of this._def.values) t[n] = n;
    return t;
  }
  extract(t, n = this._def) {
    return Dt.create(t, { ...this._def, ...n });
  }
  exclude(t, n = this._def) {
    return Dt.create(this.options.filter((r) => !t.includes(r)), {
      ...this._def,
      ...n,
    });
  }
}
Nn = new WeakMap();
Dt.create = Al;
class cr extends Q {
  constructor() {
    super(...arguments), jn.set(this, void 0);
  }
  _parse(t) {
    const n = te.getValidEnumValues(this._def.values),
      r = this._getOrReturnCtx(t);
    if (r.parsedType !== j.string && r.parsedType !== j.number) {
      const s = te.objectValues(n);
      return M(r, {
        expected: te.joinValues(s),
        received: r.parsedType,
        code: C.invalid_type,
      }),
        U;
    }
    if (
      Fr(this, jn) ||
      Tl(this, jn, new Set(te.getValidEnumValues(this._def.values))),
        !Fr(this, jn).has(t.data)
    ) {
      const s = te.objectValues(n);
      return M(r, { received: r.data, code: C.invalid_enum_value, options: s }),
        U;
    }
    return $e(t.data);
  }
  get enum() {
    return this._def.values;
  }
}
jn = new WeakMap();
cr.create = (e, t) => new cr({ values: e, typeName: F.ZodNativeEnum, ...K(t) });
class Cn extends Q {
  unwrap() {
    return this._def.type;
  }
  _parse(t) {
    const { ctx: n } = this._processInputParams(t);
    if (n.parsedType !== j.promise && n.common.async === !1) {
      return M(n, {
        code: C.invalid_type,
        expected: j.promise,
        received: n.parsedType,
      }),
        U;
    }
    const r = n.parsedType === j.promise ? n.data : Promise.resolve(n.data);
    return $e(
      r.then((s) =>
        this._def.type.parseAsync(s, {
          path: n.path,
          errorMap: n.common.contextualErrorMap,
        })
      ),
    );
  }
}
Cn.create = (e, t) => new Cn({ type: e, typeName: F.ZodPromise, ...K(t) });
class st extends Q {
  innerType() {
    return this._def.schema;
  }
  sourceType() {
    return this._def.schema._def.typeName === F.ZodEffects
      ? this._def.schema.sourceType()
      : this._def.schema;
  }
  _parse(t) {
    const { status: n, ctx: r } = this._processInputParams(t),
      s = this._def.effect || null,
      o = {
        addIssue: (i) => {
          M(r, i), i.fatal ? n.abort() : n.dirty();
        },
        get path() {
          return r.path;
        },
      };
    if (o.addIssue = o.addIssue.bind(o), s.type === "preprocess") {
      const i = s.transform(r.data, o);
      if (r.common.async) {
        return Promise.resolve(i).then(async (a) => {
          if (n.value === "aborted") return U;
          const l = await this._def.schema._parseAsync({
            data: a,
            path: r.path,
            parent: r,
          });
          return l.status === "aborted"
            ? U
            : l.status === "dirty" || n.value === "dirty"
            ? dn(l.value)
            : l;
        });
      }
      {
        if (n.value === "aborted") return U;
        const a = this._def.schema._parseSync({
          data: i,
          path: r.path,
          parent: r,
        });
        return a.status === "aborted"
          ? U
          : a.status === "dirty" || n.value === "dirty"
          ? dn(a.value)
          : a;
      }
    }
    if (s.type === "refinement") {
      const i = (a) => {
        const l = s.refinement(a, o);
        if (r.common.async) return Promise.resolve(l);
        if (l instanceof Promise) {
          throw new Error(
            "Async refinement encountered during synchronous parse operation. Use .parseAsync instead.",
          );
        }
        return a;
      };
      if (r.common.async === !1) {
        const a = this._def.schema._parseSync({
          data: r.data,
          path: r.path,
          parent: r,
        });
        return a.status === "aborted"
          ? U
          : (a.status === "dirty" && n.dirty(),
            i(a.value),
            { status: n.value, value: a.value });
      } else {return this._def.schema._parseAsync({
          data: r.data,
          path: r.path,
          parent: r,
        }).then((a) =>
          a.status === "aborted"
            ? U
            : (a.status === "dirty" && n.dirty(),
              i(a.value).then(() => ({ status: n.value, value: a.value })))
        );}
    }
    if (s.type === "transform") {
      if (r.common.async === !1) {
        const i = this._def.schema._parseSync({
          data: r.data,
          path: r.path,
          parent: r,
        });
        if (!Xn(i)) return i;
        const a = s.transform(i.value, o);
        if (a instanceof Promise) {
          throw new Error(
            "Asynchronous transform encountered during synchronous parse operation. Use .parseAsync instead.",
          );
        }
        return { status: n.value, value: a };
      } else {return this._def.schema._parseAsync({
          data: r.data,
          path: r.path,
          parent: r,
        }).then((i) =>
          Xn(i)
            ? Promise.resolve(s.transform(i.value, o)).then((a) => ({
              status: n.value,
              value: a,
            }))
            : i
        );}
    }
    te.assertNever(s);
  }
}
st.create = (e, t, n) =>
  new st({ schema: e, typeName: F.ZodEffects, effect: t, ...K(n) });
st.createWithPreprocess = (e, t, n) =>
  new st({
    schema: t,
    effect: { type: "preprocess", transform: e },
    typeName: F.ZodEffects,
    ...K(n),
  });
class ft extends Q {
  _parse(t) {
    return this._getType(t) === j.undefined
      ? $e(void 0)
      : this._def.innerType._parse(t);
  }
  unwrap() {
    return this._def.innerType;
  }
}
ft.create = (e, t) =>
  new ft({ innerType: e, typeName: F.ZodOptional, ...K(t) });
class Vt extends Q {
  _parse(t) {
    return this._getType(t) === j.null
      ? $e(null)
      : this._def.innerType._parse(t);
  }
  unwrap() {
    return this._def.innerType;
  }
}
Vt.create = (e, t) =>
  new Vt({ innerType: e, typeName: F.ZodNullable, ...K(t) });
class ur extends Q {
  _parse(t) {
    const { ctx: n } = this._processInputParams(t);
    let r = n.data;
    return n.parsedType === j.undefined && (r = this._def.defaultValue()),
      this._def.innerType._parse({ data: r, path: n.path, parent: n });
  }
  removeDefault() {
    return this._def.innerType;
  }
}
ur.create = (e, t) =>
  new ur({
    innerType: e,
    typeName: F.ZodDefault,
    defaultValue: typeof t.default == "function" ? t.default : () => t.default,
    ...K(t),
  });
class fr extends Q {
  _parse(t) {
    const { ctx: n } = this._processInputParams(t),
      r = { ...n, common: { ...n.common, issues: [] } },
      s = this._def.innerType._parse({
        data: r.data,
        path: r.path,
        parent: { ...r },
      });
    return er(s)
      ? s.then((o) => ({
        status: "valid",
        value: o.status === "valid" ? o.value : this._def.catchValue({
          get error() {
            return new We(r.common.issues);
          },
          input: r.data,
        }),
      }))
      : {
        status: "valid",
        value: s.status === "valid" ? s.value : this._def.catchValue({
          get error() {
            return new We(r.common.issues);
          },
          input: r.data,
        }),
      };
  }
  removeCatch() {
    return this._def.innerType;
  }
}
fr.create = (e, t) =>
  new fr({
    innerType: e,
    typeName: F.ZodCatch,
    catchValue: typeof t.catch == "function" ? t.catch : () => t.catch,
    ...K(t),
  });
class Wr extends Q {
  _parse(t) {
    if (this._getType(t) !== j.nan) {
      const r = this._getOrReturnCtx(t);
      return M(r, {
        code: C.invalid_type,
        expected: j.nan,
        received: r.parsedType,
      }),
        U;
    }
    return { status: "valid", value: t.data };
  }
}
Wr.create = (e) => new Wr({ typeName: F.ZodNaN, ...K(e) });
const nh = Symbol("zod_brand");
class Oo extends Q {
  _parse(t) {
    const { ctx: n } = this._processInputParams(t), r = n.data;
    return this._def.type._parse({ data: r, path: n.path, parent: n });
  }
  unwrap() {
    return this._def.type;
  }
}
class vr extends Q {
  _parse(t) {
    const { status: n, ctx: r } = this._processInputParams(t);
    if (r.common.async) {
      return (async () => {
        const o = await this._def.in._parseAsync({
          data: r.data,
          path: r.path,
          parent: r,
        });
        return o.status === "aborted"
          ? U
          : o.status === "dirty"
          ? (n.dirty(), dn(o.value))
          : this._def.out._parseAsync({
            data: o.value,
            path: r.path,
            parent: r,
          });
      })();
    }
    {
      const s = this._def.in._parseSync({
        data: r.data,
        path: r.path,
        parent: r,
      });
      return s.status === "aborted"
        ? U
        : s.status === "dirty"
        ? (n.dirty(), { status: "dirty", value: s.value })
        : this._def.out._parseSync({ data: s.value, path: r.path, parent: r });
    }
  }
  static create(t, n) {
    return new vr({ in: t, out: n, typeName: F.ZodPipeline });
  }
}
class dr extends Q {
  _parse(t) {
    const n = this._def.innerType._parse(t),
      r = (s) => (Xn(s) && (s.value = Object.freeze(s.value)), s);
    return er(n) ? n.then((s) => r(s)) : r(n);
  }
  unwrap() {
    return this._def.innerType;
  }
}
dr.create = (e, t) =>
  new dr({ innerType: e, typeName: F.ZodReadonly, ...K(t) });
function Pl(e, t = {}, n) {
  return e
    ? Sn.create().superRefine((r, s) => {
      var o, i;
      if (!e(r)) {
        const a = typeof t == "function"
            ? t(r)
            : typeof t == "string"
            ? { message: t }
            : t,
          l = (i = (o = a.fatal) !== null && o !== void 0 ? o : n) !== null &&
              i !== void 0
            ? i
            : !0,
          c = typeof a == "string" ? { message: a } : a;
        s.addIssue({ code: "custom", ...c, fatal: l });
      }
    })
    : Sn.create();
}
const rh = { object: me.lazycreate };
var F;
(function (e) {
  e.ZodString = "ZodString",
    e.ZodNumber = "ZodNumber",
    e.ZodNaN = "ZodNaN",
    e.ZodBigInt = "ZodBigInt",
    e.ZodBoolean = "ZodBoolean",
    e.ZodDate = "ZodDate",
    e.ZodSymbol = "ZodSymbol",
    e.ZodUndefined = "ZodUndefined",
    e.ZodNull = "ZodNull",
    e.ZodAny = "ZodAny",
    e.ZodUnknown = "ZodUnknown",
    e.ZodNever = "ZodNever",
    e.ZodVoid = "ZodVoid",
    e.ZodArray = "ZodArray",
    e.ZodObject = "ZodObject",
    e.ZodUnion = "ZodUnion",
    e.ZodDiscriminatedUnion = "ZodDiscriminatedUnion",
    e.ZodIntersection = "ZodIntersection",
    e.ZodTuple = "ZodTuple",
    e.ZodRecord = "ZodRecord",
    e.ZodMap = "ZodMap",
    e.ZodSet = "ZodSet",
    e.ZodFunction = "ZodFunction",
    e.ZodLazy = "ZodLazy",
    e.ZodLiteral = "ZodLiteral",
    e.ZodEnum = "ZodEnum",
    e.ZodEffects = "ZodEffects",
    e.ZodNativeEnum = "ZodNativeEnum",
    e.ZodOptional = "ZodOptional",
    e.ZodNullable = "ZodNullable",
    e.ZodDefault = "ZodDefault",
    e.ZodCatch = "ZodCatch",
    e.ZodPromise = "ZodPromise",
    e.ZodBranded = "ZodBranded",
    e.ZodPipeline = "ZodPipeline",
    e.ZodReadonly = "ZodReadonly";
})(F || (F = {}));
const sh = (e, t = { message: `Input not instance of ${e.name}` }) =>
    Pl((n) => n instanceof e, t),
  Ml = Xe.create,
  Nl = Lt.create,
  oh = Wr.create,
  ih = Zt.create,
  jl = tr.create,
  ah = Xt.create,
  lh = Ur.create,
  ch = nr.create,
  uh = rr.create,
  fh = Sn.create,
  dh = qt.create,
  hh = St.create,
  ph = Br.create,
  mh = nt.create,
  gh = me.create,
  yh = me.strictCreate,
  vh = sr.create,
  bh = is.create,
  _h = or.create,
  xh = pt.create,
  wh = ir.create,
  Sh = Hr.create,
  Ch = en.create,
  kh = vn.create,
  Eh = ar.create,
  Th = lr.create,
  Rh = Dt.create,
  Oh = cr.create,
  Ih = Cn.create,
  ji = st.create,
  Ah = ft.create,
  Ph = Vt.create,
  Mh = st.createWithPreprocess,
  Nh = vr.create,
  jh = () => Ml().optional(),
  $h = () => Nl().optional(),
  Lh = () => jl().optional(),
  Zh = {
    string: (e) => Xe.create({ ...e, coerce: !0 }),
    number: (e) => Lt.create({ ...e, coerce: !0 }),
    boolean: (e) => tr.create({ ...e, coerce: !0 }),
    bigint: (e) => Zt.create({ ...e, coerce: !0 }),
    date: (e) => Xt.create({ ...e, coerce: !0 }),
  },
  Dh = U;
var Ae = Object.freeze({
  __proto__: null,
  defaultErrorMap: wn,
  setErrorMap: Dd,
  getErrorMap: Vr,
  makeIssue: zr,
  EMPTY_PATH: Vd,
  addIssueToContext: M,
  ParseStatus: Re,
  INVALID: U,
  DIRTY: dn,
  OK: $e,
  isAborted: Ws,
  isDirty: Gs,
  isValid: Xn,
  isAsync: er,
  get util() {
    return te;
  },
  get objectUtil() {
    return Hs;
  },
  ZodParsedType: j,
  getParsedType: Nt,
  ZodType: Q,
  datetimeRegex: Il,
  ZodString: Xe,
  ZodNumber: Lt,
  ZodBigInt: Zt,
  ZodBoolean: tr,
  ZodDate: Xt,
  ZodSymbol: Ur,
  ZodUndefined: nr,
  ZodNull: rr,
  ZodAny: Sn,
  ZodUnknown: qt,
  ZodNever: St,
  ZodVoid: Br,
  ZodArray: nt,
  ZodObject: me,
  ZodUnion: sr,
  ZodDiscriminatedUnion: is,
  ZodIntersection: or,
  ZodTuple: pt,
  ZodRecord: ir,
  ZodMap: Hr,
  ZodSet: en,
  ZodFunction: vn,
  ZodLazy: ar,
  ZodLiteral: lr,
  ZodEnum: Dt,
  ZodNativeEnum: cr,
  ZodPromise: Cn,
  ZodEffects: st,
  ZodTransformer: st,
  ZodOptional: ft,
  ZodNullable: Vt,
  ZodDefault: ur,
  ZodCatch: fr,
  ZodNaN: Wr,
  BRAND: nh,
  ZodBranded: Oo,
  ZodPipeline: vr,
  ZodReadonly: dr,
  custom: Pl,
  Schema: Q,
  ZodSchema: Q,
  late: rh,
  get ZodFirstPartyTypeKind() {
    return F;
  },
  coerce: Zh,
  any: fh,
  array: mh,
  bigint: ih,
  boolean: jl,
  date: ah,
  discriminatedUnion: bh,
  effect: ji,
  enum: Rh,
  function: kh,
  instanceof: sh,
  intersection: _h,
  lazy: Eh,
  literal: Th,
  map: Sh,
  nan: oh,
  nativeEnum: Oh,
  never: hh,
  null: uh,
  nullable: Ph,
  number: Nl,
  object: gh,
  oboolean: Lh,
  onumber: $h,
  optional: Ah,
  ostring: jh,
  pipeline: Nh,
  preprocess: Mh,
  promise: Ih,
  record: wh,
  set: Ch,
  strictObject: yh,
  string: Ml,
  symbol: lh,
  transformer: ji,
  tuple: xh,
  undefined: ch,
  union: vh,
  unknown: dh,
  void: ph,
  NEVER: Dh,
  ZodIssueCode: C,
  quotelessJson: Zd,
  ZodError: We,
});
const Vh = (e) => typeof (e == null ? void 0 : e.safeParse) == "function",
  Es = (e) => typeof (e == null ? void 0 : e.passthrough) == "function",
  zh = (e, t) =>
    Es(e) ? Es(t) ? e.merge(t) : e : Es(t) ? t : Object.assign({}, e, t);
Ae.object({
  name: Ae.literal("ZodError"),
  issues: Ae.array(
    Ae.object({
      path: Ae.array(Ae.union([Ae.string(), Ae.number()])),
      message: Ae.string().optional(),
      code: Ae.nativeEnum(Ae.ZodIssueCode),
    }).catchall(Ae.any()),
  ),
});
const Fh = Symbol("ContractNoBody"),
  $l = (e) => "method" in e && "path" in e,
  Ll = (e, t) =>
    Object.fromEntries(
      Object.entries(e).map(([n, r]) => {
        var s, o, i;
        return $l(r)
          ? [n, {
            ...r,
            path: t != null && t.pathPrefix ? t.pathPrefix + r.path : r.path,
            headers: zh(t == null ? void 0 : t.baseHeaders, r.headers),
            strictStatusCodes:
              (s = r.strictStatusCodes) !== null && s !== void 0
                ? s
                : t == null
                ? void 0
                : t.strictStatusCodes,
            validateResponseOnClient:
              (o = r.validateResponseOnClient) !== null && o !== void 0
                ? o
                : t == null
                ? void 0
                : t.validateResponseOnClient,
            responses: {
              ...t == null ? void 0 : t.commonResponses,
              ...r.responses,
            },
            metadata: t != null && t.metadata
              ? {
                ...t == null ? void 0 : t.metadata,
                ...(i = r.metadata) !== null && i !== void 0 ? i : {},
              }
              : r.metadata,
          }]
          : [n, Ll(r, t)];
      }),
    ),
  Ts = Symbol("ContractPlainType"),
  Uh = () => ({
    router: (e, t) => Ll(e, t),
    query: (e) => e,
    mutation: (e) => e,
    responses: (e) => e,
    response: () => Ts,
    body: () => Ts,
    type: () => Ts,
    otherResponse: ({ contentType: e, body: t }) => ({
      contentType: e,
      body: t,
    }),
    noBody: () => Fh,
  }),
  Bh = ({ path: e, params: t }) =>
    e.replace(/:([^/]+)/g, (n, r) => t[r] || "").replace(/\/\//g, "/"),
  Hh = (e, t = !1) => {
    const n = t ? Wh(e) : Gh(e);
    return (n == null ? void 0 : n.length) > 0 ? "?" + n : "";
  },
  Wh = (e) =>
    e
      ? Object.entries(e).filter(([, t]) => t !== void 0).map(([t, n]) => {
        let r;
        return typeof n == "string" &&
            !["true", "false", "null"].includes(n.trim()) && isNaN(Number(n))
          ? r = n
          : r = JSON.stringify(n),
          `${encodeURIComponent(t)}=${encodeURIComponent(r)}`;
      }).join("&")
      : "",
  Gh = (e) =>
    e
      ? Object.keys(e).flatMap((t) => qs(t, e[t])).map(([t, n]) =>
        `${encodeURIComponent(t)}=${encodeURIComponent(n)}`
      ).join("&")
      : "",
  qs = (e, t) =>
    Array.isArray(t)
      ? t.flatMap((n, r) => qs(`${e}[${r}]`, n))
      : t instanceof Date
      ? [[`${e}`, t.toISOString()]]
      : t === null
      ? [[`${e}`, ""]]
      : t === void 0
      ? []
      : typeof t == "object"
      ? Object.keys(t).flatMap((n) => qs(`${e}[${n}]`, t[n]))
      : [[`${e}`, `${t}`]];
class Kh extends Error {
  constructor(t, n) {
    const r = n.join(",");
    super(
      `Server returned unexpected response. Expected one of: ${r} got: ${t.status}`,
    ), this.response = t;
  }
}
const qh = async (
    {
      route: e,
      path: t,
      method: n,
      headers: r,
      body: s,
      validateResponse: o,
      fetchOptions: i,
    },
  ) => {
    const a = await fetch(t, { ...i, method: n, headers: r, body: s }),
      l = a.headers.get("content-type");
    if (
      l != null && l.includes("application/") &&
      (l != null && l.includes("json"))
    ) {
      const c = { status: a.status, body: await a.json(), headers: a.headers },
        u = e.responses[c.status];
      return (o ?? e.validateResponseOnClient) && Vh(u)
        ? { ...c, body: u.parse(c.body) }
        : c;
    }
    return l != null && l.includes("text/")
      ? { status: a.status, body: await a.text(), headers: a.headers }
      : { status: a.status, body: await a.blob(), headers: a.headers };
  },
  Qh = (e) => {
    const t = new FormData(),
      n = (r, s) => {
        s instanceof File ? t.append(r, s) : t.append(r, JSON.stringify(s));
      };
    return Object.entries(e).forEach(([r, s]) => {
      if (Array.isArray(s)) { for (const o of s) n(r, o); }
      else n(r, s);
    }),
      t;
  },
  $i = (e) =>
    Object.fromEntries(Object.entries(e).map(([t, n]) => [t.toLowerCase(), n])),
  Jh = (e) => {
    const {
        path: t,
        clientArgs: n,
        route: r,
        body: s,
        query: o,
        extraInputArgs: i,
        headers: a,
        fetchOptions: l,
      } = e,
      c = n.api || qh,
      u = n.baseHeaders &&
        Object.fromEntries(
          Object.entries(n.baseHeaders).map(([m, k]) =>
            typeof k == "function" ? [m, k(e)] : [m, k]
          ),
        ),
      f = { ...u && $i(u), ...$i(a) };
    Object.keys(f).forEach((m) => {
      f[m] === void 0 && delete f[m];
    });
    let p = {
      route: r,
      path: t,
      method: r.method,
      headers: f,
      body: void 0,
      rawBody: s,
      rawQuery: o,
      contentType: void 0,
      validateResponse: n.validateResponse,
      fetchOptions: {
        ...n.credentials && { credentials: n.credentials },
        ...l,
      },
      ...(l == null ? void 0 : l.signal) && { signal: l.signal },
      ...(l == null ? void 0 : l.cache) && { cache: l.cache },
      ...l && "next" in l && !!(l != null && l.next) && { next: l.next },
    };
    return r.method !== "GET" &&
      ("contentType" in r && r.contentType === "multipart/form-data"
        ? p = {
          ...p,
          contentType: "multipart/form-data",
          body: s instanceof FormData ? s : Qh(s),
        }
        : "contentType" in r &&
            r.contentType === "application/x-www-form-urlencoded"
        ? p = {
          ...p,
          contentType: "application/x-www-form-urlencoded",
          headers: {
            "content-type": "application/x-www-form-urlencoded",
            ...p.headers,
          },
          body: typeof s == "string" ? s : new URLSearchParams(s),
        }
        : s != null &&
          (p = {
            ...p,
            contentType: "application/json",
            headers: { "content-type": "application/json", ...p.headers },
            body: JSON.stringify(s),
          })),
      c({ ...p, ...i });
  },
  Yh = (e, t, n) => {
    const {
        query: r,
        params: s,
        body: o,
        headers: i,
        extraHeaders: a,
        overrideClientOptions: l,
        fetchOptions: c,
        cache: u,
        next: f,
        ...p
      } = n || {},
      m = { ...t, ...l };
    return {
      path: Xh(r, m.baseUrl, s, e, !!m.jsonQuery),
      clientArgs: m,
      route: e,
      body: o,
      query: r,
      extraInputArgs: p,
      fetchOptions: { ...u && { cache: u }, ...f && { next: f }, ...c },
      headers: { ...a, ...i },
    };
  },
  Xh = (e, t, n, r, s) => {
    const o = Bh({ path: r.path, params: n }), i = Hh(e, s);
    return `${t}${o}${i}`;
  },
  ep = (e, t) => {
    const n = Object.keys(e.responses);
    return async (r) => {
      const s = Yh(e, t, r), o = await Jh(s);
      if (!t.throwOnUnknownStatus || n.includes(o.status.toString())) return o;
      throw new Kh(o, n);
    };
  },
  Zl = (e, t) =>
    Object.fromEntries(
      Object.entries(e).map(([n, r]) => $l(r) ? [n, ep(r, t)] : [n, Zl(r, t)]),
    ),
  tp = Uh().router({
    greet: {
      method: "GET",
      path: "/greeting",
      query: Ae.object({ name: Ae.string() }),
      responses: { 200: Ae.string() },
    },
  }, { strictStatusCodes: !0 }),
  np = Zl(tp, {
    baseUrl: "/api",
    baseHeaders: {},
    throwOnUnknownStatus: !0,
    jsonQuery: !0,
    validateResponse: !0,
  }),
  rp = () => np,
  Bn = /^[a-z0-9]+(-[a-z0-9]+)*$/,
  as = (e, t, n, r = "") => {
    const s = e.split(":");
    if (e.slice(0, 1) === "@") {
      if (s.length < 2 || s.length > 3) return null;
      r = s.shift().slice(1);
    }
    if (s.length > 3 || !s.length) return null;
    if (s.length > 1) {
      const a = s.pop(),
        l = s.pop(),
        c = { provider: s.length > 0 ? s[0] : r, prefix: l, name: a };
      return t && !Ar(c) ? null : c;
    }
    const o = s[0], i = o.split("-");
    if (i.length > 1) {
      const a = { provider: r, prefix: i.shift(), name: i.join("-") };
      return t && !Ar(a) ? null : a;
    }
    if (n && r === "") {
      const a = { provider: r, prefix: "", name: o };
      return t && !Ar(a, n) ? null : a;
    }
    return null;
  },
  Ar = (e, t) =>
    e
      ? !!((e.provider === "" || e.provider.match(Bn)) &&
        (t && e.prefix === "" || e.prefix.match(Bn)) && e.name.match(Bn))
      : !1,
  Dl = Object.freeze({ left: 0, top: 0, width: 16, height: 16 }),
  Gr = Object.freeze({ rotate: 0, vFlip: !1, hFlip: !1 }),
  ls = Object.freeze({ ...Dl, ...Gr }),
  Qs = Object.freeze({ ...ls, body: "", hidden: !1 });
function sp(e, t) {
  const n = {};
  !e.hFlip != !t.hFlip && (n.hFlip = !0),
    !e.vFlip != !t.vFlip && (n.vFlip = !0);
  const r = ((e.rotate || 0) + (t.rotate || 0)) % 4;
  return r && (n.rotate = r), n;
}
function Li(e, t) {
  const n = sp(e, t);
  for (const r in Qs) {
    r in Gr
      ? r in e && !(r in n) && (n[r] = Gr[r])
      : r in t
      ? n[r] = t[r]
      : r in e && (n[r] = e[r]);
  }
  return n;
}
function op(e, t) {
  const n = e.icons,
    r = e.aliases || Object.create(null),
    s = Object.create(null);
  function o(i) {
    if (n[i]) return s[i] = [];
    if (!(i in s)) {
      s[i] = null;
      const a = r[i] && r[i].parent, l = a && o(a);
      l && (s[i] = [a].concat(l));
    }
    return s[i];
  }
  return Object.keys(n).concat(Object.keys(r)).forEach(o), s;
}
function ip(e, t, n) {
  const r = e.icons, s = e.aliases || Object.create(null);
  let o = {};
  function i(a) {
    o = Li(r[a] || s[a], o);
  }
  return i(t), n.forEach(i), Li(e, o);
}
function Vl(e, t) {
  const n = [];
  if (typeof e != "object" || typeof e.icons != "object") return n;
  e.not_found instanceof Array && e.not_found.forEach((s) => {
    t(s, null), n.push(s);
  });
  const r = op(e);
  for (const s in r) {
    const o = r[s];
    o && (t(s, ip(e, s, o)), n.push(s));
  }
  return n;
}
const ap = { provider: "", aliases: {}, not_found: {}, ...Dl };
function Rs(e, t) {
  for (const n in t) if (n in e && typeof e[n] != typeof t[n]) return !1;
  return !0;
}
function zl(e) {
  if (typeof e != "object" || e === null) return null;
  const t = e;
  if (
    typeof t.prefix != "string" || !e.icons || typeof e.icons != "object" ||
    !Rs(e, ap)
  ) return null;
  const n = t.icons;
  for (const s in n) {
    const o = n[s];
    if (!s.match(Bn) || typeof o.body != "string" || !Rs(o, Qs)) return null;
  }
  const r = t.aliases || Object.create(null);
  for (const s in r) {
    const o = r[s], i = o.parent;
    if (!s.match(Bn) || typeof i != "string" || !n[i] && !r[i] || !Rs(o, Qs)) {
      return null;
    }
  }
  return t;
}
const Zi = Object.create(null);
function lp(e, t) {
  return {
    provider: e,
    prefix: t,
    icons: Object.create(null),
    missing: new Set(),
  };
}
function tn(e, t) {
  const n = Zi[e] || (Zi[e] = Object.create(null));
  return n[t] || (n[t] = lp(e, t));
}
function Io(e, t) {
  return zl(t)
    ? Vl(t, (n, r) => {
      r ? e.icons[n] = r : e.missing.add(n);
    })
    : [];
}
function cp(e, t, n) {
  try {
    if (typeof n.body == "string") return e.icons[t] = { ...n }, !0;
  } catch {}
  return !1;
}
let hr = !1;
function Fl(e) {
  return typeof e == "boolean" && (hr = e), hr;
}
function up(e) {
  const t = typeof e == "string" ? as(e, !0, hr) : e;
  if (t) {
    const n = tn(t.provider, t.prefix), r = t.name;
    return n.icons[r] || (n.missing.has(r) ? null : void 0);
  }
}
function fp(e, t) {
  const n = as(e, !0, hr);
  if (!n) return !1;
  const r = tn(n.provider, n.prefix);
  return cp(r, n.name, t);
}
function dp(e, t) {
  if (typeof e != "object") return !1;
  if (typeof t != "string" && (t = e.provider || ""), hr && !t && !e.prefix) {
    let s = !1;
    return zl(e) && (e.prefix = "",
      Vl(e, (o, i) => {
        i && fp(o, i) && (s = !0);
      })),
      s;
  }
  const n = e.prefix;
  if (!Ar({ provider: t, prefix: n, name: "a" })) return !1;
  const r = tn(t, n);
  return !!Io(r, e);
}
const Ul = Object.freeze({ width: null, height: null }),
  Bl = Object.freeze({ ...Ul, ...Gr }),
  hp = /(-?[0-9.]*[0-9]+[0-9.]*)/g,
  pp = /^-?[0-9.]*[0-9]+[0-9.]*$/g;
function Di(e, t, n) {
  if (t === 1) return e;
  if (n = n || 100, typeof e == "number") return Math.ceil(e * t * n) / n;
  if (typeof e != "string") return e;
  const r = e.split(hp);
  if (r === null || !r.length) return e;
  const s = [];
  let o = r.shift(), i = pp.test(o);
  for (;;) {
    if (i) {
      const a = parseFloat(o);
      isNaN(a) ? s.push(o) : s.push(Math.ceil(a * t * n) / n);
    } else s.push(o);
    if (o = r.shift(), o === void 0) return s.join("");
    i = !i;
  }
}
function mp(e, t = "defs") {
  let n = "";
  const r = e.indexOf("<" + t);
  for (; r >= 0;) {
    const s = e.indexOf(">", r), o = e.indexOf("</" + t);
    if (s === -1 || o === -1) break;
    const i = e.indexOf(">", o);
    if (i === -1) break;
    n += e.slice(s + 1, o).trim(), e = e.slice(0, r).trim() + e.slice(i + 1);
  }
  return { defs: n, content: e };
}
function gp(e, t) {
  return e ? "<defs>" + e + "</defs>" + t : t;
}
function yp(e, t, n) {
  const r = mp(e);
  return gp(r.defs, t + r.content + n);
}
const vp = (e) => e === "unset" || e === "undefined" || e === "none";
function bp(e, t) {
  const n = { ...ls, ...e },
    r = { ...Bl, ...t },
    s = { left: n.left, top: n.top, width: n.width, height: n.height };
  let o = n.body;
  [n, r].forEach((_) => {
    const b = [], I = _.hFlip, O = _.vFlip;
    let $ = _.rotate;
    I
      ? O ? $ += 2 : (b.push(
        "translate(" + (s.width + s.left).toString() + " " +
          (0 - s.top).toString() + ")",
      ),
        b.push("scale(-1 1)"),
        s.top = s.left = 0)
      : O &&
        (b.push(
          "translate(" + (0 - s.left).toString() + " " +
            (s.height + s.top).toString() + ")",
        ),
          b.push("scale(1 -1)"),
          s.top = s.left = 0);
    let T;
    switch ($ < 0 && ($ -= Math.floor($ / 4) * 4), $ = $ % 4, $) {
      case 1:
        T = s.height / 2 + s.top,
          b.unshift("rotate(90 " + T.toString() + " " + T.toString() + ")");
        break;
      case 2:
        b.unshift(
          "rotate(180 " + (s.width / 2 + s.left).toString() + " " +
            (s.height / 2 + s.top).toString() + ")",
        );
        break;
      case 3:
        T = s.width / 2 + s.left,
          b.unshift("rotate(-90 " + T.toString() + " " + T.toString() + ")");
        break;
    }
    $ % 2 === 1 &&
    (s.left !== s.top && (T = s.left, s.left = s.top, s.top = T),
      s.width !== s.height && (T = s.width, s.width = s.height, s.height = T)),
      b.length && (o = yp(o, '<g transform="' + b.join(" ") + '">', "</g>"));
  });
  const i = r.width, a = r.height, l = s.width, c = s.height;
  let u, f;
  i === null
    ? (f = a === null ? "1em" : a === "auto" ? c : a, u = Di(f, l / c))
    : (u = i === "auto" ? l : i,
      f = a === null ? Di(u, c / l) : a === "auto" ? c : a);
  const p = {},
    m = (_, b) => {
      vp(b) || (p[_] = b.toString());
    };
  m("width", u), m("height", f);
  const k = [s.left, s.top, l, c];
  return p.viewBox = k.join(" "), { attributes: p, viewBox: k, body: o };
}
const _p = /\sid="(\S+)"/g,
  xp = "IconifyId" + Date.now().toString(16) +
    (Math.random() * 16777216 | 0).toString(16);
let wp = 0;
function Sp(e, t = xp) {
  const n = [];
  let r;
  for (; r = _p.exec(e);) n.push(r[1]);
  if (!n.length) return e;
  const s = "suffix" + (Math.random() * 16777216 | Date.now()).toString(16);
  return n.forEach((o) => {
    const i = typeof t == "function" ? t(o) : t + (wp++).toString(),
      a = o.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    e = e.replace(
      new RegExp('([#;"])(' + a + ')([")]|\\.[a-z])', "g"),
      "$1" + i + s + "$3",
    );
  }),
    e = e.replace(new RegExp(s, "g"), ""),
    e;
}
const Js = Object.create(null);
function Cp(e, t) {
  Js[e] = t;
}
function Ys(e) {
  return Js[e] || Js[""];
}
function Ao(e) {
  let t;
  if (typeof e.resources == "string") t = [e.resources];
  else if (t = e.resources, !(t instanceof Array) || !t.length) return null;
  return {
    resources: t,
    path: e.path || "/",
    maxURL: e.maxURL || 500,
    rotate: e.rotate || 750,
    timeout: e.timeout || 5e3,
    random: e.random === !0,
    index: e.index || 0,
    dataAfterTimeout: e.dataAfterTimeout !== !1,
  };
}
const Po = Object.create(null),
  In = ["https://api.simplesvg.com", "https://api.unisvg.com"],
  Pr = [];
for (; In.length > 0;) {
  In.length === 1 || Math.random() > .5
    ? Pr.push(In.shift())
    : Pr.push(In.pop());
}
Po[""] = Ao({ resources: ["https://api.iconify.design"].concat(Pr) });
function kp(e, t) {
  const n = Ao(t);
  return n === null ? !1 : (Po[e] = n, !0);
}
function Mo(e) {
  return Po[e];
}
const Ep = () => {
  let e;
  try {
    if (e = fetch, typeof e == "function") return e;
  } catch {}
};
let Vi = Ep();
function Tp(e, t) {
  const n = Mo(e);
  if (!n) return 0;
  let r;
  if (!n.maxURL) r = 0;
  else {
    let s = 0;
    n.resources.forEach((i) => {
      s = Math.max(s, i.length);
    });
    const o = t + ".json?icons=";
    r = n.maxURL - s - n.path.length - o.length;
  }
  return r;
}
function Rp(e) {
  return e === 404;
}
const Op = (e, t, n) => {
  const r = [], s = Tp(e, t), o = "icons";
  let i = { type: o, provider: e, prefix: t, icons: [] }, a = 0;
  return n.forEach((l, c) => {
    a += l.length + 1,
      a >= s && c > 0 &&
      (r.push(i),
        i = { type: o, provider: e, prefix: t, icons: [] },
        a = l.length),
      i.icons.push(l);
  }),
    r.push(i),
    r;
};
function Ip(e) {
  if (typeof e == "string") {
    const t = Mo(e);
    if (t) return t.path;
  }
  return "/";
}
const Ap = (e, t, n) => {
    if (!Vi) {
      n("abort", 424);
      return;
    }
    let r = Ip(t.provider);
    switch (t.type) {
      case "icons": {
        const o = t.prefix,
          a = t.icons.join(","),
          l = new URLSearchParams({ icons: a });
        r += o + ".json?" + l.toString();
        break;
      }
      case "custom": {
        const o = t.uri;
        r += o.slice(0, 1) === "/" ? o.slice(1) : o;
        break;
      }
      default:
        n("abort", 400);
        return;
    }
    let s = 503;
    Vi(e + r).then((o) => {
      const i = o.status;
      if (i !== 200) {
        setTimeout(() => {
          n(Rp(i) ? "abort" : "next", i);
        });
        return;
      }
      return s = 501, o.json();
    }).then((o) => {
      if (typeof o != "object" || o === null) {
        setTimeout(() => {
          o === 404 ? n("abort", o) : n("next", s);
        });
        return;
      }
      setTimeout(() => {
        n("success", o);
      });
    }).catch(() => {
      n("next", s);
    });
  },
  Pp = { prepare: Op, send: Ap };
function Mp(e) {
  const t = { loaded: [], missing: [], pending: [] }, n = Object.create(null);
  e.sort((s, o) =>
    s.provider !== o.provider
      ? s.provider.localeCompare(o.provider)
      : s.prefix !== o.prefix
      ? s.prefix.localeCompare(o.prefix)
      : s.name.localeCompare(o.name)
  );
  let r = { provider: "", prefix: "", name: "" };
  return e.forEach((s) => {
    if (
      r.name === s.name && r.prefix === s.prefix && r.provider === s.provider
    ) return;
    r = s;
    const o = s.provider,
      i = s.prefix,
      a = s.name,
      l = n[o] || (n[o] = Object.create(null)),
      c = l[i] || (l[i] = tn(o, i));
    let u;
    a in c.icons
      ? u = t.loaded
      : i === "" || c.missing.has(a)
      ? u = t.missing
      : u = t.pending;
    const f = { provider: o, prefix: i, name: a };
    u.push(f);
  }),
    t;
}
function Hl(e, t) {
  e.forEach((n) => {
    const r = n.loaderCallbacks;
    r && (n.loaderCallbacks = r.filter((s) => s.id !== t));
  });
}
function Np(e) {
  e.pendingCallbacksFlag || (e.pendingCallbacksFlag = !0,
    setTimeout(() => {
      e.pendingCallbacksFlag = !1;
      const t = e.loaderCallbacks ? e.loaderCallbacks.slice(0) : [];
      if (!t.length) return;
      let n = !1;
      const r = e.provider, s = e.prefix;
      t.forEach((o) => {
        const i = o.icons, a = i.pending.length;
        i.pending = i.pending.filter((l) => {
          if (l.prefix !== s) return !0;
          const c = l.name;
          if (e.icons[c]) i.loaded.push({ provider: r, prefix: s, name: c });
          else if (e.missing.has(c)) {
            i.missing.push({ provider: r, prefix: s, name: c });
          } else return n = !0, !0;
          return !1;
        }),
          i.pending.length !== a &&
          (n || Hl([e], o.id),
            o.callback(
              i.loaded.slice(0),
              i.missing.slice(0),
              i.pending.slice(0),
              o.abort,
            ));
      });
    }));
}
let jp = 0;
function $p(e, t, n) {
  const r = jp++, s = Hl.bind(null, n, r);
  if (!t.pending.length) return s;
  const o = { id: r, icons: t, callback: e, abort: s };
  return n.forEach((i) => {
    (i.loaderCallbacks || (i.loaderCallbacks = [])).push(o);
  }),
    s;
}
function Lp(e, t = !0, n = !1) {
  const r = [];
  return e.forEach((s) => {
    const o = typeof s == "string" ? as(s, t, n) : s;
    o && r.push(o);
  }),
    r;
}
var Zp = {
  resources: [],
  index: 0,
  timeout: 2e3,
  rotate: 750,
  random: !1,
  dataAfterTimeout: !1,
};
function Dp(e, t, n, r) {
  const s = e.resources.length,
    o = e.random ? Math.floor(Math.random() * s) : e.index;
  let i;
  if (e.random) {
    let B = e.resources.slice(0);
    for (i = []; B.length > 1;) {
      const J = Math.floor(Math.random() * B.length);
      i.push(B[J]), B = B.slice(0, J).concat(B.slice(J + 1));
    }
    i = i.concat(B);
  } else i = e.resources.slice(o).concat(e.resources.slice(0, o));
  const a = Date.now();
  let l = "pending", c = 0, u, f = null, p = [], m = [];
  typeof r == "function" && m.push(r);
  function k() {
    f && (clearTimeout(f), f = null);
  }
  function _() {
    l === "pending" && (l = "aborted"),
      k(),
      p.forEach((B) => {
        B.status === "pending" && (B.status = "aborted");
      }),
      p = [];
  }
  function b(B, J) {
    J && (m = []), typeof B == "function" && m.push(B);
  }
  function I() {
    return {
      startTime: a,
      payload: t,
      status: l,
      queriesSent: c,
      queriesPending: p.length,
      subscribe: b,
      abort: _,
    };
  }
  function O() {
    l = "failed",
      m.forEach((B) => {
        B(void 0, u);
      });
  }
  function $() {
    p.forEach((B) => {
      B.status === "pending" && (B.status = "aborted");
    }), p = [];
  }
  function T(B, J, be) {
    const xe = J !== "success";
    switch (p = p.filter((ye) => ye !== B), l) {
      case "pending":
        break;
      case "failed":
        if (xe || !e.dataAfterTimeout) return;
        break;
      default:
        return;
    }
    if (J === "abort") {
      u = be, O();
      return;
    }
    if (xe) {
      u = be, p.length || (i.length ? Y() : O());
      return;
    }
    if (k(), $(), !e.random) {
      const ye = e.resources.indexOf(B.resource);
      ye !== -1 && ye !== e.index && (e.index = ye);
    }
    l = "completed",
      m.forEach((ye) => {
        ye(be);
      });
  }
  function Y() {
    if (l !== "pending") return;
    k();
    const B = i.shift();
    if (B === void 0) {
      if (p.length) {
        f = setTimeout(() => {
          k(), l === "pending" && ($(), O());
        }, e.timeout);
        return;
      }
      O();
      return;
    }
    const J = {
      status: "pending",
      resource: B,
      callback: (be, xe) => {
        T(J, be, xe);
      },
    };
    p.push(J), c++, f = setTimeout(Y, e.rotate), n(B, t, J.callback);
  }
  return setTimeout(Y), I;
}
function Wl(e) {
  const t = { ...Zp, ...e };
  let n = [];
  function r() {
    n = n.filter((a) => a().status === "pending");
  }
  function s(a, l, c) {
    const u = Dp(t, a, l, (f, p) => {
      r(), c && c(f, p);
    });
    return n.push(u), u;
  }
  function o(a) {
    return n.find((l) => a(l)) || null;
  }
  return {
    query: s,
    find: o,
    setIndex: (a) => {
      t.index = a;
    },
    getIndex: () => t.index,
    cleanup: r,
  };
}
function zi() {}
const Os = Object.create(null);
function Vp(e) {
  if (!Os[e]) {
    const t = Mo(e);
    if (!t) return;
    const n = Wl(t), r = { config: t, redundancy: n };
    Os[e] = r;
  }
  return Os[e];
}
function zp(e, t, n) {
  let r, s;
  if (typeof e == "string") {
    const o = Ys(e);
    if (!o) return n(void 0, 424), zi;
    s = o.send;
    const i = Vp(e);
    i && (r = i.redundancy);
  } else {
    const o = Ao(e);
    if (o) {
      r = Wl(o);
      const i = e.resources ? e.resources[0] : "", a = Ys(i);
      a && (s = a.send);
    }
  }
  return !r || !s ? (n(void 0, 424), zi) : r.query(t, s, n)().abort;
}
const Fi = "iconify2",
  pr = "iconify",
  Gl = pr + "-count",
  Ui = pr + "-version",
  Kl = 36e5,
  Fp = 168,
  Up = 50;
function Xs(e, t) {
  try {
    return e.getItem(t);
  } catch {}
}
function No(e, t, n) {
  try {
    return e.setItem(t, n), !0;
  } catch {}
}
function Bi(e, t) {
  try {
    e.removeItem(t);
  } catch {}
}
function eo(e, t) {
  return No(e, Gl, t.toString());
}
function to(e) {
  return parseInt(Xs(e, Gl)) || 0;
}
const cs = { local: !0, session: !0 },
  ql = { local: new Set(), session: new Set() };
let jo = !1;
function Bp(e) {
  jo = e;
}
let Tr = typeof window > "u" ? {} : window;
function Ql(e) {
  const t = e + "Storage";
  try {
    if (Tr && Tr[t] && typeof Tr[t].length == "number") return Tr[t];
  } catch {}
  cs[e] = !1;
}
function Jl(e, t) {
  const n = Ql(e);
  if (!n) return;
  const r = Xs(n, Ui);
  if (r !== Fi) {
    if (r) {
      const a = to(n);
      for (let l = 0; l < a; l++) Bi(n, pr + l.toString());
    }
    No(n, Ui, Fi), eo(n, 0);
    return;
  }
  const s = Math.floor(Date.now() / Kl) - Fp,
    o = (a) => {
      const l = pr + a.toString(), c = Xs(n, l);
      if (typeof c == "string") {
        try {
          const u = JSON.parse(c);
          if (
            typeof u == "object" && typeof u.cached == "number" &&
            u.cached > s && typeof u.provider == "string" &&
            typeof u.data == "object" && typeof u.data.prefix == "string" &&
            t(u, a)
          ) return !0;
        } catch {}
        Bi(n, l);
      }
    };
  let i = to(n);
  for (let a = i - 1; a >= 0; a--) {
    o(a) || (a === i - 1 ? (i--, eo(n, i)) : ql[e].add(a));
  }
}
function Yl() {
  if (!jo) {
    Bp(!0);
    for (const e in cs) {
      Jl(e, (t) => {
        const n = t.data, r = t.provider, s = n.prefix, o = tn(r, s);
        if (!Io(o, n).length) return !1;
        const i = n.lastModified || -1;
        return o.lastModifiedCached = o.lastModifiedCached
          ? Math.min(o.lastModifiedCached, i)
          : i,
          !0;
      });
    }
  }
}
function Hp(e, t) {
  const n = e.lastModifiedCached;
  if (n && n >= t) return n === t;
  if (e.lastModifiedCached = t, n) {
    for (const r in cs) {
      Jl(r, (s) => {
        const o = s.data;
        return s.provider !== e.provider || o.prefix !== e.prefix ||
          o.lastModified === t;
      });
    }
  }
  return !0;
}
function Wp(e, t) {
  jo || Yl();
  function n(r) {
    let s;
    if (!cs[r] || !(s = Ql(r))) return;
    const o = ql[r];
    let i;
    if (o.size) o.delete(i = Array.from(o).shift());
    else if (i = to(s), i >= Up || !eo(s, i + 1)) return;
    const a = {
      cached: Math.floor(Date.now() / Kl),
      provider: e.provider,
      data: t,
    };
    return No(s, pr + i.toString(), JSON.stringify(a));
  }
  t.lastModified && !Hp(e, t.lastModified) ||
    Object.keys(t.icons).length &&
      (t.not_found && (t = Object.assign({}, t), delete t.not_found),
        n("local") || n("session"));
}
function Hi() {}
function Gp(e) {
  e.iconsLoaderFlag || (e.iconsLoaderFlag = !0,
    setTimeout(() => {
      e.iconsLoaderFlag = !1, Np(e);
    }));
}
function Kp(e, t) {
  e.iconsToLoad
    ? e.iconsToLoad = e.iconsToLoad.concat(t).sort()
    : e.iconsToLoad = t,
    e.iconsQueueFlag || (e.iconsQueueFlag = !0,
      setTimeout(() => {
        e.iconsQueueFlag = !1;
        const { provider: n, prefix: r } = e, s = e.iconsToLoad;
        delete e.iconsToLoad;
        let o;
        if (!s || !(o = Ys(n))) return;
        o.prepare(n, r, s).forEach((a) => {
          zp(n, a, (l) => {
            if (typeof l != "object") {
              a.icons.forEach((c) => {
                e.missing.add(c);
              });
            } else {try {
                const c = Io(e, l);
                if (!c.length) return;
                const u = e.pendingIcons;
                u && c.forEach((f) => {
                  u.delete(f);
                }), Wp(e, l);
              } catch (c) {
                console.error(c);
              }}
            Gp(e);
          });
        });
      }));
}
const qp = (e, t) => {
  const n = Lp(e, !0, Fl()), r = Mp(n);
  if (!r.pending.length) {
    let l = !0;
    return t && setTimeout(() => {
      l && t(r.loaded, r.missing, r.pending, Hi);
    }),
      () => {
        l = !1;
      };
  }
  const s = Object.create(null), o = [];
  let i, a;
  return r.pending.forEach((l) => {
    const { provider: c, prefix: u } = l;
    if (u === a && c === i) return;
    i = c, a = u, o.push(tn(c, u));
    const f = s[c] || (s[c] = Object.create(null));
    f[u] || (f[u] = []);
  }),
    r.pending.forEach((l) => {
      const { provider: c, prefix: u, name: f } = l,
        p = tn(c, u),
        m = p.pendingIcons || (p.pendingIcons = new Set());
      m.has(f) || (m.add(f), s[c][u].push(f));
    }),
    o.forEach((l) => {
      const { provider: c, prefix: u } = l;
      s[c][u].length && Kp(l, s[c][u]);
    }),
    t ? $p(t, r, o) : Hi;
};
function Qp(e, t) {
  const n = { ...e };
  for (const r in t) {
    const s = t[r], o = typeof s;
    r in Ul
      ? (s === null || s && (o === "string" || o === "number")) && (n[r] = s)
      : o === typeof n[r] && (n[r] = r === "rotate" ? s % 4 : s);
  }
  return n;
}
const Jp = /[\s,]+/;
function Yp(e, t) {
  t.split(Jp).forEach((n) => {
    switch (n.trim()) {
      case "horizontal":
        e.hFlip = !0;
        break;
      case "vertical":
        e.vFlip = !0;
        break;
    }
  });
}
function Xp(e, t = 0) {
  const n = e.replace(/^-?[0-9.]*/, "");
  function r(s) {
    for (; s < 0;) s += 4;
    return s % 4;
  }
  if (n === "") {
    const s = parseInt(e);
    return isNaN(s) ? 0 : r(s);
  } else if (n !== e) {
    let s = 0;
    switch (n) {
      case "%":
        s = 25;
        break;
      case "deg":
        s = 90;
    }
    if (s) {
      let o = parseFloat(e.slice(0, e.length - n.length));
      return isNaN(o) ? 0 : (o = o / s, o % 1 === 0 ? r(o) : 0);
    }
  }
  return t;
}
function em(e, t) {
  let n = e.indexOf("xlink:") === -1
    ? ""
    : ' xmlns:xlink="http://www.w3.org/1999/xlink"';
  for (const r in t) n += " " + r + '="' + t[r] + '"';
  return '<svg xmlns="http://www.w3.org/2000/svg"' + n + ">" + e + "</svg>";
}
function tm(e) {
  return e.replace(/"/g, "'").replace(/%/g, "%25").replace(/#/g, "%23").replace(
    /</g,
    "%3C",
  ).replace(/>/g, "%3E").replace(/\s+/g, " ");
}
function nm(e) {
  return "data:image/svg+xml," + tm(e);
}
function rm(e) {
  return 'url("' + nm(e) + '")';
}
const Wi = { ...Bl, inline: !1 },
  sm = {
    xmlns: "http://www.w3.org/2000/svg",
    "xmlns:xlink": "http://www.w3.org/1999/xlink",
    "aria-hidden": !0,
    role: "img",
  },
  om = { display: "inline-block" },
  no = { backgroundColor: "currentColor" },
  Xl = { backgroundColor: "transparent" },
  Gi = { Image: "var(--svg)", Repeat: "no-repeat", Size: "100% 100%" },
  Ki = { webkitMask: no, mask: no, background: Xl };
for (const e in Ki) {
  const t = Ki[e];
  for (const n in Gi) t[e + n] = Gi[n];
}
const Mr = {};
["horizontal", "vertical"].forEach((e) => {
  const t = e.slice(0, 1) + "Flip";
  Mr[e + "-flip"] = t, Mr[e.slice(0, 1) + "-flip"] = t, Mr[e + "Flip"] = t;
});
function qi(e) {
  return e + (e.match(/^[-0-9.]+$/) ? "px" : "");
}
const Qi = (e, t) => {
  const n = Qp(Wi, t),
    r = { ...sm },
    s = t.mode || "svg",
    o = {},
    i = t.style,
    a = typeof i == "object" && !(i instanceof Array) ? i : {};
  for (let _ in t) {
    const b = t[_];
    if (b !== void 0) {
      switch (_) {
        case "icon":
        case "style":
        case "onLoad":
        case "mode":
          break;
        case "inline":
        case "hFlip":
        case "vFlip":
          n[_] = b === !0 || b === "true" || b === 1;
          break;
        case "flip":
          typeof b == "string" && Yp(n, b);
          break;
        case "color":
          o.color = b;
          break;
        case "rotate":
          typeof b == "string"
            ? n[_] = Xp(b)
            : typeof b == "number" && (n[_] = b);
          break;
        case "ariaHidden":
        case "aria-hidden":
          b !== !0 && b !== "true" && delete r["aria-hidden"];
          break;
        default: {
          const I = Mr[_];
          I
            ? (b === !0 || b === "true" || b === 1) && (n[I] = !0)
            : Wi[_] === void 0 && (r[_] = b);
        }
      }
    }
  }
  const l = bp(e, n), c = l.attributes;
  if (n.inline && (o.verticalAlign = "-0.125em"), s === "svg") {
    r.style = { ...o, ...a }, Object.assign(r, c);
    let _ = 0, b = t.id;
    return typeof b == "string" && (b = b.replace(/-/g, "_")),
      r.innerHTML = Sp(l.body, b ? () => b + "ID" + _++ : "iconifyVue"),
      Kt("svg", r);
  }
  const { body: u, width: f, height: p } = e,
    m = s === "mask" || (s === "bg" ? !1 : u.indexOf("currentColor") !== -1),
    k = em(u, { ...c, width: f + "", height: p + "" });
  return r.style = {
    ...o,
    "--svg": rm(k),
    width: qi(c.width),
    height: qi(c.height),
    ...om,
    ...m ? no : Xl,
    ...a,
  },
    Kt("span", r);
};
Fl(!0);
Cp("", Pp);
if (typeof document < "u" && typeof window < "u") {
  Yl();
  const e = window;
  if (e.IconifyPreload !== void 0) {
    const t = e.IconifyPreload, n = "Invalid IconifyPreload syntax.";
    typeof t == "object" && t !== null &&
      (t instanceof Array ? t : [t]).forEach((r) => {
        try {
          (typeof r != "object" || r === null || r instanceof Array ||
            typeof r.icons != "object" || typeof r.prefix != "string" ||
            !dp(r)) && console.error(n);
        } catch {
          console.error(n);
        }
      });
  }
  if (e.IconifyProviders !== void 0) {
    const t = e.IconifyProviders;
    if (typeof t == "object" && t !== null) {
      for (let n in t) {
        const r = "IconifyProviders[" + n + "] is invalid.";
        try {
          const s = t[n];
          if (typeof s != "object" || !s || s.resources === void 0) continue;
          kp(n, s) || console.error(r);
        } catch {
          console.error(r);
        }
      }
    }
  }
}
const im = { ...ls, body: "" },
  Ji = rn({
    inheritAttrs: !1,
    data() {
      return { _name: "", _loadingIcon: null, iconMounted: !1, counter: 0 };
    },
    mounted() {
      this.iconMounted = !0;
    },
    unmounted() {
      this.abortLoading();
    },
    methods: {
      abortLoading() {
        this._loadingIcon &&
          (this._loadingIcon.abort(), this._loadingIcon = null);
      },
      getIcon(e, t) {
        if (typeof e == "object" && e !== null && typeof e.body == "string") {
          return this._name = "", this.abortLoading(), { data: e };
        }
        let n;
        if (typeof e != "string" || (n = as(e, !1, !0)) === null) {
          return this.abortLoading(), null;
        }
        const r = up(n);
        if (!r) {
          return (!this._loadingIcon || this._loadingIcon.name !== e) &&
            (this.abortLoading(),
              this._name = "",
              r !== null &&
              (this._loadingIcon = {
                name: e,
                abort: qp([n], () => {
                  this.counter++;
                }),
              })),
            null;
        }
        this.abortLoading(), this._name !== e && (this._name = e, t && t(e));
        const s = ["iconify"];
        return n.prefix !== "" && s.push("iconify--" + n.prefix),
          n.provider !== "" && s.push("iconify--" + n.provider),
          { data: r, classes: s };
      },
    },
    render() {
      this.counter;
      const e = this.$attrs,
        t = this.iconMounted || e.ssr ? this.getIcon(e.icon, e.onLoad) : null;
      if (!t) return Qi(im, e);
      let n = e;
      return t.classes &&
        (n = {
          ...e,
          class: (typeof e.class == "string" ? e.class + " " : "") +
            t.classes.join(" "),
        }),
        Qi({ ...ls, ...t.data }, n);
    },
  }),
  am = {
    width: 24,
    height: 24,
    body:
      '<path fill="currentColor" d="M12 2.247a10 10 0 0 0-3.162 19.487c.5.088.687-.212.687-.475c0-.237-.012-1.025-.012-1.862c-2.513.462-3.163-.613-3.363-1.175a3.636 3.636 0 0 0-1.025-1.413c-.35-.187-.85-.65-.013-.662a2.001 2.001 0 0 1 1.538 1.025a2.137 2.137 0 0 0 2.912.825a2.104 2.104 0 0 1 .638-1.338c-2.225-.25-4.55-1.112-4.55-4.937a3.892 3.892 0 0 1 1.025-2.688a3.594 3.594 0 0 1 .1-2.65s.837-.262 2.75 1.025a9.427 9.427 0 0 1 5 0c1.912-1.3 2.75-1.025 2.75-1.025a3.593 3.593 0 0 1 .1 2.65a3.869 3.869 0 0 1 1.025 2.688c0 3.837-2.338 4.687-4.563 4.937a2.368 2.368 0 0 1 .675 1.85c0 1.338-.012 2.413-.012 2.75c0 .263.187.575.687.475A10.005 10.005 0 0 0 12 2.247Z"/>',
  },
  lm = {
    width: 24,
    height: 24,
    body:
      '<path fill="currentColor" d="M6.804 15a1 1 0 0 0-1.366-.366l-1.732 1a1 1 0 0 0 1 1.732l1.732-1A1 1 0 0 0 6.804 15ZM3.706 8.366l1.732 1a1 1 0 1 0 1-1.732l-1.732-1a1 1 0 0 0-1 1.732ZM6 12a1 1 0 0 0-1-1H3a1 1 0 0 0 0 2h2a1 1 0 0 0 1-1Zm11.196-3a1 1 0 0 0 1.366.366l1.732-1a1 1 0 1 0-1-1.732l-1.732 1A1 1 0 0 0 17.196 9ZM15 6.804a1 1 0 0 0 1.366-.366l1-1.732a1 1 0 1 0-1.732-1l-1 1.732A1 1 0 0 0 15 6.804Zm5.294 8.83l-1.732-1a1 1 0 1 0-1 1.732l1.732 1a1 1 0 0 0 1-1.732Zm-3.928 1.928a1 1 0 1 0-1.732 1l1 1.732a1 1 0 1 0 1.732-1ZM21 11h-2a1 1 0 0 0 0 2h2a1 1 0 0 0 0-2Zm-9 7a1 1 0 0 0-1 1v2a1 1 0 0 0 2 0v-2a1 1 0 0 0-1-1Zm-3-.804a1 1 0 0 0-1.366.366l-1 1.732a1 1 0 0 0 1.732 1l1-1.732A1 1 0 0 0 9 17.196ZM12 2a1 1 0 0 0-1 1v2a1 1 0 0 0 2 0V3a1 1 0 0 0-1-1Z"/>',
  };
function ec(e) {
  var t, n, r = "";
  if (typeof e == "string" || typeof e == "number") r += e;
  else if (typeof e == "object") {
    if (Array.isArray(e)) {
      for (t = 0; t < e.length; t++) {
        e[t] && (n = ec(e[t])) && (r && (r += " "), r += n);
      }
    } else for (t in e) e[t] && (r && (r += " "), r += t);
  }
  return r;
}
function cm() {
  for (var e, t, n = 0, r = ""; n < arguments.length;) {
    (e = arguments[n++]) && (t = ec(e)) && (r && (r += " "), r += t);
  }
  return r;
}
const Yi = (e) => typeof e == "boolean" ? "".concat(e) : e === 0 ? "0" : e,
  Xi = cm,
  um = (e, t) => (n) => {
    var r;
    if ((t == null ? void 0 : t.variants) == null) {
      return Xi(
        e,
        n == null ? void 0 : n.class,
        n == null ? void 0 : n.className,
      );
    }
    const { variants: s, defaultVariants: o } = t,
      i = Object.keys(s).map((c) => {
        const u = n == null ? void 0 : n[c], f = o == null ? void 0 : o[c];
        if (u === null) return null;
        const p = Yi(u) || Yi(f);
        return s[c][p];
      }),
      a = n && Object.entries(n).reduce((c, u) => {
        let [f, p] = u;
        return p === void 0 || (c[f] = p), c;
      }, {}),
      l = t == null || (r = t.compoundVariants) === null || r === void 0
        ? void 0
        : r.reduce((c, u) => {
          let { class: f, className: p, ...m } = u;
          return Object.entries(m).every((k) => {
              let [_, b] = k;
              return Array.isArray(b)
                ? b.includes({ ...o, ...a }[_])
                : { ...o, ...a }[_] === b;
            })
            ? [...c, f, p]
            : c;
        }, []);
    return Xi(
      e,
      i,
      l,
      n == null ? void 0 : n.class,
      n == null ? void 0 : n.className,
    );
  };
function fm(e) {
  let t = !1, n;
  const r = _c(!0);
  return (...s) => (t || (n = r.run(() => e(...s)), t = !0), n);
}
typeof WorkerGlobalScope < "u" && globalThis instanceof WorkerGlobalScope;
function tc(e) {
  return e ? e.flatMap((t) => t.type === Be ? tc(t.children) : [t]) : [];
}
const dm = rn({
    name: "PrimitiveSlot",
    inheritAttrs: !1,
    setup(e, { attrs: t, slots: n }) {
      return () => {
        var r, s;
        if (!n.default) return null;
        const o = tc(n.default()), i = o.findIndex((u) => u.type !== Jt);
        if (i === -1) return o;
        const a = o[i];
        (r = a.props) == null || delete r.ref;
        const l = a.props ? cl(t, a.props) : t;
        t.class && (s = a.props) != null && s.class && delete a.props.class;
        const c = Yt(a, l);
        for (const u in l) {
          u.startsWith("on") && (c.props || (c.props = {}), c.props[u] = l[u]);
        }
        return o.length === 1 ? c : (o[i] = c, o);
      };
    },
  }),
  hm = rn({
    name: "Primitive",
    inheritAttrs: !1,
    props: {
      asChild: { type: Boolean, default: !1 },
      as: { type: [String, Object], default: "div" },
    },
    setup(e, { attrs: t, slots: n }) {
      const r = e.asChild ? "template" : e.as;
      return typeof r == "string" && ["area", "img", "input"].includes(r)
        ? () => Kt(r, t)
        : r !== "template"
        ? () => Kt(e.as, t, { default: n.default })
        : () => Kt(dm, t, { default: n.default });
    },
  });
mr({
  layersRoot: new Set(),
  layersWithOutsidePointerEventsDisabled: new Set(),
  branches: new Set(),
});
fm(() => Zn([]));
function pm() {
  if (typeof matchMedia == "function") {
    return matchMedia("(pointer:coarse)").matches ? "coarse" : "fine";
  }
}
pm();
function nc(e) {
  var t, n, r = "";
  if (typeof e == "string" || typeof e == "number") r += e;
  else if (typeof e == "object") {
    if (Array.isArray(e)) {
      var s = e.length;
      for (t = 0; t < s; t++) {
        e[t] && (n = nc(e[t])) && (r && (r += " "), r += n);
      }
    } else for (n in e) e[n] && (r && (r += " "), r += n);
  }
  return r;
}
function mm() {
  for (var e, t, n = 0, r = "", s = arguments.length; n < s; n++) {
    (e = arguments[n]) && (t = nc(e)) && (r && (r += " "), r += t);
  }
  return r;
}
const $o = "-",
  gm = (e) => {
    const t = vm(e),
      { conflictingClassGroups: n, conflictingClassGroupModifiers: r } = e;
    return {
      getClassGroupId: (i) => {
        const a = i.split($o);
        return a[0] === "" && a.length !== 1 && a.shift(), rc(a, t) || ym(i);
      },
      getConflictingClassGroupIds: (i, a) => {
        const l = n[i] || [];
        return a && r[i] ? [...l, ...r[i]] : l;
      },
    };
  },
  rc = (e, t) => {
    var i;
    if (e.length === 0) return t.classGroupId;
    const n = e[0], r = t.nextPart.get(n), s = r ? rc(e.slice(1), r) : void 0;
    if (s) return s;
    if (t.validators.length === 0) return;
    const o = e.join($o);
    return (i = t.validators.find(({ validator: a }) => a(o))) == null
      ? void 0
      : i.classGroupId;
  },
  ea = /^\[(.+)\]$/,
  ym = (e) => {
    if (ea.test(e)) {
      const t = ea.exec(e)[1],
        n = t == null ? void 0 : t.substring(0, t.indexOf(":"));
      if (n) return "arbitrary.." + n;
    }
  },
  vm = (e) => {
    const { theme: t, prefix: n } = e,
      r = { nextPart: new Map(), validators: [] };
    return _m(Object.entries(e.classGroups), n).forEach(([o, i]) => {
      ro(i, r, o, t);
    }),
      r;
  },
  ro = (e, t, n, r) => {
    e.forEach((s) => {
      if (typeof s == "string") {
        const o = s === "" ? t : ta(t, s);
        o.classGroupId = n;
        return;
      }
      if (typeof s == "function") {
        if (bm(s)) {
          ro(s(r), t, n, r);
          return;
        }
        t.validators.push({ validator: s, classGroupId: n });
        return;
      }
      Object.entries(s).forEach(([o, i]) => {
        ro(i, ta(t, o), n, r);
      });
    });
  },
  ta = (e, t) => {
    let n = e;
    return t.split($o).forEach((r) => {
      n.nextPart.has(r) ||
      n.nextPart.set(r, { nextPart: new Map(), validators: [] }),
        n = n.nextPart.get(r);
    }),
      n;
  },
  bm = (e) => e.isThemeGetter,
  _m = (e, t) =>
    t
      ? e.map(([n, r]) => {
        const s = r.map((o) =>
          typeof o == "string"
            ? t + o
            : typeof o == "object"
            ? Object.fromEntries(Object.entries(o).map(([i, a]) => [t + i, a]))
            : o
        );
        return [n, s];
      })
      : e,
  xm = (e) => {
    if (e < 1) return { get: () => {}, set: () => {} };
    let t = 0, n = new Map(), r = new Map();
    const s = (o, i) => {
      n.set(o, i), t++, t > e && (t = 0, r = n, n = new Map());
    };
    return {
      get(o) {
        let i = n.get(o);
        if (i !== void 0) return i;
        if ((i = r.get(o)) !== void 0) return s(o, i), i;
      },
      set(o, i) {
        n.has(o) ? n.set(o, i) : s(o, i);
      },
    };
  },
  sc = "!",
  wm = (e) => {
    const { separator: t, experimentalParseClassName: n } = e,
      r = t.length === 1,
      s = t[0],
      o = t.length,
      i = (a) => {
        const l = [];
        let c = 0, u = 0, f;
        for (let b = 0; b < a.length; b++) {
          let I = a[b];
          if (c === 0) {
            if (I === s && (r || a.slice(b, b + o) === t)) {
              l.push(a.slice(u, b)), u = b + o;
              continue;
            }
            if (I === "/") {
              f = b;
              continue;
            }
          }
          I === "[" ? c++ : I === "]" && c--;
        }
        const p = l.length === 0 ? a : a.substring(u),
          m = p.startsWith(sc),
          k = m ? p.substring(1) : p,
          _ = f && f > u ? f - u : void 0;
        return {
          modifiers: l,
          hasImportantModifier: m,
          baseClassName: k,
          maybePostfixModifierPosition: _,
        };
      };
    return n ? (a) => n({ className: a, parseClassName: i }) : i;
  },
  Sm = (e) => {
    if (e.length <= 1) return e;
    const t = [];
    let n = [];
    return e.forEach((r) => {
      r[0] === "[" ? (t.push(...n.sort(), r), n = []) : n.push(r);
    }),
      t.push(...n.sort()),
      t;
  },
  Cm = (e) => ({ cache: xm(e.cacheSize), parseClassName: wm(e), ...gm(e) }),
  km = /\s+/,
  Em = (e, t) => {
    const {
        parseClassName: n,
        getClassGroupId: r,
        getConflictingClassGroupIds: s,
      } = t,
      o = [],
      i = e.trim().split(km);
    let a = "";
    for (let l = i.length - 1; l >= 0; l -= 1) {
      const c = i[l],
        {
          modifiers: u,
          hasImportantModifier: f,
          baseClassName: p,
          maybePostfixModifierPosition: m,
        } = n(c);
      let k = !!m, _ = r(k ? p.substring(0, m) : p);
      if (!_) {
        if (!k) {
          a = c + (a.length > 0 ? " " + a : a);
          continue;
        }
        if (_ = r(p), !_) {
          a = c + (a.length > 0 ? " " + a : a);
          continue;
        }
        k = !1;
      }
      const b = Sm(u).join(":"), I = f ? b + sc : b, O = I + _;
      if (o.includes(O)) continue;
      o.push(O);
      const $ = s(_, k);
      for (let T = 0; T < $.length; ++T) {
        const Y = $[T];
        o.push(I + Y);
      }
      a = c + (a.length > 0 ? " " + a : a);
    }
    return a;
  };
function Tm() {
  let e = 0, t, n, r = "";
  for (; e < arguments.length;) {
    (t = arguments[e++]) && (n = oc(t)) && (r && (r += " "), r += n);
  }
  return r;
}
const oc = (e) => {
  if (typeof e == "string") return e;
  let t, n = "";
  for (let r = 0; r < e.length; r++) {
    e[r] && (t = oc(e[r])) && (n && (n += " "), n += t);
  }
  return n;
};
function Rm(e, ...t) {
  let n, r, s, o = i;
  function i(l) {
    const c = t.reduce((u, f) => f(u), e());
    return n = Cm(c), r = n.cache.get, s = n.cache.set, o = a, a(l);
  }
  function a(l) {
    const c = r(l);
    if (c) return c;
    const u = Em(l, n);
    return s(l, u), u;
  }
  return function () {
    return o(Tm.apply(null, arguments));
  };
}
const de = (e) => {
    const t = (n) => n[e] || [];
    return t.isThemeGetter = !0, t;
  },
  ic = /^\[(?:([a-z-]+):)?(.+)\]$/i,
  Om = /^\d+\/\d+$/,
  Im = new Set(["px", "full", "screen"]),
  Am = /^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/,
  Pm =
    /\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/,
  Mm = /^(rgba?|hsla?|hwb|(ok)?(lab|lch))\(.+\)$/,
  Nm = /^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/,
  jm =
    /^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/,
  vt = (e) => bn(e) || Im.has(e) || Om.test(e),
  Tt = (e) => kn(e, "length", Um),
  bn = (e) => !!e && !Number.isNaN(Number(e)),
  Is = (e) => kn(e, "number", bn),
  An = (e) => !!e && Number.isInteger(Number(e)),
  $m = (e) => e.endsWith("%") && bn(e.slice(0, -1)),
  q = (e) => ic.test(e),
  Rt = (e) => Am.test(e),
  Lm = new Set(["length", "size", "percentage"]),
  Zm = (e) => kn(e, Lm, ac),
  Dm = (e) => kn(e, "position", ac),
  Vm = new Set(["image", "url"]),
  zm = (e) => kn(e, Vm, Hm),
  Fm = (e) => kn(e, "", Bm),
  Pn = () => !0,
  kn = (e, t, n) => {
    const r = ic.exec(e);
    return r
      ? r[1] ? typeof t == "string" ? r[1] === t : t.has(r[1]) : n(r[2])
      : !1;
  },
  Um = (e) => Pm.test(e) && !Mm.test(e),
  ac = () => !1,
  Bm = (e) => Nm.test(e),
  Hm = (e) => jm.test(e),
  Wm = () => {
    const e = de("colors"),
      t = de("spacing"),
      n = de("blur"),
      r = de("brightness"),
      s = de("borderColor"),
      o = de("borderRadius"),
      i = de("borderSpacing"),
      a = de("borderWidth"),
      l = de("contrast"),
      c = de("grayscale"),
      u = de("hueRotate"),
      f = de("invert"),
      p = de("gap"),
      m = de("gradientColorStops"),
      k = de("gradientColorStopPositions"),
      _ = de("inset"),
      b = de("margin"),
      I = de("opacity"),
      O = de("padding"),
      $ = de("saturate"),
      T = de("scale"),
      Y = de("sepia"),
      B = de("skew"),
      J = de("space"),
      be = de("translate"),
      xe = () => ["auto", "contain", "none"],
      ye = () => ["auto", "hidden", "clip", "visible", "scroll"],
      Ge = () => ["auto", q, t],
      ne = () => [q, t],
      Ze = () => ["", vt, Tt],
      ot = () => ["auto", bn, q],
      mt = () => [
        "bottom",
        "center",
        "left",
        "left-bottom",
        "left-top",
        "right",
        "right-bottom",
        "right-top",
        "top",
      ],
      he = () => ["solid", "dashed", "dotted", "double", "none"],
      re = () => [
        "normal",
        "multiply",
        "screen",
        "overlay",
        "darken",
        "lighten",
        "color-dodge",
        "color-burn",
        "hard-light",
        "soft-light",
        "difference",
        "exclusion",
        "hue",
        "saturation",
        "color",
        "luminosity",
      ],
      X = () => [
        "start",
        "end",
        "center",
        "between",
        "around",
        "evenly",
        "stretch",
      ],
      Oe = () => ["", "0", q],
      Qe = () => [
        "auto",
        "avoid",
        "all",
        "avoid-page",
        "page",
        "left",
        "right",
        "column",
      ],
      ve = () => [bn, q];
    return {
      cacheSize: 500,
      separator: ":",
      theme: {
        colors: [Pn],
        spacing: [vt, Tt],
        blur: ["none", "", Rt, q],
        brightness: ve(),
        borderColor: [e],
        borderRadius: ["none", "", "full", Rt, q],
        borderSpacing: ne(),
        borderWidth: Ze(),
        contrast: ve(),
        grayscale: Oe(),
        hueRotate: ve(),
        invert: Oe(),
        gap: ne(),
        gradientColorStops: [e],
        gradientColorStopPositions: [$m, Tt],
        inset: Ge(),
        margin: Ge(),
        opacity: ve(),
        padding: ne(),
        saturate: ve(),
        scale: ve(),
        sepia: Oe(),
        skew: ve(),
        space: ne(),
        translate: ne(),
      },
      classGroups: {
        aspect: [{ aspect: ["auto", "square", "video", q] }],
        container: ["container"],
        columns: [{ columns: [Rt] }],
        "break-after": [{ "break-after": Qe() }],
        "break-before": [{ "break-before": Qe() }],
        "break-inside": [{
          "break-inside": ["auto", "avoid", "avoid-page", "avoid-column"],
        }],
        "box-decoration": [{ "box-decoration": ["slice", "clone"] }],
        box: [{ box: ["border", "content"] }],
        display: [
          "block",
          "inline-block",
          "inline",
          "flex",
          "inline-flex",
          "table",
          "inline-table",
          "table-caption",
          "table-cell",
          "table-column",
          "table-column-group",
          "table-footer-group",
          "table-header-group",
          "table-row-group",
          "table-row",
          "flow-root",
          "grid",
          "inline-grid",
          "contents",
          "list-item",
          "hidden",
        ],
        float: [{ float: ["right", "left", "none", "start", "end"] }],
        clear: [{ clear: ["left", "right", "both", "none", "start", "end"] }],
        isolation: ["isolate", "isolation-auto"],
        "object-fit": [{
          object: ["contain", "cover", "fill", "none", "scale-down"],
        }],
        "object-position": [{ object: [...mt(), q] }],
        overflow: [{ overflow: ye() }],
        "overflow-x": [{ "overflow-x": ye() }],
        "overflow-y": [{ "overflow-y": ye() }],
        overscroll: [{ overscroll: xe() }],
        "overscroll-x": [{ "overscroll-x": xe() }],
        "overscroll-y": [{ "overscroll-y": xe() }],
        position: ["static", "fixed", "absolute", "relative", "sticky"],
        inset: [{ inset: [_] }],
        "inset-x": [{ "inset-x": [_] }],
        "inset-y": [{ "inset-y": [_] }],
        start: [{ start: [_] }],
        end: [{ end: [_] }],
        top: [{ top: [_] }],
        right: [{ right: [_] }],
        bottom: [{ bottom: [_] }],
        left: [{ left: [_] }],
        visibility: ["visible", "invisible", "collapse"],
        z: [{ z: ["auto", An, q] }],
        basis: [{ basis: Ge() }],
        "flex-direction": [{
          flex: ["row", "row-reverse", "col", "col-reverse"],
        }],
        "flex-wrap": [{ flex: ["wrap", "wrap-reverse", "nowrap"] }],
        flex: [{ flex: ["1", "auto", "initial", "none", q] }],
        grow: [{ grow: Oe() }],
        shrink: [{ shrink: Oe() }],
        order: [{ order: ["first", "last", "none", An, q] }],
        "grid-cols": [{ "grid-cols": [Pn] }],
        "col-start-end": [{ col: ["auto", { span: ["full", An, q] }, q] }],
        "col-start": [{ "col-start": ot() }],
        "col-end": [{ "col-end": ot() }],
        "grid-rows": [{ "grid-rows": [Pn] }],
        "row-start-end": [{ row: ["auto", { span: [An, q] }, q] }],
        "row-start": [{ "row-start": ot() }],
        "row-end": [{ "row-end": ot() }],
        "grid-flow": [{
          "grid-flow": ["row", "col", "dense", "row-dense", "col-dense"],
        }],
        "auto-cols": [{ "auto-cols": ["auto", "min", "max", "fr", q] }],
        "auto-rows": [{ "auto-rows": ["auto", "min", "max", "fr", q] }],
        gap: [{ gap: [p] }],
        "gap-x": [{ "gap-x": [p] }],
        "gap-y": [{ "gap-y": [p] }],
        "justify-content": [{ justify: ["normal", ...X()] }],
        "justify-items": [{
          "justify-items": ["start", "end", "center", "stretch"],
        }],
        "justify-self": [{
          "justify-self": ["auto", "start", "end", "center", "stretch"],
        }],
        "align-content": [{ content: ["normal", ...X(), "baseline"] }],
        "align-items": [{
          items: ["start", "end", "center", "baseline", "stretch"],
        }],
        "align-self": [{
          self: ["auto", "start", "end", "center", "stretch", "baseline"],
        }],
        "place-content": [{ "place-content": [...X(), "baseline"] }],
        "place-items": [{
          "place-items": ["start", "end", "center", "baseline", "stretch"],
        }],
        "place-self": [{
          "place-self": ["auto", "start", "end", "center", "stretch"],
        }],
        p: [{ p: [O] }],
        px: [{ px: [O] }],
        py: [{ py: [O] }],
        ps: [{ ps: [O] }],
        pe: [{ pe: [O] }],
        pt: [{ pt: [O] }],
        pr: [{ pr: [O] }],
        pb: [{ pb: [O] }],
        pl: [{ pl: [O] }],
        m: [{ m: [b] }],
        mx: [{ mx: [b] }],
        my: [{ my: [b] }],
        ms: [{ ms: [b] }],
        me: [{ me: [b] }],
        mt: [{ mt: [b] }],
        mr: [{ mr: [b] }],
        mb: [{ mb: [b] }],
        ml: [{ ml: [b] }],
        "space-x": [{ "space-x": [J] }],
        "space-x-reverse": ["space-x-reverse"],
        "space-y": [{ "space-y": [J] }],
        "space-y-reverse": ["space-y-reverse"],
        w: [{ w: ["auto", "min", "max", "fit", "svw", "lvw", "dvw", q, t] }],
        "min-w": [{ "min-w": [q, t, "min", "max", "fit"] }],
        "max-w": [{
          "max-w": [q, t, "none", "full", "min", "max", "fit", "prose", {
            screen: [Rt],
          }, Rt],
        }],
        h: [{ h: [q, t, "auto", "min", "max", "fit", "svh", "lvh", "dvh"] }],
        "min-h": [{
          "min-h": [q, t, "min", "max", "fit", "svh", "lvh", "dvh"],
        }],
        "max-h": [{
          "max-h": [q, t, "min", "max", "fit", "svh", "lvh", "dvh"],
        }],
        size: [{ size: [q, t, "auto", "min", "max", "fit"] }],
        "font-size": [{ text: ["base", Rt, Tt] }],
        "font-smoothing": ["antialiased", "subpixel-antialiased"],
        "font-style": ["italic", "not-italic"],
        "font-weight": [{
          font: [
            "thin",
            "extralight",
            "light",
            "normal",
            "medium",
            "semibold",
            "bold",
            "extrabold",
            "black",
            Is,
          ],
        }],
        "font-family": [{ font: [Pn] }],
        "fvn-normal": ["normal-nums"],
        "fvn-ordinal": ["ordinal"],
        "fvn-slashed-zero": ["slashed-zero"],
        "fvn-figure": ["lining-nums", "oldstyle-nums"],
        "fvn-spacing": ["proportional-nums", "tabular-nums"],
        "fvn-fraction": ["diagonal-fractions", "stacked-fractons"],
        tracking: [{
          tracking: [
            "tighter",
            "tight",
            "normal",
            "wide",
            "wider",
            "widest",
            q,
          ],
        }],
        "line-clamp": [{ "line-clamp": ["none", bn, Is] }],
        leading: [{
          leading: [
            "none",
            "tight",
            "snug",
            "normal",
            "relaxed",
            "loose",
            vt,
            q,
          ],
        }],
        "list-image": [{ "list-image": ["none", q] }],
        "list-style-type": [{ list: ["none", "disc", "decimal", q] }],
        "list-style-position": [{ list: ["inside", "outside"] }],
        "placeholder-color": [{ placeholder: [e] }],
        "placeholder-opacity": [{ "placeholder-opacity": [I] }],
        "text-alignment": [{
          text: ["left", "center", "right", "justify", "start", "end"],
        }],
        "text-color": [{ text: [e] }],
        "text-opacity": [{ "text-opacity": [I] }],
        "text-decoration": [
          "underline",
          "overline",
          "line-through",
          "no-underline",
        ],
        "text-decoration-style": [{ decoration: [...he(), "wavy"] }],
        "text-decoration-thickness": [{
          decoration: ["auto", "from-font", vt, Tt],
        }],
        "underline-offset": [{ "underline-offset": ["auto", vt, q] }],
        "text-decoration-color": [{ decoration: [e] }],
        "text-transform": [
          "uppercase",
          "lowercase",
          "capitalize",
          "normal-case",
        ],
        "text-overflow": ["truncate", "text-ellipsis", "text-clip"],
        "text-wrap": [{ text: ["wrap", "nowrap", "balance", "pretty"] }],
        indent: [{ indent: ne() }],
        "vertical-align": [{
          align: [
            "baseline",
            "top",
            "middle",
            "bottom",
            "text-top",
            "text-bottom",
            "sub",
            "super",
            q,
          ],
        }],
        whitespace: [{
          whitespace: [
            "normal",
            "nowrap",
            "pre",
            "pre-line",
            "pre-wrap",
            "break-spaces",
          ],
        }],
        break: [{ break: ["normal", "words", "all", "keep"] }],
        hyphens: [{ hyphens: ["none", "manual", "auto"] }],
        content: [{ content: ["none", q] }],
        "bg-attachment": [{ bg: ["fixed", "local", "scroll"] }],
        "bg-clip": [{ "bg-clip": ["border", "padding", "content", "text"] }],
        "bg-opacity": [{ "bg-opacity": [I] }],
        "bg-origin": [{ "bg-origin": ["border", "padding", "content"] }],
        "bg-position": [{ bg: [...mt(), Dm] }],
        "bg-repeat": [{
          bg: ["no-repeat", { repeat: ["", "x", "y", "round", "space"] }],
        }],
        "bg-size": [{ bg: ["auto", "cover", "contain", Zm] }],
        "bg-image": [{
          bg: ["none", {
            "gradient-to": ["t", "tr", "r", "br", "b", "bl", "l", "tl"],
          }, zm],
        }],
        "bg-color": [{ bg: [e] }],
        "gradient-from-pos": [{ from: [k] }],
        "gradient-via-pos": [{ via: [k] }],
        "gradient-to-pos": [{ to: [k] }],
        "gradient-from": [{ from: [m] }],
        "gradient-via": [{ via: [m] }],
        "gradient-to": [{ to: [m] }],
        rounded: [{ rounded: [o] }],
        "rounded-s": [{ "rounded-s": [o] }],
        "rounded-e": [{ "rounded-e": [o] }],
        "rounded-t": [{ "rounded-t": [o] }],
        "rounded-r": [{ "rounded-r": [o] }],
        "rounded-b": [{ "rounded-b": [o] }],
        "rounded-l": [{ "rounded-l": [o] }],
        "rounded-ss": [{ "rounded-ss": [o] }],
        "rounded-se": [{ "rounded-se": [o] }],
        "rounded-ee": [{ "rounded-ee": [o] }],
        "rounded-es": [{ "rounded-es": [o] }],
        "rounded-tl": [{ "rounded-tl": [o] }],
        "rounded-tr": [{ "rounded-tr": [o] }],
        "rounded-br": [{ "rounded-br": [o] }],
        "rounded-bl": [{ "rounded-bl": [o] }],
        "border-w": [{ border: [a] }],
        "border-w-x": [{ "border-x": [a] }],
        "border-w-y": [{ "border-y": [a] }],
        "border-w-s": [{ "border-s": [a] }],
        "border-w-e": [{ "border-e": [a] }],
        "border-w-t": [{ "border-t": [a] }],
        "border-w-r": [{ "border-r": [a] }],
        "border-w-b": [{ "border-b": [a] }],
        "border-w-l": [{ "border-l": [a] }],
        "border-opacity": [{ "border-opacity": [I] }],
        "border-style": [{ border: [...he(), "hidden"] }],
        "divide-x": [{ "divide-x": [a] }],
        "divide-x-reverse": ["divide-x-reverse"],
        "divide-y": [{ "divide-y": [a] }],
        "divide-y-reverse": ["divide-y-reverse"],
        "divide-opacity": [{ "divide-opacity": [I] }],
        "divide-style": [{ divide: he() }],
        "border-color": [{ border: [s] }],
        "border-color-x": [{ "border-x": [s] }],
        "border-color-y": [{ "border-y": [s] }],
        "border-color-t": [{ "border-t": [s] }],
        "border-color-r": [{ "border-r": [s] }],
        "border-color-b": [{ "border-b": [s] }],
        "border-color-l": [{ "border-l": [s] }],
        "divide-color": [{ divide: [s] }],
        "outline-style": [{ outline: ["", ...he()] }],
        "outline-offset": [{ "outline-offset": [vt, q] }],
        "outline-w": [{ outline: [vt, Tt] }],
        "outline-color": [{ outline: [e] }],
        "ring-w": [{ ring: Ze() }],
        "ring-w-inset": ["ring-inset"],
        "ring-color": [{ ring: [e] }],
        "ring-opacity": [{ "ring-opacity": [I] }],
        "ring-offset-w": [{ "ring-offset": [vt, Tt] }],
        "ring-offset-color": [{ "ring-offset": [e] }],
        shadow: [{ shadow: ["", "inner", "none", Rt, Fm] }],
        "shadow-color": [{ shadow: [Pn] }],
        opacity: [{ opacity: [I] }],
        "mix-blend": [{
          "mix-blend": [...re(), "plus-lighter", "plus-darker"],
        }],
        "bg-blend": [{ "bg-blend": re() }],
        filter: [{ filter: ["", "none"] }],
        blur: [{ blur: [n] }],
        brightness: [{ brightness: [r] }],
        contrast: [{ contrast: [l] }],
        "drop-shadow": [{ "drop-shadow": ["", "none", Rt, q] }],
        grayscale: [{ grayscale: [c] }],
        "hue-rotate": [{ "hue-rotate": [u] }],
        invert: [{ invert: [f] }],
        saturate: [{ saturate: [$] }],
        sepia: [{ sepia: [Y] }],
        "backdrop-filter": [{ "backdrop-filter": ["", "none"] }],
        "backdrop-blur": [{ "backdrop-blur": [n] }],
        "backdrop-brightness": [{ "backdrop-brightness": [r] }],
        "backdrop-contrast": [{ "backdrop-contrast": [l] }],
        "backdrop-grayscale": [{ "backdrop-grayscale": [c] }],
        "backdrop-hue-rotate": [{ "backdrop-hue-rotate": [u] }],
        "backdrop-invert": [{ "backdrop-invert": [f] }],
        "backdrop-opacity": [{ "backdrop-opacity": [I] }],
        "backdrop-saturate": [{ "backdrop-saturate": [$] }],
        "backdrop-sepia": [{ "backdrop-sepia": [Y] }],
        "border-collapse": [{ border: ["collapse", "separate"] }],
        "border-spacing": [{ "border-spacing": [i] }],
        "border-spacing-x": [{ "border-spacing-x": [i] }],
        "border-spacing-y": [{ "border-spacing-y": [i] }],
        "table-layout": [{ table: ["auto", "fixed"] }],
        caption: [{ caption: ["top", "bottom"] }],
        transition: [{
          transition: [
            "none",
            "all",
            "",
            "colors",
            "opacity",
            "shadow",
            "transform",
            q,
          ],
        }],
        duration: [{ duration: ve() }],
        ease: [{ ease: ["linear", "in", "out", "in-out", q] }],
        delay: [{ delay: ve() }],
        animate: [{ animate: ["none", "spin", "ping", "pulse", "bounce", q] }],
        transform: [{ transform: ["", "gpu", "none"] }],
        scale: [{ scale: [T] }],
        "scale-x": [{ "scale-x": [T] }],
        "scale-y": [{ "scale-y": [T] }],
        rotate: [{ rotate: [An, q] }],
        "translate-x": [{ "translate-x": [be] }],
        "translate-y": [{ "translate-y": [be] }],
        "skew-x": [{ "skew-x": [B] }],
        "skew-y": [{ "skew-y": [B] }],
        "transform-origin": [{
          origin: [
            "center",
            "top",
            "top-right",
            "right",
            "bottom-right",
            "bottom",
            "bottom-left",
            "left",
            "top-left",
            q,
          ],
        }],
        accent: [{ accent: ["auto", e] }],
        appearance: [{ appearance: ["none", "auto"] }],
        cursor: [{
          cursor: [
            "auto",
            "default",
            "pointer",
            "wait",
            "text",
            "move",
            "help",
            "not-allowed",
            "none",
            "context-menu",
            "progress",
            "cell",
            "crosshair",
            "vertical-text",
            "alias",
            "copy",
            "no-drop",
            "grab",
            "grabbing",
            "all-scroll",
            "col-resize",
            "row-resize",
            "n-resize",
            "e-resize",
            "s-resize",
            "w-resize",
            "ne-resize",
            "nw-resize",
            "se-resize",
            "sw-resize",
            "ew-resize",
            "ns-resize",
            "nesw-resize",
            "nwse-resize",
            "zoom-in",
            "zoom-out",
            q,
          ],
        }],
        "caret-color": [{ caret: [e] }],
        "pointer-events": [{ "pointer-events": ["none", "auto"] }],
        resize: [{ resize: ["none", "y", "x", ""] }],
        "scroll-behavior": [{ scroll: ["auto", "smooth"] }],
        "scroll-m": [{ "scroll-m": ne() }],
        "scroll-mx": [{ "scroll-mx": ne() }],
        "scroll-my": [{ "scroll-my": ne() }],
        "scroll-ms": [{ "scroll-ms": ne() }],
        "scroll-me": [{ "scroll-me": ne() }],
        "scroll-mt": [{ "scroll-mt": ne() }],
        "scroll-mr": [{ "scroll-mr": ne() }],
        "scroll-mb": [{ "scroll-mb": ne() }],
        "scroll-ml": [{ "scroll-ml": ne() }],
        "scroll-p": [{ "scroll-p": ne() }],
        "scroll-px": [{ "scroll-px": ne() }],
        "scroll-py": [{ "scroll-py": ne() }],
        "scroll-ps": [{ "scroll-ps": ne() }],
        "scroll-pe": [{ "scroll-pe": ne() }],
        "scroll-pt": [{ "scroll-pt": ne() }],
        "scroll-pr": [{ "scroll-pr": ne() }],
        "scroll-pb": [{ "scroll-pb": ne() }],
        "scroll-pl": [{ "scroll-pl": ne() }],
        "snap-align": [{ snap: ["start", "end", "center", "align-none"] }],
        "snap-stop": [{ snap: ["normal", "always"] }],
        "snap-type": [{ snap: ["none", "x", "y", "both"] }],
        "snap-strictness": [{ snap: ["mandatory", "proximity"] }],
        touch: [{ touch: ["auto", "none", "manipulation"] }],
        "touch-x": [{ "touch-pan": ["x", "left", "right"] }],
        "touch-y": [{ "touch-pan": ["y", "up", "down"] }],
        "touch-pz": ["touch-pinch-zoom"],
        select: [{ select: ["none", "text", "all", "auto"] }],
        "will-change": [{
          "will-change": ["auto", "scroll", "contents", "transform", q],
        }],
        fill: [{ fill: [e, "none"] }],
        "stroke-w": [{ stroke: [vt, Tt, Is] }],
        stroke: [{ stroke: [e, "none"] }],
        sr: ["sr-only", "not-sr-only"],
        "forced-color-adjust": [{ "forced-color-adjust": ["auto", "none"] }],
      },
      conflictingClassGroups: {
        overflow: ["overflow-x", "overflow-y"],
        overscroll: ["overscroll-x", "overscroll-y"],
        inset: [
          "inset-x",
          "inset-y",
          "start",
          "end",
          "top",
          "right",
          "bottom",
          "left",
        ],
        "inset-x": ["right", "left"],
        "inset-y": ["top", "bottom"],
        flex: ["basis", "grow", "shrink"],
        gap: ["gap-x", "gap-y"],
        p: ["px", "py", "ps", "pe", "pt", "pr", "pb", "pl"],
        px: ["pr", "pl"],
        py: ["pt", "pb"],
        m: ["mx", "my", "ms", "me", "mt", "mr", "mb", "ml"],
        mx: ["mr", "ml"],
        my: ["mt", "mb"],
        size: ["w", "h"],
        "font-size": ["leading"],
        "fvn-normal": [
          "fvn-ordinal",
          "fvn-slashed-zero",
          "fvn-figure",
          "fvn-spacing",
          "fvn-fraction",
        ],
        "fvn-ordinal": ["fvn-normal"],
        "fvn-slashed-zero": ["fvn-normal"],
        "fvn-figure": ["fvn-normal"],
        "fvn-spacing": ["fvn-normal"],
        "fvn-fraction": ["fvn-normal"],
        "line-clamp": ["display", "overflow"],
        rounded: [
          "rounded-s",
          "rounded-e",
          "rounded-t",
          "rounded-r",
          "rounded-b",
          "rounded-l",
          "rounded-ss",
          "rounded-se",
          "rounded-ee",
          "rounded-es",
          "rounded-tl",
          "rounded-tr",
          "rounded-br",
          "rounded-bl",
        ],
        "rounded-s": ["rounded-ss", "rounded-es"],
        "rounded-e": ["rounded-se", "rounded-ee"],
        "rounded-t": ["rounded-tl", "rounded-tr"],
        "rounded-r": ["rounded-tr", "rounded-br"],
        "rounded-b": ["rounded-br", "rounded-bl"],
        "rounded-l": ["rounded-tl", "rounded-bl"],
        "border-spacing": ["border-spacing-x", "border-spacing-y"],
        "border-w": [
          "border-w-s",
          "border-w-e",
          "border-w-t",
          "border-w-r",
          "border-w-b",
          "border-w-l",
        ],
        "border-w-x": ["border-w-r", "border-w-l"],
        "border-w-y": ["border-w-t", "border-w-b"],
        "border-color": [
          "border-color-t",
          "border-color-r",
          "border-color-b",
          "border-color-l",
        ],
        "border-color-x": ["border-color-r", "border-color-l"],
        "border-color-y": ["border-color-t", "border-color-b"],
        "scroll-m": [
          "scroll-mx",
          "scroll-my",
          "scroll-ms",
          "scroll-me",
          "scroll-mt",
          "scroll-mr",
          "scroll-mb",
          "scroll-ml",
        ],
        "scroll-mx": ["scroll-mr", "scroll-ml"],
        "scroll-my": ["scroll-mt", "scroll-mb"],
        "scroll-p": [
          "scroll-px",
          "scroll-py",
          "scroll-ps",
          "scroll-pe",
          "scroll-pt",
          "scroll-pr",
          "scroll-pb",
          "scroll-pl",
        ],
        "scroll-px": ["scroll-pr", "scroll-pl"],
        "scroll-py": ["scroll-pt", "scroll-pb"],
        touch: ["touch-x", "touch-y", "touch-pz"],
        "touch-x": ["touch"],
        "touch-y": ["touch"],
        "touch-pz": ["touch"],
      },
      conflictingClassGroupModifiers: { "font-size": ["leading"] },
    };
  },
  Gm = Rm(Wm);
function Km(...e) {
  return Gm(mm(e));
}
const na = rn({
    __name: "Button",
    props: {
      variant: {},
      size: {},
      as: { default: "button" },
      asChild: { type: Boolean },
    },
    setup(e) {
      return (t, n) => (jt(),
        Zr(
          Me(hm),
          {
            as: t.as,
            "as-child": t.asChild,
            class: Yr(
              Me(Km)(
                Me(qm)({ variant: t.variant, size: t.size }),
                t.$attrs.class ?? "",
              ),
            ),
          },
          { default: $r(() => [vu(t.$slots, "default")]), _: 3 },
          8,
          ["as", "as-child", "class"],
        ));
    },
  }),
  qm = um(
    "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
    {
      variants: {
        variant: {
          default:
            "bg-primary text-primary-foreground shadow hover:bg-primary/90",
          destructive:
            "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
          outline:
            "border border-input bg-transparent shadow-sm hover:bg-accent hover:text-accent-foreground",
          secondary:
            "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
          ghost: "hover:bg-accent hover:text-accent-foreground",
          link: "text-primary underline-offset-4 hover:underline",
        },
        size: {
          default: "h-9 px-4 py-2",
          sm: "h-8 rounded-md px-3 text-xs",
          lg: "h-10 rounded-md px-8",
          icon: "h-9 w-9",
        },
      },
      defaultVariants: { variant: "default", size: "default" },
    },
  ),
  Qm = { class: "flex min-h-full justify-center items-center" },
  Jm = { class: "flex flex-col gap-6 w-10/12 sm:w-8/12 2xl:w-6/12 py-6" },
  Ym = { class: "flex gap-2 flex-col sm:flex-row" },
  Xm = { key: 0, class: "flex justify-center" },
  eg = { key: 1, class: "font-mono", "data-cy": "greeting" },
  tg = { key: 2 },
  ng = rn({
    __name: "home-page",
    setup(e) {
      const t = rp(),
        n = [
          "Tap Water",
          "Vue",
          "Cloudflare",
          "ts-rest",
          "Tailwind",
          "Vercel",
          "Cypress",
          "Docker",
          "e2e Typesafety",
          "Netlify",
          "Heroku",
        ],
        r = Zn(-1),
        s = Zn(""),
        o = Zn(!1);
      return Vn(r, async (i) => {
        try {
          o.value = !0;
          const { body: a } = await t.greet({
            query: { name: n[i % n.length] },
          });
          s.value = a;
        } catch {
          s.value = "some unexpected error occurred 😰";
        } finally {
          o.value = !1;
        }
      }),
        (i, a) => (jt(),
          Er("div", Qm, [
            It("div", Jm, [
              a[3] ||
              (a[3] = It("div", { class: "text-3xl lg:text-6xl font-bold" }, [
                It("h1", {
                  class:
                    "inline-block bg-gradient-to-r from-blue-900 to-blue-500 bg-clip-text text-transparent",
                }, " Tap Water. "),
                It(
                  "p",
                  null,
                  "Build fullstack Vue apps with e2e typesafety and DX in mind. Deploy to the cloud within seconds 🚀",
                ),
              ], -1)),
              It("div", Ym, [
                we(
                  Me(na),
                  {
                    onClick: a[0] || (a[0] = (l) => r.value++),
                    disabled: o.value,
                    "data-cy": "submit",
                  },
                  {
                    default: $r(() => [
                      o.value
                        ? (jt(),
                          Er("span", Xm, [
                            we(
                              Me(Ji),
                              {
                                icon: Me(lm),
                                width: "20",
                                class: "animate-spin",
                              },
                              null,
                              8,
                              ["icon"],
                            ),
                          ]))
                        : s.value
                        ? (jt(), Er("span", eg, fa(s.value), 1))
                        : (jt(),
                          Er("span", tg, "Demonstrate Typesafe Backendcall")),
                    ]),
                    _: 1,
                  },
                  8,
                  ["disabled"],
                ),
                we(Me(na), {
                  variant: "secondary",
                  as: "a",
                  href: "https://github.com/adamsondavid/tapw",
                  target: "_blank",
                }, {
                  default: $r(
                    () => [
                      a[1] || (a[1] = ll(" Use this Template on ")),
                      we(
                        Me(Ji),
                        {
                          icon: Me(am),
                          width: "20",
                          class: "inline align-text-bottom",
                        },
                        null,
                        8,
                        ["icon"],
                      ),
                      a[2] ||
                      (a[2] = It("span", { class: "font-bold" }, "GitHub", -1)),
                    ],
                  ),
                  _: 1,
                }),
              ]),
            ]),
          ]));
    },
  }),
  rg = $d({
    history: dd(),
    routes: [{ path: "/", component: ng }, {
      path: "/:path(.*)*",
      redirect: "/",
    }],
  });
Of(jf).use(rg).mount("#app");
