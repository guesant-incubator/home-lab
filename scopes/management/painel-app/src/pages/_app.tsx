import { Space_Grotesk } from "@next/font/google";
import type { AppProps } from "next/app";
import "../styles/globals.css";

const mainFont = Space_Grotesk({ subsets: ["latin"] });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <style jsx global>
        {`
          html,
          input,
          button,
          legend {
            font-family: ${mainFont.style.fontFamily};
          }
        `}
      </style>

      <Component {...pageProps} />
    </>
  );
}
