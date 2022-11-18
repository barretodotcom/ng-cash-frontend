import './TransactionsTable.css'

interface ITransactions {
    transactions: ITransactionDates[]
}

interface ITransactionDates {
    id: number;
    debitedAccountUsername: string,
    creditedAccountUsername: string,
    debitedAccountId: number,
    creditedAccountId: number,
    balance: number,
    createdAt: Date
}
function formatDateFormat(date: string | Date) {
    date = new Date(date);

    const day = (date.getDate()).toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = (date.getFullYear()).toString().padStart(2, '0');
    const hour = (date.getHours() + 1).toString().padStart(2, '0');
    const minute = (date.getMinutes()).toString().padStart(2, '0');
    const seconds = (date.getSeconds()).toString().padStart(2, '0');

    return `${day}/${month}/${year} - ${hour}:${minute}:${seconds}`
}

function TransactionsTable({ transactions }: ITransactions) {

    transactions = transactions.sort((a, b) => {
        a.createdAt = new Date(a.createdAt)
        b.createdAt = new Date(b.createdAt)
        return a.createdAt.getTime() - b.createdAt.getTime();
    }).reverse()

    return (
        <table className='transactions-table-container'>
            <thead>
                <tr>
                    <th>Conta creditada</th>
                    <th>Conta debitada</th>
                    <th>Valor</th>
                    <th>Data da transação</th>
                </tr>
            </thead>
            <tbody>
                {transactions.map(transaction => (
                    <tr key={transaction.id}>
                        <td>{transaction.debitedAccountUsername}</td>
                        <td>{transaction.creditedAccountUsername}</td>
                        <td>R$ {transaction.balance / 100}</td>
                        <td style={{ fontFamily: 'Poppins' }}>{formatDateFormat(transaction.createdAt)}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

export default TransactionsTable