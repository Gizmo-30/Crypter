
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


class SliderMnBtns {
    constructor(obj) {
        this.slider = document.querySelector(obj.slider),
            this.track = this.slider.querySelector(obj.track),
            this.items = [...this.slider.querySelectorAll(obj.items)],
            this.btnPrev = document.querySelectorAll(obj.btnPrev),
            this.btnNext = document.querySelectorAll(obj.btnNext);


        if (window.innerWidth <= obj.media_1) {
            this.track.setAttribute('data-slidesToShow', obj.data_1)
        } if (window.innerWidth <= obj.media_2) {
            this.track.setAttribute('data-slidesToShow', obj.data_2)
        } if (window.innerWidth <= obj.media_3) {
            this.track.setAttribute('data-slidesToShow', obj.data_3)
        }

        this.position = 0
        this.slidesToShow = window.innerWidth >= obj.media_1 ? obj.slidesToShow : this.track.getAttribute('data-slidesToShow')
        this.slidesToScroll = this.slidesToShow
        this.itemsCount = this.items.length
        this.gap = obj.gap

        this.itemWidth = Math.ceil((this.slider.clientWidth - this.gap * (this.slidesToShow - 1)) / this.slidesToShow);
        this.movePosition = (this.slidesToScroll * this.itemWidth) + (this.slidesToScroll * this.gap);

        this.items.forEach(element => {
            element.style = `min-width: ${this.itemWidth}px;`
        });

        this.checkBtn()

        this.btnPrev.forEach(element => {
            element.addEventListener('click', () => {
                this.itemsLeft = Math.floor(Math.abs(this.position) / this.itemWidth)
                this.position += this.itemsLeft >= this.slidesToScroll ? this.movePosition : this.itemsLeft * this.itemWidth + this.itemsLeft * this.gap
                this.setPosition()
            })
        });

        this.btnNext.forEach(element => {
            element.addEventListener('click', () => {
                this.itemsLeft = this.itemsCount - Math.round((Math.abs(this.position) + this.slidesToShow * this.itemWidth - this.slidesToShow * this.gap) / this.itemWidth);
                console.log(this.itemsLeft);
                this.position -= this.itemsLeft >= this.slidesToScroll ? this.movePosition : this.itemsLeft * this.itemWidth + this.itemsLeft * this.gap
                console.log(this.position);
                this.setPosition()
            })
        });

    }

    setPosition() {
        this.track.style = `transform: translateX(${this.position}px)`
        this.checkBtn()
    }

