let archive = [];
let total = 0;
let quantity = 0;

function retrieveStorageData(){                                         // recupération données localStorage et calcul total price
    for (var i = 0; i<localStorage.length; i++) {
        archive[i] = JSON.parse(localStorage.getItem(localStorage.key(i)));
        total += parseInt(archive[i].price * archive[i].count, 10);
        quantity += parseInt(archive[i].count, 10);
    }
}

function displayCartArticle(){                                          // Affichage des Elements du panier
    for(element of archive){
        const parentNode = document.getElementById("cart__items");      // Creation du noeud parent
        const articleNode = document.createElement("article");          // Creation article
        articleNode.classList.add("cart__item");
        articleNode.setAttribute("data-id", element._id);
        parentNode.appendChild(articleNode);
        const imgNode = document.createElement("div");                  // Creation Div Image
        imgNode.classList.add("cart__item__img");
        articleNode.appendChild(imgNode);
        const image = document.createElement("img");                    // Creation Img
        image.setAttribute("src", element.imageUrl);
        image.setAttribute("alt", element.description);
        imgNode.appendChild(image);
        const contentNode = document.createElement("div");              // Creation div contenu item
        contentNode.classList.add("cart__item__content");
        const contentNodeSub = document.createElement("div");
        contentNodeSub.classList.add("cart__item__content__titlePrice");
        articleNode.appendChild(contentNode);
        contentNode.appendChild(contentNodeSub);
        const productName = document.createElement("h2");               // Creation bloc prix et titre
        productName.innerText = element.name + " " + element.colors;
        const productPrice = document.createElement("p");
        productPrice.innerText = element.price + "€";
        contentNodeSub.appendChild(productName);
        contentNodeSub.appendChild(productPrice);
        const settingsNode = document.createElement("div");             // Creation bloc settings
        settingsNode.classList.add("cart__item__content__settings");
        contentNode.appendChild(settingsNode);  
        const quantityNode = document.createElement("div");             // Creation bloc quantity settings
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
        const deleteNode = document.createElement("div");               // Creation bloc delete settings
        const deleteInput = document.createElement("button");
        deleteInput.classList.add("deleteItem");
        deleteInput.innerText = "Supprimer";
        deleteNode.classList.add("cart__item__content__settings__delete");
        settingsNode.appendChild(deleteNode);
        deleteNode.appendChild(deleteInput);
    }    
}

function displayTotalQuantityAndPrice(){                                // Fonction affichage Prix total
    const totalQuantityNode = document.getElementById("totalQuantity");
    totalQuantityNode.innerText = quantity;
    const totalPriceNoce = document.getElementById("totalPrice");
    totalPriceNoce.innerText = total;
}

function listeningFunction(){                                           // Fonction ecoute Del/Count/order
    let elementsArray = document.querySelectorAll("button.deleteItem"); // Ecoute Delete
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
    
    let countArray = document.querySelectorAll("input.itemQuantity");  // Ecounte Count
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
      
    const orderButton = document.getElementById("order");               // Ecoute Bouton Order
    orderButton.addEventListener('click', function(event){
        let control = false;
        const firstNameInput = document.getElementById("firstName");    // Gestion erreur Form
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
        }
        const product = [];                                            // Creation Body pour API
        for(let j = 0; j<archive.length;j++){
            product[j] = archive[j]._id;
        }
        const order = {
            contact: {
               firstName: firstName,
               lastName: lastName,
               address: adresse,
               city: ville,
               email: email,
            },
            products: product,
        };
        const options = {
            method: 'POST',
            body: JSON.stringify(order),
            headers: { 
               "Content-Type": "application/json" 
            },
        };
        if(control == false){                                           // Envoie de la requête
            fetch("http://localhost:3000/api/products/order", options)
                .then(res => res.json())
                .then((data) => {
                    localStorage.clear();
                    localStorage.setItem("orderId", data.orderId);
                    window.location.href = "http://127.0.0.1:5500/front/html/confirmation.html";
                })
                .catch(function(error) {
                    alert('Il y a eu un problème avec l\'opération fetch: ' + error.message);
                });
        }
        event.preventDefault();
    });
}

function main(){
    retrieveStorageData();                  // Récupération du LocalStorage
    displayCartArticle();                   // Affichage du panier
    displayTotalQuantityAndPrice();         // Affichage Prix et Quantity total
    listeningFunction();                    // Systeme d'ecoute des input/select/Form
}

main();