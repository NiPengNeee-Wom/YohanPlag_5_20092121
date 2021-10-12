function retrieveAndDisplayStorageCount(colorChoice, product){                  // Fonction de Recupération données localStorage
    let archive = [];
    let returnArray = [true, 0];
    for (var i = 0; i<localStorage.length; i++) {
        archive[i] = JSON.parse(localStorage.getItem(localStorage.key(i)));
        if (product._id == archive[i]._id && colorChoice == archive[i].colors){    
            returnArray[1] = archive[i].count;
            return returnArray;
        }
    }
}

class Canap{
    constructor(altTxt, colors, description, imageUrl, name, price, _id, count){
        this.altTxt = altTxt;
        this.colors = colors;
        this.description = description;
        this.imageUrl = imageUrl;
        this.name = name;
        this.price = price;
        this._id = _id;
        this.count = count;
    }
}

async function fetchApi(idProduct){                                             // Fonction de Contact Api
    return fetch(`http://localhost:3000/api/products/` + idProduct)
    .then(function(res){
        if(res.ok){
        return res.json();
        }
    })
    .catch(function(error){
        console.log(error);
    })
}

const displayProducts = (product) => {                                          // Fonction de Display du produit         
    const parentNodeImg = document.querySelector("div.item__img");              // Display Image              
    const newImg = document.createElement("img");                   
    newImg.setAttribute("src", product.imageUrl);
    newImg.setAttribute("alt", product.altTxt);
    parentNodeImg.appendChild(newImg);
    const nameNode = document.getElementById("title");                          // Display Nom produit
    nameNode.innerText = product.name;
    const priceNode = document.getElementById("price");                         // Display Prix Produit
    priceNode.innerText = product.price;
    const colorNode = document.getElementById("colors");                        // Display Couleur
    let colorTab = product.colors;
    let colorCount = 0;
    for(element of colorTab){
        const newOption = document.createElement("option");
        newOption.setAttribute("value", colorTab[colorCount]);
        newOption.innerText = colorTab[colorCount];
        colorNode.appendChild(newOption);
        colorCount++;
    }
    const descriptionNode = document.getElementById("description");             // Display Description
    descriptionNode.innerText = product.description;
}

const savingDataLocalStorage = (product) =>{                                    // Fonction Sauvegarde LocalStorage         
    let colorChoice = "";                                                       // Stockage couleur
    let colorChoiceNode = document.getElementById("colors");
    const quantityParentNode = document.querySelector("div.item__content__settings");
    const quantityInfo = document.createElement("p");
    quantityParentNode.appendChild(quantityInfo);
    colorChoiceNode.addEventListener('change', function(eventSel){
        colorChoice = eventSel.target.value;
        if (retrieveAndDisplayStorageCount(colorChoice, product)){
            quantityInfo.innerText = "Vous avez déjà " + retrieveAndDisplayStorageCount(colorChoice, product)[1] + " produit de ce type dans votre panier";
        }else{
            if (document.querySelector("div.item__content__settings > p")){

                quantityInfo.innerText = "";
            }
        }                                                                   
    });
    let productCount = 0;                                                       // Stockage quantity
    let productCountNode = document.getElementById("quantity");
    productCountNode.addEventListener('input', function(eventInp){
    productCount = eventInp.target.value;
    });
    const erreurInfoNode = document.querySelector("div.item__content");         // Creation Message d'erreur     
    const erreurInfo = document.createElement("p");
    erreurInfo.setAttribute("style", "color:#bb0b0b; font-weight:bold;");
    erreurInfo.innerText = "    Veuillez choisir une couleur et une quantité!";
    let eventButton = document.getElementById("addToCart");                     // Creation instance pour push Storage
    eventButton.addEventListener('click', function(){
        erreurInfo.remove();
        let dataProduct = new Canap(product.altTxt, colorChoice ,product.description, product.imageUrl, product.name, product.price, product._id, productCount);
        if (productCount >= 1 && colorChoice != "" && productCount <= 100){
        let stringDataProduct = JSON.stringify(dataProduct);
        localStorage.setItem(product.name + " " + colorChoice, stringDataProduct);
        quantityInfo.innerText = "Vous avez maintenant " + retrieveAndDisplayStorageCount(colorChoice, product)[1] + " produit de ce type dans votre panier";
        }else{
            erreurInfoNode.appendChild(erreurInfo);
        }
    })
}

async function main(){
    var idProduct = document.location.href.split("id=");                        // Spit de l'id dans l'url
    let product = await fetchApi(idProduct[1]);                                 // Fetch avec id
    displayProducts(product);                                                   // Display du produit
    savingDataLocalStorage(product);                                            // Stockage info local storage
}

main();