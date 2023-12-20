/*const products=[
  {
    id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
    image: "images/products/athletic-cotton-socks-6-pairs.jpg",
    name: "Black and Gray Athletic Cotton Socks - 6 Pairs",
    rating: {
      stars: 4.5,
      count: 87
    },
    priceCents: 1090,
    keywords: [
      "socks",
      "sports",
      "apparel"
    ]
  },
  {
    id: "54e0eccd-8f36-462b-b68a-8182611d9add",
    image: "images/products/black-2-slot-toaster.jpg",
    name: "2 Slot Toaster - Black",
    rating: {
      stars: 5,
      count: 2197
    },
    priceCents: 1899,
    keywords: [
      "toaster",
      "kitchen",
      "appliances"
    ]
  }
];*/

import {cart, add_to_cart, get_cart_quantity} from '../data/cart.js'; //importing carts so we dont need to load in html file.

import { products } from '../data/products.js'; //importing products so we dont need to load in html file

let productshtml='';

products.forEach((product)=>{
    productshtml += `
    <div class="product-container">
      <div class="product-image-container">
        <img class="product-image"
          src="${product.image}">
      </div>

      <div class="product-name limit-text-to-2-lines">
        ${product.name}
      </div>

      <div class="product-rating-container">
        <img class="product-rating-stars"
          src="images/ratings/rating-${product.rating.stars*10}.png">
        <div class="product-rating-count link-primary">
          ${product.rating.count}
        </div>
      </div>

      <div class="product-price">
        $${(product.priceCents/100).toFixed(2)}
      </div>

      <div class="product-quantity-container ">
        
        <select class="js-quantity-selector-${product.id}">
          <option selected value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
        </select>
      </div>

      <div class="product-spacer"></div>

      <div class="added-to-cart js-added-to-cart-${product.id}" >
        <img src="images/icons/checkmark.png">
        Added
      </div>

      <button class="add-to-cart-button button-primary js-add-to-cart" data-product-id="${product.id}" data-product-name="${product.name}" > 
        Add to Cart
      </button>
    </div>
    `;
});

console.log(productshtml);
document.querySelector(".js-products-grid").innerHTML=productshtml;

function update_no_of_cart_items_in_header(){
      let cartQuantity=get_cart_quantity();
      document.querySelector(".js-cart-quantity").innerHTML=cartQuantity;
        
};
update_no_of_cart_items_in_header();

function added_button_apperance(productId){
        
  document.querySelector(`.js-added-to-cart-${productId}`).style.opacity=1; //to make appear
  const mytimeout = setTimeout(() => {
    document.querySelector(`.js-added-to-cart-${productId}`).style.opacity=0; //to make it loose
  }, 1500);
  }

document.querySelectorAll(".js-add-to-cart").forEach((button)=>{
    button.addEventListener('click',()=>{
        const productId=button.dataset.productId;
        console.log(productId);
        console.log(button.dataset);

        //calling add to cart function
        add_to_cart(productId);

        //calling update_no_of_cart_items_in_header(){
        update_no_of_cart_items_in_header();

        //make added to cart popup appear
        added_button_apperance(productId);

    });
    
 });

