import './style.css'
import './client/js/data'
import { initContext } from './client/js/graphics'
import { initLoop } from './client/js/game'
import initInput from './client/js/input'

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
