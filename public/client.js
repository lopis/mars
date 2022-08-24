/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/css-loader/dist/cjs.js!./src/style.css":
/*!*************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/style.css ***!
  \*************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/noSourceMaps.js */ \"./node_modules/css-loader/dist/runtime/noSourceMaps.js\");\n/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/api.js */ \"./node_modules/css-loader/dist/runtime/api.js\");\n/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);\n// Imports\n\n\nvar ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));\n// Module\n___CSS_LOADER_EXPORT___.push([module.id, \":root {\\n  --hex-width: 2;\\n  --hex-size-height: 1.1547;\\n}\\n\\nbody {\\n  margin: 0;\\n  height: 100vh;\\n  width: 100vw;\\n  image-rendering: crisp-edges;\\n  image-rendering: optimizespeed;\\n  background: black;\\n  overflow: hidden;\\n  font-family: DejaVu Sans Mono, Consolas, SF Mono, Roboto Mono;\\n\\tcolor: white;\\n  user-select: none;\\n}\\n\\ncanvas {\\n  position: absolute;\\n}\\n\\n#tileset {\\n  height: 100vh;\\n  width: 100vw;\\n  position: absolute;\\n  top: 0;\\n  display: flex;\\n  flex-direction: column;\\n  justify-content: center;\\n  align-items: center;\\n  margin: 0;\\n  box-sizing: border-box;\\n  transform: rotate(25deg);\\n}\\n\\n.hex {\\n  --tile-color: #000000;\\n  --hex-size: 2.8vmin;\\n  --fade-time: 300ms;\\n  font-size: 1.4vmin;\\n  position: relative;\\n  display: inline-flex;\\n  width: calc(var(--hex-width) * var(--hex-size));\\n  height: calc(var(--hex-size-height) * var(--hex-size));\\n  margin: 0.8vmin 0.3vmin;\\n  opacity: 0.6;\\n}\\n.night {\\n  --tile-color: #b39007;\\n}\\n.hex::before, .hex::after {\\n  content: \\\"\\\";\\n  position: absolute;\\n  height: 100%;\\n  width: 100%;\\n  transform: rotate(60deg);\\n  transform-origin: center;\\n}\\n.hex::after {\\n  content: attr(data-icon);\\n  color: rgb(0, 0, 0);\\n  transform: rotate(-60deg);\\n  text-align: center;\\n  font-size: 3vmin;\\n}\\n.hex, .hex::after, .hex::before {\\n  transition: background-image var(--fade-time) ease;\\n  background-color: var(--tile-color);\\n  box-sizing: border-box;\\n}\\n.hex:hover {\\n  --tile-color: rgb(233, 167, 69);\\n  cursor: pointer;\\n}\\n.hex.selected {\\n  --fade-time: 50ms;\\n  --tile-color: rgb(255, 253, 253);\\n  cursor: pointer;\\n}\\n\\nsvg {\\n  position: fixed;\\n  top: 0;\\n  left: 0;\\n  z-index: -1;\\n}\\n\\n.noise {\\n  z-index: 1;\\n  opacity: 0.15;\\n  pointer-events: none;\\n}\\n\\n\\n/* EARTH */\\n#earth {\\n\\tpadding: 1vmin;\\n\\tbackground-color: black;\\n\\twidth: 20vmin;\\n  height: 10vmin;\\n\\tborder: solid #063680;\\n\\tborder-width: 0 3px 3px 0;\\n\\tborder-bottom-right-radius: 3vmin;\\n}\\n\\n#earth .icon,\\n#earth .icon::before,\\n#earth .icon::after {\\n  position: relative;\\n\\theight: 5vmin;\\n\\twidth: 5vmin;\\n  border-radius: 5vmin;\\n\\tbackground: radial-gradient(circle at top left, #bcbebf 30%, #063680 31%);\\n  overflow: hidden;\\n}\\n\\n#earth .icon::before,\\n#earth .icon::after {\\n  content: \\\"\\\";\\n  display: inline-block;\\n  position: absolute;\\n\\tbackground: #b68929;\\n  top: 60%;\\n  width: 4vmin;\\n}\\n\\n#earth .icon::after {\\n  top: -60%;\\n  right: 10%;\\n  width: 2vmin;\\n}\\n\\n/* DIALOG */\\n\\n#_dialog {\\n\\tbackground: #131212;\\n\\tposition: fixed;\\n\\tpadding: 1vmin;\\n  opacity: 0;\\n  transform: scale(2, 0);\\n  transition: all 100ms ease-out, top 0s 100ms;\\n  top: -999px;\\n  right: 5vh;\\n  max-width: 30vh;\\n  overflow: auto;\\n}\\n\\n#_dialog.show {\\n  opacity: 1;\\n  top: 10vh;\\n  transition: all 100ms ease-out, top 0s;\\n  transform: scale(1, 1);\\n}\\n\\n#_dialog div {\\n\\tdisplay: inline-block;\\n}\\n\\n#_dialog b {\\n  opacity: 0.5;\\n}\\n\\n#_prompt {\\n\\tmargin-right: 2vh;\\n}\\n\\n.close {\\n  margin-left: 1vmin;\\n}\\n\\nul {\\n  padding: 0;\\n  list-style: none;\\n  max-height: 50vh;\\n  overflow: auto;\\n}\\n\\n.button {\\n\\tpadding: 0.7vmin;\\n\\tborder: 1px solid;\\n\\tmargin-bottom: 0.8vmin;\\n}\\n\\n.button:hover {\\n  background: #999;\\n  color: #131212;\\n  cursor: pointer;\\n}\\n\\n.button, #_dialog {\\n  border-radius: 3px;\\n}\\n\\n#_input {\\n\\tdisplay: block;\\n\\twidth: 80%;\\n\\tmargin: 5%;\\n\\tpadding: 5%;\\n}\\n\\n\\n#sidebar {\\n  position: fixed;\\n  top: 0;\\n  right: 0;\\n  height: 100vh;\\n  background: #131212;\\n}\\n\\n#toolbar {\\n\\tposition: fixed;\\n\\ttop: 0;\\n\\tright: 0;\\n\\tdisplay: grid;\\n\\tgrid-template-columns: repeat(3, 1fr);\\n\\tpadding: 1vh;\\n\\tgap: 1vh;\\n}\\n\\n[data-count]::after {\\n  content: ' ' attr(data-count);\\n}\\n\\n[data-new]::after {\\n  content: '🔴';\\n  float: right;\\n}\", \"\"]);\n// Exports\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);\n\n\n//# sourceURL=webpack://mars/./src/style.css?./node_modules/css-loader/dist/cjs.js");

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/***/ ((module) => {

"use strict";
eval("\n\n/*\n  MIT License http://www.opensource.org/licenses/mit-license.php\n  Author Tobias Koppers @sokra\n*/\nmodule.exports = function (cssWithMappingToString) {\n  var list = []; // return the list of modules as css string\n\n  list.toString = function toString() {\n    return this.map(function (item) {\n      var content = \"\";\n      var needLayer = typeof item[5] !== \"undefined\";\n\n      if (item[4]) {\n        content += \"@supports (\".concat(item[4], \") {\");\n      }\n\n      if (item[2]) {\n        content += \"@media \".concat(item[2], \" {\");\n      }\n\n      if (needLayer) {\n        content += \"@layer\".concat(item[5].length > 0 ? \" \".concat(item[5]) : \"\", \" {\");\n      }\n\n      content += cssWithMappingToString(item);\n\n      if (needLayer) {\n        content += \"}\";\n      }\n\n      if (item[2]) {\n        content += \"}\";\n      }\n\n      if (item[4]) {\n        content += \"}\";\n      }\n\n      return content;\n    }).join(\"\");\n  }; // import a list of modules into the list\n\n\n  list.i = function i(modules, media, dedupe, supports, layer) {\n    if (typeof modules === \"string\") {\n      modules = [[null, modules, undefined]];\n    }\n\n    var alreadyImportedModules = {};\n\n    if (dedupe) {\n      for (var k = 0; k < this.length; k++) {\n        var id = this[k][0];\n\n        if (id != null) {\n          alreadyImportedModules[id] = true;\n        }\n      }\n    }\n\n    for (var _k = 0; _k < modules.length; _k++) {\n      var item = [].concat(modules[_k]);\n\n      if (dedupe && alreadyImportedModules[item[0]]) {\n        continue;\n      }\n\n      if (typeof layer !== \"undefined\") {\n        if (typeof item[5] === \"undefined\") {\n          item[5] = layer;\n        } else {\n          item[1] = \"@layer\".concat(item[5].length > 0 ? \" \".concat(item[5]) : \"\", \" {\").concat(item[1], \"}\");\n          item[5] = layer;\n        }\n      }\n\n      if (media) {\n        if (!item[2]) {\n          item[2] = media;\n        } else {\n          item[1] = \"@media \".concat(item[2], \" {\").concat(item[1], \"}\");\n          item[2] = media;\n        }\n      }\n\n      if (supports) {\n        if (!item[4]) {\n          item[4] = \"\".concat(supports);\n        } else {\n          item[1] = \"@supports (\".concat(item[4], \") {\").concat(item[1], \"}\");\n          item[4] = supports;\n        }\n      }\n\n      list.push(item);\n    }\n  };\n\n  return list;\n};\n\n//# sourceURL=webpack://mars/./node_modules/css-loader/dist/runtime/api.js?");

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/noSourceMaps.js":
/*!**************************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/noSourceMaps.js ***!
  \**************************************************************/
/***/ ((module) => {

"use strict";
eval("\n\nmodule.exports = function (i) {\n  return i[1];\n};\n\n//# sourceURL=webpack://mars/./node_modules/css-loader/dist/runtime/noSourceMaps.js?");

/***/ }),

/***/ "./src/style.css":
/*!***********************!*\
  !*** ./src/style.css ***!
  \***********************/
/***/ ((__unused_webpack_module, __unused_webpack___webpack_exports__, __webpack_require__) => {

"use strict";
eval("/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ \"./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleDomAPI.js */ \"./node_modules/style-loader/dist/runtime/styleDomAPI.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertBySelector.js */ \"./node_modules/style-loader/dist/runtime/insertBySelector.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ \"./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertStyleElement.js */ \"./node_modules/style-loader/dist/runtime/insertStyleElement.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleTagTransform.js */ \"./node_modules/style-loader/dist/runtime/styleTagTransform.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../node_modules/css-loader/dist/cjs.js!./style.css */ \"./node_modules/css-loader/dist/cjs.js!./src/style.css\");\n\n      \n      \n      \n      \n      \n      \n      \n      \n      \n\nvar options = {};\n\noptions.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());\noptions.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());\n\n      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, \"head\");\n    \noptions.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());\noptions.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());\n\nvar update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__[\"default\"], options);\n\n\n\n\n       /* unused harmony default export */ var __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__[\"default\"] && _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__[\"default\"].locals ? _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__[\"default\"].locals : undefined);\n\n\n//# sourceURL=webpack://mars/./src/style.css?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/***/ ((module) => {

"use strict";
eval("\n\nvar stylesInDOM = [];\n\nfunction getIndexByIdentifier(identifier) {\n  var result = -1;\n\n  for (var i = 0; i < stylesInDOM.length; i++) {\n    if (stylesInDOM[i].identifier === identifier) {\n      result = i;\n      break;\n    }\n  }\n\n  return result;\n}\n\nfunction modulesToDom(list, options) {\n  var idCountMap = {};\n  var identifiers = [];\n\n  for (var i = 0; i < list.length; i++) {\n    var item = list[i];\n    var id = options.base ? item[0] + options.base : item[0];\n    var count = idCountMap[id] || 0;\n    var identifier = \"\".concat(id, \" \").concat(count);\n    idCountMap[id] = count + 1;\n    var indexByIdentifier = getIndexByIdentifier(identifier);\n    var obj = {\n      css: item[1],\n      media: item[2],\n      sourceMap: item[3],\n      supports: item[4],\n      layer: item[5]\n    };\n\n    if (indexByIdentifier !== -1) {\n      stylesInDOM[indexByIdentifier].references++;\n      stylesInDOM[indexByIdentifier].updater(obj);\n    } else {\n      var updater = addElementStyle(obj, options);\n      options.byIndex = i;\n      stylesInDOM.splice(i, 0, {\n        identifier: identifier,\n        updater: updater,\n        references: 1\n      });\n    }\n\n    identifiers.push(identifier);\n  }\n\n  return identifiers;\n}\n\nfunction addElementStyle(obj, options) {\n  var api = options.domAPI(options);\n  api.update(obj);\n\n  var updater = function updater(newObj) {\n    if (newObj) {\n      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {\n        return;\n      }\n\n      api.update(obj = newObj);\n    } else {\n      api.remove();\n    }\n  };\n\n  return updater;\n}\n\nmodule.exports = function (list, options) {\n  options = options || {};\n  list = list || [];\n  var lastIdentifiers = modulesToDom(list, options);\n  return function update(newList) {\n    newList = newList || [];\n\n    for (var i = 0; i < lastIdentifiers.length; i++) {\n      var identifier = lastIdentifiers[i];\n      var index = getIndexByIdentifier(identifier);\n      stylesInDOM[index].references--;\n    }\n\n    var newLastIdentifiers = modulesToDom(newList, options);\n\n    for (var _i = 0; _i < lastIdentifiers.length; _i++) {\n      var _identifier = lastIdentifiers[_i];\n\n      var _index = getIndexByIdentifier(_identifier);\n\n      if (stylesInDOM[_index].references === 0) {\n        stylesInDOM[_index].updater();\n\n        stylesInDOM.splice(_index, 1);\n      }\n    }\n\n    lastIdentifiers = newLastIdentifiers;\n  };\n};\n\n//# sourceURL=webpack://mars/./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertBySelector.js":
/*!********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertBySelector.js ***!
  \********************************************************************/
/***/ ((module) => {

"use strict";
eval("\n\nvar memo = {};\n/* istanbul ignore next  */\n\nfunction getTarget(target) {\n  if (typeof memo[target] === \"undefined\") {\n    var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself\n\n    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {\n      try {\n        // This will throw an exception if access to iframe is blocked\n        // due to cross-origin restrictions\n        styleTarget = styleTarget.contentDocument.head;\n      } catch (e) {\n        // istanbul ignore next\n        styleTarget = null;\n      }\n    }\n\n    memo[target] = styleTarget;\n  }\n\n  return memo[target];\n}\n/* istanbul ignore next  */\n\n\nfunction insertBySelector(insert, style) {\n  var target = getTarget(insert);\n\n  if (!target) {\n    throw new Error(\"Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.\");\n  }\n\n  target.appendChild(style);\n}\n\nmodule.exports = insertBySelector;\n\n//# sourceURL=webpack://mars/./node_modules/style-loader/dist/runtime/insertBySelector.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertStyleElement.js":
/*!**********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertStyleElement.js ***!
  \**********************************************************************/
/***/ ((module) => {

"use strict";
eval("\n\n/* istanbul ignore next  */\nfunction insertStyleElement(options) {\n  var element = document.createElement(\"style\");\n  options.setAttributes(element, options.attributes);\n  options.insert(element, options.options);\n  return element;\n}\n\nmodule.exports = insertStyleElement;\n\n//# sourceURL=webpack://mars/./node_modules/style-loader/dist/runtime/insertStyleElement.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js ***!
  \**********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("\n\n/* istanbul ignore next  */\nfunction setAttributesWithoutAttributes(styleElement) {\n  var nonce =  true ? __webpack_require__.nc : 0;\n\n  if (nonce) {\n    styleElement.setAttribute(\"nonce\", nonce);\n  }\n}\n\nmodule.exports = setAttributesWithoutAttributes;\n\n//# sourceURL=webpack://mars/./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleDomAPI.js":
/*!***************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleDomAPI.js ***!
  \***************************************************************/
/***/ ((module) => {

"use strict";
eval("\n\n/* istanbul ignore next  */\nfunction apply(styleElement, options, obj) {\n  var css = \"\";\n\n  if (obj.supports) {\n    css += \"@supports (\".concat(obj.supports, \") {\");\n  }\n\n  if (obj.media) {\n    css += \"@media \".concat(obj.media, \" {\");\n  }\n\n  var needLayer = typeof obj.layer !== \"undefined\";\n\n  if (needLayer) {\n    css += \"@layer\".concat(obj.layer.length > 0 ? \" \".concat(obj.layer) : \"\", \" {\");\n  }\n\n  css += obj.css;\n\n  if (needLayer) {\n    css += \"}\";\n  }\n\n  if (obj.media) {\n    css += \"}\";\n  }\n\n  if (obj.supports) {\n    css += \"}\";\n  }\n\n  var sourceMap = obj.sourceMap;\n\n  if (sourceMap && typeof btoa !== \"undefined\") {\n    css += \"\\n/*# sourceMappingURL=data:application/json;base64,\".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), \" */\");\n  } // For old IE\n\n  /* istanbul ignore if  */\n\n\n  options.styleTagTransform(css, styleElement, options.options);\n}\n\nfunction removeStyleElement(styleElement) {\n  // istanbul ignore if\n  if (styleElement.parentNode === null) {\n    return false;\n  }\n\n  styleElement.parentNode.removeChild(styleElement);\n}\n/* istanbul ignore next  */\n\n\nfunction domAPI(options) {\n  var styleElement = options.insertStyleElement(options);\n  return {\n    update: function update(obj) {\n      apply(styleElement, options, obj);\n    },\n    remove: function remove() {\n      removeStyleElement(styleElement);\n    }\n  };\n}\n\nmodule.exports = domAPI;\n\n//# sourceURL=webpack://mars/./node_modules/style-loader/dist/runtime/styleDomAPI.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleTagTransform.js":
/*!*********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleTagTransform.js ***!
  \*********************************************************************/
/***/ ((module) => {

"use strict";
eval("\n\n/* istanbul ignore next  */\nfunction styleTagTransform(css, styleElement) {\n  if (styleElement.styleSheet) {\n    styleElement.styleSheet.cssText = css;\n  } else {\n    while (styleElement.firstChild) {\n      styleElement.removeChild(styleElement.firstChild);\n    }\n\n    styleElement.appendChild(document.createTextNode(css));\n  }\n}\n\nmodule.exports = styleTagTransform;\n\n//# sourceURL=webpack://mars/./node_modules/style-loader/dist/runtime/styleTagTransform.js?");

/***/ }),

/***/ "./src/client.js":
/*!***********************!*\
  !*** ./src/client.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __unused_webpack___webpack_exports__, __webpack_require__) => {

"use strict";
eval("/* harmony import */ var _style_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./style.css */ \"./src/style.css\");\n/* harmony import */ var _client_js_constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./client/js/constants */ \"./src/client/js/constants.js\");\n/* harmony import */ var _client_js_constants__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_client_js_constants__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _client_js_graphics__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./client/js/graphics */ \"./src/client/js/graphics.js\");\n/* harmony import */ var _client_js_game__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./client/js/game */ \"./src/client/js/game.js\");\n/* harmony import */ var _client_js_draw_tiles__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./client/js/draw-tiles */ \"./src/client/js/draw-tiles.js\");\n/* harmony import */ var _client_js_input__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./client/js/input */ \"./src/client/js/input.js\");\n/* harmony import */ var _client_js_io__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./client/js/io */ \"./src/client/js/io.js\");\n\n\n\n\n\n\n\n\n(function () {\n    /**\n     * Client module init\n     */\n    function init() {\n        (0,_client_js_io__WEBPACK_IMPORTED_MODULE_6__.bindIo)()        \n        ;(0,_client_js_graphics__WEBPACK_IMPORTED_MODULE_2__.initContext)()\n        ;(0,_client_js_draw_tiles__WEBPACK_IMPORTED_MODULE_4__.renderTiles)()\n        ;(0,_client_js_input__WEBPACK_IMPORTED_MODULE_5__[\"default\"])()\n        ;(0,_client_js_game__WEBPACK_IMPORTED_MODULE_3__.initLoop)()\n    }\n\n    window.addEventListener(\"load\", init, false);\n})();\n\n\n//# sourceURL=webpack://mars/./src/client.js?");

/***/ }),

/***/ "./src/client/js/constants.js":
/*!************************************!*\
  !*** ./src/client/js/constants.js ***!
  \************************************/
/***/ (() => {

eval("RED = \"#881f1a\"\nBLACK = \"#0f0b0b\"\ntilt = 0.43\nplanetScale = 0.4\n// speed = 0.2\nsolDuration = 60 * 1000 // 60 seconds\ninitialPhase = 0.0\n\nstatusRefreshDelay = 10\n\nphase = null;\n\n\n//# sourceURL=webpack://mars/./src/client/js/constants.js?");

/***/ }),

/***/ "./src/client/js/draw-planet.js":
/*!**************************************!*\
  !*** ./src/client/js/draw-planet.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"renderPlanet\": () => (/* binding */ renderPlanet),\n/* harmony export */   \"tick\": () => (/* binding */ tick),\n/* harmony export */   \"updatePlanetSize\": () => (/* binding */ updatePlanetSize)\n/* harmony export */ });\n/* unused harmony export planetSize */\n/* harmony import */ var _game__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./game */ \"./src/client/js/game.js\");\n/* harmony import */ var _graphics__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./graphics */ \"./src/client/js/graphics.js\");\n\n\n\nlet planetSize = planetScale * canvas.clientHeight\n\nconst updatePlanetSize = () => {\n  planetSize = planetScale * Math.min(canvas.width, canvas.height)\n}\n\nconst drawCircle = (x, y, radius) => {\n  _graphics__WEBPACK_IMPORTED_MODULE_1__.context.beginPath()\n  _graphics__WEBPACK_IMPORTED_MODULE_1__.context.arc(x, y, radius, 0,Math.PI * 2, true)\n}\n\nconst drawBase = (color) => {\n  _graphics__WEBPACK_IMPORTED_MODULE_1__.context.fillStyle = color\n  drawCircle(\n    canvas.width / 2,\n    canvas.height / 2,\n    planetSize\n  )\n  _graphics__WEBPACK_IMPORTED_MODULE_1__.context.fill()\n}\n\nconst drawRim = () => {\n  _graphics__WEBPACK_IMPORTED_MODULE_1__.context.strokeStyle = BLACK\n  drawCircle(\n    canvas.width / 2,\n    canvas.height / 2,\n    planetSize\n  )\n  _graphics__WEBPACK_IMPORTED_MODULE_1__.context.stroke()\n}\n\nconst halfCircle = (radius, start, end) => {\n  _graphics__WEBPACK_IMPORTED_MODULE_1__.context.beginPath()\n  _graphics__WEBPACK_IMPORTED_MODULE_1__.context.ellipse(\n    canvas.width / 2, // x\n    canvas.height / 2, // y\n    planetSize, // radius x\n    planetSize * radius, // radiux y\n    Math.PI / 2 + tilt, // rotation\n    Math.PI * end, // start angle\n    Math.PI * start // end angle\n  );\n  _graphics__WEBPACK_IMPORTED_MODULE_1__.context.fill()\n}\n\nconst drawShadow = (phase) => {\n  _graphics__WEBPACK_IMPORTED_MODULE_1__.context.beginPath()\n  if (phase < 0.25) {\n    drawBase(RED)\n    _graphics__WEBPACK_IMPORTED_MODULE_1__.context.fillStyle = BLACK\n    halfCircle(1.0, 0, 1)\n    _graphics__WEBPACK_IMPORTED_MODULE_1__.context.fillStyle = RED\n    halfCircle(1.0, 1, 0)\n    halfCircle((0.25 - phase) * 4, 0, 1) // right red shrinks\n  } else if (phase < 0.5) {\n    drawBase(BLACK)\n    _graphics__WEBPACK_IMPORTED_MODULE_1__.context.fillStyle = RED\n    halfCircle(1.0, 1, 0)\n    _graphics__WEBPACK_IMPORTED_MODULE_1__.context.fillStyle = BLACK\n    halfCircle(1.0, 0, 1)\n    halfCircle((phase - 0.25) * 4, 1, 0) // left black grows\n  } else if (phase < 0.75) {\n    drawBase(BLACK)\n    _graphics__WEBPACK_IMPORTED_MODULE_1__.context.fillStyle = RED\n    halfCircle(1.0, 0, 1)\n    _graphics__WEBPACK_IMPORTED_MODULE_1__.context.fillStyle = BLACK\n    halfCircle(1.0, 1, 0)\n    halfCircle((0.75 - phase) * 4, 0, 1) // right black shrinks\n  } else {\n    drawBase(RED)\n    _graphics__WEBPACK_IMPORTED_MODULE_1__.context.fillStyle = BLACK\n    halfCircle(1.0, 1, 0)\n    _graphics__WEBPACK_IMPORTED_MODULE_1__.context.fillStyle = RED\n    halfCircle(1.0, 0, 1)\n    halfCircle((phase - 0.75) * 4, 1, 0) // left red grows\n    _graphics__WEBPACK_IMPORTED_MODULE_1__.context.stroke()\n  }\n  _graphics__WEBPACK_IMPORTED_MODULE_1__.context.fill()\n}\n\nconst drawSun = (phase) => {\n  _graphics__WEBPACK_IMPORTED_MODULE_1__.context.fillStyle = \"white\"\n  const angle = phase * 4 - 1.5\n  if (angle < 1 && angle > 0) {\n    drawCircle(\n      canvas.width * angle,\n      canvas.height * (0.3 + 0.2 * ((angle - 0.5) ** 2)),\n      canvas.height * 0.01,\n    )\n    _graphics__WEBPACK_IMPORTED_MODULE_1__.context.fill()\n  }\n}\n\nconst tick = (dt) => {\n  phase += dt / solDuration\n  while (phase > 1) {\n    phase -= 1\n    ;(0,_game__WEBPACK_IMPORTED_MODULE_0__.updateSol)()\n  }\n}\n\nconst renderPlanet = () => {\n  _graphics__WEBPACK_IMPORTED_MODULE_1__.context.clearRect(0, 0, canvas.width, canvas.height);\n  drawSun(phase)\n  drawShadow(phase)\n  drawRim()\n}\n\n\n//# sourceURL=webpack://mars/./src/client/js/draw-planet.js?");

/***/ }),

/***/ "./src/client/js/draw-tiles.js":
/*!*************************************!*\
  !*** ./src/client/js/draw-tiles.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"renderTiles\": () => (/* binding */ renderTiles),\n/* harmony export */   \"updateTiles\": () => (/* binding */ updateTiles)\n/* harmony export */ });\nconst tiles = []\nconst rows = 13\n\nconst nightThreshold = 0.1\nconst dayThreshold = 0.1\nconst updateTiles = () => {\n  tiles.forEach((tile) => {\n    if (phase * 2 - nightThreshold > 1 - ((tile.col))) {\n      tile.$tile.classList.add('night')\n    }\n    if ((phase - 0.5) * 2 + dayThreshold >= 1 - ((tile.col))) {\n      tile.$tile.classList.remove('night')\n    }\n  })\n}\n\nconst renderTiles = () => {\n  let cols = Math.floor(rows / 2)\n  for(let row=0; row < rows; row++) {\n    const $group = document.createElement('div')\n    $group.className = 'row'\n    $group.dataset.n = String.fromCharCode(65 + row)\n    const colNum = (row === 0 || row === rows -1 || cols === 13 - 1) ? cols - 2 : cols\n    for(let col=0; col < colNum; col++) {\n      const $tile = document.createElement('div')\n      $tile.className = 'hex'\n      const id = `${String.fromCharCode(65 + row)}${col}`\n      $tile.dataset.n = id\n      $group.appendChild($tile)\n      tiles.push({\n        $tile,\n        id,\n        // A little math to adjust the day/night cycle of the tiles\n        col: (col + 2/colNum) / colNum, // + Math.random() * 0.1,\n      })\n    }\n    tileset.appendChild($group)\n    if (row >= Math.floor(rows / 2)) {\n      cols--\n    } else {\n      cols++\n    }\n  }\n}\n\n//# sourceURL=webpack://mars/./src/client/js/draw-tiles.js?");

/***/ }),

/***/ "./src/client/js/game.js":
/*!*******************************!*\
  !*** ./src/client/js/game.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"commsList\": () => (/* binding */ commsList),\n/* harmony export */   \"initLoop\": () => (/* binding */ initLoop),\n/* harmony export */   \"updateChat\": () => (/* binding */ updateChat),\n/* harmony export */   \"updateSol\": () => (/* binding */ updateSol),\n/* harmony export */   \"updateUsers\": () => (/* binding */ updateUsers),\n/* harmony export */   \"userList\": () => (/* binding */ userList)\n/* harmony export */ });\n/* harmony import */ var _graphics__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./graphics */ \"./src/client/js/graphics.js\");\n/* harmony import */ var _draw_planet__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./draw-planet */ \"./src/client/js/draw-planet.js\");\n/* harmony import */ var _draw_tiles__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./draw-tiles */ \"./src/client/js/draw-tiles.js\");\n\n\n\n\nlet userList = []\nlet commsList = []\nlet solCount = 0\n\nconst render = () => {\n  try {\n    ;(0,_draw_planet__WEBPACK_IMPORTED_MODULE_1__.renderPlanet)()\n  } catch (error) {\n    console.error(error)\n    emit('halt')\n  }\n}\n\nconst update = (dt) => {\n  ;(0,_draw_planet__WEBPACK_IMPORTED_MODULE_1__.tick)(dt)\n  ;(0,_draw_tiles__WEBPACK_IMPORTED_MODULE_2__.updateTiles)()\n\n  const time = Date.now()\n  requestAnimationFrame(() => update(Date.now() - time))\n}\n\nconst updateUsers = (users) => {\n  userList = users\n}\n\nconst updateChat = (user, msg) => {\n  commsList.push({user, msg})\n}\n\nconst updateSol = (currentSol) => {\n  if (currentSol) solCount = currentSol\n  else solCount += solDuration\n  _sol.dataset.count = Math.ceil(solCount / solDuration)\n}\n\nconst initLoop = () => {\n  if (phase === null) null\n\n  setInterval(e=>{\n    render()\n  }, 16) // 60FPS\n\n  requestAnimationFrame(() => {\n    update(0)\n  })\n}\n\n//# sourceURL=webpack://mars/./src/client/js/game.js?");

/***/ }),

/***/ "./src/client/js/graphics.js":
/*!***********************************!*\
  !*** ./src/client/js/graphics.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"context\": () => (/* binding */ context),\n/* harmony export */   \"initContext\": () => (/* binding */ initContext)\n/* harmony export */ });\n/* unused harmony export getCanvasCenter */\n/* harmony import */ var _draw_planet__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./draw-planet */ \"./src/client/js/draw-planet.js\");\n\n\nlet context\nconst initContext = () => {\n  context = canvas.getContext('2d')\n  canvas.width = innerWidth\n  canvas.height = innerHeight\n\n  ;(0,_draw_planet__WEBPACK_IMPORTED_MODULE_0__.updatePlanetSize)()\n\n  window.addEventListener('resize', () => {\n    canvas.width = innerWidth\n    canvas.height = innerHeight\n    ;(0,_draw_planet__WEBPACK_IMPORTED_MODULE_0__.updatePlanetSize)()\n  })\n}\n\nconst getCanvasCenter = () => {\n  return {\n    x: canvas.width / 2,\n    y: canvas.height / 2,\n  }\n}\n\n\n\n//# sourceURL=webpack://mars/./src/client/js/graphics.js?");

