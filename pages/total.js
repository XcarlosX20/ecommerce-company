import { useEffect, useCallback } from "react";
import Layout from "../layout/Layout";
import useQuiosco from "../hooks/useQuiosco";
import { formatearDinero } from "../helpers";
import Delivery from "../components/paySection/Delivery";
import PayMethods from "../components/paySection/PayMethods";

export default function Total() {
  const { pedido, nombre, setNombre, colocarOrden, total, usdToBs } =
    useQuiosco();
  console.log(total, usdToBs);
  const comprobarPedido = useCallback(() => {
    return pedido.length === 0 || nombre === "" || nombre.length < 3;
  }, [pedido, nombre]);

  useEffect(() => {
    comprobarPedido();
  }, [pedido, comprobarPedido]);

  return (
    <Layout pagina="Total y Confirmar Pedido">
      <h1 className="text-4xl font-black">Total y Confirmar Pedido</h1>
      <p className="text-2xl my-10">Confirma tu Pedido a Continuación</p>

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
            Numero de telefono
          </label>

          <input
            id="details"
            type="text"
            placeholder="numero de telefono"
            className="bg-gray-200 w-full lg:w-1/3 mt-3 p-2 rounded-md"
          />
        </div>
        <div>
          <label
            htmlFor="details"
            className="block uppercase text-slate-800 font-bold text-xl"
          >
            Detalles del pedido (opcional)
          </label>

          <input
            id="details"
            type="text"
            className="bg-gray-200 w-full lg:w-1/3 mt-3 p-2 rounded-md"
            value=""
          />
        </div>
        <Delivery />
        <div className="my-2">
          <p class="block text-slate-800 font-bold text-xl">
            Seleccione su metodo de pago:
          </p>
          <PayMethods />
        </div>
        <div className="my-2">
          <h3 className="block text-slate-800 font-bold text-xl">
            Realiza la transaccion a la cuenta que seleccionaste y envianos el
            comprobante de pago.
          </h3>
          <p className="text-sm mb-2">
            Puedes enviarnos una captura o los ultimos 6 de digitos de su
            identificacion.
          </p>

          <div className="flex flex-col md:flex-row lg:flex-row gap-2">
            <input
              placeholder="id del recibo"
              className="bg-gray-200 w-full md:w-1/5 p-2 rounded-md"
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

        <div className="mt-5">
          <p className="text-2xl">
            Total a pagar:{" "}
            <span className="font-bold">{formatearDinero(total)}</span>
            {" | "}
            <span
              title="Tasa Banco Central de Venezuela."
              className="font-light"
            >
              {Number(usdToBs * total)}Bs
            </span>
          </p>
        </div>

        <div className="mt-5">
          <input
            type="submit"
            className={`${
              comprobarPedido()
                ? "bg-indigo-100"
                : "bg-indigo-600 hover:bg-indigo-800"
            }  w-full lg:w-1/5 px-5 py-2 rounded uppercase font-bold text-white text-center`}
            value="Confirmar Pedido"
            disabled={comprobarPedido()}
          />
        </div>
      </form>
    </Layout>
  );
}
