import { useState } from "react";
import dynamic from "next/dynamic";
import useSelectOption from "../../hooks/useSelectOption";

const DynamicMap = dynamic(() => import("../map/Map"), {
  ssr: false,
});
const Delivery = () => {
  const { option, fillBox, chooseOption } = useSelectOption();
  const optionsRendering = [
    { name: "Delivery", id: 1 },
    { name: "En el establecimiento", id: 2 },
  ];
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
              onClick={() => chooseOption(i)}
              className={`${
                fillBox(i.id) && "bg-gray-300"
              } hover:bg-gray-300 shadow border-2 border-gray-300 cursor-pointer px-6 py-4`}
            >
              {i.name}
            </div>
          ))}
      </div>

      {option.name === "Delivery" && <DynamicMap />}
    </>
  );
};

export default Delivery;
