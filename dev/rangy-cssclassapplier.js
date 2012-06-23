/**
 * CSS Class Applier module for Rangy.
 * Adds, removes and toggles CSS classes on Ranges and Selections
 *
 * Part of Rangy, a cross-browser JavaScript range and selection library
 * http://code.google.com/p/rangy/
 *
 * Depends on Rangy core.
 *
 * Copyright 2012, Tim Down
 * Licensed under the MIT license.
 * Version: 1.3alpha.675
 * Build date: 23 June 2012
 */
rangy.createModule("CssClassApplier",function(a,b){function e(a){return a.replace(/^\s\s*/,"").replace(/\s\s*$/,"")}function f(a,b){return a.className&&(new RegExp("(?:^|\\s)"+b+"(?:\\s|$)")).test(a.className)}function g(a,b){a.className?f(a,b)||(a.className+=" "+b):a.className=b}function i(a){return a.split(/\s+/).sort().join(" ")}function j(a){return i(a.className)}function k(a,b){return j(a)==j(b)}function l(a){var b=a.parentNode;while(a.hasChildNodes())b.insertBefore(a.firstChild,a);b.removeChild(a)}function m(a,b){var c=a.cloneRange();c.selectNodeContents(b);var d=c.intersection(a),e=d?d.toString():"";return c.detach(),e!=""}function n(a){return a.getNodes([3],function(b){return m(a,b)})}function o(a,b){if(a.attributes.length!=b.attributes.length)return!1;for(var c=0,d=a.attributes.length,e,f,g;c<d;++c){e=a.attributes[c],g=e.name;if(g!="class"){f=b.attributes.getNamedItem(g);if(e.specified!=f.specified)return!1;if(e.specified&&e.nodeValue!==f.nodeValue)return!1}}return!0}function p(a,b){for(var d=0,e=a.attributes.length,f;d<e;++d){f=a.attributes[d].name;if((!b||!c.arrayContains(b,f))&&a.attributes[d].specified&&f!="class")return!0}return!1}function q(a,b){var c;for(var d in b)if(b.hasOwnProperty(d)){c=b[d];if(typeof c=="object"){if(!q(a[d],c))return!1}else if(a[d]!==c)return!1}return!0}function t(a){var b;return a&&a.nodeType==1&&((b=a.parentNode)&&b.nodeType==9&&b.designMode=="on"||s(a)&&!s(a.parentNode))}function u(a){return(s(a)||a.nodeType!=1&&s(a.parentNode))&&!t(a)}function w(a){return a&&a.nodeType==1&&!v.test(r(a,"display"))}function y(a){if(a.data.length==0)return!0;if(x.test(a.data))return!1;var b=r(a.parentNode,"whiteSpace");switch(b){case"pre":case"pre-wrap":case"-moz-pre-wrap":return!1;case"pre-line":if(/[\r\n]/.test(a.data))return!1}return w(a.previousSibling)||w(a.nextSibling)}function z(a,b){return c.isCharacterDataNode(a)?b==0?!!a.previousSibling:b==a.length?!!a.nextSibling:!0:b>0&&b<a.childNodes.length}function A(a,d,e,f){var g,h=e==0;if(c.isAncestorOf(d,a))return a;if(c.isCharacterDataNode(d))if(e==0)e=c.getNodeIndex(d),d=d.parentNode;else{if(e!=d.length)throw b.createError("splitNodeAt() should not be called with offset in the middle of a data node ("+e+" in "+d.data);e=c.getNodeIndex(d)+1,d=d.parentNode}if(z(d,e)){if(!g){g=d.cloneNode(!1),g.id&&g.removeAttribute("id");var i;while(i=d.childNodes[e])g.appendChild(i);c.insertAfter(g,d)}return d==a?g:A(a,g.parentNode,c.getNodeIndex(g),f)}if(a!=d){g=d.parentNode;var j=c.getNodeIndex(d);return h||j++,A(a,g,j,f)}return a}function B(a,b){return a.tagName==b.tagName&&k(a,b)&&o(a,b)&&r(a,"display")=="inline"&&r(b,"display")=="inline"}function C(a){var b=a?"nextSibling":"previousSibling";return function(c,d){var e=c.parentNode,f=c[b];if(f){if(f&&f.nodeType==3)return f}else if(d){f=e[b];if(f&&f.nodeType==1&&B(e,f))return f[a?"firstChild":"lastChild"]}return null}}function F(a){this.isElementMerge=a.nodeType==1,this.firstTextNode=this.isElementMerge?a.lastChild:a,this.textNodes=[this.firstTextNode]}function I(a,b,c){this.cssClass=a;var d,f,g,h,i=null;if(typeof b=="object"&&b!==null){c=b.tagNames,i=b.elementProperties;for(f=0;h=G[f++];)b.hasOwnProperty(h)&&(this[h]=b[h]);d=b.normalize}else d=b;this.normalize=typeof d=="undefined"?!0:d,this.attrExceptions=[];var j=document.createElement(this.elementTagName);this.elementProperties=this.copyPropertiesToElement(i,j,!0),this.elementSortedClassName=this.elementProperties.hasOwnProperty("className")?this.elementProperties.className:a,this.applyToAnyTagName=!1;var k=typeof c;if(k=="string")c=="*"?this.applyToAnyTagName=!0:this.tagNames=e(c.toLowerCase()).split(/\s*,\s*/);else if(k=="object"&&typeof c.length=="number"){this.tagNames=[];for(f=0,g=c.length;f<g;++f)c[f]=="*"?this.applyToAnyTagName=!0:this.tagNames.push(c[f].toLowerCase())}else this.tagNames=[this.elementTagName]}function J(a,b,c){return new I(a,b,c)}a.requireModules(["WrappedSelection","WrappedRange"]);var c=a.dom,d="span",h=function(){function a(a,b,c){return b&&c?" ":""}return function(b,c){b.className&&(b.className=b.className.replace(new RegExp("(^|\\s)"+c+"(\\s|$)"),a))}}(),r;typeof window.getComputedStyle!="undefined"?r=function(a,b){return c.getWindow(a).getComputedStyle(a,null)[b]}:typeof document.documentElement.currentStyle!="undefined"?r=function(a,b){return a.currentStyle[b]}:b.fail("No means of obtaining computed style properties found");var s;(function(){var a=document.createElement("div");typeof a.isContentEditable=="boolean"?s=function(a){return a&&a.nodeType==1&&a.isContentEditable}:s=function(a){return!a||a.nodeType!=1||a.contentEditable=="false"?!1:a.contentEditable=="true"||s(a.parentNode)}})();var v=/^inline(-block|-table)?$/i,x=/[^\r\n\t\f \u200B]/,D=C(!1),E=C(!0);F.prototype={doMerge:function(){var a=[],b,c,d;for(var e=0,f=this.textNodes.length;e<f;++e)b=this.textNodes[e],c=b.parentNode,a[e]=b.data,e&&(c.removeChild(b),c.hasChildNodes()||c.parentNode.removeChild(c));return this.firstTextNode.data=d=a.join(""),d},getLength:function(){var a=this.textNodes.length,b=0;while(a--)b+=this.textNodes[a].length;return b},toString:function(){var a=[];for(var b=0,c=this.textNodes.length;b<c;++b)a[b]="'"+this.textNodes[b].data+"'";return"[Merge("+a.join(",")+")]"}};var G=["elementTagName","ignoreWhiteSpace","applyToEditableOnly","useExistingElements"],H={};I.prototype={elementTagName:d,elementProperties:{},ignoreWhiteSpace:!0,applyToEditableOnly:!1,useExistingElements:!0,copyPropertiesToElement:function(a,b,c){var d,e,f={},h,j,k,l;for(var m in a)if(a.hasOwnProperty(m)){j=a[m],k=b[m];if(m=="className")g(b,j),g(b,this.cssClass),b[m]=i(b[m]),c&&(f[m]=b[m]);else if(m=="style"){e=k,c&&(f[m]=h={});for(d in a[m])e[d]=j[d],c&&(h[d]=e[d]);this.attrExceptions.push(m)}else b[m]=j,c&&(f[m]=b[m],l=H.hasOwnProperty(m)?H[m]:m,this.attrExceptions.push(l))}return c?f:""},hasClass:function(a){return a.nodeType==1&&c.arrayContains(this.tagNames,a.tagName.toLowerCase())&&f(a,this.cssClass)},getSelfOrAncestorWithClass:function(a){while(a){if(this.hasClass(a))return a;a=a.parentNode}return null},isModifiable:function(a){return!this.applyToEditableOnly||u(a)},isIgnorableWhiteSpaceNode:function(a){return this.ignoreWhiteSpace&&a&&a.nodeType==3&&y(a)},postApply:function(a,b,c){var d=a[0],e=a[a.length-1],f=[],g,h=d,i=e,j=0,k=e.length,l,m;for(var n=0,o=a.length;n<o;++n)l=a[n],m=D(l,!c),m?(g||(g=new F(m),f.push(g)),g.textNodes.push(l),l===d&&(h=g.firstTextNode,j=h.length),l===e&&(i=g.firstTextNode,k=g.getLength())):g=null;var p=E(e,!c);p&&(g||(g=new F(e),f.push(g)),g.textNodes.push(p));if(f.length){for(n=0,o=f.length;n<o;++n)f[n].doMerge();b.setStart(h,j),b.setEnd(i,k)}},createContainer:function(a){var b=a.createElement(this.elementTagName);return this.copyPropertiesToElement(this.elementProperties,b,!1),g(b,this.cssClass),b},applyToTextNode:function(a){var b=a.parentNode;if(b.childNodes.length==1&&c.arrayContains(this.tagNames,b.tagName.toLowerCase())&&this.useExistingElements)g(b,this.cssClass);else{var d=this.createContainer(c.getDocument(a));a.parentNode.insertBefore(d,a),d.appendChild(a)}},isRemovable:function(a){return a.tagName.toLowerCase()==this.elementTagName&&j(a)==this.elementSortedClassName&&q(a,this.elementProperties)&&!p(a,this.attrExceptions)&&this.isModifiable(a)},undoToTextNode:function(a,b,c){if(!b.containsNode(c)){var d=b.cloneRange();d.selectNode(c),d.isPointInRange(b.endContainer,b.endOffset)&&(A(c,b.endContainer,b.endOffset,[b]),b.setEndAfter(c)),d.isPointInRange(b.startContainer,b.startOffset)&&(c=A(c,b.startContainer,b.startOffset,[b]))}this.isRemovable(c)?l(c):h(c,this.cssClass)},applyToRange:function(a){a.splitBoundaries();var b=n(a);if(b.length){var c;for(var d=0,e=b.length;d<e;++d)c=b[d],!this.isIgnorableWhiteSpaceNode(c)&&!this.getSelfOrAncestorWithClass(c)&&this.isModifiable(c)&&this.applyToTextNode(c);a.setStart(b[0],0),c=b[b.length-1],a.setEnd(c,c.length),this.normalize&&this.postApply(b,a,!1)}},applyToSelection:function(b){var c=a.getSelection(b),d,e=c.getAllRanges();c.removeAllRanges();var f=e.length;while(f--)d=e[f],this.applyToRange(d),c.addRange(d)},undoToRange:function(a){a.splitBoundaries();var b=n(a),c,d,e=b[b.length-1];if(b.length){for(var f=0,g=b.length;f<g;++f)c=b[f],d=this.getSelfOrAncestorWithClass(c),d&&this.isModifiable(c)&&this.undoToTextNode(c,a,d),a.setStart(b[0],0),a.setEnd(e,e.length);this.normalize&&this.postApply(b,a,!0)}},undoToSelection:function(b){var c=a.getSelection(b),d=c.getAllRanges(),e;c.removeAllRanges();for(var f=0,g=d.length;f<g;++f)e=d[f],this.undoToRange(e),c.addRange(e)},getTextSelectedByRange:function(a,b){var c=b.cloneRange();c.selectNodeContents(a);var d=c.intersection(b),e=d?d.toString():"";return c.detach(),e},isAppliedToRange:function(a){if(a.collapsed)return!!this.getSelfOrAncestorWithClass(a.commonAncestorContainer);var b=a.getNodes([3]);for(var c=0,d;d=b[c++];)if(!this.isIgnorableWhiteSpaceNode(d)&&m(a,d)&&this.isModifiable(d)&&!this.getSelfOrAncestorWithClass(d))return!1;return!0},isAppliedToSelection:function(b){var c=a.getSelection(b),d=c.getAllRanges(),e=d.length;while(e--)if(!this.isAppliedToRange(d[e]))return!1;return!0},toggleRange:function(a){this.isAppliedToRange(a)?this.undoToRange(a):this.applyToRange(a)},toggleSelection:function(a){this.isAppliedToSelection(a)?this.undoToSelection(a):this.applyToSelection(a)},detach:function(){}},I.util={hasClass:f,addClass:g,removeClass:h,hasSameClasses:k,replaceWithOwnChildren:l,elementsHaveSameNonClassAttributes:o,elementHasNonClassAttributes:p,splitNodeAt:A,isEditableElement:s,isEditingHost:t,isEditable:u},a.CssClassApplier=I,a.createCssClassApplier=J})