import styles from "@/styles/form.module.css";
import { useState, useEffect } from "react";
import api from "@/services/api";
import { useRouter } from "next/router";

export default function CadastrarSeguroPage() {
    const router = useRouter();
    const { id: veiculoId } = router.query;

    const [veiculoInfo, setVeiculoInfo] = useState(null);
    
    // Estados do Formulário
    const [numeroApolice, setNumeroApolice] = useState("");
    const [seguradora, setSeguradora] = useState(""); // Usaremos no campo 'tipoSeguro'
    const [valor, setValor] = useState("");
    const [franquia, setFranquia] = useState("");
    const [dataInicio, setDataInicio] = useState("");
    const [dataFim, setDataFim] = useState("");

    useEffect(() => {
        if (veiculoId) {
            api.get(`/veiculos/${veiculoId}`)
                .then(res => setVeiculoInfo(res.data))
                .catch(err => console.error(err));
        }
    }, [veiculoId]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const seguroSalvar = {
            veiculoId: parseInt(veiculoId),
            numeroApolice: parseInt(numeroApolice),
            tipoSeguro: seguradora, // Guardamos o nome da seguradora aqui
            valor: parseFloat(valor),
            franquia: parseFloat(franquia),
            dataInicio: dataInicio,
            dataFim: dataFim
        };

        try {
            await api.post("/seguros", seguroSalvar);
            alert("Seguro cadastrado com sucesso!");
            router.push("/listaVeiculos");
        } catch (err) {
            alert("Erro ao cadastrar seguro");
            console.error(err);
        }
    };

    return (
        <div className={styles.body}>
            <div className={styles.formDiv}>
                <form onSubmit={handleSubmit} className={styles.form}>
                    <h1 className={styles.title}>
                        NOVO SEGURO PARA: <br/>
                        {veiculoInfo ? `${veiculoInfo.marca} ${veiculoInfo.modelo} - ${veiculoInfo.placa}` : "Carregando..."}
                    </h1>
                    
                    <label className={styles.label}>Número da Apólice</label>
                    <input className={styles.input} type="number" required 
                        value={numeroApolice} onChange={e => setNumeroApolice(e.target.value)} placeholder="Ex: 123456789" />

                    <label className={styles.label}>Seguradora / Tipo</label>
                    <input className={styles.input} type="text" required 
                        value={seguradora} onChange={e => setSeguradora(e.target.value)} placeholder="Ex: Porto Seguro - Total" />

                    <div style={{display: 'flex', gap: '1rem'}}>
                        <div style={{flex: 1}}>
                            <label className={styles.label}>Valor (R$)</label>
                            <input className={styles.input} type="number" step="0.01" required 
                                value={valor} onChange={e => setValor(e.target.value)} placeholder="Custo Anual" />
                        </div>
                        <div style={{flex: 1}}>
                            <label className={styles.label}>Franquia (R$)</label>
                            <input className={styles.input} type="number" step="0.01" required 
                                value={franquia} onChange={e => setFranquia(e.target.value)} placeholder="Valor da Franquia" />
                        </div>
                    </div>

                    <div style={{display: 'flex', gap: '1rem'}}>
                        <div style={{flex: 1}}>
                            <label className={styles.label}>Início Vigência</label>
                            <input className={styles.input} type="date" required 
                                value={dataInicio} onChange={e => setDataInicio(e.target.value)} />
                        </div>
                        <div style={{flex: 1}}>
                            <label className={styles.label}>Fim Vigência</label>
                            <input className={styles.input} type="date" required 
                                value={dataFim} onChange={e => setDataFim(e.target.value)} />
                        </div>
                    </div>
                    
                    <button className={styles.mainButton} type="submit" disabled={!veiculoId}>Cadastrar Seguro</button>
                </form>
            </div>
        </div>
    );
}