"use strict";

export const main = document.querySelector(".main");
const currentDate = new Date();
let startNumberDate = 249;
let currentIndexHistory = 0;
let photos;    
  
// Вычислить номер текущего дня
function getNumberOfCurrentDate (date) {
    const num = Math.floor((date - new Date(date.getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24);
    return num;
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
           <img src="../finger_top_icon.png" class="icon click" alt="icon" width="35px">
           <p class="count-likes">Количество лайков: ${photo.likes}</p>
         </div>
       </div>
   `);
};

// Загрузка рандомного фото на этот день
export async function loadRandomPhoto() {
    if (localStorage.getItem('startNumberDate')) startNumberDate = localStorage.getItem('startNumberDate');
    photos = await fetchPhotos();
    let index = 0;
    if (photos.length > 0) {
        if (startNumberDate < getNumberOfCurrentDate(currentDate)) {
            index = Math.floor(Math.random() * photos.length);
        } 
        insertHTML(photos[index]);
        addPhotoToHistory(photos[index]);
        localStorage.setItem('startNumberDate', getNumberOfCurrentDate(currentDate));
    };
};

// Получить историю из localStorage
function getHistory () {
    if (localStorage.getItem("photoHistory")) {
      const history = JSON.parse(localStorage.getItem("photoHistory"));
      return history;
    } else return [];
};

// Изменить количество лайков в истории
export function changeHistory (url, likes) {                  
    let history = getHistory();
    try {
        history.forEach(element => {
            if (element.url === url) {
              element.likes = likes;
            }
            localStorage.setItem("photoHistory", JSON.stringify(history));
          });
    } catch (error) {
        console.log('ошибка changeHistory ' + error);
    }
    
};

// Проверка, есть ли в истории такое фото
function isPhotoInHistory (photo) {
    const history = getHistory();
    let isPhoto = false;
    if (history.length > 0) {
        history.forEach(el => {
            if (el.id === photo.id) return isPhoto = true;
        });
    };
    return isPhoto;
};

// Добавить фото в историю
function addPhotoToHistory (photo) {
    const history = getHistory();
    if (history.length > 30) {
        history.shift();
    }
    if (isPhotoInHistory(photo) === false) {
          history.push({
          id: photo.id, 
          description: photo.alt_description,
          created: photo.created_at.slice(0, 7),
          url: photo.urls.small,
          likes: photo.likes
        });
    };
    localStorage.setItem("photoHistory", JSON.stringify(history));
};


