import './style.css'
import './client/js/data'
import { initContext } from './client/js/graphics'
import { initLoop, updateUsers } from './client/js/game'
import { renderTiles } from './client/js/draw-tiles'
import initInput from './client/js/input'
import { bindIo } from './client/js/io'

(function () {
    /**
     * Client module init
     */
    function init() {
        initContext()
        initInput()
        initLoop()
    }

    window.addEventListener("load", init, false);
})();
