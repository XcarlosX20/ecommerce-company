import "../styles/globals.css";
import { QuioscoProvider } from "../context/QuioscoProvider";
import { TotalProvider } from "../context/TotalProvider";
function MyApp({ Component, pageProps }) {
  return (
    <QuioscoProvider>
      <TotalProvider>
        <Component {...pageProps} />
      </TotalProvider>
    </QuioscoProvider>
  );
}

export default MyApp;
