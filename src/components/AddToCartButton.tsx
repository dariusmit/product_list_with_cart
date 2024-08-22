function AddToCartButton() {
  return (
    <button
      className="flex w-[42.67vw] h-[11.73vw] justify-center items-center border border-[#AD8A85] rounded-full hover:border-[#C73B0F] hover:text-[#C73B0F] bg-white
    tablet:w-[20.83vw] tablet:h-[5.73vw]"
    >
      <img
        className="mr-[2.13vw] tablet:mr-[1.04vw]"
        src="../../images/icon-add-to-cart.svg"
      />
      <p className="text-[3.73vw] font-semibold leading-[auto] tablet:text-[1.82vw]">
        Add to Cart
      </p>
    </button>
  );
}

export default AddToCartButton;
