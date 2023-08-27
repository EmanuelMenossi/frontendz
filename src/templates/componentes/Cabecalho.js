import Alert from 'react-bootstrap/Alert';
import '../estilos/CabecalhoCss.css'

export function Cabecalho(props){
    return(
        <div>
            <h1 className='Cabecalho'>
                <Alert variant='white' className='text-center mb-0 '>{props.texto}</Alert>
            </h1>
        </div>
    )
}