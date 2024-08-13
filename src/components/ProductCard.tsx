import productTypes from "../types/productTypes";

interface Props {
  newProductList: productTypes[];
  changeProductList: React.Dispatch<React.SetStateAction<productTypes[]>>;
  setQuantities: React.Dispatch<React.SetStateAction<Record<string, number>>>;
  quantities: Record<string, number>;
}

function ProductCard({
  newProductList,
  changeProductList,
  quantities,
  setQuantities,
}: Props) {
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
    setQuantities((quantities) => ({
      ...quantities,
      [id]: quantities[id] + 1,
    }));
  }

  function decreaseQuantity(id: number) {
    setQuantities((quantities) => ({
      ...quantities,
      [id]: quantities[id] > 0 ? quantities[id] - 1 : quantities[id],
    }));
  }

  function setSpecificQuantityValue(id: number, quantity: number) {
    newProductList.map((product) => {
      if (product.id === id) {
        return setQuantities({
          ...quantities,
          [product.id]: quantity,
        });
      }
    });
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
                  placeholder={
                    quantities[product.id] > 0
                      ? String(quantities[product.id])
                      : "0"
                  }
                  id={"quantity" + product.id}
                  min="1"
                  max="9"
                  step="1"
                  onChange={(e) =>
                    setSpecificQuantityValue(product.id, Number(e.target.value))
                  }
                  className="bg-gray-300 w-[150px] opacity-100 placeholder:text-black mr-3"
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
        </div>
      ))}
    </>
  );
}

export default ProductCard;
