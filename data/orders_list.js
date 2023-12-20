import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";
//localStorage.clear();
export let orders_list = JSON.parse(localStorage.getItem('orders_list'));

if (orders_list==null || orders_list.length==0){
    console.log("orders_list is null");
    orders_list = [{
        orderId: get_unique_value(),
        orderPlacedDateTime: dayjs(),
        orderTotalPriceCents: 3950,
        orderItems: [
            {
              productId:"e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
              quantity:2,
              deliveryOptionId:1,
            },
            {
              productId:"15b6fc6f-327a-4ec4-896f-486349e85a3d",
              quantity:1,
              deliveryOptionId:2,
            },
            {
              productId: "83d4ca15-0f35-48f5-b7a3-1ea210004f2e",
              quantity:3,
              deliveryOptionId:3,
            }
          ]
    },
];
};

function get_unique_value(){
    const customFormat = 'YYYY-MM-DD-HH-mm-ss'; 
    let todaydate=dayjs();
    return todaydate.format(customFormat);
}

function saveToStorage(){
  localStorage.setItem('orders_list',JSON.stringify(orders_list));
}

export function add_cart_to_cartlist(cartId,order_total_price){
    console.log("add function called");
    orders_list.push({
        orderId: get_unique_value(),
        orderPlacedDateTime: dayjs(),
        orderTotalPriceCents: order_total_price,
        orderItems: cartId
    });
    console.log(orders_list);
    saveToStorage();
}

export function get_order_details(orderId){
  let matchedorder;
  orders_list.forEach((order) => {
    if(order.orderId==orderId){
      matchedorder=order;
    }
  });
  return matchedorder;
}

