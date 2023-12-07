import Pagina from "../templates/componentes/Pagina.js";
import FormPessoa from "../Formularios/FormPessoa.jsx";
import TabelaPessoa from "../tabelas/TabelaPessoa.jsx";
import { useState, useEffect } from "react";
import "../tabelas/estilos/tabela.css";
import { urlBase } from "../utilitarios/definicoes.js";
import { Spinner } from "react-bootstrap";

export default function TelaCadastroPessoa(props) {
    const [exibirTabela, setExibirTabela] = useState(true);
    const [pessoas, setPessoas] = useState([]);
    const [modoEdicao, setModoEdicao] = useState(false);
    const [erro, setErro] = useState(null);
    const [processado, setProcessado] = useState(false);
    const [pessoaEmEdicao, setPessoaEmEdicao] = useState(
        {
            cpf: "",
            categoria: "",
            nome: "",
            sexo: "",
            email: "",
            telefone: "",
            cidade: "",
            endereco: "",
            cep: "",
            dataNasc: ""
        }
    );

    function prepararPessoaParaEdicao(pessoa) {
        setModoEdicao(true);
        setPessoaEmEdicao(pessoa);
        setExibirTabela(false);
    }

    function buscarPessoas() {
        fetch(urlBase + "/pessoa", {
            method: "GET"
        }).then((resposta) => {
            return resposta.json();
        }).then((dados) => {
            if (Array.isArray(dados)) {
                setProcessado(true);
                setPessoas(dados);
            }
            else {
                setProcessado(true);
                setErro(dados.status)
            }
        });
    }

    function apagarPessoa(pessoa) {
        fetch(urlBase + "/pessoa", {
            method: "DELETE",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(pessoa)
        }).then((resposta) => {
            return resposta.json()
        }).then((retorno) => {
            if (retorno.resultado) {
                alert("Não foi possível excluir a pessoa!");
            }
            else {
                buscarPessoas();
            }
        })
    }

    useEffect(() => {
        buscarPessoas();
    }, []);


        return <Pagina>
            <div>
                {
                    exibirTabela ?
                        <TabelaPessoa listaPessoas={pessoas}
                            buscar={buscarPessoas}
                            setPessoas={setPessoas}
                            exibirTabela={setExibirTabela}
                            editarPessoa={prepararPessoaParaEdicao}
                            excluirPessoa={apagarPessoa}
                            setModoEdicao={setModoEdicao}
                        /> :
                        <FormPessoa listaPessoas={pessoas}
                            setPessoas={setPessoas}
                            exibirTabela={setExibirTabela}
                            buscar={buscarPessoas}
                            modoEdicao={modoEdicao}
                            setModoEdicao={setModoEdicao}
                            pessoa={pessoaEmEdicao} />
                };
            </div>
        </Pagina>
    }

