import { dropDown } from "./modules.js";
import { sliderMedia } from "./modules.js";
import { slider } from "./modules.js"
import { activeClass } from "./modules.js"
import { footer } from "./modules.js"
import { burger } from "./modules.js"
import { popUp } from "./modules.js"
import { firstSlider } from "./modules.js"

const body = document.querySelector('body')

let isMobile = {
    Android: function () { return navigator.userAgent.match(/Android/i); },
    BlackBerry: function () { return navigator.userAgent.match(/BlackBerry/i); },
    iOS: function () { return navigator.userAgent.match(/iPhone|iPad|iPod/i); },
    Opera: function () { return navigator.userAgent.match(/Opera Mini/i); },
    Windows: function () { return navigator.userAgent.match(/IEMobile/i); },
    any: function () { return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows()); }
};
if (isMobile.any()) {
    body.classList.add('_touch')
} else {
    body.classList.add('_screen')
}

firstSlider()



const section_3Slide = new sliderMedia({
    slider: '.popularItem__slider',
    track: '.popularItem__line',
    items: '.slider__item',
    btnPrev: '.popularItem__button-prev',
    btnNext: '.popularItem__button-next',
    slidesToShow: 4,
    media_1: 850,
    data_1: 3,
    media_2: 600,
    data_2: 2,
    media_3: 450,
    data_3: 1,
    gap: 32,
})


const section_4Slide = new slider({
    slider: '.section-4__slider',
    track: '.section-4__sliderTrack',
    items: '.slider-4__item',
    btnPrev: '.section-4__btn-prev',
    btnNext: '.section-4__btn-next',
    slidesToShow: 4,
    media_1: 1100,
    data_1: 3,
    media_2: 800,
    data_2: 2,
    media_3: 550,
    data_3: 1,
    gap: 32,
})

const section_5Slide = new sliderMedia({
    slider: '.section-5__slider',
    track: '.section-5__sliderTrack',
    items: '.slider-5__item',
    btnPrev: '.section-5__btn-prev',
    btnNext: '.section-5__btn-next',
    slidesToShow: 3,
    media_1: 1100,
    data_1: 2,
    media_2: 800,
    data_2: 2,
    media_3: 650,
    data_3: 1,
    gap: 32,
})

const section_3Filter = new dropDown({
    filter: '.popelarItem__filter',
    btn: '.popelarItem__filterBtn',
    options: '.filter__option',
})

const section_6Filter_1 = new dropDown({
    filter: '.filter-6',
    btn: '.filter-6__btn',
    options: '.filter-6__option',
})

const section_62Filter_1 = new dropDown({
    filter: '.discover-settings__filters-1 .filter-62',
    btn: '.discover-settings__filters-1 .filter-62__btn',
    options: '.discover-settings__filters-1 .filter-62__option',
})
const section_62Filter_2 = new dropDown({
    filter: '.discover-settings__filters-2 .filter-62',
    btn: '.discover-settings__filters-2 .filter-62__btn',
    options: '.discover-settings__filters-2 .filter-62__option',
})
const section_62Filter_3 = new dropDown({
    filter: '.discover-settings__filters-3 .filter-62',
    btn: '.discover-settings__filters-3 .filter-62__btn',
    options: '.discover-settings__filters-3 .filter-62__option',
})

if (window.innerWidth <= 600) {
    const slider = document.querySelector('.discover__slider'),
        track = slider.querySelector('.discover__track'),
        items = [...slider.querySelectorAll('.discover__card')],
        btnPrev = document.querySelector('.discoverSlider__button-prev'),
        btnNext = document.querySelector('.discoverSlider__button-next');


    let position = 0
    let slidesToShow = window.innerWidth >= 1
    let slidesToScroll = slidesToShow
    let itemsCount = items.length
    let gap = 16


    let itemWidth = Math.ceil((slider.clientWidth - gap * (slidesToShow - 1)) / slidesToShow);
    let movePosition = (slidesToScroll * itemWidth) + (slidesToScroll * gap);

    items.forEach(element => {
        element.style = `min-width: ${itemWidth}px;`
    });

    checkBtn()

    btnPrev.addEventListener('click', () => {
        let itemsLeft = Math.floor(Math.abs(position) / itemWidth)
        position += itemsLeft >= slidesToScroll ? movePosition : itemsLeft * itemWidth + itemsLeft * gap
        setPosition()
    })

    btnNext.addEventListener('click', () => {
        let itemsLeft = itemsCount - Math.round((Math.abs(position) + slidesToShow * itemWidth - slidesToShow * gap) / itemWidth);
        position -= itemsLeft >= slidesToScroll ? movePosition : itemsLeft * itemWidth + itemsLeft * gap
        setPosition()
    })

    function setPosition() {
        track.style = `transform: translateX(${position}px)`
        checkBtn()
    }

    function checkBtn() {
        if (position === 0) {
            btnPrev.classList.remove('active')
            btnPrev.setAttribute('disabled', '')
        } else {
            btnPrev.classList.add('active')
        }

        if (position <= - (itemsCount - slidesToShow) * itemWidth) {
            btnNext.classList.remove('active')
            btnNext.setAttribute('disabled', '')
        } else {
            btnNext.classList.add('active')
        }

    }
}

if (window.innerWidth <= 768) {
    const discoverSettingsStart = document.querySelector('.discover-settings__start'),
        categoriesData = [...document.querySelectorAll('.discover-settings__category')];
    let filterBlock = document.createElement('div')
    filterBlock.classList.add('filter-6', 'filter', 'filter-6-media')
    filterBlock.innerHTML = `
    <button class="filter-6__btn-media filter-6__btn filter__btn filter__text">${categoriesData[0].textContent}</button>
    <ul class="filter-6__popUp-media filter-6__popUp filter__popUp">
        <li class="filter-6__option-media filter-6__option filter__option filter__text active">${categoriesData[0].textContent}</li>
        <li class="filter-6__option-media filter-6__option filter__option filter__text">${categoriesData[1].textContent}</li>
        <li class="filter-6__option-media filter-6__option filter__option filter__text">${categoriesData[2].textContent}</li>
        <li class="filter-6__option-media filter-6__option filter__option filter__text">${categoriesData[3].textContent}</li>
        <li class="filter-6__option-media filter-6__option filter__option filter__text">${categoriesData[4].textContent}</li>
        <li class="filter-6__option-media filter-6__option filter__option filter__text">${categoriesData[5].textContent}</li>
    </ul>
`
    discoverSettingsStart.firstElementChild.after(filterBlock)

    const section_62Filter_media = new dropDown({
        filter: '.filter-6-media',
        btn: '.filter-6__btn-media',
        options: '.filter-6__option-media',
    })
}


if (body.classList.contains('_screen')) {
    const items = [...document.querySelectorAll('.popularItem__card')]
    items.forEach(element => {
        element.addEventListener('mouseover', () => {
            removeActive(items)
            element.addEventListener('mouseover', () => element.classList.add('active'))
        })
        element.addEventListener('mouseleave', () => {
            removeActive(items)
            element.addEventListener('mouseover', () => element.classList.remove('active'))
        })
    });
    function removeActive(array) {
        array.forEach(element => {
            element.classList.remove('active')
        });
    }
}


const categories = document.querySelectorAll('.discover-settings__category')
activeClass(categories)


const settingsButton = document.querySelector('.discover-settings__btn'),
    settingsBlock = document.querySelector('.discover__settings');


settingsButton.addEventListener('click', () => {
    settingsButton.classList.toggle('active')
    settingsBlock.classList.toggle('active')
})







if (window.innerWidth <= 768) {
    footer()
    burger()
    popUp()    

}



