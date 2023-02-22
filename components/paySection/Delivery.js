import { useState } from "react";
import dynamic from "next/dynamic";
import useTotal from "../../hooks/useTotal";

const DynamicMap = dynamic(() => import("../map/Map"), {
  ssr: false,
});
const Delivery = () => {
  const { delivery, dispatch } = useTotal();
  const optionsRendering = [
    { name: "Delivery", id: 1, delivery: true },
    { name: "En el establecimiento", id: 2, delivery: false },
  ];
  const setDeliveryFn = (opt) => {
    dispatch({
      type: "SET_DELIVERY",
      payload: opt.name === "Delivery" && true,
    });
  };
  return (
    <>
      <p class="font-bold text-xl mb-2">
        ¿Como deseas que entreguemos tu pedido?
      </p>
      <div className="grid gap-2  grid-cols-2 ">
        {optionsRendering.length &&
          optionsRendering.map((i) => (
            <div
              id={i.id}
              onClick={() => {
                setDeliveryFn(i);
              }}
              className={`${
                i.delivery === delivery ? "bg-gray-300" : null
              } hover:bg-gray-300 shadow border-2 border-gray-300 cursor-pointer px-6 py-4`}
            >
              {i.name}
            </div>
          ))}
      </div>

      {delivery && <DynamicMap />}
    </>
  );
};

export default Delivery;
