
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







const slider = document.querySelector('.popularItem__slider'),
    track = slider.querySelector('.popularItem__line'), 
    items = [...slider.querySelectorAll('.slider__item')],
    btnPrev = [...document.querySelectorAll('.popularItem__button-prev')],
    btnNext = [...document.querySelectorAll('.popularItem__button-next')];

if (window.innerWidth <= 850) {
    track.setAttribute('data-slidesToShow', 3)
} if (window.innerWidth <= 600) {
    track.setAttribute('data-slidesToShow', 2)
} if (window.innerWidth <= 450) {
    track.setAttribute('data-slidesToShow', 1)
}
position = 0
slidesToShow = window.innerWidth >= 850 ? 4 : track.getAttribute('data-slidesToShow')
slidesToScroll = slidesToShow
itemsCount = items.length
gap = 32

itemWidth = Math.ceil((slider.clientWidth - gap * (slidesToShow - 1)) / slidesToShow);
movePosition = (slidesToScroll * itemWidth) + (slidesToScroll * gap);

items.forEach(element => {
    element.style = `min-width: ${itemWidth}px;`
});

// window.addEventListener('resize', () => {
//     window.location.reload()
// })

checkBtn()

btnPrev.forEach(element => {
    element.addEventListener('click', () => {
        itemsLeft = Math.floor(Math.abs(position) / itemWidth)
        position += itemsLeft >= slidesToScroll ? movePosition : itemsLeft * itemWidth + itemsLeft * gap
        setPosition()
    })
});


btnNext.forEach(element => {
    element.addEventListener('click', () => {
        itemsLeft = itemsCount - Math.floor((Math.abs(position) + slidesToShow * itemWidth - slidesToShow * gap) / itemWidth);
        position -= itemsLeft >= slidesToScroll ? movePosition : itemsLeft * itemWidth + itemsLeft * gap
        setPosition()
    })
    
});

function setPosition() {
    track.style = `transform: translateX(${position}px)`
    checkBtn()
}

function checkBtn() {
    btnPrev.disabled = position === 0
    btnNext.disabled = position <= - (itemsCount - slidesToShow) * itemWidth

    btnPrev.forEach(element => {
        if (position === 0) {
            element.classList.remove('active')
        } else {
            element.classList.add('active')
        }
    });
    
    btnNext.forEach(element => {
        if (position <= - (itemsCount - slidesToShow) * itemWidth) {
            element.classList.remove('active')
        } else {
            element.classList.add('active')
        }
    });

}



// class SliderMn {
//     constructor(obj) {
//         slider = document.querySelector(obj.slider),
//         track = slider.querySelector(obj.track),
//         items = [...slider.querySelectorAll(obj.items)],
//         btnPrev = document.querySelector(obj.btnPrev),
//         btnNext = document.querySelector(obj.btnNext);

//         if (window.innerWidth <= obj.media_1) {
//             track.setAttribute('data-slidesToShow',obj.data_1)
//         } if (window.innerWidth <= obj.media_2) {
//             track.setAttribute('data-slidesToShow',obj.data_2)
//         } if (window.innerWidth <= obj.media_3) {
//             track.setAttribute('data-slidesToShow',obj.data_3)
//         }
//         position = 0
//         slidesToShow = window.innerWidth >= media1 ? obj.slidesToShow : track.getAttribute('data-slidesToShow')
//         slidesToScroll = obj.slidesToScroll 
//         itemsCount = items.length
//         gap = obj.gap

//         itemWidth = Math.ceil((slider.clientWidth - gap * (slidesToShow - 1)) / slidesToShow);
//         movePosition = (slidesToScroll * itemWidth) + (slidesToScroll * gap);

//         items.forEach(element => {
//             element.style = `min-width: ${itemWidth}px;`
//         });

//         checkBtn()

//         btnPrev.addEventListener('click', () => {
//             itemsLeft = Math.floor(Math.abs(position) / itemWidth)
//             position += itemsLeft >= slidesToScroll ? movePosition : itemsLeft * itemWidth + itemsLeft * gap
//             setPosition()
//         })

//         btnNext.addEventListener('click', () => {
//             itemsLeft = itemsCount - Math.floor((Math.abs(position) + slidesToShow * itemWidth - slidesToShow * gap) / itemWidth);
//             position -= itemsLeft >= slidesToScroll ? movePosition : itemsLeft * itemWidth + itemsLeft * gap
//             setPosition()
//         })
//     }

