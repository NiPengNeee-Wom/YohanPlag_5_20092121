async function fetchApi(){
    return fetch(`http://localhost:3000/api/products`)
    .then(function(res){
        if(res.ok){
        return res.json();
        }
    })
    .catch(function(error){
        console.log(error);
    })
}

const displayProductsIndex = (product) => {
    const parentNode = document.getElementById("items");                    // Creation ParentNode                
    const newLink = document.createElement("a");                            // Creation Lien
    newLink.setAttribute("href", "product.html?id=" + product._id);
    const newArticle = document.createElement("article");                   // Creation Article
    const newImg = document.createElement("img");                           // Creation Image
    newImg.setAttribute("src", product.imageUrl);
    newImg.setAttribute("alt", product.description);
    const newTitle = document.createElement("h3");                          // Creation Titre
    newTitle.innerText = product.name;
    newTitle.classList.add("productName");
    const newText = document.createElement("p");                            // Creation Text
    newText.classList.add("productDescription");
    newText.innerText = product.description;
    parentNode.appendChild(newLink);                                        // Imbrication Elements
    newLink.appendChild(newArticle);
    newArticle.appendChild(newImg);
    newArticle.appendChild(newTitle);
    newArticle.appendChild(newText);
}

async function main(){
    let products = await fetchApi();                                        // Contact Api
    for(elements of products){                                              // Display des produits
        displayProductsIndex(elements);
    }
}

main();