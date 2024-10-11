var x;
(function (r) {
  r.assertEqual = (n) => n;
  function e(n) {}
  r.assertIs = e;
  function t(n) {
    throw new Error();
  }
  r.assertNever = t,
    r.arrayToEnum = (n) => {
      let a = {};
      for (let i of n) a[i] = i;
      return a;
    },
    r.getValidEnumValues = (n) => {
      let a = r.objectKeys(n).filter((o) => typeof n[n[o]] != "number"), i = {};
      for (let o of a) i[o] = n[o];
      return r.objectValues(i);
    },
    r.objectValues = (n) => r.objectKeys(n).map(function (a) {
      return n[a];
    }),
    r.objectKeys = typeof Object.keys == "function"
      ? (n) => Object.keys(n)
      : (n) => {
        let a = [];
        for (let i in n) {Object.prototype.hasOwnProperty.call(n, i) &&
            a.push(i);}
        return a;
      },
    r.find = (n, a) => {
      for (let i of n) if (a(i)) return i;
    },
    r.isInteger = typeof Number.isInteger == "function"
      ? (n) => Number.isInteger(n)
      : (n) => typeof n == "number" && isFinite(n) && Math.floor(n) === n;
  function s(n, a = " | ") {
    return n.map((i) => typeof i == "string" ? `'${i}'` : i).join(a);
  }
  r.joinValues = s,
    r.jsonStringifyReplacer = (n, a) => typeof a == "bigint" ? a.toString() : a;
})(x || (x = {}));
var Je;
(function (r) {
  r.mergeShapes = (e, t) => ({ ...e, ...t });
})(Je || (Je = {}));
var h = x.arrayToEnum([
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
  U = (r) => {
    switch (typeof r) {
      case "undefined":
        return h.undefined;
      case "string":
        return h.string;
      case "number":
        return isNaN(r) ? h.nan : h.number;
      case "boolean":
        return h.boolean;
      case "function":
        return h.function;
      case "bigint":
        return h.bigint;
      case "symbol":
        return h.symbol;
      case "object":
        return Array.isArray(r)
          ? h.array
          : r === null
          ? h.null
          : r.then && typeof r.then == "function" && r.catch &&
              typeof r.catch == "function"
          ? h.promise
          : typeof Map < "u" && r instanceof Map
          ? h.map
          : typeof Set < "u" && r instanceof Set
          ? h.set
          : typeof Date < "u" && r instanceof Date
          ? h.date
          : h.object;
      default:
        return h.unknown;
    }
  },
  d = x.arrayToEnum([
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
  Mt = (r) => JSON.stringify(r, null, 2).replace(/"([^"]+)":/g, "$1:"),
  C = class r extends Error {
    constructor(e) {
      super(),
        this.issues = [],
        this.addIssue = (s) => {
          this.issues = [...this.issues, s];
        },
        this.addIssues = (s = []) => {
          this.issues = [...this.issues, ...s];
        };
      let t = new.target.prototype;
      Object.setPrototypeOf
        ? Object.setPrototypeOf(this, t)
        : this.__proto__ = t,
        this.name = "ZodError",
        this.issues = e;
    }
    get errors() {
      return this.issues;
    }
    format(e) {
      let t = e || function (a) {
          return a.message;
        },
        s = { _errors: [] },
        n = (a) => {
          for (let i of a.issues) {
            if (i.code === "invalid_union") i.unionErrors.map(n);
            else if (i.code === "invalid_return_type") n(i.returnTypeError);
            else if (i.code === "invalid_arguments") n(i.argumentsError);
            else if (i.path.length === 0) s._errors.push(t(i));
            else {
              let o = s, l = 0;
              for (; l < i.path.length;) {
                let c = i.path[l];
                l === i.path.length - 1
                  ? (o[c] = o[c] || { _errors: [] }, o[c]._errors.push(t(i)))
                  : o[c] = o[c] || { _errors: [] },
                  o = o[c],
                  l++;
              }
            }
          }
        };
      return n(this), s;
    }
    static assert(e) {
      if (!(e instanceof r)) throw new Error(`Not a ZodError: ${e}`);
    }
    toString() {
      return this.message;
    }
    get message() {
      return JSON.stringify(this.issues, x.jsonStringifyReplacer, 2);
    }
    get isEmpty() {
      return this.issues.length === 0;
    }
    flatten(e = (t) => t.message) {
      let t = {}, s = [];
      for (let n of this.issues) {
        n.path.length > 0
          ? (t[n.path[0]] = t[n.path[0]] || [], t[n.path[0]].push(e(n)))
          : s.push(e(n));
      }
      return { formErrors: s, fieldErrors: t };
    }
    get formErrors() {
      return this.flatten();
    }
  };
C.create = (r) => new C(r);
var he = (r, e) => {
    let t;
    switch (r.code) {
      case d.invalid_type:
        r.received === h.undefined
          ? t = "Required"
          : t = `Expected ${r.expected}, received ${r.received}`;
        break;
      case d.invalid_literal:
        t = `Invalid literal value, expected ${
          JSON.stringify(r.expected, x.jsonStringifyReplacer)
        }`;
        break;
      case d.unrecognized_keys:
        t = `Unrecognized key(s) in object: ${x.joinValues(r.keys, ", ")}`;
        break;
      case d.invalid_union:
        t = "Invalid input";
        break;
      case d.invalid_union_discriminator:
        t = `Invalid discriminator value. Expected ${x.joinValues(r.options)}`;
        break;
      case d.invalid_enum_value:
        t = `Invalid enum value. Expected ${
          x.joinValues(r.options)
        }, received '${r.received}'`;
        break;
      case d.invalid_arguments:
        t = "Invalid function arguments";
        break;
      case d.invalid_return_type:
        t = "Invalid function return type";
        break;
      case d.invalid_date:
        t = "Invalid date";
        break;
      case d.invalid_string:
        typeof r.validation == "object"
          ? "includes" in r.validation
            ? (t = `Invalid input: must include "${r.validation.includes}"`,
              typeof r.validation.position == "number" &&
              (t =
                `${t} at one or more positions greater than or equal to ${r.validation.position}`))
            : "startsWith" in r.validation
            ? t = `Invalid input: must start with "${r.validation.startsWith}"`
            : "endsWith" in r.validation
            ? t = `Invalid input: must end with "${r.validation.endsWith}"`
            : x.assertNever(r.validation)
          : r.validation !== "regex"
          ? t = `Invalid ${r.validation}`
          : t = "Invalid";
        break;
      case d.too_small:
        r.type === "array"
          ? t = `Array must contain ${
            r.exact ? "exactly" : r.inclusive ? "at least" : "more than"
          } ${r.minimum} element(s)`
          : r.type === "string"
          ? t = `String must contain ${
            r.exact ? "exactly" : r.inclusive ? "at least" : "over"
          } ${r.minimum} character(s)`
          : r.type === "number"
          ? t = `Number must be ${
            r.exact
              ? "exactly equal to "
              : r.inclusive
              ? "greater than or equal to "
              : "greater than "
          }${r.minimum}`
          : r.type === "date"
          ? t = `Date must be ${
            r.exact
              ? "exactly equal to "
              : r.inclusive
              ? "greater than or equal to "
              : "greater than "
          }${new Date(Number(r.minimum))}`
          : t = "Invalid input";
        break;
      case d.too_big:
        r.type === "array"
          ? t = `Array must contain ${
            r.exact ? "exactly" : r.inclusive ? "at most" : "less than"
          } ${r.maximum} element(s)`
          : r.type === "string"
          ? t = `String must contain ${
            r.exact ? "exactly" : r.inclusive ? "at most" : "under"
          } ${r.maximum} character(s)`
          : r.type === "number"
          ? t = `Number must be ${
            r.exact
              ? "exactly"
              : r.inclusive
              ? "less than or equal to"
              : "less than"
          } ${r.maximum}`
          : r.type === "bigint"
          ? t = `BigInt must be ${
            r.exact
              ? "exactly"
              : r.inclusive
              ? "less than or equal to"
              : "less than"
          } ${r.maximum}`
          : r.type === "date"
          ? t = `Date must be ${
            r.exact
              ? "exactly"
              : r.inclusive
              ? "smaller than or equal to"
              : "smaller than"
          } ${new Date(Number(r.maximum))}`
          : t = "Invalid input";
        break;
      case d.custom:
        t = "Invalid input";
        break;
      case d.invalid_intersection_types:
        t = "Intersection results could not be merged";
        break;
      case d.not_multiple_of:
        t = `Number must be a multiple of ${r.multipleOf}`;
        break;
      case d.not_finite:
        t = "Number must be finite";
        break;
      default:
        t = e.defaultError, x.assertNever(r);
    }
    return { message: t };
  },
  ot = he;
function Vt(r) {
  ot = r;
}
function Me() {
  return ot;
}
var Ve = (r) => {
    let { data: e, path: t, errorMaps: s, issueData: n } = r,
      a = [...t, ...n.path || []],
      i = { ...n, path: a };
    if (n.message !== void 0) return { ...n, path: a, message: n.message };
    let o = "", l = s.filter((c) => !!c).slice().reverse();
    for (let c of l) o = c(i, { data: e, defaultError: o }).message;
    return { ...n, path: a, message: o };
  },
  Dt = [];
function f(r, e) {
  let t = Me(),
    s = Ve({
      issueData: e,
      data: r.data,
      path: r.path,
      errorMaps: [
        r.common.contextualErrorMap,
        r.schemaErrorMap,
        t,
        t === he ? void 0 : he,
      ].filter((n) => !!n),
    });
  r.common.issues.push(s);
}
var b = class r {
    constructor() {
      this.value = "valid";
    }
    dirty() {
      this.value === "valid" && (this.value = "dirty");
    }
    abort() {
      this.value !== "aborted" && (this.value = "aborted");
    }
    static mergeArray(e, t) {
      let s = [];
      for (let n of t) {
        if (n.status === "aborted") return y;
        n.status === "dirty" && e.dirty(), s.push(n.value);
      }
      return { status: e.value, value: s };
    }
    static async mergeObjectAsync(e, t) {
      let s = [];
      for (let n of t) {
        let a = await n.key, i = await n.value;
        s.push({ key: a, value: i });
      }
      return r.mergeObjectSync(e, s);
    }
    static mergeObjectSync(e, t) {
      let s = {};
      for (let n of t) {
        let { key: a, value: i } = n;
        if (a.status === "aborted" || i.status === "aborted") return y;
        a.status === "dirty" && e.dirty(),
          i.status === "dirty" && e.dirty(),
          a.value !== "__proto__" && (typeof i.value < "u" || n.alwaysSet) &&
          (s[a.value] = i.value);
      }
      return { status: e.value, value: s };
    }
  },
  y = Object.freeze({ status: "aborted" }),
  fe = (r) => ({ status: "dirty", value: r }),
  T = (r) => ({ status: "valid", value: r }),
  Fe = (r) => r.status === "aborted",
  Ge = (r) => r.status === "dirty",
  Re = (r) => r.status === "valid",
  Ce = (r) => typeof Promise < "u" && r instanceof Promise;
function De(r, e, t, s) {
  if (t === "a" && !s) {
    throw new TypeError("Private accessor was defined without a getter");
  }
  if (typeof e == "function" ? r !== e || !s : !e.has(r)) {
    throw new TypeError(
      "Cannot read private member from an object whose class did not declare it",
    );
  }
  return t === "m" ? s : t === "a" ? s.call(r) : s ? s.value : e.get(r);
}
function ct(r, e, t, s, n) {
  if (s === "m") throw new TypeError("Private method is not writable");
  if (s === "a" && !n) {
    throw new TypeError("Private accessor was defined without a setter");
  }
  if (typeof e == "function" ? r !== e || !n : !e.has(r)) {
    throw new TypeError(
      "Cannot write private member to an object whose class did not declare it",
    );
  }
  return s === "a" ? n.call(r, t) : n ? n.value = t : e.set(r, t), t;
}
var p;
(function (r) {
  r.errToObj = (e) => typeof e == "string" ? { message: e } : e || {},
    r.toString = (e) => typeof e == "string" ? e : e?.message;
})(p || (p = {}));
var ke,
  Te,
  O = class {
    constructor(e, t, s, n) {
      this._cachedPath = [],
        this.parent = e,
        this.data = t,
        this._path = s,
        this._key = n;
    }
    get path() {
      return this._cachedPath.length ||
        (this._key instanceof Array
          ? this._cachedPath.push(...this._path, ...this._key)
          : this._cachedPath.push(...this._path, this._key)),
        this._cachedPath;
    }
  },
  at = (r, e) => {
    if (Re(e)) return { success: !0, data: e.value };
    if (!r.common.issues.length) {
      throw new Error("Validation failed but no issues detected.");
    }
    return {
      success: !1,
      get error() {
        if (this._error) return this._error;
        let t = new C(r.common.issues);
        return this._error = t, this._error;
      },
    };
  };
function g(r) {
  if (!r) return {};
  let {
    errorMap: e,
    invalid_type_error: t,
    required_error: s,
    description: n,
  } = r;
  if (e && (t || s)) {
    throw new Error(
      `Can't use "invalid_type_error" or "required_error" in conjunction with custom error map.`,
    );
  }
  return e ? { errorMap: e, description: n } : {
    errorMap: (i, o) => {
      var l, c;
      let { message: u } = r;
      return i.code === "invalid_enum_value"
        ? { message: u ?? o.defaultError }
        : typeof o.data > "u"
        ? {
          message: (l = u ?? s) !== null && l !== void 0 ? l : o.defaultError,
        }
        : i.code !== "invalid_type"
        ? { message: o.defaultError }
        : {
          message: (c = u ?? t) !== null && c !== void 0 ? c : o.defaultError,
        };
    },
    description: n,
  };
}
var v = class {
    constructor(e) {
      this.spa = this.safeParseAsync,
        this._def = e,
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
    _getType(e) {
      return U(e.data);
    }
    _getOrReturnCtx(e, t) {
      return t ||
        {
          common: e.parent.common,
          data: e.data,
          parsedType: U(e.data),
          schemaErrorMap: this._def.errorMap,
          path: e.path,
          parent: e.parent,
        };
    }
    _processInputParams(e) {
      return {
        status: new b(),
        ctx: {
          common: e.parent.common,
          data: e.data,
          parsedType: U(e.data),
          schemaErrorMap: this._def.errorMap,
          path: e.path,
          parent: e.parent,
        },
      };
    }
    _parseSync(e) {
      let t = this._parse(e);
      if (Ce(t)) throw new Error("Synchronous parse encountered promise.");
      return t;
    }
    _parseAsync(e) {
      let t = this._parse(e);
      return Promise.resolve(t);
    }
    parse(e, t) {
      let s = this.safeParse(e, t);
      if (s.success) return s.data;
      throw s.error;
    }
    safeParse(e, t) {
      var s;
      let n = {
          common: {
            issues: [],
            async: (s = t?.async) !== null && s !== void 0 ? s : !1,
            contextualErrorMap: t?.errorMap,
          },
          path: t?.path || [],
          schemaErrorMap: this._def.errorMap,
          parent: null,
          data: e,
          parsedType: U(e),
        },
        a = this._parseSync({ data: e, path: n.path, parent: n });
      return at(n, a);
    }
    async parseAsync(e, t) {
      let s = await this.safeParseAsync(e, t);
      if (s.success) return s.data;
      throw s.error;
    }
    async safeParseAsync(e, t) {
      let s = {
          common: { issues: [], contextualErrorMap: t?.errorMap, async: !0 },
          path: t?.path || [],
          schemaErrorMap: this._def.errorMap,
          parent: null,
          data: e,
          parsedType: U(e),
        },
        n = this._parse({ data: e, path: s.path, parent: s }),
        a = await (Ce(n) ? n : Promise.resolve(n));
      return at(s, a);
    }
    refine(e, t) {
      let s = (n) =>
        typeof t == "string" || typeof t > "u"
          ? { message: t }
          : typeof t == "function"
          ? t(n)
          : t;
      return this._refinement((n, a) => {
        let i = e(n), o = () => a.addIssue({ code: d.custom, ...s(n) });
        return typeof Promise < "u" && i instanceof Promise
          ? i.then((l) => l ? !0 : (o(), !1))
          : i
          ? !0
          : (o(), !1);
      });
    }
    refinement(e, t) {
      return this._refinement((s, n) =>
        e(s) ? !0 : (n.addIssue(typeof t == "function" ? t(s, n) : t), !1)
      );
    }
    _refinement(e) {
      return new E({
        schema: this,
        typeName: m.ZodEffects,
        effect: { type: "refinement", refinement: e },
      });
    }
    superRefine(e) {
      return this._refinement(e);
    }
    optional() {
      return S.create(this, this._def);
    }
    nullable() {
      return $.create(this, this._def);
    }
    nullish() {
      return this.nullable().optional();
    }
    array() {
      return V.create(this, this._def);
    }
    promise() {
      return H.create(this, this._def);
    }
    or(e) {
      return K.create([this, e], this._def);
    }
    and(e) {
      return X.create(this, e, this._def);
    }
    transform(e) {
      return new E({
        ...g(this._def),
        schema: this,
        typeName: m.ZodEffects,
        effect: { type: "transform", transform: e },
      });
    }
    default(e) {
      let t = typeof e == "function" ? e : () => e;
      return new ne({
        ...g(this._def),
        innerType: this,
        defaultValue: t,
        typeName: m.ZodDefault,
      });
    }
    brand() {
      return new Ee({ typeName: m.ZodBranded, type: this, ...g(this._def) });
    }
    catch(e) {
      let t = typeof e == "function" ? e : () => e;
      return new ae({
        ...g(this._def),
        innerType: this,
        catchValue: t,
        typeName: m.ZodCatch,
      });
    }
    describe(e) {
      let t = this.constructor;
      return new t({ ...this._def, description: e });
    }
    pipe(e) {
      return Se.create(this, e);
    }
    readonly() {
      return ie.create(this);
    }
    isOptional() {
      return this.safeParse(void 0).success;
    }
    isNullable() {
      return this.safeParse(null).success;
    }
  },
  Ut = /^c[^\s-]{8,}$/i,
  Lt = /^[0-9a-z]+$/,
  zt = /^[0-9A-HJKMNP-TV-Z]{26}$/,
  Ht =
    /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/i,
  qt = /^[a-z0-9_-]{21}$/i,
  Bt =
    /^[-+]?P(?!$)(?:(?:[-+]?\d+Y)|(?:[-+]?\d+[.,]\d+Y$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:(?:[-+]?\d+W)|(?:[-+]?\d+[.,]\d+W$))?(?:(?:[-+]?\d+D)|(?:[-+]?\d+[.,]\d+D$))?(?:T(?=[\d+-])(?:(?:[-+]?\d+H)|(?:[-+]?\d+[.,]\d+H$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:[-+]?\d+(?:[.,]\d+)?S)?)??$/,
  Wt =
    /^(?!\.)(?!.*\.\.)([A-Z0-9_'+\-\.]*)[A-Z0-9_+-]@([A-Z0-9][A-Z0-9\-]*\.)+[A-Z]{2,}$/i,
  Jt = "^(\\p{Extended_Pictographic}|\\p{Emoji_Component})+$",
  We,
  Ft =
    /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/,
  Gt =
    /^(([a-f0-9]{1,4}:){7}|::([a-f0-9]{1,4}:){0,6}|([a-f0-9]{1,4}:){1}:([a-f0-9]{1,4}:){0,5}|([a-f0-9]{1,4}:){2}:([a-f0-9]{1,4}:){0,4}|([a-f0-9]{1,4}:){3}:([a-f0-9]{1,4}:){0,3}|([a-f0-9]{1,4}:){4}:([a-f0-9]{1,4}:){0,2}|([a-f0-9]{1,4}:){5}:([a-f0-9]{1,4}:){0,1})([a-f0-9]{1,4}|(((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2}))\.){3}((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2})))$/,
  Qt = /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/,
  dt =
    "((\\d\\d[2468][048]|\\d\\d[13579][26]|\\d\\d0[48]|[02468][048]00|[13579][26]00)-02-29|\\d{4}-((0[13578]|1[02])-(0[1-9]|[12]\\d|3[01])|(0[469]|11)-(0[1-9]|[12]\\d|30)|(02)-(0[1-9]|1\\d|2[0-8])))",
  Yt = new RegExp(`^${dt}$`);
function ut(r) {
  let e = "([01]\\d|2[0-3]):[0-5]\\d:[0-5]\\d";
  return r.precision
    ? e = `${e}\\.\\d{${r.precision}}`
    : r.precision == null && (e = `${e}(\\.\\d+)?`),
    e;
}
function Kt(r) {
  return new RegExp(`^${ut(r)}$`);
}
function lt(r) {
  let e = `${dt}T${ut(r)}`, t = [];
  return t.push(r.local ? "Z?" : "Z"),
    r.offset && t.push("([+-]\\d{2}:?\\d{2})"),
    e = `${e}(${t.join("|")})`,
    new RegExp(`^${e}$`);
}
function Xt(r, e) {
  return !!((e === "v4" || !e) && Ft.test(r) ||
    (e === "v6" || !e) && Gt.test(r));
}
var L = class r extends v {
  _parse(e) {
    if (
      this._def.coerce && (e.data = String(e.data)),
        this._getType(e) !== h.string
    ) {
      let a = this._getOrReturnCtx(e);
      return f(a, {
        code: d.invalid_type,
        expected: h.string,
        received: a.parsedType,
      }),
        y;
    }
    let s = new b(), n;
    for (let a of this._def.checks) {
      if (a.kind === "min") {
        e.data.length < a.value &&
          (n = this._getOrReturnCtx(e, n),
            f(n, {
              code: d.too_small,
              minimum: a.value,
              type: "string",
              inclusive: !0,
              exact: !1,
              message: a.message,
            }),
            s.dirty());
      } else if (a.kind === "max") {
        e.data.length > a.value &&
          (n = this._getOrReturnCtx(e, n),
            f(n, {
              code: d.too_big,
              maximum: a.value,
              type: "string",
              inclusive: !0,
              exact: !1,
              message: a.message,
            }),
            s.dirty());
      } else if (a.kind === "length") {
        let i = e.data.length > a.value, o = e.data.length < a.value;
        (i || o) && (n = this._getOrReturnCtx(e, n),
          i
            ? f(n, {
              code: d.too_big,
              maximum: a.value,
              type: "string",
              inclusive: !0,
              exact: !0,
              message: a.message,
            })
            : o &&
              f(n, {
                code: d.too_small,
                minimum: a.value,
                type: "string",
                inclusive: !0,
                exact: !0,
                message: a.message,
              }),
          s.dirty());
      } else if (a.kind === "email") {
        Wt.test(e.data) ||
          (n = this._getOrReturnCtx(e, n),
            f(n, {
              validation: "email",
              code: d.invalid_string,
              message: a.message,
            }),
            s.dirty());
      } else if (a.kind === "emoji") {
        We || (We = new RegExp(Jt, "u")),
          We.test(e.data) ||
          (n = this._getOrReturnCtx(e, n),
            f(n, {
              validation: "emoji",
              code: d.invalid_string,
              message: a.message,
            }),
            s.dirty());
      } else if (a.kind === "uuid") {
        Ht.test(e.data) ||
          (n = this._getOrReturnCtx(e, n),
            f(n, {
              validation: "uuid",
              code: d.invalid_string,
              message: a.message,
            }),
            s.dirty());
      } else if (a.kind === "nanoid") {
        qt.test(e.data) ||
          (n = this._getOrReturnCtx(e, n),
            f(n, {
              validation: "nanoid",
              code: d.invalid_string,
              message: a.message,
            }),
            s.dirty());
      } else if (a.kind === "cuid") {
        Ut.test(e.data) ||
          (n = this._getOrReturnCtx(e, n),
            f(n, {
              validation: "cuid",
              code: d.invalid_string,
              message: a.message,
            }),
            s.dirty());
      } else if (a.kind === "cuid2") {
        Lt.test(e.data) ||
          (n = this._getOrReturnCtx(e, n),
            f(n, {
              validation: "cuid2",
              code: d.invalid_string,
              message: a.message,
            }),
            s.dirty());
      } else if (a.kind === "ulid") {
        zt.test(e.data) ||
          (n = this._getOrReturnCtx(e, n),
            f(n, {
              validation: "ulid",
              code: d.invalid_string,
              message: a.message,
            }),
            s.dirty());
      } else if (a.kind === "url") {
        try {
          new URL(e.data);
        } catch {
          n = this._getOrReturnCtx(e, n),
            f(n, {
              validation: "url",
              code: d.invalid_string,
              message: a.message,
            }),
            s.dirty();
        }
      } else {a.kind === "regex"
          ? (a.regex.lastIndex = 0,
            a.regex.test(e.data) ||
            (n = this._getOrReturnCtx(e, n),
              f(n, {
                validation: "regex",
                code: d.invalid_string,
                message: a.message,
              }),
              s.dirty()))
          : a.kind === "trim"
          ? e.data = e.data.trim()
          : a.kind === "includes"
          ? e.data.includes(a.value, a.position) ||
            (n = this._getOrReturnCtx(e, n),
              f(n, {
                code: d.invalid_string,
                validation: { includes: a.value, position: a.position },
                message: a.message,
              }),
              s.dirty())
          : a.kind === "toLowerCase"
          ? e.data = e.data.toLowerCase()
          : a.kind === "toUpperCase"
          ? e.data = e.data.toUpperCase()
          : a.kind === "startsWith"
          ? e.data.startsWith(a.value) ||
            (n = this._getOrReturnCtx(e, n),
              f(n, {
                code: d.invalid_string,
                validation: { startsWith: a.value },
                message: a.message,
              }),
              s.dirty())
          : a.kind === "endsWith"
          ? e.data.endsWith(a.value) ||
            (n = this._getOrReturnCtx(e, n),
              f(n, {
                code: d.invalid_string,
                validation: { endsWith: a.value },
                message: a.message,
              }),
              s.dirty())
          : a.kind === "datetime"
          ? lt(a).test(e.data) ||
            (n = this._getOrReturnCtx(e, n),
              f(n, {
                code: d.invalid_string,
                validation: "datetime",
                message: a.message,
              }),
              s.dirty())
          : a.kind === "date"
          ? Yt.test(e.data) ||
            (n = this._getOrReturnCtx(e, n),
              f(n, {
                code: d.invalid_string,
                validation: "date",
                message: a.message,
              }),
              s.dirty())
          : a.kind === "time"
          ? Kt(a).test(e.data) ||
            (n = this._getOrReturnCtx(e, n),
              f(n, {
                code: d.invalid_string,
                validation: "time",
                message: a.message,
              }),
              s.dirty())
          : a.kind === "duration"
          ? Bt.test(e.data) ||
            (n = this._getOrReturnCtx(e, n),
              f(n, {
                validation: "duration",
                code: d.invalid_string,
                message: a.message,
              }),
              s.dirty())
          : a.kind === "ip"
          ? Xt(e.data, a.version) ||
            (n = this._getOrReturnCtx(e, n),
              f(n, {
                validation: "ip",
                code: d.invalid_string,
                message: a.message,
              }),
              s.dirty())
          : a.kind === "base64"
          ? Qt.test(e.data) ||
            (n = this._getOrReturnCtx(e, n),
              f(n, {
                validation: "base64",
                code: d.invalid_string,
                message: a.message,
              }),
              s.dirty())
          : x.assertNever(a);}
    }
    return { status: s.value, value: e.data };
  }
  _regex(e, t, s) {
    return this.refinement((n) => e.test(n), {
      validation: t,
      code: d.invalid_string,
      ...p.errToObj(s),
    });
  }
  _addCheck(e) {
    return new r({ ...this._def, checks: [...this._def.checks, e] });
  }
  email(e) {
    return this._addCheck({ kind: "email", ...p.errToObj(e) });
  }
  url(e) {
    return this._addCheck({ kind: "url", ...p.errToObj(e) });
  }
  emoji(e) {
    return this._addCheck({ kind: "emoji", ...p.errToObj(e) });
  }
  uuid(e) {
    return this._addCheck({ kind: "uuid", ...p.errToObj(e) });
  }
  nanoid(e) {
    return this._addCheck({ kind: "nanoid", ...p.errToObj(e) });
  }
  cuid(e) {
    return this._addCheck({ kind: "cuid", ...p.errToObj(e) });
  }
  cuid2(e) {
    return this._addCheck({ kind: "cuid2", ...p.errToObj(e) });
  }
  ulid(e) {
    return this._addCheck({ kind: "ulid", ...p.errToObj(e) });
  }
  base64(e) {
    return this._addCheck({ kind: "base64", ...p.errToObj(e) });
  }
  ip(e) {
    return this._addCheck({ kind: "ip", ...p.errToObj(e) });
  }
  datetime(e) {
    var t, s;
    return typeof e == "string"
      ? this._addCheck({
        kind: "datetime",
        precision: null,
        offset: !1,
        local: !1,
        message: e,
      })
      : this._addCheck({
        kind: "datetime",
        precision: typeof e?.precision > "u" ? null : e?.precision,
        offset: (t = e?.offset) !== null && t !== void 0 ? t : !1,
        local: (s = e?.local) !== null && s !== void 0 ? s : !1,
        ...p.errToObj(e?.message),
      });
  }
  date(e) {
    return this._addCheck({ kind: "date", message: e });
  }
  time(e) {
    return typeof e == "string"
      ? this._addCheck({ kind: "time", precision: null, message: e })
      : this._addCheck({
        kind: "time",
        precision: typeof e?.precision > "u" ? null : e?.precision,
        ...p.errToObj(e?.message),
      });
  }
  duration(e) {
    return this._addCheck({ kind: "duration", ...p.errToObj(e) });
  }
  regex(e, t) {
    return this._addCheck({ kind: "regex", regex: e, ...p.errToObj(t) });
  }
  includes(e, t) {
    return this._addCheck({
      kind: "includes",
      value: e,
      position: t?.position,
      ...p.errToObj(t?.message),
    });
  }
  startsWith(e, t) {
    return this._addCheck({ kind: "startsWith", value: e, ...p.errToObj(t) });
  }
  endsWith(e, t) {
    return this._addCheck({ kind: "endsWith", value: e, ...p.errToObj(t) });
  }
  min(e, t) {
    return this._addCheck({ kind: "min", value: e, ...p.errToObj(t) });
  }
  max(e, t) {
    return this._addCheck({ kind: "max", value: e, ...p.errToObj(t) });
  }
  length(e, t) {
    return this._addCheck({ kind: "length", value: e, ...p.errToObj(t) });
  }
  nonempty(e) {
    return this.min(1, p.errToObj(e));
  }
  trim() {
    return new r({
      ...this._def,
      checks: [...this._def.checks, { kind: "trim" }],
    });
  }
  toLowerCase() {
    return new r({
      ...this._def,
      checks: [...this._def.checks, { kind: "toLowerCase" }],
    });
  }
  toUpperCase() {
    return new r({
      ...this._def,
      checks: [...this._def.checks, { kind: "toUpperCase" }],
    });
  }
  get isDatetime() {
    return !!this._def.checks.find((e) => e.kind === "datetime");
  }
  get isDate() {
    return !!this._def.checks.find((e) => e.kind === "date");
  }
  get isTime() {
    return !!this._def.checks.find((e) => e.kind === "time");
  }
  get isDuration() {
    return !!this._def.checks.find((e) => e.kind === "duration");
  }
  get isEmail() {
    return !!this._def.checks.find((e) => e.kind === "email");
  }
  get isURL() {
    return !!this._def.checks.find((e) => e.kind === "url");
  }
  get isEmoji() {
    return !!this._def.checks.find((e) => e.kind === "emoji");
  }
  get isUUID() {
    return !!this._def.checks.find((e) => e.kind === "uuid");
  }
  get isNANOID() {
    return !!this._def.checks.find((e) => e.kind === "nanoid");
  }
  get isCUID() {
    return !!this._def.checks.find((e) => e.kind === "cuid");
  }
  get isCUID2() {
    return !!this._def.checks.find((e) => e.kind === "cuid2");
  }
  get isULID() {
    return !!this._def.checks.find((e) => e.kind === "ulid");
  }
  get isIP() {
    return !!this._def.checks.find((e) => e.kind === "ip");
  }
  get isBase64() {
    return !!this._def.checks.find((e) => e.kind === "base64");
  }
  get minLength() {
    let e = null;
    for (let t of this._def.checks) {
      t.kind === "min" && (e === null || t.value > e) && (e = t.value);
    }
    return e;
  }
  get maxLength() {
    let e = null;
    for (let t of this._def.checks) {
      t.kind === "max" && (e === null || t.value < e) && (e = t.value);
    }
    return e;
  }
};
L.create = (r) => {
  var e;
  return new L({
    checks: [],
    typeName: m.ZodString,
    coerce: (e = r?.coerce) !== null && e !== void 0 ? e : !1,
    ...g(r),
  });
};
function er(r, e) {
  let t = (r.toString().split(".")[1] || "").length,
    s = (e.toString().split(".")[1] || "").length,
    n = t > s ? t : s,
    a = parseInt(r.toFixed(n).replace(".", "")),
    i = parseInt(e.toFixed(n).replace(".", ""));
  return a % i / Math.pow(10, n);
}
var W = class r extends v {
  constructor() {
    super(...arguments),
      this.min = this.gte,
      this.max = this.lte,
      this.step = this.multipleOf;
  }
  _parse(e) {
    if (
      this._def.coerce && (e.data = Number(e.data)),
        this._getType(e) !== h.number
    ) {
      let a = this._getOrReturnCtx(e);
      return f(a, {
        code: d.invalid_type,
        expected: h.number,
        received: a.parsedType,
      }),
        y;
    }
    let s, n = new b();
    for (let a of this._def.checks) {
      a.kind === "int"
        ? x.isInteger(e.data) ||
          (s = this._getOrReturnCtx(e, s),
            f(s, {
              code: d.invalid_type,
              expected: "integer",
              received: "float",
              message: a.message,
            }),
            n.dirty())
        : a.kind === "min"
        ? (a.inclusive ? e.data < a.value : e.data <= a.value) &&
          (s = this._getOrReturnCtx(e, s),
            f(s, {
              code: d.too_small,
              minimum: a.value,
              type: "number",
              inclusive: a.inclusive,
              exact: !1,
              message: a.message,
            }),
            n.dirty())
        : a.kind === "max"
        ? (a.inclusive ? e.data > a.value : e.data >= a.value) &&
          (s = this._getOrReturnCtx(e, s),
            f(s, {
              code: d.too_big,
              maximum: a.value,
              type: "number",
              inclusive: a.inclusive,
              exact: !1,
              message: a.message,
            }),
            n.dirty())
        : a.kind === "multipleOf"
        ? er(e.data, a.value) !== 0 &&
          (s = this._getOrReturnCtx(e, s),
            f(s, {
              code: d.not_multiple_of,
              multipleOf: a.value,
              message: a.message,
            }),
            n.dirty())
        : a.kind === "finite"
        ? Number.isFinite(e.data) ||
          (s = this._getOrReturnCtx(e, s),
            f(s, { code: d.not_finite, message: a.message }),
            n.dirty())
        : x.assertNever(a);
    }
    return { status: n.value, value: e.data };
  }
  gte(e, t) {
    return this.setLimit("min", e, !0, p.toString(t));
  }
  gt(e, t) {
    return this.setLimit("min", e, !1, p.toString(t));
  }
  lte(e, t) {
    return this.setLimit("max", e, !0, p.toString(t));
  }
  lt(e, t) {
    return this.setLimit("max", e, !1, p.toString(t));
  }
  setLimit(e, t, s, n) {
    return new r({
      ...this._def,
      checks: [...this._def.checks, {
        kind: e,
        value: t,
        inclusive: s,
        message: p.toString(n),
      }],
    });
  }
  _addCheck(e) {
    return new r({ ...this._def, checks: [...this._def.checks, e] });
  }
  int(e) {
    return this._addCheck({ kind: "int", message: p.toString(e) });
  }
  positive(e) {
    return this._addCheck({
      kind: "min",
      value: 0,
      inclusive: !1,
      message: p.toString(e),
    });
  }
  negative(e) {
    return this._addCheck({
      kind: "max",
      value: 0,
      inclusive: !1,
      message: p.toString(e),
    });
  }
  nonpositive(e) {
    return this._addCheck({
      kind: "max",
      value: 0,
      inclusive: !0,
      message: p.toString(e),
    });
  }
  nonnegative(e) {
    return this._addCheck({
      kind: "min",
      value: 0,
      inclusive: !0,
      message: p.toString(e),
    });
  }
  multipleOf(e, t) {
    return this._addCheck({
      kind: "multipleOf",
      value: e,
      message: p.toString(t),
    });
  }
  finite(e) {
    return this._addCheck({ kind: "finite", message: p.toString(e) });
  }
  safe(e) {
    return this._addCheck({
      kind: "min",
      inclusive: !0,
      value: Number.MIN_SAFE_INTEGER,
      message: p.toString(e),
    })._addCheck({
      kind: "max",
      inclusive: !0,
      value: Number.MAX_SAFE_INTEGER,
      message: p.toString(e),
    });
  }
  get minValue() {
    let e = null;
    for (let t of this._def.checks) {
      t.kind === "min" && (e === null || t.value > e) && (e = t.value);
    }
    return e;
  }
  get maxValue() {
    let e = null;
    for (let t of this._def.checks) {
      t.kind === "max" && (e === null || t.value < e) && (e = t.value);
    }
    return e;
  }
  get isInt() {
    return !!this._def.checks.find((e) =>
      e.kind === "int" || e.kind === "multipleOf" && x.isInteger(e.value)
    );
  }
  get isFinite() {
    let e = null, t = null;
    for (let s of this._def.checks) {
      if (s.kind === "finite" || s.kind === "int" || s.kind === "multipleOf") {
        return !0;
      }
      s.kind === "min"
        ? (t === null || s.value > t) && (t = s.value)
        : s.kind === "max" && (e === null || s.value < e) && (e = s.value);
    }
    return Number.isFinite(t) && Number.isFinite(e);
  }
};
W.create = (r) =>
  new W({
    checks: [],
    typeName: m.ZodNumber,
    coerce: r?.coerce || !1,
    ...g(r),
  });
var J = class r extends v {
  constructor() {
    super(...arguments), this.min = this.gte, this.max = this.lte;
  }
  _parse(e) {
    if (
      this._def.coerce && (e.data = BigInt(e.data)),
        this._getType(e) !== h.bigint
    ) {
      let a = this._getOrReturnCtx(e);
      return f(a, {
        code: d.invalid_type,
        expected: h.bigint,
        received: a.parsedType,
      }),
        y;
    }
    let s, n = new b();
    for (let a of this._def.checks) {
      a.kind === "min"
        ? (a.inclusive ? e.data < a.value : e.data <= a.value) &&
          (s = this._getOrReturnCtx(e, s),
            f(s, {
              code: d.too_small,
              type: "bigint",
              minimum: a.value,
              inclusive: a.inclusive,
              message: a.message,
            }),
            n.dirty())
        : a.kind === "max"
        ? (a.inclusive ? e.data > a.value : e.data >= a.value) &&
          (s = this._getOrReturnCtx(e, s),
            f(s, {
              code: d.too_big,
              type: "bigint",
              maximum: a.value,
              inclusive: a.inclusive,
              message: a.message,
            }),
            n.dirty())
        : a.kind === "multipleOf"
        ? e.data % a.value !== BigInt(0) &&
          (s = this._getOrReturnCtx(e, s),
            f(s, {
              code: d.not_multiple_of,
              multipleOf: a.value,
              message: a.message,
            }),
            n.dirty())
        : x.assertNever(a);
    }
    return { status: n.value, value: e.data };
  }
  gte(e, t) {
    return this.setLimit("min", e, !0, p.toString(t));
  }
  gt(e, t) {
    return this.setLimit("min", e, !1, p.toString(t));
  }
  lte(e, t) {
    return this.setLimit("max", e, !0, p.toString(t));
  }
  lt(e, t) {
    return this.setLimit("max", e, !1, p.toString(t));
  }
  setLimit(e, t, s, n) {
    return new r({
      ...this._def,
      checks: [...this._def.checks, {
        kind: e,
        value: t,
        inclusive: s,
        message: p.toString(n),
      }],
    });
  }
  _addCheck(e) {
    return new r({ ...this._def, checks: [...this._def.checks, e] });
  }
  positive(e) {
    return this._addCheck({
      kind: "min",
      value: BigInt(0),
      inclusive: !1,
      message: p.toString(e),
    });
  }
  negative(e) {
    return this._addCheck({
      kind: "max",
      value: BigInt(0),
      inclusive: !1,
      message: p.toString(e),
    });
  }
  nonpositive(e) {
    return this._addCheck({
      kind: "max",
      value: BigInt(0),
      inclusive: !0,
      message: p.toString(e),
    });
  }
  nonnegative(e) {
    return this._addCheck({
      kind: "min",
      value: BigInt(0),
      inclusive: !0,
      message: p.toString(e),
    });
  }
  multipleOf(e, t) {
    return this._addCheck({
      kind: "multipleOf",
      value: e,
      message: p.toString(t),
    });
  }
  get minValue() {
    let e = null;
    for (let t of this._def.checks) {
      t.kind === "min" && (e === null || t.value > e) && (e = t.value);
    }
    return e;
  }
  get maxValue() {
    let e = null;
    for (let t of this._def.checks) {
      t.kind === "max" && (e === null || t.value < e) && (e = t.value);
    }
    return e;
  }
};
J.create = (r) => {
  var e;
  return new J({
    checks: [],
    typeName: m.ZodBigInt,
    coerce: (e = r?.coerce) !== null && e !== void 0 ? e : !1,
    ...g(r),
  });
};
var F = class extends v {
  _parse(e) {
    if (
      this._def.coerce && (e.data = !!e.data), this._getType(e) !== h.boolean
    ) {
      let s = this._getOrReturnCtx(e);
      return f(s, {
        code: d.invalid_type,
        expected: h.boolean,
        received: s.parsedType,
      }),
        y;
    }
    return T(e.data);
  }
};
F.create = (r) =>
  new F({ typeName: m.ZodBoolean, coerce: r?.coerce || !1, ...g(r) });
var G = class r extends v {
  _parse(e) {
    if (
      this._def.coerce && (e.data = new Date(e.data)),
        this._getType(e) !== h.date
    ) {
      let a = this._getOrReturnCtx(e);
      return f(a, {
        code: d.invalid_type,
        expected: h.date,
        received: a.parsedType,
      }),
        y;
    }
    if (isNaN(e.data.getTime())) {
      let a = this._getOrReturnCtx(e);
      return f(a, { code: d.invalid_date }), y;
    }
    let s = new b(), n;
    for (let a of this._def.checks) {
      a.kind === "min"
        ? e.data.getTime() < a.value &&
          (n = this._getOrReturnCtx(e, n),
            f(n, {
              code: d.too_small,
              message: a.message,
              inclusive: !0,
              exact: !1,
              minimum: a.value,
              type: "date",
            }),
            s.dirty())
        : a.kind === "max"
        ? e.data.getTime() > a.value &&
          (n = this._getOrReturnCtx(e, n),
            f(n, {
              code: d.too_big,
              message: a.message,
              inclusive: !0,
              exact: !1,
              maximum: a.value,
              type: "date",
            }),
            s.dirty())
        : x.assertNever(a);
    }
    return { status: s.value, value: new Date(e.data.getTime()) };
  }
  _addCheck(e) {
    return new r({ ...this._def, checks: [...this._def.checks, e] });
  }
  min(e, t) {
    return this._addCheck({
      kind: "min",
      value: e.getTime(),
      message: p.toString(t),
    });
  }
  max(e, t) {
    return this._addCheck({
      kind: "max",
      value: e.getTime(),
      message: p.toString(t),
    });
  }
  get minDate() {
    let e = null;
    for (let t of this._def.checks) {
      t.kind === "min" && (e === null || t.value > e) && (e = t.value);
    }
    return e != null ? new Date(e) : null;
  }
  get maxDate() {
    let e = null;
    for (let t of this._def.checks) {
      t.kind === "max" && (e === null || t.value < e) && (e = t.value);
    }
    return e != null ? new Date(e) : null;
  }
};
G.create = (r) =>
  new G({ checks: [], coerce: r?.coerce || !1, typeName: m.ZodDate, ...g(r) });
var pe = class extends v {
  _parse(e) {
    if (this._getType(e) !== h.symbol) {
      let s = this._getOrReturnCtx(e);
      return f(s, {
        code: d.invalid_type,
        expected: h.symbol,
        received: s.parsedType,
      }),
        y;
    }
    return T(e.data);
  }
};
pe.create = (r) => new pe({ typeName: m.ZodSymbol, ...g(r) });
var Q = class extends v {
  _parse(e) {
    if (this._getType(e) !== h.undefined) {
      let s = this._getOrReturnCtx(e);
      return f(s, {
        code: d.invalid_type,
        expected: h.undefined,
        received: s.parsedType,
      }),
        y;
    }
    return T(e.data);
  }
};
Q.create = (r) => new Q({ typeName: m.ZodUndefined, ...g(r) });
var Y = class extends v {
  _parse(e) {
    if (this._getType(e) !== h.null) {
      let s = this._getOrReturnCtx(e);
      return f(s, {
        code: d.invalid_type,
        expected: h.null,
        received: s.parsedType,
      }),
        y;
    }
    return T(e.data);
  }
};
Y.create = (r) => new Y({ typeName: m.ZodNull, ...g(r) });
var z = class extends v {
  constructor() {
    super(...arguments), this._any = !0;
  }
  _parse(e) {
    return T(e.data);
  }
};
z.create = (r) => new z({ typeName: m.ZodAny, ...g(r) });
var M = class extends v {
  constructor() {
    super(...arguments), this._unknown = !0;
  }
  _parse(e) {
    return T(e.data);
  }
};
M.create = (r) => new M({ typeName: m.ZodUnknown, ...g(r) });
var j = class extends v {
  _parse(e) {
    let t = this._getOrReturnCtx(e);
    return f(t, {
      code: d.invalid_type,
      expected: h.never,
      received: t.parsedType,
    }),
      y;
  }
};
j.create = (r) => new j({ typeName: m.ZodNever, ...g(r) });
var me = class extends v {
  _parse(e) {
    if (this._getType(e) !== h.undefined) {
      let s = this._getOrReturnCtx(e);
      return f(s, {
        code: d.invalid_type,
        expected: h.void,
        received: s.parsedType,
      }),
        y;
    }
    return T(e.data);
  }
};
me.create = (r) => new me({ typeName: m.ZodVoid, ...g(r) });
var V = class r extends v {
  _parse(e) {
    let { ctx: t, status: s } = this._processInputParams(e), n = this._def;
    if (t.parsedType !== h.array) {
      return f(t, {
        code: d.invalid_type,
        expected: h.array,
        received: t.parsedType,
      }),
        y;
    }
    if (n.exactLength !== null) {
      let i = t.data.length > n.exactLength.value,
        o = t.data.length < n.exactLength.value;
      (i || o) && (f(t, {
        code: i ? d.too_big : d.too_small,
        minimum: o ? n.exactLength.value : void 0,
        maximum: i ? n.exactLength.value : void 0,
        type: "array",
        inclusive: !0,
        exact: !0,
        message: n.exactLength.message,
      }),
        s.dirty());
    }
    if (
      n.minLength !== null && t.data.length < n.minLength.value &&
      (f(t, {
        code: d.too_small,
        minimum: n.minLength.value,
        type: "array",
        inclusive: !0,
        exact: !1,
        message: n.minLength.message,
      }),
        s.dirty()),
        n.maxLength !== null && t.data.length > n.maxLength.value &&
        (f(t, {
          code: d.too_big,
          maximum: n.maxLength.value,
          type: "array",
          inclusive: !0,
          exact: !1,
          message: n.maxLength.message,
        }),
          s.dirty()),
        t.common.async
    ) {
      return Promise.all(
        [...t.data].map((i, o) => n.type._parseAsync(new O(t, i, t.path, o))),
      ).then((i) => b.mergeArray(s, i));
    }
    let a = [...t.data].map((i, o) =>
      n.type._parseSync(new O(t, i, t.path, o))
    );
    return b.mergeArray(s, a);
  }
  get element() {
    return this._def.type;
  }
  min(e, t) {
    return new r({
      ...this._def,
      minLength: { value: e, message: p.toString(t) },
    });
  }
  max(e, t) {
    return new r({
      ...this._def,
      maxLength: { value: e, message: p.toString(t) },
    });
  }
  length(e, t) {
    return new r({
      ...this._def,
      exactLength: { value: e, message: p.toString(t) },
    });
  }
  nonempty(e) {
    return this.min(1, e);
  }
};
V.create = (r, e) =>
  new V({
    type: r,
    minLength: null,
    maxLength: null,
    exactLength: null,
    typeName: m.ZodArray,
    ...g(e),
  });
function le(r) {
  if (r instanceof R) {
    let e = {};
    for (let t in r.shape) {
      let s = r.shape[t];
      e[t] = S.create(le(s));
    }
    return new R({ ...r._def, shape: () => e });
  } else {return r instanceof V
      ? new V({ ...r._def, type: le(r.element) })
      : r instanceof S
      ? S.create(le(r.unwrap()))
      : r instanceof $
      ? $.create(le(r.unwrap()))
      : r instanceof N
      ? N.create(r.items.map((e) => le(e)))
      : r;}
}
var R = class r extends v {
  constructor() {
    super(...arguments),
      this._cached = null,
      this.nonstrict = this.passthrough,
      this.augment = this.extend;
  }
  _getCached() {
    if (this._cached !== null) return this._cached;
    let e = this._def.shape(), t = x.objectKeys(e);
    return this._cached = { shape: e, keys: t };
  }
  _parse(e) {
    if (this._getType(e) !== h.object) {
      let c = this._getOrReturnCtx(e);
      return f(c, {
        code: d.invalid_type,
        expected: h.object,
        received: c.parsedType,
      }),
        y;
    }
    let { status: s, ctx: n } = this._processInputParams(e),
      { shape: a, keys: i } = this._getCached(),
      o = [];
    if (
      !(this._def.catchall instanceof j && this._def.unknownKeys === "strip")
    ) { for (let c in n.data) i.includes(c) || o.push(c); }
    let l = [];
    for (let c of i) {
      let u = a[c], _ = n.data[c];
      l.push({
        key: { status: "valid", value: c },
        value: u._parse(new O(n, _, n.path, c)),
        alwaysSet: c in n.data,
      });
    }
    if (this._def.catchall instanceof j) {
      let c = this._def.unknownKeys;
      if (c === "passthrough") {
        for (let u of o) {
          l.push({
            key: { status: "valid", value: u },
            value: { status: "valid", value: n.data[u] },
          });
        }
      } else if (c === "strict") {
        o.length > 0 &&
          (f(n, { code: d.unrecognized_keys, keys: o }), s.dirty());
      } else if (c !== "strip") {
        throw new Error("Internal ZodObject error: invalid unknownKeys value.");
      }
    } else {
      let c = this._def.catchall;
      for (let u of o) {
        let _ = n.data[u];
        l.push({
          key: { status: "valid", value: u },
          value: c._parse(new O(n, _, n.path, u)),
          alwaysSet: u in n.data,
        });
      }
    }
    return n.common.async
      ? Promise.resolve().then(async () => {
        let c = [];
        for (let u of l) {
          let _ = await u.key, k = await u.value;
          c.push({ key: _, value: k, alwaysSet: u.alwaysSet });
        }
        return c;
      }).then((c) => b.mergeObjectSync(s, c))
      : b.mergeObjectSync(s, l);
  }
  get shape() {
    return this._def.shape();
  }
  strict(e) {
    return p.errToObj,
      new r({
        ...this._def,
        unknownKeys: "strict",
        ...e !== void 0
          ? {
            errorMap: (t, s) => {
              var n, a, i, o;
              let l =
                (i = (a = (n = this._def).errorMap) === null || a === void 0
                      ? void 0
                      : a.call(n, t, s).message) !== null && i !== void 0
                  ? i
                  : s.defaultError;
              return t.code === "unrecognized_keys"
                ? {
                  message: (o = p.errToObj(e).message) !== null && o !== void 0
                    ? o
                    : l,
                }
                : { message: l };
            },
          }
          : {},
      });
  }
  strip() {
    return new r({ ...this._def, unknownKeys: "strip" });
  }
  passthrough() {
    return new r({ ...this._def, unknownKeys: "passthrough" });
  }
  extend(e) {
    return new r({
      ...this._def,
      shape: () => ({ ...this._def.shape(), ...e }),
    });
  }
  merge(e) {
    return new r({
      unknownKeys: e._def.unknownKeys,
      catchall: e._def.catchall,
      shape: () => ({ ...this._def.shape(), ...e._def.shape() }),
      typeName: m.ZodObject,
    });
  }
  setKey(e, t) {
    return this.augment({ [e]: t });
  }
  catchall(e) {
    return new r({ ...this._def, catchall: e });
  }
  pick(e) {
    let t = {};
    return x.objectKeys(e).forEach((s) => {
      e[s] && this.shape[s] && (t[s] = this.shape[s]);
    }),
      new r({ ...this._def, shape: () => t });
  }
  omit(e) {
    let t = {};
    return x.objectKeys(this.shape).forEach((s) => {
      e[s] || (t[s] = this.shape[s]);
    }),
      new r({ ...this._def, shape: () => t });
  }
  deepPartial() {
    return le(this);
  }
  partial(e) {
    let t = {};
    return x.objectKeys(this.shape).forEach((s) => {
      let n = this.shape[s];
      e && !e[s] ? t[s] = n : t[s] = n.optional();
    }),
      new r({ ...this._def, shape: () => t });
  }
  required(e) {
    let t = {};
    return x.objectKeys(this.shape).forEach((s) => {
      if (e && !e[s]) t[s] = this.shape[s];
      else {
        let a = this.shape[s];
        for (; a instanceof S;) a = a._def.innerType;
        t[s] = a;
      }
    }),
      new r({ ...this._def, shape: () => t });
  }
  keyof() {
    return ft(x.objectKeys(this.shape));
  }
};
R.create = (r, e) =>
  new R({
    shape: () => r,
    unknownKeys: "strip",
    catchall: j.create(),
    typeName: m.ZodObject,
    ...g(e),
  });
R.strictCreate = (r, e) =>
  new R({
    shape: () => r,
    unknownKeys: "strict",
    catchall: j.create(),
    typeName: m.ZodObject,
    ...g(e),
  });
R.lazycreate = (r, e) =>
  new R({
    shape: r,
    unknownKeys: "strip",
    catchall: j.create(),
    typeName: m.ZodObject,
    ...g(e),
  });
var K = class extends v {
  _parse(e) {
    let { ctx: t } = this._processInputParams(e), s = this._def.options;
    function n(a) {
      for (let o of a) if (o.result.status === "valid") return o.result;
      for (let o of a) {
        if (o.result.status === "dirty") {
          return t.common.issues.push(...o.ctx.common.issues), o.result;
        }
      }
      let i = a.map((o) => new C(o.ctx.common.issues));
      return f(t, { code: d.invalid_union, unionErrors: i }), y;
    }
    if (t.common.async) {
      return Promise.all(s.map(async (a) => {
        let i = { ...t, common: { ...t.common, issues: [] }, parent: null };
        return {
          result: await a._parseAsync({
            data: t.data,
            path: t.path,
            parent: i,
          }),
          ctx: i,
        };
      })).then(n);
    }
    {
      let a, i = [];
      for (let l of s) {
        let c = { ...t, common: { ...t.common, issues: [] }, parent: null },
          u = l._parseSync({ data: t.data, path: t.path, parent: c });
        if (u.status === "valid") return u;
        u.status === "dirty" && !a && (a = { result: u, ctx: c }),
          c.common.issues.length && i.push(c.common.issues);
      }
      if (a) return t.common.issues.push(...a.ctx.common.issues), a.result;
      let o = i.map((l) => new C(l));
      return f(t, { code: d.invalid_union, unionErrors: o }), y;
    }
  }
  get options() {
    return this._def.options;
  }
};
K.create = (r, e) => new K({ options: r, typeName: m.ZodUnion, ...g(e) });
var P = (r) =>
    r instanceof ee
      ? P(r.schema)
      : r instanceof E
      ? P(r.innerType())
      : r instanceof te
      ? [r.value]
      : r instanceof re
      ? r.options
      : r instanceof se
      ? x.objectValues(r.enum)
      : r instanceof ne
      ? P(r._def.innerType)
      : r instanceof Q
      ? [void 0]
      : r instanceof Y
      ? [null]
      : r instanceof S
      ? [void 0, ...P(r.unwrap())]
      : r instanceof $
      ? [null, ...P(r.unwrap())]
      : r instanceof Ee || r instanceof ie
      ? P(r.unwrap())
      : r instanceof ae
      ? P(r._def.innerType)
      : [],
  Ue = class r extends v {
    _parse(e) {
      let { ctx: t } = this._processInputParams(e);
      if (t.parsedType !== h.object) {
        return f(t, {
          code: d.invalid_type,
          expected: h.object,
          received: t.parsedType,
        }),
          y;
      }
      let s = this.discriminator, n = t.data[s], a = this.optionsMap.get(n);
      return a
        ? t.common.async
          ? a._parseAsync({ data: t.data, path: t.path, parent: t })
          : a._parseSync({ data: t.data, path: t.path, parent: t })
        : (f(t, {
          code: d.invalid_union_discriminator,
          options: Array.from(this.optionsMap.keys()),
          path: [s],
        }),
          y);
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
    static create(e, t, s) {
      let n = new Map();
      for (let a of t) {
        let i = P(a.shape[e]);
        if (!i.length) {
          throw new Error(
            `A discriminator value for key \`${e}\` could not be extracted from all schema options`,
          );
        }
        for (let o of i) {
          if (n.has(o)) {
            throw new Error(
              `Discriminator property ${String(e)} has duplicate value ${
                String(o)
              }`,
            );
          }
          n.set(o, a);
        }
      }
      return new r({
        typeName: m.ZodDiscriminatedUnion,
        discriminator: e,
        options: t,
        optionsMap: n,
        ...g(s),
      });
    }
  };
function Qe(r, e) {
  let t = U(r), s = U(e);
  if (r === e) return { valid: !0, data: r };
  if (t === h.object && s === h.object) {
    let n = x.objectKeys(e),
      a = x.objectKeys(r).filter((o) => n.indexOf(o) !== -1),
      i = { ...r, ...e };
    for (let o of a) {
      let l = Qe(r[o], e[o]);
      if (!l.valid) return { valid: !1 };
      i[o] = l.data;
    }
    return { valid: !0, data: i };
  } else if (t === h.array && s === h.array) {
    if (r.length !== e.length) return { valid: !1 };
    let n = [];
    for (let a = 0; a < r.length; a++) {
      let i = r[a], o = e[a], l = Qe(i, o);
      if (!l.valid) return { valid: !1 };
      n.push(l.data);
    }
    return { valid: !0, data: n };
  } else {return t === h.date && s === h.date && +r == +e
      ? { valid: !0, data: r }
      : { valid: !1 };}
}
var X = class extends v {
  _parse(e) {
    let { status: t, ctx: s } = this._processInputParams(e),
      n = (a, i) => {
        if (Fe(a) || Fe(i)) return y;
        let o = Qe(a.value, i.value);
        return o.valid
          ? ((Ge(a) || Ge(i)) && t.dirty(), { status: t.value, value: o.data })
          : (f(s, { code: d.invalid_intersection_types }), y);
      };
    return s.common.async
      ? Promise.all([
        this._def.left._parseAsync({ data: s.data, path: s.path, parent: s }),
        this._def.right._parseAsync({ data: s.data, path: s.path, parent: s }),
      ]).then(([a, i]) => n(a, i))
      : n(
        this._def.left._parseSync({ data: s.data, path: s.path, parent: s }),
        this._def.right._parseSync({ data: s.data, path: s.path, parent: s }),
      );
  }
};
X.create = (r, e, t) =>
  new X({ left: r, right: e, typeName: m.ZodIntersection, ...g(t) });
var N = class r extends v {
  _parse(e) {
    let { status: t, ctx: s } = this._processInputParams(e);
    if (s.parsedType !== h.array) {
      return f(s, {
        code: d.invalid_type,
        expected: h.array,
        received: s.parsedType,
      }),
        y;
    }
    if (s.data.length < this._def.items.length) {
      return f(s, {
        code: d.too_small,
        minimum: this._def.items.length,
        inclusive: !0,
        exact: !1,
        type: "array",
      }),
        y;
    }
    !this._def.rest && s.data.length > this._def.items.length &&
      (f(s, {
        code: d.too_big,
        maximum: this._def.items.length,
        inclusive: !0,
        exact: !1,
        type: "array",
      }),
        t.dirty());
    let a = [...s.data].map((i, o) => {
      let l = this._def.items[o] || this._def.rest;
      return l ? l._parse(new O(s, i, s.path, o)) : null;
    }).filter((i) => !!i);
    return s.common.async
      ? Promise.all(a).then((i) => b.mergeArray(t, i))
      : b.mergeArray(t, a);
  }
  get items() {
    return this._def.items;
  }
  rest(e) {
    return new r({ ...this._def, rest: e });
  }
};
N.create = (r, e) => {
  if (!Array.isArray(r)) {
    throw new Error("You must pass an array of schemas to z.tuple([ ... ])");
  }
  return new N({ items: r, typeName: m.ZodTuple, rest: null, ...g(e) });
};
var Le = class r extends v {
    get keySchema() {
      return this._def.keyType;
    }
    get valueSchema() {
      return this._def.valueType;
    }
    _parse(e) {
      let { status: t, ctx: s } = this._processInputParams(e);
      if (s.parsedType !== h.object) {
        return f(s, {
          code: d.invalid_type,
          expected: h.object,
          received: s.parsedType,
        }),
          y;
      }
      let n = [], a = this._def.keyType, i = this._def.valueType;
      for (let o in s.data) {
        n.push({
          key: a._parse(new O(s, o, s.path, o)),
          value: i._parse(new O(s, s.data[o], s.path, o)),
          alwaysSet: o in s.data,
        });
      }
      return s.common.async
        ? b.mergeObjectAsync(t, n)
        : b.mergeObjectSync(t, n);
    }
    get element() {
      return this._def.valueType;
    }
    static create(e, t, s) {
      return t instanceof v
        ? new r({ keyType: e, valueType: t, typeName: m.ZodRecord, ...g(s) })
        : new r({
          keyType: L.create(),
          valueType: e,
          typeName: m.ZodRecord,
          ...g(t),
        });
    }
  },
  ye = class extends v {
    get keySchema() {
      return this._def.keyType;
    }
    get valueSchema() {
      return this._def.valueType;
    }
    _parse(e) {
      let { status: t, ctx: s } = this._processInputParams(e);
      if (s.parsedType !== h.map) {
        return f(s, {
          code: d.invalid_type,
          expected: h.map,
          received: s.parsedType,
        }),
          y;
      }
      let n = this._def.keyType,
        a = this._def.valueType,
        i = [...s.data.entries()].map(([o, l], c) => ({
          key: n._parse(new O(s, o, s.path, [c, "key"])),
          value: a._parse(new O(s, l, s.path, [c, "value"])),
        }));
      if (s.common.async) {
        let o = new Map();
        return Promise.resolve().then(async () => {
          for (let l of i) {
            let c = await l.key, u = await l.value;
            if (c.status === "aborted" || u.status === "aborted") return y;
            (c.status === "dirty" || u.status === "dirty") && t.dirty(),
              o.set(c.value, u.value);
          }
          return { status: t.value, value: o };
        });
      } else {
        let o = new Map();
        for (let l of i) {
          let c = l.key, u = l.value;
          if (c.status === "aborted" || u.status === "aborted") return y;
          (c.status === "dirty" || u.status === "dirty") && t.dirty(),
            o.set(c.value, u.value);
        }
        return { status: t.value, value: o };
      }
    }
  };
ye.create = (r, e, t) =>
  new ye({ valueType: e, keyType: r, typeName: m.ZodMap, ...g(t) });
var ge = class r extends v {
  _parse(e) {
    let { status: t, ctx: s } = this._processInputParams(e);
    if (s.parsedType !== h.set) {
      return f(s, {
        code: d.invalid_type,
        expected: h.set,
        received: s.parsedType,
      }),
        y;
    }
    let n = this._def;
    n.minSize !== null && s.data.size < n.minSize.value &&
    (f(s, {
      code: d.too_small,
      minimum: n.minSize.value,
      type: "set",
      inclusive: !0,
      exact: !1,
      message: n.minSize.message,
    }),
      t.dirty()),
      n.maxSize !== null && s.data.size > n.maxSize.value &&
      (f(s, {
        code: d.too_big,
        maximum: n.maxSize.value,
        type: "set",
        inclusive: !0,
        exact: !1,
        message: n.maxSize.message,
      }),
        t.dirty());
    let a = this._def.valueType;
    function i(l) {
      let c = new Set();
      for (let u of l) {
        if (u.status === "aborted") return y;
        u.status === "dirty" && t.dirty(), c.add(u.value);
      }
      return { status: t.value, value: c };
    }
    let o = [...s.data.values()].map((l, c) =>
      a._parse(new O(s, l, s.path, c))
    );
    return s.common.async ? Promise.all(o).then((l) => i(l)) : i(o);
  }
  min(e, t) {
    return new r({
      ...this._def,
      minSize: { value: e, message: p.toString(t) },
    });
  }
  max(e, t) {
    return new r({
      ...this._def,
      maxSize: { value: e, message: p.toString(t) },
    });
  }
  size(e, t) {
    return this.min(e, t).max(e, t);
  }
  nonempty(e) {
    return this.min(1, e);
  }
};
ge.create = (r, e) =>
  new ge({
    valueType: r,
    minSize: null,
    maxSize: null,
    typeName: m.ZodSet,
    ...g(e),
  });
var ze = class r extends v {
    constructor() {
      super(...arguments), this.validate = this.implement;
    }
    _parse(e) {
      let { ctx: t } = this._processInputParams(e);
      if (t.parsedType !== h.function) {
        return f(t, {
          code: d.invalid_type,
          expected: h.function,
          received: t.parsedType,
        }),
          y;
      }
      function s(o, l) {
        return Ve({
          data: o,
          path: t.path,
          errorMaps: [t.common.contextualErrorMap, t.schemaErrorMap, Me(), he]
            .filter((c) => !!c),
          issueData: { code: d.invalid_arguments, argumentsError: l },
        });
      }
      function n(o, l) {
        return Ve({
          data: o,
          path: t.path,
          errorMaps: [t.common.contextualErrorMap, t.schemaErrorMap, Me(), he]
            .filter((c) => !!c),
          issueData: { code: d.invalid_return_type, returnTypeError: l },
        });
      }
      let a = { errorMap: t.common.contextualErrorMap }, i = t.data;
      if (this._def.returns instanceof H) {
        let o = this;
        return T(async function (...l) {
          let c = new C([]),
            u = await o._def.args.parseAsync(l, a).catch((A) => {
              throw c.addIssue(s(l, A)), c;
            }),
            _ = await Reflect.apply(i, this, u);
          return await o._def.returns._def.type.parseAsync(_, a).catch((A) => {
            throw c.addIssue(n(_, A)), c;
          });
        });
      } else {
        let o = this;
        return T(function (...l) {
          let c = o._def.args.safeParse(l, a);
          if (!c.success) throw new C([s(l, c.error)]);
          let u = Reflect.apply(i, this, c.data),
            _ = o._def.returns.safeParse(u, a);
          if (!_.success) throw new C([n(u, _.error)]);
          return _.data;
        });
      }
    }
    parameters() {
      return this._def.args;
    }
    returnType() {
      return this._def.returns;
    }
    args(...e) {
      return new r({ ...this._def, args: N.create(e).rest(M.create()) });
    }
    returns(e) {
      return new r({ ...this._def, returns: e });
    }
    implement(e) {
      return this.parse(e);
    }
    strictImplement(e) {
      return this.parse(e);
    }
    static create(e, t, s) {
      return new r({
        args: e || N.create([]).rest(M.create()),
        returns: t || M.create(),
        typeName: m.ZodFunction,
        ...g(s),
      });
    }
  },
  ee = class extends v {
    get schema() {
      return this._def.getter();
    }
    _parse(e) {
      let { ctx: t } = this._processInputParams(e);
      return this._def.getter()._parse({
        data: t.data,
        path: t.path,
        parent: t,
      });
    }
  };
ee.create = (r, e) => new ee({ getter: r, typeName: m.ZodLazy, ...g(e) });
var te = class extends v {
  _parse(e) {
    if (e.data !== this._def.value) {
      let t = this._getOrReturnCtx(e);
      return f(t, {
        received: t.data,
        code: d.invalid_literal,
        expected: this._def.value,
      }),
        y;
    }
    return { status: "valid", value: e.data };
  }
  get value() {
    return this._def.value;
  }
};
te.create = (r, e) => new te({ value: r, typeName: m.ZodLiteral, ...g(e) });
function ft(r, e) {
  return new re({ values: r, typeName: m.ZodEnum, ...g(e) });
}
var re = class r extends v {
  constructor() {
    super(...arguments), ke.set(this, void 0);
  }
  _parse(e) {
    if (typeof e.data != "string") {
      let t = this._getOrReturnCtx(e), s = this._def.values;
      return f(t, {
        expected: x.joinValues(s),
        received: t.parsedType,
        code: d.invalid_type,
      }),
        y;
    }
    if (
      De(this, ke, "f") || ct(this, ke, new Set(this._def.values), "f"),
        !De(this, ke, "f").has(e.data)
    ) {
      let t = this._getOrReturnCtx(e), s = this._def.values;
      return f(t, { received: t.data, code: d.invalid_enum_value, options: s }),
        y;
    }
    return T(e.data);
  }
  get options() {
    return this._def.values;
  }
  get enum() {
    let e = {};
    for (let t of this._def.values) e[t] = t;
    return e;
  }
  get Values() {
    let e = {};
    for (let t of this._def.values) e[t] = t;
    return e;
  }
  get Enum() {
    let e = {};
    for (let t of this._def.values) e[t] = t;
    return e;
  }
  extract(e, t = this._def) {
    return r.create(e, { ...this._def, ...t });
  }
  exclude(e, t = this._def) {
    return r.create(this.options.filter((s) => !e.includes(s)), {
      ...this._def,
      ...t,
    });
  }
};
ke = new WeakMap();
re.create = ft;
var se = class extends v {
  constructor() {
    super(...arguments), Te.set(this, void 0);
  }
  _parse(e) {
    let t = x.getValidEnumValues(this._def.values), s = this._getOrReturnCtx(e);
    if (s.parsedType !== h.string && s.parsedType !== h.number) {
      let n = x.objectValues(t);
      return f(s, {
        expected: x.joinValues(n),
        received: s.parsedType,
        code: d.invalid_type,
      }),
        y;
    }
    if (
      De(this, Te, "f") ||
      ct(this, Te, new Set(x.getValidEnumValues(this._def.values)), "f"),
        !De(this, Te, "f").has(e.data)
    ) {
      let n = x.objectValues(t);
      return f(s, { received: s.data, code: d.invalid_enum_value, options: n }),
        y;
    }
    return T(e.data);
  }
  get enum() {
    return this._def.values;
  }
};
Te = new WeakMap();
se.create = (r, e) => new se({ values: r, typeName: m.ZodNativeEnum, ...g(e) });
var H = class extends v {
  unwrap() {
    return this._def.type;
  }
  _parse(e) {
    let { ctx: t } = this._processInputParams(e);
    if (t.parsedType !== h.promise && t.common.async === !1) {
      return f(t, {
        code: d.invalid_type,
        expected: h.promise,
        received: t.parsedType,
      }),
        y;
    }
    let s = t.parsedType === h.promise ? t.data : Promise.resolve(t.data);
    return T(
      s.then((n) =>
        this._def.type.parseAsync(n, {
          path: t.path,
          errorMap: t.common.contextualErrorMap,
        })
      ),
    );
  }
};
H.create = (r, e) => new H({ type: r, typeName: m.ZodPromise, ...g(e) });
var E = class extends v {
  innerType() {
    return this._def.schema;
  }
  sourceType() {
    return this._def.schema._def.typeName === m.ZodEffects
      ? this._def.schema.sourceType()
      : this._def.schema;
  }
  _parse(e) {
    let { status: t, ctx: s } = this._processInputParams(e),
      n = this._def.effect || null,
      a = {
        addIssue: (i) => {
          f(s, i), i.fatal ? t.abort() : t.dirty();
        },
        get path() {
          return s.path;
        },
      };
    if (a.addIssue = a.addIssue.bind(a), n.type === "preprocess") {
      let i = n.transform(s.data, a);
      if (s.common.async) {
        return Promise.resolve(i).then(async (o) => {
          if (t.value === "aborted") return y;
          let l = await this._def.schema._parseAsync({
            data: o,
            path: s.path,
            parent: s,
          });
          return l.status === "aborted"
            ? y
            : l.status === "dirty" || t.value === "dirty"
            ? fe(l.value)
            : l;
        });
      }
      {
        if (t.value === "aborted") return y;
        let o = this._def.schema._parseSync({
          data: i,
          path: s.path,
          parent: s,
        });
        return o.status === "aborted"
          ? y
          : o.status === "dirty" || t.value === "dirty"
          ? fe(o.value)
          : o;
      }
    }
    if (n.type === "refinement") {
      let i = (o) => {
        let l = n.refinement(o, a);
        if (s.common.async) return Promise.resolve(l);
        if (l instanceof Promise) {
          throw new Error(
            "Async refinement encountered during synchronous parse operation. Use .parseAsync instead.",
          );
        }
        return o;
      };
      if (s.common.async === !1) {
        let o = this._def.schema._parseSync({
          data: s.data,
          path: s.path,
          parent: s,
        });
        return o.status === "aborted"
          ? y
          : (o.status === "dirty" && t.dirty(),
            i(o.value),
            { status: t.value, value: o.value });
      } else {return this._def.schema._parseAsync({
          data: s.data,
          path: s.path,
          parent: s,
        }).then((o) =>
          o.status === "aborted"
            ? y
            : (o.status === "dirty" && t.dirty(),
              i(o.value).then(() => ({ status: t.value, value: o.value })))
        );}
    }
    if (n.type === "transform") {
      if (s.common.async === !1) {
        let i = this._def.schema._parseSync({
          data: s.data,
          path: s.path,
          parent: s,
        });
        if (!Re(i)) return i;
        let o = n.transform(i.value, a);
        if (o instanceof Promise) {
          throw new Error(
            "Asynchronous transform encountered during synchronous parse operation. Use .parseAsync instead.",
          );
        }
        return { status: t.value, value: o };
      } else {return this._def.schema._parseAsync({
          data: s.data,
          path: s.path,
          parent: s,
        }).then((i) =>
          Re(i)
            ? Promise.resolve(n.transform(i.value, a)).then((o) => ({
              status: t.value,
              value: o,
            }))
            : i
        );}
    }
    x.assertNever(n);
  }
};
E.create = (r, e, t) =>
  new E({ schema: r, typeName: m.ZodEffects, effect: e, ...g(t) });
E.createWithPreprocess = (r, e, t) =>
  new E({
    schema: e,
    effect: { type: "preprocess", transform: r },
    typeName: m.ZodEffects,
    ...g(t),
  });
var S = class extends v {
  _parse(e) {
    return this._getType(e) === h.undefined
      ? T(void 0)
      : this._def.innerType._parse(e);
  }
  unwrap() {
    return this._def.innerType;
  }
};
S.create = (r, e) => new S({ innerType: r, typeName: m.ZodOptional, ...g(e) });
var $ = class extends v {
  _parse(e) {
    return this._getType(e) === h.null
      ? T(null)
      : this._def.innerType._parse(e);
  }
  unwrap() {
    return this._def.innerType;
  }
};
$.create = (r, e) => new $({ innerType: r, typeName: m.ZodNullable, ...g(e) });
var ne = class extends v {
  _parse(e) {
    let { ctx: t } = this._processInputParams(e), s = t.data;
    return t.parsedType === h.undefined && (s = this._def.defaultValue()),
      this._def.innerType._parse({ data: s, path: t.path, parent: t });
  }
  removeDefault() {
    return this._def.innerType;
  }
};
ne.create = (r, e) =>
  new ne({
    innerType: r,
    typeName: m.ZodDefault,
    defaultValue: typeof e.default == "function" ? e.default : () => e.default,
    ...g(e),
  });
var ae = class extends v {
  _parse(e) {
    let { ctx: t } = this._processInputParams(e),
      s = { ...t, common: { ...t.common, issues: [] } },
      n = this._def.innerType._parse({
        data: s.data,
        path: s.path,
        parent: { ...s },
      });
    return Ce(n)
      ? n.then((a) => ({
        status: "valid",
        value: a.status === "valid" ? a.value : this._def.catchValue({
          get error() {
            return new C(s.common.issues);
          },
          input: s.data,
        }),
      }))
      : {
        status: "valid",
        value: n.status === "valid" ? n.value : this._def.catchValue({
          get error() {
            return new C(s.common.issues);
          },
          input: s.data,
        }),
      };
  }
  removeCatch() {
    return this._def.innerType;
  }
};
ae.create = (r, e) =>
  new ae({
    innerType: r,
    typeName: m.ZodCatch,
    catchValue: typeof e.catch == "function" ? e.catch : () => e.catch,
    ...g(e),
  });
var ve = class extends v {
  _parse(e) {
    if (this._getType(e) !== h.nan) {
      let s = this._getOrReturnCtx(e);
      return f(s, {
        code: d.invalid_type,
        expected: h.nan,
        received: s.parsedType,
      }),
        y;
    }
    return { status: "valid", value: e.data };
  }
};
ve.create = (r) => new ve({ typeName: m.ZodNaN, ...g(r) });
var tr = Symbol("zod_brand"),
  Ee = class extends v {
    _parse(e) {
      let { ctx: t } = this._processInputParams(e), s = t.data;
      return this._def.type._parse({ data: s, path: t.path, parent: t });
    }
    unwrap() {
      return this._def.type;
    }
  },
  Se = class r extends v {
    _parse(e) {
      let { status: t, ctx: s } = this._processInputParams(e);
      if (s.common.async) {
        return (async () => {
          let a = await this._def.in._parseAsync({
            data: s.data,
            path: s.path,
            parent: s,
          });
          return a.status === "aborted"
            ? y
            : a.status === "dirty"
            ? (t.dirty(), fe(a.value))
            : this._def.out._parseAsync({
              data: a.value,
              path: s.path,
              parent: s,
            });
        })();
      }
      {
        let n = this._def.in._parseSync({
          data: s.data,
          path: s.path,
          parent: s,
        });
        return n.status === "aborted"
          ? y
          : n.status === "dirty"
          ? (t.dirty(), { status: "dirty", value: n.value })
          : this._def.out._parseSync({
            data: n.value,
            path: s.path,
            parent: s,
          });
      }
    }
    static create(e, t) {
      return new r({ in: e, out: t, typeName: m.ZodPipeline });
    }
  },
  ie = class extends v {
    _parse(e) {
      let t = this._def.innerType._parse(e),
        s = (n) => (Re(n) && (n.value = Object.freeze(n.value)), n);
      return Ce(t) ? t.then((n) => s(n)) : s(t);
    }
    unwrap() {
      return this._def.innerType;
    }
  };
ie.create = (r, e) =>
  new ie({ innerType: r, typeName: m.ZodReadonly, ...g(e) });
function ht(r, e = {}, t) {
  return r
    ? z.create().superRefine((s, n) => {
      var a, i;
      if (!r(s)) {
        let o = typeof e == "function"
            ? e(s)
            : typeof e == "string"
            ? { message: e }
            : e,
          l = (i = (a = o.fatal) !== null && a !== void 0 ? a : t) !== null &&
              i !== void 0
            ? i
            : !0,
          c = typeof o == "string" ? { message: o } : o;
        n.addIssue({ code: "custom", ...c, fatal: l });
      }
    })
    : z.create();
}
var rr = { object: R.lazycreate }, m;
(function (r) {
  r.ZodString = "ZodString",
    r.ZodNumber = "ZodNumber",
    r.ZodNaN = "ZodNaN",
    r.ZodBigInt = "ZodBigInt",
    r.ZodBoolean = "ZodBoolean",
    r.ZodDate = "ZodDate",
    r.ZodSymbol = "ZodSymbol",
    r.ZodUndefined = "ZodUndefined",
    r.ZodNull = "ZodNull",
    r.ZodAny = "ZodAny",
    r.ZodUnknown = "ZodUnknown",
    r.ZodNever = "ZodNever",
    r.ZodVoid = "ZodVoid",
    r.ZodArray = "ZodArray",
    r.ZodObject = "ZodObject",
    r.ZodUnion = "ZodUnion",
    r.ZodDiscriminatedUnion = "ZodDiscriminatedUnion",
    r.ZodIntersection = "ZodIntersection",
    r.ZodTuple = "ZodTuple",
    r.ZodRecord = "ZodRecord",
    r.ZodMap = "ZodMap",
    r.ZodSet = "ZodSet",
    r.ZodFunction = "ZodFunction",
    r.ZodLazy = "ZodLazy",
    r.ZodLiteral = "ZodLiteral",
    r.ZodEnum = "ZodEnum",
    r.ZodEffects = "ZodEffects",
    r.ZodNativeEnum = "ZodNativeEnum",
    r.ZodOptional = "ZodOptional",
    r.ZodNullable = "ZodNullable",
    r.ZodDefault = "ZodDefault",
    r.ZodCatch = "ZodCatch",
    r.ZodPromise = "ZodPromise",
    r.ZodBranded = "ZodBranded",
    r.ZodPipeline = "ZodPipeline",
    r.ZodReadonly = "ZodReadonly";
})(m || (m = {}));
var sr = (r, e = { message: `Input not instance of ${r.name}` }) =>
    ht((t) => t instanceof r, e),
  pt = L.create,
  mt = W.create,
  nr = ve.create,
  ar = J.create,
  yt = F.create,
  ir = G.create,
  or = pe.create,
  cr = Q.create,
  dr = Y.create,
  ur = z.create,
  lr = M.create,
  fr = j.create,
  hr = me.create,
  pr = V.create,
  mr = R.create,
  yr = R.strictCreate,
  gr = K.create,
  vr = Ue.create,
  _r = X.create,
  xr = N.create,
  wr = Le.create,
  br = ye.create,
  kr = ge.create,
  Tr = ze.create,
  Rr = ee.create,
  Cr = te.create,
  Er = re.create,
  Sr = se.create,
  Or = H.create,
  it = E.create,
  jr = S.create,
  Ar = $.create,
  Nr = E.createWithPreprocess,
  $r = Se.create,
  Ir = () => pt().optional(),
  Zr = () => mt().optional(),
  Pr = () => yt().optional(),
  Mr = {
    string: (r) => L.create({ ...r, coerce: !0 }),
    number: (r) => W.create({ ...r, coerce: !0 }),
    boolean: (r) => F.create({ ...r, coerce: !0 }),
    bigint: (r) => J.create({ ...r, coerce: !0 }),
    date: (r) => G.create({ ...r, coerce: !0 }),
  },
  Vr = y,
  w = Object.freeze({
    __proto__: null,
    defaultErrorMap: he,
    setErrorMap: Vt,
    getErrorMap: Me,
    makeIssue: Ve,
    EMPTY_PATH: Dt,
    addIssueToContext: f,
    ParseStatus: b,
    INVALID: y,
    DIRTY: fe,
    OK: T,
    isAborted: Fe,
    isDirty: Ge,
    isValid: Re,
    isAsync: Ce,
    get util() {
      return x;
    },
    get objectUtil() {
      return Je;
    },
    ZodParsedType: h,
    getParsedType: U,
    ZodType: v,
    datetimeRegex: lt,
    ZodString: L,
    ZodNumber: W,
    ZodBigInt: J,
    ZodBoolean: F,
    ZodDate: G,
    ZodSymbol: pe,
    ZodUndefined: Q,
    ZodNull: Y,
    ZodAny: z,
    ZodUnknown: M,
    ZodNever: j,
    ZodVoid: me,
    ZodArray: V,
    ZodObject: R,
    ZodUnion: K,
    ZodDiscriminatedUnion: Ue,
    ZodIntersection: X,
    ZodTuple: N,
    ZodRecord: Le,
    ZodMap: ye,
    ZodSet: ge,
    ZodFunction: ze,
    ZodLazy: ee,
    ZodLiteral: te,
    ZodEnum: re,
    ZodNativeEnum: se,
    ZodPromise: H,
    ZodEffects: E,
    ZodTransformer: E,
    ZodOptional: S,
    ZodNullable: $,
    ZodDefault: ne,
    ZodCatch: ae,
    ZodNaN: ve,
    BRAND: tr,
    ZodBranded: Ee,
    ZodPipeline: Se,
    ZodReadonly: ie,
    custom: ht,
    Schema: v,
    ZodSchema: v,
    late: rr,
    get ZodFirstPartyTypeKind() {
      return m;
    },
    coerce: Mr,
    any: ur,
    array: pr,
    bigint: ar,
    boolean: yt,
    date: ir,
    discriminatedUnion: vr,
    effect: it,
    enum: Er,
    function: Tr,
    instanceof: sr,
    intersection: _r,
    lazy: Rr,
    literal: Cr,
    map: br,
    nan: nr,
    nativeEnum: Sr,
    never: fr,
    null: dr,
    nullable: Ar,
    number: mt,
    object: mr,
    oboolean: Pr,
    onumber: Zr,
    optional: jr,
    ostring: Ir,
    pipeline: $r,
    preprocess: Nr,
    promise: Or,
    record: wr,
    set: kr,
    strictObject: yr,
    string: pt,
    symbol: or,
    transformer: it,
    tuple: xr,
    undefined: cr,
    union: gr,
    unknown: lr,
    void: hr,
    NEVER: Vr,
    ZodIssueCode: d,
    quotelessJson: Mt,
    ZodError: C,
  });
var Dr = (r) => typeof r?.safeParse == "function";
var Ye = (r) => typeof r?.passthrough == "function";
var Ur = (r, e) =>
    Ye(r) ? Ye(e) ? r.merge(e) : r : Ye(e) ? e : Object.assign({}, r, e),
  _e = (r, e, { passThroughExtraKeys: t = !1 } = {}) => {
    if (Dr(e)) {
      let s = e.safeParse(r);
      return s.success
        ? {
          success: !0,
          data: t && typeof r == "object" ? { ...r, ...s.data } : s.data,
        }
        : { success: !1, error: s.error };
    }
    return { success: !0, data: r };
  };
var Ae = w.object({
    name: w.literal("ZodError"),
    issues: w.array(
      w.object({
        path: w.array(w.union([w.string(), w.number()])),
        message: w.string().optional(),
        code: w.nativeEnum(w.ZodIssueCode),
      }).catchall(w.any()),
    ),
  }),
  gt = Symbol("ContractNoBody"),
  He = (r) => "method" in r && "path" in r;
var vt = (r, e) =>
    Object.fromEntries(
      Object.entries(r).map(([t, s]) => {
        var n, a, i;
        return He(s)
          ? [t, {
            ...s,
            path: e?.pathPrefix ? e.pathPrefix + s.path : s.path,
            headers: Ur(e?.baseHeaders, s.headers),
            strictStatusCodes:
              (n = s.strictStatusCodes) !== null && n !== void 0
                ? n
                : e?.strictStatusCodes,
            validateResponseOnClient:
              (a = s.validateResponseOnClient) !== null && a !== void 0
                ? a
                : e?.validateResponseOnClient,
            responses: { ...e?.commonResponses, ...s.responses },
            metadata: e?.metadata
              ? {
                ...e?.metadata,
                ...(i = s.metadata) !== null && i !== void 0 ? i : {},
              }
              : s.metadata,
          }]
          : [t, vt(s, e)];
      }),
    ),
  Ke = Symbol("ContractPlainType"),
  _t = () => ({
    router: (r, e) => vt(r, e),
    query: (r) => r,
    mutation: (r) => r,
    responses: (r) => r,
    response: () => Ke,
    body: () => Ke,
    type: () => Ke,
    otherResponse: ({ contentType: r, body: e }) => ({
      contentType: r,
      body: e,
    }),
    noBody: () => gt,
  });
var xt = (r) =>
  Object.fromEntries(
    Object.entries(r).map(([e, t]) => {
      let s;
      try {
        s = JSON.parse(t);
      } catch {
        s = t;
      }
      return [e, s];
    }),
  );
var Oe = class extends Error {
    constructor(e, t) {
      super(
        `[ts-rest] Response validation failed for ${e.method} ${e.path}: ${t.message}`,
      ),
        this.appRoute = e,
        this.cause = t;
    }
  },
  Lr = (r) =>
    r != null && typeof r == "object" && "status" in r &&
    typeof r.status == "number",
  Xe = (r) => r != null && typeof r == "object" && "contentType" in r,
  wt = (r) => r === gt,
  bt = ({ appRoute: r, response: e }) => {
    if (Lr(e)) {
      let t = r.responses[e.status], s = Xe(t) ? t.body : t, n = _e(e.body, s);
      if (!n.success) throw new Oe(r, n.error);
      return { status: e.status, body: n.data };
    }
    return e;
  },
  je = class extends Error {
    constructor(e, t) {
      super(),
        this.statusCode = t.status,
        this.body = t.body,
        this.name = this.constructor.name,
        typeof t.body == "string"
          ? this.message = t.body
          : typeof t.body == "object" && t.body !== null &&
              "message" in t.body && typeof t.body.message == "string"
          ? this.message = t.body.message
          : this.message = "Error";
    }
  };
var qe = _t().router({
  greet: {
    method: "GET",
    path: "/greeting",
    query: w.object({ name: w.string() }),
    responses: { 200: w.string() },
  },
}, { strictStatusCodes: !0 });
var kt = ({ base: r = "", routes: e = [], ...t } = {}) => ({
    __proto__: new Proxy({}, {
      get: (s, n, a, i) => (o, ...l) =>
        e.push([
          n.toUpperCase?.(),
          RegExp(
            `^${
              (i = (r + o).replace(/\/+(\/|$)/g, "$1")).replace(
                /(\/?\.?):(\w+)\+/g,
                "($1(?<$2>*))",
              ).replace(/(\/?\.?):(\w+)/g, "($1(?<$2>[^$1/]+?))").replace(
                /\./g,
                "\\.",
              ).replace(/(\/?)\*/g, "($1.*)?")
            }/*$`,
          ),
          l,
          i,
        ]) && a,
    }),
    routes: e,
    ...t,
    async fetch(s, ...n) {
      let a, i, o = new URL(s.url), l = s.query = { __proto__: null };
      for (let [c, u] of o.searchParams) l[c] = l[c] ? [].concat(l[c], u) : u;
      e: try {
        for (let c of t.before || []) {
          if ((a = await c(s.proxy ?? s, ...n)) != null) break e;
        }
        t: for (let [c, u, _, k] of e) {
          if ((c == s.method || c == "ALL") && (i = o.pathname.match(u))) {
            s.params = i.groups || {}, s.route = k;
            for (let A of _) {
              if ((a = await A(s.proxy ?? s, ...n)) != null) break t;
            }
          }
        }
      } catch (c) {
        if (!t.catch) throw c;
        a = await t.catch(c, s.proxy ?? s, ...n);
      }
      try {
        for (let c of t.finally || []) a = await c(a, s.proxy ?? s, ...n) ?? a;
      } catch (c) {
        if (!t.catch) throw c;
        a = await t.catch(c, s.proxy ?? s, ...n);
      }
      return a;
    },
  }),
  xe = (r = "text/plain; charset=utf-8", e) => (t, s = {}) => {
    if (t === void 0 || t instanceof Response) return t;
    let n = new Response(e?.(t) ?? t, s.url ? void 0 : s);
    return n.headers.set("content-type", r), n;
  },
  Kr = xe("application/json; charset=utf-8", JSON.stringify);
var Tt = (r) => {
  r.proxy = new Proxy(r.proxy ?? r, {
    get: (e, t) => e[t]?.bind?.(r) ?? e[t] ?? e?.params?.[t],
  });
};
var Xr = xe("text/plain; charset=utf-8", String),
  es = xe("text/html"),
  ts = xe("image/jpeg"),
  rs = xe("image/png"),
  ss = xe("image/webp");
var Rt = (r = {}) => {
  let {
      origin: e = "*",
      credentials: t = !1,
      allowMethods: s = "*",
      allowHeaders: n,
      exposeHeaders: a,
      maxAge: i,
    } = r,
    o = (c) => {
      let u = c?.headers.get("origin");
      return e === !0
        ? u
        : e instanceof RegExp
        ? e.test(u) ? u : void 0
        : Array.isArray(e)
        ? e.includes(u) ? u : void 0
        : e instanceof Function
        ? e(u)
        : e == "*" && t
        ? u
        : e;
    },
    l = (c, u) => {
      for (let [_, k] of Object.entries(u)) k && c.headers.append(_, k);
      return c;
    };
  return {
    corsify: (c, u) =>
      c?.headers?.get("access-control-allow-origin") || c.status == 101
        ? c
        : l(c.clone(), {
          "access-control-allow-origin": o(u),
          "access-control-allow-credentials": t,
        }),
    preflight: (c) => {
      if (c.method == "OPTIONS") {
        let u = new Response(null, { status: 204 });
        return l(u, {
          "access-control-allow-origin": o(c),
          "access-control-allow-methods": s?.join?.(",") ?? s,
          "access-control-expose-headers": a?.join?.(",") ?? a,
          "access-control-allow-headers": n?.join?.(",") ?? n ??
            c.headers.get("access-control-request-headers"),
          "access-control-max-age": i,
          "access-control-allow-credentials": t,
        });
      }
    },
  };
};
var I = class extends Error {
    constructor(e, t, s = "application/json") {
      super(),
        this.statusCode = e,
        this.body = t,
        this.contentType = s,
        this.name = this.constructor.name,
        typeof t == "string"
          ? this.message = t
          : typeof t == "object" && t !== null && "message" in t &&
              typeof t.message == "string"
          ? this.message = t.message
          : this.message = "Error";
    }
  },
  Ne = class extends Request {
    constructor(e, t) {
      super(e, t), this.route = "", this.params = {}, this.query = {};
    }
  },
  D = class r extends Response {
    constructor(e, t) {
      super(e, t), this.rawBody = e;
    }
    static fromJson(e, t) {
      let s = t?.headers instanceof Headers
        ? t.headers
        : new Headers(t?.headers);
      return s.set("content-type", "application/json"),
        new r(JSON.stringify(e), { ...t, headers: s });
    }
    static fromText(e, t) {
      let s = t?.headers instanceof Headers
        ? t.headers
        : new Headers(t?.headers);
      return s.set("content-type", "text/plain"),
        new r(e, { ...t, headers: s });
    }
    clone() {
      return new r(this.rawBody, this);
    }
  },
  ce = class r {
    constructor(e) {
      e instanceof r
        ? (this.contract = e.contract,
          this._requestMiddleware = [...e._requestMiddleware],
          this._responseHandlers = [...e._responseHandlers],
          this._router = Object.assign({}, e._router),
          this._remainingRoutes = new Set(e._remainingRoutes))
        : (this.contract = e,
          this._requestMiddleware = [],
          this._responseHandlers = [],
          this._router = {},
          this._remainingRoutes = new Set(
            this.getPathsFromContractOrRouter(e),
          ));
    }
    clone() {
      return new r(this);
    }
    isRouteImplementationOrOptions(e) {
      return typeof e == "function" ||
        "handler" in e && typeof e.handler == "function";
    }
    isContractEndpointOrRouteImplementationOrOptions(e) {
      return "method" in e && "path" in e ||
        this.isRouteImplementationOrOptions(e);
    }
    getPathsFromContractOrRouter(e, t = "") {
      let s = t === "" ? "" : `${t}.`;
      return Object.entries(e).reduce(
        (
          n,
          [a, i],
        ) => (this.isContractEndpointOrRouteImplementationOrOptions(i)
          ? n.push(`${s}${a}`)
          : n.push(...this.getPathsFromContractOrRouter(e[a], `${s}${a}`)),
          n),
        [],
      );
    }
    requestMiddleware(e) {
      return this._requestMiddleware.push(e), this;
    }
    responseHandler(e) {
      return this._responseHandlers.push(e), this;
    }
    route(e, t) {
      let s = e.split("."), n = this._router;
      for (; s.length > 1;) {
        let a = s.shift();
        n[a] || (n[a] = {}), n = n[a];
      }
      return n[s.shift()] = t,
        this._remainingRoutes.delete(e),
        this._remainingRoutes.size > 0 ? this : new oe(this);
    }
    routeWithMiddleware(e, t) {
      return this.route(e, t(new et()));
    }
    partialRouter(e) {
      this.getPathsFromContractOrRouter(e).forEach((s) => {
        this._remainingRoutes.delete(s);
      });
      let t = (s, n, a = "") => {
        let i = a === "" ? "" : `${a}.`;
        return Object.entries(n).forEach(([o, l]) => {
          this.isRouteImplementationOrOptions(l)
            ? (this._remainingRoutes.delete(`${i}.${o}`), s[o] = l)
            : (s[o] || (s[o] = {}), t(s[o], l, `${i}.${o}`));
        });
      };
      return t(this._router, e),
        this._remainingRoutes.size > 0 ? this : new oe(this);
    }
    subRouter(e, t) {
      let s = e.split("."), n = {}, a = n;
      for (; s.length > 1;) {
        let i = s.shift();
        a[i] = {}, a = a[i];
      }
      return a[s.shift()] = t instanceof oe ? t.build() : t,
        this.partialRouter(n);
    }
    fullRouter(e) {
      return this._router = e, this._remainingRoutes.clear(), new oe(this);
    }
  },
  oe = class extends ce {
    constructor(e) {
      super(e);
    }
    getRequestMiddleware() {
      return this._requestMiddleware;
    }
    getResponseHandlers() {
      return this._responseHandlers;
    }
    build() {
      return this._router;
    }
  },
  et = class {
    constructor() {
      this._middleware = [];
    }
    middleware(e) {
      return this._middleware.push(e), this;
    }
    handler(e) {
      return { middleware: this._middleware, handler: e };
    }
  },
  $e = class extends I {
    constructor(e, t, s, n) {
      super(400, {
        message: "Request validation failed",
        pathParameterErrors: e,
        headerErrors: t,
        queryParameterErrors: s,
        bodyErrors: n,
      }),
        this.pathParamsError = e,
        this.headersError = t,
        this.queryError = s,
        this.bodyError = n;
    }
  };
w.object({
  message: w.literal("Request validation failed"),
  pathParameterErrors: Ae.nullable(),
  headerErrors: Ae.nullable(),
  queryParameterErrors: Ae.nullable(),
  bodyErrors: Ae.nullable(),
});
var Ie = class extends I {
    constructor(e, t) {
      super(500, { message: "Server Error" }),
        this.appRoute = e,
        this.error = t,
        this.message =
          `[ts-rest] Response validation failed for ${e.method} ${e.path}: ${t.message}`;
    }
  },
  tt = (r) => typeof r == "function",
  Ct = (r) => typeof r == "object" && typeof r?.handler != "function",
  rt = () => ({
    router: (r, e) => e,
    routerWithMiddleware: (r) => (e) => e,
    routerBuilder: (r) => new ce(r),
    route: (r, e) => e,
    routeWithMiddleware: (r) => (e) => e,
    middleware: (r) => r,
  });
async function zr(r) {
  if (typeof r.arrayBuffer == "function") return await r.arrayBuffer();
  for (let e of Object.getOwnPropertySymbols(r)) {
    if (e.description === "impl") {
      let s = r[e]._buffer;
      return s.buffer.slice(s.byteOffset, s.byteOffset + s.byteLength);
    }
  }
  if (globalThis.FileReader) {
    return new Promise((e) => {
      let t = new FileReader();
      t.onload = () => {
        e(t.result);
      }, t.readAsArrayBuffer(r);
    });
  }
  throw new Error("Unable to convert blob to array buffer");
}
var Et = ({ schema: r, router: e, processRoute: t }) => {
    if (Ct(e)) {
      for (let s in e) {
        if (He(r)) {
          throw new Error("[ts-rest] Expected AppRouter but received AppRoute");
        }
        Et({ schema: r[s], router: e[s], processRoute: t });
      }
    } else {
      if (!He(r)) {
        throw new Error("[ts-rest] Expected AppRoute but received AppRouter");
      }
      t(e, r);
    }
  },
  Hr = (r, e, t) => {
    let s = _e(r.params, e.pathParams, { passThroughExtraKeys: !0 }), n = {};
    r.headers.forEach((l, c) => {
      n[c] = l;
    });
    let a = _e(n, e.headers, { passThroughExtraKeys: !0 }),
      i = _e(t.jsonQuery ? xt(r.query) : r.query, e.query),
      o = _e(r.content, "body" in e ? e.body : null);
    if (!s.success || !a.success || !i.success || !o.success) {
      throw new $e(
        s.success ? null : s.error,
        a.success ? null : a.error,
        i.success ? null : i.error,
        o.success ? null : o.error,
      );
    }
    return { paramsResult: s, headersResult: a, queryResult: i, bodyResult: o };
  },
  qr = (r) => {
    var e;
    let { preflight: t, corsify: s } = Rt(r.cors || {}),
      n = (e = r.basePath) !== null && e !== void 0 ? e : "";
    return {
      basePathChecker: (u) => {
        let _ = new URL(u.url).pathname;
        if (!_.startsWith(n)) {
          throw new Error(
            `Expected path to start with the basePath of ${n}, but got a path of ${_}`,
          );
        }
      },
      varyHeader: (u, _) => {
        r.cors &&
          (_.method === "OPTIONS" && !r.cors.allowHeaders &&
            u.headers.append("vary", "Access-Control-Request-Headers"),
            (r.cors.origin === !0 || r.cors.origin instanceof RegExp ||
              Array.isArray(r.cors.origin) ||
              r.cors.origin instanceof Function ||
              r.cors.origin === "*" && r.cors.credentials) &&
            u.headers.append("vary", "Origin"));
      },
      evaluateContent: async (u) => {
        var _, k;
        u.method !== "GET" && u.method !== "HEAD" &&
          (!((_ = u.headers.get("content-type")) === null || _ === void 0) &&
              _.includes("json")
            ? u.content = await u.json()
            : !((k = u.headers.get("content-type")) === null || k === void 0) &&
              k.startsWith("text/") && (u.content = await u.text()));
      },
      preflight: (u) => {
        let _ = t(u);
        if (_) return u.preflightCorsHeadersSet = !0, new D(null, _);
      },
      corsify: (u, _) => _.preflightCorsHeadersSet ? u : s(u, _),
    };
  },
  St = (r, e, t = {}) => {
    var s, n;
    let {
        basePathChecker: a,
        varyHeader: i,
        evaluateContent: o,
        preflight: l,
        corsify: c,
      } = qr(t),
      u = (s = t.requestMiddleware) !== null && s !== void 0 ? s : [],
      _ = (n = t.responseHandlers) !== null && n !== void 0 ? n : [],
      k;
    e instanceof ce
      ? (u = e.getRequestMiddleware(),
        _ = e.getResponseHandlers(),
        k = e.build())
      : k = e;
    let A = kt({
      before: [...t.basePath ? [a] : [], ...t.cors ? [l] : [], Tt, o, ...u],
      catch: Br(t),
      finally: [...t.cors ? [c, i] : [], ..._],
    });
    return Et({
      schema: r,
      router: k,
      processRoute: (de, q) => {
        var Be;
        let $t = async (nt, Zt) => {
            let Ze = Hr(nt, q, t),
              ue = new Headers(),
              Pt = tt(de) ? de : de.handler,
              we;
            try {
              we = await Pt({
                params: Ze.paramsResult.data,
                body: Ze.bodyResult.data,
                query: Ze.queryResult.data,
                headers: Ze.headersResult.data,
              }, { appRoute: q, request: nt, responseHeaders: ue, ...Zt });
            } catch (Z) {
              if (Z instanceof je) we = { status: Z.statusCode, body: Z.body };
              else throw Z;
            }
            let be = Number(we.status), B = we.body;
            if (t.responseValidation) {
              try {
                B = bt({ appRoute: q, response: { status: be, body: we.body } })
                  .body;
              } catch (Z) {
                throw Z instanceof Oe ? new Ie(q, Z.cause) : Z;
              }
            }
            let Pe = q.responses[be];
            return wt(Pe)
              ? new D(null, { status: be, headers: ue })
              : Xe(Pe)
              ? (B instanceof Blob
                ? (ue.set("content-type", B.type || Pe.contentType),
                  B = await zr(B))
                : ue.set("content-type", Pe.contentType),
                new D(B, { status: be, headers: ue }))
              : D.fromJson(B, { status: be, headers: ue });
          },
          It = q.method.toLowerCase(),
          st = !tt(de) && de.middleware ? de.middleware : [];
        st.push($t),
          A[It].apply(A, [
            `${(Be = t.basePath) !== null && Be !== void 0 ? Be : ""}${q.path}`,
            ...st,
          ]);
      },
    }),
      A.all("*", () => {
        throw new I(404, { message: "Not Found" });
      }),
      A;
  },
  Br = (r) => async (e, t) => {
    var s;
    if (r?.errorHandler) {
      let i = await r.errorHandler(e, t);
      if (i) return i;
    } else {e instanceof I ||
        console.error(
          "[ts-rest] Unexpected error...",
          e instanceof Error && e.stack ? e.stack : e,
        );}
    let n = e instanceof I ? e : new I(500, { message: "Server Error" }),
      a = (s = n.contentType) === null || s === void 0
        ? void 0
        : s.includes("json");
    return new D(a ? JSON.stringify(n.body) : n.body, {
      status: n.statusCode,
      headers: n.contentType
        ? new Headers({ "content-type": n.contentType })
        : void 0,
    });
  };
var Ot = { ...rt(), platformContext: () => rt() };
var jt = (
  { contract: r, router: e, options: t = {}, request: s, platformContext: n },
) => {
  let a = St(r, e, t), i = new Ne(s);
  return a.fetch(i, { ...n });
};
function At(r) {
  return Ot.router(qe, {
    async greet({ query: e }) {
      return { status: 200, body: `${r ?? "Hello"} ${e.name}` };
    },
  });
}
function Nt(r) {
  let e = w.object({ GREETING: w.string().optional() }).parse(r),
    t = At(e.GREETING);
  return (s) =>
    jt({
      request: s,
      contract: qe,
      router: t,
      options: { jsonQuery: !0, responseValidation: !0, basePath: "/api" },
    });
}
var Es = Nt(process.env);
export { Es as default };
