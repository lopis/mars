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

/***/ "./src/client.js":
/*!***********************!*\
  !*** ./src/client.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __unused_webpack___webpack_exports__, __webpack_require__) => {

"use strict";
eval("/* harmony import */ var _client_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./client/index.js */ \"./src/client/index.js\");\n\n\n(function () {\n\n    let socket //Socket.IO client\n\n    /**\n     * Binds Socket.IO and button events\n     */\n    function bind() {\n        socket.on(\"start\", () => {\n        });\n\n        socket.on(\"disconnect\", () => {\n        });\n\n        socket.on(\"error\", () => {\n        });\n    }\n\n    /**\n     * Client module init\n     */\n    function init() {\n        socket = io({ upgrade: false, transports: [\"websocket\"] });\n        bind();\n        (0,_client_index_js__WEBPACK_IMPORTED_MODULE_0__.initGame)();\n    }\n\n    window.addEventListener(\"load\", init, false);\n\n})();\n\n\n//# sourceURL=webpack://mars/./src/client.js?");

/***/ }),

/***/ "./src/client/constants.js":
/*!*********************************!*\
  !*** ./src/client/constants.js ***!
  \*********************************/
/***/ (() => {

eval("RED = \"#881f1a\"\nBLACK = \"black\"\ntilt = 0.43\nplanetSize = 0.4\nspeed = 0.2\ninitialPhase = 0.1\n\ncanvasHeight = window.innerHeight\ncanvasWidth = window.innerWidth\n\nstatusRefreshDelay = 10\n\n//# sourceURL=webpack://mars/./src/client/constants.js?");

/***/ }),

/***/ "./src/client/index.js":
/*!*****************************!*\
  !*** ./src/client/index.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"initGame\": () => (/* binding */ initGame)\n/* harmony export */ });\n/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants */ \"./src/client/constants.js\");\n/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_constants__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _js_graphics__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./js/graphics */ \"./src/client/js/graphics.js\");\n/* harmony import */ var _js_game__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./js/game */ \"./src/client/js/game.js\");\n\n\n\n\nconst initGame = () => {\n  (0,_js_graphics__WEBPACK_IMPORTED_MODULE_1__.initContext)()\n  ;(0,_js_game__WEBPACK_IMPORTED_MODULE_2__.initLoop)()\n}\n\n//# sourceURL=webpack://mars/./src/client/index.js?");

/***/ }),

