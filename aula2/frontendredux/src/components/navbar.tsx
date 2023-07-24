import { useDispatch, useSelector } from "react-redux";
import { Navbar, NavbarBrand } from "reactstrap";
import { RootState } from "../redux/store";
import { useNavigate } from "react-router-dom";
import { logout } from "../redux/slices/api.slice.login";
import { NavItem, NavLink } from "react-bootstrap";

export default function NavBarCustom() {
  const navigate = useNavigate();

  const { isAdmin } = useSelector((state: RootState) => state.apiLogin);
  const produto = useSelector((state: RootState) => state.carrinho);
  const dispatch = useDispatch();

  function Logout() {
    dispatch(logout());
    navigate("/");
  }
  
  return (
    <div>
      <Navbar
        style={{ 
          position: "sticky", 
          top: "0", 
          backgroundColor: isAdmin ? "rgba(0,0,0,0.5)" : "lightblue", // (1)  Estilização do componente NavBar.
          color: isAdmin ? "rgba(255,255,255,0.9)" : "black" // (1)  Estilização do componente NavBar.
      }}
      >
        <NavbarBrand>Loja Online</NavbarBrand>

        <NavItem onClick={() => navigate("/home")}>
          <NavLink>Produtos</NavLink>
        </NavItem>

        {/* SE USUARIO ISADMIN MOSTRA OPÇÃO DO CARRINHO */}
        {!isAdmin ? (
          <NavItem onClick={() => navigate("/cart")}>
            <NavLink>Carrinho <b style={{color: "blue"}}>{` (${produto.produtos.length}) `}</b> </NavLink>
          </NavItem>
        ) : null}

        <NavItem onClick={() => Logout()}>
          <NavLink>Logout</NavLink>
        </NavItem>
      </Navbar>
    </div>
  );
}
