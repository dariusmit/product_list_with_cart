import productList from "../data/productList";
import productTypes from "../types/productTypes";

interface Props {
  quantities: Record<string, number>;
  setQuantities: React.Dispatch<React.SetStateAction<Record<string, number>>>;
  newProductList: productTypes[];
  changeProductList: React.Dispatch<React.SetStateAction<productTypes[]>>;
}

function NewOrderButton({
  quantities,
  setQuantities,
  newProductList,
  changeProductList,
}: Props) {
  function resetValues() {
    setQuantities(
      productList.reduce(
        (quantities, { id }) => ({
          ...quantities,
          [id]: 0,
        }),
        {}
      )
    );
    changeProductList(
      newProductList.map((product) => {
        return { ...product, quantityVisibility: false };
      })
    );
  }

  return (
    <>
      <button
        className="px-[3.2vw] flex w-full py-[4.27vw] hover:bg-[#8A290A] justify-center items-center text-white rounded-full bg-[#C73B0F]"
        onClick={resetValues}
      >
        <p className="text-[4.27vw] font-semibold leading-[auto]">
          Start New Order
        </p>
      </button>
    </>
  );
}

export default NewOrderButton;
