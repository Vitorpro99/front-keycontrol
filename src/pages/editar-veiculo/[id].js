import styles from "@/styles/form.module.css";
import { useState, useEffect } from "react";
import api from "@/services/api";
import { useRouter } from "next/router";

export default function EditarVeiculoPage() {
    const router = useRouter();
    const { id } = router.query;

    const [veiculo, setVeiculo] = useState({
        marca: '',
        modelo: '',
        ano: '',
        placa: '',
        dataAquisicao: '',
        cor: '',
        setor: null // Para guardar o objeto setor completo
    });

    useEffect(() => {
        if (router.isReady && id) {
            api.get(`/veiculos/${id}`)
                .then((res) => {
                    const dados = res.data;
                    // Formata a data para o input date (yyyy-mm-dd)
                    if (dados.dataAquisicao) {
                        dados.dataAquisicao = dados.dataAquisicao.split('T')[0];
                    }
                    setVeiculo(dados);
                })
                .catch((err) => {
                    alert("Erro ao recuperar dados do veículo");
                    // Se der 401, manda para o login
                    if (err.response && err.response.status === 401) {
                        localStorage.removeItem('token');
                        router.push('/login');
                    }
                });
        }
    }, [router.isReady, id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setVeiculo((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // 1. CRIAMOS UM OBJETO LIMPO
        // Enviamos apenas o que o backend espera no update
        const veiculoAtualizado = {
            marca: veiculo.marca,
            modelo: veiculo.modelo,
            ano: veiculo.ano,
            placa: veiculo.placa,
            cor: veiculo.cor,
            dataAquisicao: veiculo.dataAquisicao,
            // Não enviamos setorId aqui, pois a troca de setor é feita via Transferência
        };

        api.put(`/veiculos/${id}`, veiculoAtualizado) 
            .then(() => {
                alert("Veículo editado com sucesso!");
                router.push("/listaVeiculos"); 
            })
            .catch((err) => {
                const msg = err?.response?.data?.message || "Erro ao editar o veículo";
                alert(msg);
                
                if (err.response?.status === 403) {
                    alert("Você não tem permissão para editar este veículo.");
                }
            });
    };

    if (!veiculo.marca && !veiculo.placa) return <div className={styles.body}>Carregando...</div>;

    return (
        <div className={styles.body}>
            <div className={styles.formDiv}>
                <form onSubmit={handleSubmit} className={styles.form}>
                    <h1 className={styles.title}>EDITAR VEÍCULO</h1>
                    
                    <label className={styles.label} htmlFor="marca">Marca</label>
                    <input className={styles.input} value={veiculo.marca} onChange={handleChange} name="marca" type="text" />
                    
                    <label className={styles.label} htmlFor="modelo">Modelo</label>
                    <input className={styles.input} value={veiculo.modelo} onChange={handleChange} name="modelo" type="text" />
                    
                    <label className={styles.label} htmlFor="ano">Ano</label>
                    <input className={styles.input} value={veiculo.ano} onChange={handleChange} name="ano" type="number" />
                    
                    <label className={styles.label} htmlFor="cor">Cor</label>
                    <input className={styles.input} value={veiculo.cor} onChange={handleChange} name="cor" type="text" />
                    
                    <label className={styles.label} htmlFor="placa">Placa</label>
                    <input className={styles.inputPlaca} value={veiculo.placa} onChange={handleChange} name="placa" type="text" />
                    
                    <label className={styles.label} htmlFor="dataAquisicao">Data de aquisição</label>
                    <input className={styles.input} value={veiculo.dataAquisicao} onChange={handleChange} name="dataAquisicao" type="date" />
                    
                    
                    <label className={styles.label}>Setor Atual (Fixo)</label>
                    <input 
                        className={styles.input} 
                        disabled 
                        readOnly 
                        value={veiculo.setor ? veiculo.setor.nome : "Sem setor definido"} 
                        style={{backgroundColor: '#e9ecef', color: '#666'}}
                    />
                    <small style={{display: 'block', marginTop: '5px', color: '#888'}}>
                        Para mudar o setor, utilize a função de <strong>Transferência</strong>.
                    </small>

                    <button className={styles.mainButton} type="submit">Salvar Alterações</button>
                </form>
            </div>
        </div>
    );
}