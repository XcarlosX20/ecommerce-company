import { useState } from "react";
import dynamic from "next/dynamic";

const DynamicMap = dynamic(() => import("../map/Map"), {
  ssr: false,
});
const Delivery = () => {
  const [delivery, setDelivery] = useState(false);
  if (!delivery) {
    return (
      <>
        <p class="font-bold text-xl mb-2">¿Como desea despachar su compra?</p>
        <div className="grid gap-2  grid-cols-2 ">
          <div className="shadow cursor-pointer">
            <div class="px-6 py-4">
              <p class="text-base">Delivery</p>
            </div>
          </div>
          <div className="shadow cursor-pointer">
            <div class="px-6 py-4">
              <p class="text-base">En el establecimiento</p>
            </div>
          </div>
        </div>
      </>
    );
  }
  return <DynamicMap />;
};

export default Delivery;
