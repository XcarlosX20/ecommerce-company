import Image from "next/image";
import { formatKeys } from "../../helpers";
import useTotal from "../../hooks/useTotal";
const PayMethods = () => {
  const { metodoPago, dispatch } = useTotal();
  console.log(metodoPago);
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
              key={i.id}
              onClick={() => dispatch({ type: "SET_METHOD_PAY", payload: i })}
              className={`${
                metodoPago.id === i.id && "bg-gray-300"
              } rounded-lg shadow-lg cursor-pointer flex flex-col `}
            >
              <div className="my-0 mx-auto max-w-full max-h-full">
                <Image
                  width={"100%"}
                  height={"100%"}
                  loader={() => i.imgUrl}
                  src={i.imgUrl}
                  alt={i.name}
                  className="object-contain"
                />
              </div>
              <div className="px-3 pb-2">
                <p className="font-bold ">{i.name}</p>
              </div>
            </div>
          ))}
      </div>
      {metodoPago.id && (
        <div
          id="alert-border-1"
          className="p-4 my-3 bg-blue-100 border-l-4 border-blue-500 text-blue-700 rounded"
          role="alert"
        >
          <div className="flex flex-col">
            <h3 className="block uppercase text-slate-800 font-bold text-xl">
              {metodoPago.name}
            </h3>
            <div className="overflow-x-auto">
              {Object.keys(metodoPago).map(
                (item) =>
                  item !== "name" &&
                  item !== "id" &&
                  item !== "imgUrl" && (
                    <p key={item} className="text-slate-800 ">
                      {formatKeys(item)}: {metodoPago[item]}
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
