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

function Library(books) {
    this.books = books;
    this.addBooktoLibrary = function(title, author, pages, is_read) {
        const newBook = new Book(title, author, pages, is_read);
        books.push(newBook);
    }
    this.removeBook = function(index) {
        books.splice(index,1);
    }
    this.toggleRead = function toggleRead(index) {
        books[index].read = !books[index].read;
    }
}

const theHobbit = new Book("The Hobbit", "J.R.R Tolkien", 295, true); // needs instance to iterate through values
const library = new Library([theHobbit]);

const display = document.querySelector(".display");
const formContainer = document.querySelector(".formContainer");
const addBookButton = document.querySelector(".myButton");
addBookButton.onclick = (e) => renderNewBookForm();


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
        const col = document.createElement("th");
        col.textContent = key;
        row.appendChild(col);
    }

    const checkReadHeader = document.createElement("th");
    checkReadHeader.textContent = "Toggle Read";
    row.appendChild(checkReadHeader);
    
    const deleteBookHeader = document.createElement("th");
    deleteBookHeader.textContent = "delete Book";
    row.appendChild(deleteBookHeader);

    for(let [index, book] of bookList.entries()) {
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

        const checkRead = document.createElement("td");
        row.appendChild(checkRead);
        const readButton = document.createElement("button");
        readButton.classList.add("myButton");
        readButton.dataset.index = index;
        readButton.addEventListener("click",()=>{
            library.toggleRead(readButton.dataset.index);
            clearBookList();
            renderBookList(library.books);
        })
        checkRead.appendChild(readButton);

        const deleteBook = document.createElement("td");
        row.appendChild(deleteBook);
        const deleteButton = document.createElement("button");
        deleteButton.classList.add("myButton");
        deleteButton.dataset.index = index;
        deleteButton.addEventListener("click",()=>{
            library.removeBook(deleteButton.dataset.index);
            clearBookList();
            renderBookList(library.books);
        })
        deleteBook.appendChild(deleteButton);
    }
}


function submitForm(event) {
    event.preventDefault();
    const form = event.target;
    const { title, author, pages, read } = Object.fromEntries(new FormData(event.target));
    library.addBooktoLibrary(title,author,pages,read == "on");
    clearBookList();
    renderBookList(library.books);
    clearForm();

}


function clearBookList() {
    display.removeChild(display.firstChild)
}


function clearForm() {
    if (formContainer.firstChild) {
        formContainer.removeChild(formContainer.firstChild);
    }
}


function renderNewBookForm() {
    clearForm();
    const form = document.createElement("form");
    form.method = "post";
    form.action="my-handling-form-page";
    form.addEventListener("submit",submitForm)
    formContainer.appendChild(form);

    for (let key in theHobbit) {
        if (typeof theHobbit[key] == "function"){
            continue;
        }
        const name = document.createElement("p");
        name.textContent = key;
        form.appendChild(name);
        const input = document.createElement("input");
        input.required = true;
        switch(typeof theHobbit[key]) {
            case "number":
                console.log(typeof theHobbit[key]);
                input.type = "number";
                break;
            case "boolean":
                console.log(typeof theHobbit[key]);
                input.type = "checkbox";
                input.required = false;
                break;
            default:
                console.log(typeof theHobbit[key]);
                input.type = "text";
                break;
        }
        input.id = key;
        input.name = key;
        form.appendChild(input);
        
    }

    const button = document.createElement("button");
    button.type = "submit";
    button.classList.add("myButton");
    button.textContent = "Add Book";
    form.appendChild(button);
}


renderBookList(library.books);