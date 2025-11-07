'use strict';

let fetchInstagramGallery = () => {
    return fetch("https://data-dawm.github.io/datum/reseller/products.json")
    .then(response => {
        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        return {
            success: true,
            body: data.slice(0, 8) 
        };
    })
    .catch(error => {
        return {
            success: false,
            body: error.message
        };
    });
}

export {  fetchInstagramGallery };