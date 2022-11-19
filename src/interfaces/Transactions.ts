export interface ITransaction {
    id: number;
    debitedAccountUsername: string,
    creditedAccountUsername: string,
    debitedAccountId: number,
    creditedAccountId: number,
    balance: number,
    createdAt: Date
}