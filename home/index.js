"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};

console.log('test');
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// node_modules/@gemeentenijmegen/apigateway-http/lib/V2/Response.js
var require_Response = __commonJS({
  "node_modules/@gemeentenijmegen/apigateway-http/lib/V2/Response.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Response = void 0;
    var Response3 = class {
      static redirect(location, code = 302, cookies) {
        if (cookies != void 0 && !Array.isArray(cookies)) {
          cookies = [cookies];
        }
        return {
          statusCode: code,
          body: "",
          headers: {
            Location: location
          },
          cookies
        };
      }
      static html(body, code = 200, cookies) {
        if (cookies != void 0 && !Array.isArray(cookies)) {
          cookies = [cookies];
        }
        return {
          statusCode: code,
          body,
          headers: {
            "Content-type": "text/html"
          },
          cookies
        };
      }
      static error(code = 500, message) {
        if (message) {
          return this.json({ message }, code);
        }
        return {
          statusCode: code
        };
      }
      static json(json, code = 200, cookies) {
        if (cookies != void 0 && !Array.isArray(cookies)) {
          cookies = [cookies];
        }
        const body = JSON.stringify(json);
        return {
          statusCode: code,
          body,
          headers: {
            "Content-type": "application/json"
          },
          cookies
        };
      }
      static ok(code = 200, message) {
        if (code < 200 || code >= 300) {
          throw new Error("Only 2xx statuscodes are allowed");
        }
        if (message) {
          return this.json({ message }, code);
        }
        return { statusCode: code };
      }
    };
    exports.Response = Response3;
  }
});

// node_modules/cookie/index.js
var require_cookie = __commonJS({
  "node_modules/cookie/index.js"(exports) {
    "use strict";
    exports.parse = parse3;
    exports.serialize = serialize;
    var __toString = Object.prototype.toString;
    var fieldContentRegExp = /^[\u0009\u0020-\u007e\u0080-\u00ff]+$/;
    function parse3(str, options) {
      if (typeof str !== "string") {
        throw new TypeError("argument str must be a string");
      }
      var obj = {};
      var opt = options || {};
      var dec = opt.decode || decode;
      var index = 0;
      while (index < str.length) {
        var eqIdx = str.indexOf("=", index);
        if (eqIdx === -1) {
          break;
        }
        var endIdx = str.indexOf(";", index);
        if (endIdx === -1) {
          endIdx = str.length;
        } else if (endIdx < eqIdx) {
          index = str.lastIndexOf(";", eqIdx - 1) + 1;
          continue;
        }
        var key = str.slice(index, eqIdx).trim();
        if (void 0 === obj[key]) {
          var val = str.slice(eqIdx + 1, endIdx).trim();
          if (val.charCodeAt(0) === 34) {
            val = val.slice(1, -1);
          }
          obj[key] = tryDecode(val, dec);
        }
        index = endIdx + 1;
      }
      return obj;
    }
    function serialize(name, val, options) {
      var opt = options || {};
      var enc = opt.encode || encode;
      if (typeof enc !== "function") {
        throw new TypeError("option encode is invalid");
      }
      if (!fieldContentRegExp.test(name)) {
        throw new TypeError("argument name is invalid");
      }
      var value = enc(val);
      if (value && !fieldContentRegExp.test(value)) {
        throw new TypeError("argument val is invalid");
      }
      var str = name + "=" + value;
      if (null != opt.maxAge) {
        var maxAge = opt.maxAge - 0;
        if (isNaN(maxAge) || !isFinite(maxAge)) {
          throw new TypeError("option maxAge is invalid");
        }
        str += "; Max-Age=" + Math.floor(maxAge);
      }
      if (opt.domain) {
        if (!fieldContentRegExp.test(opt.domain)) {
          throw new TypeError("option domain is invalid");
        }
        str += "; Domain=" + opt.domain;
      }
      if (opt.path) {
        if (!fieldContentRegExp.test(opt.path)) {
          throw new TypeError("option path is invalid");
        }
        str += "; Path=" + opt.path;
      }
      if (opt.expires) {
        var expires = opt.expires;
        if (!isDate(expires) || isNaN(expires.valueOf())) {
          throw new TypeError("option expires is invalid");
        }
        str += "; Expires=" + expires.toUTCString();
      }
      if (opt.httpOnly) {
        str += "; HttpOnly";
      }
      if (opt.secure) {
        str += "; Secure";
      }
      if (opt.priority) {
        var priority = typeof opt.priority === "string" ? opt.priority.toLowerCase() : opt.priority;
        switch (priority) {
          case "low":
            str += "; Priority=Low";
            break;
          case "medium":
            str += "; Priority=Medium";
            break;
          case "high":
            str += "; Priority=High";
            break;
          default:
            throw new TypeError("option priority is invalid");
        }
      }
      if (opt.sameSite) {
        var sameSite = typeof opt.sameSite === "string" ? opt.sameSite.toLowerCase() : opt.sameSite;
        switch (sameSite) {
          case true:
            str += "; SameSite=Strict";
            break;
          case "lax":
            str += "; SameSite=Lax";
            break;
          case "strict":
            str += "; SameSite=Strict";
            break;
          case "none":
            str += "; SameSite=None";
            break;
          default:
            throw new TypeError("option sameSite is invalid");
        }
      }
      return str;
    }
    function decode(str) {
      return str.indexOf("%") !== -1 ? decodeURIComponent(str) : str;
    }
    function encode(val) {
      return encodeURIComponent(val);
    }
    function isDate(val) {
      return __toString.call(val) === "[object Date]" || val instanceof Date;
    }
    function tryDecode(str, decode2) {
      try {
        return decode2(str);
      } catch (e) {
        return str;
      }
    }
  }
});

