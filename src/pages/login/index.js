import { useState } from "react";
import { useRouter } from "next/router";
import api from "@/services/api";
import styles from "@/styles/Login.module.css";
import Link from "next/link";

export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault(); 
        setIsLoading(true); 
        setError(""); 

        try {
            const response = await api.post("/usuarios/login", {
                email: email,
                senha: senha,
            });

            if (response.data.accessToken) {
                localStorage.setItem("token", response.data.accessToken);
                localStorage.setItem("user", JSON.stringify(response.data));
                router.push("/listaVeiculos"); 
            }
        } catch (err) {
            const errorMessage = err.response?.data?.message || "Erro ao tentar fazer login. Tente novamente.";
            setError(errorMessage);
            alert(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className={styles.body}>
            
            <div className={styles.formDiv}>

<div>
    <h1 className={styles.title}>KeyControl</h1>
    <p className={styles.subtitle}>Gestão Inteligente de Frotas</p>
</div>

                <form onSubmit={handleSubmit} className={styles.form}>
                    
                

                    {/* Cabeçalho do Card */}
                    <div>
                        <h1 className={styles.title}>Bem-vindo de volta</h1>
                        <p className={styles.subtitle}>Insira suas credenciais para acessar o sistema.</p>
                    </div>
                    
                    {/* Campo Email com Ícone */}
                    <div>
                        <label className={styles.label} htmlFor="email">Email</label>
                        <div className={styles.inputGroup}>
                            <input 
                                className={styles.input} 
                                name="email" 
                                type="email" 
                                placeholder="exemplo@email.com" 
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required 
                            />
                            {/* Ícone de Envelope (SVG) */}
                            <svg xmlns="http://www.w3.org/2000/svg" className={styles.icon} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                        </div>
                    </div>
                    
                    {/* Campo Senha com Ícone */}
                    <div>
                        <label className={styles.label} htmlFor="senha">Senha</label>
                        <div className={styles.inputGroup}>
                            <input 
                                className={styles.input} 
                                name="senha" 
                                type="password" 
                                placeholder="••••••••" 
                                value={senha}
                                onChange={(e) => setSenha(e.target.value)}
                                required 
                            />
                            {/* Ícone de Cadeado (SVG) */}
                            <svg xmlns="http://www.w3.org/2000/svg" className={styles.icon} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                        </div>
                    </div>
                    
                    <button 
                        className={styles.mainButton} 
                        type="submit" 
                        disabled={isLoading}
                    >
                        {isLoading ? "Entrando..." : "Acessar Sistema"}
                    </button>
                    
                    <div className={styles.footerText}>
                        Não tem uma conta? 
                        <Link href="/usuario/cadastro" className={styles.link}>
                            Cadastre-se
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}