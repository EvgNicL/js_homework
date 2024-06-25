const urlData = "./data.json";
async function fetchData(url) {
  try {
    const responce = await fetch(url);
    const data = await responce.json();
    return data;
  } catch (error) {
    console.log(error.message);
  }
}

document.addEventListener("DOMContentLoaded", async () => {
  const containerEl = document.querySelector(".main__products_container");
  const data = await fetchData(urlData);
  data.forEach((el) => {
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
            </a>
          </div>
            `
    );
  });
});


