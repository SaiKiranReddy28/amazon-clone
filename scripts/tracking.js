console.log("tracking javascript")
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";
import { getProductDetails } from "../data/products.js";
import { get_order_details} from "../data/orders_list.js";
import { get_delivery_options_details } from "../data/delivery_options.js";
import { present_tracking_order_id,present_tracking_product_id } from "../data/target_button.js";

console.log("order_id",present_tracking_order_id);
console.log("product_id",present_tracking_product_id);

function get_arriving_date(orderObject,matchingproduct){
    let delivery_option=0;
    orderObject.orderItems.forEach((item)=>{
      if(item.productId==matchingproduct.id){
        delivery_option=item.deliveryOptionId;
      }
    });
    let delivery_Id=get_delivery_options_details(delivery_option);
    let arriving_date_format=dayjs(orderObject.orderPlacedDateTime).add(delivery_Id.days,"days").format("dddd , MMMM D");
    return arriving_date_format;
}

function get_quantity_ordered(orderObject,matchingproduct){
    let matching_quantity=0;
    orderObject.orderItems.forEach((item)=>{
      if(item.productId==matchingproduct.id){
        matching_quantity=item.quantity;
      }
    });
    return matching_quantity;
}

function main_function(orderId,productId){
    console.log("tracking button called inside tracking js");
    let matchingorder=get_order_details(orderId);
    let matchingproduct=getProductDetails(productId);
    let inner_html=
        `
        <a class="back-to-orders-link link-primary" href="orders.html">
          View all orders
        </a>

        <div class="delivery-date">
          Arriving on  ${get_arriving_date(matchingorder,matchingproduct)}
        </div>

        <div class="product-info">
          ${matchingproduct.name}
        </div>

        <div class="product-info">
          Quantity: ${get_quantity_ordered(matchingorder,matchingproduct)}
        </div>

        <img class="product-image" src="${matchingproduct.image}">

        <div class="progress-labels-container">
          <div class="progress-label">
            Preparing
          </div>
          <div class="progress-label current-status">
            Shipped
          </div>
          <div class="progress-label">
            Delivered
          </div>
        </div>

        <div class="progress-bar-container">
          <div class="progress-bar"></div>
        </div>  
    `;

    console.log(inner_html);
    //this is linking with the orders.html file
    // should link with tracking.html file.
    //has_class_name();
    //document.getElementById("123").innerHTML=inner_html;
    
    document.querySelector(".js-order-tracking").innerHTML=inner_html;
    
}

main_function(present_tracking_order_id,present_tracking_product_id);