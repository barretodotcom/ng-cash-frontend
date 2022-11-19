import React, { useContext, useEffect, useState } from 'react'
import NewTransaction from '../../components/NewTransaction/NewTransaction';
import TransactionsTable from '../../components/TransactionsTable/TransactionsTable';
import { AuthContext } from '../../context/AuthContext';
import { ITransaction } from '../../interfaces/Transactions';
import { api } from '../../services/api';
import './MainPage.css';

export enum EFilter {
    'all' = 'all',
    'debited' = 'debited',
    'credited' = 'credited'
}

function MainPage() {

    const { customer, setErrorMessage, setCustomer } = useContext(AuthContext);
    const [defaultUserTransactions, setDefaultUserTransactions] = useState<ITransaction[]>([]);
    const [allUserTransactions, setAllUserTransactions] = useState<ITransaction[]>([]);
    const [isAble, setIsAble] = useState(false);
    const [filter, setFilter] = useState<EFilter>(EFilter.all);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        if (loading) {
            api.get('/transactions/find-all-user-transactions').then(response => {

                const responseAllUserTransactions = response.data.allAccountTransactions.sort((a, b) => {
                    a.createdAt = new Date(a.createdAt)
                    b.createdAt = new Date(b.createdAt)
                    return a.createdAt.getTime() - b.createdAt.getTime();
                }).reverse();
                setAllUserTransactions(responseAllUserTransactions);
                setDefaultUserTransactions(responseAllUserTransactions);
                setCustomer(response.data.customer);
            })
            setLoading(false);
        }

    }, []);

    function handleSetFilter(filter: EFilter) {
        setFilter(filter);
        if (filter == EFilter.credited) {
            const filteredTransactions = defaultUserTransactions.filter(transaction => {
                if (transaction.creditedAccountUsername == customer?.username) {
                    return transaction;
                }
            })
            setAllUserTransactions(filteredTransactions);
        }

        if (filter == EFilter.debited) {
            const filteredTransactions = defaultUserTransactions.filter(transaction => {
                if (transaction.debitedAccountUsername == customer?.username) {
                    return transaction;
                }
            })
            setAllUserTransactions(filteredTransactions);
        }

        if (filter == EFilter.all) {
            setAllUserTransactions(defaultUserTransactions)
        }

    }

    if (customer && allUserTransactions) {

        return (
            <div className='main-page-container'>
                <NewTransaction isAble={isAble} setIsAble={setIsAble} />
                <div className='main-page-container-balance'>
                    <div className='main-page-container-balance-fields'>
                        <div className='main-page-container-balance-fields-welcome'>
                            <p>bem vindo,</p>
                            <h1>{customer.username.toLowerCase()}</h1>
                        </div>
                        <div className='main-page-container-balance-fields-value'>
                            <p>total na sua conta</p>
                            <h1>R$ {(customer?.account.balance / 100).toFixed(2)}</h1>
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
                        <div className='main-page-container-balance-transactions-total'>
                            <div className='main-page-container-balance-transactions-total-title'>
                                <h1>Histórico</h1>
                            </div>
                            <div className='main-page-container-balance-transactions-total-filter'>
                                <div style={{ backgroundColor: filter == EFilter.all ? 'rgb(74, 74, 74)' : 'black' }} onClick={() => handleSetFilter(EFilter.all)}>
                                    <h1 className='main-page-container-balance-transactions-total-filter-label'>Todas</h1>
                                </div>
                                <div style={{ backgroundColor: filter == EFilter.debited ? 'rgb(74, 74, 74)' : 'black' }} onClick={() => handleSetFilter(EFilter.debited)}>
                                    <h1 className='main-page-container-balance-transactions-total-filter-label'>Debitadas</h1>
                                </div>
                                <div style={{ backgroundColor: filter == EFilter.credited ? 'rgb(74, 74, 74)' : 'black' }} onClick={() => handleSetFilter(EFilter.credited)}>
                                    <h1 className='main-page-container-balance-transactions-total-filter-label'>Creditadas</h1>
                                </div>
                            </div>
                        </div>
                        <h1>Histórico de transferências</h1>
                        <div className='main-page-container-balance-transactions-history'>
                            <TransactionsTable setAllUserTransactions={setAllUserTransactions} transactions={allUserTransactions} />
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