// node_modules/@gemeentenijmegen/session/lib/index.js
var require_lib = __commonJS({
  "node_modules/@gemeentenijmegen/session/lib/index.js"(exports) {
    "use strict";
    var __importDefault = exports && exports.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Session = void 0;
    var crypto_1 = __importDefault(require("crypto"));
    var client_dynamodb_1 = require("@aws-sdk/client-dynamodb");
    var cookie_1 = __importDefault(require_cookie());
    var Session2 = class {
      /**
         * Session handler
         *
         * Construct a session object and pass the lambda event object.
         * call init() to get the current session state. create or update
         * sessions as needed.
         * @param {string} cookieString the event object provided to the lambda
         */
      constructor(cookieString, dynamoDBClient2, options) {
        var _a;
        this.sessionHash = false;
        console.log('cookiestring', cookieString);
        this.sessionId = this.getSessionId(cookieString);
        this.dbClient = dynamoDBClient2;
        console.log('YYYYY', this.dbClient);
        if (this.sessionId) {
          this.sessionHash = this.hash(this.sessionId);
        }
        this.ttl = (_a = options === null || options === void 0 ? void 0 : options.ttlInMinutes) !== null && _a !== void 0 ? _a : 15;
      }
      /**
         * Parses the cookie string for the session id.
         * @param {object} cookieString a standard cookie header value
         * @returns {string|false}
         */
      getSessionId(cookieString) {
        if (!cookieString) {
          return false;
        }
        const cookies = cookie_1.default.parse(cookieString);
        if ((cookies === null || cookies === void 0 ? void 0 : cookies.session) != "") {
          return cookies.session;
        }
        return false;
      }
      hash(hashString) {
        const hash = crypto_1.default.createHash("sha256");
        hash.update(hashString);
        return hash.digest("base64");
      }
      /**
         * Get the current session state from dynamodb,
         * set instance variables on the Session object.
         *
         * @returns dynamodb record | false
         */
      async init() {
        var _a;
        if (!this.sessionHash) {
          return false;
        }
        const getItemCommand = new client_dynamodb_1.GetItemCommand({
          TableName: process.env.SESSION_TABLE,
          Key: {
            sessionid: { S: this.sessionHash }
          }
        });
        try {
          console.log('sedning item');
          const session = await this.dbClient.send(getItemCommand);
          if (((_a = session.Item) === null || _a === void 0 ? void 0 : _a.data) !== void 0) {
            this.session = session;
            console.log('setting session');
            return session;
          } else {
            console.log('retunring false');
            return false;
          }
        } catch (err) {
          console.error("Error getting session from DynamoDB: " + err);
          throw err;
        }
      }
      /**
         * Check the current session state for login state. Call after init()
         * @returns bool
         */
      isLoggedIn() {
        var _a;
        console.log('loggedin', JSON.stringify(this.session));
        return (_a = this.getValue("loggedin", "BOOL")) !== null && _a !== void 0 ? _a : false;
      }
      /**
       * Get a value from the session store by key
       *
       * @param key key for the element in sessionData requested
       * @param type type of data (https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/HowItWorks.NamingRulesDataTypes.html#HowItWorks.DataTypes)
       * @returns {any} the value for the provided key or undefined if not found
       */
      getValue(key, type = "S") {
        var _a, _b, _c, _d;
        return (_d = (_c = (_b = (_a = this.session) === null || _a === void 0 ? void 0 : _a.Item) === null || _b === void 0 ? void 0 : _b.data) === null || _c === void 0 ? void 0 : _c.M[key]) === null || _d === void 0 ? void 0 : _d[type];
      }
      /**
         * Update the session with login state and / or BSN
         *
         * @param {any} sessionData set the session data
         */
      async updateSession(sessionData) {
        var _a, _b, _c;
        if (!this.sessionHash) {
          throw new Error("no sessionid, cannot update empty session");
        }
        const ttl = this.ttlFromMinutes(this.ttl);
        const command = new client_dynamodb_1.UpdateItemCommand({
          TableName: process.env.SESSION_TABLE,
          Key: {
            sessionid: { S: this.sessionHash }
          },
          UpdateExpression: "SET #ttl = :ttl, #data = :data",
          ExpressionAttributeNames: {
            "#ttl": "ttl",
            "#data": "data"
          },
          ExpressionAttributeValues: {
            ":ttl": { N: ttl },
            ":data": { M: sessionData }
          }
        });
        try {
          await this.dbClient.send(command);
        } catch (err) {
          console.error("Error updating session in DynamoDB: " + err);
          throw err;
        }
        if (!((_c = (_b = (_a = this === null || this === void 0 ? void 0 : this.session) === null || _a === void 0 ? void 0 : _a.Item) === null || _b === void 0 ? void 0 : _b.data) === null || _c === void 0 ? void 0 : _c.M)) {
          throw Error("Session had no data before, was this a valid session?");
        }
        this.session.Item.data.M = sessionData;
      }
      /**
         * Create a new session, store in dynamodb
         */
      async createSession(sessionData) {
        const sessionId = crypto_1.default.randomUUID();
        this.sessionHash = this.hash(sessionId);
        const ttl = this.ttlFromMinutes(this.ttl);
        const command = new client_dynamodb_1.PutItemCommand({
          TableName: process.env.SESSION_TABLE,
          Item: {
            sessionid: { S: this.sessionHash },
            data: { M: sessionData },
            ttl: { N: ttl }
          }
        });
        await this.dbClient.send(command);
        this.sessionId = sessionId;
        return sessionId;
      }
      ttlFromMinutes(minutes) {
        const now = /* @__PURE__ */ new Date();
        const ttl = Math.floor(now.getTime() / 1e3 + minutes * 60).toString();
        return ttl;
      }
      getCookie() {
        const value = this.sessionId != false ? this.sessionId : "";
        const cookieString = cookie_1.default.serialize("session", value, {
          httpOnly: true,
          secure: true,
          path: "/"
          //make sure the cookie is set for all paths in the domain
        });
        return cookieString;
      }
    };
    exports.Session = Session2;
    exports.Session = Session2;
  }
});

