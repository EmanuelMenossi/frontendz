import Container from "react-bootstrap/Container";
import "./estilo/style.css";
import { FaHotel } from "react-icons/fa";
import Pagina from "../templates/componentes/Pagina.js";
import { Button} from 'react-bootstrap';
import imgInicio from "../img/wallpaper.png";
import imgCama from "../img/cama-de-hotel-1585934862.png"
import { PiNotePencil } from "react-icons/pi";
export default function Inicio() {
  return (
    <Pagina>
    <body id="wallpaperInicio" className="corLetra">
      
      <section className="FisicoJuridico">
        <h1 id="TituloCadastroFisicoJuridico">Cadastro <PiNotePencil /></h1>
        <p>Você deseja cadastrar uma pessoa física ou jurídica? </p>
        <Button variant="primary" href="/fisico" section= 'cadastro'>Física </Button>{' '}
        <Button variant="primary" href="/juridico" section= 'cadastro'>Jurídica</Button>{' '}
      </section>
    </body>
    </Pagina>
  );
}
