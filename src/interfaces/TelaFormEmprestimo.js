import Pagina from "../templates/componentes/Pagina.js";
import FormEmprestimo from "../Formularios/FormEmprestimo.jsx";
import TabelaEmprestimo from "../tabelas/TabelaEmprestimo.jsx";
import { useState, useEffect } from "react";
import "../tabelas/estilos/tabela.css";
import { urlBase } from "../utilitarios/definicoes.js";
import {Spinner} from "react-bootstrap"

export default function TelaEmprestimo(props){
    const [exibirTabela, setExibirTabela] = useState(true);
    const [emprestimos, setEmprestimos] = useState ([]);
    const [modoEdicao, setModoEdicao] = useState (false);
    const [erro, setErro] = useState(null);
    const [processado, setProcessado] = useState (false);
    const [emprestimoEmEdicao, setEmprestimoEmEdicao] = useState (
        {
            codEmprestimo:0,
            tituloExemplar:"",
            dataRetirada:"",
            dataDevolucao:"",
            statusEmprest:0
        }
    );

    function prepararEmprestimoParaEdicao(emprestimo){
        setModoEdicao(true);
        setEmprestimoEmEdicao(emprestimo);
        setExibirTabela(false);

    }


    function apagarEmprestimo(emprestimo){
        fetch(urlBase+"/emprestimo", {
            method: "DELETE",
            headers:{'Content-Type':'application/json'},
            body: JSON.stringify(emprestimo)
        }).then((resposta) =>{
            return resposta.json()
        }).then((retorno) => {
            if(retorno.resultado){
                alert("Não foi possível excluir o emprestimo")
            }
            else{
                buscaEmprestimo()
            }
        })
    }


    function buscaEmprestimo(){
        fetch(urlBase + "/emprestimo", {
            method: "GET"
        }).then((resposta)=>{
            return resposta.json();
        }).then((dados) => {
            if (Array.isArray(dados)){
                setProcessado(true);
                setEmprestimos(dados);
            }
            else{
                setProcessado(true)
                setErro(dados.status)
            }
        });
    }

    useEffect(() =>{
        buscaEmprestimo();
    },[])

    if (erro){
        return <div>
            <p>Erro ao obter os empréstimos do Backend : {erro.message}</p>
        </div>
    }else if (!processado){
        return <Spinner animation="border" role="status">
            <span className="visually-hidden">Carregando emprestimo...</span>
        </Spinner>
    }
    else{
        return <Pagina>
        <div>
        {
            exibirTabela ? 
            <TabelaEmprestimo listaEmprestimos={emprestimos} 
            setModoEdicao={setModoEdicao}
            buscar={buscaEmprestimo}
            setEmprestimos={setEmprestimos}
            exibirTabela={setExibirTabela}
            editarEmprestimo={prepararEmprestimoParaEdicao}
            excluirEmprestimo={apagarEmprestimo}
            /> 
            :
            <FormEmprestimo listaEmprestimos={emprestimos} 
            setEmprestimos={setEmprestimos}
            exibirTabela={setExibirTabela}
            buscar={buscaEmprestimo}
            modoEdicao={modoEdicao}
            setModoEdicao={setModoEdicao}
            emprestimo={emprestimoEmEdicao}
            />
        }
        </div>
    </Pagina>
    }
}