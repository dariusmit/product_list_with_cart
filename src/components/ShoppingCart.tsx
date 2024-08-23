import { useEffect, useState } from "react";
import productList from "../data/productList";
import ConfirmOrderButton from "./ConfirmOrderButton";
import productTypes from "../types/productTypes";

interface Props {
  quantities: Record<string, number>;
  setQuantities: React.Dispatch<React.SetStateAction<Record<string, number>>>;
  newProductList: productTypes[];
  changeProductList: React.Dispatch<React.SetStateAction<productTypes[]>>;
}

function ShoppingCart({
  quantities,
  setQuantities,
  newProductList,
  changeProductList,
}: Props) {
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
        total += quantities[quantity] * itemInfo!!.price;
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

  function isQuantitiesEmpty() {
    if (Object.values(quantities).reduce((a, b) => a + b, 0) <= 0) {
      return true;
    } else return false;
  }

  return (
    <>
      <div
        className="mx-[6.4vw] p-[6.4vw] mb-[6.4vw] rounded-[2.13vw] bg-white tablet:p-[3.13vw] tablet:mb-[5.21vw] tablet:mx-[5.21vw]
      desktop:p-[1.67vw] desktop:mb-0 desktop:mr-0 desktop:ml-[1.39vw] desktop:rounded-[0.83vw]"
      >
        <h1
          className="font-bold text-[6.4vw] mb-[6.4vw] leading-[auto] text-[#C73B0F] tablet:text-[3.13vw] tablet:mb-[3.13vw]
        desktop:text-[1.67vw] desktop:mb-[1.67vw]"
        >
          {isQuantitiesEmpty() === false ? (
            <p>
              Your Cart ({Object.values(quantities).reduce((a, b) => a + b, 0)})
            </p>
          ) : (
            <p>Your Cart</p>
          )}
        </h1>
        {isQuantitiesEmpty() === false ? (
          <div>
            <div className="pb-[4.27vw] tablet:pb-[2.08vw] desktop:pb-[1.11vw]">
              {productList.map((product) =>
                quantities[product.id] > 0 ? (
                  <div
                    className="flex justify-between mb-[8.8vw] items-center tablet:mb-[4.3vw] desktop:mb-[2.29vw]"
                    key={product.id}
                  >
                    <div className="flex flex-col">
                      <p
                        className="text-[#260F08] font-semibold mb-[2.13vw] text-[3.73vw] leading-[auto] tablet:mb-[1.04vw] tablet:text-[1.82vw]
                      desktop:text-[0.97vw] desktop:mb-[0.56vw]"
                      >
                        {product.name}
                      </p>
                      <div className="flex">
                        <p
                          className="text-[#C73B0F] font-semibold w-[5.6vw] mr-[2.13vw] text-[3.73vw] leading-[auto] tablet:mr-[1.04vw] tablet:text-[1.82vw] tablet:w-[2.73vw]
                        desktop:text-[0.97vw] desktop:mr-[0.56vw] desktop:w-[1.46vw]"
                        >
                          {quantities[product.id]}x
                        </p>
                        <p
                          className="text-[#87635A] font-normal mr-[2.13vw] text-[3.73vw] leading-[auto] tablet:mr-[1.04vw] tablet:text-[1.82vw]
                        desktop:text-[0.97vw] desktop:mr-[0.56vw]"
                        >
                          @ $
                          {(Math.round(product.price * 100) / 100).toFixed(2)}
                        </p>
                        <p className="text-[#87635A] font-semibold text-[3.73vw] leading-[auto] tablet:text-[1.82vw] desktop:text-[0.97vw]">
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
                      className="border-2 p-[0.53vw] border-[#AD8A85] hover:cursor-pointer delete-color rounded-full w-[5.33vw] h-auto tablet:p-[0.26vw] tablet:w-[2.6vw]
                      desktop:p-[0.1vw] desktop:w-[1.39vw]"
                      src="../../images/icon-remove-item.svg"
                      onClick={() => deleteItem(product.id)}
                    />
                  </div>
                ) : null
              )}
            </div>
            <div className="flex flex-col">
              <div className="flex text-left text-[#260F08] mb-[6.4vw] items-center justify-between tablet:mb-[3.13vw] desktop:mb-[1.67vw]">
                <p className="font-normal text-[3.73vw] leading-[auto] tablet:text-[1.82vw] desktop:text-[0.97vw]">
                  Order Total
                </p>
                <p className="font-bold leading-[auto] text-[6.4vw] tablet:text-[3.13vw] desktop:text-[1.67vw]">
                  ${(Math.round(orderTotal * 100) / 100).toFixed(2)}
                </p>
              </div>
              <div
                className="text-[#260F08] text-[3.73vw] tablet:text-[1.82vw] flex justify-center p-[4.27vw] mb-[6.4vw] bg-[#FCF8F6] rounded-[2.13vw]
              tablet:p-[2.08vw] tablet:rounded-[1.04vw] tablet:mb-[3.13vw]
              desktop:px-0 desktop:py-[1.11vw] desktop:rounded-[0.56vw] desktop:mb-[1.67vw] desktop:text-[0.97vw]"
              >
                <img src="../../images/icon-carbon-neutral.svg" />
                <p>
                  This is <b>carbon-neutral</b> delivery
                </p>
              </div>
              <ConfirmOrderButton
                quantities={quantities}
                setQuantities={setQuantities}
                orderTotal={orderTotal}
                newProductList={newProductList}
                changeProductList={changeProductList}
              />
            </div>
          </div>
        ) : (
          <div
            className="flex text-[#87635A] text-[3.73vw] mb-[6.4vw] font-semibold leading-[auto] flex-col items-center justify-center
          tablet:text-[1.82vw] tablet:mb-[2.08vw] desktop:text-[0.97vw] desktop:mb-0"
          >
            <img
              className="mb-[4.27vw] tablet:mb-[2.08vw] desktop:mb-[1.11vw]"
              src="../../images/illustration-empty-cart.svg"
            />
            <p>Your added items will appear here</p>
          </div>
        )}
      </div>
    </>
  );
}

export default ShoppingCart;
