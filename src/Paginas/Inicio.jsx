import Container from "react-bootstrap/Container";
import { FaHotel } from "react-icons/fa";

import "./estilos/Inicio.css";
import imgInicio from "../img/wallpaper.png";
import imgCama from "../img/cama-de-hotel-1585934862.png"
export default function Inicio() {
  return (
    <body id="wallpaperInicio" className="corLetra">
      <section>
        <div className="image-container">
          <img className="img" src={imgInicio}></img>
          <div className="listaCompleta text-overlay">
            <h2 className="text-center tituloHotel">
              Bem-Vindo ao Deluxe Hotel
            </h2>
            <p className="paragrafo ">
              <p className="letraInicio">
                {" "}
                É um prazer tê-lo aqui! Seja bem-vindo a um lugar onde a
                hospitalidade e a qualidade se encontram. Explore nossos
                conteúdos e descubra tudo o que temos para oferecer. Estamos
                ansiosos para tornar sua experiência conosco excepcional.
              </p>
            </p>
          </div>
        </div>
      </section>
      <section className="camas">
        <div>
        <p>Nossas camas foram cuidadosamente selecionadas para proporcionar uma experiência de sono sublime. Cada colchão é 
          uma fusão perfeita de suavidade e suporte, garantindo que você se entregue a uma noite de descanso profundo. A roupa de c
          ma de alta qualidade, com lençóis macios e edredons fofos, complementa o conjunto para criar um santuário de tranquilidade.</p>
        <p>Além do conforto 
          físico, as nossas camas são projetadas para envolvê-lo em elegância. A cabeceira estilizada adiciona um toque de sofisticação ao seu ambiente de d
          escanso, criando um cenário perfeito para relaxar após um dia repleto de atividades.</p>
        </div>
        <aside><img className="imgCama" src={imgCama}></img></aside>
      </section>
    </body>
  );
}
