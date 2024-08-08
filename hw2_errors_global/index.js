
// Урок 2. Продвинутая работа с функциями и классами
// Задание 1

// Представьте, что у вас есть класс для управления библиотекой. В этом классе будет приватное свойство для хранения списка книг, а также методы для добавления книги, удаления книги и получения информации о наличии книги.

// Класс должен содержать приватное свойство #books, которое инициализируется пустым массивом и представляет собой список книг в библиотеке.

// Реализуйте геттер allBooks, который возвращает текущий список книг.

// Реализуйте метод addBook(title), который позволяет добавлять книгу в список. Если книга с таким названием уже существует в списке, выбросьте ошибку с соответствующим сообщением.

// Реализуйте метод removeBook(title), который позволит удалять книгу из списка по названию. Если книги с таким названием нет в списке, выбросьте ошибку с соответствующим сообщением.

// Реализуйте метод hasBook(title), который будет проверять наличие книги в библиотеке и возвращать true или false в зависимости от того, есть ли такая книга в списке или нет.

// Реализуйте конструктор, который принимает начальный список книг (массив) в качестве аргумента. Убедитесь, что предоставленный массив не содержит дубликатов; в противном случае выбрасывайте ошибку.

class Library {

    #books = [];

    constructor (books) {
        this.#books = books;
    };

    set setBooks (books) {
        if (!books instanceof Array) throw new Error('Аргумент должен быть массивом.');
        if (books.length !== [...new Set(books)].length) throw new Error('Errooor!!! Duplicate');
        this.#books = books;
    };

    /** Возвращает текущий список книг */
    get allBooks () {
        return this.#books.forEach(el => console.log(el));
    };

    /** Позволяет добавлять книгу в список. Если книга с таким названием уже существует в списке, выбросит ошибку с соответствующим сообщением.
     * @param  string
    */
    addBook(title){
        if (this.#books.includes(title)) throw new Error('This book already is in the library.')
        this.#books.push(title);
        console.log(`The book "${title}" is added.`);
    };

    /** Позволяет удалять книгу из списка по названию. Если книги с таким названием нет в списке, выбросит ошибку с соответствующим сообщением.
     * @param  string
    */
    removeBook(title){
        try {
            if (!this.#books.includes(title)) console.log("This book isn't in the library.");
                //  throw new Error("This book isn't in the library.")  //что-то не хочет...
            else {
                const ar = this.#books.filter(el => el !== title);
                library.setBooks = ar;
            }
            console.log(`The book "${title}" is remove.`);
        } catch (error){
            console.log('Something went wrong.');
        };
    };

    /** Проверять наличие книги в библиотеке и возвращать true или false в зависимости от того, есть ли такая книга в списке или нет.
     * @param  string
    */
    hasBook(title){
        return this.#books.some((el) => el === title);
    };
}

const listBooks1 = ['book 1', 'book 2', 'book 3'];
const library = new Library(listBooks1);
const listBooks2 = ['book 4', 'book 5', 'book 6'];
library.setBooks = listBooks2;

library.allBooks; 

library.addBook('book 7');
library.allBooks; 

library.removeBook('book 7');
library.allBooks; 

console.log(library.hasBook('book 5'));




// Задание 2

// Вы разрабатываете систему отзывов для вашего веб-сайта. Пользователи могут оставлять отзывы, но чтобы исключить слишком короткие или слишком длинные сообщения, вы решаете установить некоторые ограничения.

// Создайте HTML-структуру с текстовым полем для ввода отзыва, кнопкой для отправки и контейнером, где будут отображаться отзывы.

// Напишите функцию, которая будет добавлять отзыв в контейнер с отзывами. Однако если длина введенного отзыва менее 50 или более 500 символов, функция должна генерировать исключение.

// При добавлении отзыва, он должен отображаться на странице под предыдущими отзывами, а не заменять их.

const selectEl = document.querySelector('.select');
const textareaEl = document.querySelector('textarea');
const btnEl = document.querySelector('.btn');
const commentsEl = document.querySelector('.comments');
const containerEl = document.querySelector('selector');
let idComment = 4;
let comments = [];

const initialData = [

    {
    product: "Apple iPhone 13",
    reviews: [
    {
    id: "1",
    text: "Отличный телефон! Батарея держится долго.",
    },
    {
    id: "2",
    text: "Камера супер, фото выглядят просто потрясающе.",
    },
    ],
    },
    
    {
    product: "Samsung Galaxy Z Fold 3",
    reviews: [
    {
    id: "3",
    text: "Интересный дизайн, но дорогой.",
    },
    ],
    },
    
    {
    product: "Sony PlayStation 5",
    reviews: [
    {
    id: "4",
    text: "Люблю играть на PS5, графика на высоте.",
    },
    ],
    },
    
    ];
// ===================================================
function getProducts () {
    const products = [];
    commentsData.commentsDataAr.map((item) => {
        products.push(item.product);
    })
    return products;
}

const getObjComment = (product, text) => {
    idComment += 1;
    return {
        id: idComment,
        text: text,
        product: product
    }
};

function addComment (commentsData, comment) {
    commentsData.commentsDataAr.forEach((item) => {
        if (item.product === comment.product) {
            item.reviews.push({'id': comment.id, 'text': comment.text});
        } 
    });
} 


class Comments {
    commentsData = [];

    constructor (data) {
        this.commentsData = data;
    }

    set setCommentsData (data) {
        if (data instanceof Comments) throw new Error(
            'Данные не соответствуют необходимому типу аргумента.');
        this.commentsData = data;    
    };

    get commentsDataAr () {
        return this.commentsData;
    }

    getReviewsForProduct ( prod) {
        const reviewsAr = [];
        this.commentsData.forEach(item => {
            if (item.product === prod)
                item.reviews.forEach((el) => {
                    reviewsAr.push(el.text)
                });
            })
        return reviewsAr;
    }
}

const commentsData = new Comments(initialData);



// ================================================

getProducts().forEach((item) => {
    selectEl.insertAdjacentHTML('beforeend',
        `<option>${item}</option>`
    );
    commentsEl.insertAdjacentHTML('beforeend', 
        `<div class="product-box">
            <h3>${item}</h3>
            <ul>
                <li>${commentsData.getReviewsForProduct(item)}</li>
            </ul>
        </div>`
    );
});

const productEls = Array.from(document.querySelectorAll('h3'));

function setCommentToHtml (product, text) {
    productEls.forEach(el => {
        if (el.textContent === product) {
            el.nextElementSibling.insertAdjacentHTML('beforeend', `
                <li>${text}</li>
                `)            
        }
    })
}



btnEl.addEventListener('click', (event) => {
    event.preventDefault(); 
    try {

        if (textareaEl.value.length < 50 || textareaEl.value.length > 500) 
            alert("Количество символов должно быть \n от 50 до 500.");
        const comment = getObjComment(selectEl.value, textareaEl.value);
        addComment(commentsData, comment);
        setCommentToHtml(selectEl.value, textareaEl.value);
        textareaEl.value = '';

    } catch (error) {
        alert('Что-то пошло не так.')
    }
})

console.log(commentsData);






