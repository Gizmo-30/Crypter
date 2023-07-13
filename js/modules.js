

const modules = {
    dropDown: class Filter {
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
    },
    sliderMedia: class SliderMnBtns {
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
    },
    slider: class SliderMn {
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
    },
    activeClass: function addRemoveAcrive(array) {
        array.forEach(element => {
            element.addEventListener('click', (e) => {
                e.preventDefault()
                array.forEach(element => {
                    element.classList.remove('active')
                });
                element.classList.add('active')
            })
        });
    },
    footer: function footer() {
        const footerMedia = document.querySelector('.footer__start');
        const footerBtn = [...document.querySelectorAll('.footer__btn')]
        const footerDropDown = [...document.querySelectorAll('.footer__drowDown')]
        const footer = document.querySelectorAll('.footer')

        //
        // 

        if (window.innerWidth >= 600 && window.innerWidth <= 768) {
            footerMedia.classList.add('active')
        } else footerMedia.classList.remove('active')

        footerBtn.forEach(element => {
            element.addEventListener('click', () => {
                footerBtn.forEach(element => {
                    element.parentNode.classList.remove('active')
                });
                element.parentNode.classList.toggle('active')
            })
        });

        return
    },
    burger: function burger() {
        const burgerBtnOpen = document.querySelector('.burger__open'),
            burgerBtnCLose = document.querySelector('.burger__close'),
            body = document.querySelector('body'),
            header = document.querySelector('.header');

        burgerBtnOpen.addEventListener('click', () => {
            burgerBtnOpen.parentElement.classList.add('active')
            body.classList.add('lock')
            header.style = `blur(1rem)`

        })
        burgerBtnCLose.addEventListener('click', () => {
            burgerBtnCLose.parentElement.classList.remove('active')
            body.classList.remove('lock')
            header.style = `blur(0)`
        })

        return 
    },
    popUp: function popUp() {
        const popUpLinks = document.querySelectorAll('.popUp__link');
        const popUpAll = [...document.querySelectorAll('.popUp')];
        const body = document.querySelector('body');
        if (popUpLinks.length > 0) {
            popUpLinks.forEach(element => {
                element.addEventListener('click', (e) => {
                    popUpAll.forEach(element => {
                        element.classList.remove('active')
                        body.classList.remove('lock')
                    });
                    let popUpName = element.getAttribute('href')
                    console.log(element.getAttribute('href'));
                    const popUp = document.getElementById(popUpName)

                    // function

                    popUp.classList.add('active')
                    body.classList.add('lock')
                    popUp.addEventListener('click', (e) => {
                        if (!e.target.closest('.popUp__content') || e.target.classList.contains('popUp__close')) {
                            popUp.classList.remove('active')
                            body.classList.remove('lock')
                        }
                    })

                    e.preventDefault()
                })
            });
        }
    },

}

export const dropDown = modules.dropDown
export const sliderMedia = modules.sliderMedia
export const slider = modules.slider
export const activeClass = modules.activeClass
export const footer = modules.footer
export const burger = modules.burger
export const popUp = modules.popUp
