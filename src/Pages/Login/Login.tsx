import { AxiosError } from 'axios';
import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { CustomerService } from '../../services/CustomerService';
import './Login.css'

function Login() {

    const { setErrorMessage, setCustomer, signInService } = useContext(AuthContext)
    const navigation = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    async function signIn() {
        await signInService(username, password)
    }

    return (
        <div className='login-page-container'>
            <div className='login-page-container-login-box'>
                <div className='login-page-container-login-box-title'>
                    <h1>Iniciar sessão</h1>
                    <p>Novo por aqui? <a href='/criar-conta'>Crie sua conta</a></p>
                </div>
                <div className='login-page-container-login-box-input'>
                    <h1>Nome de usuário</h1>
                    <input onChange={e => setUsername(e.target.value)} type="text" />
                </div>
                <div className='login-page-container-login-box-input'>
                    <h1>Senha</h1>
                    <input onChange={e => setPassword(e.target.value)} type="password" />
                </div>
                <div className='login-page-container-login-box-button'>
                    <button onClick={signIn}>Confirmar</button>
                </div>
            </div>
        </div>
    )
}

export default Login