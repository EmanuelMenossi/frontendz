import { Form, Button, Container, Row, Col} from 'react-bootstrap';
import React, { useState, useRef } from 'react';
import "./estilos/EstiloForm.css";
import { urlBase } from '../utilitarios/definicoes';
import Pagina from '../templates/componentes/Pagina';
export default function FormPessoa(props) {

  const [validado, setValidado] = useState(false);
  const [pessoa, setPessoa] = useState(props.pessoa);
  const cpfRef = useRef(null);
  const teleRef = useRef(null);
  const cepRef = useRef(null);
  
    const formatCpf = (value) => {
      const formattedValue = value
        .replace(/\D/g, '')
        .replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
      return formattedValue
    }

    const formatPhone = (value) => {
      const formattedValue = value
        .replace(/\D/g, '')
        .replace(/^(\d{2})(\d{4,5})(\d{4})$/, '($1) $2-$3');
  
      return formattedValue;
    };

    const formatCep  = (value) => {
      const formattedValue = value
        .replace(/\D/g, '')
        .replace(/^(\d{5})(\d{3})$/, '$1-$2');
  
      return formattedValue;
    };
 /* 
  function manipularMudanca(e) {
    const { value } = e.target;
    //Mascaras para os campos de CPF, Telefone e CEP
    const formattedValueCpf = formatCpf(value);
    cpfRef.current.value = formattedValueCpf;
    const formattedValueTele = formatPhone(value);
    teleRef.current.value = formattedValueTele;
    const formattedValueCep = formatCep(value);
    cepRef.current.value = formattedValueCep;
    

    const elemForm = e.currentTarget;
    const id = elemForm.id;
    const valor = elemForm.value;
    setPessoa({ ...pessoa, [id]: valor });
  }

  function gravarDados(pessoa){
    if(!props.modoEdicao)
    {
      fetch(urlBase+"/pessoa",{
                              method:"POST",
                              headers:{"Content-Type":"application/json"},
                              body:JSON.stringify(pessoa),
                              }).then((resposta) => {
                                window.alert("Pessoa cadastrada com sucesso!")
                              });
    }
    else
    {
      fetch(urlBase+"/pessoa",{
                            method:"PUT",
                            headers:{'Content-Type':'application/json'},
                            body:JSON.stringify(pessoa),
                          }).then((resposta)=> {
                            window.alert("Atualizado com sucesso!")
                          });
    }
  }

  function manipulaSubmissao(evento){
    const form = evento.currentTarget;
    if (!form.checkValidity()){
      evento.preventDefault();
      evento.stopPropagation();
    }
    else{
      gravarDados(pessoa)
    }
    setValidado(true);

    return false;
  }
*/
  return (
    <body id="corpo">
      <Container className="background mb-3">
        <Form noValidate validated={validado} className='mainForm'>
        <h1 className='text-center TituloTabela'>Cadastro de Pessoas</h1>
        <Row>
        <Col md={2}>
              <Form.Group>
                <Form.Label htmlFor="codigo" className="form-label">Codigo</Form.Label>
                <Form.Control
                  type="text"
                  className="form-control"
                  placeholder="Automático"
                  id="codigo"
                  disabled />
              </Form.Group>
            </Col>
          <Col>
          <Form.Group className="mb-3" controlId="FormNome">
            <Form.Label>Nome Completo</Form.Label>
            <Form.Control type="text" required  id="nome"  placeholder="Digite o nome completo" />
            <Form.Control.Feedback type="invalid">
              Digite um nome valido!
            </Form.Control.Feedback>
          </Form.Group>
          </Col>
          <Col>
          <Form.Group className="mb-3" controlId="FormEndereco">
            <Form.Label>Endereço</Form.Label>
            <Form.Control type="text" required  id="endereco" placeholder="Informe seu endereco" />
            <Form.Control.Feedback type="invalid">
              Digite um endereço alido!
            </Form.Control.Feedback>
          </Form.Group>
          </Col>
          </Row>
          <Row>
          <Col>
          <Form.Group className="mb-3" controlId="FormEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control type="text" required  id="email" placeholder="@gmail.com" />
            <Form.Control.Feedback type="invalid">
              Digite um e-mail valido!
            </Form.Control.Feedback>
          </Form.Group>
          </Col>
          <Col>
          <Form.Group className="mb-3" controlId="FormTelefone">
            <Form.Label>Telefone</Form.Label>
            <Form.Control type="text" required id="telefone"  placeholder="(00)00000-0000" ref={teleRef} maxLength={15} />
            <Form.Control.Feedback type="invalid">
              Digite um telefone valido!
            </Form.Control.Feedback>
          </Form.Group>
          </Col>
          </Row>

          <div className="botao" type="submit">
            <Button type="submit"variant="primary" id="cadastrar">{props.modoEdicao ? "Atualizar" : "Cadastrar"}</Button>{' '}
            <Button type="button" className="btn btn-secondary" onClick={() => { props.exibirTabela(true); props.setModoEdicao(false)}}>Voltar</Button>{' '}
          </div>
        </Form>
      </Container>
    </body>
  );
}