// src/app/home/home.lambda.ts
var home_lambda_exports = {};
__export(home_lambda_exports, {
  handler: () => handler
});
module.exports = __toCommonJS(home_lambda_exports);
var import_client_dynamodb = require("@aws-sdk/client-dynamodb");
var import_Response2 = __toESM(require_Response());

// src/app/home/homeRequestHandler.ts
var import_Response = __toESM(require_Response());
var import_session = __toESM(require_lib());

// src/app/home/templates/home.mustache
var home_default = '{{>header}}\n\n<main>\n    <!-- START: template component(s) -->\n    <div class="container" id="section-1">\n        <div class="row">\n            <div class="col-12">\n            <h1>Mijn Nijmegen</h1>\n                <p class="lead">Bekijk uw persoonsgegevens of uitkeringsgegevens.</p>\n            </div>\n        </div>\n        <div class="row">\n            {{#nav}}\n            <div class="col-lg-4">\n                <div class="card card-services">\n                    <div class="card-body">\n                        <p>{{{icon}}}\n                        <h2 class="card-title">{{title}}</h2>\n                        <p class="card-text">{{description}}</p>\n                        <p class="card-read-more text-right mb-0 text-uppercase">\n                            <a href="{{{url}}}" aria-label="{{label}}">Lees meer</a>\n                        </p>\n                    </div>\n                </div>\n            </div>\n            {{/nav}}\n        </div>\n    </div>\n\n    <!-- END: template component(s) -->\n</main>\n\n{{>footer}}\n';

// src/shared/mdi-currency-eur.mustache
var mdi_currency_eur_exports = {};
__export(mdi_currency_eur_exports, {
  default: () => mdi_currency_eur_default
});
var mdi_currency_eur_default = '<svg class="mdi mdi-currency-eur" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="24" height="24" viewBox="0 0 24 24"><path d="M15 18.5C12.5 18.5 10.32 17.08 9.24 15H15L16 13H8.58C8.53 12.67 8.5 12.34 8.5 12S8.53 11.33 8.58 11H15L16 9H9.24C10.32 6.92 12.5 5.5 15 5.5C16.61 5.5 18.09 6.09 19.23 7.07L21 5.3C19.41 3.87 17.3 3 15 3C11.08 3 7.76 5.5 6.5 9H3L2 11H6.06C6 11.33 6 11.66 6 12S6 12.67 6.06 13H3L2 15H6.5C7.76 18.5 11.08 21 15 21C17.31 21 19.41 20.13 21 18.7L19.22 16.93C18.09 17.91 16.62 18.5 15 18.5Z" /></svg>\n';

// src/shared/mdi-account.mustache
var mdi_account_exports = {};
__export(mdi_account_exports, {
  default: () => mdi_account_default
});
var mdi_account_default = '<svg class="mdi mdi-account" aria-hidden="true"  xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="24" height="24" viewBox="0 0 24 24"><path d="M12,4A4,4 0 0,1 16,8A4,4 0 0,1 12,12A4,4 0 0,1 8,8A4,4 0 0,1 12,4M12,14C16.42,14 20,15.79 20,18V20H4V18C4,15.79 7.58,14 12,14Z" /></svg>\n';

// src/shared/mdi-file-multiple.mustache
var mdi_file_multiple_exports = {};
__export(mdi_file_multiple_exports, {
  default: () => mdi_file_multiple_default
});
var mdi_file_multiple_default = '<svg class="mdi mdi-file-multiple" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="24" height="24" viewBox="0 0 24 24"><path d="M15,7H20.5L15,1.5V7M8,0H16L22,6V18A2,2 0 0,1 20,20H8C6.89,20 6,19.1 6,18V2A2,2 0 0,1 8,0M4,4V22H20V24H4A2,2 0 0,1 2,22V4H4Z" /></svg>\n';

// src/shared/nav.ts
var nav = [
  {
    url: "/persoonsgegevens",
    title: "Persoonsgegevens",
    description: "Bekijk uw persoons- en adresgegevens.",
    label: "Bekijk mijn persoonsgegevens",
    icon: mdi_account_exports.default
  },
  {
    url: "/uitkeringen",
    title: "Uitkeringen",
    description: "Bekijk uw uitkeringsgegevens.",
    label: "Bekijk mijn uitkeringen",
    icon: mdi_currency_eur_exports.default
  }
];

