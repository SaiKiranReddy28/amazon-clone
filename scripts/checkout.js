import {cart , delete_item_from_cart, get_cart_quantity, update_product_quantity, modify_delivery_date_option } from "../data/cart.js";

import { products, getProductDetails} from "../data/products.js";

import {delivery_options, get_delivery_options_details} from "../data/delivery_options.js";

import { add_cart_to_cartlist } from "../data/orders_list.js";

import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";

//This is called MVC Model View Controller. Used in many of javascript frameworks. 

function renderOrderSummary(){
  //used for calculating date format above image in checkout page.
  function get_date_format(cartItem){
    
    let ans="";
    delivery_options.forEach((delivery_option)=>{
      if (cartItem.deliveryOptionId==delivery_option.id){
        let todaydate=dayjs();
        let futuredate=todaydate.add(delivery_option.days,"days");
        let futuredateformat=futuredate.format('dddd, MMMM D');
        ans=futuredateformat;
        //return String(futuredateformat);
      }
  });
  return ans;
  }

  function calculate_date(matchingItem,cartItem){
    let html="";
    delivery_options.forEach((delivery_option)=>{
      let todaydate=dayjs();
      let futuredate=todaydate.add(delivery_option.days,"days");
      let futuredateformat=futuredate.format('dddd, MMMM D');
      console.log(futuredateformat);

      let pricestring = delivery_option.priceCents == 0 ? "FREE" : String("$"+(delivery_option.priceCents/100).toFixed(2))
      
      const isChecked = delivery_option.id == cartItem.deliveryOptionId;
      
      html += `
        <div class="delivery-option js-delivery-option" data-product-id="${matchingItem.id}" data-deliveryoption-id="${delivery_option.id}">
        <input type="radio"
          ${isChecked ? "checked" : "" }
          class="delivery-option-input"
          name="delivery-option-${matchingItem.id}">
        <div>
          <div class="delivery-option-date">
            ${futuredateformat}
          </div>
          <div class="delivery-option-price">
            ${pricestring} - Shipping
          </div>
        </div>
      </div>
        `;
      
    });
    return html;
  };


  let cart_item_summary_HTML="";

  cart.forEach((cartItem)=>{
      console.log("cartid_from_checkout.js",cartItem.productId);
      console.log(cartItem.quantity);

      let matchingItem;
      products.forEach((productItem)=>{
          if (productItem.id==cartItem.productId){
              matchingItem=productItem;
          }
      });
      if(!matchingItem){
          console.log("Item not found in cart");
      }
      console.log(matchingItem.name);
      
      const dateformat_for_date_above_image=get_date_format(cartItem);
      //console.log(dateformat_for_above_image);

      cart_item_summary_HTML += `
          <div class="cart-item-container js-cart-item-containter-${matchingItem.id}">
              <div class="delivery-date">
                Delivery date: ${dateformat_for_date_above_image}
              </div>

              <div class="cart-item-details-grid">
                <img class="product-image"
                  src=${matchingItem.image}>

                <div class="cart-item-details">
                  <div class="product-name">
                    ${matchingItem.name}
                  </div>
                  <div class="product-price">
                    ${(matchingItem.priceCents/100).toFixed(2)}
                  </div>
                  <div class="product-quantity">
                    <span>
                      Quantity: <span class="quantity-label 
                      js-quantity-label-${matchingItem.id}">${cartItem.quantity}</span>
                    </span>
                    <span class="update-quantity-link link-primary js-update-link"
                    data-product-id="${matchingItem.id}">
                      Update
                    </span>
                    
                    <input class="quantity-input js-quantity-input-${matchingItem.id}">
                    <span class="save-quantity-link link-primary js-save-link"
                      data-product-id="${matchingItem.id}">
                      Save
                    </span>

                    <span class="delete-quantity-link link-primary js-delete-link" 
                    data-product-id="${matchingItem.id}">
                      Delete
                    </span>
                  </div>
                </div>

                <div class="delivery-options">
                  <div class="delivery-options-title">
                    Choose a delivery option:
                  </div>
                      ${calculate_date(matchingItem,cartItem)}
                </div>
              </div>
            </div>
      `;
  });

  console.log(cart_item_summary_HTML);

  document.querySelector(".js-order-summary").innerHTML=cart_item_summary_HTML;

  function update_no_of_cart_items_in_header(){
          let cartQuantity=get_cart_quantity();
          document.querySelector(".js-check-out-cart-quantity").innerHTML=`CheckOut(${cartQuantity} items)`;

  }
  //call at start of web page.
  update_no_of_cart_items_in_header();

  document.querySelectorAll(".js-delete-link")
      .forEach((link)=>{ 
          link.addEventListener("click",()=>{
          const deleted_product_id=link.dataset.productId;
          console.log("delete button pressed");
          console.log(deleted_product_id);
          delete_item_from_cart(deleted_product_id);
          //cart_item_summary_HTML.remove(`js-cart-item-containter-${deleted_product_id}`); 

          const element = document.querySelector
          (`.js-cart-item-containter-${deleted_product_id}`);
          console.log(element);
          element.remove();

          update_no_of_cart_items_in_header();
          calculate_payment_summary();
          });
      });

  document.querySelectorAll(".js-update-link")
      .forEach((link)=>{
          link.addEventListener("click",()=>{
              console.log("update button pressed");
              const update_product_id=link.dataset.productId;
              console.log(update_product_id);

              const container = document.querySelector
              (`.js-cart-item-containter-${update_product_id}`);
              container.classList.add('is-editing-quantity');

          });
      });

  document.querySelectorAll(".js-save-link").
      forEach((link)=>{
          link.addEventListener('click',()=>{
              const productId=link.dataset.productId;
              const container = document.querySelector
              (`.js-cart-item-containter-${productId}`);
              container.classList.remove('is-editing-quantity');
          

          const quantityInput=document.querySelector
          (`.js-quantity-input-${productId}`);

          let newQuantity = Number(quantityInput.value);

          console.log(newQuantity);
          
          // if inputing some -ve values I'm changing it to zero. 
          //Should imporve the functionality by popping alert message.
          if(newQuantity<=0){
              alert("Quantity should be a positive value");
            }
          else{
              update_product_quantity(productId,newQuantity);
              update_no_of_cart_items_in_header();
              document.querySelector(`.js-quantity-label-${productId}`).innerHTML=newQuantity;
          };
          calculate_payment_summary()
      });

  });

  //this code is to modify the radio button when selected
  document.querySelectorAll(".js-delivery-option").
    forEach((element)=>{
      element.addEventListener('click',()=>{
        const {productId,deliveryoptionId}=element.dataset;
        modify_delivery_date_option(productId,deliveryoptionId);
        calculate_payment_summary();
        renderOrderSummary();
        
      });
  });

  let order_total_PriceCents=0;
  function calculate_payment_summary(){
    
    let total_price_of_items=0;
    let total_shipping_charges=0;
    
    cart.forEach((cartItem)=>{

      let quantity=cartItem.quantity;
      let matchingProduct = getProductDetails(cartItem.productId);
      total_price_of_items+=(quantity*matchingProduct.priceCents);

      let matchedDeliveryId= get_delivery_options_details(cartItem.deliveryOptionId);
      total_shipping_charges+=matchedDeliveryId.priceCents;

    });

    let total_before_tax = total_price_of_items+total_shipping_charges;
    let tax_amount = total_before_tax/10;
    order_total_PriceCents= (total_before_tax+tax_amount);

    console.log(total_price_of_items);
    console.log(total_shipping_charges);
    console.log(total_before_tax);
    console.log(tax_amount);
    console.log(order_total_PriceCents);

    let present_cart_quantity="Items ("+String(get_cart_quantity())+"):";
    total_price_of_items=(total_price_of_items/100).toFixed(2);
    total_shipping_charges=(total_shipping_charges/100).toFixed(2);

    total_before_tax=(total_before_tax/100).toFixed(2);
    tax_amount=(tax_amount/100).toFixed(2);
    let order_total=(order_total_PriceCents/100).toFixed(2);
    
    document.querySelector(".js-no-of-items").innerHTML=`${present_cart_quantity}`;
    document.querySelector(".js-total_price_of_items").innerHTML=`$${total_price_of_items}`;
    document.querySelector(".js-total_shipping_charges").innerHTML=`$${total_shipping_charges}`;
    document.querySelector(".js-total_before_tax").innerHTML=`$${total_before_tax}`;
    document.querySelector(".js-tax_amount").innerHTML=`$${tax_amount}`;
    document.querySelector(".js-order_total").innerHTML=`$${order_total}`;
  };

  calculate_payment_summary();

  function payment_button_pressed(){
    console.log("payment button pressed");
    add_cart_to_cartlist(cart,order_total_PriceCents);
  }
    
  document.querySelector(".js-payment_button_pressed").
    addEventListener('click',()=>{
      payment_button_pressed();
    });
  
}

renderOrderSummary();