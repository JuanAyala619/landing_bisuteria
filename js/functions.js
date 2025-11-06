'use strict';

let fetchProducts = (url) => {
    return fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error HTTP: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            return {
                success: true,
                body: data
            };
        })
        .catch(error => {
            return {
                success: false,
                body: error.message
            };
        });
}

let fetchInstagramGallery = () => {
    return fetch('https://jsonplaceholder.typicode.com/photos?_limit=8')
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error HTTP: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            return {
                success: true,
                body: data
            };
        })
        .catch(error => {
            return {
                success: false,
                body: error.message
            };
        });
}

export { fetchProducts, fetchInstagramGallery };