// node_modules/mustache/mustache.mjs
var objectToString = Object.prototype.toString;
var isArray = Array.isArray || function isArrayPolyfill(object) {
  return objectToString.call(object) === "[object Array]";
};
function isFunction(object) {
  return typeof object === "function";
}
function typeStr(obj) {
  return isArray(obj) ? "array" : typeof obj;
}
function escapeRegExp(string) {
  return string.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&");
}
function hasProperty(obj, propName) {
  return obj != null && typeof obj === "object" && propName in obj;
}
function primitiveHasOwnProperty(primitive, propName) {
  return primitive != null && typeof primitive !== "object" && primitive.hasOwnProperty && primitive.hasOwnProperty(propName);
}
var regExpTest = RegExp.prototype.test;
function testRegExp(re, string) {
  return regExpTest.call(re, string);
}
var nonSpaceRe = /\S/;
function isWhitespace(string) {
  return !testRegExp(nonSpaceRe, string);
}
var entityMap = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;",
  "/": "&#x2F;",
  "`": "&#x60;",
  "=": "&#x3D;"
};
function escapeHtml(string) {
  return String(string).replace(/[&<>"'`=\/]/g, function fromEntityMap(s) {
    return entityMap[s];
  });
}
var whiteRe = /\s*/;
var spaceRe = /\s+/;
var equalsRe = /\s*=/;
var curlyRe = /\s*\}/;
var tagRe = /#|\^|\/|>|\{|&|=|!/;
function parseTemplate(template, tags) {
  if (!template)
    return [];
  var lineHasNonSpace = false;
  var sections = [];
  var tokens = [];
  var spaces = [];
  var hasTag = false;
  var nonSpace = false;
  var indentation = "";
  var tagIndex = 0;
  function stripSpace() {
    if (hasTag && !nonSpace) {
      while (spaces.length)
        delete tokens[spaces.pop()];
    } else {
      spaces = [];
    }
    hasTag = false;
    nonSpace = false;
  }
  var openingTagRe, closingTagRe, closingCurlyRe;
  function compileTags(tagsToCompile) {
    if (typeof tagsToCompile === "string")
      tagsToCompile = tagsToCompile.split(spaceRe, 2);
    if (!isArray(tagsToCompile) || tagsToCompile.length !== 2)
      throw new Error("Invalid tags: " + tagsToCompile);
    openingTagRe = new RegExp(escapeRegExp(tagsToCompile[0]) + "\\s*");
    closingTagRe = new RegExp("\\s*" + escapeRegExp(tagsToCompile[1]));
    closingCurlyRe = new RegExp("\\s*" + escapeRegExp("}" + tagsToCompile[1]));
  }
  compileTags(tags || mustache.tags);
  var scanner = new Scanner(template);
  var start, type, value, chr, token, openSection;
  while (!scanner.eos()) {
    start = scanner.pos;
    value = scanner.scanUntil(openingTagRe);
    if (value) {
      for (var i = 0, valueLength = value.length; i < valueLength; ++i) {
        chr = value.charAt(i);
        if (isWhitespace(chr)) {
          spaces.push(tokens.length);
          indentation += chr;
        } else {
          nonSpace = true;
          lineHasNonSpace = true;
          indentation += " ";
        }
        tokens.push(["text", chr, start, start + 1]);
        start += 1;
        if (chr === "\n") {
          stripSpace();
          indentation = "";
          tagIndex = 0;
          lineHasNonSpace = false;
        }
      }
    }
    if (!scanner.scan(openingTagRe))
      break;
    hasTag = true;
    type = scanner.scan(tagRe) || "name";
    scanner.scan(whiteRe);
    if (type === "=") {
      value = scanner.scanUntil(equalsRe);
      scanner.scan(equalsRe);
      scanner.scanUntil(closingTagRe);
    } else if (type === "{") {
      value = scanner.scanUntil(closingCurlyRe);
      scanner.scan(curlyRe);
      scanner.scanUntil(closingTagRe);
      type = "&";
    } else {
      value = scanner.scanUntil(closingTagRe);
    }
    if (!scanner.scan(closingTagRe))
      throw new Error("Unclosed tag at " + scanner.pos);
    if (type == ">") {
      token = [type, value, start, scanner.pos, indentation, tagIndex, lineHasNonSpace];
    } else {
      token = [type, value, start, scanner.pos];
    }
    tagIndex++;
    tokens.push(token);
    if (type === "#" || type === "^") {
      sections.push(token);
    } else if (type === "/") {
      openSection = sections.pop();
      if (!openSection)
        throw new Error('Unopened section "' + value + '" at ' + start);
      if (openSection[1] !== value)
        throw new Error('Unclosed section "' + openSection[1] + '" at ' + start);
    } else if (type === "name" || type === "{" || type === "&") {
      nonSpace = true;
    } else if (type === "=") {
      compileTags(value);
    }
  }
  stripSpace();
  openSection = sections.pop();
  if (openSection)
    throw new Error('Unclosed section "' + openSection[1] + '" at ' + scanner.pos);
  return nestTokens(squashTokens(tokens));
}
function squashTokens(tokens) {
  var squashedTokens = [];
  var token, lastToken;
  for (var i = 0, numTokens = tokens.length; i < numTokens; ++i) {
    token = tokens[i];
    if (token) {
      if (token[0] === "text" && lastToken && lastToken[0] === "text") {
        lastToken[1] += token[1];
        lastToken[3] = token[3];
      } else {
        squashedTokens.push(token);
        lastToken = token;
      }
    }
  }
  return squashedTokens;
}
function nestTokens(tokens) {
  var nestedTokens = [];
  var collector = nestedTokens;
  var sections = [];
  var token, section;
  for (var i = 0, numTokens = tokens.length; i < numTokens; ++i) {
    token = tokens[i];
    switch (token[0]) {
      case "#":
      case "^":
        collector.push(token);
        sections.push(token);
        collector = token[4] = [];
        break;
      case "/":
        section = sections.pop();
        section[5] = token[2];
        collector = sections.length > 0 ? sections[sections.length - 1][4] : nestedTokens;
        break;
      default:
        collector.push(token);
    }
  }
  return nestedTokens;
}
function Scanner(string) {
  this.string = string;
  this.tail = string;
  this.pos = 0;
}
Scanner.prototype.eos = function eos() {
  return this.tail === "";
};
Scanner.prototype.scan = function scan(re) {
  var match = this.tail.match(re);
  if (!match || match.index !== 0)
    return "";
  var string = match[0];
  this.tail = this.tail.substring(string.length);
  this.pos += string.length;
  return string;
};
Scanner.prototype.scanUntil = function scanUntil(re) {
  var index = this.tail.search(re), match;
  switch (index) {
    case -1:
      match = this.tail;
      this.tail = "";
      break;
    case 0:
      match = "";
      break;
    default:
      match = this.tail.substring(0, index);
      this.tail = this.tail.substring(index);
  }
  this.pos += match.length;
  return match;
};
function Context(view, parentContext) {
  this.view = view;
  this.cache = { ".": this.view };
  this.parent = parentContext;
}
Context.prototype.push = function push(view) {
  return new Context(view, this);
};
Context.prototype.lookup = function lookup(name) {
  var cache = this.cache;
  var value;
  if (cache.hasOwnProperty(name)) {
    value = cache[name];
  } else {
    var context = this, intermediateValue, names, index, lookupHit = false;
    while (context) {
      if (name.indexOf(".") > 0) {
        intermediateValue = context.view;
        names = name.split(".");
        index = 0;
        while (intermediateValue != null && index < names.length) {
          if (index === names.length - 1)
            lookupHit = hasProperty(intermediateValue, names[index]) || primitiveHasOwnProperty(intermediateValue, names[index]);
          intermediateValue = intermediateValue[names[index++]];
        }
      } else {
        intermediateValue = context.view[name];
        lookupHit = hasProperty(context.view, name);
      }
      if (lookupHit) {
        value = intermediateValue;
        break;
      }
      context = context.parent;
    }
    cache[name] = value;
  }
  if (isFunction(value))
    value = value.call(this.view);
  return value;
};
function Writer() {
  this.templateCache = {
    _cache: {},
    set: function set(key, value) {
      this._cache[key] = value;
    },
    get: function get(key) {
      return this._cache[key];
    },
    clear: function clear() {
      this._cache = {};
    }
  };
}
Writer.prototype.clearCache = function clearCache() {
  if (typeof this.templateCache !== "undefined") {
    this.templateCache.clear();
  }
};
Writer.prototype.parse = function parse(template, tags) {
  var cache = this.templateCache;
  var cacheKey = template + ":" + (tags || mustache.tags).join(":");
  var isCacheEnabled = typeof cache !== "undefined";
  var tokens = isCacheEnabled ? cache.get(cacheKey) : void 0;
  if (tokens == void 0) {
    tokens = parseTemplate(template, tags);
    isCacheEnabled && cache.set(cacheKey, tokens);
  }
  return tokens;
};
Writer.prototype.render = function render(template, view, partials, config) {
  var tags = this.getConfigTags(config);
  var tokens = this.parse(template, tags);
  var context = view instanceof Context ? view : new Context(view, void 0);
  return this.renderTokens(tokens, context, partials, template, config);
};
Writer.prototype.renderTokens = function renderTokens(tokens, context, partials, originalTemplate, config) {
  var buffer = "";
  var token, symbol, value;
  for (var i = 0, numTokens = tokens.length; i < numTokens; ++i) {
    value = void 0;
    token = tokens[i];
    symbol = token[0];
    if (symbol === "#")
      value = this.renderSection(token, context, partials, originalTemplate, config);
    else if (symbol === "^")
      value = this.renderInverted(token, context, partials, originalTemplate, config);
    else if (symbol === ">")
      value = this.renderPartial(token, context, partials, config);
    else if (symbol === "&")
      value = this.unescapedValue(token, context);
    else if (symbol === "name")
      value = this.escapedValue(token, context, config);
    else if (symbol === "text")
      value = this.rawValue(token);
    if (value !== void 0)
      buffer += value;
  }
  return buffer;
};
Writer.prototype.renderSection = function renderSection(token, context, partials, originalTemplate, config) {
  var self = this;
  var buffer = "";
  var value = context.lookup(token[1]);
  function subRender(template) {
    return self.render(template, context, partials, config);
  }
  if (!value)
    return;
  if (isArray(value)) {
    for (var j = 0, valueLength = value.length; j < valueLength; ++j) {
      buffer += this.renderTokens(token[4], context.push(value[j]), partials, originalTemplate, config);
    }
  } else if (typeof value === "object" || typeof value === "string" || typeof value === "number") {
    buffer += this.renderTokens(token[4], context.push(value), partials, originalTemplate, config);
  } else if (isFunction(value)) {
    if (typeof originalTemplate !== "string")
      throw new Error("Cannot use higher-order sections without the original template");
    value = value.call(context.view, originalTemplate.slice(token[3], token[5]), subRender);
    if (value != null)
      buffer += value;
  } else {
    buffer += this.renderTokens(token[4], context, partials, originalTemplate, config);
  }
  return buffer;
};
Writer.prototype.renderInverted = function renderInverted(token, context, partials, originalTemplate, config) {
  var value = context.lookup(token[1]);
  if (!value || isArray(value) && value.length === 0)
    return this.renderTokens(token[4], context, partials, originalTemplate, config);
};
Writer.prototype.indentPartial = function indentPartial(partial, indentation, lineHasNonSpace) {
  var filteredIndentation = indentation.replace(/[^ \t]/g, "");
  var partialByNl = partial.split("\n");
  for (var i = 0; i < partialByNl.length; i++) {
    if (partialByNl[i].length && (i > 0 || !lineHasNonSpace)) {
      partialByNl[i] = filteredIndentation + partialByNl[i];
    }
  }
  return partialByNl.join("\n");
};
Writer.prototype.renderPartial = function renderPartial(token, context, partials, config) {
  if (!partials)
    return;
  var tags = this.getConfigTags(config);
  var value = isFunction(partials) ? partials(token[1]) : partials[token[1]];
  if (value != null) {
    var lineHasNonSpace = token[6];
    var tagIndex = token[5];
    var indentation = token[4];
    var indentedValue = value;
    if (tagIndex == 0 && indentation) {
      indentedValue = this.indentPartial(value, indentation, lineHasNonSpace);
    }
    var tokens = this.parse(indentedValue, tags);
    return this.renderTokens(tokens, context, partials, indentedValue, config);
  }
};
Writer.prototype.unescapedValue = function unescapedValue(token, context) {
  var value = context.lookup(token[1]);
  if (value != null)
    return value;
};
Writer.prototype.escapedValue = function escapedValue(token, context, config) {
  var escape = this.getConfigEscape(config) || mustache.escape;
  var value = context.lookup(token[1]);
  if (value != null)
    return typeof value === "number" && escape === mustache.escape ? String(value) : escape(value);
};
Writer.prototype.rawValue = function rawValue(token) {
  return token[1];
};
Writer.prototype.getConfigTags = function getConfigTags(config) {
  if (isArray(config)) {
    return config;
  } else if (config && typeof config === "object") {
    return config.tags;
  } else {
    return void 0;
  }
};
Writer.prototype.getConfigEscape = function getConfigEscape(config) {
  if (config && typeof config === "object" && !isArray(config)) {
    return config.escape;
  } else {
    return void 0;
  }
};
var mustache = {
  name: "mustache.js",
  version: "4.2.0",
  tags: ["{{", "}}"],
  clearCache: void 0,
  escape: void 0,
  parse: void 0,
  render: void 0,
  Scanner: void 0,
  Context: void 0,
  Writer: void 0,
  /**
   * Allows a user to override the default caching strategy, by providing an
   * object with set, get and clear methods. This can also be used to disable
   * the cache by setting it to the literal `undefined`.
   */
  set templateCache(cache) {
    defaultWriter.templateCache = cache;
  },
  /**
   * Gets the default or overridden caching object from the default writer.
   */
  get templateCache() {
    return defaultWriter.templateCache;
  }
};
var defaultWriter = new Writer();
mustache.clearCache = function clearCache2() {
  return defaultWriter.clearCache();
};
mustache.parse = function parse2(template, tags) {
  return defaultWriter.parse(template, tags);
};
mustache.render = function render2(template, view, partials, config) {
  if (typeof template !== "string") {
    throw new TypeError('Invalid template! Template should be a "string" but "' + typeStr(template) + '" was given as the first argument for mustache#render(template, view, partials)');
  }
  return defaultWriter.render(template, view, partials, config);
};
mustache.escape = escapeHtml;
mustache.Scanner = Scanner;
mustache.Context = Context;
mustache.Writer = Writer;
var mustache_default = mustache;

