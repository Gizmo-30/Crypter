

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
    firstSlider: function firstSlider() {
        const video = document.querySelectorAll('.section-1__video'),
            videoBlock = document.querySelector('.section-1__slider'),
            videoTrack = document.querySelector('.section-1__videoBlock'),
            price = document.querySelector('.section-1__price.section-1__text'),
            currentBid = document.querySelector('.section-1__bid'),
            bidDollar = document.querySelector('.section-1__bidDollar'),
            hour = document.querySelector('.section-1__auctionEnding-time.hour'),
            minute = document.querySelector('.section-1__auctionEnding-time.minute'),
            second = document.querySelector('.section-1__auctionEnding-time.second'),
            btnPrev1 = document.querySelector('.section-1__ctrl-left'),
            btnNext1 = document.querySelector('.section-1__ctrl-right');


        const sliderData = {
            '0': {
                img: 'img/image-05.png',
                name: 'Enrico Cole',
                price: '3.5 ETH',
                bid: '1.00 ETH',
                bidDollar: '$3,618.36',
                hour: 19,
                minute: 24,
                second: 19,
            },
            '1': {
                img: 'img/image-03.png',
                name: 'Anita Bins',
                price: '2.2 ETH',
                bid: '9.00 ETH',
                bidDollar: '$23,618.36',
                hour: 3,
                minute: 33,
                second: 9,
            },
            '2': {
                img: 'img/image-04.png',
                name: 'Joana Wuckert',
                price: '7 ETH',
                bid: '11.00 ETH',
                bidDollar: '$9,618.36',
                hour: 72,
                minute: 0,
                second: 0,
            },
            '3': {
                img: 'img/image-02.png',
                name: 'Lorena Ledner',
                price: '0.8 ETH',
                bid: '5.00 ETH',
                bidDollar: '$1,618.36',
                hour: 24,
                minute: 0,
                second: 0,
            },
        }

        video.forEach(element => {
            element.style = `min-width: ${videoBlock.clientWidth}px`
        });

        let activeSlide1 = 0
        let moveSize1 = videoBlock.clientWidth
        let position1 = 0

        btnNext1.addEventListener('click', () => {
            activeSlide1++
            getData(activeSlide1)
            position1 += (moveSize1 + 32)
            videoTrack.style = `transform: translateX(-${position1}px)`
            checkBtn1()
        })

        btnPrev1.addEventListener('click', () => {
            activeSlide1--
            getData(activeSlide1)
            position1 -= (moveSize1 + 32)
            videoTrack.style = `transform: translateX(-${position1}px)`
            checkBtn1()
        })

        function checkBtn1() {
            btnNext1.disabled = activeSlide1 == video.length - 1
            btnPrev1.disabled = activeSlide1 <= 0

            if (activeSlide1 == video.length - 1) {
                btnNext1.classList.remove('active')
            } else {
                btnNext1.classList.add('active')
            }

            if (activeSlide1 <= 0) {
                btnPrev1.classList.remove('active')
            } else {
                btnPrev1.classList.add('active')
            }

        }

        function getData(element) {
            price.innerHTML = sliderData[element].price
            currentBid.innerHTML = sliderData[element].bid
            bidDollar.innerHTML = sliderData[element].bidDollar
            hour.innerHTML = sliderData[element].hour
            minute.innerHTML = sliderData[element].minute
            second.innerHTML = sliderData[element].second
            return
        }
    }

}

export const dropDown = modules.dropDown
export const sliderMedia = modules.sliderMedia
export const slider = modules.slider
export const activeClass = modules.activeClass
export const footer = modules.footer
export const burger = modules.burger
export const popUp = modules.popUp
export const firstSlider = modules.firstSlider
