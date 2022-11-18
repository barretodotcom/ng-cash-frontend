import React, { useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { CustomerService } from '../../services/CustomerService';
import './CreateAccount.css';

function CreateAccount() {

    const { setErrorMessage, setCustomer } = useContext(AuthContext)
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [secondPassword, setSecondPassword] = useState('');
    const [isValid, setIsValid] = useState(true);

    function validatePassword() {
        if (password != secondPassword) {
            return false;
        }
        return true
    }

    async function createAccount() {
        if (validatePassword() == false) {
            setErrorMessage("As duas senhas precisam ser iguais")
            return;
        }
        try {
            const response = await CustomerService.createCustomer({ username, password });
            setCustomer(response.data);

        } catch (err: any) {
            if (err.response) {
                setErrorMessage(err.response.data.message)
            }
            console.log(err);
        }
    }

    return (
        <div className='create-account-page-container'>
            <div className='create-account-page-container-login-box'>
                <div className='create-account-page-container-login-box-title'>
                    <h1>Criar conta</h1>
                    <p>Crie seu nome de usuário e senha</p>
                </div>
                <div className='create-account-page-container-login-box-input'>
                    <h1>Nome de usuário</h1>
                    <input autoComplete={'off'} onChange={e => setUsername(e.target.value)} type="text" />
                </div>
                <div className='create-account-page-container-login-box-input'>
                    <h1>Senha</h1>
                    <input autoComplete={'off'} onChange={e => setPassword(e.target.value)} type="password" />
                </div>
                <div className='create-account-page-container-login-box-input'>
                    <h1>Confirmar senha</h1>
                    <input autoComplete={'off'} onChange={e => setSecondPassword(e.target.value)} type="password" />
                </div>
                <div className='create-account-page-container-login-box-button'>
                    <button onClick={(e) => { createAccount() }}>Confirmar</button>
                </div>
            </div>
        </div>
    )
}

export default CreateAccount