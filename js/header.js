class BurgerMenu {
    constructor(object) {
        this.burger = document.querySelector(object.burger)
        this.openButton = document.querySelector(object.openButton)
        this.closeButton = document.querySelector(object.closeButton)
        let burgerWidth = this.burger.clientWidth
        this.burger.style = `right: -${burgerWidth}px;`

        this.burgerOpen()
        this.burgerCLose(burgerWidth)
    }

    burgerOpen() {
        this.openButton.addEventListener('click', () => {
            this.burger.style = `right: 0px;`
        }) 
    } 

    burgerCLose(burgerWidth) {
        this.closeButton.addEventListener('click', () => {
            this.burger.style = `right: -${burgerWidth}px;`
        }) 
    } 

    
}    

let burgerMenu = new BurgerMenu({
    burger:'.burger',
    openButton:'.burger__open',
    closeButton:'.burger__close',
})
