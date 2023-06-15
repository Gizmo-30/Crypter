
class Slider {
    constructor(obj) {
        slider = document.querySelector(obj.slider)
        sliderLine = slider.querySelector(obj.sliderLine)
        slides = [...sliderLine.children]
        next = slider.querySelector(obj.next)
        prev = slider.querySelector(obj.prev)

        width = slider.clientWidth
        height = slider.clientHeight
        dir = obj.direction.toUpperCase() == 'X' ? 'X' : 'Y'
        moveSize = dir === 'X' ? width : height

        activeSlide = 0

        sliderLine.style = `
            position: relative;
            height: ${height}px;
            overflow: hidden;
        `

        slides.forEach((element, index) => {
            element.style = `
                height: ${height}px;
                width: ${width}px;
                position: absolute;
            `
            if (index != activeSlide) {
                element.style.transform = `translate${dir}(${moveSize}px)`
            }

            if (index === slides.length - 1) {
                element.style.transform = `translate${dir}(-${moveSize}px)`
            }
        });

        let interval = setInterval(() => {
            move(next)
        }, 2500);

        slider.addEventListener('mouseover', () => {
            clearInterval(interval)
        })

        slider.addEventListener('mouseleave', () => {
            interval = setInterval(() => {
                move(next)
            }, 2500);
        })

        prev.addEventListener('click', () => move(prev))
        next.addEventListener('click', () => move(next))
    }

    move(btn) {
        console.log(btn);
        let btnLeftOrRight = btn == next ? moveSize * -1 : moveSize

        slides.forEach((element, index) => {
            element.style.transition = '0s'
            if (index != activeSlide) {
                element.style.transform = `translate${dir}(${btnLeftOrRight * -1}px)`
            }
        })

        slides[activeSlide].style.transform = `translate${dir}(${btnLeftOrRight}px)`
        slides[activeSlide].style.transition = '1s'

        if (btn === next) {
            activeSlide++
            if (activeSlide >= slides.length) {
                activeSlide = 0
            }
        } else if (btn == prev) {
            activeSlide--
            if (activeSlide < 0) {
                activeSlide = slides.length - 1
            }
        }

        slides[activeSlide].style.transform = `translate${dir}(0px)`
        slides[activeSlide].style.transition = '1s'

        prev.setAttribute('disabled', 'disabled')
        next.setAttribute('disabled', 'disabled')

        setTimeout(() => {
            prev.removeAttribute('disabled')
            next.removeAttribute('disabled')
        }, 1200);

    }
}

// const slider = new Slider({
//     slider: '.section-1__slider',
//     sliderLine: '.section-1__sliderLine',
//     next: '.section-1__ctrl-right',
//     prev: '.section-1__ctrl-left',
//     direction: 'X'
// })

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

const filter = document.querySelector('.filter'),
    filterBtn = filter.querySelector('.filter__btn'),
    filterOptions = filter.querySelectorAll('.filter__option');



filterBtn.addEventListener('click', () => {
    filter.classList.toggle('active')
    window.addEventListener('click', (e) => {
        filterOptions.forEach(element => {
            if (e.target == element) {
                filterOptions.forEach(element => {
                    element.classList.remove('active')
                });
                e.target.classList.add('active')
                filterBtn.innerHTML = e.target.innerHTML
                filter.classList.remove('active')
            } else if (e.target != filterBtn) {
                filter.classList.remove('active')
            }
        });
    })
})


// const sliderLine = document.querySelector('.popularItem__line');

// const sliderItem = document.createElement('div')
// sliderItem.classList.add('popularItem__card', 'slider__item', 'card-3')

// sliderItem.innerHTML = `
//     <div class="card-3__start">
//         <div class="card-3__place">
//             <img src="img/icons/cup.svg" alt="image">
//             #1
//         </div>
//         <div class="card-3__links">
//             <button class="card-3__subscribe"></button>
//             <a href="#" class="card-3__goToSeller"></a>
//         </div>
//     </div>
//     <hr class="devider">
//     <div class="card-3__end">
//         <div class="card-3__img">
//             <img src="img/avatars/avatarBg-large.png" alt="" class="avatar">
//             <span class="card-3__premiumIcon"></span>
//         </div>
//         <h3 class="card-3__name">Payton Harris</h3>
//         <h5 class="card-3__earning section__text-1">2.456<span>eth</span></h5>
//     </div>
// `    
// let arr = []
// for (let index = 0; index < 10; index++) {
//     arr.push(sliderItem)
// }
// console.log(arr);
// for (let index = 0; index < 10; index++) {
//     sliderLine.appendChild(arr[index])
// }








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
                this.itemsLeft = this.itemsCount - Math.ceil((Math.abs(this.position) + this.slidesToShow * this.itemWidth - this.slidesToShow * this.gap) / this.itemWidth);
                this.position -= this.itemsLeft >= this.slidesToScroll ? this.movePosition : this.itemsLeft * this.itemWidth + this.itemsLeft * this.gap
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







