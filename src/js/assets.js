//Burger-menu control
(function(){
    if (window.location.pathname == '/content.html') {
        const burgerMenu = document.querySelector('.burger');
        const menu = document.querySelector('.header-nav');
        const burgerMenuClose = document.querySelector('.header-burger-close');

        const searchBlockState = document.getElementById('search-state');
        const searchBlock = document.querySelector('.search-form-adaptive');

        burgerMenu.addEventListener('click', () => {
            if(window.getComputedStyle(searchBlockState, null).display != 'none') searchBlock.classList.remove('search-form-adaptive-active');
            menu.classList.add('header-nav-active');
        });
        burgerMenuClose.addEventListener('click', () => {
            menu.classList.remove('header-nav-active');
        });
    }
}());

//Search-button control
(function(){
    if(window.location.pathname == '/content.html') {
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
    }
}());

//Typing-carousel control
(function(){
    if (window.location.pathname == '/') {
        const TxtRotate = function(el, toRotate, period) {
            this.toRotate = toRotate;
            this.el = el;
            this.loopNum = 0;
            this.period = parseInt(period, 10) || 2000;
            this.txt = '';
            this.tick();
            this.isDeleting = false;
        };
    
        TxtRotate.prototype.tick = function() {
            let i = this.loopNum % this.toRotate.length;
            let fullTxt = this.toRotate[i];
    
            if (this.isDeleting) this.txt = fullTxt.substring(0, this.txt.length - 1);
            else this.txt = fullTxt.substring(0, this.txt.length + 1);
          
            this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';
            const that = this;
            let delta = 220 - Math.random() * 100;
          
            if (this.isDeleting)delta /= 2; 
          
            if (!this.isDeleting && this.txt === fullTxt) {
              delta = this.period;
              this.isDeleting = true;
            } else if (this.isDeleting && this.txt === '') {
              this.isDeleting = false;
              this.loopNum++;
              delta = 300;
            }
          
            setTimeout(function() {
              that.tick();
            }, delta);
        };
          
        window.onload = function() {
            const elements = document.getElementsByClassName('txt-rotate');
            for (let i=0; i<elements.length; i++) {
              const toRotate = elements[i].getAttribute('data-rotate');
              const period = elements[i].getAttribute('data-period');
              if (toRotate) 
                new TxtRotate(elements[i], JSON.parse(toRotate), period);
            }
            const css = document.createElement("style");
            // css.innerHTML = ".txt-rotate > .wrap { border-right: 3px solid #999 }";
            document.body.appendChild(css);
        };
    }
}());

//Animation for header-menu
(function(){
    $('.header-nav .header-list li').hover(function(){
        let navOffset = $(this).position().left;

        $('.pick-line-menu').toggleClass('pick-line-menu-active');
        
        $('.pick-line-menu-active').each(function () {
            this.style.setProperty( 'left', `${navOffset}px`);
        });
    });
}());

// Smooth-Scroll to titles
(function () {
    const smoothScroll = function (targetEl, duration) {
        const headerElHeight =  document.querySelector('.header').clientHeight;
        let target = document.querySelector(targetEl);
        let targetPosition = target.getBoundingClientRect().top - (headerElHeight + headerElHeight/2);
        let startPosition = window.pageYOffset;
        let startTime = null;
    
        const ease = function(t,b,c,d) {
            t /= d / 2;
            if (t < 1) return c / 2 * t * t + b;
            t--;
            return -c / 2 * (t * (t - 2) - 1) + b;
        };
    
        const animation = function(currentTime){
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const run = ease(timeElapsed, startPosition, targetPosition, duration);
            window.scrollTo(0,run);
            if (timeElapsed < duration) requestAnimationFrame(animation);
        };
        requestAnimationFrame(animation);
    };

    const scrollTo = function () {
        const links = document.querySelectorAll('.js-scroll-to-title');
            links.forEach(each => {
                each.addEventListener('click', function () {
                    const currentTarget = this.getAttribute('href');
                    smoothScroll(currentTarget, 500);   
                });
            });
    };
    if (window.location.pathname == '/content.html') scrollTo();
}());

