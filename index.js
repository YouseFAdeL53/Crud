// Selectors
let title = document.getElementById("title"),
  price = document.getElementById("price"),
  taxes = document.getElementById("taxes"),
  ads = document.getElementById("ads"),
  discount = document.getElementById("discount"),
  total = document.querySelector(".total"),
  count = document.getElementById("count"),
  category = document.getElementById("category"),
  theBtn = document.querySelector(".theBtn"),
  theBody = document.getElementById("thebody"),
  searchInp = document.querySelector("#search"),
  btnRemove = document.querySelector(".btn-remove");

// Check
let theMood = "create",
  idEdit;
// theArray
let theArray = [];
let localCrud = localStorage.getItem("localCurd");
if (localCrud != null) {
  theArray = JSON.parse(localCrud);
}

// Start With GetTotal

const getTotal = () => {
  if (price.value != "") {
    let theResult =
      Number(price.value) +
      Number(taxes.value) +
      Number(ads.value) -
      Number(discount.value);
    total.innerHTML = theResult;
    total.style.backgroundColor = "#009688";
  } else {
    total.innerHTML = "";
    total.style.backgroundColor = "#f05";
  }
};

// Function GetData

const getData = () => {
  // theObj
  let theObj = {
    title: title.value,
    price: price.value,
    taxes: taxes.value,
    ads: ads.value,
    discount: discount.value,
    count: count.value,
    total: total.innerHTML,
    category: category.value,
  };
  if (
    title.value != "" &&
    price.value != "" &&
    theObj.count < 100 &&
    category.value != ""
  ) {
    if (theMood == "create") {
      if (theObj.count > 1) {
        for (let i = 0; i < theObj.count; i++) {
          theArray.push(theObj);
        }
      } else {
        // Push
        theArray.push(theObj);
      }
    } else {
      theArray[idEdit] = theObj;
      count.style.display = "block";
      theBtn.innerHTML = "Create";
    }
    // Clear Data
    clearInput();
  }
  // Save At LocalStorage
  localStorage.setItem("localCurd", JSON.stringify(theArray));
  // Trigger Function
  showData();
};

// ShowData

const showData = () => {
  theBody.innerHTML = "";
  for (let i = 0; i < theArray.length; i++) {
    let markUp = `
      <tr>
        <td>${i + 1}</td>
        <td>${theArray[i].title}</td>
        <td>${theArray[i].price}</td>
        <td>${theArray[i].taxes}</td>
        <td>${theArray[i].ads}</td>
        <td>${theArray[i].discount}</td>
        <td>${theArray[i].total}</td>
        <td>${theArray[i].category}</td>
        <td><button onclick="updateCurd(${i},'${theArray[i].title}','${
      theArray[i].price
    }','${theArray[i].taxes}', '${theArray[i].ads}', '${
      theArray[i].discount
    }', '${theArray[i].total}', '${
      theArray[i].category
    }')" class="main-btn">Update</button></td>
        <td><button onclick="deleteCurd(${i})" class="main-btn delete">Delete</button></td>
      </tr>
    `;
    theBody.insertAdjacentHTML("beforeend", markUp);
  }
  if (theArray.length > 1) {
    btnRemove.innerHTML = `<button onclick="deleteAllCurd()" class="main-btn">Delete {${theArray.length}}</button>`;
  } else {
    btnRemove.innerHTML = "";
  }
};

// Function ClearInput

const clearInput = () => {
  title.value = "";
  price.value = "";
  taxes.value = "";
  ads.value = "";
  getTotal();
  discount.value = "";
  category.value = "";
  count.value = "";
};

// Delete Curd

const deleteCurd = (indx) => {
  theArray.splice(indx, 1);
  // Update LocalStorage
  localStorage.setItem("localCurd", JSON.stringify(theArray));
  // Trigger Function
  showData();
};

// Update Curd

const updateCurd = (
  indx,
  theTitle,
  thePrice,
  theTaxes,
  theAds,
  theDiscount,
  theTotal,
  theCategory
) => {
  idEdit = indx;
  title.value = theTitle;
  price.value = thePrice;
  taxes.value = theTaxes;
  ads.value = theAds;
  discount.value = theDiscount;
  total.value = theTotal;
  getTotal();
  category.value = theCategory;
  count.style.display = "none";
  theBtn.innerHTML = "Update";
  theMood = "update";
  scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

// Search

let searchDefault = "title";

const searchBtn = (idBtn) => {
  if (idBtn == "searchTitle") {
    searchDefault = "title";
  } else {
    searchDefault = "category";
  }
  searchInp.placeholder = `Search By -- ${searchDefault.toUpperCase()}`;
  searchInp.focus();
};

const searchData = (value) => {
  let markUp = "";
  for (let i = 0; i < theArray.length; i++) {
    if (searchDefault == "title") {
      if (theArray[i].title.toLowerCase().includes(value.toLowerCase())) {
        markUp += `
      <tr>
        <td>${i + 1}</td>
        <td>${theArray[i].title}</td>
        <td>${theArray[i].price}</td>
        <td>${theArray[i].taxes}</td>
        <td>${theArray[i].ads}</td>
        <td>${theArray[i].discount}</td>
        <td>${theArray[i].total}</td>
        <td>${theArray[i].category}</td>
        <td><button onclick="updateCurd(${i},'${theArray[i].title}','${
          theArray[i].price
        }','${theArray[i].taxes}', '${theArray[i].ads}', '${
          theArray[i].discount
        }', '${theArray[i].total}', '${
          theArray[i].category
        }')" class="main-btn">Update</button></td>
        <td><button onclick="deleteCurd(${i})" class="main-btn delete">Delete</button></td>
      </tr>
      `;
      }
    } else {
      if (theArray[i].category.toLowerCase().includes(value.toLowerCase())) {
        markUp += `
      <tr>
        <td>${i + 1}</td>
        <td>${theArray[i].title}</td>
        <td>${theArray[i].price}</td>
        <td>${theArray[i].taxes}</td>
        <td>${theArray[i].ads}</td>
        <td>${theArray[i].discount}</td>
        <td>${theArray[i].total}</td>
        <td>${theArray[i].category}</td>
        <td><button onclick="updateCurd(${i},'${theArray[i].title}','${
          theArray[i].price
        }','${theArray[i].taxes}', '${theArray[i].ads}', '${
          theArray[i].discount
        }', '${theArray[i].total}', '${
          theArray[i].category
        }')" class="main-btn">Update</button></td>
        <td><button onclick="deleteCurd(${i})" class="main-btn delete">Delete</button></td>
      </tr>
      `;
      }
    }
    theBody.innerHTML = markUp;
  }
};

// DeleteAllCurd

const deleteAllCurd = () => {
  localStorage.clear();
  theArray.splice(0);
  showData();
};

// Trigger Function's
price.addEventListener("keyup", getTotal);
taxes.addEventListener("keyup", getTotal);
ads.addEventListener("keyup", getTotal);
discount.addEventListener("keyup", getTotal);
showData();
theBtn.addEventListener("click", getData);
