export let present_tracking_order_id=localStorage.getItem("present_tracking_order_id");
export let present_tracking_product_id=localStorage.getItem("present_tracking_product_id");

function saveToStorage(){
    localStorage.setItem("present_tracking_order_id",present_tracking_order_id);
    localStorage.setItem("present_tracking_product_id",present_tracking_product_id);
}

export function track_button_called(order_id,product_id){

    present_tracking_order_id = order_id;
    present_tracking_product_id = product_id;
    saveToStorage();

}

