
class Slider {
    constructor(obj) {
        this.slider = document.querySelector(obj.slider)
        this.sliderLine = this.slider.querySelector(obj.sliderLine)
        this.slides = [...this.sliderLine.children]
        this.next = this.slider.querySelector(obj.next)
        this.prev = this.slider.querySelector(obj.prev)

        this.width = this.slider.clientWidth
        this.height = this.slider.clientHeight
        this.dir = obj.direction.toUpperCase() == 'X' ? 'X' : 'Y'
        this.moveSize = this.dir === 'X' ? this.width : this.height

        this.activeSlide = 0

        this.sliderLine.style = `
            position: relative;
            height: ${this.height}px;
            overflow: hidden;
        `

        this.slides.forEach((element, index) => {
            element.style = `
                height: ${this.height}px;
                width: ${this.width}px;
                position: absolute;
            `
            if (index != this.activeSlide) {
                element.style.transform = `translate${this.dir}(${this.moveSize}px)`
            }

            if (index === this.slides.length - 1) {
                element.style.transform = `translate${this.dir}(-${this.moveSize}px)`
            }
        });

        let interval = setInterval(() => {
            this.move(this.next)
        }, 2500);

        this.slider.addEventListener('mouseover', () => {
            clearInterval(interval)
        })

        this.slider.addEventListener('mouseleave', () => {
            interval = setInterval(() => {
                this.move(this.next)
            }, 2500);
        })

        this.prev.addEventListener('click', () => this.move(this.prev))
        this.next.addEventListener('click', () => this.move(this.next))
    }

    move(btn) {
        console.log(btn);
        let btnLeftOrRight = btn == this.next ? this.moveSize * -1 : this.moveSize

        this.slides.forEach((element, index) => {
            element.style.transition = '0s'
            if (index != this.activeSlide) {
                element.style.transform = `translate${this.dir}(${btnLeftOrRight * -1}px)`
            }
        })

        this.slides[this.activeSlide].style.transform = `translate${this.dir}(${btnLeftOrRight}px)`
        this.slides[this.activeSlide].style.transition = '1s'

        if (btn === this.next) {
            this.activeSlide++
            if (this.activeSlide >= this.slides.length) {
                this.activeSlide = 0
            }
        } else if (btn == this.prev) {
            this.activeSlide--
            if (this.activeSlide < 0) {
                this.activeSlide = this.slides.length - 1
            }
        }

        this.slides[this.activeSlide].style.transform = `translate${this.dir}(0px)`
        this.slides[this.activeSlide].style.transition = '1s'

        this.prev.setAttribute('disabled', 'disabled')
        this.next.setAttribute('disabled', 'disabled')

        setTimeout(() => {
            this.prev.removeAttribute('disabled')
            this.next.removeAttribute('disabled')
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