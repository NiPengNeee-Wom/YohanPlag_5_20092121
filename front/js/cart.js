let archive = [];
let total = 0;
let quantity = 0;

function retrieveStorageData() {
  // recupération données localStorage et calcul total price
  for (var i = 0; i < localStorage.length; i++) {
    archive[i] = JSON.parse(localStorage.getItem(localStorage.key(i)));
    total += parseInt(archive[i].price * archive[i].count, 10);
    quantity += parseInt(archive[i].count, 10);
  }
}

function displayCartArticle() {
  // Affichage des Elements du panier
  for (element of archive) {
    const parentNode = document.getElementById("cart__items"); // Creation du noeud parent

    const articleNode = document.createElement("article"); // Creation article
    articleNode.classList.add("cart__item");
    articleNode.setAttribute("data-id", element._id);
    parentNode.appendChild(articleNode);

    const imgNode = document.createElement("div"); // Creation Div Image
    imgNode.classList.add("cart__item__img");
    articleNode.appendChild(imgNode);

    const image = document.createElement("img"); // Creation Img
    image.setAttribute("src", element.imageUrl);
    image.setAttribute("alt", element.description);
    imgNode.appendChild(image);

    const contentNode = document.createElement("div"); // Creation div contenu item
    contentNode.classList.add("cart__item__content");
    const contentNodeSub = document.createElement("div");
    contentNodeSub.classList.add("cart__item__content__titlePrice");
    articleNode.appendChild(contentNode);
    contentNode.appendChild(contentNodeSub);

    const productName = document.createElement("h2"); // Creation bloc prix et titre
    productName.innerText = element.name + " " + element.colors;
    const productPrice = document.createElement("p");
    productPrice.innerText = element.price + "€";
    contentNodeSub.appendChild(productName);
    contentNodeSub.appendChild(productPrice);

    const settingsNode = document.createElement("div"); // Creation bloc settings
    settingsNode.classList.add("cart__item__content__settings");
    contentNode.appendChild(settingsNode);

    const quantityNode = document.createElement("div"); // Creation bloc quantity settings
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

    const deleteNode = document.createElement("div"); // Creation bloc delete settings
    const deleteInput = document.createElement("button");
    deleteInput.classList.add("deleteItem");
    deleteInput.innerText = "Supprimer";
    deleteNode.classList.add("cart__item__content__settings__delete");
    settingsNode.appendChild(deleteNode);
    deleteNode.appendChild(deleteInput);
  }
}

function displayTotalQuantityAndPrice() {
  // Fonction affichage Prix total
  const totalQuantityNode = document.getElementById("totalQuantity");
  totalQuantityNode.innerText = quantity;
  const totalPriceNoce = document.getElementById("totalPrice");
  totalPriceNoce.innerText = total;
}

function listeningDelete() {
  // Fonction Delete
  let elementsArray = document.querySelectorAll("button.deleteItem");
  elementsArray.forEach(function (elem) {
    elem.addEventListener("click", function () {
      let dataparentNode = elem.parentNode.parentNode.parentNode.parentNode;
      let productName = dataparentNode.querySelector(
        "div.cart__item__content__titlePrice > h2"
      ).innerText;
      localStorage.removeItem(productName);
      total = 0;
      quantity = 0;
      dataparentNode.remove();
      retrieveStorageData();
      displayTotalQuantityAndPrice();
    });
  });
}

function listeningCount() {
  // fonction Count
  let countArray = document.querySelectorAll("input.itemQuantity");
  countArray.forEach(function (elemcount) {
    elemcount.addEventListener("input", function (eventInp) {
      productCount = eventInp.target.value;
      let parentCountNode = elemcount.parentNode.parentNode.parentNode;
      let productCountName = parentCountNode.querySelector(
        "div.cart__item__content__titlePrice > h2"
      ).innerText;
      let productArray = JSON.parse(localStorage.getItem(productCountName));
      productArray.count = productCount;
      localStorage.setItem(
        productArray.name + " " + productArray.colors,
        JSON.stringify(productArray)
      );
      total = 0;
      quantity = 0;
      retrieveStorageData();
      displayTotalQuantityAndPrice();
    });
  });
}

function listeningOrder() {
  // Fonction control et Order
  const orderButton = document.getElementById("order"); // récuperation des données de DOM
  let firstNameInput = document.getElementById("firstName");
  let lastNameInput = document.getElementById("lastName");
  let addressInput = document.getElementById("address");
  let cityInput = document.getElementById("city");
  let emailInput = document.getElementById("email");
  const allLetterFormat = /^[a-zA-Z\-]+$/;
  const adresseFormat = /^[a-zA-Z0-9\s,.'-]{3,}$/;
  const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  orderButton.addEventListener("click", function (event) {
    // Ecoute Order
    event.preventDefault();
    document.getElementById("firstNameErrorMsg").innerText = "";
    document.getElementById("lastNameErrorMsg").innerText = "";
    document.getElementById("addressErrorMsg").innerText = "";
    document.getElementById("cityErrorMsg").innerText = "";
    document.getElementById("emailErrorMsg").innerText = "";
    control = true;
    if (!firstNameInput.value.match(allLetterFormat)) {
      document.getElementById("firstNameErrorMsg").innerText =
        "Format de Prénom non valide";
      event.preventDefault();
      control = false;
    }
    if (!lastNameInput.value.match(allLetterFormat)) {
      document.getElementById("lastNameErrorMsg").innerText =
        "Format de nom de famille non valide";
      event.preventDefault();
      control = false;
    }
    if (!addressInput.value.match(adresseFormat)) {
      document.getElementById("addressErrorMsg").innerText =
        "Format d'adresse non valide";
      event.preventDefault();
      control = false;
    }
    if (!cityInput.value.match(allLetterFormat)) {
      document.getElementById("cityErrorMsg").innerText =
        "Format de nom de ville non valide";
      event.preventDefault();
      control = false;
    }
    if (!emailInput.value.match(mailformat)) {
      document.getElementById("emailErrorMsg").innerText =
        "Format d'adresse e-mail non valide";
      event.preventDefault();
      control = false;
    }
    if (control) {
      const product = []; // Creation Body pour API
      for (let j = 0; j < localStorage.length; j++) {
        product[j] = JSON.parse(localStorage.getItem(localStorage.key(j)))._id;
      }
      if (product.length > 0) {
        const order = {
          contact: {
            firstName: firstNameInput.value,
            lastName: lastNameInput.value,
            address: addressInput.value,
            city: cityInput.value,
            email: emailInput.value,
          },
          products: product,
        };
        const options = {
          method: "POST",
          body: JSON.stringify(order),
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        };
        fetch("http://localhost:3000/api/products/order", options) // Envoie de la requête
          .then((res) => res.json())
          .then(function (data) {
            localStorage.clear();
            localStorage.setItem("orderId", data.orderId);
            window.location.href = "confirmation.html";
          })
          .catch(function (err) {
            alert(
              "Il y a eu un problème avec l'opération fetch: " + err.message
            );
          });
      } else {
        alert("Le panier est vide");
      }
    }
  });
}

function listeningFunction() {
  // Fonction ecoute Del/Count/order
  listeningDelete();
  listeningCount();
  listeningOrder();
}

function main() {
  retrieveStorageData(); // Récupération du LocalStorage
  displayCartArticle(); // Affichage du panier
  displayTotalQuantityAndPrice(); // Affichage Prix et Quantity total
  listeningFunction(); // Systeme d'ecoute des input/select/Form
}

main();
