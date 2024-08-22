import OrderConfirmedModal from "./OrderConfirmedModal";
import { useState } from "react";
import productTypes from "../types/productTypes";

interface Props {
  quantities: Record<string, number>;
  setQuantities: React.Dispatch<React.SetStateAction<Record<string, number>>>;
  orderTotal: number;
  newProductList: productTypes[];
  changeProductList: React.Dispatch<React.SetStateAction<productTypes[]>>;
}

function ConfirmOrderButton({
  quantities,
  setQuantities,
  orderTotal,
  newProductList,
  changeProductList,
}: Props) {
  let [confimationModal, enableConfirmationModal] = useState(false);

  return (
    <>
      <button
        className="flex w-[74.4vw] h-[14.13vw] justify-center hover:bg-[#8A290A] items-center text-white rounded-full bg-[#C73B0F]
        tablet:w-full tablet:h-[6.9vw] "
        onClick={() => enableConfirmationModal(true)}
      >
        <p className="text-[4.27vw] font-semibold leading-[auto] tablet:text-[2.08vw]">
          Confirm Order
        </p>
      </button>
      <div>
        {confimationModal ? (
          <OrderConfirmedModal
            quantities={quantities}
            setQuantities={setQuantities}
            orderTotal={orderTotal}
            newProductList={newProductList}
            changeProductList={changeProductList}
          />
        ) : null}
      </div>
    </>
  );
}

export default ConfirmOrderButton;
