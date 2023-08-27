import { Button, Container, Form, Nav, Navbar, NavDropdown, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Icone from '../../img/icone.png'
import '../estilos/MenuCss.css'

export default function Menu(props){
    return(
        <Navbar expand="lg">
        <Container fluid >
          <Image src={Icone} width='75' className='icone'></Image>
          <Navbar.Brand href="#"><Link className='linkDeco Menu' to='/'>Quintal da Leitura</Link></Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: '100px' }}
              navbarScroll
            >  
              <NavDropdown title="Cadastros" id="navbarScrollingDropdown">
                <NavDropdown.Item href="#"><Link className='linkDeco' to="/cadastroLivro">Cadastro de Titulo</Link></NavDropdown.Item>
              </NavDropdown>
              <Nav.Link to="/cadastroLivro" >
              <Link className='linkDeco' to="/emprestimo">Empréstimo</Link>
              </Nav.Link>
            </Nav>
            <Form className="d-flex">
              <Form.Control
                type="search"
                placeholder="Pesquisar"
                className="me-2"
                aria-label="Search"
              />
              <Button variant="outline-success" className='botão'>Pesquisar</Button>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    )
}