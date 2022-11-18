import React, { SetStateAction, useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import './NewTransaction.css';

interface INewTransaction {
    isAble: boolean;
    setIsAble: React.Dispatch<SetStateAction<boolean>>;
}

function NewTransaction({ isAble, setIsAble }: INewTransaction) {

    const { createTransaction } = useContext(AuthContext);
    const [username, setUsername] = useState('');
    const [value, setValue] = useState('');

    async function createNewTransaction() {
        await createTransaction(username, parseFloat(value));
    }

    if (isAble) {
        return (
            <div className='new-transaction-container'>
                <div className='new-transaction-box'>
                    <div className='new-transaction-box-title'>
                        <h1>Nova transação</h1>
                    </div>
                    <div className='new-transaction-box-inputs'>
                        <input onChange={e => setUsername(e.target.value)} type="text" placeholder='Nome de usuário' />
                        <input onChange={e => setValue(e.target.value)} type="number" placeholder='Valor' />
                    </div>
                    <div className='new-transaction-box-button'>
                        <button onClick={() => createNewTransaction()}>
                            <p>Enviar</p>
                        </button>
                        <button
                            onClick={() => setIsAble(false)}
                            style={{ backgroundColor: "#eaeaea", color: "black", marginTop: "2%" }}
                        >
                            <p>Cancelar</p>
                        </button>
                    </div>
                </div>
            </div>
        )
    }
    return null;
}

export default NewTransaction