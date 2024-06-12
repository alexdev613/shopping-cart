import { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { api } from '../../services/api';
import { ProductsProps } from '../home';

import { useNavigate } from 'react-router-dom';
import { BsCartPlus } from 'react-icons/bs';

import { CartContext } from '../../contexts/CartContext';

export function ProductDetail() {
 
  const navigate = useNavigate();
  const { id } = useParams();
  const [product, setProduct] = useState<ProductsProps>();
  
  const { addItemCart } = useContext(CartContext);


  useEffect(() => {
    async function getProduct() {
      const response = await api.get(`/products/${id}`);
      // console.log(response.data);
      setProduct(response.data);
    }

    getProduct()
    .catch(() => {
      navigate("*")
    })
    
  }, [id]);

  function handleAddCartItem(product: ProductsProps) {
    addItemCart(product);

    navigate("/cart");
  }

  return (
    <div>
      <main className="w-full max-w-7xl px-4 mx-auto my-6">
        {product && (
          <section className="w-full">
            <div className='flex flex-col lg:flex-row'>
              <img
                className='flex-1 w-full max-h-72 object-contain'
                src={product?.cover}
                alt={product?.title}
              />

              <div className='flex-1'>
                <h1 className='font-bold text-xl mt-4 mb-2 '>{product?.title}</h1>
                <p className='my-4 text-justify'>{product?.description}</p>
                <div className='flex justify-center sm:justify-start'>
                  <strong>
                    {product.price.toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL"
                    })}
                  </strong>
                  <button
                    className='bg-zinc-900 p-1 rounded ml-3'
                    onClick={ () => handleAddCartItem(product) }
                  >
                    <BsCartPlus size={20} color='#FFF' />
                  </button>
                </div>
              </div>
            </div>
          </section>
        )}
      </main>
    </div>
  )
}