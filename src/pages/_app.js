import "@/styles/globals.css";
import Header from "@/components/header"; // Verifique maiúscula/minúscula
import { useRouter } from "next/router";
import Head from "next/head";

export default function App({ Component, pageProps }) {
  const router = useRouter();

  const paginasSemHeader = [
    "/login",
    "/usuario/cadastro",
    "/",
    "/404",
    "/relatorios"
  ];

  // A verificação precisa ser mais robusta para rotas dinâmicas como /veiculos/[id]
  // Se a rota começar com /veiculos, o router.pathname será /veiculos/[id]
  const deveMostrarHeader = !paginasSemHeader.includes(router.pathname);

  return (
    <>
      <Head>
        <title>KeyControl | Gestão de Frotas</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      
      {deveMostrarHeader && (
          <div className="layout-header"> 
              <Header />
          </div>
      )}

      <Component {...pageProps} />
    </>
  );
}