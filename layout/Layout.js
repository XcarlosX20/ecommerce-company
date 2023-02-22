import Head from "next/head";
import Modal from "react-modal";
import { ToastContainer } from "react-toastify";
import Sidebar from "../components/Sidebar";
import Pasos from "../components/Pasos";
import ModalProducto from "../components/ModalProducto";
import useQuiosco from "../hooks/useQuiosco";

import "react-toastify/dist/ReactToastify.css";
import useSchedule from "../hooks/useSchedule";
import { useRouter } from "next/router";

const customStyles = {
  content: {
    position: "absolute",
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-20%",
    transform: "translate(-50%, -50%)",
    maxHeight: "100vh",
    zIndex: 30,
  },
};

Modal.setAppElement("#__next");

export default function Layout({ children, pagina }) {
  const router = useRouter();
  const sideBar = ["/resumen", "/total"].indexOf(router.pathname) === -1;
  const {
    modal,
    InfoCompany: { companyName },
  } = useQuiosco();
  const { companyOpen } = useSchedule();
  return (
    <>
      <Head>
        <title>
          {companyName} - {pagina}
        </title>
        <meta name="description" content="Quosco Cafetería" />
      </Head>
      <header className="min-w-full fixed h-20 bg-slate-100 z-30">
        <div className="container mx-auto">
          <Pasos />
        </div>
      </header>
      <div className="flex w-100 flex-col xl:flex-row pt-20">
        {sideBar && (
          <aside className="xl:w-1/4 2xl:w-1/5">
            <Sidebar />
          </aside>
        )}
        <div className={`${!sideBar && "w-full"}`}>
          <main className="p-10 h-screen  ">
            {companyOpen === "closed" && <div>Alert</div>}
            {children}
          </main>
        </div>
      </div>

      {modal && (
        <Modal isOpen={modal} style={customStyles}>
          <ModalProducto />
        </Modal>
      )}

      <ToastContainer />
    </>
  );
}
