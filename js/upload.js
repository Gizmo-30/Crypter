const body = document.querySelector('body')

import { footer } from "./modules.js";
import { burger } from "./modules.js";

if (window.innerWidth <= 768) {
    footer()
    burger()
}