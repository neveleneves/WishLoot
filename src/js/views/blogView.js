import View from './View'

class BlogView extends View{
    _sectionTarget = document.querySelector('.blog-section');
    _sectionCards = this._sectionTarget.querySelector('.wrapper-blog-cards');
    _contentMask = document.querySelector('.content-mask');
    
    _itemForAction;

    _assetsSeemoreBlog() {
        this._sectionTarget.querySelector('.see-more-link').addEventListener('click', () => {
            this._sectionCards.classList.toggle('see-more-link-blog-active');
        });
    }

    //Create markup for each card post from Blog
    _createMarkupSectionPreview(dataCard) {
        console.log(dataCard);
        return `
            <div class="example-blog-card" id="${dataCard._id}">
                <div class="blog-image">
                    <a href="/" class="image-link">
                        <img src="${dataCard.img}" alt="" class="image-post-blog">
                    </a>
                </div>
                <div class="blog-post-panel">
                    <h3 class="blog-post-title">${dataCard.title}</h3>
                    <div class="wrapper-blog-article-short">
                        <p class="blog-article-short">
                                ${dataCard.content}
                        </p>
                    </div>
                    <a class="blog-read-more-link">Read more</a>
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

        this.readMorePostBlog();
    };

    //Logic for "Read more" func
    readMorePostBlog() {
        const blogPosts = this._sectionCards.querySelectorAll('.example-blog-card');

        for(let i=0; i < blogPosts.length; i++) {
            blogPosts[i].querySelector('.blog-read-more-link').addEventListener('click', () => {
                if(!blogPosts[i].classList.contains('example-blog-card-readmore'))
                    this.defaultPostBlog();

                blogPosts[i].classList.toggle('example-blog-card-readmore');
                blogPosts[i].querySelector('.blog-image').classList.toggle('blog-image-readmore');
                blogPosts[i].querySelector('.image-post-blog').classList.toggle('image-post-blog-readmore');
                blogPosts[i].querySelector('.blog-post-panel').classList.toggle('blog-post-panel-readmore');
                blogPosts[i].querySelector('.wrapper-blog-article-short').classList.toggle('wrapper-blog-article-short-readmore');

                if (blogPosts[i].classList.contains('example-blog-card-readmore'))
                    blogPosts[i].querySelector('.blog-read-more-link').textContent = 'Hide article';
                else 
                    blogPosts[i].querySelector('.blog-read-more-link').textContent = 'Read more';

                if(!this._sectionCards.classList.contains('see-more-link-blog-active'))
                    this._sectionCards.classList.add('see-more-link-blog-active');

                if(i % 2 === 1) {
                    if(blogPosts[i-1]) blogPosts[i-1].classList.toggle('example-blog-card-readmore-odd-even');
                    if(blogPosts[i+1]) blogPosts[i+1].classList.toggle('example-blog-card-readmore-odd-even');
                } else if(i % 2 === 0) {
                    if(blogPosts[i+1]) blogPosts[i+1].classList.toggle('example-blog-card-readmore-odd-even');
                    if(blogPosts[i+2]) blogPosts[i+2].classList.toggle('example-blog-card-readmore-odd-even');
                } 
            });
        }
    }

    defaultPostBlog() {
        const posts = this._sectionCards.querySelectorAll('.example-blog-card');
        posts.forEach(post => {
            console.log("123123123");
                post.classList.remove('example-blog-card-readmore');
                post.classList.remove('example-blog-card-readmore-odd-even');
                post.querySelector('.blog-image').classList.remove('blog-image-readmore');
                post.querySelector('.image-post-blog').classList.remove('image-post-blog-readmore');
                post.querySelector('.blog-post-panel').classList.remove('blog-post-panel-readmore');
                post.querySelector('.wrapper-blog-article-short').classList.remove('wrapper-blog-article-short-readmore');

                post.querySelector('.blog-read-more-link').textContent = 'Read more';
        });
    }


    //Blog post handler
    blogPostPopupHandler(handler) {
        const blogPostPopup = this._contentMask.querySelector('.blog-input-form');
        const backButton = blogPostPopup.querySelector('.blog-back-button'); 
        const postButton = blogPostPopup.querySelector('.blog-post-button');

        this.changeBlogForm(blogPostPopup);

        [backButton, postButton].forEach(elem => {
            elem.addEventListener('click', () => {
                if(elem.classList[0] === 'blog-back-button') {
                    this._contentMask.classList.remove('content-mask-visable');
                    this._contentMask.querySelector('.blog-input-form').classList.remove('blog-input-form-visable');

                    blogPostPopup.querySelector('.blog-title-input').value = '';
                    blogPostPopup.querySelector('.blog-body-article').value = '';
                    if(blogPostPopup.querySelector('.remove-image'))
                        $('.remove-image').trigger( 'click' );
                    
                } 
                else if(elem.classList[0] === 'blog-post-button') {
                    const blogCard = {
                        img: blogPostPopup.querySelector('.file-upload-image').src,
                        title: blogPostPopup.querySelector('.blog-title-input').value,
                        content: blogPostPopup.querySelector('.blog-body-article').value,
                        action: 'add',
                        sectionName: this._sectionTarget.id
                    };
                    if(blogCard.img && blogCard.title && blogCard.content) {
                        this._contentMask.classList.remove('content-mask-visable');
                        handler(blogCard);
                    }
                    else {
                        if (!blogCard.img) 
                            blogPostPopup.querySelector('.image-upload-wrap').classList.add('image-upload-wrap-invalid');
                        if (!blogCard.title)
                            blogPostPopup.querySelector('.blog-title-input').classList.add('blog-title-input-invalid');
                        if (!blogCard.content) 
                            blogPostPopup.querySelector('.blog-body-article').classList.add('blog-body-article-invalid');

                        setTimeout(() => { 
                            blogPostPopup.querySelector('.image-upload-wrap').classList.remove('image-upload-wrap-invalid');
                            blogPostPopup.querySelector('.blog-title-input').classList.remove('blog-title-input-invalid');
                            blogPostPopup.querySelector('.blog-body-article').classList.remove('blog-body-article-invalid');
                        }, 1500);
                    }
                }
            });
        });
    }

    changeBlogForm(handlingForm) {
        const inputImageButton = handlingForm.querySelector('.file-upload-btn');
        const removeImageButton = handlingForm.querySelector('.remove-image');

        inputImageButton.addEventListener('click', () => {
            $('.file-upload-input').trigger( 'click' );
        });

        this.uploadImage(removeImageButton);
        this.removeImage(removeImageButton);
        
        $('.image-upload-wrap').bind('dragover', function () {
            $('.image-upload-wrap').addClass('image-dropping');
          });

        $('.image-upload-wrap').bind('dragleave', function () {
            $('.image-upload-wrap').removeClass('image-dropping');
        });
    }
    
    uploadImage(removeButton) {
        document.getElementById('blog-input-image').onchange = (elem) => {
            if(elem.target.files && elem.target.files[0]) {
                var reader = new FileReader();

                reader.onload = (e) => {
                    $('.image-upload-wrap').hide();
                    $('.file-upload-btn').hide();
                    $('.file-upload-image').attr('src', e.target.result);
                    $('.file-upload-content').show();
                };
                reader.readAsDataURL(elem.target.files[0]);
            } else {
                this.removeImage(removeButton);
            }
        }
    }

    removeImage(removeButton) {
        removeButton.addEventListener('click', () => {
            // $('.file-upload-input').replaceWith($('.file-upload-input').clone());
            $('.file-upload-content').hide();
            $('.image-upload-wrap').show();
            $('.file-upload-btn').show();
            $('.file-upload-image').attr('src', null);
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