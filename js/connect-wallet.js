import { footer } from "./modules.js"
import { burger } from "./modules.js"

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

const connectRight = document.querySelector('.connect__right'),
    connectLeft = document.querySelector('.connect__left'),
    connectLink = document.querySelectorAll('.connect__link'),
    closeLink = document.querySelector('.terms__button:nth-of-type(1)');

console.log(closeLink);

connectLink.forEach(element => {
    element.addEventListener('click', (e) => {
        connectRight.classList.toggle('active')
        connectLeft.classList.toggle('disable')
        e.preventDefault()

        closeLink.addEventListener('click', () => {
            connectRight.classList.remove('active')
            connectLeft.classList.remove('disable')
        })
    })
});

if (window.innerWidth <= 768) {
    footer()
    burger()
}