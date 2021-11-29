const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

// Move dots of banner
const dots = $$('.stardust-carousel__dot')

function findIndexOfDotActive() {
    for(let i=0; i<dots.length; i++) {
        if(dots[i].classList.contains('stardust-carousel__dot--active')) {
            return i;
        }
    }
}
let indexDotActive = findIndexOfDotActive();

function removeClassDotActive() {
    dots[indexDotActive].classList.remove('stardust-carousel__dot--active')
}

function addClassDotActive() {
    dots[indexDotActive].classList.add('stardust-carousel__dot--active')
}

const autoSetDotActive = () => {
    removeClassDotActive()
    if (indexDotActive < dots.length - 1) {
        indexDotActive += 1;
    }
    else {
        indexDotActive = 0;
    }
    addClassDotActive();
}

const setTimeForDot = setInterval(autoSetDotActive, 5000)

// Click dot
const setDotActive = (index) => {
    removeClassDotActive()
    indexDotActive = index
    addClassDotActive()
}

function handleClickDot(dot, index) {
    clearInterval(setTimeForDot)
    setDotActive(index)
    // setTimeForDot = setInterval(autoSetDotActive, 5000)
}

dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {handleClickDot(dot, index)} )
})