/***/ }),

/***/ "./src/client/js/input.js":
/*!********************************!*\
  !*** ./src/client/js/input.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _io__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./io */ \"./src/client/js/io.js\");\n/* harmony import */ var _ui__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ui */ \"./src/client/js/ui.js\");\n\n\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (() => {\n  document.addEventListener('keyup', ({target, key}) => {\n    if (key === 'Escape') {\n      (0,_ui__WEBPACK_IMPORTED_MODULE_1__.dismissDialog)()\n    }\n    if (key === 'Enter' && target === _input) {\n      if (target.value?.length > 0) {\n        (0,_io__WEBPACK_IMPORTED_MODULE_0__.sendMessage)(target.value)\n        target.value = ''\n      }\n    }\n  })\n\n  document.addEventListener('click', ({target}) => {\n    if(target?.dataset?.n) {\n      (0,_ui__WEBPACK_IMPORTED_MODULE_1__.showBuildDialog)(target)\n      return\n    }\n\n    const listener = ({\n      users: _ui__WEBPACK_IMPORTED_MODULE_1__.showUsers,\n      comms: _ui__WEBPACK_IMPORTED_MODULE_1__.showComms,\n      dismiss: ()=>{},\n    })[target.id]\n    if (listener) {\n      (0,_ui__WEBPACK_IMPORTED_MODULE_1__.dismissDialog)()\n      listener()\n    }\n\n  })\n});\n\n//# sourceURL=webpack://mars/./src/client/js/input.js?");