// src/shared/footer.mustache
var footer_default = '<footer class="page-footer">\n        <div class="footer-content">\n            <div class="container">\n                <div class="row">\n                    <div class="hidden-md-down col-lg-6">\n                    {{#shownav}}\n                        <h2 class="title">Mijn Nijmegen</h2>\n                        <div class="link-list-wrapper">\n                            <ul class="link-list">\n                                <li><a href="/persoonsgegevens">Persoonsgegevens</a></li>\n                                <li><a href="/uitkeringen">Uitkeringen</a></li>\n                            </ul>\n                        </div>\n                    {{/shownav}}\n                    </div>\n                    <div class="col-md-12 col-lg-6">\n                        <div class="row">\n                            <div class="hidden-md-down col-lg-5">\n                                <h2 class="title">Over deze site</h2>\n                                <ul class="link-list">\n                                    <li><a href="https://www.nijmegen.nl/toegankelijkheid/">Toegankelijkheid</a></li>\n                                    <li><a href="https://www.nijmegen.nl/diensten/privacy/">Privacyverklaring</a></li>\n                                    <li><a href="https://www.nijmegen.nl/cookies/">Cookies</a></li>\n                                    <li><a href="https://www.nijmegen.nl/proclaimer/">Proclaimer</a></li>\n                                    <li><a href="https://www.nijmegen.nl/sitemap/">Sitemap</a></li>\n                                </ul>\n                            </div>\n\n                            <div class="col-xs-12 col-md-6 col-lg-7">\n                                <h2 class="title">Contactgegevens</h2>\n                                <ul class="link-list contact-list">\n                                    <li>\n                                        <svg aria-hidden="true" class="mdi mdi-map-marker" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="24" height="24" viewBox="0 0 24 24"><path d="M12,11.5A2.5,2.5 0 0,1 9.5,9A2.5,2.5 0 0,1 12,6.5A2.5,2.5 0 0,1 14.5,9A2.5,2.5 0 0,1 12,11.5M12,2A7,7 0 0,0 5,9C5,14.25 12,22 12,22C12,22 19,14.25 19,9A7,7 0 0,0 12,2Z" /></svg>\n                                        <span class="sr-only">Bekijk onze locatie:</span>\n                                        <a href="https://www.google.nl/maps/place/Municipality+of+Nijmegen+(Stadswinkel)/@51.8453377,5.8650266,17z/data=!3m1!4b1!4m5!3m4!1s0x47c708453b48b901:0x73b58e3e154d4f0b!8m2!3d51.8453377!4d5.8672206">\n                                            Stadswinkel, Mari\xEBnburg 30\n                                        </a>\n                                    </li>\n                                    <li>\n                                        <svg class="mdi mdi-phone" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="24" height="24" viewBox="0 0 24 24"><path d="M6.62,10.79C8.06,13.62 10.38,15.94 13.21,17.38L15.41,15.18C15.69,14.9 16.08,14.82 16.43,14.93C17.55,15.3 18.75,15.5 20,15.5A1,1 0 0,1 21,16.5V20A1,1 0 0,1 20,21A17,17 0 0,1 3,4A1,1 0 0,1 4,3H7.5A1,1 0 0,1 8.5,4C8.5,5.25 8.7,6.45 9.07,7.57C9.18,7.92 9.1,8.31 8.82,8.59L6.62,10.79Z" /></svg>\n                                        <span class="sr-only">Bel ons:</span>\n                                        <a href="tel:14024">\n                                            14 024\n                                        </a>\n                                    </li>\n                                    <li>\n                                        <svg class="mdi mdi-email" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="24" height="24" viewBox="0 0 24 24"><path d="M20,8L12,13L4,8V6L12,11L20,6M20,4H4C2.89,4 2,4.89 2,6V18A2,2 0 0,0 4,20H20A2,2 0 0,0 22,18V6C22,4.89 21.1,4 20,4Z" /></svg>\n                                        <span class="sr-only">Mail ons:</span>\n                                        <a href="mailto:gemeente@nijmegen.nl">\n                                            gemeente@nijmegen.nl\n                                        </a>\n                                    </li>\n                                    <li>\n                                        <svg class="mdi mdi-facebook" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="24" height="24" viewBox="0 0 24 24"><path d="M12 2.04C6.5 2.04 2 6.53 2 12.06C2 17.06 5.66 21.21 10.44 21.96V14.96H7.9V12.06H10.44V9.85C10.44 7.34 11.93 5.96 14.22 5.96C15.31 5.96 16.45 6.15 16.45 6.15V8.62H15.19C13.95 8.62 13.56 9.39 13.56 10.18V12.06H16.34L15.89 14.96H13.56V21.96A10 10 0 0 0 22 12.06C22 6.53 17.5 2.04 12 2.04Z" /></svg>\n                                        <span class="sr-only">Vind ons op facebook:</span>\n                                        <a href="https://www.facebook.com/gemeentenijmegen">\n                                            Gemeente Nijmegen\n                                        </a>\n                                    </li>\n                                    <li>\n                                        <svg class="mdi mdi-twitter" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="24" height="24" viewBox="0 0 24 24"><path d="M22.46,6C21.69,6.35 20.86,6.58 20,6.69C20.88,6.16 21.56,5.32 21.88,4.31C21.05,4.81 20.13,5.16 19.16,5.36C18.37,4.5 17.26,4 16,4C13.65,4 11.73,5.92 11.73,8.29C11.73,8.63 11.77,8.96 11.84,9.27C8.28,9.09 5.11,7.38 3,4.79C2.63,5.42 2.42,6.16 2.42,6.94C2.42,8.43 3.17,9.75 4.33,10.5C3.62,10.5 2.96,10.3 2.38,10C2.38,10 2.38,10 2.38,10.03C2.38,12.11 3.86,13.85 5.82,14.24C5.46,14.34 5.08,14.39 4.69,14.39C4.42,14.39 4.15,14.36 3.89,14.31C4.43,16 6,17.26 7.89,17.29C6.43,18.45 4.58,19.13 2.56,19.13C2.22,19.13 1.88,19.11 1.54,19.07C3.44,20.29 5.7,21 8.12,21C16,21 20.33,14.46 20.33,8.79C20.33,8.6 20.33,8.42 20.32,8.23C21.16,7.63 21.88,6.87 22.46,6Z" /></svg>\n                                        <span class="sr-only">Volg ons op Twitter:</span>\n                                        <a href="https://twitter.com/gem_nijmegen">\n                                            @nijmegen\n                                        </a>\n                                    </li>\n                                </ul>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n            </div>\n        </div>\n        <div class="footer-copyright text-center">\n            <div class="container-fluid">\n                <img src="https://componenten.nijmegen.nl/v6.1.0/img/beeldmerkwit.svg" height="32" width="25"\n                    class="logo-labeled" alt="Logo Gemeente Nijmegen">\n                Gemeente Nijmegen\n            </div>\n        </div>\n    </footer>\n<!-- JQuery -->\n<script src="https://componenten.nijmegen.nl/v6.1.0/js/jquery.min.js"\n        integrity="sha512-pV9V1WiZq0QO8MrheyjVzI9bl2bR6bwaisa4k3aSS0dsGrDDJUl+tdRK9B9Ov47qI22Ho2kCJEuKPspUmUuHEQ=="\n        crossorigin="anonymous"></script>\n\n<!-- Bootstrap tooltips -->\n<script src="https://componenten.nijmegen.nl/v6.1.0/js/popper.min.js"\n        integrity="sha512-lWJ53t3FjWFXcLO7CWRG8vJABfUOuSuMZspt8g2nDyx/ft/B+Zb5jBSjED4Qyze4tp2DqVECV9fHo3j1bzpChw=="\n        crossorigin="anonymous"></script>\n\n<!-- Bootstrap core JavaScript -->\n<script src="https://componenten.nijmegen.nl/v6.1.0/js/bootstrap.min.js"\n        integrity="sha512-uIuDDliVdzuBgB2Ocut6cVdPSGZ6/my59sSOQlwnGi1qtuyyDVzj+8fr/HUr84mBlCs3zGBttci2JSALm8WMNg=="\n        crossorigin="anonymous"></script>\n\n<!-- MDB core JavaScript -->\n<script src="https://componenten.nijmegen.nl/v6.1.0/js/mdb.min.js"\n        integrity="sha512-HTOV7Smd7fT2VtLuwZP+BQ4riX9YHbVMGJ22X1wMcHSNx4JIkE/1KS6ux4S78pdf8orN82idrE36YHccsaHnTA=="\n        crossorigin="anonymous"></script>\n\n<!-- Nijmegen specific script -->\n<script src="https://componenten.nijmegen.nl/v6.1.0/nijmegen.js"\n        integrity="sha512-whPa7XgHBxAZ7Tz1v1cIytLsPEuxFbOnq+mCDHCyBhSk+2sOIouiU66p1moY2loVtQ8/oebuxmjDVflhuGKkmA=="\n        crossorigin="anonymous"></script>\n\n<!-- End: Core scripts -->\n<!-- Start: Additional component(s) script -->\n<!-- ... -->\n<!-- End: Additional component(s) script -->\n</body>\n</html>';

