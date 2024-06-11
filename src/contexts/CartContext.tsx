import { createContext, ReactNode, useState } from "react";
import { ProductsProps } from '../pages/home';

interface CartContextData {
  cart: CartProps[];
  cartAmount: number;
  addItemCart: (newItem: ProductsProps) => void;
  removeItemCart: (product: CartProps) => void;
  total: string;
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
  
  const [total, setTotal] = useState("");

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
      // Para recalcular o total (após adicionar um item)
      totalResultCart(cartList)
      return; // para parar a execução da função
    }

    // Adicionar esse item na nossa lista.
    let data = {
      ...newItem,
      amount: 1,
      total: newItem.price
    }

    setCart(products => [...products, data]);
    // Para recalcular o total (após adicionar item)
    totalResultCart([...cart, data]);
  }

  function removeItemCart(product: CartProps) {
    const indexItem = cart.findIndex(item => item.id === product.id);

    if(cart[indexItem]?.amount > 1) {
      // Diminuir apenas 1 amount do que você tem
      let cartList = cart;

      cartList[indexItem].amount = cartList[indexItem].amount -1;
      cartList[indexItem].total = cartList[indexItem].total - cartList[indexItem].price;

      // Para recalcular a quantidade de itens após remover -1 da quantidade do item e também o total:
      setCart(cartList);
      totalResultCart(cartList);
      return; // Para parar a execução da função
    }

    const removeItem = cart.filter(item => item.id !== product.id);
    setCart(removeItem);
    // Para recalcular o total (após remover um item):
    totalResultCart(removeItem);
  }

  function totalResultCart(items: CartProps[]) {
    let myCart = items;
    let result = myCart.reduce((acc, obj) => { return acc + obj.total}, 0 );
    const resultFormatted = result.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
    setTotal(resultFormatted);
  }

  return (
    <CartContext.Provider
      value={{
        cart,
        cartAmount: cart.length,
        addItemCart,
        removeItemCart,
        total
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export default CartProvider;