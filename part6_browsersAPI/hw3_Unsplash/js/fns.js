"use strict";
        
export const main = document.querySelector(".main");
const currentDate = new Date();
let startNumberDate = 244;    
  
// Вычислить номер текущего дня
function numberOfCurrentDate (date) {
    const num = Math.floor((date - new Date(date.getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24);
    return num;
};

// Получить индекс изображения на текущий день
function getIndexPhoto () {
    const currentNum = numberOfCurrentDate(currentDate);
    if (currentNum === 365) startNumberDate = 1;
    return currentNum - startNumberDate;
};

// Загрузка данных с Unsplash
async function fetchPhotos() {
    try {
      const response = await fetch(
        `https://api.unsplash.com/photos?per_page=8&client_id=-xPKtySGMmki6q2HJfpw9SRuzq5ZNyqwSGcwpaXNH_4`
      );
      const photos = await response.json();
      return photos;
    } catch (error) {
      console.log("Ошибка при загрузке фотографий: ", error);
      return [];
    };
};

// Загрузка данных в HTML
function insertHTML(photo) {
     addToHistory(photo);
    main.insertAdjacentHTML(
      "afterbegin",
      ` <div>
          <div class="container-img">
            <img class="img" src="${
              photo.urls.small
            }" alt="photo">
            <h4>${photo.alt_description}</h4>
            <p>${photo.created_at.slice(0, 7)}</p>
          </div>
          <div class="likes-box">
            <img src="/part6_browsersAPI/hw3_Unsplash/finger_top_icon.png" class="icon click" alt="icon" width="35px">
            <p class="count-likes">Количество лайков: ${photo.likes}</p>
          </div>
        </div>
    `);
};

// Загрузка фото дня по порядку
export async function loadNextPhoto() {
    const index = getIndexPhoto();
    const photos = await fetchPhotos();
    if (photos.length > 0) {
        index = index % photos.length;
        insertHTML(photos[index]);
        addToHistory(photos[index]);
    };
    return photos;
};

// Загрузка рандомного фото дня
export async function loadRandomPhoto() {
    const photos = await fetchPhotos();
    if (photos.length > 0) {
        if (startNumberDate < numberOfCurrentDate(currentDate)) {
            const index = Math.floor(Math.random() * photos.length);
            insertHTML(photos[index]);
            addToHistory(photos[index]);
        } else  insertHTML(photos[0]);
    };
    startNumberDate = numberOfCurrentDate(currentDate);
    return photos;

};

// Записать данные в историю
function addToHistory (photo) {
    let history = getHistory();
    if (numberOfCurrentDate(currentDate) !== startNumberDate) {
      history.forEach(el => {
        if (photo.urls.small !== el.url) {
          history.push({
          url: photo.urls.small,
          likes: photo.likes
        });
        }
      })
    }
  localStorage.setItem("photoHistory", JSON.stringify(history));
};

// Изменить количество лайков в истории
export function changeHistory (url, likes) {                  
    let history = getHistory();
    history.forEach(element => {
      if (element.url === url) {
        element.likes = likes;
      }
      localStorage.setItem("photoHistory", JSON.stringify(history));
    });
};

// Получить историю из localStorage
function getHistory () {
    if (localStorage.getItem("photoHistory")) {
      const history = JSON.parse(localStorage.getItem("photoHistory"));
      return history;
    } else return [];
};