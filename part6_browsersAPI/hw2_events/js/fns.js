export const container = document.querySelector('.container');
const dotsContainer = document.querySelector('.dots-container');
export let currentIndex = 0;

export const imgData = [
    'https://img.freepik.com/free-photo/forest-landscape_71767-127.jpg',
    'https://media.istockphoto.com/id/1317323736/ru/%D1%84%D0%BE%D1%82%D0%BE/%D0%B2%D0%B8%D0%B4-%D0%BD%D0%B0-%D0%BD%D0%B5%D0%B1%D0%BE-%D0%BD%D0%B0%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D1%8F-%D0%B4%D0%B5%D1%80%D0%B5%D0%B2%D1%8C%D0%B5%D0%B2.jpg?s=612x612&w=0&k=20&c=93KAEcJLi6BDbDLjRCZOFhC-XPfCY0BqqMvu1WzywPo=',
    'https://a.d-cd.net/e86fd84s-960.jpg',
    'https://img.freepik.com/free-photo/morskie-oko-in-tatry_1204-510.jpg',
    'https://media.istockphoto.com/id/1419410282/ru/%D1%84%D0%BE%D1%82%D0%BE/%D1%82%D0%B8%D1%85%D0%B8%D0%B9-%D0%BB%D0%B5%D1%81-%D0%B2%D0%B5%D1%81%D0%BD%D0%BE%D0%B9-%D1%81-%D0%BA%D1%80%D0%B0%D1%81%D0%B8%D0%B2%D1%8B%D0%BC%D0%B8-%D1%8F%D1%80%D0%BA%D0%B8%D0%BC%D0%B8-%D1%81%D0%BE%D0%BB%D0%BD%D0%B5%D1%87%D0%BD%D1%8B%D0%BC%D0%B8-%D0%BB%D1%83%D1%87%D0%B0%D0%BC%D0%B8.jpg?s=612x612&w=0&k=20&c=JekK-RNumyvN0CDJ1WMyF3-FEFyNH8LUsr5nG8WTwWg='
];

for (let i = 0; i < imgData.length; i++) {
    dotsContainer.insertAdjacentHTML('beforeend', `
        <div class="dot" data-index="${i}"></div>
    `)
}

export const dots = document.querySelectorAll('.dot');

/**Меняет изображение и обновляет значение переменной currentIndex
 * @param Number
*/
export function showImage (index) {
    container.style.backgroundImage = `url('${imgData[index]}')`;
    dots[currentIndex].classList.remove('active'); 
    dots[index].classList.add('active'); 
    currentIndex = index;
};