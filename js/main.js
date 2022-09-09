const data = [
  {
    id: 1,
    name: "Tenis Blaze ",
    Price: 100,
    stock: 700,
    image: "./img/blaze.png",
    filter: "Nike",
  },

  {
    id: 2,
    name: "Tenis Nike Air",
    Price: 100,
    stock: 120,
    image: "./img/tna1.png",
    filter: "Nike",
  },

  {
    id: 3,
    name: "Jordan 1",
    Price: 240,
    stock: 200,
    image: "./img/jordan 1.png",
    filter: "jordan",
  },
  {
    id: 4,
    name: "Jordan 2",
    Price: 210,
    stock: 1002,
    image: "./img/jordan 2.png",
    filter: "jordan",
  },
  {
    id: 5,
    name: "Converse Retro Rojo ",
    Price: 99,
    stock: 999,
    image: "./img/converse r.png",
    filter: "converse",
  },
  {
    id: 6,
    name: "Converse Retro Negro ",
    Price: 99,
    stock: 999,
    image: "./img/converse n.png",
    filter: "converse",
  },
];

const PRODUCTS = document.querySelector(".content_element");
const back = document.querySelector(".back");

const content_cart = document.querySelector(".content-cart-body");

const total = document.querySelector("#id_total");

const buy = document.querySelector("#id_buy");

let html = "";

data.forEach(({ id, name, Price, stock, image, filter }) => {
  if (filter === "Nike") {
    html += `
        <div class="element Nike">
            <article class="products-img">
                <img src="${image}" alt="${name}">
            </article>
            <article class="product-body" id="${id}" >
                <div class="product-detail">
                    <p>$${Price}.00<span class="product-stock"> | Stock: ${stock}</span></p>
                </div>
                <div class="product-name">${name}</div>
                <article class="btn btn-add">
                    <i class="fa-solid fa-cart-shopping btn_agregar"></i>
                </article>
            </article>
        
            
        </div>
    `;
  }
  if (filter === "jordan") {
    html += `
        <div class="element jordan">
            <article class="products-img">
                <img src="${image}" alt="${name}">
            </article>
            <article class="product-body" id="${id}"> 
                <div class="product-detail">
                    <p>$${Price}.00<span class="product-stock"> | Stock: ${stock}</span></p>
                </div>
                <div class="product-name">${name}</div>

                <article class="btn btn-add">
                    <i class="fa-solid fa-cart-shopping btn_agregar"></i>
                </article>
                
            </article>
        </div>
    `;
  }
  if (filter === "converse") {
    html += `
        <div class="element converse">
            <article class="products-img">
                <img src="${image}" alt="${name}">
            </article>
            <article class="product-body" id="${id}" >
                <div class="product-detail">
                    <p>$${Price}.00<span class="product-stock"> | Stock: ${stock}</span></p>
                </div>
                <div class="product-name">${name}</div>
                <article class="btn btn-add">
                   <i class="fa-solid fa-cart-shopping btn_agregar"></i>
                </article>
            </article>
        </div>
    `;
  }
});

PRODUCTS.innerHTML = html;

mixitup(".content_element", {
  selectors: {
    target: ".element",
  },
  animation: {
    duration: 200,
  },
}).filter("all");

const iconMenu = document.querySelector("#id_icon_menu");
const Menu = document.querySelector("#id_menu");

function Add_delete_Equis(element) {
  const html = `
    <div class="cancel">
        <i class="fa-solid fa-xmark"></i>
    </div>
    `;

  element.innerHTML = html;
}

const shop_cart = document.querySelector("#id_icon-shop-cart");
const content = document.querySelector("#content-cart");
const backContentCart = document.querySelector("#back-content");

shop_cart.addEventListener("click", (e) => {
  content.classList.toggle("content-cart-show");

  Add_delete_Equis(backContentCart);
});

backContentCart.addEventListener("click", function () {
  content.classList.remove("content-cart-show");
});

let cart = {};

function printProductsInCart(Subtotal) {
  let html = "";
  let totalOfProducts = 0;
  const arrayCart = Object.values(cart);

  arrayCart.forEach(({ id, name, Price, stock, image, amount }) => {
    html += `
        <div class="item-cart">

        <div class="item-cart-img">
            <img src="${image}" alt="${name}">
        </div>

        <div class="item-text">

            <div class="item-cart-details">
                <h3 class="item-cart-tittle">${name}</h3>
                <p>Stock: ${stock} | $${Price}.00 </p>
                <p>Subtotal: $${amount * Price}.00</p>
            </div>

            <div class="item-cart-option" id="${id}">
                <i class='bx bx-minus' ></i>
                <span id="amount">${amount}</span>
                <i class='bx bx-plus' ></i>
                <i class='bx bx-trash' ></i>
            </div>

        </div>

        </div>
        `;

    totalOfProducts += amount * Price;
  });

  content_cart.innerHTML = html;
  total.textContent = totalOfProducts;
}

function printImgCart() {
  const html = `
        <div class="img-cart">
            <img src="./img/vacio.png" alt="empty-cart">
        </div>
        <div class="content-text">
            <h2> Elige un Producto</h2>
            
        </div>`;

  content_cart.innerHTML = html;
}

PRODUCTS.addEventListener("click", (e) => {
  if (e.target.classList.contains("btn_agregar")) {
    const idProducts = +e.target.parentElement.parentElement.id;
    const findProducts = data.find((item) => item.id == idProducts);
    console.log(findProducts);

    if (cart[idProducts]) {
      if (cart[idProducts].amount >= cart[idProducts].stock) {
        alert("te pasaste del stock");
        printProductsInCart();
      } else {
        cart[idProducts].amount++;
        printProductsInCart();
      }
    } else {
      cart[idProducts] = findProducts;
      cart[idProducts].amount = 1;
    }

    printProductsInCart();
  }
});

content_cart.addEventListener("click", (e) => {
  if (e.target.classList.contains("bx-minus")) {
    const idProducts = +e.target.parentElement.id;

    if (cart[idProducts].amount > 1) {
      cart[idProducts].amount--;
      printProductsInCart();
    } else {
      delete cart[idProducts];
      printProductsInCart();
    }
  }
  if (e.target.classList.contains("bx-plus")) {
    const idProducts = +e.target.parentElement.id;

    if (cart[idProducts].amount >= cart[idProducts].stock) {
      alert("Te pasaste del Stock");
      printProductsInCart();
    } else {
      cart[idProducts].amount++;
      printProductsInCart();
    }
  }
  if (e.target.classList.contains("bx-trash")) {
    const idProducts = +e.target.parentElement.id;
    delete cart[idProducts];
    printProductsInCart();
  }

  if (Object.entries(cart).length === 0) {
    printImgCart();
  }
});
