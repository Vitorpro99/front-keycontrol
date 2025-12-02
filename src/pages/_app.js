
import "@/styles/globals.css";

import Header from "@/components/header";
import { useRouter } from "next/router";
import Head from "next/head";
export default function App({ Component, pageProps }) {
  const router = useRouter();

  // Lista de páginas onde o Header NÃO deve aparecer
  const paginasSemHeader = [
    "/login",
    "/usuario/cadastro",
    "/",
    "/404",
    "/relatorios",
    "/veiculos"
  ];

  const deveMostrarHeader = !paginasSemHeader.includes(router.pathname);

  return (
    <>
      <Head>
        <title>KeyControl | Gestão de Frotas</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      {deveMostrarHeader && <Header />}

      <Component {...pageProps} />
    </>
  );
}