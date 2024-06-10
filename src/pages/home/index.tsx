import { useEffect, useState } from 'react';
import { BsCartPlus } from 'react-icons/bs';

import { api } from '../../services/api';

interface ProductsProps {
  id: number;
  title: string;
  description: string;
  price: number;
  cover: string;
}

export function Home() {
  const [products, setProducts] = useState<ProductsProps[]>([]);

  useEffect(() => {
    async function getProducts() {
      const response = await api.get("/products");
      console.log(response.data);

      setProducts(response.data)
    }
    
    getProducts();
  }, []);

  return (
    <div>
      <main className="wfull max-w-7xl px-4 mx-auto">
        <h1 className="font-bold text-2xl mb-4 mt-10 text-center">Produtos em alta</h1>

        <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-5'>
          <section className="w-full">
            <img
            className='w-full rounded-lg max-h-70 mb-2'
              src="https://media.karousell.com/media/photos/products/2023/11/30/ryo_sakazaki__storm_collectibl_1701369450_d2adf184_progressive"
              alt="logo da produto"
            />

            <p className='font-medium mt-1 mb-2'>Ryo Sakazaku - Strom Collectibles</p>

            <div className='flex gap-3 items-center'>
              <strong className='text-zinc-700/90'>
                R$ 1000
              </strong>
              <button>
                <BsCartPlus size={20} color='#FFF' />
              </button>
            </div>

          </section>

          {products.map( (product) => (
            <section
              key={product.id}
              className="w-full"
            >
              <img
                className='w-full rounded-lg max-h-70 mb-2'
                src={product.cover}
                alt={product.title}
              />

              <p className='font-medium mt-1 mb-2'>{product.title}</p>

              <div className='flex gap-3 items-center'>
                <strong className='text-zinc-700/90'>
                  {product.price.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL"
                  })}
                </strong>
                <button>
                  <BsCartPlus size={20} color='#FFF' />
                </button>
              </div>

            </section>
          ))}
        </div>
      </main>
    </div>
  )
}