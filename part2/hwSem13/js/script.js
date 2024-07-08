"use strict";

import { insertProducts} from "./index.js";

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
  const data = await fetchData(urlData);
  data.forEach((el) => {
    insertProducts(el);  
  });
});