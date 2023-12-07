import Container from "react-bootstrap/Container";
import { CiStar } from "react-icons/ci";

import "./estilos/Inicio.css";
import imgInicio from "../img/wallpaper.png";
export default function Inicio() {
  return (
    <body id="wallpaperInicio" className="corLetra">
      <div className="image-container">
      <img className="img" src={imgInicio}></img>
        <div className="listaCompleta text-overlay">
        <h2 className="text-center tituloHotel">Bem-Vindo ao Deluxe Hotel
      </h2>
        <p className="paragrafo ">
        <p> É um prazer tê-lo aqui! Seja bem-vindo a um lugar onde a hospitalidade e a qualidade se encontram. Explore nossos conteúdos e descubra tudo o que temos para oferecer. Estamos ansiosos para tornar sua experiência conosco excepcional.</p>
        </p>
        </div>
      </div>
    </body>
  );
}
