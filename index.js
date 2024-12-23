function Book(title, author, pages, is_read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = is_read;
    this.info = function(){
        let read = is_read ? "already read" : "not read yet";
        return this.title + " by " + this.author + ", " + this.pages + " pages, " + read
    }
}

const books = [];
const theHobbit = new Book("The Hobbit", "J.R.R Tolkien", 295, true);
books.push(theHobbit)

const display = document.querySelector(".display");
const formContainer = document.querySelector(".formContainer");
const addBook = document.querySelector(".myButton");
addBook.onclick = (e) => renderNewBookForm();

function renderBookList(bookList) {
    let table = document.createElement("table");
    table.classList.add("table");
    display.appendChild(table);
    const row = document.createElement("tr");
    table.appendChild(row);

    for(let key in bookList[0]) {
        if (typeof bookList[0][key] == "function"){
            continue;
        }
        const col = document.createElement("td");
        col.textContent = key;
        row.appendChild(col);
    }

    for(let book of bookList) {
        const row = document.createElement("tr");
        table.appendChild(row)
        for (let key in book) {
            if (typeof book[key] == "function"){
                continue;
            }
            const col = document.createElement("td");
            col.textContent = book[key];
            row.appendChild(col);
        }
    }
}

function clearTable() {
    display.removeChild(display.firstChild)
}

function renderNewBookForm() {
    if (formContainer.firstChild) {
        formContainer.removeChild(formContainer.firstChild);
    }

    const form = document.createElement("form");
    form.method = "post";
    form.action="my-handling-form-page";
    form.addEventListener("submit",function(event){
        event.preventDefault();
        alert("submitted")})
    formContainer.appendChild(form);

    for (let key in theHobbit) {
        if (typeof theHobbit[key] == "function"){
            continue;
        }
        const name = document.createElement("p");
        name.textContent = key;
        form.appendChild(name);
        const input = document.createElement("input");
        switch(typeof theHobbit[key]) {
            case "number":
                console.log(typeof theHobbit[key]);
                input.type = "number";
                break;
            case "boolean":
                console.log(typeof theHobbit[key]);
                input.type = "checkbox";
                break;
            default:
                console.log(typeof theHobbit[key]);
                input.type = "text";
                break;
        }
        input.id = key;
        input.name = key;
        input.required = true;
        form.appendChild(input);
        
    }
    
    const button = document.createElement("button");
    button.type = "submit";
    button.classList.add("myButton");
    button.textContent = "Add Book";
    form.appendChild(button);
}

renderBookList(books);