let archive = [];
let total = 0;
let quantity = 0;

    // recupération données localStorage et calcul total price
function retrieveStorageData(){
    for (var i = 0; i<localStorage.length; i++) {
        archive[i] = JSON.parse(localStorage.getItem(localStorage.key(i)));
        total += parseInt(archive[i].price * archive[i].count, 10);
        quantity += parseInt(archive[i].count, 10);
    }
}


    // Affichage des Elements du panier
function displayCartArticle(){
    
    for(element of archive){
        
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
        const contentNodeSub = document.createElement("div");
        contentNodeSub.classList.add("cart__item__content__titlePrice");
        articleNode.appendChild(contentNode);
        contentNode.appendChild(contentNodeSub);

        // Creation bloc prix et titre
        const productName = document.createElement("h2");
        productName.innerText = element.name + " " + element.colors;
        const productPrice = document.createElement("p");
        productPrice.innerText = element.price + "€";
        contentNodeSub.appendChild(productName);
        contentNodeSub.appendChild(productPrice);

        // Creation bloc settings
        const settingsNode = document.createElement("div");
        settingsNode.classList.add("cart__item__content__settings");
        contentNode.appendChild(settingsNode);

        // Creation bloc quantity settings
        const quantityNode = document.createElement("div");
        quantityNode.classList.add("cart__item__content__settings__quantity");
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
        const deleteInput = document.createElement("button");
        deleteInput.classList.add("deleteItem");
        deleteInput.innerText = "Supprimer";
        deleteNode.classList.add("cart__item__content__settings__delete");
        settingsNode.appendChild(deleteNode);
        deleteNode.appendChild(deleteInput);
    }    
}

    // fonction affichage Prix total
function displayTotalQuantityAndPrice(){
    const totalQuantityNode = document.getElementById("totalQuantity");
    totalQuantityNode.innerText = quantity;
    const totalPriceNoce = document.getElementById("totalPrice");
    totalPriceNoce.innerText = total;
}

    // fonction modification et suppression  d'item
function listeningFunction(){
    // Listen Delete >> supprimer clé dans le storage >> redisplay Article et Quantity/Price
    let elementsArray = document.querySelectorAll("button.deleteItem");
    elementsArray.forEach(function(elem) {
        elem.addEventListener("click", function() {
            let dataparentNode = elem.parentNode.parentNode.parentNode.parentNode;
            let productName = dataparentNode.querySelector("div.cart__item__content__titlePrice > h2").innerText;
            localStorage.removeItem(productName);
            total = 0;
            quantity = 0;
            dataparentNode.remove();
            retrieveStorageData();
            displayTotalQuantityAndPrice();
        });
    });
    
    
    // Listen Input  >> modifier count de l'element dans le storage >> redisplay Quantity/Price (pas besoin de redisplay Article)
    let countArray = document.querySelectorAll("input.itemQuantity");
    countArray.forEach(function(elemcount) {
        elemcount.addEventListener("input", function(eventInp) {
            productCount = eventInp.target.value;
            let parentCountNode = elemcount.parentNode.parentNode.parentNode;
            let productCountName = parentCountNode.querySelector("div.cart__item__content__titlePrice > h2").innerText;
            let productArray = JSON.parse(localStorage.getItem(productCountName));
            productArray.count = productCount;
            localStorage.setItem(productArray.name + " " + productArray.colors, JSON.stringify(productArray));
            total = 0;
            quantity = 0;
            retrieveStorageData();
            displayTotalQuantityAndPrice();
        });
    });
      
    // Listen Form   >> Post Données User + Storage + Quantity/Price à l'API pour redirection et recupération IdCommande
    const orderButton = document.getElementById("order");
    orderButton.addEventListener('click', function(event){
        let control = false;
        const firstNameInput = document.getElementById("firstName");
        const firstNameError = document.getElementById("firstNameErrorMsg");
        let firstName = "";
        let firstNameFormat = /^[a-zA-Z\-]+$/;
        if(firstNameInput.value.match(firstNameFormat)){
            firstName = firstNameInput.value;
            firstNameError.innerText = "";
        }else{
            firstNameError.innerText = "mauvais prénom";
            event.preventDefault();
            control = true;
        }
        const lastNameInput = document.getElementById("lastName");
        const lastNameError = document.getElementById("lastNameErrorMsg");
        let lastNameFormat = /^[a-zA-Z\-]+$/;
        let lastName = "";
        if(lastNameInput.value.match(lastNameFormat)){
            lastName = lastNameInput.value;
            lastNameError.innerText = "";
        }else{
            lastNameError.innerText = "Mauvais nom de famille";
            event.preventDefault();
            control = true;
        }
        const addressInput = document.getElementById("address");
        const addressError = document.getElementById("addressErrorMsg");
        let adresseFormat = /^[a-zA-Z0-9\s,.'-]{3,}$/;
        let adresse = "";
        if(addressInput.value.match(adresseFormat)){
            adresse = addressInput.value;
            addressError.innerText = "";
        }else{
            addressError.innerText = "Mauvaise adresse";
            event.preventDefault();
            control = true;
        }
        const cityInput = document.getElementById("city");
        const cityError = document.getElementById("cityErrorMsg");
        let cityFormat = /^[a-zA-Z\-]+$/;
        let ville = "";
        if(cityInput.value.match(cityFormat)){
            ville = cityInput.value;
            cityError.innerText = "";
        }else{
            cityError.innerText = "Mauvaise adresse";
            event.preventDefault();
            control = true;
        }
        const emailInput = document.getElementById("email");
        const emailError = document.getElementById("emailErrorMsg");
        var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        let email = "";
        if(emailInput.value.match(mailformat)){
            email = emailInput.value;
            emailError.innerText = "";
        }else{
            emailError.innerText = "mauvaise adresse email";
            event.preventDefault();
            control = true;
        }                       /// test de debug
        const products = [];

        for(let j = 0; j<archive.length;j++){
            products[j] = archive[j]._id;
        }

        const order = {
            contact: {
               firstName: firstName,
               lastName: lastName,
               city: ville,
               address: adresse,
               email: email,
            },
            products: products,
        };

        const options = {
            method: 'POST',
            body: JSON.stringify(order),
            headers: { 
               "Content-Type": "application/json" 
            },
         };
      
         // Envoie de la requête

         if(control == false){
         fetch("http://localhost:3000/api/products/order", options)
         .then(res => res.json())
         .then((data) => {
            localStorage.clear();
            localStorage.setItem("orderId", data.orderId);
            setTimeout(function(){ window.location.href = "http://127.0.0.1:5500/front/html/confirmation.html"; }, 1000);
         })
         .catch(function(error) {
            console.log('Il y a eu un problème avec l\'opération fetch: ' + error.message);
         });
        }
        event.preventDefault();
    });
}

    // Fonction principale
function main(){
    retrieveStorageData();                  // Récupération du LocalStorage
    displayCartArticle();                   // Affichage du panier
    displayTotalQuantityAndPrice();         // Affichage Prix et Quantity total
    listeningFunction();                    // Systeme d'ecoute des input/select/Form
}

main();