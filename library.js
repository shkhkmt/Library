'use strict' 

const myLibrary = []; 
const letters = "abcdefghijklmnopqrstuvwxyz" 
const content = document.querySelector(".content"); 

class Book {
  constructor(title, author, pages, read) {
    if (!new.target) { 
      throw Error("You must use the 'new' operator to call the constructor"); 
    }
    this.title = title; 
    this.author = author; 
    this.pages = pages + ' pages'; 
    this.read = (() => { 
      if (read === 'read') return true;  
      if (read === null) return false; 
      })();

    this.id = (() => {
      return Array.from({length: 5}, () => letters[Math.floor(Math.random() * letters.length)]).join(''); 
    })();
            
    this.info = function() {
      return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read}`; 
    };
  }

  toggleRead() { 
    this.read = !this.read;
  } 

  addBookToLibrary(array) {
    myLibrary.push(array); 
  } 
}


function appendBook() {
  for (let i=0; i < myLibrary.length; i++) { 

    if (document.getElementById(myLibrary[i].id) !== null) { 
      alert(`Title: '${myLibrary[i].title}' exists`);  
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
      readBtn.id = `btn${i+1}`;  

        //provide content
        cardTitle.textContent = myLibrary[i].title; 
        cardAuthor.textContent = myLibrary[i].author; 
        cardPages.textContent = myLibrary[i].pages; 
        card.id = myLibrary[i].id; 
 
        if (myLibrary[i].read === true) { 
          readBtn.textContent = "Read";
          card.style.borderRight = "4px solid blue"; 
        } 
        else if (myLibrary[i].read === false) { 
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

class Button { 
  constructor(value) { 
    this.value = value; 
  }

  handleNewBook = (event) => {
    if (event.target.id === 'newBook') {
      const formData = new FormData(form); 
      const title = formData.get('title'); 
      const author = formData.get('author'); 
      const pages = formData.get('pages'); 
      const read = formData.get('read');
      const bookAdded = new Book (title, author, pages, read);
      
      bookAdded.addBookToLibrary(bookAdded); 
      form.reset(); 
      appendBook(); 
    }
  }

  deleteBook(event) { 
    const grandparent = event.target.closest(".card"); 
     
    
    for (let i=0; i < myLibrary.length; i++) { 
      if (grandparent.id === myLibrary[i].id && event.target.className === "deleteBtn") { 
        myLibrary.splice(i, 1); 
        grandparent.remove(); 
      }
    }
  }

  toggleRead(event) { 
  const grandparent = event.target.closest(".card"); 
  const targetBook = grandparent.id; 
  const targetIndex = myLibrary.findIndex(myLibrary => myLibrary.id === targetBook); 
  const currentCard = document.querySelector(`#${targetBook}`); 
  const btnDiv =  event.target.closest(".readBtn"); 
  
  if (targetIndex !== null && event.target.className === "readBtn") {
    myLibrary[targetIndex].toggleRead();
    if (myLibrary[targetIndex].read === false) { 
      grandparent.style.borderRight = "4px solid red"; 
      btnDiv.textContent = "Not Read"; 
    } 
    else {
      grandparent.style.borderRight = "4px solid blue"; 
      btnDiv.textContent = "Read"; 
    }
  }
  }
}


let bookEntry = new Button('newBook');
let deleteEntry = new Button('deleteBtn'); 
let toggle = new Button(myLibrary.id);

const dialog = document.getElementById("#addBook"); 
const add = document.getElementById("#newBook"); 
const header = document.querySelector(".header"); 
const title = document.querySelector("#title"); 
const author = document.querySelector("#author"); 
const pages = document.querySelector("#pages"); 
const read = document.querySelector("#read"); 
const form = document.querySelector("#bookForm"); 

header.addEventListener('click', bookEntry.handleNewBook, 1000); 
content.addEventListener('click', deleteEntry.deleteBook, 1000); 
content.addEventListener('click', toggle.toggleRead, 1000); 



/*
function handleNewBook(event) { 
  if (event.target.id === 'newBook') {
    const formData = new FormData(form); 
    
    const title = formData.get('title'); 
    const author = formData.get('author'); 
    const pages = formData.get('pages'); 
    const read = formData.get('read');

    addBookToLibrary(title, author, pages, read); 
    form.reset(); 

    appendBook(); 
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

// header.addEventListener('click', handleNewBook); 

/// content.addEventListener('click', deleteBook); 

// content.addEventListener('click', toggleRead); 

// const book1 = new Book("Javascipt, The Difinitive Guide", "David Flanagan", 1068, "read"); 

// console.log(book1.author); 

// console.log(book1.info()); 

// Object.getPrototypeOf(book1) === book1.prototype; // returns true
*/ 

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
