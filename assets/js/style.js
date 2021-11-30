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

// Move dots of banner
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

// Direction menu
const menuGroups = $$('.body__menu .menu-group')

const quantityMenuGroups = menuGroups.length

menuGroups.forEach((menuGroup, index) => {
    menuGroup.id = `group-${index}`
})

const btnMenuRight = $('.btn-menu-direction--right')
const btnMenuLeft = $('.btn-menu-direction--left')

const numberGroupOverflow = 3;

btnMenuRight.addEventListener("click", () => {
    for(let i=0; i<numberGroupOverflow; i++) {
        menuGroups[i].style = 'display: none;'
    }

    for(let i=quantityMenuGroups-1; i>quantityMenuGroups-numberGroupOverflow; i--) {
        menuGroups[i].style = 'display: block;'
    }

    setTimeout(() => {
        btnMenuRight.style = 'display: none;'
        btnMenuLeft.style = 'display: block;'
    }, 1000) 
})

btnMenuLeft.addEventListener("click", () => {
    for(let i=0; i<numberGroupOverflow; i++) {
        menuGroups[i].style = 'display: block;'
    }

    for(let i=quantityMenuGroups-1; i>quantityMenuGroups-numberGroupOverflow; i--) {
        menuGroups[i].style = 'display: none;'
    }

    setTimeout(() => {
        btnMenuRight.style = 'display: block;'
        btnMenuLeft.style = 'display: none;'
    }, 1000)
})