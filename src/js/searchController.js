
const catchSearchResult = () => {
    const inputSearchItems = document.querySelectorAll('.js-search-field');
    let inputObjArray = { 
        value: ''
    }
    
    inputSearchItems.forEach(elem => {
        elem.addEventListener('input', () => {
            //Obj by input fields
            inputObjArray.value = elem.value;
            const {...inputObj} = inputObjArray;

            //Array for objs input fields
            // inputObjArray.push(inputObj);
            catchData(inputObj);
        });
    });
};


async function catchData(obj) {
    const sendValue = await ajaxRequest('/api/product_data', 'POST', obj);
    console.log(sendValue);

    const data = await ajaxRequest('/api/product_data');
    console.log(data);
};

async function ajaxRequest(url, method = 'GET', data = null) {
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
        console.warn('Somthing wrong:', err.massage);
    }
};

catchSearchResult();