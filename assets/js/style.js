const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

// Slider in banner left -> Click dot -> Click direction

const bannerLeft = $('.banner-left')

const setImageForBanner = (index) => {
    switch (index) {
        case 0: 
        case 1:
            bannerLeft.style = `background-image: url(./assets/image/banner/banner${index + 1}.jfif)`
            break;
        default:
            bannerLeft.style = `background-image: url(./assets/image/banner/banner${index + 1}.png)`
    }
}

// Move dots of banner
const dots = $$('.stardust-carousel__dot')

const findIndexOfDotActive = () => {
    for(let i=0; i<dots.length; i++) {
        if(dots[i].classList.contains('stardust-carousel__dot--active')) {
            return i;
        }
    }
}
let indexDotActive = findIndexOfDotActive();

const removeClassDotActive = () => {
    dots[indexDotActive].classList.remove('stardust-carousel__dot--active')
}

const addClassDotActive = () => {
    dots[indexDotActive].classList.add('stardust-carousel__dot--active')
}

const autoSetDotActiveNext = () => {
    removeClassDotActive()
    if (indexDotActive < dots.length - 1) {
        indexDotActive += 1;
    }
    else {
        indexDotActive = 0;
    }
    addClassDotActive();
}

function handleAutoBannerLeft() {
    autoSetDotActiveNext()
    setImageForBanner(indexDotActive)
}

let setTimeForDot = setInterval(handleAutoBannerLeft, 5000)

// Click dot
const setDotActive = (index) => {
    removeClassDotActive()
    indexDotActive = index
    addClassDotActive()
}

function handleClickDot(dot, index) {
    clearInterval(setTimeForDot)
    setDotActive(index)
    setImageForBanner(index)
    setTimeForDot = setInterval(handleAutoBannerLeft, 5000)
}

dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {handleClickDot(dot, index)} )
})

// Click direction
const btnDirectionRight = $('.btn-banner-direction-right')

btnDirectionRight.addEventListener("click", () => {
    clearInterval(setTimeForDot)
    handleAutoBannerLeft()
    setTimeForDot = setInterval(handleAutoBannerLeft, 5000)
})

const btnDirectionLeft = $('.btn-banner-direction-left')

const setDotActivePrevious = () => {
    removeClassDotActive()
    if (indexDotActive === 0) {
        indexDotActive += dots.length - 1;
    }
    else {
        indexDotActive -= 1;
    }
    addClassDotActive();
}

function handleBannerLeftPrevious() {
    setDotActivePrevious()
    setImageForBanner(indexDotActive)
}

btnDirectionLeft.addEventListener("click", () => {
    clearInterval(setTimeForDot)
    handleBannerLeftPrevious()
    setTimeForDot = setInterval(handleAutoBannerLeft, 5000)
})

