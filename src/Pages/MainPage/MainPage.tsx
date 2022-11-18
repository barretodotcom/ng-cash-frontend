import React, { useContext, useEffect, useState } from 'react'
import NewTransaction from '../../components/NewTransaction/NewTransaction';
import TransactionsTable from '../../components/TransactionsTable/TransactionsTable';
import { AuthContext } from '../../context/AuthContext';
import { api } from '../../services/api';
import './MainPage.css';

function MainPage() {

    const { customer, setErrorMessage, setCustomer } = useContext(AuthContext);
    const [allUserTransactions, setAllUserTransactions] = useState([]);
    const [isAble, setIsAble] = useState(false);

    useEffect(() => {
        if (customer) {
            api.get('/transactions/find-all-user-transactions').then(response => {
                setAllUserTransactions(response.data.allAccountTransactions)
                setCustomer(response.data.customer);

            }).catch(err => {
                if (err.response) {
                    setErrorMessage(err.response.data.message);
                    return;
                }
                setErrorMessage('Ocorreu um erro, estamos trabalhando nisso!')
            })
        }

    }, [customer])

    if (customer && allUserTransactions) {

        return (
            <div className='main-page-container'>
                <NewTransaction isAble={isAble} setIsAble={setIsAble} />
                <div className='main-page-container-balance'>
                    <div className='main-page-container-balance-fields'>
                        <div className='main-page-container-balance-fields-welcome'>
                            <p>bem vindo,</p>
                            <h1>{customer?.username.toLowerCase()}</h1>
                        </div>
                        <div className='main-page-container-balance-fields-value'>
                            <p>total na sua conta</p>
                            <h1>R$ {customer?.account.balance}</h1>
                        </div>
                        <div className='main-page-container-balance-fields-new-transaction'>
                            <button onClick={() => setIsAble(true)}>
                                <p>
                                    Nova transação
                                </p>
                            </button>
                        </div>
                    </div>
                    <div className='main-page-container-balance-transactions'>
                        <h1>Histórico de transferências</h1>
                        <div className='main-page-container-balance-transactions-history'>
                            <TransactionsTable transactions={allUserTransactions} />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    return (
        <div>
            <h1>Unauthorized</h1>
        </div>
    )
}

export default MainPage