let archive = [];
let total = 0;
let quantity = 0;

    // recupération données localStorage et calcul total price
function retrieveStorageData(){
    for (var i = 0; i<localStorage.length; i++) {
        archive[i] = JSON.parse(localStorage.getItem(localStorage.key(i)));
        total += parseInt(archive[i].price, 10);
        quantity += parseInt(archive[i].count, 10);
    }
}

    // Affichage des Elements du panier
function displayCartArticle(element){
    
    // Creation du noeud parent
    const parentNode = document.getElementById("cart__items");

    // Creation article
    const articleNode = document.createElement("article");
    articleNode.classList.add("cart__item");
    articleNode.setAttribute("data-id", element._id);
    parentNode.appendChild(articleNode);

    // Creation Div Image
    const imgNode = document.createElement("div");
    imgNode.classList.add("cart__item__img");
    articleNode.appendChild(imgNode);

    // Creation Img
    const image = document.createElement("img");
    image.setAttribute("src", element.imageUrl);
    image.setAttribute("alt", element.description);
    imgNode.appendChild(image);

    // Creation div contenu item
    const contentNode = document.createElement("div");
    contentNode.classList.add("cart__item__content");
    articleNode.appendChild(contentNode);

    // Creation bloc prix et titre
    const productName = document.createElement("h2");
    productName.innerText = element.name + " " + element.colors;
    const productPrice = document.createElement("p");
    productPrice.innerText = element.price + "€";
    contentNode.appendChild(productName);
    contentNode.appendChild(productPrice);

    // Creation bloc settings
    const settingsNode = document.createElement("div");
    settingsNode.classList.add("cart__item__content__settings");
    contentNode.appendChild(settingsNode);

    // Creation bloc quantity settings
    const quantityNode = document.createElement("div");
    settingsNode.appendChild(quantityNode);
    const quantity = document.createElement("p");
    quantity.innerText = "Qté : ";
    quantityNode.appendChild(quantity);
    const input = document.createElement("input");
    input.classList.add("itemQuantity");
    input.setAttribute("type", "number");
    input.setAttribute("name", "itemQuantity");
    input.setAttribute("min", "1");
    input.setAttribute("max", "100");
    input.setAttribute("value", element.count);
    quantityNode.appendChild(input);  

    // Creation bloc delete settings
    const deleteNode = document.createElement("div");
    const deleteInput = document.createElement("p");
    deleteInput.innerText = "Supprimer";
    deleteNode.classList.add("cart__item__content__settings__delete");
    settingsNode.appendChild(deleteNode);
    deleteNode.appendChild(deleteInput);

}

    // fonction affichage Prix total
function displayTotalQuantityAndPrice(){
    const totalQuantityNode = document.getElementById("totalQuantity");
    totalQuantityNode.innerText = quantity;
    const totalPriceNoce = document.getElementById("totalPrice");
    totalPriceNoce.innerText = total;
}

    // Fonction principale
function main(){
    retrieveStorageData();
    for(element of archive){
        displayCartArticle(element);
        console.log(element);
    }
    displayTotalQuantityAndPrice();
}

main();