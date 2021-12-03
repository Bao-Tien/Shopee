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

//Direction List
const widthOfListContainer = $('.list-container').offsetWidth

const lengthToScrollOneTime = (elementContainer, elementItem) => {
    const widthOfItem = elementItem.offsetWidth
    const numberItemsIsRented =  Math.floor(widthOfListContainer / widthOfItem)
    const numberItemOfList = elementContainer.childElementCount
    const lengthOneTimeScroll = (numberItemOfList % numberItemsIsRented === 0
                                ? numberItemsIsRented 
                                : numberItemOfList % numberItemsIsRented
                            ) * widthOfItem
    return lengthOneTimeScroll
}

const widthOfScrollBar = (elementContainer, elementItem) => {
    const widthOfItem = elementItem.offsetWidth
    const numberItemsIsRented =  Math.floor(widthOfListContainer / widthOfItem)
    const numberItemOfList = elementContainer.childElementCount
    const numberBlockOfList = Math.floor(numberItemOfList / numberItemsIsRented)
    const width = (numberBlockOfList - 1) * widthOfListContainer
    return width
}

function handleClickBtnRightOfList(elementContainer, lengthToScrollOneTime, widthOfScrollBar, btnLeft, btnRight) {
    elementContainer.scrollLeft += lengthToScrollOneTime

    if (elementContainer.scrollLeft >= 0) {
        setTimeout(() => {
            btnLeft.style = "display: block"
            btnRight.style = "display: block"
        }, 500)
    }
    if (elementContainer.scrollLeft >= widthOfScrollBar - lengthToScrollOneTime) {
        setTimeout(() => {
            btnRight.style = "display: none"
        }, 500)
    }
}

function handleClickBtnLeftOfList(elementContainer, lengthToScrollOneTime, btnLeft, btnRight) {
    elementContainer.scrollLeft -= lengthToScrollOneTime

    if (elementContainer.scrollLeft >= 0) {
        setTimeout(() => {
            btnLeft.style = "display: block"
            btnRight.style = "display: block"
        }, 500)
    }
    if (elementContainer.scrollLeft <= lengthToScrollOneTime) {
        setTimeout(() => {
            btnLeft.style = "display: none"
        }, 500)
    }
}
//Direction menu list
const btnMenuLeft = $('.btn-left__menu')
const btnMenuRight = $('.btn-right__menu')
const menuList = $('.menu-list')
const menuGroup = $('.menu-group')
const lengthToScrollOfMenuList = lengthToScrollOneTime(menuList, menuGroup)
const widthOfScrollBarOfMenuList = widthOfScrollBar(menuList, menuGroup)

btnMenuRight.addEventListener("click", () => {
    handleClickBtnRightOfList(menuList, lengthToScrollOfMenuList, widthOfScrollBarOfMenuList, btnMenuLeft, btnMenuRight)
})

btnMenuLeft.addEventListener("click", () => {
    handleClickBtnLeftOfList(menuList, lengthToScrollOfMenuList, btnMenuLeft, btnMenuRight)
})

//Direction flash sale list
const btnFlashSaleLeft = $('.btn-left__flash-sale')
const btnFlashSaleRight = $('.btn-right__flash-sale')
const flashSaleList = $('.flash-sale-list')
const flashSaleItem = $('.flash-sale-item')
const lengthToScrollOfFlashSaleList = lengthToScrollOneTime(flashSaleList, flashSaleItem)
const widthOfScrollBarOfFlashSaleList = widthOfScrollBar(flashSaleList, flashSaleItem)

btnFlashSaleRight.addEventListener("click", () => {
    handleClickBtnRightOfList(flashSaleList, lengthToScrollOfFlashSaleList, widthOfScrollBarOfFlashSaleList, btnFlashSaleLeft, btnFlashSaleRight)
})

btnFlashSaleLeft.addEventListener("click", () => {
    handleClickBtnLeftOfList(flashSaleList, lengthToScrollOfFlashSaleList, btnFlashSaleLeft, btnFlashSaleRight)
})
