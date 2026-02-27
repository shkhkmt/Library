function Book(title, author, pages, read) { 
  if (!new.target) { 
    throw Error("You must use the 'new' operator to call the constructor"); 
  } 
  this.title = title; 
  this.author = author; 
  this.pages = pages; 
  this.read = read; 
  this.info = function() { 
   return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read}`; 
  }; 
} 

const book1 = new Book("Javascipt, The Difinitive Guide", "David Flanagan", 1068, "read"); 

console.log(book1.author); 

console.log(book1.info()); 

