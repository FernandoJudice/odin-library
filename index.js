function Book(title, author, pages, is_read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.is_read = is_read;
    this.info = function(){
        let read = is_read ? "already read" : "not read yet";
        return this.title + " by " + this.author + ", " + this.pages + " pages, " + read
    }
}

const books = [];
const theHobbit = new Book("The Hobbit", "J.R.R Tolkien", 295, true);
books.push(theHobbit)

const display = document.querySelector(".display");
const addBook = document.querySelector(".myButton");
addBook.onclick = (e) => alert(books[0].info());

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

renderBookList(books);


// let accumulator;
// let operator;
// let buffer = "";
// let displaySize = 4;


// renderKeyboard();

// document.addEventListener('keydown', (event) => onKeyboardPress(event.key));

// function renderKeyboard(){
//     for (let i=0; i<6; i++) {
//         const row = document.createElement("div");
//         row.classList.add("row");
//         left.appendChild(row);
        
//         if (i === 0) {
//             createButton(row,'Display size', () => resizeDisplay(prompt()));
//             createButton(row,'C', clearAll, "clear");
//             createButton(row,'<=', clearLastNumber);
            
//         } else if (i<4){
//             for (let j=0;j<3;j++) {
//                 createButton(row,(i-1)*3+j+1,loadBuffer)
//             }
//             switch(i){
//                 case 1:
//                     createButton(row,'+',resolveOperation,"operator");
//                     break;
//                 case 2:
//                     createButton(row,'-',resolveOperation,"operator");
//                     break;
//                 case 3:
//                     createButton(row,'*',resolveOperation,"operator");
//                     break;
//             }
//         } else if (i === 4) {
//             const calcButton = createButton(row,0, loadBuffer);
//             calcButton.style.flex = "2 0 auto";
//             calcButton.style.padding = "1em 12px";
//             createButton(row,'.',addDecimal);
//             createButton(row,'/',resolveOperation,"operator");
//         } else {
//             createButton(row,`=`,resolveOperation,"equal");
//         }
//     }
// }

// function onKeyboardPress(key){
//     if(Number(key))
//         loadBuffer(key);
//     if(key === `.`){
//         addDecimal();
//     }
//     if(key === 'Backspace' || key === 'Delete'){
//         clearLastNumber();
//     }
//     if(key === 'Enter' || key === '='){
//         resolveOperation('=');
//     }
//     if('+-*/'.includes(key)){
//         resolveOperation(key);
//     }
// }

// function clearAll() {
//     buffer = "";
//     accumulator = null;
//     operator = null;
//     renderDisplay("");
// }

// function addDecimal() {
//     if(buffer.includes('.'))
//         return
//     if(buffer){
//         buffer += '.';
//         renderDisplay(buffer);
//     }
// }

// function clearLastNumber(){
//     if (buffer) {
//         buffer = buffer.slice(0,-1);
//         renderDisplay(buffer);
//     } else {
//         clearAll()
//     }
// }

// function resizeDisplay(value) {
//     if(Number(value)){
//         displaySize = Math.round(Number(value));
//         displaySize = Math.max(displaySize,4);
//         displaySize = Math.min(displaySize,16);
//     } else {
//         alert("Please, insert a number between 4 and 16");
//     }
// }

// function renderDisplay(value){
//     let compactValue = value;
//     console.log(value);
    
//     if(Number(value)) {
//         const parts = value.split('.');

//         if (parts[0].length > displaySize) {
//             let exp = parts[0].length - displaySize + 1;
//             compactValue = String(Math.round(Number(value)/(10**(exp+1)))); // exp + 1 to account for the E symbol in exponent
//             compactValue += 'E'
//             compactValue += exp;
//         } else if (value.length > displaySize) {
//             let decimalSize = displaySize - parts[0].length - 1;
//             compactValue = String(Number(value).toFixed(decimalSize));
//         }
//     }

//     display.textContent = compactValue;
// }

// function loadBuffer(value){
//     if(buffer.length >= displaySize)
//         return

//     if (!isNaN(Number(value))) {
//         if (!buffer) {
//             display.textContent = "";
//             buffer = "";
//         } 
//         buffer += value;
//         renderDisplay(buffer);
//     }
// }

// function resolveOperation(selection){
//     operate();
//     selectOperation(selection);
// }

// function selectOperation(selection){
//     switch(selection){
//         case '+':
//             operator = add;
//             break;
//         case '-':
//             operator = subtract;
//             break;
//         case '*':
//             operator = multiply;
//             break;
//         case '/':
//             operator = divide;
//             break;
//         case '=':
//             operator = null;
//             break;
//         default:
//             renderDisplay("Error - invalid operation");
//             break;
//     }
// }

// function createButton(parent,contentText,contentCallback,newClass){
//     const calcButton = document.createElement("button");
//     calcButton.classList.add("calcButton");
//     calcButton.style.flex = "1 0 auto";
//     calcButton.onclick = (e) => contentCallback(e.target.textContent);
//     if(newClass)
//         calcButton.classList.add(newClass);
//     parent.appendChild(calcButton);

//     const buttonText = document.createElement("span");
//     buttonText.textContent = contentText;
//     calcButton.appendChild(buttonText);

//     return calcButton
// }

// function operate(){
//     if(!buffer)
//         return
//     if(!accumulator){
//         accumulator = Number(buffer);
//     } else if (operator){
//         accumulator = operator(Number(accumulator),Number(buffer));
//     }
//     renderDisplay(String(accumulator));
//     buffer = "";
//     operator = null;
//     return accumulator;
// }

// function add(a,b){
//     return a+b
// }

// function subtract(a,b){
//     return a-b
// }

// function multiply(a,b){
//     return a*b
// }

// function divide(num,den){
//     if (den === 0) {
//         return "ERROR - Cannot divide by zero"
//     }
//     return num/den
// }

