"use strict";

import { addProductToCart, getCount } from "./cart.js";

const containerEl = document.querySelector(".main__products_container");
const countEl = document.querySelector('.basket_count');


export function insertProducts(el) {
  containerEl.insertAdjacentHTML(
    "beforeend",
    `
              <div class="products__item">
              <div class="producta__img_box">
                <img
                  src="${el.img}"
                  alt="image"
                  class="products__img"
                />
                <div class="hover">
                  <a href="#" class="hover_btn">
                    <img
                      src="./img/products/hover_icon.svg"
                      alt="icon"
                      class="hover_icon"
                    />
                    Add to Cart
                  </a>
                </div>
              </div>
              <a href="product.html" class="products__content">
                <h4 class="products__name">${el.title}</h4>
                <p class="products__description">
                  ${el.description}
                </p>
                <p class="products__price">$${el.price}</p>
                <p class="idjs">${el.id}</p>
              </a>
            </div>
              `
  );
}



containerEl.addEventListener("click", (ev) => {
  if (!ev.target.closest(".hover_btn")) return;
  const itemEl = ev.target.closest(".products__item");
  const price = itemEl.querySelector(".products__price").textContent.slice(1);
  const name = itemEl.querySelector('.products__name').textContent;
  const id = itemEl.querySelector('.idjs').textContent;
  const img = itemEl.querySelector('.products__img').src;
  const cardsObj = {"id": id, "img": img, "name": name, "price": price};

  addProductToCart(cardsObj);
  const btnEl = itemEl.querySelector(".hover_btn");
  btnEl.textContent = "Is in Cart";
});

countEl.textContent = getCount();
