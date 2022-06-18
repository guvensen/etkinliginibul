import '../styles/globals.scss';
import {ContextProvider} from "../contexts/AppContext";


export default function MyApp({ Component, pageProps }) {
  return (
      <ContextProvider >
          <Component {...pageProps} />
      </ContextProvider >
  )
}
