// create a plan...

// what is the app / what does it do
// Shopping cart app.
// You can filter through different items with select menu options
// Buy items in a shopping cart manner.

// lets filter by: 
// 1.) genre.
// 2.) price from 10-30
// 3.) price from 100-125
// 4.) price from 10-25

var products = [
    { id: 1, name: 'Golf Clubs Version 1', price: 104.99, genre: 'Clubs' },
    { id: 2, name: 'Golf Clubs Version 2', price: 124.99, genre: 'Clubs' },
    { id: 3, name: 'Golf Clubs Version 3', price: 204.99, genre: 'Clubs' },
    { id: 4, name: 'Golf Pants 1', price: 14.99, genre: 'Pants' },
    { id: 5, name: 'Golf Pants 2', price: 24.99, genre: 'Pants' },
    { id: 6, name: 'Golf Pants 3', price: 44.99, genre: 'Pants' },
    { id: 7, name: 'Golf T-Shirt 1', price: 44.99, genre: 'Shirt' },
    { id: 8, name: 'Golf T-Shirt 2', price: 34.99, genre: 'Shirt' },
    { id: 9, name: 'Golf T-Shirt 3', price: 35.99, genre: 'Shirt' }
  ];
  
  function ShoppingCart(type) {
    this.type = type + ' cart';
    this.productArray = [];
    this.objectStorage = {};
    fetch('https://jsonplaceholder.typicode.com/comments/5')
      .then(res => res.json())
      .then(res => {
        for (var key in res) {
          this.objectStorage[key] = res[key];
        }
      })
      .catch(error => {
        document.body.appendChild('<div>' + error + '</div>');
      })
    this.number = 3;
    this.products = document.getElementById('view')
      .innerHTML = JSON.stringify(products,null,2);
  }
  
  Array.prototype.mfilter = function(func) {
    var filtered = [];
    for (var i = 0; i < this.length; i++) {
      if (func(this[i], i, this)) {
        filtered.push(this[i]);
      }
    }
    return filtered;
  };
  
  ShoppingCart.prototype.test = 'cart';
  
  function Filters(filters) {
    ShoppingCart.call(this);
    this.filters = filters; 
    this.number = Math.random() * 200;
  }
  
  ShoppingCart.prototype.filterArray = function(type, element) {
    this.productArray = [];
    for (var key in products) {
      this.productArray.push(products[key])
    }
    
    if (element && type === 'genre') {
      this.productArray = this.productArray.mfilter(function(item) {
        return item && item.genre === element;
      });
    } 
    
    else if (element && type === 'price') {
     var range = element.split('-');
     console.log(range);
     this.productArray = this.productArray.mfilter(function(item) {
        return item && item.price >= range[0] && item.price < range[1];
      });     
    }
    
    else {
      var removeIndex = this.productArray.map(function(item) {
        return item.id
      }).indexOf(type);
      
      this.productArray.splice(removeIndex, 1) || {};
    }
    this.updateUI();
  }
  
  ShoppingCart.prototype.updateUI = function() {
    document.getElementById('view')
      .innerHTML = JSON.stringify(this.productArray,null,2);
  }
  
  Filters.prototype = Object.create(ShoppingCart.prototype);
  Filters.prototype.constructor = ShoppingCart;
  
  Filters.prototype.grabApiData = function() {
    // so right now we're sharing constructors and prototype!
    console.log(this.objectStorage.email + 
           '\n' + this.number + '\n' + this.test);
    
    console.log(this.objectStorage.body);
    
    this.productArray = this.objectStorage;
    this.updateUI();
  }
  
  Filters.prototype.clear = function() {
    this.productArray = products;
    this.updateUI();
  }
  
  console.log(Filters.prototype.constructor === ShoppingCart);
  
  var s = new ShoppingCart('Shopping');
  var f = new Filters('Filters');