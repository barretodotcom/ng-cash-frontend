import './TransactionsTable.css';
import { BiDownArrowAlt } from 'react-icons/bi';
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { ITransaction } from '../../interfaces/Transactions';
interface ITransactions {
    transactions: ITransaction[]
    setAllUserTransactions: React.Dispatch<React.SetStateAction<ITransaction[]>>;
}

function formatDateFormat(date: string | Date) {
    date = new Date(date);

    const day = (date.getDate()).toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = (date.getFullYear()).toString().padStart(2, '0');
    const hour = (date.getHours()).toString().padStart(2, '0');
    const minute = (date.getMinutes()).toString().padStart(2, '0');
    const seconds = (date.getSeconds()).toString().padStart(2, '0');

    return `${day}/${month}/${year} - ${hour}:${minute}:${seconds}`
}

function TransactionsTable({ transactions, setAllUserTransactions }: ITransactions) {

    const [a, setA] = useState<string>('dsads');

    const firstUpdate = useRef<ITransaction[] | boolean>(transactions);

    function handleOrderDates() {
        const ordered = Array.from(transactions);
        setAllUserTransactions(ordered.reverse());
        console.log(ordered);


    }

    if (transactions.length) {

        return (
            <table className='transactions-table-container'>
                <thead>
                    <tr>
                        <th>Conta creditada</th>
                        <th>Conta debitada</th>
                        <th>Valor</th>
                        <th>Data da transação
                            <BiDownArrowAlt onClick={() => handleOrderDates()} />
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {transactions.map(transaction => (
                        <tr key={transaction.id}>
                            <td>{transaction.debitedAccountUsername}</td>
                            <td>{transaction.creditedAccountUsername}</td>
                            <td>R$ {transaction.balance / 100}</td>
                            <td style={{ fontFamily: 'Poppins' }}>{formatDateFormat(transaction.createdAt)}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        )
    }
    return null;
}

export default TransactionsTable
