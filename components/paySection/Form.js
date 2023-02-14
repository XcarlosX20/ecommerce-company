const FormPaySection = () => {
  return (
    <>
      <form onSubmit={colocarOrden}>
        <div>
          <label
            htmlFor="nombre"
            className="block uppercase text-slate-800 font-bold text-xl"
          >
            Nombre
          </label>

          <input
            id="nombre"
            type="text"
            className="bg-gray-200 w-full lg:w-1/3 mt-3 p-2 rounded-md"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
        </div>
        <div>
          <label
            htmlFor="details"
            className="block uppercase text-slate-800 font-bold text-xl"
          >
            Detalles del pedido
          </label>

          <input
            id="details"
            type="text"
            className="bg-gray-200 w-full lg:w-1/3 mt-3 p-2 rounded-md"
            value=""
          />
        </div>

        <Delivery />

        <div>
          <label
            htmlFor="details"
            className="block uppercase text-slate-800 font-bold text-xl"
          >
            Numero de telefono
          </label>

          <input
            id="details"
            type="text"
            placeholder="numero de telefono"
            className="bg-gray-200 w-full lg:w-1/3 mt-3 p-2 rounded-md"
          />
        </div>
        <div className="mt-3">
          <label className="block uppercase text-slate-800 font-bold text-xl">
            Recibo de la transaccion
          </label>
          <span className="text-sm">
            suba la imagen o ingrese el id del recibo
          </span>

          <span className="sr-only">Choose profile photo</span>
          <div className="flex flex-row gap-2">
            <input
              placeholder="id del recibo"
              className="bg-gray-200 w-full md:w-1/3 p-2 rounded-md"
            />
            <label className="block">
              <input
                type="file"
                className="block w-full text-sm text-slate-500
      file:mr-4 file:py-2 file:px-4
      file:rounded-full file:border-0
      file:text-sm file:font-semibold
      file:bg-violet-50 file:text-violet-700
      hover:file:bg-violet-100
    "
              />
            </label>
          </div>
        </div>

        <div className="mt-10">
          <p className="text-2xl">
            Total a pagar:{" "}
            <span className="font-bold">{formatearDinero(total)}</span>
            {" | "}
            <span className="font-light">{Number(usdToBs * total)}Bs</span>
          </p>
        </div>

        <div className="mt-5">
          <input
            type="submit"
            className={`${
              comprobarPedido()
                ? "bg-indigo-100"
                : "bg-indigo-600 hover:bg-indigo-800"
            }  w-full lg:w-auto px-5 py-2 rounded uppercase font-bold text-white text-center`}
            value="Confirmar Pedido"
            disabled={comprobarPedido()}
          />
        </div>
      </form>
    </>
  );
};

export default FormPaySection;
