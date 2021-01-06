import View from './View'

class BlogView extends View{
    _sectionTarget = document.querySelector('.blog-section');
    _sectionCards = this._sectionTarget.querySelector('.wrapper-blog-cards');
    _contentMask = document.querySelector('.content-mask');
    
    _itemForAction;

    //Create markup for each card post from Blog
    _createMarkupSectionPreview(dataCard) {
        return `
            <div class="example-blog-card">
                <div class="blog-image">
                    <a href="/" class="">
                        <img src="${dataCard.image_url}" alt="" class="">
                    </a>
                </div>
                <div class="blog-post-panel">
                    <h3 class="blog-post-title">${dataCard.title_post}</h3>
                    <p class="blog-article-short">
                        ${dataCard.body_article}
                    </p>
                    <a href="/" class="blog-read-more-link">Read more</a>
                </div>
            </div>
        `;
    }
    
    //Blog Section failed message
    _sectionEmptyMarkup() {
        const emptyListMarkup = `
        <h2 class="info-title">Blog is still empty</h2>
        `;
        this._sectionCards.innerHTML = '';

        const sectionEmpty = this._sectionTarget.querySelector('.info-title');
        if(sectionEmpty) sectionEmpty.remove();

        this._sectionCards.insertAdjacentHTML('afterend', emptyListMarkup);
    }

    //Main handler for Action in Blog
    addHandlerActionSection(handler) {
        this._itemForAction = this._sectionTarget.querySelector('.wrapper-blog-nav');

        this._itemForAction.addEventListener('click', () => {
            this._contentMask.classList.add('content-mask-visable');
            this._contentMask.querySelector('.blog-input-form').classList.add('blog-input-form-visable');

            this.blogPostPopupHandler(handler);
        });
    };

    //Blog post handler
    blogPostPopupHandler(handler) {
        const blogPostPopup = this._contentMask.querySelector('.blog-input-form');
        const backButton = blogPostPopup.querySelector('.blog-back-button'); 
        const postButton = blogPostPopup.querySelector('.blog-post-button');

        [backButton, postButton].forEach(elem => {
            elem.addEventListener('click', () => {
                if(elem.classList[0] === 'blog-back-button') {
                    this._contentMask.classList.remove('content-mask-visable');
                    this._contentMask.querySelector('.blog-input-form').classList.remove('blog-input-form-visable');

                    blogPostPopup.querySelector('.blog-title-input').value = '';
                    blogPostPopup.querySelector('.blog-body-article').value = '';

                } 
                else if(elem.classList[0] === 'blog-post-button') {
                    //Send a data from fields to server
                }
            });
        });
        
    }

    //Main handler for Blog View
    addHandlerBlog(handler) {
        window.addEventListener('load', () => {
            handler();
        })
    };
}
export default new BlogView();