// src/shared/header.mustache
var header_default = '<!doctype html>\n<html lang="nl">\n<head>\n    <meta charset="utf-8">\n    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">\n    <meta http-equiv="x-ua-compatible" content="ie=edge">\n    <link rel="shortcut icon" href="/static/favicon.ico" type="image/x-icon">\n    \n    <!-- Preload fonts and external styles -->\n    <link rel="preload" \n          as="style"\n          href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:400,400i,600,700&display=swap">\n    <link rel="preconnect" \n          href="https://fonts.gstatic.com/" \n          crossorigin="anonymous">\n    \n    <link rel="preload" \n          as="font" \n          href="/static/fonts/oranda_bold_bt.04c85cb2.woff2" \n          type="font/woff2"\n          crossorigin="anonymous">\n    <link rel="preload" \n          as="font" \n          href="/static/fonts/oranda_bold_bt.8e266873.woff" \n          type="font/woff"\n          crossorigin="anonymous">\n    <link rel="preload" \n          as="font" \n          href="/static/fonts/oranda_bt.bde3d05f.woff2" \n          type="font/woff2"\n          crossorigin="anonymous">\n    <link rel="preload" \n          as="font" \n          href="/static/fonts/oranda_bt.05235f9a.woff" \n          type="font/woff"\n          crossorigin="anonymous">\n\n    <!-- Start: Core styling -->\n    <!-- Bootstrap core CSS -->\n    <link rel="stylesheet" \n          href="https://componenten.nijmegen.nl/v6.1.0/css/bootstrap.min.css"\n          integrity="sha512-bnCn1haQjQGPoq90nqpOWUiu9i60sex8WQI639yU2yElzx0pfG0hpaJrKuJTJD3bZ3lEUw+HRGEHrWm6TGsKSg=="\n          crossorigin="anonymous">\n    <!-- Material Design Bootstrap combined with custom Nijmegen styles -->\n    <link rel="stylesheet" \n          href="https://componenten.nijmegen.nl/v6.1.0/nijmegen.css"\n          integrity="sha512-blgrU3wXs0CIV9iars0ZyneHar1CFTEojkN3O9sGQrkvwT4PZX5wXD6dv7Gde+mUGPhgrr9ej92UCuzDkmk7cQ=="\n          crossorigin="anonymous">\n    <!-- End: Core styling -->\n    <link rel="stylesheet" href="/static/styles/screen.css">\n    <title>Mijn Nijmegen{{#title}} - {{.}} {{/title}}</title>\n    </head>\n<body>\n<nav class="navbar fixed-top navbar-expand-lg scrolling-navbar navbar-primary">\n    <ul class="navbar-skiplinks">\n        <li>\n            <a href="#section-1 ">Direct naar inhoud</a>\n        </li>\n    </ul>\n    <div class="container">\n        <button class="navbar-toggler collapsed" type="button" data-toggle="collapse" data-target="#navbar-collapse" aria-controls="navbar-collapse" aria-expanded="false">\n            <span class="sr-only">Menu</span>\n            <span class="navbar-toggler-icon" aria-hidden="true"></span>\n        </button>\n        <a class="navbar-brand" href="https://nijmegen.nl">\n            <span class="sr-only">Hoofdpagina</span>\n            <div class="navbar-brand-container">\n                <img src="https://componenten.nijmegen.nl/v6.0.0/img/beeldmerklabelwit.svg" class="logo-labeled" alt="Logo Nijmegen">\n                <img src="https://componenten.nijmegen.nl/v6.0.0/img/beeldmerkwit.svg" class="logo" aria-hidden="true" alt="Logo Nijmegen">\n            </div>\n        </a>\n        {{#shownav}}\n        <div class="collapse navbar-collapse" id="navbar-collapse">\n            <ul class="navbar-nav mr-auto nijmegen-smooth-scroll">\n                <li class="nav-item">\n                    <a href="/" class="nav-link">Overzicht</a>\n                </li>\n            {{#nav}}\n                <li class="nav-item">\n                    <a href="{{{url}}}" class="nav-link">{{title}}</a>\n                </li>\n            {{/nav}}\n            </ul>\n            <ul class="navbar-nav ml-auto">\n                <li class="nav-item">\n                    <a class="nav-link nav-no-link" href="/logout">{{volledigenaam}}\n                        <svg title="uitloggen" class="mdi mdi-logout"  xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="24" height="24" viewBox="0 0 24 24"><path d="M16,17V14H9V10H16V7L21,12L16,17M14,2A2,2 0 0,1 16,4V6H14V4H5V20H14V18H16V20A2,2 0 0,1 14,22H5A2,2 0 0,1 3,20V4A2,2 0 0,1 5,2H14Z" /></svg>\n                    </a>\n                </li>\n            </ul>\n        </div>\n        {{/shownav}}\n    </div>\n</nav>\n';

