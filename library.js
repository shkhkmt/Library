const myLibrary = []; 
const content = document.querySelector(".content"); 

function Book(title, author, pages, read) { 
  if (!new.target) { 
    throw Error("You must use the 'new' operator to call the constructor"); 
  } 
  this.title = title; 
  this.author = author; 
  this.pages = pages; 
  this.read = read;
  this.id = CSS.escape(crypto.randomUUID()); 
  this.info = function() { 
   return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read}`; 
  }; 
}

Book.prototype.toggleRead = function() { 
  this.read = !this.read; 
} 

function addBookToLibrary(title, author, pages, read) { 
  const thisRead = document.querySelector("#read"); 
  let readValue;

  if (thisRead.checked) { 
    readValue = true; 
  } else { 
    readValue = false; 
  }

  console.log(readValue); 
  const newBook = new Book(title, author, pages, readValue); 

  myLibrary.push(newBook); 
} 

Object.setPrototypeOf(addBookToLibrary.prototype, Book.prototype); 

function appendBook(myLibrary) {
   for (let i=0; i < myLibrary.length; i++) {  
    let id = document.querySelector(myLibrary[i].id); 

    if (document.getElementById(myLibrary[i].id) !== null) { 
       console.log(`Title: '${myLibrary[i].title}' exists`);  
    }
    else {

    //create elements 
    const card = document.createElement("div");
    card.classList.add("card"); 
    const cardTitle = document.createElement("h2"); 
    const cardAuthor = document.createElement("p");
    const cardPages = document.createElement("p"); 
    const deleteBtn = document.createElement("button"); 
    const readBtn = document.createElement("button"); 
    const btnDiv = document.createElement("div"); 
    deleteBtn.textContent = "Delete";
    deleteBtn.classList.add("deleteBtn"); 
    readBtn.classList.add("readBtn"); 
    readBtn.id = `btn${myLibrary[i].id}`; 

    //provide content
    cardTitle.textContent = myLibrary[i].title; 
    cardAuthor.textContent = myLibrary[i].author; 
    cardPages.textContent = myLibrary[i].pages; 
    card.id = myLibrary[i].id; 
 
      if (myLibrary[i].read === true) { 
       readBtn.textContent = "Read";
       card.style.borderRight = "4px solid blue"; 
     } else if (myLibrary[i].read === false) { 
       readBtn.textContent = "Not Read";
       card.style.borderRight = "4px solid red"; 
     }

   
    // add to page
    content.appendChild(card); 
    card.appendChild(cardTitle); 
    card.appendChild(cardAuthor); 
    card.appendChild(cardPages); 
    card.appendChild(btnDiv);
    btnDiv.appendChild(deleteBtn); 
    btnDiv.appendChild(readBtn); 
    
  }
}
}


Object.setPrototypeOf(appendBook.prototype, addBookToLibrary.prototype); 

const dialog = document.getElementById("#addBook"); 
const add = document.getElementById("#newBook"); 
const header = document.querySelector(".header"); 
const title = document.querySelector("#title"); 
const author = document.querySelector("#author"); 
const pages = document.querySelector("#pages"); 
const read = document.querySelector("#read"); 
const form = document.querySelector("#bookForm"); 



function handleNewBook(event) { 
  if (event.target.id === 'newBook') { 
    addBookToLibrary(title.value, author.value, pages.value, read.value);    
    appendBook(myLibrary); 
    form.reset(); 
  }
} 

function deleteBook(event) { 
  const grandparent = event.target.closest(".card"); 
  const targetBook = grandparent.id; 
  const targetIndex = myLibrary.findIndex(myLibrary => myLibrary.id === targetBook); 
  console.log(targetIndex);  
  if (targetIndex !== -1 && event.target.className === "deleteBtn") { 
    myLibrary.splice(targetIndex, 1); 
    grandparent.remove(); 
    console.log(event.target.id); 
  }  
}

function toggleRead(event) { 
  const grandparent = event.target.closest(".card"); 
  const targetBook = grandparent.id; 
  const targetIndex = myLibrary.findIndex(myLibrary => myLibrary.id === targetBook); 
  const currentCard = document.querySelector(`#${targetBook}`); 
  const btnDiv =  event.target.closest(".readBtn"); 
  console.log(btnDiv); 
  console.log(`btn${targetBook}`); 
  console.log(`#${currentCard}`);
  console.log(grandparent.id); 
  
  if (targetIndex !== -1 && event.target.className === "readBtn") {
    myLibrary[targetIndex].toggleRead();
    console.log(myLibrary[targetIndex].read); 
    if (myLibrary[targetIndex].read === false) { 
      grandparent.style.borderRight = "4px solid red"; 
      btnDiv.textContent = "Not Read"; 
    } else {
      grandparent.style.borderRight = "4px solid blue"; 
      btnDiv.textContent = "Read"; 
    }
  } 
}

header.addEventListener('click', handleNewBook); 

content.addEventListener('click', deleteBook); 

content.addEventListener('click', toggleRead); 

// const book1 = new Book("Javascipt, The Difinitive Guide", "David Flanagan", 1068, "read"); 

// console.log(book1.author); 

// console.log(book1.info()); 

// Object.getPrototypeOf(book1) === book1.prototype; // returns true

/*
function Hero(name, level) { 
  this.name = name; 
  this.level = level; 
} 

function Warrior(name, level, weapon) { 
  Hero.call(this, name, level); 

  this.weapon = weapon; 
} 

function Healer(name, level, spell) { 
  Hero.call(this, name, level); 

  this.spell = spell; 
} 

// link prototypes and add prototype methods

Object.setPrototypeOf(Warrior.prototype, Hero.prototype); 
Object.setPrototypeOf(Healer.prototype, Hero.prototype); 

Hero.prototype.greet = function () { 
  return `${this.name} says hello.`; 
} 

Warrior.prototype.attack = function () { 
  return `${this.name} attacks with the ${this.weapon}.`; 
} 

Healer.prototype.heal = function () { 
  return `${this.name} casts ${this.spell}.` 
} 

const hero1 = new Warrior('Brutus', 1, 'knife'); 
const hero2 = new Healer('Cleopatra', 1, 'cure'); 

console.log(hero2.heal()); 
*/ 
