import { createContext, ReactNode, useState } from "react";
import { ProductsProps } from '../pages/home';

interface CartContextData {
  cart: CartProps[];
  cartAmount: number;
  addItemCart: (newItem: ProductsProps) => void;
}

interface CartProps {
  id: number;
  title: string;
  description: string;
  price: number;
  cover: string;
  amount: number;
  total: number;
}

interface CartProviderProps {
  children: ReactNode;
}

export const CartContext = createContext({} as CartContextData)

function CartProvider({children}: CartProviderProps) {
  const [cart, setCart] = useState<CartProps[]>([]);

  function addItemCart(newItem: ProductsProps) {
    // Adiciona no carrinho
    // Verificar se esse item já existe no carrinho
    const indexItem = cart.findIndex(item => item.id === newItem.id);

    if (indexItem !== -1) {
      // se entrou aqui apenas somamos +1 na quantidade e calculamos o total desse carrinho.
      let cartList = cart;

      cartList[indexItem].amount = cartList[indexItem].amount + 1;
      cartList[indexItem].total = cartList[indexItem].amount * cartList[indexItem].price;

      setCart(cartList);
      return; // para parar a execução da função
    }
    // Adicionar esse item na nossa lista.

    let data = {
      ...newItem,
      amount: 1,
      total: newItem.price
    }

    setCart(products => [...products, data])
  }

  return (
    <CartContext.Provider
      value={{
        cart,
        cartAmount: cart.length,
        addItemCart
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export default CartProvider;