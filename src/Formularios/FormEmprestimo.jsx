import React, { useEffect, useState, useRef } from "react";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import "./estilos/EstiloForm.css";
import { urlBase } from "../utilitarios/definicoes";
import BarraBusca from '../componentes/componentes/BarraBusca.jsx'

export default function FormEmprestimo(props) {
  const [validado, setValidado] = useState(false);
  const [emprestimo, setEmprestimo] = useState(props.emprestimo);
  const [clienteSelecionado, setClienteSlecionado] = useState({})
  const [listaExemplares, setListaExemplares] = useState([])

  useEffect(()=>{
      fetch(urlBase+"/acervos", {method: "GET"})
      .then((resposta)=>{
        return resposta.json();
      }).then((dados)=>{
        setListaExemplares(dados)
      });
  },[])


  function manipularMudanca(e) {
    const elemForm = e.currentTarget;
    const id = elemForm.id;
    const valor = elemForm.value;
    setEmprestimo({ ...emprestimo, [id]: valor });
  }

  function gravar(emprestimo){
    if(!props.modoEdicao){
      fetch(urlBase+"/emprestimo",{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(emprestimo),
      }).then((resposta) =>{
        window.alert('Empréstimo gravador com sucesso!')
      })
    }else{
      fetch(urlBase+"/emprestimo",{
        method: 'PUT',
        headers: {
          'Content-Type' : 'application/json',
        },
        body: JSON.stringify(emprestimo),
      }).then((reposta) => {
        window.alert("Empréstimo atualizado com sucesso")
      })
    }
  }

  function manipular(evento){
    const form = evento.currentTarget;
    if(!form.checkValidity()){
      evento.preventDefault();
      evento.stopPropagation();
    }else{
      gravar(emprestimo)
    }
    setValidado(true);
    return false;
  }

  return (
    <body id="corpo">
      <Container className="background mb-3">
        <h1 className="text-center colorWhite">Empréstimo de Exemplar</h1>
        <Form
          id="formEmprestimo"
          noValidate
          validated={validado}
          onSubmit={manipular}
          className="mainForm"
          autocomplete="off"
        >
          <Form.Group className="mb-3" controlId="CodigoForm">
            <Form.Label>Codigo do Empréstimo</Form.Label>
            <Form.Control
              disabled
              type="text"
              placeholder="O sistema gera o código automaticamente"
              value={emprestimo.codEmprestimo}
              id="codEmprestimo"
              onChange={manipularMudanca}
            />
            <Form.Control.Feedback type="invalid">
              Digite um código valido
            </Form.Control.Feedback>
          </Form.Group>
          <hr></hr>
          <Form.Group className="mb-3">
          <BarraBusca placeholder={'Informe o titulo do exemplar'}
                  dados={listaExemplares}
                  campoChave={"codigoRegisto"}
                  campoBusca={"tituloDoLivro"}
                  funcaoSelecao={setClienteSlecionado}
                  value={emprestimo.tituloExemplar}
                  onChange={manipularMudanca}
                  id="tituloExemplar"
          ></BarraBusca>
              <Form.Control.Feedback type="invalid">
              Digite um exemplar valido
            </Form.Control.Feedback>
            </Form.Group>
          <hr></hr>

          <Form.Group className="mb-3">
            <Form.Label>Data de Retirada</Form.Label>
            <Form.Control
              type="date"
              required
              placeholder="Digite a data de Retirada"
              value={emprestimo.dataRetirada}
              id="dataRetirada"
              onChange={manipularMudanca}
            />
            <Form.Control.Feedback type="invalid">
              Digite uma data de retirada valida
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Data de Retirada</Form.Label>
            <Form.Control
              type="date"
              required
              placeholder="Digite a data de devolução"
              value={emprestimo.dataDevolucao}
              id="dataDevolucao"
              onChange={manipularMudanca}
            />
            <Form.Control.Feedback type="invalid">
              Digite uma data de devolução valida
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Status de Emprestimo</Form.Label>
            <Form.Select value={emprestimo.statusEmprest} required id="statusEmprest" onChange={manipularMudanca} aria-label="Default select example">
              <option value={setValidado}>Selecione uma das opções</option>
              <option value="0">Emprestar exemplar</option>
              <option value="1">Devolver exemplar</option>
            </Form.Select>
            <Form.Control.Feedback type="invalid">
              Selecione o status de emprestimo
            </Form.Control.Feedback>
          </Form.Group>

          <div className="botao">
            <Button
              variant="secondary"
              type="button"
              onClick={() => {
                props.exibirTabela(true);
                props.setModoEdicao(false);
              }}
            >
              Voltar
            </Button>

            <Button type="submit" className="botao" id="cadastrar">{props.modoEdicao ? "Atualizar" : "Cadastrar"}
            </Button>
          </div>
        </Form>
      </Container>
    </body>
  );
}
