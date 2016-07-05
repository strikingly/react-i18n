'use strict';Object.defineProperty(exports,"__esModule",{value:true});exports.tct=exports.tn=exports.t=undefined;exports.setLocale=setLocale;exports.setDebug=setDebug;exports.gettext=gettext;exports.ngettext=ngettext;exports.gettextComponentTemplate=gettextComponentTemplate;var _jed=require('jed');var _jed2=_interopRequireDefault(_jed);var _react=require('react');var _react2=_interopRequireDefault(_react);var _sprintfJsMod=require('./sprintf-js-mod');var _lodash=require('lodash');var _lodash2=_interopRequireDefault(_lodash);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function _toConsumableArray(arr){if(Array.isArray(arr)){for(var i=0,arr2=Array(arr.length);i<arr.length;i++){arr2[i]=arr[i];}return arr2;}else{return Array.from(arr);}}function _defineProperty(obj,key,value){if(key in obj){Object.defineProperty(obj,key,{value:value,enumerable:true,configurable:true,writable:true});}else{obj[key]=value;}return obj;}var DOMAIN='i18n';var LOCALE_DEBUG=false;var i18n=null;var _cache={};function setLocale(jedInstance){i18n=jedInstance;}function setDebug(){LOCALE_DEBUG=true;}setLocale(new _jed2.default({'domain':DOMAIN,'missing_key_callback':function missing_key_callback(key){},'locale_data':_defineProperty({},DOMAIN,{'':{'domain':DOMAIN,'lang':'en','plural_forms':'nplurals=2; plural=(n != 1);'}})}));function formatForReact(formatString,args){var rv=[];var cursor=0;// always re-parse, do not cache, because we change the match
_sprintfJsMod.sprintf.parse(formatString).forEach(function(match,idx){if(_lodash2.default.isString(match)){rv.push(match);}else{var arg=null;if(match[2]){arg=args[0][match[2][0]];}else if(match[1]){arg=args[parseInt(match[1],10)-1];}else{arg=args[cursor++];}// this points to a react element!
if(_react2.default.isValidElement(arg)){rv.push(_react2.default.cloneElement(arg,{key:idx}));// not a react element, fuck around with it so that sprintf.format
// can format it for us.  We make sure match[2] is null so that we
// do not go down the object path, and we set match[1] to the first
// index and then pass an array with two items in.
}else{match[2]=null;match[1]=1;rv.push(_react2.default.createElement('span',{key:idx++},_sprintfJsMod.sprintf.format([match],[null,arg])));}}});return rv;}function argsInvolveReact(args){if(args.some(_react2.default.isValidElement)){return true;}if(args.length==1&&_lodash2.default.isObject(args[0])){return Object.keys(args[0]).some(function(key){return _react2.default.isValidElement(args[0][key]);});}return false;}function parseComponentTemplate(string){var rv={};function process(startPos,group,inGroup){var regex=/\[(.*?)(:|\])|\]/g;var match=void 0;var buf=[];var satisfied=false;var pos=regex.lastIndex=startPos;while((match=regex.exec(string))!==null){// eslint-disable-line no-cond-assign
var substr=string.substr(pos,match.index-pos);if(substr!==''){buf.push(substr);}if(match[0]==']'){if(inGroup){satisfied=true;break;}else{pos=regex.lastIndex;continue;}}if(match[2]==']'){pos=regex.lastIndex;}else{pos=regex.lastIndex=process(regex.lastIndex,match[1],true);}buf.push({group:match[1]});}var endPos=regex.lastIndex;if(!satisfied){var rest=string.substr(pos);if(rest){buf.push(rest);}endPos=string.length;}rv[group]=buf;return endPos;}process(0,'root',false);return rv;}function renderComponentTemplate(template,components){var idx=0;function renderGroup(group){var children=[];(template[group]||[]).forEach(function(item){if(_lodash2.default.isString(item)){children.push(_react2.default.createElement('span',{key:idx++},item));}else{children.push(renderGroup(item.group));}});// in case we cannot find our component, we call back to an empty
// span so that stuff shows up at least.
var reference=components[group]||_react2.default.createElement('span',{key:idx++});if(!_react2.default.isValidElement(reference)){reference=_react2.default.createElement('span',{key:idx++},reference);}if(children.length>0){return _react2.default.cloneElement(reference,{key:idx++},children);}else{return _react2.default.cloneElement(reference,{key:idx++});}}return renderGroup('root');}function mark(rv){if(!LOCALE_DEBUG){return rv;}var proxy={$$typeof:Symbol.for('react.element'),type:'span',key:null,ref:null,props:{className:'translation-wrapper',children:_lodash2.default.isArray(rv)?rv:[rv]},_owner:null,_store:{}};proxy.toString=function(){return'🇦🇹'+rv+'🇦🇹';};return proxy;}function cacheGettext(string){return _cache[string]||(_cache[string]=i18n.gettext(string));}function format(formatString,args){if(argsInvolveReact(args)){return formatForReact(formatString,args);}else{return _sprintfJsMod.sprintf.apply(undefined,[formatString].concat(_toConsumableArray(args)));}}function gettext(string){var rv=cacheGettext(string);for(var _len=arguments.length,args=Array(_len>1?_len-1:0),_key=1;_key<_len;_key++){args[_key-1]=arguments[_key];}if(args.length>0){rv=format(rv,args);}return mark(rv);}function ngettext(singular,plural){for(var _len2=arguments.length,args=Array(_len2>2?_len2-2:0),_key2=2;_key2<_len2;_key2++){args[_key2-2]=arguments[_key2];}return mark(format(i18n.ngettext(singular,plural,args[0]||0),args));}/* special form of gettext where you can render nested react
 components in template strings.  Example:

 gettextComponentTemplate('Welcome. Click [link:here]', {
 root: <p/>,
 link: <a href="#" />
 });

 the root string is always called "root", the rest is prefixed
 with the name in the brackets */function gettextComponentTemplate(template,components){var tmpl=parseComponentTemplate(i18n.gettext(template));return mark(renderComponentTemplate(tmpl,components));}var t=exports.t=gettext;var tn=exports.tn=ngettext;var tct=exports.tct=gettextComponentTemplate;