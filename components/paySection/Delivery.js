import { useState } from "react";
import dynamic from "next/dynamic";

const DynamicMap = dynamic(() => import("../map/Map"), {
  ssr: false,
});
const Delivery = () => {
  const [option, setOption] = useState([]);
  const chooseOption = (e) => {
    const option = e.target.id;
    setOption([option]);
  };
  const fillBox = (opt) => {
    return opt === option[0];
  };
  return (
    <>
      <p class="font-bold text-xl mb-2">
        ¿Como deseas que entreguemos tu pedido?
      </p>
      <div className="grid gap-2  grid-cols-2 ">
        <div
          id="delivery"
          onClick={(e) => chooseOption(e)}
          className={`${
            fillBox("delivery") && "bg-gray-300"
          } hover:bg-gray-300 shadow border-2 border-gray-300 cursor-pointer px-6 py-4`}
        >
          Delivery
        </div>
        <div
          id="store"
          onClick={(e) => chooseOption(e)}
          className={`${
            fillBox("store") && "bg-gray-300"
          } hover:bg-gray-300 shadow border-2 border-gray-300 cursor-pointer px-6 py-4`}
        >
          En el establecimiento
        </div>
      </div>
      {option[0] === "delivery" && <DynamicMap />}
    </>
  );
};

export default Delivery;
