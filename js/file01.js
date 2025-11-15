import { fetchMateriales } from './functions.js';
import { saveVote, getVotes } from './firebase.js';

let enableForm = () => {
    const form = document.getElementById("form_voting");
    if (form) {
        form.addEventListener("submit", (event) => {
            event.preventDefault();
            const productId = document.getElementById("select_product").value;
            saveVote(productId)
                .then(response => {
                    if (response.status) {
                        alert(response.message);
                    }
                    else {
                        alert(response.message);
                    }
                });
        });
    }
}
let displayVotes = async () => {
    try {
        const votesResult = await getVotes();
        if (votesResult.status) {
            const votes = votesResult.data;
            const resultsContainer = document.getElementById('results');
            let tableHTML = `
    <table class="min-w-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-500">
        <thead>
            <tr class="bg-gray-100 dark:bg-gray-600">
                <th class="py-2 px-4 border-b border-gray-300 dark:border-gray-500 text-left text-gray-900 dark:text-white">Producto Votado</th>
                <th class="py-2 px-4 border-b border-gray-300 dark:border-gray-500 text-left text-gray-900 dark:text-white">Total de Votos</th>
            </tr>
        </thead>
        <tbody>
`;
            const voteCount = {};
            Object.values(votes).forEach(vote => {
                const productId = vote.productId;
                voteCount[productId] = (voteCount[productId] || 0) + 1;
            });
            Object.entries(voteCount).forEach(([productId, count]) => {
                tableHTML += `
    <tr class="hover:bg-gray-50 dark:hover:bg-gray-600">
        <td class="py-2 px-4 border-b border-gray-300 dark:border-gray-500 text-gray-800 dark:text-gray-200">${productId}</td>
        <td class="py-2 px-4 border-b border-gray-300 dark:border-gray-500 text-gray-800 dark:text-gray-200">${count}</td>
    </tr>
`;
            });

            tableHTML += `
                    </tbody>
                </table>
            `;

            resultsContainer.innerHTML = tableHTML;
        }
        else {
            document.getElementById('results').innerHTML = '<p>No hay votos registrados</p>';
        }
    }
    catch (error) {
        console.error('Error al mostrar votos:', error);
        document.getElementById('results').innerHTML = '<p>Error al cargar los votos</p>';
    }
}

let cargaMateriales = async () => {
    try {
        let respuesta = await fetchMateriales();
        if (respuesta.success) {
            const productos = respuesta.body.slice(0,8);
            const container = document.getElementById('instagram-gallery');
            let containerHTML = '';

            productos.forEach(producto=>{     
                containerHTML += `
   <div class="space-y-4 bg-white dark:bg-gray-800 p-4 rounded-2xl shadow">
       <img class="w-full h-40 rounded-lg object-cover"
           src="${producto.imgUrl}" alt="${producto.title}">
       <h3 class="text-xl font-semibold">${producto.price}</h3>
       <div>${producto.title}</div>
       <a href="${producto.productURL}" target="_blank"
           class="text-white bg-blue-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center w-full inline-block">
           Ver en Amazon
       </a>
   </div>
`             });

            container.innerHTML = containerHTML;
        }
    } catch (error) {
        console.error('Error loading gallery:', error);
    }
}

(() => {
    enableForm();
    displayVotes();
    cargaMateriales();
})();