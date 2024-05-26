const myLibrary = [];

const inputs = document.getElementsByTagName("input");
const book_div = document.querySelector(".book");

const addButton = document.querySelector(".add-btn");
const formSubmitButton = document.querySelector(".sub");
const formCloseButton = document.querySelector(".close");

const title = document.getElementById("title");
const author = document.getElementById("author");
const pages = document.getElementById("pages");
const stat = document.getElementById("status");

const modal = document.querySelector(".modal");
const div = document.createElement("div");

const title_error = document.querySelector(".t");
const author_error = document.querySelector(".auth");
const pages_error = document.querySelector(".pag");



function Book(title, author, numOfPages, hasRead){
    
    this.title= title;
    this.author = author;
    this.numOfPages = numOfPages;
    this.hasRead = hasRead;
}


Book.prototype.info = function(index){

    const wrapper_div = document.createElement("div");
    const content_div = document.createElement("div");
    const title_div = document.createElement("h2");
    const author_div = document.createElement("div");
    const pages_div = document.createElement("div");
    const read_div = document.createElement("div");
    const image = document.createElement("div");
    const buttonsWrapper = document.createElement("div");
    const readButton = document.createElement("button");
    const removeButton = document.createElement("button");

    title_div.classList.add("title");
    author_div.classList.add("author");
    pages_div.classList.add("author");


    book_div.appendChild(wrapper_div);
    wrapper_div.appendChild(image);
    wrapper_div.appendChild(content_div);
    content_div.appendChild(title_div);
    content_div.appendChild(author_div);
    content_div.appendChild(pages_div);
    content_div.appendChild(read_div);
    content_div.appendChild(buttonsWrapper);
    buttonsWrapper.appendChild(readButton);
    buttonsWrapper.appendChild(removeButton);

    title_div.textContent = `${this.title}`;
    author_div.textContent = `Author: ${this.author}`;
    pages_div.textContent = `Pages: ${this.numOfPages}`;
    readButton.textContent = `${this.hasRead}`;
    removeButton.textContent = "❌ remove";
    readButton.classList.add("card-btn", "read-btn", `${index}`);
    removeButton.classList.add("card-btn", "remove-btn", `${index}`);
    buttonsWrapper.classList.add("card-buttons");
    content_div.classList.add("content");
    wrapper_div.classList.add("card", `${index}`);
    image.classList.add("image");

}

function addBookToLibrary(book){
    myLibrary.push(book);
}

function displayBooks(){
    book_div.innerHTML = '';
    for(let count=0; count < myLibrary.length; count++)
        {
            myLibrary[count].info(count);
        }
    attachReadButtonListeners();
    attachRemoveButtonListeners();
}

function removeBook(index){
    myLibrary.splice(index, 1);
    displayBooks();
}


/******************* form validation *****************/

function checkInput(val){
    if (!val)
        return error = "⛔ All fields are required!";
    else
        return "";
}


function checkForm(att)
{
    switch(att)
    {
        case "title":
            title_error.innerHTML = checkInput(title.value);
            break;
        case "author":
            author_error.innerHTML = checkInput(author.value);
            break;
        case "pages":
            pages_error.innerHTML = checkInput(pages.value);
            break;
    }
}


/************* event listners *****************/

[...inputs].forEach((input)=>{
    input.addEventListener("change", (e)=>{
        const att = input.getAttribute("id");
        checkForm(att);
    })
});



addButton.addEventListener("click", ()=>{
    modal.showModal();
}) 

formSubmitButton.addEventListener("click", (e)=>{
    e.preventDefault();
    const statValue = stat.checked? "📔 read": "📔 unread";
    const book1 = new Book(title.value, author.value, pages.value, statValue);
    if (title.value && author.value && pages.value)
        {
            addBookToLibrary(book1);
            displayBooks();
            title.value = '';
            author.value = '';
            pages.value = '';
            stat.value = '';
            modal.close();
        }
})

formCloseButton.addEventListener("click", (e)=>{
    e.preventDefault();
    title.value = '';
    author.value = '';
    pages.value = '';
    stat.value = '';
    modal.close();
})

function attachRemoveButtonListeners(){
    const removeButtons = document.querySelectorAll(".remove-btn");
    removeButtons.forEach((removeButton) => {
        removeButton.addEventListener("click", (e) => {
            const index = e.target.getAttribute("class").split(" ");
            removeBook(index[2]);
        });
    });

}

function attachReadButtonListeners() {
    const readButtons = document.querySelectorAll(".read-btn");
    readButtons.forEach((readButton, index) => {
        readButton.addEventListener("click", (e) => {
            if (readButton.textContent === "📔 read") {
                readButton.textContent = "📔 unread";
            } else {
                readButton.textContent = "📔 read";
            }
            myLibrary[readButton.getAttribute("class").split(" ")[2]].hasRead = readButton.textContent;            
        });
    });
}