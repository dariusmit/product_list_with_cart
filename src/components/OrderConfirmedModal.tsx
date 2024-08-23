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
      <div
        className="bg-white fixed w-screen bottom-[0%] left-[50%] rounded-t-2xl p-[6.4vw] modal z-[99] overflow-y-scroll
      tablet:top-[50%] tablet:rounded-2xl tablet:p-[5.21vw] tablet:w-[89.58vw] tablet:min-h-min
      desktop:rounded-[0.83vw] desktop:p-[2.78vw] desktop:w-[41.11vw]"
      >
        <div className="relative z-[99]">
          <img
            className="mb-[6.4vw] tablet:w-[6.25] tablet:h-auto tablet:mb-[3.13vw] desktop:mb-[1.67vw] desktop:w-[3.33vw] desktop:h-[3.33vw]"
            src="../../images/icon-order-confirmed.svg"
          />
          <h1
            className="text-[#260F08] font-bold leading-[120%] text-[10.67vw] mb-[2.13vw] tablet:text-[5.21vw] tablet:mb-[1.04vw]
          desktop:text-[2.78vw] desktop:mb-[0.56vw]"
          >
            Order Confirmed
          </h1>
          <p
            className="text-[#87635A] font-normal text-[4.27vw] mb-[8.53vw] tablet:text-[2.08vw] tablet:mb-[4.17vw]
          desktop:text-[1.11vw] desktop:mb-[2.22vw]"
          >
            We hope you enjoy your food!
          </p>
        </div>
        <div className="bg-[#F5EEEC] rounded-2xl p-[6.4vw] tablet:p-[3.13vw] desktop:p-[1.67vw]">
          {productList.map((product) =>
            quantities[product.id] > 0 ? (
              <div
                className="flex relative z-[999] items-center justify-between mb-[8.8vw] tablet:mb-[4.3vw] desktop:mb-[1.11vw]"
                key={product.id}
              >
                <div>
                  <img
                    className="object-cover rounded-lg w-[12.8vw] h-[12.8vw] tablet:w-[6.25vw] tablet:h-[6.25vw] desktop:w-[3.33vw] desktop:h-[3.33vw]"
                    src={product.image}
                  />
                </div>
                <div className="flex flex-col w-[40vw] [&>p]:truncate tablet:text-left tablet:ml-[-16.28vw] desktop:ml-[-3vw] desktop:w-[20vw]">
                  <p
                    className="text-[#260F08] font-semibold mb-[2.13vw] text-[3.73vw] leading-[auto] tablet:mb-[1.4vw] tablet:text-[1.82vw]
                  desktop:text-[0.97vw] desktop:mb-[0.56vw]"
                  >
                    {product.name}
                  </p>
                  <div className="flex">
                    <p
                      className="text-[#C73B0F] font-semibold w-[5.6vw] mr-[2.13vw] text-[3.73vw] leading-[auto] tablet:w-[2.73vw] tablet:mr-[1.04vw] tablet:text-[1.82vw]
                    desktop:w-[1.46vw] desktop:mr-[0.56vw] desktop:text-[0.97vw]"
                    >
                      {quantities[product.id]}x
                    </p>
                    <p
                      className="text-[#87635A] font-normal mr-[2.13vw] text-[3.73vw] leading-[auto] tablet:mr-0 tablet:text-[1.82vw]
                    desktop:text-[0.97vw]"
                    >
                      @ ${(Math.round(product.price * 100) / 100).toFixed(2)}
                    </p>
                  </div>
                </div>
                <div>
                  <p className="text-[#260F08] font-semibold text-[4.27vw] leading-[auto] tablet:text-[2.08vw] desktop:text-[1.11vw]">
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
          <div className="flex flex-col border-t-2 pt-[6.4vw] relative z-[999] tablet:pt-[2.08vw] desktop:pt-[1.11vw]">
            <div className="flex text-left text-[#260F08] items-center justify-between">
              <p className="font-normal text-[3.73vw] leading-[auto] tablet:text-[1.82vw] desktop:text-[0.97vw]">
                Order Total
              </p>
              <p className="font-bold leading-[auto] text-[6.4vw] tablet:text-[3.13vw] desktop:text-[1.67vw]">
                ${(Math.round(orderTotal * 100) / 100).toFixed(2)}
              </p>
            </div>
          </div>
        </div>
        <div className="mt-[8.53vw] tablet:mt-[4.17vw] desktop:mt-[2.22vw]">
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
