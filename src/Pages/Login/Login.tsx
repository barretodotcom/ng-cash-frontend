import { AxiosError } from 'axios';
import React, { useContext, useState } from 'react'
import { AuthContext } from '../../context/AuthContext';
import { CustomerService } from '../../services/customerService';
import './Login.css'

function Login() {

    const { setErrorMessage } = useContext(AuthContext)
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    async function signIn() {
        try {
            await CustomerService.signIn({ username, password });
        } catch (err: any) {
            if (err.response) {
                setErrorMessage(err.response.data.message)
            }
            console.log(err);
        }
    }

    return (
        <div className='login-page-container'>
            <div className='login-page-container-login-box'>
                <div className='login-page-container-login-box-title'>
                    <h1>Iniciar sessão</h1>
                    <p>Novo por aqui? Crie sua conta</p>
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