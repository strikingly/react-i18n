import Jed from "jed";
import React from "react";
import { sprintf } from "./sprintf-js-mod";
import _ from "lodash";

const DOMAIN = "i18n";

let LOCALE_DEBUG = false;

export function setDebug() {
  LOCALE_DEBUG = true;
}

function createJed(jedOptions) {
  jedOptions = jedOptions || {
    domain: DOMAIN,
    missing_key_callback: function(key) {},
    locale_data: {
      [DOMAIN]: {
        "": {
          domain: DOMAIN,
          lang: "en",
          plural_forms: "nplurals=2; plural=(n != 1);"
        }
      }
    }
  };

  return new Jed(jedOptions);
}

function formatForReact(formatString, args) {
  let rv = [];
  let cursor = 0;

  // always re-parse, do not cache, because we change the match
  sprintf.parse(formatString).forEach((match, idx) => {
    if (_.isString(match)) {
      rv.push(match);
    } else {
      let arg = null;
      if (match[2]) {
        arg = args[0][match[2][0]];
      } else if (match[1]) {
        arg = args[parseInt(match[1], 10) - 1];
      } else {
        arg = args[cursor++];
      }

      // this points to a react element!
      if (React.isValidElement(arg)) {
        rv.push(React.cloneElement(arg, { key: idx }));
        // not a react element, fuck around with it so that sprintf.format
        // can format it for us.  We make sure match[2] is null so that we
        // do not go down the object path, and we set match[1] to the first
        // index and then pass an array with two items in.
      } else {
        match[2] = null;
        match[1] = 1;
        rv.push(
          <span key={idx++}>{sprintf.format([match], [null, arg])}</span>
        );
      }
    }
  });

  return rv;
}

function argsInvolveReact(args) {
  if (args.some(React.isValidElement)) {
    return true;
  }
  if (args.length == 1 && _.isObject(args[0])) {
    return Object.keys(args[0]).some(key => {
      return React.isValidElement(args[0][key]);
    });
  }
  return false;
}

function parseComponentTemplate(string) {
  let rv = {};

  function process(startPos, group, inGroup) {
    let regex = /\[(.*?)(:|\])|\]/g;
    let match;
    let buf = [];
    let satisfied = false;

    let pos = (regex.lastIndex = startPos);
    while ((match = regex.exec(string)) !== null) {
      // eslint-disable-line no-cond-assign
      let substr = string.substr(pos, match.index - pos);
      if (substr !== "") {
        buf.push(substr);
      }

      if (match[0] == "]") {
        if (inGroup) {
          satisfied = true;
          break;
        } else {
          pos = regex.lastIndex;
          continue;
        }
      }

      if (match[2] == "]") {
        pos = regex.lastIndex;
      } else {
        pos = regex.lastIndex = process(regex.lastIndex, match[1], true);
      }
      buf.push({ group: match[1] });
    }

    let endPos = regex.lastIndex;
    if (!satisfied) {
      let rest = string.substr(pos);
      if (rest) {
        buf.push(rest);
      }
      endPos = string.length;
    }

    rv[group] = buf;
    return endPos;
  }

  process(0, "root", false);

  return rv;
}

function renderComponentTemplate(template, components) {
  let idx = 0;

  function renderGroup(group) {
    let children = [];

    (template[group] || []).forEach(item => {
      if (_.isString(item)) {
        children.push(<span key={idx++}>{item}</span>);
      } else {
        children.push(renderGroup(item.group));
      }
    });

    // in case we cannot find our component, we call back to an empty
    // span so that stuff shows up at least.
    let reference = components[group] || <span key={idx++} />;
    if (!React.isValidElement(reference)) {
      reference = <span key={idx++}>{reference}</span>;
    }

    if (children.length > 0) {
      return React.cloneElement(reference, { key: idx++ }, children);
    } else {
      return React.cloneElement(reference, { key: idx++ });
    }
  }

  return renderGroup("root");
}

function mark(rv) {
  if (!LOCALE_DEBUG) {
    return rv;
  }

  // 3 cases
  if (React.isValidElement(rv)) {
    // Returning a component is allowed here
    let proxy = {
      $$typeof: Symbol.for("react.element"),
      type: "span",
      key: null,
      ref: null,
      props: {
        className: "translation-wrapper",
        children: _.isArray(rv) ? rv : [rv]
      },
      _owner: null,
      _store: {}
    };

    proxy.toString = function() {
      return "🇦🇹 " + rv + " 🇦🇹";
    };

    return proxy;
  } else if (_.isArray(rv)) {
    // Need to be wrapped by another component
    return [...rv, " 🇦🇹"];
  } else {
    // Returning a raw string (in props/state/...)
    return rv + " 🇦🇹";
  }
}

function format(formatString, args) {
  if (argsInvolveReact(args)) {
    return formatForReact(formatString, args);
  } else {
    return sprintf(formatString, ...args);
  }
}


export class I18n {
  constructor(options = {}) {
    this.init(options)

    this.t = this.gettext
    this.tn = this.ngettext
    this.tct = this.gettextComponentTemplate
  }

  init(options = {}) {
    if (options.noPo) {
      this._i18n = false;
    } else {
      let jedInstance = options;
      this._i18n = createJed(jedInstance);
    }
  }

  gettext(string, ...args) {
    let rv = this._getTranslate(string);
    if (args.length > 0) {
      rv = format(rv, args);
    }
    return mark(rv);
  }

  ngettext(singular, plural, ...args) {
    return mark(format(this._i18n.ngettext(singular, plural, args[0] || 0), args));
  }

  /* special form of gettext where you can render nested react
  components in template strings.  Example:

  gettextComponentTemplate('Welcome. Click [link:here]', {
  root: <p/>,
  link: <a href="#" />
  });

  the root string is always called "root", the rest is prefixed
  with the name in the brackets */
  gettextComponentTemplate(template, components) {
    let tmpl = parseComponentTemplate(this._getTranslate(template));
    return mark(renderComponentTemplate(tmpl, components));
  }


  _getTranslate(stringKey) {
    if (this._i18n) {
      return this._i18n.gettext(stringKey);
    }
  
    return stringKey;
  }
}

