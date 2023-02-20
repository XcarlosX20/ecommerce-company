import Image from "next/image";
import React from "react";
import { formatKeys } from "../../helpers";
import useSelectOption from "../../hooks/useSelectOption";
const PayMethods = () => {
  const { option, fillBox, chooseOption } = useSelectOption();
  const optionMethods = [
    {
      name: "Banco de Venezuela (Pago Movil)",
      tlf: "04125351895",
      cedula: "V-29535174",
      imgUrl:
        "https://res.cloudinary.com/do5yybhwe/image/upload/v1676501459/shops/bdv_dhwfys.png",
      id: 2,
    },
    {
      name: "Zelle",
      correo: "carlossierra850@gmail.com",
      nombreDelBeneficiario: "Carlos Sierra",
      imgUrl:
        "https://res.cloudinary.com/do5yybhwe/image/upload/v1676501458/shops/Zelle_logo_zsz506.svg",
      id: 3,
    },
    {
      name: "USDT",
      wallet: "ny2178yw21huwhd27178h21h2u12h812hqsq12",
      imgUrl:
        "https://res.cloudinary.com/do5yybhwe/image/upload/v1676501458/shops/tether-usdt-logo_jjhv66.png",
      id: 4,
    },
    {
      name: "PayPal",
      correo: "carlossierra850@gmail.com",
      nameZeller: "Carlos Sierra",
      imgUrl:
        "https://res.cloudinary.com/do5yybhwe/image/upload/v1676501458/shops/paypal_k8zaeb.webp",
      id: 5,
    },
  ];
  return (
    <>
      <div className="grid gap-2 grid-cols-2 md:grid-cols-4 my-3 ">
        {optionMethods.length &&
          optionMethods.map((i) => (
            <div
              onClick={() => chooseOption(i)}
              className={`${
                fillBox(i.id) && "bg-gray-300"
              } rounded-lg shadow-lg cursor-pointer flex flex-col `}
            >
              <div className="grow .bg-slate-100 max-h-20">
                <img
                  src={i.imgUrl}
                  alt="Image"
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="p-3">
                <p className="font-bold ">{i.name}</p>
              </div>
            </div>
          ))}
      </div>
      {option.id && (
        <div
          id="alert-border-1"
          class="p-4 my-3 bg-blue-100 border-l-4 border-blue-500 text-blue-700 rounded"
          role="alert"
        >
          <div className="flex flex-col">
            <h3 className="block uppercase text-slate-800 font-bold text-xl">
              {option.name}
            </h3>
            <div className="overflow-x-auto">
              {Object.keys(option).map(
                (item) =>
                  item !== "name" &&
                  item !== "id" &&
                  item !== "imgUrl" && (
                    <p className="text-slate-800 ">
                      {formatKeys(item)}: {option[item]}
                    </p>
                  )
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PayMethods;
