import { Cabecalho } from "./Cabecalho.js";
import Menu from "./Menu.js";
import Rodape from "./Rodape.js";
import '../estilos/PaginaCss.css'
export default function Pagina(props){
    return (
        <div>
            <Cabecalho texto='Quintal da Leitura'></Cabecalho>
            <Menu></Menu>
            <div className="filho">
            {props.children}
            </div>
            <Rodape></Rodape>
        </div>
    );
}