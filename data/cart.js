//localStorage.clear('cart');
export let cart = JSON.parse(localStorage.getItem('cart'));
console.log("printing cart items initially");
console.log(cart);

if(cart==null || cart.length==0){
  cart = [
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
  ];
};

function saveToStorage(){
  localStorage.setItem('cart',JSON.stringify(cart));
};

export function get_cart_quantity(){
        let cartQuantity=0;
        cart.forEach((cartItem)=>{
            cartQuantity+=cartItem.quantity;
        });
        console.log(cartQuantity);
        console.log(cart);
        return cartQuantity;
};

export function add_to_cart(productId){
    let matchingItem;
    cart.forEach((item)=>{
            if(productId === item.productId){
                matchingItem=item;
            }
        });
        let class_name=".js-quantity-selector-"+String(productId);
        console.log(class_name);
        console.log(`.js-quantity-selector-${productId}`);
        const quantitySelector = document.querySelector(
          `.js-quantity-selector-${productId}`
        );
        
        let quantity_ = quantitySelector.value;
        let quantity = Number(quantitySelector.value);

        if (matchingItem){
            //matchingItem.quantity += 1;
            matchingItem.quantity+=quantity;
        }
        else{
        cart.push({
            productId:productId,
            quantity:quantity,
            deliveryOptionId:1,
          });
        };
    saveToStorage();
};


export function delete_item_from_cart(productId){
    let newcart=[];
    cart.forEach((item)=>{
      console.log("deleted button pressed for ",productId);
      if(item.productId!=productId){
        newcart.push(item);
      };
    });
    cart=newcart;
    saveToStorage();
};

export function update_product_quantity(productId,newQuantity){
  
  cart.forEach((item)=>{
    if (item.productId==productId){
      item.quantity=newQuantity;
    }
  });
  saveToStorage();
}

export function modify_delivery_date_option(changedItemID,new_id){
  console.log("modify-delivery-id called");
  console.log(changedItemID);
  console.log(new_id);
  cart.forEach((cartItem)=>{
    if (cartItem.productId == changedItemID){
      cartItem.deliveryOptionId = new_id;
    }
  });
  saveToStorage();
}