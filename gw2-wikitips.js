/**
 * @license almond 0.3.1 Copyright (c) 2011-2014, The Dojo Foundation All Rights Reserved.
 * Available via the MIT or new BSD license.
 * see: http://github.com/jrburke/almond for details
 */

/**
 * @license RequireJS text 2.0.12 Copyright (c) 2010-2014, The Dojo Foundation All Rights Reserved.
 * Available via the MIT or new BSD license.
 * see: http://github.com/requirejs/text for details
 */

(function(){var e,t,n;(function(r){function v(e,t){return h.call(e,t)}function m(e,t){var n,r,i,s,o,u,a,f,c,h,p,v=t&&t.split("/"),m=l.map,g=m&&m["*"]||{};if(e&&e.charAt(0)===".")if(t){e=e.split("/"),o=e.length-1,l.nodeIdCompat&&d.test(e[o])&&(e[o]=e[o].replace(d,"")),e=v.slice(0,v.length-1).concat(e);for(c=0;c<e.length;c+=1){p=e[c];if(p===".")e.splice(c,1),c-=1;else if(p===".."){if(c===1&&(e[2]===".."||e[0]===".."))break;c>0&&(e.splice(c-1,2),c-=2)}}e=e.join("/")}else e.indexOf("./")===0&&(e=e.substring(2));if((v||g)&&m){n=e.split("/");for(c=n.length;c>0;c-=1){r=n.slice(0,c).join("/");if(v)for(h=v.length;h>0;h-=1){i=m[v.slice(0,h).join("/")];if(i){i=i[r];if(i){s=i,u=c;break}}}if(s)break;!a&&g&&g[r]&&(a=g[r],f=c)}!s&&a&&(s=a,u=f),s&&(n.splice(0,u,s),e=n.join("/"))}return e}function g(e,t){return function(){var n=p.call(arguments,0);return typeof n[0]!="string"&&n.length===1&&n.push(null),s.apply(r,n.concat([e,t]))}}function y(e){return function(t){return m(t,e)}}function b(e){return function(t){a[e]=t}}function w(e){if(v(f,e)){var t=f[e];delete f[e],c[e]=!0,i.apply(r,t)}if(!v(a,e)&&!v(c,e))throw new Error("No "+e);return a[e]}function E(e){var t,n=e?e.indexOf("!"):-1;return n>-1&&(t=e.substring(0,n),e=e.substring(n+1,e.length)),[t,e]}function S(e){return function(){return l&&l.config&&l.config[e]||{}}}var i,s,o,u,a={},f={},l={},c={},h=Object.prototype.hasOwnProperty,p=[].slice,d=/\.js$/;o=function(e,t){var n,r=E(e),i=r[0];return e=r[1],i&&(i=m(i,t),n=w(i)),i?n&&n.normalize?e=n.normalize(e,y(t)):e=m(e,t):(e=m(e,t),r=E(e),i=r[0],e=r[1],i&&(n=w(i))),{f:i?i+"!"+e:e,n:e,pr:i,p:n}},u={require:function(e){return g(e)},exports:function(e){var t=a[e];return typeof t!="undefined"?t:a[e]={}},module:function(e){return{id:e,uri:"",exports:a[e],config:S(e)}}},i=function(e,t,n,i){var s,l,h,p,d,m=[],y=typeof n,E;i=i||e;if(y==="undefined"||y==="function"){t=!t.length&&n.length?["require","exports","module"]:t;for(d=0;d<t.length;d+=1){p=o(t[d],i),l=p.f;if(l==="require")m[d]=u.require(e);else if(l==="exports")m[d]=u.exports(e),E=!0;else if(l==="module")s=m[d]=u.module(e);else if(v(a,l)||v(f,l)||v(c,l))m[d]=w(l);else{if(!p.p)throw new Error(e+" missing "+l);p.p.load(p.n,g(i,!0),b(l),{}),m[d]=a[l]}}h=n?n.apply(a[e],m):undefined;if(e)if(s&&s.exports!==r&&s.exports!==a[e])a[e]=s.exports;else if(h!==r||!E)a[e]=h}else e&&(a[e]=n)},e=t=s=function(e,t,n,a,f){if(typeof e=="string")return u[e]?u[e](t):w(o(e,t).f);if(!e.splice){l=e,l.deps&&s(l.deps,l.callback);if(!t)return;t.splice?(e=t,t=n,n=null):e=r}return t=t||function(){},typeof n=="function"&&(n=a,a=f),a?i(r,e,t,n):setTimeout(function(){i(r,e,t,n)},4),s},s.config=function(e){return s(e)},e._defined=a,n=function(e,t,n){if(typeof e!="string")throw new Error("See almond README: incorrect module build, no module name");t.splice||(n=t,t=[]),!v(a,e)&&!v(f,e)&&(f[e]=[e,t,n])},n.amd={jQuery:!0}})(),n("almond",function(){}),n("jquery",[],function(){return jQuery}),n("app/base_parser",[],function(){function e(e,t){this.page=this.page_from_response(e),this.description_re=new RegExp("(A*\\s*[\\[\\{']+"+this.title()+"[\\]\\}']+[^\\n]+)\\n","i")}return e.prototype.content=function(){var e=this.revision()["*"];return e.length<1?(this.warn('Expected page.revisions[0]["*"] not to be empty.'),null):e},e.prototype.description=function(){var e=this.description_re.exec(this.content());return e&&e[1]?this.strip(e[1]):null},e.prototype.page_from_response=function(e){var t=Object.keys(e.query.pages);if(t.length!=1||t[0]=="-1"){this.warn(e.query,"Expected response.query.pages to return exactly 1 page id.");return}return e.query.pages[t[0]]},e.prototype.revision=function(){var e=this.page.revisions;return e.length!=1?(this.warn("Expected page.revisions to return exactly 1 revision."),null):e[0]},e.prototype.strip=function(e){var t=/\[\[(?:[^|\]]+\|)?([^\]]+)\]\]/g,n=/\{\{(?:[^|\}]+\|)?([^\}]+)\}\}/g,r=/'''(?:[^|']+\|)?([^\']+)'''/g;return e.replace(t,"$1").replace(n,"$1").replace(r,"$1")},e.prototype.title=function(){var e=this.page.title;return e.length<1?(this.warn(this.page,"Expected page.title not to be empty."),null):e},e.prototype.warn=function(e){console.log("---------------------"),console.log(this.page),console.warn(e),console.log("---------------------")},e}),n("app/wiki_page",["./base_parser"],function(e){function t(t){this.parsers=[e],t&&this.parsers.unshift(t)}return t.prototype.get=function(e,t,n){var r=this;t=unescape(t);var i=t.endsWith('!"')?t.replace(/_/g," "):t;$.ajax({url:e,cache:!0,dataType:"jsonp",data:{format:"json",action:"query",titles:i,prop:"revisions",rvprop:"content"},success:function(e){r.parse(e),n&&typeof n["success"]=="function"&&n.success(r)},error:function(e,t,r){console.log("WikiPage request error: "+i),n&&typeof n["error"]=="function"&&n.error(e,t,r)}})},t.prototype.parse=function(e){this.parsers.length<1&&console.warn("WikiPage has no parsers defined");var t=0,n,r;while(!n&&t<this.parsers.length){var i=new this.parsers[t](e,this);n=i.description(),r=i.title(),t++}n?(this.title=r,this.description=n):(console.warn("Unable to parse description from response"),console.log(e))},t}),n("text",["module"],function(e){"use strict";var n,r,i,s,o,u=["Msxml2.XMLHTTP","Microsoft.XMLHTTP","Msxml2.XMLHTTP.4.0"],a=/^\s*<\?xml(\s)+version=[\'\"](\d)*.(\d)*[\'\"](\s)*\?>/im,f=/<body[^>]*>\s*([\s\S]+)\s*<\/body>/im,l=typeof location!="undefined"&&location.href,c=l&&location.protocol&&location.protocol.replace(/\:/,""),h=l&&location.hostname,p=l&&(location.port||undefined),d={},v=e.config&&e.config()||{};n={version:"2.0.12",strip:function(e){if(e){e=e.replace(a,"");var t=e.match(f);t&&(e=t[1])}else e="";return e},jsEscape:function(e){return e.replace(/(['\\])/g,"\\$1").replace(/[\f]/g,"\\f").replace(/[\b]/g,"\\b").replace(/[\n]/g,"\\n").replace(/[\t]/g,"\\t").replace(/[\r]/g,"\\r").replace(/[\u2028]/g,"\\u2028").replace(/[\u2029]/g,"\\u2029")},createXhr:v.createXhr||function(){var e,t,n;if(typeof XMLHttpRequest!="undefined")return new XMLHttpRequest;if(typeof ActiveXObject!="undefined")for(t=0;t<3;t+=1){n=u[t];try{e=new ActiveXObject(n)}catch(r){}if(e){u=[n];break}}return e},parseName:function(e){var t,n,r,i=!1,s=e.indexOf("."),o=e.indexOf("./")===0||e.indexOf("../")===0;return s!==-1&&(!o||s>1)?(t=e.substring(0,s),n=e.substring(s+1,e.length)):t=e,r=n||t,s=r.indexOf("!"),s!==-1&&(i=r.substring(s+1)==="strip",r=r.substring(0,s),n?n=r:t=r),{moduleName:t,ext:n,strip:i}},xdRegExp:/^((\w+)\:)?\/\/([^\/\\]+)/,useXhr:function(e,t,r,i){var s,o,u,a=n.xdRegExp.exec(e);return a?(s=a[2],o=a[3],o=o.split(":"),u=o[1],o=o[0],(!s||s===t)&&(!o||o.toLowerCase()===r.toLowerCase())&&(!u&&!o||u===i)):!0},finishLoad:function(e,t,r,i){r=t?n.strip(r):r,v.isBuild&&(d[e]=r),i(r)},load:function(e,t,r,i){if(i&&i.isBuild&&!i.inlineText){r();return}v.isBuild=i&&i.isBuild;var s=n.parseName(e),o=s.moduleName+(s.ext?"."+s.ext:""),u=t.toUrl(o),a=v.useXhr||n.useXhr;if(u.indexOf("empty:")===0){r();return}!l||a(u,c,h,p)?n.get(u,function(t){n.finishLoad(e,s.strip,t,r)},function(e){r.error&&r.error(e)}):t([o],function(e){n.finishLoad(s.moduleName+"."+s.ext,s.strip,e,r)})},write:function(e,t,r,i){if(d.hasOwnProperty(t)){var s=n.jsEscape(d[t]);r.asModule(e+"!"+t,"define(function () { return '"+s+"';});\n")}},writeFile:function(e,t,r,i,s){var o=n.parseName(t),u=o.ext?"."+o.ext:"",a=o.moduleName+u,f=r.toUrl(o.moduleName+u)+".js";n.load(a,r,function(t){var r=function(e){return i(f,e)};r.asModule=function(e,t){return i.asModule(e,f,t)},n.write(e,a,r,s)},s)}};if(v.env==="node"||!v.env&&typeof process!="undefined"&&process.versions&&!!process.versions.node&&!process.versions["node-webkit"])r=t.nodeRequire("fs"),n.get=function(e,t,n){try{var i=r.readFileSync(e,"utf8");i.indexOf("﻿")===0&&(i=i.substring(1)),t(i)}catch(s){n&&n(s)}};else if(v.env==="xhr"||!v.env&&n.createXhr())n.get=function(e,t,r,i){var s=n.createXhr(),o;s.open("GET",e,!0);if(i)for(o in i)i.hasOwnProperty(o)&&s.setRequestHeader(o.toLowerCase(),i[o]);v.onXhr&&v.onXhr(s,e),s.onreadystatechange=function(n){var i,o;s.readyState===4&&(i=s.status||0,i>399&&i<600?(o=new Error(e+" HTTP status: "+i),o.xhr=s,r&&r(o)):t(s.responseText),v.onXhrComplete&&v.onXhrComplete(s,e))},s.send(null)};else if(v.env==="rhino"||!v.env&&typeof Packages!="undefined"&&typeof java!="undefined")n.get=function(e,t){var n,r,i="utf-8",s=new java.io.File(e),o=java.lang.System.getProperty("line.separator"),u=new java.io.BufferedReader(new java.io.InputStreamReader(new java.io.FileInputStream(s),i)),a="";try{n=new java.lang.StringBuffer,r=u.readLine(),r&&r.length()&&r.charAt(0)===65279&&(r=r.substring(1)),r!==null&&n.append(r);while((r=u.readLine())!==null)n.append(o),n.append(r);a=String(n.toString())}finally{u.close()}t(a)};else if(v.env==="xpconnect"||!v.env&&typeof Components!="undefined"&&Components.classes&&Components.interfaces)i=Components.classes,s=Components.interfaces,Components.utils["import"]("resource://gre/modules/FileUtils.jsm"),o="@mozilla.org/windows-registry-key;1"in i,n.get=function(e,t){var n,r,u,a={};o&&(e=e.replace(/\//g,"\\")),u=new FileUtils.File(e);try{n=i["@mozilla.org/network/file-input-stream;1"].createInstance(s.nsIFileInputStream),n.init(u,1,0,!1),r=i["@mozilla.org/intl/converter-input-stream;1"].createInstance(s.nsIConverterInputStream),r.init(n,"utf-8",n.available(),s.nsIConverterInputStream.DEFAULT_REPLACEMENT_CHARACTER),r.readString(n.available(),a),r.close(),n.close(),t(a.value)}catch(f){throw new Error((u&&u.path||"")+": "+f)}};return n}),n("text!app/gw2_skills.json",[],function(){return'{\n	"Charge":{\n		"slug":"Charge_(warrior_skill)",\n		"title":"Cures chilled, crippled, and immobilized."\n	},\n	"Combo":{\n		"unit":"",\n		"src":"1/1a/Combo.png"\n	},\n	"Damage":{\n		"unit":"",\n		"src":"6/6a/Damage.png"\n	},\n	"Duration":{\n		"src":"8/8b/Duration.png"\n	},\n	"Healing":{\n		"unit":"",\n		"src":"f/f3/Healing.png"\n	},\n	"Lifeforce":{\n		"title":"Life Force",\n		"unit":"%"\n	},\n	"Misc":{\n		"src":"2/28/Miscellaneous_effect.png"\n	},\n	"Power":{\n		"unit":"",\n		"src":"2/23/Power.png"\n	},\n	"Radius":{\n		"unit":"",\n		"src":"a/a4/Radius.png"\n	},\n	"Range":{\n		"unit":"",\n		"src":"c/c5/Range.png"\n	},\n	"Targets":{\n		"unit":"",\n		"title":"Number of Targets"\n	},\n	"Toughness":{\n		"unit":"",\n		"src":"1/12/Toughness.png"\n	},\n	"Trait IV":{\n		"src":"thumb/a/a8/Trait_IV.png/16px-Trait_IV.png",\n		"src15":"thumb/a/a8/Trait_IV.png/24px-Trait_IV.png",\n		"src20":"thumb/a/a8/Trait_IV.png/32px-Trait_IV.png"\n	},\n	"Trait VIII":{\n		"src":"thumb/9/91/Trait_VIII.png/16px-Trait_VIII.png",\n		"src15":"thumb/9/91/Trait_VIII.png/24px-Trait_VIII.png",\n		"src20":"thumb/9/91/Trait_VIII.png/32px-Trait_VIII.png"\n	},\n	"Unblockable":{\n	},\n	"Virtue of Resolve":\n	{\n		"src":"thumb/b/b2/Virtue_of_Resolve.png/18px-Virtue_of_Resolve.png",\n		"src15":"thumb/b/b2/Virtue_of_Resolve.png/27px-Virtue_of_Resolve.png",\n		"src20":"thumb/b/b2/Virtue_of_Resolve.png/36px-Virtue_of_Resolve.png"\n	},\n	"Aegis":{\n		"src":"thumb/6/6c/Aegis_40px.png/18px-Aegis_40px.png",\n		"src_15":"thumb/6/6c/Aegis_40px.png/27px-Aegis_40px.png",\n		"src_20":"thumb/6/6c/Aegis_40px.png/36px-Aegis_40px.png"\n	},\n	"Breakstun":{\n		"title":"Breaks Stun",\n		"unit":"",\n		"src":"thumb/c/cb/Breaks_stun_40px.png/18px-Breaks_stun_40px.png",\n		"src_15":"thumb/c/cb/Breaks_stun_40px.png/27px-Breaks_stun_40px.png",\n		"src_20":"thumb/c/cb/Breaks_stun_40px.png/36px-Breaks_stun_40px.png"\n	},\n	"Fury":{\n		"src":"thumb/e/e6/Fury_40px.png/18px-Fury_40px.png",\n		"src_15":"thumb/e/e6/Fury_40px.png/27px-Fury_40px.png",\n		"src_20":"thumb/e/e6/Fury_40px.png/36px-Fury_40px.png"\n	},\n	"Might":{\n		"src":"thumb/1/10/Might_40px.png/18px-Might_40px.png",\n		"src_15":"thumb/1/10/Might_40px.png/27px-Might_40px.png",\n		"src_20":"thumb/1/10/Might_40px.png/36px-Might_40px.png"\n	},\n	"Protection":{\n		"src":"thumb/1/11/Protection_40px.png/18px-Protection_40px.png",\n		"src_15":"thumb/1/11/Protection_40px.png/27px-Protection_40px.png",\n		"src_20":"thumb/1/11/Protection_40px.png/36px-Protection_40px.png"\n	},\n	"Purging Flames":{\n		"src":"thumb/2/28/Purging_Flames.png/18px-Purging_Flames.png",\n		"src15":"thumb/2/28/Purging_Flames.png/27px-Purging_Flames.png",\n		"src20":"thumb/2/28/Purging_Flames.png/36px-Purging_Flames.png"\n	},\n	"Regeneration":{\n		"src":"thumb/9/9a/Regeneration_40px.png/18px-Regeneration_40px.png",\n		"src_15":"thumb/9/9a/Regeneration_40px.png/27px-Regeneration_40px.png",\n		"src_20":"thumb/9/9a/Regeneration_40px.png/36px-Regeneration_40px.png"\n	},\n	"Retaliation":{\n		"src":"thumb/1/1c/Retaliation_40px.png/18px-Retaliation_40px.png",\n		"src_15":"thumb/1/1c/Retaliation_40px.png/27px-Retaliation_40px.png",\n		"src_20":"thumb/1/1c/Retaliation_40px.png/36px-Retaliation_40px.png"\n	},\n	"Stability":{\n		"src":"thumb/c/c2/Stability_40px.png/18px-Stability_40px.png",\n		"src_15":"thumb/c/c2/Stability_40px.png/27px-Stability_40px.png",\n		"src_20":"thumb/c/c2/Stability_40px.png/36px-Stability_40px.png"\n	},\n	"Swiftness":{\n		"src":"thumb/1/19/Swiftness_40px.png/18px-Swiftness_40px.png",\n		"src_15":"thumb/1/19/Swiftness_40px.png/27px-Swiftness_40px.png",\n		"src_20":"thumb/1/19/Swiftness_40px.png/36px-Swiftness_40px.png"\n	},\n	"Vigor":{\n		"src":"thumb/f/fa/Vigor_40px.png/18px-Vigor_40px.png",\n		"src_15":"thumb/f/fa/Vigor_40px.png/27px-Vigor_40px.png",\n		"src_20":"thumb/f/fa/Vigor_40px.png/36px-Vigor_40px.png"\n	},\n	"Bleeding":{\n		"src":"thumb/4/4f/Bleeding_40px.png/18px-Bleeding_40px.png",\n		"src_15":"thumb/4/4f/Bleeding_40px.png/27px-Bleeding_40px.png",\n		"src_20":"thumb/4/4f/Bleeding_40px.png/36px-Bleeding_40px.png"\n	},\n	"Blind":{\n		"src":"thumb/7/76/Blind_40px.png/18px-Blind_40px.png",\n		"src_15":"thumb/7/76/Blind_40px.png/27px-Blind_40px.png",\n		"src_20":"thumb/7/76/Blind_40px.png/36px-Blind_40px.png"\n	},\n	"Burning":{\n		"src":"thumb/8/8f/Burning_40px.png/18px-Burning_40px.png",\n		"src_15":"thumb/8/8f/Burning_40px.png/27px-Burning_40px.png",\n		"src_20":"thumb/8/8f/Burning_40px.png/36px-Burning_40px.png"\n	},\n	"Chilled":{\n		"src":"thumb/b/b9/Chilled_40px.png/18px-Chilled_40px.png",\n		"src_15":"thumb/b/b9/Chilled_40px.png/27px-Chilled_40px.png",\n		"src_20":"thumb/b/b9/Chilled_40px.png/36px-Chilled_40px.png"\n	},\n	"Confusion":{\n		"src":"thumb/1/1d/Confusion_40px.png/18px-Confusion_40px.png",\n		"src_15":"thumb/1/1d/Confusion_40px.png/27px-Confusion_40px.png",\n		"src_20":"thumb/1/1d/Confusion_40px.png/36px-Confusion_40px.png"\n	},\n	"Crippled":{\n		"src":"thumb/c/c8/Crippled_40px.png/18px-Crippled_40px.png",\n		"src_15":"thumb/c/c8/Crippled_40px.png/27px-Crippled_40px.png",\n		"src_20":"thumb/c/c8/Crippled_40px.png/36px-Crippled_40px.png"\n	},\n	"Fear":{\n		"src":"thumb/e/ec/Fear_40px.png/18px-Fear_40px.png",\n		"src_15":"thumb/e/ec/Fear_40px.png/27px-Fear_40px.png",\n		"src_20":"thumb/e/ec/Fear_40px.png/36px-Fear_40px.png"\n	},\n	"Immobilized":{\n		"src":"thumb/6/6a/Immobilized_40px.png/18px-Immobilized_40px.png",\n		"src_15":"thumb/6/6a/Immobilized_40px.png/27px-Immobilized_40px.png",\n		"src_20":"thumb/6/6a/Immobilized_40px.png/36px-Immobilized_40px.png"\n	},\n	"Poison":{\n		"src":"thumb/b/bc/Poison_40px.png/18px-Poison_40px.png",\n		"src_15":"thumb/b/bc/Poison_40px.png/27px-Poison_40px.png",\n		"src_20":"thumb/b/bc/Poison_40px.png/36px-Poison_40px.png"\n	},\n	"Torment":{\n		"src":"thumb/b/bb/Torment_40px.png/18px-Torment_40px.png",\n		"src_15":"thumb/b/bb/Torment_40px.png/27px-Torment_40px.png",\n		"src_20":"thumb/b/bb/Torment_40px.png/36px-Torment_40px.png"\n	},\n	"Vulnerability":{\n		"src":"thumb/a/a3/Vulnerability_40px.png/18px-Vulnerability_40px.png",\n		"src_15":"thumb/a/a3/Vulnerability_40px.png/27px-Vulnerability_40px.png",\n		"src_20":"thumb/a/a3/Vulnerability_40px.png/36px-Vulnerability_40px.png"\n	},\n	"Weakness":{\n		"src":"thumb/1/14/Weakness_40px.png/18px-Weakness_40px.png",\n		"src_15":"thumb/1/14/Weakness_40px.png/27px-Weakness_40px.png",\n		"src_20":"thumb/1/14/Weakness_40px.png/36px-Weakness_40px.png"\n	},\n	"Daze":{\n		"src":"thumb/4/43/Daze_40px.png/18px-Daze_40px.png",\n		"src_15":"thumb/4/43/Daze_40px.png/27px-Daze_40px.png",\n		"src_20":"thumb/4/43/Daze_40px.png/36px-Daze_40px.png"\n	},\n	"Float":{\n		"src":"thumb/9/97/Float_40px.png/18px-Float_40px.png",\n		"src_15":"thumb/9/97/Float_40px.png/27px-Float_40px.png",\n		"src_20":"thumb/9/97/Float_40px.png/36px-Float_40px.png"\n	},\n	"Push":{\n		"title":"Knockback",\n		"unit":"",\n		"src":"thumb/5/5f/Knockback_40px.png/18px-Knockback_40px.png",\n		"src_15":"thumb/5/5f/Knockback_40px.png/27px-Knockback_40px.png",\n		"src_20":"thumb/5/5f/Knockback_40px.png/36px-Knockback_40px.png"\n	},\n	"Knockdown":{\n		"src":"thumb/5/5f/Knockdown_40px.png/18px-Knockdown_40px.png",\n		"src_15":"thumb/5/5f/Knockdown_40px.png/27px-Knockdown_40px.png",\n		"src_20":"thumb/5/5f/Knockdown_40px.png/36px-Knockdown_40px.png"\n	},\n	"Launch":{\n		"src":"thumb/a/a0/Launch_40px.png/18px-Launch_40px.png",\n		"src_15":"thumb/a/a0/Launch_40px.png/27px-Launch_40px.png",\n		"src_20":"thumb/a/a0/Launch_40px.png/36px-Launch_40px.png"\n	},\n	"Sink":{\n		"src":"thumb/f/fd/Sink_40px.png/18px-Sink_40px.png",\n		"src_15":"thumb/f/fd/Sink_40px.png/27px-Sink_40px.png",\n		"src_20":"thumb/f/fd/Sink_40px.png/36px-Sink_40px.png"\n	},\n	"Stun":{\n		"src":"thumb/2/23/Stun_40px.png/18px-Stun_40px.png",\n		"src_15":"thumb/2/23/Stun_40px.png/27px-Stun_40px.png",\n		"src_20":"thumb/2/23/Stun_40px.png/36px-Stun_40px.png"\n	},\n	"Agony":{\n		"src":"thumb/1/13/Agony_40px.png/18px-Agony_40px.png",\n		"src_15":"thumb/1/13/Agony_40px.png/27px-Agony_40px.png",\n		"src_20":"thumb/1/13/Agony_40px.png/36px-Agony_40px.png"\n	},\n	"Invulnerability":{\n		"src":"thumb/f/fe/Invulnerability_40px.png/18px-Invulnerability_40px.png",\n		"src_15":"thumb/f/fe/Invulnerability_40px.png/27px-Invulnerability_40px.png",\n		"src_20":"thumb/f/fe/Invulnerability_40px.png/36px-Invulnerability_40px.png"\n	},\n	"Quickness":{\n		"src":"thumb/b/b4/Quickness.png/18px-Quickness.png",\n		"src_15":"thumb/b/b4/Quickness.png/27px-Quickness.png",\n		"src_20":"thumb/b/b4/Quickness.png/36px-Quickness.png"\n	},\n	"Stealth":{\n		"src":"thumb/1/19/Stealth.png/18px-Stealth.png",\n		"src_15":"thumb/1/19/Stealth.png/27px-Stealth.png",\n		"src_20":"thumb/1/19/Stealth.png/36px-Stealth.png"\n	},\n	"Revealed":{\n		"src":"thumb/d/db/Revealed.png/18px-Revealed.png",\n		"src_15":"thumb/d/db/Revealed.png/27px-Revealed.png",\n		"src_20":"thumb/d/db/Revealed.png/36px-Revealed.png"\n	}\n}\n'}),n("app/gw2_skill",["text!app/gw2_skills.json"],function(e){function t(e){this.key=e,(this.attrs=t.skills[e])||console.warn('Skill "'+e+'" not found.')}return t.skills=JSON.parse(e),t.prototype.image=function(){return'<img alt="'+this.key+'.png" src="'+this.src()+'" width="18" height="18" />'},t.prototype.src=function(){return(!this.attrs||!this.attrs.src)&&console.log('Attr "src" not defined for skill "'+this.key+'"'),"http://wiki.guildwars2.com/images/"+(this.attrs&&this.attrs.src||t.skills.Misc.src)},t.prototype.title=function(){return this.attrs.title||this.key},t.prototype.unit=function(e){return this.attrs.unit!==undefined?this.attrs.unit:e||"s"},t}),n("app/skill_fact",["./gw2_skill"],function(e){function t(t){var n=[],r=t.replace(/\[\[([^\|\]]+)\|([^\]]+)\]\]/,"$2").split("|");r.shift();var i=r.shift();for(var s=0;s<r.length;s++){var o;(o=r[s].match(/^([a-z]+)\=(.+)$/))?this[o[1]]=o[2]:n.push(r[s])}this.skill=new e(i.toTitleCase()),this[i]?this[i].apply(this,n):this.render.apply(this,n)}return t.all=function(e){var n=[],r=/\{\{skill fact(\|[^\}]+)\}\}/g,i;while((i=r.exec(e))!==null)i[1]&&n.push(new t(i[1]));return n},t.prototype.render=function(e){this.description=[this.skill.image(),this.stacks?"<sub>"+this.stacks+"</sub>":""," ",this.alt||this.skill.title(),this.strikes?" ("+this.strikes+"x)":"",e?": "+e+this.skill.unit():""].join("")},t.prototype.combo=function(e){this.render(e.toTitleCase())},t.prototype.misc=function(){var t;this.image&&(t=new e(this.image.replace(".png",""))),this.description=(t?t.image():this.skill.image())+(this.alt||"")+": "+Array.prototype.slice.call(arguments).join()},t.prototype.miscplain=t.prototype.misc,t}),n("app/bonus",[],function(){function e(e){this.description=e.replace(/(\{\{|\}\}|\[\[|\]\])/g,"").replace(/^(\d)\s*=\s*(.+)/,"($1): $2")}return e.all=function(t){var n=/\|\s*bonus(\d\s*=\s*[^\n]+)\n/g,r=[],i;while((i=n.exec(t))!==null)i[1]&&r.push(new e(i[1]));return r},e}),n("app/infobox_parser",["./base_parser","./skill_fact","./bonus"],function(e,t,n){function r(e,t){this.description_re=/\|\s*description\s*=\s*([^\n]+)\n/,this.page=this.page_from_response(e)}return r.prototype=Object.create(e.prototype),r.prototype.description=function(){var r=e.prototype.description.call(this);if(r){var i=t.all(this.content());for(var s in i)r=r+"\n<br />"+i[s].description;var o=n.all(this.content());for(var u in o)r=r+"\n<br />"+o[u].description}return r},r}),n("app/base_renderer",[],function(){function e(e){this.elem=e}return e.prototype.error=function(e,t,n){this.elem.attr("title",t+": "+n)},e.prototype.success=function(e){this.elem.attr("title",e.title+"\n"+e.description.replace(/<br\s*\/?>/gi,"\n"))},e}),n("qtip2",[],function(){}),n("app/qtip2_renderer",["qtip2"],function(){function e(e,t){e.qtip({content:{text:function(e,t){return t.elements.target.attr("title")||"Loading..."}},position:{viewport:$(window)},style:t}),this.api=e.qtip("api"),this.original_title=e.attr("title")}return e.prototype.error=function(e,t,n){this.api.set("content.title",t),this.api.set("content.text",n)},e.prototype.success=function(e){var t=e.description;if(this.original_title){var n=new RegExp("\\b"+this.original_title+"\\b","g");t=t.replace(n,"<em>"+this.original_title+"</em>")}this.api.set("content.title",e.title),this.api.set("content.text",t)},e}),n("String",[],function(){String.prototype.beginsWith=function(e){return this.indexOf(e)!==-1},String.prototype.endsWith=function(e){return this.indexOf(e,this.length-e.length)!==-1},String.prototype.toTitleCase=function(){return this.replace(/\w\S*/g,function(e){return e.charAt(0).toUpperCase()+e.substr(1).toLowerCase()})}}),n("app/tooltips",["app/wiki_page","./infobox_parser","app/base_renderer","app/qtip2_renderer","String"],function(e,t,n,r){var i=new function(){var i=this;this.href_pattern="wiki.guildwars2.com/wiki/",this.all=function(e){$("a[href *= '"+this.href_pattern+"']").each(function(){var t=$(this).attr("href"),n=t.slice(t.indexOf(i.href_pattern)+i.href_pattern.length);i.create($(this),n,e)})},this.create=function(i,s,o){var u=n;o=o||this.style(),o&&o.beginsWith("qtip")&&(u=r);var a=new e(t);a.get("http://wiki.guildwars2.com/api.php",s,new u(i,o))},this.style=function(){var e=null;if(typeof window!="undefined"&&typeof navigator!="undefined"&&!!window.document){var t=document.getElementsByTagName("script"),n=t.length-1;for(n;n>=0;n--)if(t[n].getAttribute("data-wikitip-style"))return t[n].getAttribute("data-wikitip-style")}return e}};return i}),n("app/main",["jquery","app/tooltips"],function(e,t){e(document).ready(function(){t.all()})}),e.config({baseUrl:"/js/lib",paths:{app:"../app",jquery:"//ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min",qtip2:"//cdn.jsdelivr.net/qtip2/2.2.1/jquery.qtip.min"}}),e(["app/main"]),n("app",function(){})})();