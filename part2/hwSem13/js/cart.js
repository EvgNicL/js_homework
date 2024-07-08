'use strict';

const cartContainerEl = document.querySelector(".main__cards");
const clearBtnEL = document.querySelector('.clearjs');
let cartData = [];
const subtotalEl = document.querySelector('.main__execution_total-subtotal');
const grandtotalEl = document.querySelector('.main__execution_total-grandtotal');
let count = document.querySelector('.basket_count');

/** извлечение данных из локального хранилища
 * */
function getCartData() {
  if (localStorage.getItem("cart"))
    cartData = JSON.parse(localStorage.getItem("cart"));
  return cartData = [];
}

/**запись(перезапись) данных в локальное хранилище */
function saveCartData() {
  localStorage.setItem("cart", JSON.stringify(cartData));
  return cartData;
}

/**добавлениe карты товара в корзину и локальное хранилище */
export function addProductToCart(cardObj){
  getCartData();
  cartData.push({"id": cardObj.id, "img": cardObj.img, "name": cardObj.name, "price": cardObj.price, "quantity": 1});
  saveCartData();
  cartContainerEl.insertAdjacentHTML('beforeend', `
    <div class="main__cards_container">
    
                    <img src="${cardObj.img}" alt="foto" class="main__cards_container-product">
    
                    <div class="main__cards_container-content">
                        <h6 class="main__cards_container-content-title">${cardObj.name}</h6>
                        <p class="main__cards_container-content-text">Price: <span class="spanprice">$${cardObj.price}  <span class="ask ask-red">?</span>	</span></p>
                        <p class="main__cards_container-content-text">Color: <span class="colorjs">Red</span></p>
                        <p class="main__cards_container-content-text">Size: <span class="sizejs">Xl	</span></p>
                        <p class="main__cards_container-content-text">Quantity:<span class="ask">?</span><input class="count" value="1"></input></p>
                    </div>
    
                    <div class="main__cards_container-close">
                        <svg width="18.000000" height="18.000000" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                        <defs/>
                        <path id="Vector" d="M11.24 9L17.53 2.71C17.82 2.41 17.99 2.01 17.99 1.59C17.99 1.17 17.82 0.76 17.53 0.46C17.23 0.16 16.83 0 16.4 0C15.98 0 15.58 0.16 15.28 0.46L9 6.75L2.71 0.46C2.41 0.16 2.01 0 1.59 0C1.16 0 0.76 0.16 0.46 0.46C0.16 0.76 0 1.16 0 1.59C0 2.01 0.16 2.41 0.46 2.71L6.75 9L0.46 15.28C0.16 15.58 0 15.98 0 16.4C0 16.83 0.16 17.23 0.46 17.53C0.76 17.83 1.16 18 1.59 18C2.01 18 2.41 17.83 2.71 17.53L9 11.24L15.28 17.53C15.58 17.83 15.98 18 16.4 18C16.83 18 17.23 17.83 17.53 17.53C17.83 17.23 18 16.83 18 16.4C18 15.98 17.83 15.58 17.53 15.28L11.24 9Z" fill="#575757" fill-opacity="1.000000" fill-rule="nonzero"/>
                    </svg>
                    
                    </div>
            </div>
    `)
}


/**очистить данные */
function clearCartData() {
  cartData = [];
  saveCartData();
}

clearBtnEL.addEventListener('click', clearCartData())

/**вычисление суммы товаров в корзине */
function getSubtotal (data) {
  return data.reduce((acc, item) => acc + item.price * item.quantity, 0);
}

let subtotal = getSubtotal(getCartData());
subtotalEl.innerHTML = "$" + subtotal;

/**вычисление суммы товаров с доставкой */
function getGrandtotal (x) {
  return subtotal - x;
}

grandtotalEl.innerHTML = "$" + getGrandtotal(0);


/**вычисление колиства товаров в корзине */
export function getCount () {
  return getCartData().length;
}
count.textContent = getCount();


// удаление карты товара
cartContainerEl.addEventListener("click", (ev) => {
  if (ev.target.closest(".main__cards_container-close")) {
    const item = ev.target.closest(".main__cards_container");
    if (item) item.remove();
    getCartData().forEach(el => {
      if (el.id === item.id) el.remove();
    })
  }
});

