import { initGame } from './client/index.js'
import './style.css';

(function () {

    let socket //Socket.IO client

    /**
     * Binds Socket.IO and button events
     */
    function bind() {
        socket.on("start", () => {
        });

        socket.on("disconnect", () => {
        });

        socket.on("error", () => {
        });
    }

    /**
     * Client module init
     */
    function init() {
        socket = io({ upgrade: false, transports: ["websocket"] });
        bind();
        initGame();
    }

    window.addEventListener("load", init, false);

})();
