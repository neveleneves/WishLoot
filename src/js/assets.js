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