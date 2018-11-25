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
  this.cart = [];
  this.dom = '';
  this.objectStorage = {};
  fetch('https://jsonplaceholder.typicode.com/comments/5')
    .then(res => res.json())
    .then(res => {
      for (var key in res) {
        // caches our data for whenever we want to use it.
        this.objectStorage[key] = res[key];
      }
    })
    .catch(error => {
      document.body.appendChild(`<div>${error}</div>`);
    })
  for (var j = 0; j < products.length; j++) {
    var product = products[j];
    this.dom = this.returnCollections(this.dom, product);
  }
  document.getElementById('collection')
    .innerHTML = this.dom;
  this.number = 3;
}

ShoppingCart.prototype.returnCollections = function(dom, collection) {
  dom += 
    '<li class="collection-item avatar" id="' + collection.id + '">' +
      '<i class="material-icons circle orange">insert_chart</i>' +
      '<span class="title">' + collection.name + '</span>' +
      '<p>'+ collection.genre + ' <br>'+ collection.price + '</p>' +
      '<a href="#!" class="secondary-content">' +
        '<i class="material-icons" id="addToCart">add</i></a>' +
    '</li>';
 return dom;
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

var getClosest = function (elem, selector) {

	// Element.matches() polyfill
	if (!Element.prototype.matches) {
	    Element.prototype.matches =
	        Element.prototype.matchesSelector ||
	        Element.prototype.mozMatchesSelector ||
	        Element.prototype.msMatchesSelector ||
	        Element.prototype.oMatchesSelector ||
	        Element.prototype.webkitMatchesSelector ||
	        function(s) {
	            var matches = (this.document || this.ownerDocument).querySelectorAll(s),
	                i = matches.length;
	            while (--i >= 0 && matches.item(i) !== this) {}
	            return i > -1;
	        };
	}

	// Get the closest matching element
	for ( ; elem && elem !== document; elem = elem.parentNode ) {
		if ( elem.matches( selector ) ) return elem;
	}
	return null;

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
  this.dom = '';
  console.log(this.productArray.length);
  for (var i = 0; i < this.productArray.length; i++) {
    var item = this.productArray[i];
    this.dom = this.returnCollections(this.dom, item);
  }
  document.getElementById('collection')
    .innerHTML = this.dom;
}

Filters.prototype = Object.create(ShoppingCart.prototype);
Filters.prototype.constructor = ShoppingCart;

Filters.prototype.grabApiData = function() {

  console.log(`${this.objectStorage.email}'\n'${this.number}'\n'${this.test}`);
  console.log(this.objectStorage.body);
  
  this.productArray = this.objectStorage;
  this.updateUI();
}

Filters.prototype.clear = function() {
  this.productArray = products;
  this.updateUI();
}

function MyCart(name) {
  ShoppingCart.call(this);
  this.cartList = document.getElementById('drop');
  this.name = name;
}

MyCart.prototype = Object.create(ShoppingCart.prototype);
MyCart.prototype.constructor = ShoppingCart;

MyCart.prototype.addToCart = function(...item) {
  this.cart.push(...item);
  console.log(this.cart);
}

MyCart.prototype.init = function() {
  var self = this;
  document.addEventListener('click', function(e) {
    this.dom = '';

    if (e.target && e.target.id == 'addToCart') {
       // clicked add to cart.
      var parent = getClosest(e.target, '.collection-item');
      // console.log(parent.id);
      self.cart.push(products[parent.id]);
    }
    
   for (var j = 0; j < self.cart.length; j++) {
      var items = self.cart[j];
      this.dom = self.returnCollections(this.dom, items);
      self.cartList.innerHTML = this.dom;
    }
    
  console.log(JSON.stringify(self.cart,null,2));

  }, false)
}

console.log(MyCart.prototype.constructor === ShoppingCart);

var s = new ShoppingCart('Shopping');
var f = new Filters('Filters');
var cart = new MyCart('My Cart');

console.log(cart.number);
cart.init();