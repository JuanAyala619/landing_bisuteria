import { fetchInstagramGallery } from './functions.js';
import { saveVote, getVotes } from './firebase.js';

let enableForm = () => {
    const form = document.getElementById("form_voting");
    if (form) {
        form.addEventListener("submit", (event) => {
            event.preventDefault();
            const productId = document.getElementById("select_product").value;
            const userName = document.getElementById("user_name").value;
            
            saveVote(productId, userName)
                .then(response => {
                    alert(response.message);
                    displayVotes();
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
                <table class="min-w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600">
                    <thead>
                        <tr class="bg-gray-100 dark:bg-gray-700">
                            <th class="py-2 px-4 border-b border-gray-300 dark:border-gray-600 text-left">Producto</th>
                            <th class="py-2 px-4 border-b border-gray-300 dark:border-gray-600 text-left">Votos</th>
                        </tr>
                    </thead>
                    <tbody>
            `;
            
            const voteCount = {};
            
            for (let voteId in votes) {
                if (votes.hasOwnProperty(voteId)) {
                    const vote = votes[voteId];
                    const productId = vote.productId;
                    
                    if (voteCount[productId]) {
                        voteCount[productId]++;
                    } else {
                        voteCount[productId] = 1;
                    }
                }
            }
            
            for (let productId in voteCount) {
                if (voteCount.hasOwnProperty(productId)) {
                    const count = voteCount[productId];
                    tableHTML += `
                        <tr class="hover:bg-gray-50 dark:hover:bg-gray-700">
                            <td class="py-2 px-4 border-b border-gray-300 dark:border-gray-600">${productId}</td>
                            <td class="py-2 px-4 border-b border-gray-300 dark:border-gray-600">${count}</td>
                        </tr>
                    `;
                }
            }

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
        document.getElementById('results').innerHTML = '<p>Error al cargar los votos</p>';
    }
}

let loadInstagramGallery = async () => {
    try {
        const galleryResult = await fetchInstagramGallery();
        if (galleryResult.success) {
            const images = galleryResult.body;
            const galleryContainer = document.getElementById('instagram-gallery');
            let galleryHTML = '';
            
            for (let i = 0; i < images.length; i++) {
                const image = images[i];
                galleryHTML += `
                    <div>
                        <img src="${image.url}" alt="${image.title}" class="w-full h-full object-cover rounded-lg">
                    </div>
                `;
            }
            
            galleryContainer.innerHTML = galleryHTML;
        }
    } catch (error) {
        console.error('Error loading gallery:', error);
    }
}

(() => {
    enableForm();
    displayVotes();
    loadInstagramGallery();
})();