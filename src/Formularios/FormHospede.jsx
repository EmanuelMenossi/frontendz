import { Form, Button, Container, Row, Col } from "react-bootstrap";
import React, { useState, useRef } from "react";
import "./estilos/EstiloForm.css";
import { urlBase } from "../utilitarios/definicoes";
import Pagina from "../templates/componentes/Pagina";
export default function FormHospede(props) {
  const [validado, setValidado] = useState(false);
  const [pessoa, setPessoa] = useState(props.pessoa);
  const cpfRef = useRef(null);
  const teleRef = useRef(null);
  const rgRef = useRef(null);
  const cnpjRef = useRef(null);
  const resultadoRef = useRef(null);
  const [cpfValido, setCpfValido] = useState(true);
  const [cnpjValido, setCnpjValido] = useState(true);
  
  const formatCpf = (value) => {
    const formattedValue = value
      .replace(/\D/g, "")
      .replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
    return formattedValue;
  };

  const formatPhone = (value) => {
    const formattedValue = value
      .replace(/\D/g, "")
      .replace(/^(\d{2})(\d{4,5})(\d{4})$/, "($1) $2-$3");

    return formattedValue;
  };

  const formatRg = (value) => {
    const formattedValue = value
      .replace(/\D/g, "")
      .replace(/^(\d{2})(\d{3})(\d{3})(\d{1})$/, "$1.$2.$3-$4");

    return formattedValue;
  };

  const formatCnpj = (value) => {
    const formattedValue = value
      .replace(/\D/g, "")
      .replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/, "$1.$2.$3/$4-$5");

    return formattedValue;
  };

  const [tipoPessoa, setTipoPessoa] = useState("física");

  const validarCPF = (cpf) => {
    const numerosCPF = cpf.replace(/\D/g, "");

    if (numerosCPF.length !== 11 || /^(\d)\1{10}$/.test(numerosCPF)) {
      return false;
    }

    let soma = 0;
    for (let i = 0; i < 9; i++) {
      soma += parseInt(numerosCPF.charAt(i)) * (10 - i);
    }
    let digito1 = 11 - (soma % 11);
    digito1 = digito1 > 9 ? 0 : digito1;

    soma = 0;
    for (let i = 0; i < 10; i++) {
      soma += parseInt(numerosCPF.charAt(i)) * (11 - i);
    }
    let digito2 = 11 - (soma % 11);
    digito2 = digito2 > 9 ? 0 : digito2;

    return (
      parseInt(numerosCPF.charAt(9)) === digito1 &&
      parseInt(numerosCPF.charAt(10)) === digito2
    );
  };

  const validarCNPJ = (cnpj) => {
    const numerosCNPJ = cnpj.replace(/\D/g, '');

    if (numerosCNPJ.length !== 14 || /^(\d)\1{13}$/.test(numerosCNPJ)) {
      return false;
    }

    let tamanho = numerosCNPJ.length - 2;
    let numeros = numerosCNPJ.substring(0, tamanho);
    const digitos = numerosCNPJ.substring(tamanho);
    let soma = 0;
    let pos = tamanho - 7;

    for (let i = tamanho; i >= 1; i--) {
      soma += parseInt(numeros.charAt(tamanho - i)) * pos--;
      if (pos < 2) pos = 9;
    }

    let resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
    if (resultado !== parseInt(digitos.charAt(0))) {
      return false;
    }

    tamanho = tamanho + 1;
    numeros = numerosCNPJ.substring(0, tamanho);
    soma = 0;
    pos = tamanho - 7;

    for (let i = tamanho; i >= 1; i--) {
      soma += parseInt(numeros.charAt(tamanho - i)) * pos--;
      if (pos < 2) pos = 9;
    }

    resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
    if (resultado !== parseInt(digitos.charAt(1))) {
      return false;
    }

    return true;
  };

  function manipularMudanca(e) {
    const { value } = e.target;


    if (pessoa.tipo === "pessoa fisica") {


      const formarttedValueRG = formatRg(value);
      rgRef.current.value = formarttedValueRG;

      const elementoFormulario = e.currentTarget;
      const cod = elementoFormulario.id;
      if (cod === "cpf"){ 
        const formattedValueCpf = formatCpf(value);
        cpfRef.current.value = formattedValueCpf;
  
        const cpf = cpfRef.current.value;
        const valido = validarCPF(cpf);
        setCpfValido(valido);}
            
     
    }

    if (pessoa.tipo === "pessoa juridica") {
      const formattedValueCnpj = formatCnpj(value);
      cnpjRef.current.value = formattedValueCnpj;

      const cnpj = cnpjRef.current.value;
      const valido = validarCNPJ(cnpj);
      setCnpjValido(valido);
    }





    const elemForm = e.currentTarget;
    const id = elemForm.id;
    const valor = elemForm.value;
    if (elemForm.id === "tipo") {
      setTipoPessoa(e.target.value);
    }
    setPessoa({ ...pessoa, [id]: valor });
  }

  function gravarDados(pessoa) {
    console.log(pessoa);
    console.log(pessoa.rg);
    if (!props.modoEdicao) {
      if (pessoa.tipo === "pessoa fisica") {
        fetch(urlBase + "/hospede", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            nome: pessoa.nome,
            endereco: pessoa.endereco,
            email: pessoa.email,
            tipo: pessoa.tipo,
            pessoafisica: {
              cpf: pessoa.cpf,
              rg: pessoa.rg,
            },
          }),
        }).then((resposta) => {
        });
      } else {
        fetch(urlBase + "/hospede", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            nome: pessoa.nome,
            endereco: pessoa.endereco,
            email: pessoa.email,
            tipo: pessoa.tipo,
            pessoajuridica: {
              cnpj: pessoa.cnpj,
            },
          }),
        }).then((resposta) => {
        });
      }
    } else {
      if(pessoa.tipo === "pessoa fisica"){
        fetch(urlBase + "/hospede", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            codigo: pessoa.codigo,
            nome: pessoa.nome,
            endereco: pessoa.endereco,
            email: pessoa.email,
            tipo: pessoa.tipo,
            pessoafisica: {
              cpf: pessoa.cpf,
              rg: pessoa.rg,
            },
          }),
        }).then((resposta) => {
          window.alert("Atualizado com sucesso!");
        });
      }else{
        fetch(urlBase + "/hospede", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            codigo: pessoa.codigo,
            nome: pessoa.nome,
            endereco: pessoa.endereco,
            email: pessoa.email,
            tipo: pessoa.tipo,
            pessoajuridica: {
              cnpj: pessoa.cnpj,
            },
          }),
        }).then((resposta) => {
          window.alert("Atualizado com sucesso!");
        });
      }



      }
     
  }

  function manipulaSubmissao(evento) {
    const form = evento.currentTarget;
    if (pessoa.tipo === "pessoa fisica"){
      if(!cpfValido){
        evento.preventDefault();
        evento.stopPropagation();
        cpfRef.current.classList.add('is-invalid'); // Adiciona a classe Bootstrap
      }
      if(cpfValido & form.checkValidity()){
        gravarDados(pessoa)
        setValidado(false);
      }

    }

    if(pessoa.tipo === "pessoa juridica"){
      if(!cnpjValido){
        evento.preventDefault();
        evento.stopPropagation();
        cnpjRef.current.classList.add('is-invalid'); // Adiciona a classe Bootstrap
      }
      if(cnpjValido & form.checkValidity()){
        gravarDados(pessoa)
        setValidado(false);
      }
    }

    if (!form.checkValidity()) {
      evento.preventDefault();
      evento.stopPropagation();
      setValidado(true);
    }

    return false;
  }



  return (
    <body id="corpo">
      <Container className="background mb-3">
        <Form
          noValidate
          validated={validado}
          onSubmit={manipulaSubmissao}
          className="mainForm"
        >
          <h1 className="text-center TituloTabela">Cadastro de Hospede</h1>
          <Row>
            <Col md={2}>
              <Form.Group>
                <Form.Label htmlFor="codigo" className="form-label">
                  Codigo
                </Form.Label>
                <Form.Control
                  type="text"
                  className="form-control"
                  placeholder="Automático"
                  id="codigo"
                  disabled
                  value={pessoa.codigo}
                />
              </Form.Group>
            </Col>
            <Form.Group className="mb-3" controlId="FormTipo">
              <Form.Label>Categoria</Form.Label>
              <Form.Select
                value={pessoa.tipo}
                required
                id="tipo"
                onChange={manipularMudanca}
                aria-label="Default select example"
              >
                <option value={setValidado}>Selecione uma das opções</option>
                <option value="pessoa fisica">Pessoa Física</option>
                <option value="pessoa juridica">Pessoa Jurídica</option>
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                Selecione uma categoria
              </Form.Control.Feedback>
            </Form.Group>
            
            {tipoPessoa === "pessoa fisica" && (
              <div>
              <Row>
                <hr />
                <Col>
                
                  <Form.Group controlId="formCPF">
                    <Form.Label>CPF</Form.Label>
                    <Form.Control
                      type="text"
                      id="cpf"
                      value={pessoa.cpf}
                      className={`form-control ${cpfValido ? '' : 'is-invalid'}`}
                      onChange={manipularMudanca}
                      placeholder="Digite o CPF"
                      ref={cpfRef}
                      autocomplete="off"
                      minLength={14}
                      maxLength={14}
                      required
                    />
                    <Form.Control.Feedback type="invalid">
                      Digite um cpf valido!
                    </Form.Control.Feedback>
                    
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group controlId="formRG">
                    <Form.Label>RG</Form.Label>
                    <Form.Control
                      type="text"
                      id="rg"
                      value={pessoa.rg}
                      onChange={manipularMudanca}
                      required
                      placeholder="Digite o RG"
                      ref={rgRef}
                      maxLength={9}
                    />
                    <Form.Control.Feedback type="invalid">
                      Digite um rg valido!
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
              </Row>
              <hr></hr>
              </div>
            )}

            {tipoPessoa === "pessoa juridica" && (
              <Form.Group controlId="formCNPJ">
                <Form.Label>CNPJ</Form.Label>
                <Form.Control
                  type="text"
                  id="cnpj"
                  value={pessoa.cnpj}
                  autocomplete="off"
                  onChange={manipularMudanca}
                  required
                  className={`form-control ${cnpjValido ? '' : 'is-invalid'}`}
                  placeholder="Digite o CNPJ"
                  ref={cnpjRef}
                  maxLength={15}
                />
                <Form.Control.Feedback type="invalid">
                  Digite um cnpj valido!
                </Form.Control.Feedback>
                <hr />
              </Form.Group>
              
            )
            }
        
            <Col>
              <Form.Group className="mb-3" controlId="FormNome">
                <Form.Label>Nome Completo</Form.Label>
                <Form.Control
                  type="text"
                  required
                  id="nome"
                  value={pessoa.nome}
                  onChange={manipularMudanca}
                  placeholder="Digite o nome completo"
                />
                <Form.Control.Feedback type="invalid">
                  Digite um nome valido!
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3" controlId="FormEndereco">
                <Form.Label>Endereço</Form.Label>
                <Form.Control
                  type="text"
                  required
                  id="endereco"
                  value={pessoa.endereco}
                  onChange={manipularMudanca}
                  placeholder="Informe seu endereco"
                />
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
                <Form.Control
                  type="text"
                  required
                  id="email"
                  placeholder="@gmail.com"
                  value={pessoa.email}
                  onChange={manipularMudanca}
                />
                <Form.Control.Feedback type="invalid">
                  Digite um e-mail valido!
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3" controlId="FormTelefone">
                <Form.Label>Telefone</Form.Label>
                <Form.Control
                  type="text"
                  required
                  id="telefones"
                  placeholder="(00)00000-0000"
                  value={pessoa.telefones?.numero}
                  onChange={manipularMudanca}
                  ref={teleRef}
                  maxLength={11}
                />
                <Form.Control.Feedback type="invalid">
                  Digite um telefone valido!
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>
          <Button type="submit" variant="primary" id="cadastrar">
            {props.modoEdicao ? "Atualizar" : "Cadastrar"}
          </Button>{" "}
          <Button
            type="button"
            className="btn btn-secondary"
            onClick={() => {
              props.exibirTabela(true);
              props.setModoEdicao(false);
            }}
          >
            Voltar
          </Button>{" "}
        </Form>
      </Container>
    </body>
  );
}
