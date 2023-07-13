
import { footer } from "./modules.js";
import { burger } from "./modules.js";
import { activeClass } from "./modules.js";
import { popUp } from "./modules.js";

let isMobile = {
    Android: function () { return navigator.userAgent.match(/Android/i); },
    BlackBerry: function () { return navigator.userAgent.match(/BlackBerry/i); },
    iOS: function () { return navigator.userAgent.match(/iPhone|iPad|iPod/i); },
    Opera: function () { return navigator.userAgent.match(/Opera Mini/i); },
    Windows: function () { return navigator.userAgent.match(/IEMobile/i); },
    any: function () { return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows()); }
};

let body = document.querySelector('body')
if (isMobile.any()) {
    body.classList.add('_touch')
} else {
    body.classList.add('_screen')
}


if (window.innerWidth <= 768) {
    burger()
    footer()
}

popUp()

const viewType = document.querySelectorAll('.view__type');

activeClass(viewType)