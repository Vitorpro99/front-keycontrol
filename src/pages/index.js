import Head from "next/head";
import Link from "next/link";
import styles from "@/styles/Landing.module.css"; 
import Footer from "@/components/Footer";

export default function LandingPage() {
  return (
    <>
      <Head>
        <title>KeyControl | Gestão Inteligente de Frotas</title>
        <meta name="description" content="Sistema completo para gestão de frotas, manutenções e transferências." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles.pageContainer}>
        
        {/* Cabeçalho exclusivo da Landing Page */}
        <header className={styles.landingHeader}>
            <div className={styles.headerContent}>
                <span className={styles.logo}>🔑 KeyControl</span>
                <div className={styles.headerButtons}>
                    <Link href="/usuario/cadastro" className={styles.outlineButton}>Criar Conta</Link>
                    <Link href="/login" className={styles.solidButton}>Entrar</Link>
                </div>
            </div>
        </header>

        <main className={styles.main}>
          {/* --- Hero Section (Destaque) --- */}
          <section className={styles.hero}>
            <div className={styles.heroContent}>
                <span className={styles.badge}>Versão 1.0 Disponível</span>
                <h1 className={styles.title}>
                  Gestão de Frotas <br />
                  <span className={styles.highlight}>Simples e Segura.</span>
                </h1>
                <p className={styles.description}>
                  Centralize veículos, controle manutenções, gerencie multas e 
                  aprove transferências entre setores. Tudo em um único lugar.
                </p>
                <div className={styles.ctaGroup}>
                    <Link href="/login" className={styles.ctaButton}>
                      Acessar Painel
                    </Link>
                    <Link href="/usuario/cadastro" className={styles.secondaryCta}>
                      Novo Cadastro
                    </Link>
                </div>
            </div>
          </section>

          {/* --- Features Section (Funcionalidades Reais) --- */}
          <section className={styles.features}>
            <h2 className={styles.sectionTitle}>O que o KeyControl oferece?</h2>
            <p className={styles.sectionSubtitle}>Ferramentas desenvolvidas para o controle total do gestor.</p>
            
            <div className={styles.featuresGrid}>
              {/* Card 1 */}
              <div className={styles.featureCard}>
                <div className={styles.icon}>🚗</div>
                <h3>Prontuário Digital</h3>
                <p>Histórico completo de cada veículo. Visualize manutenções, IPVA, seguros e multas em uma ficha técnica detalhada.</p>
              </div>

              {/* Card 2 */}
              <div className={styles.featureCard}>
                <div className={styles.icon}>🔄</div>
                <h3>Transferências Seguras</h3>
                <p>Workflow de aprovação para movimentar veículos entre secretarias ou setores. Nada muda de lugar sem permissão.</p>
              </div>

              {/* Card 3 */}
              <div className={styles.featureCard}>
                <div className={styles.icon}>📊</div>
                <h3>Dashboard & KPIs</h3>
                <p>Indicadores financeiros e operacionais em tempo real. Saiba exatamente quanto a sua frota está custando.</p>
              </div>

              {/* Card 4 */}
              <div className={styles.featureCard}>
                <div className={styles.icon}>🔒</div>
                <h3>Segregação de Acesso</h3>
                <p>Cada gestor vê apenas o seu setor. Administradores têm visão global. Segurança e organização em primeiro lugar.</p>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
}