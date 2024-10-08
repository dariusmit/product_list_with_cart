import productTypes from "../types/productTypes";
import AddToCartButton from "./AddToCartButton";
import QuantityButton from "./QuantityButton";

interface Props {
  newProductList: productTypes[];
  changeProductList: React.Dispatch<React.SetStateAction<productTypes[]>>;
  setQuantities: React.Dispatch<React.SetStateAction<Record<string, number>>>;
  quantities: Record<string, number>;
}

function ProductList({
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
      <div
        className="mx-[6.4vw] 
          tablet:flex tablet:flex-wrap tablet:mx-[3.65vw] tablet:w-auto tablet:h-auto
          desktop:mx-0"
      >
        {newProductList.map((product) => (
          <div
            className="mb-[6.4vw] tablet:w-[27vw] tablet:mx-[1.56vw] tablet:mb-[4.17vw]
            desktop:w-[17vw] desktop:mx-[0.84vw] desktop:mb-[2.22vw]"
            key={product.id}
          >
            <div
              className="tablet:flex tablet:justify-center tablet:w-full tablet:h-[30.47vw] tablet:mb-[2.08vw] tablet:relative
            desktop:h-[18.19vw] desktop:mb-[1.11vw]"
            >
              <img
                className={
                  product.quantityVisibility
                    ? "rounded-[2.13vw] w-full h-auto border-2 border-[#C73B0F] tablet:w-full tablet:h-[27.73vw] tablet:rounded-[1.04vw] tablet:object-cover desktop:h-[16.67vw] desktop:rounded-[0.56vw]"
                    : "rounded-[2.13vw] w-full h-auto border-2 border-[transparent] tablet:w-full tablet:h-[27.73vw] tablet:rounded-[1.04vw] tablet:object-cover desktop:h-[16.67vw] desktop:rounded-[0.56vw]"
                }
                src={product.image}
              />
              <div
                className="flex justify-center mb-[4.27vw] mt-[-5.87vw]
            tablet:absolute tablet:bottom-0 tablet:my-0"
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
            </div>
            <p
              className="text-[#87635A] text-[3.73vw] font-normal mb-[1.07vw] leading-[auto]
          tablet:text-[1.82vw] tablet:mb-[0.52vw] desktop:text-[0.97vw] desktop:mb-[0.28vw]"
            >
              {product.category}
            </p>
            <p
              className="text-[#260F08] font-semibold leading-[auto] mb-[1.07vw] text-[4.27vw]
          tablet:text-[2.08vw] tablet:mb-[0.52vw] desktop:text-[1.11vw] desktop:mb-[0.28vw]"
            >
              {product.name}
            </p>
            <p
              className="text-[#C73B0F] font-semibold leading-[auto] text-[4.27vw]
          tablet:text-[2.08vw] desktop:text-[1.11vw]"
            >
              ${(Math.round(product.price * 100) / 100).toFixed(2)}
            </p>
          </div>
        ))}
      </div>
    </>
  );
}

export default ProductList;
