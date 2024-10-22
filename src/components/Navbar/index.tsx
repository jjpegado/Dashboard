import './styles.css'
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import LojaOn from '../../assets/store-selected.svg';
import LojaOff from '../../assets/store.svg';
import Offperfil from '../../assets/user.svg';
import Onperfil from '../../assets/user-selected.svg';
import Fechar from '../../assets/close.svg';

export function NavBar() {
    const location = useLocation();
    const path = location.pathname
    const navigate = useNavigate()
    
    function logout(){
        localStorage.removeItem('token')
        localStorage.removeItem('user')

        navigate('/')
    }

return (

    <nav  className="navbar__nav">
        <ul className="navbar__ul">
            <li>
                <NavLink to="/produtos">
                    <img src={path.includes("/produtos") ? LojaOn : LojaOff} alt="Loja" /> 
                </NavLink>
            </li>
            <li>
                <NavLink to="/perfil">
                    <img src={path.includes("/perfil") ? Onperfil : Offperfil} alt="Botão para visibilidade da senha" />
                </NavLink>
            </li>
            <li>
                <button>
                    <img onClick={logout} src={Fechar} alt="" />
                </button>
            </li>
        </ul>
    </nav>
);
}
