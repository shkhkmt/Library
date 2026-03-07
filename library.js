const myLibrary = []; 

function Book(title, author, pages, read) { 
  if (!new.target) { 
    throw Error("You must use the 'new' operator to call the constructor"); 
  } 
  this.title = title; 
  this.author = author; 
  this.pages = pages; 
  this.read = read === 'read';
  this.id = crypto.randomUUID(); 
  this.info = function() { 
   return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read}`; 
  }; 
}

Book.prototype.toggleRead = function() { 
  this.read = !this.read; 
} 

function addBookToLibrary(title, author, pages, read) { 
  const newBook = new Book(title, author, pages, read); 

  myLibrary.push(newBook); 
} 

Object.setPrototypeOf(addBookToLibrary.prototype, Book.prototype); 



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
