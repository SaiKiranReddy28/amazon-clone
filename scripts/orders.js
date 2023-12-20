import {orders_list} from "../data/orders_list.js";
import { getProductDetails } from "../data/products.js";
import { get_delivery_options_details } from "../data/delivery_options.js";
import { track_button_called } from "../data/target_button.js";
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";
import { get_cart_quantity } from "../data/cart.js";

//console.log(orders_list);

//updating no of cart items in header
document.querySelector(".js-cart-quantity").innerHTML=`${get_cart_quantity()}`;

function get_order_placed_date(ordereddate){
  //et ordereddate_date=ordereddate.split("T");
  //let ordered_date_format=ordereddate_date.format("MMMM DD");
  let ordered_date_format=dayjs(ordereddate).format("MMMM DD");
  return ordered_date_format;
}

function get_delivery_date_format(ordereddate,delivery_id){
  let delivery_matched_id=get_delivery_options_details(delivery_id);
  let delivery_date_format=dayjs(ordereddate).add(delivery_matched_id.days,'days').format("MMMM DD");
  return delivery_date_format;
}

let innerhtml=""
orders_list.forEach((order)=>{

        let order_headerhtml=
        `<div class="order-container js-order-container-${order.orderId}">
          
          <div class="order-header">
            <div class="order-header-left-section">
              <div class="order-date">
                <div class="order-header-label">Order Placed:</div>
                <div>${get_order_placed_date(order.orderPlacedDateTime)}</div>
              </div>
              <div class="order-total">
                <div class="order-header-label">Total:</div>
                <div>$${(order.orderTotalPriceCents/100).toFixed(2)}</div>
              </div>
            </div>

            <div class="order-header-right-section">
              <div class="order-header-label">Order ID:</div>
              <div>${order.orderId}</div>
            </div>
          </div>`

        let order_details_grid_html=""
        order.orderItems.forEach((product)=>{
           let matchingItem=getProductDetails(product.productId);

           order_details_grid_html+=
          `<div class="order-details-grid">
            <div class="product-image-container">
              <img src=${matchingItem.image}>
            </div>

            <div class="product-details">
              <div class="product-name">
                ${matchingItem.name}
              </div>
              <div class="product-delivery-date">
                Arriving on: ${get_delivery_date_format(order.orderPlacedDateTime,product.deliveryOptionId)}
              </div>i
              <div class="product-quantity">
                Quantity: ${product.quantity}
              </div>
              <button class="buy-again-button button-primary">
                <img class="buy-again-icon" src="images/icons/buy-again.png">
                <span class="buy-again-message">Buy it again</span>
              </button>
            </div>

            <div class="product-actions " >
              <a href="tracking.html" target="_blank" >
                <button class="track-package-button button-secondary js-tracking-button"
                data-orderid="${order.orderId}" data-productid="${matchingItem.id}">
                  Track package
                </button>
              </a>
            </div>
        </div>`
        });
    innerhtml+=(order_headerhtml+order_details_grid_html)
});

console.log(innerhtml);

document.querySelector(".js-orders-grid").innerHTML=innerhtml;


//code for knowing tracking button pressed.
document.querySelectorAll(".js-tracking-button").
  forEach((element)=>{
    element.addEventListener('click',()=>{
      console.log("tracking button pressed");
      const {orderid,productid} = element.dataset;
      console.log(orderid);
      console.log(productid);
      //present_tracking_order_id=orderid;
      //present_tracking_product_id=productid;
      //console.log(present_tracking_order_id);
      //console.log(present_tracking_product_id);
      //localStorage.setItem('present_tracking_order_id',present_tracking_order_id);
      //localStorage.setItem('present_tracking_product_id',present_tracking_product_id);
      //main_function(orderid,productid);
      track_button_called(orderid,productid);
      
  });
});

