import productList from "../data/productList";
import { useState } from "react";

interface Props {
  passProductData: ({}) => void;
}

function ProductCard({ passProductData }: Props) {
  let [newProductList, changeProductList] = useState(productList);
  let [productQuantities, setProductQuantities] = useState({
    0: 0,
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
  });
  function revealQuantityInput(id: number) {
    changeProductList(
      newProductList.map((product) => {
        if (product.id === id) {
          return { ...product, quantityVisibility: true };
        } else return product;
      })
    );
  }

  function increaseQuantity(id: number) {
    for (let [key, value] of Object.entries(productQuantities)) {
      if (Number(key) === id) {
        setProductQuantities({
          ...productQuantities,
          [key]: value + 1,
        });
      }
    }
    passProductData(productQuantities);
  }

  function decreaseQuantity(id: number) {
    for (let [key, value] of Object.entries(productQuantities)) {
      if (Number(key) === id) {
        setProductQuantities({
          ...productQuantities,
          [key]: value > 0 ? value - 1 : value,
        });
      }
    }
    passProductData(productQuantities);
  }

  function setSpecificQuantityValue(
    id: number,
    name: string,
    quantity: number
  ) {
    newProductList.map((product) => {
      if (product.id === id) {
        return setProductQuantities({
          ...productQuantities,
          [product.id]: quantity,
        });
      }
    });
    passProductData(productQuantities);
  }

  return (
    <>
      {newProductList.map((product) => (
        <div className="p-6 mb-6 [&>*]:mb-4" key={product.id}>
          <img src={product.image} />
          <div
            className="bg-green-600 p-2"
            onClick={() => revealQuantityInput(product.id)}
          >
            {product.quantityVisibility ? (
              <div>
                <p onClick={() => decreaseQuantity(product.id)}>-</p>
                <input
                  type="number"
                  id={"quantity" + product.id}
                  min="1"
                  max="9"
                  step="1"
                  onChange={(e) =>
                    setSpecificQuantityValue(
                      product.id,
                      product.name,
                      Number(e.target.value)
                    )
                  }
                  className="bg-gray-300 w-[150px] opacity-100 mr-3"
                />
                <p onClick={() => increaseQuantity(product.id)}>+</p>
              </div>
            ) : (
              <p>Add to Cart</p>
            )}
          </div>
          <p>{product.category}</p>
          <p>{product.name}</p>
          <p>{product.price}</p>
          <p>QTY: {JSON.stringify(productQuantities)}</p>
        </div>
      ))}
    </>
  );
}

export default ProductCard;
