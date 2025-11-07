import { initializeApp } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-app.js";
import { getDatabase, ref, set, push, get } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-database.js";

const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

let saveVote = (productId, userName) => {
    const votesRef = ref(database, 'votes');
    const newVotesRef = push(votesRef);
    return set(newVotesRef, {
        productId: productId,
        userName: userName,
        timestamp: Date.now()
    })
    .then(() => {
        return {
            status: true,
            message: "¡Voto guardado!"
        };
    })
    .catch(error => {
        return {
            status: false,
            message: "Error guardando voto"
        };
    });
}

let getVotes = () => {
    const votesRef = ref(database, 'votes');
    return get(votesRef)
        .then((snapshot) => {
            if (snapshot.exists()) {
                return {
                    status: true,
                    data: snapshot.val()
                };
            } else {
                return {
                    status: false,
                    data: "No hay votos"
                };
            }
        })
        .catch((error) => {
            return {
                status: false,
                data: "Error cargando votos"
            };
        });
}

export { saveVote, getVotes };