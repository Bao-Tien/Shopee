const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

// handle Slider
function handleSilder(elementDots, elementSliders, classNameDot, btnRight, btnLeft) {
    // Render dots in slider
    const countSliders = elementSliders.childElementCount
    for(let i=0; i<countSliders; i++) {
        let div = document.createElement('div');
        div.classList.add('slider-dot', classNameDot);
        elementDots.appendChild(div)
    }
    elementDots.firstElementChild.classList.add('slider-dot--active')
    
    // Set image in slider
    const lengthToScroll = elementSliders.offsetWidth
    // const countSliders = elementSliders.childElementCount

    const widthToScrollBar = (countSliders - 1) * lengthToScroll

    function setImageInSlider() {
        indexDotActive === countSliders - 1
        ? elementSliders.scrollLeft += lengthToScroll
        : elementSliders.scrollLeft = lengthToScroll * indexDotActive
    }

    function setImageInSliderPrevious() {
        indexDotActive === countSliders - 1
        ? elementSliders.scrollLeft = widthToScrollBar
        : elementSliders.scrollLeft -= lengthToScroll
    }

    // Move dots in slider
    const dots = $$(`.${classNameDot}`)
    const findIndexOfDotActive = () => {
        for(let i=0; i<countSliders; i++) {
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
        if (indexDotActive < countSliders - 1) {
            indexDotActive += 1;
        }
        else {
            indexDotActive = 0;
        }
        addClassDotActive();
    }

    function handleAutoChangeSlider() {
        autoSetDotActiveNext()
        setImageInSlider()
    }

    let setTimeForDot = setInterval(handleAutoChangeSlider, 5000)

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
        setTimeForDot = setInterval(handleAutoChangeSlider, 5000)
    }

    dots.forEach((dot, index) => {
        dot.addEventListener("click", () => {handleClickDot(dot, index)} )
    })

    // Click direction in slider
    btnRight.addEventListener("click", () => {
        clearInterval(setTimeForDot)
        handleAutoChangeSlider()
        setTimeForDot = setInterval(handleAutoChangeSlider, 5000)
        setImageInSlider()
    })

    const setDotActivePrevious = () => {
        removeClassDotActive()
        if (indexDotActive === 0) {
            indexDotActive += countSliders - 1;
        }
        else {
            indexDotActive -= 1;
        }
        addClassDotActive();
    }

    function handleChangeSliderPrevious() {
        setDotActivePrevious()
        setImageInSliderPrevious()
    }

    btnLeft.addEventListener("click", () => {
        clearInterval(setTimeForDot)
        handleChangeSliderPrevious()
        setTimeForDot = setInterval(handleAutoChangeSlider, 5000)
    })
}

// Slider of Banner Left
const bannerLeft_Dots = $('.banner-left-dots')
const bannerLeft_Sliders = $('.banner-left-list-image')
const bannerLeft_classNameDot = 'banner-left-dot'

handleSilder(bannerLeft_Dots, bannerLeft_Sliders, bannerLeft_classNameDot, $('.btn-banner-direction-right'), $('.btn-banner-direction-left'))

//Direction List
const lengthToScrollOneTime = (elementContainer, elementItem) => {
    const widthContainer = elementContainer.offsetWidth
    const widthOfItem = elementItem.offsetWidth
    const numberItemsIsRented =  Math.floor(widthContainer / widthOfItem)
    const numberItemOfList = elementContainer.childElementCount
    const lengthOneTimeScroll = (numberItemOfList % numberItemsIsRented === 0
                                ? numberItemsIsRented 
                                : numberItemOfList % numberItemsIsRented
                            ) * widthOfItem
    return lengthOneTimeScroll
}

const widthOfScrollBar = (elementContainer, elementItem) => {
    const widthContainer = elementContainer.offsetWidth
    const widthOfItem = elementItem.offsetWidth
    const numberItemsIsRented =  Math.floor(widthContainer / widthOfItem)
    const numberItemOfList = elementContainer.childElementCount
    const numberBlockOfList = Math.floor(numberItemOfList / numberItemsIsRented)
    const width = (numberBlockOfList - 1) * widthContainer
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
        saled.innerText = 'Sắp cháy hàng'
        let div = document.createElement('div');
        div.classList.add('sold-out');
        itemSaled.appendChild(div)
    }
    else if (widthRatioExtant < 50 ) {
        let div = document.createElement('div');
        div.classList.add('sold-out');
        itemSaled.appendChild(div)
    }
})

//Direction Mall menu
const btnMallLeft = $('.btn-left__mall')
const btnMallRight = $('.btn-right__mall')
const mallList = $('.mall-list')
const mallGroup = $('.mall-group')
const lengthToScrollOfMallList = lengthToScrollOneTime(mallList, mallGroup)
const widthOfScrollBarOfMallList = widthOfScrollBar(mallList, mallGroup)

btnMallRight.addEventListener("click", () => {
    handleClickBtnRightOfList(mallList, lengthToScrollOfMallList, widthOfScrollBarOfMallList, btnMallLeft, btnMallRight)
})

btnMallLeft.addEventListener("click", () => {
    handleClickBtnLeftOfList(mallList, lengthToScrollOfMallList, btnMallLeft, btnMallRight)
})


// Slider of Mall
const mallSlider_Dots = $('.mall-slider-dots')
const mallSlider_Sliders = $('.mall-slider-images')
const mallSlider_classNameDot = 'mall-dot'

handleSilder(mallSlider_Dots, mallSlider_Sliders, mallSlider_classNameDot, $('.btn-mall-right'), $('.btn-mall-left'))

// Suggestion nav bar // Render content of nav bar active
const setStyleForUnderline = () => {
    suggestionNavActive = $('.suggestion-nav-item.suggestion-nav--active')
    underline.style.left = suggestionNavActive.offsetLeft + 'px'
    underline.style.width = suggestionNavActive.offsetWidth + 'px'
}

let suggestionContentActive
let suggestionNavActive
const underline = $('.underline-nav-item')
setStyleForUnderline()

const suggestionNavItems = $$('.suggestion-nav-item')
const suggestionContentItems = $$('.suggestion-content-item')

suggestionNavItems.forEach((item, index) => {
    
    item.onclick = function(){
        suggestionNavActive = $('.suggestion-nav-item.suggestion-nav--active')
        suggestionContentActive = $('.suggestion-content-item.suggestion-content--active')

        suggestionNavActive.classList.remove('suggestion-nav--active')
        item.classList.add('suggestion-nav--active')
        setStyleForUnderline()
        
        suggestionContentActive.classList.remove('suggestion-content--active')
        suggestionContentItems[index].classList.add('suggestion-content--active')
    }
})


// Render quantity of product saled
const quantityProductSaledList = $$('.body__suggestion-today .product-saled')
quantityProductSaledList.forEach(quantity => {
    let quantityTypeNumber = parseInt(quantity.innerText)
    if ( quantityTypeNumber > 0) {
        if (quantityTypeNumber < 1000) {
            quantity.innerText = `Đã bán ${quantityTypeNumber}`
        }
        else {
            quantity.innerText = `Đã bán ${quantityTypeNumber/1000}k`
        }

    }
    else quantity.innerText = ''
})



