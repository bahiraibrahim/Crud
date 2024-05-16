//1- get total
//2- create product
//3- save local storage
//4- clear inputs
//5- read
//6- count
//7- delete
//8- update
//9- search
//10- clean data
// _____________________________________________

let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let submit = document.getElementById("submit");
let search = document.getElementById("search");
let mood = "create";
let tem;
let moodSearch = "title";

//1- get total

function getTotal() {
  if (price.value !== "") {
    let result = +price.value + +taxes.value + +ads.value - +discount.value;
    total.innerHTML = result;
    total.style.background = "green";
  } else {
    total.innerHTML = "";
    total.style.background = "red";
  }
}

//2- create product

let arrPro;
if (localStorage.product != null) {
  arrPro = JSON.parse(localStorage.product);
} else {
  arrPro = [];
}

submit.onclick = function () {
  let newPro = {
    title: title.value.toLowerCase(),
    price: price.value,
    taxes: taxes.value,
    ads: ads.value,
    discount: discount.value,
    total: total.innerHTML,
    count: count.value,
    category: category.value.toLowerCase(),
  };

  if (
    title.value != "" &&
    count.value <= 100 &&
    price.value != "" &&
    category.value != ""
  ) {
    if (mood === "create") {
      if (newPro.count > 1) {
        for (let i = 0; i < newPro.count; i++) {
          arrPro.push(newPro);
        }
      } else {
        arrPro.push(newPro);
      }
    } else {
      arrPro[tem] = newPro;
      mood = "create";
      submit.innerHTML = "Create";
      count.style.display = "block";
    }
    clearData();
  }

  //3- save local storage
  localStorage.setItem("product", JSON.stringify(arrPro));


  showData();
};

//4- clear inputs

function clearData() {
  title.value = "";
  price.value = "";
  taxes.value = "";
  ads.value = "";
  discount.value = "";
  total.innerHTML = "";
  count.value = "";
  category.value = "";
}

//5- read

function showData() {
  getTotal();
  let table = "";
  for (let i = 1; i < arrPro.length; i++) {
    table += `
    <tr>
    <td>${i}</td>
    <td>${arrPro[i].title}</td>
    <td>${arrPro[i].price}</td>
    <td>${arrPro[i].taxes}</td>
    <td>${arrPro[i].ads}</td>
    <td>${arrPro[i].discount}</td>
    <td>${arrPro[i].total}</td>
    <td>${arrPro[i].category}</td>
    <td><button onclick='updateData(${i})' id="update">update</button></td>
    <td><button onclick='deleteData(${i})' id="delete">delete</button></td>
</tr>`;
  }

  document.getElementById("tbody").innerHTML = table;

  let btnDelete = document.getElementById("deleteAll");
  if (arrPro.length > 0) {
    btnDelete.innerHTML = `<button onclick='deleteAll()'>Delete All (${arrPro.length})</button>`;
  } else {
    btnDelete.innerHTML = "";
  }
}
showData();

//7- delete

function deleteData(i) {
  arrPro.splice(i, 1);
  localStorage.product = JSON.stringify(arrPro);
  showData();
}

function deleteAll() {
  localStorage.clear();
  arrPro.splice(0);
  showData();
}

//8- update

function updateData(i) {
  title.value = arrPro[i].title;
  price.value = arrPro[i].price;
  taxes.value = arrPro[i].taxes;
  ads.value = arrPro[i].ads;
  getTotal();
  count.style.display = "none";
  submit.innerHTML = "UpDate";
  discount.value = arrPro[i].discount;
  category.value = arrPro[i].category;
  mood = "update";
  tem = i;
  scroll({
    top: 0,
    behavior: "smooth",
  });
}

//9- search

function getSearchMood(id) {
  if (id === "searchTitle") {
    moodSearch = "title";
  } else {
    moodSearch = "category";
  }
  search.placeholder = "Search By " + moodSearch;
  search.focus();
  search.value = "";
  showData();
}
function searchData(value) {
  let table = "";
  for (let i = 0; i < arrPro.length; i++) {
    if (moodSearch == "title") {
      if (arrPro[i].title.includes(value.toLowerCase())) {
        table += `
    <tr>
    <td>${i}</td>
    <td>${arrPro[i].title}</td>
    <td>${arrPro[i].price}</td>
    <td>${arrPro[i].taxes}</td>
    <td>${arrPro[i].ads}</td>
    <td>${arrPro[i].discount}</td>
    <td>${arrPro[i].total}</td>
    <td>${arrPro[i].category}</td>
    <td><button onclick='updateData(${i})' id="update">update</button></td>
    <td><button onclick='deleteData(${i})' id="delete">delete</button></td>
</tr>`;
      }
    } else {
      if (arrPro[i].category.includes(value.toLowerCase())) {
        table += `
    <tr>
    <td>${i}</td>
    <td>${arrPro[i].title}</td>
    <td>${arrPro[i].price}</td>
    <td>${arrPro[i].taxes}</td>
    <td>${arrPro[i].ads}</td>
    <td>${arrPro[i].discount}</td>
    <td>${arrPro[i].total}</td>
    <td>${arrPro[i].category}</td>
    <td><button onclick='updateData(${i})' id="update">update</button></td>
    <td><button onclick='deleteData(${i})' id="delete">delete</button></td>
</tr>`;
      }
    }
  }

  document.getElementById("tbody").innerHTML = table;
}

//10- clean data
