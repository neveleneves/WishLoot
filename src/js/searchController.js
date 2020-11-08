// const catchSearchResult = () => {
//     const inputSearchItems = document.querySelectorAll('.js-search-field');
//     console.log(inputSearchItems);

//     inputSearchItems.forEach(elem => {
//         elem.addEventListener('input', () => {
//             const valueSearch = elem.value;
//             if (valueSearch) {
//                 //ajax
//                 // catchData();
//             }
//         });
//     });
// };


// async function catchData() { 
//     const data = await ajaxRequest('/api/product_data');
//     console.log(data);
// };

// async function ajaxRequest(url, method = 'GET', data = null) {
//     try {
//         const headers = {};
//         let body;

//         if (data) {
//             headers['Content-Type'] = 'application/json';
//             body = JSON.stringify(data);
//         }

//         const response = await fetch(url, {
//             method,
//             headers,
//             body
//         });
//         return await response.json();
//     } catch (err) {
//         console.warn('Somthing wrong:', err.massage);
//     }
// };

// catchData();
// // catchSearchResult();