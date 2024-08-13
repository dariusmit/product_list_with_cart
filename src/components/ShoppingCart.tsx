import { useEffect, useState } from "react";
import productList from "../data/productList";

interface Props {
  quantities: Record<string, number>;
  setQuantities: React.Dispatch<React.SetStateAction<Record<string, number>>>;
}

function ShoppingCart({ quantities, setQuantities }: Props) {
  let [orderTotal, setOrderTotal] = useState(0);
  let prices: Record<string, number> = {};
  useEffect(() => {
    calculateTotal();
  }, [quantities]);

  function calculateTotal() {
    let total: number = 0;

    for (const quantity in quantities) {
      if (quantities[quantity] > 0) {
        let itemInfo = productList.find(
          (product) => product.id === Number(quantity)
        );
        total += quantities[quantity] * itemInfo.price;
      }
    }
    setOrderTotal(total);
  }

  function deleteItem(id: number) {
    setQuantities({
      ...quantities,
      [id]: 0,
    });
  }

  return (
    <>
      <h1 className="font-bold">Your cart</h1>
      {productList.map((product) =>
        quantities[product.id] > 0 ? (
          <div className="mb-8" key={product.id}>
            <p>{product.name}</p>
            <p>{quantities[product.id]}x</p>
            <p>{product.price} EUR</p>
            <p>{product.price * quantities[product.id]} EUR</p>
            <button
              className="text-red-400"
              onClick={() => deleteItem(product.id)}
            >
              Delete
            </button>
          </div>
        ) : null
      )}
      <p className="font-bold">Order Total</p>
      <p>{orderTotal}</p>
    </>
  );
}

export default ShoppingCart;
