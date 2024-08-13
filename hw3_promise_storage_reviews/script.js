// Создайте интерактивную веб-страницу для оставления и просмотра отзывов о продуктах. Пользователи могут добавлять отзывы о различных продуктах и просматривать добавленные отзывы.

// Страница добавления отзыва:

// Поле для ввода названия продукта.
// Текстовое поле для самого отзыва.
// Кнопка "Добавить отзыв", которая сохраняет отзыв о продукте в LocalStorage.

// Страница просмотра отзывов:

// Показывает список всех продуктов, о которых были оставлены отзывы.
// При клике на название продукта отображается список всех отзывов по этому продукту.
// Возможность удаления отзыва (при нажатии на кнопку "Удалить" рядом с отзывом, данный отзыв удаляется из LocalStorage).

const selectEl = document.querySelector(".select");
const textareaEl = document.querySelector("textarea");
const btnEl = document.querySelector(".btn");
const commentsEl = document.querySelector(".comments");
const containerEl = document.querySelector(".container");

let idComment = 3;

const initialData = [
  {
    product: "Apple iPhone 13",
    reviews: [
      {
        id: "1",
        text: "Отличный телефон! Батарея держится долго.",
      },
    ],
  },

  {
    product: "Samsung Galaxy Z Fold 3",
    reviews: [
      {
        id: "2",
        text: "Интересный дизайн, но дорогой.",
      },
    ],
  },

  {
    product: "Sony PlayStation 5",
    reviews: [
      {
        id: "3",
        text: "Люблю играть на PS5, графика на высоте.",
      },
    ],
  },
];
// ===================================================
function getProducts() {
  const products = [];
  commentsData.commentsDataAr.map((item) => {
    products.push(item.product);
  });
  return products;
}

const getObjComment = (product, text) => {
  idComment += 1;
  return {
    id: idComment,
    text: text,
    product: product,
  };
};

function addCommentToData(commentsData, comment) {
  commentsData.commentsDataAr.forEach((item) => {
    if (item.product === comment.product) {
      item.reviews.push({ id: comment.id, text: comment.text });
    }
  });
}


function getFromLocalStorage() {
  return JSON.parse(localStorage.getItem("commentsData"));
}

function setCommentToHtml(comment) {
    productEls.forEach(summary => {
        if (summary.textContent === comment.product) {
                summary.nextElementSibling.insertAdjacentHTML(
                    "beforeend", 
                    `<li class="li"><span class="id">${comment.id}</span><span class="item">${comment.text}</span>
                    <img class="cross" src="/close-cross.svg" alt="close">
                    </li>
                    `
                );
            
        }
    })
  }

function contains (arr, elem) {
    return arr.find(i => i !== elem) != -1;
}

function updateStorage () {
    let newData = [];
    productEls.forEach(el => {
        let reviews = [];
        const ids = el.nextElementSibling.querySelectorAll('.id');
        const texts = el.nextElementSibling.querySelectorAll('.item');
        Array.from(ids).forEach(id => {
            Array.from(texts).forEach(text => {
                reviews.push({"id": id.textContent, "text": text.textContent});
                return reviews;
            })
            return reviews;
        })
        newData.push({"product": el.textContent, "reviews": reviews});
    });
    const dataComments = new Comments(newData);
    dataComments.setToLocalStorage();
};
// ===============================================================
class Comments {
  commentsData = [];

  constructor(data) {
    this.commentsData = data;
  }

  set setCommentsData(data) {
    if (data instanceof Comments)
      throw new Error("Данные не соответствуют необходимому типу аргумента.");
    this.commentsData = data;
  }

  get commentsDataAr() {
    return this.commentsData;
  }
/**получить отзывы по конкретному продукту
 * @param String название продукта
 */
  getReviewsForProduct(prod) {
    const reviewsAr = [];
    this.commentsData.forEach((item) => {
      if (item.product === prod)
        item.reviews.forEach((el) => {
          reviewsAr.push(el);
        });
    });
    return reviewsAr;
  }

  setToLocalStorage() {
    try {
      localStorage.setItem("commentsData", JSON.stringify(this.commentsData));
    } catch (error) {
      alert("Ошибка загрузки данных");
    }
  }
}

const data = new Comments(initialData);
data.setToLocalStorage();

// ================================================

const commentsData = new Comments(getFromLocalStorage());

//добавить название продуктов в контейнер с отзывами
getProducts().forEach((item) => {
  selectEl.insertAdjacentHTML("beforeend", `<option>${item}</option>`);
  commentsEl.insertAdjacentHTML(
    "beforeend",
    `<div class="product-box">
            <details>
            <summary>${item}</summary>
            <ul >
            </ul>
            </details>
            </div>`
  );
});

//опознать названия продуктов в контейнере
const productEls = Array.from(document.querySelectorAll("summary"));

//вставить отзывы под каждое название продукта
getProducts().forEach(item => {
    comments = commentsData.getReviewsForProduct(item);
    productEls.forEach(summary => {
        if (summary.textContent === item) {
            comments.forEach(comment => {
                summary.nextElementSibling.insertAdjacentHTML(
                    "beforeend", 
                    `<li class="li"><span class="id">${comment.id}</span><span class="item">${comment.text}</span>
                    <img class="cross" value="${comment.id}" src="/close-cross.svg" alt="close">
                    </li>
                    `
                );
            })
        }
    })
})

// добавление нового комментария
btnEl.addEventListener("click", (event) => {
  event.preventDefault();
  try {
    if (textareaEl.value.length < 50 || textareaEl.value.length > 500) {
      alert("Количество символов должно быть \n от 50 до 500.");
    } else {
      const comment = getObjComment(selectEl.value, textareaEl.value);
      const data = new Comments(getFromLocalStorage());
      addCommentToData(data, comment);
      console.log();
      setCommentToHtml(comment);
      textareaEl.value = "";
      data.setToLocalStorage();
    }
  } catch (error) {
    alert("Что-то пошло не так.");
  }
});


// удаление комментария
commentsEl.addEventListener("click", (ev) => {
  if (ev.target.closest(".cross")) {
    const item = ev.target.closest(".li");
    if (item) item.remove();
};
updateStorage();

});

