let archive = [];
let total = 0;

    // recupération données localStorage et calcul total price
function retrieveStorageData(){
    for (var i = 0; i<localStorage.length; i++) {
        archive[i] = JSON.parse(localStorage.getItem(localStorage.key(i)));
        total += archive[i].price;
    }
}

    // Affichage des Elements du panier
function displayCartArticle(){
    console.log(total);
}

    // Fonction principale
function main(){
    retrieveStorageData();
    displayCartArticle();
}

main();