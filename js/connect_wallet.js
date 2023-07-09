const connectImg = document.querySelector('.connect__img'),
    connectTerms = document.querySelector('.connect__terms'),
    connectRight = document.querySelector('.connect__right'),
    connectLink = document.querySelectorAll('.connect__link');

connectLink.forEach(element => {
    element.addEventListener('click', (e) => {
        connectRight.classList.toggle('active')
        e.preventDefault()
    })
});