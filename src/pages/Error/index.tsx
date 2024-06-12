import { Link } from 'react-router-dom';
import notFound from "../../assets/404.png";

export function Error() {
  return (
    <div className='w-full max-w-7xl px-4 mx-auto flex flex-col items-center mt-8'>
      <h1 className='text-4xl font-bold'>404</h1>
      <h2  className='text-2xl font-bold mb-4 text-center'>Página não encontrada!</h2>
      <Link to='/' className='flex flex-col items-center'>
        <p className='font-semibold text-center'>
          Volte a página de compras
        </p>
        <img
          className='w-full md:w-8/12'
          src={notFound}
          alt='Imagem de Not Found Page'
        />
      </Link>
    </div>
  )
}