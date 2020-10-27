//Burger-menu control
(function(){
    const burgerMenu = document.querySelector('.burger');
    const menu = document.querySelector('.header-nav');
    const burgerMenuClose = document.querySelector('.header-burger-close');

    const searchBlockState = document.getElementById('search-state');
    const searchBlock = document.querySelector('.search-form-adaptive');
    const searchButton = document.querySelector('.search-button');

    burgerMenu.addEventListener('click', () => {
        if(window.getComputedStyle(searchBlockState, null).display != 'none') searchBlock.classList.remove('search-form-adaptive-active');
        menu.classList.add('header-nav-active');
    });
    burgerMenuClose.addEventListener('click', () => {
        menu.classList.remove('header-nav-active');
    });
}());

//Search-button control
(function(){
    const searchButton = document.querySelector('.search-button');
    const searchBlock = document.querySelector('.search-form-adaptive');
    const searchBlockState = document.getElementById('search-state');

    searchButton.addEventListener('click', () => {
        if(window.getComputedStyle(searchBlockState, null).display == 'none') {
            searchBlock.classList.add('search-form-adaptive-active');
        } else if (window.getComputedStyle(searchBlockState, null).display == 'block') {
            searchBlock.classList.remove('search-form-adaptive-active');
        }
    });
}());