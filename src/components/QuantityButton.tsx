import { useEffect } from "react";
import productTypes from "../types/productTypes";

interface Props {
  newProductList: productTypes[];
  product_id: number;
  setQuantities: React.Dispatch<React.SetStateAction<Record<string, number>>>;
  quantities: Record<string, number>;
  changeProductList: React.Dispatch<React.SetStateAction<productTypes[]>>;
}

function QuantityButton({
  newProductList,
  product_id,
  setQuantities,
  quantities,
  changeProductList,
}: Props) {
  function increaseQuantity(id: number) {
    setQuantities((quantities) => ({
      ...quantities,
      [id]: quantities[id] + 1,
    }));
  }

  function decreaseQuantity(id: number) {
    setQuantities((quantities) => ({
      ...quantities,
      [id]: quantities[id] - 1,
    }));
  }

  useEffect(() => {
    if (quantities[product_id] < 0) {
      changeProductList(
        newProductList.map((product) => {
          if (product.id === product_id) {
            return { ...product, quantityVisibility: false };
          } else return product;
        })
      );
      setQuantities((quantities) => ({
        ...quantities,
        [product_id]: 0,
      }));
    }
  }, [quantities]);

  return (
    <button
      className="px-[3.2vw] flex w-[42.67vw] h-[11.73vw] justify-between items-center text-white rounded-full bg-[#C73B0F] tablet:w-[20.83vw] tablet:h-[5.73vw]
    tablet:px-[1.56vw]"
    >
      <div
        onClick={() => decreaseQuantity(product_id)}
        className="flex items-center justify-center border w-[5.33vw] h-[5.33vw] rounded-full tablet:w-[2.6vw] tablet:h-[2.6vw]"
      >
        <img src="../../images/icon-decrement-quantity.svg" />
      </div>
      <p className="w-[33.33%]">
        {quantities[product_id] >= 0 ? String(quantities[product_id]) : null}
      </p>
      <div
        onClick={() => increaseQuantity(product_id)}
        className="flex items-center justify-center border w-[5.33vw] h-[5.33vw] rounded-full tablet:w-[2.6vw] tablet:h-[2.6vw]"
      >
        <img src="../../images/icon-increment-quantity.svg" />
      </div>
    </button>
  );
}

export default QuantityButton;
