// Elementos del DOM
const formulario = document.querySelector("#formulario");
const listaTweets = document.querySelector("#lista-tweets");
let tweets = [];

// Listeners
document.addEventListener("DOMContentLoaded", cargarTweetsLocalStorage);
formulario.addEventListener("submit", agregarTweet);


function agregarTweet(e) {
    e.preventDefault();

    const tweet = document.querySelector("#tweet").value.trim(); // Elimina espacios en blanco


    if (tweet === '') {
        alert("El tweet no puede ir vacío");
        return;
    }


    const tweetObj = {
        id: Date.now(),
        texto: tweet
    };


    tweets = [...tweets, tweetObj];


    mostrarTweets();


    sincronizarLocalStorage();


    formulario.reset();
}


function mostrarTweets() {

    limpiarHTML();

    // Iterar sobre el array de tweets y generar el HTML
    tweets.forEach(tweet => {

        const p = document.createElement('p');
        p.innerText = tweet.texto;


        const btnBorrar = document.createElement('button');
        btnBorrar.classList.add('borrar-tweet');
        btnBorrar.innerText = 'X';


        btnBorrar.onclick = () => {
            borrarTweet(tweet.id);
        };


        p.appendChild(btnBorrar);


        listaTweets.appendChild(p);
    });
}


function borrarTweet(id) {
    tweets = tweets.filter(tweet => tweet.id !== id);


    mostrarTweets();


    sincronizarLocalStorage();
}


function sincronizarLocalStorage() {
    localStorage.setItem('tweets', JSON.stringify(tweets));
}


function cargarTweetsLocalStorage() {
    tweets = JSON.parse(localStorage.getItem('tweets')) || [];
    mostrarTweets();
}


function limpiarHTML() {
    while (listaTweets.firstChild) {
        listaTweets.removeChild(listaTweets.firstChild);
    }
}


