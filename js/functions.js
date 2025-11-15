'use strict';
let fetchMateriales = async () => {
    try{
        let respuesta= await fetch("https://data-dawm.github.io/datum/reseller/products.json")
        if(!respuesta.ok){
            throw new Error(`Error HTTP: ${respuesta.status}`);
        }
        else{
            const datos= await respuesta.json();
            return{
                success:true,
                body:datos
            };
        }
    }
    catch(error){
        return{
            success:false,
            body:error.message
        };
    }
}


export {  fetchMateriales };