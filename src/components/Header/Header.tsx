import { useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext'
import './Header.css'

export default function Header() {
    const { customer, setCustomer, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    function handleLogoutAction() {
        logout();
        navigate('/login')
    }


    if (customer) {
        return (
            <div className="nav-bar">
                <button onClick={() => { handleLogoutAction() }}>Logout</button>
            </div>
        )
    }
    return null;
}