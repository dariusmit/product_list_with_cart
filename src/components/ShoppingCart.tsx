import { useEffect, useState } from "react";
import productList from "../data/productList";
import ConfirmOrderButton from "./ConfirmOrderButton";

interface Props {
  quantities: Record<string, number>;
  setQuantities: React.Dispatch<React.SetStateAction<Record<string, number>>>;
}

function ShoppingCart({ quantities, setQuantities }: Props) {
  let [orderTotal, setOrderTotal] = useState(0);
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

  function isEmpty() {
    if (Object.values(quantities).reduce((a, b) => a + b, 0) <= 0) {
      return true;
    } else return false;
  }

  return (
    <>
      <div className="mx-[6.4vw] p-[6.4vw] mb-[6.4vw] rounded-[2.13vw] bg-white">
        <h1 className="font-bold text-[6.4vw] mb-[6.4vw] leading-[auto] text-[#C73B0F]">
          {isEmpty() === false ? (
            <p>
              Your Cart ({Object.values(quantities).reduce((a, b) => a + b, 0)})
            </p>
          ) : (
            <p>Your Cart</p>
          )}
        </h1>
        <div className="pb-[4.27vw]">
          {productList.map((product) =>
            quantities[product.id] > 0 ? (
              <div
                className="flex justify-between mb-[8.8vw] items-center"
                key={product.id}
              >
                <div className="flex flex-col">
                  <p className="text-[#260F08] font-semibold mb-[2.13vw] text-[3.73vw] leading-[auto]">
                    {product.name}
                  </p>
                  <div className="flex">
                    <p className="text-[#C73B0F] font-semibold w-[5.6vw] mr-[2.13vw] text-[3.73vw] leading-[auto]">
                      {quantities[product.id]}x
                    </p>
                    <p className="text-[#87635A] font-normal mr-[2.13vw] text-[3.73vw] leading-[auto]">
                      @ ${(Math.round(product.price * 100) / 100).toFixed(2)}
                    </p>
                    <p className="text-[#87635A] font-semibold text-[3.73vw] leading-[auto]">
                      $
                      {(
                        Math.round(
                          product.price * quantities[product.id] * 100
                        ) / 100
                      ).toFixed(2)}
                    </p>
                  </div>
                </div>
                <img
                  className="border-2 p-[2px] border-[#AD8A85] delete-color rounded-full w-[5.33vw] h-auto"
                  src="../../images/icon-remove-item.svg"
                  onClick={() => deleteItem(product.id)}
                />
              </div>
            ) : null
          )}
        </div>
        <div className="flex flex-col">
          <div className="flex text-left text-[#260F08] mb-[6.4vw] items-center justify-between">
            <p className="font-normal text-[3.73vw] leading-[auto]">
              Order Total
            </p>
            <p className="font-bold leading-[auto] text-[6.4vw]">
              ${(Math.round(orderTotal * 100) / 100).toFixed(2)}
            </p>
          </div>
          <div className="text-[#260F08] flex justify-center p-[4.27vw] mb-[6.4vw] bg-[#FCF8F6] rounded-[2.13vw]">
            <img src="../../images/icon-carbon-neutral.svg" />
            <p>
              This is <b>carbon neutral</b> delivery
            </p>
          </div>
          <ConfirmOrderButton />
        </div>
      </div>
    </>
  );
}

export default ShoppingCart;
