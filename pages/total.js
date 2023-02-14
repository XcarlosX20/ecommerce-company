import { useEffect, useCallback } from "react";
import Layout from "../layout/Layout";
import useQuiosco from "../hooks/useQuiosco";
import { formatearDinero } from "../helpers";
import Delivery from "../components/paySection/Delivery";

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
            className="bg-gray-200 w-1/5 lg:w-1/3 mt-3 p-2 rounded-md"
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
            className="bg-gray-200 w-1/5 lg:w-1/3 mt-3 p-2 rounded-md"
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
            Realiza una transferencia de mismo banco o pago movil a:
          </p>
          <div
            id="alert-border-1"
            class="flex p-4 mb-4 bg-blue-100 border-l-4 border-blue-500 text-blue-700 p-4 rounded"
            role="alert"
          >
            <p class="block uppercase text-slate-800 font-bold text-xl">
              {"[Datos de la Empresa] "}
            </p>
          </div>
        </div>
        <div className="my-2">
          <label className="block text-slate-800 font-bold text-xl">
            ...y luego envianos el comprobante o ingresa los ultimos 6 digitos
            de identificacion de la transaccion
          </label>
          <span className="text-sm">
            suba la imagen o ingrese el id del recibo
          </span>

          <span className="sr-only">Choose profile photo</span>
          <div className="flex flex-row gap-2">
            <input
              placeholder="id del recibo"
              className="bg-gray-200 w-1/5 md:w-1/3 p-2 rounded-md"
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
            }  w-1/5 lg:w-auto px-5 py-2 rounded uppercase font-bold text-white text-center`}
            value="Confirmar Pedido"
            disabled={comprobarPedido()}
          />
        </div>
      </form>
    </Layout>
  );
}
