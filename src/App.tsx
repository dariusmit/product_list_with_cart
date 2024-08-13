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
        <p>Desserts</p>
        <ProductCard
          newProductList={newProductList}
          changeProductList={changeProductList}
          quantities={quantities}
          setQuantities={setQuantities}
        />
        <ShoppingCart quantities={quantities} setQuantities={setQuantities} />
      </div>
    </>
  );
}

export default App;
