import FormLivro from "../Formularios/FormLivro.jsx";
import Pagina from "../templates/componentes/Pagina.js";
import TabelaLivro from "../tabelas/TabelaLivro.jsx";
import { useState, useEffect } from "react";
import { urlBase } from "../utilitarios/definicoes.js";
import { Spinner } from "react-bootstrap";


export default function TelaCadastroLivro(props){

    const [exibirTabela, setExibirTabela] = useState(true);
    const [livros, setLivros] = useState([]);
    const [modoEdicao, setModoEdicao] = useState(false);
    const [erro, setErro] = useState(null)
    const [processado, setProcessado] = useState(false);
    const [livroEmEdicao, setLivroEmEdicao] = useState(
        {
            codigoRegisto: "",
            tituloDoLivro : "",
            editora : "",
            edicao : "",
            anoDePublicacao : ""
        }
    );

    function prepararTituloParaEdicao(livros){
        setModoEdicao(true);
        setLivroEmEdicao(livros)
        setExibirTabela(false);
    }

    function apagarTitulo(livro){
        fetch(urlBase+"/acervos", {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'},
            body: JSON.stringify(livro)
            }).then((resposta) =>{
                return resposta.json();
            }).then((retorno) =>{
                if (retorno.resultado){
                    window.alert("Não foi possivel excluir o Titulo!")                   
                }
                else {
                    buscarLivros()
                }
            })

    }

    function buscarLivros(){
        fetch(urlBase + "/acervos", {
            method:"GET"
        }).then((resposta) =>{
            return resposta.json()
        }).then((dados)=>{
            if (Array.isArray(dados)){
                setProcessado(true)
                setLivros(dados)
            }
            else {
                setProcessado(true)
                setErro(dados.status)
            }
        })

    }    

    useEffect(()=>{
        buscarLivros();
    },[]);
    
    return (
            
            <Pagina>
                <div>
                    {
                        exibirTabela ? 
                        <TabelaLivro listaLivros={livros} 
                                     setLivros={setLivros}
                                     buscar={buscarLivros}
                                     exibirTabela={setExibirTabela}
                                     editarLivro={prepararTituloParaEdicao}
                                     excluirTitulo={apagarTitulo}
                                     setModoEdicao={setModoEdicao}
                                     /> 
                        : 
                        <FormLivro listaLivros={livros}
                                   setLivros={setLivros} 
                                   exibirTabela={setExibirTabela}
                                   buscar={buscarLivros}
                                   modoEdicao={modoEdicao}
                                   setModoEdicao={setModoEdicao}
                                   livros={livroEmEdicao}
                                   />
                    }
                </div>
            </Pagina>
            
            
    );
}
