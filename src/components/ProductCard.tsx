import productTypes from "../types/productTypes";
import AddToCartButton from "./AddToCartButton";
import QuantityButton from "./QuantityButton";

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

  return (
    <>
      {newProductList.map((product) => (
        <div className="mx-[6.4vw] mb-[6.4vw] box-border" key={product.id}>
          <img
            className={
              product.quantityVisibility
                ? "rounded-[2.13vw] border-2 border-[#C73B0F]"
                : "rounded-[2.13vw] border-2 border-[transparent]"
            }
            src={product.image}
          />
          <div
            className="flex justify-center mb-[4.27vw] mt-[-22px]"
            onClick={() => revealQuantityInput(product.id)}
          >
            {product.quantityVisibility ? (
              <QuantityButton
                newProductList={newProductList}
                product_id={product.id}
                setQuantities={setQuantities}
                quantities={quantities}
                changeProductList={changeProductList}
              />
            ) : (
              <AddToCartButton />
            )}
          </div>
          <p className="text-[#87635A] text-[3.73vw] font-normal mb-[1.07vw] leading-[auto]">
            {product.category}
          </p>
          <p className="text-[#260F08] font-semibold leading-[auto] mb-[1.07vw] text-[4.27vw]">
            {product.name}
          </p>
          <p className="text-[#C73B0F] font-semibold leading-[auto] text-[4.27vw]">
            ${(Math.round(product.price * 100) / 100).toFixed(2)}
          </p>
        </div>
      ))}
    </>
  );
}

export default ProductCard;
