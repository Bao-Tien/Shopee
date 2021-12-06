const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

// Render dots in slider
const bannerLeftDots = $('.banner-left-dots')

const countSliderInBannerLeft = $('.banner-left-list-image').childElementCount
for(let i=0; i<countSliderInBannerLeft; i++) {
    let div = document.createElement('div');
    div.classList.add('slider-dot');
    bannerLeftDots.appendChild(div)
}
bannerLeftDots.firstElementChild.classList.add('slider-dot--active')

// Set image in slider
const bannerLeftListImage = $('.banner-left-list-image')

const lengthToScrollOfBannerLeft = $('.banner-left').offsetWidth

const widthOfScrollBarOfBannerLeft = (countSliderInBannerLeft - 1) * lengthToScrollOfBannerLeft

function setImageInSlider() {
    indexDotActive === countSliderInBannerLeft - 1
    ? bannerLeftListImage.scrollLeft += lengthToScrollOfBannerLeft
    : bannerLeftListImage.scrollLeft = lengthToScrollOfBannerLeft*indexDotActive
}

function setImageInSliderPrevious() {
    indexDotActive === countSliderInBannerLeft -1
    ? bannerLeftListImage.scrollLeft = widthOfScrollBarOfBannerLeft
    : bannerLeftListImage.scrollLeft -= lengthToScrollOfBannerLeft
}

// Move dots in slider
const dots = $$('.slider-dot')
const quantityDots = countSliderInBannerLeft

const findIndexOfDotActive = () => {
    for(let i=0; i<quantityDots; i++) {
        if(dots[i].classList.contains('slider-dot--active')) {
            return i;
        }
    }
}
let indexDotActive = findIndexOfDotActive();

const removeClassDotActive = () => {
    dots[indexDotActive].classList.remove('slider-dot--active')
}

const addClassDotActive = () => {
    dots[indexDotActive].classList.add('slider-dot--active')
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
    setImageInSlider()
}

let setTimeForDot = setInterval(handleAutoBannerLeft, 5000)

// Click dot of slider
const setDotActive = (index) => {
    removeClassDotActive()
    indexDotActive = index
    addClassDotActive()
}

function handleClickDot(dot, index) {
    clearInterval(setTimeForDot)
    setDotActive(index)
    setImageInSlider()
    setTimeForDot = setInterval(handleAutoBannerLeft, 5000)
}

dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {handleClickDot(dot, index)} )
})

// Click direction in slider
const btnDirectionRightBanner = $('.btn-banner-direction-right')

btnDirectionRightBanner.addEventListener("click", () => {
    clearInterval(setTimeForDot)
    handleAutoBannerLeft()
    setTimeForDot = setInterval(handleAutoBannerLeft, 5000)
    setImageInSlider()
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
    setImageInSliderPrevious()
}

const btnDirectionLeftBanner = $('.btn-banner-direction-left')

btnDirectionLeftBanner.addEventListener("click", () => {
    clearInterval(setTimeForDot)
    handleBannerLeftPrevious()
    setTimeForDot = setInterval(handleAutoBannerLeft, 5000)
})



//Direction List
const widthOfGrid = $('.grid').offsetWidth

const lengthToScrollOneTime = (elementContainer, elementItem) => {
    const widthOfItem = elementItem.offsetWidth
    const numberItemsIsRented =  Math.floor(widthOfGrid / widthOfItem)
    const numberItemOfList = elementContainer.childElementCount
    const lengthOneTimeScroll = (numberItemOfList % numberItemsIsRented === 0
                                ? numberItemsIsRented 
                                : numberItemOfList % numberItemsIsRented
                            ) * widthOfItem
    return lengthOneTimeScroll
}

const widthOfScrollBar = (elementContainer, elementItem) => {
    const widthOfItem = elementItem.offsetWidth
    const numberItemsIsRented =  Math.floor(widthOfGrid / widthOfItem)
    const numberItemOfList = elementContainer.childElementCount
    const numberBlockOfList = Math.floor(numberItemOfList / numberItemsIsRented)
    const width = (numberBlockOfList - 1) * widthOfGrid
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

//Sold out for Flash Sale Item

const flashSaleItemsSaled = $$('.flash-sale-item__saled')
let ratioExtant
let widthRatioExtant
let saled

flashSaleItemsSaled.forEach((itemSaled, index) => {
    saled = itemSaled.children[0]
    ratioExtant = itemSaled.children[1]
    widthRatioExtant = ratioExtant.style.width
    widthRatioExtant = parseInt(widthRatioExtant, 10)

    if (widthRatioExtant <= 10 ) {
        saled.innerText = 'Cháy hàng'
        let div = document.createElement('div');
        div.classList.add('sold-out');
        itemSaled.appendChild(div)
    }
})


