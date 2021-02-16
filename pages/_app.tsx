import type { AppProps } from "next/app";

import "../css/reset.css";
import "../css/main.css";

function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default App;
