//Sending GET & POST requests to server 
export const ajaxRequest = async function (url, method = 'GET', data = null) {
    try {
        const headers = {};
        let body;

        if (data) {
            headers['Content-Type'] = 'application/json';
            headers['Accept'] = 'application/json';
            body = JSON.stringify(data);
        }

        const response = await fetch(url, {
            method,
            headers,
            body
        });

        return await response.json();
    } catch (err) {
        // console.warn(err);
        console.warn('Error: Invalied request');
    }
};

//Searching a item by id
export const searchById = (parentList, item) => {
    try {
        for (const elem of parentList) {
            if(elem.id === item.id) {
                return elem;
            }
        }
    } catch (err) {
        console.warn('No such ID in the list');
    }
};

//Action "add" by clicking on the button from the card
export const addActionSection = async function (stateFromSection, stateToSection, item) {
    let itemForHandling = searchById(stateFromSection, item);
    // const addSectionItem = await ajaxRequest(`/api/action_${item.sectionName}/${item.id}`, `POST`, itemForHandling);
    const addSectionItem = await ajaxRequest(`/api/${item.sectionName}-data`, `POST`, itemForHandling);

    stateToSection.push(addSectionItem);
    return stateToSection;
}

//Action "remove" by clicking on the button from the card
export const removeActionSection = async function (stateFromSection, item) {
    const removeSectionItem = await ajaxRequest(`/api/${item.sectionName}-data/${item.id}`, `DELETE`);

    stateFromSection = stateFromSection.filter(productWishlist => productWishlist.id !== item.id);
    return stateFromSection;
}

export const actionBlogPost = async function (postObj, stateSection) {
    const postForHandling = {
        img: postObj.img,
        title: postObj.title,
        content: postObj.content
    };

    if(postObj.action === 'add') {
        const addBlogPost = await ajaxRequest(`/api/blog`, `POST`, postForHandling);
        stateSection.push(addBlogPost);
        return stateSection;
    } else if (postObj.action === 'delete') {

    }
}