export function Cart() {
  return (
    <div className="wfull max-w-7xl mx-auto">
      <h1 className="font-medium text-2xl text-center my-4">Carrinho de compras</h1>

      <section className="flex items-center justify-between border-b-2 border-gray-300">
        <img
          src="https://media.karousell.com/media/photos/products/2023/11/30/ryo_sakazaki__storm_collectibl_1701369450_d2adf184_progressive"
          alt="logo do produto"
          className="w-28"
        />

        <strong>Preço: R$ 1.000</strong>

        <div className="flex items-center justify-center gap-3">
          <button className="bg-slate-600 px-2 rounded text-white font-medium flex items-center justify-center">
            -
          </button>

          1

          <button className="bg-slate-600 px-2 rounded text-white font-medium flex items-center justify-center">
            +
          </button>
        </div>

        <strong className="float-right">
          SubTotal: R$ 1.000
        </strong>
      </section>
      <p className="font-bold mt-4">Total: R$ 1.000</p>
    </div>
  )
}