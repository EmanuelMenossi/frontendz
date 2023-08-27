//informar seu termo de busca
import { useState, useRef } from 'react';
import {Form, Container} from 'react-bootstrap'
import './BarraBusca.css';
export default function BarraBusca({placeholder, dados, campoChave, campoBusca, funcaoSelecao, valor}){
    const inputBusca = useRef()

    const [termoBusca, setTermoBusca] = useState(valor?valor:"");
    const [dadosLista, setDadosLista] = useState(dados);
    const [itemSelecionado, setItemSelecionado] = useState(false);

    function filtrarResultado(){
        setDadosLista(dados.filter((item) =>{
            return termoBusca.length > 1 ? item[campoBusca].toLowerCase().includes(termoBusca.toLowerCase()):false
                                            }
                                        )
                                  );
                                  let componenteResultado = document.querySelector('[data-resultado');
                                  if (dadosLista.length > 0) {
                                    componenteResultado.style.display = 'block';
                                  }else{
                                    componenteResultado.style.display= 'none';
                                  }
    }

    return(
        <Container>
        <div className='barra'>
        <svg xmlns="http://www.w3.org/2000/svg" 
            width="16" 
            height="16" 
            fill="currentColor" 
            className="bi bi-search" 
            viewBox="0 0 16 16">
            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
        </svg>
        <Form.Control
        type="text"
        ref={inputBusca}
        placeholder={placeholder}
        value={termoBusca}
        required
        onChange={e=>{
            setTermoBusca(e.target.value.toLocaleLowerCase());
            filtrarResultado();
            if(!itemSelecionado){
                e.target.setAttribute('aria-invalid', true);
                e.target.setCustomValidity('erro')
            }
            else{
                e.target.removeAttribute('aria-invalid');
                e.target.setCustomValidity("");
            }
        }}>
        </Form.Control>
        <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="16" 
            height="16" 
            fill="currentColor" 
            className="bi bi-x-octagon" 
            viewBox="0 0 16 16">
            <path d="M4.54.146A.5.5 0 0 1 4.893 0h6.214a.5.5 0 0 1 .353.146l4.394 4.394a.5.5 0 0 1 .146.353v6.214a.5.5 0 0 1-.146.353l-4.394 4.394a.5.5 0 0 1-.353.146H4.893a.5.5 0 0 1-.353-.146L.146 11.46A.5.5 0 0 1 0 11.107V4.893a.5.5 0 0 1 .146-.353L4.54.146zM5.1 1 1 5.1v5.8L5.1 15h5.8l4.1-4.1V5.1L10.9 1H5.1z"/>
            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
            <rect
            x="0"
            y="0"
            width="16"
            height="16"
            fill="transparent"
            onClick={() => {
            setTermoBusca("");
            filtrarResultado();
            setItemSelecionado(false);
            funcaoSelecao({});
            inputBusca.current.setAttribute("aria-invalid", true);
            inputBusca.current.setCustomValidity("erro");
            }}
            />
        </svg>
        </div>
        <div className='resultado'>
            <ul data-resultado>
                {
                    dadosLista.map(item =>{
                        //ex: cliente campoChave = ID e campoBusca=Nome
                        return <li key={item[campoChave]}
                            onClick={()=>{
                                setTermoBusca(item[campoBusca]);
                                setItemSelecionado(true);
                                funcaoSelecao(item);
                                inputBusca.current.setCustomValidity("");
                                let componenteResultado = document.querySelector(['[data-resultado]']);
                                componenteResultado.style.display= 'none';
                            }}>
                            {
                                item[campoChave] + '-' + item[campoBusca]
                            }
                        </li>
                    })
                }
            </ul>
        </div>
        </Container>
    );
}