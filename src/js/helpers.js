//Sending GET & POST requests to server 
export const ajaxRequest = async function (url, method = 'GET', data = null) {
    try {
        const headers = {};
        let body;

        if (data) {
            headers['Content-Type'] = 'application/json';
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