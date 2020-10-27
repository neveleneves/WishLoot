//Burger-menu control
(function(){
    const burgerMenu = document.querySelector('.burger');
    const menu = document.querySelector('.header-nav');
    const burgerMenuClose = document.querySelector('.header-burger-close');
    burgerMenu.addEventListener('click', () => {
        menu.classList.add('header-nav-active');
    });
    burgerMenuClose.addEventListener('click', () => {
        menu.classList.remove('header-nav-active');
    });
}());
(function(){
    const searchButton = document.querySelector('.search-button');
    const searchBlock = document.querySelector('.search-form');
    console.log(searchBlock);
    searchButton.addEventListener('click', () => {
        searchBlock.classList.add('search-form-active');
    });
}());