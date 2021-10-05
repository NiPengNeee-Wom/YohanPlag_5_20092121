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

    // Creation ParentNode
    const parentNode = document.getElementById("items");

    // Creation Lien
    const newLink = document.createElement("a");
    newLink.setAttribute("href", "product.html?id=" + product._id);

    // Creation Article
    const newArticle = document.createElement("article");

    // Creation Image
    const newImg = document.createElement("img");
    newImg.setAttribute("src", product.imageUrl);
    newImg.setAttribute("alt", product.description);

    // Creation Titre
    const newTitle = document.createElement("h3");
    newTitle.innerText = product.name;
    newTitle.classList.add("productName");

    // Creation Text
    const newText = document.createElement("p");
    newText.classList.add("productDescription");
    newText.innerText = product.description;

    // Imbrication Elements
    parentNode.appendChild(newLink);
    newLink.appendChild(newArticle);
    newArticle.appendChild(newImg);
    newArticle.appendChild(newTitle);
    newArticle.appendChild(newText);

}

async function main(){
    let products = await fetchApi();
    for(elements of products){
        displayProductsIndex(elements);
    }
}

main();