/***/ "./src/client/js/draw-planet.js":
/*!**************************************!*\
  !*** ./src/client/js/draw-planet.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"renderPlanet\": () => (/* binding */ renderPlanet),\n/* harmony export */   \"tick\": () => (/* binding */ tick)\n/* harmony export */ });\n/* harmony import */ var _graphics__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./graphics */ \"./src/client/js/graphics.js\");\n\n\nconst drawCircle = (x, y, radius) => {\n  _graphics__WEBPACK_IMPORTED_MODULE_0__.context.beginPath()\n  _graphics__WEBPACK_IMPORTED_MODULE_0__.context.arc(x, y, radius, 0,Math.PI * 2, true)\n}\n\nconst drawBase = (color) => {\n  _graphics__WEBPACK_IMPORTED_MODULE_0__.context.fillStyle = color\n  drawCircle(\n    canvas.width / 2,\n    canvas.height / 2,\n    canvas.height * planetSize\n  )\n  _graphics__WEBPACK_IMPORTED_MODULE_0__.context.fill()\n}\n\nconst drawRim = () => {\n  _graphics__WEBPACK_IMPORTED_MODULE_0__.context.strokeStyle = BLACK\n  drawCircle(\n    canvas.width / 2,\n    canvas.height / 2,\n    canvas.height * planetSize\n  )\n  _graphics__WEBPACK_IMPORTED_MODULE_0__.context.stroke()\n}\n\nconst halfCircle = (radius, start, end) => {\n  _graphics__WEBPACK_IMPORTED_MODULE_0__.context.beginPath()\n  _graphics__WEBPACK_IMPORTED_MODULE_0__.context.ellipse(\n    canvas.width / 2, // x\n    canvas.height / 2, // y\n    canvas.height * planetSize, // radius x\n    canvas.height * planetSize * radius, // radiux y\n    Math.PI / 2 + tilt, // rotation\n    Math.PI * end, // start angle\n    Math.PI * start // end angle\n  );\n  _graphics__WEBPACK_IMPORTED_MODULE_0__.context.fill()\n}\n\nconst drawShadow = (phase) => {\n  _graphics__WEBPACK_IMPORTED_MODULE_0__.context.beginPath()\n  if (phase < 0.25) {\n    drawBase(RED)\n    _graphics__WEBPACK_IMPORTED_MODULE_0__.context.fillStyle = BLACK\n    halfCircle(1.0, 0, 1)\n    _graphics__WEBPACK_IMPORTED_MODULE_0__.context.fillStyle = RED\n    halfCircle(1.0, 1, 0)\n    halfCircle((0.25 - phase) * 4, 0, 1) // right red shrinks\n  } else if (phase < 0.5) {\n    drawBase(BLACK)\n    _graphics__WEBPACK_IMPORTED_MODULE_0__.context.fillStyle = RED\n    halfCircle(1.0, 1, 0)\n    _graphics__WEBPACK_IMPORTED_MODULE_0__.context.fillStyle = BLACK\n    halfCircle(1.0, 0, 1)\n    halfCircle((phase - 0.25) * 4, 1, 0) // left black grows\n  } else if (phase < 0.75) {\n    drawBase(BLACK)\n    _graphics__WEBPACK_IMPORTED_MODULE_0__.context.fillStyle = RED\n    halfCircle(1.0, 0, 1)\n    _graphics__WEBPACK_IMPORTED_MODULE_0__.context.fillStyle = BLACK\n    halfCircle(1.0, 1, 0)\n    halfCircle((0.75 - phase) * 4, 0, 1) // right black shrinks\n  } else {\n    drawBase(RED)\n    _graphics__WEBPACK_IMPORTED_MODULE_0__.context.fillStyle = BLACK\n    halfCircle(1.0, 1, 0)\n    _graphics__WEBPACK_IMPORTED_MODULE_0__.context.fillStyle = RED\n    halfCircle(1.0, 0, 1)\n    halfCircle((phase - 0.75) * 4, 1, 0) // left red grows\n    _graphics__WEBPACK_IMPORTED_MODULE_0__.context.stroke()\n  }\n  _graphics__WEBPACK_IMPORTED_MODULE_0__.context.fill()\n}\n\nconst drawSun = (phase) => {\n  _graphics__WEBPACK_IMPORTED_MODULE_0__.context.fillStyle = \"white\"\n  const angle = phase * 4 - 1.5\n  if (angle < 1 && angle > 0) {\n    drawCircle(\n      canvas.width * angle,\n      canvas.height * (0.3 + 0.2 * ((angle - 0.5) ** 2)),\n      canvas.height * 0.01,\n    )\n    _graphics__WEBPACK_IMPORTED_MODULE_0__.context.fill()\n  }\n}\n\nlet phase = initialPhase;\nconst tick = () => {\n  phase += speed / 1000\n  while (phase > 1) phase -= 1\n}\n\nconst renderPlanet = () => {\n  _graphics__WEBPACK_IMPORTED_MODULE_0__.context.clearRect(0, 0, canvas.width, canvas.height);\n  drawSun(phase)\n  drawShadow(phase)\n  drawRim()\n}\n\n\n//# sourceURL=webpack://mars/./src/client/js/draw-planet.js?");

/***/ }),

/***/ "./src/client/js/game.js":
/*!*******************************!*\
  !*** ./src/client/js/game.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"initLoop\": () => (/* binding */ initLoop)\n/* harmony export */ });\n/* harmony import */ var _graphics__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./graphics */ \"./src/client/js/graphics.js\");\n/* harmony import */ var _draw_planet__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./draw-planet */ \"./src/client/js/draw-planet.js\");\n\n\n\n\nconst render = () => {\n  try {\n    (0,_draw_planet__WEBPACK_IMPORTED_MODULE_1__.renderPlanet)()\n  } catch (error) {\n    console.error(error)\n    emit('halt')\n  }\n}\n\nconst update = (dt) => {\n  ;(0,_draw_planet__WEBPACK_IMPORTED_MODULE_1__.tick)(dt)\n\n  const time = Date.now()\n  requestAnimationFrame(() => update(Date.now - time))\n}\n\nconst initLoop = () => {\n  setInterval(e=>{\n    canvas.width=innerWidth, canvas.height=innerHeight\n    render()\n  },16) // 60FPS\n\n  requestAnimationFrame(() => {\n    update(0)\n  })\n}\n\n//# sourceURL=webpack://mars/./src/client/js/game.js?");

/***/ }),

/***/ "./src/client/js/graphics.js":
/*!***********************************!*\
  !*** ./src/client/js/graphics.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"context\": () => (/* binding */ context),\n/* harmony export */   \"initContext\": () => (/* binding */ initContext)\n/* harmony export */ });\n/* unused harmony export getCanvasCenter */\nlet context\nconst initContext = () => {\n  context = canvas.getContext('2d')\n\n  canvas.height = canvasHeight\n  canvas.width = canvasWidth\n\n  window.addEventListener('resize', () => {\n    canvas.height = canvas.clientHeight\n    canvas.width = canvas.clientWidth\n  })\n}\n\nconst getCanvasCenter = () => {\n  return {\n    x: canvas.width / 2,\n    y: canvas.height / 2,\n  }\n}\n\n\n\n//# sourceURL=webpack://mars/./src/client/js/graphics.js?");

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
/******/ 			// no module.id needed
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
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/client.js");
/******/ 	
/******/ })()
;