interface Props {
  productData: {};
}

function ShoppingCart({ productData }: Props) {
  function showCartData() {
    for (const [key, value] of Object.entries(productData)) {
      return key + value;
    }
  }

  return (
    <>
      <button
        onClick={() => {
          console.log(JSON.stringify(Object.values(productData)));
        }}
      >
        stadtas
      </button>
      <div>{showCartData()}</div>
      <h1 className="font-bold">Your cart</h1>
      <p className="font-bold">Order Total</p>
    </>
  );
}

export default ShoppingCart;
