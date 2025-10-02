import { useShoppingCartContext } from "../contexts/shopping-cart.context";

export const TotalPrice = () => {
  const { shoppingCartState } = useShoppingCartContext();

  return (
    <section className="bg-gray-300 px-4 py-2 rounded text-xl flex gap-2 justify-end">
      <h2 className="text-xl">
        <span className="font-medium">Total price: </span>
        <span>{shoppingCartState.total}</span>
      </h2>
    </section>
  );
};