//     setPosition() {
//         track.style = `transform: translateX(${position}px)`
//         checkBtn()
//     }

//     checkBtn() {
//         btnPrev.disabled = position === 0
//         btnNext.disabled = position <= - (itemsCount - slidesToShow) * itemWidth

//         if (position === 0) {
//             btnPrev.classList.remove('active')
//         } else {
//             btnPrev.classList.add('active')
//         }

//         if (position <= - (itemsCount - slidesToShow) * itemWidth) {
//             btnNext.classList.remove('active')
//         } else {
//             btnNext.classList.add('active')
//         }
//     }
// }

// const section_3Slide = new SliderMn({
//     slider: '.popularItem__slider',
//     track: '.popularItem__line',
//     items: '.slider__item',
//     btnPrev: '.popularItem__button-prev',
//     btnNext: '.popularItem__button-next',
//     slidesToScroll: 1,
//     slidesToShow: 4,
//     media_1: 850,
//     data_1: 3,
//     media_2: 600,
//     data_2: 2,
//     media_3: 450,
//     data_3: 1,
//     gap: 32,
// })



// const slider = document.querySelector('.popularItem__slider'),
//     track = document.querySelector('.slider__line'),
//     item = slider.querySelectorAll('.slider__item'),
//     btnPrev = document.querySelector('.slider__button-prev'),
//     btnNext = document.querySelector('.slider__button-next');
    


// let position = 0;
// // const slidesToShow = window.innerWidth <= 1024 ? 1 : 4;
// const slidesToShow = 1;
// const slidesToScroll = 1;
// const itemsCount = item.length;
// const gap = 32
// const itemWidth = Math.ceil((slider.clientWidth - gap * (slidesToShow - 1)) / slidesToShow);
// // const itemWidth = slider.clientWidth / slidesToShow;
// // const movePosition = slidesToScroll * itemWidth;
// const movePosition = (slidesToScroll * itemWidth) + (slidesToScroll * gap);
// // const movePosition = slidesToScroll * itemWidth;
// // console.log(movePosition);

// item.forEach(element => {
//     element.style = `min-width: ${itemWidth}px;`
// });

// btnPrev.addEventListener('click', () => {  
//     const itemsLeft = Math.floor((Math.abs(position) / itemWidth))
//     position += itemsLeft >= slidesToScroll ? movePosition : itemsLeft * itemWidth + itemsLeft * gap
//     setPosition()
// })

// btnNext.addEventListener('click', () => {
//     // const itemsLeft = itemsCount - (Math.abs(position) + slidesToShow * itemWidth + (slidesToShow * gap)) / itemWidth;
//     // const itemsLeft = itemsCount - (Math.abs(position) + slidesToShow * itemWidth + slidesToShow * gap) / itemWidth;
//     const itemsLeft = itemsCount - Math.floor((Math.abs(position) + slidesToShow * itemWidth - slidesToShow * gap) / itemWidth);

//     // console.log(Math.abs(itemsCount));
//     // console.log(Math.abs(position));
//     // console.log(Math.abs(slidesToShow));
//     // console.log(Math.abs(itemWidth));
//     // console.log(Math.abs((slidesToShow * gap)));
//     // console.log(Math.abs((slidesToShow * itemWidth)));
//     // console.log(itemsCount - (Math.abs(position) + slidesToShow * itemWidth + (slidesToShow * gap)));
//     // console.log(itemsLeft);

//     position -= itemsLeft >= slidesToScroll ? movePosition : itemsLeft * itemWidth + itemsLeft * gap
//     // position -= movePosition 
//     setPosition()
// })

// function setPosition() {
//     track.style = `transform: translateX(${position}px)`
//     checkBtn()
// }

// function checkBtn() {
//     btnPrev.disabled = position === 0
//     btnNext.disabled = position <= - (itemsCount - slidesToShow) * itemWidth
    
//     if (position === 0) {
//         btnPrev.classList.remove('active') 
//     } else {
//         btnPrev.classList.add('active')
//     }
    
//     if (position <= - (itemsCount - slidesToShow) * itemWidth) {
//         btnNext.classList.remove('active') 
//     } else {
//         btnNext.classList.add('active') 
//     }
// }

// checkBtn()



