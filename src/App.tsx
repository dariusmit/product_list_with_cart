import ProductCard from "./components/ProductCard";
import ShoppingCart from "./components/ShoppingCart";
import { useState } from "react";

function App() {
  let [productData, setProductData] = useState({});
  function getProductData(cartData: {}) {
    setProductData(cartData);
  }

  return (
    <>
      <div>
        <ProductCard passProductData={getProductData} />
        <ShoppingCart productData={productData} />
      </div>
    </>
  );
}

export default App;
