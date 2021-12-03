const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

// Slider in banner left -> Click dot -> Click direction

const bannerLeft = $('.banner-left')

const setImageForBanner = (index) => {
    switch (index) {
        case 0: 
        case 1:
            bannerLeft.style = `background-image: url(./assets/image/banner/banner${index + 1}.jfif);`
            break;
        default:
            bannerLeft.style = `background-image: url(./assets/image/banner/banner${index + 1}.png);`
    }
}

// Move dots of banner left
const dots = $$('.stardust-carousel__dot')

const quantityDots = dots.length

const findIndexOfDotActive = () => {
    for(let i=0; i<quantityDots; i++) {
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
    if (indexDotActive < quantityDots - 1) {
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

// Click dot of banner left
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

// Click direction of banner left
const btnDirectionRightBanner = $('.btn-banner-direction-right')

btnDirectionRightBanner.addEventListener("click", () => {
    clearInterval(setTimeForDot)
    handleAutoBannerLeft()
    setTimeForDot = setInterval(handleAutoBannerLeft, 5000)
})

const setDotActivePrevious = () => {
    removeClassDotActive()
    if (indexDotActive === 0) {
        indexDotActive += quantityDots - 1;
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

const btnDirectionLeftBanner = $('.btn-banner-direction-left')

btnDirectionLeftBanner.addEventListener("click", () => {
    clearInterval(setTimeForDot)
    handleBannerLeftPrevious()
    setTimeForDot = setInterval(handleAutoBannerLeft, 5000)
})

//Direction menu list

const btnMenuLeft = $('.btn-left-menu')
const btnMenuRight = $('.btn-right-menu')

const widthOfMenuItem = $('.menu-group').offsetWidth

const widthOverflow = (numberMenuGroup) => {
    return numberMenuGroup * widthOfMenuItem
}

btnMenuRight.addEventListener("click", () => {
    $('.menu-list').scrollLeft = widthOverflow(3)

    setTimeout(() => {
        btnMenuRight.style = "display: none"
        btnMenuLeft.style = "display: block"
    }, 500)
})

btnMenuLeft.addEventListener("click", () => {
    $('.menu-list').scrollLeft = -widthOverflow(3)

    setTimeout(() => {
        btnMenuRight.style = "display: block"
        btnMenuLeft.style = "display: none"
    }, 500)
})