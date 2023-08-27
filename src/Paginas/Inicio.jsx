import Container from "react-bootstrap/Container";
import "./estilos/Inicio.css";
import imgInicio from "../img/pexels-huseyn-kamaladdin-667838.jpg";
export default function Inicio() {
  return (
    <body id="wallpaperInicio" className="corLetra">
      <h1 className="text-center">Sistema de Gerenciamento Bibliotecário</h1>
      <img className="mx-auto d-block" src={imgInicio}></img>
      <Container>
        <hr></hr>
        <h2 className="text-center">Frases motivacionais</h2>
        <p className="paragrafo">
        <ul className="text-center listaInicio">
          <li>"O segredo para alcançar o sucesso é começar acreditando que você é capaz."</li>
          <li>"Não tenha medo de enfrentar desafios, pois são eles que te fortalecem e te levam mais longe."</li>
          <li>"Lembre-se de que cada dia é uma nova oportunidade para se tornar a melhor versão de si mesmo."</li>
          <li>"Não importa quantas vezes você caia, o que importa é quantas vezes você se levanta e continua tentando."</li>
          <li>"O caminho para o sucesso pode ser difícil, mas cada passo que você dá em direção aos seus objetivos é uma vitória."</li>
          <li>"Acredite em si mesmo, pois se você não acreditar, ninguém mais o fará."</li>
          <li>"Não se compare com os outros, pois cada jornada é única. Concentre-se em superar a si mesmo."</li>
          <li>"Não deixe que o medo do fracasso o impeça de tentar. Lembre-se de que grandes conquistas exigem coragem."</li>
          <li>"A persistência é a chave para o sucesso. Continue tentando, mesmo quando as coisas parecerem difíceis."</li>
          <li>"Você é capaz de coisas incríveis. Acredite em seu potencial e deixe sua luz brilhar."</li>
        </ul>
        </p>
        <hr></hr>
      </Container>
    </body>
  );
}
