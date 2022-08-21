import './style.css'
import './client/js/constants'
import { initContext } from './client/js/graphics'
import { initLoop } from './client/js/game'
import { renderTiles } from './client/js/draw-tiles'
import initInput from './client/js/input'

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


        socket.on("users", (users) => {
            console.log(users);
        });
    }

    /**
     * Client module init
     */
    function init() {
        if (typeof io != "undefined") {
            socket = io({ upgrade: false, transports: ["websocket"] });
            bind();
        }
        
        initContext()
        renderTiles()
        initInput()
        initLoop()
    }

    window.addEventListener("load", init, false);

})();
