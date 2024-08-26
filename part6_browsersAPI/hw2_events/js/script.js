'use strict';

import { showImage, container, imgData, currentIndex, dots } from "./fns.js";

// начальная позиция
container.style.backgroundImage = `url('${imgData[currentIndex]}')`;
dots[currentIndex].classList.add('active');       


document.querySelector('.main').addEventListener('click', function (e) {
    if (e.target.classList.contains('right')) {
        let index = currentIndex + 1;
        if (index >= imgData.length) {
            index = 0;
        }
        showImage(index);
    } else if (e.target.classList.contains('left')) {
        let index = currentIndex - 1;
        if (index < 0) {
            index = imgData.length - 1;
        }
        showImage(index);
    } else if (e.target.classList.contains('dot')) {
        let index = e.target.getAttribute('data-index')
        showImage(index);
    };
});