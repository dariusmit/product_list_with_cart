import { useState } from "react";
import ProductCard from "./components/ProductCard";
import ShoppingCart from "./components/ShoppingCart";
import productList from "./data/productList";

function App() {
  let [newProductList, changeProductList] = useState(productList);

  let [quantities, setQuantities] = useState<Record<string, number>>(() =>
    productList.reduce(
      (quantities, { id }) => ({
        ...quantities,
        [id]: 0,
      }),
      {}
    )
  );

  return (
    <>
      <div>
        <p className="mx-[6.4vw] mt-[6.4vw] mb-[8.53vw] text-[10.67vw] leading-[120%] font-bold">
          Desserts
        </p>
        <ProductCard
          newProductList={newProductList}
          changeProductList={changeProductList}
          quantities={quantities}
          setQuantities={setQuantities}
        />
        <ShoppingCart
          quantities={quantities}
          setQuantities={setQuantities}
          newProductList={newProductList}
          changeProductList={changeProductList}
        />
      </div>
    </>
  );
}

export default App;
