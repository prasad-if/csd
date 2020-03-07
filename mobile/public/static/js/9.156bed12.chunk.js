/*! For license information please see 9.156bed12.chunk.js.LICENSE.txt */
(this.webpackJsonpsurveyeditor=this.webpackJsonpsurveyeditor||[]).push([[9],{665:function(t,e,r){"use strict";r.r(e),r.d(e,"scopeCss",(function(){return L}));var n=")(?:\\(((?:\\([^)(]*\\)|[^)(]*)+?)\\))?([^,{]*)",s=new RegExp("(-shadowcsshost"+n,"gim"),o=new RegExp("(-shadowcsscontext"+n,"gim"),c=new RegExp("(-shadowcssslotted"+n,"gim"),a=/-shadowcsshost-no-combinator([^\s]*)/,i=[/::shadow/g,/::content/g],u=/-shadowcsshost/gim,h=/:host/gim,l=/::slotted/gim,p=/:host-context/gim,f=/\/\*\s*[\s\S]*?\*\//g,d=/\/\*\s*#\s*source(Mapping)?URL=[\s\S]+?\*\//g,g=/(\s*)([^;\{\}]+?)(\s*)((?:{%BLOCK%}?\s*;?)|(?:\s*;))/g,m=/([{}])/g,v=function(t,e){var r=w(t),n=0;return r.escapedString.replace(g,(function(){for(var t=[],s=0;s<arguments.length;s++)t[s]=arguments[s];var o=t[2],c="",a=t[4],i="";a&&a.startsWith("{%BLOCK%")&&(c=r.blocks[n++],a=a.substring("%BLOCK%".length+1),i="{");var u={selector:o,content:c},h=e(u);return""+t[1]+h.selector+t[3]+i+h.content+a}))},w=function(t){for(var e=t.split(m),r=[],n=[],s=0,o=[],c=0;c<e.length;c++){var a=e[c];"}"===a&&s--,s>0?o.push(a):(o.length>0&&(n.push(o.join("")),r.push("%BLOCK%"),o=[]),r.push(a)),"{"===a&&s++}return o.length>0&&(n.push(o.join("")),r.push("%BLOCK%")),{escapedString:r.join(""),blocks:n}},_=function(t,e,r){return t.replace(e,(function(){for(var t=[],e=0;e<arguments.length;e++)t[e]=arguments[e];if(t[2]){for(var n=t[2].split(","),s=[],o=0;o<n.length;o++){var c=n[o].trim();if(!c)break;s.push(r("-shadowcsshost-no-combinator",c,t[3]))}return s.join(",")}return"-shadowcsshost-no-combinator"+t[3]}))},x=function(t,e,r){return t+e.replace("-shadowcsshost","")+r},b=function(t,e,r){return e.indexOf("-shadowcsshost")>-1?x(t,e,r):t+e+r+", "+e+" "+t+r},O=function(t,e){return!function(t){return t=t.replace(/\[/g,"\\[").replace(/\]/g,"\\]"),new RegExp("^("+t+")([>\\s~+[.,{:][\\s\\S]*)?$","m")}(e).test(t)},W=function(t,e,r){for(var n,s="."+(e=e.replace(/\[is=([^\]]*)\]/g,(function(t){for(var e=[],r=1;r<arguments.length;r++)e[r-1]=arguments[r];return e[0]}))),o=function(t){var n=t.trim();if(!n)return"";if(t.indexOf("-shadowcsshost-no-combinator")>-1)n=function(t,e,r){if(u.lastIndex=0,u.test(t)){var n="."+r;return t.replace(a,(function(t,e){return e.replace(/([^:]*)(:*)(.*)/,(function(t,e,r,s){return e+n+r+s}))})).replace(u,n+" ")}return e+" "+t}(t,e,r);else{var o=t.replace(u,"");if(o.length>0){var c=o.match(/([^:]*)(:*)(.*)/);c&&(n=c[1]+s+c[2]+c[3])}}return n},c=function(t){var e=[],r=0;return{content:(t=t.replace(/(\[[^\]]*\])/g,(function(t,n){var s="__ph-"+r+"__";return e.push(n),r++,s}))).replace(/(:nth-[-\w]+)(\([^)]+\))/g,(function(t,n,s){var o="__ph-"+r+"__";return e.push(s),r++,n+o})),placeholders:e}}(t),i="",h=0,l=/( |>|\+|~(?!=))\s*/g,p=!((t=c.content).indexOf("-shadowcsshost-no-combinator")>-1);null!==(n=l.exec(t));){var f=n[1],d=t.slice(h,n.index).trim();i+=((p=p||d.indexOf("-shadowcsshost-no-combinator")>-1)?o(d):d)+" "+f+" ",h=l.lastIndex}var g,m=t.substring(h);return i+=(p=p||m.indexOf("-shadowcsshost-no-combinator")>-1)?o(m):m,g=c.placeholders,i.replace(/__ph-(\d+)__/g,(function(t,e){return g[+e]}))},j=function t(e,r,n,s,o){return v(e,(function(e){var o=e.selector,c=e.content;return"@"!==e.selector[0]?o=function(t,e,r,n){return t.split(",").map((function(t){return n&&t.indexOf("."+n)>-1?t.trim():O(t,e)?W(t,e,r).trim():t.trim()})).join(", ")}(e.selector,r,n,s):(e.selector.startsWith("@media")||e.selector.startsWith("@supports")||e.selector.startsWith("@page")||e.selector.startsWith("@document"))&&(c=t(e.content,r,n,s)),{selector:o.replace(/\s{2,}/g," ").trim(),content:c}}))},C=function(t,e,r,n,a){return t=function(t){return i.reduce((function(t,e){return t.replace(e," ")}),t)}(t=function(t,e){var r=c;return t.replace(r,(function(){for(var t=[],r=0;r<arguments.length;r++)t[r]=arguments[r];if(t[2]){var n=t[2].trim(),s=t[3],o="."+e+" > "+n+s;return o}return"-shadowcsshost-no-combinator"+t[3]}))}(t=function(t){return _(t,o,b)}(t=function(t){return _(t,s,x)}(t=t.replace(p,"-shadowcsscontext").replace(h,"-shadowcsshost").replace(l,"-shadowcssslotted"))),n)),e&&(t=j(t,e,r,n)),(t=(t=t.replace(/-shadowcsshost-no-combinator/g,"."+r)).replace(/>\s*\*\s+([^{, ]+)/gm," $1 ")).trim()},L=function(t,e,r){var n=e+"-h",s=e+"-s",o=t.match(d)||[];t=function(t){return t.replace(f,"")}(t);var c=[];if(r){var a=function(t){var e="/*!@___"+c.length+"___*/",r="/*!@"+t.selector+"*/";return c.push({placeholder:e,comment:r}),t.selector=e+t.selector,t};t=v(t,(function(t){return"@"!==t.selector[0]?a(t):t.selector.startsWith("@media")||t.selector.startsWith("@supports")||t.selector.startsWith("@page")||t.selector.startsWith("@document")?(t.content=v(t.content,a),t):t}))}var i=C(t,e,n,s);return t=[i].concat(o).join("\n"),r&&c.forEach((function(e){var r=e.placeholder,n=e.comment;t=t.replace(r,n)})),t}}}]);
//# sourceMappingURL=9.156bed12.chunk.js.map