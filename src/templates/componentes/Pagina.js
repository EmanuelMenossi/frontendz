import Sidebar from "./Sidebar.jsx"
import Rodape from "./Rodape.js";
import '../estilos/PaginaCss.css'
export default function Pagina(props){
    return (
        <div>
            <div className="filho">
                
            {props.children}
            <Sidebar></Sidebar>
            
            </div>
            
            <Rodape></Rodape>
        </div>
    );
}