// src/shared/render.ts
async function render3(data, template, partials) {
  const fullPartials = {
    header: header_default,
    footer: footer_default,
    ...partials
  };
  data = {
    logos: false,
    ...data
  };
  return mustache_default.render(template, data, fullPartials);
}

// src/app/home/homeRequestHandler.ts
async function homeRequestHandler(cookies, dynamoDBClient2, props) {
  let session = new import_session.Session(cookies, dynamoDBClient2);
  await session.init();
  if (session.isLoggedIn() == true) {
    return handleLoggedinRequest(session, props);
  }
  return import_Response.Response.redirect("/login");
}
async function handleLoggedinRequest(session, props) {
  const zakenNav = {
    url: "/zaken",
    title: "Zaken",
    description: "Bekijk de status van uw zaken en aanvragen.",
    label: "Bekijk zaken",
    icon: mdi_file_multiple_exports.default
  };
  if (props?.showZaken) {
    nav.push(zakenNav);
  }
  const naam = session.getValue("username") ?? "Onbekende gebruiker";
  const data = {
    title: "overzicht",
    shownav: true,
    nav,
    volledigenaam: naam
  };
  const html = await render3(data, home_default);
  return import_Response.Response.html(html, 200, session.getCookie());
}

// src/app/home/home.lambda.ts
var dynamoDBClient = new import_client_dynamodb.DynamoDBClient({
  endpoint: 'http://dynamodb-local:8000',
  region: 'us-west-2',
});
function parseEvent(event) {
  console.log('event', JSON.stringify(event));
  return {
    cookies: event?.cookies?.join(";") ?? ""
  };
}
async function handler(event, _context) {
  try {
    const params = parseEvent(event);
    return await homeRequestHandler(params.cookies, dynamoDBClient, { showZaken: process.env.SHOWZAKEN == "True" });
  } catch (err) {
    console.error(err);
    return import_Response2.Response.error(500);
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  handler
});
/*! Bundled license information:

cookie/index.js:
  (*!
   * cookie
   * Copyright(c) 2012-2014 Roman Shtylman
   * Copyright(c) 2015 Douglas Christopher Wilson
   * MIT Licensed
   *)

mustache/mustache.mjs:
  (*!
   * mustache.js - Logic-less {{mustache}} templates with JavaScript
   * http://github.com/janl/mustache.js
   *)
*/