    checkBtn() {
        this.btnPrev.forEach(element => {
            element.disabled = this.position === 0
        });
        this.btnNext.forEach(element => {
            element.disabled = this.position <= - (this.itemsCount - this.slidesToShow) * this.itemWidth
        });


        this.btnPrev.forEach(element => {
            if (this.position === 0) {
                element.classList.remove('active')
            } else {
                element.classList.add('active')
            }
        });

        this.btnNext.forEach(element => {
            if (this.position <= - (this.itemsCount - this.slidesToShow) * this.itemWidth) {
                element.classList.remove('active')
            } else {
                element.classList.add('active')
            }
        });

    }
}
const section_3Slide = new SliderMnBtns({
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

class SliderMn {
    constructor(obj) {
        this.slider = document.querySelector(obj.slider),
            this.track = this.slider.querySelector(obj.track),
            this.items = [...this.slider.querySelectorAll(obj.items)],
            this.btnPrev = document.querySelector(obj.btnPrev),
            this.btnNext = document.querySelector(obj.btnNext);


        if (window.innerWidth <= obj.media_1) {
            this.track.setAttribute('data-slidesToShow', obj.data_1)
        } if (window.innerWidth <= obj.media_2) {
            this.track.setAttribute('data-slidesToShow', obj.data_2)
        } if (window.innerWidth <= obj.media_3) {
            this.track.setAttribute('data-slidesToShow', obj.data_3)
        }
        this.position = 0
        this.slidesToShow = window.innerWidth >= obj.media_1 ? obj.slidesToShow : this.track.getAttribute('data-slidesToShow')
        this.slidesToScroll = this.slidesToShow
        this.itemsCount = this.items.length
        this.gap = obj.gap

        this.itemWidth = Math.ceil((this.slider.clientWidth - this.gap * (this.slidesToShow - 1)) / this.slidesToShow);
        this.movePosition = (this.slidesToScroll * this.itemWidth) + (this.slidesToScroll * this.gap);

        this.items.forEach(element => {
            element.style = `min-width: ${this.itemWidth}px;`
        });

        this.checkBtn()

        this.btnPrev.addEventListener('click', () => {
            this.itemsLeft = Math.floor(Math.abs(this.position) / this.itemWidth)
            this.position += this.itemsLeft >= this.slidesToScroll ? this.movePosition : this.itemsLeft * this.itemWidth + this.itemsLeft * this.gap
            this.setPosition()
        })

        this.btnNext.addEventListener('click', () => {
            this.itemsLeft = this.itemsCount - Math.floor((Math.abs(this.position) + this.slidesToShow * this.itemWidth - this.slidesToShow * this.gap) / this.itemWidth);
            this.position -= this.itemsLeft >= this.slidesToScroll ? this.movePosition : this.itemsLeft * this.itemWidth + this.itemsLeft * this.gap
            this.setPosition()
        })
    }

    setPosition() {
        this.track.style = `transform: translateX(${this.position}px)`
        this.checkBtn()
    }

    checkBtn() {
        this.btnPrev.disabled = this.position === 0
        this.btnNext.disabled = this.position <= - (this.itemsCount - this.slidesToShow) * this.itemWidth

        if (this.position === 0) {
            this.btnPrev.classList.remove('active')
        } else {
            this.btnPrev.classList.add('active')
        }

        if (this.position <= - (this.itemsCount - this.slidesToShow) * this.itemWidth) {
            this.btnNext.classList.remove('active')
        } else {
            this.btnNext.classList.add('active')
        }
    }
}

const section_4Slide = new SliderMn({
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

const section_5Slide = new SliderMnBtns({
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

// const section_6Slide = new SliderMn({
//     slider: '.discover__slider',
//     track: '.discover__track',
//     items: '.discover__card',
//     btnPrev: '.discoverSlider__button-prev',
//     btnNext: '.discoverSlider__button-next',
//     slidesToShow: 3,
//     media_1: 1100,
//     data_1: 2,
//     media_2: 600,
//     data_2: 2,
//     media_3: 500,
//     data_3: 1,
//     gap: 32,
// })

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
            console.log(itemsLeft);
            console.log(position);
            setPosition()
        })
        
        btnNext.addEventListener('click', () => {
            let itemsLeft = itemsCount - Math.round((Math.abs(position) + slidesToShow * itemWidth - slidesToShow * gap) / itemWidth);
            position -= itemsLeft >= slidesToScroll ? movePosition : itemsLeft * itemWidth + itemsLeft * gap
            console.log(itemsLeft);
            console.log(position);
            setPosition()
        })

    function setPosition() {
        track.style = `transform: translateX(${position}px)`
        checkBtn()
    }

    function checkBtn() {
        if (position === 0) {
            btnPrev.classList.remove('active')
            btnPrev.setAttribute('disabled','')
        } else {
            btnPrev.classList.add('active')
        }
        
        if (position <= - (itemsCount - slidesToShow) * itemWidth) {
            btnNext.classList.remove('active')
            btnNext.setAttribute('disabled','')
        } else {
            btnNext.classList.add('active')
        }

    }
}


    
class Filter {
    constructor(obj) {
        this.filter = document.querySelector(obj.filter),
        this.btn = document.querySelector(obj.btn),
        this.options = document.querySelectorAll(obj.options);
        
        
        this.btn.addEventListener('click', () => {
            this.filter.classList.toggle('active')
            window.addEventListener('click', (e) => {
                this.options.forEach(element => {
                    if (e.target == element) {
                        this.options.forEach(element => {
                            element.classList.remove('active')
                        });
                        e.target.classList.add('active')
                        this.btn.innerHTML = e.target.innerHTML
                        this.filter.classList.remove('active')
                    } else if (e.target != this.btn) {
                        this.filter.classList.remove('active')
                    }
                });
            })
        })
    }
}

const section_3Filter = new Filter({
    filter: '.popelarItem__filter',
    btn: '.popelarItem__filterBtn',
    options: '.filter__option',
})

const section_6Filter_1 = new Filter({
    filter: '.filter-6',
    btn: '.filter-6__btn',
    options: '.filter-6__option',
})

const section_62Filter_1 = new Filter({
    filter: '.discover-settings__filters-1 .filter-62',
    btn: '.discover-settings__filters-1 .filter-62__btn',
    options: '.discover-settings__filters-1 .filter-62__option',
})
const section_62Filter_2 = new Filter({
    filter: '.discover-settings__filters-2 .filter-62',
    btn: '.discover-settings__filters-2 .filter-62__btn',
    options: '.discover-settings__filters-2 .filter-62__option',
})
const section_62Filter_3 = new Filter({
    filter: '.discover-settings__filters-3 .filter-62',
    btn: '.discover-settings__filters-3 .filter-62__btn',
    options: '.discover-settings__filters-3 .filter-62__option',
})

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
const categoriesBlock = document.querySelector('.discover-settings__categories');

if (window.innerWidth > 768) {
    filterBlock.style.display = 'none'
} else {
    filterBlock.style.display = 'flex'
}


const section_62Filter_media= new Filter({
    filter: '.filter-6-media',
    btn: '.filter-6__btn-media',
    options: '.filter-6__option-media',
})

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


function addRemoveAcrive(array) {
    array.forEach(element => {
        element.addEventListener('click', (e) => {
            e.preventDefault()
            array.forEach(element => {
                element.classList.remove('active')
            });
            element.classList.add('active')
        })
    });
}

const categories = document.querySelectorAll('.discover-settings__category')
addRemoveAcrive(categories)




const settingsButton = document.querySelector('.discover-settings__btn'),
    settingsBlock = document.querySelector('.discover__settings');


settingsButton.addEventListener('click', () => {
    settingsButton.classList.toggle('active')
    settingsBlock.classList.toggle('active')
})


const popUpLinks = document.querySelectorAll('.popUp__link');

let unlockPopup = true
let timeOut = 3000

if (popUpLinks.length > 0) {
    popUpLinks.forEach(element => {
        element.addEventListener('click', (e) => {
            let popUpName = element.getAttribute('href')
            const popUp = document.querySelector(popUpName)
            popUpOpen(popUp)
            e.preventDefault()
        })
    });
}

function popUpOpen(item) {
    item.classList.add('active')
    unlock = false
    setTimeout(() => {
        unlock = true
    }, timeOut);

    body.classList.add('lock')
    item.addEventListener('click', (e) => {
        if (!e.target.closest('.popUp__content')) {
            item.classList.remove('active')
            setTimeout(() => {
               body.classList.remove('lock') 
            }, timeOut);
        }
    })
}

 