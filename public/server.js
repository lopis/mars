/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/server.js":
/*!***********************!*\
  !*** ./src/server.js ***!
  \***********************/
/***/ ((module) => {

eval("\n\n/**\n * User sessions\n * @param {Array} users\n */\nconst users = [];\n\n/**\n * Find opponent for a user\n * @param {User} user\n */\nfunction findOpponent(user) {\n\tfor (let i = 0; i < users.length; i++) {\n\t\tif (\n\t\t\tuser !== users[i] &&\n\t\t\tusers[i].opponent === null\n\t\t) {\n\t\t\tnew Game(user, users[i]).start();\n\t\t}\n\t}\n}\n\n/**\n * Remove user session\n * @param {User} user\n */\nfunction removeUser(user) {\n\tusers.splice(users.indexOf(user), 1);\n}\n\n/**\n * Game class\n */\nclass Game {\n\n\t/**\n\t * @param {User} user1\n\t * @param {User} user2\n\t */\n\tconstructor(user1, user2) {\n\t\tthis.user1 = user1;\n\t\tthis.user2 = user2;\n\t}\n\n\t/**\n\t * Start new game\n\t */\n\tstart() {\n\t\tthis.user1.start(this, this.user2);\n\t\tthis.user2.start(this, this.user1);\n\t}\n\n\t/**\n\t * Is game ended\n\t * @return {boolean}\n\t */\n\tended() {\n\t\treturn this.user1.guess !== GUESS_NO && this.user2.guess !== GUESS_NO;\n\t}\n\n\t/**\n\t * Final score\n\t */\n\tscore() {\n\t\tif (\n\t\t\tthis.user1.guess === GUESS_ROCK && this.user2.guess === GUESS_SCISSORS ||\n\t\t\tthis.user1.guess === GUESS_PAPER && this.user2.guess === GUESS_ROCK ||\n\t\t\tthis.user1.guess === GUESS_SCISSORS && this.user2.guess === GUESS_PAPER\n\t\t) {\n\t\t\tthis.user1.win();\n\t\t\tthis.user2.lose();\n\t\t} else if (\n\t\t\tthis.user2.guess === GUESS_ROCK && this.user1.guess === GUESS_SCISSORS ||\n\t\t\tthis.user2.guess === GUESS_PAPER && this.user1.guess === GUESS_ROCK ||\n\t\t\tthis.user2.guess === GUESS_SCISSORS && this.user1.guess === GUESS_PAPER\n\t\t) {\n\t\t\tthis.user2.win();\n\t\t\tthis.user1.lose();\n\t\t} else {\n\t\t\tthis.user1.draw();\n\t\t\tthis.user2.draw();\n\t\t}\n\t}\n\n}\n\n/**\n * User session class\n */\nclass User {\n\n\t/**\n\t * @param {Socket} socket\n\t */\n\tconstructor(socket) {\n\t\tthis.socket = socket;\n\t\tthis.game = null;\n\t\tthis.opponent = null;\n\t\tthis.guess = GUESS_NO;\n\t}\n\n\t/**\n\t * Set guess value\n\t * @param {number} guess\n\t */\n\tsetGuess(guess) {\n\t\tif (\n\t\t\t!this.opponent ||\n\t\t\tguess <= GUESS_NO ||\n\t\t\tguess > GUESS_SCISSORS\n\t\t) {\n\t\t\treturn false;\n\t\t}\n\t\tthis.guess = guess;\n\t\treturn true;\n\t}\n\n\t/**\n\t * Start new game\n\t * @param {Game} game\n\t * @param {User} opponent\n\t */\n\tstart(game, opponent) {\n\t\tthis.game = game;\n\t\tthis.opponent = opponent;\n\t\tthis.guess = GUESS_NO;\n\t\tthis.socket.emit(\"start\");\n\t}\n\n\t/**\n\t * Terminate game\n\t */\n\tend() {\n\t\tthis.game = null;\n\t\tthis.opponent = null;\n\t\tthis.guess = GUESS_NO;\n\t\tthis.socket.emit(\"end\");\n\t}\n\n\t/**\n\t * Trigger win event\n\t */\n\twin() {\n\t\tthis.socket.emit(\"win\", this.opponent.guess);\n\t}\n\n\t/**\n\t * Trigger lose event\n\t */\n\tlose() {\n\t\tthis.socket.emit(\"lose\", this.opponent.guess);\n\t}\n\n\t/**\n\t * Trigger draw event\n\t */\n\tdraw() {\n\t\tthis.socket.emit(\"draw\", this.opponent.guess);\n\t}\n\n}\n\n/**\n * Socket.IO on connect event\n * @param {Socket} socket\n */\nmodule.exports = {\n\n\tio: (socket) => {\n\t\tconst user = new User(socket);\n\t\tusers.push(user);\n\t\tfindOpponent(user);\n\n\t\tsocket.on(\"disconnect\", () => {\n\t\t\tconsole.log(\"Disconnected: \" + socket.id);\n\t\t\tremoveUser(user);\n\t\t\tif (user.opponent) {\n\t\t\t\tuser.opponent.end();\n\t\t\t\tfindOpponent(user.opponent);\n\t\t\t}\n\t\t});\n\n\t\tsocket.on(\"guess\", (guess) => {\n\t\t\tconsole.log(\"Guess: \" + socket.id);\n\t\t\tif (user.setGuess(guess) && user.game.ended()) {\n\t\t\t\tuser.game.score();\n\t\t\t\tuser.game.start();\n\t\t\t\tstorage.get('games', 0).then(games => {\n\t\t\t\t\tstorage.set('games', games + 1);\n\t\t\t\t});\n\t\t\t}\n\t\t});\n\n\t\tconsole.log(\"Connected: \" + socket.id);\n\t},\n\n\tstat: (req, res) => {\n\t\tstorage.get('games', 0).then(games => {\n\t\t\tres.send(`<h1>Games played: ${games}</h1>`);\n\t\t});\n\t}\n\n};\n\n\n//# sourceURL=webpack://mars/./src/server.js?");

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
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/server.js");
/******/ 	
/******/ })()
;