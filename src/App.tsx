import { useState } from "react";
import ProductList from "./components/ProductList";
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
      <p
        className="mx-[6.4vw] mt-[6.4vw] mb-[8.53vw] text-[10.67vw] leading-[120%] font-bold
        tablet:mx-[5.21vw] tablet:mt-[5.21vw] tablet:mb-[4.17vw] tablet:text-[5.21vw]"
      >
        Desserts
      </p>
      <ProductList
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
    </>
  );
}

export default App;
