let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let submit = document.getElementById('submit');
let btnDelete = document.getElementById('DeleteAll');
let tmp;
let mood = 'create';
// Function to calculate total
function whatTotal(){
    if(price.value != ''){
        let result = (+price.value + +taxes.value + +ads.value) - +discount.value;
        total.innerHTML = result;
        total.style.background = 'green';
    } else {
        total.innerHTML = '';
        total.style.background = '#b49d17';
    }
}



// Creating or initializing dataPro
let dataPro;
if (localStorage.product != null) {
    dataPro = JSON.parse(localStorage.product);
} else {
    dataPro = [];
}

// Submit button click event
submit.onclick = function() {
    let newPro = {
        title: title.value.toLowerCase(),
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        discount: discount.value,
        total: total.innerHTML,
        count: count.value,
        category: category.value.toLowerCase(),
    }

    if(title.value != ''&& price.value != ''&&
    category.value != ''&& newPro.count < 100){
    if(mood === 'create'){
    if(newPro.count > 1){
        for(let i = 0 ; i < newPro.count;i++){
            dataPro.push(newPro);
        }
    }else{
        dataPro.push(newPro);
    }
        }else{
           dataPro[tmp]=newPro;
           mood = 'create';
           submit.innerHTML = 'Create';
           count.style.display = 'block';
        }
        clearData()
        }


    localStorage.setItem('product', JSON.stringify(dataPro));
    console.log(newPro);

    showData();
    updateDeleteButton();
}

// Function to clear input fields
let clearData = function() {
    title.value = '';
    price.value = '';
    taxes.value = '';
    ads.value = '';
    discount.value = '';
    total.innerHTML = '';
    count.value = '';
    category.value = '';
}

// Function to display data
// Function to display data
function showData() {
    whatTotal()
    let table = '';
    for (let i = 0; i < dataPro.length; i++) {
        let result = (+dataPro[i].price + +dataPro[i].taxes + +dataPro[i].ads) - +dataPro[i].discount;
        // Adding 1 to i to start index from 1
        let index = i + 1;
        table += `
        <tr>
            <td>${index}</td>
            <td>${dataPro[i].title}</td>
            <td>${dataPro[i].price}</td>
            <td>${dataPro[i].taxes}</td>
            <td>${dataPro[i].ads}</td>
            <td>${dataPro[i].discount}</td>
            <td>${result}</td>
            <td>${dataPro[i].category}</td>
            <td><button onclick="updateData(${i})" id="update">update</button></td>
            <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
        </tr>`;
    }
    document.getElementById('tbody').innerHTML = table;
}


// Displaying data on page load
showData();
updateDeleteButton();

// Function to delete a single data entry
function deleteData(i) {
    dataPro.splice(i, 1);
    localStorage.product = JSON.stringify(dataPro);
    showData();
    updateDeleteButton();
}

// Function to delete all data
function deleteAll() {
    localStorage.clear();
    dataPro.splice(0);
    showData();
    updateDeleteButton();
}

// Function to update delete button visibility
function updateDeleteButton() {
    btnDelete.innerHTML = dataPro.length > 0 ? `<button onclick="deleteAll()">Delete All (${dataPro.length})</button>` : '';
}

// update

function updateData(i){
    title.value = dataPro[i].title;
    // Convert Arabic numbers to English numbers
    price.value = parseFloat(dataPro[i].price);
    taxes.value = parseFloat(dataPro[i].taxes);
    ads.value = parseFloat(dataPro[i].ads);
    discount.value = parseFloat(dataPro[i].discount);
    whatTotal()
    count.style.display = 'none'
    category.value = dataPro[i].category;
    submit.innerHTML = 'update';
    mood ='update';
    tmp = i;
    scroll({
        top:0,
        behavior:"smooth",
        
    })
}


// search
let searchMood = 'title';

function getsearchMood(id){
    let search = document.getElementById('search');
    if(id == 'searchtitle'){
        searchMood = 'title';
        search.placeholder = 'search by Title';
    }else{
        searchMood = 'category';
        search.placeholder = 'search by Category';
    }
    search.focus()
    search.value = '';
    showData();
}


function searchData(value) {
    let table = '';
    if (searchMood == 'title') {
        for (let i = 0; i < dataPro.length; i++) {
            if (dataPro[i].title.includes(value.toLowerCase())) {
                let result = (+dataPro[i].price + +dataPro[i].taxes + +dataPro[i].ads) - +dataPro[i].discount;
                let index = i + 1;
                table += `
                <tr>
                    <td>${index}</td>
                    <td>${dataPro[i].title}</td>
                    <td>${dataPro[i].price}</td>
                    <td>${dataPro[i].taxes}</td>
                    <td>${dataPro[i].ads}</td>
                    <td>${dataPro[i].discount}</td>
                    <td>${result}</td>
                    <td>${dataPro[i].category}</td>
                    <td><button onclick="updateData(${i})" id="update">update</button></td>
                    <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
                </tr>`;
            }
        }
    }else{
        for (let i = 0; i < dataPro.length; i++) {
            if (dataPro[i].category.includes(value.toLowerCase())) {
                let result = (+dataPro[i].price + +dataPro[i].taxes + +dataPro[i].ads) - +dataPro[i].discount;
                let index = i + 1;
                table += `
                <tr>
                    <td>${index}</td>
                    <td>${dataPro[i].title}</td>
                    <td>${dataPro[i].price}</td>
                    <td>${dataPro[i].taxes}</td>
                    <td>${dataPro[i].ads}</td>
                    <td>${dataPro[i].discount}</td>
                    <td>${result}</td>
                    <td>${dataPro[i].category}</td>
                    <td><button onclick="updateData(${i})" id="update">update</button></td>
                    <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
                </tr>`;
            }
        }
    }
    document.getElementById('tbody').innerHTML = table;
}
