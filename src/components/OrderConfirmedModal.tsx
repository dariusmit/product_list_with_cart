import productList from "../data/productList";
import NewOrderButton from "./NewOrderButton";
import productTypes from "../types/productTypes";

interface Props {
  quantities: Record<string, number>;
  setQuantities: React.Dispatch<React.SetStateAction<Record<string, number>>>;
  orderTotal: number;
  newProductList: productTypes[];
  changeProductList: React.Dispatch<React.SetStateAction<productTypes[]>>;
}

function OrderConfirmedModal({
  quantities,
  setQuantities,
  orderTotal,
  newProductList,
  changeProductList,
}: Props) {
  return (
    <>
      <div className="bg-white fixed w-screen bottom-[0%] left-[50%] rounded-t-2xl p-[6.4vw] modal z-[99] overflow-y-scroll">
        <div className="relative z-[99]">
          <img
            className="mb-[6.4vw]"
            src="../../images/icon-order-confirmed.svg"
          />
          <h1 className="text-[#260F08] font-bold leading-[120%] text-[10.67vw] mb-[2.13vw]">
            Order Confirmed
          </h1>
          <p className="text-[#87635A] font-normal text-[4.27vw] mb-[8.53vw]">
            We hope you enjoy your food!
          </p>
        </div>
        <div className="bg-[#F5EEEC] rounded-2xl p-[6.4vw]">
          {productList.map((product) =>
            quantities[product.id] > 0 ? (
              <div
                className="flex relative z-[999] items-center justify-between mb-[8.8vw]"
                key={product.id}
              >
                <div>
                  <img
                    className="object-cover rounded-lg w-[12.8vw] h-[12.8vw]"
                    src={product.image}
                  />
                </div>
                <div className="flex flex-col w-[40vw] [&>p]:truncate">
                  <p className="text-[#260F08] font-semibold mb-[2.13vw] text-[3.73vw] leading-[auto]">
                    {product.name}
                  </p>
                  <div className="flex">
                    <p className="text-[#C73B0F] font-semibold w-[5.6vw] mr-[2.13vw] text-[3.73vw] leading-[auto]">
                      {quantities[product.id]}x
                    </p>
                    <p className="text-[#87635A] font-normal mr-[2.13vw] text-[3.73vw] leading-[auto]">
                      @ ${(Math.round(product.price * 100) / 100).toFixed(2)}
                    </p>
                  </div>
                </div>
                <div>
                  <p className="text-[#260F08] font-semibold text-[4.27vw] leading-[auto]">
                    $
                    {(
                      Math.round(product.price * quantities[product.id] * 100) /
                      100
                    ).toFixed(2)}
                  </p>
                </div>
              </div>
            ) : null
          )}
          <div className="flex flex-col border-t-2 pt-[6.4vw] relative z-[999]">
            <div className="flex text-left text-[#260F08] items-center justify-between">
              <p className="font-normal text-[3.73vw] leading-[auto]">
                Order Total
              </p>
              <p className="font-bold leading-[auto] text-[6.4vw]">
                ${(Math.round(orderTotal * 100) / 100).toFixed(2)}
              </p>
            </div>
          </div>
        </div>
        <div className="mt-[8.53vw] ">
          <NewOrderButton
            quantities={quantities}
            setQuantities={setQuantities}
            newProductList={newProductList}
            changeProductList={changeProductList}
          />
        </div>
      </div>
      <div className="w-screen h-screen fixed top-0 left-0 bg-black opacity-65 z-[9]"></div>
    </>
  );
}

export default OrderConfirmedModal;
