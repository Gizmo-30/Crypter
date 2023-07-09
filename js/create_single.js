import { dropDown } from "./modules.js";
import { burger } from "./modules.js";
import { popUp } from "./modules.js";
import { footer } from "./modules.js";


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

const select = new dropDown({
    filter: ".dropDown",
    btn: ".dropDown__btn",
    options: ".dropDown__option",
})

if (window.innerWidth <= 1024) {
    const popUpLinks = document.querySelectorAll('.popUp__link');
    const preiviewClose = document.querySelectorAll('.close__btn');
    if (popUpLinks.length > 0) {
        popUpLinks.forEach(element => {
            element.addEventListener('click', (e) => {
                let popUpName = element.getAttribute('href')
                let popUp = document.getElementById(popUpName)


                popUp.classList.add('active')
                body.classList.add('lock')
                preiviewClose.forEach(element => {
                    element.addEventListener('click', () => {
                        popUp.classList.remove('active')
                        body.classList.remove('lock')
                    })
                });

                e.preventDefault()
            })
        });
    }
}

if (window.innerWidth <= 768) {
    burger()
    footer()
}