/***/ }),

/***/ "./src/client/js/io.js":
/*!*****************************!*\
  !*** ./src/client/js/io.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"bindIo\": () => (/* binding */ bindIo),\n/* harmony export */   \"buildAction\": () => (/* binding */ buildAction),\n/* harmony export */   \"sendMessage\": () => (/* binding */ sendMessage)\n/* harmony export */ });\n/* harmony import */ var _game__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./game */ \"./src/client/js/game.js\");\n/* harmony import */ var _ui__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ui */ \"./src/client/js/ui.js\");\n\n\n\nlet socket //Socket.IO client\n\n/**\n   * Binds Socket.IO and button events\n   */\nfunction bind() {\n  socket.on(\"start\", () => {\n  });\n\n  socket.on(\"disconnect\", () => {\n  });\n\n  socket.on(\"error\", () => {\n  });\n\n\n  socket.on(\"users\", (userList) => {\n    (0,_game__WEBPACK_IMPORTED_MODULE_0__.updateUsers)(userList)\n    users.dataset.count = userList.length\n  });\n\n  socket.on(\"msg\", ({user, msg}) => {\n    (0,_game__WEBPACK_IMPORTED_MODULE_0__.updateChat)(user, msg)\n    if (typeof _input !== 'undefined') {\n      (0,_ui__WEBPACK_IMPORTED_MODULE_1__.showComms)()\n    } else {\n      comms.dataset.new = true\n    }\n  });\n\n  socket.on(\"sol\", (solCount) => {\n    console.log(solCount, (solCount % solDuration) / solDuration);\n    phase = (solCount % solDuration) / solDuration\n    ;(0,_game__WEBPACK_IMPORTED_MODULE_0__.updateSol)(solCount)\n  });\n}\n\nconst bindIo = () => {\n  if (io) {\n    socket = io?.({ upgrade: false, transports: [\"websocket\"] });\n    bind();\n  }\n}\n\nconst sendMessage = msg => {\n  socket.emit('msg', msg)\n}\n\nconst buildAction = (id, choice) => {\n  return new Promise((resolve, reject) => {\n    socket.emit('build', { id, choice }, (response) => {\n      if (response.status = 'ok') {\n        resolve()\n      } else {\n        reject()\n      }\n    })\n  })\n}\n\n//# sourceURL=webpack://mars/./src/client/js/io.js?");

