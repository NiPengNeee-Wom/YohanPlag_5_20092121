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

async function fetchApi(idProduct){                                 //fetchApi produit unique
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


const displayProducts = (product) => {                              // display du produit

    // placer le count sur la page en fonciton du produit               >>>>>> emile

    // Gestion Image
    const parentNodeImg = document.querySelector("div.item__img");  //placement sur div parent de l'img
    const newImg = document.createElement("img");                   //creation img
    newImg.setAttribute("src", product.imageUrl);
    newImg.setAttribute("alt", product.altTxt);
    parentNodeImg.appendChild(newImg);

    // Gestion Nom produit
    const nameNode = document.getElementById("title");
    nameNode.innerText = product.name;

    // Gestion Prix Produit
    const priceNode = document.getElementById("price");
    priceNode.innerText = product.price;

    // Gestion Couleur
    const colorNode = document.getElementById("colors");
    let colorTab = product.colors;
    let colorCount = 0;
    for(element of colorTab){
        const newOption = document.createElement("option");
        newOption.setAttribute("value", colorTab[colorCount]);
        newOption.innerText = colorTab[colorCount];
        colorNode.appendChild(newOption);
        colorCount++;
    }

    // Gestion Description
    const descriptionNode = document.getElementById("description");
    descriptionNode.innerText = product.description;

}


const savingDataLocalStorage = (product) =>{                 //saving data
    
    // Stockage couleur
    let colorChoice = "";
    const colorChoiceNode = document.getElementById("colors");
    colorChoiceNode.addEventListener('change', function(eventSel){
    colorChoice = eventSel.target.value;
    });

    // Stockage quantity
    let productCount = 0;
    const productCountNode = document.getElementById("quantity");
    productCountNode.addEventListener('input', function(eventInp){
    productCount = eventInp.target.value;
    });

    // creation instance pour push Storage
    const eventButton = document.getElementById("addToCart");
    eventButton.addEventListener('click', function(){

        // control nombre de pour iteration                     >>>> emile

        let dataProduct = new Canap(product.altTxt, colorChoice ,product.description, product.imageUrl, product.name, product.price, product._id, productCount);
        
        // localStorageTab.push(dataProduct); injection class dans storage
        if (productCount >= 1 && colorChoice != ""){
        
        let stringDataProduct = JSON.stringify(dataProduct);
        localStorage.setItem(product.name + " " + colorChoice, stringDataProduct);
        }else{
            console.log("Veuillez choisir une quantité et une couleur");
        }
    });
}


async function main(){
    var idProduct = document.location.href.split("id=");    // spit de l'id dans l'url
    let product = await fetchApi(idProduct[1]);             // fetch avec id
    displayProducts(product);                               // display du produit
    savingDataLocalStorage(product);                        // stockage info local storage
}

main();