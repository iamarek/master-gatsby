import calculatePizzaPrice from "./calculatePizzaPrice";
import formatMoney from "./formatMoney";

export default function calculateOrderTotal(order, pizzas) {
    let totalPrice = 0;
    order.forEach(singleOrder => {
        const pizza = pizzas.find(pizza => pizza.id === singleOrder.id);
        totalPrice += calculatePizzaPrice(pizza.price, singleOrder.size);
    })

    return formatMoney(totalPrice);
}