/***/ }),

/***/ "./src/client/js/ui.js":
/*!*****************************!*\
  !*** ./src/client/js/ui.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"dismissDialog\": () => (/* binding */ dismissDialog),\n/* harmony export */   \"showBuildDialog\": () => (/* binding */ showBuildDialog),\n/* harmony export */   \"showComms\": () => (/* binding */ showComms),\n/* harmony export */   \"showUsers\": () => (/* binding */ showUsers)\n/* harmony export */ });\n/* harmony import */ var _game__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./game */ \"./src/client/js/game.js\");\n/* harmony import */ var _io__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./io */ \"./src/client/js/io.js\");\n\n\n\nlet selectedTile\n\nconst buildingEmoji = [\n  ['greenhouse', 'Greenhouse', '🍀'],\n  ['minery', 'Minery', '🏭'],\n  ['solar', 'Solar Plant', '🪟'],\n  ['nuclear', 'Nuclear Plant', '☢️'],\n  ['housing', 'Housing', '🏢'],\n]\n\nfunction onBuildChoice ({target}) {\n  let choice\n  if (choice = buildingEmoji.find(c => c[0] === target.id)) {\n    document.body.removeEventListener('click', onBuildChoice)\n    ;(0,_io__WEBPACK_IMPORTED_MODULE_1__.buildAction)(choice)\n    .then(() => {\n      selectedTile.dataset.icon = choice[2]\n      _dialog.classList.remove('show')\n      selectedTile.classList.remove('selected')\n      selectedTile = null\n    })\n  }\n}\n\nconst dismissDialog = () => {\n  document.body.removeEventListener('click', onBuildChoice)\n  _dialog.classList.remove('show')\n  selectedTile?.classList.remove('selected')\n  selectedTile = null\n  _choices.innerHTML = ''\n}\n\nconst showBuildDialog = (target) => {\n  if (selectedTile) dismissDialog()\n\n  _prompt.innerText = 'Choose build'\n  _choices.innerHTML = `<ul>${\n    buildingEmoji.map(type => {\n    return `<li class=\"button\" id=\"${type[0]}\">${type[1]}</li>`\n  }).join('')\n  }</ul>`\n  _dialog.classList.add('show')\n  selectedTile = target\n  target.classList.add('selected')\n  _dialog.addEventListener('click', onBuildChoice)\n}\n\nconst showUsers = () => {\n  _prompt.innerText = 'Player List'\n  _choices.innerHTML = _game__WEBPACK_IMPORTED_MODULE_0__.userList.map(user => {\n    return `<li>${user}</li>`\n  }).join('')\n  _dialog.classList.add('show')\n}\n\nconst showComms = () => {\n  _choices.innerHTML = ''\n  const ul = _choices.appendChild(document.createElement('ul'))\n  ul.id = 'chatlist'\n  ul.innerHTML = _game__WEBPACK_IMPORTED_MODULE_0__.commsList.length > 0 ? _game__WEBPACK_IMPORTED_MODULE_0__.commsList.map(({user, msg}) => {\n    return `<li><b>${user}:</b> ${msg}</li>`\n  }).join('') : '<b>No messages</b>'\n  _choices.innerHTML += `<input maxlength=\"22\" id=\"_input\" />`\n  _dialog.classList.add('show')\n  _input.focus()\n  chatlist.scrollTo(0, chatlist.clientHeight)\n}\n\n//# sourceURL=webpack://mars/./src/client/js/ui.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/nonce */
/******/ 	(() => {
/******/ 		__webpack_require__.nc = undefined;
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/client.js");
/******/ 	
/******/ })()
;