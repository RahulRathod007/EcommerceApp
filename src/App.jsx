import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store'; // Import your Redux store
import Home from './pages/Home.jsx';
import ProductDetailPage from './pages/ProductDetailPage.jsx';
import CheckoutPage from './pages/CheckoutPage.jsx';
import RegisterPage from './pages/RegisterPage.jsx';
import { Navbar, Container, Nav, Col } from 'react-bootstrap';
import SearchBar from './components/Product/SearchBar';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="app-fullscreen">
          <Navbar bg="dark" variant="dark" expand="lg" className="mb-0" aria-label="Main navigation">
            <Container fluid>
              <Navbar.Brand as={Link} to="/" className="me-3">
                E-commerce
              </Navbar.Brand>
              <Navbar.Toggle aria-controls="navbar-nav" />
              <Navbar.Collapse id="navbar-nav">
                <Nav className="me-auto">
                  <Nav.Link as={Link} to="/" activeClassName="active">
                    Home
                  </Nav.Link>
                  <Nav.Link as={Link} to="/register" activeClassName="active">
                    Register
                  </Nav.Link>
                  <Nav.Link as={Link} to="/checkout" activeClassName="active">
                    Checkout
                  </Nav.Link>
                </Nav>
                  <SearchBar />
              </Navbar.Collapse>
            </Container>
          </Navbar>
          <div className="content-fullscreen">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/product/:id" element={<ProductDetailPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="/register" element={<RegisterPage />} />
            </Routes>
          </div>
        </div>
      </Router>
    </Provider>
  );
}

export default App;