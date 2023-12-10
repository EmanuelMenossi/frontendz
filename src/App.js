import TelaMenu from "./interfaces/TelaMenuSistema.js";
import Tela404 from "./interfaces/Tela404.js"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import TelaCadastroHospede from "./interfaces/TelaCadastroHospede.jsx";
//import TelaCadastroPessoa from "./Formularios/FormPessoa.jsx";
import './App.scss';
import 'boxicons/css/boxicons.min.css';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/hospede" element={<TelaCadastroHospede />}/>
          <Route path="/" element={<TelaMenu></TelaMenu>}></Route>
          <Route path="*" element={<Tela404></Tela404>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
