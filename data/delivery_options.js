export function get_delivery_options_details(deliveryId){
    let matchedId;
    delivery_options.forEach((delivery_option)=>{
        if (delivery_option.id==deliveryId){
            matchedId=delivery_option;
        }
    });
    return matchedId;
}
export const delivery_options=[{
        id:1,
        days:7,
        priceCents:0
    },
    {
        id:2,
        days:3,
        priceCents:499
    },
    {
        id:3,
        days:1,
        priceCents:999
    }];